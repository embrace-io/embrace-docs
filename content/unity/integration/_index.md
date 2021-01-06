---
bookCollapseSection: true
title: "Integration Guide"
description: Get started with integrating Embrace into your Unity application
weight: 1
---

# Unity Integration

## Getting Started

We'll be guiding you through integrating Embrace into your Unity application
with a series of articles. We recommend going through them in order, although
you are free to skip around.

## Things to think about before you start

Unity is a complex engine, deploying it to mobile platforms can add a lot of extra complexity. Embrace is a native framework, it links to your project as a dynamic library and you make calls to it via a c# static interface.

On the Android targets you will be modifying the gradle templates in your unity project to download and link the Embrace SDK. On the iOS target the framework will be added and linked with the exported xcode project automatically.

In both cases you will also be modifying configuration files so the Embrace SDK knows the API_KEY and API_Token assigned to your application.

{{< button relref="/unity/integration/integration-steps" >}}To Integration Steps{{< /button >}}
