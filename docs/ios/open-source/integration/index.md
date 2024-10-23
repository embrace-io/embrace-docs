---
title: Open Source Integration
description: Add Embrace's Open Source Apple SDK to Your App
sidebar_position: 2
---

# Open Source Integration

The Embrace Apple SDK is built on OpenTelemetry and captures vital signals from mobile apps. It is available for open source developers to use, modify, and configure according the Apache-2.0 license. Adding the Embrace Apple SDK allows you to capture and export OTel spans and logs with Embrace's automatic and manual instrumentation.

This section shows you how to set up Embrace in your app, without signing up for the Embrace commercial product. Commercial customers adding the Embrace Apple SDK for the first time should also use this section before proceeding.

## Decisions You Need To Make

Before you dive into integrating Embrace there are a few decisions you should make to help guide your process:

1. Are you integrating a new App or an existing application?
1. Are you replacing an existing automated debugging SDK?
1. Do you plan to use multiple automated debugging SDKs?
1. What integration path makes sense for you?  CocoaPods, SPM, or your own manual integration of the framework?

## Integration Steps

We recommend following these steps in order.

- First, [link the Embrace SDK](/ios//open-source/integration/linking-embrace.md) to your Xcode project.
- Then, initialize the [Embrace Client](/ios/open-source/integration/embrace-client.md) as close to launch of your application code as possible. 
- For configuration options in the SDK, read about the [`Embrace.Options`](/ios/open-source/integration/embrace-options.md) object that is used to initialize it. Also consider [customizing the signals](/ios/open-source/integration/customizing-signals.md) that the Embrace SDK automatically captures.
