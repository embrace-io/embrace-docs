---
title: Session Reporting
sidebar_position: 4
description: Upload session reports from your Android application using the Embrace SDK
---

# Session Reporting

Now that you've added the Embrace SDK to your project and can login to the Embrace dashboard, you're ready to create your first session.

Here are the steps you'll be taking to create your first session.

1. [**Import Embrace**](/android/integration/session-reporting#import-embrace)
1. [**Add a start call to the Embrace SDK**](/android/integration/session-reporting#add-the-start-call)
1. [**End the startup moment**](/android/integration/session-reporting#end-the-startup-moment)
1. [**Build and run the application**](/android/integration/session-reporting#build-and-run-the-application)
1. [**Trigger a session upload**](/android/integration/session-reporting#trigger-a-session-upload)

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

## End the startup moment

The Embrace SDK automatically records the special "startup" moment that's used to track app launch performance.
The end of the startup moment is recorded when the `Activity.onResume()` method returns.
However, if `onResume()` is not a good indication of when the app launch has ended (apps that have a splash screen, for example),
you can use the `@StartupActivity` annotation to indicate that you don't want the startup moment to end when the `onResume` method returns.
Add the `@StartupActivity` annotation to any Activity class where this applies.

```java
@StartupActivity
public class MainActivity extends Activity {
  ...
}
```

Then, end the startup moment manually by making the following method call.

```java
Embrace.getInstance().endAppStartup();
```

You should end the startup moment before the user has a chance to interact with the application.
Add this method call to every location where the startup moment can end. You can call this method as many times as you like.

A screenshot can be captured if the startup moment does not complete within five seconds while the app is still in the foreground.
Add the `take_screenshot` setting to the `embrace-config.json` file that you added in the [Adding the Android SDK](/android/integration/add-embrace-sdk#add-the-config-file) section to enable this behavior.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "sdk_config": {
    "startup_moment": {
      "take_screenshot": true
    }
  }
}
```

## Build and Run the Application

Now you're ready to build and run the application. Assuming the app launches correctly,
pay attention to the system logging and look for Embrace to print its version number.

```
Embrace SDK started. API key: xxxxx Version: {{< sdk platform="android" >}}
```

:::info
If you encounter any errors, please get in touch on Slack and we can assist you.
:::

## Trigger a Session Upload

You can trigger a session upload by sending your app to the background. Refresh the dashboard in
your browser and you should now see that you've moved on to the next step.

:::warning
If you stop your application by either force killing it or using the Android Studio stop button, 
the Embrace SDK will not be able to upload the session that was just completed until you restart 
your application. During the next application launch the previous session will be immediately uploaded. 
:::

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

Up next, you'll be learning about uploading crash reports.
