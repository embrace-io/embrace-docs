---
title: Core Concepts
description: Fundamental concepts of the Embrace iOS SDK 6.x
sidebar_position: 2
---

# Core Concepts

This section explains the fundamental concepts and components that make up the Embrace iOS SDK 6.x. Understanding these core concepts will help you better utilize the SDK's capabilities and interpret the data it provides.

## Key Concepts

The Embrace SDK is built on several key concepts:

1. **[Sessions](./sessions.md)** - Comprehensive records of user interactions during app usage, both in foreground and background states
2. **[Traces & Spans](./traces-spans.md)** - OpenTelemetry-based instrumentation for tracking operations and their performance
3. **[Logs](./logs.md)** - Messages and events that provide contextual information about application state
4. **[User Identification](./user-identification.md)** - Methods to identify and segment users for better analytics

## How These Concepts Work Together

- **Sessions** provide the overall container for user interactions with your app
- **Traces & Spans** capture specific operations and their performance within sessions
- **Logs** add context and details to both sessions and traces
- **User Identification** helps segment and analyze data based on user attributes

Together, these concepts form a comprehensive observability solution for your iOS application, enabling you to monitor performance, track user behavior, and identify issues quickly.

## Relationship to OpenTelemetry

The Embrace iOS SDK 6.x is built on the OpenTelemetry framework, an industry-standard approach to observability. This means:

- Concepts map directly to OpenTelemetry signals (spans, logs)
- Data can be exported to other OpenTelemetry-compatible systems
- The SDK follows established patterns for instrumentation

By learning these core concepts, you'll gain the knowledge needed to effectively use the more advanced features of the SDK covered in later sections. 
