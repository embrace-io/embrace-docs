---
title: Session Reporting
weight: 4
description: Upload session reports from your Android application using the Embrace
  SDK

---
# Session Reporting

Now that you've added the Embrace SDK to your project and can login to the Embrace dashboard, you're ready to create your first session.

Here are the steps you'll be taking to create your first session.

1. [**Import Embrace**]({{< relref "/android/session-reporting#import-embrace" >}})
1. [**Add a start call to the Embrace SDK**]({{< relref "/android/session-reporting#add-the-start-call" >}})
1. [**End the Startup Moment**]({{< relref "/android/session-reporting#end-the-startup-moment" >}})
1. [**Build and run the application**]({{< relref "/android/session-reporting#build-and-run-the-application" >}})
1. [**Trigger a session upload**]({{< relref "/android/session-reporting#trigger-a-session-upload" >}})

## Import Embrace

Start by importing Embrace in the file where your `Application` class exists.

```java
import io.embrace.android.embracesdk.Embrace;
```

## Add the Start Call

Next, add the following code to your `Application` class at the start of the `onCreate` method to initialize the Embrace SDK.
Embrace does not perform any tracking or other actions until this method call is made.

```java
public final class MyApplication extends Application {

  @Override
  public void onCreate() {
      super.onCreate();
      Embrace.getInstance().start(this);
  }
}
```

{{< hint warning >}}
Make sure any networking libraries such as OkHttp or Retrofit are **initialized before** Embrace.
{{< /hint >}}

## End the Startup Moment

The Embrace SDK automatically records the special "startup" Moment that's used to track app launch performance.
The end of the startup Moment is recorded when the `Activity.onResume()` method returns.
However, if `onResume()` is not a good indication of when the app launch has ended (apps that have a splash screen, for example),
you can use the `@StartupActivity` annotation to indicate that you don't want the startup Moment to end when the `onResume` method returns.
Add the `@StartupActivity` annotation to any Activity class where this applies.

```java
@StartupActivity
public class MainActivity extends Activity {
  ...
}
```

Then, end the startup Moment manually by making the following method call.

```java
Embrace.getInstance().endAppStartup();
```

You should end the startup Moment before the user has a chance to interact with the application.
Add this method call to every location where the startup Moment can end. You can call this method as many times as you like.

A screenshot will be captured if the startup Moment does not complete within five seconds while the app is still in the foreground.
Add the following to the `embrace-config.json` file that you added in the [Adding the Android SDK]({{< relref "/android/add-embrace-sdk#add-the-config-file" >}}) section to disable this default behavior.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "startup_Moment": {
    "take_screenshot": false
  }
}
```

## Build and Run the Application

Now you're ready to build and run the application. Assuming the app launches correctly,
pay attention to the system logging and look for Embrace to print its version number.

```sh
Embrace SDK started. API key: xxxxx Version: {{< sdk platform="android" >}}
```

{{< hint info >}}

If you encounter any errors, please get in touch on Slack and we can assist you.

{{< /hint >}}

## Trigger a Session Upload

To trigger a session upload, simply stop the application by either force killing
it or using the Android Studio stop button. Now run the application again. This second
launch will upload the previous session immediately. Refresh the dashboard in
your browser and you should now see that you've moved on to the next step.

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

Up next, you'll be learning about uploading crash reports.

{{< button relref="/android/crash-reporting" >}}Upload Crash Report{{< /button >}}