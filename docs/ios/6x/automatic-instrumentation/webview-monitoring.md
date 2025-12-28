---
title: WebView Monitoring
description: Track WKWebView navigation events in your iOS app
sidebar_position: 7
---

# WebView Monitoring

The Embrace SDK's `WebViewCaptureService` automatically instruments `WKWebView` instances in your app, providing visibility into web content navigation events and HTTP response codes.

## How WebView Monitoring Works

The WebView capture service monitors the navigation lifecycle of `WKWebView` instances by swizzling key methods in the `WKWebView` and `WKNavigationDelegate` classes. This allows Embrace to create OpenTelemetry span events that capture:

- URLs loaded in the WebView
- HTTP status codes from navigation responses
- Navigation failure error codes

This data helps you identify failed web content loads, troubleshoot navigation errors, and monitor which URLs are accessed in your hybrid app experiences.

## Configuration

You can customize WebView monitoring behavior when initializing the Embrace SDK:

```swift
let services = CaptureServiceBuilder()
    .add(.webView(options: WebViewCaptureService.Options(
        stripQueryParams: true
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

## Configuration Options

### Strip Query Parameters

Control whether query parameters are removed from captured URLs:

```swift
WebViewCaptureService.Options(
    stripQueryParams: true
)
```

When enabled, the service will remove query parameters from URLs before capturing them. This is useful for preventing sensitive data in query strings (like tokens or user IDs) from being captured.

**Example:**

- Original URL: `https://example.com/page?token=abc123&user=456`
- Captured URL (with `stripQueryParams: true`): `https://example.com/page`

**Default:** `false` (query parameters are included)

## Navigation Events Captured

The WebView monitoring service intercepts the following `WKNavigationDelegate` methods to capture navigation data:

### Navigation Response

Captured when the WebView receives an HTTP response:

```swift
// Automatically captured via method swizzling
webView(_:decidePolicyForNavigationResponse:decisionHandler:)
```

**Data captured:**

- Current WebView URL
- HTTP status code (200, 404, 500, etc.)

### Navigation Failures

Captured when navigation fails either provisionally or after committing:

```swift
// Automatically captured via method swizzling
webView(_:didFailProvisionalNavigation:withError:)
webView(_:didFail:withError:)
```

**Data captured:**

- Current WebView URL
- Error code from NSError

## Integrating with WKNavigationDelegate

The WebView capture service works automatically with all `WKWebView` instances. If you implement your own `WKNavigationDelegate`, Embrace injects a proxy delegate that:

1. Captures the navigation data needed by Embrace
2. Forwards all delegate method calls to your original delegate

Your delegate implementation will continue to work exactly as before. The proxy handles all standard `WKNavigationDelegate` methods including:

- `webView(_:decidePolicyForNavigationAction:decisionHandler:)`
- `webView(_:didStartProvisionalNavigation:)`
- `webView(_:didCommitNavigation:)`
- `webView(_:didFinishNavigation:)`
- `webView(_:didReceiveAuthenticationChallenge:completionHandler:)`
- And all other delegate methods

## Understanding WebView Data

WebView navigation is captured as OpenTelemetry span events with the following attributes:

- `emb.type`: Always set to `"webview"` to identify the event type
- `emb.webview.url`: The WebView's current URL (with or without query parameters based on configuration)
- `emb.webview.error_code`: The HTTP status code or error code (only included when the status code is not 200)

**Event name:** `emb-webview`

### Data Capture Timing

Data is captured at these specific moments:

1. **When navigation policy is decided** - Captures URL and HTTP status code from the response
2. **When provisional navigation fails** - Captures URL and error code before page commits
3. **When navigation fails** - Captures URL and error code after page commits

### What is NOT Captured

The WebView capture service is designed to be lightweight and privacy-conscious. It does **not** capture:

- Page content (HTML, CSS, JavaScript source)
- JavaScript errors or console logs
- Individual resource loads (images, scripts, stylesheets)
- Page titles or metadata
- DOM structure or elements
- Form data or user input
- Cookies or local storage
- Detailed performance timing metrics
- Network request/response bodies

## Monitored Load Methods

The service automatically monitors all standard WebView load methods:

```swift
// All these methods are automatically monitored
webView.load(URLRequest(url: url))
webView.loadHTMLString(html, baseURL: baseURL)
webView.loadFileURL(fileURL, allowingReadAccessTo: directoryURL)
webView.load(data, mimeType: mimeType, characterEncodingName: encoding, baseURL: baseURL)
```

## Example Use Cases

### Hybrid App Navigation Monitoring

Track which web pages users navigate to within your app's embedded WebViews.

### Web Content Error Detection

Identify when web content fails to load and understand HTTP error codes returned.

### Third-Party Content Monitoring

Monitor the availability and response codes of third-party web content embedded in your app.

### Progressive Web App (PWA) Integration

Track navigation events when transitioning between native views and PWA components.

## Known Compatibility Issues

The WebView capture service includes built-in compatibility protection:

- **SafeDK/AppLovin**: The service will not install if SafeDK classes are detected in memory to prevent conflicts with their proxying mechanisms

If you encounter issues with other SDKs that proxy `WKNavigationDelegate`, please contact Embrace support.

## Best Practices

- Enable `stripQueryParams` if your WebView URLs contain sensitive data in query strings
- Use WebView monitoring in conjunction with network monitoring for complete visibility
- Monitor the captured error codes to identify patterns in navigation failures
- Test WebView functionality after enabling monitoring to ensure compatibility with your delegate implementations

## Technical Implementation Details

The service uses method swizzling to intercept:

1. **WKWebView load methods** - To ensure the proxy delegate is set before navigation begins
2. **WKWebView.navigationDelegate setter** - To inject the Embrace proxy delegate
3. **WKNavigationDelegate methods** - To capture navigation data while forwarding to your delegate

All captured data is stored as OpenTelemetry span events and follows the same data retention and upload policies as other Embrace telemetry data.
