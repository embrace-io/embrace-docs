---
title: Automatically Collected Data
description: Complete reference of all data automatically captured by the Embrace Android SDK
sidebar_position: 1
---

# Automatically Collected Data

The Embrace Android SDK automatically captures a wide range of telemetry without requiring manual instrumentation. This page provides a complete reference of all automatically collected data, organized by category.

## Sessions

The SDK creates a root span for each user session that tracks the full app lifecycle.

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| `emb-session` | Span (`ux.session`) | Root span representing the entire user session. Contains session ID, session number, cold start flag, clean exit status, and crash report ID. | No | Enabled |
| `emb-session` (background) | Span (`ux.session`) | Background session span when the app is not in the foreground. | No | Disabled. Enable via `background_activity.capture_enabled` in `embrace-config.json` or remote config. |

### Session Attributes

These attributes are automatically attached to every session span:

| Name | Type | Description |
|------|------|-------------|
| `emb.state` | String | Application state (`foreground` or `background`) |
| `emb.cold_start` | Boolean | Whether the session is a cold start |
| `emb.session_number` | Int | Sequential session number for the app instance |
| `emb.clean_exit` | Boolean | Whether the previous session ended cleanly |
| `emb.terminated` | Boolean | Whether the session was terminated by the OS |
| `emb.heartbeat_time_unix_nano` | Long | Last known session heartbeat timestamp |
| `emb.crash_id` | String | Associated crash report ID (if session ended in a crash) |
| `emb.session_start_type` | String | How the session started (e.g., cold start, state change) |
| `emb.session_end_type` | String | How the session ended (e.g., state change, crash) |
| `emb.startup_duration` | Long | App startup duration in nanoseconds |
| `emb.error_log_count` | Int | Number of error logs recorded in the session |
| `emb.disk_free_bytes` | Long | Available disk space at session start |

---

## App Startup

The SDK automatically records detailed startup traces with child spans for each phase of the startup process.

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| `emb-sdk-init` | Span (`perf.ui_load`) | SDK initialization time. | No | Enabled |
| `emb-process-init` | Span | Time from process creation to `Application.onCreate()` start. | Yes. Hooks into `Application.onCreate()` start. | Enabled. Requires Gradle plugin with `applicationInitTimingEnabled = true` (default). |
| `emb-embrace-init` | Span | Time spent initializing the Embrace SDK. | Yes. Auto-starts SDK in `Application.onCreate()` if `autoSdkInitializationEnabled` is set. | Enabled |
| `emb-activity-init-delay` | Span | Delay between `Application.onCreate()` end and first Activity creation. | Yes. Hooks into `Application.onCreate()` end. | Enabled |
| `emb-activity-init` | Span | Time from first Activity creation to `onCreate()` completion. | No | Enabled |
| `emb-activity-render` | Span | Time from Activity `onCreate()` to first frame rendered. | No | Enabled |
| `emb-activity-first-draw` | Span | Time for the first draw pass of the Activity. | No | Enabled |
| `emb-activity-load` | Span (`perf.ui_load`) | Total Activity cold/hot load time (Time to Initial Display). | No | Disabled by default. Enable via `automatic_data_capture.ui_load_tracing_disabled = false` and `ui_load_tracing_selected_only = false` to trace all activities, or annotate specific activities. Also gated by remote config `ui_load_instrumentation_enabled_v2`. |
| `emb-app-ready` | Span | Marks when the app is considered ready for interaction. | No | Disabled. Enable via `automatic_data_capture.end_startup_with_app_ready` in `embrace-config.json`. Requires calling `Embrace.appReady()` manually. |

---

## Crash Reporting

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| JVM Crash | Log (`sys.android.crash`) | Uncaught JVM exceptions. Captures exception type, message, full stacktrace, thread info, and exception cause chain. The SDK registers as `Thread.UncaughtExceptionHandler` and forwards to the previous handler. | No | Enabled. Disable via `crash_handler.enabled = false` in `embrace-config.json`. |
| NDK Crash | Log (`sys.android.native_crash`) | Native C/C++ crashes captured via signal handlers for `SIGILL`, `SIGTRAP`, `SIGABRT`, `SIGBUS`, `SIGFPE`, and `SIGSEGV`. Stores the previous handler and forwards the signal after processing. | No | Enabled. Disable via `ndk_enabled = false` in `embrace-config.json`. |
| React Native Crash | Log (`sys.android.react_native_crash`) | React Native JavaScript crashes (only for React Native apps). | No | Enabled (when RN SDK is integrated) |

### Crash Attributes

| Name | Type | Description |
|------|------|-------------|
| `emb.android.crash_number` | Int | Sequential crash number for JVM crashes |
| `emb.android.aei_crash_number` | Int | Sequential crash number for native crashes |
| `emb.android.threads` | String | Thread stack traces at crash time |
| `emb.exception_handling` | String | Whether the exception was `HANDLED` or `UNHANDLED` |

---

## Application Exit Info (AEI)

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| App Exit Info | Log (`sys.exit`) | Captures `ApplicationExitInfo` data on Android 11+ (API 30+). Includes exit reason, process importance, description, and optional traces. | No | Enabled. Disable via `app_exit_info.aei_enabled = false` in `embrace-config.json`. Also gated by remote config `pct_aei_enabled_v2`. Max trace size: 10MB (configurable via remote config). |

---

## ANR / Thread Blockage Detection

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| Thread Blockage | Span (`perf.thread_blockage`) | Detects when the main thread is blocked. Captures stacktrace samples at configurable intervals. | No | Enabled. Disable via `automatic_data_capture.anr_info = false` in `embrace-config.json`. Remote config controls: `pct_enabled` (default: 100%), `interval` (default: 100ms), `min_duration` (default: 1000ms), `max_depth` (default: 200 frames), `per_session` (default: 5 intervals). |

---

## Network Requests

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| OkHttp Requests | Span (`perf.network_request`) | Automatic capture of all OkHttp3 HTTP requests. Injects application and network interceptors into every `OkHttpClient.Builder.build()` call. Captures: URL, method, status code, request/response size, latency, error details, and trace ID header (`x-emb-trace-id`). | **Yes**. Bytecode hooks into `OkHttpClient.Builder.build()` to inject interceptors. | Enabled. Disable via Gradle DSL `okhttpEnabled = false`. Capture limit per domain: 1000 (configurable via `networking.default_capture_limit`). |
| HttpURLConnection Requests | Span (`perf.network_request`) | Automatic capture of native Java `HttpURLConnection` requests (HUC Lite instrumentation). | No (runtime instrumentation) | Enabled. Gated by `networking.enable_huc_lite_instrumentation` (default: `true`). |
| Network Body Capture | Log (`sys.network_capture`) | Captures request/response bodies for matching network requests based on rules (URL patterns, status codes, duration thresholds). | No | Disabled by default. Requires remote config network capture rules (duration > 5000ms, max body size 100KB, max 5 captures per rule). |
| Network Span Forwarding | Attribute | Injects W3C `traceparent` header into outgoing network requests for distributed tracing. | No | Disabled. Enable via `networking.enable_network_span_forwarding = true` in `embrace-config.json`. Also gated by remote config `pct_enabled`. |

---

## UI / Views

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| Activity Views | Span Event (`ux.view`) | Tracks Activity lifecycle transitions. Records a `screen-view` breadcrumb for each Activity started. | No (uses `ActivityLifecycleCallbacks`) | Enabled. Disable via `view_config.enable_automatic_activity_capture = false` in `embrace-config.json`. Max per session: 100 (remote config `fragments`). |

---

## Tap / Click Events

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| View Click | Span Event (`ux.tap`) | Captures `View.OnClickListener.onClick()` events. Records view resource name and optionally tap coordinates. | **Yes**. Bytecode injects into every `onClick(View)` method across all classes. | Enabled. Disable via Gradle DSL `onClickEnabled = false`. Coordinate capture disabled by default; enable via `taps.capture_coordinates = true`. Max per session: 100 (remote config `taps`). |
| View Long Click | Span Event (`ux.tap`) | Captures `View.OnLongClickListener.onLongClick()` events. Same data as click but marked as `LONG_PRESS`. | **Yes**. Bytecode injects into every `onLongClick(View)` method across all classes. | Enabled. Disable via Gradle DSL `onLongClickEnabled = false`. |
| Compose Click | Span Event (`ux.tap`) | Captures Jetpack Compose `Modifier.clickable` and `Modifier.combinedClickable` events. | No (runtime hook) | Disabled. Enable via `compose.capture_compose_onclick = true` in `embrace-config.json`. |

---

## WebView Monitoring

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| WebView URL | Span Event (`ux.webview`) | Captures `WebViewClient.onPageStarted()` URL navigations. | **Yes**. Bytecode hooks into `WebViewClient.onPageStarted()` for all subclasses. Creates override if not present. | Enabled. Disable via Gradle DSL `webviewOnPageStartedEnabled = false` or `webview.enable = false` in `embrace-config.json`. Query params captured by default; disable via `webview.capture_query_params = false`. Max per session: 100 (remote config `web_views`). |

---

## Push Notifications

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| FCM Push Notification | Span Event (`sys.push_notification`) | Captures Firebase Cloud Messaging notifications by hooking into `FirebaseMessagingService.onMessageReceived()`. Records: notification ID, title, body, type (data/notification), priority, and sender. | **Yes**. Bytecode hooks into `FirebaseMessagingService.onMessageReceived()` for all subclasses. | Disabled. Enable via Gradle DSL `firebasePushNotificationsEnabled = true`. PII data (title, body) not captured by default; enable via `capture_fcm_pii_data = true` in `embrace-config.json`. |

---

## Device State Monitoring

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| Network Connectivity | Span Event (`sys.network_status`) / State transition | Tracks network connectivity changes (WiFi, cellular, offline). Records state transitions with initial and new values. | No | Enabled. Disable via `automatic_data_capture.network_connectivity_info = false` in `embrace-config.json`. |
| Power Save Mode | Span Event (`sys.low_power`) / State transition | Detects when the device enters or exits power save (battery saver) mode. | No | Enabled. Disable via `automatic_data_capture.power_save_mode_info = false` in `embrace-config.json`. |
| Thermal State | Span Event (`perf.thermal_state`) / State transition | Tracks device thermal throttling state changes on Android 10+ (API 29+). States: `nominal`, `fair`, `serious`, `critical`. | No | Enabled. Gated by remote config `pct_thermal_status_enabled` (default: enabled). |
| Disk Usage | Attribute | Reports free disk space (`emb.disk_free_bytes`) in session attributes. | No | Enabled. Disable via `app.report_disk_usage = false` in `embrace-config.json`. |

---

## Breadcrumbs / Custom Events

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| Custom Breadcrumbs | Span Event (`sys.breadcrumb`) | User-defined breadcrumbs via `Embrace.addBreadcrumb()` API. Not automatic, but the infrastructure is always enabled. | No | Enabled. Max per session: 100 (remote config `breadcrumbs`). |

---

## Logs

User-defined logs are not automatic, but the SDK enforces per-session limits on log capture:

| Log Level | Default Limit per Session |
|-----------|--------------------------|
| Info | 100 |
| Warning | 200 |
| Error | 500 |

Log message max length: 128 characters (configurable via remote config).

---

## SDK Initialization (Auto-Start)

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| Auto SDK Start | SDK Lifecycle | Automatically calls `Embrace.start(application)` in `Application.onCreate()` without requiring manual integration. | **Yes**. Bytecode hooks into `Application.onCreate()` for all Application subclasses. | Disabled. Enable via Gradle DSL `autoSdkInitializationEnabled = true`. |
| Application Init Timing | Span | Records `applicationInitStart()` at the beginning of `Application.onCreate()` and `applicationInitEnd()` at the end, measuring total application initialization time. | **Yes**. Bytecode hooks into `Application.onCreate()` start and all return points. | Enabled. Disable via Gradle DSL `applicationInitTimingEnabled = false`. |

---

## 3rd Party Signal Handler Detection

| Name | Type | Description | Bytecode Instrumented | Default |
|------|------|-------------|----------------------|---------|
| Signal Handler Detection | Internal | Checks 5 seconds after initialization if NDK signal handlers have been overwritten by other libraries and reinstalls them if needed. Only `libwebviewchromium.so` is allowlisted. | No | Disabled (since SDK 7.0). Enable via `sig_handler_detection = true` in `embrace-config.json`. Also controllable via remote config kill switch. |

---

## Gradle Plugin Bytecode Instrumentation Summary

The Embrace Gradle Plugin (`io.embrace.gradle`) applies ASM-based bytecode transformations at build time. All features can be configured via the `embrace` DSL block in `build.gradle`:

```kotlin
embrace {
    bytecodeInstrumentation {
        enabled = true                          // Global on/off (default: true)
        okhttpEnabled = true                    // OkHttp interceptor injection (default: true)
        onClickEnabled = true                   // View.onClick capture (default: true)
        onLongClickEnabled = true               // View.onLongClick capture (default: true)
        webviewOnPageStartedEnabled = true       // WebView URL capture (default: true)
        autoSdkInitializationEnabled = false     // Auto Embrace.start() (default: false)
        applicationInitTimingEnabled = true      // Application.onCreate() timing (default: true)
        firebasePushNotificationsEnabled = false // FCM notification capture (default: false)
        classIgnorePatterns = listOf()          // Classes to skip instrumentation
    }
}
```

### Bytecode Instrumentation Strategies

| Strategy | Description | Used By |
|----------|-------------|---------|
| **Exhaustive** | Visits every class in the app | `onClick`, `onLongClick` |
| **MatchClassName** | Visits only the exact class specified | `okhttp` (`okhttp3.OkHttpClient.Builder`) |
| **MatchSuperClassName** | Visits all subclasses of specified class | `fcm_push_notifications`, `webview_page_start`, `auto_sdk_initialization`, `application_init_time` |

---

## Configuration Reference Summary

### Local Config (`embrace-config.json`)

| Config Key | Type | Default | Controls |
|-----------|------|---------|----------|
| `sdk_config.crash_handler.enabled` | Boolean | `true` | JVM crash handler |
| `sdk_config.ndk_enabled` | Boolean | `true` | NDK crash capture |
| `sdk_config.automatic_data_capture.power_save_mode_info` | Boolean | `true` | Power save mode monitoring |
| `sdk_config.automatic_data_capture.network_connectivity_info` | Boolean | `true` | Network connectivity monitoring |
| `sdk_config.automatic_data_capture.anr_info` | Boolean | `true` | ANR / thread blockage detection |
| `sdk_config.automatic_data_capture.ui_load_tracing_disabled` | Boolean | `false` | UI load tracing (inverted: false = enabled) |
| `sdk_config.automatic_data_capture.ui_load_tracing_selected_only` | Boolean | `false` | Trace only annotated activities |
| `sdk_config.automatic_data_capture.end_startup_with_app_ready` | Boolean | `false` | Require manual `appReady()` call |
| `sdk_config.view_config.enable_automatic_activity_capture` | Boolean | `true` | Activity lifecycle breadcrumbs |
| `sdk_config.taps.capture_coordinates` | Boolean | `false` | Include tap X/Y coordinates |
| `sdk_config.compose.capture_compose_onclick` | Boolean | `false` | Jetpack Compose click events |
| `sdk_config.webview.enable` | Boolean | `true` | WebView URL capture |
| `sdk_config.webview.capture_query_params` | Boolean | `true` | WebView URL query parameters |
| `sdk_config.networking.default_capture_limit` | Int | `1000` | Max network requests per domain |
| `sdk_config.networking.enable_native_monitoring` | Boolean | `false` | HttpURLConnection capture (legacy) |
| `sdk_config.networking.enable_huc_lite_instrumentation` | Boolean | `true` | HttpURLConnection capture (HUC Lite) |
| `sdk_config.networking.enable_network_span_forwarding` | Boolean | `false` | W3C traceparent injection |
| `sdk_config.networking.capture_request_content_length` | Boolean | `false` | HTTP Content-Length header |
| `sdk_config.background_activity.capture_enabled` | Boolean | `false` | Background session capture |
| `sdk_config.app_exit_info.aei_enabled` | Boolean | `true` | ApplicationExitInfo capture |
| `sdk_config.app.report_disk_usage` | Boolean | `true` | Disk usage reporting |
| `sdk_config.capture_fcm_pii_data` | Boolean | `false` | FCM notification title/body |
| `sdk_config.sig_handler_detection` | Boolean | `false` | 3rd party signal handler detection |

