
---
title: "Push Notifications"
description: Embrace can capture push notifications received by your app.
weight: 7
---

# Push Notifications

The Embrace SDK automatically captures push notifications received by your app.

{{< hint info >}}
To disable this feature you can set the local config `ENABLE_PUSH_NOTIFICATIONS_CAPTURE` to `NO`.
{{< /hint >}}

{{< hint info >}}
If you want to prevent any data inside the notifications from being read, you can set the local config `ENABLE_PUSH_NOTIFICATIONS_DATA_CAPTURE` to `NO`.
{{< /hint >}}

{{< hint warning >}}
If your app supports iOS 9, you should pass the launch options when starting up the Embrace SDK. This will allow Embrace to capture notifications that opened the app when it was closed.

{{< tabs "launchOptionsHelp" >}}

{{< tab "Swift" >}}

```swift
Embrace.sharedInstance().start(withKey: "API_KEY", launchOptions: launchOptions, framework: .native, enableIntegrationHelp: true)
```
{{< /tab >}}

{{< tab "Objective-C" >}}

```objective-c
[[Embrace sharedInstance] startWithKey:@"API_KEY" launchOptions:launchOptions framework:EMBAppFrameworkNative enableIntegrationHelp:YES];
```
{{< /tab >}}

{{< /tabs >}}

{{< /hint >}}
