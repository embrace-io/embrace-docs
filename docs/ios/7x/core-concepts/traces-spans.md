---
title: Traces & Spans
description: Understanding traces and spans in the Embrace iOS SDK 7.x
sidebar_position: 2
---

## Traces & Spans

Traces are a powerful feature in the Embrace iOS SDK that give you complete visibility into any operation you'd like to track in your application.

### What are Traces and Spans?

In the Embrace SDK (built on OpenTelemetry):

- A **trace** represents an entire operation or workflow in your application
- A **span** represents a single unit of work within that trace
- Spans can be nested, forming parent-child relationships to create a trace

Traces help you identify, prioritize, and resolve performance issues by providing detailed information about operations in your app.

### Key Capabilities

With the Embrace Traces API, you can:

- Create real-time performance timers or record past operations
- Create child spans that can be attached to a parent
- Add attributes and events to each span for context
- Track success/failure states of operations

### Trace Limits

| Type                                  | Limit          |
| ------------------------------------- | -------------- |
| Max custom spans per session          | 1000           |
| Max number of attributes per span     | 128            |
| Max number of events per span         | 9999           |
| Max number of attributes per event    | 128            |
| Max number of breadcrumbs per session | 100            |
| Length of Span names                  | 128 characters |

Custom spans exceeding the per-session limit will be dropped by the backend. If you exceed the other limits, the operation with the limit-exceeding call will fail.

### Naming Conventions

- Span Names are **case-sensitive** and are a **max of 128 characters**
- Key Names are **case-sensitive**, have a **max of 128 characters**, and are **alphanumeric**

:::warning Internal Prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace span names and attribute keys. You should never create a name with these prefixes.
:::

### Creating and Using Spans

#### Creating a Span

<code>createSpan</code> both creates and starts the span, returning an `EmbraceSpan?`.

```swift
let span = EmbraceIO.shared.createSpan(
    name: "process-image",
    type: .performance, // default argument
    attributes: [:] // default argument
)
```

The `type` argument indicates the purpose of the span, and the `attributes` argument adds custom attributes.

#### Setting a Custom Start Time

Pass a `startTime` to record a span that began in the past:

```swift
let span = EmbraceIO.shared.createSpan(
    name: "process-image",
    startTime: Date().advanced(by: -6.0)
)
```

#### Creating Parent-Child Relationships

```swift
// Create a root span with a custom name
let parentSpan = EmbraceIO.shared.createSpan(name: "process-batch")

// Create a child span by passing the parent span
let childSpan = EmbraceIO.shared.createSpan(name: "process-item", parentSpan: parentSpan)
```

#### Adding Events and Attributes

```swift
// Add span events to mark points in time
span?.addEvent(
    name: "image-render-complete",
    attributes: [ "size" : .int(3) ],
    timestamp: Date.now
)

// Add attributes to spans to provide context
span?.setAttribute(key: "product.id", value: "ABC123")
```

#### Ending Spans

```swift
// Stop span at current time, considered successful
span?.end()

// Stop span at current time, marked as failed
span3?.end(errorCode: .failure)
```

#### Recording a Completed Span

Sometimes you need to create a span for an operation that has already completed. Pass both `startTime` and `endTime` to `createSpan`:

```swift
let startTime = Date()
let endTime = startTime.addingTimeInterval(4.0)

// Manually record operation timing after it occurs
EmbraceIO.shared.createSpan(
    name: "deserialize-data-blob",
    type: .performance,
    startTime: startTime,
    endTime: endTime
)
```

#### Using Spans as Object Properties

To store a span in object scope, use the `EmbraceSpan` type (exported by `EmbraceIO`):

```swift
import Foundation
import EmbraceIO

class MyClass {
    // Create a Span property that will be available across the object
    var activitySpan: EmbraceSpan? = nil // EmbraceSpan comes from `EmbraceIO`

    func activityStart() {
        // Something starts
        // ...
        // And we want to trace it
        activitySpan = EmbraceIO.shared.createSpan(name: "activity")
    }

    func activityChanged() {
        // Something changed
        // ...
        // And we want to note it
        activitySpan?.addEvent(name: "activity-changed", attributes: [:])
    }

    func activitySuccessfully() {
        // Something ended
        // ...
        activitySpan?.end()
    }

    func activityEnded() {
        // Something ended unsuccessfully
        // ...
        activitySpan?.end(errorCode: .failure)
    }
}
```

#### Span Auto Termination

You can flag a span to be automatically terminated if it's still open when the Embrace session ends:

```swift
let span = EmbraceIO.shared.createSpan(name: "process-image", autoTerminationCode: .failure)
```

Child spans of a span flagged for auto termination will also be terminated when their parent is terminated.

### Traces vs Moments

If you're migrating from Embrace 5.x, note that Traces replace the Moments functionality with enhanced capabilities. They serve the same purpose of tracking operations, but with the added power of OpenTelemetry's tracing model.

### Best Practices

- Use meaningful names for spans that reflect the operation being performed
- Create parent-child relationships to represent operation hierarchies
- Add relevant attributes to provide context for operations
- Keep span names consistent across your application for better analytics
- Consider how spans relate to sessions in your application architecture
- End spans properly to ensure they're recorded correctly

  <!-- TODO: Add examples of common use cases for traces like tracking API calls, user workflows, and performance bottlenecks -->
