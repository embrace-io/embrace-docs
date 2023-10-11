---
title: Jetpack Compose
description: Enable our Jetpack Compose
sidebar_position: 13
---

# Jetpack Compose

The Embrace SDK injects code into your APK using a process we call “swazzling” to automatically capture taps on composables.

## Enabling Jetpack Compose instrumentation

:::info
Requires Jetpack Compose dependency at build time and run time
:::

### Set Local config and swazzler block

To enable onClick instrumentation, You will need to modify your `embrace-config.json` [file](/android/features/configuration-file.md)

```json
{
    "sdk_config": {
        "compose": {
            "capture_compose_onclick": true
        }
  }
}
```

It's also required to modify your `app/build.gradle` or `app/build.gradle.kts` file:

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="KTS">
```kotlin
 swazzler {
    disableComposeDependencyInjection.set(false) 
    }
```
</TabItem>
<TabItem value="groovy" label="Groovy">
```groovy
swazzler { 
    disableComposeDependencyInjection = false 
    }
```
</TabItem>
</Tabs>

### Set ProGuard rule

In order to prevent code obfuscation, the following rule must be added into pro guard-rules :

```
-keep class androidx.compose.ui.platform.AndroidComposeView {
    <fields>;
    <methods>;
}
```

### Identify clickable elements

`onClickLabel` or `contentDescription` must be added to have a proper way to identify a clicked element. Remember that `onClickLabel` will have more priority if both properties are set.

#### onClickLabel:

Clickable modifier to define a label and the onClick callback:

```kotlin
Row(
    Modifier
        .clickable(onClickLabel = "someTag", onClick ={...})
){ ... }
```

Clickable element that already defines the onClick action under the hood. 

The following example shows how to add a modifier onClick to override the label but not the actual action, so for the action, it passes null:

```kotlin
IconToggleButton(
    checked = isBookmarked,
    onCheckedChange ={onClick()},
    modifier = modifier.semantics{
        this.onClick(label = clickLabel, action = null)
}
){ ... }
```

#### contentDescription:

Content description will be considered only if the element contains an OnClick modifier.

Content description can be added as part of Modifer semantics properties, but some elements take it as a parameter, such as `Icon`:

```kotlin
Icon(
    imageVector = if (isBookmarked) Icons.Filled.Bookmarkelse Icons.Filled.BookmarkBorder,
    contentDescription = "Icon" // handled by click label of parent
)
```

Content description as Modifer semantics properties:

```kotlin
Column(
    modifier = Modifier
        .clickable(onClickLabel = "test", onClick = {
            Log.d("log", "log")
        })
        .fillMaxWidth()
        .padding(16.dp)
){...}
```

:::warning Important
If you are facing issues at runtime, we can turn off Jetpack Compose instrumentation remotely. Please, contact us: <support@embrace.io>
:::

