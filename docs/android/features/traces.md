---
title: Traces
description: Record span to monitor the production performance and success rates of operations within your mobile app.
sidebar_position: 2
---

# Traces

## Overview

Embrace's Traces solution gives you visibility into any app operation you'd like to track, including duration, success rate, and any contextual metadata collected at runtime that helps debug the root cause of your mobile app's performance issues. With this tool, you can quickly spot any bottlenecks in your app's architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user experience.

See [this page](/product/traces/technical-details.md) for technical details and terminology definitions.

## Feature support

:::info Minimum requirements
**We recommend using the latest Android SDK version for the most up-to-date API**. Even though Traces is enabled in earlier versions as well, they only support a subset of features described in this doc, which applies to versions 6.4.0 and above.
:::

The Embrace Traces API allows you to:

- Create real-time performance timers or record data for past operations.
  - For real-time tracing, a "stopwatch" concept lets you start and stop a span's recording manually.
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

Attributes and events are truncated by taking the first N values specified and dropping the rest such that N is the limit.

### Feature details

- Span Names are **case-sensitive**
- Key Names are **case-sensitive** and are **alphanumeric ASCII characters**
- There are no limits on the duration of a span as long as the app is running.
- In the session timeline UI, a completed span will appear in the session in which it ended.

:::warning Internal prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace span and attribute names, respectively. You should never create a span or attribute key name with `emb-` and `emb.` prefixes. Behavior in such cases are undefined.
:::

## Adding traces to your app

### Create a span

```kotlin
// recording will not begin until the span has been started
val activityLoad = Embrace.createSpan("load-activity")
```

### Create and start span atomically

```kotlin
// activityLoad will either be a span that has already started or null if 
// the creation or start attempt was unsuccessful
val activityLoad = Embrace.startSpan("load-activity")
```

### Create a Span that automatically terminates

By default spans do not terminate until `stop()` has been invoked. If your span might take a long time & you want it to stop when a session ends you should supply the `AutoTerminationMode` parameter when creating the span.

```kotlin
val span = Embrace.startSpan("my-span", AutoTerminationMode.ON_BACKGROUND)
```

:::info
Spans created with `recordSpan` or `recordCompletedSpan` will stop once the function call is complete & rarely require `AutoTerminationMode`.
:::

### Start span that tracks an operation started at an earlier time

```kotlin
val appStartTimeMillis = getAppStartTime()
val appLaunchSpan = Embrace.createSpan("app-launch")

// begin recording a span that has a different start time than 
// the current time by starting its root span with a specific timestamp
appLaunchSpan?.start(startTimeMs = appStartTimeMillis)
```

### Add attributes and span events

```kotlin
val activityLoad = Embrace.startSpan("load-activity")
val imageLoad = activityLoad?.apply { Embrace.startSpan("load-image", this) }

val image = fetchImage()

// record important event at point in time
imageLoad?.addEvent("network-request-finished")

// record attribute particular to this span instance
imageLoad?.addAttribute("image-name", image.name)
```

### Add links

```kotlin
val activityLoad = Embrace.startSpan("load-activity")

displayLoader()

val showLoader = Embrace.startSpan("showLoader")?.apply {
    if (activityLoad != null) {
        activityLoad.addLink(
            linkedSpan = this,
            attributes = mapOf("triggered-action-type" to "LOADER")
        )
    }
}
```

### Stop span for operation that ended earlier

```kotlin
val activityLoad = Embrace.startSpan("load-activity")

// some time passes after the operation being time has finished

activityLoad?.stop(endTimeMs = getActualEndTimeMilllis())
```

### Stop span for an operation that failed

```kotlin
val activityLoad = Embrace.startSpan("load-activity")

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

### Add a child span

```kotlin
val activityLoad = Embrace.startSpan("load-activity")

// create and start a child span if activityLoad is created and started successfully
val imageLoad = activityLoad?.apply { Embrace.startSpan("load-image", this) }
```

### Record a span for an operation that occurred in the past

```kotlin
// record a span based on start and end times that are in the past
Embrace.recordCompletedSpan(
    name = "activity-create", 
    startTimeMs = startTimeMillis, 
    endTimeMs = endTimeMillis
)
```

### Get a reference to an in-progress span with its spanId

```kotlin
val activityLoad = Embrace.startSpan("load-activity")
val activityLoadSpanId = activityLoad?.spanId

/* some other part of the code without access to activityLoad */

Embrace.getSpan(activityLoadSpanId)?.stop()
```

## Export to OpenTelemetry collectors

Telemetry collected by the Embrace SDK can be exported as [OTLP](https://opentelemetry.io/docs/specs/otel/protocol/) through the [SpanExporter](https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-exporter) and [LogRecordExporter](https://opentelemetry.io/docs/specs/otel/logs/sdk/#logrecordexporter) interfaces. Multiple exporters can be configured, and they will receive telemetry synchronously and serially as soon as they are recorded.  

While than one exporter for each signal can be configured, be aware of the performance impact on the instrumentation of each additional exporter given that they run serially and will block the instrumentation thread.

If non-trivial work is being done in the configured exporters that do not need to block the instrumentation thread, consider doing the heavy-lifting asynchronously.

```kotlin
Embrace.addSpanExporter(mySpanExporter)
Embrace.addLogRecordExporter(myLogExporter)
```

:::info
Note that exporters must be configured *before* the Embrace SDK is started. Exporters added after the SDK has already been started will not be used.
:::

### Supply custom OpenTelemetry processors

It's also possible to supply your own OpenTelemetry processors through the [SpanProcessor](https://opentelemetry.io/docs/specs/otel/trace/sdk/#span-processor) and [LogRecordProcessor](https://opentelemetry.io/docs/specs/otel/logs/sdk/#logrecordprocessor) interfaces. These will be invoked *after* Embrace's internal processors. Overriding embrace-specific attributes when processing telemetry will produce undefined behavior and is discouraged.

```kotlin
Embrace.addSpanProcessor(mySpanProcessor)
Embrace.addLogRecordProcessor(myLogProcessor)
```

:::info
Processors must be configured *before* the Embrace SDK is started. Processors added after the SDK has already been started will not be used.
:::

### Local testing

To see your recorded telemetry locally during developement, use [LoggingSpanExporter](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/logging/src/main/java/io/opentelemetry/exporter/logging/LoggingSpanExporter.java) and [SystemOutLogRecordExporter](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/logging/src/main/java/io/opentelemetry/exporter/logging/SystemOutLogRecordExporter.java) to see spans and logs in logcat, respectively. Do not deploy these types of debugging exporters in production for performance reasons.

```text
2024-03-05 14:15:15.342 29672-29756 LoggingSpanExporter     io.embrace.mysampleapp          I  'emb-startup-moment' : d38b4ac26baf1a862ed4a028af7d08ac e3e82dd0f86c0eed INTERNAL [tracer: io.embrace.android.embracesdk:={{ embrace_sdk_version platform="android" }}] AttributesMap{data={emb.sequence_id=4, emb.type=PERFORMANCE, emb.key=true}, capacity=128, totalAddedValues=3}
```

### Sending to OpenTelemetry collectors  

You can send all or some of your telemetry to any [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) by using existing Android-compatible exporters or writing your own. Note that not all Java exporters can be used on Android.

:::warning
**Network request to OpenTelemetry Collectors should not be logged**

To prevent an infinite loop of network requests spans, any requests used to export telemetry to OpenTelemetry Collectors should be excluded from being recorded by the Embrace SDK using the `disabled_url_patterns` setting in the Embrace Configuration file. See [this page](/android/configuration/configuration-file/#networking---disabled_url_patterns-string-array) for details.
:::

#### Send telemetry through gRPC

To send telemetry via gRPC to a Collector endpoint, use the `OtlpGrpcSpanExporter` and specify the URL.

```kotlin
// gRPC through an OTel Collector in a local container
val customDockerExporter = OtlpGrpcSpanExporter.builder()
    .setEndpoint("https://otel-collector.mydomain.com:4317")
    .build()

Embrace.addSpanExporter(customDockerExporter)
```

#### Sending telemetry to Grafana Cloud

To send telemetry to [Grafana Cloud](https://grafana.com/docs/opentelemetry/collector/opentelemetry-collector/), set up the Collector and add an authorization token as a header.

```kotlin
// HTTPS to an OTel Collector in Grafana Cloud
val grafanaCloudExporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("https://myinstance.grafana.net/otlp/v1/traces")
    .addHeader("Authorization", "YourToken")
    .build()

Embrace.addSpanExporter(grafanaCloudExporter)
```

### Avoiding sending telemetry to Embrace

If you prefer to send telemetry only to your custom OpenTelemetry Collectors and don't want to send data to Embrace, like if you are not an Embrace customer, do the following:

1. Configure at least 1 span exporter or log exporter as described above.
2. Remove the `app_id` and `api_token` fields from `app/src/main/embrace-config.json` if specified. You can still keep the file and use it to specify other configuration options.
3. Add `embrace.disableMappingFileUpload=true` to your `gradle.properties` file so any artifacts generated by the build will not be sent to Embrace (e.g. symbol mapping files used for deobfuscation of stacktraces).
