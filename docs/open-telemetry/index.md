---
title: Overview
description: An overview of how Embrace builds on top of OpenTelemetry to provide seamless integration into the ecosystem.
sidebar_position: 0
---

# Overview
[OpenTelemetry](https://opentelemetry.io) is the foundational observability standard on which Embrace has built its mobile telemetry ingestion and export platform. Being able to speak the same language as backend observability tooling allows Embrace to complete the end-to-end observability picture many organizations desire with a solution optimized for mobile apps that avoids vendor lock-in while offering best-in-class insights.

Embrace SDKs record app behavior and user interactions as OpenTelemetry Spans and Logs, which can be directly sent to OTel Collectors from the app. Similarly, OTel signals can be exported from the Embrace backend to any OTel Collector, allowing for a more curated set of telemetry to be sent that isn't necessarily just a subset of what the SDK records. This isn't sampling - it's value-adding.

The APIs offered by the Embrace SDK are idiomatic to the supported mobile platforms and are tailored to developers in those ecosystems. Additionally, we are working to offer implementations of the standard OTel APIs so that existing OTel instrumentations for the various mobile platforms can be directly plugged into the Embrace data ingestion pipeline. Our goal is to extend the SDK's capability as far as OTel and the community will take it.
