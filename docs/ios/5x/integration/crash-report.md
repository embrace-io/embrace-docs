---
title: Crash Reporting
description: Upload crash reports from your iOS application using the Embrace SDK
sidebar_position: 6
---

# Collect your first crash report  

## Setting up the Crash Reporter

Embrace is so much more than just a crash reporting service.
Still, knowing when and how your application crashed is important.
Embrace can either use its own internal crash reporting logic or work alongside an existing solution like Crashlytics.

The first step in initializing crash reporting is configuring which mode you want Embrace to operate in.
Open the `Embrace-Info.plist` file you added to the project in the [Session Reporting](/ios/5x/integration/session-reporting) step. Add the following new key to that file.

```text
CRASH_REPORT_PROVIDER
```

This is a string value. You can set this to one of the following options:

- `embrace` - This is the default value which uses Embrace's internal crash reporting
- `crashlytics` - Set this value if you intend to use Crashlytics as your main crash reporter. Embrace will still attempt to mirror reports sent to Crashlytics so you will still have that data available in the Embrace Dashboard.
- `none` - This option completely turns off all crash reporting from Embrace but the rest of the SDK will continue to work as normal.

The values are case insensitive.

## Debuggers

Before we actually trigger a crash, we need to talk about debuggers.
Xcode is a debugger. This means that it can attach itself to a program and stop/start/pause/modify that program, including stepping through and around exceptions and signals.
When working on your app, this is exactly what you want. However, when trying to test crashes, this functionality is always in the way.

It is important when testing crashes to not be connected to any debugger, including Xcode.
If you launch your app with the play button in Xcode, then it is attached to a debugger and Embrace will not receive any crash reports.
If you can, test on a device that is no longer plugged into your mac over USB and launch the app by tapping the icon directly.
On the simulator, you can replicate this by running the app once with Xcode, pressing stop, then tapping the app icon in the simulator directly to launch it without Xcode.

## Triggering a Crash

Now we're ready to trigger a crash.
You can trigger a crash organically, or Embrace provides a test crash function you can call from anywhere in your application.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
Embrace.sharedInstance().crash()
```

</TabItem>

<TabItem value="objectivec" label="Objective-C">

```objectivec
[[Embrace sharedInstance] crash];
```

</TabItem>
</Tabs>

:::warning Important
This function will crash your app so only use it for testing purposes.
:::

Remember that Embrace sessions only upload on subsequent launches after crashes have occurred.
This means that after seeing the application crash, you must now launch the application again for that crashed session to upload to the Embrace servers.

Once uploaded you should notice that your session is marked with the "crashed" icon.
Additionally your crash is visible in the crashes section of the dashboard.

---

In the next section, you'll be learning how to add Breadcrumb logs to add context to sessions.
