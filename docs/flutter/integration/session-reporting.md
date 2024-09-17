---
title: Session Reporting
description: Upload session reports from your Flutter application using the Embrace SDK
sidebar_position: 5
---

# Session Reporting

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Now that you’ve added the Embrace SDK to your project and can login to the Embrace dashboard, you’re ready to create your first session.

Here are the steps you'll be taking to create your first session.

1. [**Import Embrace**](#import-embrace)
1. [**Add the Flutter SDK start call**](#add-the-flutter-sdk-start-call)
1. [**Add the iOS SDK start call**](#add-the-ios-sdk-start-call)
1. [**Add the Android SDK start call**](#add-the-android-sdk-start-call)
1. [**End the startup moment**](#end-the-startup-moment)
1. [**Build and run the application**](#build-and-run-the-application)
1. [**Trigger a session upload**](#trigger-a-session-upload)


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

## Manually add start calls for the native SDKs

### Add the Android SDK start call

The call to start the Embrace Android SDK can be placed in either:
1. A custom Application class, or
2. The `MainActivity` class

### Adding to a custom application class

If you have a custom application class, you can start the Embrace Android SDK in its `onCreate` method:

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="java" label="Java">

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

</TabItem>
<TabItem value="kotlin" label="Kotlin">

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
</TabItem>
</Tabs>

## Build and Run the Application

Now you're ready to build and run the application. Assuming the app launches correctly,
pay attention to the system logging and look for Embrace to print its version number.

```
Embrace Flutter SDK Version: {{ embrace_sdk_version platform="flutter" }}
```

:::info
If you encounter any errors, please get in touch on Slack and we can assist you.
:::

## Trigger a Session Upload

To trigger a session upload, simply send the application to the background. Typically the SDK 
will be given sufficient time to upload the session, but sometimes the app is not able to complete 
the upload in the background. To ensure the session was uploaded, launch the application again. 
Refresh the dashboard in your browser and you should now see that you've moved on to the next step.

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

Up next, you'll be learning about [uploading crash reports](/flutter/integration/crash-reporting/).
