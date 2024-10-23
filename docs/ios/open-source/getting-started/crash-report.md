---
title: Crash Reporting
description: Upload crash reports from your iOS application using the Embrace SDK
sidebar_position: 1
---

# Crash Reporting

Embrace is so much more than just a crash reporting service.
Still, knowing when and how your application crashed is important.
Embrace can either use its own internal crash reporting logic or work alongside an existing solution like Crashlytics.

## Setting up the Crash Reporter

The first step in initializing crash reporting is configuring which mode you want Embrace to operate in. Embrace can be your primary crash reporter, or you can add Firebase Crashlytics as the crash reporter to send crashes to both Embrace ~and~ Firebase. If you choose to use Crashlytics, Embrace will mirror reports sent to Crashlytics so you will still have that data available in the Embrace Dashboard.

The crash reporter is added in the [SDK configuration step](/docs/ios/open-source/integration/embrace-options.md). If you do not add another crash reporter, Embrace's will be used by default. If you wish to use Crashlytics, do the following:

```swift
//import Embrace support module so that Embrace dashboard mirrors Crashlytics data
import EmbraceCrashlyticsSupport
import EmbraceIO

try Embrace.setup(
    options: Embrace.Options(
        appId: "Your App ID",
        ...
        crashReporter: CrashlyticsReporter(),
        ...
    )
)
```

:::info Turning off crash reporting
The `crashReporter` argument is optional. If you wish not to use any crash reporting (including Embrace's crash reporting), you can set this value to `nil`
:::

## Triggering a Crash

You can trigger a crash in your app organically, or Embrace provides a test crash function you can call from anywhere in your application.

:::warning Important
Obviously, this function will crash your app. Use it for testing purposes and be sure **not to include it in production code.**
:::

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
Embrace.client?.crash()
```

</TabItem>

<TabItem value="objectivec" label="Objective-C">

```objectivec
[[Embrace client] crash];
```

</TabItem>
</Tabs>

:::info Note on debugging

It is important when testing crashes to not be connected to any debugger. Xcode is itself a debugger, as it can attach itself to a program and stop/start/pause/modify that program. This includes stepping through and around exceptions and signals. 

When trying to test crashes, this functionality is always in the way. If you can, test on a device that is no longer plugged into your Mac, and launch the app by tapping the icon directly. On the Simulator, run the app once with Xcode, press stop, then tap the app icon in the Simulator directly to launch it without Xcode.
:::

Embrace sessions only upload on subsequent launches after crashes have occurred. This means that after seeing the application crash, you must now launch the application again for that crashed session to upload to the Embrace servers.

Once uploaded you should notice that your session is marked with the "crashed" icon. Additionally your crash is visible in the crashes section of the dashboard.