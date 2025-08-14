---
title: Network Spans Forwarding
sidebar_position: 100
---

# Network Spans Forwarding

Diagnosing network errors doesn't need to be an opaque process with finger-pointing between mobile and backend teams.

<div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/jJVlc8F89Qo?si=-udHrlujEMiTsOuV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## ID every network requests

Embrace can automatically add a unique identifier to **every** network request your app makes.  This makes it possible to trace the same request in our User Timeline *and* the backend monitoring service you already use.

<img src={require('@site/static/images/nsf-example.png').default} alt="traceparent example" />

We use [w3c traceparents](https://www.w3.org/TR/trace-context-1/#traceparent-header) to create unique identifiers, which means they will automatically propagate through the traces products of Grafana Cloud, Honeycomb, Datadog, New Relic, Chronosphere, and others.  
According to the w3c convention, you can use the [`trace-id`](https://www.w3.org/TR/trace-context-1/#examples-of-http-traceparent-headers) portion of the traceparent to find your forwarded traces in the destination product.

Network Span Forwarding is configured remotely in the supported Embrace SDKs, so there is no client-side instrumentation to add once you have enabled the feature. You can determine what percentage of requests to send a traceparent for, and you can also specify the domains that Embrace should forward network spans for.

## Enable Network Spans Forwarding

:::info Request NSF
To request Network Span Forwarding be turned on, simply click the "enable" button next to any Network Requests on a User Timeline or Network Path Details page.
:::

<img src={require('@site/static/images/NSF > Timeline button.png').default} alt="big button" />

### Requirements

NSF is supported on the following SDK versions:
* iOS 6.0+
* Android 6.0+
* Flutter 3.0+
* React Native 5.2+

Accounts must have a [Data Destination](/data-destinations/) set up.

Accounts not matching either condition will see a checklist pop up when trying to enable.
<img src={require('@site/static/images/NSF > checklist.png').default} alt="NSF checklist" />



Once all requirements are met, Network Spans Forwarding will be set up by an integrations specialist who will reach out to confirm details.


## Analyze metadata

Additionally, Embrace can forward metadata associated with each call.  Device, app version, and OS version will be properties for each traceparent-tagged call, forwarded as an OTel Span.  Your backend team can use their observability tools to set up analyses and monitoring.

Embrace currently supports Network Span Forwarding for Grafana Cloud, New Relic, Honeycomb, Datadog, Chronosphere and Elastic.  See our guide to enabling [Data Destinations](/data-destinations/) to get started.


<img src={require('@site/static/images/NSF > Honeycomb example.png').default} alt="NSF in honeycomb" />
