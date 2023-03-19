---
title: Android FAQ
description: Frequently asked questions about the Android Embrace SDK
sidebar_position: 3
---

# Android FAQ

Here are a list of questions we commonly receive along with their answers.
If you don't see your question here, or would like more clarification on one please reach out to use on Slack
or email us at <support@embrace.io>.

## Common Questions

### **Can I turn on screenshots for specific areas of my app?**

Being able to see exactly what the user experienced often helps identify or solve an issue faster than looking through log messages or stack traces.
To turn on screenshots, please refer to the sections for [Logs](/android/integration/log-message-api) and [Moments](/android/features/performance-monitoring), or see the [API docs](/api/android/).
If you'd like to turn on screenshots, please reach out to us and we will change the app configuration for you.

## Crash Capture

### **Can I use other crash reporters in addition to the Embrace one?**

Yes, we add ourselves as a listener for uncaught JVM exceptions, but we pass on exceptions to any handler that was
registered when we registered ours so that both listeners will receive the uncaught exceptions.

For NDK exceptions, we replace any existing signal handlers, which are used to capture C and C++ exceptions.
Similarly, other NDK crash capture tools would be likely to replace our signal handlers if they are initialized after
our SDK.


## Integrating

### **The SDK should support API level 16 but, I get an error saying API level 24 is needed. What's wrong?**

Please verify that the following Gradle options are set. Additionally, please check if you're using the [seancfoley/IPAddress](https://github.com/seancfoley/IPAddress) library.
You may be using a newer version of it which has a higher API level requirement.

```groovy
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}
```

### **How do I use Embrace functions in modules or libraries?**

In addition to performing the basic integration instructions, you must specify the Embrace SDK dependency directly in your module's Gradle file
implementation `'io.embrace:embrace-android-sdk:{{ embrace_sdk_version platform="android" }}'`.
In case you have implemented OkHttp in your module, you will also need to specify the Embrace OkHttp library in your module's Gradle file
implementation `'io.embrace:embrace-android-okhttp3:{{ embrace_sdk_version platform="android" }}'`.
You still need to apply the Swazzler plugin in the app's Gradle file `(apply plugin: 'embrace-swazzler')` and verify that the Swazzler version set in your project Gradle file is the same as the version set for the SDK in the module’s Gradle file

```groovy
buildscript {
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
        ...
        // <version> must match version in module file
        classpath 'io.embrace:embrace-swazzler:<version>'
    }
}
```

### **Is there a way that I can speed up build times?**

Yes, the swazzling cache can help with this. An in-depth description of this feature can be found [here](/android/features/build-options#improving-build-speed).


### **What determines if a session is classified as prod or dev?**

A session is classified as dev if all of the following are true:
* The `buildType` has the `debuggable` flag set to `true` in the `app/build.gradle` file.
* The optional `enableIntegrationTesting` value passed to the SDK start method is `true`.
* The debugger is attached (meaning you're running the app on a device or simulator with the Android Studio debugger attached).

### **How can I define custom app IDs for different build types?**

See [this section](/android/features/configuration-file#custom-settings-for-build-types-flavors-and-variants) on how to configure different app IDs.

### **Does Embrace work with Buck / OKBuck?**

Not currently. Please contact us at <support@embrace.io> or on Slack if you would like to request support.

### **I can see that the Embrace SDK has initiated, but there is no session data in the dashboard.**

A core aspect of the Embrace SDK is the ability to register as a listener to application lifecycle events. Sessions will not be recorded if the SDK is not alerted of lifecycle events. 

Several customers have encountered the scenario in which they have mistakenly disabled the SDK's ability to listen for such events. In such cases, customer intervention is required to determine how the startup library was disabled and how to re-enable it.

**Technical Examples**

When using a version of 'appCompat' ≥ 1.4.1, the 'androidx.startup' library is used to initialise lifecycle event listeners. This is the same library used by WorkManager on Android.

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
**Recommended Usage:** Only disable the WorkManager initializer. This will allow the Embrace SDK to function properly:
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

In other instances, a library may disable the initializer. In such a scenario, there may not be any explicit provider block in the application manifest file. In this situation, the initialization provider should be added explicitly:

```xml
<provider android:authorities="${applicationId}.androidx-startup" android:exported="false" android:name="androidx.startup.InitializationProvider">
   <meta-data android:name="androidx.lifecycle.ProcessLifecycleInitializer" android:value="androidx.startup"/>
</provider>
```

*Note: Since this issue only occurs with appcompat >= 1.4.1, the provider block may previously exist in prior versions of the application that report sessions without difficulty, and this issue is caused by an appCompat version change.*

*Please contact us if you have any questions or require help.*

## Users

### **If a user registered in a later session, are previous sessions still linked to that user?**

Yes. We link all sessions to that user from the past and in the future. Search by the Embrace ID for all of that users sessions.

### **Do I have access to the Embrace ID at runtime?**

Yes, we make the Embrace ID available to you via our SDK. See the [API docs](/api/android/).

## Network Requests

### **Why are my API calls not displaying in the dashboard?**

Please make sure that Embrace is initialized after any 3rd party networking libraries.
We are consistently discovering new APIs and libraries for which we need to add support.
Please contact us via email or Slack with the information.

### **Do you support GRPC?**

Yes. Please contact us for the steps to track GRPC.

### **Do you support GraphQL?**

Yes, we have multiple customers that use GraphQL. See the [GraphQL guide](/best-practices/graphql) in [Best Practices](/best-practices).

### **Which network libraries do you support?**

All network calls are automatically tracked without any code changes. Network calls are tracked if you use one or more of the following network libraries:

* OkHttp3 (including support for Retrofit)
* Volley
* Http(s)URLConnection

If you use a library not listed or do not see expected network calls, please contact us at <support@embrace.io> or via Slack.

### **Compatibility with Akamai, Cloudflare, PacketZoom and Other Networking Services**

Embrace is compatible with SDKs that optimize networking, such as those from Akamai, Cloudflare, and PacketZoom.
However, it is important that the Embrace SDK is initialized *after* any of these types of SDKs are initialized to ensure
that our SDK captures network requests.

### **My network calls are not being captured. What could be going wrong?**

This could be due to one of the following reasons:

* We currently do not automatically capture WebSocket requests.
* The networking library you're using isn't one of the supported ones.
* You may use a CDN like Cloudflare, which can change your networking under-the-hood. Here's a list of CDNs that are verified to be compatible:
  * Akamai
  * Cloudflare
  * PacketZoom

## Performance Monitoring

### **Why do I have super low rates of incomplete for startup; e.g. 99.5% to 100%?**

The most common scenario is that we are auto-detecting an early activity for which you should skip.
Please refer to the  [Performance Monitoring guide](/android/features/performance-monitoring) for how to correctly track startup completion rates and durations.

### **How do I measure activities running in parallel?**

You can use an ID for a moment to prevent naming collisions.
The moment IDs differentiate between separate parallel instances of moments with the same name.
For aggregation purposes, the moment identifier will be ignored and only the moment name will be considered.

```java
Embrace.getInstance().startEvent("load_photos", "<MOMENT_IDENTIFIER>");
Embrace.getInstance().endEvent("load_photos", "<MOMENT_IDENTIFIER>");
```

## Tap Coordinates

### **Can I disable the capture of tap coordinates?**

Yes, you can turn off capture of tap coordinates with the [`taps[capture_coordinates]` setting](/android/features/configuration-file#tapscapture_coordinates) in the `embrace-config.json` file.

## Trace IDs

### **Can trace IDs for network requests be captured?**

Yes, you can capture trace IDs in two ways:
1. Add a trace ID to a request by adding the `x-emb-trace-id` header with the trace ID value
1. If the ID is already present in the request in a different header, set the name of the header in the `embrace-config.json` file with the [`networking[trace_id_header]` setting](/android/features/configuration-file#networkingtrace_id_header)

:::note
Trace IDs longer than 64 characters will be truncated
:::
