---
title: Performance Tracing (Beta)
description: Record traces to monitor the production performance and success rates of operations within your mobile app.
sidebar_position: 14
---

# Performance Tracing (Beta)

## Overview

Embrace’s Performance Tracing solution gives you visibility into any app operation you’d like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

## Feature Support

:::info Minimum Requirements
- **We recommend using the latest React Native SDK version for the most up-to-date API**. Even though Performance Tracing is enabled in versions 4.1.0 and above.
:::

The Embrace Performance Tracing API allows you to:

- Create record data for past operations.
    - To record past operations, you can specify the start and end times of your spans that you might have captured already.
- Add child spans to a parent span to track sub-operations within an operation.
- Attach attributes and span events to each span to give them further context
    - Attributes allow you to specify string key-value pairs that can be useful for filtering, grouping, and deriving custom metrics
    - Span events represent a point in time of the execution of the span and they can also have attributes

There are no limits on the duration of a span as long as the app is running.

There are also no limits to the number of child spans you can have per trace, provided the total number of spans do not exceed the per-session maximum.

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

1. Ensure you’re using a version of the Embrace SDK that supports Performance Tracing.
3. Instrument your app using the reference guide in this section to start adding traces to your operations.
4. See the traces in the Traces section of the Embrace dashboard.

## API Usage Examples

### Create a Span


```javascript
// create a trace by creating its root span
// recording will not behind until the span has been started
// startSpan: (name: string, parentSpanId?: string) => Promise<boolean | string>;

const spanId = await startSpan("parentname")

```

### Add an Attribute to a Span

```javascript
// add an attribute to a specific span
// addSpanAttributeToSpan: (spanId: string, key: string, value: string) => Promise<boolean>;

// Starting a span
const spanId = await startSpan("parentname")

// Adding an attribute to a specific span
addSpanAttributeToSpan(spanId, "myKey", "value")

const attributes = {
  "key1":"value1",
  "key2":"value2",
  "key3":"value3",
}
addSpanEventToSpan(spanId, "eventName", new Date().getTime(), attributes)

```

### Add an Event to a Span

```javascript
// add an event to a specific span
// addSpanEventToSpan: (spanId: string, name: string, timeStampMs?: number, 
//    attributes?: Attributes) => Promise<boolean>;

// Starting a span
const spanId = await startSpan("parentname")

// Adding an event to a specific span

const attributes = {
  "key1":"value1",
  "key2":"value2",
  "key3":"value3",
}
addSpanEventToSpan(spanId, "eventName", new Date().getTime(), attributes)

```

### Stop Span For Operation That Ended Earlier


```javascript
// Stopping a specific span
// stopSpan: (spanId: string, errorCode?: SPAN_ERROR_CODES) => Promise<boolean>;

// Starting a span
const spanId = await startSpan("parentname")

// Do something

// Stopping the span
stopSpan(spanId)

```


### Stop Span For an Operation That Failed

```javascript
// Stopping a specific span
// stopSpan: (spanId: string, errorCode?: SPAN_ERROR_CODES) => Promise<boolean>;
// type SPAN_ERROR_CODES = 'None' | 'Failure' | 'UserAbandon' | 'Unknown';

// Starting a span
const spanId = await startSpan("parentname")

try{
  // Do something that throw an error
}catch(e){
  // Stopping the span with an Error Code
  stopSpan(spanId, "Failure")
}

```

### Add a Child Span If the Parent Started Properly


```javascript
// Starting Spans
const parentSpanId = startSpan("parentname")

const firstChildSpanId = startSpan("firstchildname", parentSpanId)

const secondChildSpanId = startSpan("secondchildname", firstChildSpanId)

// Stopping Spans
stopSpan(firstChildSpanId)
stopSpan(secondChildSpanId)
stopSpan(parentSpanId)

```

### Create a span around a function (It will stop after the function finish)

```javascript
// This method will start a span, add attributes / events (optional) to it, execute the function and stop to the span

// recordSpan: (name: string, callback: () => void | Promise<void>, attributes?: Attributes,
//    events?: Events[], parentSpanId?: string) => Promise<boolean>;
// interface Attributes {
//  [key: string]: string;
// }
// interface Events {
//   name: string;
//   timeStampMs?: number;
//   attributes?: Attributes;
// }

const trackMe = async ()=>{

} 
const attributes = {
  "key1":"value1",
  "key2":"value2",
  "key3":"value3",
}
 const events = [
  {
    name: 'eventName',
    timeStampMs: new Date().getTime(),
    attributes: {"eventKey": 'value'},
  },
];
// Starting Spans
const spanResult = await recordSpan("parentname", trackMe, attributes, events)

```

### Create a span around a function (It will stop after the function finish)

```javascript
// This method will create a span, add attributes / events (optional) to it, for a specific time

// recordCompletedSpan: (name: string, startTimeMS: number, endTimeMS: number, 
//    errorCode?: SPAN_ERROR_CODES, parentSpanId?: string, attributes?: Attributes, 
//    events?: Events[]) => Promise<boolean>;

// type SPAN_ERROR_CODES = 'None' | 'Failure' | 'UserAbandon' | 'Unknown';
// interface Attributes {
//  [key: string]: string;
// }
// interface Events {
//   name: string;
//   timeStampMs?: number;
//   attributes?: Attributes;
// }

const attributes = {
  "key1":"value1",
  "key2":"value2",
  "key3":"value3",
}
 const events = [
  {
    name: 'eventName',
    timeStampMs: new Date().getTime(),
    attributes: {"eventKey": 'value'},
  },
];

const startTime = new Date().getTime()
const endTime = new Date().getTime() + 1

const spanResult = await recordCompletedSpan: ("parentname", startTime, 
                            endTime, "None", undefined, attributes, events)

```

## Support

If you have any questions or if something is not working as intended, please get in touch with your Customer Success Manager.