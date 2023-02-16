---
title: "Push Notifications"
description: Embrace can capture push notifications received by your app.
weight: 6
aliases:
  - /android/push-notifications/
---

# Push Notifications

The Embrace SDK is able to automatically capture Firebase push notifications received by your app.

## Configuration 

To enable this feature you need to have `embrace.useAsmTransformApi` enabled. It's enabled by default since `5.3.0`, so you can just check that `embrace.useAsmTransformApi=false` is not present in your `gradle.properties`. 
The other configuration you need is to set `instrumentFirebaseMessaging` to true in your `build.gradle` file. 

```groovy
    swazzler {
        instrumentFirebaseMessaging = true
    }
```

{{< hint warning >}}
If you want to prevent any data inside the notifications from being read, you can set the config `capture_fcm_pii_data` to `true` in your `embrace-config.json` file inside `sdk_configs`. This value is false by default.
{{< /hint >}}

## Usage

If your configuration is correct, you don't need to do anything else, you are already capturing notifications automatically. They will appear in your dashboard within the user session timeline. 

If you don't want the notifications to get captured automatically, then you can avoid the setup from the previous section and when you receive a notification in your code, make the following call manually:

```java
/**
    Params:
    title – the title of the notification as a string (or null) 
    body – the body of the notification as a string (or null) 
    topic – the notification topic (if a user subscribed to one), or null 
    id – A unique ID identifying the message 
    priority – the priority of the message (as resolved on the device)
    isDataType - a boolean indicating if the message is of type notification or data
*/
    Embrace.getInstance().logPushNotification(
            @Nullable String title,
            @Nullable String body,
            @Nullable String topic,
            @Nullable String id,
            @Nullable Integer priority,
            boolean isDataType)
```
