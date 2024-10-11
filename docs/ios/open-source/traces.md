---
title: Traces
description: Record spans to monitor the production performance and success rates of operations.
sidebar_position: 8
---

# Traces

## Overview

Embrace’s Traces gives you complete visibility into any customized operation you’d like to track, enabling you to identify, prioritize, and resolve any performance issue. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user

## Feature Support

The Embrace Traces API allows you to:

- Create real-time performance timers or record past operations.
    - For real-time tracing, we use a “Stopwatch” concept that enables you to start and stop the timing of a span manually
    - To record a past operation, you can pass in start and end times during span creation.
- Create child spans that can be attached to a parent.
- Add attributes and events to each span
    - Attributes have `String` keys and `String` values
    - Events also have a set of attributes that have `String` keys and values.

There is no limit on the duration of spans, but **if a crash occurs during a span that is in progress, that span will not be recorded.**

### Limits

| Type  | Limit |
| --- | --- |
| Max number of spans per session  | 100 |
| Max number of spans per Root Span | 10 |
| Max number of attributes per span | 50  |
| Max number of events per span | 10 |
| Max number of attributes per event  | 10 |
| Length of attribute keys | 50 characters |
| Length of attribute values | 200 characters |
| Length of Span names | 50 characters |
| Length of Event names | 100 characters |

:::warning Exceeding Limits
If you exceed the listed limits, the operation with the limit-exceeding call will fail and return a value indicating that there is a failure. See the API documentation for details.
:::

### Naming Conventions

- Span Names are **case-sensitive** and are a **max of 50 characters.**
- Key Names are **case-sensitive**, have a **max of 50 characters**, and are **alpha-numeric**

:::warning Internal Prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace span names and attribute keys. You should never create a name with `emb-` and `emb.` prefixes
:::

## Integration Steps

To use this feature:

1. Ensure you’re using a version of the Embrace SDK that supports Traces.
2. Instrument your app using the reference guide in this sections to start adding spans to your operations.
3. See the spans in the Traces section of the Embrace dashboard.

### Create SpanBuilder

To trace an in-progress operation, use the `Embrace.client` instance to create a `Span`. This span is atop the OpenTelemetry API and builds an OTel-exportable span. 

Note: Until the span is started, the `.buildSpan` method below and any decorators return a `SpanBuilder` object.

```swift
let spanBuilder = Embrace
                .client?
                .buildSpan(
                    name: "process-image",
                    type: .performance, //default argument
                    attributes: [String:String]() //default argument
                )
```

The `type` argument indicates the purpose of the span and sets an `emb.type` attribute on the span object, which is used to aggregate alike spans in the Embrace dashboard. The `attributes` argument adds custom attributes to the span object.

### Start Span

Spans must be started and ended to ultimately be recorded. Use `.startSpan` to begin recording the span.

```swift
let spanBuilder = Embrace
            .client?
            .buildSpan(name: "process-image")
            .markAsKeySpan()

let span = spanBuilder.startSpan()

// is the same as
let span = Embrace
            .client?
            .buildSpan(name: "process-image")
            .markAsKeySpan()
            .startSpan()
```

Using `.startSpan` sets the startTime of the span as the present time (`Date.now`). If your use case necessitates starting the span at a time other than `.now`, you can set that before beginning the span:

```swift
let span = Embrace
            .client?
            .buildSpan(name: "process-image")
            .markAsKeySpan()
            .setStartTime(time: Date().advanced(by: -6.0))
            .startSpan()
```

:::warning Important
Note that in the spans above the decorator `.markAsKeySpan` was used. This **MUST** be added to any root spans. It is not needed for child spans.
:::

### Parent-Child Span Relationship

A span can be indicated as the child of another span by setting its parent. This must be set on the `SpanBuilder` object, so you should set the parent before starting your span.

```swift
// Create a root span with a custom name
let parentSpan = Embrace
                .client?
                .buildSpan(name: "process-batch")
                .markAsKeySpan()
                .startSpan()

// Create a child span by setting the parent span prior to start
let childSpan = Embrace
                .client?
                .buildSpan(name: "process-item")
                .setParent(parentSpan)
                .startSpan()
```

### Adding Events and Attributes

You can add [Events](https://opentelemetry.io/docs/languages/swift/instrumentation/#creating-span-events) and [Attributes](https://opentelemetry.io/docs/languages/swift/instrumentation/#span-attributes) to your spans. Events and Attributes might seem similar, but note that Events are added with timestamps and can themselves contain Attributes.

```swift
// Add span events to mark points in time
span.addEvent(
    name: "image-render-complete", 
    attributes: [ "size" : .int(3) ],
    timestamp: Date.now
)

// Add attributes to spans to provide context
span.setAttribute(key: "product.id", value: "ABC123")
```

### End Spans

Spans must be ended to be recorded when the session is captured. Ending a span will also export the signal to any OTel exporters that have been configured in the app.

```swift
// Stop span at current time, considered successful
span.end()

// Stop span at a particular time, considered successful
span2.end(time: time.advanced(by: 3.0))

// Stop span at current time with explicit error code
span3.end(errorCode: .userAbandon)
```

### Recording a Completed Span

You can also create a completed span after the fact. 

```swift
let startTime = Date()
let endTime = startTime.addingTimeInterval(4.0)

// manually record operation timing after it occurs
let span = Embrace
            .client?.
            .recordCompletedSpan(
                name: "deserialize-data-blob",
                type: .performance,
                parent: nil,
                startTime: startTime,
                endTime: endTime,
                attributes: [:],
                events: [],
                errorCode: nil
)
```
