---
title: Push Notifications
description: Embrace can capture push notifications received by your app.
sidebar_position: 8
---

# Push Notifications

The Embrace SDK is able to automatically capture Firebase push notifications received by your app.

## Configuration 

Push Notifications Capture is disabled by default.

The only requirement is having `embrace.useAsmTransformApi` enabled, but it's enabled by default since `5.3.0`. You can check that `embrace.useAsmTransformApi=false` is not in your `gradle.properties`.

If you want to enable the Push Notifications feature, you can set `instrumentFirebaseMessaging` to true in your `app/build.gradle` file.

```groovy
embrace {
    bytecodeInstrumentation {
        firebasePushNotificationsEnabled.set(true)
    }
}

dependencies {
    implementation("io.embrace:embrace-android-fcm:{{ embrace_sdk_version platform="android" }}")
}
```

:::info Note
If you want to capture data from inside the notifications then you can set the config `capture_fcm_pii_data` to `true` in your `embrace-config.json` file inside `sdk_config`. This value is false by default.
:::

## Usage

If your configuration is correct, you don't need to do anything else, you are already capturing notifications automatically. They will appear in your dashboard within the user session timeline. 

If you don't want the notifications to get captured automatically, then you can avoid the setup from the previous section and when you receive a notification in your code, make the following call manually:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
val isNotification = true
val hasData = true
Embrace.getInstance().logPushNotification(
    "my-notification-title",
    "my-notification-body",
    "my-notification-topic",
    "my-notification-id",
    5,
    2,
    isNotification,
    hasData
)
```
</TabItem>
<TabItem value="java" label="Java">
```java
boolean isNotification = true
boolean hasData = true
Embrace.getInstance().logPushNotification(
    "my-notification-title",
    "my-notification-body",
    "my-notification-topic",
    "my-notification-id",
    5,
    2,
    isNotification,
    hasData
);
```
</TabItem>
</Tabs>
