---
title: Push notifications
description: Embrace can capture push notifications received by your app.
sidebar_position: 4
---

# Push notifications

If you use the [firebase_messaging](https://pub.dev/packages/firebase_messaging) package, Embrace can automatically capture push notifications received by your app. This behavior is disabled by default and must be configured separately for the Embrace Android SDK and the Embrace iOS SDK.

## Android configuration

To enable push notifications capture, set `firebasePushNotificationsEnabled` to `true` in the `app/build.gradle` file of your Android project:

```groovy
embrace {
    bytecodeInstrumentation {
        firebasePushNotificationsEnabled.set(true)
    }
}
```

:::info
To capture data from inside the notifications, set `capture_fcm_pii_data` to `true` in your `embrace-config.json` file inside `sdk_config`. This value is `false` by default.
:::

## iOS configuration

Push notifications capture is controlled by supplying a `captureService` when initializing the iOS SDK. To enable this functionality, add the following where you initialize Embrace in your `AppDelegate`:

```swift
let builder = CaptureServiceBuilder().addDefaults()
builder.add(.pushNotification())
let services = builder.build()

try Embrace
    .setup(
        options: Embrace.Options(
            appId: "", // Your app ID
            captureServices: services,
            crashReporter: EmbraceCrashReporter()
        )
    )
    .start()
```

## Manually log push notifications

You can also manually log push notifications from the Flutter SDK. This is useful when using packages other than `firebase_messaging` or if automatic capture is disabled. To register a push notification, call the following method:

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

The `title` and `body` parameters are common to all push notifications. The parameters `subtitle`, `badge`, and `category` are exclusive to iOS notifications, while the rest are exclusive to Android notifications. The parameters `hasNotification` and `hasData` correspond to the FCM distinction between `notification` and `data` messages (as described in the [Firebase documentation](https://firebase.google.com/docs/cloud-messaging/customize-messages/set-message-type)).
