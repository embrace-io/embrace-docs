---
title: Android FAQ
description: Frequently asked questions about the Android Embrace SDK
sidebar_position: 3
---

# Android FAQ

Here are a list of questions we commonly receive along with their answers.
If you don't see your question here, or would like more clarification on one please reach out to us on the [community Slack](http://community.embrace.io)
or email us at [support@embrace.com](mailto:support@embrace.com).

## Integration

### **The SDK should support API level 21 but, I get an error saying I need to set android.useFullClasspathForDexingTransformAPI.**

A [desugaring bug](https://issuetracker.google.com/issues/230454566#comment18) in old AGP versions results in runtime crashes on old devices when using Embrace.
Therefore, it's necessary to use AGP 8.3+ and add `android.useFullClasspathForDexingTransform=true` to your `gradle.properties` if your minSdk is below 26.
Alternatively you can set your `minSdk` to 26 to avoid the problem.

### **The SDK should support API level 21 but, I get an error saying some other API level is needed. What's wrong?**

Please verify that the following Gradle options are set. Additionally, please check if you're using a different library that require a higher API version, like [seancfoley/IPAddress](https://github.com/seancfoley/IPAddress).

```groovy
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}
```

### **How do I use Embrace functions in modules or libraries?**

In addition to performing the basic integration instructions, you must specify the Embrace SDK dependency directly in your module's Gradle file
implementation `'io.embrace:embrace-android-sdk:<version>'`.
You still need to apply the Embrace Gradle Plugin in the app's Gradle file `(apply plugin: 'embrace-swazzler')` and verify that the version set in your project Gradle file is the same as the version set for the SDK in the module’s Gradle file

```groovy
buildscript {
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
        // <version> must match version in module file
        classpath 'io.embrace:embrace-swazzler:<version>'
    }
}
```

### **Is there a way that I can speed up build times?**

Yes, update to the latest version of the Embrace Gradle Plugin & ensure your AGP + Gradle version are on the latest stable version.
Newer AGP versions provide a more performant API for bytecode instrumentation amongst other improvements that our plugin relies upon.

### **Does adding the Embrace SDK impact launch performance?**

To start capturing telemetry as soon as possible, initialization of the Embrace SDK should be done at app startup on the main thread, right at the beginning of the `Application.onCreate()` method. How long the SDK takes to initialize depends on the features that are enabled and the quality of the device on which the app is running. For the vast majority of production usage, the Embrace takes less than 50 milliseconds to initialize. In practice, this is between 1-3% of typical app cold launch time.

### **How does Embrace deliver session data if there is no network connection or if the device is behind a firewall?**

We cache all data prior to sending it to Embrace. If it fails to send, we attempt again later and continue trying until the disc space is full, at which time the oldest message/data is deleted first. Therefore, we continue to retry so long as we don't surpass a hard drive space restriction.

### **What is the impact of adding Embrace Android SDK regarding app performance, device battery/data usage/disk space?**

TL;DR _The impact depends on how you use the API._

The incremental battery usage is negligible because we are mostly dormant unless telemetry is being recorded, in which case the CPU should already be active. We do have a thread that monitors the main thread for ANRs if that feature is enabled when the app is in the foreground, but that only pings the thread every 100ms.
For disk usage, we only hit the disk every 2 seconds when the app is in the foreground, regardless of how much telemetry is recorded. Everything is buffered in memory and flushed to disk at that interval. In the background, we only do so if new telemetry has been added since the last check, so it's pretty lightweight if you're not recording data.
For disk space, we buffer on disk session data that hasn't been sent, and once it's successfully sent, it's deleted. The data is compressed too, so unless the device has a lot of unsent requests due to a lack of network connection, the disk usage should not exceed a few megabytes.
In terms of data usage, it also depends on usage, but it's negligible for a modern app. Sessions typically get bigger if there are a lot of network requests to be logged, but they compress well and each is usually less than 100 KB (P99 for sessions is 98KB)
Our delivery layer retry is based on exponential backoff, starting at 1 minute and doubling with every failure. We only attempt to do so if we detect a network connection. So you should never see tight loops of failures and retries that would clog up the CPU, as the 7th retry will be after 64m. The request connection timeout is 10s, and the read timeout is 60.
In terms of disk persistence, we store a maximum of 500 payloads that have failed to be sent - and we trim based on priority and time, i.e., if we need to trim, we trim the less important payloads first, starting with logs, then sessions, then crashes, by First-In-First-Out. So even if the app is offline for a long time, there is still a ceiling of how much extra disk space will be consumed, which may be 10s of MBs if you're logging a lot of data.
Regarding payload size, our backend rejects any payloads greater than 3mb, so in practice, with the data limits we have set on the various telemetry types we capture, it should not get close to that.

We proactively profile the impact of instrumentation on the app. Spans generally take < 1 ms to start and stop, so the overhead to measurement shouldn't impact user experience, even if you do it directly on the main thread.

### **What determines if a session is classified as prod or dev?**

A session is classified as dev if all of the following are true:
- The `buildType` has the `debuggable` flag set to `true` in the `app/build.gradle` file.
- The optional `enableIntegrationTesting` value passed to the SDK start method is `true`.
- The debugger is attached (meaning you're running the app on a device or simulator with the Android Studio debugger attached).

### **How can I define custom app IDs for different build types?**

See [this section](/android/features/configuration-file#custom-settings-for-build-types-flavors-and-variants) on how to configure different app IDs.

### **Does Embrace work with Buck / OKBuck?**

Not currently. Please contact us at [support@embrace.com](mailto:support@embrace.com) or on Slack if you would like to request support.

### **Does Embrace support Hermes for React Native?**

Yes, we support Hermes in Embrace Android SDK versions 5.5.0 and above. Please ensure that you are using at least version 0.71 of React Native when utilizing Hermes.

### **I can see that the Embrace SDK has initiated, but there is no session data in the dashboard.**

A core aspect of the Embrace SDK is the ability to register as a listener to application lifecycle events. Sessions will not be recorded if the SDK is not alerted of lifecycle events.  

Several customers have encountered the scenario in which they have mistakenly disabled the SDK's ability to listen for such events. In such cases, customer intervention is required to determine how the startup library was disabled and how to re-enable it.

**Technical Examples**

When using a version of 'appCompat' ≥ 1.4.1, the 'androidx.startup' library is used to initialize lifecycle event listeners. This is the same library used by WorkManager on Android.

In certain circumstances, an application may wish to deactivate the default WorkManager startup in order to implement its own. In the [Android documentation](https://developer.android.com/topic/libraries/architecture/workmanager/advanced/custom-configuration) , two ways of implementing custom configuration settings are described.  

If the following code block is present in your Manifest file, **Embrace SDK will not run.** This deactivates every initialization provider:

```xml
<!-- If you want to disable android.startup completely. -->
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    tools:node="remove">
</provider>
```

:::tip Recommended Usage
Only disable the WorkManager initializer. This will allow the Embrace SDK to function properly:

```xml
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    android:exported="false"
    tools:node="merge">
    <!-- If you are using androidx.startup to initialize other components -->
    <meta-data
        android:name="androidx.work.WorkManagerInitializer"
        android:value="androidx.startup"
        tools:node="remove" />
</provider>
```

:::

In other instances, a library may disable the initializer. In such a scenario, there may not be any explicit provider block in the application manifest file. In this situation, the initialization provider should be added explicitly:

```xml
<provider android:authorities="${applicationId}.androidx-startup" android:exported="false" android:name="androidx.startup.InitializationProvider">
   <meta-data android:name="androidx.lifecycle.ProcessLifecycleInitializer" android:value="androidx.startup"/>
</provider>
```

_Note: Since this issue only occurs with appcompat >= 1.4.1, the provider block may previously exist in prior versions of the application that report sessions without difficulty, and this issue is caused by an appCompat version change._

_Please contact us if you have any questions or require help._

### **How do I override the version of OkHttp to be lower than the one Embrace specifies?**

By default, your app will choose the latest version of a particular dependency if multiple versions are transitively specified due to your app's explicit dependencies. If you wish to use a version of a dependency like OkHttp that is lower than what Embrace uses, you can follow the instructions [here](https://docs.gradle.org/current/userguide/dependency_downgrade_and_exclude.html#sec:enforcing_dependency_version).

Note that Embrace does not support versions of dependencies lower than what has been specified, so doing this kind of override may lead to unspecified behaviors. Only do this if it cannot be avoided and thoroughly test that it does not conflict with Embrace or any other SDKs that may also dependent on it.

## Crashes and ANRs

### **Can I use other crash reporters in addition to the Embrace one?**

Yes, we add ourselves as a listener for uncaught JVM exceptions, but we pass on exceptions to any handler that was
registered when we registered ours so that both listeners will receive the uncaught exceptions.

For NDK exceptions, we replace any existing signal handlers, which are used to capture C and C++ exceptions.
Similarly, other NDK crash capture tools would be likely to replace our signal handlers if they are initialized after
our SDK. It is therefore not recommended to enable more than one NDK crash reporting solution in your app as it will interfere with crash report quality.

### **What does it mean if I see Embrace in my ANR reports?**

The call stack that is reported for an ANR includes all processes running on the main thread at the time of an ANR. This way of classifying an ANR often misattributes the real culprit, as it tells you what is happening on the main thread at that moment, but doesn't point to the cause prior to the ANR. Embrace takes lightweight samples of the main thread up to 5 seconds before the occurrence of an ANR to show you what the thread was doing in that time. So, if you see Embrace in your ANR call stack, it's very likely the noise of the ANR reporter landing on the Embrace sampling methods.

### **How can I resolve an Android OkHttp crash?**

The Embrace SDK often appears in the stack trace of an OkHttp crash due to the nature of how OkHttp interceptors work, by chaining the calls one after another. You will often see multiple intercept() calls in the stack.

To resolve this type of crash, we recommend first looking at where exactly the crash occurred. For example, if the crash happened in `okhttp3.internal.http2.Http2Stream.takeHeaders` , this suggests that the way the headers were sent could have contributed to the crash.

### **Why does Embrace's crash data look different compared to another crash reporting solution I use?**

All crash reporting solutions capture crashes in subtly different ways. One of the main differences is in how individual stacktraces are grouped into a distinct report. Different vendors will take different views on how best to do this grouping. When comparing the dashboards of two different vendors side-by-side, this can give the appearance that one vendor is 'missing' a specific crash report, or the crash count is lower/higher than expected. In reality, the vendors have chosen different approaches to aggregate individual events, and missing crash events have simply been aggregated in a different location.

Crash rate calculations also tend to differ between vendors, along with the definition of what forms a 'session'. These subtle differences can lead to disparities in metrics which means these values cannot be directly compared.

Finally, SDKs use different approaches to capture and process crash data. For JVM exceptions, captured stacktraces will usually be the same for all SDKs that have registered for a callback. That isn't necessarily the case for NDK crashes due to limitations of how signal handlers work. This can lead to the scenario where different stacktraces are captured for the same event by different vendors.

### **Why does Embrace's ANR data look different compared to another ANR reporting solution I use?**

All the reasons in this [crashes FAQ](#why-does-embraces-crash-data-look-different-compared-to-another-crash-reporting-solution-i-use) also applies to ANR data.

## Users

### **How does Embrace identify users?**

Embrace automatically generates an Embrace ID determined based on the device.

You also can pass a User ID to identify users through a set of methods related to the user identifier. Setting the user identifier annotates the session with a user identifier that you can use later to search for this user:

`Embrace.getInstance().setUserIdentifier("internal_user_id_1234")`

Remember that this data will be uploaded to Embrace, so think about the privacy of your users and only include data you are willing to share. We recommend including an anonymized user ID that only your agents can search for.  

If no user identifier is set, Embrace sets a random string as the identifier, which is active and available for that user as long as the app remains installed. For more methods on setting user values, see the [API docs](/android/features/identify-users.md).

### **If a user registered in a later session, are previous sessions still linked to that user?**

Yes. We link all sessions to that user from the past and in the future. Search by the Embrace ID for all of that users sessions.

### **Do I have access to the Embrace ID at runtime?**

Yes, we make the Embrace ID available to you via our SDK. See the [API docs](/api/android/).

## Network Requests

### **Why are my API calls not displaying in the dashboard?**

Please make sure that Embrace is initialized after any 3rd party networking libraries.
We are consistently discovering new APIs and libraries for which we need to add support.
Please contact us via email or Slack with the information.

### **Do you support GraphQL?**

Yes, we have multiple customers that use GraphQL. See the [GraphQL guide](/best-practices/graphql) in [Best Practices](/best-practices).

### **Which network libraries do you support?**

All network calls are automatically tracked without any code changes. Network calls are tracked if you use one or more of the following network libraries:

- OkHttp3 (including support for Retrofit)
- Http(s)URLConnection

If you use a library not listed or do not see expected network calls, please contact us at [support@embrace.com](mailto:support@embrace.com) or via Slack.

### **Compatibility with Akamai, Cloudflare, PacketZoom and Other Networking Services**

Embrace is compatible with SDKs that optimize networking, such as those from Akamai, Cloudflare, and PacketZoom.
However, it is important that the Embrace SDK is initialized _after_ any of these types of SDKs are initialized to ensure
that our SDK captures network requests.

### **My network calls are not being captured. What could be going wrong?**

This could be due to one of the following reasons:

- We currently do not automatically capture WebSocket requests.
- The networking library you're using isn't one of the supported ones.
- You may use a CDN like Cloudflare, which can change your networking under-the-hood. Here's a list of CDNs that are verified to be compatible:
  - Akamai
  - Cloudflare
  - PacketZoom
- If you are using `OkHttp3`, make sure to get an instance of `OkHttpClient` by calling the builder:

    ```kotlin
        val myOkHttpClient = OkHttpClient.Builder().build()
    ```

    instead of getting a new instance by calling the constructor:

    ```kotlin
        val myOkHttpClient = OkHttpClient()
    ```

    Our SDK instruments the `build()` method, so it will only track network requests with the first approach. 

### **What does Embrace use to hook into network calls on Android apps?**

For Android, Embrace captures information from native UrlConnections and OkHttp3

## Monitoring Performance

### **How do I measure operations running in parallel?**

Please refer to [Traces feature guide](/android/features/traces) for a reference on how to measure custom app operations using Embrace, including ones running in parallel.

## Tap Coordinates

### **Can I disable the capture of tap coordinates?**

Yes, you can turn off capture of tap coordinates with the [`taps[capture_coordinates]` setting](/android/features/configuration-file/#taps---capture_coordinates-bool) in the `embrace-config.json` file.

## Trace IDs

### **I have a custom ID to represent each network request made to my server. Can I capture that in the network logging?**

Yes, you can capture custom IDs by adding them to the `x-emb-trace-id` header in the request.

:::note
Trace IDs longer than 64 characters will be truncated
:::

## Unity

## Why am I seeing a `Semaphore.tryAcquire` ANR in `UnityPlayerActivity.onPause`?

This ANR (Application Not Responding) happens because a long-running operation in your game is blocking Unity’s ability to pause in a timely manner—it’s not caused by `OnApplicationPause` itself.

### What’s happening behind the scenes?

#### Unity’s Android architecture

Every Unity Android app includes `UnityPlayerActivity`, a Java class that runs on the Android UI thread. It manages the app’s lifecycle and acts as a bridge between the OS and the Unity runtime, which runs on a separate thread.

#### How pausing works

When the OS tells your app to pause (e.g., the user switches apps), that request goes to `UnityPlayerActivity.onPause` on the UI thread. To complete the pause process, the activity needs to notify the Unity engine (running on another thread) to trigger `OnApplicationPause` and suspend the game loop.

Since this requires coordination between threads, `onPause` must **wait** for a synchronization point at the end of Unity’s frame loop. This wait happens via `java.util.concurrent.Semaphore.tryAcquire`, which is what you see in the ANR stack trace.

### Why does this cause an ANR?

Normally, this wait lasts just a few milliseconds. However, if the Unity thread is already **blocked** by a long-running operation (such as synchronous asset loading or heavy computation), the pause request gets stuck waiting—leading to an ANR.

### Example scenario

Let’s say your game loads a large 3D environment when the user taps a button in the main menu. If the scene loads **synchronously** and takes several seconds (especially on a low-end device), the user usually just waits for it to complete. But if the OS happens to pause the app during this process (e.g., the user switches apps), the ongoing load delays the pause process, and boom—ANR.

### How to prevent this?

#### Identify long-running synchronous operations

Use [Traces](/android/features/traces) to monitor scene and asset loads, SDK initializations, and queued async tasks that might be running on the Unity thread.

#### Optimize your game loop

Where possible, move heavy operations **off the main Unity thread** or make them **asynchronous** to avoid blocking the pause request.

### Key takeaway

The `Semaphore.tryAcquire` ANR isn’t caused by `OnApplicationPause`—it’s caused by other long-running tasks in your game that prevent Unity from handling the pause in time. By reducing these blocking operations, you can avoid this issue and improve your app’s responsiveness.
