---
title: Android FAQ
description: Frequently asked questions about the Android Embrace SDK
weight: 3
---

# Android FAQ

Here are a list of questions we commonly receive along with their answers.
If you don't see your question here, or would like more clarification on one please reach out to use on Slack
or email us at <support@embrace.io>.

## Common Questions

### **Can I turn off screenshots for specific areas of my app?**

Being able to see exactly what the user experienced often helps identify or solve an issue faster than looking through log messages or stack traces.
Screenshots are taken by default for moments (e.g. Startup), Error Logs, and Warning Logs.
To turn off screenshots via the SDK,
please refer to the sections for [Logs]({{< relref "/android/integration/log-message-api" >}}) and [Moments]({{< relref "/android/features/performance-monitoring" >}}), or see the [API docs]({{< api android >}}).
If you'd like to turn off screenshots for the entire app, please contact us and we will change the app configuration for you.

## Crash Capture

### **Can I use other crash reporters in addition to the Embrace one?**

Yes, we add ourselves as a listener for uncaught JVM exceptions, but we pass on exceptions to any handler that was
registered when we registered ours so that both listeners will receive the uncaught exceptions.

For NDK exceptions, we replace the any existing signal handlers, which are used to capture C and C++ exceptions.
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
implementation `'embrace-io:embrace-android-sdk:{{< sdk platform="android" >}}'`.
You still need to apply the Swazzler plugin in the app's Gradle file `(apply plugin: 'embrace-swazzler')` and verify that the Swazzler version set in your project Gradle file is the same as the version set for the SDK in the module’s Gradle file
```groovy
buildscript {
    repositories {
        jcenter()
        google()
    }
    dependencies {
        ...
        // <version> must match version in module file
        classpath 'embrace-io:embrace-swazzler:<version>'
    }
}
```

### **Is there a way that I can speed up build times?**

Yes, the swazzling cache can help with this. An in-depth description of this feature can be found [here]({{< relref "/android/features/build-options#improving-build-speed">}}).


### **What determines if a session is classified as prod or dev?**

A session is classified as dev if all of the following are true:
* The `buildType` has the `debuggable` flag set to `true` in the `app/build.gradle` file.
* The optional `enableIntegrationTesting` value passed to the SDK start method is `true`.
* The debugger is attached (meaning you're running the app on a device or simulator with the Android Studio debugger attached).

### **How can I define custom app IDs for different build types?**

You can override the app ID in your `build.gradle` file as shown below
```groovy
buildTypes {
        release {
            // ...
            // note the single quotes inside the double quotes for the app ID value
            buildConfigField "String", "EMBRACE_APP_ID", "'YOUR_APP_ID_HERE'"
        }
        debug {
            // ...
            // if you don't specify an app ID here, it will fall back on the default one 
        }
}
```

### **Does Embrace work with Buck / OKBuck?**

Not currently. Please contact us at <support@embrace.io> or on Slack if you would like to request support.



## Users

### **If a user registered in a later session, are previous sessions still linked to that user?**

Yes. We link all sessions to that user from the past and in the future. Search by the Embrace ID for all of that users sessions.

### **Do I have access to the Embrace ID at runtime?**

Yes, we make the Embrace ID available to you via our SDK. See the [API docs]({{< api android >}}).

## Network Requests

### **Why are my API calls not displaying in the dashboard?**

Please make sure that Embrace is initialized after any 3rd party networking libraries.
We are consistently discovering new APIs and libraries for which we need to add support.
Please contact us via email or Slack with the information.

### **Do you support GRPC?**

Yes. Please contact us for the steps to track GRPC.

### **Do you support GraphQL?**

Yes, we have multiple customers that use GraphQL. See the [GraphQL guide]({{< relref "/best-practices/graphql">}}) in [Best Practices]({{< relref "/best-practices" >}}).

### **Which network libraries do you support?**

All network calls are automatically tracked without any code changes. Network calls are tracked if you use one or more of the following network libraries:

* OkHttp3 (including support for Retrofit)
* Volley
* Http(s)URLConnection

If you use a library not listed or do not see expected network calls, please contact us at <support@embrace.io> or via Slack.

### ** Compatibility with Akamai, Cloudflare, PacketZoom and Other Networking Services

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
Please refer to the  [Performance Monitoring guide]({{< relref "/android/features/performance-monitoring" >}}) for how to correctly track startup completion rates and durations.

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

Yes, you can turn off capture of tap coordinates with the [`taps[capture_coordinates]` setting]({{< relref "/android/features/configuration-file#tapscapture_coordinates" >}}) in the `embrace-config.json` file.


## Trace IDs

### **Can trace IDs for network requests be captured?**

Yes, you can capture trace IDs in two ways:
1. Add a trace ID to a request by adding the `x-emb-trace-id` header with the trace ID value
1. If the ID is already present in the request in a different header, set the name of the header in the `embrace-config.json` file with the [`networking[trace_id_header]` setting]({{< relref "/android/features/configuration-file#networkingtrack_id_header" >}})

{{< hint warning >}}
Trace IDs longer than 64 characters will be truncated
{{< /hint >}}

