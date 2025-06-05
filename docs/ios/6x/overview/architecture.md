---
title: Architecture
description: Architectural overview of the Embrace iOS SDK 6.x with OpenTelemetry foundation
sidebar_position: 3
---

# Architecture (OpenTelemetry Foundation)

The Embrace 6.x iOS SDK has been architecturally designed from the ground up to support and extend [OpenTelemetry](https://opentelemetry.io) for mobile. This modular approach builds Embrace's event-based observability paradigm directly on OpenTelemetry signals, making it both powerful and flexible.

## OpenTelemetry Integration

The SDK is built on OpenTelemetry signals like traces (spans) and logs, which allows for:

- Native integration with the OpenTelemetry ecosystem
- Standardized telemetry collection and processing
- Flexible export options to various observability platforms
- Future-proof design aligned with industry standards

## Architectural Components

The Embrace SDK consists of several core architectural components:

### Tracer Provider

The SDK uses OpenTelemetry's tracer provider to create and manage spans, which represent operations or events occurring in your application. This provider is configured when the SDK is initialized and is responsible for generating spans with the correct context and attributes.

### Span Processor

The span processor handles spans as they are created and completed, determining how and when they are exported. The SDK includes optimized span processors designed for mobile environments:

- `SingleSpanProcessor`: Efficiently exports spans to storage for use by the Embrace backend
- `BatchSpanProcessor`: Used for external OpenTelemetry exporters to optimize the frequency of exports

### Log Processor

Similar to span processing, the log processor manages log records, ensuring they are properly formatted, batched, and exported according to your configuration through the `DefaultEmbraceLoggerProvider`.

### Exporters

The SDK supports multiple exporters for sending telemetry data to different destinations:

- Embrace backend (default)
- Custom OpenTelemetry exporters via the `OpenTelemetryExport` configuration
- Third-party observability platforms

## How Embrace Concepts Map to OpenTelemetry

Embrace maps its core observability concepts to OpenTelemetry signals:

| Embrace concept | OTel Representation |
| ------------ | ---------- |
| Session | Span |
| Embrace logs | Log |
| View Breadcrumb | Span |
| Custom Breadcrumb | Span event |
| Crash | Log |
| Exception | Log |
| Network request | Span + Span attributes |
| Low memory warning | Span event |

## Session Implementation Example

As an example of how Embrace leverages OpenTelemetry, consider how Sessions are implemented:

Sessions are the core of Embrace's reproduce-and-fix approach to insights. They capture everything your app is doing while foregrounded or backgrounded, until the user starts or stops using the app. Because Sessions take place in a given time period, with different related activities occurring in that time, they are modeled as OpenTelemetry **spans**.

When a Session starts, a span begins that will endure until the session ends:

```swift
// from SessionSpanUtils
static func span(id: SessionIdentifier, startTime: Date, state: SessionState, coldStart: Bool) -> Span {
    EmbraceOTel().buildSpan(name: SpanSemantics.Session.name, type: .session)
        .setStartTime(time: startTime)
        .setAttribute(key: SpanSemantics.Session.keyId, value: id.toString)
        .setAttribute(key: SpanSemantics.Session.keyState, value: state.rawValue)
        .setAttribute(key: SpanSemantics.Session.keyColdStart, value: coldStart)
        .startSpan()
}
```

The session span contains all the relevant information about the session and serves as a parent for other spans created during the session lifetime. When the session ends, the span is completed and processed for export.

## Extensibility

Because of this architecture, the SDK can be easily extended through:

- Custom span processors
- Additional exporters (configured through OpenTelemetryExport)
- Custom span attributes
- Integration with other OpenTelemetry-based systems

This design provides a solid foundation for mobile observability while maintaining compatibility with the broader observability ecosystem. Detailed examples of how to configure custom exporters can be found in the "Advanced Features" -> "OpenTelemetry Export" section.