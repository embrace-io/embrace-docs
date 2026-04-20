---
title: Crash reporting
sidebar_position: 2
description: Upload crash reports from your Android application using the Embrace SDK
---

## Collect your first crash report

### Set up the crash reporter

The Embrace SDK automatically captures JVM crash reports. You can test this out with the following code. This code will crash your app and should **not** go in production:

```kotlin
throw RuntimeException("This is a crash")
```

Relaunch the app and refresh the [Embrace dashboard](https://dash.embrace.io/): you should see the uploaded crash. Depending
on network latency and other variables, a crash can occasionally take a few minutes to show up.

### Coexistence with other JVM crash reporters

The Embrace SDK registers as the default `Thread.UncaughtExceptionHandler` for JVM exceptions. When it does so, it stores a reference to the previously installed handler and **forwards all exceptions to it** after processing. This means Embrace can coexist with other JVM crash reporters (e.g., Firebase Crashlytics, Bugsnag, Sentry) — both will receive the uncaught exception.

:::info What `crash_handler.enabled = false` actually does
Setting [`crash_handler.enabled`](/android/configuration/configuration-file/#crash_handler---enabled-bool) to `false` does **not** prevent the SDK from registering as the uncaught exception handler. The handler is always registered to ensure crash teardown logic runs correctly. When disabled, the SDK still intercepts exceptions and forwards them to the previous handler, but it does **not** capture or send crash telemetry to Embrace.
:::

### NDK crash capture

The Embrace SDK automatically captures NDK crash reports. To disable NDK crash reports add the
 `ndk_enabled` setting to your `app/src/main/embrace-config.json` file:

```json
{
  "ndk_enabled": false
}
```

#### How NDK signal handlers work

When NDK crash capture is enabled, the SDK installs signal handlers for 6 signals: `SIGILL`, `SIGTRAP`, `SIGABRT`, `SIGBUS`, `SIGFPE`, and `SIGSEGV`. This **replaces** any existing handlers for those signals, but the SDK stores the previously installed handler and **forwards the signal to it** after processing the crash.

:::warning
If another NDK crash capture tool is initialized **after** Embrace, it will overwrite Embrace's signal handlers, and Embrace will not receive NDK crash signals. Conversely, if Embrace initializes after another tool, that tool's handlers will be overwritten. It is not recommended to enable more than one NDK crash reporting solution.
:::

#### Third-party signal handler detection

The SDK can detect when another library overwrites its signal handlers after installation. When enabled, the SDK checks 5 seconds after initialization whether its handlers are still in place. If they have been overwritten by a library not in the allowlist (currently only `libwebviewchromium.so`), the SDK automatically reinstalls its handlers.

This feature is controlled by the [`sig_handler_detection`](/android/configuration/configuration-file/#sig_handler_detection-bool) setting in `embrace-config.json` and is disabled by default. It can also be overridden remotely by Embrace's backend via a kill switch.

:::warning Changed in 7.0
Prior to SDK version 7.0, `sig_handler_detection` defaulted to `true` (enabled). Starting with 7.0, it defaults to `false` (disabled). If you are upgrading from a pre-7.0 version and rely on this behavior, you must explicitly set `"sig_handler_detection": true` in your `embrace-config.json`.
:::

### Symbolicate stack traces

If you have obfuscated your application with ProGuard, DexGuard, or R8, the captured crashes will contain obfuscated method names. The Embrace
Gradle plugin will automatically upload mapping files at build time to get you human-readable stacktraces from production.

:::info Configuration
Mapping file uploads are skipped for debuggable builds or when API credentials are missing. You can control upload behavior with these Gradle properties:

- `embrace.disableMappingFileUpload=true` in `gradle.properties` to disable mapping file uploads entirely
- `embrace.failBuildOnUploadErrors` (default: `true`) in the `embrace` DSL block to control whether upload failures break the build

For more details, see the [Embrace Gradle Plugin configuration](/android/configuration/embrace-gradle-plugin).
:::
