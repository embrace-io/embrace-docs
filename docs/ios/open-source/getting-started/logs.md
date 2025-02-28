---
title: Log Message API
description: Trigger alerts for your iOS application using logs with the Embrace SDK
sidebar_position: 6
---

# Adding Logs

As we've discussed in the [Session Reporting section](/docs/ios/open-source/getting-started/session-reporting.md), Embrace will end sessions and attempt to upload the current session when the app is sent to the background.

However, some situations might require immediate feedback, such as hunting an especially difficult bug, troubleshooting on behalf of high-value users, or monitoring a new version rollout.

You can leverage the Log Message API for this.

## Using the Log Message API

You can log a message immediately by calling the `log` method.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
let attributes = ["property_a": "value_a", "property_b": "value_b"]
Embrace.client?.log(
    "Loading not finished in time.", // message
    severity: .warn,
    timestamp: Date.now,
    attributes: attributes
)
```

</TabItem>
</Tabs>

Let's examine the method call from above to understand the arguments involved:

1. **message**: The first argument is a string and represents the message itself.
1. **severity**: This is the [LogSeverity](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCommonInternal/Models/LogSeverity.swift) of the event. Typically we use this mechanism for errors and warnings and occasionally for tracing purposes, but that is better left to [breadcrumbs](/docs/ios/open-source/getting-started/breadcrumbs.md).
1. **timestamp**: This is the time that this log message should show in the timeline. If the log points to an error or warning happening prior to the current time, the timestamp for the occurrence can be added here.
1. **attributes**: This is a dictionary of key-value pairs. When logging an event, break out any details into this dictionary and you will be able to categorize and filter on those values.

import LogLimit from '@site/shared/log-limit.md';

<LogLimit />

## Being Alerted on Logs

Once you start using our alerting feature you can also configure how these are handled on the backend.
Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with logEvents.

For example, if you have a steady rate of 1% for a given logEvent, then you can set a threshold so that if it rises in a sustained way you get an email sent directly to you.

## Best Practices

A call to this API results in a networking call between your app and Embrace's servers immediately.
This can have a negative effect on your application's performance or battery life when over-used.
It can also be an invaluable tool for getting information about your application quickly.

### Log Batching
To reduce the device and network overhead. We batch logs according to the following critera: 
- A maximum of **2 seconds** between logs: After receiving a log, we wait for 2 seconds. If no additional log arrives during that period, we send it to the backend.
- A maximum of **5 seconds** for batch lifetime: Log batches should not exist for more than 5 seconds. This complements the previous logic to prevent accumulation of logs (for example, if someone adds a log every 1 second).
- A maximum of **50 logs** per batch: This final rule prevents issues with large batches. If many logs are created in a short period (less than the batch lifetime), the batch will be sent.


:::info
For more tips on making the most of the Log Message API, checkout the [Best Practices](/best-practices/log-message-api).
:::
