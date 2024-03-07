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
- **We recommend using the latest Android SDK version for the most up-to-date API**. Even though Performance Tracing is enabled in earlier versions as well, they only support a subset of features described in this doc, which applies to versions 6.4.0 and above.
- If your app supports Android versions below 7.0, you need to enable Java 8 API desugaring so that some language features that were not part of those earlier Android releases are added at build time. Please refer to the [Google documentation on how to enable desugaring for your app](https://developer.android.com/studio/write/java8-support#library-desugaring).
:::


The Embrace Performance Tracing API allows you to:

- Create real-time performance timers or record data for past operations.
    - For real-time tracing, we use a “stopwatch” concept that lets you start and stop a span's recording manually.
    - To record past operations, you can specify the start and end times of your spans that you might have captured already.
    - You can mix and match real time and past events by specifying the start and end times when you start and stop your spans.
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
2. (Optional) Enable API desugaring for your app if you want users running Android 5.x and 6.x to report traces.
3. Instrument your app using the reference guide in this section to start adding traces to your operations, or refer to the [API docs](https://embrace-io.github.io/embrace-android-sdk/) for a more comprehensive description of the public API.
4. See the traces in the Traces section of the Embrace dashboard.

## API Usage Examples

### Create a Span

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
// create a trace by creating its root span
// recording will not behind until the span has been started
val activityLoad = Embrace.getInstance().createSpan("load-activity"))
```

</TabItem>
<TabItem value="java" label="Java">

```java
// create a trace by creating its root span
// recording will not behind until the span has been started
EmbraceSpan activityLoad = Embrace.getInstance().createSpan("load-activity");
```

</TabItem>
</Tabs>

### Create and Start Span Atomically

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
// activityLoad will either be a span that has already started or null if 
// the creation or start attempt was unsuccessful
val activityLoad = Embrace.getInstance().startSpan("load-activity")
```

</TabItem>
<TabItem value="java" label="Java">

```java
// activityLoad will either be a span that has already started or null if 
// the creation or start attempt was unsuccessful
EmbraceSpan activityLoad = Embrace.getInstance().startSpan("load-activity");
```

</TabItem>
</Tabs>


### Start Span That Tracks an Operation That Started at an Earlier Time

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val appStartTimeMillis = getAppStartTime()
val appLaunchTrace = Embrace.getInstance().createSpan("app-launch"))

// begin recording a trace that has a different start time than 
// the current time by starting its root span with a specific timestamp
appLaunchTrace?.start(startTimeMs = appStartTimeMillis)
```

</TabItem>
<TabItem value="java" label="Java">

```java
long appStartTimeMillis = getAppStartTime();
EmbraceSpan activityLoad = Embrace.getInstance().createSpan("load-activity");

// begin recording a trace that has a different start time than 
// the current time by starting its root span with a specific timestamp
if (activityLoad != null) {
  activityLoad.start(appStartTimeMillis);
}
```

</TabItem>
</Tabs>

### Add Attributes and Span Events

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val embrace = Embrace.getInstance()
val activityLoad = embrace.startSpan("load-activity")
val imageLoad = activityLoad?.apply { embrace.startSpan("load-image", this)) }

val image = fetchImage()

// record important event at point in time
imageLoad?.addEvent("network-request-finished")

// record attribute particular to this span instance
imageLoad?.addAttribute("image-name", image.name)
```

</TabItem>
<TabItem value="java" label="Java">

```java
Embrace embrace = Embrace.getInstance();
EmbraceSpan activityLoad = embrace.startSpan("load-activity");
EmbraceSpan imageLoad = null;

if (activityLoad != null) {
  imageLoad = embrace.startSpan("load-image", activityLoad);
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

### Stop Span For Operation That Ended Earlier

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val activityLoad = Embrace.getInstance().startSpan("load-activity")

// some time passes after the operation being time has finished

activityLoad?.stop(endTimeMs = getActualEndTimeMilllis())
```

</TabItem>
<TabItem value="java" label="Java">

```java
EmbraceSpan activityLoad = Embrace.getInstance().startSpan("load-activity");

// some time passes after the operation being time has finished

if (activityLoad != null) {
  activityLoad.stop(getActualEndTime());
}
```

</TabItem>
</Tabs>

### Stop Span For an Operation That Failed

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val activityLoad = Embrace.getInstance().startSpan("load-activity")

try {
  loadActivity()
} catch (e: IllegalStateException) {
  activityLoad.addAttribute("error-message", getErrorMessage(e))
  activityLoad?.stop(ErrorCode.FAILURE)
} finally {
  // calling stop on an already-stopped span will not change its state
  activityLoad?.stop()
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
EmbraceSpan activityLoad = Embrace.getInstance().startSpan("load-activity");

if (activityLoad != null) {
  try {
    loadActivity();
  } catch (IllegalStateException e) {
    activityLoad.addAttribute("error-message", getErrorMessage(e));
    activityLoad.stop(ErrorCode.FAILURE);
  } finally {
    // calling stop on an already-stopped span will not change its state
    activityLoad.stop();
}
}
```

</TabItem>
</Tabs>

### Add a Child Span If the Parent Started Properly

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val embrace = Embrace.getInstance()
val activityLoad = embrace.startSpan("load-activity")

// create and start a child span if activityLoad is created and started successfully
val imageLoad = activityLoad?.apply { embrace.startSpan("load-image", this)) }
```

</TabItem>
<TabItem value="java" label="Java">

```java
Embrace embrace = Embrace.getInstance();
EmbraceSpan activityLoad = embrace.startSpan("load-activity");

// create and start a child span if activityLoad is created and started successfully
if (activityLoad != null) {
  EmbraceSpan imageLoad = embrace.startSpan("load-image", activityLoad);
}
```

</TabItem>
</Tabs>

### Record a Trace Before the Embrace SDK Has Started

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
// record a span based on start and end times that are in the past
Embrace.getInstance().recordCompletedSpan(
  name = "activity-create", 
  startTimeMs = startTimeMillis, 
  endTimeMs = endTimeMillis
)
```

</TabItem>
<TabItem value="java" label="Java">

```java
// record a span based on start and end times that are in the past
Embrace.getInstance().recordCompletedSpan(
  "activity-create", 
  startTimeMillis, 
  endTimeMillis
);
```

</TabItem>
</Tabs>

### Get a Reference to an In-Progress Span

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val embrace = Embrace.getInstance()
val activityLoad = embrace.startSpan("load-activity")
val activityLoadSpanId = activityLoad?.spanId

/* some other part of the code without access to activityLoad */

embrace.getSpan(activityLoadSpanId)?.stop()
```

</TabItem>
<TabItem value="java" label="Java">

```java
Embrace embrace = Embrace.getInstance();
EmbraceSpan activityLoad = embrace.startSpan("load-activity");
String activityLoadSpanId = null;

if (activityLoad != null) {
  activityLoadSpanId = activityLoad.spanId;
}

/* some other part of the code without access to activityLoad */

if (activityLoadSpanId != null) {
  embrace.getSpan(activityLoadSpanId).stop();
}
```

</TabItem>
</Tabs>

## Export your telemetry

A [SpanExporter](https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-exporter) can be easily injected, to directly export your data to any OpenTelemetry Collector.

### Local testing

Injecting a [LoggingSpanExporter](https://opentelemetry.io/docs/languages/java/exporters/#otlp-dependencies) will allow you to see your telemetry in the logcat.

```
2024-03-05 14:15:15.342 29672-29756 LoggingSpanExporter     io.embrace.mysampleapp          I  'emb-startup-moment' : d38b4ac26baf1a862ed4a028af7d08ac e3e82dd0f86c0eed INTERNAL [tracer: io.embrace.android.embracesdk:={{ embrace_sdk_version platform="android" }}] AttributesMap{data={emb.sequence_id=4, emb.type=PERFORMANCE, emb.key=true}, capacity=128, totalAddedValues=3}
```

### Adding a SpanExporter for a custom OTel Collector

You can send your data to a custom ([OTel Collector](https://opentelemetry.io/docs/languages/java/exporters/#collector-setup)) 

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
 //grpc through an otel collector in a local docker image
val customDockerExporter = OtlpGrpcSpanExporter.builder()
    .setEndpoint("http://10.0.2.2:4317")
    .build()
```

</TabItem>
<TabItem value="java" label="Java">

```java
 //grpc through an otel collector in a local docker image
OtlpGrpcSpanExporter customDockerExporter = OtlpGrpcSpanExporter.builder()
    .setEndpoint("http://10.0.2.2:4317")
    .build();
```

</TabItem>
</Tabs>

### Exporting data to Grafana Cloud

Embrace Performance tracing can be exported to [Grafana Cloud](https://grafana.com/docs/grafana-cloud/monitor-applications/application-observability/setup/collector/) using an OTel Collector.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
//... or directly to grafana cloud
val grafanaCloudExporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("https://myinstance.grafana.net/otlp/v1/traces")
    .addHeader("Authorization", "YourToken")
    .build()
```

</TabItem>
<TabItem value="java" label="Java">

```java
 //grpc through an otel collector in a local docker image
OtlpHttpSpanExporter grafanaCloudExporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("https://myinstance.grafana.net/otlp/v1/traces")
    .addHeader("Authorization", "YourToken")
    .build();
```

</TabItem>
</Tabs>

:::info
**Every exporter should be added before starting the SDK**
:::

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
Embrace.getInstance().addSpanExporter(LoggingSpanExporter.create())
Embrace.getInstance().addSpanExporter(grpcExporter)
Embrace.getInstance().addSpanExporter(protoExporter)

Embrace.getInstance().start(this)        
```

</TabItem>
<TabItem value="java" label="Java">

```java
Embrace.getInstance().addSpanExporter(LoggingSpanExporter.create());
Embrace.getInstance().addSpanExporter(grpcExporter);
Embrace.getInstance().addSpanExporter(protoExporter);

Embrace.getInstance().start(this);
```

</TabItem>
</Tabs>

## Support

If you have any questions or if something is not working as intended, please get in touch with your Customer Success Manager.