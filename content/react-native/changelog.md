---
title: "React Native SDK Changelog"
description: Changelog for the React Native Embrace SDK
weight: 3
---

# React Native SDK Changelog

## 3.6.1
*August 13, 2020*

- Upgrades default Embrace Android SDK to 4.5.1
- Fixes type mismatch issue when calling `logMessage` method for warning logs on Android

{{< hint warning >}}

To use this version on Android, you will need to make sure the `embrace-io:embrace-android-sdk`
dependency is set to at least 4.5.1 in your `build.gradle` file.

{{< /hint >}}


## 3.5.0
*August 3, 2020*

- Allow passing properties into the `logHandledError` method.
- Fix issue with gradle file and specifying Java 8.

##  3.4.0
*May 20, 2020*

- Exposes setJavaScriptBundlePath function to set the path to the downloaded JS bundle from JS code
- Added methods to get parity with the native SDKs
    - setUserAsPayer
    - clearUserAsPayer
    - endSession
    - endAppStartup (with properties)
    - endMoment (with properties)


##  3.3.0
*April 9, 2020*

- Adds setup script to help users integrate more easily on new projects
- After installing the SDK, run node node_modules/react-native-embrace/dist/scripts/setup/run.js to run the setup script

##  3.2.0
*April 7, 2020*

- Adds support for logging handled exceptions
**Note: to utilize this, users will need to update their native dependencies. On iOS please update to at least v4.1.8 and on Android, please update to v4.2.2** 

##  3.1.0
*March 30, 2020*

- Add support for session properties
- Add `clearAllUserPersonas` method to match native SDKs

##  3.0.1
*March 13, 2020*

- Reduces bloat by removing unnecessary dependencies

##  3.0.0
*March 6, 2020*

- Added support for custom views; users can define the start of a view by calling `startView('myView')` and end it by calling `endView('myView')` 
**Note: to utilize this, users will need to update their native dependencies. On iOS please update to v4.1.6 and on Android, please update to v4.1.0** 

##  2.1.1
*February 28, 2020*

- Fixed a small bug with the `startMoment` function when used in conjunction with properties 

##  2.1.0
*February 12, 2020*

- Added support for Auto Link

##  2.0.1
*December 24, 2019*

- Added a fix for CodePush integration on Android. This was addressed in the native Android SDK 4.0.0-beta7 and Swazzler 4.0.0-beta7. Please update your native SDK on Android 

## 2.0.0
*December 18, 2019*

- Added support for JS crashes
