---
title: "Android SDK Changelog"
description: Changelog for the Android Embrace SDK
weight: 4
---

# Android SDK Changelog

{{< hint warning >}}
With the shutdown of JCenter, we have migrated our SDK and Gradle plugin to Maven Central. Release 4.8.2 is the first version hosted on Maven Central.

If you do not already have `mavenCentral()` in your list of project repositories, please add it to your `build.gradle` file.

```
buildscript {
    ...
    repositories {
        ...
        mavenCentral()  # <=== add this
    }
}

allprojects {
    ...
    repositories {
        ...
        mavenCentral()  # <=== add this
    }
}

```

As part of this migration, Maven Central's hosting requirements necessitated the change of the artifacts' group ID from `embrace-io` to `io.embrace`. Thus, it is necessary to change the Gradle plugin dependency from

```
classpath 'embrace-io:embrace-swazzler:4.7.1'
```

to

```
classpath 'io.embrace:embrace-swazzler:4.8.2'
```

Also, any instances of the SDK dependencies being manually applied must be changed from

```
    implementation 'embrace-io:embrace-android-sdk:4.7.1'
    implementation 'embrace-io:embrace-android-okhttp3:4.7.1'
    implementation 'embrace-io:embrace-android-volley:4.7.1'
```

to

```
    implementation 'io.embrace:embrace-android-sdk:4.8.2'
    implementation 'io.embrace:embrace-android-okhttp3:4.8.2'
    implementation 'io.embrace:embrace-android-volley:4.8.2'

```
{{< /hint >}}

## 4.8.5

*May 6, 2021*

* Fixed issue with bytes-in/-out values for manually recorded network calls on Unity
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

{{< hint warning >}}
This version has known issues and should not be used
{{< /hint >}}

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

* Fixed issue with setting user ID, email, and username on clean installs (introduced in 4.5.2)


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
