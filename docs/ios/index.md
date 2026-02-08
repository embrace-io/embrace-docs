---
title: Get Started
description: Learn about Embrace for the iOS platform
sidebar_position: 0
---

# iOS/tvOS Platform Documentation

## Get Started

The Embrace Apple SDK is designed to provide first class observability and diagnostic data collection to your mobile application. It supports multiple platforms including iOS, iPadOS, and tvOS.

## Recommended Major Version - Apple 6.x

Our Apple 6.x SDK is the **current recommended version** for all new and existing customers. The 6.x SDK is our [open-source](https://github.com/embrace-io/embrace-apple-sdk) superset of [OpenTelemetry](https://opentelemetry.io) instrumentation, built in Swift for modern language features (such as async/await) and mobile observability (spans, logs). It includes all the latest Embrace features and semantics, and will continue to grow as Embrace helps expand the OTel ecosystem for mobile.

**Start here for new integrations:** [Get Started with iOS SDK 6.x](/ios/6x/getting-started/index.md)

If you are upgrading from our older 5.x SDK, a [migration guide](/ios/6x/getting-started/migration-guide.md) is available to implement the new features and interface in the 6.x SDK.

## 5.x SDK Documentation (Legacy)

Embrace iOS 5.x is the legacy closed-source SDK that was generally available from 2020-2024. **It is not recommended for new users** and is not available for open-source developers.

Versions 5.x and 6.x are not compatible nor interoperable. The 6.x SDK is built on [OpenTelemetry](https://opentelemetry.io), and the features and signals that it provides have different semantics and syntax than previous versions. 6.x is also a rewrite of the SDK in the Swift programming language, so it does not include deprecated features like Moments.

Legacy 5.x documentation:

- [**Integration Guide**](./5x/integration/)
- [**Feature Reference**](./5x/features/)

## Any questions

If you would like clarification on which SDK to use, please reach out to us on the [community slack](https://community.embrace.io) or email us at [support@embrace.com](mailto:support@embrace.com).

You can also view our [FAQ](/ios/faq/) and [Changelog](/ios/changelog/).
