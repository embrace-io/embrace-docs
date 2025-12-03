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

- iOS 6.0+
- Android 6.0+
- Flutter 3.0+
- React Native 5.2+
- Web 2.2+

Accounts must have a [Data Destination](/data-destinations/) set up.

Accounts not matching either condition will see a checklist pop up when trying to enable.

<img src={require('@site/static/images/NSF > checklist.png').default} alt="NSF checklist" />

Once all requirements are met, Network Spans Forwarding will be set up by an integrations specialist who will reach out to confirm details.

## Analyze metadata

Additionally, Embrace can forward metadata associated with each call. Your backend team can use their observability tools to set up analyses and monitoring.

Here you can see all the attributes and resource attributes that a Span will have with examples. 

Attributes:
- emb.app_id: "abcde"
- emb.app_version: "2.2.0"
- emb.country_iso: "US"
- emb.dashboard_session: "https://dash.io/app/abcde/grouped_sessions/day/45919F47E2AC4E0BA074110A6414F083/FEC3F288397343E9BC2F77870F01965A@/FEC3F288397343E9BC2F77870F01965A"
- emb.device_model: "arm64"
- emb.device_id: "45919F47E2AC4E0BA074110A6414F083"
- emb.os_version: "26.1"
- emb.region: "Washington"
- emb.sdk_version: "6.14.1"
- http.request.method: "POST"
- http.response.status_code: 200
- http.route: "/mock/trace_forwarding"
- http.status_code : 200
- url.domain: "dash-api.io"
- url.path: "/mock/trace_forwarding"
- url.full: "https://dash-api.io/mock/trace_forwarding"
- traceparent: "00-b543b5ba9576c535b3b6221a26bd763e-4283ddf8e9996b0f-01"
- device.manufacturer: "Apple"
- device.model.name: "arm64"

- Resource attributes
- deployment.environment.name: "prod"
- emb.app_id: "abcde"
- emb.os: "iOS"
- service.name: "embrace-mock-app"
- service.version: "1.0"
- telemetry.sdk.language: "go"
- telemetry.sdk.name: "opentelemetry"
- telemetry.sdk.version: "1.38.0"

Embrace currently supports Network Span Forwarding for these [Data Destinations](/data-destinations/#supported-platforms). See our guide to enabling [Data Destinations](/data-destinations/) to get started.

<img src={require('@site/static/images/NSF > Honeycomb example.png').default} alt="NSF in Honeycomb" />
