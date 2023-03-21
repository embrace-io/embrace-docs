---
title: Crash Reporting
description: Upload crash reports from your Unity application using the Embrace SDK
sidebar_position: 7
---

# Collect Your First Crash Report 

## Debuggers

Before we actually trigger a crash, we need to talk about debuggers. Xcode and Android Studio are both debuggers. This means that they can attach to a program and stop/start/pause/modify that program, including stepping through and around exceptions and signals. When working on your app, this is exactly what you want. However, when trying to test crashes, this functionality is always in the way.

It is important when testing crashes to not be connected to any debugger, including Xcode, Android Studio, or even Unity's own profiler. If you can, test on a device that is no longer plugged into your computer over USB and launch the app by tapping its icon directly.

## Triggering a Crash

Now we're ready to trigger a crash. You can trigger a crash organically, or you can use Embrace's test crash function that you can call from anywhere in your application.

```cs
Embrace.Instance.Crash();
```

:::warning Important
This function will crash your app so only use it for testing purposes.
:::

Remember that Embrace sessions only upload on subsequent launches after crashes have occurred.
This means that after seeing the application crash, you must now launch the application again for that crashed session to upload to the Embrace servers.

Once uploaded, you will notice that your session is marked with the "crashed" icon. Additionally your crash is visible in the "crashes" section of the dashboard.

The Unity runtime can be surprisingly difficult to crash on purpose. If you are struggling to generate a crash you may want to use Unity's own crash API instead:

```cs
UnityEngine.Diagnostics.Utils.ForceCrash(UnityEngine.Diagnostics.ForcedCrashCategory.Abort);
```

---

In the next section, you'll be learning how to add Breadcrumb logs to add context to sessions. 

## iOS Crash Report Settings

For iOS Embrace can either use its own internal crash reporting logic or work alongside an existing solution like Crashlytics.

The first step in initializing crash reporting is configuring which mode you want Embrace to operate in.
Open the Getting Started editor window located at Tools -> Embrace -> Getting Started. Selecting the iOS tab will allow you to toggle the `Crash Report Enabled` on or off.

Toggle this on if you want to use Embrace's internal crash reporting.
If you prefer to use an existing solution like Crashlytics, toggle this to off.
Even when disabled, Embrace will still attempt to mirror the reports from your existing solution so you will still have that data in the Embrace Dashboard.
