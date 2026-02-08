---
title: Log message API
description: Trigger alerts for your Flutter application using logs with the Embrace SDK
sidebar_position: 10
---

# Add logs

Some situations require instant feedback, such as hunting an especially difficult bug, troubleshooting on behalf of high-value users, or monitoring a new version rollout. You can use the log message API for this.

## Use the log message API

Log a message immediately by calling any of the `log` functions, like `logError`:

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

Here's a breakdown of the arguments passed to the `logError` method (the only required argument is the message):

- **message**: The string message itself. Keep it short yet informative.
- **properties**: A map of key-value pairs you can use to categorize and filter log messages.

:::info Adjusting severity
You can adjust the severity of the log by calling the `logWarning` or `logInfo` methods:

```dart
Embrace.instance.logWarning("User attempted expired credit card", props);

Embrace.instance.logInfo("User has entered checkout flow");
```

:::

import LogLimit from '@site/shared/log-limit.md';

<LogLimit />

## Set up alerts on logs

Once you start using the alerting feature, you can configure how these are handled on the backend. Using the Embrace Dashboard, you can configure email alerts to be sent to your team when certain thresholds are met with log events. For example, if you have a steady rate of 1% for a given log event, you could set that as a threshold and receive an email if the rate rises beyond that in a sustained way.

## Best practices

Logging a message using the Log Message API makes a network request immediately. Sending too many logs can easily impact application performance or battery life.

:::info
For more tips on making the most of the Log Message API, check out the [Dashboard section on Logs](/product/logs/log-messages.md).
:::
