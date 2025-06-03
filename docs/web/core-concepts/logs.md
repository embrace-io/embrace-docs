---
title: Logs
description: Understanding logs in the Embrace Web SDK
sidebar_position: 3
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

# Logs

Logs provide contextual information about your application's state and events that occur during a session. The Embrace SDK's logging capabilities help you track, troubleshoot, and receive alerts about important events.

## What are Logs?

In the Embrace SDK, logs are records of events with associated severity levels, timestamps, and optional attributes. They provide critical information that can help you understand:

- Error conditions
- Warning situations
- Important state changes
- Significant user actions
- System events

Logs are especially valuable for capturing information that requires immediate attention or for troubleshooting specific issues.

## When to Use Logs

While Embrace automatically captures sessions and their associated data, there are scenarios where you may want to add custom logs:

- Hunting difficult bugs
- Troubleshooting for high-value users
- Monitoring new version rollouts
- Tracking critical business events
- Capturing error conditions that need immediate attention

## Using the Log API
<!-- TODO: Replace -->
The Embrace SDK provides a simple API for logging messages:

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

The log method takes the following parameters:

1. **message**: A string representing the log message itself
2. **severity**: The [LogSeverity](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCommonInternal/Models/LogSeverity.swift) of the event (e.g., info, warn, error)
3. **timestamp**: When this log event occurred
4. **attributes**: A dictionary of key-value pairs for additional context and filtering

## Log Limits

Embrace enforces certain limits on logs:

- Maximum number of logs per session: 500
- Maximum size of logs: 10,000 bytes

If your application exceeds these limits, the newest logs will be kept and the oldest logs will be dropped.

## Log Batching

To optimize device and network performance, Embrace batches logs according to the following criteria:

- A maximum of **2 seconds** between logs: After receiving a log, we wait for 2 seconds. If no additional log arrives during that period, we send it to the backend.
- A maximum of **5 seconds** for batch lifetime: Log batches should not exist for more than 5 seconds.
- A maximum of **50 logs** per batch: This prevents issues with large batches.

## File Attachments with Logs
<!-- TODO change if necessary -->
You can attach data to logs to provide more context for troubleshooting:

### Embrace-Hosted Attachments

```swift
let attributes = ["property_a": "value_a", "property_b": "value_b"]
Embrace.client?.log(
    "This is a log with an Embrace-hosted attachment", // message
    severity: .info,
    timestamp: Date.now,
    attachment: someData, // NSData/Data
    attributes: attributes
)
```

Limitations for Embrace-hosted attachments:
- Maximum of 5 attachments per session
- Maximum attachment size of 1 MiB (1048576 bytes)

### User-Hosted Attachments

If you need more attachments or larger files, you can host the attachments yourself and reference them:

```swift
let attributes = ["property_a": "value_a", "property_b": "value_b"]
Embrace.client?.log(
    "This is a log with a user-hosted attachment", // message
    severity: .info,
    timestamp: Date.now,
    attachmentId: attachmentId, // String
    attachmentUrl: attachmentUrl, // URL
    attributes: attributes
)
```

## Logs vs Other Concepts

- **Logs vs Traces**: While traces focus on performance and operation flow, logs provide contextual information about events and states
- **Logs vs Sessions**: Logs are events within a session that provide additional context
- **Logs vs Breadcrumbs**: Logs are more detailed and can trigger alerts, while breadcrumbs are simpler markers of user journey steps

## Best Practices

- **Be selective**: Excessive logging can impact performance and battery life
- **Use appropriate severity levels**: Reserve error and warning levels for actual problematic situations
- **Add meaningful attributes**: This helps with filtering and understanding context
- **Keep messages clear and concise**: This makes troubleshooting easier
- **Consider timing**: Use the timestamp parameter to accurately reflect when events actually occurred
- **Batch related logs**: Log related information together using consistent attribute keys
