---
title: Android SDK Changelog
description: Changelog for the Android Embrace SDK
sidebar_position: 4
---

# Android SDK Changelog

:::info Important 
Please be sure to review the [Android Upgrade Guide](/android/upgrading/) when moving from Android v6.x to Android v7.x
:::

## 7.4.0
*April 30, 2025*

- OTel integration improvements
  - API to add custom Resource attributes
  - API to create Span Links
  - ANRs exported as spans to configured `SpanExporters`
- Enabled UI Load traces by default
- Updated OpenTelemetry API and SDK to `1.49.0`

## 7.3.0
*March 18, 2025*

- Improved app startup instrumentation
  - Updated name of root and child spans logged for cold and warm app startups
  - Added support for programmatic termination of app startup as opt-in configuration option
  - Record failed and abandoned app startup spans if the app crashes or backgrounds before startup completes
  - Added new annotation (`@IgnoreForStartup`) for trampoline or splash-screen Activities, which will make the app startup instrumentation ignore them for the purposes of ending a startup
  - Deprecated (`@StartupActivity`). This annotation will no longer affect how the app startup instrumentation works.
  - Fixed issue with app startup instrumentation recording on Android 12 for Activities that use Jetpack Compose Navigation
- Fail app build if symbol upload request fails
- Modified logic of uploading `ApplicationExitInfo` (non-visible change)
- Updated OpenTelemetry API and SDK to `1.48.0`

## 7.2.0
*February 27, 2025*

- Fixed stacktrace deobfuscation in React Native
- Fixed build issues on some apps that use DexGuard
- Fixed memory leak of the Activity loaded during app launch
- Fixed rare crash when the Jetpack Compose tap detection feature is enabled

## 7.1.0
*February 7, 2025*

- Fixed stacktrace symbolication issue caused by incorrect ProGuard rules
- Added API for sending log messages that contain binary attachments
- Internal refactoring of gradle plugin

## 7.0.0
*January 28, 2025*

:::warning Important
This version has an issue where JVM symbol mapping files are sometimes not being uploaded correctly, leading to some call stacks being partially obfuscated (e.g. in crashes and ANRs). Please use 7.1.0 instead.
:::

- API and functional changes in this major release are documented in the [Upgrade Guide](/android/upgrading/). Key ones to be aware of include:
    - Moments feature and API have been removed in favor of [Traces](/android/features/traces/), which should be used instead to track how long workflows in the app took to complete.
    - Public API methods are all implemented in Kotlin, so passing in nulls in Java for parameters annotated with `@NonNull` will cause a runtime exception and could cause a crash.
    - Firebase Cloud Messaging and Compose tap instrumentation require explicit inclusion of modules in your Gradle files.
    - Remove support for deprecated properties in `embrace-config.json` and the Embrace Gradle plugin.

- New features and other changes in this release include:
    - Customizable, automatic instrumentation of Activity load and Jetpack Compose Navigation (requires opt-in for now)
    - Auto-termination of spans based on navigation
    - Customization of app startup trace through custom attributes and child spans
    - Public API to get the timestamp used by the SDK so custom spans for app startup and UI load traces can be in sync with other spans in the trace
    - API to disable data export at programmatically for the currently running instance of the app
    - Associate native crashes with the device and app metadata at the time of crash instead of the time of reporting
    - Configuration setting to enable Network Span Forwarding traceparent injection into network request spans for non-Embrace users

- Dependency updates:
    - OpenTelemetry API and SDK to `1.46.0`
    - OpenTelemetry Semantic Conventions to `1.29.0-alpha`
    - AndroidX Lifecycle to `2.7.0`
    - Moshi to `1.15.2`    


## 6.14.0
*October 31, 2024*

- Extensive improvements to the resiliency and performance of telemetry persistence and delivery, especially under adverse device and network conditions.
- Fixed issue where feature flags were not being cached and applied consistently.
- New runtime dependency: OkHttp 4.12.
    - See the FAQ [here](/android/faq/#how-do-i-override-the-version-of-okhttp-to-be-lower-than-the-one-embrace-specifies) if you want to use a lower version at runtime (not recommend or supported).

## 6.13.0
*September 12, 2024*

- Improve SDK startup performance.
- Fix issue with capturing details of network requests with long URLs.
- Increase default ANR call stack depth to 200 frames.

## 6.12.2
*September 11, 2024*

- Fix race condition on app startup when native crash capture is enabled that could result in a crash when the native delegate is accessed before the library is loaded

## 6.12.1
*September 6, 2024*

- Fix JVM crash recording and Embrace API request retries when Embrace enums are obfuscated.
- Improve delivery retry of sessions ended by a native crash or background process termination.

## 6.12.0
*September 5, 2024*

:::info Important
This version contains a bug where obfuscating Embrace classes will lead to JVM crashes not being recorded and failed requests to Embrace not being retried after that app process terminates.

*This version should not be used*, but you can workaround this by adding the following keep rule to your Proguard file so R8 will bypass obfuscation for the matched code: 

`-keep class io.embrace.android.embracesdk.** { *; }`
:::

- Improve SDK startup performance.
- Increase resilience of telemetry delivery under poor network conditions.
- Add configuration to redact values for custom property keys on a denylist.
- Fix bug at build time that invalidated the Gradle configuration cache when the native crash capture feature was disabled.

## 6.11.0
*August 27, 2024*

- Update cached background activities when session properties are modified.
- Apply configuration defined in `embrace-config.json` properly if appId is not specified (Fix for #1219).
- Restore access via synthetic properties in Kotlin for `getDeviceId()` and `getLastRunEndState()` (Fix for #1253).
- Update OpenTelemetry Java SDK and BoM to 1.41.0.

## 6.10.0
*August 13, 2024*

- Support Android 15 and devices that use 16KB native page size.
- Updated minimum requirements to the following:
    - JDK 11
    - Android SDK Platform 34
    - Gradle 7.5.1
    - AGP 7.4.2
    - Kotlin 1.8.22
- Improve R8 ruleset to further reduce the size of the SDK binary.
- Upload native symbols by default during the build process unless explicitly disabled.
- Split main SDK module (`io.embrace.embrace-android-sdk`) into several modules.
    - This is an internal change and has no direct user impact. App dependencies on Embrace remain unchanged.
- `Embrace.getDeviceId()` and `Embrace.getLastEndState()` only accessible as functions but not as properties in Kotlin.

## 6.9.2
*August 1, 2024*
- Fix session recording after app backgrounding if Background Activity is disabled.

:::warning Important
Version 6.9.0 and 6.9.1 have an issue recording sessions after an app backgrounds if Background Activity is disabled. 

Do not use these versions of the SDK. This issue has been addressed in 6.9.2.
:::

## 6.9.1
*July 10, 2024*
- Fix the SDK version sent in session payloads

## 6.9.0
*July 4, 2024*
- OpenTelemetry compatibility improvements:
    - Provide implementation of the [OpenTelemetry Tracing API](https://opentelemetry.io/docs/specs/otel/trace/api/). 
        - Spans recorded through this API and implementation are equivalent to those recorded using the Embrace Traces API. 
        - This can be obtained through the `getOpenTelemetry()` method, which will return working implementations for methods involving tracing. Methods involving Logs and Metrics are no-ops at the current time.
    - Stopping spans through the Embrace Traces API no longer implicitly sets Status to `OK`.
    - Add `telemetry.distro.*` resource attributes to exported signals.
    - Update OpenTelemetry SDK dependency to version 1.38 of the [OpenTelemetry BOM](https://github.com/open-telemetry/opentelemetry-java?tab=readme-ov-file#bill-of-material).
    - Consume semantic conventions from [OTel Semantic Conventions for Java](https://github.com/open-telemetry/semantic-conventions-java).
- Enhance Traces API to support behavior exposed via the OpenTelemetry Tracing API.
- Change internal endpoint to which session data is sent (no user-facing behavior changes).
- Issue build warning for apps that have minSdk < 24 and are using AGP < 8.3.
    - If minSdk is lower than 24 (i.e. Android 5 and/or 6 is supported by the app), AGP version 8.3+ must be used so the app can be desugared with the proper setting.
    - See [this question](/android/faq/#the-sdk-should-support-api-level-21-but-i-get-an-error-saying-i-need-to-set-androidusefullclasspathfordexingtransformapi) in the FAQ for details.
- Fix DexGuard support.

## 6.8.3
*July 17, 2024*
- No change to functionality. Remove error log integration verification explicitly for apps that don't use R8 to strip out unreferenced classes.

## 6.8.2
*June 7, 2024*
- Remove dependency on the configuration attribute `enable_automatic_activity_capture` for manually capturing views

## 6.8.1
*June 4, 2024*
- Fix a build error while reading the api_token from an environment variable.

## 6.8.0
*May 28, 2024*
- Complete migration to OpenTelemetry, which means all app data recorded by the SDK can be sent directly to OpenTelemetry Collectors from the app.
- Allow the SDK to be used without being an Embrace customer, so data is only sent to OpenTelemetry Collectors and not to Embrace.
- Verify as part of the build that desugaring is enabled for apps supporting Android versions less than 7.0 (i.e. `minSdkVerion` < 24).
- Fix the location we look for flavor-specific Embrace configuration files during the build.
- Remove excessive SDK logging.


## 6.7.0
*April 22, 2024*
 - Support configuration of OpenTelemetry Exporters to export [Logs](/android/integration/log-message-api/#export-your-telemetry) data as OpenTelemetry LogRecord.

## 6.6.0
*April 19, 2024*

:::info Important
API Desugaring is now a requirement for apps that support Android 5 and 6. This is a simple, well-supported process done by Android build tooling that backports certain Java 8 language features onto older Android versions that didn't have support. For more information, please see [Google's documentation here](https://developer.android.com/studio/write/java8-support#library-desugaring)
:::

- THE [OpenTelemetry](https://opentelemetry.io/) Release! The Embrace Android SDK now uses the OpenTelemetry Java SDK at its core.
- This means the bulk of the telemetry is recorded as OTel signals, so they can be sent directly to OTel Collectors from the app using any Java OTLP Exporter that is compatible with Android. Telemetry types modeled by Embrace like sessions, crashes, ANRs, and logs have canonical representations as OTel signals using a combination of OTel and in-house semantic conventions.
- The number of Embrace conventions will hopefully shrink going forward as the community comes together around a set of shared semantic conventions to standardize the world of mobile telemetry. We will build upon this new foundation in the coming releases to bring together the worlds of OpenTelemetry, mobile client performance observability, and RUM!

## 6.5.0
*March 14, 2024*
:::info Important
- Increase our minimum Gradle version to 6.5.1
:::
- Fully support configuration cache on all Gradle versions.
- Fix issue with active Moments being lost when a new session starts.

## 6.4.0
*March 6, 2024*
- Traces improvements
    - Support configuration of OpenTelemetry Exporters to export [Traces](/android/features/traces/#export-to-opentelemetry-collectors) data as OpenTelemetry Spans (beta).
    - Change timestamps parameters of the APIs to use milliseconds to better align with Android developer expectations. 
        - Note: timestamps that are in nanoseconds will be detected and converted for now so existing instrumentation will still work, but this will be removed in an upcoming release.
    - Increase per-session limit of spans to 500 in total.
    - New methods added:
        - "getSpan" that returns a reference to an active or recently ended EmbraceSpan.
        - "startSpan" that creates and starts a span directly.
    - New functionality for existing methods:
        - Allow custom timestamps to be specified when starting and stopping a span.
        - Support adding attributes and span events to "recordSpan".
- Increase transparency of SDK startup by adding custom sections to traces recorded using Android system tracing libraries like androidx.tracing.
    - Note: only run Android system tracing on release builds running on real devices. Debug builds and emulators will not yield accurate data.
- Optimize React Native JavaScript bundleId retrieval to better support CodePush (React Native only)
- Allow configuration cache to be enabled for Gradle 8.3+
    - Note: for Gradle 8.3+, running Embrace Gradle plugin will invalidate the configuration cache 

## 6.3.2
*February 23, 2024*
- Improved performance and stability of NDK serialization while the app is under memory pressure
- Added back support of OkHttp 3.13.0+, which was initially removed in this major version

## 6.3.1
*February 2, 2024*

:::info Important
The [Configuration Cache](https://docs.gradle.org/current/userguide/configuration_cache.html) feature for Gradle 8.4+ is not compatible with this release due to an [issue in Gradle tooling](https://github.com/gradle/gradle/issues/19252). Please disable this in developer builds when used with this release or use an older version of Gradle.
:::

- Support for Gradle 8.4+
- Plus all the performance enhancements of 6.3.0!

## 6.3.0
*January 31, 2024*

:::info Important
Gradle 8.4+ is not supported by this version when the NDK crash capture feature is off. Please use 6.3.1 to ensure all expected Gradle versions are supported.
:::

- A plethora of performance and reliability improvements!
    - Increased speed and efficiency of data serialization and persistence
    - Reduced amount of disk space used to save data not-yet delivered
    - Optimized thread usage for background work
    - Eliminated network requests sent when starting new sessions
    - Improved handling of network retries when the backend is too busy
    - Prioritized session delivery over other payloads
- Capture thermal status change events by default
- Capture CPU and GPU info by default
- Enable all tracing functionality when SDK startup is complete

## 6.2.0
*December 13, 2023*
- Removed the capture of unused beta features: strict mode violation, activity lifecycle,
- Improved the delivery of session messages with changes in the DeliveryService class
- Removed unused ANR process errors
- Gzip encode HTTP requests via stream
- Prioritize most recent api calls when limit is reached.
- Avoid dropping session when endSession called

## 6.1.0
*November 24, 2023*
- Enabled [Traces](/android/features/traces/) by default
- Improved build performance of the Gradle plugin
- Improved session data delivery retries
- Enforce network call per session limits properly
- Fixed premature clearing of breadcrumbs on background activities

## 6.0.0
*October 26, 2023*
- Removal of deprecated methods
    - Check our [upgrading guide](/android/upgrading/)
- Increase our minSdkVersion to API 21
- Increase our minimum AGP to 4.0.0
- Increase our minimum Gradle version to 6.1.1
- Set the minimum OkHttp version to 4.0.0

:::info Important
We strongly recommend that Embrace customers ensure their apps meet the criteria above.
:::

## 5.25.1
*December 7, 2023*
- Fixed a validation issue when calling deprecated method logNetworkRequest. 

## 5.25.0
*October 10, 2023*
- Added support for tap tracking on Jetpack Compose elements.
- Added support for the Network Span Forwarding feature that enables the propagate of a W3C-compliant traceheader in requests to Embrace so a span can be created and forwarded to the customer servers. 
- Fixed propagation of error type and message when recording incomplete network requests.
- The SDK now captures ANR data using the ApplicationExitInfo API for Android 11+.
- Fixed a rare issue when network logging was being done on a URLConnection whose Response is no longer accessible.
- Fixed a bug where calling bytes() on a gzipped OkHttp response throws an exception.

## 5.24.0
*September 21, 2023*
- Renamed several API interfaces to standardize naming between our SDKs to better reflect what each API does.
- Added new API method to get the current session ID.
- Set custom folders for native symbols to upload during build process.
- Added Dexguard support.
- Exposed beta API for Performacing Tracing.

## 5.23.0
*August 09, 2023*
- Bug fix on retryLock function. Now the ANR monitoring is Serialized to work on a single background executor.
- Fixed missing Unity ANR
- Added Plugins DSL support. Please note that embrace-swazzler plugin name changed to "io.embrace.swazzler" when declared through Plugins DSL. Legacy buildscript block declaration remains as "embrace-swazzler".
- Fixed custom breadcrumbs limit
- Fixed an issue when capturing network content for OkHttp3 in calls with gzip content.

## 5.22.0
*July 12, 2023*
- Implemented CPU and EGL device information for devices with NDK enabled.
- Fixed a bug that caused coordinates on Jetpack Compose view to be incorrectly set at 0,0.
- Fixed an issue in the network capture feature for customers using OkHttp3 where the empty request body was not being handled correctly.


## 5.21.0
*June 27, 2023*
- Added the method getLastRunEndState() to check whether the last execution crashed or was a clean exit.
- Fixed a duplicate resources error that failed the build in some scenarios.
- Fixed a build-time issue reported when using Gradle 8 and configuration cache.

## 5.20.0
*June 16, 2023*
- Fixed false positive ANR
- Improvements in AppExitInfo capture logic
- Fixed bug for network bodies using gzip compression 
- Added additional logging for unwinding native crashes 
- Fixed get obj folder swazzler issue, we changed our way of getting .so files

## 5.19.0
*May 24, 2023*
- Added support for Gradle 8

## 5.18.2
*May 11, 2023*
- Fixed a build time error related to `disableDependencyInjection` property.

## 5.18.1
*May 5, 2023*
- Fixed a build time error at build time for versions `5.17.1` and `5.18.0` in some specific scenarios and related with `com.squareup.okhttp3:okhttp` and `com.android.volley:volley` dependencies. 

## 5.18.0
*May 4, 2023*
- Core Web vitals capture from web views
- The encoding for extracted file names is enabled for builds that use Android Gradle Plugin 4.2.1 and below. This handles build issues caused by 3rd party plugins that minify classes during the build phase.

## 5.17.1
*Apr 27, 2023*
- Upgrade compileSDK to 33
- Improvements on our CPU usage and data consumption of our delivery layer 

## 5.16.0
*Apr 04, 2023*
- Added the name and message of the Exception if it is used on logError or logHandledException methods.
- Deprecated the current logPushNotification method and introduced a new one that fix  compatibility issues.

## 5.15.2
*Mar 21, 2023*
- Fix an error from `5.15.1` around identifying users. 
- Improvements in how data is collected after session ends, to avoid extending the app process duration.

## 5.15.1
*Mar 17, 2023*
- Improvements in how data is collected after session ends, to avoid extending the app process duration.

## 5.14.2
*Mar 7, 2023*
:::info Important
This version has a known issue with Braze. If you need to use this specific version, you can avoid the known issue with the following configuration in your `app/build.gradle` file:

```groovy
swazzler {
    instrumentFirebaseMessaging = false
}
```
:::

- Fix first activity repeated in the timeline
- Fixes a timing bug with ANR intervals where a check on monitorThreadLag was setting the start time to be in the beginning of an ANR interval.
- Ignore useNewDependencyInstaller property from the `swazzler` block. It's now used as the unique mechanism to inject dependencies, so it's safe to remove it from your `app/build.gradle` file


## 5.13.0
*Jan 27, 2023*
- Reduced ANRs being generated by EmbraceLogger class.
- Added feature to capture network body information. 

## 5.12.0
*Jan 19, 2023*
- Fixed an issue on ndk symbols.
- Fixed an ndk issue when building.

## 5.11.0
*Jan 11, 2023*
- Capture CPU number of cores
- Compress Proguard/R8 mapping files before uploading
- Added logHandledException method

## 5.10.0
*Dec 07, 2022*
- Automatically capture push notifications when the app is on foreground.
- Added the ability to manually log push notifications.
- Capture background activity
- Power save mode changes track added

## 5.9.4
*Dec 05, 2022*
- Added the ability to report the version of the Embrace React Native SDK being used.

## 5.9.3
*Nov 20, 2022*
* It fixes a Gradle issue on anyone running Gradle < 6.2

## 5.9.2
*Nov 28, 2022*
:::info Important
This version has a known issue with Gradle < 6.2
:::
* Improved Embrace startup time

## 5.9.1
*Nov 14, 2022*
* Fixed an internal exception when trying to access the jailbroken status of the device.

## 5.9.0
*Nov 03, 2022*
* Improve NDK service logs to work with strict and integration mode
* Improved the EmbraceSamples.verify() method
* Added Profile Installer to support Baseline Profiles.

## 5.8.0
*Oct 20, 2022*

* Fixed message for Ironsource and Moshi known issues.
* Automate disabling dependency injection when using EDM4U.
* Automate NDK Enabling for Unity and Native projects when value is default.
* Added integration mode to identify potential issues with the SDK integration.
* Rolled back the use of DefaultLifecycleObserver

## 5.7.1
*Oct 18, 2022*

* Fixed an ANR occurring in React Native projects using a custom Javascript bundle URL.

## 5.7.0
*Oct 03, 2022*

* New mechanism to auto-install Embrace dependencies. If you prefer to use the old mechanism, the new API can be disabled by setting the `useNewDependencyInstaller` property to false.

## 5.6.2
*Oct 03, 2022*

* Fixed a lost backward compatibility with previous Unity SDK versions.
* Fixed internal exception triggered when used androidX startup library in Unity builds.

## 5.6.1
*Sep 22, 2022*

:::info Important
This version has a known backward compatibility issue between the Unity SDK and the Android SDK
:::

* Removed capture_google attribute from the embrace-config.json file.

## 5.6.0
*Sep 20, 2022*

* Prevent disk i/o strict mode violations for session caching.
* Added a step to the automatic verification that validates that the SDK is receiving lifecycle events
* Increment network timeout when uploading large mapping files.

## 5.5.4
*Aug 30, 2022*

* Performance improvement: moved some disk I/O operations on startup to a worker thread.

## 5.5.3
*Aug 25, 2022*

* Fixed a logic bug in how the previous signal handler was called that prevented native tombstones from being captured by the Android OS.
* Fixed an issue that prevented the Swazzler to build on AGP versions greater or equal than 7.2.

## 5.5.2
*Aug 17, 2022*

* Fixes a bug in our gradle plugin where the build sometimes failed with duplicate resource files
* Fixes a minor bug where network intercepting triggers a log when it tries to intercept calls before Embrace is started.
* Improve NDK crash report quality when other signal handlers are installed after Embrace has initialized

## 5.5.1
*Aug 03, 2022*

* Fixes an issue where customers were having ClassNotFoundException: BuildEventsListenerRegistry for gradle versions < 6.1

## 5.5.0

*Aug 02, 2022*

:::warning Important
This version has a known issue with Gradle < 6.1
:::

* Added Hermes support
* Automatic integration: We added a method that does everything necessary to verify an integration in one call.
* Added a feature flag that controls beta features. This can be manually disabled from the configuration.


## 5.4.0

*Jul 18, 2022*

:::warning Important
This version has a known issue with Gradle < 6.1
:::

* Strict Mode was added to automatically capture serious local error logs to be sent as part of the session payload.
* The background ANRs are not displayed by default anymore. They should be manually enabled through remote configuration.
* Fixed an issue where the ANR duration was incorrectly reported with 1 second less.

## 5.3.0

*Jun 30, 2022*

:::warning Important
This version has a known issue with Gradle < 6.1
:::

* ASM bytecode transformation API is now the default api.

## 5.2.0

*Jun 10, 2022*

* Added support for symbols upload in Unity 2020, 2021, 2022. 
* Fixed symbols upload failure while searching .so files in a folder with another folder inside. 
* Added extra logging for NDK layer.
* Fixed bytecode transformation with ASM.
* Added improvement in order to skip swazzling if it's disabled for variant in old transform API.

## 5.1.0

*May 27, 2022*

* Added extra logging for NDK crash.
* Prevented NPE in native crash loading.
* Fixed an issue in gradle task registration that was not letting the symbols files to upload. 
* React Native - Fixed an issue with the set of the bundle ID for OTA releases like CodePush

## 5.0.4

*May 4, 2022*

* Fixed an issue where "Bytes in" and "Bytes out" where shown reversed when logging network requests manually.

## 5.0.3

*May 2, 2022*

* Fixed a race condition that could lead to exceptions during SDK initialization.

## 5.0.2

*April 22, 2022*

* Fixed an issue that prevented the SDK to use the traffic settings override for specific app versions.

## 5.0.1

*April 08, 2022*

* Added backward compatibility up to AGP 3.4.0
* Changed build ID resource injection to keep unchanged on non-minified builds.
* Migrated to task configuration avoidance API's for task registration
* Added improvements to SDK startup time
* Upgrade Gson to 2.9.0.

## 4.15.0

*Feb 07, 2022*

* Updated Kotlin to 1.4.32
* Fixed stacktrace capture for React Native and Unity log messages
* Added improvements to SDK startup time
* Added support for encoding file names when unpacking jars to prevent clashes in case-insensitive file systems

## 4.14.0

*Dec 21, 2021*

* Screenshots aren't captured by default. They should be manually requested by calling the proper methods of the SDK.

## 4.13.0

*Nov 19, 2021*

* Upgrade Gson to 2.8.9
* Added a new EmbraceCustomPathException to capture the proper custom path on connectivity errors

## 4.12.0

*Oct 29, 2021*

* Added swazzling class skipping support for AGP 4.2+
* Added swazzling rules generation support for AGP 4.2+
* Fix an issue with ANRs caused while capturing network calls in the session

## 4.11.3

*Oct 18, 2021*

* Fix an issue with missing network calls in the session

## 4.11.2

*Oct 5, 2021*

* Added option to specify API key as an environment variable instead of in the config file
* Cache device-related values that could take a long time to fetch on certain device types, to prevent ANRs.
* Rolled back swazzling class skipping support from 4.11.0, which could cause certain network calls and taps to not be captured.
* Removed ANDROID_ID as an input to the hashing function used create the device identifier.

## 4.11.0

*Sep 1, 2021*

:::warning Important
This version has known issues and should not be used
:::

* Fixed a race-condition issue with the NDK crash capture that could lead to incomplete stacktrace capture
* Added nullability decorators to improve usage from Kotlin
* Added swazzling class skipping support for AGP 4.2+


## 4.10.0

*Aug 16, 2021*

* Added support for custom Unity symbols archive name
* Improved handling of JAR files that could not be swazzled 


## 4.9.3

*July 29, 2021*

* Fixed issue that could cause an ANR when capturing memory warnings.
* Fixed issue that could cause SDK to start during an app cold start even when remote config should have disabled it.

## 4.9.2

*July 15, 2021*

* Fixed compatibility issue with androidx.lifecycle 2.3.0+ when not starting the SDK on the main thread.

## 4.9.1

*July 13, 2021*

* Fixed issue that could prevent capture of OkHTTP- and Volley-based network calls for certain configurations.
* Prevent multiple attempts to add Embrace SDK dependency for certain configurations.  

## 4.9.0

*July 1, 2021*

* Fixed how SDK dependencies are injected, which could cause build errors for certain Gradle configurations.
* Handle case where a project provides the same JAR twice to Gradle our Gradle transformer.
* Fixed issue where a class could not be processed by our Gradle transformer when it contains a reference to an optional dependency that is not present in the app.

## 4.8.10

*May 27, 2021*

* Fixed issue with NDK crash stack trace parsing that could fail for certain stack traces
* Track JNI thread attachment for Unity

## 4.8.9

*May 25, 2021*

* Removed all dependencies on JCenter
* Added support for symbol upload for Unity 2020 non-exported apps

## 4.8.8

*May 17, 2021*

* Fixed an issue with registering build tasks for React Native apps.

## 4.8.7

*May 11, 2021*

* Fixed an issue where HTTP network calls made using the Java library could get disrupted during capture. This issue did not affect HTTPS calls or those made with Volley or OkHttp.

## 4.8.6

*May 10, 2021*

* Fixed a compatibility issue with gradle 7.x.
* Added support for automatic upload of NDK symbols for unexported Unity projects.

## 4.8.5

*May 6, 2021*

* Fixed issue with bytes-in/-out values for manually recorded network calls on Unity.
* Added exception message to manually-recorded network calls on Unity for network calls that had an error.

## 4.8.4

*May 4, 2021*

* Added more flexible support for disabling swazzling based on variant.

## 4.8.3

*April 30, 2021*

* Added support for Unity unhandled exceptions
* Fixed issue with the upload of NDK symbols for Unity 2018 and injection of references to the symbols into the SDK

## 4.8.2

*April 22, 2021*

* Moved from JCenter to Maven Central

## 4.8.0

*April 9, 2021*

* Added method to allow overriding of the configured app ID to be overridden at runtime.
* Modified Gradle plugin to use original JARs when no changes were needed to them. This addresses an issue with the `kotlin-reflect` module for Kotlin 1.4.10 and newer.
* Improved Gradle plugin dependency injection approach to address rare race condition.
* Fixed issue with parsing of config file that could cause changes to it to only be picked up on clean builds.
* Fixed JSON parsing issue that could cause NDK crashes in Unity apps to be corrupted

## 4.7.1

*March 18, 2021*

* Modified capture_request_content_length setting to also affect requests made with OkHTTP
* Fixed issue that would remove Content-Length and Content-Encoding from certain captured requests
* Send startup moment even if the app is in the foreground when the SDK is started
* Support manual network request capture in Unity apps
* Build will not complete if a corrupted Embrace configuration file is used and improved error output to simplify debugging of config issue

## 4.7.0

*February 22, 2021*

* Added limits for number of logs per session: 250 error, 100 warning, 100 info (contact support to have these increased for your app).
* Limit how many breadcrumbs are captured for a session at capture time rather than at the completion of a session. This limits the memory used to store breadcrumbs for a session.
* Improved accuracy of startup moment timing by moving the start of the timer to earlier in the SDK startup process.
* Fixed compatibility issues with AGP 4.1.x.
* Added setting to allow disabling of automatic injection of SDK dependencies by the Gradle plugin. This is only needed for certain Unity build configurations.

## 4.6.7

*February 18, 2021*

* Reverted relaxed AndroidX version requirements introduced in 4.6.6. since AndroidX 2.3.0+ caused issues.

## 4.6.6

*February 10, 2021*

:::warning Important
This version has known issues and should not be used
:::

* Relaxed version requirements for AndroidX components

## 4.6.5

*February 2, 2021*

* Improved SDK startup time.
* Added Gradle task dependencies to support a single flavor anchoring tests for other variants.


## 4.6.4

*January 22, 2021*

* Fixed issue that could cause session message to not be sent when the device had been in airplane mode and NDK crash support is enabled.


## 4.6.3

*January 14, 2021*

* Fixed device ID generation to allow it to be used in automated tests.


## 4.6.2

*January 12, 2021*

* Added configuration setting to disable capture of native network requests.


## 4.6.1

*January 11, 2021*

* Added support for configuration files for product flavors.
* Fixed bug that could cause a crash when network request size capture was enabled for native requests.


## 4.6.0

*December 14, 2020*

* Added support for Unity applications.
* Added debug logging mode.


## 4.5.6

*October 21, 2020*

* Fixed dependency resolution issues with AGP 4.1.0+.

## 4.5.5

*October 1, 2020*

* Fixed capture of ANR stacktraces for Android 7 and earlier.
* Fixed Gradle plugin compatibility with AGP 4.1.0-rc1.

## 4.5.4

*September 17, 2020*

* Added options to disable capture of web views and web view query parameters.
* Truncate ANR stack traces to 100 lines.

## 4.5.3

*September 9, 2020*

* Fixed issue with setting user identity on clean installs (introduced in 4.5.2)

## 4.5.2

*Use 4.5.3 since it contains a bugfix for a critical bug introduced in this release*

*September 2, 2020*

* Capture additional metrics
* Capture user info for NDK crashes
* Enable ANR stacktrace capture by default for all users
* Fixed issue with ANR stacktrace capture that could attribute an ANR to the session after it occurred
* Fixed issue with Proguard/R8 upload that could prevent upload of mapping files for flavors 

## 4.5.1

*August 10, 2020*

* Added build option to disable swazzling of specific classes and/or jars
* Improved performance of serializing sessions with large numbers of recorded network calls

## 4.5.0
*July 24, 2020*

* Added configuration to disable swazzling for specific build types
* Fixed bug introduced in 4.4.1 that prevented upload of Proguard files 

## 4.4.1
*July 14, 2020*

* Fixed bug where cached sessions were not sent if NDK crash support was not enabled
* Fixed bug where only the first 3 ANR intervals were captured

## 4.4.0
*July 2, 2020*

* Added NDK crash reporting

## 4.2.10
*June 18, 2020*

* Fixed a concurrency bug that could trigger when making network calls shortly after startup
* Added nullability annotations to improve Kotlin integration experience

## 4.2.9
*May 26, 2020*

* Fixed an issue with capturing network request and response sizes for gzipped native requests when the content type header was lowercase.

## 4.2.8
*May 15, 2020*

* Added option to disable capture of app disk usage. This could be excessively slow on older devices with large numbers of files in the app directory.
* Disabled capturing network request and response sizes for native requests by default. 

## 4.2.7
*April 27, 2020*

- Migrated to AndroidX
- Fixed issue with Proguard/R8 uploads with AGP 3.6.x
- Added flavor-based SDK configuration option
- Added check for transitive network library (okhttp and Volley) dependencies
- Added configuration options to force inclusion of transitive network dependencies

## 4.2.5
*April 15, 2020*

- New config property `sessions.disabled_url_patterns` filters network requests entirely from session
- Added more logging around which embrace-config.json file is used and which paths were scanned

## 4.2.4
*April 8, 2020*

- Added option to send session end message asynchronously
- Only check the app's disk usage once during a session. This operation could take too long on certain devices for apps with large numbers of files to be done repeatedly
- Fixed bug with reporting of network switches when the device had no connectivity

## 4.2.2
*March 31, 2020*

- Fixed bug where temporary session properties would only be cleared on cold start. Now they are cleared at the end of each session
- Show all custom configuration settings in the console log at startup
- Fixed a bug that could prevent network, view, and tap captures from working when multiple variants were built with a single Gradle command
- Fixed a bug where incorrect warning logs about deprecated settings could be shown

## 4.2.1
*March 12, 2020*

- Fixed issue that prevented removal of session properties

## 4.2.0
*March 11, 2020*

- Added ability to add properties to sessions
- Capture additional thread info at the time of a crash
- Fixed bug that caused `clearAllUserPersonas` to not clear all user personas
- Fixed network capture issue that was causing network calls with IP addresses to be dropped

## 4.1.0
*March 3, 2020*

- Added support to capture fragments manually 
- Removed incorrect build-time logs that referenced the usage of deprecated features 
- Added validations to handle usage of API-level-restricted functions 

## 4.0.1
*January 16, 2020*

- Fixed bug in Embrace Gradle plugin that could lead to SDK config not being properly read when building an app bundle

## 4.0.0
*January 14, 2020*

- Added a more flexible configuration approach that simplifies how custom configurations can be set up for different build variants 
- Added user info association that is set during a session even if it was cleared before the session ended 
- Added optional argument to `endSession` method to clear user info when ending the session
- Added ability to ignore non-serializable log and event properties
- Fixed crash caused by trying to capture null headers from network requests.
- Fixed a network path override issue when network requests ended in connection errors.
- Improved sourcemap upload task for React Native

##  3.7.2
*November 7, 2019*

- Added a config setting to allow disabling of gunzipping of requests made with the native Android network request framework. By default the SDK handles the gunzipping to allow response size to be computed, but this can interfere with certain services.

##  3.7.1
*October 22, 2019*

- Improves capture of React Native crashes. 

## 3.7.0 
*October 21, 2019*

- Added option to disable capture of tap coordinates.
- Added support for React Native crashes.
- Added support for improved React Native log stack traces.
- Added support for upload of React Native source maps to the upload script.
- Fixed bug that could cause failure in reading the swazzling cache.

## 3.6.2 
*September 8, 2019*

- Fixed issue that prevented uploading of mapping info when using r8

##  3.6.1
*September 13, 2019*

- Added option to allow startup screenshots to be disabled

##  3.6.0
*September 10, 2019*

- Removed network requests made when setting user info
- Fixed bug that could cause an exception when using other SDKs that monitor network traffic
- Fixed bug that prevented connection error types from being correctly reported

##  3.5.1
*August 12, 2019*

- Handles attempt to set trace ID before SDK initialization
- Re-added removed `logNetworkCall` and `logNetworkClientError` methods

##  3.5.0
*August 9, 2019*

- We added support for passing a Throwable to logError. If you pass a Throwable, the stack trace from the Throwable will be used instead of the stack trace from where the logError method was called.
- Log messages are now limited to 128 characters. Contact us if you need longer log messages.
- We moved more of the work done for logInfo/Warning/Error calls to a worker thread to prevent the logging calls from blocking the threads they are called from.
- We set the timestamp for log messages immediately after the log method is called rather than in a worker thread. This should slightly improve the accuracy of the log timestamps.
- We reduced aggressiveness of config network requests. If you were offline and the SDK had never received a config, it would keep trying to get one more often than it should have.
- We added a method to get the Embrace-assigned device ID from the SDK.
- We now allow trace IDs to be captured from network requests and sent to Embrace.
- Gracefully handle multiple attempts to start the SDK
- Switched from using api to implementation for dependencies
- Added missing public event-related methods to match the iOS SDK

##  3.4.1
*July 22, 2019*

- Fixed typos in methods to set bytes in and out for manually-captured requests

##  3.4.0 
*July 22, 2019*

- Added support for manual capture of network requests. The SDK is capable of automatically capturing the majority of REST network calls made by applications, but this new method allows recording of network requests that are not automatically captured, such as gRPC requests.
