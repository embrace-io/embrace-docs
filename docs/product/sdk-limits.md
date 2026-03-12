---
title: SDK Limits Reference
sidebar_position: 99
description: Complete reference of all SDK limits across Embrace platforms
---

import androidLimits from '@site/shared/limits/android.json';
import iosLimits from '@site/shared/limits/ios.json';
import crossPlatformLimits from '@site/shared/limits/cross-platform.json';
import webLimits from '@site/shared/limits/web.json';

# SDK Limits Reference

This page provides a comprehensive reference of all limits enforced by Embrace SDKs across platforms. These limits are designed to ensure optimal performance while capturing the data you need.

## Trace & Span Limits

Traces allow you to monitor the performance and success rates of operations within your app.

### Comparison by Platform

| Limit | Android | iOS | React Native / Flutter / Unity | Web |
|-------|---------|-----|-------------------------------|-----|
| Max spans per session | {androidLimits.traces.maxSpansPerSession} | — | {crossPlatformLimits.traces.maxSpansPerSession} | {webLimits.traces.maxSpansPerSession.toLocaleString()} |
| Max attributes per span | {androidLimits.traces.maxAttributesPerSpan} | {iosLimits.traces.maxAttributesPerSpan} | {crossPlatformLimits.traces.maxAttributesPerSpan} | {webLimits.traces.maxAttributesPerSpan} |
| Max events per span | {androidLimits.traces.maxEventsPerSpan} | {iosLimits.traces.maxEventsPerSpan.toLocaleString()} | {crossPlatformLimits.traces.maxEventsPerSpan} | {webLimits.traces.maxEventsPerSpan} |
| Max attributes per event | {androidLimits.traces.maxAttributesPerEvent} | {iosLimits.traces.maxAttributesPerEvent} | {crossPlatformLimits.traces.maxAttributesPerEvent} | {webLimits.traces.maxAttributesPerEvent} |
| Max links per span | {androidLimits.traces.maxLinksPerSpan} | — | — | — |
| Attribute key length | {androidLimits.traces.maxAttributeKeyLength} chars | — | {crossPlatformLimits.traces.maxAttributeKeyLength} chars | {webLimits.traces.maxAttributeKeyLength} chars |
| Attribute value length | {androidLimits.traces.maxAttributeValueLength} chars | — | {crossPlatformLimits.traces.maxAttributeValueLength} chars | {webLimits.traces.maxAttributeValueLength} chars |
| Span name length | {androidLimits.traces.maxSpanNameLength} chars | {iosLimits.traces.maxSpanNameLength} chars | {crossPlatformLimits.traces.maxSpanNameLength} chars | {webLimits.traces.maxSpanNameLength} chars |
| Event name length | {androidLimits.traces.maxEventNameLength} chars | — | {crossPlatformLimits.traces.maxEventNameLength} chars | {webLimits.traces.maxEventNameLength} chars |

:::info Notes
- There are no limits on the duration of a span as long as the app is running.
- There are no limits to the number of child spans you can have per root span, provided the total number of spans does not exceed the per-session maximum.
- If you exceed these limits, the operation will either truncate values or fail. See platform-specific documentation for details.
:::

## Log Limits

Logs provide contextual information about your application's state and events.

### Log Message Limits

| Limit | Value |
|-------|-------|
| Max message length | {crossPlatformLimits.logs.maxMessageLength} characters |
| Max properties per log | {crossPlatformLimits.logs.maxPropertiesPerLog} |
| Property key length | {crossPlatformLimits.logs.maxPropertyKeyLength} characters |
| Property value length | {crossPlatformLimits.logs.maxPropertyValueLength} characters |

### Logs Per Session

| Severity | Limit |
|----------|-------|
| Error logs | {crossPlatformLimits.logs.maxErrorLogsPerSession} per session |
| Warning logs | {crossPlatformLimits.logs.maxWarningLogsPerSession} per session |
| Info logs | {crossPlatformLimits.logs.maxInfoLogsPerSession} per session |

### iOS-Specific Log Limits

| Limit | Value |
|-------|-------|
| Max log size | {iosLimits.logs.maxLogSize.toLocaleString()} bytes |
| Max attachments per session | {iosLimits.logs.maxAttachmentsPerSession} |
| Max attachment size | {(iosLimits.logs.maxAttachmentSize / 1024 / 1024).toFixed(0)} MiB |

## Breadcrumb Limits

Breadcrumbs are lightweight markers that track user journey through your application.

| Limit | Value |
|-------|-------|
| Max message length | {crossPlatformLimits.breadcrumbs.maxMessageLength} characters |
| Max breadcrumbs per session (iOS) | {iosLimits.breadcrumbs.maxPerSession} |

## Session Property Limits

Session properties allow you to annotate sessions with custom key-value pairs.

| Limit | Value |
|-------|-------|
| Property key length | {crossPlatformLimits.sessionProperties.maxKeyLength} characters |
| Property value length | {crossPlatformLimits.sessionProperties.maxValueLength} characters |
| Default properties per session | {crossPlatformLimits.sessionProperties.defaultLimit} |
| Maximum properties per session | {crossPlatformLimits.sessionProperties.maxLimit} |

:::tip Increasing Property Limits
The default limit for session properties is {crossPlatformLimits.sessionProperties.defaultLimit}. You can have up to {crossPlatformLimits.sessionProperties.maxLimit} properties. Contact support@embrace.io to increase this limit.
:::

## Platform-Specific Documentation

For detailed information about limits on your platform, see:

- [Traces](/sdk/features/traces/) (all platforms)

## Future Updates

These limit values are sourced from JSON configuration files that can be generated from SDK source code. As SDK limits change, this documentation will be automatically updated.
