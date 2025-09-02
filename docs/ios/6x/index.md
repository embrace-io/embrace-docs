---
title: 6.x Apple SDK
description: Using the Embrace Open Source SDK
sidebar_position: 1
---

# Using the Embrace 6.x SDK

The Embrace 6.x Apple SDK is designed to provide first class observability and diagnostic data collection to your mobile application. It supports multiple platforms including iOS, iPadOS, and tvOS.

Embrace's 6.x SDK is open-source and can be found on [GitHub](https://github.com/embrace-io/embrace-apple-sdk/). It has been designed so that any Apple developer can add the SDK to their app and transmit telemetry without using Embrace, or can use Embrace to gain the key mobile insights that we've cultivated in our [product](/product/index.md).

## What is in the Embrace Apple SDK?

The Embrace Apple SDK is built on OpenTelemetry signals like logs and spans, which allow you to [export the telemetry](/ios/6x/advanced-features/opentelemetry-export.md) captured in your app to other sources. We encourage you to add the SDK to your app and view the logs and traces that the SDK automatically captures, with the caveat that we can't guarantee you'll quickly make sense of it all. Embrace 6.x SDK is also built in Swift, which allows us to provide more support for modern language features like async/await.

Please note that some prior functionality has been deprecated and that some method names or implementation details may differ. Further details are available in the [migration guide](/ios/6x/getting-started/migration-guide.md). Please reach out to in the [Community Slack](https://community.embrace.io) if you have any questions.  

## Built on OpenTelemetry

The 6.x iOS SDK has been rearchitected from the foundations to support and extend [OpenTelemetry](https://opentelemetry.io) for mobile. The new modular approach builds the Embrace event-based observability paradigm directly on OpenTelemetry signals, namely, [Traces](https://opentelemetry.io/docs/concepts/signals/traces/) and [Logs](https://opentelemetry.io/docs/concepts/signals/logs/).

### How we built it

As an example, [Sessions](https://embrace.io/product/user-session-insights/) are the core of Embrace's reproduce-and-fix approach to insights. An individual Session takes place while the app is in foreground, or separately while the app is in the background, and captures everything that your app is doing until the user starts or stops using the app. Given that Sessions take place in a given time period, with different related activities occurring in that time, it shouldn't surprise anyone OTel-aware that we model Sessions as a **trace**.

Whenever a Session starts, as we can see in the [`SessionController`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Session/SessionController.swift#L68), a span begins that will endure until the session ends:  

```swift
// from [`SessionSpanUtils`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Session/SessionSpanUtils.swift#L15)
    static func span(id: SessionIdentifier, startTime: Date) -> Span {
        EmbraceOTel().buildSpan(name: spanName, type: .session)
            .setStartTime(time: startTime)
            .setAttribute(key: sessionIdAttribute, value: id.toString)
            .startSpan()
    }
```

And if we dig in a little farther, we'll see that [`EmbraceOTel`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceOTelInternal/EmbraceOTel.swift) object exists, in part, to hold an [OTel tracer](https://github.com/open-telemetry/opentelemetry-swift-core/blob/main/Sources/OpenTelemetryApi/Trace/Tracer.swift):

```swift
    internal var tracer: Tracer {
        OpenTelemetry.instance.tracerProvider.get(
            instrumentationName: instrumentationName,
            instrumentationVersion: instrumentationVersion)
    }

//...
    public func buildSpan(
        name: String,
        type: SpanType,
        attributes: [String: String] = [:]
    ) -> SpanBuilder {

        let builder = tracer.spanBuilder(spanName: name)
                        .setAttribute(
                            key: SpanAttributeKey.type,
                            value: type.rawValue )

        for (key, value) in attributes {
            builder.setAttribute(key: key, value: value)
        }

        return builder
    }
```

Because the Session is still ongoing, this span is built and we will end it later. When will the span end? When the [Session itself ends](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Session/SessionController.swift#L112).

```swift
class SessionController {
    //...
    func endSession() -> Date {
        let now = Date()
        // end OTel span
        currentSessionSpan?.end(time: now)

        // ...
        // upload session to Embrace
        uploadSession()
    }
}
```

Our engineering and product teams have many ideas about Sessions and how they work within the OTel specification, or rather how they don't work presently. Despite this, we've created the tools to take this Embrace concept of Sessions and export it as opinion-free telemetry in the form of OpenTelemetry spans.

### Events mapped to OTel signals

If the prior section was too in-depth, here's a handy chart of the important Embrace SDK features and how they currently map to OpenTelemetry signals:

| Embrace concept | OTel Representation|
| ------------ | ---------- |
| Session | Span |
| Embrace logs | Log |
| View Breadcrumb | Span |
| Custom Breadcrumb | Span event |
| Crash | Log |
| Exception | Log |
| Network request | Span + Span attributes |
| ANR interval (Android) | Span |
| Low memory warning | Span event|
