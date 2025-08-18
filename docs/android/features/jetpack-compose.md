---
title: Jetpack Compose
description: Enable our Jetpack Compose
sidebar_position: 13
---

# Jetpack Compose

The Embrace SDK injects code into your APK using bytecode instrumentation to automatically capture taps on composables.

## Enabling Jetpack Compose instrumentation

:::info
Requires Jetpack Compose dependency at build time and run time
:::

:::info
Instrumenting Jetpack Compose click events incurs a small performance penalty on a tap as it requires searching Compose's UI tree. On lower-end devices this may manifest as dropped frames.
:::

### Set Local config and Gradle plugin block

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

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
dependencies {
    implementation("io.embrace:embrace-android-compose:{{ embrace_sdk_version platform="android" }}")
}
```

</TabItem>
<TabItem value="groovy" label="Groovy">

```groovy
dependencies {
    implementation("io.embrace:embrace-android-compose:{{ embrace_sdk_version platform="android" }}")
}
```

</TabItem>
</Tabs>

### Set ProGuard rule

In order to prevent code obfuscation, the following rule must be added into your R8/ProGuard rules:

```text
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
If you are facing issues at runtime, we can turn off Jetpack Compose instrumentation remotely. Please, contact us: [support@embrace.com](mailto:support@embrace.com)
:::
