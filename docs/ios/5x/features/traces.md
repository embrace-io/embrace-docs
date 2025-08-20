---
title: Traces
description: Record spans to monitor the production performance and success rates of operations within in your application.
sidebar_position: 10
---

# Traces

## Overview

Embrace’s Traces solution gives you complete visibility into any customized operation you’d like to track, enabling you to identify, prioritize, and resolve any performance issue. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user

## Feature Support

The Embrace Traces API allows you to:

- Create real-time performance timers or record past operations.
  - For real-time tracing, we use a “Stopwatch” concept that enables you to start and stop the timing of a span manually
  - To record a past operation, you can pass in start and end times during span creation.
- Create child spans that can be attached to a parent.
- Add attributes and events to each span
  - Attributes have String keys and String values
  - Events also have a set of attributes that have String keys and values.

There is no limit on the duration of spans, but **if a crash occurs during a span that is in progress, that span will not be recorded.**

### Limits

| Type                               | Limit          |
| ---------------------------------- | -------------- |
| Max number of span per session     | 100            |
| Max number of spans per Root Span  | 10             |
| Max number of attributes per span  | 50             |
| Max number of events per span      | 10             |
| Max number of attributes per event | 10             |
| Length of attribute keys           | 50 characters  |
| Length of attribute values         | 200 characters |
| Length of Span names               | 50 characters  |
| Length of Event names              | 100 characters |

:::warning Exceeding Limits
If you exceed the listed limits, the operation with the limit-exceeding call will fail and return a value indicating that. See the API documentation for details.
:::

### Naming Conventions

- Span Names are **case-sensitive** and are a **max of 50 characters.**
- Key Names are **case-sensitive**, have a **max of 50 characters**, and are **alpha-numeric**

:::warning Internal Prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace span names and attribute keys. You should never create a name with `emb-` and `emb.` prefixes
:::

## Integration Steps

:::info Minimum SDK Version
**We recommend using at least iOS SDK v5.23.1** and updating to new versions as they come out to ensure you get the latest updates for this developing feature.
:::

To use this feature:

1. Ensure you’re using a version of the Embrace SDK that supports Traces.
2. Instrument your app using the reference guide in this sections to start adding spans to your operations.
3. See the spans in the [Traces](/product/traces/index.md) section of the Embrace dashboard.

### Create Span

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
let span = Embrace.sharedInstance().createSpanNamed("process-image")
```

</TabItem>
<TabItem value="objc" label="Objective-C">

```objc
id<EmbraceOTelSpan> span = [[Embrace sharedInstance] createSpanNamed:@"process-image" parent:nil];
```

</TabItem>
</Tabs>

### Start Span

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
let span = Embrace.sharedInstance().createSpanNamed("custom-name")

// start span at current time
span.start()
```

</TabItem>
<TabItem value="objc" label="Objective-C">

```objc
id<EmbraceOTelSpan> span = [[Embrace sharedInstance] createSpanNamed:@"custom-name"];

// start span at current time
[span start];
```

</TabItem>
</Tabs>

### Adding a Child Span

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
// Create a root span with a custom name
let span = Embrace.sharedInstance().createSpanNamed("process-batch")

// Create a child span by including the parent parameter
let childSpan = Embrace.sharedInstance().createSpanNamed("process-item", parent: span)
```

</TabItem>
<TabItem value="objc" label="Objective-C">

```objc
// Create a root span with a custom name
id<EmbraceOTelSpan> span = [[Embrace sharedInstance] createSpanNamed:@"process-batch" parent:nil];

// Create a child span by including the parent parameter
id<EmbraceOTelSpan> childSpan = [[Embrace sharedInstance] createSpanNamed:@"process-item" parent:span];
```

</TabItem>
</Tabs>

### Adding Events and Attributes

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
// Add attributes to spans to provide context
span.addAttribute(withKey: "product.id", value: "ABC123")

// Add span events to mark checkpoints
span.addEventNamed("image-render-complete", time: UInt(Date().timeIntervalSince1970 * pow(10, 9)))
```

</TabItem>
<TabItem value="objc" label="Objective-C">

```objc
// Add attributes to spans to provide context
[span addAttributeWithKey:@"product.id" value:@"ABC123"];

// Add span events to mark checkpoints
[span addEventNamed:@"image-render-complete"
               time:(NSUInteger)[[NSDate date] timeIntervalSince1970] * NSEC_PER_SEC
         attributes:nil];
```

</TabItem>
</Tabs>

### End Span

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
// Stop span at current time, considered successful
span.stop()

// Stop span at current time with explicit error code
span.stopWith(.Failure)
```

</TabItem>
<TabItem value="objc" label="Objective-C">

```objc
// Stop span at current time, considered successful
[span stop];

// Stop span at current time with explicit error code
[span stopWithErrorCode: Failure];
```

</TabItem>
</Tabs>

### Recording a Completed Span

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
let startAt = Date()
let endAt = startAt.addingTimeInterval(4.0)

// manually record operation timing after it occurs
Embrace.sharedInstance().recordCompletedSpanNamed(
    "deserialize-data-blob",
    parent: nil,
    startTimeNanos: Int(startAt.timeIntervalSince1970 * pow(10, 9)),
    endTimeNanos: Int(endAt.timeIntervalSince1970 * pow(10, 9)),
    attributes: nil,
    events: nil,
    errorCode: .None
)
```

</TabItem>
<TabItem value="objc" label="Objective-C">

```objc
NSDate *startAt = [NSDate date];
NSDate *endAt = [startAt dateByAddingTimeInterval:4.0];

// manually record operation timing after it occurs
[[Embrace sharedInstance] recordCompletedSpanNamed:@"deserialize-data-blob"
                                            parent:nil
                                    startTimeNanos:[startAt timeIntervalSince1970] * NSEC_PER_SEC
                                      endTimeNanos:[endAt timeIntervalSince1970] * NSEC_PER_SEC
                                        attributes:nil
                                            events:nil
                                         errorCode:None];
```

</TabItem>
</Tabs>

## Support

If you have any questions or if something is not working as intended, please get in touch with your Customer Success Manager.
