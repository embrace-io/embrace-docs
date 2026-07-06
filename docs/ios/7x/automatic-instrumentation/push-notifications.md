---
title: Push Notifications
description: Track push notification events in your iOS app with Embrace
sidebar_position: 6
---

## Push Notifications

The Embrace SDK's `PushNotificationCaptureService` automatically records when your app receives a push notification or when the user taps one, so notification activity is visible alongside the rest of the session timeline.

### How Push Notification Tracking Works

The service swizzles the `delegate` setter on `UNUserNotificationCenter` and installs a proxy delegate. When a notification flows through the standard `UNUserNotificationCenterDelegate` callbacks:

- `userNotificationCenter(_:willPresent:withCompletionHandler:)` — notification displayed while the app is in the foreground.
- `userNotificationCenter(_:didReceive:withCompletionHandler:)` — user interacted with a delivered notification.

…the proxy emits an OpenTelemetry **span event** named `emb-push-notification` on the currently active **session span**, then forwards the call to your original delegate. Your delegate continues to run unchanged.

:::note Where to find the data
Push activity is **not** a standalone root span. Look at the session span's events timeline (or search span events by name `emb-push-notification`). It will not appear when filtering for root spans named `emb.push.*`.
:::

:::caution What is not captured automatically
Only notifications routed through `UNUserNotificationCenter` delegate methods are captured. Silent / background notifications that your app handles **only** through `UIApplicationDelegate.application(_:didReceiveRemoteNotification:fetchCompletionHandler:)` are not intercepted. For those, capture the event manually (see [Manual Capture](#manual-capture) below).
:::

### Configuration

The service has a single option, `captureData`, which controls whether the user-facing payload fields (title, subtitle, body, category, badge) are recorded. It defaults to `false`.

```swift
let services = CaptureServicesOptionsBuilder()
    .addDefaults()
    .addPushNotificationCaptureService(withOptions: .init(captureData: false))
    .build()

let options = EmbraceIO.Options.withAppId(
    "APPID",
    captureServices: services
    //...other options
)
try EmbraceIO.start(options: options)
```

### Captured Attributes

Every `emb-push-notification` span event includes:

| Attribute           | Value                   | Notes                                                                               |
| ------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| `emb.type`          | `sys.push_notification` | Identifies the event type.                                                          |
| `notification.type` | `notif` or `silent`     | `silent` when the payload contains `aps.content-available == 1`, otherwise `notif`. |

When `captureData: true`, the service additionally reads the `aps` dictionary and adds the following attributes when the corresponding fields are present:

| Attribute               | Source in the `aps` payload                  |
| ----------------------- | -------------------------------------------- |
| `notification.title`    | `alert.title` or `alert.title-loc-key`       |
| `notification.subtitle` | `alert.subtitle` or `alert.subtitle-loc-key` |
| `notification.body`     | `alert.body` or `alert.body-loc-key`         |
| `notification.category` | `category`                                   |
| `notification.badge`    | `badge` (integer)                            |

### Manual Capture

For notifications that don't pass through `UNUserNotificationCenter` (for example, background pushes handled in `application(_:didReceiveRemoteNotification:fetchCompletionHandler:)`), record them yourself with `addPushNotificationEvent(userInfo:)`:

```swift
func application(
    _ application: UIApplication,
    didReceiveRemoteNotification userInfo: [AnyHashable: Any],
    fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void
) {
    EmbraceIO.shared.addPushNotificationEvent(userInfo: userInfo)
    // ...your handling
    completionHandler(.newData)
}
```

The `userInfo` dictionary must be APNS-shaped — a top-level `aps` key is required, otherwise the event is dropped. Minimal payload:

```json
{
  "aps": {
    "alert": {
      "title": "Notification Title",
      "body": "Notification Body"
    }
  }
}
```

The parser additionally recognizes `alert.subtitle`, `aps.category`, `aps.badge`, and `aps.content-available` (`1` marks the event as `silent`).

You can also record an event from a `UNNotification` directly inside a `UNUserNotificationCenterDelegate` callback with `addPushNotificationEvent(notification:)`:

```swift
func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
) {
    EmbraceIO.shared.addPushNotificationEvent(notification: response.notification)
    // ...your handling
    completionHandler()
}
```

Both overloads accept an optional `attributes: EmbraceAttributes` dictionary that is merged into the event attributes — use this to attach campaign IDs, message IDs, or any other business context you need.

```swift
EmbraceIO.shared.addPushNotificationEvent(
    userInfo: userInfo,
    attributes: [
        "campaign_id": campaignID,
        "message_id": messageID
    ]
)
```

Manual events emitted this way honor the default `captureData` behavior (payload fields are included). If you want to suppress payload content, pass `captureData: false`.

### Best Practices

- Leave `captureData: false` unless you need to read titles or bodies in the dashboard. Payload content frequently contains PII.
- If you need campaign or message identifiers, add them server-side as top-level keys in the `userInfo` payload and capture them manually with the `attributes:` parameter — there is no built-in payload filter.
- Make sure your app sets a `UNUserNotificationCenter.delegate` (the standard requirement to receive foreground notifications). The capture service piggybacks on the same delegate; if no delegate is ever assigned, the proxy still installs but only sees notifications that the system routes through it.
- For background-only handlers, add a manual `EmbraceIO.shared.addPushNotificationEvent(...)` call as shown above — otherwise those deliveries will not appear in sessions.
