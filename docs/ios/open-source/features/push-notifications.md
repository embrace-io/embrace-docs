---
title: Push Notifications
description: Embrace can capture push notifications received by your app.
sidebar_position: 5
---

# Push Notifications

The Embrace SDK can capture push notifications received by your app.

You can change the way Embrace captures push notifications with the [CaptureService](/docs/ios/open-source/integration/customizing-signals.md) `PushNotificationCaptureService`. This automatic mode doesn't require any changes in your code.

:::info
If you want to prevent any data inside the notifications from being captured, you can set the `captureData` to `false` when you initialize the service with `PushNotificationCaptureService.Options`.
:::
