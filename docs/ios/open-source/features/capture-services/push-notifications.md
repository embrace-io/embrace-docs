---
title: PushNotificationCaptureService
description: Embrace can capture push notifications received by your app.
sidebar_position: 7
---

# Push Notification Capture Service

The `PushNotificationCaptureService` captures push notifications received by the app and generates OpenTelemetry span events for them.

You can pass a custom `PushNotificationCaptureService.Options` instance when initializing the service to configure it.

:::warning
This capture service is not included by default when initializing the Embrace Apple SDK.

You'll need to include it manually if you wish to use it:

```swift
// use default services and add the `PushNotificationCaptureService`
let services = CaptureServiceBuilder()
    .addDefaults()
    .add(.pushNotification())
    .build()

// then, initialize the SDK with these specified services
try Embrace
    .setup(
        options: Embrace.Options(
            appId: "APPID",
            captureServices: services
            //...other options
        )
    )
    .start()
```
:::

### Obfuscate sensitive data

By default, the generated span events will contain certain [push notification data](https://developer.apple.com/documentation/usernotifications/unnotificationcontent): title, subtitle, body, category and badge.

You can prevent the Embrace Apple SDK from capturing this data by setting `PushNotificationCaptureService.Options.captureData` to false.