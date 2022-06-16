---
title: "Configuration File"
description: A reference guide to configuration options available in the iOS SDK
weight: 7
aliases:
  - /ios/configuration-file/
---

# Configuration File

## Embrace-Info.plist

Embrace is configured via an `Embrace-Info.plist` file placed at the root of the IPA, alongside the main application binary. An example of this file is included below as a reference:

```plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>BACKGROUND_FETCH_CAPTURE_ENABLE</key>
	<true/>
	<key>API_KEY</key>
	<string>TEST_KEY</string>
	<key>CRASH_REPORT_ENABLED</key>
	<true/>
	<key>NETWORK</key>
	<dict>
		<key>DEFAULT_CAPTURE_LIMIT</key>
		<integer>1000</integer>
		<key>DOMAINS</key>
		<dict>
			<key>example.com</key>
			<integer>10</integer>
		</dict>
	</dict>
</dict>
</plist>
```
As you can see there are many properties available. Even so most apps that use Embrace do not include this file at the start. The common setup options are all available via API. You will only require this file if you intend to use one of our more advanced configuration options.

#### CRASH_REPORT_ENABLED *boolean, optional*

Controls whether Embrace's internal kscrash-based signal handler is installed or not. If disabled, Embrace will still attempt to mirror Firebase/Crashlytics crash reports but will not collect original reports.

If omitted, Embrace attempts to guess the right configuration by looking at the runtime classes.

#### STARTUP_MOMENT_SCREENSHOT_ENABLED *boolean, optional*

Controls whether the Embrace startup moment will take a screenshot on completion or not. The default is off.

#### CAPTURE_COORDINATES *boolean, optional*

Controls Embrace's capture of tap coordinates within the app. When disabled, Embrace still captures taps but not the exact coordinates of the tap. The default is on.

#### CAPTURE_TAPPED_ELEMENTS *boolean, optional*

Controls Embrace's capture of tap element names within the app. When disabled, Embrace still captures taps but not the name of the tapped element. The default is on.

#### BACKGROUND_FETCH_CAPTURE_ENABLE *boolean, optional*

If enabled, Embrace will swizzle and capture requests made via the background task downloading API. The default if off.

#### COLLECT_NETWORK_REQUEST_METRICS *boolean, optional*

If enabled, Embrace will capture detailed performance statistics about network requests. The default is on.

#### ENABLE_AUTOMATIC_VIEW_CAPTURE *boolean, optional*

Controls Embrace's automatic view capture service. When enabled Embrace will automatically capture all displayed view controllers. This can help give you useful timeline data for your sessions. Some apps have a single-view UI, such has media or gaming applications. In those cases it makes sense to disable this feature and record the data manually instead. Default is on.

<!---#### ENABLE_OS_LOG *boolean, optional*

Enables Embrace's OS_LOG tracking features. You can read more about those here: [**Augment Sessions using OS Log**]({{< relref "/ios/features/augment-sessions" >}}) This feature is off by default.-->

#### ENABLE_WK_AUTO_RELOAD *boolean, optional*

Embrace can perform some automatic webkit management for you. This is off by default as not all apps can safely use it. You can read more about this feature here: [**Web Thread Monitoring**]({{< relref "/ios/features/web-thread-monitoring" >}})

#### DISABLED_URL_PATTERNS *array[string], optional*

Use this field to specify an array of regex strings that prevent network requests with matching URLs from being captured. Whenever a URL is captured by Embrace, we check it against all the regexes in this array. If any match, we will not record that request in the session. Use this to filter noisy URLs from your sessions or protect PII from being uploaded to Embrace's servers.

#### URLSESSION_CAPTURE_FILTERS *array[string], optional*

This field can be used to make Embrace ignore certain URLSessions entirely. Classes who's names match the regex strings in this array are not swizzled.

#### STARTUP_AUTOEND_SECONDS *int, optional*

When set, the SDK will attempt to automatically end the startup moment when the application settles. This method will never be as accurate as placing endMoment yourself in your code.

#### WEBVIEW_STRIP_QUERYPARAMS *boolean, optional*

Disables the capture of query parameters for webview URLs in the session. This can help if your query parameters contain private information that should not be uploaded to Embrace. This property is off by default.

#### WEBVIEW_ENABLE *boolean, optional*

Enables or disables the WKWebview capture feature entirely. When disabled no WKWebview's will be swizzled or recorded in your session data. Default is on.

#### NETWORK *dictionary, optional*

The `NETWORK` dictionary can be added to the plist to allow more fine grained control of each URL used by the application.

##### NETWORK:DEFAULT_CAPTURE_LIMIT *int, optional*

Sets a default limit for how many instances of any given domain to capture in a single session. The value can then be overridden on a domain-by-domain basis below.

##### NETWORK:DOMAINS *dictionary[string, int], optional*

This dictionary maps domains to capture limits. It should consist of string keys for domains we might capture. The value for each domain entry should be the corresponding capture limit. Any domain not in this list will use the [**DEFAULT_CAPTURE_LIMIT**]({{<relref "#networkdefault_capture_limit-int-optional">}}).

##### NETWORK:CAPTURE_PUBLIC_KEY *string, optional*

When present, the value in this field is used as a public RSA key to encrypt any captured network data to protect PII. You can read more about this feature here: [**Network Body Capture**]({{< relref "/ios/features/network-body-capture" >}})

#### NSURLCONNECTION_PROXY_ENABLE *boolean, optional*

Enables or disables the capture of URLConnection requests entirely within the SDK. When disabled no URLConnection objects are swizzled or recorded. Default is enabled.

#### MAX_SESSION_SECONDS *boolean, optional*

Controls the automatic ending of sessions after a certain time has passed. This setting is normally used in point-of-sale applications to ensure that data is uploaded periodically despite the device being always in use. Please consult with your support representative before using this setting as it can affect the data representation in your dashboards.

#### TRACE_ID_HEADER_NAME *string, optional*

Embrace adds a header to all network requests to allow us to track that request and match it with the response. For certain server configurations it is necessary to customize that header: this can be done using this plist setting.

#### CUSTOM_PATH_HEADER_INFO *dictionary, optional*

This is for auto generating relative paths for network requests similiar to how x-emb-path works.

This is a dictionary that contains Two Keys.

1. HEADER - This is a required key and its value is the name of the http header that is used to generate the relative URL paths
2. RELATIVE_URL_PATH - This is an optional key and when specified will be used as the begining value of all generated url paths seen on the dash.

this is the format
``` 
/(RELATIVE_URL_PATH value)/(value for http header thats name is equal to the value of HEADER)
```

Here is an example use case

{{< image src="/docs/images/ios-custom-header-example.png" alt="Custom Header Plist Entry Example" title="Custom Header Plist Entry" width="1236" height="118" >}}

This is a resulting Relative URL with above use case
```
/graphql/Notifications
```