---
title: Getting Started
description: Learn about Embrace for the iOS platform
sidebar_position: 0
---

# iOS/tvOS Platform Documentation

## Getting Started

The Embrace Apple SDK is designed to provide first class observability and diagnostic data collection to your mobile application. It supports multiple platforms including iOS, iPadOS, and 

## Major Versions Available

Presently there are __two__ major versions of the Apple SDK available: 5.x and 6.x. 

5.x is our stable, closed-source SDK that has been generally available since the year 2020. 6.x is our open-source SDK that is approaching general availability, but may currently lack some features that Embrace customers use today.

:::warning Important
Current Embrace customers should not upgrade their production SDKs from 5.x versions at this time.
:::

Versions 5.x and 6.x are not compatible nor are they interoperable. The 6.x SDK is built on [OpenTelemetry](https://opentelemetry.io), and the features and signals that it provides have different semantics than previous versions. 6.x is also a rewrite of the SDK in the Swift programming language, so it does not include features that we won't support in the future, like Moments. 

Most of the feature discussion in these docs applies to both versions, as the Embrace dashboard works for both versions. However, when in doubt the features will reflect features from the 5.x SDK.

As the 6.x SDK gains adoption and further maturity, we will update features and provide migration guides from 5.x to 6.x. Current 6.x documentation is found in the [Open Source](/ios/open-source) section of these docs.

## 5.x SDK Documentation

This documentation reflects information on the 5.x SDK. It is split into two sections:

1. [**Integration Guide**](./5x/integration/)
2. [**Feature Reference**](./5x/features/)

If you are just starting out with Embrace, follow the [**Integration Guide**](./5x/integration/) to learn the key steps to successfully using our product.

Once you've completed that, browse through our [**Feature Reference**](./5x/features/) guides to learn how to use some of the advanced features our SDK provides.

## 6.x SDK Documentation

This documentation reflects information on the 6.x open-sourced SDK. Additional details are forthcoming.

Current documentation for the 6.x SDK can be found in our [**6.x Apple SDK**](/ios/open-source) sections.

## Any questions

If you would like clarification on which SDK to use, please reach out to us on Slack or email us at [support@embrace.com](mailto:support@embrace.com).

You can also view our [FAQ](/ios/faq/) and [Changelog](/ios/changelog/)
