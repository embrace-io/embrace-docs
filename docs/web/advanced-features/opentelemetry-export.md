---
title: OpenTelemetry Export
description: Export your Embrace telemetry to OpenTelemetry-compatible backends
sidebar_position: 1
---

# OpenTelemetry Export

Because the Web SDK is built on OpenTelemetry, it has the ability to export OpenTelemetry signals directly from the
client-side, without any of the telemetry hitting our backend.

To send traces and logs from the SDK to your collector or vendor of choice, you will need to configure the SDK with an
exporter capable of sending OTel signals to that destination.

## Setup custom exporters

You can set up your own custom log and trace exporters and pass them in when initializing the SDK. For example if you
wish to send telemetry to Grafana cloud using OTLP, and assuming you have installed the
`@opentelemetry/exporter-logs-otlp-http` and `@opentelemetry/exporter-trace-otlp-http` packages, then you could do the
following:

```typescript
import { OTLPLogExporter }   from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  spanExporters: [
    new OTLPTraceExporter({
      url: `GRANAFA_ENDPOINT/v1/traces`,
      headers: {
        'Authorization': 'Basic YOUR_GRAFANA_CLOUD_TOKEN'
      }
    }),
  ],
  logExporters: [
    new OTLPLogExporter({
      url: `GRANAFA_ENDPOINT/v1/logs`,
      headers: {
        'Authorization': 'Basic YOUR_GRAFANA_CLOUD_TOKEN'
      }
    }),
  ]
});
```

:::warning
Embrace automatically creates spans for network requests, however because the OTLP export itself makes a network request
this can produce a cycle where the export's network request creates a span which is then exported which then creates
another span, etc.

To avoid this you can [configure the SDK's network monitoring](/docs/web/automatic-instrumentation/network-monitoring.md#configuration-options)
to ignore the endpoint to which you are exporting.
:::

## Common Use Cases

### Integrating with Existing Observability Stacks

If your organization already uses an observability platform that supports OpenTelemetry, you can integrate Embrace data
directly into that platform:

- Send frontend traces to the same system that monitors your backend services
- Create unified dashboards that show full-stack performance
- Correlate frontend issues with backend problems

### Custom Exporters

For specialized environments, you can implement custom exporters that:

- Send data to internal systems
- Apply custom filtering or processing before export
- Implement company-specific security or compliance requirements