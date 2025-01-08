---
title: URLSessionCaptureService
description: Learn about how to instrument your app's network requests with Embrace.
sidebar_position: 1
---

# URL Session Capture Service

The `URLSessionCaptureService` captures `URLSession` network requests made by your app and generates OpenTelemetry spans that start when the `URLSessionTask` is created and end when it receives a response or errors out.

You can pass a custom `URLSessionCaptureService.Options` instance when initializing the service to configure it.

### Inject Traceparent Header

By enabling `URLSessionCaptureService.Options.injectTracingHeader` the SDK will inject a [W3 Traceparent Header](https://www.w3.org/TR/trace-context/#traceparent-header) into the network requests with the following format:

`00-[trace_id]-[span_id]-[is_sampled]`

* `trace_id` is the `TraceId` in hex string format of the OpenTelemtry span created for this `URLSessionTask`.
* `span_id` is the `SpanId` in hex string format of the OpenTelemtry span created for this `URLSessionTask`.
* `is_sampled` is `01` if the span is sampled, `00` otherwise.

:::warning
If you're using the Embrace Dashboard with your app, you might need to contact an Embrace representative to enable this feature through the remote configuration.

If you're not using the Embrace Dashboard, you can enable this feature by passing a custom `EmbraceConfigurable` with `isNetworkSpansForwardingEnabled` set to true when [initializing the SDK](/ios/open-source/integration/embrace-options/).
:::

### Obfuscate sensitive data

You can create a class that implements the `URLSessionRequestsDataSource` protocol to manipulate requests before the Embrace Apple SDK captures data from them. 
This allows you to hide any sensitive information that shouldn't be captured.

This class has to be set to `URLSessionCaptureService.Options.requestsDataSource`.

:::info
This will only affect the data captured by the Embrace Apple SDK, it **will not** modify the original request!
:::

### Ignore specific URLs

You can pass a list of strings into `URLSessionCaptureService.Options.ignoredURLs`, any request pointing to an URL that contains any of those strings will be ignored by the Embrace Apple SDK.

### Example

SDK Initialization:

```swift
import EmbraceIO
import EmbraceCrash

// when initializing the Embrace SDK...

let urlSessionOptions = URLSessionCaptureService.Options(
    injectTracingHeader: true,
    requestsDataSource: MyDataSource(), // this object lets you modify request before Embrace uses them to create spans
    ignoredURLs: [] // you can use this to make Embrace completely ignore certain URLs
)

let services = CaptureServiceBuilder()
    .add(.urlSession(options: urlSessionOptions))
    .addDefaults()
    .build()

let options = Embrace.Options(
    appId: appId,
    platform: .native,
    captureServices: services,
    crashReporter: EmbraceCrashReporter()
)

do {
    try Embrace.setup(options: options)
    try Embrace.client?.start()
} catch { }
```

`URLSessionRequestsDataSource` example:
```swift
class MyDataSource: NSObject, URLSessionRequestsDataSource {
    func modifiedRequest(for request: URLRequest) -> URLRequest {
        var newRequest = request

        // modify the request url so Embrace can't see it
        // newRequest.url = ???

        return newRequest
    }
}
```
