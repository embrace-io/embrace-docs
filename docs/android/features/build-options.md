---
title: Build Options
description: Build Options for the Embrace Android Gradle Plugin
sidebar_position: 12
---

# Build Options

The Embrace SDK injects code into your APK using a process we call “swazzling” to automatically capture activity transitions, taps, and network requests in your application.

## Disabling Swazzling for a Build Type

:::warning Important
Disabling swazzling means we won't capture network calls, activity transitions, and taps. For this reason, avoid disabling swazzling for release builds.
:::

The swazzling operation adds to the build time, and you may want to disable it for debug builds. Use the
`variantFilter` option to turn off swazzling for a given variant. The example below illustrates how to
disable it for the `debug` build type in your `app/build.gradle` or `app/build.gradle.kts` file.

```
swazzler {
    variantFilter {
        if(it.name.toLowerCase().contains("debug")) {
            it.setSwazzlingEnabled(false)
        }
    }
}
```