---
title: Log Message API
description: Trigger alerts for your iOS application using logs with the Embrace SDK
sidebar_position: 8
---

# Adding Logs

As we've discussed in the [Session Reporting section](/ios/5x/integration/session-reporting), Embrace will end and attempt to upload the current session when the app is sent to the background.

However, some situations might require immediate feedback, such as hunting an especially difficult bug, troubleshooting on behalf of high-value users, or monitoring a new version rollout.

You can leverage the log message API for this.

## Using the Log Message API

You can log a message immediately by calling the `logMessage` method.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
let properties = ["property_a": "value_a", "property_b": "value_b"]
Embrace.sharedInstance().logMessage("Loading not finished in time.", with: .error, properties: properties)
```

</TabItem>

<TabItem value="objectivec" label="Objective-C">

```objectivec
NSDictionary *properties = @{@"property_a": @"value_a", @"property_b": @"value_b"};
[[Embrace sharedInstance] logMessage:@"Loading not finished in time." withSeverity:EMBSeverityError properties:properties];
```

</TabItem>
</Tabs>

Let's examine the method call from above to understand the arguments involved:

1. **logMessage**: The first argument is a string and represents the message itself. 
2. **with**: This is the severity of the event. Typically we use this mechanism for errors and warnings and occasionally for tracing purposes, but that is better left to [breadcrumbs](/ios/5x/integration/breadcrumbs).
3. **properties**: This is a dictionary of key-value pairs. When logging an event, break out any details into this dictionary and you will be able to categorize and filter on those values. 

import LogLimit from '@site/shared/log-limit.md';

<LogLimit />

## Being Alerted on Logs

Once you start using our alerting feature you can also configure how these are handled on the backend.
Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with logEvents.
For example, if you have a steady rate of 1% for a given logEvent, then you can set a threshold so that if it rises in a sustained way you get an email sent directly to you.

## Best Practices

Embrace's logMessage API is immediate mode.
A call to this API results in a networking call between your app and Embrace's servers immediately.
This can have a negative effect on your application's performance or battery life when over-used.
It can also be an invaluable tool for getting information about your application quickly.

:::info
For more tips on making the most of the Log Message API, check out the [Dashboard section on Logs](/docs/product/logs/log-messages.md).
:::

---

Congratulations! By this point, you should have a solid integration. Continue to the [Next Steps](/ios/5x/integration/next-steps) page to wrap up your integration.
