---
title: Logs Forwarding
sidebar_position: 101
---

# Logs Forwarding

## What is Logs Forwarding?

Logs Forwarding enables you to stream all logs captured by the Embrace SDK directly to your observability platform in real-time. Instead of logs only being available in the Embrace dashboard, they can be sent to tools like Grafana Cloud, Datadog, Honeycomb, or any OpenTelemetry-compatible platform you already use.

This means you can:
- **See mobile logs alongside your backend logs** in a single unified view
- **Use your existing logging tools** and workflows for mobile app debugging
- **Build custom dashboards** that combine mobile and server-side telemetry
- **Leverage advanced querying** capabilities of your observability platform

Logs are exported using the [OpenTelemetry Protocol (OTLP)](https://opentelemetry.io/docs/specs/otel/protocol/).

## Enable Logs Forwarding

:::info Contact Embrace
To enable Logs Forwarding, please contact your Embrace onboarding specialist or reach out to support.
:::

## Log Data and Metadata

When forwarding logs, Embrace includes rich metadata with each LogRecord:

- **Log message**: The actual log content
- **Timestamp**: When the log was created
- **Severity level**: Error, Warning, Info, or System
- **Custom properties**: Any key-value pairs attached to the log
- **Device information**: Device model, OS version
- **App information**: App version, build ID
- **Session context**: Session ID and user information

This metadata enables powerful filtering, grouping, and correlation in your observability platform.

