
---
title: "Capture Background Sessions"
description: Embrace can capture background sessions so that you can gain insight into user experiences that are affected by events that happen in the background.
weight: 6
---

# Capture Background Sessions

The Embrace SDK can be configured to enable the capturing of background sessions. To enable capturing background sessions, call the `setBackgroundSessionMode` method with the `EMBBackgroundSessionHybrid` enum value. 

{{< tabs "tabs1" >}}

{{< tab "Swift" >}}

```swift
Embrace.sharedInstance().setBackgroundSessionMode(EMBBackgroundSessionHybrid)
```

{{< /tab >}}

{{< tab "Objective-C" >}}

```objective-c
[[Embrace sharedInstance] setBackgroundSessionMode: EMBBackgroundSessionHybrid];
```

{{< /tab >}}

{{< /tabs >}}

To disable background session capture, either remove the `setBackgroundSessionMode` method call or use the `EMBBackgroundSessionDisabled` enum value. You can also disable the collection of background sessions on the settings page of the Embrace dashboard.

{{< hint warning >}}
Enabling the collection of background session will increase the amount of sessions that are collected.
{{< /hint >}}
