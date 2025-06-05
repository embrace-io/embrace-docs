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

#### `isStarted()`

Checks if the Embrace SDK has been successfully started.

```swift
var started: Bool { get }
```

**Returns**: `true` if the SDK has been started, `false` otherwise.

### Session Management

#### `endSession(clearUserInfo:)`

Ends the current session.

```swift
func endSession(clearUserInfo: Bool) -> Bool
```

**Parameters**:
- `clearUserInfo`: If `true`, clears any user information that has been set.

**Returns**: `true` if a session was successfully ended, `false` otherwise.

### Logging

#### `logMessage(_:severity:properties:)`

Logs a message with the specified severity level and optional properties.

```swift
func logMessage(_ message: String, severity: LogSeverity, properties: [String: String]?) -> EmbraceLog?
```

**Parameters**:
- `message`: The message to log.
- `severity`: The severity level of the log, one of `LogSeverity` values.
- `properties`: Optional dictionary of key-value pairs to attach to the log.

**Returns**: An `EmbraceLog` object representing the log, or `nil` if the log could not be created.

### Error Handling

#### `logError(_:properties:)`

Logs an error with optional properties.

```swift
func logError(_ error: Error, properties: [String: String]?) -> EmbraceLog?
```

**Parameters**:
- `error`: The error to log.
- `properties`: Optional dictionary of key-value pairs to attach to the log.

**Returns**: An `EmbraceLog` object representing the log, or `nil` if the log could not be created.

### Performance Monitoring

#### `buildSpan(name:type:)`

Creates a span builder for creating and customizing a performance span.

```swift
func buildSpan(name: String, type: SpanType) -> SpanBuilder
```

**Parameters**:
- `name`: The name of the span.
- `type`: The type of span, one of `SpanType` values.

**Returns**: A `SpanBuilder` that can be used to customize and start the span.

#### `startSpan(name:type:)`

Creates and starts a new span with the given name and type.

```swift
func startSpan(name: String, type: SpanType, attributes: [String: Any]?) -> Span?
```

**Parameters**:
- `name`: The name of the span.
- `type`: The type of the span, one of `SpanType` values.
- `attributes`: Optional attributes to attach to the span.

**Returns**: A `Span` object representing the started span, or `nil` if the span could not be created.

### User Identification

#### `setUserIdentifier(_:)`

Sets the user identifier for the current session.

```swift
func setUserIdentifier(_ identifier: String)
```

**Parameters**:
- `identifier`: A unique identifier for the user.

#### `setUserEmail(_:)`

Sets the user's email address for the current session.

```swift
func setUserEmail(_ email: String)
```

**Parameters**:
- `email`: The user's email address.

#### `setUsername(_:)`

Sets the username for the current session.

```swift
func setUsername(_ username: String)
```

**Parameters**:
- `username`: The username to set.

#### `clearUserInfo()`

Clears all user information that has been set.

```swift
func clearUserInfo()
```

### Custom Properties

#### `addSessionProperty(_:value:permanent:)`

Adds a custom property to the current session.

```swift
func addSessionProperty(_ key: String, value: String, permanent: Bool) -> Bool
```

**Parameters**:
- `key`: The key for the property.
- `value`: The value of the property.
- `permanent`: If `true`, the property will persist across sessions.

**Returns**: `true` if the property was added successfully, `false` otherwise.

#### `removeSessionProperty(_:)`

Removes a custom property from the current session.

```swift
func removeSessionProperty(_ key: String) -> Bool
```

**Parameters**:
- `key`: The key of the property to remove.

**Returns**: `true` if the property was removed successfully, `false` otherwise.

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
embrace?.logMessage("App started successfully", severity: .info, properties: nil)
```

#### Creating and Using Spans

```swift
// Create and start a span
if let span = Embrace.client?.startSpan(name: "data-loading", type: .performance) {
    // Do some work

    // End the span when work is complete
    span.end()
}

// Alternative builder pattern
Embrace.client?.buildSpan(name: "complex-operation", type: .performance)
    .setAttribute("custom-key", value: "custom-value")
    .startSpan()
    .end()
```

<!-- TODO: Add examples for other methods including user identification, session properties, and logging.  -->