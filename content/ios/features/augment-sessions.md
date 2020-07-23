---
title: "Augment Sessions using OS Log"
description: Embrace can use your OS Log stream to help you understand complex problems with your application.
weight: 3
aliases:
  - /ios/augment-sessions/
---

# Augment Sessions using OS Log

Embrace can use OS Log data from your application to augment your sessions and crash reports. This data can help you find runtime exceptions that are causing problems for your users but not crashing your application. Exceptions from CollectionView and AutoLayout are the most common. Additionally, this data can help uncover and catogorize instances of watchdog terminations with your application. These happen when you run a background task that doesn't complete in time.

This feature is off by default as OS Log data can contain private user information. Embrace only processes the last few seconds of OS Log data, and that processing happens client side. In the case we find something interesting, we can upload that data to our servers for you to see in our dashboard. Doing so is completely under your control and off by default.

To enable this display of OS Log information in the dashboard you must add this key to your `Embrace-Info.plist` and set the value to true:

```sh
ENABLE_OS_LOG
```

This feature works even if your application does not use the OS Log APIs as other logging methods such as `NSLog` or `print` redirect to that system. If you wish to better protect the privacy of your users while using this feature we recommend migrating to the OS Log system and using the privacy mechanisms available which Embrace will honor.  You can read more about that in [Apple's documentation](https://developer.apple.com/documentation/os/logging).
