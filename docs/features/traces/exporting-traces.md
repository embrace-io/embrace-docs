---
title: Exporting Traces
sidebar_position: 3
---

### Exporting Traces via the Spans API
Spans collected with the Embrace SDK can be queried via the [Spans API](/docs/spans-api/)

### Exporting Traces via Data Destinations
Spans for Network requests can be exported as part of [Network Span Forwarding](/docs/product/network-spans-forwarding.md).

### Exporting Traces to OpenTelemetry Collectors
Embrace's SDKs can export traces to to any [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) directly from an app using a [SpanExporter](https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-exporter). Using the SDK 

For more details, see [Export to OpenTelemetery Collectors](/docs/open-telemetry/integration/#export-to-opentelemetry-collectors)
