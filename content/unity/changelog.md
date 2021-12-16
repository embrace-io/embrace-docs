---
title: "Unity SDK Changelog"
description: Changelog for the Unity Embrace SDK
weight: 4
---

# Unity SDK Changelog

## 1.3.4
*December 01, 2021*

* Provides validation for the config ID and Token Key, For both the Embrace Post Build Processor and the customer-facing editor
* Upgrades native Android SDK to 4.13.0 for builds using the external dependency manager.

## 1.3.3
*November 24, 2021*

* Upgrades native iOS SDK to 5.7.0
* Updated Embrace Android configurations to allow enable_native_monitoring as an option in the Embrace Editor window. Includes a CustomAndroidConfigurations JSON file that allows overriding of the editor configurations.
* Improved namespaces and stability updates.

## 1.3.2
*October 18, 2021*

* Added editor windows to improve the SDK experience. 
* Enabled users to configure both Android and iOS at the same time using the new Embrace editor window. 
* Welcome window informs users of important changes, new features or warns them of potential issues.

## 1.3.1
*September 17, 2021*

* Fixed issue with iOS symbol upload

## 1.3.0
*September 17, 2021*

* Improved how configuration files are handled for both IOS and Android.

## 1.2.13
*August 9, 2021*

* Fixed issue where all dSYM files would not be uploaded for 2019+ Unity projects
* Enforce execution permission on scripts used in upload of dSYM files when they are copied to the Xcode project

## 1.2.12
*July 29, 2021*

* Made initialization more robust, removing initialization steps from Awake method.
* Disable SDK gracefully on unsupported platforms.
* Upgraded to the latest Android SDK version.

## 1.2.11
*July 20, 2021*

* Expanded search path in dSYM upload script to automatically include location of dSYMs for all supported Unity versions and configurations.

## 1.2.10
*July 15, 2021*

* Updated to unity-resolver config to use latest version of Android SDK, which addresses a compatibility issue with androidx.lifecycle v.2.3.0+
* Automatically set dSYM configuration for UnityFramework target.

## 1.2.9
*July 13, 2021*

* Removed references to Unity source in iOS project.

## 1.2.8
*June 15, 2021*

* Include the latest iOS 5.5.2 SDK

## 1.2.7
*June 14, 2021*

* Ensure that the NDK is always referenced correctly

## 1.2.6
*May 27, 2021*

* Update android dependency to 4.8.10
* Ensure JNI is always attached to current thread before usage

## 1.2.5
*May 17, 2021*

* Update android dependency to 4.8.7

## 1.2.4
*May 17, 2021*

* Fix quotes in iOS dSYM build phase to handle path spaces
* Update run.sh to support iOS dSYM search depth

## 1.2.3
*May 6, 2021*

* Fix iOS timestamps for manually logged network requests
* Support for latest Android sdk

## 1.2.2
*May 4, 2021*

* Use correct group id in external depedency xml

## 1.2.1
*May 4, 2021*

* Update Android artifact version in external depedency xml

## 1.2
*April 30, 2021*

* Support for unhandled exception reporting

## 1.1
*March 18, 2021*

* Add method to enable debug logging for Android platform
* Add method to manually log a network request
* Fix exception when logging warning messages on Android platform

## 1.0.14
*March 9, 2021*

* Adopt 5.3.7 iOS native build
* Fix typo in iOS info log severity value

## 1.0.13
*Feb 22, 2021*

* Support for the External Dependency Manager

## 1.0.12
*Feb 8, 2021*

* Adopt 5.3.6 iOS native build

## 1.0.11
*Feb 5, 2021*

* Adopt 5.3.5 iOS native build

## 1.0.10
*Jan 29, 2021*

* Adopt 5.3.4 iOS native build

## 1.0.9
*Jan 26, 2021*

* Adopt 5.3.3 iOS native build

## 1.0.8
*Jan 18, 2021*

* Adopt 5.3.2 iOS native build

## 1.0.7
*Jan 14, 2021*

* Updated post-build processing to support pre 2019.3 project configuration on Android

## 1.0.6
*Jan 11, 2021*

* Updated post-build processing to support pre 2019.3 project configuration on iOS

## 1.0.5
*Dec 20, 2020*

* First public release of the Embrace Unity SDK
