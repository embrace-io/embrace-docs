---
title: Capture Services
description: Reference documentation for Embrace SDK's automatic instrumentation services
sidebar_position: 4
---

## Capture Services

Capture Services are core components of the Embrace SDK that provide automatic instrumentation of your application. Each service focuses on capturing specific types of data and events. They are configured through `EmbraceIO.CaptureServicesOptions` and passed to the SDK via the `captureServices:` parameter of `EmbraceIO.Options`.

You build an `EmbraceIO.CaptureServicesOptions` value with `CaptureServicesOptionsBuilder`. The builder methods are chainable and each returns the builder, so you finish with `.build()`. Use `.addDefaults()` to install the recommended set of services, then add or customize individual services. `EmbraceIO.CaptureServicesOptions.default()` returns the plain default set without a builder.

### Available Capture Services

The SDK includes the following built-in capture services:

- **URLSessionCaptureService** - Captures `URLSession` network requests and responses
- **ViewCaptureService** - Tracks UIViewController lifecycle and performance
- **TapCaptureService** - Records user interaction with your app's interface
- **WebViewCaptureService** - Monitors WKWebView performance and errors
- **LowMemoryWarningCaptureService** - Detects low memory warnings
- **LowPowerModeCaptureService** - Tracks low power mode
- **PushNotificationCaptureService** - Captures push notification events
- **HangCaptureService** - Captures app hangs (**opt-in** — not included in the defaults)

### CaptureServicesOptionsBuilder

The builder exposes the following methods:

- `addDefaults()` — installs the default set of services.
- `addUrlSessionCaptureService(withOptions:)`
- `addViewCaptureService(withOptions:)`
- `addTapCaptureService(withOptions:)`
- `addWebViewCaptureService(withOptions:)`
- `addPushNotificationCaptureService(withOptions:)`
- `addLowMemoryWarningCaptureService()`
- `addLowPowerModeCaptureService()`
- `addHangCaptureService()` — opt-in; not part of `addDefaults()`.
- `add(_ service: CaptureService)` — add a custom `CaptureService` instance.
- `remove(ofType:)` / `remove(embraceType:)`
- `build()` — returns the `EmbraceIO.CaptureServicesOptions` value.

### URLSessionCaptureService

Captures `URLSession` network requests and responses to provide visibility into API performance, error rates, and data transfer volumes.

#### Options

```swift
struct Options {
    init(
        requestsDataSource: URLSessionRequestsDataSource? = nil,
        ignoredURLs: [String] = [],
        traceparent: URLSessionCaptureService.Traceparent = .init()
    )
}
```

**Parameters**:

- `requestsDataSource`: An optional `URLSessionRequestsDataSource` used to modify captured requests before they are recorded (for example, to obfuscate sensitive data). This affects only the captured data, not the request your app sends.
- `ignoredURLs`: URLs to exclude from capture. Any request URL containing one of these strings is ignored.
- `traceparent`: Configures W3C `traceparent` header injection. Use `URLSessionCaptureService.Traceparent(onlyAllowDomains:)` to restrict injection to specific first-party domains.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

### ViewCaptureService

Captures UIViewController lifecycle events to measure screen load times, rendering performance, and navigation patterns.

#### Options

```swift
struct Options {
    init(
        instrumentVisibility: Bool = true,
        instrumentFirstRender: Bool = true,
        viewControllerBlockList: ViewControllerBlockList = ViewControllerBlockList()
    )
}
```

**Parameters**:

- `instrumentVisibility`: Whether to generate spans tracking how long each `UIViewController` is visible.
- `instrumentFirstRender`: Whether to instrument time-to-first-render for `UIViewController` instances.
- `viewControllerBlockList`: A `ViewControllerBlockList` used to exclude specific view controllers from instrumentation.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

### TapCaptureService

Captures user tap interactions to provide insights into user engagement and interaction patterns.

#### Options

```swift
struct Options {
    init(
        ignoredViewTypes: [AnyClass] = [],
        captureTapCoordinates: Bool = true,
        tapPhase: TapPhase = .onStart,
        delegate: TapCaptureServiceDelegate? = nil
    )
}
```

**Parameters**:

- `ignoredViewTypes`: View classes whose taps should not be captured (for example, `[UITableView.self, UIScrollView.self]`).
- `captureTapCoordinates`: Whether to capture the coordinates of each tap.
- `tapPhase`: The `TapPhase` at which a tap is captured. Defaults to `.onStart`.
- `delegate`: An optional `TapCaptureServiceDelegate` for fine-grained control over which taps are captured.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

### WebViewCaptureService

Captures `WKWebView` loading performance and navigation errors.

#### Options

```swift
struct Options {
    init(
        stripQueryParams: Bool = false
    )
}
```

**Parameters**:

- `stripQueryParams`: When `true`, query parameters are removed from the captured URL before it is recorded. Defaults to `false`.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

### PushNotificationCaptureService

Captures push notification events including arrivals and user interactions.

#### Options

```swift
struct Options {
    init(
        captureData: Bool = false
    )
}
```

**Parameters**:

- `captureData`: When `true`, the user-facing payload fields (title, subtitle, body, category, badge) are recorded. Defaults to `false`.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

### LowMemoryWarningCaptureService

Captures low memory warning events from iOS.

This service doesn't have configurable options. Add it with `addLowMemoryWarningCaptureService()`.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

### LowPowerModeCaptureService

Captures device low power mode state changes.

This service doesn't have configurable options. Add it with `addLowPowerModeCaptureService()`.

**GitHub Source**: [EmbraceCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCaptureService/CaptureService.swift)

### HangCaptureService

Captures app hangs.

**This service is opt-in.** It is not added by `EmbraceIO.CaptureServicesOptions.default()` — you must register it explicitly:

- `CaptureServicesOptionsBuilder().addDefaults().addHangCaptureService().build()`

This service is turned off when attached to a debugger (i.e. while debugging with Xcode). You can enable it when connected to a debugger by setting the `EMBAllowWatchdogInDebugger` environment var to `1`.

For full configuration details (including `HangLimits`), see [Hang Detection](../automatic-instrumentation/hang-detection.md).

**GitHub Source**: [HangCaptureService](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Capture/Hang/HangCaptureService.swift)

### Custom Capture Services

You can also extend the SDK by creating your own custom capture services.

#### Implementing a Custom Capture Service

Custom capture services must conform to the `CaptureService` protocol:

```swift
protocol CaptureService {
    var type: CaptureServiceType { get }
    func setup(with dependencies: EmbraceCaptureDependencies) -> Bool
    func stop()
}
```

<!-- TODO Link See [Extending CaptureServices to Add Your Own Instrumentation] for more details. -->

### Code Examples

#### Configuring URLSession Capture

```swift
let urlSessionOptions = URLSessionCaptureService.Options(
    requestsDataSource: MyDataSource(), // Obfuscate sensitive data
    ignoredURLs: [
        "analytics.example.com",
        "metrics.myapp.com"
    ]
)

let services = CaptureServicesOptionsBuilder()
    .addDefaults()
    .addUrlSessionCaptureService(withOptions: urlSessionOptions)
    .build()

let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    captureServices: services
)
```

#### Configuring View Capture

```swift
let viewOptions = ViewCaptureService.Options(
    instrumentVisibility: true,
    instrumentFirstRender: true
)

let services = CaptureServicesOptionsBuilder()
    .addDefaults()
    .addViewCaptureService(withOptions: viewOptions)
    .build()
```

#### Configuring Tap Capture

```swift
let tapOptions = TapCaptureService.Options(
    ignoredViewTypes: [UITableView.self, UIScrollView.self],
    captureTapCoordinates: true
)

let services = CaptureServicesOptionsBuilder()
    .addDefaults()
    .addTapCaptureService(withOptions: tapOptions)
    .build()
```

#### Configuring All Capture Services

```swift
let services = CaptureServicesOptionsBuilder()
    .addDefaults()
    .addUrlSessionCaptureService(withOptions: urlSessionOptions)
    .addViewCaptureService(withOptions: viewOptions)
    .addTapCaptureService(withOptions: tapOptions)
    .addWebViewCaptureService(withOptions: WebViewCaptureService.Options(stripQueryParams: false))
    .addPushNotificationCaptureService(withOptions: PushNotificationCaptureService.Options(captureData: false))
    .addLowMemoryWarningCaptureService()
    .addLowPowerModeCaptureService()
    .addHangCaptureService() // opt-in
    .build()

let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    captureServices: services
)
```

<!-- TODO: Add examples of implementing and registering custom capture services.  -->
