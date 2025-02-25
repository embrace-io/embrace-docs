# FAQs

## Android

### Does the Android SDK capture socket requests?

As of December 2, 2022, the Android SDK does not capture socket requests.
If you are interested in seeing support for this, please let us know by emailing us at [support@embrace.io](mailto:support@embrace.io).

### How can I define custom app IDs for different build types?

See this section on how to configure different app IDs. [https://embrace.io/docs/android/features/configuration-file/#custom-settings-for-build-types-flavors-and-variants](https://embrace.io/docs/android/features/configuration-file/#custom-settings-for-build-types-flavors-and-variants)

### How can I prevent specific string obfuscations with DexGuard and Embrace for my Android app?

Add the following into your DexGuard config file to prevent specific string obfuscations with DexGuard.
-keepresources string/emb_app_id
-keepresources string/emb_ndk_enabled
-keepresources string/emb_sdk_config
-keepresources string/emb_build_id
-keepresources string/emb_build_type
-keepresources string/emb_build_flavor

### How do I use Embrace functions in modules or libraries?

In addition to performing the basic integration instructions, you must specify the Embrace SDK dependency directly in your module’s Gradle file implementation 'io.embrace:embrace-android-sdk:4.8.10'. You still need to apply the Swazzler plugin in the app’s Gradle file (apply plugin: 'embrace-swazzler') and verify that the Swazzler version set in your project Gradle file is the same as the version set for the SDK in the module’s Gradle file.

### How does Embrace identify users?

Embrace automatically generates an Embrace ID determined based on the device.
You also can pass a User ID to identify users through a set of methods related to the user identifier. Embrace.getInstance().setUserIdentifier("internal_user_id_1234")
Remember that this data will be uploaded to Embrace, so think about the privacy of your users and only include data you are willing to share. We recommend including an anonymized user ID only your agents can search for. The above call annotates the session with a user identifier that you can use later to search for this user. For more methods on setting user values, see the API docs. ([https://embrace.io/docs/android/features/identify-users/](https://embrace.io/docs/android/features/identify-users/))

### How does the Embrace Android SDK determine low power mode?

We determine low power mode through Android’s PowerManager. We listen for changes using a BroadcastReceiver, relying on the system’s save mode status.

### What determines if a session is classified as prod or dev?

A session is classified as dev if all of the following are true:
The buildType has the debuggable flag set to true in the app/build.gradle file.
The optional enableIntegrationTesting value passed to the SDK start method is true.
The debugger is attached (meaning you’re running the app on a device or simulator with the Android Studio debugger attached).

### What does Embrace use to hook into network calls on Android apps?

For Android, Embrace captures information from native UrlConnections, OkHttp3 and Volley.

### When does the Startup Moment begin and end for Android?

By default, the startup moment begins when the application starts (assuming the Embrace SDK start method is called in the onCreate method of the Application Class). The startup moment ends when the app's first activity goes to the foreground. Therefore, the duration of the startup moment is the time between app start and app in foreground.
To make any adjustments to the Startup Moment, refer to our technical documentation; [https://embrace.io/docs/android/integration/session-reporting/#end-the-startup-moment](https://embrace.io/docs/android/integration/session-reporting/#end-the-startup-moment).

### Why do I have super low rates of incomplete for startup e g 99 5 to 100?

The most common scenario is that we are auto-detecting an early activity which you should skip. Please refer to the [Performance Monitoring guide ](https://embrace.io/docs/android/features/performance-monitoring/)for how to correctly track startup completion rates and durations.

## iOS

### Does Embrace support Mac Catalyst?

Currently, we do not support Mac Catalyst. If you believe that your organization would benefit from us supporting Mac Catalyst, please reach out to [support@embrace.io](mailto:support@embrace.io).

### Does the Embrace automated dSYMs process works for Bitrise io?

Yes, it does! For instructions on how to upload dSYMs, please refer to this article; [https://embrace.io/docs/ios/integration/dsym-upload/](https://embrace.io/docs/ios/integration/dsym-upload/).

### How can I disable sending usernames and emails to Embrace?

We do NOT capture usernames and emails by default. Please be mindful in regards to what data you send to Embrace.
To disable sending usernames, email addresses, or unique identifiers to Embrace, please refer to the reference documents: [https://embrace-io.github.io/embrace-ios-sdk/Classes/Embrace.html#/c:objc(cs)Embrace(im)clearAllUserPersonas](https://embrace-io.github.io/embrace-ios-sdk/Classes/Embrace.html#/c:objc(cs)Embrace(im)clearAllUserPersonas)

### How is the Last View assigned for iOS Apps on the User Terminations Page?

For iOS, the Embrace SDK captures views on the `viewDidAppear` and then attempts to show the most relevant view when a session ends.
To manually set a view, use the `startViewWithName:` and `endViewWithName:` methods of the Embrace class. Setting a custom view does not let you select what the last view is going to be, but it provides more control over what is displayed in the dashboard. If your application has a complex UI structure with several View Controllers embedded it could be helpful to set the view name you want to see manually.

### Is the API Token used for uploading dSYMS the same for all apps in my organization?

Yes! Your API token used for uploading dSYMS is the same for all apps in your organization. This is a longer character string that is found in the dashboard on the settings page, under the Tokens section.
Further instructions about how to upload dSYMS can be found [here](https://embrace.io/docs/ios/integration/dsym-upload/#uploading-dsyms).

### What does the console log message Truncated Span with name network metrics to limit 1024 mean?

For iOS apps, you will see the message, _Truncated Span with name network_metrics to limit 1024l  _if a session has made over 1024 network requests. Once the limit is reached, we drop the oldest network metrics to keep the file size we use from growing unbounded.
When you see this message, we recommend reviewing that session to confirm whether you expect to see that many network requests in a given session.

### What is a user termination?

A user termination is when the user force quits the app (for example, on iOS it is when the user swipes up to quit the app or closes the app in the task switcher).
There is typically some percentage of the user base that will terminate the app regardless of whether or not there is an issue - which is why we look at the difference between the rate at which people background the app on a specific page vs terminate on the page.
If there is a big difference in the two rates, it often indicates that the page is frozen or blank.  This is indicated by high correlation values (marked in red) on the User Termination page.

### What is the Event time within a User Timeline?

On iOS, the time displayed is when the method to invoke the request was made.
In URLSession, this would be when a method like _dataTask(with:completionHandler:)_ is called, not when the resume method is called (added to the queue). If you're interested in collecting precise timing information, we recommend using the public interface to log network breadcrumbs manually.

### What is the binary size of iOS Embrace SDK?

As of iOS SDK version 5.9.2, the size of the framework sits around 9MB building for Arm64 alone or around 17 building for both Arm64 and Arm7. Please continue to refer to the iOS SDK Changelog to keep your app up-to-date on the latest SDK version, [https://embrace.io/docs/ios/changelog/](https://embrace.io/docs/ios/changelog/).

### Why am I seeing slug for error log messages?

For iOS, we commonly see &lt;`slug`&gt; when the log messages contain dashes, which is part of the syntax for our unified events. To have these events displayed separately instead of all grouped under the same &lt;`slug`&gt; event, put spaces instead of dashes with your app. This should remove the slug if all these events get reported using the same bit of your code.

## General

### Am I able to change the threshold for a moment different than 5s?

By default moment thresholds are 5 seconds. This means that if a moment takes longer than 5 seconds to complete, it will be marked as slow.
If you want to change the threshold for a moment (for example, a certain process may take 10 seconds long), please reach out to support@embrace.io or your Customer Success Manager to get help to adjust the threshold.

### Are Moments thread safe?

Yes, Moments (used to measure app performance) are indeed thread-safe for iOS and Android. In fact, all APIs on our SDKs are thread-safe unless explicitly marked otherwise.

### Are there any limits with logs?

There is a 128-character limit for messages.
There is a 10 property per log limit.
There is a 256-character limit for properties.
There are default log per-session limits:
  * Info Logs: 100 logs per session
  * Warning Logs: 100 logs per session
  * Error Logs: 250 logs per session
If the limit needs to be increased, please get in touch with [support@embrace.io](http://support@embrace.io) for help. As a best practice, we recommend using logs for important messages you want to capture (query/filter on the embrace dashboard). For non-crucial messages/additional session context, we recommend using breadcrumbs instead. Ref: [https://embrace.io/docs/best-practices/breadcrumbs/](https://embrace.io/docs/best-practices/breadcrumbs/)

### Can Embrace capture background app sessions?

Yes, we can! The Embrace SDK can be configured to enable the capturing of background sessions for Android (SDK v 5.10.0 and higher) and iOS (SDK v 5.15.0 and higher) apps. To enable and disable capturing background sessions, Admins should utilize the Settings page of the Embrace dashboard.


### Can Embrace handle Non fatal Crashes similar to Firebase?

In Firebase, non-fatal crashes are not considered crashes but rather caught exceptions that customers choose to log for the purpose of debugging or gathering information. They can be seen as non-fatal errors.
In order for Embrace to obtain the same information, customers would need to manually add the non-fatal logging just as they did in Firebase.

### Can Embrace identify if a user cannot access a part of an app because of a firewall?

Yes! This can show up in a number of ways depending on the firewall setup. For example, on the Network Monitoring page, you might see failed/blocked network requests that will likely show up as 403 network errors or connection errors.

### Can I delete a Slack channel?

You can also remove Slack channels as needed. A popup will appear if you try to delete a Slack channel that is associated with a preexisting alert. In this case, click the link to go to the corresponding Edit Alert page. Next, update the channel to an active one before completing the deletion.
Similarly, the “When an issue is reopened” message will appear if the Slack channel you want to delete is the assigned one for reopened issues. It will link to the Settings page of any apps in the organization where this is the case. Click through and update the channels where needed before continuing with the deletion.


### Can I have more than one slack channel integrated to each app?

Yes, you are able to add more than one slack integration. If you would like to set up your slack integration with Embrace, please navigate to the Settings page on the top right corner of the dashboard, and click into the Notifications section. There you will be able to add any slack channels.
Note: We currently do not support sending alerts to specific slack groups. If this is of interest to you, please let us know at [support@embrace.io](http://support@embrace.io).

### Can I send Embrace alerts to Google Chat or Microsoft Teams?

Yes! To send Embrace alerts to Google Chat or Microsoft Teams, use an integration tool like Zapier, Make, etc., or create a custom script to map the alerts. You cannot send the Embrace payload directly to MS Teams or Google Chat. The Embrace payload needs to be mapped in a way that MS teams/Google understands, and the mapping is different for every tool.


### Can I stop and start sessions manually?

You can **end** _but_ not start sessions manually using our public API.
Embrace.getInstance().endSession() or Embrace.getInstance().endSession(boolean clearUserInfo)
This method will end the session and start a new one automatically.
_The conditions to end sessions manually will only work under the following conditions:_
1\. The config must not be set to end sessions automatically every x amount of seconds.
2\. The config must not be set to end sessions in the background,

### Can I turn off screenshots for specific areas of my app?

Being able to see exactly what the user experienced often helps identify or solve an issue faster than looking through log messages or stack traces. Screenshots are taken by default for moments (e.g. Startup), Error Logs, and Warning Logs. To turn off screenshots via the SDK, please refer to the sections for Logs and Moments, or see the API docs. If you’d like to turn off screenshots for the entire app, please contact us and we will change the app configuration for you.

### Can our app user more than one crash reporter?

For iOS, we highly recommend only having one crash reporter turned on at a time. Using more than one may lead to a loss of crashes due to handler collisions and competition to receive data upon a user returning to the app.
If you decide to keep another tool like Firebase as your prominent crash reporter, Embrace will swizzle their message in an attempt to pull in  the crashes Firebase is reporting into Embrace.In some cases, Embrace cannot pull the crash fast enough from Firebase before the app crashes. Please refer to our technical documentation for [**more information**](https://embrace.io/docs/ios/features/configuration-file/#crash_report_provider-string-optional)**.**
For Android, yes, Embrace adds itself as a listener for uncaught JVM exceptions, but we pass on exceptions to any handler that was registered when we registered ours so that both listeners will receive the uncaught exceptions.
For NDK exceptions, we replace any existing signal handlers, which are used to capture C and C++ exceptions. Similarly, other NDK crash capture tools would be likely to replace our signal handlers if they are initialized after our SDK.

### Can we set up Single Sign On SSO access with Embrace?

Yes, you can! We support any SSO provider with SAML 2.0 services like Okta, Azure, Google, and Onelogin.
Currently, we only support one SSO connection per organization.
Please contact us via slack or [support@embrace.io](mailto:support@embrace.io) and we can help set up SSO for you.
**After** speaking with Support, please click on one of your organization's applications and follow the instructions on the SSO tab of the Settings page.
Additional documentation on configuring SSO for your organization using OneLogin as the SSO provider can be found at [https://embrace.io/docs/product/sso/](https://embrace.io/docs/product/sso/). Please note, that these steps would be very similar with other providers, and Okta, PingIdentity, and Google have been tested. For how to obtain the metadata from Okta, please refer to [their documentation](https://support.okta.com/help/s/article/Location-to-download-Okta-IDP-XML-metadata-for-a-SAML-app-in-the-new-Admin-User-Interface?language=en_US).

### Definitions of keys in the Network Body Capture JSON file?

1. `dur`: The duration of the network request in milliseconds.
  2. `et`: The end time of the request.
  3. `m`: The HTTP method the network request corresponds to.
  4. `mu`: The matched URL from the rule.
  5. `id`: UUID identifying the network request captured.
  6. `qb`: Request body.
  7. `qi`: Captured request body size in bytes.
  8. `qq`: The query string for the request, if present.
  9. `qh`: A dictionary containing the HTTP query headers.
  10. `qz`: Request body size in bytes.
  11. `sb`: Contents of the body in a network request.
  12. `si`: Captured response body size in bytes.
  13. `sh`: A dictionary containing the HTTP response headers.
  14. `sz`: Response body size in bytes.
  15. `sc`: UUID identifying the network request captured.
  16. `sid`: Session ID that the network request occurred during.
  17. `st`: The start time of the request.
  18. `url`: The URL being requested.
  19. `em`: Error message in case the network call has failed.
  20. `ne`: Encrypted data.

### Do I need to make log calls on a background thread?

No, the log methods in our SDKs are designed to be called wherever you need to log things in your app without adding excessive latency. Very little work is done on the calling thread and the majority of the work to send the log to our backend is done on a worker thread.

### Do Moment Startup metrics include warm and cold starts?

No, Moment Startup metrics like Moment Median Duration, Moment Abandon & Stall Percentages comprise only cold starts. For the startup moment to trigger, it has to be a cold start.

### Do you capture WebViews and if so to what extent?

Yes, we capture WebViews. Each WebView, whether built by you or a vendor (e.g. ads, promos and registration), are displayed on the User Timeline. Embrace captures the network URL, the duration, as well as simultaneous native events. Anything taking place exclusively within the WebView is not captured.

### Do you support GRPC?

Yes. Please contact us at support@embrace.io for the steps to track GRPC.

### Do you support GraphQL?

Yes, we have multiple customers that use GraphQL.
Generally, network requests made to a REST API each hit its own unique endpoint. From a monitoring perspective, this is helpful because developers can clearly see rolled-up network metrics by the path.
GraphQL is a bit different in that each request hits the same /graphql endpoint. Thus, it can be difficult to monitor requests that may perform different actions. Here we will show you how to configure your integration so you see different GraphQL requests broken out by “path” in the Dashboard.
Override Paths of Requests
It’s possible to override the path of a network request that the Embrace SDK captures by setting the x-emb-path header. For example, if your network request is made to [https://example.com/graphql](https://example.com/graphql), and you set the x-emb-path header to /graphql/friends_list, the request will be reported a[s ](https://example.com/graphql/friends_list.)[https://example.com/graphql/friends_lis](https://example.com/graphql/friends_list.)t. The x-emb-path value must meet the following requirements or it will be ignored.
  * Must be a string with a length in the range from 1 to 1024 characters
  * Must start with a /
  * Must only contain ASCII characters

### Does Embrace automatically count a moment as abandoned if the user backgrounds the app?

Moments are independent of whether or not the app is in the foreground or background.  If the app is backgrounded and the moment still completes it will show up as complete. If someone backgrounds the app and the app gets killed by the OS, then it would show up as incomplete.

### Does Embrace capture NDK crashes and ANRs?

Yes, Embrace captures NDK crashes and ANRs.
To capture NDK ANRs, please reach out to your Customer Success Manager. We have additional functionality in a closed beta that samples the native NDK threads.

### Does Embrace intercept API calls made through open sockets?

While Embrace captures all API calls automatically, we purposefully do not intercept those made through open sockets. You will immediately see those not made using a socket, especially those made by ads SDKs, which can be extremely helpful for identifying quick issues, determining the cause of a broken startup, and determining issues with ads.
  * For first-party socket calls: Please send API calls made via sockets to Embrace using the LogNetworkRequest API via the sample provided below. The typical change is 2-3 lines of code.
  *
// For logging a manual network request:
// Example to get a correct timestamp, Linux ms format: long startTime = System.DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
Embrace.Instance.LogNetworkRequest("[https://www.embrace.io](https://www.embrace.io)", HTTPMethod.GET, startTime, endTime, 533, 633, 200, "");

### Does Embrace support Android TV and tvOS?

Yes, we support Android TV and tvOS. Check out our changelog for the latest [Android](https://embrace.io/docs/android/changelog/) and [iOS](https://embrace.io/docs/ios/changelog/) SDKs.

### Does Embrace support Hermes for React Native?

Yes, we support Hermes in Embrace Android SDK versions 5.5.0 and above. Please ensure that you are using at least version 0.60.4 of React Native when utilizing Hermes.
_To stay on top of our latest SDK releases refer to  _[_the ChangeLog._](https://embrace.io/docs/android/changelog/)
_If you'd like for us to add support for Hermes on iOS, please let us know at[support@embrace.io](mailto:support@embrace.io). _


### Does Embrace work with Buck OKBuck?

Not currently. Please contact us at support@embrace.io or on Slack if you would like to request support.


### Does the metric User Count count User or Embrace IDs?

The metric **User Count** in custom dashboards, is calculated using the count of Embrace IDs.

### Getting Started Creating Alerts?

Embrace’s Alert feature is a powerful feature that allows your team to be the first to know about issues and to be proactive about potential problems. It allows teams to create alerts based on metrics, first-seen issues, performance, and network-related errors. In addition, you can configure alert thresholds to fit your needs, enabling you to differentiate warnings from errors.
**Table of Contents:**
  * #### How to Send Alerts
    * #### To Slack
    * #### To Email
    * #### To Webhooks
  * #### Alerts Summary Page
    * #### Alert Tabs
  * #### Examples of Types of Alerts
    * #### Filters
    * #### Creating a Crash "Metric" Type Alert
    * #### Creating a Performance "Metric" Type Alert
    * #### Creating a Session Outcome "Metric" Type Alert
    * #### Creating a General Health "Metric" Type Alert
    * #### Creating a "First Seen Issues" Type Alert
    * #### Creating a "Proactive Network Errors" Alert
### **Creating a Performance “Metric” Type Alert:**
_Moments_  are Embrace’s way of monitoring the timing and outcome of key user moments within your mobile apps. They are best used to track critical user flows that are generally short in nature. The goal is to understand where these user flows are running slow, ultimately leading to user frustration and app abandonment. To implement custom moments, check out the Embrace integration documents.
Here are just a few examples of the many ways you can be alerted to underperforming key moments:
  * When startup abandonment exceeds 0.5% of sessions
  * When the purchase completion rate drops below 97%
  * When sending a chat message stalls out more than 2% of the time
  * When median startup time exceeds 3000ms
*Utilize the _Filter_ , to focus on a specific moment name, property key, or value.
### Creating a Session Outcome “Metric” Type Alert:
These additional metrics allow your team to be notified of spikes in a wider range of failure types. For example, e-commerce and social media apps can surface when they are exceeding resource constraints with excessive images and videos. In addition, mobile games can quickly investigate new ANRs that might be hurting their Google Play Store ranking.
### Here are some examples of different ways you can alert on session outcomes:
  * ANR exit percentage
  * User terminated session percentage
  * Crashed session percentage
  * OOM session percentage
* Utilize the _Filter_ , to focus on a specific app version, device, and OS metrics, or session property keys and values.
###
### Creating a General Health “Metric” Type Alert:
These metrics can point your team towards potential problem areas. For example, a spike in low memory warnings could indicate excessive memory usage, insufficient caching, or the presence of memory leaks. A decrease in session duration times could mean that users are struggling to use new features or abandoning slow experiences. Metric alerts are evaluated in the previous real-time frame (i.e., 10:02 to 11:02). egardless of the time window selected, each alert is evaluated every minute.
### Here are various examples of different ways you can alert on session outcomes:
  * Low memory session percentage
  * Session average duration
  * App health
*The App Health metric is the percentage of sessions that do not contain a crash or error log. It’s a great way to monitor the overall stability of your application. You can track this metric across features and releases for quick visibility into regressions or improvements.
* Utilize the _Filter_ , to focus on a specific app version, device, and OS metrics, or session property keys and values.

### Getting Started Creating Dashboards?

Embrace provides the options to create custom dashboards to offer a better way to dig into your data. Any individual user can make a dashboard. Once their dashboard is published, it will be visible to your entire organization.

### How Are Log Messages Wildcarded?

Log wildcarding works similar to network wildcarding, but rather than splitting on “/”, we split on spaces, and then we look for common prefixes.
So for example: "this is a log message" would get split into "this", "is", etc. If we see the log "that is a log message", then we have a prefix of “this” and one of "that", and we permit up to 100 unique values
If there is no split in the message, the full message gets replaced with a single &lt;`wildcard`&gt; if it gets to more than 100.
For log messages that are split using "?", "&", etc. We recommend splitting the log message on the app side.


### How are low memory warnings calculated?

Low memory warnings are calculated differently for Android and iOS. The Unity SDK does not handle low memory warnings and follows the behavior of the native SDKs.
On Android, we are listening to System’s **onTrimMemory** which is determined by the OS when it is a good time for a process to trim unneeded memory. If the value returned is **10 (TRIM_MEMORY_RUNNING_LOW)** we attempt to capture the timestamp.
For iOS, we receive the notification **applicationDidReceiveMemoryWarning** from the OS. This indicates the phone is running out of memory.

### How are session property keys and session property values tied together?

Session properties are custom additions to an integration that help describe a session. They are assigned upon session start.
If you select a session property key, you will only get the values that belong to that key.
For example, if one session property key is "app mode" with session property values: "light mode" and "dark mode" and a second session property key is "payment setup" with session property values: "apple pay", "visa", if I select "app mode", I will only see "light mode" and "dark mode" as options, I will not see "apple pay" or "visa".

### How can I QA and get results instantly in the dashboard?

When running sessions in Embrace, you will get data in the dashboard in close to real time -- we recommend cold starting a new session to send sessions to the dash.
To get as close to "real" data as possible, we encourage users to use a production device fully disconnected from the computer, and to background their sessions and reopen them in order to ensure sessions and crashes are sent to our servers.
You can get instant feedback on your integration with the Debugger Sessions tab in the dashboard when your device is connected to the debugger.

### How can I capture the body of a network call?

Embrace’s SDK uploads information about network requests into your sessions to help you understand and troubleshoot networking problems for [iOS](https://embrace.io/docs/ios/features/network-body-capture/); V5 [https://embrace.io/docs/ios/features/network-body-capture/,](https://embrace.io/docs/ios/features/network-body-capture/,) V6 SDK [https://embrace.io/docs/ios/open-source/features/network-body-capture/](https://embrace.io/docs/ios/open-source/features/network-body-capture/) and [Android](https://embrace.io/docs/android/features/network-body-capture/); [https://embrace.io/docs/android/features/network-body-capture/](https://embrace.io/docs/android/features/network-body-capture/) (Embrace SDK version 5.13.0 and above). Embrace can also capture the network body, including the request, response, and headers. As of May 2023, we do not support network body capture for Flutter or Unity apps or the ability to turn on network body capture for _all_ errors at one time. To enable this functionality, we need to know the specific codes and methods.
This feature can only be enabled by your Embrace representative. Please reach out on Slack or via [support@embrace.io](http://support@embrace.io) to set this up.
*For Android apps, the network body capture feature is supported in SDK versions Android SDK 5.13.0 and above. Additionally, please make sure you have the following property set as true in your embrace-config.json file before reaching out to Support. Our configuration documents can be found [here](https://embrace.io/docs/android/features/network-body-capture/).
```json
{
  "app_id": "XXXX",
  "api_token": "XXXX",
  "sdk_config": {
  "networking": {
  "capture_request_content_length": true
}
}
```
Important to note: Network bodies are not captured by default with our service. Therefore, we are not able to provide historical data. However, we can turn on this service on a request-by-request basis for short periods.
**In your request please include:  **
  1. The Embrace App ID
  2. Domain and the corresponding path,
  3. Method type (POST/GET/etc.)
  4. Status codes (Ex: 501),
  5. How long you'd like to run the request depends on the error frequency.
  6. Once you receive the network bodies from our support team, please refer to [**this article**  ](https://support.embrace.io/support/solutions/articles/66000520578-definitions-of-keys-in-the-network-body-capture-json-file)for instructions on interpreting the keys in the network bodies.

### How can I improve network and log classification for my app?

We can exclude certain paths from being collapsed and disable/enable classifications like `number`, `hex`, `ext`, etc. This also applies to log rollups.
If you would like to make changes to the classification of certain paths or log rollups for your app, please reach out to [support@embrace.io](mailto:support@embrace.io) with the App ID and the following information depending on what you'd like to change.
  * If you'd like a specific subdomain or all subdomains to be excluded from the rollup, please provide the subdomain(s). If you'd like _all_ subdomains to be excluded, please provide an estimate for how many subdomains this is.
  * If you'd prefer that a certain path or log be excluded from the rollup. Please share the path or the log details.
  * To prevent converting parts paths or logs into `number`, `text`, `slug`, `hex`, `uuid`, please share the path and or log that you'd like to change.

### How can I measure Bluetooth connection with Embrace?

As of July 2022, we do not track BT connectivity. For stability tracking, we recommend using breadcrumbs to track normal BLE events and then error logs to track abnormal events.
For example, for performance tracking, you could use moments by starting a moment when the user initiates the connection and ending the moment when the connection takes. That would provide you with a good view of the average performance your users are experiencing and incomplete moments would show you how many users are failing to connect.
If you are interested in us adding support for monitoring Bluetooth connectivity, please let us know by sending us an email to [support@embrace.io](mailto:support@embrace.io).

### How can I resolve an Android OkHttp crash?

The Embrace SDK often appears in the stack trace of an OkHttp crash due to the nature of how OkHttp intercepters work, by chaining the calls one after another. You will often see multiple intercept() calls in the stack.
To resolve this type of crash, we recommend first looking at where exactly the crash occurred. For example, if the crash happened in the _okhttp3.internal.http2.Http2Stream.takeHeaders_ , this suggests that the way the headers were sent could have contributed to the crash.

### How can I tell if a crash has been dysymbolicated?

Special files known as "dsyms" need to be [uploaded](https://embrace.io/docs/ios/integration/dsym-upload/#uploading-dsyms) by the developer (either directly through the build process or in our dashboard) to "decode" crashes.
If the dsym has been uploaded, you will see a fully detailed stack trace on the Crash Details page. If not, there will either be a highlighted message stating the dsym needs to be uploaded, or for the crash you will see a still-masked crash name such as Module offset XXXXXX.

### How can I use Embrace to reduce startup time?

Moments are timed, non-user interruptible processes within the app, such as startup, purchase, or add to cart.  Like a stopwatch, the time is marked between a start and end message, both placed by the developer in the app.  By tracking startup, a developer can see what's contained in the startup moment, such as long network calls, blocking calls (calls that need to finish before the startup is complete), or non-needed third party calls.  Developers can observe long startups in user timelines to see where the app is held up, and can remove/modify calls in order to speed up the startup.
You can see your data related to Moments in the App Performance section of the Embrace dashboard.

### How can I use session properties?

Session properties are one way to annotate a session and can be used to segment and filter your data. The default limit for session properties is 10. In SDK versions;  Android 5.14.2 and iOS 5.16.1 and above, up to 100 session properties are supported. To increase the number of session properties for your app, please reach out to [support@embrace.io](mailto:support@embrace.io).
The difference between session properties and user personas is that the former are for items relating to the session or the device and not necessarily to the user. Different use cases for session properties might include light vs. dark mode, portrait vs. landscape, and also adding properties for different A/B tests your team may be running.
To implement session properties, please see more in our docs here: [https://embrace.io/docs/react-native/features/identify-users/#session-properties](https://embrace.io/docs/react-native/features/identify-users/#session-properties)

### How can I verify Android integration?

The verify method was created in order to make the Embrace SDK integration easier.
This process should be executed by the client only the first time after integrating Embrace or when the support team requests. That way, if some integration issue is found customers could easily share what is wrong.
Verify() runs a series of actions to check if the Embrace features are working well.
For Kotlin:

```kotlin
    import io.embrace.android.embracesdk.Embrace
    class MyApplication : Application() {
        override fun onCreate() {
            super.onCreate()
            Embrace.getInstance().start(this)
            EmbraceSamples.verifyIntegration() // temporarily add this to verify the integration
        }
    }
```

For Java:

```java
    import io.embrace.android.embracesdk.Embrace;
    public final class MyApplication extends Application {
        @Override
        public void onCreate() {
            super.onCreate();
            Embrace.getInstance().start(this);
            EmbraceSamples.verifyIntegration(); // temporarily add this to verify the integration
        }
    }
The user will see a toast icon indicating the Embrace verification is running. It shouldn’t take too long (&lt;1 min), but it could be slow depending on their internet connection.
The method will run the following actions:
  * Log a Breadcrumb
  * Set user data
  * Add info, warning, and error logs
  * Start and end a moment
  * Executes a GET request
  * Add the trace id to the request (default or the one specified in the local config)
  * Check the current and the latest SDK version
  * Execute a POST request
  * Execute a bad request
  * Trigger an ANR
  * Throw an Exception
This last step will relaunch the application.
When the application comes to the foreground again, it ends the session and checks if it can be sent. A popup will be displayed with the results.
```


### How can Trace IDs be used in Embrace?

We do not capture headers by default. However, you do have the option to implement [trace IDs](https://support.embrace.io/support/solutions/articles/66000495529-how-do-you-capture-trace-ids-for-network-requests-). Trace IDs are helpful for debugging with backend monitoring. For example, if you come across a slow particular network request in Embrace, you can take the trace ID and search for it in your server-side monitoring to look deeper into why the call took so long.

### How do I add First Party calls?

By default, Embrace has no way of knowing which of your calls are First Party so you will have to set this up in your account.
Admins are able to set First Party Calls by going to Settings (Gear in the Top Right Corner of your account) &gt; Click on Domains &gt; Add any First Party Domains. 
Once First Party calls are identified, you can filter by "first party" in the dashboard.


### How do I disable WebViews?

To disable webview tracking, you can set the WEBVIEW_ENABLE value to false in the config plist file.

### How do I enable capturing Android crashes occurring in Android SDK frameworks base media jni android media MediaCodec cpp 345?

To enable capturing crashes these types of crashes in Embrace, set the following value to true in your embrace-config.json: **"ndk_enabled": true,  **

### How do I make a user an Admin on the dashboard?

Admin users have full control over all organization settings, full access to all projects, and edit access to user & team permissions.
Examples of what the Admin can configure include:
Jira integration
Webhook
Single Sign-On
Only an Admin can make another user an Admin. To update a user's permissions, as an Admin, under Settings, accessible via the gear icon in the dash, go to the "Users & Teams," "Users." Select the pencil next to the user and "Admin" under the Role dropdown and choose "Save."
If no one at your organization is an Admin, please contact us via slack or at [support@embrace.io](mailto:support@embrace.io) with the user's email address requesting Admin access and we will take care of that for you!
To learn more about User Permissions, refer to [**this article**](https://embrace.io/docs/product/permissions/?_highlight=admin#admin-role)**.**


### How do I set up Alerts to send to Slack?

Slack integrations are stored at the organization level. Admins can configure alerts to be sent from slack. From the dash, select an app, then proceed to Settings - Notifications. You then can set up your slack integration on this page. If there is already a slack connected, then you'll see the info for that integration, including team name and channels.
Note: We currently do not support sending alerts to specific slack groups. If this is of interest to you, please let us know at support@embrace.io.

### How do I switch between different apps in the Embrace dashboard?



### How do I update my email preferences?

To unsubscribe from Daily Digest or emails related to issues, under "Settings - Notifications", uncheck the appropriate box and select "Save".
Note: If you are subscribed to multiple App Digests, you will need to uncheck this box for each app. Additionally, if you select unsubscribe on a daily digest email, you will stop receiving daily digest emails for _all_ apps in your organization.

### How do I use the Debug page?

### For IOS:
Crashes will also show up, but only if the Xcode debugger is disconnected. The Xcode debugger will swallow up the crash before we'd be able to capture it. This can be quickly done by backgrounding and then reopening the app. The Embrace Debugger Sessions have nothing to do with the Xcode Debugger. It's just an overloaded term for different purposes. Ours is to debug your Embrace integration into your app.
###
### For Unity:
How to use the debugger page depends a lot on the version and plugins being used and how the project was built as every Unity game is unique. If you export your Unity game to Android or iOS and run it from the platform-specific app Android studio or Xcode, you are using a debugger in the Embrace "debug sessions." On the other hand, if you are running from inside Unity, you are unlikely to use a debugger. In technical terms, "Embrace debug sessions" only happens when the process has the ptrace port connected: [https://en.wikipedia.org/wiki/Ptrace](https://en.wikipedia.org/wiki/Ptrace)

### How do screenshots work?

Screenshots are **not** enabled by default. You may enable them for slow moments (e.g. Startup), Error Logs, and Warning Logs. Screenshots allow you to see exactly what the user experienced which often helps identify or solve an issue faster than looking through log messages or stack traces.
We recommend only enabling screenshots in development builds. If you do choose to enable them in production, please be sure to only enable them in parts of your app that do not contain PII.
To turn on screenshots via the SDK, please refer to the sections for [Logs](https://embrace.io/docs/android/integration/log-message-api/), and [Moments](https://embrace.io/docs/android/features/performance-monitoring/), or see the [API docs](https://embrace-io.github.io/embrace-android-sdk3).

### How do we look at CPU usage?

We look at CPU usage in isolation. We do not couple CPU usage with memory usage spikes when the CPU is being spun hard.

### How do we measure duration for crashes OOMs?

You can estimate the session duration by taking the last session heartbeat (which is taken every 5 seconds) and subtracting the start message time.
On that note, you will see cases in the dashboard where OOMs are measured as just a few milliseconds. In these cases a start message has been fired and a heartbeat milliseconds later, but the app OOMs before the next heartbeat at 5 seconds is recorded. This also explains why OOM durations are generally found in multiples of 5 seconds.

### How does Embrace capture country and region?

We record the first three octets of the IP address to identify the user’s country and region. The last octet is never recorded. Additionally, the partial IP address is not stored permanently and cannot be viewed in the dashboard.

### How does Embrace classify if a network request is Media?



### How does Embrace count users?

We are counting the number of unique users for which we receive sessions from in the time range selected.
For example, if a user upgraded to the latest app version, but we have not yet received a session for that user, we will not count that user on the latest app version. To understand how Google counts users, please refer to their documents.

### How does Embrace create a device ID?

It is purely an internal ID that is locked to the app and deletes when the app is removed from the device

### How does Embrace define CPU pegging?

CPU pegging occurs when 80% of CPU is used on Android and 90% of CPU is used on iOS.

### How does Embrace define a session?

At Embrace, we define a session as each unique device interaction in which a Customer app opens to the foreground. When the app is backgrounded (the app crashes or the user implements a manual end to the session) that marks the end of that session.
There is no minimum or maximum time limit for a session.  Sessions within five minutes of one another are stitched together to represent a single user experience (a stitched session).
If a user clicks a link in the app and this opens the web browser (also known as embedded browser), and then exits the browser back into the app, this is still a single session.

### How does Embrace delivery session data if there is no WIFI Data or if there is a firewall?

We cache all data prior to sending it to Embrace. If it fails to send, we attempt again later(every 60-seconds) and continue trying until the disc space is full, at which time the oldest message/data is deleted first. Therefore, we continue to retry so long as we don't surpass a hard drive space restriction.

### How does Embrace identify abandoned moments?

App Performance consists of both either completed and incomplete "Moments". An abandoned moment falls within the incomplete category when when the app moment does not complete, and the user does not wait longer than the predefined threshold (which by default is 5 seconds*).
Some reasons why a moment may be defined as abandoned would be that:
  * the user exits the app before the moment ends
  * the app crashes
  * an unexpected code path is taken
*If you have questions about changing the 5 second threshold please reach out to support@embrace.io.

### How does Embrace identify stalled moments?

App Performance consists of both completed and incomplete "Moments." A stalled moment falls within the incomplete category when the app moment does not complete, but the user waited longer than the predefined threshold (which by default is 5 seconds*).
*If you have questions about changing the 5 second threshold please reach out to support@embrace.io.

### How far back can I access data?

The standard Embrace plan allows you to access aggregated data in the last 30 days (in up to 14 day ranges), and user session replays for the last 14 days.  Please contact your Account Manager to get more information on one of our plans that will allow you to access aggregated data in the last 15 months and user session replays for the last 30 days.

### How is crash free session rate calculated via the Metrics API?

The [Embrace Metrics API](https://embrace.io/docs/embrace-api/) allows you to query your metrics from Embrace using PromQL. A list of supported Standard Metrics can be found **[here](https://embrace.io/docs/embrace-api/supported_metrics_and_queries/)******.
_Crashes_total_ / _sessions_total_ will not produce the same value as _crash-free session rate_. This is because some crashes do not have Session IDs associated with them because things happen, but they happened on a session. We have a background process that attempts to conciliate crashes with the session.
In Metrics API, there are two kinds of metrics: Metrics that we calculate when we receive the request from the customer and metrics that we pre-calculate. For the metrics that we pre-calculate, we don’t have up-to-date data.
daily_crash_free_session_rate, daily_sessions_total, and daily_crashes_total utilize up-to-date data. Crash_free_session_rate is more accurate than crashes total / sessions total.

### How is the  of Crash Free Users calculated?

The crash-free user percentage is equal to 100 - (the total number of unique users that experienced a crash /  the total number of unique users). Therefore if a user experiences a crash multiple times, that user is only counted once in the total calculation.

### How is the Embrace ID generated?

The Embrace ID is tied to the actual device and is a randomly generated number. We do not rely on the actual device ID, IDFA, IDFV or anything PII-related.

### How is the delivery of data impacted when the user is offline?

If devices are offline, data will not be sent in real-time. Instead, data will be cached until the device has a connection and the app is in the foreground.

### How long do we retain data?

14 days; 30 days for an additional cost
David edit: For the basic plan, we retain 14 days of user timelines and 30 days of aggregated data in the dashboard. For an additional cost, we can retain up to 30 days of timelines and 465 days (15 months) of aggregated data.

### How many Widgets are supported in a dashboard?

Currently, we support up to 20 widgets in a dashboard.

### How should I interpret the ANR related metrics in Embrace?

On the ANR, Application Not Responding, summary page for Android applications, there are multiple different terms.
Here is how we define these terms in Embrace, starting from the top of the page.
  * ANR Summary; in Embrace, an ANR begins when the main thread is blocked for &gt; 1 second
  * ANR Duration; how long the ANR lasted
  * ANR Interval; similar to ANR duration, the activity between the start and end time of an ANR
    * Within ANR intervals, we "sample", meaning that we start taking rapid snapshots of data when the ANR starts because we don't know what'll happen with the ANR. For example, will it recover?, how long will it be before it ends?, etc.
  * ANR sample: tied to the "first sample", "ad-focused sample", and the "most representative sample" group by filters at the top of the page.
    * First sample; the first piece of information collected when the ANR initially occurred. We typically find that grouping by the first sample provides the most helpful clues for debugging as it is the sample closest to the original source of the ANR.
    * Ad-focused sample; when selected, we analyze all the samples and use the one that occurs most frequently and also contains at least one frame with an ad SDK in the stack trace
    * Most representative sample; when selected, we analyze all the samples and use the one that occurs most frequently.
  * ANR-Free Sessions; sessions that do not contain an ANR
  * ANR-Free Users; users that do not experience an ANR during the time period selected
  * ANR Exit Percent** ** \- Calculates the percentage of sessions with an ANR exit.
  * ANR Exit User Percent - Calculates the ANR exit percentage per user.
  * ANR Session Percent - Calculates the percentage of sessions with ANR occurrences.
  * ANR User Percent - Calculates the percentage of users with ANR occurrences.
To learn more about ANRs and how to minimize work on the main thread, check out [this article](https://blog.embrace.io/minimize-main-thread-work-eliminate-android-anrs/).

### How should I manage different Build Types?

You may want to enable the Embrace SDK on only certain builds (production), or send different data to different dashboard instances (think prod vs. dev).  To separate production data vs. development or staging data, we recommend creating a new platform with a new app key and sending data to separate keys.  For only enabling Embrace on specific builds, see the following for iOS vs. Android:
On iOS:
  * On iOS our SDK is enabled by calling a variant of "[[Embrace sharedInstance] startWithKey:@"API_KEY"];
  * To enable it in only certain build configurations (debug vs release for example), we just have to call or not call that method conditionally. In Xcode we can add a flag for this under the target's build settings -&gt; Preprocessor Macros.
  * In that setting you'll see all the existing build configurations. If you pick one you can add custom preprocessor defines. For this let's add "USE_EMBRACE=1" under the "Debug" configuration and "USE_EMBRACE=0" under the "Release" configuration.
  * Now, going back to the place in the code where we start the embrace SDK we can now wrap that call to check our new preprocessor flag: "#if USE_EMBRACE
    * [[Embrace sharedInstance] startWithKey:@"API_KEY"];
    * #endif"
    * You can verify it is working by switching the run configuration of the app between debug and release. Xcode will ignore anything inside the USE_EMBRACE block while in release mode.
On Android:
  * See documentation [here: ](https://embrace.io/docs/android/features/configuration-file/#custom-settings-for-build-types-flavors-and-variants)[https://embrace.io/docs/android/features/configuration-file/#custom-settings-for-build-types-flavors-and-va](https://embrace.io/docs/android/features/configuration-file/#custom-settings-for-build-types-flavors-and-variants)riants

### How to use Embrace breadcrumbs to build better iOS user experiences?

Understanding mobile user behavior and tracking events within your app is crucial for delivering a better user experience.
[Breadcrumbs](https://embrace.io/blog/adding-visibility-through-logs/), a valuable tool provided by Embrace, can help you achieve just that.
In this post, we'll quickly explore how to implement breadcrumbs in your iOS application using Embrace in order to [gain insights into user sessions](https://embrace.io/product/user-session-insights/) and [improve your app's performance](https://embrace.io/product/app-performance/).
Before diving into the implementation, let's briefly discuss what breadcrumbs are and why they matter. Breadcrumbs are lightweight, unobtrusive log messages that provide insights into user interactions within your app. These messages are especially valuable when tracking events that might not otherwise be visible in a session, but are still essential for understanding user behavior.
To implement breadcrumbs in your iOS application using Embrace, you can use the `addBreadcrumb` method. Here's how you can add a breadcrumb to your app's session:
For Swift:

```swift
    let msg = "Master table view editing mode did change to: \(editing), animated: \(animated)"
    Embrace.sharedInstance().logBreadcrumb(withMessage: msg)
JavaScript
For Objective-C:
    NSString *msg = [NSString stringWithFormat:"Master table view editing mode did change to: %@, animated: %@", editing, animated];
    [[Embrace sharedInstance] addBreadcrumbWithMessage:msg];
Objective-C
In the examples above, a breadcrumb is added to a sample application to track when the user enters and exits editing mode on a table view. This event might not be otherwise visible in the session but can be crucial in understanding what the user does next.
Remember that breadcrumb messages must be 256 characters or less — after this point, they’re truncated. The great thing about breadcrumbs is that they add very little CPU or memory overhead and trigger no networking calls, making them an efficient way to enhance your app's monitoring capabilities.
To make the most out of breadcrumbs, it's essential to follow best practices. Some key points to keep in mind include:
1. Keep breadcrumbs simple: If you need to search, filter, aggregate, or alert on this data in the future, then it should be a log instead.
If this data provides additional context when reviewing a user session, it should be a breadcrumb.
2. Focus on critical (but not too critical) events: Use breadcrumbs to track critical events or interactions within your app that are not easily observable through other means. Breadcrumbs are most helpful when they provide deeper technical context into the user session.
If you need to be alerted to a critical event, then this should be a log rather than a breadcrumb.
3. Avoid overloading with breadcrumbs: While breadcrumbs are lightweight, too many of them can still clutter your session data. Use them judiciously.
Check out this post for additional information on [when to use logs versus breadcrumbs](https://embrace.io/blog/adding-visibility-through-logs/).
You can learn more about how to use breadcrumbs effectively by visiting Embrace’s [best practices page here](https://embrace.io/docs/best-practices/breadcrumbs/).
Incorporating breadcrumbs into your iOS application using Embrace is a smart move to gain deeper insights into user behavior and enhance the overall user experience. By logging essential events that may not be visible in your app's session data, you can make data-driven decisions to improve your app's performance and usability.
Learn more about leveraging Embrace to build better iOS experiences, [here](https://embrace.io/platforms/ios/).
```


### If a user registered in a later session are previous sessions still linked to that user?

Yes. We link all sessions to that user from the past and in the future. Search by the Embrace ID for all of that users sessions.

### Im not seeing symbolicated stack traces on iOS or Im not seeing deobfuscated stack traces on Android What could be wrong?

* On iOS, if you are not using bitcode, we recommend automating the process to upload your dSYMs. Please check out this documentation to learn more about the scripts you can use: [https://embrace.io/docs/ios/integration/dsym-upload/.](https://embrace.io/docs/ios/integration/dsym-upload/)
  * If you do have Bitcode enabled, you will need to follow the manual upload process outlined here in our docs: [https://embrace.io/docs/ios/integration/dsym-upload/#manual-uploads.](https://embrace.io/docs/ios/integration/dsym-upload/#manual-uploads.)
  * If you've followed all of these steps given your setup, and still are not able to see symbolicated stack traces, please reach out to our support team for assistance (support@embrace.io).
  * On Android, if you are not seeing symbolicated stack traces please reach out to our team for troubleshooting help[. ](https://embrace.io/docs/android/integration/crash-reporting/#symbolicating-stack-traces.)[https://embrace.io/docs/android/integration/crash-reporting/#symbolicating-stack-trace](https://embrace.io/docs/android/integration/crash-reporting/#symbolicating-stack-traces.)s.

### Is Embrace compatible with Akamai Cloudflare PacketZoom and other networking services?

Embrace is compatible with SDKs that optimize networking, such as those from Akamai, Cloudflare, and PacketZoom. However, it is important that the Embrace SDK is initialized after any of these types of SDKs are initialized to ensure that our SDK captures network requests.

### Is it necessary to enable background session collection to collect push notification data in Embrace?

No, you do not _need to  _enable background session collection to capture push notification data in Embrace. However, we recommend it.
If background session collection is not enabled, only push notifications received when the app is in the **foreground** will be captured by Embrace.
iOS does not notify the app of receiving a push notification unless the user interacts with it. This critical detail makes it essential to enable background session collection to get comprehensive data.
For example, **for iOS only** :
  * If the app runs in the background and receives a push notification (PN), it will only be aware of the push IF the user interacts. Therefore a PN will not be logged in Embrace unless the user taps on it, even if background activity is enabled.
Notifications arriving with the app in the foreground will be received and can be logged/sent.
  * If the user does not interact with the PN, the app is unaware of it regardless of the background tracking status. The PN is therefore, not logged or sent.
If the user interacts with the notification:
  * With background session collection _disabled_ , the notification is captured but cannot be saved since there’s no background session.
  * With background tracking _enabled, t_ he notification is saved and sent with the session.
For **Android only:**
  * If a PN arrives when the app is in the background and background activity is _disabled_ , the PN doesn’t get sent to the server but lives on the cellphone memory.
  * If a PN arrives during foreground activity with background activity _disabled_ , the PN is not discarded and gets included in the session.
Please look at the following documentation to enable the automatic capture of push notification data for **[Android](https://embrace.io/docs/android/features/push-notifications/#:~:text=If%20you%20want%20to%20enable,gradle%20file.&text=If%20you%20want%20to%20capture,json%20file%20inside%20sdk_config%20)** and **[iOS](https://embrace.io/docs/ios/features/push-notifications/?_highlight=push&_highlight=n)**.
To enable background session capture, you can use the Settings page of the Embrace dashboard. Please note that this does increase the number of sessions captured by Embrace.

### Is there a way that I can speed up build times?

The Embrace SDK injects code into your APK using a process we call “swazzling” to automatically capture activity transitions, taps, and network requests in your application. The time taken for the swazzling process varies but can become quite long for larger projects especially when doing a clean build.
To speed up this process, the Embrace SDK now supports a mode that eliminates the need for a swazzling scan of all JARs and their classes even for a clean build. We have added a Gradle step that can be manually run to produce a list of JARs and classes in the JARs that do not need to be swazzled, and will be skipped during subsequent swazzling steps.

### Is there a way to view all bad failed endpoints?

Yes! On the "Issues" tab, click on "Bad Endpoint" on the far right and then select the bad endpoint. All the endpoints displayed are network calls that never generate a successful 200 error. Upon selecting a specific endpoint, all user sessions that included this particular endpoint will populate at the bottom of the page.
We encourage folks to review the endpoints displayed on this page to see if there are any calls that should be removed or fixed.

### My session has an ANR but the ANR icon is not bolded Why is that?

The ANR icon will be shown in bold only if the session **ended** in an ANR.

### Once background session collection is disabled how long afterwards will Embrace continue to collect background sessions?

You should expect a significant decrease in the sessions collected for a particular app version within the first 24 hours. Embrace may still collect sessions after background session collection is disabled. This is often because a user has yet to open the app since the last configured the SDK service.
Admins should refer to the Settings page within the Embrace dashboard to enable or disable background session collection.

### Revamping our ANR experience in 2023?

In our effort to consistently bring more value to our customers, Embrace has been rehauling many of our ANR reporting features. We're excited to bring to you a revamped ANR experience, with both analytic and visual improvements to help make troubleshooting easier for Android users. Read on for a more detailed look at our latest slew of updates:
  * **New Issue Prioritization:** We've reworked how we prioritize individual issues by taking into consideration the number of occurrences of an issue, its user impact, and its session impact.
  * **New Issue Category Grouping:  **We've improved how we group issues, with new categories like Ad SDK, Android, Java, IO, and more.
  * **Insights Pane:** A new pane that appears to the right of the ANR Issues list will help you better troubleshoot issues. Click on any "problematic" method in the issues list, and the insights pane will give you a list of notable frames (commonly occurring frames in the stack trace under this method), as well as a list of possible issues in under its stack trace that we've determined may be contributing to an ANRs.
  * **Different sample types and greater sample analysis:** Previously, we did not use all the samples taken during an ANR interval. We now analyze all the samples, with two new sample types in mind, and pick a sample that occurs most frequently. You'll see this shown as the "most representative" sample.  We've also introduced the “ad-focused” sample type. For this type, we only consider samples that contain a reference to an SDK based on a curated list of ad SDKs. We've also removed “Last sample," as this was not actionable and could actually be misleading because it may have pointed to actions that happened after the completion of the task that caused the ANR.
We've redesigned our classic flame graph view to support better root cause analysis. This new view includes:
  * **Issue drill-down:** For the selected issue on the flame graph, you can access and inspect all the significant branches for that specific method across different ANR samples.
  * **Insights Pane:**   the user can explore different branches of the issue tree in the flame graph while seeing a list of possible known issues to explore in a separate insights pane that pops out on the left.
  * **Sample Sessions:** Scroll down the left insights pane, and you'll see a list of user sessions that experienced ANRs with that particular issue.
  * **New filters and tools:** We've added better functionality to explore and debug ANRs in the flame graph view. This includes new filters for the graph: debugging (default), prioritization, and custom. The custom view allows you to make adjustments to **focus** , **group** , and **collapse** methods, as well as change the minimum percentage of appearances that methods must make within the samples so as to appear on the graph.
We've added a new view to show a graph anchored around the selected method you're examining. It allows you to see all the code paths that _lead to_ the selected method, as well as the code paths _following_ the method. Users can get to this page from branches in the flame graph and from the known issues list. This view also reports on:
  * **Common Issues/Methods ANR contribution:** This view will breakdown the percentage of appearances of the problematic methods across calling or being called by the selected one across the different samples
  * **Sample Sessions:**   As above, you'll be able to access specific user sessions that experienced ANRs that include this method.
We'll continue making functional and visual improvements to our ANRs feature based on customer feedback, so please do reach out if you have any questions. And keep an eye out for more updates!
  * ad_sdks:  lime green
  * android: lighter blue
  * concurrency: orange
  * io: dark blue
  * java: teal
  * reflection: orange
  * sandwich-anchored-method: red
  * serialization: dark purple
  * unity: blue
  * unknown: pink
  * view: teal

### Should I separate Android and iOS in Embrace?

Yes! We highly recommend creating two separate Embrace apps for Android and iOS platforms. For Unity specifically, we monitor both the Unity and Native layers. While combining Unity across iOS and Android is a common approach, it ignores the severe differences in the native layers. For example, the networking calls and libraries, ANRs vs freezes, User Termination approaches, etc., and even As SDKs are often different across iOS and Android for the same vendors. Separating iOS and Android will allow your team to track the issues and resolutions separately and more quickly.

### Temporary vs Permanent Session Properties?

**What are the definitions of each?**
  * Permanent Session Property: Meant to persist across multiple sessions for a given user. They typically store relevant user-specific information across sessions, such as user preferences, authentication status, or user IDs. Once a permanent session property is set, it will be associated with all future sessions of that user until it’s explicitly removed or updated.
  * Temporary Session Property: Specific to a single-user session. They store only relevant information to the session, such as the user’s current in-app location, a session-specific identifier, or any other session-specific data. These properties do not persist once the session ends and will not be available in future sessions unless explicitly set again.
Temporary Session properties last for the individual user session, whereas permanent session properties exist in every session until explicitly removed.

### The OOMs page has been renamed to Uncategorized Exits for iOS apps?

OOM stands for “out of memory”, indicating that the operating system has killed an app for exceeding memory limits.
For iOS, it is extremely difficult to identify which forced system terminations are truly out-of-memory crashes versus any number of other unclean or unidentified exits. Examples include, but are not limited to:
  * An app taking too long to finish launching.
  * An app using excessive CPU resources.
  * An app trying to access data it should not have access to.
  * An app’s certificate has expired.
It’s difficult to isolate these generally rare, miscellaneous exits from true OOMs because iOS, as an Apple-based operating system, shares less information with external SDKs compared to Android. The method that Embrace, as well as most other mobile observability tools, has been using to pinpoint OOMs has therefore been a process of elimination.
This method involves identifying the conditions around which the app was terminated, the conditions around which it was reopened, and various other criteria that, together, allow providers to eliminate most other reasons for a termination and reach the conclusion that an OOM is responsible.
While this method has helped us catch most OOM crashes, it is clearly imperfect and misses crucial information. We have listened to feedback from our customers that this feature should be more helpful, and are undertaking a product initiative to better solve the problem of OOM identification.
Until we are able to do that, OOMs on iOS will no longer be recognized by this term on our dashboard. You will instead see a group of app terminations labeled as “Uncategorized Exits” (or “UE” where abbreviated). This group includes OOMs, as well as app kills for miscellaneous reasons as listed above. We are not able to isolate true OOMs from the rest of the Uncategorized Exits at this time.
In short, no. This is a change in name and terminology only, and does not affect how we collect, store, or show your app’s actual data. The figures you see for “Uncategorized Exits” are exactly what you would see had we kept the same naming convention of “OOMs”.
When we solve for a better way to identify OOMs, the way this data is categorized and shown will change due to changes at the SDK code level. We will make customers aware of this change before it affects their apps.
If you have any questions or need further assistance with this issue, please reach out to your Customer Success Manager or send a note to support@embrace.io.

### The SDK should support API level 16 but I get an error saying API level 24 is needed Whats wrong?

Please verify that the following Gradle options are set. Additionally, please check if you’re using the seancfoley/IPAddress library. You may be using a newer version of it that has a higher API level requirement.

### What Embrace URLs should be added to our Firewall APN settings?

If you have Firewall rules or use APN in devices, please add the below URLs to your settings to allow Embrace to receive data.
  * [https://config.emb-api.com](http://config.emb-api.com/)
  * [https://data.emb-api.com](http://data.emb-api.com/)
  * [https://images.emb-api.com](http://images.emb-api.com/)


### What are the best practices around implementing moments?

Moments are Embrace's powerful stopwatch and user abandonment tracking feature. They are best used to track critical non-interruptible user flows that are generally short in nature (no funnels). The goal is to understand where these user flows are running slow, ultimately leading to user frustration and app abandonment.
Moments should have one [start](https://embrace.io/docs/ios/features/performance-monitoring/#starting-a-moment) but can have multiple [ends](https://embrace.io/docs/ios/features/performance-monitoring/#ending-a-moment) if the moment can end in multiple places (for example, the startup can end on the home page, login page, or from a deep link). If moments overlap (like uploading multiple photos), use moment identifiers to distinguish moments with the same name.
Moments should not wrap processes that take longer than 5 minutes.
Since moments are sent in real-time by the SDK, only send important moments in the app (2-5 is generally appropriate to start as they can impact app performance).
To learn more about how to use moments to improve mobile app performance, check out this article; [https://blog.embrace.io/track-key-user-moments/](https://blog.embrace.io/track-key-user-moments/).


### What are the definitions of log count  log user count?

Custom dashboards can be created to show metrics like log count and log user count.
_Log count_ is the total number of logs sent while the _log user count_ is the number of unique devices that sent logs (ex: you could read it as 'there was X number of different users that sent logs in that period of time).
To get started creating custom dashboards, refer to [this guide.](https://support.embrace.io/support/solutions/articles/66000508164-getting-started-creating-dashboards)

### What are the differences between logs and breadcrumbs?

Logs and breadcrumbs are both custom additions to an integration.  Logs are heavier than breadcrumbs. We recommend having no more than 20 logs and 100 breadcrumbs per session. Logs are used to capture events in real-time that you'd like to be able to search, filter, aggregate, or alert on in the future.  You can also add properties (i.e., descriptors) to logs.
Breadcrumbs are short snippets of info (up to 256 characters) that only add context to user timelines. You cannot filter, aggregate, or alert on breadcrumbs. You can filter for breadcrumbs via the Sessions page or within a User Timeline.
** **
By default, iOS SDK versions 5.16.0 _and below  _have a breadcrumb limit of 40\. iOS SDK versions 5.16.1 _and above_  have a default limit of 100 breadcrumbs. For Android SDK versions 4.7.0 and above, the default is 100 breadcrumbs.  If you'd like to increase the number of breadcrumbs, you can send per session, please contact support@embrace.io.
**Logs  **
In SDK v 5.x of our native SDKs, a network call is fired off whenever a log is triggered and is sent independently of the session payload. In iOS SDK v 6.x and above and Android SDK v 6.6 and above, logs are batched and multiple logs sent close to the same time might be included in a single network request.
Because a network call is fired off when each log is triggered, we only recommend wrapping logs around key events and having a max of 100 logs per session - to minimize the impact on the user. Logs are aggregated on the Error Logging page so you can monitor trends over time and across versions.
There is a 128-character limit for messages, a 10-property-per-log limit, and a 256-character limit for properties. If you are interested in increasing the character limit of your log messages, contact [support@embrace.io](mailto:support@embrace.io) with your App ID and desired number of characters. As of December 2024, we can support log messages with up to 4k characters.


### What are views activities and fragments?

What's the difference between the three?
Views: A view is an element that is displayed or contains other views that can be displayed, only on iOS. An entire screen can be a view, and so can a big list on the screen. For an ecommerce app, item blocks themselves are views, and the item picture is also a view.
Activities: Activities are individual sections of an Android app, similar to views, but they can encompass larger portions of the app with multiple screens. For example, PaymentActivity may refer to the entire payment process with multiple screens, and MainActivity may wrap the entire app.
Fragments: Fragments are smaller sections of Android activities and usually represent a certain specific screen the user is on. For example, a final payment submission form may be a specific fragment within the Android PaymentActivity. We do not automatically track fragments like we do views or activities, but users can create breadcrumbs to track fragments. Note these breadcrumbs will appear in the user timeline, but can't be used to track details like Last View.

### What defines a jailbroken device?

Embrace picks up default cydia installs via filesystem checks.

### What do the different network connectivity filters mean?



### What does android os MessageQueue nativePollOnce mean?

It is common to see ANR samples with a stacktraces grouped by the android.os.MessageQueue.nativePollOnce method in Crashlytics. This method indicates that an ANR stacktrace was not successfully captured because the main run loop is waiting for a new message.

### What does disabling swazzling do?

Swazzling is the process of collecting user interactions with an app (taps, activities, etc) on Android, and it is a word play on the "swizzling" concept on iOS.  Disabling swazzling will prevent collection of network calls, activity transitions, and taps, but not basic crash capture. You may want to do this to speed up build times (specifically on development builds).

### What does disk used refer to on the session timeline Is it RAM?

The disk used on the Embrace timeline refers to storage; i.e. how much total space is used on the device.  We do not display RAM.

### What does the metric Cold Start Session  mean?

_Cold Start Session Percent_ is the percent of sessions that have a cold start. The rate is a baseline and deviations from the baseline can be interesting. For example, a sudden increase in cold starts could mean that there are more instances where the app is getting closed in the background and the user has to start from scratch. 30-40% is a pretty standard rate.
This metric is included on the Version Comparison dashboard by default or can be added to a custom dashboard. To learn more about how to create custom dashboards, reference [this guide.](https://support.embrace.io/support/solutions/articles/66000508164-getting-started-creating-dashboards)

### What happens to event information when there is no network connection?

We have retry logic in place for situations with no network connection. Events (logs/moments/crashes) are added to a queue and when the connection is restored, we attempt to gather the events.

### What happens to the Embrace ID when a user deletes and then reinstalls our app?

For an Android device, when a user uninstalls and reinstalls your app, the user will be assigned a new Embrace ID. On iOS, if the user deletes and re-downloads the app, the user will be assigned the same Embrace ID.

### What information does the Embrace SDK automatically capture out of the box?

Embrace out of the box features include:
Crash reporting (swizzling from Crashlytics on iOS, JVM on Android)
OOM Analytics (Android), Uncategorized Exits (iOS)
ANR exits/intervals
User terminations
Networking
Within Network Monitoring
Domain, path, error code and bytes in/out
Within user sessions
Page views
Clicks and taps
Low power mode ( iOS only)
CPU pegging (iOS only)
Low memory warning
App inactive (i.e. when user takes a phone call)

### **What is an Embrace App ID:**
App IDs are your organization’s unique Embrace Application Identifiers. They are five characters long and needed when integrating the Embrace SDK with your app. Additionally, users who create support tickets will want to know where to find this value.



### What is the difference between 4xx and 5xx errors?

A 4xx error is a developer-assigned error. Common 4xx errors are 404s (Not Found) and 400s (Bad Request). Technically, although it's bad practice, developers can assign a 4xx response to a "normal" app function, hence URLs can have a high percentage of 4xx's and not be concerning to the developer. Therefore, high 4xx counts on a URL are not always "bad."
A 5xx error is a server error. Spikes in 5xx's can represent a server outage and thus, 5xx's are almost always "bad."


### What is the difference between a user persona and a session property?

Both user personas and session properties are custom additions to an integration. User personas are attributes that describe a user, whereas session properties describe a session.
For example, a user persona is attached to a user and could be a "payer," "heavy user," "buyer," or "seller," whereas a session property is attached to the session and describe session characteristics such as "dark mode," "purchase made," or "no internet connection."  User personas are assigned when a user logs in and are cleared when the user logs out, and session properties are assigned upon session start (session property persistence is determined by the 'permanent' parameter).
The default limit for session properties is 10. In SDK versions; Android 5.14.2 and iOS 5.16.1 and above, up to 100 session properties are supported. To increase the number of session properties for your app, please reach out to [support@embrace.io](mailto:support@embrace.io). For user personas, the best practice is to add no more than 10 personas.

### What is the difference between an Admin and a Member?

Within Embrace, a user can be either a "Member" or an "Admin".
An Admin can configure alert channels (slack or webhooks), Jira, SSO, dashboards, and first-party domains. They can also see a list of all of their organization's users and manage member access.
Members, on the other hand, do not have configuration privileges. For example, they cannot configure alerting channels but they can create alerts.

### What is the difference between an Embrace and User ID?

The Embrace ID is tied to a device. A User ID is tied to a user.

### What is the difference between foreground and background sessions?

Foreground sessions are defined by the user actively using the app (the app is in view).  Background is when the app is loaded in the background but not actively used.
Our user timelines currently consist of foreground sessions, which are marked from the time the app is brought into view until the time the app is backgrounded by the user (or ended in another state, such as crashed, OOM'ed/Uncategorized exit, or user terminated).
Please ask us about our background data beta and how to access background session user timelines at [support@embrace.io](mailto:support@embrace.io)..

### What is the metric Percent of Network Requests showing?

_Percent of Network Requests  _is the % of network calls we've received that have been classified as first-party.  It's not exactly a performance metric but is valuable to look at as sudden changes can be interesting. This metric is included on the Version Comparison dashboard by default or can be added to a custom dashboard.
For example, if there is a sudden spike in % upward, it may mean that more calls have been classified as first-party, or that your API has suddenly been hit more often. Similarly, a sudden drop may mean a spike in calls from a third party.
To learn more about how to create custom dashboards, reference [this guide](https://support.embrace.io/support/solutions/articles/66000508164-getting-started-creating-dashboards).

### What is the minimum OS we support on each platform?

For Android, Embrace requires the following:
Android 4.1 (API 16) or later
Gradle 5.1 or later
Android Gradle Build Tools Plugin 3.4.0+
Java 8
For iOS, Embrace requires the following:
iOS 9.3 or later.
Cocoapods 10.0+
SPM 11.0+

### What is the role of the Unity network weaver?

The Unity network weaver fills nearly the same role as the iOS and Android swizzlers but works at the C# layer rather than the native layer. It exists because those native solutions will miss some network requests at the Unity/C# layer. Precisely, the native iOS solution captures UnityWebRequest but misses System.Net.Http.HttpClient, and the native Android solution misses both.

### What kind of data is displayed when push notification capture is enabled?

With Embrace, mobile teams can now get push notification data; ID, Priority, Type, Topic, Badge, and Category in ever user session. We do not display the Title, Subtitle, or Body of the push notification. To learn more about why we added this feature, please refer to [this article.](https://embrace.io/blog/introducing-push-notification-data/)
To start auto-collecting push notification data, please follow these simple configuration instructions for [iOS](https://embrace.io/docs/ios/features/push-notifications/?ref=embrace.io/blog&) and for [Android](https://embrace.io/docs/android/features/push-notifications/?ref=embrace.io/blog&).


### What platforms does Embrace support?

Embrace supports the following platforms:
  * Android
  * iOS / tvOS
  * React Native
  * Unity
  * Flutter
To access our technical docs, refer to [https://embrace.io/docs/](https://embrace.io/docs/).

### What sessions are included in the Crash Free metrics?

On the Crash Summary page, the _Crash-Free Sessions_ and _Crash-Free Users_ percentages include background and foreground sessions in the calculation.
To enable capturing background sessions for iOS, follow these instructions: [https://embrace.io/docs/ios/features/background-sessions/](https://embrace.io/docs/ios/features/background-sessions/).
If you are interested in exploring collecting background sessions for Android, please reach out to us at support@embrace.io.

### What time zone is the Embrace platform using?

All sessions, logs, dashboards, interaction timestamps, etc. are in the UTC time zone.

### When an OS force quits the app will the session be sent immediately?

If the OS force quits the app while the app is open (without first going back to the home screen), the session will be sent when the app is launched again.

### When are breadcrumb timestamps created?

_For iOS and Android, a_ breadcrumb timestamp is generated when the breadcrumb was created on the device, not when it reaches the server.


### When exporting custom moment related metrics how can I obtain the median duration or 99th or 95th percentile?

*To utilize the [Custom Metrics API,](https://embrace.io/docs/custom-metrics-api/) please contact your CSM or [support@embrace.io](mailto:support@embrace.io).
We do not provide any percentile metric, just the aggregate duration value, which can be used once extracted to get the percentiles. If you are importing this to a pandas data frame, you can also use pandas-related functions.
For example, the way the percentile is done on our end is based on the raw duration field, e.g., in Clickhouse, we can use quantile(level)(field). Ex: if using promql [https://stackoverflow.com/questions/70881971/how-to-get-the-95th-percentile-of-an-average-in-prometheus](https://stackoverflow.com/questions/70881971/how-to-get-the-95th-percentile-of-an-average-in-prometheus).

### When is a crash sent to Embrace?

The timing around when a crash is sent to Embrace differs based on platform. For Android, crashes are sent in real-time. However for iOS, the next time a user opens the app, the crash will be sent.On iOS devices, if a user uninstalls the app right after the crash, Embrace will not receive the crash.


### When setting up SSO why do I see an Invalid entryID error message?

We require the entity ID to be a valid URL to make sure that your entity ID is globally unique. You can read more about it here: [https://spaces.at.internet2.edu/display/federation/saml-metadata-entityid](https://spaces.at.internet2.edu/display/federation/saml-metadata-entityid).

### When the Embrace Log Message API is called on an iOS app is stack unwinding used to achieve this?

Yes, stack unwinding is utilized. We recommend using breadcrumbs when possible. Log messages are an immediate network call and custom breadcrumb logs are stored as session data. Therefore it is more efficient to use a breadcrumb than a log.

### Why am I no longer receiving Daily Digest Emails?

If you select unsubscribe on a daily digest email, you will stop receiving daily digest emails for _all_ apps in your organization.
Instead, to unsubscribe from Daily Digest or emails related to issues, under "Settings - Notifications", uncheck the appropriate box and select "Save". If you are subscribed to multiple App Digests, you will need to uncheck this box for each app.
_If you accidentally select "unsubscribe", please reach out to[support@embrace.io](mailto:support@embrace.io) to resubscribe. _

### Why am I not seeing my Embrace data in Grafana after setting up Grafana Cloud as a Data Destination and creating  sending custom metrics to Grafana?

Grafana will only show metrics that have &gt;1000 data points. Please refer to their tooltip that says ""only the top 1000 metrics are displayed".

### Why am I not seeing my session in Embrace?

There might be a few reasons your session isn't showing in production or QA. When testing, manual testing on actual devices is the preferred method.
For iOS and Android, typically, the SDK will be given sufficient time to upload the session as the app is going to the background, but sometimes the OS will not allow the app to complete the upload in the background. To ensure the session was uploaded, relaunch the application. Refresh the dashboard in your browser, and you should now see that session.
When the Xcode or Android Studio debugger is connected, crashes will be suppressed and some sessions will not make it into Embrace. To capture crashes, whether, through debugger sessions or a standard session, the app must be disconnected from the Xcode / Android Studio debugger.
For iOS, sessions generated via XCUITest automation or other unit tests will not appear in Embrace. Typically these platforms, terminate the app before the app has a chance to send the data to Embrace, or they delete the app which also deletes the session data.

### Why am I seeing different crash rates in Embrace vs a destination like New Relic or Datadog?

The inherent nature of how people use mobile apps means that there will always be a delay in sending certain types of data across the network to an external service. Crashes are a prime example of how and why this delay works.
When an app crashes, it is no longer active on a device. Therefore, while information about this crash may have been captured and stored on the device, it can’t be sent to the service until the user re-opens the app and re-establishes a network connection. This delay in sending information is dependent on the user and when they choose to re-open the app – it could be a few seconds, a few hours, or they might choose to never open the app again.
This delay has implications for what kind of data you see when using an observability service.
In the Embrace dashboard, **_all_ retroactive crash data is captured and timestamped according to when the event _happened_ (not when the event was _received_)**. There is no appreciable time limit to our data capture in terms of how far into the past an event happened before it can be received. We will capture retroactive data as far back as our data retention policies allow, which varies based on customer account settings.
When looking at Embrace data that is sent to other platforms via OTLP, this is not the case.
Embrace pushes data to other platforms as **(1) hourly aggregates  **and** ****(2) daily aggregates**. In the case of _hourly_ aggregates, any app data not sent within the hour will not appear. In the case of _daily_ aggregates, app data not sent within the past hour but sent within the past day will appear. However, any app data not sent within the past day will not appear.
App re-opened /
Crash data sent | Captured in Embrace dashboard | Captured in OTLP receiver platform
---|---|---
Within 1 hour of crash event| yes| Yes, in hourly aggregate metric
Within 1 day of crash event| yes| Yes, in daily aggregate metric
1 day or more after crash event | yes| No
When crash data is received a considerable amount of time after the event happened (for example, 1 day++), this can cause aggregate metrics (such as crash-free sessions %) to change in unexpected ways.
This can be helpful or not, depending on what you need to look at.
If you want a r**eal-time barometer of your app health as it stands today** , receiving retroactive data is not helpful. This is because it can artificially swing your aggregate metrics up/down based on events that have happened in the past and which are not actively impacting your users currently.
If you want to **deep-dive into particular issues that have surfaced time and again** , receiving retroactive data is helpful. This is because it ensures that all data points are captured and available for you to examine forensically.

### Why are OOMs not appearing on the OOM page?

A session must be found for OOMs crashes to appear on the OOMs page. If a crash is not associated with a session, we attempt to link the crash to a session by matching the event time of the crash and the session for the device. The "Open User Timeline" button will be grayed out if the event does not have an associated timeline.
_If you have any further questions, please reach out to us at[support@embrace.io](mailto:support@embrace.io). _

### Why are my logs events being displayed as ltlt slug?

For iOS, we commonly see **&lt; `slug`&gt;** when the log messages contain dashes, which is part of the syntax for our unified events. To have these events displayed separately instead of all grouped under the same **&lt; `slug`&gt;** event, put spaces instead of dashes with your app. This should remove the slug if all these events get reported using the same bit of your code.
Additionally, if log messages are cut off, we suggest moving the details of the message to log property key-value pairs. You can then also filter for the specific log property keys and values on the main error logging page or on the log details pages. Once added, log properties are also visible under Log Details - App - Log Properties. Log messages are limited to 128 characters. More information can be found [here](https://embrace.io/docs/ios/integration/log-message-api/).

### Why do I have high incomplete rates for a moment Ive implemented?

All moments need a start and end event in order to be completed.  Sometimes users can navigate multiple ways through a moment and end up in different places within the app.  In those cases, you need to have multiple ends in order to account for all possible user paths.  For example, if the startup can end on a login screen (if the user is signed out or doesn't have an account) or the home screen (if the user remains logged in), you need to have multiple ends to accommodate both paths.

### Why do we have two types of ANR graphs?

* The troubleshooting flame graph allows  users to see the full picture of the samples and identify different methods in different frames
  * The Mmethod troubleshooting graph allows users to focus the graph on only one method and examine caller  and callees methods as a sequence

### Why does the median duration calculated for my Startup Moment look incorrect?

By default, the Startup _[moment](https://support.embrace.io/support/solutions/articles/66000495525-what-are-the-best-practices-around-implementing-moments-.)_ is added automatically to all Android apps. Please check to confirm that
the moment is reflecting the time between app initialization and the first point the user can interact with the app. Multiple ends can be added to the _moment_ to account for a user being brought to the login page, home page, or through a deep link. To end or create a moment for an Android application, refer to this article; [https://embrace.io/docs/android/features/performance-monitoring/](https://embrace.io/docs/android/features/performance-monitoring/).
Moments can also be implemented for iOS applications! To implement a moment, refer to our iOS documentation, [https://embrace.io/docs/ios/features/performance-monitoring/](https://embrace.io/docs/ios/features/performance-monitoring/).

### Why is Embrace reporting more crashes than Apple?

There will always be a difference between Embrace and the App Store since the App Store will only track sessions & crashes for those users who opt-in. [**This article**](https://www.statista.com/statistics/1234634/app-tracking-transparency-opt-in-rate-worldwide/)suggests that only 25% of users typically opt into the app tracking worldwide. Embrace will still capture 100% of all user sessions (regardless if a user opts in or not). Therefore we expect to have higher numbers than the app store. It’s hard to estimate exactly how much since it can vary from app to app.

### Why is Embrace reporting more crashes than Firebase Crashlytics?

Embrace does not sample data, often resulting in more crashes being captured. Embrace collects sessions for every user, while Firebase does not.


### Why is an alert triggering after I applied an exclusion?

If this happens, the first thing to do is to verify that the exclusion was set up properly.
Under "Manage Alerts" select the pencil icon to edit the corresponding alert. Under "Added Exclusions", use the arrow to expand the dropdown and search for the exclusion. Verify that the path is separated from the domain and includes a "/" at the beginning of the path.

### Why is the ANR Free User  worse than the ANR Free Session?

The ANR-Free User % is the percentage of users that have not experienced an ANR in the time frame selected. In general, the ANR-Free User % is almost always worse than the ANR-Free Session % because even though a user can have many sessions, it only takes one ANR to remove a user from the ANR-free user bucket.  This is also why the ANR-Free user percentage tends to decline when longer time periods are selected.

