---
title: Integration Setup
description: Configure the Embrace SDK to integrate into the OpenTelemetry ecosystem
sidebar_position: 1
---

# Integration Setup

The Embrace SDK can be configured to work with other components in the OpenTelemetry ecosystem. This includes any Exporters and instrumentation libraries that can run on the supported mobile platforms, so long as the underlying API is implemented by Embrace.

Telemetry captured by the Embrace SDK can be sent directly from the mobile app to any configured OTel Collector. As well, additional OTel signals recorded by instrumentation libraries external to Embrace will be included in the Embrace session, as if they were recorded by the SDK itself. Any OTel APIs implemented by Embrace can also be used directly by SDK users if they so choose.

## Export to OpenTelemetry Collectors

Telemetry can be sent to any [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) directly from an app using the [SpanExporter](https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-exporter) and [LogRecordExporter](https://opentelemetry.io/docs/specs/otel/logs/sdk/#logrecordexporter). Once they are configured, any telemetry will be sent to these exporters as soon as it is recorded. More than one exporter can be configured for each signal, but be aware that there can be a performance impact when sending too many network requests.

Currently, traces and logs can be exported using the [Embrace Android SDK](https://github.com/embrace-io/embrace-android-sdk) and [Embrace Apple SDK](https://github.com/embrace-io/embrace-apple-sdk).

### Android

```kotlin
Embrace.getInstance().addSpanExporter(mySpanExporter)
Embrace.getInstance().addLogRecordExporter(myLogExporter)
```

:::info
Please note that exporters must be configured _before_ the Embrace Android SDK is started. Exporters added after the SDK has already been started will not be used.
:::

#### Local Testing

To see this working locally, [LoggingSpanExporter](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/logging/src/main/java/io/opentelemetry/exporter/logging/LoggingSpanExporter.java) and [SystemOutLogRecordExporter](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/logging/src/main/java/io/opentelemetry/exporter/logging/SystemOutLogRecordExporter.java) can be used to output to logcat.

```text
2024-03-05 14:15:15.342 29672-29756 LoggingSpanExporter     io.embrace.mysampleapp          I  'emb-startup-moment' : d38b4ac26baf1a862ed4a028af7d08ac e3e82dd0f86c0eed INTERNAL [tracer: io.embrace.android.embracesdk:={{ embrace_sdk_version platform="android" }}] AttributesMap{data={emb.sequence_id=4, emb.type=PERFORMANCE, emb.key=true}, capacity=128, totalAddedValues=3}
```

#### Sending Telemetry Off the Device

You can send your data to any generic OpenTelemetry Collector by using any Android-compatible exporter. Note that not all Java SpanExporter or LogRecordExporter can be used on Android.

```kotlin
// gRPC through an OTel Collector in a local container
val customDockerExporter = OtlpGrpcSpanExporter.builder()
    .setEndpoint("https://otel-collector.mydomain.com:4317")
    .build()

Embrace.getInstance().addSpanExporter(customDockerExporter)
```

:::warning
**Network requests to OpenTelemetry Collectors should not be logged**

To prevent an infinite loop of network requests spans, any requests used to export telemetry to OpenTelemetry Collectors should be excluded from being recorded by the Embrace Android SDK using the `disabled_url_patterns` setting in the Embrace Configuration file. See [this page](/android/configuration/configuration-file/#networking---disabled_url_patterns-string-array) for details.
:::

#### Sending Telemetry to Grafana Cloud

To send telemetry to [Grafana Cloud](https://grafana.com/docs/opentelemetry/collector/opentelemetry-collector/), set up the collector and add an authorization token as a header.

```kotlin
// HTTPS to an OTel Collector in Grafana Cloud
val grafanaCloudExporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("https://myinstance.grafana.net/otlp/v1/traces")
    .addHeader("Authorization", "YourToken")
    .build()

Embrace.getInstance().addSpanExporter(grafanaCloudExporter)
```

### Apple

In the Embrace Apple SDK, exporters are configured at the same time that the SDK itself is configured. Any [Swift-language OTel exporter](https://github.com/open-telemetry/opentelemetry-swift/tree/main/Sources/Exporters) can be attached as an optional value when the SDK is set up in Embrace Options. Multiple span exporters can be attached during configuration by using the [`otel-swift MultiSpanExporter`](https://github.com/open-telemetry/opentelemetry-swift-core/blob/main/Sources/OpenTelemetrySdk/Trace/Export/MultiSpanExporter.swift).

```swift
// logging span exporter output to the Xcode console
var loggingSpanExporter = StdoutExporter()

// gRPC span exporter to an OTel Collector in a local container
var otelCollectorSpanExporter: OtlpTraceExporter {
    let config = ClientConnection.Configuration.default(
        target: ConnectionTarget.hostAndPort("localhost", 4317),
        eventLoopGroup: MultiThreadedEventLoopGroup(numberOfThreads: 1)
    )

    let client = ClientConnection(configuration: config)
    return OtlpTraceExporter(channel: client)
}

// HTTP span exporter to OTel Collector in Grafana Cloud
var grafanaOtelSpanExporter: OtlpHttpTraceExporter {
    let grafanaCloudTokenString = //String generated from your account
    let urlConfig = URLSessionConfiguration.default
    urlConfig.httpAdditionalHeaders = ["Authorization": "Basic \(grafanaCloudTokenString)"]

    return OtlpHttpTraceExporter(
        endpoint: URL(string: "https://otlp-gateway-prod-us-east-0.grafana.net/otlp/v1/traces")!,
        useSession: session
    )
}

// configure Embrace Apple SDK, with all three span exporters attached
try? Embrace
    .setup(
        options: Embrace.Options(
            appId: "AppID",
            export: OpenTelemetryExport(
                spanExporter: MultiSpanExporter(
                    spanExporters: [
                        loggingSpanExporter,
                        otelCollectorSpanExporter,
                        grafanaOtelSpanExporter
                    ]
                ),
                logExporter: nil
            )
        )
    )
    .start()
```

### React Native

The Embrace React Native SDK also has the ability to configure custom [OTLP exporters](/react-native/features/otlp) by passing some configuration when initializing Embrace.
The Native side internally implements the Android/Apple exporters as described above letting this Hosted SDK send telemetry data to any backend.

```javascript
const {isPending, isStarted} = useEmbrace({
  ios: {appId: "__APP_ID__"},
  exporters: {
    logExporter: {
      endpoint:
        "https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/logs",
      headers: [
        {
          key: "Authorization",
          token: `Basic __GRAFANA_TOKEN__`,
        },
      ],
    },
    traceExporter: {
      endpoint:
        "https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/traces",
      headers: [
        {
          key: "Authorization",
          token: `Basic __GRAFANA_TOKEN__`,
        },
      ],
    },
  },
});
```

## Use the OpenTelemetry Tracing API

An Embrace-enhanced implementation of the [OTel Tracing API](https://opentelemetry.io/docs/specs/otel/trace/api/) can be obtained through the SDK. The resulting `OpenTelemetry` object will provide working implementations of interfaces and methods of said API, with proper attribution included in the resource of the exported spans. All other methods will be no-ops for the time being, as the other APIs have not been implemented.

The enhanced Tracing API is currently available in the Embrace Android SDK.

### Limitations

The Embrace implementation of the Tracing API deviates from the official SDK implementations in the following ways:

- SpanLinks are not supported - `addLink()` in the `Span` implementation is a no-op.
- Attribute values are persisted as Strings.
- The resource attributes `service.name` and `service.version` refer to the Embrace SDK at this time. This will be changed shortly.

### Android

To obtain an implementation of `OpenTelemetry`, the method `getOpenTelemetry()` can be used. With this, instances of `TracerProvider` and `Tracer` can be created and retrieved, depending on what the instrumentation library requires.

For instance, the [OkHttp Instrumentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/a98b559a61c2781a6c994253d93c54ec0e89888a/instrumentation/okhttp/okhttp-3.0/library/README.md) can be used manually in the following ways:

```kotlin
val openTelemetry = Embrace.getInstance().getOpenTelemetry()
val okHttpTelemetry = OkHttpTelemetry.builder(openTelemetry).build()
val okHttpClient = OkHttpClient.Builder().build()
val request = Request.Builder().url("https://api.mydomain.com").build()

okHttpTelemetry.newCallFactory(okHttpClient).execute(request)
```
