---
title: Session Reporting
sidebar_position: 4
description: Upload session reports from your Android application using the Embrace SDK
---

# Session Reporting

Now that you've added the Embrace SDK to your project and can login to the Embrace dashboard, you are ready to create your first session.

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

Now you are ready to build and run the application. Assuming the app launches correctly,
pay attention to the system logging and confirm Embrace prints its version number:

```text
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

### Manually Ending a Session

In addition to the application lifecycle events that will automatically end a session, the Embrace SDK also lets you manually end sessions in code, if that fits your use-case.

Triggering the [`endSession`](https://github.com/embrace-io/embrace-android-sdk/blob/main/embrace-android-sdk/src/main/kotlin/io/embrace/android/embracesdk/internal/api/delegate/SessionApiDelegate.kt#L44) method will end the session and immediately start a new session (no additional instrumentation is required). When ending a session manually, the SDK takes a boolean argument whether or not to clear all user info on the device, as below:

```kotlin
  // scenario in which app session is ended manually
  fun endSession() {
      // other work
      Embrace.getInstance().endSession(true)
  }
```

Note that ending a session means the Embrace SDK creates a background network request that will asynchronously send the now-ended session's payload to our backend.

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

Up next, you'll be learning about uploading crash reports.
