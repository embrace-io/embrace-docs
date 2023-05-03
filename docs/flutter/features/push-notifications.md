---
title: Push Notifications
description: Embrace can capture push notifications received by your app.
sidebar_position: 4
---

# Push notifications

If using the [firebase_messaging](https://pub.dev/packages/firebase_messaging) package, push notifications received by your app can be automatically captured by Embrace. This behavior is disabled by default; it must be configured separately for the Embrace Android SDK and the Embrace iOS SDK.

## Android configuration

To enable the push notifications capture, you must set `instrumentFirebaseMessaging` to true in the `app/build.gradle` file of your Android project.

```groovy
swazzler {
    instrumentFirebaseMessaging = true
}
```

:::info
If you want to capture data from inside the notifications then you can set the config `capture_fcm_pii_data` to `true` in your `embrace-config.json` file inside `sdk_config`. This value is false by default.
:::

## iOS configuration

Push notifications capture is controlled by the local config `PUSH_NOTIFICATIONS_CAPTURE_MODE` in the `Embrace-Info.plist` file. To enable this functionality, this config must be set to `automatic` (to disable it again, the config can be set to the default `manual`).

:::info
If you want to prevent any data inside the notifications from being captured, you can set the local config `ENABLE_PUSH_NOTIFICATIONS_DATA_CAPTURE` to `NO`.
:::

## Manually logging push notifications

Push notifications can also be manually logged from the Flutter SDK. This could be useful when using packages other than `firebase_messaging` or just if automatic capture is disabled. To register a push notification call the following method:

```dart
  void logPushNotification(
    String? title,
    String? body, {
    String? subtitle,
    Int? badge,
    String? category,
    String? from,
    String? messageId,
    int priority = 0,
    bool hasNotification = false,
    bool hasData = false,
  });
```

The `title` and `body` parameters will be common to all push notifications. The parameters `subtitle`, `badge` and `category` are exclusive to iOS notifications, while the rest are exclusive are exclusive to Android notifications. The parameters `hasNotification` and `hasData` correspond to the FCM distinction between `notification` and `data` messages (as described in the [Firebase documentation](https://firebase.google.com/docs/cloud-messaging/concept-options))


