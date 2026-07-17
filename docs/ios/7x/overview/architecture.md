---
title: Architecture
description: Architectural overview of the Embrace Apple SDK 7.x and its OpenTelemetry integration
sidebar_position: 3
---

## Architecture (OpenTelemetry Integration)

The Embrace 7.x iOS SDK is built on and fully committed to [OpenTelemetry](https://opentelemetry.io) for mobile. All of the telemetry the SDK produces is standard OpenTelemetry, and it can be exported to any OpenTelemetry-compatible backend. The SDK integrates with the OpenTelemetry SDK internally, while exposing a set of Embrace-owned types in its public API.

### How the SDK works with OpenTelemetry

`EmbraceCore` generates and manages the SDK's telemetry (spans and logs) using Embrace-owned types, and communicates with the OpenTelemetry SDK internally through a dedicated `EmbraceOTelBridge` module. The bridge is responsible for OpenTelemetry-specific processing and export, and it receives telemetry from `EmbraceCore` so that everything the SDK captures is available as standard OpenTelemetry signals.

This separation lets the SDK offer a stable, ergonomic public API and add mobile-specific capabilities, while remaining fully interoperable with the OpenTelemetry ecosystem.

### Embrace-owned public types

The public API is expressed in Embrace-owned types that live in `EmbraceSemantics` and are re-exported by `EmbraceIO`:

| 6.x (OpenTelemetry type) | 7.x (Embrace type)      |
| ------------------------ | ----------------------- |
| `Span` / `SpanBuilder`   | `EmbraceSpan`           |
| `SpanType`               | `EmbraceType`           |
| `SpanEvent`              | `EmbraceSpanEvent`      |
| `SpanStatus`             | `EmbraceSpanStatus`     |
| `SpanErrorCode`          | `EmbraceSpanErrorCode`  |
| `LogSeverity`            | `EmbraceLogSeverity`    |
| `[String: String]`       | `EmbraceAttributes`     |

This means you work with `EmbraceSpan` directly and no longer need to `import OpenTelemetryApi` in your app code just to hold a reference to a span.

### Modules

The main products you interact with are:

- **`EmbraceIO`** — the recommended umbrella product and single public entry point. It re-exports `EmbraceCore` and `EmbraceSemantics`.
- **`EmbraceCore`** — the main implementation of the SDK. It generates and manages the SDK's telemetry.
- **`EmbraceSemantics`** — the public, Embrace-owned signal types and semantic conventions (`EmbraceSpan`, `EmbraceLog`, `EmbraceType`, etc.).

### How custom exporters are wired

When you provide an [`EmbraceIO.OTelOptions`](/ios/7x/advanced-features/opentelemetry-export.md) with custom span or log exporters, `EmbraceIO.start(options:)` builds an `EmbraceOTelBridge` from your processors and exporters and wires it into `EmbraceCore`. From that point on, `EmbraceCore` triggers the appropriate OTel callbacks — `onStart`/`onEnd`/`flush` for spans, `onEmit`/`flush` for logs — so your exporter receives every signal.

Telemetry forwarded through the bridge is enriched with Embrace context. `EmbraceCore` provides contextual data such as the user session id and session part id, and the bridge ensures all exported telemetry includes this metadata.

### How Embrace concepts map to OpenTelemetry

Embrace maps its core observability concepts to OpenTelemetry signals:

| Embrace concept    | OTel Representation    |
| ------------------ | ---------------------- |
| Session part       | Span                   |
| Embrace logs       | Log                    |
| View Breadcrumb    | Span                   |
| Custom Breadcrumb  | Span event             |
| Crash              | Log                    |
| Exception          | Log                    |
| Network request    | Span + Span attributes |
| Low memory warning | Span event             |

### Session Implementation Example

Sessions are the core of Embrace's reproduce-and-fix approach to insights. In 7.x, a **user session** groups one or more **session parts**, where each part is a contiguous foreground or background interval. Because a session part takes place over a time period, each part is modeled as a **span**.

`EmbraceCore` creates and owns the span for a session part when the part begins, keeps it in memory as the part runs, and ends it when the part ends. If you have configured a custom exporter, the completed span is forwarded through the `EmbraceOTelBridge` for OTel processing and export; otherwise it is persisted and uploaded to Embrace directly. See [Sessions](/ios/7x/core-concepts/sessions.md) for the full user-session model.

### Extensibility

Because of this architecture, the SDK can be extended through:

- Custom span and log processors and exporters (configured through `EmbraceIO.OTelOptions`)
- Custom attributes on Embrace spans and logs
- Custom `CaptureService` implementations
- Integration with other OpenTelemetry-based systems

This design provides a solid foundation for mobile observability while maintaining compatibility with the broader observability ecosystem. Detailed examples of how to configure custom exporters can be found in the "Advanced Features" → "OpenTelemetry Export" section.
