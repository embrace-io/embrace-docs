---
title: Performance Tracing
description: Record span to monitor the production performance and success rates of operations within your mobile app.
sidebar_position: 2
---

# Performance Tracing

## Overview

Embrace’s Traces solution gives you visibility into any app operation you’d like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

## Feature Support

:::info Minimum Requirements
**We recommend using the latest Android SDK version for the most up-to-date API**. Even though Performance Tracing is enabled in earlier versions as well, they only support a subset of features described in this doc, which applies to versions 6.4.0 and above.
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

1. Ensure you’re using a version of the Embrace SDK that supports Performance Tracing.
2. (Optional) Enable API desugaring for your app if you want users running Android 5.x and 6.x to report traces.
3. Instrument your app using the reference guide in this section to start adding spans to your operations, or refer to the [API docs](https://embrace-io.github.io/embrace-android-sdk/) for a more comprehensive description of the public API.
4. See the spans in the Traces section of the Embrace dashboard.

## API Usage Examples

### Create a Span

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
// create a span by creating its root span
// recording will not begin until the span has been started
val activityLoad = Embrace.getInstance().createSpan("load-activity")
```

</TabItem>
<TabItem value="java" label="Java">

```java
// create a span by creating its root span
// recording will not begin until the span has been started
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
val appLaunchSpan = Embrace.getInstance().createSpan("app-launch")

// begin recording a span that has a different start time than 
// the current time by starting its root span with a specific timestamp
appLaunchSpan?.start(startTimeMs = appStartTimeMillis)
```

</TabItem>
<TabItem value="java" label="Java">

```java
long appStartTimeMillis = getAppStartTime();
EmbraceSpan activityLoad = Embrace.getInstance().createSpan("load-activity");

// begin recording a span that has a different start time than 
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
val imageLoad = activityLoad?.let { embrace.startSpan("load-image", this) }

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
    activityLoad?.addAttribute("error-message", getErrorMessage(e))
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
val imageLoad = activityLoad?.let { embrace.startSpan("load-image", it) }
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

### Record a Span Before the Embrace SDK Has Started

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

## Export to OpenTelemetry Collectors

To send telemetry to any [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) directly from the app, [SpanExporter](https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-exporter) and [LogRecordExporter](https://opentelemetry.io/docs/specs/otel/logs/sdk/#logrecordexporter) can be used to do that. When configured, telemetry will be sent to these exporters as soon as they are recorded. More than one exporter of each signal can be configured, but be aware of the performance impact of sending too many network requests if that is applicable.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
Embrace.getInstance().addSpanExporter(mySpanExporter)
Embrace.getInstance().addLogRecordExporter(myLogExporter)
```

</TabItem>
<TabItem value="java" label="Java">

```java
Embrace.getInstance().addSpanExporter(mySpanExporter);
Embrace.getInstance().addLogRecordExporter(myLogExporter);
```

</TabItem>
</Tabs>

:::info
Please note that exporters must be configured *before* the Embrace SDK is started. Exporters added after the SDK has already been started will not be used.
:::

### Local Testing

To see this working locally, [LoggingSpanExporter](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/logging/src/main/java/io/opentelemetry/exporter/logging/LoggingSpanExporter.java) and [SystemOutLogRecordExporter](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/logging/src/main/java/io/opentelemetry/exporter/logging/SystemOutLogRecordExporter.java) can be used to output to logcat.

```
2024-03-05 14:15:15.342 29672-29756 LoggingSpanExporter     io.embrace.mysampleapp          I  'emb-startup-moment' : d38b4ac26baf1a862ed4a028af7d08ac e3e82dd0f86c0eed INTERNAL [tracer: io.embrace.android.embracesdk:={{ embrace_sdk_version platform="android" }}] AttributesMap{data={emb.sequence_id=4, emb.type=PERFORMANCE, emb.key=true}, capacity=128, totalAddedValues=3}
```

### Sending Telemetry Off the Device

You can send your data to any generic OpenTelemetry Collector by using any Android-compatible exporter. Note that not all Java SpanExporter or LogRecordExporter can be used on Android.

:::warning
**Network request to OpenTelemetry Collectors should not be logged**

To prevent an infinite loop of network requests spans, any requests used to export telemetry to OpenTelemetry Collectors should be excluded from being recorded by the Embrace SDK using the `disable_url_patterns` setting in the Embrace Configuration file. See [this page](/android/features/configuration-file/#disabled_url_patterns-string-array) for details.
:::

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
 //GRPC through an OTel Collector in a local docker image
val customDockerExporter = OtlpGrpcSpanExporter.builder()
    .setEndpoint("https://otel-collector.mydomain.com:4317")
    .build()

Embrace.getInstance().addSpanExporter(customDockerExporter)
```

</TabItem>
<TabItem value="java" label="Java">

```java
 //GRPC through an OTel Collector in a local docker image
OtlpGrpcSpanExporter customDockerExporter = OtlpGrpcSpanExporter.builder()
    .setEndpoint("https://otel-collector.mydomain.com:4317")
    .build();

Embrace.getInstance().addSpanExporter(customDockerExporter);
```

</TabItem>
</Tabs>

### Sending Telemetry to Grafana Cloud

To send telemetry to [Grafana Cloud](https://grafana.com/docs/grafana-cloud/monitor-applications/application-observability/setup/collector/), set up the collector and add an authorization token as a header.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
//HTTPS to an OTEL Collector in Grafana Cloud
val grafanaCloudExporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("https://myinstance.grafana.net/otlp/v1/traces")
    .addHeader("Authorization", "YourToken")
    .build()

Embrace.getInstance().addSpanExporter(grafanaCloudExporter)
```

</TabItem>
<TabItem value="java" label="Java">

```java
 //HTTPS to an OTEL Collector in Grafana Cloud
OtlpHttpSpanExporter grafanaCloudExporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("https://myinstance.grafana.net/otlp/v1/traces")
    .addHeader("Authorization", "YourToken")
    .build();

Embrace.getInstance().addSpanExporter(grafanaCloudExporter);
```

</TabItem>
</Tabs>

### Avoiding sending telemetry to Embrace

If you prefer to send telemetry to another OpenTelemetry collector & don't want to send any to Embrace you should:

1. Configure at least 1 span exporter & log exporter as described above
2. Remove the `app_id` and `api_token` fields from `app/src/main/embrace-config.json`. You should still keep the file, even if it only contains `{}`
3. Add `embrace.disableMappingFileUpload=true` to your `gradle.properties` file
