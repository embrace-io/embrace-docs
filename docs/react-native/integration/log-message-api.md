---
title: Log Message API
description: Trigger alerts for your React Native application using logs with the Embrace SDK
sidebar_position: 8
---

# Adding Logs

As we've discussed in the [Session Reporting section](/react-native/integration/session-reporting), Embrace uploads its sessions on the next app launch.
This delay may seem like it hurts the immediacy of the data you are seeing, but the reality is that at scale this still means you are finding out about issues very quickly.

However, some situations might require instant feedback, such as hunting an especially difficult bug, troubleshooting on behalf of high-value users, or monitoring a new version rollout.

You can leverage the log message API for this.

## Using the Log Message API

You can log a message immediately by calling the `logMessage` function.

```javascript
import { logMessage } from '@embrace-io/react-native';

logMessage('Loading not finished in time.', 'error', {
  propertyA: 'valueA',
  propertyB: 'valueB'
});
```

Here's a breakdown of the arguments being passed to the `logMessage` function.

1. **The message.** The string of the log message. Make this short yet informative.
1. **Severity.** Other options include `warning` and `info`.
1. **Properties.** A map of key-value pairs you can use to categorize and filter log messages with.

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
For more tips on making the most of the Log Message API, check out the [Dashboard section on Logs](/docs/product/logs/log-messages.md).
:::

---

Congratulations! By this point, you should have a solid integration. Continue to the [Next Steps](/react-native/integration/next-steps) page to wrap up your integration.
