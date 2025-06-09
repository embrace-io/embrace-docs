---
title: Document Load
description: Automatically track network requests in your web app with Embrace
sidebar_position: 4
---

# Document Load

The Embrace SDK automatically monitors the document load of your application, providing visibility into bottlenecks and
inefficiencies during page load.

## How Document Load Monitoring Works

The SDK leverages the [@opentelemetry/instrumentation-document-load](https://www.npmjs.com/package/@opentelemetry/instrumentation-document-load)
instrumentation package from OpenTelemetry to listen to the `window`'s 'load' event and emit spans for each of the fetches
that occur during initial load.

This automatic instrumentation gives you immediate visibility into all the resources being loaded when a user visits your
application without requiring manual code changes.

## Key Benefits

- Track document and resource fetches during page load
- Identify bottlenecks and slow resources
- Monitor aggregated average and p90 load times
- View document load summaries alongside subsequent user actions and app behavior

## Configuration Options

Document load monitoring behavior can be customized through the process described in [Configuring Automatic Instrumentation](/docs/web/automatic-instrumentation/index.md#configuring-automatic-instrumentation).
Specific configuration options can be found in the [@opentelemetry/instrumentation-document-load](https://www.npmjs.com/package/@opentelemetry/instrumentation-document-load/v/0.44.1#document-load-instrumentation-options)
package documentation.

## Data Captured

For each document load, the SDK captures:

- The page URL
- Start and end times for each resource fetch
- URL for each asset being fetched

## Integration with Other Features

Document Load monitoring integrates with other Embrace features:
- Document Load spans are associated with the current session and combined with any relevant LCP Web Vital reports
- Custom dashboards can be built to monitor aggregate document load metrics
- Alerts can be set on load times exceeding specific thresholds