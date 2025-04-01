---
title: Key Features
description: Key features of the Embrace iOS SDK 6.x
sidebar_position: 1
---

# Key Features

The Embrace iOS SDK 6.x provides a comprehensive suite of features to help you monitor, debug, and improve your iOS application. Here are the key features:

## Session Monitoring

Embrace captures detailed session data to help you understand how users are interacting with your application. Sessions capture everything that your app is doing while foregrounded or backgrounded, until the user starts or stops using the app.

## Automatic Instrumentation

The SDK automatically instruments several aspects of your app with minimal configuration:

- **Network Monitoring**: Automatically tracks all network requests and responses
- **View Controller Tracking**: Monitors view lifecycle and performance
- **Tap Capture**: Records user interactions with your app
- **Push Notifications**: Tracks push notification handling
- **WebView Monitoring**: Monitors web content performance in your app

## Error and Crash Reporting

Embrace captures detailed crash reports and errors, providing you with the context needed to reproduce and fix issues:

- Comprehensive crash reports with stack traces
- Exception handling
- Low memory warnings
- Custom error logging

## Performance Monitoring

Track key performance metrics throughout your app:

- App startup time
- View controller load times
- Network performance
- Memory usage
- Custom performance spans

## Logs and Breadcrumbs

Embrace provides powerful logging capabilities to help you track events and troubleshoot issues:

- Custom logging with severity levels
- Breadcrumb tracking for user journeys
- Automatic system event logging

## User and Session Context

Gain insights into user behavior and session information:

- User identification
- User properties and personas
- Session attributes
- Custom event properties

## OpenTelemetry Foundation

Built on OpenTelemetry standards, allowing you to:

- Export telemetry to other systems
- Leverage industry-standard observability
- Integrate with existing observability pipelines
- Utilize OTel spans and logs 