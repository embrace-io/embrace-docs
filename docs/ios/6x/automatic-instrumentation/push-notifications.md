---
title: Push Notifications
description: Track push notification events in your iOS app with Embrace
sidebar_position: 5
---

# Push Notifications

The Embrace SDK's `PushNotificationCaptureService` automatically captures push notification events in your app, providing visibility into notification delivery, user interaction, and impact on app engagement.

## How Push Notification Tracking Works

The push notification capture service monitors push notification events by swizzling key methods in the `UNUserNotificationCenter` and related classes. This allows Embrace to create OpenTelemetry spans and events that capture:

- Notification arrivals (when your app receives a notification)
- User interactions (when a user taps on a notification)
- Notification content and payload details (configurable)

This data helps you understand how push notifications impact user behavior and app engagement.

## Configuration

You can customize push notification tracking when initializing the Embrace SDK:

```swift
let services = CaptureServiceBuilder()
    .add(.pushNotification(options: PushNotificationCaptureService.Options(
        captureNotificationContent: true,
        payloadAttributesFilter: { key, _ in 
            return ["campaign_id", "message_id", "notification_type"].contains(key)
        }
    )))
    .addDefaults()
    .build()

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

## Customization Options

### Capturing Notification Content

You can control whether notification content is captured:

```swift
PushNotificationCaptureService.Options(
    captureNotificationContent: true
)
```

When enabled, the service will capture the notification title, body, and other user-facing content, giving you visibility into what messages drove user engagement.

### Filtering Payload Attributes

To control which payload data is captured while protecting sensitive information, you can use a filter:

```swift
PushNotificationCaptureService.Options(
    payloadAttributesFilter: { key, value in
        // Only capture specific payload keys
        return ["campaign_id", "message_id", "action", "type"].contains(key)
    }
)
```

By default, the service captures all payload data, so it's recommended to use a filter to limit capture to necessary business information.

## Events Captured

The push notification service captures the following events:

### Notification Received

A span is created when your app receives a notification, either in the foreground or when the app is launched in response to a notification:

```swift
// This is automatically captured when your app receives a notification
func userNotificationCenter(_ center: UNUserNotificationCenter,
                           willPresent notification: UNNotification,
                           withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void)
```

### Notification Response

A span is created when a user taps on a notification to open your app:

```swift
// This is automatically captured when the user taps on a notification
func userNotificationCenter(_ center: UNUserNotificationCenter,
                           didReceive response: UNNotificationResponse,
                           withCompletionHandler completionHandler: @escaping () -> Void)
```

## Understanding Push Notification Data

Push notification events are captured as OpenTelemetry spans with the following attributes:

- `emb.push.notification_id`: Unique identifier for the notification
- `emb.push.title`: Notification title (if captureNotificationContent is enabled)
- `emb.push.body`: Notification message body (if captureNotificationContent is enabled)
- `emb.push.action`: The action associated with the user's response (default, custom action, etc.)
- `emb.push.foreground`: Whether the notification was received while the app was in the foreground
- Additional custom attributes from the notification payload (based on your filter)

## Example Use Cases

### Campaign Effectiveness

Track which notification campaigns drive the most app opens and engagement, helping optimize your messaging strategy.

### User Engagement Patterns

Understand how different notification types affect user behavior and session duration.

### Conversion Tracking

Monitor whether users complete key actions after engaging with specific notifications.

### Time-of-Day Optimization

Analyze which times of day result in the highest engagement with your notifications.

## Adding Custom Attributes

You can add custom attributes to notification spans by implementing a custom delegate:

```swift
class MyPushDelegate: PushNotificationCaptureServiceDelegate {
    func willCaptureNotification(_ notification: UNNotification) -> [String: String]? {
        // Add custom attributes when a notification is received
        return [
            "time_of_day": Calendar.current.component(.hour, from: Date()).description,
            "notification_age": Date().timeIntervalSince(notification.date).description
        ]
    }

    func willCaptureNotificationResponse(_ response: UNNotificationResponse) -> [String: String]? {
        // Add custom attributes when a user responds to a notification
        var attributes: [String: String] = [:]

        // You can access the notification content
        let notification = response.notification
        let content = notification.request.content

        // Add information about the app state
        attributes["app_was_active"] = UIApplication.shared.applicationState == .active ? "true" : "false"

        return attributes
    }
}

// Then use this delegate when configuring the service
let myDelegate = MyPushDelegate()
PushNotificationCaptureService.Options(
    delegate: myDelegate
)
```

## Best Practices

- Use a payload attributes filter to only capture relevant notification data
- Consider privacy implications when capturing notification content
- Add meaningful identifiers to your notifications to better track campaigns
- Use custom attributes to add business context to notification events
- Correlate notification interactions with subsequent user actions to measure effectiveness

 <!-- TODO: Add examples of how push notification data appears in the Embrace dashboard, including visualizations for campaign analysis and engagement metrics  -->
