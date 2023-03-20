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
1. [**Add the Flutter SDK start call**]({{< relref "/flutter/integration/session-reporting#add-the-flutter-sdk-start-call" >}})
1. [**Add the iOS SDK start call**]({{< relref "/flutter/integration/session-reporting#add-the-ios-sdk-start-call" >}})
1. [**Add the Android SDK start call**]({{< relref "/flutter/integration/session-reporting#add-the-android-sdk-start-call" >}})
1. [**End the startup moment**]({{< relref "/flutter/integration/session-reporting#end-the-startup-moment" >}})
1. [**Build and run the application**]({{< relref "/flutter/integration/session-reporting#build-and-run-the-application" >}})
1. [**Trigger a session upload**]({{< relref "/flutter/integration/session-reporting#trigger-a-session-upload" >}})


## Import Embrace

Start by importing Embrace in the file where your `main()` function exists.

```dart
import 'package:embrace/embrace.dart';
```

## Add the Flutter SDK start call

Wrap the entire contents of your `main()` function in `Embrace.instance.start()`. It is essential do this if you want Embrace to capture Dart errors.

```dart
import 'package:embrace/embrace.dart';

Future<void> main() async {
  await Embrace.instance.start(() => runApp(const MyApp()));
}
```

## Add the iOS SDK start call

Add a call to start the iOS SDK from within your `AppDelegate`:

{{< tabs iosStart >}}

{{< tab "Swift" >}}
Add the following to AppDelegate.swift:

```swift
import UIKit
import Flutter
import Embrace

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
override func application(
  _ application: UIApplication,
  didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
) -> Bool {
  Embrace.sharedInstance().start(launchOptions: launchOptions, framework: EMBAppFramework.flutter)
  /*
      Initialize additional crash reporters and
      any other libraries to track *after* Embrace, including
      network libraries, 3rd party SDKs
  */
  return super.application(application, didFinishLaunchingWithOptions: launchOptions)
}
```
{{</tab >}}

{{< tab "Objective-C" >}}
Add the following to AppDelegate.m:

```objective-c
#import AppDelegate.h
#import <Embrace/Embrace.h>
@implementation AppDelegate
- (BOOL)application:(UIApplication *) application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
[[Embrace sharedInstance] startWithLaunchOptions:launchOptions framework:EMBAppFrameworkFlutter];
    /*
    Initialize additional crash reporters and
    any other libraries to track *after* Embrace, including
    network libraries, 3rd party SDKs
    */
  return YES;
}
@end
```
{{</tab >}}

{{< /tabs >}}

## Add the Android SDK start call

The call to start the Embrace Android SDK can be placed in either:
1. A custom Application class, or
2. The `MainActivity` class

### Adding to a custom application class

If you have a custom application class, you can start the Embrace Android SDK in its `onCreate` method:

{{< tabs androidStart >}}
{{< tab "Java">}}
```java
import io.embrace.android.embracesdk.Embrace;
import android.app.Application;

public final class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Embrace.getInstance().start(this, false, Embrace.AppFramework.FLUTTER);
    }
}
```
{{< /tab >}}
{{< tab "Kotlin">}}
```kotlin
import android.app.Application
import io.embrace.android.embracesdk.Embrace

class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        Embrace.getInstance().start(this, false, Embrace.AppFramework.FLUTTER)
    }
}
```
{{< /tab >}}
{{< /tabs >}}

### Adding to `MainActivity`

If you don't want to create a custom application class, you can start the Embrace Android SDK from the `MainActivity`: 

```kotlin
import android.os.Bundle
import io.embrace.android.embracesdk.Embrace
import io.flutter.embedding.android.FlutterActivity

class MainActivity : FlutterActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)
      Embrace.getInstance().start(this, false, Embrace.AppFramework.FLUTTER)
  }
}
```

## End the startup moment

Embrace automatically starts the **startup** moment when your application launches.
You'll learn more about moments in [Performance Monitoring]({{< relref "/flutter/features/performance-monitoring" >}}) guide.
For now, you can think of the startup moment as a timer that measures how long it took your application to launch.
Although in both Android and iOS the moment is started automatically, ending it is platform specific.

For Android, the SDK will end the moment automatically, for iOS it will not.

In iOS, end the startup moment as close to the point that your UI is ready for use by adding the following to your `AppDelegate`:

{{< tabs iosendstartup >}}
{{< tab "Swift" >}}
```swift
Embrace.sharedInstance().endAppStartup()
```
{{</tab >}}
{{< tab "Objective-C" >}}
```objective-c
[[Embrace sharedInstance] endAppStartup];
```
{{</tab >}}
{{< /tabs >}}

You should end the startup moment before the user has a chance to interact with the application.
Add this method call to every location where the startup moment can end. You can call this method as many times as you like.

In either platform, you can also end the startup moment from your Dart code:

```dart
Embrace.instance.endStartupMoment();
```

## Build and Run the Application

Now you're ready to build and run the application. Assuming the app launches correctly,
pay attention to the system logging and look for Embrace to print its version number.

```sh
Embrace Flutter SDK Version: 0.4.0
```

In addition to that message, you should also see an initialization message for the underlying native Embrace SDK:
{{< tabs initializationMessage >}}

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

{{< /tabs >}}

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

Up next, you'll be learning about uploading crash reports.

{{< button relref="/flutter/integration/crash-reporting" >}}Upload Crash Report{{< /button >}}