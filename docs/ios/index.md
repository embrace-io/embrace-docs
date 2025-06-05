---
title: Getting Started
description: Learn about Embrace for the iOS platform
sidebar_position: 0
---

# iOS/tvOS Platform Documentation

## Getting Started

The Embrace Apple SDK is designed to provide first class observability and diagnostic data collection to your mobile application. It supports multiple platforms including iOS, iPadOS, and tvOS.

## Recommended Major Version - Apple 6.x

Our Apple 6.x SDK is recommended for all current and new customers. The 6.x SDK is our [open-source](https://github.com/embrace-io/embrace-apple-sdk) superset of [OpenTelemetry](https://opentelemetry.io) instrumentation, built in Swift for modern language (such as async/await) and mobile observability (spans, logs) features. It has all the latest Embrace features and semantics, and will continue to grow as Embrace helps expand the OTel ecosystem for mobile.

We recommend that customers use our version 6 SDK, as it contains OTel primitives, open-source support, and better use of modern Swift features like async/await. If you are upgrading from our older 5x SDK, a [migration guide](/docs/ios/6x/getting-started/migration-guide.md) is available to implement the new features and interface in the 6.x SDK.

## 5.x SDK Documentation

Embrace iOS 5.x is the closed-source SDK that has been generally available since the year 2020. It is not available for open-source developers, and is not recommended for new users.

Versions 5.x and 6.x are not compatible nor are they interoperable. The 6.x SDK is built on [OpenTelemetry](https://opentelemetry.io), and the features and signals that it provides have different semantics and syntax than previous versions. 6.x is also a rewrite of the SDK in the Swift programming language, so it does not include features that Embrace does not intend to support in the future, like Moments.

This documentation reflects information on the 5.x SDK. It is split into two sections:

- [**Integration Guide**](./5x/integration/)
- [**Feature Reference**](./5x/features/)

## Any questions

If you would like clarification on which SDK to use, please reach out to us on the [community slack](https://community.embrace.io) or email us at [support@embrace.com](mailto:support@embrace.com).

You can also view our [FAQ](/ios/faq/) and [Changelog](/ios/changelog/)
