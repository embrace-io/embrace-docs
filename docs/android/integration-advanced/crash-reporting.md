---
title: Crash reporting
sidebar_position: 2
description: Upload crash reports from your Android application using the Embrace SDK
---

# Collect your first crash report

## Set up the crash reporter

The Embrace SDK automatically captures JVM crash reports. You can test this out with the following code. This code will crash your app and should **not** go in production:

```kotlin
throw RuntimeException("This is a crash")
```

Relaunch the app and refresh the [Embrace dashboard](https://dash.embrace.io/): you should see the uploaded crash. Depending
on network latency and other variables, a crash can occasionally take a few minutes to show up.

## NDK crash capture

The Embrace SDK automatically captures NDK crash reports. To disable NDK crash reports add the
 `ndk_enabled` setting to your `app/src/main/embrace-config.json` file:

```json
{
  "ndk_enabled": false
}
```

## Symbolicate stack traces

If you have obfuscated your application with ProGuard, DexGuard, or R8, the captured crashes will contain obfuscated method names. The Embrace
Gradle plugin will automatically upload mapping files at build time to get you human-readable stacktraces from production.
