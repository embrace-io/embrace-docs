---
title: Crash reporting
description: Upload crash reports from your Flutter application using the Embrace SDK
sidebar_position: 6
---

# Collect your first crash report

## Debuggers

Before triggering a crash, you need to understand how debuggers work. Xcode and Android Studio both contain debuggers that can attach to a program and stop/start/pause/modify it, including stepping through and around exceptions and signals. When working on your app, this is exactly what you want. However, when testing crashes, this functionality gets in the way.

When testing crashes, don't connect to any debugger, including Xcode, Android Studio, or the DevTools debugger. If possible, test on a device that's not plugged into your computer over USB and launch the app by tapping its icon directly.

## Trigger a crash

Now you're ready to trigger a crash. You can trigger a crash organically, or you can use Embrace's test crash function that you can call from anywhere in your application:

```dart
'package:embrace/embrace_samples.dart';

EmbraceSamples.triggerNativeSdkError();
```

:::danger
This function will crash your app so only use it for testing purposes.
:::

Remember that Embrace sessions only upload on subsequent launches after crashes have occurred. After seeing the application crash, launch the application again for that crashed session to upload to the Embrace servers.

Once uploaded, your session is marked with the "crashed" icon. Your crash is also visible in the **Crashes** section of the dashboard.

---

In the next section, you'll learn how to add breadcrumb logs to add context to sessions.  
