---
title: Getting Started
sidebar_position: 0
description: Learn about Embrace for the React Native platform
---

# React Native Platform Documentation

## Getting Started

This documentation is split into two sections:

1. [**Integration Guide**](/react-native/integration/)
2. [**Feature Reference**](/react-native/features/)

If you are just starting out with Embrace, follow the [**Integration Guide**](/react-native/integration/) to learn
the key steps to successfully using our product.

Once you've completed that, browse through our [**Feature Reference**](/react-native/features/) guides to learn how
to use the advanced features our SDK provides.

You can also view our [Changelog](/react-native/changelog/)

## Built on OpenTelemetry

The React Native SDK has been built to support and extend [OpenTelemetry](https://opentelemetry.io) for mobile. All the
telemetry we track maps to OTel signals, namely [Traces](https://opentelemetry.io/docs/concepts/signals/traces/) and
[Logs](https://opentelemetry.io/docs/concepts/signals/logs/) (as shown in the table below). We expose a [Tracer Provider](https://opentelemetry.io/docs/concepts/signals/traces/#tracer-provider)
that can be hooked up to instrumentation libraries not written by Embrace to collect additional telemetry. Finally, [custom
exporters](/react-native/features/otlp) can be setup to send data to any OTLP-HTTP compatible endpoint, either in addition
to sending to Embrace or optionally bypassing us entirely.

### Events mapped to OTel signals

| Embrace tracking   | OTel Representation    |
|--------------------|------------------------|
| Session            | Span                   |
| Embrace logs       | Log                    |
| View               | Span                   |
| Navigation         | Span                   |
| Redux Actions      | Span                   |
| Breadcrumb         | Span event             |
| Crash              | Log                    |
| Exception          | Log                    |
| Network request    | Span + Span attributes |

