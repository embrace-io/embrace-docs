---
title: Network Spans Forwarding
sidebar_position: 7
---

# Network Spans Forwarding

Diagnosing network errors doesn't need to be an opaque process with finger-pointing between mobile and backend teams.

<div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/jJVlc8F89Qo?si=-udHrlujEMiTsOuV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## ID every network requests
Embrace can automatically add a unique identifier to **every** network request your app makes.  This makes it possible to trace the same request in our User Timeline *and* the backend monitoring service you already use.

<img src={require('@site/static/images/nsf-example.png').default} alt="traceparent example" />

We use [w3c traceparents](https://www.w3.org/TR/trace-context-1/#traceparent-header) to create unique identifiers, which means they will automatically propagate through the traces products of Grafana Cloud Traces, Honeycomb, Datadog, New Relic, and others. According to the w3c convention, you can use the [`trace-id`](https://www.w3.org/TR/trace-context-1/#examples-of-http-traceparent-headers) portion of the traceparent to find your forwarded traces in the destination product.

You can also specify the domains that Embrace should forward network spans for. Speak to [support](mailto:support@embrace.com) to find out more.

:::info Request NSF
To request Network Span Forwarding be turned on, simply click the "enable" button next to any Network Requests on a User Timeline or Network Path Details page.
:::

<img src={require('@site/static/images/NSF > Timeline button.png').default} alt="big button" />

## Analyze metadata

Additionally, Embrace can forward metadata associated with each call.  Device, app version, and OS version will be properties for each traceparent-tagged call, forwarded as an OTel Span.  Your backend team can use their observability tools to set up analyses and monitoring.

Embrace currently supports Network Span Forwarding for Grafana Cloud Traces, New Relic, Honeycomb and Datadog.  See our guide to enabling [Data Destinations](/data-destinations/) to get started.


<img src={require('@site/static/images/NSF > Honeycomb example.png').default} alt="NSF in honeycomb" />
