---
title: "Unity SDK Changelog"
description: Changelog for the Unity Embrace SDK
weight: 4
---

# Unity SDK Changelog

## 1.8.1
*November 9, 2022*

* Excluded all Embrace assemblies when building for platforms other than iOS and Android.
* Disabled Embrace IL weaver when building for platforms other than iOS and Android.

## 1.8.0
*November 3, 2022*

* Added support for selecting environment configurations at build time by setting the `EMBRACE_ENVIRONMENTS_NAME` or `EMBRACE_ENVIRONMENTS_INDEX` environment variable
* Updated Android SDK to version 5.9.0
* Updated iOS SDK to version 5.12.1
    - Improved reliability of exception logs on iOS when app is immediately terminated after the exception
    - Fixed app freezing when encountering a native crash
    - Fixed some dSYMs failing to upload

## 1.7.6
*October 4, 2022*

> This version of the Unity SDK introduced a bug in the iOS crash handler that can cause the app to freeze when encountering a native crash. Please update to the latest version.

* Updated Android SDK to version 5.7.0
* Updated iOS SDK to version 5.10.0
* Fixed issue with null Embrace data path which occurs when the same version of the SDK is re-installed.

## 1.7.5
*September 26, 2022*

* Fixed a compatibility issue with Embrace Android SDK version 5.6.0 and higher.

## 1.7.4
*September 26, 2022*

> This version includes a compatibility issue with Embrace Android SDK versions 5.6.0 and greater. Please update to Unity SDK version 1.7.5 or later.

* Fixed an issue that could cause the Embrace SDK to fail to load the active configuration in the editor.
* Fixed the list of available configurations in the settings window getting out of sync with the configurtations available in the project.

## 1.7.3
*September 22, 2022*

> This version includes a compatibility issue with Embrace Android SDK versions 5.6.0 and greater. Please update to Unity SDK version 1.7.5 or later.

* Updated Android SDK to version 5.6.1
* Updated iOS SDK to version 5.9.3
* Fixed a UI bug with the Getting Started and Embrace Settings windows that occured when the Environments object was deleted from embrace data directory manually.

## 1.7.2
*September 15, 2022*

* Resolved a dependency conflict between the Embrace SDK and Unity's Burst package.
* Fixed a UI bug in the Embrace Settings window that occurred when the SDK was reset.

## 1.7.1
*September 14, 2022*

* Removed unnecessary dependency on Unity's default version control package introduced in 1.7.0

## 1.7.0
*September 12, 2022*

* Added support for automatically logging web requests made via UnityWebRequest and HttpClient (BETA)
* Updated Android SDK to 5.5.4

## 1.6.0
*August 29, 2022*

* Updated iOS SDK to 5.9.1
* Updated Android SDK Version 5.5.3
* Bugfix for swapped bytesin/bytesout values in Android LogNetworkRequest
* Embrace SDK configuration scriptable objects moved to project Assets/Embrace folder.
* Fixed issue with dSYM upload scripts sometimes not being executable
* Settings window now features full list of configuration options.
* Bugfix for UnhandledExceptionRateLimiter

## 1.5.10
*July 07, 2022*

* Fixed breaking change in Embrace class
* Improved comments

## 1.5.9
*July 01, 2022*

* Upgrades native iOS SDK to 5.9.0

## 1.5.8
*June 17, 2022*

* Upgrades native iOS SDK to 5.8.1

## 1.5.7
*June 16, 2022*

* Added support for symbols upload in Unity 2020.
* Removed UGUI package from being included in our SDK's unitypackage.

## 1.5.6
*June 15, 2022*

* Fixed compatibility issue with Unity versions prior to 2020.2 introduced in v1.5.5.

## 1.5.5
*June 10, 2022*

> This version introduced a compatibility issue with Unity versions before 2020.2. Please upgrade to version 1.5.6.

* Added Multi-Threaded Logging toggle to Main Settings editor window.
* Added option to disable Embrace Unity SDK logs.
* Upgraded native iOS SDK to 5.8.0
* Fixes a potential crash in the Android Provider where successful attachment to the Java VM was not being checked.

## 1.5.4
*June 06, 2022*

* Fixed issue with JSON conversion for log properties.
* Upgrades native iOS SDK to 5.7.8

## 1.5.3
*May 27, 2022*

* Upgrades native Android SDK to 5.1.0 for builds using the external dependency manager.
* Upgrades Embrace Swazzler to 5.1.0 to allow NDK stacktrace collection.

## 1.5.2
*May 16, 2022*

* Upgrades native Android SDK to 5.1.0-beta02 for builds using the external dependency manager.


## 1.5.1
*May 12, 2022*

* Upgrades native Android SDK to 5.1.0 for builds using the external dependency manager.
* Upgrades Embrace Swazzler to 5.1.0 to allow NDK stacktrace collection.

## 1.5.0
*May 05, 2022*

* Added Scoped Registries to allow users to manage, download and install packages using the Package Manager.

## 1.4.2
*May 04, 2022*

* Upgrades native Android SDK to 5.0.4 for builds using the external dependency manager.

## 1.4.1

*April 22, 2022*

* Upgrades native Android SDK to 5.0.2 for builds using the external dependency manager.

## 1.4.0
*March 15, 2022*

* Updated SDK to use the official package management system for Unity. These changes require you to delete your previous version of our SDK before importing the new update.
* Upgrades native iOS SDK to 5.7.6

## 1.3.9
*February 28, 2022*

* Added demos to help users get started using the Embrace SDK.
* Fixed serialization bug that affected config environments ability to save.

## 1.3.8
*February 11, 2022*

* Fixes TimeUtil main thread bug.
* Updated android config settings.
* Upgrades native Android SDK to 4.15.0 for builds using the external dependency manager.

## 1.3.7
*January 24, 2022*

* Introduces a Settings Window which exposes new features and settings using an editor window.
* Allows users to create and manage environments which enables you to handle configurations based on your desired environment.
* Added A text field that allows users to add Android settings to the embrace-config.json file that are not currently provided by the Unity SDK editor windows.

## 1.3.6
*January 03, 2022*

* Updated native SDK's to change default behavior for screenshot capturing.

## 1.3.5
*December 21, 2021*

* Upgrades native iOS SDK to 5.7.1
* Upgrades native Android SDK to 4.14.0 for builds using the external dependency manager

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
