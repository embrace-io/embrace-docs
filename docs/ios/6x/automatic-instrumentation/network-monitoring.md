---
title: Network Monitoring
description: Automatically track network requests in your iOS app with Embrace
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Network Capture

The Embrace SDK automatically monitors network requests made through `URLSession` in your application, providing visibility into network performance, errors, and behavior.

### How Network Monitoring Works

The `URLSessionCaptureService` captures `URLSession` network requests and generates OpenTelemetry spans that:

- Start when a `URLSessionTask` is created
- End when the task receives a response or errors out
- Include attributes like URL, status code, and timing information

This automatic instrumentation gives you immediate visibility into all network activity without requiring manual code changes.

### Key Benefits

- Track network request timing and performance
- Identify slow or failing API endpoints
- Monitor request/response sizes
- Troubleshoot network errors
- Correlate network activity with user actions and app behavior

### Configuration Options

You can customize network monitoring behavior when initializing the Embrace SDK:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
let urlSessionOptions = URLSessionCaptureService.Options(
    requestsDataSource: MyDataSource(), // For obfuscating sensitive data
    ignoredURLs: ["analytics.example.com"] // URLs to ignore
)

let services = CaptureServiceBuilder()
    .add(.urlSession(options: urlSessionOptions))
    .addDefaults()
    .build()

let options = EmbraceIO.Options.withAppId(
    appId,
    platform: .native,
    captureServices: services,
    crashReporter: EmbraceCrashReporter()
)

do {
    try EmbraceIO.setup(options: options)
    try EmbraceIO.shared.start()
} catch { }
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
let urlSessionOptions = URLSessionCaptureService.Options(
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

</TabItem>
</Tabs>

#### Tracing Header Injection

The SDK can inject a [W3C Traceparent header](https://www.w3.org/TR/trace-context/#traceparent-header) into network requests:

`00-[trace_id]-[span_id]-[is_sampled]`

This allows for distributed tracing across your frontend and backend systems, providing end-to-end visibility into request flows.

:::info
Traceparent injection must be enabled through the Embrace dashboard. If you're using the Embrace Dashboard and want this feature, enable it via [Network Spans Forwarding](/data-forwarding/network-spans-forwarding) settings or contact [support@embrace.io](mailto:support@embrace.io).
:::

**For non-managed setups** (using a custom `EmbraceConfigurable`), implement the `traceparentInjectionEnabled` property on your configurable object:

```swift
class MyConfig: EmbraceConfigurable {
    var traceparentInjectionEnabled: Bool { true }
    // ... other required properties
}
```

#### Limiting Injection to Specific Domains

By default, when injection is enabled, the traceparent header is added to all captured requests. Use `URLSessionCaptureService.Traceparent` with `onlyAllowDomains` to restrict injection to first-party domains:

<Tabs groupId="embrace-client">
<TabItem value="embraceio" label="EmbraceIO" default>

```swift
let captureServices = CaptureServiceBuilder()
    .addDefaults()
    .add(.urlSession(options: URLSessionCaptureService.Options(
        traceparent: .init(onlyAllowDomains: ["api.example.com", "example.com"])
    )))
    .build()

let options = EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    captureServices: captureServices
)

do {
    try EmbraceIO.setup(options: options)
    try EmbraceIO.shared.start()
} catch { }
```

</TabItem>
<TabItem value="embrace" label="Embrace">

```swift
let captureServices = CaptureServiceBuilder()
    .addDefaults()
    .add(.urlSession(options: URLSessionCaptureService.Options(
        traceparent: .init(onlyAllowDomains: ["api.example.com", "example.com"])
    )))
    .build()

let options = Embrace.Options(
    appId: "YOUR_APP_ID",
    captureServices: captureServices
)

do {
    try Embrace.setup(options: options)
    try Embrace.client?.start()
} catch { }
```

</TabItem>
</Tabs>

Domain matching rules:
- Entries are bare hostnames — no protocol prefix, no leading `.`, no path (e.g. `"example.com"`)
- Each entry matches the exact host (`"example.com"`) and any subdomain (`"api.example.com"`)
- Matching is case-insensitive
- `nil` (the default) means all captured requests receive the header
- An empty array means no requests receive the header
- Invalid entries (empty strings, entries containing `/` or whitespace, entries with a leading `.`) are silently dropped. If all entries are invalid, the result is an empty list and no traceparent headers will be injected
- To check for invalid entries, search your Xcode console output for `allowedDomains`

:::note
The `injectTracingHeader` property on `URLSessionCaptureService.Options` is deprecated. If you were previously setting it, you can safely remove it — server-side migration preserves your existing configuration.
:::

#### Sensitive Data Handling

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

#### Ignoring Specific URLs

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

### Data Captured

For each network request, the SDK captures:

- Request URL (with sensitive data optionally obfuscated)
- HTTP method
- Status code
- Start and end time
- Duration
- Response size (when available)
- Error information (for failed requests)

### Integration with Other Features

Network monitoring integrates with other Embrace features:

- Network spans are associated with the current session
- Network errors can trigger log events
- View loads can be correlated with network activity

### Best Practices

- Use the `requestsDataSource` to hide sensitive data like authentication tokens and PII
- Ignore analytics and other high-volume endpoints that aren't relevant for troubleshooting
- Consider enabling trace header injection for end-to-end request tracing
- Monitor response times to identify slow endpoints
- Track error rates to find problematic services

  <!-- TODO: Add more examples of common network request patterns and how they appear in the Embrace dashboard -->
