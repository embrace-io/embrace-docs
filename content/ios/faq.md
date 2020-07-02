---
title: iOS FAQ
weight: 13
---

# iOS FAQ

Here are a list of questions we commonly receive along with their answers.
If you don't see your question here, or would like more clarification on one please reach out to use on Slack
or email us at <support@embrace.io>.

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

Yes. The Embrace ID is accessible from the SDK. See the [API Docs]({{< api ios >}})

### **What do you use the keychain for? Can I delete what is stored there?**

We store a unique device identifier (the Embrace ID) that is a random value we generate the first time the app starts with the Embrace SDK enabled.
Storing it in the keychain allows us to keep the same device ID if the app is uninstalled and reinstalled.
During development you can delete this value, but it is not recommended that this be deleted in a production environment.

## Crashes

### **What if I have more than 1 crash reporter integrated?**

You should only use one.
Using more than one may lead to a loss of crashes due to handler collisions and competition to receive data upon a user returning to the app.

## dSYMs

### **Where are my dSYMs?**

If you have Bitcode-enabled builds, you may need to download dSYMs from Apple and upload them to our service.
Make sure that the **Debug Information Format** under the **Build Options** of the target is set to _DWARF with dSYM file_. 

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

Yes, we have multiple customers that use GraphQL. Please see the [GraphQL guide]({{< relref "/best-practices/graphql" >}}).

### **How much delay does swizzling add to network calls?**

We measured an average delay of 0.7ms and a peak of 1.2ms on an iPhone 5s (old device).
This value is meant to be a ballpark number, may vary a bit depending on the request.
It will increase if header and body capture is enabled.

### **My network calls are not being captured. What could be going wrong?**

WebSocket requests are not captured automatically. Please contact us if you are using WebSockets.
Please verify that the Embrace SDK is initialized before the app initializes any network-related functions e.g. any Alamofire SessionManager instances you create should be created after you start the Embrace SDK.

## Performance Monitoring

### **Why do I have high rates of incomplete even though I implemented the startup?**

The most common scenario is that there are multiple locations in your app where a startup could end.
You should add multiple `endAppStartup` calls and ensures that you don't see erroneous failed startups on your dashboard in the event that a code path is followed where the startup is not ended.


### **How do you measure activities running in parallel?**

You can use an ID for a moment to prevent naming collisions.
The Moment IDs differentiate between separate parallel instances of Moments with the same name.
For aggregation purposes, the moment identifier will be ignored and only the Moment name will be considered.

## Views

### **Can I modify the name captured for a view?**

Yes. You can add the following method to your view controller to have a custom name be captured.

```swift
@objc func embName() -> String {
        return "YourNameHere"
    }
```

{{< hint warning >}}
Names longer than 64 characters will be truncated.
{{< /hint >}}


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

## Trace IDs

### **Can trace IDs for network requests be captured?**

You can capture trace IDs in two ways:
1. Add a trace ID to a request by adding the `x-emb-trace-id` header with the trace ID value.
1. If the ID is already present in the request as a different header, set the name of the header in the `Embrace-Info.plist` file with the `TRACE_ID_HEADER_NAME` field.