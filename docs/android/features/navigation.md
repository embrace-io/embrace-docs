---
title: Navigation
description: Track user navigation in your app
sidebar_position: 17
---

## Navigation

### Overview

The Embrace SDK can track how users navigate through your app. Each time the user moves to a new location in
the app, the SDK records that navigation and shows it on the session timeline. This lets you follow a
user's path through the various screens of your app and see how they relate to actions, events, and errors
throughout their session.

The SDK captures user navigation in the following ways:

- **Activity lifecycle instrumentation**: Automatically detects when an [`Activity`](https://developer.android.com/reference/android/app/Activity) becomes visible
- **Jetpack Navigation instrumentation**: Automatically detects, or your app explicitly registers, navigation components from the [Jetpack Navigation](https://developer.android.com/guide/navigation) library through an API or Composable

The SDK records every navigation event with a stable name, derived from your code, that identifies the
location the user moved to. The sections below describe how the SDK determines that name for each of the
supported navigation paradigms.

### Activity lifecycle instrumentation

When the SDK starts, it registers Activity lifecycle instrumentation that records a navigation event each
time an `Activity` becomes visible, i.e. when it resumes. This happens automatically and requires no additional
dependencies or code changes. The instrumentation also records a navigation event named `Backgrounded` when the app goes
to the background and no Activities remain visible.

The instrumentation uses the Activity's class name relative to its package, as returned by
[`Activity.localClassName`](https://developer.android.com/reference/android/app/Activity#getLocalClassName()), to identify these navigation events in the dashboard.

When the app emerges from the background, the instrumentation records a navigation event to denote the app UI being
visible again. It uses the `Activity` name for that navigation event if that `Activity` has no other
navigation instrumentation.

This level of tracking is most useful for apps that use a distinct `Activity` to represent each screen. Apps
that host their navigation inside one or a handful of Activities, such as when using Jetpack Navigation,
should combine this with one of the other navigation instrumentation approaches so the instrumentation also
captures navigation within an `Activity`.

### Jetpack Navigation instrumentation

If your app uses Jetpack Navigation, you can add additional instrumentation to track navigation via that library. This
instrumentation augments the Activity lifecycle instrumentation by recording navigation events as the Jetpack
Navigation library moves the user through different screens within the app.

This overrides Activity lifecycle instrumentation in one instance: when the app emerges from the background.
If you have Jetpack Navigation instrumentation in place, the navigation event recorded by the instrumentation for
that emergence will use the last destination that Jetpack Navigation loaded rather than the resumed `Activity`.

#### Enabling

To enable instrumentation of Jetpack Navigation components, you first need to add a dependency to the
`embrace-android-instrumentation-androidx-navigation` module in your app's Gradle file:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-gradle-language" queryString="android-gradle-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
implementation("io.embrace:embrace-android-instrumentation-androidx-navigation:{{ embrace_sdk_version platform="android" }}")
```

</TabItem>
<TabItem value="groovy" label="Groovy">

```groovy
implementation 'io.embrace:embrace-android-instrumentation-androidx-navigation:{{ embrace_sdk_version platform="android" }}'
```

</TabItem>
</Tabs>

Then, register the Jetpack Navigation constructs your app uses with the SDK. How you do this depends on the
specific constructs your app uses and how your app initializes them.

#### NavController

If your app uses an instance of Jetpack Navigation's [`NavController`](https://developer.android.com/reference/androidx/navigation/NavController), you can register it in the following ways,
depending on how your app creates the instance.

##### Automatic detection

If your app's `NavController` meets all the following conditions, the instrumentation automatically detects it when the
associated `Activity` resumes:

- The `Activity` hosting the `NavController` is a [`FragmentActivity`](https://developer.android.com/reference/androidx/fragment/app/FragmentActivity)
- The `NavController` is embedded in a [`NavHostFragment`](https://developer.android.com/reference/androidx/navigation/fragment/NavHostFragment)
- The `NavHostFragment` is the first one accessible through `FragmentActivity.supportFragmentManager.fragments`

##### Using rememberNavController

If your app uses [`rememberNavController()`](https://developer.android.com/reference/kotlin/androidx/navigation/compose/package-summary), the [`Composable`](https://developer.android.com/reference/kotlin/androidx/compose/runtime/Composable) added in Jetpack Navigation 2.4, to create the
`NavController` for your `Activity`, swap in `rememberObservedNavController()` in its place. This `Composable` wraps
`rememberNavController()` and is a drop-in replacement that returns the same [`NavHostController`](https://developer.android.com/reference/androidx/navigation/NavHostController) you would've gotten
otherwise, but also registers the created `NavController` with the SDK. The instrumentation then records a navigation
event for every destination this `NavController` instance loads. No additional changes to your code are
required for this to work.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.embrace.android.embracesdk.instrumentation.androidx.navigation.rememberObservedNavController

@Composable
fun MyAppNavigation() {
    val navController = rememberObservedNavController()
    NavHost(navController = navController, startDestination = "home") {
        composable("home") { HomeScreen() }
        composable("about") { AboutScreen() }
        composable("contacts") { ContactsScreen() }
    }
}
```

</TabItem>
</Tabs>

##### Other usages

For other methods of instantiating a `NavController`, register the instance with the SDK through the API
method `Embrace.observeNavigation()` during the `onResume()` callback of the Activity lifecycle. Register
inside the callback once you consider the starting destination of the `NavController` to be loaded.
Registering outside the `onResume()` callback can produce unpredictable or inaccurate behavior.

This method takes two parameters: the `Activity` and `NavController` instances to register. If your app does
not directly create the `NavController`, obtain it by calling one of the various
[`findNavController()`](https://developer.android.com/reference/kotlin/androidx/navigation/package-summary) helper methods the platform provides.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onResume() {
        super.onResume()
        val navController = findNavController(R.id.nav_host_fragment)
        Embrace.observeNavigation(this, navController)
    }
}
```

</TabItem>
</Tabs>

Note: you have to register each new `NavController` instance, and the SDK drops calls that reuse the same
`Activity` instance after the first. This means you can safely call `observeNavigation()` for a given
`Activity` and `NavController` pair from multiple code paths without creating duplicate events.

##### Navigation event naming {#navcontroller-event-naming}

For navigation events a `NavController` produces, the instrumentation derives the name from the
loaded [`NavDestination`](https://developer.android.com/reference/androidx/navigation/NavDestination), taking the first of the following that yields a non-empty string:

1. `route`, if it's non-empty. In practice, this means:
   - For simple string routes, the instrumentation uses the string literal without filling out parameter values, e.g. `profile/{id}`
   - For routes that use serializable class instances (2.8+), the instrumentation uses the value the class's [`@SerialName`](https://kotlinlang.org/api/kotlinx.serialization/kotlinx-serialization-core/kotlinx.serialization/-serial-name/) annotation
     defines, or the fully-qualified class name if the annotation is absent. The instrumentation similarly does not fill out class parameters in the name.
2. `label`, if it's non-empty
   - When a `NavDestination` does not set its `route` (such as when you define the navigation graph in XML),
     add a label explicitly so the timeline displays a meaningful value.
3. If neither of the above works, the instrumentation falls back to the name of the associated [`Navigator`](https://developer.android.com/reference/androidx/navigation/Navigator)

#### Navigation 3 back stack

For [Jetpack Navigation 3](https://developer.android.com/guide/navigation/navigation-3), create your back
stack with `rememberObservedBackStack()` instead of something uninstrumented like [`mutableStateListOf`](https://developer.android.com/reference/kotlin/androidx/compose/runtime/package-summary). That `Composable`
returns a back stack whose every change the instrumentation treats as a navigation event, taking the top element of the
stack as the newly loaded destination.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
import io.embrace.android.embracesdk.instrumentation.androidx.navigation.rememberObservedBackStack

sealed class Screen : NavKey {
    object Home : Screen() { override fun toString() = "home" }
    object About : Screen() { override fun toString() = "about" }
}

@Composable
fun MyAppNavigation() {
    val backStack = rememberObservedBackStack<Screen>(Screen.Home)
    NavDisplay(
        backStack = backStack,
        onBack = { backStack.removeLastOrNull() },
        entryProvider = { screen -> entryFor(screen, backStack) },
    )
}
```

</TabItem>
</Tabs>

##### Navigation event naming {#nav3-event-naming}

The instrumentation uses the value returned by calling `toString()` on the top back stack element, so ensure that the underlying class's
implementation returns an appropriate value.
