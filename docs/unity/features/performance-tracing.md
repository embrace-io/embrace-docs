---
title: Performance Tracing 
description: Record spans to monitor the production performance and success rates of operations within your mobile app.
sidebar_position: 14
---

# Performance Tracing 

## Overview

Embrace’s Traces solution gives you visibility into any app operation you’d like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

## Feature Support

:::info Minimum Requirements
- **We recommend using the latest Embrace Unity SDK version for the most up-to-date API**. Even though Performance Tracing is enabled in [Embrace Unity SDK versions 1.26.0 and above](/unity/integration/linking-embrace/).
:::

The Embrace Performance Tracing API allows you to:

- Create record data for past operations.
    - To record past operations, you can specify the start and end times of your spans that you might have captured already.
- Add child spans to a parent span to track sub-operations within an operation.
- Attach attributes and span events to each span to give them further context
    - Attributes allow you to specify string key-value pairs that can be useful for filtering, grouping, and deriving custom metrics
    - Span events represent a point in time of the execution of the span and they can also have attributes

There are no limits on the duration of a span as long as the app is running.

There are also no limits to the number of child spans you can have per Root Span, provided the total number of spans does not exceed the per-session maximum.

### Limits

| Type  | Limit |
| --- | --- |
| Max number of spans per session  | 500 |
| Max number of attributes per span | 50  |
| Max number of events per span | 10 |
| Max number of attributes per event  | 10 |
| Length of attribute keys | 50 characters |
| Length of attribute values | 200 characters |
| Length of Span names | 50 characters |
| Length of Event names | 100 characters |

:::warning Exceeding Limits
If you exceed the listed limits, the operation with the limit-exceeding call will fail. See the API documentation for details.
:::

### Naming Conventions

- Span Names are **case-sensitive** and are a **max of 50 characters.**
- Key Names are **case-sensitive**, have a **max of 50 characters**, and are **alphanumeric ASCII characters**

:::warning Internal Prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace span and attribute names, respectively. You should never create a span or attribute key name with `emb-` and `emb.` prefixes
:::

## Adding Performance Traces To Your App

To use this feature:

1. **Ensure you're using Embrace Unity SDK version 1.26.0 or greater**.
3. Instrument your app using the reference guide in this section to start adding spans to your operations.
4. See the spans in the Traces section of the Embrace dashboard.

## API Usage Examples

### Create a Span

```csharp
// Create a span by creating a span with a given span name. 
// It is important to note that the millisecond time is given 
// in Unix Epoch/POSIX time rather than in .NET ticks.
Embrace.Instance.StartSpan("SpanName", startTimeMillisPosix);
```

### Add an Attribute to a Span

```csharp
var spanId = Embrace.Instance.StartSpan("SpanId", startTimeMillisPosix);
Embrace.Instance.AddSpanAttribute(spanId, "key", "value");
```

### Add an Event to a Span

```csharp
var spanId = Embrace.Instance.StartSpan("spanName", startTime);
Embrace.Instance.AddSpanEvent(
    spanId,
    "EventName",
    startTime,
    new Dictionary<string, string> { // attributes for the event
        {
            "exampleAttributeKey",
            "exampleAttributeValue"
        }
    }
);
```

### Stop Span For Operation That Ended Earlier

```csharp
Embrace.Instance.StopSpan(spanId, endTimeMillisPosix);
```

### Stop Span For an Operation That Failed

```csharp
Embrace.Instance.StopSpan(spanId, stopTimeMillisPosix, EmbraceSpanErrorCode.FAILURE);
```

### Add a Child Span If the Parent Started Properly

```csharp
Embrace.Instance.StartSpan("childSpanName", startTimeMillisPosix, parentSpanId)
```

### Record a completed span

```csharp
Embrace.Instance.RecordCompletedSpan(
    "spanName",
    startTimeMillisPosix,
    endTimeMillisPosix,
    EmbraceSpanErrorCode.NONE,
    attributesMap,
    parentSpanId
);
```

:::info Minimum Requirements
- In order for a child span to be recorded, you must stop it before stopping the parent span.
:::

## Support

If you have any questions or if something is not working as intended, please get in touch with your Customer Success Manager.
