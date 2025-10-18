---
title: Log Message API
description: Trigger alerts for your Unity application using logs with the Embrace SDK
sidebar_position: 9
---

# Adding Logs

As we've discussed in the [Session Reporting section](/unity/integration/session-reporting/), Embrace may not always be able to upload session information when the app is sent to the background for a variety of reasons.

However, some situations might require immediate feedback, such as hunting an especially difficult bug, troubleshooting on behalf of high-value users, or monitoring a new version rollout.

You can leverage the log message API for this.

## Using the Log Message API

You can log a message immediately by calling the `logMessage` method.

```cs
Embrace.Instance.LogMessage("error log", EMBSeverity.Error, new Dictionary<string, string>());
```

Let's examine the method call above to understand the arguments involved:

- The first argument is a string and represents the message itself.  
- This is the severity of the event. Typically we use this mechanism for errors, warnings, and occasionally for tracing purposes, but [breadcrumbs](/ios/5x/integration/breadcrumbs) are better for that purpose.
- The third argument is a dictionary of key-value pairs. When logging an event, break out any details into this dictionary and you will be able to categorize and filter on those values.  

## Log Limits per Session

- **Info and Warning Logs**: The default limit is set to 100 logs per session.
- **Error Logs**: A higher limit of 250 logs per session is allowed to accommodate more critical information.

If you encounter the message `[Embrace]: Warning Log limit has been reached`, it indicates that the maximum number of logs for a given category has been exceeded within a single session. For use cases requiring more logs, please contact support to discuss your needs, which may include recommendations for alternative solutions such as using breadcrumbs.

import LogLimit from '@site/shared/log-limit.md';

<LogLimit />

## Being Alerted on Logs

Once you start using our alerting feature you can also configure how these are handled on the backend. Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with logEvents. For example, if you have a steady rate of 1% for a given logEvent, then you can set a threshold so that if it rises in a sustained way you get an email sent directly to you.

## Best Practices

Embrace's logMessage API will immediately make network calls to report logs, and will not wait for the session to complete. A call to this API results in a networking call from your app to Embrace's servers immediately.
This can have a negative effect on your application's performance or battery life when over-used.
It can also be an invaluable tool for getting information about your application quickly.

:::info
For more tips on making the most of the Log Message API, check out the [Dashboard section on Logs](/product/logs/log-messages.md).
:::

---

Congratulations! By this point, you should have a solid integration. Continue to the [Next Steps](/unity/integration/next-steps/) page to wrap up your integration.
