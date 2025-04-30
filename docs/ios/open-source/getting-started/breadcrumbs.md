---
title: Breadcrumbs
description: Add context to sesions with Breadcrumbs.
sidebar_position: 4
---

# Breadcrumbs

Breadcrumbs are a lightweight way to add logging to your session. They provide context to user activity in sessions, while adding little CPU or memory overhead. 

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/docs/ios/open-source/getting-started/crash-report.md) and [Session Reporting](/docs/ios/open-source/getting-started/session-reporting.md) sections. Embrace can also collect your logging data and include it as context within your sessions. Here's how you add a breadcrumb to the session:

```swift
Embrace.client?
        .add(event: .breadcrumb("something happened RIGHT NOW"))
```

:::warning Important
Breadcrumb messages must be 256 characters or less.
:::

Note here that the `.add(event:)` method adds a SpanEvent to the [session span](/ios/open-source/#how-we-built-it). Embrace's Breadcrumbs are an OpenTelemetry-compliant subclass of SpanEvents, and are add in-context in the [User Timeline](/docs/features/user-sessions).

:::info
For how to best use Breadcrumbs, check out the [Best Practices](/docs/best-practices/breadcrumbs.md) page.
:::
