---
title: Log Message API
sidebar_position: 7
description: Trigger alerts for your Android application using logs with the Embrace SDK
aliases:
  - /android/log-message-api/

---
# Adding Alerts

Typically the Embrace SDK uploads data at the end of a session. However, some situations 
might require instant feedback, such as hunting an especially difficult bug, troubleshooting 
on behalf of high-value users, or monitoring a new version rollout.

You can leverage the log message API for this.

## Using the Log Message API

You can log a message immediately by calling the `logError` method.

```java
Map<String, Object> props = new HashMap<>();
props.put("propertyA", "valueA");
props.put("propertyB", "valueB");

Embrace.getInstance().logError("Loading not finished in time.", props, false);
```

Here's a breakdown of the arguments being passed to the `logError` method.

1. **The message.** The string is the message itself. Try to make this short yet informative.
1. **Properties.** This is a map of key-value pairs you can use to categorize and filter log messages with.
1. **Screenshot capture enabled.** The final boolean indicates whether you'd like a screenshot captured or not.

{{< hint info >}}
**Adjusting Severity**

You can also adjust the severity of the log by either calling the `logWarning` or `logInfo` methods.

```java
Embrace.getInstance().logWarning("User attempted expired credit card", props);

Embrace.getInstance().logInfo("User has entered checkout flow");
```

{{< /hint >}}

{{< hint warning >}}
{{< readFile file="shared/log-limit.md" >}}
* The following types are supported for property values: String, Integer, Long, Float, Double, Boolean.
{{< /hint >}}

## Being Alerted on Logs

Once you start using our alerting feature you can also configure how these are handled on the backend.
Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with log events.
For example, let's say you have a steady rate of 1% for a given log event. You could set that as a threshold and receive an email if the rate rises beyond that in a sustained way.

## Best Practices

Logging a message using the Log Message API makes a network request immediately.
Sending too many logs can easily impact application performance or battery life.

{{< hint info >}}
For more tips on making the most of the Log Message API, checkout the [Best Practices]({{< relref "/best-practices/log-message-api" >}}).
{{< /hint >}}

---

Congratulations! By this point, you should have a solid integration. Continue to the [Next Steps]({{< relref "/android/integration/next-steps" >}}) page to wrap up your integration.

{{< button relref="/android/integration/next-steps" >}}Next Steps{{< /button >}}
