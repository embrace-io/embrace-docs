---
title: EmbraceIO Client
description: Reference documentation for the EmbraceIO client, the main entry point for the Embrace SDK
sidebar_position: 1
---

## EmbraceIO Client

The `EmbraceIO` class is the main entry point for interacting with the Embrace SDK. It provides a simplified and streamlined API for configuring, starting, and interacting with the SDK.

:::info
In Embrace 7.x, `EmbraceIO` is the single public client. The `Embrace` client and `Embrace.Options` are no longer part of the public API — see the [Embrace Client](./embrace-client.md) page for details.
:::

### Configuration and Initialization

#### `start(options:)`

Configures and starts the Embrace SDK in a single step.

```swift
static func start(options: EmbraceIO.Options) throws
```

**Parameters**:

- `options`: An instance of `EmbraceIO.Options` that configures the SDK.

**Throws**: An error if the SDK cannot be initialized or started properly.

**Important Notes**:

- Must be called from the main thread.
- There is no longer a separate `setup(options:)` / `start()` sequence — `start(options:)` configures and starts the SDK in one call.
- Won't do anything if the SDK was already started, or if it was disabled via remote configuration.

#### `shared`

Provides access to the singleton instance of the `EmbraceIO` class.

```swift
static let shared: EmbraceIO
```

**Note**: Instance APIs are accessed through `EmbraceIO.shared` after calling `start(options:)`.

### Creating Options

`EmbraceIO.Options` is created using factory methods rather than direct initialization. For full details on every option, see [Configuration](./configuration.md).

#### `Options.withAppId(_:...)`

Creates options for use with an Embrace app ID. This is the configuration you use if sending data to Embrace's backend.

```swift
class func withAppId(
    _ appId: String,
    platform: EmbracePlatform = .default,
    endpoints: EmbraceEndpoints? = nil,
    captureServices: EmbraceIO.CaptureServicesOptions = .default(),
    crashReporter: EmbraceIO.CrashReporter = .embrace,
    logLevel: EmbraceLogLevel = .default,
    otel: EmbraceIO.OTelOptions? = nil
) -> EmbraceIO.Options
```

**Parameters**:

- `appId`: The app ID for your Embrace app.
- `platform`: The platform the app runs on. Defaults to `.default` (iOS).
- `endpoints`: Custom `EmbraceEndpoints`. Defaults to Embrace endpoints for the given app ID.
- `captureServices`: Determines which capture services will be installed. See [Capture Services](./capture-services.md).
- `crashReporter`: The crash reporter to use: `.embrace` (default), `.crashlytics`, or `.none`.
- `logLevel`: Verbosity level for console logs. Defaults to `.default`.
- `otel`: Optional `EmbraceIO.OTelOptions` to configure the OpenTelemetry SDK. See [Custom OpenTelemetry Resource](#custom-opentelemetry-resource).

#### `Options.withLocalConfiguration(_:...)`

Creates options without an app ID, using a local configuration instead. In this mode, data is not uploaded to Embrace servers, so you must provide custom exporters via `EmbraceIO.OTelOptions`.

```swift
class func withLocalConfiguration(
    _ localConfiguration: EmbraceConfigurable = .default,
    platform: EmbracePlatform = .default,
    captureServices: EmbraceIO.CaptureServicesOptions = .default(),
    crashReporter: EmbraceIO.CrashReporter = .embrace,
    logLevel: EmbraceLogLevel = .default,
    otel: EmbraceIO.OTelOptions
) -> EmbraceIO.Options
```

**Note**: The `otel` parameter is required when using local configuration, since you need to provide exporters to handle the generated data.

### Instance Methods and Properties

#### Core Functionality

##### `stop()`

Stops the Embrace SDK from capturing and generating data.

```swift
func stop() throws
```

**Throws**: An error if not called from the main thread.

**Important Notes**:

- The SDK cannot be restarted in a process once stopped.
- All active spans will be automatically ended.
- All capture services and session tracking will be stopped.

##### `state`

Returns the current state of the SDK.

```swift
var state: EmbraceSDKState { get }
```

**Returns**: The current SDK state: `.notInitialized`, `.started`, or `.stopped`.

##### `isSDKEnabled`

Returns true if the SDK is started and was not disabled through remote configurations.

```swift
var isSDKEnabled: Bool { get }
```

##### `sdkVersion`

Returns the version of the Embrace SDK.

```swift
class var sdkVersion: String { get }
```

#### Session Management

##### `endUserSession()`

Ends the current user session and immediately starts a new one in the same foreground/background state.

```swift
func endUserSession()
```

**Note**: This replaces the previous `startNewSession()` / `endCurrentSession()` pair. It is rate-limited to once every 5 seconds.

##### `currentUserSessionId`

Returns the identifier for the current Embrace user session, if any.

```swift
var currentUserSessionId: String? { get }
```

##### `deviceId`

Returns the identifier used by Embrace for the current device, if any.

```swift
var deviceId: String? { get }
```

#### Logging

##### `log(_:severity:timestamp:attachment:attributes:stackTraceBehavior:)`

Creates and emits a log for the current session.

```swift
func log(
    _ message: String,
    severity: EmbraceLogSeverity = .info,
    timestamp: Date = Date(),
    attachment: EmbraceLogAttachment? = nil,
    attributes: EmbraceAttributes = [:],
    stackTraceBehavior: EmbraceStackTraceBehavior = .default
)
```

**Parameters**:

- `message`: Body of the log.
- `severity`: `EmbraceLogSeverity` for the log (`.trace`, `.debug`, `.info`, `.warn`, `.error`, `.fatal`, `.critical`). Defaults to `.info`.
- `timestamp`: Timestamp for the log. Defaults to now.
- `attachment`: Optional `EmbraceLogAttachment` to attach data or a URL to the log.
- `attributes`: Optional `EmbraceAttributes` (accepts `String`, `Int`, `Double`, or `Bool` values) to attach to the log.
- `stackTraceBehavior`: Defines if stack trace information should be added to the log.

##### `addBreadcrumb(_:attributes:)`

Adds a breadcrumb to the current session.

```swift
func addBreadcrumb(_ message: String, attributes: EmbraceAttributes = [:])
```

#### Performance Monitoring

##### `createSpan(...)`

Creates and starts a span, returning an `EmbraceSpan?`.

```swift
func createSpan(
    name: String,
    parentSpan: EmbraceSpan? = nil,
    type: EmbraceType = .performance,
    status: EmbraceSpanStatus = .unset,
    startTime: Date = Date(),
    endTime: Date? = nil,
    events: [EmbraceSpanEvent] = [],
    links: [EmbraceSpanLink] = [],
    attributes: EmbraceAttributes = [:],
    autoTerminationCode: EmbraceSpanErrorCode? = nil
) -> EmbraceSpan?
```

**Parameters**:

- `name`: The name of the span.
- `parentSpan`: The parent `EmbraceSpan`, if this span is a child.
- `type`: The type of span. Defaults to `.performance`.
- `status`: The initial span status. Defaults to `.unset`.
- `startTime` / `endTime`: Optional custom start and end times.
- `events`: Events to attach to the span.
- `links`: Links to other spans.
- `attributes`: A dictionary of attributes to set on the span.
- `autoTerminationCode`: `EmbraceSpanErrorCode` to automatically close the span if the session ends while it is still open.

**Returns**: An `EmbraceSpan`, or `nil` if the SDK was not initialized yet.

##### `addSessionEvent(name:attributes:)`

Adds an event to the current session span.

```swift
// Add an event by name
func addSessionEvent(name: String, attributes: EmbraceAttributes = [:])

// Add a previously built event
func addSessionEvent(_ event: EmbraceSpanEvent)
```

#### User Identification and Metadata

##### User Properties

Set the user identifier directly on the `EmbraceIO.shared` instance:

```swift
EmbraceIO.shared.userIdentifier = "anon_user_1a2b3c4d"

// Clear the user identifier
EmbraceIO.shared.userIdentifier = nil
```

**Important**: The `userIdentifier` should be an anonymized identifier. Use hashed values, UUIDs, or other privacy-safe identifiers.

##### Session Properties

```swift
// Set a property (pass value: nil to remove)
EmbraceIO.shared.setProperty(
    key: "subscription_tier",
    value: "premium",
    lifespan: .session
)

// Remove all properties
EmbraceIO.shared.removeAllProperties(lifespans: [.session])
```

##### Personas

```swift
// Add a persona
EmbraceIO.shared.addPersona("premium_user", lifespan: .session)

// Remove a persona
EmbraceIO.shared.removePersona("premium_user", lifespan: .session)

// Remove all personas
EmbraceIO.shared.removeAllPersonas(lifespans: [.session])

// Get current personas
EmbraceIO.shared.getCurrentPersonas { personas in
    print("Current personas: \(personas)")
}
```

##### Metadata Lifespans

Properties and personas can have different lifespans:

- `.session` - Removed when session ends
- `.process` - Removed when app process ends
- `.permanent` - Persists until app is uninstalled

### Custom OpenTelemetry Resource

You can pass a custom OpenTelemetry `Resource` object when initializing the Embrace SDK. This allows you to attach custom resource attributes to all telemetry data (spans, logs) generated by the SDK. Custom resources take priority over any default resources generated by the Embrace SDK.

#### Usage

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

try EmbraceIO.start(options: options)
```

#### OTelOptions

The `EmbraceIO.OTelOptions` class provides full control over the OpenTelemetry pipeline:

```swift
public init(
    resource: Resource? = nil,
    spanProcessors: [SpanProcessor] = [],
    spanExporters: [SpanExporter] = [],
    logProcessors: [LogRecordProcessor] = [],
    logExporters: [LogRecordExporter] = []
)
```

**Parameters**:

- `resource`: Custom `Resource` to attach to all telemetry data. Takes priority over Embrace-generated resources.
- `spanProcessors`: Custom span processors to add to the pipeline.
- `spanExporters`: Custom span exporters to receive exported span data.
- `logProcessors`: Custom log record processors to add to the pipeline.
- `logExporters`: Custom log record exporters to receive exported log data.

### Code Examples

#### Basic Setup and Start

```swift
import EmbraceIO
import SwiftUI

struct MyApp: App {
    init() {
        do {
            try EmbraceIO.start(options: EmbraceIO.Options.withAppId("YOUR_APP_ID"))
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

#### Setup with Custom Resource and Capture Services

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

try EmbraceIO.start(options: options)
```

#### Logging and Spans

```swift
// Basic logging
EmbraceIO.shared.log("User logged in", severity: .info)

// Logging with attributes
EmbraceIO.shared.log(
    "Network request failed",
    severity: .error,
    attributes: ["url": "https://api.example.com"]
)

// Creating a span
let span = EmbraceIO.shared.createSpan(
    name: "data-loading",
    type: .performance,
    attributes: ["source": "network"]
)

// Do work...
span?.end()
```

#### Session and User Management

```swift
// Set user info
EmbraceIO.shared.userIdentifier = "anon_user_7f8e9a1b"

// Add session properties
EmbraceIO.shared.setProperty(
    key: "screen",
    value: "home",
    lifespan: .session
)

// Check SDK state
if EmbraceIO.shared.state == .started {
    print("Session: \(EmbraceIO.shared.currentUserSessionId ?? "none")")
}

// End the current user session and start a new one
EmbraceIO.shared.endUserSession()
```

**GitHub Source**: [EmbraceIO](https://github.com/embrace-io/embrace-apple-sdk/tree/main/Sources/EmbraceIO)
