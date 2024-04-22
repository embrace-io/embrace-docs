---
title: iOS/tvOS SDK Changelog
description: Changelog for the iOS Embrace SDK
sidebar_position: 4
---

# iOS/tvOS SDK Changelog

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
    * Spans for Performance Tracing
    * Log messages
    * Breadcrumbs
* Allows for generic export of Traces and Logs via the protocols in the OpenTelemetrySdk.
* Allows for custom Automatic Instrumentation via CaptureService subclasses

## 5.25.1
*April 11, 2024*
* Adds coordinated file access in upload cache. Will better handle file contention between host app and extension processes
* Adds logic to prevent rare instances of session payloads from being sent with empty app and device metadata
* Removes logic that took screenshots. This has been deprecated since 5.23.0
* Improvements to upload retry logic to prevent immediate retries if an error occurs that is likely to repeat
* Improvements to persistence logic when rotating data storage. Will now rotate files less frequently
* Improvements to startup logic to defer operations that require file IO

## 5.25.0
*March 6, 2024*
* Add interface for hosted SDKs to use updated performance tracing
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
* Updates performance tracing to be enabled by default
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
* Introduces Embrace performance tracing beta
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

## 4.2.12
*Oct 30, 2020*

* Refactor binary image handling so it happens lazily instead of at start
* Improve recognition of special characters in module names for log message stack traces

## 5.2.4
*Oct 22, 2020*

* ensure handled exceptions are properly recorded

## 4.2.10
*Oct 22, 2020*

* ensure handled exceptions are properly recorded

## 5.2.3
*Oct 19, 2020*

* ensure tvos crashes are correctly marked in metadata
* ensure failed sessions are always uploaded
* tight session duration tracking

## 4.2.9
*Oct 16, 2020*

* add support for modern firebase crash reports

## 5.2.2
*Oct 12, 2020*

* fix crash when launching through Xcode with customize trace_id header
* fix mis-tracked start moments

## 4.2.8
*Oct 12, 2020*

* fix crash when launching through Xcode with customize trace_id header

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

## 4.2.7
*Sep 24, 2020*

* fix crash in EMBNetworkManager's predicate logic

## 5.1.0
*Sep 21, 2020*

* Change threading model so all IO callbacks happen on the main thread
* Fix crash reporting auto-detection for cases without an Embrace-Info.plist
* Reinstall signal handlers when crash reporting enabled via remote config
* Startup moment duration and threshold included in the session payload

## 4.2.6
*Sep 16, 2020*

* Deployment target upgraded to 9 for Xcode 12 support

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

## 4.2.5
*Aug 14, 2020*

* Fix crash in EMBNetworkManager
* This release branches from 4.2.4 for users unable to update to 5.0 releases

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
* Update run.sh to support locally build framework dsyms

## 4.2.4
*July 15, 2020*

* Update run.sh to support multiple 3rd party source-built dependencies
* Expose all configuration options on EmbraceConfig object for documentation
* Update nullability hints for swift compatibility

## 4.2.3 (DOA)

## 4.2.2
*July 13, 2020*

* Stop EMBProxy from invoking nil invocation
* Disable clean logging mode

## 4.2.1 (DOA)

## 4.2.0
*July 8, 2020*

* Improved compatibility with SafeDK
* Report current crash handler in session to improve report collection and integrations
* Report terminated WKWebView content threads in session
* Process console logging data to improve crash report categorization
* Allow crash testing while connected to a debugger

## 4.1.18
*May 14, 2020*
- Improve HTTP Live Streaming (HLS) caching performance when using Embrace

## 4.1.17
*May 12, 2020*
- Improved Embrace Crash Reporting Auto-Enable Logic

## 4.1.15
*April 27, 2020*
- Improved retry logic

## 4.1.14
*April 14, 2020*
- New config property `DISABLED_URL_PATTERNS` filters network requests entirely from session

## 4.1.13
*April 7, 2020*
- Embrace Crash Tracking now enabled by default if no config is present and Crashlytics is not detected
- Fix crash in gathering app file usage data

## 4.1.12
*March 27, 2020*
- Improve caching of session properties to unblock React Native dev work

## 4.1.11
*March 23, 2020*
- Increases KSCrash string buffer to improve React Native crash collection

## 4.1.10
*March 12, 2020*
- Patched an invalid bitcode in the Embrace module from v4.1.9

## 4.1.9
*March 12, 2020*
- Added client-side session-to-crash liking for stack traces received from Crashlytics

**Note: Please update to the latest SDK version if you're on v4.1.9. There is a known bitcode error that is resolved in v4.1.10 and all subsequent updates**

## 4.1.8
*March 3, 2020*
- Added support for React Native handled exceptions

**Note: Please update to the latest SDK version if you're on v4.1.8. There is a known bitcode error that is resolved in v4.1.10 and all subsequent updates**

## 4.1.7
*February 26, 2020*
- Added swizzling around the `NSURLSession:SharedSession` object to ensure we capture that traffic in all cases

## 4.1.6
*February 11, 2020*
- Disabled KSCrash tracking to work around a iOS 13.4-beta crash
- Added a custom view API (`startViewWithName`, `endViewWithName`) to allow tracking of custom view hierarchies
- Added session properties API (`addSessionProperty`, `removeSessionPropertyWithKey`) to allow annotating the session with customized properties
- Restored ability to automatically track `DataTaskWithURL` and `DownloadTaskWithURL` network requests in iOS 13

## 4.1.5
*January 15, 2020*
- Temporarily reverted Carthage support in order to ensure AppStore compatibilities

## 4.1.4
*January 14, 2020*

- Improved SDK startup time
- Fixed crash when utilizing New Relic alongside Embrace for webkit tracking
- When using Crashlytics alongside Embrace, duplicate reports are no longer reported to Embrace when upload to Crashlytics fails
- Trimmed custom event property keys and values to 4096 characters
- Added ability to encrypt network body capture using a public key

## 4.1.3
*November 20, 2019*

- Fixed issue with capture of delegate-based NSURLSession calls and WKWebViews where a crash could occur if the instantiation of the network call or web view was short-lived.

## 4.1.2
*November 19, 2019*

- Added more logging to describe if the SDK can be disabled in certain circumstances.

## 4.1.1
*November 13, 2019*

- Fixed compatibility issue with Firebase App Performance that caused a crash when the SDK is started before Firebase.
- Improved RN crash reporting capabilities.

## 4.1.0
*October 24, 2019*

- Fixed issue with proxying of view and network delegates when no delegate is set.
- Added option to disable capture of tap coordinates.
- Limit custom view names to 64 characters.

## 4.0.0
*October 14, 2019*

- Removed `UIWebView` support.
 - Apple started issuing warnings that apps using `UIWebView` would be rejected in the future. If your team has not yet migrated to `WKWebViews`, do not update past 3.7.0. We will support `UIWebViews` in SDK versions prior to 3.7.0.
- Fixed issue where delegate-based network calls could fail when the Firebase Performance SDK was installed and initialized before the Embrace SDK.
- Added support for custom view names. Instead of having the default view controller names specified in timelines, you can now define custom names.
- Added support to skip capture of views. If certain views are not of interest, they can now be ignored.
- Added support for React Native crashes.
- Added support for improved React Native log stack traces.
- Added support for upload of React Native source maps to the upload script.

##  3.7.0
*August 2, 2019*

- Added option to auto-end startup moment after a certain time.
 - Disabled by default.  Auto-end can be enabled via the SDK or remotely to end the startup after a time period.
- Emit a console log warning if Crashlytics is started before Embrace.
- Associate user info that was set during a session with that session, even if it was cleared before the session ended.
 - User ids and info are 'sticky' to a session even if cleared at the end of the session.
- Added optional argument to `endSession` method to clear user info when ending the session.

##  3.6.1
*July 22, 2019*

- Allow developers to pass and capture trace IDs from network request headers and have them be displayed in the session timeline for the network request.
- Added additional timing-related data to network body capture payload.
- Fixed potential race condition for ending moments.
- Renamed manual network capture class initializers to be more in line with Swift conventions.

##  3.6.0
*July 15, 2019*

- Added `logNetworkRequest` method and `EmbraceNetworkRequest` class to allow manual capture of network requests. The SDK is capable of automatically capturing the majority of REST network calls made by applications, but this new method allows recording of network requests that are not automatically captured, such as gRPC requests.
- Removed the restriction that the SDK must be initialized before user identity is set.
- Eliminated redundant network call to Embrace that contained data that is now provided to us as part of other network calls.
- Gracefully handle multiple calls to start the SDK. We now ignore all except for the first one.

##  3.5.0
*July 10, 2019*

- Added option for developers to track app launch methods (ex. background states) which we will later make visible on our dashboard.
- Adjusted our iOS network capturing logic to streamline call collection.
