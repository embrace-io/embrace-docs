---
title: OpenTelemetry Export
description: Export your Embrace telemetry to OpenTelemetry-compatible backends
sidebar_position: 1
---

# OpenTelemetry Export

Because the 6.x iOS SDK is built on OpenTelemetry, it has the ability to export OpenTelemetry signals directly from the mobile code level, without any of the telemetry hitting our backend.

To send traces and logs from the SDK to your collector or vendor of choice, you will need to configure the SDK with an exporter capable of sending OTel signals to that destination. This will be done in the creation of the [`Embrace.Options`](/ios/6x/getting-started/configuration-options.md), by adding an [`OpenTelemetryExport`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/OpenTelemetryExport.swift).

## Direct Exporters

Some collectors have built or presently support direct export of traces or logs in Swift. In theory, any implementation of [`SpanExporter`](https://github.com/open-telemetry/opentelemetry-swift-core/blob/main/Sources/OpenTelemetrySdk/Trace/Export/SpanExporter.swift) or [`LogRecordExporter`](https://github.com/open-telemetry/opentelemetry-swift-core/blob/main/Sources/OpenTelemetrySdk/Logs/Export/LogRecordExporter.swift) that can point to the location of the collector should be able to send, respectively, spans and logs.

The OpenTelemetry-Swift repository lists [`publicly-available exporters`](https://github.com/open-telemetry/opentelemetry-swift/tree/main/Sources/Exporters) that can be added directly to your Embrace configuration. For example, here is an SDK configuration that adds a Jaeger exporter for traces:

```swift
try? Embrace
    .setup(
        options: Embrace.Options(
            appId: "AppID",
            logLevel: .debug,
            export: OpenTelemetryExport(
                spanExporter: JaegerSpanExporter(
                    serviceName: "jaegerServiceName",
                    collectorAddress: "jaegerCollectorAddress"
                )
            )
        )
    )
    .start()
```

## OTLP Export through HTTP or gRPC

The OpenTelemetry-Swift list also has OTLP HTTP and gRPC exporters for logs and spans. These can be used more flexibly than the single-service exporters like Jaeger, because vendors can provide some important keys or headers that allow you to use the protocol to export to an HTTP or gRPC address.

For example, Grafana Cloud allows you to [generate a token](/data-destinations/grafana-cloud-setup.md#access-policytoken) that you can use with their OTLP traces and spans gateway. On the SDK side, you can add an [OtlpHttpTraceExporter](https://github.com/open-telemetry/opentelemetry-swift/blob/main/Sources/Exporters/OpenTelemetryProtocolHttp/trace/OtlpHttpTraceExporter.swift) to send your spans to that Grafana account via the Grafana Cloud traces endpoint, and similarly use an [OtlpHttpLogExporter](https://github.com/open-telemetry/opentelemetry-swift/blob/main/Sources/Exporters/OpenTelemetryProtocolHttp/logs/OtlpHttpLogExporter.swift) to send your logs to the same account via the GC log endpoint:

```swift
let grafanaCloudTokenString = //String generated from your account
let urlConfig = URLSessionConfiguration.default
urlConfig.httpAdditionalHeaders = ["Authorization": "Basic \(grafanaCloudTokenString)"]

try? Embrace
    .setup(
        options: Embrace.Options(
            appId: "AppID",
            logLevel: .debug,
            export: OpenTelemetryExport(
                spanExporter: OtlpHttpTraceExporter(
                    endpoint: URL(string: "https://otlp-gateway-prod-us-west-0.grafana.net/otlp/v1/traces")!,
                    useSession: URLSession(configuration: urlConfig)
                ),
                logExporter: OtlpHttpLogExporter(
                    endpoint: URL(string: "https://otlp-gateway-prod-us-west-0.grafana.net/otlp/v1/logs")!,
                    useSession: URLSession(configuration: urlConfig)
                )
            )
        )
    )
    .start()
```

## Common Use Cases

### Integrating with Existing Observability Stacks

If your organization already uses an observability platform that supports OpenTelemetry, you can integrate Embrace data directly into that platform:

- Send mobile app traces to the same system that monitors your backend services
- Create unified dashboards that show full-stack performance
- Correlate mobile issues with backend problems

### Custom Exporters

For specialized environments, you can implement custom exporters that:

- Send data to internal systems
- Apply custom filtering or processing before export
- Implement company-specific security or compliance requirements

#### Implementing a Custom Log Exporter

The Embrace iOS SDK supports custom log exporters through OpenTelemetry's [`LogRecordExporter`](https://opentelemetry.io/docs/specs/otel/logs/sdk/#logrecordexporter) protocol. Your custom exporter will run alongside Embrace's default storage exporter, giving you access to all log data while maintaining Embrace's core functionality.

##### Basic Implementation

```swift
import Foundation
import OpenTelemetrySdk

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

##### Configuration

```swift
import EmbraceIO

// Configure your custom exporter
let customExporter = CustomLogExporter()

// Set up Embrace options
let options = Embrace.Options(
    appId: "your-app-id",
    export: OpenTelemetryExport(
        spanExporter: nil, // Optional: add custom span exporter
        logExporter: customExporter
    )
)

// Initialize Embrace
Embrace.setup(options: options)
```

##### Background Processing for Heavy Operations

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

##### Available Log Data

Each `ReadableLogRecord` provides:
- `body` - Log message content
- `timestamp` - When the log was created
- `severity` - Log level (debug, info, warn, error, etc.)
- `attributes` - Custom attributes attached to the log
- `resource` - Resource information (app metadata, device info, etc.)
- `instrumentationScopeInfo` - Information about the logging source
- `spanContext` - Associated trace/span context if available

##### Example Use Cases

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

        // Send to your API endpoint
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

##### Important Considerations

1. **Dual Export**: Your exporter runs alongside Embrace's default exporter - both receive the same log data
2. **Performance**: Implement efficient processing to avoid blocking the logging pipeline
3. **Error Handling**: Return `.failure` from export methods if processing fails
4. **Thread Safety**: Ensure your exporter is thread-safe as it may be called from multiple threads
5. **Resource Management**: Clean up properly in the `shutdown` method
