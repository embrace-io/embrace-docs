---
title: "Session Reporting"
description: Upload session reports from your Unity application using the Embrace SDK
weight: 6
aliases:
  - /unity/session-reporting/
---

# Session Reporting

## Create your first session

Now that you've got Embrace linked and know how to login to the Embrace Dashboard,
it's time to collect your first session. 

Embrace always uploads sessions on subsequent launches. This means the general
process we're going to follow to collect our first session is:

1. [**Import the Embrace module**]({{< relref "/unity/integration/session-reporting#import-embrace" >}})
1. [**Add a start call to the Embrace SDK**]({{< relref "/unity/integration/session-reporting#add-a-start-call" >}})
1. [**End the Startup Moment**]({{< relref "/unity/integration/session-reporting#end-the-startup-moment" >}})
1. [**Build and run our application**]({{< relref "/unity/integration/session-reporting#build-and-run-your-application" >}})
    1. Verify Embrace started via the logs
1. [**Trigger a session upload**]({{< relref "/unity/integration/session-reporting#trigger-a-session-upload" >}})
    1. Close, or send the application to the background
    1. Launch the application to the foreground
    1. Verify that our first session was uploaded to Embrace by checking the Dashboard



## Import Embrace

Let's start by importing the Embrace module. Embrace on Unity is accessibly via a singleton C# class called `Embrace` in the `EmbraceSDK` namespace. Simply add this line to the top of any C# script you'd like to use with Embrace:

```C#
Using EmbraceSDK;
```

You will then access the shared instance of this class from anywhere in your program using the prefix:

```C#
Embrace.Instance.
```

From there you can call any public method on the API. 

Our SDK has three runtime modes:
1. `Android` - in this mode Embrace logs to logcat, this mode is only activated if your build target is currently Android.
1. `iOS` - in this mode Embrace logs to the system console, only activated in your build target is iOS.
1. `Editor` - in this mode Embrace logs to the Unity console. This mode is active when you run inside the editor regardless of build target. Embrace only logs that actions would happen in this mode, not data is uploaded while running in the editor.

All other build targets result in Embrace's API no-ops. You can make calls to the Embrace SDK in shared code, however on platforms like the PC or Mac those calls will do nothing and no data is uploaded to Embrace.

## Add a start call

Embrace does nothing until it's start method has been called. Think about your project, find the place where you initialize other 3rd party SDKs or some other good entry point and add the following code:

```C#
Embrace.Instance.StartSDK();
```

{{< hint info >}}

**A Note On Placing the Start Call**

It is important that this call be made as early as possible in the lifecycle of
your application to ensure we can collect the most data. Additionally,
Embrace has taken great care to ensure we can operate alongside any other third
party SDKs. If Embrace is initialized first, then our code can set things up to
ensure that everyone can interoperate successfully in your application.

{{< /hint >}}

## End the Startup Moment

Finally, make sure to end the special "startup" moment that Embrace uses to track
app launch performance. You can end this moment anywhere you choose. We
recommend placing the call as close to the point that your UI is ready for use
as possible, as doing so will give you the most accurate picture of the
performance your users are experiencing with app launch.

```C#
Embrace.Instance.EndAppStartup();
```

{{< hint info >}}

**A Note On Ensuring the Start Moment Ends**

This moment is used to track launch performance, but also launch abandonment. This is the 
number of users who close the app before the launch finishes. To correctly track this
it is critical that all code paths end the startup moment eventually. For example if your
app can launch via a push notification, ensure that path also ends the startup moment or you
may see false abandonment data.

{{< /hint >}}

## Build and Run Your Application

Alright, you're ready to build and run your application. Assuming the app launches
correctly, pay attention to the system logging and look for Embrace to print out
it's version number.

```sh
[Embrace] Embrace SDK enabled. Version: {{< sdk platform="unity" >}}
```

{{< hint info >}}

If you encounter any errors, please get in touch on Slack and we can help you out.

{{< /hint >}}

If you see a log line like this, you've succeeded in integrating Embrace with
your application. Let's trigger a session upload and verify this in the
Dashboard.


## Trigger a session upload

To trigger a session upload, simply send the application to the background by pressing
the devices 'home' button. Typically the SDK will be given sufficient time to upload 
the session, but sometimes the app is not able to complete the upload in the background. 
To ensure the session was uploaded, launch the application again. Refresh the dashboard in 
your browser and you should now see that you've moved on to the next step.

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

{{< button relref="/unity/integration/crash-report" >}}On to Crash Reporting{{< /button >}}
