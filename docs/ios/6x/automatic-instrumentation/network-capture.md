---
title: Network Capture
description: Automatically monitor network requests and responses in your iOS app
sidebar_position: 5
---

# Network Capture

The Embrace SDK's `NetworkCaptureService` automatically captures HTTP/HTTPS network requests and responses in your app, providing visibility into API performance, error rates, and data transfer volumes.

## How Network Capture Works

The network capture service instruments URLSession-based networking in your app by swizzling key methods in the URLSession and URLSessionTask classes. This allows Embrace to create OpenTelemetry spans for each network request that capture:

- Request URL, method, and headers
- Response status code and headers
- Request and response body size
- Network timing metrics (DNS lookup, TLS handshake, time to first byte, etc.)
- Error information (if applicable)

This data helps identify slow APIs, track error rates, and understand the network performance impact on your app.
:::info
By default, the SDK captures raw network data and does not automatically scrub personally identifiable information (PII) or sensitive data. You should configure header filters, URL pattern blacklists, and custom data sources as described below to prevent capturing sensitive information.
:::

## Configuration

You can customize network capture behavior when initializing the Embrace SDK:

```swift
let services = CaptureServiceBuilder()
    .add(.network(options: NetworkCaptureService.Options(
        captureRequestHeaders: true,
        captureResponseHeaders: true,
        captureBodies: .none,
        urlPatternBlacklist: ["api.example.com/user/.*"],
        isEnabledForWebsockets: true,
        isEnabledForBackgroundSessions: true
    )))
    .addDefaults()
    .build()

try Embrace
    .setup(
        options: Embrace.Options(
            appId: "APPID",
            captureServices: services
            //...other options
        )
    )
    .start()
```

## Customization Options

### Header Capture

You can control whether request and response headers are captured:

```swift
NetworkCaptureService.Options(
    captureRequestHeaders: true,
    captureResponseHeaders: true
)
```

By default, certain sensitive headers like "Authorization" and "Cookie" are not captured. You can further customize this with header filters:

```swift
NetworkCaptureService.Options(
    captureRequestHeaders: true,
    requestHeadersFilter: { headerName, headerValue in
        // Only capture specific headers
        return ["Content-Type", "User-Agent", "Accept"].contains(headerName)
    },
    captureResponseHeaders: true,
    responseHeadersFilter: { headerName, headerValue in
        // Filter out sensitive data
        return !headerName.contains("secret")
    }
)
```

### Body Capture

Control how request and response bodies are captured:

```swift
NetworkCaptureService.Options(
    captureBodies: .all                // Capture all bodies
    // OR
    captureBodies: .none               // Don't capture any bodies
    // OR
    captureBodies: .errorOnly          // Only capture bodies for failed requests
    // OR
    captureBodies: .custom { request, response, error in
        // Custom logic to determine if bodies should be captured
        return response?.statusCode == 500 || error != nil
    }
)
```

For security and performance reasons, body capture is disabled by default.

### URL Filtering

You can blacklist specific URL patterns to prevent sensitive endpoints from being captured:

```swift
NetworkCaptureService.Options(
    urlPatternBlacklist: [
        "api.example.com/user/profile",
        "api.example.com/payment/.*"
    ]
)
```

The patterns support regular expressions for flexible matching.

### WebSocket and Background Session Support

Enable or disable network capture for WebSocket connections and background URLSessions:

```swift
NetworkCaptureService.Options(
    isEnabledForWebsockets: true,
    isEnabledForBackgroundSessions: true
)
```

## Understanding Network Data

Network requests are captured as OpenTelemetry spans with the following attributes:

- `http.url`: The request URL
- `http.method`: The HTTP method (GET, POST, etc.)
- `http.status_code`: The response status code
- `http.request_content_length`: Size of the request body in bytes
- `http.response_content_length`: Size of the response body in bytes
- `http.request.headers.*`: Request headers (if enabled)
- `http.response.headers.*`: Response headers (if enabled)
- `emb.network.error`: Error information (if an error occurred)
- `emb.network.dns_start` and `emb.network.dns_end`: DNS resolution timing
- `emb.network.connect_start` and `emb.network.connect_end`: Connection timing
- `emb.network.tls_start` and `emb.network.tls_end`: TLS handshake timing (for HTTPS)
- `emb.network.request_start` and `emb.network.request_end`: Request transmission timing
- `emb.network.response_start` and `emb.network.response_end`: Response reception timing

## Example Use Cases

### API Performance Monitoring

Track the performance of your backend APIs and identify slow endpoints that may be impacting user experience.

### Error Rate Tracking

Monitor API failure rates to quickly identify when backend services are experiencing issues.

### Network Dependency Analysis

Understand how network performance affects key user flows and identify opportunities for optimization.

### Bandwidth Usage Monitoring

Track the amount of data your app is transferring to help optimize for users on limited data plans.

## Best Practices

- Be selective about capturing headers and bodies to avoid privacy concerns and excessive data transfer
- Use URL blacklisting to exclude sensitive endpoints from being captured
- Consider implementing request batching or compression for frequently called APIs
- Add custom attributes to network spans for better context (see the Custom Attributes section)
- Monitor both success rates and performance metrics for critical APIs

## Adding Custom Attributes

You can add custom attributes to network spans by implementing a custom delegate:

```swift
class MyNetworkDelegate: NetworkCaptureServiceDelegate {
    func willBeginRequest(_ request: URLRequest) -> [String: String]? {
        // Return attributes to add to the span when a request begins
        return [
            "user_journey": "checkout",
            "app_state": UIApplication.shared.applicationState.rawValue.description
        ]
    }

    func didCompleteRequest(_ request: URLRequest, 
                           response: URLResponse?, 
                           error: Error?) -> [String: String]? {
        // Return attributes to add to the span when a request completes
        var attributes: [String: String] = [:]

        if let httpResponse = response as? HTTPURLResponse {
            attributes["content_type"] = httpResponse.value(forHTTPHeaderField: "Content-Type") ?? "unknown"
        }

        return attributes
    }
}

// Then use this delegate when configuring the service
let myDelegate = MyNetworkDelegate()
NetworkCaptureService.Options(
    delegate: myDelegate
)
```

 <!-- TODO: Add examples of how network data appears in the Embrace dashboard, including visualizations of network performance and error rate tracking  -->
