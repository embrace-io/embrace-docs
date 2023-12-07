---
title: Adding Logs
sidebar_position: 5
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

1. **The message:** The string is the message itself. Try to make this short yet informative.
2. **Properties:** A map of key-value pairs that enables you to categorize and filter log messages.
3. **Screenshot capture enabled:** A boolean value that indicates whether you want to capture a screenshot for warning or error logs.

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

```java
Embrace.getInstance().logWarning("User attempted expired credit card");
Embrace.getInstance().logInfo("User has entered checkout flow");
```

:::

import LogLimit from '@site/shared/log-limit.md';

<LogLimit />

## Being Alerted on Logs

Once you start using our alerting feature you can also configure how these are handled on the backend.
Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with log events.
For example, let's say you have a steady rate of 1% for a given log event. You could set that as a threshold and receive an email if the rate rises beyond that in a sustained way.

## Best Practices

Logging a message using the Log Message API makes a network request immediately.
Sending too many logs can easily impact application performance or battery life.

:::info
For more tips on making the most of the Log Message API, checkout the [Best Practices](/best-practices/log-message-api).
:::

---

Congratulations! By this point, you should have a solid integration. Continue to the [Next Steps](/android/integration/next-steps) page to wrap up your integration.
