---
title: Embrace Client
description: Reference documentation for the Embrace client main interface
sidebar_position: 2
---

# Embrace Client

The `Embrace` class is the main interface for interacting with the Embrace SDK. It provides methods to configure, start, and interact with the SDK.

## Setup and Initialization

### Static Methods

#### `setup(options:)`

Sets up the Embrace SDK with the provided options.

```swift
static func setup(options: Embrace.Options) throws -> Embrace
```

**Parameters**:
- `options`: An instance of `Embrace.Options` that configures the SDK.

**Returns**: An instance of `Embrace` that can be used to start the SDK and interact with it.

**Throws**: An error if the SDK cannot be initialized properly, typically due to storage issues.

**GitHub Source**: [EmbraceCore/Embrace.swift](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Embrace.swift)

#### `client`

Provides access to the singleton instance of the `Embrace` class after it has been set up.

```swift
static var client: Embrace?
```

## Instance Methods

### Core Functionality

#### `start()`

Starts the Embrace SDK, initiating data collection and session tracking.

```swift
func start() throws -> Embrace
```

**Returns**: The same `Embrace` instance for method chaining.

**Throws**: An error if the SDK cannot be started properly.

#### `stop()`

Stops the Embrace SDK from capturing and generating data.

```swift
func stop() throws -> Embrace
```

**Returns**: The same `Embrace` instance for method chaining.

**Throws**: An error if the method is not called from the main thread.

**Important Notes**:
- Must be called from the main thread
- The SDK cannot be restarted once stopped
- All active spans will be automatically ended
- All capture services and session tracking will be stopped
- This method is typically used when users opt out of monitoring
- Won't do anything if the SDK was already stopped

**Example**:

```swift
// Stop the SDK (e.g., user opted out)
try Embrace.client?.stop()

// Check that SDK is stopped
if Embrace.client?.state == .stopped {
    print("Embrace SDK has been stopped")
}
```

#### `state`

Returns the current state of the SDK.

```swift
var state: EmbraceSDKState { get }
```

**Returns**: The current SDK state, which can be:
- `.notInitialized` - SDK hasn't been set up yet
- `.initialized` - SDK is set up but not started
- `.started` - SDK is running and collecting data
- `.stopped` - SDK has been stopped

#### `started` (Deprecated)

```swift
@available(*, deprecated, message: "Use `state` instead.")
var started: Bool { get }
```

**Returns**: `true` if the SDK has been started, `false` otherwise.

**Note**: This property is deprecated. Use the `state` property instead for more detailed status information.

#### `isSDKEnabled`

Returns true if the SDK is started and was not disabled through remote configurations.

```swift
var isSDKEnabled: Bool { get }
```

**Returns**: `true` if the SDK is enabled and operational, `false` otherwise.

### Session Management

#### `startNewSession()`

Forces the Embrace SDK to start a new session.

```swift
func startNewSession()
```

**Note**: If there was a session running, it will be ended before starting a new one. This method won't do anything if the SDK is stopped.

#### `endCurrentSession()`

Forces the Embrace SDK to stop the current session, if any.

```swift
func endCurrentSession()
```

**Note**: This method won't do anything if the SDK is stopped.

#### `currentSessionId()`

Returns the current session identifier, if any.

```swift
func currentSessionId() -> String?
```

**Returns**: The current session ID as a string, or `nil` if no session is active or SDK is not enabled.

#### `currentDeviceId()`

Returns the current device identifier.

```swift
func currentDeviceId() -> String?
```

**Returns**: The device ID as a hex string.

### Logging

#### `log(_:severity:type:attributes:stackTraceBehavior:)`

Creates and adds a log for the current session.

```swift
func log(
    _ message: String,
    severity: LogSeverity,
    type: LogType = .message,
    attributes: [String: String] = [:],
    stackTraceBehavior: StackTraceBehavior = .default
)
```

**Parameters**:
- `message`: Body of the log.
- `severity`: `LogSeverity` for the log (`.info`, `.warning`, `.error`, etc.).
- `type`: The type of log (defaults to `.message`).
- `attributes`: Optional dictionary of key-value pairs to attach to the log.
- `stackTraceBehavior`: Defines if stack trace information should be added to the log. Available options:
  - `.default` - Uses the default behavior (captures stack traces for `.warning` and `.error` logs)
  - `.notIncluded` - Stack traces are not automatically captured
  - `.custom(EmbraceStackTrace)` - Uses a custom stack trace provided

**Note**: Only `warn` and `error` logs will have stack traces.

#### Log with Timestamp

```swift
func log(
    _ message: String,
    severity: LogSeverity,
    type: LogType = .message,
    timestamp: Date,
    attributes: [String: String] = [:],
    stackTraceBehavior: StackTraceBehavior = .default
)
```

#### Log with Data Attachment

```swift
func log(
    _ message: String,
    severity: LogSeverity,
    type: LogType = .message,
    timestamp: Date = Date(),
    attachment: Data,
    attributes: [String: String] = [:],
    stackTraceBehavior: StackTraceBehavior = .default
)
```

#### Log with External Attachment

```swift
func log(
    _ message: String,
    severity: LogSeverity,
    type: LogType = .message,
    timestamp: Date = Date(),
    attachmentId: String,
    attachmentUrl: URL,
    attributes: [String: String],
    stackTraceBehavior: StackTraceBehavior = .default
)
```

#### Log Severity Levels

- `.trace` - Detailed diagnostic information
- `.debug` - Debug information
- `.info` - General information
- `.warning` - Warning conditions
- `.error` - Error conditions

#### Stack Trace Behavior Examples

```swift
// Default behavior - automatically captures stack traces for warning and error logs
Embrace.client?.log("Something went wrong", severity: .error)

// Explicitly disable stack trace capture
Embrace.client?.log(
    "Debug message", 
    severity: .debug, 
    stackTraceBehavior: .notIncluded
)

// Use custom stack trace
let customTrace = EmbraceStackTrace(/* custom trace data */)
Embrace.client?.log(
    "Custom trace log", 
    severity: .info, 
    stackTraceBehavior: .custom(customTrace)
)
```

### Performance Monitoring

#### `buildSpan(name:type:attributes:autoTerminationCode:)`

Creates a span builder for creating and customizing a performance span.

```swift
func buildSpan(
    name: String,
    type: SpanType = .performance,
    attributes: [String: String] = [:],
    autoTerminationCode: SpanErrorCode? = nil
) -> SpanBuilder
```

**Parameters**:
- `name`: The name of the span.
- `type`: The type of span (defaults to `.performance`).
- `attributes`: A dictionary of attributes to set on the span.
- `autoTerminationCode`: `SpanErrorCode` to automatically close the span if the session ends while open.

**Returns**: A `SpanBuilder` that can be used to customize and start the span.

#### `recordSpan(name:parent:type:attributes:block:)`

Starts a span and executes a block. The span is automatically ended when the block returns.

```swift
static func recordSpan<T>(
    name: String,
    parent: Span? = nil,
    type: SpanType = .performance,
    attributes: [String: String] = [:],
    block: (Span?) throws -> T
) rethrows -> T
```

**Parameters**:
- `name`: The name of the span.
- `parent`: The parent `Span`, if this span is a child.
- `type`: The type of the span.
- `attributes`: A dictionary of attributes to set on the span.
- `block`: The block to execute, receives a `Span` as an argument.

**Returns**: The result of the block.

**Note**: This static method validates the presence of the Embrace client and will call the block with a nil span if the client is not present, ensuring the block always executes.

#### `recordCompletedSpan(...)`

Records a span after the fact with all details.

```swift
func recordCompletedSpan(
    name: String,
    type: SpanType,
    parent: Span?,
    startTime: Date,
    endTime: Date,
    attributes: [String: String],
    events: [RecordingSpanEvent],
    errorCode: SpanErrorCode?
)
```

#### `flush(_:)`

Flushes a span to disk, useful for long-running spans.

```swift
func flush(_ span: Span)
```

**Parameters**:
- `span`: A `Span` object that implements `ReadableSpan`.

#### Adding Events to Spans

```swift
// Add single event to current session span
func add(event: SpanEvent)

// Add multiple events to current session span  
func add(events: [SpanEvent])
```

### User Identification and Metadata

User identification and session properties are managed through the `metadata` property, which provides access to a `MetadataHandler` instance.

#### Accessing the Metadata Handler

```swift
let metadata = Embrace.client?.metadata
```

#### User Properties

Set user information using the metadata handler's properties:

```swift
// Set user identifier (should be an anonymized ID, not account info)
// Use hashed values, UUIDs, or other anonymized identifiers
Embrace.client?.metadata.userIdentifier = "anon_user_1a2b3c4d"

// Clear all user properties
Embrace.client?.metadata.clearUserProperties()
```

**Important**: The `userIdentifier` should be an anonymized identifier that doesn't represent actual account information for the app user. Use hashed values, UUIDs, or other privacy-safe identifiers that allow you to track users without exposing personal information.

#### Session Properties

Add custom properties to sessions using the metadata handler:

```swift
// Add a session property
try Embrace.client?.metadata.addProperty(
    key: "subscription_tier", 
    value: "premium", 
    lifespan: .session
)

// Update a property
try Embrace.client?.metadata.updateProperty(
    key: "subscription_tier", 
    value: "basic", 
    lifespan: .session
)

// Remove a property
try Embrace.client?.metadata.removeProperty(
    key: "subscription_tier", 
    lifespan: .session
)
```

#### Metadata Lifespans

Properties can have different lifespans:

- `.session` - Removed when session ends (default)
- `.process` - Removed when app process ends
- `.permanent` - Persists until app is uninstalled

#### Resources

Similar to properties, but stored separately:

```swift
// Add a resource
try Embrace.client?.metadata.addResource(
    key: "app_version", 
    value: "1.2.3", 
    lifespan: .process
)
```

#### Persona Tags

Add persona tags to categorize users:

```swift
// Add a persona tag
try Embrace.client?.metadata.add(
    persona: PersonaTag("premium_user"), 
    lifespan: .session
)

// Get current personas (async)
Embrace.client?.metadata.getCurrentPersonas { personas in
    print("Current personas: \(personas)")
}
```

### Code Examples

#### Basic Setup and Start

```swift
import EmbraceIO
import SwiftUI

struct NewEmbraceApp: App {
    init() {
        do {
            try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: "YOUR_APP_ID"
                        // Other configuration options
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

#### Accessing the Client Instance

```swift
// After setup and start
let embrace = Embrace.client
embrace?.log("App started successfully", severity: .info)
```

#### Creating and Using Spans

```swift
// Using the static recordSpan method (recommended)
Embrace.recordSpan(name: "data-loading", type: .performance) { span in
    // Do some work
    span?.setAttribute(key: "custom-key", value: "custom-value")
    // Span is automatically ended when block returns
}

// Alternative builder pattern
let span = Embrace.client?.buildSpan(
    name: "complex-operation", 
    type: .performance,
    attributes: ["operation": "data-sync"]
).startSpan()

// Do work...
span?.end()
```

#### Logging Examples

```swift
// Basic logging
Embrace.client?.log("User logged in", severity: .info)

// Logging with attributes
Embrace.client?.log(
    "Network request failed", 
    severity: .error,
    attributes: ["url": "https://api.example.com"]
)

// Logging with attachment
let jsonData = try JSONSerialization.data(withJSONObject: ["key": "value"])
Embrace.client?.log(
    "Debug data attached",
    severity: .debug,
    attachment: jsonData
)
```

#### User Identification Examples

```swift
// Set anonymized user identifier
Embrace.client?.metadata.userIdentifier = "anon_user_7f8e9a1b"

// Add session properties
try Embrace.client?.metadata.addProperty(
    key: "subscription_tier",
    value: "premium",
    lifespan: .session
)

// Add persona tags
try Embrace.client?.metadata.add(
    persona: PersonaTag("beta_user"),
    lifespan: .process
)
```

#### Session Management Examples

```swift
// Check SDK state
switch Embrace.client?.state {
case .started:
    print("SDK is running")
    // Get current session ID
    if let sessionId = Embrace.client?.currentSessionId() {
        print("Current session: \(sessionId)")
    }
case .initialized:
    print("SDK is initialized but not started")
case .notInitialized, nil:
    print("SDK not initialized")
case .stopped:
    print("SDK has been stopped")
}

// Manual session control
Embrace.client?.endCurrentSession()
Embrace.client?.startNewSession()
// Stop the SDK entirely (cannot be restarted)
try Embrace.client?.stop()
```
