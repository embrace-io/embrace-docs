---
title: iOS/tvOS FAQ
description: Frequently asked questions about the iOS Embrace SDK
sidebar_position: 5
---

# iOS/tvOS FAQ

Here are a list of questions we commonly receive along with their answers.
If you don't see your question here, or would like more clarification on one please reach out to us on the [community Slack](http://community.embrace.io)
or email us at [support@embrace.com](mailto:support@embrace.com).

## Common Questions

### **How large is the SDK?**

0.6MB

### **What is swizzled in the SDK?**

We swizzle network-related classes to capture network requests (`NSURLSession`, `NSURLConnection`), web-related classes to capture taps (`UIWindow`) and web-view-related classes to capture web-view activity (`UIWebView`, `WKWebView`).

### **Do you capture WebViews and, if so, to what extent?**

Yes, and each WebView, whether built by you or a vendor (e.g. ads, promos and registration) are displayed on the User Timeline.
Embrace captures the network URL, the duration, as well as simultaneous native events.
Anything taking place exclusively within the WebView is not captured.

### **I don't want to capture query params for webviews. How can I turn that off?**

In SDK version 3.2.6 and higher, you can set the `WEBVIEW_STRIP_QUERYPARAMS` boolean field in the `Embrace-Info.plist` to true. 

### **Can you embed Embrace in a separate Framework?**

While embedding Embrace in a separate framework is not a use case we officially support, there is no fundamental reason that this cannot be made to work.
Make sure to put the `Embrace-Info.plist` in the main bundle. (Embrace takes the plist from the `mainBundle` by default).

### **Does the SDK have to be started on the main thread?**

The Embrace SDK should be started on the main thread to ensure that data is consistently captured. We do not test the SDK's behavior when not started on the main thread.

### **Can I initialize Embrace outside of didFinishLaunchingWithOptions or on a background thread?**

You can, but we highly recommend against it. There are some complications that may occur:
* Embrace may not receive all session outcomes, including crashes
* Embrace will not track the abandonment, stalls and durations of startups correctly
* Embrace may not track the foreground and background states effectively on app start
* Embrace may not track Views correctly as it may miss the first view loaded

## Users

### **If a user registered in a later session, are previous sessions still linked to that user?**

Yes. We link all sessions to that user from the past and in the future.
Find the Embrace ID and use it to search for all of the user's sessions.

### **Do I have access to the Embrace ID at runtime?**

Yes. The Embrace ID is accessible from the SDK and, starting with version 6.0.0, show be used in-code.

### **What do you use the keychain for? Can I delete what is stored there?**

We store a unique device identifier (the Embrace ID) that is a random value we generate the first time the app starts with the Embrace SDK enabled.
Storing it in the keychain allows us to keep the same device ID if the app is uninstalled and reinstalled.
During development you can delete this value, but it is not recommended that this be deleted in a production environment.

## Crashes

### **What if I have more than 1 crash reporter integrated?**

You should only use one.
Using more than one may lead to a loss of crashes due to handler collisions and competition to receive data upon a user returning to the app.

## **Troubleshooting dSYM upload**

:::warning Important
If you have Bitcode-enabled builds, the dSYMs generated during the build process will not be what is needed to symbolicate data generated by apps installed from the App Store. You will need to download dSYMs from Apple and upload them in our dashboard. 
:::

### dSYM generation not enabled

If you have not enabled dSYM generation for your target and build type, you will get a warning message in your build log. 

```
DEBUG_INFORMATION_FORMAT set to 'dwarf'. Skipping upload. 
Set to 'dwarf-with-dsym' to generate a dSYM for your application
```

To enable dSYMs generation in Xcode:

1. Select the Project Navigator
2. Select the project file
3. Select the appropriate target (you may have multiple targets to modify)
4. Select `Build Settings`
5. Select `All`
6. Search for `debug information format`
7. Modify both the `Debug`and `Release` settings as needed to select `DWARF with dSYM File`. If dSYM generation is not enabled for debug builds, the Embrace dashboard will not show symbolicated crashes and log stack traces for sessions from these builds.

<img src={require('@site/static/images/ios-dsym-enable.png').default} />

### Verifying dSYM upload and viewing the associated logs

:::tip
If you are having problems with dSYM uploads, we encourage you to share the logs described below with our support team.
:::

The logs for the dSYM upload are split between the Xcode logs and your computer's system logs. The logs from the `run.sh` script included with the SDK appear in the Xcode build logs, while the logs from the `upload` binary appear in the system logs. This is a side effect of doing the upload process in the background, allowing the build to proceed to other steps before it completes.

To view the `run.sh` logs in Xcode:

1. Select the Report Navigator
2. Select the appropriate build report
3. Select `All` and `All messages`
4. Enter `embrace dsym` in the filter box

To view the `upload` script logs in the system log:

1. Open the [Console](https://support.apple.com/guide/console/welcome/mac) app
2. Select `system.log` from the `Reports` section
3. Filter by `embrace`

Alternatively, you can view them in a terminal window:

1. Open a terminal window
2. View logs with `grep embrace /var/log/system.log`
3. Your system may have rotated the logs if they happened a while ago. Use `gzcat $(ls -1 /var/log/system.log.*.gz | sort -r) | grep embrace` to view older logs in chronological order.

### Enabling dSYM upload debug mode

dSYM debug mode allows you to view all the upload-related logs in the Xcode build logs, shifting the logs that were going to the system logs. This does slow down the build process since the upload is done synchronously in debug mode, so we recommend only enabling this mode if you are having issues with dSYM uploads.

To enable debug mode, set the environment variable `EMBRACE_DEBUG_DSYM=1`, e.g. your build step would have this format

```
EMBRACE_DEBUG_DSYM=1 EMBRACE_ID=NNNNN EMBRACE_TOKEN=0123456789abcdef0123456789abcdef "${PODS_ROOT}/EmbraceIO/run.sh"
```

## Network Calls

### **What network requests do you automatically capture?**

We intercept all calls made using `NSURLSession` and `NSURLConnection` and any framework that uses those internally (e.g. Alamofire, RestKit, and AFNetworking).

### **How do I see the headers and network request/response bodies captured for an endpoint?**

Please contact via Slack or email and we will turn on header and body capture for that endpoint.
We then send the data to you and delete it.
We use this approach to restrict the impact to the user if too much data was collected on device.

### **Do you support GRPC?**

Yes. Please contact us for the steps to track GRPC.

### **Do you support GraphQL?**

Yes, we have multiple customers that use GraphQL. Please see the [GraphQL guide](/best-practices/graphql/).

### **Do you allow changing the relative url path shown in the dash per network request?**

Yes, you can set the relative path of the url request (Everything after the domain in the url) by setting an http header value for **x-emb-path**

### **Is there any way to use a different http header for this?**

Yes there is, you can set a value in the Embrace-Info.plist in your main bundle for the key CUSTOM_PATH_HEADER_INFO. Here is an example

<img src={require('@site/static/images/ios-custom-header-example.png').default} />

The above example is for Apollo's GraphQL implementation. As you can see there are two Keys:
1. HEADER - This is a required key and its value is the name of the http header that is used to generate the relative URL paths
2. RELATIVE_URL_PATH - This is an optional key and when specified will be used as the begining value of all generated url paths seen on the dash.

The the format for the above example will be this
``` 
/graphql/(value for X-APOLLO-OPERATION-NAME header)
```
With a possible fully generated path as this
```
/graphql/Notifications
```
### **How much delay does swizzling add to network calls?**

We measured an average delay of 0.7ms and a peak of 1.2ms on an iPhone 5s (old device).
This value is meant to be a ballpark number, may vary a bit depending on the request.
It will increase if header and body capture is enabled.

### **My network calls are not being captured. What could be going wrong?**

WebSocket requests are not captured automatically. Please contact us if you are using WebSockets.
Please verify that the Embrace SDK is initialized before the app initializes any network-related frameworks e.g. any Alamofire SessionManager instances you create should be created after you start the Embrace SDK. URLSession requests will also not be captured until the Embrace SDK is started.

## Monitoring Performance

### **Why do I have high rates of incomplete even though I implemented the startup?**

The most common scenario is that there are multiple locations in your app where a startup could end.
You should add multiple `endAppStartup` calls and ensures that you don't see erroneous failed startups on your dashboard in the event that a code path is followed where the startup is not ended.


### **How do you measure activities running in parallel?**

You can use an ID for a moment to prevent naming collisions.
The moment IDs differentiate between separate parallel instances of moments with the same name.
For aggregation purposes, the moment identifier will be ignored and only the moment name will be considered.

## Views

### **Can I modify the name captured for a view?**

Yes. You can add the following method to your view controller to have a custom name be captured.

```swift
@objc func embName() -> String {
    return "YourNameHere"
}
```

:::warning Important
Names longer than 64 characters will be truncated.
:::


### **Can I ignore views that should not be captured?**

Yes. You can add the following method to your view controller to have a view be ignored.

```swift
@objc func embIgnore() -> Bool {
    return true
}
```

## Tap Coordinates

### **Can I disable the capture of tap coordinates?**

You can turn off capture of tap coordinates with the `CAPTURE_COORDINATES` setting in the `Embrace-Info.plist` file.

You can also API to pause and resume capture during sensitive user interactions such as login or messaging: `pauseTapCoordinateCapture` and `resumeTapCoordinateCapture`.

## Trace IDs

### **Can trace IDs for network requests be captured?**

You can capture trace IDs in two ways:
1. Add a trace ID to a request by adding the `x-emb-trace-id` header with the trace ID value.
1. If the ID is already present in the request as a different header, set the name of the header in the `Embrace-Info.plist` file with the `TRACE_ID_HEADER_NAME` field.
