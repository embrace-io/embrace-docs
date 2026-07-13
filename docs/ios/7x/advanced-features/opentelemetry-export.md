---
title: OpenTelemetry Export
description: Export your Embrace telemetry to OpenTelemetry-compatible backends
sidebar_position: 1
---

## OpenTelemetry Export

Because the Embrace Apple SDK is built on OpenTelemetry, it has the ability to export OpenTelemetry signals directly from the mobile code level, without any of the telemetry being sent to our backend.

To send traces and logs from the SDK to your collector or vendor of choice, configure the SDK with exporters capable of sending OTel signals to that destination. In 7.x this is done through the [`EmbraceIO.OTelOptions`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceIO/Options/EmbraceIO%2BOTelOptions.swift) passed as the `otel` option.

:::info Changed in 7.x
In 6.x, exporters were passed via `Embrace.Options.export` using an `OpenTelemetryExport(spanExporter:logExporter:)`.
In 7.x, use `EmbraceIO.OTelOptions`, which accepts **arrays** of span and log exporters (and
processors), so you can register more than one at a time.
:::

Here is an example of how you can initialize the Embrace SDK to only capture events and forward them to your custom Span and Log Exporters without the data being sent to our servers:

```swift
try EmbraceIO.start(
    options: EmbraceIO.Options.withLocalConfiguration(
        otel: EmbraceIO.OTelOptions(
            spanExporters: [myCustomSpanExporter],
            logExporters: [myCustomLogRecordExporter]
        )
    )
)
```

In this scenario, an App ID isn't even needed which means you don't even need to register to Embrace in order to use the SDK. All Embrace SDK features are available, the only difference is you'll need to handle the data yourself.

### OTLP Export through HTTP or gRPC

The OpenTelemetry-Swift list also has OTLP HTTP and gRPC exporters for logs and spans. These can be used more flexibly than the single-service exporters like Jaeger, because vendors can provide some important keys or headers that allow you to use the protocol to export to an HTTP or gRPC address.

For example, Grafana Cloud allows you to [generate a token](/data-destinations/grafana-cloud-setup.md#access-policytoken) that you can use with their OTLP traces and spans gateway. On the SDK side, you can add an [OtlpHttpTraceExporter](https://github.com/open-telemetry/opentelemetry-swift/blob/main/Sources/Exporters/OpenTelemetryProtocolHttp/trace/OtlpHttpTraceExporter.swift) to send your spans to that Grafana account via the Grafana Cloud traces endpoint, and similarly use an [OtlpHttpLogExporter](https://github.com/open-telemetry/opentelemetry-swift/blob/main/Sources/Exporters/OpenTelemetryProtocolHttp/logs/OtlpHttpLogExporter.swift) to send your logs to the same account via the GC log endpoint:

```swift
let grafanaCloudTokenString = //String generated from your account
let urlConfig = URLSessionConfiguration.default
urlConfig.httpAdditionalHeaders = ["Authorization": "Basic \(grafanaCloudTokenString)"]
let session = URLSession(configuration: urlConfig)
let client = BaseHTTPClient(session: session)

try EmbraceIO.start(
    options: EmbraceIO.Options.withAppId(
        "your 5-character AppID here", // Obtained from the Embrace dashboard https://dash.embrace.io/
        logLevel: .debug,
        otel: EmbraceIO.OTelOptions(
            spanExporters: [
                OtlpHttpTraceExporter(
                    endpoint: URL(string: "https://otlp-gateway-prod-us-west-0.grafana.net/otlp/v1/traces")!,
                    httpClient: client
                )
            ],
            logExporters: [
                OtlpHttpLogExporter(
                    endpoint: URL(string: "https://otlp-gateway-prod-us-west-0.grafana.net/otlp/v1/logs")!,
                    httpClient: client
                )
            ]
        )
    )
)
```

### Common Use Cases

#### Integrating with Existing Observability Stacks

If your organization already uses an observability platform that supports OpenTelemetry, you can integrate Embrace data directly into that platform:

- Send mobile app traces to the same system that monitors your backend services
- Create unified dashboards that show full-stack performance
- Correlate mobile issues with backend problems

#### Custom Exporters

For specialized environments, you can implement custom exporters that:

- Send data to internal systems
- Apply custom filtering or processing before export
- Implement company-specific security or compliance requirements

##### Implementing a Custom Log Exporter

The Embrace iOS SDK supports custom log exporters through OpenTelemetry's [`LogRecordExporter`](https://opentelemetry.io/docs/specs/otel/logs/sdk/#logrecordexporter) protocol. Your custom exporter will run alongside Embrace's default storage exporter, giving you access to all log data while maintaining Embrace's core functionality.

###### Basic Implementation

```swift
import Foundation
import OpenTelemetrySdk

// Custom log exporter that just prints the logs to console
class CustomLogExporter: LogRecordExporter {

    func export(logRecords: [OpenTelemetrySdk.ReadableLogRecord], explicitTimeout: TimeInterval?) -> OpenTelemetrySdk.ExportResult {
        // Your custom export logic here
        for record in logRecords {
            // Access log data
            let message = record.body.description
            let timestamp = record.timestamp
            let attributes = record.attributes
            let severity = record.severity
            let resource = record.resource.attributes

            // Example implementations:
            // - Send to remote API
            // - Write to custom file format
            // - Forward to analytics service
            // - Apply custom filtering/transformation

            // Simple example - print to console
            print("CUSTOM EXPORTER - Message: \(message), Timestamp: \(timestamp), Severity: \(String(describing: severity))")
        }
        return .success
    }

    func forceFlush(explicitTimeout: TimeInterval?) -> OpenTelemetrySdk.ExportResult {
        // Flush any pending logs (implement your flush logic)
        print("CUSTOM EXPORTER - Force flush called")
        return .success
    }

    func shutdown(explicitTimeout: TimeInterval?) {
        // Cleanup resources when SDK shuts down
        print("CUSTOM EXPORTER - Shutdown called")
    }
}
```

###### Configuration

```swift
import EmbraceIO

// Configure your custom exporter
let customExporter = CustomLogExporter()

// Set up Embrace options
let options = EmbraceIO.Options.withAppId(
    "your-app-id",
    otel: EmbraceIO.OTelOptions(
        logExporters: [customExporter]
    )
)

// Initialize Embrace
try EmbraceIO.start(options: options)
```

###### Background Processing for Heavy Operations

For exporters that need to perform heavy processing (file I/O, network calls, data transformation), use a dedicated dispatch queue to avoid blocking the logging pipeline:

```swift
import Foundation
import OpenTelemetrySdk

class CustomLogExporter: LogRecordExporter {
    // Dedicated queue for heavy processing
    private let processingQueue = DispatchQueue(label: "com.yourapp.log-exporter", qos: .utility)

    func export(logRecords: [OpenTelemetrySdk.ReadableLogRecord], explicitTimeout: TimeInterval?) -> OpenTelemetrySdk.ExportResult {
        // Return immediately to avoid blocking the logging pipeline
        processingQueue.async {
            // Perform heavy operations here
            self.processLogsAsync(logRecords)
        }

        return .success
    }

    private func processLogsAsync(_ logRecords: [ReadableLogRecord]) {
        for record in logRecords {
            // Heavy processing examples:
            // - Save to local database
            // - Write to file system
            // - Send to remote API
            // - Complex data transformations

            self.saveToLocalFile(record)
            self.sendToAnalyticsService(record)
        }
    }

    private func saveToLocalFile(_ record: ReadableLogRecord) {
        // Example: Save to disk
        let logData = [
            "message": record.body.description,
            "timestamp": record.timestamp.timeIntervalSince1970,
            "severity": record.severity?.description ?? "unknown"
        ]

        // Write to file, database, etc.
        // This heavy I/O won't block the main logging thread
    }

    private func sendToAnalyticsService(_ record: ReadableLogRecord) {
        // Example: Network call
        // Heavy network operations happen in background
    }

    func forceFlush(explicitTimeout: TimeInterval?) -> OpenTelemetrySdk.ExportResult {
        // Wait for background processing to complete if needed
        processingQueue.sync { }
        return .success
    }

    func shutdown(explicitTimeout: TimeInterval?) {
        // Cleanup queue and resources
    }
}
```

###### Available Log Data

Each `ReadableLogRecord` provides:

- `body` - Log message content
- `timestamp` - When the log was created
- `severity` - Log level (debug, info, warn, error, etc.)
- `attributes` - Custom attributes attached to the log
- `resource` - Resource information (app metadata, device info, etc.)
- `instrumentationScopeInfo` - Information about the logging source
- `spanContext` - Associated trace/span context if available

###### Example Use Cases

**Send to Remote API:**

```swift
func export(logRecords: [OpenTelemetrySdk.ReadableLogRecord], explicitTimeout: TimeInterval?) -> OpenTelemetrySdk.ExportResult {
    for record in logRecords {
        let logData = [
            "message": record.body.description,
            "timestamp": record.timestamp.timeIntervalSince1970,
            "severity": record.severity?.description ?? "unknown",
            "attributes": record.attributes
        ]

        // Send to your API endpoint (asynchronously)
        sendToAPI(logData)
    }
    return .success
}
```

**Filter and Transform Logs:**

```swift
func export(logRecords: [OpenTelemetrySdk.ReadableLogRecord], explicitTimeout: TimeInterval?) -> OpenTelemetrySdk.ExportResult {
    let errorLogs = logRecords.filter { record in
        record.severity == .error || record.severity == .fatal
    }

    for record in errorLogs {
        // Process only error/fatal logs
        processErrorLog(record)
    }
    return .success
}
```

###### Important Considerations

1. **Dual Export**: Your exporter runs alongside Embrace's default exporter - both receive the same log data and you will incur additional bandwidth usage as a result
2. **Performance**: Implement efficient processing to avoid blocking the logging pipeline
3. **Error Handling**: Return `.failure` from export methods if processing fails
4. **Thread Safety**: Ensure your exporter is thread-safe as it may be called from multiple threads
5. **Resource Management**: Clean up properly in the `shutdown` method
