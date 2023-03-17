---
title: "Session Reporting"
description: Upload session reports from your iOS application using the Embrace SDK
sidebar_position: 6
aliases:
  - /ios/session-reporting/
---

# Session Reporting

## Create your first session

Now that you've got Embrace linked and know how to login to the Embrace Dashboard,
it's time to collect your first session.  

Embrace always uploads sessions on subsequent launches. This means the general
process we're going to follow to collect our first session is:

1. [**Import the Embrace module**](/ios/integration/session-reporting#import-embrace)
1. [**Add a start call to the Embrace SDK**](/ios/integration/session-reporting#add-a-start-call)
1. [**End the Startup Moment**](/ios/integration/session-reporting#end-the-startup-moment)
1. [**Build and run our application**](/ios/integration/session-reporting#build-and-run-your-application)
    1. Verify Embrace started via the logs
1. [**Trigger a session upload**](/ios/integration/session-reporting#trigger-a-session-upload)
    1. Close, or send the application to the background
    1. Launch the application to the foreground
    1. Verify that our first session was uploaded to Embrace by checking the Dashboard



## Import Embrace

Let's start by importing the Embrace module. Open your program's
`AppDelegate.swift` class or equivalent.

{{< image src="/docs/images/ios-app-delegate.png" alt="Example AppDelegate.swift file" title="AppDelegate.swift" caption="Our Project's AppDelegate before import the Embrace module" width="1600" height="1134" >}}

At the top of the file where you see the other import statements, add one for
Embrace.

{{< tabs "iosNativeImportEmbrace" >}}

{{< tab "Swift" >}}

```swift
import Embrace
```

{{< /tab >}}

{{< tab "Objective-C" >}}

```swift
#import <Embrace/Embrace.h>
```

{{< /tab >}}

{{< /tabs >}}

Now we're going to add a new file to our project. Embrace has many optional
features and configuration options that you may want to use. It is best to
start your integration with an Embrace configuration file so it's easy to add
those options later. 

Make a new file in the root of your project called `Embrace-Info.plist` and ensure
that it is included in your target.

{{< image src="/docs/images/ios-embrace-info-plist.png" alt="Embrace-Info.plist File" title="Embrace-Info.plist" caption="Embrace's sample project showing the Embrace-Info.plist file. Note the target membership is checked." width="1600" height="1134" >}}
 
For now, you can just add one entry to this file: `"API_KEY"`. Be sure to fill in your real
key from the Embrace Dashboard.

:::info
Make sure the target membership is checked for the Embrace-Info.plist file.
:::

## Add a start call

Next, inside your main startup function (usually
`ApplicationDidFinishLaunching`) add the following code to start Embrace. Embrace does not perform any tracking
or other actions until this call is made.

{{< tabs "iosSessionReporting1" >}}

{{< tab "Swift" >}}

```swift
Embrace.sharedInstance().start(launchOptions: launchOptions);
```

Alternatively, if you do not want to keep your API_KEY in the plist file you can send it in programmatically using:

```swift
Embrace.sharedInstance().start(withKey: "API_KEY", launchOptions: launchOptions)
```

:::info
If your have a **React Native project** you have to add the framework
``` React Native
Embrace.sharedInstance().start(withKey: "API_KEY", launchOptions: launchOptions, framework:EMBAppFrameworkReactNative)
```
:::

{{< /tab >}}

{{< tab "Objective-C" >}}

```objectivec
[[Embrace sharedInstance] startWithLaunchOptions:launchOptions];
```

Alternatively, if you do not want to keep your API_KEY in the plist file you can send it in programmatically using:

```objectivec
[[Embrace sharedInstance] startWithKey:@"API_KEY" launchOptions:launchOptions];
```
:::info
If you have a **React Native project** you have to add the framework
``` React Native
[[Embrace sharedInstance] startWithKey:@"API_KEY" launchOptions:launchOptions framework:EMBAppFrameworkReactNative];
```
:::
{{< /tab >}}

{{< /tabs >}}

:::info

**A Note On Placing the Start Call**

It is important that this call be made as early as possible in the lifecycle of
your application to ensure we can collect the most data. Additionally,
Embrace has taken great care to ensure we can operate alongside any other third
party SDKs. If Embrace is initialized first, then our code can set things up to
ensure that everyone can interoperate successfully in your application.

:::

:::info

**Integration Help**

If you're running into issues trying to initialize the Embrace SDK, you can enable
the integration help mode by passing `true` to the `enableIntegrationHelp` property
when starting Embrace.
When this mode is enabled you'll see an alert with descriptive errors if Embrace
fails to initialize properly.
Please note that this alert will only show in development environments.

{{< tabs "iosIntegrationHelp" >}}

{{< tab "Swift" >}}

```swift
Embrace.sharedInstance().start(withKey: "API_KEY", launchOptions: launchOptions, framework: .native, enableIntegrationHelp: true)
```
{{< /tab >}}

{{< tab "Objective-C" >}}

```objectivec
[[Embrace sharedInstance] startWithKey:@"API_KEY" launchOptions:launchOptions framework:EMBAppFrameworkNative enableIntegrationHelp:YES];
```
{{< /tab >}}

{{< /tabs >}}



:::

:::info
**Tip:**
If you are a swift user you may want to also make this call after starting Embrace:

```swift
Embrace.sharedInstance().setCleanLogsEnabled(true);
```

This will tell Embrace to use swift-style logging that will better match your existing logging.
:::

## End the Startup Moment

Finally, make sure to end the special "startup" moment that Embrace uses to track
app launch performance. You can end this moment anywhere you choose. We
recommend placing the call as close to the point that your UI is ready for use
as possible, as doing so will give you the most accurate picture of the
performance your users are experiencing with app launch.

{{< tabs "iosSessionReporting2" >}}

{{< tab "Swift" >}}

```swift
Embrace.sharedInstance().endAppStartup();
```

{{< /tab >}}

{{< tab "Objective-C" >}}

```objectivec
[[Embrace sharedInstance] endAppStartup];
```

{{< /tab >}}

{{< /tabs >}}

:::info

**A Note On Ensuring the Start Moment Ends**

This moment is used to track launch performance, but also launch abandonment. This is the 
number of users who close the app before the launch finishes. To correctly track this
it is critical that all code paths end the startup moment eventually. For example if your
app can launch via a push notification, ensure that path also ends the startup moment or you
may see false abandonment data.

:::

You can learn more about moments and measuring performance yourself in the
[Measure Performance](/ios/features/performance-monitoring) section.

## Build and Run Your Application

Alright, you're ready to build and run your application. Assuming the app launches
correctly, pay attention to the system logging and look for Embrace to print out
it's version number.

```sh
[Embrace] Embrace SDK enabled. Version: {{< sdk platform="ios" >}}
```

:::info

If you encounter any errors, please get in touch on Slack and we can help you out.

:::

If you see a log line like this, you've succeeded in integrating Embrace with
your application. Let's trigger a session upload and verify this in the
Dashboard.


## Trigger a session upload

To trigger a session upload, simply send the application to the background by pressing
the simulators 'home' button. Typically the SDK will be given sufficient time to upload 
the session, but sometimes the app is not able to complete the upload in the background. 
To ensure the session was uploaded, launch the application again. Refresh the dashboard in 
your browser and you should now see that you've moved on to the next step.

---

Congratulations! At this point you've completed a basic integration of Embrace.
Embrace is already collecting interesting data from your application. You can
see this data by browsing around the timeline page for the session you just captured.

{{< button relref="/ios/integration/crash-report" >}}On to Crash Reporting{{< /button >}}
