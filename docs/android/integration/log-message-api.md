---
title: Log Message API
sidebar_position: 7
description: Trigger alerts for your Android application using logs with the Embrace SDK
---

# Adding Logs

Typically the Embrace SDK uploads data at the end of a session. However, some situations 
might require instant feedback, such as hunting an especially difficult bug, troubleshooting 
on behalf of high-value users, or monitoring a new version rollout.

You can leverage the log message API for this.

## Using the Log Message API

You can log a message immediately by calling the `logError` method.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
Embrace.getInstance().logError("Loading not finished in time.")
```
</TabItem>
<TabItem value="java" label="Java">
```java
Embrace.getInstance().logError("Loading not finished in time.");
```
</TabItem>
</Tabs>

Or you can call `logMessage` if you want to add properties to your logs.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
val props = mutableMapOf<String, Any>()
props["propertyA"] = "valueA"
props["propertyB"] = "valueB"
Embrace.getInstance().logMessage("Loading not finished in time.", Severity.ERROR, props)
```
</TabItem>
<TabItem value="java" label="Java">
```java
Map<String, Object> map = new HashMap<>();
map.put("propertyA", "valueA");
map.put("propertyB", "valueB");
Embrace.getInstance().logMessage("Loading not finished in time.", Severity.ERROR, props);
```
</TabItem>
</Tabs>

Here's a breakdown of the arguments being passed to the `logError` method.

1. **The message.** The string is the message itself. Try to make this short yet informative.
1. **Properties.** This is a map of key-value pairs you can use to categorize and filter log messages with.

:::info Adjusting Severity

You can also adjust the severity of the log by either calling the `logWarning` or `logInfo` methods.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
Embrace.getInstance().logWarning("User attempted expired credit card")
Embrace.getInstance().logInfo("User has entered checkout flow")
```
</TabItem>
<TabItem value="java" label="Java">
```java
Embrace.getInstance().logWarning("User attempted expired credit card");
Embrace.getInstance().logInfo("User has entered checkout flow");
```
</TabItem>
</Tabs>

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
