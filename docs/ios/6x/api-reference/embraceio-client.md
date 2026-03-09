---
title: EmbraceIO Client
description: Reference documentation for the EmbraceIO client, the new main entry point for the Embrace SDK
sidebar_position: 1
---

# EmbraceIO Client

The `EmbraceIO` class is the new main entry point for interacting with the Embrace SDK, introduced in **v6.16.1**. It provides a simplified and streamlined API for configuring, starting, and interacting with the SDK.

:::info
The existing [`Embrace` client](./embrace-client.md) can still be used and remains fully functional. However, `EmbraceIO` is now considered the primary entry point for the SDK APIs. Some features, such as passing a custom OpenTelemetry `Resource` during initialization, are only available through the `EmbraceIO` client.
:::

## Setup and Initialization

### `setup(options:)`

Configures the Embrace SDK with the provided options.

```swift
static func setup(options: EmbraceIO.Options) throws
```

**Parameters**:

- `options`: An instance of `EmbraceIO.Options` that configures the SDK.

**Throws**: An error if the SDK cannot be initialized properly.

**Important Notes**:

- Must be called from the main thread
- Won't do anything if the SDK was already set up

### `shared`

Provides access to the singleton instance of the `EmbraceIO` class.

```swift
static let shared: EmbraceIO
```

**Note**: While the singleton is always available, you must call `setup(options:)` before calling `start()`.

## Creating Options

`EmbraceIO.Options` is created using factory methods rather than direct initialization.

### `Options.withAppId(_:...)`

Creates options for use with an Embrace app ID. This is the most common configuration.

```swift
class func withAppId(
    _ appId: String?,
    platform: Platform = .default,
    endpoints: Embrace.Endpoints? = nil,
    captureServices: EmbraceIO.CaptureServicesOptions = .default(),
    crashReporter: CrashReporter? = KSCrashReporter(),
    logLevel: LogLevel = .default,
    otel: EmbraceIO.OTelOptions? = nil
) -> EmbraceIO.Options
```

**Parameters**:

- `appId`: The app ID for your Embrace project.
- `platform`: The platform the app runs on. Defaults to `.default` (iOS).
- `endpoints`: Custom `Embrace.Endpoints`. Defaults to Embrace endpoints for the given app ID.
- `captureServices`: Determines which capture services will be installed. See [Capture Services](./capture-services.md).
- `crashReporter`: The crash reporter to install. Defaults to `KSCrashReporter()`.
- `logLevel`: Verbosity level for console logs. Defaults to `.default`.
- `otel`: Optional `EmbraceIO.OTelOptions` to configure the OpenTelemetry SDK. See [Custom OpenTelemetry Resource](#custom-opentelemetry-resource).

### `Options.withLocalConfiguration(_:...)`

Creates options without an app ID, using a local configuration instead. In this mode, data is not uploaded to Embrace servers, so you should provide custom exporters via `EmbraceIO.OTelOptions`.

```swift
class func withLocalConfiguration(
    _ localConfiguration: EmbraceConfigurable = .default,
    platform: Platform = .default,
    captureServices: EmbraceIO.CaptureServicesOptions = .default(),
    crashReporter: CrashReporter? = KSCrashReporter(),
    logLevel: LogLevel = .default,
    otel: EmbraceIO.OTelOptions
) -> EmbraceIO.Options
```

**Note**: The `otel` parameter is required when using local configuration, since you need to provide exporters to handle the generated data.

## Instance Methods and Properties

### Core Functionality

#### `start()`

Starts the Embrace SDK, initiating data collection and session tracking.

```swift
func start() throws
```

**Throws**: An error if not called from the main thread.

**Note**: Won't do anything if the SDK was already started or if it was disabled via remote configurations.

#### `stop()`

Stops the Embrace SDK from capturing and generating data.

```swift
func stop() throws
```

**Throws**: An error if not called from the main thread.

**Important Notes**:

- The SDK cannot be restarted once stopped
- All active spans will be automatically ended
- All capture services and session tracking will be stopped

#### `state`

Returns the current state of the SDK.

```swift
var state: EmbraceSDKState { get }
```

**Returns**: The current SDK state: `.notInitialized`, `.initialized`, `.started`, or `.stopped`.

#### `isSDKEnabled`

Returns true if the SDK is started and was not disabled through remote configurations.

```swift
var isSDKEnabled: Bool { get }
```

#### `logLevel`

Controls the verbosity level of the Embrace SDK console logs.

```swift
var logLevel: LogLevel { get set }
```

#### `sdkVersion`

Returns the version of the Embrace SDK.

```swift
class var sdkVersion: String { get }
```

### Session Management

#### `startNewSession()`

Forces the Embrace SDK to start a new session.

```swift
func startNewSession()
```

**Note**: If there was a session running, it will be ended before starting a new one. Won't do anything if the SDK is stopped.

#### `endCurrentSession()`

Forces the Embrace SDK to stop the current session, if any.

```swift
func endCurrentSession()
```

#### `currentSessionId`

Returns the identifier for the current Embrace session, if any.

```swift
var currentSessionId: String? { get }
```

#### `deviceId`

Returns the identifier used by Embrace for the current device, if any.

```swift
var deviceId: String? { get }
```

#### `resetUploadCache()`

Clears the upload cache data on the next launch.

```swift
func resetUploadCache()
```

### Logging

#### `log(_:severity:type:timestamp:attachment:attributes:stackTraceBehavior:)`

Creates and emits a log for the current session.

```swift
func log(
    _ message: String,
    severity: LogSeverity = .info,
    type: LogType = .message,
    timestamp: Date = Date(),
    attachment: EmbraceLogAttachment? = nil,
    attributes: [String: String] = [:],
    stackTraceBehavior: StackTraceBehavior = .default
) throws
```

**Parameters**:

- `message`: Body of the log.
- `severity`: `LogSeverity` for the log (`.info`, `.warning`, `.error`, etc.). Defaults to `.info`.
- `type`: The type of log. Defaults to `.message`.
- `timestamp`: Timestamp for the log. Defaults to now.
- `attachment`: Optional `EmbraceLogAttachment` to attach data or a URL to the log.
- `attributes`: Optional dictionary of key-value pairs to attach to the log.
- `stackTraceBehavior`: Defines if stack trace information should be added to the log.

**Throws**: `EmbraceOTelError.logLimitReached` if the log limit has been reached for the current session.

### Performance Monitoring

#### `buildSpan(name:type:attributes:autoTerminationCode:)`

Creates a span builder for creating and customizing a performance span.

```swift
func buildSpan(
    name: String,
    type: SpanType = .performance,
    attributes: [String: String] = [:],
    autoTerminationCode: SpanErrorCode? = nil
) -> SpanBuilder?
```

**Parameters**:

- `name`: The name of the span.
- `type`: The type of span. Defaults to `.performance`.
- `attributes`: A dictionary of attributes to set on the span.
- `autoTerminationCode`: `SpanErrorCode` to automatically close the span if the session ends while open.

**Returns**: A `SpanBuilder`, or `nil` if the SDK was not initialized yet.

#### `recordCompletedSpan(...)`

Records a span after the fact with all details.

```swift
func recordCompletedSpan(
    name: String,
    type: SpanType = .performance,
    parent: Span? = nil,
    startTime: Date,
    endTime: Date,
    attributes: [String: String] = [:],
    events: [RecordingSpanEvent] = [],
    errorCode: SpanErrorCode? = nil
)
```

#### `flush(_:)`

Flushes a span to disk, useful for long-running spans.

```swift
func flush(_ span: Span)
```

#### Adding Events to the current Session Span

```swift
// Add a single event to the current session span
func add(event: SpanEvent)

// Add multiple events to the current session span
func add(events: [SpanEvent])
```

### User Identification and Metadata

#### User Properties

Set user information directly on the `EmbraceIO.shared` instance:

```swift
EmbraceIO.shared.userName = "Jane Doe"
EmbraceIO.shared.userEmail = "jane@example.com"
EmbraceIO.shared.userIdentifier = "anon_user_1a2b3c4d"

// Clear all user properties
EmbraceIO.shared.clearUserProperties()
```

**Important**: The `userIdentifier` should be an anonymized identifier. Use hashed values, UUIDs, or other privacy-safe identifiers.

#### Session Properties

```swift
// Set a property (pass nil to remove)
try EmbraceIO.shared.setProperty(
    key: "subscription_tier",
    value: "premium",
    lifespan: .session
)

// Remove all properties
EmbraceIO.shared.removeAllProperties(lifespans: [.session])
```

#### Persona Tags

```swift
// Add a persona tag
try EmbraceIO.shared.addPersona("premium_user", lifespan: .session)

// Remove a persona tag
try EmbraceIO.shared.removePersona("premium_user", lifespan: .session)

// Remove all personas
EmbraceIO.shared.removeAllPersonas(lifespans: [.session])

// Get current personas
EmbraceIO.shared.getCurrentPersonas { personas in
    print("Current personas: \(personas)")
}
```

#### Metadata Lifespans

Properties and persona tags can have different lifespans:

- `.session` - Removed when session ends
- `.process` - Removed when app process ends
- `.permanent` - Persists until app is uninstalled

## Custom OpenTelemetry Resource

:::tip New in v6.16.1
This feature is exclusive to the `EmbraceIO` client and is not available through the legacy `Embrace` client.
:::

You can pass a custom OpenTelemetry `Resource` object when initializing the Embrace SDK. This allows you to attach custom resource attributes to all telemetry data (spans, logs) generated by the SDK. Custom resources take priority over any default resources generated by the Embrace SDK.

### Usage

```swift
import EmbraceIO
import OpenTelemetrySdk

let customResource = Resource(attributes: [
    "service.name": .string("my-ios-app"),
    "deployment.environment": .string("production"),
    "custom.attribute": .string("my-value")
])

let otelOptions = EmbraceIO.OTelOptions(resource: customResource)

let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    otel: otelOptions
)

try EmbraceIO.setup(options: options)
try EmbraceIO.shared.start()
```

### OTelOptions

The `EmbraceIO.OTelOptions` class provides full control over the OpenTelemetry pipeline:

```swift
public init(
    resource: Resource? = nil,
    spanProcessors: [SpanProcessor] = [],
    spanExporter: SpanExporter? = nil,
    logProcessors: [LogRecordProcessor] = [],
    logExporter: LogRecordExporter? = nil
)
```

**Parameters**:

- `resource`: Custom `Resource` to attach to all telemetry data. Takes priority over Embrace-generated resources.
- `spanProcessors`: Custom span processors to add to the pipeline.
- `spanExporter`: Custom span exporter to receive exported span data.
- `logProcessors`: Custom log record processors to add to the pipeline.
- `logExporter`: Custom log record exporter to receive exported log data.

## Code Examples

### Basic Setup and Start

```swift
import EmbraceIO
import SwiftUI

struct MyApp: App {
    init() {
        do {
            let options = EmbraceIO.Options.withAppId("YOUR_APP_ID")
            try EmbraceIO.setup(options: options)
            try EmbraceIO.shared.start()
        } catch {
            print("Error starting Embrace: \(error.localizedDescription)")
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

### Setup with Custom Resource and Capture Services

```swift
import EmbraceIO
import OpenTelemetrySdk

let resource = Resource(attributes: [
    "deployment.environment": .string("staging")
])

let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    captureServices: .default(),
    logLevel: .debug,
    otel: EmbraceIO.OTelOptions(resource: resource)
)

try EmbraceIO.setup(options: options)
try EmbraceIO.shared.start()
```

### Logging and Spans

```swift
// Basic logging
try EmbraceIO.shared.log("User logged in", severity: .info)

// Logging with attributes
try EmbraceIO.shared.log(
    "Network request failed",
    severity: .error,
    attributes: ["url": "https://api.example.com"]
)

// Creating a span
let span = EmbraceIO.shared.buildSpan(
    name: "data-loading",
    type: .performance,
    attributes: ["source": "network"]
)?.startSpan()

// Do work...
span?.end()
```

### Session and User Management

```swift
// Set user info
EmbraceIO.shared.userIdentifier = "anon_user_7f8e9a1b"

// Add session properties
try EmbraceIO.shared.setProperty(
    key: "screen",
    value: "home",
    lifespan: .session
)

// Check SDK state
if EmbraceIO.shared.state == .started {
    print("Session: \(EmbraceIO.shared.currentSessionId ?? "none")")
}

// Manual session control
EmbraceIO.shared.endCurrentSession()
EmbraceIO.shared.startNewSession()
```

**GitHub Source**: [EmbraceIO](https://github.com/embrace-io/embrace-apple-sdk/tree/main/Sources/EmbraceIO)
