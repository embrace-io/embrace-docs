---
title: Network Monitoring
description: Automatically track network requests in your web app with Embrace
sidebar_position: 1
---

# Network Monitoring

The Embrace SDK automatically monitors network requests made through `fetch` or `XMLHttpRequest` in your application,
providing visibility into network performance, errors, and behavior.

## How Network Monitoring Works

The SDK leverages the [@opentelemetry/instrumentation-fetch](https://www.npmjs.com/package/@opentelemetry/instrumentation-fetch)
and [@opentelemetry/instrumentation-xml-http-request](https://www.npmjs.com/package/@opentelemetry/instrumentation-xml-http-request)
instrumentation packages from OpenTelemetry to intercept network requests and capture them as spans.

This automatic instrumentation gives you immediate visibility into all network activity without requiring manual code
changes.

## Key Benefits

- Track network request timing and performance
- Identify slow or failing API endpoints
- Monitor request/response sizes
- Troubleshoot network errors
- Correlate network activity with user actions and app behavior

## Configuration Options

Network monitoring behavior can be customized through the process described in [Configuring Automatic Instrumentation](/web/automatic-instrumentation/index.md#configuring-automatic-instrumentation).
Specific configuration options can be found in the [@opentelemetry/instrumentation-fetch](https://github.com/open-telemetry/opentelemetry-js/blob/experimental/v0.57.0/experimental/packages/opentelemetry-instrumentation-fetch/src/fetch.ts#L60)
and [@opentelemetry/instrumentation-xml-http-request](https://github.com/open-telemetry/opentelemetry-js/blob/experimental/v0.57.0/experimental/packages/opentelemetry-instrumentation-xml-http-request/src/xhr.ts#L66)
package documentations.

In addition, to avoid having to set `ignoreUrls` twice the 'network' key can be used to configure both packages at the
same time as described in [Security Considerations](/web/best-practices/security-considerations.md#configure-the-network-monitoring-auto-instrumentation).

## Data Captured

For each network request, the SDK captures:

- Request URL
- HTTP method
- Status code
- Start and end time
- Duration
- Error information (for failed requests)

## Integration with Other Features

Network monitoring integrates with other Embrace features:
- Network spans are associated with the current session
- Custom dashboards can be built to monitor response times to identify slow endpoints
- Alerts can be set on error rates to surface problematic services