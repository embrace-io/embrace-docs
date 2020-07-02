---
title: "Android SDK Changelog"
weight: 13
---

# Android SDK Changelog

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
- Added ability to ignore non-serializeable log and event properties
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