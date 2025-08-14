---
title: Session Reporting
sidebar_position: 4
description: Upload session reports from your Android application using the Embrace SDK
---

# Session Reporting

Now that you've added the Embrace SDK to your project and can login to the Embrace dashboard, you're ready to create your first session.

## Start the Embrace SDK

Initialize the Embrace SDK in the `onCreate` method of your `Application` subclass.

```kotlin
class MyApplication : Application {
  override fun onCreate() {
      super.onCreate()
      Embrace.getInstance().start(this)
  }
}
```

We recommend to start the SDK on the main thread to ensure you're capturing mobile telemetry and crashes as soon as possible.

## Build and Run the Application

Now you're ready to build and run the application. Assuming the app launches correctly,
pay attention to the system logging and confirm Embrace prints its version number:

```
Embrace SDK version X.Y.Z started for appId = xxxxx
```

:::info
If you encounter any errors, please get in touch on Slack and we can assist you.
:::

## Trigger a Session Upload

You can trigger a session upload by sending your app to the background, and restarting it again. Refresh the dashboard in
your browser and you should now see that you've moved on to the next step.

:::warning Important
If you stop your application by either force killing it or using the Android Studio stop button,  
the Embrace SDK will not be able to upload the session that was just completed until you restart  
your application. During the next application launch the previous session will be immediately uploaded.  
:::

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

Up next, you'll be learning about uploading crash reports.
