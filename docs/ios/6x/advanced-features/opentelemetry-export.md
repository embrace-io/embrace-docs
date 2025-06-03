---
title: OpenTelemetry Export
description: Export your Embrace telemetry to OpenTelemetry-compatible backends
sidebar_position: 1
---

# OpenTelemetry Export

Because the 6.x iOS SDK is built on OpenTelemetry, it has the ability to export OpenTelemetry signals directly from the mobile code level, without any of the telemetry hitting our backend.

To send traces and logs from the SDK to your collector or vendor of choice, you will need to configure the SDK with an exporter capable of sending OTel signals to that destination. This will be done in the creation of the [`Embrace.Options`](/ios/6x/getting-started/configuration-options.md), by adding an [`OpenTelemetryExport`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/OpenTelemetryExport.swift).

## Direct Exporters

Some collectors have built or presently support direct export of traces or logs in Swift. In theory, any implementation of [`SpanExporter`](https://github.com/open-telemetry/opentelemetry-swift/blob/main/Sources/OpenTelemetrySdk/Trace/Export/SpanExporter.swift) or [`LogRecordExporter`](https://github.com/open-telemetry/opentelemetry-swift/blob/main/Sources/OpenTelemetrySdk/Logs/Export/LogRecordExporter.swift) that can point to the location of the collector should be able to send, respectively, spans and logs.

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

For example, Grafana Cloud allows you to [generate a token](/docs/data-destinations/grafana-cloud-setup.md#access-policytoken) that you can use with their OTLP traces and spans gateway. On the SDK side, you can add an [OtlpHttpTraceExporter](https://github.com/open-telemetry/opentelemetry-swift/blob/main/Sources/Exporters/OpenTelemetryProtocolHttp/trace/OtlpHttpTraceExporter.swift) to send your spans to that Grafana account via the Grafana Cloud traces endpoint, and similarly use an [OtlpHttpLogExporter](https://github.com/open-telemetry/opentelemetry-swift/blob/main/Sources/Exporters/OpenTelemetryProtocolHttp/logs/OtlpHttpLogExporter.swift) to send your logs to the same account via the GC log endpoint:

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

<!-- TODO: Add examples of implementing a custom exporter
TODO: Include examples of configuring batching and sampling for performance optimization
TODO: Show how to conditionally enable exporters based on build configuration (debug vs. release)  -->
