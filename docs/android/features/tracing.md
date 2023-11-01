---
title: Performance Tracing (Beta)
description: Record traces to monitor the production performance and success rates of operations within in your application.
sidebar_position: 14
---

# Performance Tracing (Beta)

## Overview

Embrace’s Performance Tracing solution gives you complete visibility into any customized operation you’d like to track, enabling you to identify, prioritize, and resolve any performance issue. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

## Feature Support

The Embrace Performance Tracing API allows you to:

- Create real-time performance timers or record past operations.
    - For real-time tracing, we use a “Stopwatch” concept that lets you start and stop a span's timing manually.
    - To record a past operation, you can pass in start and end times during span creation.
- Create child spans that can be attached to a parent.
- Add attributes and events to each span.
    - Attributes have String keys and String values.
    - Events also have a set of attributes that have String keys and values.

There is no limit on the duration of a span, but **if a JVM exception occurs before a span ends, the span will auto-close.**

### Limits

| Type  | Limit |
| --- | --- |
| Max number of traces per session  | 100 |
| Max number of spans per trace | 10 |
| Max number of attributes per span | 50  |
| Max number of events per span | 10 |
| Max number of attributes per event  | 10 |
| Length of attribute keys | 50 characters |
| Length of attribute values | 200 characters |
| Length of Span names | 50 characters |
| Length of Event names | 100 characters |

:::warning Exceeding Limits
If you exceed the listed limits, the operation with the limit-exceeding call will fail and return a value indicating that. See the API documentation for details.
:::

### Naming Conventions

- Span Names are **case-sensitive** and are a **max of 50 characters.**
- Key Names are **case-sensitive**, have a **max of 50 characters**, and are **alpha-numeric**

:::warning Internal Prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace attributes and span names. You should never create a name with `emb-` and `emb.` prefixes
:::

## Integration Steps

:::info Minimum SDK Version
**We recommend using at least Android SDK v5.25.0** and updating to new versions as they come out to ensure you get the latest updates for this developing feature.
:::

To use this feature:

1. Contact your Embrace Customer Success Manager to enrol your apps in the Peformance Tracing Beta (done on a per-app basis).
2. Ensure you’re using a version of the Embrace SDK that supports Performance Tracing.
3. Instrument your app using the reference guide in this sections to start adding traces to your operations.
4. See the traces in the Traces section of the Embrace dashboard.

### Create Span

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Create a trace by creating its root span
val activityLoad = Embrace.getInstance().createSpan("load-activity"))
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Create a trace by creating its root span
EmbraceSpan activityLoad = Embrace.getInstance().createSpan("load-activity");
```

</TabItem>
</Tabs>

### Start Span

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val activityLoad = Embrace.getInstance().createSpan("load-activity"))

// Starting a trace by starting its root span
activityLoad?.start()
```

</TabItem>
<TabItem value="java" label="Java">

```java
EmbraceSpan activityLoad = Embrace.getInstance().createSpan("load-activity");

// Starting a trace by starting its root span
if (activityLoad != null) {
  activityLoad.start();
}
```

</TabItem>
</Tabs>

### Adding a Child Span

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val activityLoad = Embrace.getInstance().createSpan("load-activity")
activityLoad?.start()

// Create a child span - if activityLoad's creation fails, imageLoad will be the root span
val imageLoad = Embrace.getInstance().createSpan("load-image", activityLoad))
```

</TabItem>
<TabItem value="java" label="Java">

```java
EmbraceSpan activityLoad = Embrace.getInstance().createSpan("load-activity");
if (activityLoad != null) {
  activityLoad.start();
}

// Create a child span - if activityLoad's creation fails, imageLoad will be the root span
EmbraceSpan imageLoad = Embrace.getInstance().createSpan("load-image", activityLoad);
```

</TabItem>
</Tabs>

### Adding Events and Attributes

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val activityLoad = Embrace.getInstance().createSpan("load-activity")
activityLoad?.start()

val imageLoad = Embrace.getInstance().createSpan("load-image", activityLoad)
imageLoad?.start()

val image = fetchImage()

// record important event at point in time
imageLoad?.addEvent("network-request-finished")

// record attribute particular to this span instance
imageLoad?.addAttribute("image-name", image.name)
```

</TabItem>
<TabItem value="java" label="Java">

```java
EmbraceSpan activityLoad = Embrace.getInstance().createSpan("load-activity");
if (activityLoad != null) {
  activityLoad.start();
}

EmbraceSpan imageLoad = Embrace.getInstance().createSpan("load-image", activityLoad);
if (imageLoad != null) {
  imageLoad.start();
}

FancyImage image = fetchImage();

if (imageLoad != null) {
  // record important event at point in time
  imageLoad.addEvent("network-request-finished");

  // record attribute particular to this span instance
  imageLoad.addAttribute("image-name", image.name);
}
```

</TabItem>
</Tabs>


### End Span

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val activityLoad = Embrace.getInstance().createSpan("load-activity")
activityLoad?.start()

val imageLoad = Embrace.getInstance().createSpan("load-image", activityLoad)
imageLoad?.start()

val image = fetchImage()
imageLoad?.addEvent("network-request-finished")
imageLoad?.addAttribute("image-name", image.name)

/* process image */

// Stop the span, record it as being successful
imageLoad?.stop()

/* User navigates away before the activity is loaded */

// Stop the trace, record the span as having failed due to user abandonment
activityLoad?.stop(ErrorCode.USER_ABANDON)
```

</TabItem>
<TabItem value="java" label="Java">

```java
EmbraceSpan activityLoad = Embrace.getInstance().createSpan("load-activity");
if (activityLoad != null) {
  activityLoad.start();
}

if (activityLoad != null) {
  EmbraceSpan imageLoad = Embrace.getInstance().createSpan("load-image", activityLoad);
  if (imageLoad != null) {
    imageLoad.start();
  }
}

FancyImage image = fetchImage();
if (imageLoad != null) {
  imageLoad.addEvent("network-request-finished");
  imageLoad.addAttribute("image-name", image.name);
}

/* process image */

// Stop the span, record it as being successful
if (imageLoad != null) {
  imageLoad.stop();
}

/* User navigates away before the activity is loaded */

// Stop the trace, record the span as having failed due to user abandonment
if (activityLoad != null) {
  activityLoad.stop(ErrorCode.USER_ABANDON)
}
```

</TabItem>
</Tabs>

### Recording a Completed Span

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
// Record completed span
Embrace.getInstance().recordCompletedSpan(
  "activity-create", 
  startTimeNanos, 
  endTimeNanos,
  mapOf(Pair("activity-name", "Main Activity")),
  null
)
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Record completed span
Embrace.getInstance().recordCompletedSpan(
  "activity-create", 
  startTimeNanos, 
  endTimeNanos,
  Collections.singletonMap("activity-name", "Main Activity"),
  null
);
```

</TabItem>
</Tabs>


## Support

If you have any questions or if something is not working as intended, please get in touch with your Customer Success Manager.