---
title: WebView Monitoring
description: Track WKWebView performance and errors in your iOS app
sidebar_position: 7
---

## WebView Monitoring

The Embrace SDK's `WebViewCaptureService` automatically instruments `WKWebView` instances in your app, providing visibility into web content loading, performance, and error states.

### How WebView Monitoring Works

The WebView capture service monitors the lifecycle of `WKWebView` instances by swizzling key methods in the `WKWebView` and `WKNavigationDelegate` classes. This allows Embrace to create OpenTelemetry spans that track:

- Page load timing
- Navigation events and redirects
- Content load errors

This data helps you identify slow-loading web content, troubleshoot web errors, and optimize hybrid app experiences.

### Configuration

You can customize WebView monitoring behavior when initializing the Embrace SDK:

```swift
let captureServices = CaptureServicesOptionsBuilder()
    .addDefaults()
    .addWebViewCaptureService(
        withOptions: WebViewCaptureService.Options(stripQueryParams: false)
    )
    .build()

let options = EmbraceIO.Options.withAppId(
    "APPID",
    captureServices: captureServices
    //...other options
)
try EmbraceIO.start(options: options)
```

#### Stripping Query Parameters

`WebViewCaptureService.Options` exposes a single option, `stripQueryParams` (default `false`). When set to `true`, query parameters are removed from the captured URL before it is recorded, which helps prevent sensitive or high-cardinality data in query strings from being captured:

```swift
WebViewCaptureService.Options(stripQueryParams: true)
```

### Navigation Events Captured

The WebView monitoring service tracks the following key events:

#### Page Navigation Start

A span is created when navigation to a URL begins:

```swift
// Automatically captured when WebView starts loading content
webView(_:didStartProvisionalNavigation:)
```

#### Page Navigation Complete

The span is ended when the page finishes loading successfully:

```swift
// Automatically captured when WebView finishes loading
webView(_:didFinish:)
```

#### Navigation Errors

If navigation fails, the span is ended with error information:

```swift
// Automatically captured when WebView encounters an error
webView(_:didFailProvisionalNavigation:withError:)
webView(_:didFail:withError:)
```

### Integrating with WKNavigationDelegate

The WebView capture service works automatically when using standard `WKWebView` instances. If you implement your own `WKNavigationDelegate`, Embrace will still capture the navigation events through method swizzling. Your delegate continues to run unchanged.

### Understanding WebView Data

WebView navigation is captured as OpenTelemetry spans with the following attributes:

- `http.url`: The requested URL (with query parameters stripped when `stripQueryParams` is enabled)
- `emb.webview.page_title`: The title of the loaded page
- `emb.webview.error`: Error information (if an error occurred)

### Example Use Cases

#### Hybrid App Performance Monitoring

Track the performance of web content within your native app to ensure consistent user experience.

#### Web Content Error Detection

Identify when web content fails to load and understand the root causes.

#### Progressive Web App (PWA) Integration

Ensure smooth performance when transitioning between native views and PWA components.

### Best Practices

- Enable `stripQueryParams` when your WebView URLs can contain sensitive or high-cardinality query strings
- Consider implementing a content preloading strategy for critical web content
- Use WebView spans alongside session data to correlate web content loads with the rest of the user journey
