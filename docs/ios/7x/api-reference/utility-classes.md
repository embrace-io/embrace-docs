---
title: Utility Classes
description: Reference documentation for Embrace SDK helper classes and utilities
sidebar_position: 5
---

## Utility Classes

The Embrace SDK provides various utility classes and types to help with common tasks in your application. These utilities make it easier to work with the SDK's core functionality.

### Span Management

Spans are created directly through `EmbraceIO.shared.createSpan(...)`, which returns an `EmbraceSpan?`. See the [EmbraceIO Client](./embraceio-client.md#createspan) reference for the full `createSpan` signature.

#### EmbraceSpan

The `EmbraceSpan` protocol defines the interface for working with spans.

```swift
protocol EmbraceSpan {
    var name: String { get }
    var type: EmbraceType { get }
    var traceId: String? { get }
    var spanId: String? { get }
    var startTime: Date { get }
    var endTime: Date? { get }

    func setAttribute(key: String, value: EmbraceAttributeValue?)
    func addEvent(name: String, attributes: EmbraceAttributes)
    func setStatus(_ status: EmbraceSpanStatus)
    func end()
    func end(endTime: Date)
    func end(errorCode: EmbraceSpanErrorCode?, endTime: Date)
}
```

**Methods**:

- `setAttribute(key:value:)`: Sets a single attribute on the span. `value` accepts `String`, `Int`, `Double`, or `Bool`, or `nil` to remove.
- `addEvent(name:attributes:)`: Adds an event to the span. The `attributes` argument is required (pass `[:]` for none).
- `setStatus(_:)`: Sets the span status (see `EmbraceSpanStatus`).
- `end()` / `end(endTime:)`: Ends the span, optionally at a specific time.
- `end(errorCode:endTime:)`: Ends the span with an `EmbraceSpanErrorCode` (`.failure`, `.userAbandon`, `.unknown`), which marks the span's status as `.error`. Both arguments have defaults.

#### EmbraceType

Enum defining the type of a span or log.

```swift
enum EmbraceType {
    case performance
    case ux
    case system
    case message
    // ... additional cases
}
```

- `.performance`, `.ux`, `.system`: Used when creating spans.
- `.message`: Default type used for logs.

#### EmbraceSpanStatus

Enum defining the status of a span.

```swift
enum EmbraceSpanStatus {
    case unset
    case ok
    case error
}
```

#### EmbraceSpanErrorCode

Enum defining error codes, used with `autoTerminationCode:` when creating a span.

```swift
enum EmbraceSpanErrorCode {
    case failure
    case userAbandon
    case unknown
}
```

#### EmbraceSpanEvent

Represents an event that can be attached to a span or added to the current session span via `addSessionEvent(_:)`.

```swift
struct EmbraceSpanEvent {
    init(
        name: String,
        timestamp: Date = Date(),
        attributes: EmbraceAttributes = [:]
    )
}
```

### Logging

#### EmbraceLogSeverity

Enum defining severity levels for logs.

```swift
enum EmbraceLogSeverity {
    case trace
    case debug
    case info
    case warn
    case error
    case fatal
    case critical
}
```

#### EmbraceLog

Interface for working with logs created by the SDK.

```swift
protocol EmbraceLog {
    var message: String { get }
    var severity: EmbraceLogSeverity { get }
    var timestamp: Date { get }
    var attributes: EmbraceAttributes { get }
}
```

### Attributes

#### EmbraceAttributes

Attributes attached to spans, logs, and events are represented as `EmbraceAttributes`, a dictionary of `[String: EmbraceAttributeValue]`. `EmbraceAttributeValue` accepts `String`, `Int`, `Double`, and `Bool` literals.

```swift
typealias EmbraceAttributes = [String: EmbraceAttributeValue]
```

### Metadata

#### MetadataLifespan

Enum defining how long a property or persona persists.

```swift
enum MetadataLifespan {
    case session
    case process
    case permanent
}
```

- `.session`: Removed when the session ends.
- `.process`: Removed when the app process ends.
- `.permanent`: Persists until the app is uninstalled.

### Network Utilities

#### URLSessionRequestsDataSource

Protocol used to modify captured `URLSession` requests before they are recorded by the `URLSessionCaptureService`. Assign an implementation to `URLSessionCaptureService.Options.requestsDataSource` to redact or obfuscate sensitive data such as authorization headers or query parameters. This only affects the data captured by Embrace and does not modify the original request your app sends.

```swift
protocol URLSessionRequestsDataSource {
    func modifiedRequest(for request: URLRequest) -> URLRequest
}
```

### OpenTelemetry Integration

#### EmbraceIO.OTelOptions

Configuration for the OpenTelemetry pipeline, including custom exporters, processors, and resource. Custom `SpanExporter` / `LogRecordExporter` implementations still come from `import OpenTelemetrySdk`.

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

- `resource`: Custom `Resource` to attach to all telemetry data.
- `spanProcessors` / `spanExporters`: Custom processors and exporters for spans.
- `logProcessors` / `logExporters`: Custom processors and exporters for logs.

### Crash Reporting

Crash reporting is built into the `EmbraceIO` product and is selected through the `crashReporter:` parameter of `EmbraceIO.Options`. There is no separate crash reporter object to instantiate.

```swift
let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    crashReporter: .embrace // .embrace (default), .crashlytics, or .none
)
```

- `.embrace`: Use the built-in Embrace crash reporter (default).
- `.crashlytics`: Use Crashlytics as the primary crash reporter (bundled — no extra product to add).
- `.none`: Disable crash reporting.

### Symbolic Upload Utilities

Utilities for working with debug symbols.

#### SymbolUpload

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

### Code Examples

#### Working with Spans

```swift
// Create and customize a span
let span = EmbraceIO.shared.createSpan(
    name: "checkout-process",
    type: .performance,
    attributes: [
        "order_id": orderId,
        "total_amount": totalAmount
    ]
)

// Perform the work
performCheckoutProcess()

// Add events during the span
span?.addEvent(name: "payment-started", attributes: ["payment_provider": "stripe"])

// End the span when complete
span?.end()
```

#### Creating and Managing Logs

```swift
// Log an informational message
EmbraceIO.shared.log(
    "User completed checkout",
    severity: .info,
    attributes: [
        "order_id": orderId,
        "user_id": userId
    ]
)

// Log an error
do {
    try performRiskyOperation()
} catch let error {
    EmbraceIO.shared.log(
        "Risky operation failed: \(error.localizedDescription)",
        severity: .error,
        attributes: [
            "operation": "risky-operation",
            "context": "checkout-flow"
        ]
    )
}
```

#### Custom Network Request Redaction

```swift
class RedactingDataSource: NSObject, URLSessionRequestsDataSource {
    func modifiedRequest(for request: URLRequest) -> URLRequest {
        var newRequest = request
        // Redact sensitive headers before capture
        for key in ["Authorization", "X-API-Key", "Cookie"] {
            if newRequest.value(forHTTPHeaderField: key) != nil {
                newRequest.setValue("***REDACTED***", forHTTPHeaderField: key)
            }
        }
        return newRequest
    }
}

let networkOptions = URLSessionCaptureService.Options(
    requestsDataSource: RedactingDataSource()
)
```

#### Uploading Debug Symbols

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

<!-- TODO: Add examples for OpenTelemetry export configuration.  -->
