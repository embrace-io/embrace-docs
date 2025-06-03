---
title: Key Features
description: Key features of the Embrace Web SDK
sidebar_position: 1
---

# Key Features

The Embrace Web SDK provides a comprehensive suite of features to help you monitor, debug, and improve your web  application. Here are the key features:

## Session Monitoring

Embrace captures detailed session data to help you understand how users are interacting with your application. Sessions capture everything that your app is doing while foregrounded or backgrounded, until the user starts or stops using the app. As a core part of Embrace's reproduce-and-fix approach to insights, sessions are modeled as OpenTelemetry traces.

## Automatic Instrumentation

The SDK automatically instruments several aspects of your app with minimal configuration:

- **Network Monitoring**: Automatically tracks all network requests and responses
- **Tap Capture**: Records user interactions with your app through UI touch events

## Error and Crash Reporting

Embrace captures detailed crash reports and errors, providing you with the context needed to reproduce and fix issues:

- Comprehensive crash reports with stack traces
- Exception handling
- Low memory warnings and low power mode detection
- Custom error logging through OpenTelemetry spans


## Performance Monitoring

Track key performance metrics throughout your app:

## Logs and Traces

Embrace provides powerful logging and tracing capabilities to help you track events and troubleshoot issues:

- Custom logging with severity levels using OpenTelemetry
- Trace spans for tracking operation performance
- Automatic system event logging
- Span events for marking checkpoints

## User and Session Context

Gain insights into user behavior and session information:

- User identification
- User personas for dynamic user segmentation
- Session properties for contextual metadata
- Custom attributes on spans and logs

## OpenTelemetry Foundation

Built on OpenTelemetry standards, allowing you to:

- Export telemetry to other systems using OTel exporters
- Leverage industry-standard observability semantics
- Integrate with existing observability pipelines
- Build on OTel spans and logs for custom instrumentation
- Use the SDK without Embrace backend by configuring your own OTel endpoints
