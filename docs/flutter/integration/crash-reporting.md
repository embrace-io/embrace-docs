---
title: "Crash Reporting"
description: Upload crash reports from your Flutter application using the Embrace SDK
sidebar_position: 6
aliases:
  - /flutter/crash-reporting/
---

# Collect Your First Crash Report 

## Debuggers

Before we actually trigger a crash, we need to talk about debuggers. Xcode and Android Studio are both debuggers. This means that they can attach to a program and stop/start/pause/modify that program, including stepping through and around exceptions and signals. When working on your app, this is exactly what you want. However, when trying to test crashes, this functionality is always in the way.

It is important when testing crashes to not be connected to any debugger, including Xcode, Android Studio, or the DevTools debugger. If you can, test on a device that is no longer plugged into your computer over USB and launch the app by tapping its icon directly.

## Triggering a Crash

Now we're ready to trigger a crash. You can trigger a crash organically, or you can use Embrace's test crash function that you can call from anywhere in your application.

```dart
'package:embrace/embrace_samples.dart';

EmbraceSamples.triggerNativeSdkError();
```

:::danger
This function will crash your app so only use it for testing purposes.
:::

Remember that Embrace sessions only upload on subsequent launches after crashes have occurred.
This means that after seeing the application crash, you must now launch the application again for that crashed session to upload to the Embrace servers.

Once uploaded, you will notice that your session is marked with the "crashed" icon. Additionally your crash is visible in the "crashes" section of the dashboard.

:::info Note for iOS

If you'd like to use Embrace's internal crash reporter,
set the `CRASH_REPORT_ENABLED` field to true in the `Embrace-Info.plist` file that you created earlier (as
described in the [Adding the Embrace SDK](/flutter/integration/add-embrace-sdk) page).
If you're using Crashlytics, set this value to false.
:::

---

In the next section, you'll be learning how to add Breadcrumb logs to add context to sessions. 

{{< button relref="/flutter/integration/breadcrumbs" >}}Learn About Breadcrumb Logging{{< /button >}}

