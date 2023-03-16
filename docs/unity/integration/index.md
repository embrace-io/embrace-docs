---
bookCollapseSection: true
title: "Integration Guide"
description: Get started with integrating Embrace into your Unity application
sidebar_position: 1
---

# Unity Integration

## Getting Started

We'll guide you through the Embrace integration with a series of articles. We recommend going through them in order, although you are free to skip around. If you are updating from a previous version of the SDK we made some changes to how the configuration files are handled. These changes will need to be implemented into your project if you plan on updating.

## Things to think about before you start

Unity is a complex engine. Deploying it to mobile platforms can add a lot of extra complexity. Embrace is a native framework that links to your project as a dynamic library and you make calls to it via a C# static interface.

On the Android target you will be modifying the Gradle templates in your Unity project to download and link the Embrace SDK. On the iOS target the framework will be added and linked with the exported Xcode project automatically.

In both cases you will also be using the Embrace Unity Editor to add your `API_KEY` and `API_TOKEN` assigned to your application.

{{< button relref="/unity/integration/integration-steps" >}}To Integration Steps{{< /button >}}
