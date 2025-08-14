---
title: Session Reporting
description: Upload session reports from your Unity application using the Embrace SDK
sidebar_position: 6
---

# Session Reporting

## Create your first session

Now that you've got Embrace linked and know how to login to the Embrace dashboard, it's time to collect your first session.  

Embrace always uploads sessions on subsequent launches. This means the general
process we're going to follow to collect our first session is:

1. [**Import the Embrace module**](/unity/integration/session-reporting#import-embrace)
2. [**Add a start call to the Embrace SDK**](/unity/integration/session-reporting#add-a-start-call)
3. [**Build and run our application**](/unity/integration/session-reporting#build-and-run-your-application)
   1. Verify Embrace started via the logs
4. [**Trigger a session upload**](/unity/integration/session-reporting#trigger-a-session-upload)
   1. Close or send the application to the background
   2. Launch the application to the foreground
   3. Verify that our first session was uploaded to Embrace by checking the dashboard

## Import Embrace

Let's start by importing the Embrace module. Embrace on Unity is accessible via a singleton C# class called `Embrace` in the `EmbraceSDK` namespace. Simply add this line to the top of any C# script you'd like to use with Embrace:

```cs
Using EmbraceSDK;
```

You will then access the shared instance of this class from anywhere in your program using the prefix:

```cs
Embrace.Instance.
```

From there you can call any public method on the API.  

Our SDK has three runtime modes:
1. `Android` - in this mode Embrace logs to logcat. This mode is only activated if your build target is currently Android.
2. `iOS` - in this mode Embrace logs to the system console. This mode is only activated in your build target is iOS.
3. `Editor` - in this mode Embrace logs to the Unity console. This mode is active when you run inside the editor regardless of build target. Embrace only logs the actions it would perform. No data is uploaded while running in the editor.

   For all other build targets, the result of Embrace API calls are no-ops. You can make calls to the Embrace SDK in shared code, but on platforms like Windows or macOS those calls will do nothing and no data is uploaded to Embrace.

## Add a start call

Embrace does nothing until its start method has been called. Find the place in your project where you initialize other third party SDKs or some other good entry point and add the following code:

```cs
Embrace.Instance.StartSDK();
```

:::info A Note On Placing the Start Call

It is important that this call be made as early as possible in the lifecycle of your application to ensure we can collect as much relevant data as possible. Additionally, Embrace has taken great care to ensure we can operate alongside any other third party SDKs. If Embrace is initialized first, then our code can set things up to ensure that everyone can interoperate successfully in your application.

:::

## Build and Run Your Application

You're now ready to build and run your application. Assuming the app launches correctly, pay attention to the system logging and look for Embrace to print out its version number.

```text
[Embrace] Embrace SDK enabled. Version: {{ embrace_sdk_version platform="unity" }}
```

:::info
If you encounter any errors, please get in touch on Slack and we can help you out.
:::

If you see a log line like this, you've succeeded in integrating Embrace with your application. Let's trigger a session upload and verify this in the dashboard.

## Trigger a Session Upload

To trigger a session upload, simply send the application to the background by pressing the device's "home" button. Typically the SDK will be given sufficient time to upload the session as the app is going to the background, but sometimes the OS will not allow the app to complete the upload in the background. To ensure the session was uploaded, launch the application again. Refresh the dashboard in your browser and you should now see that you've moved on to the next step.

---

Congratulations! At this point you've completed a basic integration of Embrace. Embrace is already collecting interesting data from your application. You can see this data by browsing around the timeline page for the session you just captured.
