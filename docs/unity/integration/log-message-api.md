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

1. The first argument is a string and represents the message itself. 
2. This is the severity of the event. Typically we use this mechanism for errors, warnings, and occasionally for tracing purposes, but [breadcrumbs](/ios/5x/integration/breadcrumbs) are better for that purpose.
3. The third argument is a dictionary of key-value pairs. When logging an event, break out any details into this dictionary and you will be able to categorize and filter on those values. 

import LogLimit from '@site/shared/log-limit.md';

<LogLimit />

## Being Alerted on Logs

Once you start using our alerting feature you can also configure how these are handled on the backend. Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with logEvents. For example, if you have a steady rate of 1% for a given logEvent, then you can set a threshold so that if it rises in a sustained way you get an email sent directly to you.

## Best Practices

Embrace's logMessage API will immediately make network calls to report logs, and will not wait for the session to complete. A call to this API results in a networking call from your app to Embrace's servers immediately.
This can have a negative effect on your application's performance or battery life when over-used.
It can also be an invaluable tool for getting information about your application quickly.

:::info
For more tips on making the most of the Log Message API, checkout the [Best Practices](/best-practices/log-message-api/).
:::

---

Congratulations! By this point, you should have a solid integration. Continue to the [Next Steps](/unity/integration/next-steps/) page to wrap up your integration.
