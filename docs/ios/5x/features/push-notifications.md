---
title: Push Notifications
description: Embrace can capture push notifications received by your app.
sidebar_position: 6
---

# Push Notifications

The Embrace SDK can capture push notifications received by your app.

You can change the way Embrace captures push notifications with the local config `PUSH_NOTIFICATIONS_CAPTURE_MODE`.
The possible modes are `manual` (default) and `automatic`.

The automatic mode doesn't require any changes in your code.

To use the manual mode you'll have add a few lines:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
// push notifications
func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any]) async -> UIBackgroundFetchResult {
    Embrace.sharedInstance().applicationDidReceiveNotification(userInfo)
    return .noData
}

func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
    Embrace.sharedInstance().applicationDidReceive(response)
    completionHandler()
}

// silent notifications
func application(_ application: UIApplication, performFetchWithCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    Embrace.sharedInstance().applicationDidReceiveSilentNotification()
    completionHandler(.newData)
    return
}

func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    Embrace.sharedInstance().applicationDidReceiveSilentNotification()
    completionHandler(.newData)
}
```

</TabItem>

<TabItem value="objectivec" label="Objective-C">

```objectivec
// push notifications
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [[Embrace sharedInstance] applicationDidReceiveNotification:userInfo];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
    [[Embrace sharedInstance] applicationDidReceiveNotificationResponse:response];
    completionHandler();
}

// silent notifications
- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    [[Embrace sharedInstance] applicationDidReceiveSilentNotification];
    completionHandler(UIBackgroundFetchResultNewData);
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    [[Embrace sharedInstance] applicationDidReceiveSilentNotification];
    completionHandler(UIBackgroundFetchResultNewData);
}
```

</TabItem>

</Tabs>

:::info
If you want to prevent any data inside the notifications from being captured, you can set the local config `ENABLE_PUSH_NOTIFICATIONS_DATA_CAPTURE` to `NO`.
:::

:::note
If your app supports iOS 9, you should pass the launch options when starting up the Embrace SDK. This will allow Embrace to capture notifications that opened the app when it was closed.
:::
