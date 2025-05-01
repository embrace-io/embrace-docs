---
title: Utility Classes
description: Reference documentation for Embrace SDK helper classes and utilities
sidebar_position: 5
---

# Utility Classes

The Embrace SDK provides various utility classes to help with common tasks in your application. These utilities make it easier to work with the SDK's core functionality.

## Span Management

### SpanBuilder

The `SpanBuilder` class provides a fluent interface for creating and customizing spans.

```swift
class SpanBuilder {
    func setAttribute(_ key: String, value: Any) -> SpanBuilder
    func setAttributes(_ attributes: [String: Any]) -> SpanBuilder
    func startSpan() -> Span
}
```

**Methods**:
- `setAttribute(_:value:)`: Sets a single attribute on the span.
- `setAttributes(_:)`: Sets multiple attributes on the span.
- `startSpan()`: Creates and starts the span with the configured attributes.

**GitHub Source**: [Embrace Apple SDK Repository](https://github.com/embrace-io/embrace-apple-sdk)

### Span

The `Span` protocol defines the interface for working with spans.

```swift
protocol Span {
    var name: String { get }
    var type: SpanType { get }
    var traceId: String? { get }
    var spanId: String? { get }
    var startTime: Date { get }
    var endTime: Date? { get }
    
    func setAttribute(_ key: String, value: Any)
    func end(at time: Date?)
    func addEvent(_ name: String, attributes: [String: String]?)
}
```

**Methods**:
- `setAttribute(_:value:)`: Sets a single attribute on the span.
- `end(at:)`: Ends the span, optionally at a specific time.
- `addEvent(_:attributes:)`: Adds an event to the span with optional attributes.

### SpanType

Enum defining different types of spans.

```swift
enum SpanType {
    case performance
    case network
    case view
    case resource
    case error
    case crash
    case custom(String)
}
```

## Logging

### LogSeverity

Enum defining severity levels for logs.

```swift
enum LogSeverity: String {
    case info
    case warning
    case error
}
```

### EmbraceLog

Interface for working with logs created by the SDK.

```swift
protocol EmbraceLog {
    var message: String { get }
    var severity: LogSeverity { get }
    var timestamp: Date { get }
    var properties: [String: String]? { get }
}
```

## Session Utilities

### SessionSpanUtils

Utility for working with session spans.

```swift
class SessionSpanUtils {
    static func getSessionId(from span: Span) -> String?
    static func setSessionId(_ sessionId: String, on span: Span)
    static func getSessionProperties(from span: Span) -> [String: String]?
}
```

**Methods**:
- `getSessionId(from:)`: Extracts the session ID from a span.
- `setSessionId(_:on:)`: Sets the session ID on a span.
- `getSessionProperties(from:)`: Gets the session properties from a span.

## Network Utilities

### HeaderFilterKeys

Configuration for filtering HTTP headers.

```swift
struct HeaderFilterKeys {
    init(
        requestHeadersBlocklist: [String] = [],
        responseHeadersBlocklist: [String] = []
    )
}
```

**Parameters**:
- `requestHeadersBlocklist`: List of request header keys to block from capture.
- `responseHeadersBlocklist`: List of response header keys to block from capture.

## OpenTelemetry Integration

### OpenTelemetryExport

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
- `spanExporter`: Exporter for OpenTelemetry spans.
- `logExporter`: Exporter for OpenTelemetry logs.

## Crash Reporting

### CrashReporter

Protocol for crash reporters.

```swift
protocol CrashReporter {
    func install() -> Bool
    func updateAppState(_ state: AppState)
    func updateAttributes(_ attributes: [String: String])
}
```

**Methods**:
- `install()`: Installs the crash reporter.
- `updateAppState(_:)`: Updates the app state in the crash reporter.
- `updateAttributes(_:)`: Updates custom attributes in the crash reporter.

### EmbraceCrashReporter

Default implementation of the CrashReporter protocol.

```swift
class EmbraceCrashReporter: CrashReporter {
    init()
    func install() -> Bool
    func updateAppState(_ state: AppState)
    func updateAttributes(_ attributes: [String: String])
}
```

## Symbolic Upload Utilities

Utilities for working with debug symbols.

### SymbolUpload

```swift
struct SymbolUpload {
    static func uploadSymbols(
        appId: String,
        token: String,
        dsymURLs: [URL],
        baseURL: URL? = nil,
        completion: ((Result<Void, Error>) -> Void)? = nil
    )
}
```

**Methods**:
- `uploadSymbols(appId:token:dsymURLs:baseURL:completion:)`: Uploads debug symbols to the Embrace backend.

## Code Examples

### Working with Spans

```swift
// Create and customize a span
let span = Embrace.client?.buildSpan(name: "checkout-process", type: .performance)
    .setAttribute("order_id", value: orderId)
    .setAttribute("total_amount", value: totalAmount)
    .startSpan()

// Perform the work
performCheckoutProcess()

// Add events during the span
span?.addEvent("payment-started", attributes: ["payment_provider": "stripe"])

// End the span when complete
span?.end()
```

### Creating and Managing Logs

```swift
// Log an informational message
Embrace.client?.logMessage(
    "User completed checkout",
    severity: .info,
    properties: [
        "order_id": orderId,
        "user_id": userId
    ]
)

// Log an error
do {
    try performRiskyOperation()
} catch let error {
    Embrace.client?.logError(
        error,
        properties: [
            "operation": "risky-operation",
            "context": "checkout-flow"
        ]
    )
}
```

### Custom Network Header Filtering

```swift
let networkOptions = NetworkCaptureServiceOptions(
    captureRequestHeaders: true,
    captureResponseHeaders: true,
    headerKeys: .init(
        requestHeadersBlocklist: ["Authorization", "X-API-Key", "Cookie"],
        responseHeadersBlocklist: ["Set-Cookie"]
    ),
    requestHeaderFilter: { request in
        // Custom filtering logic for headers
        var safeHeaders: [String: String] = [:]
        request.allHTTPHeaderFields?.forEach { key, value in
            if key.contains("Token") || key.contains("Auth") {
                // Redact sensitive headers
                safeHeaders[key] = "***REDACTED***"
            } else {
                safeHeaders[key] = value
            }
        }
        return safeHeaders
    }
)
```

### Uploading Debug Symbols

```swift
// Find dSYM files
let dsymPaths: [URL] = findDsymFiles()

// Upload symbols to Embrace
SymbolUpload.uploadSymbols(
    appId: "YOUR_APP_ID",
    token: "YOUR_TOKEN",
    dsymURLs: dsymPaths
) { result in
    switch result {
    case .success:
        print("Successfully uploaded debug symbols")
    case .failure(let error):
        print("Failed to upload debug symbols: \(error)")
    }
}
```

TODO: Add examples for OpenTelemetry export configuration. 