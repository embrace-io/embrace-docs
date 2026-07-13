---
title: Key Features
description: Key features of the Embrace Apple SDK 7.x
sidebar_position: 1
---

## Key Features

The Embrace Apple SDK 7.x provides a comprehensive suite of features to help you monitor, debug, and improve your Apple application. Here are the key features:

### Session Monitoring

Embrace captures detailed session data to help you understand how users are interacting with your application. In 7.x a **user session** groups one or more **session parts** — contiguous foreground or background intervals — into a single view of a user's time in your app, bounded by a configurable maximum duration and inactivity timeout. As a core part of Embrace's reproduce-and-fix approach to insights, session parts are modeled as OpenTelemetry spans. See [Sessions](/ios/7x/core-concepts/sessions.md) for details.

### Automatic Instrumentation

The SDK automatically instruments several aspects of your app with minimal configuration through Capture Services:

- **Network Monitoring**: Automatically tracks all network requests and responses via URLSession
- **View Controller Tracking**: Monitors view lifecycle and performance including load and render times
- **Tap Capture**: Records user interactions with your app through UI touch events
- **Push Notifications**: Tracks push notification receipt and handling
- **WebView Monitoring**: Monitors WKWebView URL loading and error events
- **Hang Detection** (opt-in): Monitors main thread hangs and UI freezes to identify unresponsive behavior

### Error and Crash Reporting

Embrace captures detailed crash reports and errors, providing you with the context needed to reproduce and fix issues:

- Comprehensive crash reports with stack traces
- Exception handling
- Low memory warnings and low power mode detection
- Custom error logging through OpenTelemetry spans

### Performance Monitoring

Track key performance metrics throughout your app:

- App startup time
- View controller load and render times
- Network performance and request details
- Custom performance tracing with spans
- First-render instrumentation for UI components

### Logs and Traces

Embrace provides powerful logging and tracing capabilities to help you track events and troubleshoot issues:

- Custom logging with severity levels using OpenTelemetry
- Trace spans for tracking operation performance
- Automatic system event logging
- Span events for marking checkpoints

### User and Session Context

Gain insights into user behavior and session information:

- User identification
- User personas for dynamic user segmentation
- Session properties for contextual metadata
- Custom attributes on spans and logs

### OpenTelemetry Foundation

Built on OpenTelemetry standards, allowing you to:

- Export telemetry to other systems using OTel exporters
- Leverage industry-standard observability semantics
- Integrate with existing observability pipelines
- Build on OTel spans and logs for custom instrumentation
- Use the SDK without Embrace backend by configuring your own OTel endpoints
