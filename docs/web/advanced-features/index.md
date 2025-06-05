---
title: Advanced Features
description: Explore advanced capabilities of the Embrace Web SDK
sidebar_position: 5
---

# Advanced Features

The Embrace Web SDK includes several advanced features that provide additional capabilities for monitoring, debugging, and customizing your app's behavior. These features extend beyond the basic instrumentation and can help you address specific use cases or requirements.

## What are Advanced Features?

Advanced features in the Embrace SDK include specialized capabilities that:

- Enable integration with third-party systems
- Provide more detailed data capture for debugging complex issues
- Support user segmentation for better analytics
- Give insights into app termination states
- Allow customization of data collection

## Available Advanced Features

The Embrace Web SDK offers the following advanced features:

- **[OpenTelemetry Export](./opentelemetry-export.md)** - Export your telemetry data directly to OpenTelemetry-compatible backends
- **[User Personas](./user-personas.md)** - Segment users based on behaviors or characteristics

## When to Use Advanced Features

Consider using advanced features when:

- You need to integrate Embrace data with your existing observability stack
- You're troubleshooting complex networking issues that require payload inspection
- You want to segment user experiences based on user characteristics
- You need to adjust app behavior based on previous crash state
- You require specialized data collection beyond the automatic instrumentation

## Getting Started with Advanced Features

Each advanced feature has its own configuration and setup requirements. Review the individual feature documentation for detailed integration instructions.

Some advanced features may require additional permissions or coordination with the Embrace team, particularly for features that involve sensitive data such as network body capture.