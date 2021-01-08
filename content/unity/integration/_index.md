---
bookCollapseSection: true
title: "Integration Guide"
description: Get started with integrating Embrace into your Unity application
weight: 1
---

# Unity Integration

## Getting Started

We'll guide you through the Embrace integration with a series of articles. We recommend going through them in order, although you are free to skip around.

## Things to think about before you start

Unity is a complex engine. Deploying it to mobile platforms can add a lot of extra complexity. Embrace is a native framework that links to your project as a dynamic library and you make calls to it via a C# static interface.

On the Android target you will be modifying the gradle templates in your Unity project to download and link the Embrace SDK. On the iOS target the framework will be added and linked with the exported Xcode project automatically.

In both cases you will also be modifying configuration files to let the Embrace SDK knows the `API_KEY` and `API_TOKEN` assigned to your application.

{{< button relref="/unity/integration/integration-steps" >}}To Integration Steps{{< /button >}}
