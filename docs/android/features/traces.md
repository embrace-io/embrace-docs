---
title: Traces
description: Record span to monitor the production performance and success rates of operations within your mobile app.
sidebar_position: 2
---

# Traces

## Overview

Embrace’s Traces solution gives you visibility into any app operation you’d like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.
  
See [this page](/docs/product/traces/technical-details.md) for technical details and terminology definitions.

## Feature support

:::info Minimum Requirements
**We recommend using the latest Android SDK version for the most up-to-date API**. Even though Traces is enabled in earlier versions as well, they only support a subset of features described in this doc, which applies to versions 6.4.0 and above.
:::

The Embrace Traces API allows you to:

- Create real-time performance timers or record data for past operations.
    - For real-time tracing, we use a “stopwatch” concept that lets you start and stop a span's recording manually.
    - To record past operations, you can specify the start and end times of your spans that you might have captured already.
    - You can mix and match real time and past events by specifying the start and end times when you start and stop your spans.
- Add child spans to a parent span to track sub-operations within an operation.
- Attach attributes, span events, and links to other spans to give a span further context.
    - Attributes allow you to specify string key-value pairs that can be useful for filtering, grouping, and deriving custom metrics.
    - Span events represent a point in time during the runtime of the span.
      - Attributes on a span event can be used to store data and metadata about the event that describe it beyond its name.
    - Links create unidirectional relationships between spans so that you can formally relate two spans that belong to different traces.
      - Attributes on a link can be used to store data and metadata that further describes the relationship.

### Limits

| Type                                    | Limit           |
|-----------------------------------------|-----------------|
| Max number of spans started per session | 500             |
| Max number of attributes per span       | 100             |
| Max number of events per span           | 10              |
| Max number of attributes per event      | 10              |
| Max number of links per span            | 10              |
| Max length of attribute keys            | 128 characters  |
| Max length of attribute values          | 1024 characters |
| Max length of span names                | 128 characters  |
| Max length of event names               | 128 characters  |

There are no limits to the number of child spans you can have per root span, provided the total number of spans does not exceed the per-session maximum.

#### Exceeding limits
If you exceed the listed limits, the operation with the limit-exceeding call will truncate the limit exceeding value, or fail in the case of API calls that would result in a count limit to be exceeded.

String values are truncated by taking the first N characters such that N is the limit minus 3 (e.g. for a span name, N is 125) and appending the 3-character token `...`.  This could result in unexpected behavior if the truncated name of two spans or attribute keys end up being the same. If you detect spans with truncated names and values, consider them bugs that should be fixed.

Attributes and events are truncated by taking the first N values specified and dropping the rest such that N is the limit.

### Feature details

- Span Names are **case-sensitive**
- Key Names are **case-sensitive** and are **alphanumeric ASCII characters**
- There are no limits on the duration of a span as long as the app is running.
- In the session timeline UI, a completed span will appear in the session in which it ended.

:::warning Internal Prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace span and attribute names, respectively. You should never create a span or attribute key name with `emb-` and `emb.` prefixes. Behavior in such cases are undefined.
:::

## Adding traces to your app

### Create a span

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
// recording will not begin until the span has been started
val activityLoad = Embrace.getInstance().createSpan("load-activity")
```

</TabItem>
<TabItem value="java" label="Java">

```java
// recording will not begin until the span has been started
EmbraceSpan activityLoad = Embrace.getInstance().createSpan("load-activity");
```

</TabItem>
</Tabs>

### Create and start span atomically

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

### Create a Span that automatically terminates

By default spans do not terminate until `stop()` has been invoked. If your span might take a long time & you want it to stop when a session ends you should supply the `AutoTerminationMode` parameter when creating the span.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val span = Embrace.getInstance().startSpan("my-span", AutoTerminationMode.ON_BACKGROUND)
```

</TabItem>
<TabItem value="java" label="Java">

```java
EmbraceSpan span = Embrace.getInstance().startSpan("my-span", AutoTerminationMode.ON_BACKGROUND);
```

</TabItem>
</Tabs>

:::info
Spans created with `recordSpan` or `recordCompletedSpan` will stop once the function call is complete & rarely require `AutoTerminationMode`.
:::

### Start span that tracks an operation started at an earlier time

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

### Add attributes and span events

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val embrace = Embrace.getInstance()
val activityLoad = embrace.startSpan("load-activity")
val imageLoad = activityLoad?.apply { embrace.startSpan("load-image", this) }

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

### Add links

```kotlin
val embrace = Embrace.getInstance()
val activityLoad = embrace.startSpan("load-activity")

displayLoader()

val showLoader = embrace.startSpan("showLoader")?.apply {
    if (activityLoad != null) {
        activityLoad.addLink(
            linkedSpan = this,
            attributes = mapOf("triggered-action-type" to "LOADER")
        )
    }
}
```

### Stop span for operation that ended earlier

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

### Stop span for an operation that failed

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

### Add a child span

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
val embrace = Embrace.getInstance()
val activityLoad = embrace.startSpan("load-activity")

// create and start a child span if activityLoad is created and started successfully
val imageLoad = activityLoad?.apply { embrace.startSpan("load-image", this) }
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

### Record a span for an operation that occurred in the past

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

### Get a reference to an in-progress span with its spanId

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

Telemetry collected by the Embrace SDK can be exported as [OTLP](https://opentelemetry.io/docs/specs/otel/protocol/) through the [SpanExporter](https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-exporter) and [LogRecordExporter](https://opentelemetry.io/docs/specs/otel/logs/sdk/#logrecordexporter) interfaces. Multiple exporters can be configured, and they will receive telemetry synchronously and serially as soon as they are recorded. 

While than one exporter for each signal can be configured, be aware of the performance impact on the instrumentation of each additional exporter given that they run serially and will block the instrumentation thread.

If non-trivial work is being done in the configured exporters that do not need to block the instrumentation thread, consider doing the heavy-lifting asynchronously.

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

### Local testing

To see your recorded telemetry locally during developement, use [LoggingSpanExporter](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/logging/src/main/java/io/opentelemetry/exporter/logging/LoggingSpanExporter.java) and [SystemOutLogRecordExporter](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/logging/src/main/java/io/opentelemetry/exporter/logging/SystemOutLogRecordExporter.java) to see spans and logs in logcat, respectively. Do not deploy these types of debugging exporters in production for performance reasons.

```
2024-03-05 14:15:15.342 29672-29756 LoggingSpanExporter     io.embrace.mysampleapp          I  'emb-startup-moment' : d38b4ac26baf1a862ed4a028af7d08ac e3e82dd0f86c0eed INTERNAL [tracer: io.embrace.android.embracesdk:={{ embrace_sdk_version platform="android" }}] AttributesMap{data={emb.sequence_id=4, emb.type=PERFORMANCE, emb.key=true}, capacity=128, totalAddedValues=3}
```

### Sending to OpenTelemetry Collectors 

You can send all or some of your telemetry to any [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) by using existing Android-compatible exporters or writing your own. Note that not all Java exporters can be used on Android.

:::warning
**Network request to OpenTelemetry Collectors should not be logged**

To prevent an infinite loop of network requests spans, any requests used to export telemetry to OpenTelemetry Collectors should be excluded from being recorded by the Embrace SDK using the `disabled_url_patterns` setting in the Embrace Configuration file. See [this page](/android/features/configuration-file/#networking---disabled_url_patterns-string-array) for details.
:::

#### Send telemetry through GRPC

To send telemetry via GRPC to a Collector endpoint, use the `OtlpGrpcSpanExporter` and specify the URL.

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

#### Sending telemetry to Grafana Cloud

To send telemetry to [Grafana Cloud](https://grafana.com/docs/opentelemetry/collector/opentelemetry-collector/), set up the Collector and add an authorization token as a header.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
//HTTPS to an OTel Collector in Grafana Cloud
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

If you prefer to send telemetry only to your custom OpenTelemetry Collectors and don't want to send data to Embrace, like if you are not an Embrace customer, do the following:

1. Configure at least 1 span exporter or log exporter as described above.
2. Remove the `app_id` and `api_token` fields from `app/src/main/embrace-config.json` if specified. You can still keep the file and use it to specify other configuration options.
3. Add `embrace.disableMappingFileUpload=true` to your `gradle.properties` file so any artifacts generated by the build will not be sent to Embrace (e.g. symbol mapping files used for deobfuscation of stacktraces). 
