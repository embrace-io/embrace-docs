---
title: Performance Auto Instrumentation
description: Automatically capture the performance of various aspects of the app
sidebar_position: 16
---

# Performance Auto Instrumentation

## Overview

The Embrace SDK can automatically instrument key workflows as the app goes through its operational lifecycle. The instrumentation generates traces (root span and child spans) similar to the spans that are created when using the [Performance Tracing](/android/features/traces/) API. They will appear in the Embrace UI and be exported via the configured `SpanExporter` just like any other span.

These traces can be augmented with additional attributes and child spans, as well as configured in other ways.

## App Startup

Both [cold](https://developer.android.com/topic/performance/vitals/launch-time#cold) and [warm](https://developer.android.com/topic/performance/vitals/launch-time#warm) app startups will generate traces that track the time between when the app is launched in the foreground and when the designated Activity shows up on screen. Depending on which Android version the app is running on, the start and end times of the trace and what child spans and metadata on the root span that are recorded may differ.

### Start
Cold startups generate a trace with a root span called `emb-app-startup-cold`. Warm startups generate a trace with a root span called `emb-app-startup-warm`. 

The cold startup trace usually begins at the best estimated time of when the app process is created and specialized for the app. On Android versions before 7, it begins when the Embrace SDK starts, which is recommended to be the first line of the `onCreate()` method of the app's `Application` object. 

The warm startup trace begins at the best estimated time of when the first Activity is beginning to be instantiated. 

### End
For both app startup traces, you can configure the SDK so they are ended programmatically (see [Configuration](#configuration)). Otherwise, they will end automatically when the first frame of the startup Activity has been fully rendered, if it can be detected. If not, the time of the Activity's first draw will be used. For Android 5.x, the time when the Activity has reached the `RESUMED` state of its lifecycle will be used instead.

If the app is backgrounded or terminated before startup completes, the trace will end automatically but be marked as abandoned or failed, respectively,

### Configuration

App startup traces can be configured and augmented in the following ways to better suit your needs:

- End startup programmatically
- Ignore interstitial Activities during app startup
- Add custom attributes
- Add custom child spans
- Add data for `Application` object creation

Note: Be mindful of when these customization methods are invoked. They will only be applied before app startup has ended. Further, doing so at a time when it is not certain whether app startup has completed may result in the customization not being recorded (e.g. on a background thread not guaranteed to run before app startup has ended).

#### End startup programmatically

If you want something other than an Activity rendering to end a startup trace, you can configure the SDK so that it waits for the app to manually end it. 

To do that, first set the configuration property `end_startup_with_app_ready` in `embrace-config.json` in the section `sdk_config.automatic_data_capture` to `true`. Then, in your app code, call the method `appReady()` when you wish to signal that app startup has ended successfully. 

:::tip Synchronize With Android Reported Metrics
If you want to synchronize the app startup traces with the `Time to Full Display` metric provided by Android, see the [Mapping to Android Vitals Startup Time](#mapping-to-android-startup-metrics) section below. 
:::

#### Ignore interstitial Activities during app startup

For any interstitial Activities that are opened before the actual Activity whose load completes the startup of the app, annotate them with the `@IgnoreForStartup` annotation so that they will be skipped. That is, their loading will not automatically end app startup.

#### Add custom attributes

Custom span attributes can be added to the root span of the trace by using the `addStartupTraceAttribute()` method before startup has completed.

#### Add custom child spans

Custom child spans can be added to the root span of the trace during app startup by using the `addStartupTraceAttribute()` method. Parameters for the name, start time, and end time must be specified, while optional parameters for attributes, span events, and error code may also be specified to further customize the span.

To ensure the timestamps of the custom spans are in sync with the timestamps of the other spans in the trace, use the `getSdkCurrentTimeMs()` method to obtain it from the same clock instance the SDK uses. This instance is locked after the SDK starts up and will not change even if the system clock changes.

#### Add data for Application object creation

It's difficult for the SDK to programmatically determine precisely when the app's application object has been created, but it's easy to do so for the app itself (i.e. it's when the `Application.onCreate()` method finishes).

As such, the `applicationInitEnd()` method can be used to notify the SDK when this happens, which will allow it to more accurately assess whether an app startup is cold or warm.

### Child Spans
Depending on the version of Android and other additional data your app provides, the following child spans may be recorded as part of the app startup trace, with the cold or warm root span as their parent.

#### emb-process-init
- The time between when the app process is created and specialized and when the `Application` object has been created.
- Only recorded for cold startups AND if `applicationInitEnd()` was invoked.

#### emb-embrace-init
- The time it took for the Embrace SDK to initialize.
- Only recorded for cold startups

#### emb-activity-init-delay
- The time between the last known time during the `Application` object creation process and when the first sign of Activity initialization is detected.
- Only recorded for cold startups

#### emb-activity-init
- The time between when the startup Activity initialization begins and when it has completed (i.e. when it has fully reached the `STARTED` stage of its lifecycle).

#### emb-activity-render
- The time between when the startup Activity has been initialized and when the first frame has been delivered.
- Only recorded for Android 10, 11, and 13+.

#### emb-activity-first-draw
- The time between when the startup Activity has been initialized and when the first draw of the Activity has been detected.
- Only recorded for Android 6-9 and 12.

#### emb-activity-load
- The time between when the startup Activity has been initialized and when it has fully reached the `RESUMED` stage of its lifecycle
- Only recorded for Android 5.

#### emb-app-ready
- The time between when the trace would have ended automatically and when `appReady()` was called.
- Only recorded if the startup traces are configured to be ended programmatically.

### Mapping to Android Startup Metrics

Android provides app startup metrics via [Logcat](https://developer.android.com/topic/performance/vitals/launch-time#retrieve-TTID), [Perfetto](https://developer.android.com/topic/performance/vitals/launch-time#app-startup-perfetto), and the [ApplicationStartInfo](https://developer.android.com/reference/android/app/ApplicationStartInfo) API (Android 15+). This app startup instrumentation maps closely to that. Specifically, the automatic end time yields similar results to [Time to Initial Display](https://developer.android.com/topic/performance/vitals/launch-time#time-initial), though it waits for the first drawn frame to be delivered rather than simply rendered before ending the trace.

If your app reports [Time to Full Display](https://developer.android.com/topic/performance/vitals/launch-time#time-full), you can synchronize the invocations of `reportFullyDrawn()` and `appReady()`, either manually, or utilizing the APIs provided by [FullyDrawnReporter](https://developer.android.com/reference/kotlin/androidx/activity/FullyDrawnReporter).

### Code Example

The following sample `Application` will add a custom span and attribute to the app startup trace. It will also inform the SDK of when the application object has finished being created.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
class SampleApplication(private val nativeLibName: String) : Application() {

    override fun onCreate() {
        super.onCreate()

        val embrace = Embrace.getInstance()
        embrace.start(this)
        val libLoadStart = embrace.getSdkCurrentTimeMs()
        try {
            System.loadLibrary(nativeLibName)
            val libLoadEnd = embrace.getSdkCurrentTimeMs()
            embrace.addStartupTraceChildSpan(
                name = "native-lib-loaded",
                startTimeMs = libLoadStart,
                endTimeMs = libLoadEnd,
            )
            embrace.addStartupTraceAttribute("loaded_native_lib_name", nativeLibName)
        } catch (t: Throwable) {
            val libLoadFailed = embrace.getSdkCurrentTimeMs()
            embrace.addStartupTraceChildSpan(
                name = "native-lib-load-failed",
                startTimeMs = libLoadStart,
                endTimeMs = libLoadFailed,
                attributes = mapOf("failed_native_lib_name" to nativeLibName),
                events = listOf(),
                errorCode = ErrorCode.FAILURE
            )
        }    
        embrace.applicationInitEnd()
    }
}
```

</TabItem>
</Tabs>

### App Startup Traces in Old Embrace SDK Versions

This documentation covers the app startup instrumentation as of Embrace Android SDK version 7.3.0. For earlier versions, there are the following differences:

- The names for the cold and warm startup root spans are `emb-cold-time-to-initial-display` and `emb-warm-time-to-initial-display`, respectively.
- The annotation used for ignoring interstitial Activities is called `@StartupActivity`.
- Traces are only logged if app startup completes successfully, so there is no way for an app startup trace to fail or be abandoned.
- Programmatic ending of app startup is not supported.
- Start and end times of root spans as well as conditions for recording child spans differ slightly.

## Activity Load

When an Activity is brought into view, its loading workflow will be appropriately traced.

For loads where the Activity object has to be created, a trace with a root span named `emb-{Activity Name}-cold-time-to-initial-display` will be generated, where `{Activity Name}` is the fully-qualified class name of the Activity that was loaded. This generally happens when you navigate from one Activity to another while the app is in the foreground.

This trace begins at our best estimate of when Activity creation begins. It ends at our best estimate of when the Activity has reached the `RESUMED` stage of its lifecycle.

For loads where the Activity object has already been created, a trace with a root span named `emb-{Activity Name}-hot-time-to-initial-display` will be generated, where `{Activity Name}` is the fully-qualified class name of the Activity that was loaded. This generally happens when an already launched app gets foregrounded.

This trace begins at our best estimate of when Activity begins to enter the `STARTED` stage of its lifecycle. It ends at our best estimate of when the Activity has reached the `RESUMED` stage of its lifecycle.

Note: navigation using Jetpack Compose Navigation component should also generate a "hot" Activity Load trace.

### Configuration

Activity Load traces can be augmented in the following ways to add additional data particular to your app:

- Custom end event
- Custom attributes
- Custom child spans
- Configure Activities to be instrumented

Note: Be mindful of when these customization methods are invoked. Doing so on a background thread or at a time when it is not certain whether the Activity load has completed may result in the customization not being recorded.

#### Custom end event

If you don't want to consider when the UI first loads as the end time for your Activity load traces, you can end it with manually instead by invoking the `activityLoad()` method. This is useful, for instance, if you want to end the trace when `reportFullyDrawn()` is reported for the Activity. 

To use this configuration, annotate the Activity class with `@CustomLoadTracedActivity`.

For Activities with this annotation, the SDK will wait for the `activityLoaded()` method to be invoked with the Activity instance as its parameter. The trace is considered abandoned if the user navigates away from the Activity before this method is invoked, so ensure all code paths that lead to a successful load will call this.

Activities annotated this way will always be traced unless the entire Activity Load feature is disabled.

:::tip
To prevent memory leaks, do not cache your Activity instance in a member variable that will not be cleaned up once your Activity instance is destroyed.
:::

#### Custom attributes

Custom span attributes can be added to the root span of the trace by using the `addLoadTraceAttribute()` method before the Activity load is completed or abandoned.

#### Custom child spans

Custom child spans can be added to the root span of the trace by using the `addLoadTraceChildSpan()`  method before the Activity load is completed or abandoned. Parameters for the name, start time, and end time must be specified, while optional parameters for attributes, span events, and error code may also be specified to customize the span.

To ensure the timestamps of the custom spans are in sync with the timestamps of the other spans in the trace, use the `getSdkCurrentTimeMs()` method to obtain it from the same clock instance the SDK uses. This clock instance is locked after the SDK starts up and will not change even if the system clock changes.


#### Configure Activities to be instrumented

The default configuration of the SDK is to trace the loading of all Activities after app startup, cold or warm. If you do not wish to use this instrumentation, you can turn off the feature entirely in `embrace-config.json`.

If you wish to only have the instrumentation enabled for a subset of Activities, you can do so by disabling all by default and enabling it for a select few. Alternatively, you can enable the feature for all Activities by default and then disable it for a select few.

- Disabling all Activity load instrumentation
	- Set the configuration property `ui_load_tracing_disabled` in `embrace-config.json` in the section `sdk_config.automatic_data_capture` to `true`

- Explicitly enabling select Activities
	- Set the configuration property `ui_load_tracing_selected_only` in `embrace-config.json` in the section `sdk_config.ui_load_tracing_selected_only` to `true`
	- Annotate each Activity that you want to instrument with `@LoadTracedActivity` or `@CustomLoadTracedActivity`

- Explicitly disabling select Activities
	- Annotate each Activity that you do not want to instrument with `@NotTracedActivity`


### Code Example

The following sample `Activity` will add a custom span and attribute to the Activity load trace in progress. It will also inform the SDK of when the Activity has finished loading via a callback when the Activity has completed all of its `onResume()` callbacks.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin

@CustomLoadTracedActivity
class SampleActivity : ComponentActivity() {

    private val embrace = Embrace.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        embrace.addLoadTraceAttribute(this, "cold_load", "true")
    }

    override fun onPostResume() {
        super.onPostResume()

        val cacheLoadStartTime = embrace.getSdkCurrentTimeMs()

        // fetch data from local cache

        val cacheLoadEndTime = embrace.getSdkCurrentTimeMs()

        embrace.addLoadTraceChildSpan(this, "load-cache", cacheLoadStartTime, cacheLoadEndTime)
        embrace.activityLoaded(this)
    }
}

```

</TabItem>
</Tabs>
