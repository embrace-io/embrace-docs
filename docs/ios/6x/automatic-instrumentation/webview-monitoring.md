---
title: WebView Monitoring
description: Track WKWebView performance and errors in your iOS app
sidebar_position: 7
---

# WebView Monitoring

The Embrace SDK's `WebViewCaptureService` automatically instruments `WKWebView` instances in your app, providing visibility into web content loading, performance, and error states.

## How WebView Monitoring Works

The WebView capture service monitors the lifecycle of `WKWebView` instances by swizzling key methods in the `WKWebView` and `WKNavigationDelegate` classes. This allows Embrace to create OpenTelemetry spans that track:

- Page load timing
- Navigation events and redirects
- Content load errors
- JavaScript errors (optional)
- Resource loading performance (optional)

This data helps you identify slow-loading web content, troubleshoot web errors, and optimize hybrid app experiences.

## Configuration

You can customize WebView monitoring behavior when initializing the Embrace SDK:

```swift
let services = CaptureServiceBuilder()
    .add(.webView(options: WebViewCaptureService.Options(
        captureResourceLoads: true,
        captureJavaScriptErrors: true,
        ignoredURLPatterns: ["analytics\\.example\\.com"]
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

### Resource Load Tracking

Enable tracking of individual resources loaded by your WebViews:

```swift
WebViewCaptureService.Options(
    captureResourceLoads: true
)
```

When enabled, the service will capture data about images, scripts, stylesheets, and other resources loaded by your web content, helping you identify performance bottlenecks.

### JavaScript Error Capture

Capture JavaScript errors that occur in your WebView content:

```swift
WebViewCaptureService.Options(
    captureJavaScriptErrors: true
)
```

This provides visibility into client-side errors in your web content, helping you detect and fix issues that might otherwise be difficult to reproduce.

### URL Filtering

You can ignore specific URL patterns to prevent sensitive content or high-volume endpoints from being captured:

```swift
WebViewCaptureService.Options(
    ignoredURLPatterns: [
        "analytics\\.example\\.com",
        "tracking\\.service\\.com",
        "example\\.com/private/.*"
    ]
)
```

The patterns support regular expressions for flexible matching.

## Navigation Events Captured

The WebView monitoring service tracks the following key events:

### Page Navigation Start

A span is created when navigation to a URL begins:

```swift
// Automatically captured when WebView starts loading content
webView(_:didStartProvisionalNavigation:)
```

### Page Navigation Complete

The span is ended when the page finishes loading successfully:

```swift
// Automatically captured when WebView finishes loading
webView(_:didFinish:)
```

### Navigation Errors

If navigation fails, the span is ended with error information:

```swift
// Automatically captured when WebView encounters an error
webView(_:didFailProvisionalNavigation:withError:)
webView(_:didFail:withError:)
```

## Integrating with WKNavigationDelegate

The WebView capture service works automatically when using standard WKWebView instances. If you implement your own `WKNavigationDelegate`, Embrace will still capture the navigation events through method swizzling.

For advanced usage, you can implement the `WebViewCaptureServiceDelegate` to add custom attributes or control which WebViews are monitored:

```swift
class MyWebViewDelegate: WebViewCaptureServiceDelegate {
    func shouldCaptureWebView(_ webView: WKWebView) -> Bool {
        // Only monitor WebViews with a specific tag
        return webView.tag == 100
    }

    func willStartNavigation(_ webView: WKWebView, 
                             to url: URL) -> [String: String]? {
        // Add custom attributes when navigation starts
        return [
            "content_type": "article",
            "is_cached": webView.isLoading ? "false" : "true"
        ]
    }

    func didFinishNavigation(_ webView: WKWebView, 
                             to url: URL) -> [String: String]? {
        // Add custom attributes when navigation completes
        return [
            "page_title": webView.title ?? "Unknown"
        ]
    }

    func didFailNavigation(_ webView: WKWebView, 
                          to url: URL, 
                          with error: Error) -> [String: String]? {
        // Add custom attributes when navigation fails
        return [
            "error_code": (error as NSError).code.description,
            "can_retry": "true"
        ]
    }
}

// Then use this delegate when configuring the service
let myDelegate = MyWebViewDelegate()
WebViewCaptureService.Options(
    delegate: myDelegate
)
```

## Understanding WebView Data

WebView navigation is captured as OpenTelemetry spans with the following attributes:

- `http.url`: The requested URL
- `emb.webview.page_title`: The title of the loaded page
- `emb.webview.error`: Error information (if an error occurred)
- `emb.webview.resources_loaded`: Count of resources loaded (if resource tracking is enabled)
- `emb.webview.resources_failed`: Count of failed resource loads (if resource tracking is enabled)
- `emb.webview.js_errors`: Count of JavaScript errors (if JavaScript error capture is enabled)

For resource loads (when enabled), child spans are created with:

- `http.url`: The resource URL
- `emb.webview.resource_type`: The type of resource (image, script, stylesheet, etc.)
- `emb.webview.resource_size`: Size of the resource in bytes
- `emb.webview.resource_error`: Error information (if the resource failed to load)

## Example Use Cases

### Hybrid App Performance Monitoring

Track the performance of web content within your native app to ensure consistent user experience.

### Web Content Error Detection

Identify when web content fails to load and understand the root causes.

### Third-Party Content Analysis

Monitor the performance impact of third-party scripts and resources embedded in your web content.

### Progressive Web App (PWA) Integration

Ensure smooth performance when transitioning between native views and PWA components.

## Best Practices

- Be selective about enabling resource tracking to avoid excessive data collection
- Use URL filtering to exclude analytics and tracking scripts that generate high volumes of data
- Add custom attributes to differentiate between different types of web content
- Consider implementing a content preloading strategy for critical web content
- Use the JavaScript error capture to detect and fix client-side issues

## Manual Instrumentation

For advanced use cases, you can manually instrument specific WebView operations:

```swift
// Get the current WebView span for custom instrumentation
if let webViewSpan = Embrace.client?.getActiveWebViewSpan(for: myWebView) {
    // Add custom attributes
    webViewSpan.setAttribute(key: "custom_attribute", value: "custom_value")

    // Create a child span for a specific operation
    let childSpan = webViewSpan.createChildSpan(name: "js-execution")
    childSpan.start()

    // Execute JavaScript
    myWebView.evaluateJavaScript("calculateComplexValue()") { result, error in
        if let error = error {
            childSpan.recordError(error)
            childSpan.setStatus(.error)
        }
        childSpan.end()
    }
}
```

 <!-- TODO: Add examples of how WebView data appears in the Embrace dashboard, including load time distributions and error visualizations  -->
