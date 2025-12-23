---
title: Traces
description: Record spans to monitor the production performance and success rates of operations within your mobile app.
sidebar_position: 2
---

# Traces

## Overview

Embrace’s Traces solution gives you visibility into any app operation you’d like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

## API Usage Examples

### Start and stop a span

A span typically models the lifecycle operation in your app. You can start it, let the operation finish, then stop the span, and Embrace will record how long the span took.

```dart
final span = await Embrace.instance.startSpan('my-span');
// some lengthy operation
await span?.stop();
```

### Add attributes to a span

If you have metadata values that relate to the entire span you can add these as attributes.

```dart
final span = await Embrace.instance.startSpan('my-span');
await span?.addAttribute('my-key', 'my-value');
```

### Add events to a span

If you have an event that happens at a point in time within a span, you can add a span event. This can contain optional attributes about the event.

```dart
final span = await Embrace.instance.startSpan('my-span');
await span?.addEvent(
    'my-event-name',
    attributes: {
        'my-event-attribute-key': 'my-event-attribute-value',
    },
);
```

### Record an operation that already happened

If an operation already happened or you don't want to call start/stop individually, it's possible to record that a span happened via `recordCompletedSpan`.

```dart
final start = DateTime.now().millisecondsSinceEpoch - 1000;
final end = start + 500;
final result = await Embrace.instance.recordCompletedSpan(
    'my-recorded-span',
    start,
    end,
    attributes: {'my-span-key': 'my-span-value'},
    events: [
    EmbraceSpanEvent(
        name: 'my-span-event',
        attributes: {'my-event-key': 'my-event-value'},
        timestampMs: DateTime.now().millisecondsSinceEpoch,
    )
    ],
);
```

### Add child spans

It's possible to create child spans. This can be useful if you want to record finer details about an operation, for example, a network request span might have a child span of JSON serialization to see how long it took.

```dart
final span = await Embrace.instance.startSpan('my-span');

if (span != null) {
    final childSpan =
        await Embrace.instance.startSpan('child-span', parent: span);
    await childSpan?.stop();
    await span.stop();
}
```

## Export to OpenTelemetry Collectors

To send telemetry to any [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) directly from your app you can setup a [SpanExporter](https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-exporter) and [LogRecordExporter](https://opentelemetry.io/docs/specs/otel/logs/sdk/#logrecordexporter). When configured, telemetry will be sent to these exporters as soon as they are recorded. More than one exporter of each signal can be configured, but be aware of the performance impact of sending too many network requests if that is applicable.

:::info
All telemetry in Embrace's Flutter SDK is routed through Embrace's Android/iOS SDKs. You should configure Android/iOS exporters before initializing the SDK in order to send Dart telemetry to your desired destination.
:::

### Android OTel export

Please follow [this guide](/android/features/traces/#export-to-opentelemetry-collectors) to setup OpenTelemetry exporters on Android.

### iOS OTel export

Please follow [this guide](/ios/6x/advanced-features/opentelemetry-export.md) for details on setting up OpenTelemetry exporters on iOS.

Exporters are set when the SDK is [configured](/flutter/integration/#ios-setup). A sample implementation might look like:

```swift
try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: "", // Your App ID from Embrace Dash
                        platform: .flutter,
                        export: OpenTelemetryExport(
                            spanExporter: OtlpHttpTraceExporter(
                                endpoint: URL(string: "https://otelcollector-gateway.mydomain.com/v1/traces")!,
                                useSession: URLSession(configuration: myAuthorizedConfiguration)
                            ),
                            logExporter: OtlpHttpLogExporter(
                                endpoint: URL(string: "https://otelcollector-gateway.mydomain.com/v1/logs")!,
                                useSession: URLSession(configuration: myAuthorizedConfiguration)
                            )
                        )
                    )
                )
                .start()
```

:::info
Please note the OpenTelemetry-Swift repository does not support Cocoapods, so you will be unable to import ready-made exporters directly. We recommend adding a new file that implements a Swift [`SpanExporter`](https://github.com/open-telemetry/opentelemetry-swift-core/blob/main/Sources/OpenTelemetrySdk/Trace/Export/SpanExporter.swift) or [`LogRecordExporter`](https://github.com/open-telemetry/opentelemetry-swift-core/blob/main/Sources/OpenTelemetrySdk/Logs/Export/LogRecordExporter.swift) directly, and using the ready-made exporters as reference implementations.
:::
