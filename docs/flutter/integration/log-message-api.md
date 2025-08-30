---
title: Log Message API
description: Trigger alerts for your Flutter application using logs with the Embrace SDK
sidebar_position: 10
---

# Adding Logs

As we've discussed in the [Session Reporting section](/flutter/integration/session-reporting/), Embrace uploads its sessions when the application is backgrounded or, if that fails, on the next app launch.
This delay may seem like it hurts the immediacy of the data you are seeing, but the reality is that at scale this still means you are finding out about issues very quickly.

However, some situations might require instant feedback, such as hunting an especially difficult bug, troubleshooting on behalf of high-value users, or monitoring a new version rollout.

You can leverage the log message API for this.

## Using the Log Message API

You can log a message immediately by calling any of the `log` functions, like `logError`:

```dart
import 'package:embrace/embrace.dart';

Embrace.instance.logError(
	'Loading not finished on time',
	properties: {
		'propertyA': 'valueA', 
		'propertyB': 'valueB',
	}
);
```

Here's a breakdown of the arguments being passed to the `logError` method (the only required one is the message):

- **message** The string is the message itself. Try to make this short yet informative.
- **properties** This is a map of key-value pairs you can use to categorize and filter log messages with.

:::info Adjusting Severity
You can also adjust the severity of the log by either calling the `logWarning` or `logInfo` methods.

```dart
Embrace.instance.logWarning("User attempted expired credit card", props);

Embrace.instance.logInfo("User has entered checkout flow");
```

:::

### Log Limits per Session

- **Info and Warning Logs**: The default limit is set to 100 logs per session.
- **Error Logs**: A higher limit of 250 logs per session is allowed to accommodate more critical information.

If you encounter the message `[Embrace]: Warning Log limit has been reached`, it indicates that the maximum number of logs for a given category has been exceeded within a single session. For use cases requiring more logs, please contact support to discuss your needs, which may include recommendations for alternative solutions such as using breadcrumbs.

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
For more tips on making the most of the Log Message API, check out the [Dashboard section on Logs](/product/logs/log-messages.md).
:::

---

Congratulations! By this point, you should have a solid integration. Continue to the [Next Steps](/flutter/integration/next-steps/) page to wrap up your integration.
