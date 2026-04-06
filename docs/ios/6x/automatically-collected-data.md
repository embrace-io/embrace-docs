---
title: Automatically Collected Data
description: Complete reference of all data automatically captured by the Embrace Apple SDK
sidebar_position: 1
---

# Automatically Collected Data

The Embrace Apple SDK automatically captures a wide range of telemetry without requiring manual instrumentation. This page provides a complete reference of all automatically collected data, organized by category.

## Sessions

The SDK creates a root span for each user session that tracks the full app lifecycle.

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `emb-session` | Span (`ux.session`) | Root span representing the entire user session. Contains session ID, session number, cold start flag, clean exit status, and crash report ID. | No | Enabled |
| `emb-session` (background) | Span (`ux.session`) | Background session span when the app is not in the foreground. | No | Disabled. Enable via `isBackgroundSessionEnabled` in `Embrace.Options`. |

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

---

## App Startup

The SDK automatically records detailed startup traces with child spans for each phase of the startup process. Pre-warmed launches are detected and handled separately.

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `emb-app-startup` | Span (System) | Parent span for the complete app startup process. | No | Enabled |
| `emb-app-pre-main-init` | Span (System) | Pre-main initialization time (native library loading). Only recorded for non-prewarmed startups. | No | Enabled |
| `emb-app-startup-app-init` | Span (System) | App initialization from constructor to `didFinishLaunchingWithOptions` return. | No | Enabled |
| `emb-app-first-frame-rendered` | Span (System) | Time until the first frame is rendered on screen. | No | Enabled |
| `emb-sdk-setup` | Span (System) | SDK setup/initialization time. | No | Enabled |
| `emb-sdk-start` | Span (System) | Duration of the `Embrace.start()` call. | No | Enabled |

---

## Crash Reporting

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| iOS Crash (KSCrash) | Log (`ios.crash`) | Uncaught exceptions and signal-based crashes. Captures exception type, message, full stacktrace, thread info, registers, and memory state. Handles all signals except `SIGTERM`. | No | Enabled. Default crash reporter. |
| iOS Crash (MetricKit) | Log (`ios.crash`) | Crash diagnostics captured via MetricKit on iOS 14+. | No | Disabled. Enable via `isMetricKitCrashCaptureEnabled` in remote config. |

### Crash Attributes

| Name | Type | Description |
|------|------|-------------|
| `emb.provider` | String | Crash reporter used (`kscrash` or `metrickit`) |
| `emb.payload` | String | Encoded crash report data |
| `record.uid` | String | Unique crash report ID |

---

## Thread Blockage / Hang Detection

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `emb-thread-blockage` | Span (`perf.thread_blockage`) | Detects when the main thread is blocked/hung. Captures stacktrace samples at configurable intervals. | No | Enabled via `HangCaptureService`. Max hangs per session: 200. Stack samples per hang: 0 (disabled by default). |

### Hang Attributes

| Name | Type | Description |
|------|------|-------------|
| `last_known_time_unix_nano` | Long | Last known time before the hang |
| `interval_code` | String | Interval code |
| `thread_priority` | String | Thread priority |

### MetricKit Hang Diagnostics

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| MetricKit Hang | Log (`ios.hang`) | Hang diagnostics via MetricKit on iOS 14+. | No | Disabled. Enable via `isMetricKitHangCaptureEnabled` in remote config. |

---

## Network Requests

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `{METHOD} {path}` | Span (`perf.network_request`) | Automatic capture of all `URLSession` HTTP requests. Captures: URL, method, status code, request/response body size, latency, error details, and W3C `traceparent` header. | **Yes**. Swizzles `URLSession` data/upload/download task creation methods and `resume()`. | Enabled via `URLSessionCaptureService`. W3C tracing header injection enabled by default (`injectTracingHeader: true`). |
| Network Body Capture | Log (`network_capture`) | Captures encrypted request/response bodies for matching network requests based on rules. | No | Disabled. Requires remote config `networkPayloadCaptureRules`. |
| Network Span Forwarding | Attribute | Injects W3C `traceparent` header into outgoing network requests for distributed tracing. | No | Disabled. Enable via `isNetworkSpansForwardingEnabled` in remote config. |

### Network Request Attributes

| Name | Type | Description |
|------|------|-------------|
| `url.full` | String | Full request URL |
| `http.request.method` | String | HTTP method (GET, POST, etc.) |
| `http.request.body.size` | Int | Request body size in bytes |
| `http.response.status_code` | Int | Response status code |
| `http.response.body.size` | Int | Response body size in bytes |
| `emb.w3c_traceparent` | String | W3C trace parent header (if injected) |
| `error.type` | String | Error type if request failed |
| `error.code` | Int | Error code if request failed |
| `error.message` | String | Error message if request failed |

### URLSessionCaptureService Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `injectTracingHeader` | Boolean | `true` | Inject W3C `traceparent` header into outgoing requests |
| `ignoredURLs` | `[String]` | `[]` | URL patterns to exclude from capture |
| `requestsDataSource` | Delegate | `nil` | Custom request modification handler |

---

## UI / Views (UIKit)

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `emb-screen-view` | Span (`ux.view`) | Tracks UIViewController visibility (from `viewDidAppear` to `viewDidDisappear`). | **Yes**. Swizzles `UIViewController` lifecycle methods: `viewDidLoad`, `viewWillAppear`, `viewIsAppearing` (iOS 17+), `viewDidAppear`, `viewDidDisappear`. | Enabled via `ViewCaptureService` with `instrumentVisibility: true` (default). |
| `emb-{ClassName}-time-to-first-render` | Span (Performance) | Time from `viewDidLoad` to first appearance. Includes child spans for each lifecycle phase. | **Yes** (same swizzling as above). | Enabled via `ViewCaptureService` with `instrumentFirstRender: true` (default). |
| `emb-view-did-load` | Span (Performance) | Child span for `viewDidLoad` execution time. | **Yes** | Enabled (child of time-to-first-render) |
| `emb-view-will-appear` | Span (Performance) | Child span for `viewWillAppear` execution time. | **Yes** | Enabled (child of time-to-first-render) |
| `emb-view-is-appearing` | Span (Performance) | Child span for `viewIsAppearing` execution time (iOS 17+). | **Yes** | Enabled (child of time-to-first-render) |
| `emb-view-did-appear` | Span (Performance) | Child span for `viewDidAppear` execution time. | **Yes** | Enabled (child of time-to-first-render) |

### ViewCaptureService Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `instrumentVisibility` | Boolean | `true` | Enable view visibility spans |
| `instrumentFirstRender` | Boolean | `true` | Enable time-to-first-render performance spans |
| `viewControllerBlockList` | `[UIViewController.Type]` | `[]` | UIViewController types to exclude |
| `blockHostingControllers` | Boolean | `false` | Ignore SwiftUI hosting controllers |

---

## UI / Views (SwiftUI)

SwiftUI view tracking requires annotating views with the `@EmbraceMacro` macro.

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `render-loop` | Span (Performance) | Begins on first body execution, ends on next run loop tick. | No (compile-time macro) | Enabled when `@EmbraceMacro` is applied. Gated by `isSwiftUiViewInstrumentationEnabled` (default: `true`). |
| `body` | Span (Performance) | Entire `body` property execution time. | No | Enabled when `@EmbraceMacro` is applied |
| `appear` | Span (Performance) | `onAppear` modifier execution. | No | Enabled when `@EmbraceMacro` is applied |
| `disappear` | Span (Performance) | `onDisappear` modifier execution. | No | Enabled when `@EmbraceMacro` is applied |
| `time-to-first-render` | Span (Performance) | View initialization to first appearance. | No | Enabled when `@EmbraceMacro` is applied |
| `time-to-first-content-complete` | Span (Performance) | View initialization to content completion. | No | Enabled when `@EmbraceMacro` is applied |

---

## Tap / Touch Events

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `emb-ui-tap` | Span Event (`ux.tap`) | Captures tap/touch events on screen. Records view name and optionally tap coordinates. | **Yes**. Swizzles `UIResponder.touchesBegan` and `UIResponder.touchesEnded`. | Enabled via `TapCaptureService`. Max per session: 80. |

### Tap Event Attributes

| Name | Type | Description |
|------|------|-------------|
| `view.name` | String | Name of the tapped view |
| `tap.coords` | String | Tap coordinates (if enabled) |

### TapCaptureService Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `captureTapCoordinates` | Boolean | `true` | Include tap X/Y coordinates |
| `tapPhase` | Enum | `.onStart` | Capture on `touchesBegan` or `touchesEnded` |
| `ignoredViewTypes` | `[UIView.Type]` | `[]` | UIView types to exclude |

---

## WebView Monitoring

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `emb-web-view` | Span Event (`ux.webview`) | Captures `WKWebView` navigation events. Records navigated URL and any error codes. | **Yes**. Swizzles `WKWebView` navigation delegate methods. | Enabled via `WebViewCaptureService`. |

### WebView Event Attributes

| Name | Type | Description |
|------|------|-------------|
| `webview.url` | String | Navigated URL |
| `webview.error_code` | Int | Error code if navigation failed |

### WebViewCaptureService Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `stripQueryParams` | Boolean | `false` | Remove query parameters from captured URLs |

---

## Push Notifications

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `emb-push-notification` | Span Event (`sys.push_notification`) | Captures push notifications received via `UNUserNotificationCenter`. Records notification type (standard or silent). | No (uses delegate callbacks) | Enabled via `PushNotificationCaptureService`. PII data (title, body) not captured by default. |

### Push Notification Attributes

| Name | Type | Description |
|------|------|-------------|
| `notification.type` | String | `notif` or `silent` |
| `notification.title` | String | Notification title (if `captureData` enabled) |
| `notification.subtitle` | String | Notification subtitle (if `captureData` enabled) |
| `notification.body` | String | Notification body (if `captureData` enabled) |
| `notification.category` | String | Notification category (if `captureData` enabled) |
| `notification.badge` | Int | Badge number (if `captureData` enabled) |

### PushNotificationCaptureService Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `captureData` | Boolean | `false` | Capture notification payload data (title, body, etc.) |

---

## Device State Monitoring

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| `emb-device-low-power` | Span (`sys.low_power`) | Tracks when the device enters or exits Low Power Mode. | No (uses `NSProcessInfoPowerStateDidChange` notification) | Enabled via `LowPowerModeCaptureService`. |
| `emb-device-low-memory` | Span Event (System) | Captures low memory warnings from the OS. | No (uses `UIApplication.didReceiveMemoryWarningNotification`) | Enabled via `LowMemoryWarningCaptureService`. |

### Low Power Mode Attributes

| Name | Type | Description |
|------|------|-------------|
| `start_reason` | String | `system_query` or `system_notification` |

---

## MetricKit Diagnostics

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| MetricKit Metrics | Log (`ios.metrickit-metrics`) | System performance metrics from MetricKit on iOS 14+. | No | Disabled. Enable via `isMetricKitInternalMetricsCaptureEnabled` in remote config. |

---

## Breadcrumbs / Custom Events

| Name | Type | Description | Swizzled | Default |
|------|------|-------------|----------|---------|
| Custom Breadcrumbs | Span Event (`sys.breadcrumb`) | User-defined breadcrumbs via the `Embrace.addBreadcrumb()` API. Not automatic, but the infrastructure is always enabled. | No | Enabled. Max per session: 100. |

---

## Logs

User-defined logs are not automatic, but the SDK enforces per-session limits on log capture:

| Log Level | Default Limit per Session |
|-----------|--------------------------|
| Info | 100 |
| Warning | 200 |
| Error | 500 |

---

## Resource Attributes

The following attributes are automatically attached to all spans and logs:

### Device Information

| Attribute Key | Description |
|--------------|-------------|
| `emb.device.is_jailbroken` | Whether the device is jailbroken |
| `emb.device.locale` | Device locale string |
| `emb.device.timezone` | Device timezone |
| `emb.device.disk_size` | Total disk space |
| `emb.device.architecture` | CPU architecture |
| `emb.device.screenResolution` | Screen resolution |
| `emb.os.build_id` | OS build ID |
| `emb.os.variant` | OS variant |
| `emb.os.description` | OS description |

### Application Information

| Attribute Key | Description |
|--------------|-------------|
| `emb.app.bundle_version` | Bundle version |
| `emb.app.environment` | Environment (e.g., prod, staging) |
| `emb.app.environment_detailed` | Detailed environment info |
| `emb.app.framework` | Framework type (`native`, `react_native`, `flutter`, `unity`) |
| `emb.app.launch_count` | Sequential app launch count |
| `emb.app.version` | App version string |
| `emb.app.build_id` | Build ID |
| `emb.sdk.version` | Embrace SDK version |
| `emb.process_identifier` | Process ID |
| `emb.process_start_time` | Process start timestamp |
| `emb.process_pre_warm` | Whether the app was pre-warmed by the OS |

---

## Default Capture Services

When using `CaptureServiceBuilder().addDefaults()`, the following services are included:

| Service | What It Captures |
|---------|-----------------|
| `URLSessionCaptureService` | Network request tracking |
| `TapCaptureService` | Touch event capture (iOS/tvOS) |
| `ViewCaptureService` | UIViewController lifecycle (iOS/tvOS) |
| `WebViewCaptureService` | WKWebView navigation |
| `LowMemoryWarningCaptureService` | Memory warnings |
| `LowPowerModeCaptureService` | Low Power Mode state |
| `HangCaptureService` | Main thread hang detection |
| `PushNotificationCaptureService` | Push notification events |

---

## Configuration Reference Summary

### Embrace.Options

| Option | Type | Default | Controls |
|--------|------|---------|----------|
| `appId` | String | Required | Your Embrace app ID |
| `captureServices` | `[CaptureService]` | All defaults | Which capture services to enable |
| `crashReporter` | CrashReporter | KSCrash | Crash reporting backend |

### Remote Config Options

| Config Key | Default | Controls |
|-----------|---------|----------|
| `isSDKEnabled` | `true` | Master SDK on/off |
| `isBackgroundSessionEnabled` | `false` | Background session capture |
| `isNetworkSpansForwardingEnabled` | `false` | W3C traceparent injection for distributed tracing |
| `isUiLoadInstrumentationEnabled` | `true` | UI load instrumentation |
| `isSwiftUiViewInstrumentationEnabled` | `true` | SwiftUI view instrumentation |
| `isMetricKitEnabled` | `false` | MetricKit metrics capture |
| `isMetricKitCrashCaptureEnabled` | `false` | MetricKit crash capture |
| `isMetricKitHangCaptureEnabled` | `false` | MetricKit hang diagnostics |

### Span/Event Limits

| Setting | Default |
|---------|---------|
| Max breadcrumbs per session | 100 |
| Max taps per session | 80 |
| Max hangs per session | 200 |
| Stack samples per hang | 0 (disabled) |
