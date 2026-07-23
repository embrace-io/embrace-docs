---
title: 7.x Apple SDK
description: Using the Embrace Apple SDK
sidebar_position: 1
---

## Using the Embrace 7.x SDK

The Embrace 7.x Apple SDK is designed to provide first class observability and diagnostic data collection to your mobile application. It supports multiple platforms including iOS, iPadOS, and tvOS.

Embrace's 7.x SDK is open-source and can be found on [GitHub](https://github.com/embrace-io/embrace-apple-sdk/). It has been designed so that any Apple developer can add the SDK to their app and transmit telemetry to Embrace to gain the key mobile insights that we've cultivated in our [product](/product/index.md). It is also possible to use the SDK independently of the SDK platform.

### What is in the Embrace Apple SDK?

The Embrace Apple SDK is built on OpenTelemetry signals like logs and spans, which allow you to [export the telemetry](/ios/7x/advanced-features/opentelemetry-export.md) captured in your app to other sources. We encourage you to add the SDK to your app and view the logs and traces that the SDK automatically captures.

If you are upgrading from the 6.x SDK, note that 7.0 is a major version with a number of breaking changes: a single `EmbraceIO` entry point, a redefined session model, and Embrace-owned public types that no longer expose OpenTelemetry directly. Full details are available in the [migration guide](/ios/7x/getting-started/migration-guide.md). Please reach out in the [Community Slack](https://community.embrace.io) if you have any questions.

### Built on OpenTelemetry

The 7.x iOS SDK is built on and fully committed to [OpenTelemetry](https://opentelemetry.io). Embrace's event-based observability paradigm is built directly on OpenTelemetry signals, namely [Traces](https://opentelemetry.io/docs/concepts/signals/traces/) and [Logs](https://opentelemetry.io/docs/concepts/signals/logs/), and any telemetry the SDK captures can be exported to an OpenTelemetry-compatible backend.

#### Embrace types and the OpenTelemetry SDK

In 7.0, `EmbraceCore` generates and manages the SDK's telemetry (spans, logs) using Embrace-owned types and integrates with the OpenTelemetry SDK internally through a dedicated `EmbraceOTelBridge` module, which handles OpenTelemetry-specific processing and export. This gives you a stable, ergonomic public API while keeping the SDK fully interoperable with OpenTelemetry:

- **A stable public API.** You work with Embrace types like [`EmbraceSpan`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceSemantics/Span/EmbraceSpan.swift) and `EmbraceLog` rather than raw OpenTelemetry types, giving you a consistent, mobile-focused API.
- **Standard OpenTelemetry output.** Everything the SDK captures is available as standard OpenTelemetry signals and can be exported to any OpenTelemetry-compatible backend.

If you provide a custom OpenTelemetry exporter through [`EmbraceIO.OTelOptions`](/ios/7x/advanced-features/opentelemetry-export.md), the bridge triggers the appropriate OTel callbacks (`onStart`/`onEnd`/`flush` for spans, `onEmit`/`flush` for logs) so your exporter receives every signal, enriched with Embrace context such as the session and part identifiers.

#### Events mapped to OTel signals

If you're sending data to an OTel collector instead of the Embrace platform, here's a handy chart of the important Embrace SDK features and how they currently map to OpenTelemetry signals:

| Embrace concept        | OTel Representation    |
| ---------------------- | ---------------------- |
| Session part           | Span                   |
| Embrace logs           | Log                    |
| View Breadcrumb        | Span                   |
| Custom Breadcrumb      | Span event             |
| Crash                  | Log                    |
| Exception              | Log                    |
| Network request        | Span + Span attributes |
| ANR interval (Android) | Span                   |
| Low memory warning     | Span event             |
