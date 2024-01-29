---
title: Network Spans Forwarding
sidebar_position: 7
---

# Network Spans Forwarding

Diagnosing network errors doesn't need to be an opaque process with finger-pointing between mobile and backend teams.

## ID every network requests
Embrace can automatically add a unique identifier to **every** network request your app makes.  This makes it possible to trace the same request in our User Timeline *and* the backend monitoring service you already use.

<add an image>

We use [w3c traceparents](www.add-a-link.com](https://www.w3.org/TR/trace-context-1/#traceparent-header) to create unique identifiers, which means they will automatically propage through the traces products of Grafana Cloud Traces, Honeycomb, Datadog, New Relic, and others.


## Analyze metadata

Additionally, Embrace can forward metadata associated with each call.  Device, app version, and OS version will be properties for each traceparent-tagged call, forwarded as an OTel Span.  Your backend team can use their observability tools to set up analyses and monitoring.

Embrace currently supports Network Span Forwarding for Datadog, and is adding support for Grafana Cloud Traces.  See our guide to enabling [Data Destinations](/docs/data-destinations/) to get started.

