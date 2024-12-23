---
title: WebViewCaptureService
description: Embrace can capture events from `WKWebViews` in your app.
sidebar_position: 4
---

# Web View Capture Service

The `WebViewCaptureService` captures URL loads and errors in your app's `WKWebViews` and generates OpenTelemetry span events for them.

You can pass a custom `WebViewCaptureService.Options` instance when initializing the service to configure it.

### Strip query parameters

By default the span events that are generated will contain the full URL that was loaded or errored out.

You can make the Embrace Apple SDK strip the query params from the URL with `WebViewCaptureService.Options.stripQueryParams`.