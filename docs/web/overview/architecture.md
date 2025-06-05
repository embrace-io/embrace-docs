---
title: Architecture
description: Architectural overview of the Embrace Web SDK with OpenTelemetry foundation
sidebar_position: 3
---

# Architecture (OpenTelemetry Foundation)

The Embrace Web SDK has been architecturally designed from the ground up to support and extend [OpenTelemetry](https://opentelemetry.io) for web. This modular approach builds Embrace's event-based observability paradigm directly on OpenTelemetry signals, making it both powerful and flexible.

## OpenTelemetry Integration

The SDK is built on OpenTelemetry signals like traces (spans) and logs, which allows for:

1. Native integration with the OpenTelemetry ecosystem
2. Standardized telemetry collection and processing
3. Flexible export options to various observability platforms
4. Future-proof design aligned with industry standards

## Architectural Components

The Embrace SDK consists of several core architectural components:

### Processors
### Exporters

## How Embrace Concepts Map to OpenTelemetry

Embrace maps its core observability concepts to OpenTelemetry signals:

| Embrace concept | OTel Representation |
| ------------ | ---------- |
| Session | Span |
| Embrace logs | Log |
| Custom Breadcrumb | Span event |
| Exception | Log |
| Network request | Span + Span attributes |

## Extensibility

Because of this architecture, the SDK can be easily extended through:

- Custom span processors
- Additional exporters (configured through OpenTelemetryExport)
- Custom span attributes
- Integration with other OpenTelemetry-based systems
