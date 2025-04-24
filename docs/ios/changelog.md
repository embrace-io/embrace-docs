---
title: iOS/tvOS SDK Changelog
description: Changelog for the iOS Embrace SDK
sidebar_position: 4
---

# iOS/tvOS SDK Changelog

## 6.9.0
*Apr 22th, 2025*
* Changes
    * Removed GRDB as a dependency.
    * Reworked the internal storage system using Core Data.

## 6.8.5
*Apr 16th, 2025*
* Fixes
    * Fixed a crash that could occur when injecting the `traceparent` header into certain types of `NSURLSessionTask`.
    * Fixed a compatibility issue that could arise in specific conditions when our URLSession capture service was isa-swizzled by other libraries.
* Changes
    * Added support for passing the `-ObjC` linker flag via SPM by setting the environment variable `EMBRACE_ENABLE_TUIST_OBJC_LINK`, which is required when using the SDK in Tuist-generated projects.

## 6.8.4
*Apr 1st, 2025*
* Fixes
    * Fixed an issue where some `NSURLSessionDelegate` methods were not being called when using `URLSessionCaptureService`.
    * Fixed crashes that could occur with short-lived `WKWebView` instances when `WebViewCaptureService` was enabled.

## 6.8.3
*Mar 18th, 2025*
* Fixes
    * Fixed some methods from `NSURLSessionDataDelegate` and `NSURLSessionDownloadDelegate` not being called when using a `URLSessionCaptureService`.

## 6.8.2
*Mar 10th, 2025*
* Features
    * Added the ability to add custom stack traces to logs with `StackTraceBehavior.custom`.
    * The `TapCaptureService` can now be configured to capture taps on either start or end.
* Fixes
    * Potential fixes for core data related crashes.
* Changes
    * Deprecated `Embrace.Endpoints.developmentBaseURL`.

## 6.8.1
*Feb 12th, 2025*
* Features
    * Enabled Automatic View Capture functionallity by default.
* Fixes
    * Fixed an issue that causes incompatibilities with libraries/apps reusing the same `URLSessionDelegate` across multiple `URLSession` objects.
* Changes
    * Refactored the way we create proxy objects for `WKWebView` and `URLSession` instrumentation functionalities.

## 6.8.0
*Feb 6th, 2025*

:::warning Important
This version has known issues with `URLSession` and `WKWebView` Capture Services. Please use v6.8.1
:::

* Features
    * Possibility to add attachments to logs
    * Possibility to stop the Embrace SDK from capturing and generating data
* Fixes
    * Fixed an issue causing `WKWebView`s to crash when calling the delegate method `webView(_:didFinish:)` when `WebViewCaptureService` is enabled.
    * Fixed some potential issues with different features using proxy mechanisms (e.g. `URLSession` & `UNUserNotificationCenter` instrumentation).
* Changes
    * Beginning the migration to a new way of storing data.

## 6.7.1
*Jan 22nd, 2025*
* Fixes
    * Fixed an issue that caused the crash `'Cannot form weak reference to instance X of class Y'`.
    * Fixed an issue that prevented enabling/disabling certain functionalities.
    * Fixed incompatibility issues with AppLovin.

## 6.7.0
*Jan 10th, 2025*

:::warning Important
This version has known issues please use v6.7.1
:::

* Features
    * Improvements to the Automatic View Capture functionality, allowing attributes to be added to traces (`TTFR` and `TTI`) using the `addAttributesToTrace(_:)` method.
* Fixes
    * Fixed an issue causing crashes in views controllers with very short lifecycles (particularly in hosting controllers acting as internal bridges in SwiftUI).
    * Fixed a bug causing compilation issues related to the use of `DispatchQueue`.

## 6.6.0
*Dec 12th, 2024*
* Features
    * Added new instrumentation for the `ViewCaptureService`. Can be enabled through `ViewCaptureService.Options.instrumentFirstRender`.
    * Added url blacklist for the `URLSessionCaptureService`. Can be configured through `URLSessionCaptureService.Options.ignoredURLs`.
    * Added the ability to auto terminate spans if the session ends while the span is still open.
    * Updated the OpenTelemetry dependency to v1.12.1 which fixes some concurrency related crashes.
    * Improved logic around Embrace data uploads and retries.
    * Deprecated `Span.markAsKeySpan()`.
* Fixes
    * Fixed the remote config parse sometimes failing.
    * Fixed the remote config cache not working properly.
    * Fixed crash logs sometimes not containing the session properties.
    * Fixed keychain related crash/hang during startup.
    * Fixed issues with the `WebViewCaptureService` that could lead to a crash.
    * Fixed issue with the `URLSessionCaptureService` when dealing with `URLSessionDelegate` objects in Objective-C responding to methods without conforming to specific protocols.

## 6.5.2
*Nov 14th, 2024*
* Features
    * `EmbraceCrashReporter` now receives a list of signals to be ignored. `SIGTERM` is ignored by default now.
* Fixes
    * Fixed network payload capture rules not working.
    * Fixed `WebViewCaptureService` preventing the web view delegate from receiving messages.
    * Fixed `PushNotificationCaptureService` preventing the user notification delegate from receiving messages.
    * Fixed log batching logic.

## 6.5.1
*Oct 29th, 2024*
* Features
    * Improved performance during the startup of the SDK.
* Fixes
    * Fixed compilation errors in WatchOS.
    * Fixed visbility of `LogLevel`.

## 6.5.0
*Oct 18th, 2024*
* Features
    * Removed `SwiftLint` from `Package.swift` as a dependency, which reduces the download size of our SDK and prevents dependency resolution conflicts.
    * For those consuming the SDK without an `appId`, `Embrace.Options` now includes the possibility to provide custom configuration (implementing `EmbraceConfigurable`).
* Fixes
    * Fixed a linking conflict issue affecting some users both with SPM and CocoaPods.
    * Implemented a fix to expose user customization methods to Objective-C.
    * Fixed a bug that caused the `Span.Status` to be incorrect when exporting a session ended due to a crash.

## 6.4.2
*Oct 2nd, 2024*
* Fixes
    * Fixed crash in `URLSessionCaptureService`.
    * Fixed network body capture logs not being exported.
    * Fixed logic for background sessions.
    * Fixed linker error on simulators in iOS 17.5 and below when using cocoapods.

## 6.4.1
*Sep 26th, 2024*

:::warning Important
This version has known issues and should not be used
:::

* Features
    * Updated OpenTelemetry dependencies to v1.10.1.
* Fixes
    * Fixed logs not having resources from the session when being recovered during the SDK startup.
    * Fixed crash with the `gtm-session-fetcher` library.
    * Fixed KSCrash dependency compilation issues in Xcode 16.

## 6.4.0
*Sep 13th, 2024*
* Features
    * Added the option to use the SDK without an `appId` using `Embrace.Options`.
    * Introduced a new parameter in the `log` API: `stackTraceBehavior` to specify the behavior for automatically capturing stack traces within a log.
    * Added the capability to securely capture the body of network requests.
* Changes
    * Removed `-dynamic` targets from Swift Package Manager.
    * Discontinued capturing the screen resolution of devices.
* Fixes
    * Updated `GRDB` to the current latest version (`6.29.1`) to support Xcode 16.
    * Addressed issues related to our service for capturing Network Requests with the new concurrency system (aka. `async` / `await`).
    * Fixed a crash associated with being with another player proxying `URLSession`.
    * Resolved an issue that prevented proper forwarding of calls to the original delegate when swizzling `URLSession` due to a retention issue.
    * Corrected the public API `recordCompletedSpan` to set `Span.Status` consistently with other `end` methods.

## 6.3.0
*Aug 7th, 2024*
* Features
    * Added new public target: `EmbraceSemantics` to expose constants and attributes used to extend OTel Semantic Conventions
    * Added Cocoapods support
    * Added logic to link an emitted `LogRecord` to the active span context
    * Created new APIs for `W3C.traceparent` to be used to support manually instrumented network requests
* Changes
    * Update `Embrace` to expose `LogType` on the `log` method
    * Renamed `LogType.default` to `LogType.message`
* Fixes
    * Fixed the public `addPersona(persona: String, lifespan: MetadataLifespan)` method which wasn't properly forwarding the `lifespan`
    * Fixed a bug that caused a reentrancy issue with the database when persisting spans.

## 6.2.0
*July 30th, 2024*

* Features
    * Adds `PushNotificationCaptureService` to instrument notifications received using Apple's `UserNotifications` framework
    * Adds `Embrace.lastRunEndState` method to retrieve an indication of how the previous start of the SDK finished
        * Provided values can be `unavailable`, `crash`, and `cleanExit`
    * Adds `CaptureServiceBuilder` to provide easier interface to setup/configure `CaptureService` instances
    * Adds `Embrace.tracer(instrumentationName: String)` method to retrieve OpenTelemetry `Tracer`
        * This is useful for manual instrumentation using the `OpenTelemetryApi` directly
    * Adds ability to set "User Personas" in the `MetadataHandler`
        * User Personas are great ways to tag users and identify commonalities
        * See `MetadataHandler+Personas` for interface definition
* Changes
    * Updates `TapCaptureService` with options to better control data capture
        * Allows you to ignore specific views by class, or to prevent coordinate capture
        * Optional `TapCaptureServiceDelegate` to have fine grained control over tap capture
* Fixes
    * Fixes bug that prevented user properties from being included on an Embrace session
    * Cleanup of public interface and code level documentation

## 6.1.0
*July 3rd, 2024*

* Adds automatic instrumentation for `WKWebView` Web Views.
* Adds `Embrace.flush(_ span: Span)` method to manual persist changes that occur to a long running Span.
* Adds support for [Network Span Forwarding](https://embrace.io/docs/product/network-spans-forwarding/).
* Support for receiving Firebase Crashlytics crash reports in the Embrace dashboard as well as the Firebase dashboard.

## 6.0.0
*April 22nd, 2024*

* Initial release of the 6.0.0 SDK.
* This major version introduces a new core architecture focusing on:
    * OpenTelemetry Tracing and Logging at its core.
    * Persistence in SQLite using GRDB
    * Swift-first interface for developers of Apple platforms
* Automatic Instrumentation of:
    * Application Crash Reports
    * Network Requests
    * Device Low Power Mode
    * Application Memory Warnings
    * UIViewController appearance
    * User Tap Gestures
* Manual instrumentation using:
    * Spans for Traces
    * Log messages
    * Breadcrumbs
* Allows for generic export of Traces and Logs via the protocols in the OpenTelemetrySdk.
* Allows for custom Automatic Instrumentation via CaptureService subclasses

## 5.25.4
*July 23rd, 2024*
* Fixes bug in interface for Unity when starting a Span where incorrect type was used.
* Updates `EMBSpanSerializer serialize` to sanitize Span property dictionaries to ensure JSON validity

## 5.25.3
*June 25, 2024*
* Made improvements to the startup performance of the SDK.

## 5.25.2
*May 10, 2024*
* Fixed a bug that prevented setting up Username and Email.
* Fixed a crash that could occur when attempting to serialize spans.
* Improved network instrumentation to reduce slowness during startup requests.
* Removed stack traces from informational logs.
* Made improvements to the startup performance of the SDK.

## 5.25.1
*April 11, 2024*
* Adds coordinated file access in upload cache. Will better handle file contention between host app and extension processes
* Adds logic to prevent rare instances of session payloads from being sent with empty app and device metadata
* Removes logic that took screenshots. This has been deprecated since 5.23.0
* Improvements to upload retry logic to prevent immediate retries if an error occurs that is likely to repeat
* Improvements to persistence logic when rotating data storage. Will now rotate files less frequently
* Improvements to startup logic to defer operations that require file IO
* Resolved an issue that caused logs to recurse indefinitely when used in specific contexts. Now, logging is safely handled to prevent infinite recursion.

## 5.25.0
*March 6, 2024*
* Add interface for hosted SDKs to use updated traces
* Fixed missing network body capture data in some scenerios
* Adds ability for EmbraceExtensions to disable Embrace data uploads. Data will be deferred to the host app for the upload.
* Improvements to SDK startup time

## 5.24.6
*Jan 26, 2024*
* Fix potential lost data for network body capture

## 5.24.5
*Jan 22, 2024*
* Fix retain cycle that can occur if using `[NSURLSession sessionWithConfiguration:delegate:delegateQueue:]` and passing a delegate object with a strong reference to that `NSURLSession`.

## 5.24.4
*Jan 18, 2024*
* Fixes issue that would prevent permanent session properties from being stored correctly.
* Fixes extremely rare circumstance that would cause extension crash reports from being removed before being uploaded.

## 5.24.3
*Jan 3, 2024*
* Potential fix for crash related to network request capture.
* Fixes taps being captured when both CAPTURE_TAPPED_ELEMENTS and CAPTURE_COORDINATES are disabled.

## 5.24.2
*Dec 19, 2023*
* Fixed an issue in the URL normalization process to ensure thread safety and prevent crashes due to synchronization conflicts.
* Fixes linker problem for Embrace Unity iOS SDK.

## 5.24.1
*Dec 19, 2023*
* all changes rolled into 5.24.2

## 5.24.0
*Nov 30, 2023*
* Updates logic when writing to disk to better catch exceptions that can occur
* Updates traces to be enabled by default
* Updates `upload` tool to distribute a universal binary
* Fixes crash in `EMBSessionMetadataFile`
* Fixes crash `fileForClosedSpansNamed:`. Introduced in 5.19.4, partly addressed in 5.23.1
* Fixes crash in `-[NSInvocation getArgument:atIndex:]`. Introduced in 5.23.1

## 5.23.2
*Oct 27, 2023*
* Fixes bug that could cause wrong timestamp to appear in crash reports

## 5.23.1
*Sept 26, 2023*
* Fixes memory issue when generating a session payload with numerous (1000+) network requests. Introduced in 5.22.0.
* Fix crash in `fileForClosedSpansNamed:`. Introduced in 5.19.4

## 5.23.0
*Sept 20, 2023*
* Introduces Embrace traces beta
* Updates public interface for consistency across platforms. Adds deprecation messages for outdated methods
* Adds method to retrieve the current sessionId
* Begins signing SDK for Xcode 15
* Adds privacy manifest for Xcode 15
* Changes the default log level for SDK console logs to "none"
* Fixes warning that occurs when building for iOS extension

## 5.22.0
*Aug 14, 2023*
* Enhancements in Data Persistence related to Sessions.
* Improved support for `WKNavigationDelegate` APIs.

## 5.21.1
*July 10, 2023*
* Updates to interface when adding exceptions from Unity, Flutter, and React Native
* Updates API payload to match interface changes for exceptions

## 5.21.0
*June 28, 2023*
* Added API for querying the end state of the last run
* Fixed Unity unhandled exception logging behavior
* Updated Web Vitals feature defaults
* Migrated storage location of some SDK data

## 5.20.1
*June 16, 2023*
* Fixes a problem that would cause a deadlock when using the logging interface

## 5.20.0
*June 14, 2023*

:::warning Important
This version has been pulled as an issue was discovered that would cause the app to lock up when using any logging interface. Please use 5.20.1 instead.
:::

* Fixed a bug that prevented view appearance breadcrumbs from spanning across sessions
* Fixes concurrency issue that could occur when using moments
* Fixes deadlock that could occur when querying the applicationState on UIApplication
* Fixes bug that could occur when writing session metadata to disk, causing corrupt session data
* Adds API to manually log push notifications from Unity
* Updates the dsym upload tool to leverage the CI_ARCHIVE_PATH envvar in the framework search paths if set. This is common in Xcode Cloud CI.
* Improvements to the upload subsystem to better handle the transfer of data to the Embrace backend. This includes optimizing how payloads are created to prevent unnecessary work, and an updated retry system to better handle network failures.

## 5.19.4
*May 29, 2023*
* Fixed logHandledException missing the "reason" property.
* Fix rare crash in EMBDevice buildUUID that was occurring on the Unity platform.
* Fix issues with JS Exceptions on React Native

## 5.19.3
*May 23, 2023*
* Improvements to diskIO latency that could occur during an app cold start
* Adds ability to disable network request capture using the Embrace-Info.plist key NETWORK_CAPTURE_ENABLED. If set to false, Embrace will not capture any network requests.

## 5.19.2
*May 2, 2023*

* Added the ability to capture core web vitals for web view experiences in your app.

## 5.19.1
*April 27, 2023*

* Fix crash happened when try to write to disk without free space (introduced in 5.17.0)
* Fixed crash that could occur in EMBSpanContainer when deserializing invalid/corrupt data (introduced in 5.17.0)

## 5.19.0
*April 25, 2023*

* Fixed an issue that was causing a deadlock in some rare circumstances

## 5.18.1
*April 19, 2023*

* Fixed issue where cold start sessions could report the incorrect app state (i.e. forground sessions shows as background)
* Fixed memory leak on swift class name demangling
* Fix to allow manual end session calls for extensions

## 5.18.0
*April 12, 2023*

* Fixed issue where view appearance breadcrumbs would not work properly when re-adding the same instance to the navigation stack multiple times.
* Fixed issue that caused breadcrumb limits to not be applied correctly
* Improvements to `start` method to defer tasks and have a more consistent runtime

## 5.17.1
*April 04, 2023*

* Fixes performance issue when serializing network data in session payload
* Fixes duplication of custom log breadcrumbs.

## 5.17.0
*March 21, 2023*

:::warning Important
This version has known issues and should not be used
:::

* Fix for a very rare crash on archiving current session
* store the latest breadcrumbs instead of the first

## 5.16.3
*March 14, 2023*

* Improves SDK startup performance by moving disk usage collection to background queue
* Added the ability to report the Flutter error runtime type.

## 5.16.2
*March 01, 2023*

* Fix issue that caused cold start background sessions to be captured when configuration did not enable them
* Removes validation check for `http` and `https` schemes in network requests. Will now allow `ws` and `wss` URLs

## 5.16.1
*February 08, 2023*

* Updates breadcrumb limit to 100
* Fixes issue that would cause network requests in Unity to show a duration of zero


## 5.16.0
*January 31st, 2023*

* Add logic to demangle SwiftUI view names. Will now be in a more readable format.
* Fix issue that caused all network requests from Unity to be flagged as error.
* Fix crash that occurs when archiving session data.
* Updates on device storage for user, device, and session properties.


## 5.15.0
*January 18th, 2023*

* Added a new PUSH_NOTIFICATIONS_CAPTURE_MODE config that provides control on how Embrace will capture push notifications. Possible modes are: manual and automatic.

## 5.14.1
*January 9th, 2023*

* Unity: Fixed an issue where unhandled logs would sometimes not be saved.
* Made endAppStartup return when the SDK hasnt been started to prevent a crash
* React Native: implemented a RN exclusive breadcrumb to handle actions from State Management.


## 5.14.0
*December 13th, 2022*

* Fixes issue that could prevent logs from appearing in session if many sessions occur without app cold start
* Removes call to deprecated method on NSKeyedUnarchiver
* Updates tap capture behavior to prevent coordinate capture for touches that occur on system keyboard
* Adds ability to capture breadcrumbs from Push Notifications


## 5.13.0
*December 6th, 2022*

* ``setBackgroundMode`` removed in favor of the dashboard configuration options
* Re-wrote configuration system in order to ensure easier code modification and performance improvements.

## 5.12.4
*November 28th, 2022*

* Fix potential loss of logs in edge case
* Potential infinite loop fix when using AFNetworking
* Potential infinite loop fixed when for rare edge case with logging
* Potential undefined behavior fix

## 5.12.3
*November 15th, 2022*

* Ensured remote config fetch does not impact main thread
* setBackgroundMode API Deprecation

## 5.12.2
*November 8th, 2022*

* Fix issue where the included `upload` utility and `run.sh` script would not have executable permissions when distributed through Cocoapods.
* Bumped `upload` utility version to `10.0.4`

## 5.12.1
*November 8th, 2022*

* Fix issue where tap element capture would not be enabled by default when passing an `EmbraceConfig` object at runtime to initialize the SDK.
* Fix issue on Unity where a crash signal would cause the app to freeze instead of exit.

## 5.12.0
*October 20th, 2022*

* Added a "enableIntegrationHelp" parameter to the SDK initialization methods. When enabled (and only on development), the SDK will show an alert view when there's a critical error during the initialization process.
* Fix session end time potentially being incorrect for crashes.
* Fixed Unity crashes not saving properly.

## 5.11.0
*October 6th, 2022*

* Fixes bug in crash handler introduced in 5.9.3.
* Adds unity sdk version property.

## 5.10.0
*October 3rd, 2022*

* Adds support for Flutter

## 5.9.3
*September 16th, 2022*

* Improvements to installation of signal handler to more consistently receive crash information.

## 5.9.2
*July 29th, 2022*

* Fixes issue that would prevent Embrace crash reporter from being enabled by default.

## 5.9.1
*July 19th, 2022*

* Enforces limit when calling `logBreadcrumbWithMessage`.
* Improves file reading performance when uploading a large session.

## 5.9.0
*June 30th, 2022*

* Fixes incompatibility issues with SafeDK.

## 5.8.1
*June 17th, 2022*

* Fixes crash that could occur when uploading session data.
* Improves handling of memory allocation when uploading session data.

## 5.8.0
*June 8th, 2022*

* Adds ability to disable the element name from being included in tap capture. Set the Embrace-Info.plist boolean `CAPTURE_TAPPED_ELEMENTS` to false to disable this feature.

## 5.7.8
*May 31st, 2022*

* Fix crash report enabled property. The remote config can't re-enable it
* Fix for Embrace delegate callback not happening
* Added property for whether or not the sdk has started
* Fix for very rare edge case of properties dictionary trying to be serialized when changed


## 5.7.7
*April 12th, 2022*

* Fixed duplicate send of RN js crashes

## 5.7.6
*March 14th, 2022*

* Fixed for missing some network requests metrics.
* Fix potential ANR on launch that could cause a crash in some situations
* Added Log Message variants that allow for logging caught exceptions

## 5.7.5
*January 19th, 2022*

* Fix potential ANR on launch.

## 5.7.4
*December 22nd, 2021*

* Fixed Crash on startup

## 5.7.3
*December 22nd, 2021*

* Fixed Typo in key

## 5.7.2
*December 21st, 2021*

* Modified CUSTOM_PATH_HEAEDER functionality to be more customizable and have a more general use case.
* Defaulted Screenshots to OFF

## 5.7.1
*December 16th, 2021*

* Added CUSTOM_PATH_HEADER config option that allows for automatically generating the x-emb-path value from a specified header.

## 5.7.0
*November 24th, 2021*

* Ensure embrace always receives crashes first.
* Updated carthage integration to work with newer format
* Fix for bug introduced by apple involving low power mode
* Fix for network domain dictionary crash

## 5.6.5
*November 5th, 2021*

* Remove Console Logs

## 5.6.4
*October 28, 2021*

* Fix Embrace version number

## 5.6.3
*October 7, 2021*

* Fixed crash related to network data capture introduced in 5.6.2

## 5.6.2
*September 22nd, 2021*

* Fixed EMBWKNavigationProxy implementation
* Fixed multithreading access to the network domains dictionary

## 5.6.1
*August 9th, 2021*

* iOS 15 Support

## 5.6.0
*July 27th, 2021*

* Fixed memory leak that occured during startup
* Fix for missing sessions on upgrading between v4 of sdk to v5

## 5.5.3
*July 13th, 2021*

* Fix disabled SDK in a scene-based app
* Fix micro sessions in a scene-baed app

## 5.5.2
*Jun 15th, 2021*

* Manually logged network request can now include an error with no response code
* Ensure that cancelled network requests are correctly filtered

## 5.5.1
*May 21st, 2021*

* Update background mode logic based on beta feedback
* New configuration options to control view tracking

## 5.5.0
*April 30th, 2021*

* Etag support for config fetches
* Hybrid background mode API added
* Allow filtering of cancelled http requests by domain
* Fix background task usage to avoid expired tasks
* Use weak retention when dealing with WKNavigationDelegates
* Support for Firebase 7.4.0 and beyond
* Unity unhandled exception support

## 5.4.1
*April 8th, 2021*

* Resolve crash when tracking views with nil titles
* Resolve crash when serializing json data

## 5.4.0
*March 25th, 2021*

:::warning Important
This version has known issues and should not be used
:::

* Optimization for object serialization
* New API to disable uploading for battery/data conscious scenarios
* Fix memory leak when using the OS_LOG feature
* Ensure failed sessions are uploaded whenever possible
* Fix memory leak when using GAD WKWebView instances
* Fix crash with NSURLSession proxying

## 5.3.7
*March 9th, 2021*

* Fix crash when view category methods are called off main thread

## 5.3.6
*Feb 8th, 2021*

* Fix unarchiving nil strings from disk

## 5.3.5
*Feb 5th, 2021*

* Expose custom network event logging on native interface
* Handle WKWebView terminations correctly when loadHTMLString is used

## 5.3.4
*Jan 29th, 2021*

* Fix memory leak when proxying a WKWebView with a WKNavigationDelegate

## 5.3.3
*Jan 26th, 2021*

* Stop using expired URLSession on resume
* Optimize collection of device metadata to be off main thread
* Optimize session payload creation login on app suspension

## 5.3.2
*Jan 18th, 2021*

* Add queueing to streaming cache updates
* Prevent the same message from uploading multiple times
* Ensure session number persists across upgrades
* Add API to pause/resume tap coordinate capture
* Improve performance of network capture filtering

## 5.3.1
*Dec 10th, 2020*

* Ensure sessions with abnormal exits have correct endtimes
* Update dSYM upload utility with better diagnostics

## 5.3.0
*Dec 1st, 2020*

* Framework is now a universal xcframework
* Network filtering via embrace-info.plist now supported on v5
* Fix session-to-session data handoffs
* Fix crashes related to filtering network capture arrays
* Fix crash related to sending failed session start message
* Maximum length for webview url capture is now 1024 bytes
* Log events now have limits for each type per session

## 5.2.5
*Oct 30, 2020*

* Refactor binary image handling so it happens lazily instead of at start
* Improve recognition of special characters in module names for log message stack traces
* Fix threading crash while recording network activity on 32 bit devices

## 5.2.4
*Oct 22, 2020*

* ensure handled exceptions are properly recorded

## 5.2.3
*Oct 19, 2020*

* ensure tvos crashes are correctly marked in metadata
* ensure failed sessions are always uploaded
* tight session duration tracking

## 5.2.2
*Oct 12, 2020*

* fix crash when launching through Xcode with customize trace_id header
* fix mis-tracked start moments

## 5.2.1
*Oct 1, 2020*

* Fix power manager hang on launch

## 5.2.0
*Sep 30, 2020*

* Change how failed events are queued to fix perf and OOM issues
* Update code for xcode 12 standards

## 5.1.3
*Sep 30, 2020*

* Fix crash in unarchiver usage
* Fix crash in filtered array with predicate usage
* low power warnings re-added to session payloads

## 5.1.2
*Sep 25, 2020*

* Fix caught exception on non-firebase crash upload path
* Session properties in event payloads
* memory warnings re-added to session payloads

## 5.1.1
*Sep 24, 2020*

* Fix crash in EMBNetworkManager's predicate logic
* Fix sendSession:addObject crash
* Update to firebase's latest formats to mirror crash reports

## 5.1.0
*Sep 21, 2020*

* Change threading model so all IO callbacks happen on the main thread
* Fix crash reporting auto-detection for cases without an Embrace-Info.plist
* Reinstall signal handlers when crash reporting enabled via remote config
* Startup moment duration and threshold included in the session payload

## 5.0.10
*Sep 15, 2020*

* Deployment target upgraded to 9 for Xcode 12 support

## 5.0.9
*Sep 9, 2020*

* Fix blocked downloads when using expo +  flex for debugging

## 5.0.8
*Sep 8, 2020*

* Add config filter to disable URLSessionDelegate swizzling

## 5.0.7
*Sep 1, 2020*

* Fix for crash in [EMBSession serialize]
* Fix for crash in NSKeyedUnarchiver
* Ensure background tasks are always ended before starting a new task

## 5.0.6
*Aug 28, 2020*

* Hotfix for V3 migration of failed.events cache

## 5.0.5
*Aug 28, 2020*

* Improve performance when large number of queued failed events exist
* Fix rare crash in sendShortSession

## 5.0.4
*Aug 14, 2020*

* Fix crash in EMBNetworkManager

## 5.0.3
*Aug 10, 2020*

* Fix web-thread-termination outcome tracking
* Exception logging for corrupt proxy invocations
* Better support for upstream 'cmd' renaming (ex: Flipper/Flex style swizzling)

## 5.0.2
*Aug 6, 2020*

* Improve crash linking reliability to sessions
* Fix compatibility with Firebase's new crashlytics interface

## 5.0.1
*Aug 4, 2020*

* Fix threading crash in EMBStreamingBreadcrumbManager's cache layer
* Apple TV compatible framework now included in release

## 5.0.0
*July 27, 2020*

* Use dispatch-io channels to improve performance and improve session resolution
* Update run.sh to support locally-built framework dSYMs
