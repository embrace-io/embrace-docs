---
title: React Native SDK Changelog
description: Changelog for the React Native Embrace SDK
sidebar_position: 4

---
# React Native SDK Changelog
## 4.1.2
_Jun 11, 2024_
* Fixed a bug related to upload sourcemap in RN 0.71+.
* Updated iOS script to upload sourcemap. Please [update your implementation](/react-native/integration/upload-symbol-files/#uploading-source-maps)
* Updated Android native Embrace SDK dependency to 6.8.2.
## 4.1.1
_April 15, 2024_
* Fix a minor bug related to matching bundle.js with its corresponding source map.
* Updated iOS native Embrace SDK dependency to 5.25.1.
## 4.1.0
_March 8, 2024_
* [New Feature Spans](/react-native/features/tracing/)
* Updated iOS native Embrace SDK dependency to 5.25.0.
## 4.0.4
_March 7, 2024_
* Fix a bug that prevent we loggin Screens
## 4.0.3
_March 6, 2024_
* Improve performance.
* Updated Android native Embrace SDK dependency to 6.4.0.
## 4.0.1
_January 25, 2024_
* [The React Native SDK is now open source! Check it out and let us know what you think!](https://github.com/embrace-io/embrace-react-native-sdk)
* Before updating please make sure you review the [upgrade guide](/react-native/upgrading-to-4/)
  - Please note we've changed the package so you will need to re-install the Embrace SDK - [see details here](/react-native/integration/add-embrace-sdk/) 
* Updated Android native Embrace SDK dependency to 6.2.1.
* Updated iOS native Embrace SDK dependency to 5.24.3.
## 3.16.0
_December 11, 2023_
* Updated Android native Embrace SDK dependency to 5.25.1.
* Updated iOS native Embrace SDK dependency to 5.24.0.
## 3.15.0
_September 28, 2023_
* New method to [get the current session id](/react-native/features/current-session-id-api/)
* New method to [get the last run end state](/react-native/features/last-run-end-state/) of a session
* Updated Android native Embrace SDK dependency to 5.24.0.
* Updated iOS native Embrace SDK dependency to 5.23.1.
## 3.14.0
_Aug 8, 2023_
* Reduce severity from Warn to Info (log) in the success message in the React Navigation Tracker (v0.2.14).
* Fix a bug in React Navigation Tracker (v0.2.14) if the plugin was started with a null Navigation reference. 
_Jul 26, 2023_
* Fixed Android install script. Now it supports new projects created with RN 0.71+.
* Changed the way we add swazzler dependency, now it will grab the swazzler version from a file. 
**You need to update it manually. Please visit [add embrace sdk](/react-native/integration/add-embrace-sdk/?rn-platform=android&platform=android#manually) for more information**
* Fix Redux Action Tracker, it was catching any error produced in reducers
* Updated Android native Embrace SDK dependency to 5.22.0.
* Updated iOS native Embrace SDK dependency to 5.21.1.
## 3.13.1
_Jun 21, 2023_
* Fixed iOS install script. Now it supports new projects created with RN 0.71+.
* Updated Android native Embrace SDK dependency to 5.20.0.
* Updated iOS native Embrace SDK dependency to 5.20.1.
## 3.13.0
_May 30, 2023_
* Fix a bug when the app crash with a Javascript error.
* Update Android SDK to 5.19.0
* Update iOS SDK to 5.19.4
## 3.12.1
_May 10, 2023_
* Added React Native Screen Orientation Tracker
## 3.12.0
_May 4, 2023_
* Integration: The script now says which steps it couldn't finish and shows the url of the documentation where it explains how to do that step manually.
* Added the ability to capture core web vitals for web view experiences in your app.
* Update Android SDK to 5.18.0
* Update iOS SDK to 5.19.2
## 3.11.0
_April 5, 2023_
* Update the install script to recognize native folders instead of a fixed path
* Update Android SDK to 5.16.0
* Update iOS SDK to 5.17.1
## 3.10.9
_March 29, 2023_

:::warning Important
This version has known issues and should not be used
:::

* Added two new scripts, one to install the dependencies for Androd and the other for iOS

## 3.10.8
_March 8, 2023_
* Added React Native Navigation Screen Tracker version 0.2.7
* Update Android SDK to 5.14.2
* Update iOS SDK to 5.16.2

## 3.10.7
_February 26, 2023_
* Fixed a small bug on the React Native Screen Tracker when the navigation's reference is null. New version 0.2.4

_February 16, 2023_
* Added React Redux's Actions Tracker version 0.2.2
Note: It requires at least Android SDK 5.13.0


## 3.10.6 

_December 19, 2022_
* Added React Navigation Screen Tracker version 0.1.1
* Fixed a small bug when users use a recent React Native SDK with an old Android SDK
## 3.10.5

_December 16, 2022_

* Fixed a small bug when users use a recent React Native SDK with an old Android SDK

## 3.10.0

_October 09, 2022_

* Added Axios interceptor to force log network calls
* Now Embrace will track errors in DEV mode
* Upgraded to latest Android SDK version
* Upgraded to latest iOS SDK version

## 3.9.21

_August 29, 2022_

* Fixed setup script.
* Upgraded to latest Android SDK version
* Upgraded to latest iOS SDK version
## 3.9.2

_June 9, 2022_

* Added `getDeviceId` to get the Embrace ID
## 3.9.1

_April 8, 2022_

* Added a new API call to log network calls manually

## 3.8.4

_February 8, 2022_

* Fixed issue where you needed to specify a moment identifier when starting a moment with properties
* Fixed issue where stack traces were not captured for error logs on Android
* Upgraded to latest Android SDK version

## 3.8.3

_January 20, 2022_

* Removed dependency on JCenter for Android
* Upgraded to latest Android SDK version

## 3.8.1

_September 9, 2021_

* Added prefix to logs generated by unhandled promise exceptions
* Set minimum iOS version to 9.0

## 3.8.0

_June 17, 2021_

* Updated Android native Embrace SDK dependency to 4.8.10

## 3.7.1

_April 23, 2021_

* Updated Android native Embrace SDK dependency to 4.8.2

:::warning Important
Please follow the [instructions in the Embrace Android SDK changelog](../android/changelog.md#482) to fetch the SDK from Maven Central instead of JCenter.
:::

## 3.6.4

_February 12, 2021_

* Make SDK compatible with Xcode 12.

## 3.6.3

_December 17, 2020_

* Update function signatures to use typed object instead of Map for properties. 

## 3.6.2

_October 2, 2020_

* Fix warning raised when checking for CodePush integration.

## 3.6.1

_August 13, 2020_

* Upgrades default Embrace Android SDK to 4.5.1
* Fixes type mismatch issue when calling `logMessage` method for warning logs on Android

:::warning Important
To use this version on Android, you will need to make sure the `io.embrace:embrace-swazzler` dependency is set to at least 4.5.1 in your `build.gradle` file.
:::

## 3.5.0

_August 3, 2020_

* Allow passing properties into the `logHandledError` method.
* Fix issue with Gradle file and specifying Java 8.

## 3.4.0

_May 20, 2020_

* Exposes setJavaScriptBundlePath function to set the path to the downloaded JS bundle from JS code
* Added methods to get parity with the native SDKs
  * setUserAsPayer
  * clearUserAsPayer
  * endSession
  * endAppStartup (with properties)
  * endMoment (with properties)

## 3.3.0

_April 9, 2020_

* Adds setup script to help users integrate more easily on new projects
* After installing the SDK, run node node_modules/react-native-embrace/dist/scripts/setup/run.js to run the setup script

## 3.2.0

_April 7, 2020_

* Adds support for logging handled exceptions
  **Note: to utilize this, users will need to update their native dependencies. On iOS please update to at least v4.1.8 and on Android, please update to v4.2.2**

## 3.1.0

_March 30, 2020_

* Add support for session properties
* Add `clearAllUserPersonas` method to match native SDKs

## 3.0.1

_March 13, 2020_

* Reduces bloat by removing unnecessary dependencies

## 3.0.0

_March 6, 2020_

* Added support for custom views; users can define the start of a view by calling `startView('myView')` and end it by calling `endView('myView')`
  **Note: to utilize this, users will need to update their native dependencies. On iOS please update to v4.1.6 and on Android, please update to v4.1.0**

## 2.1.1

_February 28, 2020_

* Fixed a small bug with the `startMoment` function when used in conjunction with properties

## 2.1.0

_February 12, 2020_

* Added support for Auto Link

## 2.0.1

_December 24, 2019_

* Added a fix for CodePush integration on Android. This was addressed in the native Android SDK 4.0.0-beta7 and Swazzler 4.0.0-beta7. Please update your native SDK on Android

## 2.0.0

_December 18, 2019_

* Added support for JS crashes
