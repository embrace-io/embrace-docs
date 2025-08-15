---
title: Adding Logs
sidebar_position: 7
description: Trigger alerts for your Android application using logs with the Embrace SDK
---

# Adding Logs

Typically the Embrace SDK uploads data at the end of a session. However, some situations  
might require instant feedback, such as hunting an especially difficult bug, troubleshooting  
on behalf of high-value users, or monitoring a new version rollout.

You can leverage the log message API for this.

## Using the Log Message API

The Log Message API enables you to log a message instantly.  

Depending on your requirements, you can choose from three severity types: `logInfo`, `logWarning`, and `logError`.

To use this API, you need to pass the following arguments to the method:

- **The message:** The string is the message itself. Try to make this short yet informative.
- **Properties:** A map of key-value pairs that enables you to categorize and filter log messages.

In the case of logError, you may also send an Exception to be shown on the dashboard.

Here is an example of how to use the Log Message API for errors:

```kotlin
Embrace.getInstance().logError("Loading not finished in time.")
```

Or you can call `logMessage` if you want to add properties to your logs.

```kotlin
val props = mutableMapOf<String, Any>()
props["propertyA"] = "valueA"
props["propertyB"] = "valueB"
Embrace.getInstance().logMessage("Loading not finished in time.", Severity.ERROR, props)
```

### Log Handled Exception

If there is a need to log an exception, but the severity level is something other than an error, the **`logException`** method can be used.

```kotlin
val props = mutableMapOf<String, Any>()
props["propertyA"] = "valueA"
props["propertyB"] = "valueB"

try {
    val exception = NullPointerException("this is my handled exception")
    throw exception
} catch (e: Exception) {
    Embrace.getInstance().logException(e, Severity.WARNING, props)
}
```

LogType could be ERROR,  WARNING or INFO.

:::info Adjusting Severity

You can also adjust the severity of the log by either calling the `logWarning` or `logInfo` methods.

```kotlin
Embrace.getInstance().logWarning("User attempted expired credit card")
Embrace.getInstance().logInfo("User has entered checkout flow")
```

:::

import LogLimit from '@site/shared/log-limit.md';

<LogLimit />

## Being Alerted on Logs

Once you start using our alerting feature you can also configure how these are handled on the backend.
Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with log events.
For example, let's say you have a steady rate of 1% for a given log event. You could set that as a threshold and receive an email if the rate rises beyond that in a sustained way.

## Export your telemetry

A [LogRecordExporter](https://opentelemetry.io/docs/specs/otel/logs/sdk/#logrecordexporter) can be easily injected, to directly export your data to any OpenTelemetry Collector.

### Local testing

Injecting a [SystemOutLogRecordExporter](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/logging/src/main/java/io/opentelemetry/exporter/logging/SystemOutLogRecordExporter.java) will allow you to see your telemetry in the logcat.

```text
2024-03-05 14:15:15.342 29672-29756 System.out     io.embrace.mysampleapp          I  1970-01-01T00:00:00Z INFO 'Default log'
```

### Adding a LogRecordExporter for a custom OTel Collector

You can send your data to a custom [OTel Collector](https://github.com/open-telemetry/opentelemetry-java/blob/main/exporters/otlp/all/src/main/java/io/opentelemetry/exporter/otlp/logs/OtlpGrpcLogRecordExporter.java):

```kotlin
 //grpc through an otel collector in a local docker image
val customDockerLogRecordExporter = OtlpGrpcLogRecordExporter.builder()
    .setEndpoint("http://10.0.2.2:4317")
    .build()
```

### Exporting data to Grafana Cloud

Embrace Logs can be exported to [Grafana Cloud](https://grafana.com/docs/opentelemetry/collector/opentelemetry-collector/) using an OTel Collector.

```kotlin
//... or directly to grafana cloud
val grafanaCloudLogRecordExporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("https://myinstance.grafana.net/otlp/v1/traces")
    .addHeader("Authorization", "YourToken")
    .build()
```

:::info
**Every exporter should be added before starting the SDK**
:::

```kotlin
Embrace.getInstance().addLogRecordExporter(SystemOutLogRecordExporter.create())
Embrace.getInstance().addLogRecordExporter(customDockerLogRecordExporter)
Embrace.getInstance().addLogRecordExporter(grafanaCloudLogRecordExporter)

Embrace.getInstance().start(this)        
```

## Best Practices

Logging a message using the Log Message API makes a network request immediately.
Sending too many logs can easily impact application performance or battery life.

### Log Batching

To reduce the device and network overhead, we batch logs according to the [following criteria](https://github.com/embrace-io/embrace-android-sdk/blob/15f3376641992c52e947869a018364fcfea857f6/embrace-android-sdk/src/main/java/io/embrace/android/embracesdk/internal/logs/LogOrchestrator.kt):

- `MAX_LOGS_PER_BATCH` = 50. Once we reach 50 logs, we send the batch (all in a single request)
- `MAX_BATCH_TIME` = 5000 (in milliseconds). We send the batch 5 seconds after the first log in the batch was received.
- `MAX_INACTIVITY_TIME` = 2000 (in milliseconds). If no new log appears after 2 seconds from the last log, we send the batch.

:::info
For more tips on making the most of the Log Message API, check out the [Dashboard section on Logs](/product/logs/log-messages.md).
:::

---
