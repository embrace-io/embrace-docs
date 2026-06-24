---
title: OpenTelemetry
description: OpenTelemetry compliance and integration in the Embrace Flutter SDK
sidebar_position: 7
---

## OpenTelemetry

The Embrace Flutter SDK is built on [OpenTelemetry](https://opentelemetry.io) (OTel), the open standard for telemetry data. This means your Flutter app participates in the same observability ecosystem as your backend services — sharing trace context, speaking the same data formats, and integrating with any OTel-compatible tooling.

### Why this matters

Most mobile SDKs record telemetry in proprietary formats and pipelines. Because Embrace is built on OTel, you get a number of concrete benefits:

- **No vendor lock-in.** Telemetry is represented in the OTel data model and can be exported to any OTLP-compatible backend — Grafana, Honeycomb, Datadog, your own collector, or anywhere else.
- **End-to-end distributed tracing.** W3C `traceparent` headers are automatically propagated on outgoing network requests, so your backend can link server-side spans directly to the mobile span that triggered them.
- **Third-party library compatibility.** Packages that instrument themselves with the OTel API will have their telemetry automatically captured by Embrace as soon as `Embrace.start()` is called — no extra wiring required.
- **Ecosystem interoperability.** As the OTel ecosystem for Dart and Flutter matures, new instrumentation libraries will work with Embrace out of the box.

### OTel API compliance

When `Embrace.start()` is called, the SDK registers itself as an OpenTelemetry API provider. Any library in your dependency tree that emits OTel spans or logs will have that telemetry captured and included in the Embrace session automatically, without requiring any additional configuration in your app.

### Export to OTLP backends

You can send Embrace telemetry directly to any OTLP-compatible backend from Dart — no native code required. Call `addSpanExporter` and `addLogRecordExporter` after `Embrace.start()`:

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

Each method can be called more than once to fan telemetry out to multiple destinations. Be aware of the battery and bandwidth impact of sending many concurrent network requests from the device.

:::warning
Requests to your OTLP collector should be excluded from Embrace's network capture to prevent them from appearing as app traffic. Use `disabled_url_patterns` in your Embrace configuration to exclude your collector's URL.
:::

### W3C traceparent propagation

`EmbraceHttpClient` and `EmbraceInterceptor` (for Dio) automatically inject a [`traceparent`](https://www.w3.org/TR/trace-context/) header into outgoing requests when there is an active trace context. This allows your backend to link incoming requests to the mobile span that initiated them, completing the distributed trace across the mobile/server boundary.

No configuration is needed. See [Capture network requests](/flutter/features/network-requests/) for details on setting up `EmbraceHttpClient` and `EmbraceInterceptor`.
