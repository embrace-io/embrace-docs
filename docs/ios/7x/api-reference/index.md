---
title: API Reference
description: Detailed reference for the Embrace iOS SDK 7.x API
sidebar_position: 7
---

## API Reference

This section provides detailed reference documentation for the key classes and interfaces of the Embrace iOS SDK 7.x. Whether you're just getting started or looking to leverage more advanced features, this reference will help you understand the full capabilities of the SDK.

### Core Components

The Embrace iOS SDK is organized around several core components:

- **[EmbraceIO Client](./embraceio-client.md)** - The single public entry point for interacting with the SDK
- **[Embrace Client](./embrace-client.md)** - Notes on the removed `Embrace` client and how to migrate to `EmbraceIO`
- **[Configuration](./configuration.md)** - Options and settings for configuring the SDK
- **[Capture Services](./capture-services.md)** - Services that automatically instrument your application
- **[Utility Classes](./utility-classes.md)** - Helper classes and utilities for common tasks

### Using the API Reference

This reference is designed to provide a comprehensive overview of all available APIs in the Embrace iOS SDK 7.x:

- **EmbraceIO Client** - The single entry point, with methods for initializing the SDK, managing sessions, logging, performance monitoring, and user identification. Includes features like custom OpenTelemetry resources.
- **Embrace Client** - Explains that the `Embrace` client is no longer public in 7.x and points to the `EmbraceIO` equivalents.
- **Configuration** - Available options and properties to customize the SDK's behavior
- **Capture Services** - Reference for built-in automatic instrumentation services including network monitoring, view tracking, tap capture, and more
- **Utility Classes** - Helper classes and utilities for common tasks and advanced use cases

### OpenTelemetry Integration

Embrace iOS SDK 7.x is built on OpenTelemetry and provides:

- Fully OpenTelemetry-compliant implementation
- Standard trace and span creation
- Extensible architecture for custom instrumentation

### Linking & GitHub References

For complete source code, the Embrace iOS SDK is open-source and available on GitHub:

[Embrace Apple SDK on GitHub](https://github.com/embrace-io/embrace-apple-sdk)

Each reference page in this section includes links to the relevant source code on GitHub, allowing you to see the implementation details when needed.

### Code Samples

The reference documentation includes practical code examples demonstrating common usage patterns. These examples are intended to provide context and clarify how each component should be used in your application code.

<!-- TODO Link For more comprehensive integration examples, see the [Getting Started] section.  -->
