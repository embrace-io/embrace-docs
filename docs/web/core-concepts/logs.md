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

Logs provide contextual information about your application's state and events that occur during a session. The Embrace
SDK's logging capabilities help you track, troubleshoot, and receive alerts about important events.

## What are Logs?

In the Embrace SDK, logs are records of events with associated severity levels, timestamps, and optional attributes.
They provide critical information that can help you understand:

- Error conditions
- Warning situations
- Important state changes
- Significant user actions
- System events

Logs are especially valuable for capturing information that requires immediate attention or for troubleshooting specific
issues.

## When to Use Logs

While Embrace automatically captures sessions and their associated data, there are scenarios where you may want to add
custom logs:

- Hunting difficult bugs
- Troubleshooting for high-value users
- Monitoring new version rollouts
- Tracking critical business events
- Capturing error conditions that need immediate attention

## Log Limits

Embrace enforces certain limits on logs:

- Maximum number of error logs per session: 500
- Maximum number of warning logs per session: 200
- Maximum number of info logs per session: 100
- Maximum length of log messages: 128 characters
- Maximum length for a log attribute key: 128 characters
- Maximum length for a log attribute value: 256 characters

## Using the Log API

See our [guide on instrumentating Logs](/docs/web/manual-instrumentation/custom-logging.md) for examples on
how to instrument your application.

## Logs vs Other Concepts

- **Logs vs Traces**: While traces focus on performance and operation flow, logs provide contextual information about
events and states
- **Logs vs Sessions**: Logs are events within a session that provide additional context
- **Logs vs Breadcrumbs**: Logs are more detailed, are grouped based on message, and can have alerts built on top of
their aggregation. Breadcrumbs are simpler standalone markers of user journey steps

## Best Practices

- **Be selective**: Excessive logging can impact performance
- **Use appropriate severity levels**: Reserve error and warning levels for actual problematic situations
- **Add meaningful attributes**: This helps with filtering and understanding context
- **Keep messages clear and concise**: This makes troubleshooting easier
- **Consider timing**: Use the timestamp parameter to accurately reflect when events actually occurred
