---
title: Traces
description: Record spans to monitor the production performance and success rates of operations within your mobile app.
sidebar_position: 2
---

## Traces

### Overview

Embrace's Traces solution gives you visibility into any app operation you'd like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. You can quickly spot bottlenecks in your app's architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

### API usage examples

#### Start and stop a span

A span typically models the lifecycle of an operation in your app. You start it, let the operation finish, then stop the span, and Embrace records how long the span took.

```dart
final span = await Embrace.instance.startSpan('my-span');
// some lengthy operation
await span?.stop();
```

#### Add attributes to a span

If you have metadata values that relate to the entire span you can add these as attributes.

```dart
final span = await Embrace.instance.startSpan('my-span');
await span?.addAttribute('my-key', 'my-value');
```

#### Add events to a span

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

#### Record an operation that already happened

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

#### Add child spans

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

### OpenTelemetry API compliance

When `Embrace.start()` is called, the SDK registers itself as an OpenTelemetry API provider. Third-party libraries that are instrumented with the OTel API will have their spans and logs automatically captured by Embrace with no additional configuration.

### Export to OpenTelemetry collectors

To forward telemetry to an [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) or any OTLP-compatible backend, use `addSpanExporter` and `addLogRecordExporter` after calling `Embrace.start()`:

```dart
await Embrace.instance.start();

Embrace.instance.addSpanExporter(
  endpoint: 'https://otlp.example.com/v1/traces',
  headers: [
    {'x-api-key': 'YOUR_API_KEY'},
  ],
  timeoutSeconds: 30,
);

Embrace.instance.addLogRecordExporter(
  endpoint: 'https://otlp.example.com/v1/logs',
  headers: [
    {'x-api-key': 'YOUR_API_KEY'},
  ],
  timeoutSeconds: 30,
);
```

You can call each method more than once to add multiple export destinations. Be aware of the performance impact of sending many concurrent network requests.

#### Native OTel export (Android / iOS)

For lower-level control or when configuring exporters in native code, you can also set up exporters directly on the Android and iOS SDKs.

Follow [this guide](/android/features/traces/#export-to-opentelemetry-collectors) for Android.

Follow [this guide](/ios/6x/advanced-features/opentelemetry-export.md) for iOS. A sample iOS implementation:

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
The OpenTelemetry-Swift repository does not support CocoaPods, so you can't import ready-made exporters directly. We recommend adding a new file that implements a Swift [`SpanExporter`](https://github.com/open-telemetry/opentelemetry-swift-core/blob/main/Sources/OpenTelemetrySdk/Trace/Export/SpanExporter.swift) or [`LogRecordExporter`](https://github.com/open-telemetry/opentelemetry-swift-core/blob/main/Sources/OpenTelemetrySdk/Logs/Export/LogRecordExporter.swift) directly, using the ready-made exporters as reference implementations.
:::
