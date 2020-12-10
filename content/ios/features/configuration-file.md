---
title: "Configuration File"
description: A reference guide too configuration options available in the iOS SDK
weight: 6
aliases:
  - /ios/configuration-file/
---

# Configuration File

## Embrace-Info.plist

Embrace is configured via an `Embrace-Info.plist` file placed at the root of the IPA, alongside the main application binary.  An example of this file is included below as a reference:

```plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>BACKGROUND_FETCH_CAPTURE_ENABLE</key>
	<true/>
	<key>STARTUP_AUTOEND_SECONDS</key>
	<integer>20</integer>
	<key>API_KEY</key>
	<string>TEST_KEY</string>
	<key>CRASH_REPORT_ENABLED</key>
	<true/>
	<key>MAX_SESSION_SECONDS</key>
	<integer>3600</integer>
	<key>NETWORK</key>
	<dict>
		<key>DEFAULT_CAPTURE_LIMIT</key>
		<integer>1000</integer>
		<key>DOMAINS</key>
		<dict>
			<key>embrace-echo-api.herokuapp.com</key>
			<integer>10</integer>
		</dict>
	</dict>
</dict>
</plist>
```
As you can see there are many properties available, even so most apps that use embrace do not include this file at the start.  The common setup options are all available via API, you will only require this file if you intend to use one of our more advanced configuration options.

#### CRASH_REPORT_ENABLED *boolean, optional*

Controls whether Embrace's internal kscrash-based signal handler is installed or not.  If disabled, Embrace will still attempt to mirror fabric crash reports but will not collect original reports.

If omitted, Embrace attempts to guess the right configuration by looking at the runtime classes.  

#### STARTUP_MOMENT_SCREENSHOT_ENABLED *boolean, optional*

Controls whether the Embrace startup moment will take a screenshot on completion or not.  The default is on.

#### CAPTURE_COORDINATES *boolean, optional*

Controls Embrace's capture of tap coordinates within the app.  When disabled, Embrace still captures taps but not the exact coordinates of the tap.  The default is on.

#### BACKGROUND_FETCH_CAPTURE_ENABLE *boolean, optional*

If enabled, Embrace will swizzle and capture requests made via the background task downloading api.  The default if off.

#### COLLECT_NETWORK_REQUEST_METRICS *boolean, optional*

If enabled, Embrace will capture detailed performance statistics about network requests.  The default is on.

#### ENABLE_AUTOMATIC_VIEW_CAPTURE *boolean, optional*

Controls Embrace's automatic view capture service.  When enabled Embrace will automatically capture all displayed viewcontrollers.  This can help give you useful timeline data for your sessions.  Some apps have single-view UI, such has media or gaming applications, in those cases it makes sense to disable this feature and record the data manually instead.  Default is on.

#### ENABLE_OS_LOG *boolean, optional*

Enables Embrace's OS_LOG tracking features, you can read more about those here: [**Augment Sessions using OS Log**]({{< relref "/ios/features/augment-sessions" >}}) This feature is off by default.

#### ENABLE_WK_AUTO_RELOAD *boolean, optional*

Embrace can perfrom some automatic webkit management for you.  This is off by default as not all apps can safely use it.  You can read more about this feature here: [**Web Thread Monitoring**]({{< relref "/ios/features/web-thread-monitoring" >}})

#### DISABLED_URL_PATTERNS *array[string], optional*

Use this field to specify an array of regex strings.  Whenever a URL is captured by Embrace, we check it against all the regexes in this array.  If any match we will not record that url in the session.  Use this to filter noisy urls from your sessions or protect PII from being uploaded to Embrace's servers.

#### URLSESSION_CAPTURE_FILTERS *array[string], optional*

This field can be used to make Embrace ignore certain URLSessions entirely.  Classes that match the regex strings in this array are not swizzled or interfered with.

#### STARTUP_AUTOEND_SECONDS *int, optional*

When set the SDK will attempt to automatically end the startup moment when the application settles.  This method will never be as accurate as placing endMoment yourself in your code.

#### WEBVIEW_STRIP_QUERYPARAMS *boolean, optional*

Disables the capture of query parameters in the session.  This can help if your query parameters contain private information that should not be uploaded to Embrace.  This property is off by default.

#### WEBVIEW_ENABLE *boolean, optional*

Enables or disables the WKWebview capture feature entirely.  When disabled no WKWebview's will be swizzled or recorded in your session data.  Default is on.

#### NETWORK *dictionary, optional*

The `NETWORK` dictionary can be added to the plist to allow more fine grained control of each url used by the application.

##### NETWORK:DOMAINS *array[string], optional*

This array contains regex strings that match network domains we might capture.  For each domain a corresponding limit key must be added below:

##### NETWORK:DEFAULT_CAPTURE_LIMIT *array[int], optional*

For each domain above a limit is added to this array.  The domains and limits are matched by their index in the array.  The limit controls how many times we will capture this domain in a given sessions.

##### NETWORK:CAPTURE_PUBLIC_KEY *string, optional*

When present the value in this field is used as a public RSA key to encrypt any captured network data to protect PII.  You can read more about this feature here: [**Network Body Capture**]({{< relref "/ios/features/network-body-capture" >}})

#### NSURLCONNECTION_PROXY_ENABLE *boolean, optional*

Enables or disables the capture of urlconnection requests entirely within the SDK.  When disabled no urlconnection objects are swizzled or recorded.  Defaul is enabled.

#### MAX_SESSION_SECONDS *boolean, optional*

Controls the automatic ending of sessions after a certain time has passed.  This setting is normally used in point of sale applications to ensure that data is uploaded periodically despite the device being always in use.  Please consult with your support representative beofre using this setting as it can effect the data representation in your dashboards.

#### TRACE_ID_HEADER_NAME *string, optional*

Embrace adds a header to all network requests to allow us to track that request and match it with the response.  For certain server configurations it is necessary to customize that header, this can be done using this plist setting.



