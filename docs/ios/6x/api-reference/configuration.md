---
title: Configuration
description: Reference documentation for Embrace SDK configuration options
sidebar_position: 3
---

# Configuration

The Embrace SDK is configured using the `Embrace.Options` class. This reference document covers the available configuration options and how to use them.

## Embrace.Options

The main configuration class for the Embrace SDK.

### Initializers

#### Standard Initializer

```swift
Embrace.Options(
    appId: String,
    appGroupId: String? = nil,
    platform: Embrace.Platform = .default,
    endpoints: Embrace.Endpoints? = nil,
    logLevel: LogLevel = .default,
    captureServices: CaptureServices = .automatic,
    crashReporter: CrashReporter? = EmbraceCrashReporter(),
    export: OpenTelemetryExport? = nil
)
```

**Parameters**:

- `appId`: The App ID for your Embrace application. This is the only required field.
- `appGroupId`: The ID for the Apple App Group that your app belongs to, if any.
- `platform`: The mobile platform that the current application is running in.
- `endpoints`: The URLs used to communicate with the Embrace backend.
- `logLevel`: The level of severity for console logs.
- `captureServices`: The capture services to enable for automatic data collection.
- `crashReporter`: The crash reporter to use for crash reporting.
- `export`: The OpenTelemetry exporter configuration.

**GitHub Source**: [EmbraceCore/Options/Embrace+Options.swift](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BOptions.swift)

#### Export-Only Initializer (Without Embrace Backend)

For developers who want to use the SDK without connecting to the Embrace backend:

```swift
Embrace.Options(
    export: OpenTelemetryExport,
    captureServices: CaptureServices = .automatic,
    crashReporter: CrashReporter? = nil,
    runtimeConfiguration: EmbraceConfigurable? = nil
)
```

**Parameters**:

- `export`: The OpenTelemetry exporter configuration (required).
- `captureServices`: The capture services to enable for automatic data collection.
- `crashReporter`: The crash reporter to use for crash reporting.
- `runtimeConfiguration`: A custom configuration provider to replace the Embrace backend configuration.

## Embrace.Platform

Enum that specifies the platform the SDK is running on.

```swift
enum Platform {
    case iOS
    case tvOS
    case unity
    case reactNative
    case flutter
    case default
}
```

- `.default`: Maps to iOS.
- Use the appropriate platform value for your application type.

## Embrace.Endpoints

Configuration for the backend endpoints used by the SDK.

```swift
struct Endpoints {
    init(
        baseURL: String? = nil,
        developmentBaseURL: String? = nil,
        configBaseURL: String? = nil
    )
}
```

**Parameters**:

- `baseURL`: The base URL for the Embrace data collector.
- `developmentBaseURL`: The base URL for development environments.
- `configBaseURL`: The base URL for fetching configuration.

## LogLevel

Enum that controls the level of logging output from the SDK.

```swift
enum LogLevel {
    case none
    case error
    case warning
    case info
    case debug
    case default
}
```

- `.none`: No logging output.
- `.error`: Only log errors.
- `.warning`: Log errors and warnings.
- `.info`: Log errors, warnings, and info messages.
- `.debug`: Log all messages, including debug information.
- `.default`: Maps to `.info` in debug builds and `.error` in release builds.

## CaptureServices

Defines which automatic data capture services are enabled.

```swift
struct CaptureServices {
    static var automatic: CaptureServices { get }

    init(services: [CaptureService] = [])

    func add(_ service: CaptureService) -> CaptureServices
    func remove(_ service: CaptureServiceType) -> CaptureServices
}
```

### Available Capture Services

The SDK includes the following capture services:

- `.networkCaptureService`: Captures network requests.
- `.viewCaptureService`: Tracks UIViewController lifecycle events.
- `.tapCaptureService`: Records user tap interactions.
- `.webViewCaptureService`: Monitors WKWebView performance.
- `.lowMemoryWarningCaptureService`: Detects low memory warnings.
- `.lowPowerModeCaptureService`: Tracks low power mode.
- `.pushNotificationCaptureService`: Captures push notification events.

## OpenTelemetryExport

Configuration for exporting OpenTelemetry data.

```swift
struct OpenTelemetryExport {
    init(
        spanExporter: SpanExporter? = nil,
        logExporter: LogExporter? = nil
    )
}
```

**Parameters**:

- `spanExporter`: The exporter for OpenTelemetry spans.
- `logExporter`: The exporter for OpenTelemetry logs.

## EmbraceConfigurable

Interface for providing runtime configuration when not using the Embrace backend.

```swift
protocol EmbraceConfigurable {
    var enableNetworkSpanForwarding: Bool { get }
    var enableBackgroundSessions: Bool { get }
    var logLimitSeconds: Int { get }
    var enableMetricCollection: Bool { get }
}
```

## Code Examples

### Basic Configuration

```swift
let options = Embrace.Options(
    appId: "YOUR_APP_ID"
)
```

### Configuration with Custom Endpoints

```swift
let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    endpoints: Embrace.Endpoints(
        baseURL: "https://custom-collector.example.com",
        configBaseURL: "https://custom-config.example.com"
    )
)
```

### Debug vs. Release Configuration

```swift
#if DEBUG
var embraceOptions = Embrace.Options(
    appId: "YOUR_DEBUG_APP_ID",
    logLevel: .debug
)
#else
var embraceOptions = Embrace.Options(
    appId: "YOUR_PROD_APP_ID",
    logLevel: .error
)
#endif
```

### Custom Capture Services Configuration

```swift
// Configure network capture service with custom options
let networkOptions = NetworkCaptureServiceOptions(
    captureRequestHeaders: true,
    captureResponseHeaders: true,
    requestBodyCapturePredicate: { request, data in
        // Only capture non-sensitive requests
        return !request.url?.absoluteString.contains("secure") ?? false
    }
)

// Configure view capture with custom options
let viewOptions = ViewCaptureServiceOptions(
    viewNameFilter: { controller in
        // Only track important screens
        return controller is CheckoutViewController || controller is HomeViewController
    }
)

// Create custom capture services
let services = CaptureServiceBuilder()
    .add(.network(options: networkOptions))
    .add(.view(options: viewOptions))
    .add(.tap)
    .build()

// Use custom services in Embrace options
let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    captureServices: services
)
```

### OpenTelemetry Export Configuration

```swift
let options = Embrace.Options(
    export: OpenTelemetryExport(
        spanExporter: JaegerSpanExporter(
            serviceName: "YourAppName",
            collectorAddress: "http://jaeger.example.com:14268/api/traces"
        )
    )
)
```

<!-- TODO: Add examples for custom EmbraceConfigurable implementation.  -->
