---
title: Configuration
description: Reference documentation for Embrace SDK configuration options
sidebar_position: 3
---

## Configuration

The Embrace SDK is configured using the `EmbraceIO.Options` class. This reference document covers the available configuration options and how to use them.

### EmbraceIO.Options

The main configuration class for the Embrace SDK. `EmbraceIO.Options` is created using factory methods rather than direct initialization.

#### Factory Methods

##### Standard Factory (`withAppId`)

The most common configuration, for use with an Embrace app ID. All parameters after `appId` are optional.

```swift
EmbraceIO.Options.withAppId(
    _ appId: String,
    platform: EmbracePlatform = .default,
    endpoints: EmbraceEndpoints? = nil,
    captureServices: EmbraceIO.CaptureServicesOptions = .default(),
    crashReporter: EmbraceIO.CrashReporter = .embrace,
    logLevel: EmbraceLogLevel = .default,
    otel: EmbraceIO.OTelOptions? = nil
)
```

**Parameters**:

- `appId`: The App ID for your Embrace application. This is the only required field.
- `platform`: The mobile platform that the current application is running in.
- `endpoints`: The URLs used to communicate with the Embrace backend. These should never be altered under normal operating conditions.
- `captureServices`: The capture services to enable for automatic data collection. If not explicitly set, the default set of capture services will be enabled.
- `crashReporter`: The crash reporter to use: `.embrace` (default), `.crashlytics`, or `.none`.
- `logLevel`: The level of severity for console logs.
- `otel`: The OpenTelemetry configuration, including custom exporters, processors, and resource.

**GitHub Source**: [EmbraceCore/Options/Embrace+Options.swift](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BOptions.swift)

##### Local Configuration Factory (`withLocalConfiguration`)

This setting is used by developers who want to use the SDK without connecting to the Embrace backend. In this mode, data is not uploaded to Embrace servers, so the `otel` parameter is required to provide exporters that handle the generated data.

```swift
EmbraceIO.Options.withLocalConfiguration(
    _ localConfiguration: EmbraceConfigurable = .default,
    platform: EmbracePlatform = .default,
    captureServices: EmbraceIO.CaptureServicesOptions = .default(),
    crashReporter: EmbraceIO.CrashReporter = .embrace,
    logLevel: EmbraceLogLevel = .default,
    otel: EmbraceIO.OTelOptions
)
```

**Parameters**:

- `localConfiguration`: A custom configuration provider to replace the Embrace backend configuration. Defaults to `.default`.
- `platform`: The mobile platform that the current application is running in.
- `captureServices`: The capture services to enable for automatic data collection.
- `crashReporter`: The crash reporter to use: `.embrace` (default), `.crashlytics`, or `.none`.
- `logLevel`: The level of severity for console logs.
- `otel`: The OpenTelemetry configuration (required). Provide custom exporters here to receive the generated data.

### EmbracePlatform

Enum that specifies the platform the SDK is running on.

```swift
enum EmbracePlatform {
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

### EmbraceEndpoints

Configuration for the backend endpoints used by the SDK.

:::info
Endpoints should never be specified manually unless you are explicitly instructed to do so by Embrace support. The SDK automatically uses the correct endpoints for your App ID.
:::

```swift
struct EmbraceEndpoints {
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

### EmbraceLogLevel

Enum that controls the level of logging output from the SDK.

```swift
enum EmbraceLogLevel {
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

### Capture Services

Capture services are configured through `EmbraceIO.CaptureServicesOptions`, passed as the `captureServices:` parameter. Use `.default()` to install the recommended set of services. See [Capture Services](./capture-services.md) for the full list and customization details.

### EmbraceIO.OTelOptions

Configuration for the OpenTelemetry pipeline, including custom exporters, processors, and resource.

```swift
struct OTelOptions {
    init(
        resource: Resource? = nil,
        spanProcessors: [SpanProcessor] = [],
        spanExporters: [SpanExporter] = [],
        logProcessors: [LogRecordProcessor] = [],
        logExporters: [LogRecordExporter] = []
    )
}
```

**Parameters**:

- `resource`: Custom `Resource` to attach to all telemetry data (Note: Embrace-generated resources will have priority over them).
- `spanProcessors`: Custom span processors to add to the pipeline.
- `spanExporters`: Custom span exporters to receive exported span data.
- `logProcessors`: Custom log record processors to add to the pipeline.
- `logExporters`: Custom log record exporters to receive exported log data.

### EmbraceConfigurable

Interface for providing runtime configuration when not using the Embrace backend.

```swift
protocol EmbraceConfigurable {
    var isNetworkSpansForwardingEnabled: Bool { get }
    var isBackgroundSessionEnabled: Bool { get }
    var traceparentInjectionEnabled: Bool { get }
    // ... additional properties
}
```

Key properties:

- `isNetworkSpansForwardingEnabled`: Controls whether captured network spans are eligible for forwarding to third-party observability platforms.
- `isBackgroundSessionEnabled`: Controls whether sessions are recorded when the app is in the background.
- `traceparentInjectionEnabled`: Controls whether the SDK injects a W3C `traceparent` header into captured network requests. When using the Embrace Dashboard, this is managed remotely via `traceparent_injection_pct_enabled`.

### Code Examples

#### Basic Configuration

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID"
)
```

#### Configuration with Custom Endpoints

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    endpoints: EmbraceEndpoints(
        baseURL: "https://custom-collector.example.com",
        configBaseURL: "https://custom-config.example.com"
    )
)
```

#### Debug vs. Release Configuration

```swift
#if DEBUG
var embraceOptions = EmbraceIO.Options.withAppId(
    "YOUR_DEBUG_APP_ID",
    logLevel: .debug
)
#else
var embraceOptions = EmbraceIO.Options.withAppId(
    "YOUR_PROD_APP_ID",
    logLevel: .error
)
#endif
```

#### Custom Capture Services Configuration

```swift
// Configure URLSession capture service with custom options
let urlSessionOptions = URLSessionCaptureService.Options(
    ignoredURLs: ["analytics.example.com"]
)

// Configure view capture with custom options
let viewOptions = ViewCaptureService.Options(
    instrumentVisibility: true,
    instrumentFirstRender: true
)

// Build the capture services options
let services = CaptureServicesOptionsBuilder()
    .addDefaults()
    .addUrlSessionCaptureService(withOptions: urlSessionOptions)
    .addViewCaptureService(withOptions: viewOptions)
    .addTapCaptureService(withOptions: TapCaptureService.Options())
    .build()

// Use custom services in Embrace options
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    captureServices: services
)
```

#### OpenTelemetry Export Configuration

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    otel: EmbraceIO.OTelOptions(
        spanExporters: [
            JaegerSpanExporter(
                serviceName: "YourAppName",
                collectorAddress: "http://jaeger.example.com:14268/api/traces"
            )
        ]
    )
)
```

<!-- TODO: Add examples for custom EmbraceConfigurable implementation.  -->
