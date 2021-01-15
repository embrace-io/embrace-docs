---
title: "iOS/tvOS SDK Changelog"
description: Changelog for the iOS Embrace SDK
weight: 4
---

# iOS/tvOS SDK Changelog

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
- Removed the restriction that the SDK must be initialized before username, email, or user ID are set.
- Eliminated redundant network call to Embrace that contained data that is now provided to us as part of other network calls.
- Gracefully handle multiple calls to start the SDK. We now ignore all except for the first one.

##  3.5.0 
*July 10, 2019*

- Added option for developers to track app launch methods (ex. background states) which we will later make visible on our dashboard.
- Adjusted our iOS network capturing logic to streamline call collection.
