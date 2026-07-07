---
title: Changelog
description: Changelog for the Embrace Flutter SDK
sidebar_position: 6
---

## Embrace Flutter SDK changelog

### 4.8.0

_Jul 7, 2026_

- Updated Embrace Android SDK to 8.4.0

### 4.7.0

_Jun 9, 2026_

- Added `EmbraceStartupTracker` for automatic time-to-first-frame span instrumentation
- Added time-to-interactive (TTI) span instrumentation to `EmbraceNavigationObserver`
- Added `embrace_go_router` package with `EmbraceGoRouterObserver` for automatic navigation tracking and TTI span instrumentation in apps using go_router
- Updated Embrace Android SDK to 8.3.1
- Updated Embrace iOS SDK to 6.20.0
- Fixed null returns from span method channel calls

### 4.6.0

_Apr 22, 2026_

- Added OpenTelemetry API compliance: `EmbraceOTelFactory`, `EmbraceTracerProvider`, `EmbraceTracer`, `EmbraceLoggerProvider`, and `EmbraceLogger` are now registered with `dartastic_opentelemetry_api` on `Embrace.start()`
- Added `addSpanExporter` and `addLogRecordExporter` to configure OTLP export destinations from Dart
- Added W3C traceparent header injection in `EmbraceHttpClient`

### 4.5.0

_Apr 8, 2026_

- Updated Embrace iOS SDK to 6.17.1
- Fixed embrace_dio not recording HTTP error responses with status code

### 4.4.0

_Mar 23, 2026_

- Updated Embrace Android SDK to 8.2.0
- Updated Embrace iOS SDK to 6.16.3

### 4.3.0

_Nov 11, 2025_

- Updated Embrace Android SDK to 7.9.2
- Updated Embrace iOS SDK to 6.14.1
- Added `recordSpan` feature which allows lambda execution alongside recording spans

### 4.2.0

_Jul 25, 2025_

- Updated Embrace Android SDK to 7.7.0
- Fixed w3cTraceparent header not being set in Dio/HttpClient requests when network spans forwarding enabled

### 4.1.0

_Apr 24, 2025_

- Updated Embrace Android SDK to 7.3.0
- Updated Embrace iOS SDK to 6.8.5

### 4.0.1

_Apr 1, 2025_

- Fixed crash in Dio interceptors when SDK is disabled but interceptor is applied

### 4.0.0

_Feb 19, 2025_

- Updated Embrace Android SDK to 7.1.0
- Updated Embrace iOS SDK to 6.8.1
- Added ability to access trace ID for spans

### 3.2.0

_Jan 3, 2025_

- Updated Embrace Android SDK to 6.14.0.

### 3.1.0

_Oct 28, 2024_

- Updated Embrace iOS SDK to 6.5.0.

### 3.0.1

_Oct 7, 2024_

- Updated Embrace iOS SDK to 6.4.2.

### 3.0.0

_Sep 17, 2024_

- Updated Embrace Android SDK to 6.13.0.
- Updated Embrace iOS SDK to 6.4.0.
- Added Tracing API for capturing spans/events

### 2.0.0

_Mar 13, 2024_

- Removed deprecated methods.
- Added support for AGP 8.
- Updated Embrace Android SDK to 6.4.0. Updated the minimum Android version supported to 21.
- Updated Embrace iOS SDK to 5.25.0.

### 1.5.0

_Oct 2, 2023_

- Added getCurrentSessionId() method to get the ID of the current session.
- Renamed some functions to improve consistency between the Embrace SDKs (old names have been deprecated).
- Updated Embrace Android SDK to 5.24.0
- Updated Embrace iOS SDK to 5.23.1

### 1.4.0

_Jul 20, 2023_

- Added logHandledDartError() method to record exceptions that have been handled.
- Updated Embrace Android SDK to 5.22.0
- Updated Embrace iOS SDK to 5.21.1

### 1.3.0

_Jul 5, 2023_

- Added getLastRunEndState() method to retrieve an enum indicating a crash or clean exit on the previous run of the app.
- Export the expected Embrace Android SDK version as a gradle property.
- Fix for some dart errors not showing on iOS when reported through logDartError().
- Updated Embrace Android SDK to 5.21.0
- Updated Embrace iOS SDK to 5.21.0

### 1.2.1

_May 5, 2023_

- Make the internal dependencies between Embrace packages fixed.
- Updated Embrace Android SDK to 5.18.0

### 1.2.0

_May 3, 2023_

- Added a method to manually log push notifications
- Updated Embrace Android SDK to 5.17.1
- Updated Embrace iOS SDK to 5.19.2

### 1.1.0

_Apr 5, 2023_

- Updated Embrace Android SDK to 5.16.0
- Updated Embrace iOS SDK to 5.17.1

### 1.0.0

_Mar 30, 2023_

- Added runtime type to error information
- Updated Embrace Android SDK to 5.15.3
- Updated Embrace iOS SDK to 5.17.0

### 0.4.0

_Feb 28, 2023_

- Added the embrace_dio package to automatically capture network requests made with Dio
- Fixed an issue that caused some Android NDK crashes not to be reported
- Fixed an issue that caused the value of the 'allowScreenshot' parameter to be ignored in iOS
- Updated Embrace Android SDK to 5.13.0
- Updated Embrace iOS SDK to 5.16.1

### 0.3.2

_Jan 23, 2023_

- Flutter exceptions are now taken into account when calculating the percentage of error-free sessions.
- Updated Embrace Android SDK to 5.12.0
- Updated Embrace iOS SDK to 5.15.0

### 0.3.1

_Dec 8, 2022_

- Updated Embrace Android SDK to 5.10.0
- Updated Embrace iOS SDK to 5.12.4

### 0.3.0

> This is a development version and not intended for general use.

- Added `debugEmbraceOverride` to allow `Embrace.instance` to be mocked for testing.
- Updated Embrace Android SDK to 5.9.0
- Updated Embrace iOS SDK to 5.12.2
  - Fixed an issue in the dSYM upload tool that could cause some uploads to fail

### 0.2.0

> This is a development version and not intended for general use.

- Added session properties to Embrace API
- Added ability to manually end a session
- Added EmbraceHttpClient to automatically log http requests
- Added EmbraceNavigatorObserver to automatically log views when routes are pushed and popped
- Added example for capturing errors from isolates
- Fixed compatibility issues with older versions of Flutter
- Updated Embrace Android SDK to 5.8.0
- Updated Embrace iOS SDK to 5.12.0

### 0.1.0

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
