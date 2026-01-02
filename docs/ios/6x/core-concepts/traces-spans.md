---
title: Traces & Spans
description: Understanding traces and spans in the Embrace iOS SDK 6.x
sidebar_position: 2
---

# Traces & Spans

Traces are a powerful feature in the Embrace iOS SDK that give you complete visibility into any operation you'd like to track in your application.

## What are Traces and Spans?

In the Embrace SDK (built on OpenTelemetry):

- A **trace** represents an entire operation or workflow in your application  
- A **span** represents a single unit of work within that trace
- Spans can be nested, forming parent-child relationships to create a trace

Traces help you identify, prioritize, and resolve performance issues by providing detailed information about operations in your app.

## Key Capabilities

With the Embrace Traces API, you can:

- Create real-time performance timers or record past operations
- Create child spans that can be attached to a parent
- Add attributes and events to each span for context
- Track success/failure states of operations

## Trace Limits

| Type                                  | Limit          |
| ------------------------------------- | -------------- |
| Max number of attributes per span     | 128            |
| Max number of events per span         | 9999           |
| Max number of attributes per event    | 128            |
| Max number of breadcrumbs per session | 100            |
| Length of Span names                  | 128 characters |

If you exceed these limits, the operation with the limit-exceeding call will fail.

## Naming Conventions

- Span Names are **case-sensitive** and are a **max of 50 characters**
- Key Names are **case-sensitive**, have a **max of 50 characters**, and are **alpha-numeric**

:::warning Internal Prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace span names and attribute keys. You should never create a name with these prefixes.
:::

## Creating and Using Spans

### Creating a Span Builder

```swift
let spanBuilder = Embrace
                .client?
                .buildSpan(
                    name: "process-image",
                    type: .performance, //default argument
                    attributes: [String:String]() //default argument
                )
```

The `type` argument indicates the purpose of the span, and the `attributes` argument adds custom attributes.

### Starting a Span

```swift
// Using the span builder
let spanBuilder = Embrace
            .client?
            .buildSpan(name: "process-image")

let span = spanBuilder.startSpan()

// Or in one line
let span = Embrace
            .client?
            .buildSpan(name: "process-image")
            .startSpan()
```

### Setting a Custom Start Time

```swift
let span = Embrace
            .client?
            .buildSpan(name: "process-image")
            .setStartTime(time: Date().advanced(by: -6.0))
            .startSpan()
```

### Creating Parent-Child Relationships

```swift
// Create a root span with a custom name
let parentSpan = Embrace
                .client?
                .buildSpan(name: "process-batch")
                .startSpan()

// Create a child span by setting the parent span prior to start
let childSpan = Embrace
                .client?
                .buildSpan(name: "process-item")
                .setParent(parentSpan)
                .startSpan()
```

### Adding Events and Attributes

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

### Ending Spans

```swift
// Stop span at current time, considered successful
span.end()

// Stop span at a particular time, considered successful
span2.end(time: time.advanced(by: 3.0))

// Stop span at current time with explicit error code
span3.end(errorCode: .userAbandon)
```

### Recording a Completed Span

Sometimes you need to create a span for an operation that has already completed:

```swift
let startTime = Date()
let endTime = startTime.addingTimeInterval(4.0)

// Manually record operation timing after it occurs
Embrace
    .client?
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

### Using Spans as Object Properties

To store a Span in object scope, you'll need to import the OpenTelemetry API:

```swift
import Foundation
import EmbraceIO
import OpenTelemetryApi

class MyClass {
    // Create a Span property that will be available across the object
    var activitySpan: Span? = nil // Span here comes from `OpenTelemetryApi`, not `EmbraceIO`

    func activityStart() {
        // Something starts
        // ...
        // And we want to trace it
        activitySpan = Embrace.client?.buildSpan(name: "activity")
                .startSpan()
    }

    func activityChanged() {
        // Something changed
        // ...
        // And we want to note it
        activitySpan?.addEvent(name: "activity-changed")
    }

    func activitySuccessfully() {
        // Something ended
        // ...
        activitySpan?.end()
    }

    func activityEnded(with failure: EmbraceIO.ErrorCode) {
        // Something ended unsuccessfully
        // ...
        activitySpan?.end(errorCode: failure)
    }
}
```

### Span Auto Termination

You can flag a span to be automatically terminated if it's still open when the Embrace session ends:

```swift
let span = Embrace
            .client?
            .buildSpan(name: "process-image", autoTerminationCode: .failure)
            .startSpan()
```

Child spans of a span flagged for auto termination will also be terminated when their parent is terminated.

## Traces vs Moments

If you're migrating from Embrace 5.x, note that Traces replace the Moments functionality with enhanced capabilities. They serve the same purpose of tracking operations, but with the added power of OpenTelemetry's tracing model.

## Best Practices

- Use meaningful names for spans that reflect the operation being performed
- Create parent-child relationships to represent operation hierarchies
- Add relevant attributes to provide context for operations
- Keep span names consistent across your application for better analytics
- Consider how spans relate to sessions in your application architecture
- End spans properly to ensure they're recorded correctly

 <!-- TODO: Add examples of common use cases for traces like tracking API calls, user workflows, and performance bottlenecks -->
