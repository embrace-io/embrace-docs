---
title: Flutter SDK Changelog
description: Changelog for the Flutter Embrace SDK
sidebar_position: 4
---

# Flutter SDK Changelog

# 4.2.0

*Jul 25, 2025*
* Updated Embrace Android SDK to 7.7.0
* Fixed w3cTraceparent header not being set in Dio/HttpClient requests when network spans forwarding enabled

# 4.1.0

*Apr 24, 2025*
* Updated Embrace Android SDK to 7.3.0
* Updated Embrace iOS SDK to 6.8.5

# 4.0.1

*Apr 1, 2025*
* Fixed crash in Dio interceptors when SDK is disabled but interceptor is applied

# 4.0.0

*Feb 19, 2025*
* Updated Embrace Android SDK to 7.1.0
* Updated Embrace iOS SDK to 6.8.1
* Added ability to access trace ID for spans

# 3.2.0

*Jan 3, 2025*
* Updated Embrace Android SDK to 6.14.0.

# 3.1.0

*Oct 28, 2024*
* Updated Embrace iOS SDK to 6.5.0.

# 3.0.1

*Oct 7, 2024*
* Updated Embrace iOS SDK to 6.4.2.

# 3.0.0

*Sep 17, 2024*
* Updated Embrace Android SDK to 6.13.0.
* Updated Embrace iOS SDK to 6.4.0.
* Added Tracing API for capturing spans/events

## 2.0.0

*Mar 13, 2024*
* Removed deprecated methods.
* Added support for AGP 8.
* Updated Embrace Android SDK to 6.4.0. Updated the minimum Android version supported to 21.
* Updated Embrace iOS SDK to 5.25.0.

## 1.5.0

*Oct 2, 2023*
- Added getCurrentSessionId() method to get the ID of the current session.
- Renamed some functions to improve consistency between the Embrace SDKs (old names have been deprecated).
- Updated Embrace Android SDK to 5.24.0
- Updated Embrace iOS SDK to 5.23.1

## 1.4.0

*Jul 20, 2023*
- Added logHandledDartError() method to record exceptions that have been handled.
- Updated Embrace Android SDK to 5.22.0
- Updated Embrace iOS SDK to 5.21.1

## 1.3.0

*Jul 5, 2023*
- Added getLastRunEndState() method to retrieve an enum indicating a crash or clean exit on the previous run of the app.
- Export the expected Embrace Android SDK version as a gradle property.
- Fix for some dart errors not showing on iOS when reported through logDartError().
- Updated Embrace Android SDK to 5.21.0
- Updated Embrace iOS SDK to 5.21.0

## 1.2.1

*May 5, 2023*
- Make the internal dependencies between Embrace packages fixed.
- Updated Embrace Android SDK to 5.18.0

## 1.2.0

*May 3, 2023*
- Added a method to manually log push notifications
- Updated Embrace Android SDK to 5.17.1
- Updated Embrace iOS SDK to 5.19.2

## 1.1.0

*Apr 5, 2023*
- Updated Embrace Android SDK to 5.16.0
- Updated Embrace iOS SDK to 5.17.1

## 1.0.0

*Mar 30, 2023*
- Added runtime type to error information
- Updated Embrace Android SDK to 5.15.3
- Updated Embrace iOS SDK to 5.17.0

## 0.4.0

*Feb 28, 2023*
- Added the embrace_dio package to automatically capture network requests made with Dio
- Fixed an issue that caused some Android NDK crashes not to be reported
- Fixed an issue that caused the value of the 'allowScreenshot' parameter to be ignored in iOS
- Updated Embrace Android SDK to 5.13.0
- Updated Embrace iOS SDK to 5.16.1

# 0.3.2  

*Jan 23, 2023*
- Flutter exceptions are now taken into account when calculating the percentage of error-free sessions.
- Updated Embrace Android SDK to 5.12.0
- Updated Embrace iOS SDK to 5.15.0

# 0.3.1  

*Dec 8, 2022*
- Updated Embrace Android SDK to 5.10.0
- Updated Embrace iOS SDK to 5.12.4

# 0.3.0

> This is a development version and not intended for general use.
- Added `debugEmbraceOverride` to allow `Embrace.instance` to be mocked for testing.
- Updated Embrace Android SDK to 5.9.0
- Updated Embrace iOS SDK to 5.12.2
    - Fixed an issue in the dSYM upload tool that could cause some uploads to fail

# 0.2.0

> This is a development version and not intended for general use.
- Added session properties to Embrace API
- Added ability to manually end a session
- Added EmbraceHttpClient to automatically log http requests
- Added EmbraceNavigatorObserver to automatically log views when routes are pushed and popped
- Added example for capturing errors from isolates
- Fixed compatibility issues with older versions of Flutter
- Updated Embrace Android SDK to 5.8.0
- Updated Embrace iOS SDK to 5.12.0


# 0.1.0

> Initial release of the Embrace SDK for Flutter. This is a development version and not intended for general use.
- This release introduces support for the following features:
    - Native crash reporting with symbolication
    - Breadcrumbs API
    - Error and warning logs
    - Exception logs
    - User ID
    - Moments
    - Manual network logging
    - Manual view logging
    - User personas
