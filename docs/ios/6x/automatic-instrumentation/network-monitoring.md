---
title: Network Monitoring
description: Automatically track network requests in your iOS app with Embrace
sidebar_position: 1
---

# Network Capture

The Embrace SDK automatically monitors network requests made through `URLSession` in your application, providing visibility into network performance, errors, and behavior.

## How Network Monitoring Works

The `URLSessionCaptureService` captures `URLSession` network requests and generates OpenTelemetry spans that:

- Start when a `URLSessionTask` is created
- End when the task receives a response or errors out
- Include attributes like URL, status code, and timing information

This automatic instrumentation gives you immediate visibility into all network activity without requiring manual code changes.

## Key Benefits

- Track network request timing and performance
- Identify slow or failing API endpoints
- Monitor request/response sizes
- Troubleshoot network errors
- Correlate network activity with user actions and app behavior

## Configuration Options

You can customize network monitoring behavior when initializing the Embrace SDK:

```swift
let urlSessionOptions = URLSessionCaptureService.Options(
    injectTracingHeader: true,
    requestsDataSource: MyDataSource(), // For obfuscating sensitive data
    ignoredURLs: ["analytics.example.com"] // URLs to ignore
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

### Tracing Header Injection

By enabling `injectTracingHeader`, the SDK will inject a [W3 Traceparent Header](https://www.w3.org/TR/trace-context/#traceparent-header) into network requests:

`00-[trace_id]-[span_id]-[is_sampled]`

This allows for distributed tracing across your frontend and backend systems, providing end-to-end visibility into request flows.

:::warning
If you're using the Embrace Dashboard with your app, you might need to contact an Embrace representative to enable this feature through remote configuration.

If you're not using the Embrace Dashboard, you can enable this by passing a custom `EmbraceConfigurable` with `isNetworkSpansForwardingEnabled` set to true when initializing the SDK.
:::

### Sensitive Data Handling

To protect sensitive information in network requests, you can implement the `URLSessionRequestsDataSource` protocol:

```swift
class MyDataSource: NSObject, URLSessionRequestsDataSource {
    func modifiedRequest(for request: URLRequest) -> URLRequest {
        var newRequest = request

        // Example: Hide authorization headers
        if let authHeader = newRequest.value(forHTTPHeaderField: "Authorization") {
            newRequest.setValue("[REDACTED]", forHTTPHeaderField: "Authorization")
        }

        // Example: Obfuscate sensitive URLs
        if let url = newRequest.url?.absoluteString, url.contains("user/password") {
            // Create a modified URL with sensitive parts removed
            let safeUrl = url.replacingOccurrences(of: "password=[^&]+", with: "password=***", options: .regularExpression)
            newRequest.url = URL(string: safeUrl)
        }

        return newRequest
    }
}
```

:::info
This only affects the data captured by the Embrace SDK and does not modify the original request sent by your app.
:::

### Ignoring Specific URLs

You can prevent monitoring of certain URLs by adding them to the `ignoredURLs` list:

```swift
URLSessionCaptureService.Options(
    ignoredURLs: [
        "analytics.example.com",
        "metrics.myapp.com",
        "logs.thirdparty.service"
    ]
)
```

Any request URL containing these strings will be completely ignored by the Embrace SDK.

## Data Captured

For each network request, the SDK captures:

- Request URL (with sensitive data optionally obfuscated)
- HTTP method
- Status code
- Start and end time
- Duration
- Response size (when available)
- Error information (for failed requests)

## Integration with Other Features

Network monitoring integrates with other Embrace features:

- Network spans are associated with the current session
- Network errors can trigger log events
- View loads can be correlated with network activity

## Best Practices

- Use the `requestsDataSource` to hide sensitive data like authentication tokens and PII
- Ignore analytics and other high-volume endpoints that aren't relevant for troubleshooting
- Consider enabling trace header injection for end-to-end request tracing
- Monitor response times to identify slow endpoints
- Track error rates to find problematic services

 <!-- TODO: Add more examples of common network request patterns and how they appear in the Embrace dashboard  -->
