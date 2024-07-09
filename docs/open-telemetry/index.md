---
title: Overview
description: An overview of how Embrace builds on top of OpenTelemetry to provide seamless integration into the ecosystem.
sidebar_position: 0
---

# Overview
[OpenTelemetry](https://opentelemetry.io) is the foundational observability standard on which Embrace has built its mobile telemetry ingestion and export platform. Being able to speak the same language as backend observability tooling allows Embrace to complete the full-stack observability many organizations desire with a solution optimized for mobile apps that avoids vendor lock-in while offering best-in-breed insights.

Embrace SDKs record app behavior and user interactions as OpenTelemetry signals, which can be directly sent to OTel Collectors from the app. Similarly, OTel signals can be exported from the Embrace backend, allowing for a more curated set of signals and metrics to be exported.

While Embrace offers a bespoke API that is tailored to the platforms and idioms that are familiar to mobile app developers, the goal is to also offer implementations of the standard OTel APIs so that existing OTel instrumentations that can operate on the various mobile platforms can be directly plugged into the Embrace data ingestion pipeline, extending the SDK's capability as far as OTel and the community will take it.

