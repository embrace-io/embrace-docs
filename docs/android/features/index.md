---
title: Feature Reference
description: Learn about the advanced ways Embrace can help your application
sidebar_position: 2
---

# Android feature reference

Embrace's SDK includes many advanced features that you can enable to help you understand more about
how your application is performing in production.

- [**Traces.**](/android/features/traces.md) Record traces to monitor the production performance and success rates of operations within your application.
- [**Breadcrumbs.**](/android/features/breadcrumbs.md) Enrich your sessions with Breadcrumb, a lightweight way to add logging to your session.  
- [**ANRs.**](/docs/product/troubleshooting/anr-reporting.md) Dig into main thread blockages that cause Application Not Responding errors in a user's session.
- [**Know your users.**](/android/features/identify-users.md) Add your own custom identifiers to users and sessions to make sure you can aggregate and find sessions correctly.
- [**Session properties.**](/android/features/session-properties.md) Session properties provide a way to annotate the session with additional information.
- [**Background sessions.**](/android/features/background-sessions.md) Embrace can track sessions that occur in the background.
- [**Push notifications.**](/android/features/push-notifications.md) Embrace automatically captures push notifications received. Learn how to configure this feature.
- [**Current session ID API.**](/android/features/current-session-id-api.md) This API lets you know what the current session ID is in case you need to track it separately.
- [**Last run end state.**](/android/features/last-run-end-state.md) Understand if your last app instance ended in a crash.
- [**Configuration file.**](/android/features/configuration-file.md) The SDK has many configuration options available.
- [**Jetpack Compose.**](/android/features/jetpack-compose.md) Enable Jetpack Compose (beta) to track taps on composables.
- [**Network body capture.**](/android/features/network-body-capture.md) Embrace can upload bodies from your network requests to help you troubleshoot. Learn how to enable this feature securely.
- [**Disable data export.**](/android/features/disable-data-export.md) Embrace can be disabled at runtime through an API. Ideal to support user opt-out requirements.  
- [**Performance auto instrumentation.**](/android/features/performance-instrumentation.md) The Embrace SDK can automatically instrument key workflows as the app goes through its operational lifecycle. The instrumentation generates traces.
- [**Log attachments.**](/android/features/log_attachments.md) Embrace’s Log Message API allows binary attachments to be added to log messages.
- [**Embrace Gradle plugin.**](/android/features/embrace-gradle-plugin.md) Overview and configuration of Embrace Gradle plugin (FKA the Swazzler).
