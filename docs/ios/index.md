---
title: Getting Started
description: Learn about Embrace for the iOS platform
sidebar_position: 0
---

# iOS/tvOS Platform Documentation

## Getting Started

The Embrace Apple SDK is designed to provide first class observability and diagnostic data collection to your mobile application. It supports multiple platforms including iOS, iPadOS, and tvOS.

## Major Versions Available

Presently there are __two__ major versions of the Apple SDK available: 5 and 6. 

5.x is our stable, closed-source SDK that has been generally available since the year 2020. 6.x is our open-source SDK that features major enhancements to the previous SDK, and has most of the features that Embrace customers use today.

Versions 5.x and 6.x are not compatible nor are they interoperable. The 6.x SDK is built on [OpenTelemetry](https://opentelemetry.io), and the features and signals that it provides have different semantics than previous versions. 6.x is also a rewrite of the SDK in the Swift programming language, so it does not include features that we won't support in the future, like Moments. 

A [migration guide](/docs//ios/upgrade-guide.md) is available to implement the new features and interface in the 6.x SDK. We recommend that customers consider migrating to version 6, as it contains OTel primitives and better support for modern Swift features like async/await.

## 6.x SDK Documentation

This documentation reflects information on the 6.x Open Source SDK. Current documentation for the 6.x SDK can be found in our [**6.x Apple SDK**](/ios/open-source) sections. You can begin your integration by [linking Embrace](/docs//ios/open-source/linking-embrace.md).

## 5.x SDK Documentation

This documentation reflects information on the 5.x SDK. It is split into two sections:

1. [**Integration Guide**](./5x/integration/)
2. [**Feature Reference**](./5x/features/)

If you are just starting out with Embrace, follow the [**Integration Guide**](./5x/integration/) to learn the key steps to successfully using our product.

Once you've completed that, browse through our [**Feature Reference**](./5x/features/) guides to learn how to use some of the advanced features our SDK provides.

## Any questions

If you would like clarification on which SDK to use, please reach out to us on Slack or email us at [support@embrace.com](mailto:support@embrace.com).

You can also view our [FAQ](/ios/faq/) and [Changelog](/ios/changelog/)
