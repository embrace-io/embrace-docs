---
title: "Session Reporting"
description: Upload session reports from your Flutter application using the Embrace SDK
weight: 5
aliases:
  - /flutter/session-reporting/
---

# Session Reporting

Now that you’ve added the Embrace SDK to your project and can login to the Embrace dashboard, you’re ready to create your first session.

Here are the steps you'll be taking to create your first session.

1. [**Import Embrace**]({{< relref "/flutter/integration/session-reporting#import-embrace" >}})
1. [**Add a start call to the Embrace SDK**]({{< relref "/flutter/integration/session-reporting#add-the-start-call" >}})
1. [**End the startup moment**]({{< relref "/flutter/integration/session-reporting#end-the-startup-moment" >}})
1. [**Build and run the application**]({{< relref "/flutter/integration/session-reporting#build-and-run-the-application" >}})
1. [**Trigger a session upload**]({{< relref "/flutter/integration/session-reporting#trigger-a-session-upload" >}})


## Import Embrace

Start by importing Embrace in the file where your `main()` function exists.

```dart
import 'package:embrace/embrace.dart';
```

## Add the Embrace SDK start call

Wrap the entire contents of your Dart main function in `Embrace.instance.start()`. It is essential to wrap the entire contents of `main()` if you want Embrace to capture Dart errors.

```dart
import 'package:embrace/embrace.dart';

Future<void> main() async {
  await Embrace.instance.start(() => runApp(const MyApp()));
}
```

## End the startup moment

The Embrace SDK automatically records the special "startup" moment that's used to track app launch performance.
The end of the startup moment is recorded when the `Activity.onResume()` method returns.
However, if `onResume()` is not a good indication of when the app launch has ended (apps that have a splash screen, for example),
you can use the `@StartupActivity` annotation to indicate that you don't want the startup moment to end when the `onResume` method returns.
Add the `@StartupActivity` annotation to any Activity class where this applies.

```dart
Embrace.instance.endStartupMoment();
```

You should end the startup moment before the user has a chance to interact with the application.
Add this method call to every location where the startup moment can end. You can call this method as many times as you like.

## Build and Run the Application

Now you're ready to build and run the application. Assuming the app launches correctly,
pay attention to the system logging and look for Embrace to print its version number.

```sh
Embrace Flutter SDK Version: 0.4.0
```

In addition to that message, you should also see an initialization message for the underlying native Embrace SDK:
{{< tabs >}}

{{< tab "iOS" >}}
```sh
[Embrace] Embrace SDK enabled. Version: {{< sdk platform="ios" >}}
```
{{< /tab >}}

{{< tab "Android" >}}
```sh
Embrace SDK started. API key: xxxxx Version: {{< sdk platform="android" >}}
```
{{< /tab >}}

{{< hint info >}}

If you encounter any errors, please get in touch on Slack and we can assist you.

{{< /hint >}}

## Trigger a Session Upload

To trigger a session upload, simply send the application to the background. Typically the SDK 
will be given sufficient time to upload the session, but sometimes the app is not able to complete 
the upload in the background. To ensure the session was uploaded, launch the application again. 
Refresh the dashboard in your browser and you should now see that you've moved on to the next step.

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

In the next guide, you'll learn how to add context to your sessions using Breadcrumb Logs.

{{< button relref="/flutter/integration/breadcrumbs" >}}Learn About Breadcrumb Logs{{< /button >}}
