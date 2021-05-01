---
title: "Unity Integration Steps"
weight: 1
aliases:
  - /unity/integration-steps/
---

# Integration Steps

Integrating any new SDK with your application may feel like a daunting task. We’ve designed our documentation to guide you through the process as painlessly as possible. Following these steps will ensure you have a solid foundation for monitoring your application in production.

Regardless of the path you choose, you will be performing the following common steps to complete your integration:


1. [**Link Embrace with your application.**]({{< relref "/unity/integration/linking-embrace">}}) This is the basic technical process of getting the Embrace SDK linked with your application.
1. [**Configure the iOS platform.**]({{< relref "/unity/integration/configure-embrace-ios" >}}) The Embrace SDK requires setting a few basic configuration options in order to correctly build. Here you will configure the iOS platform.
1. [**Configure the Android platform.**]({{< relref "/unity/integration/configure-embrace-android" >}}) Here you will configure the Android platform.
1. [**Open and login to the Embrace Dashboard.**]({{< relref "/unity/integration/login-embrace-dashboard" >}}) Your data is available in the dashboard. It is important that you have this open while working on the integration to monitor your progress.
1. [**Create your first session.**]({{< relref "/unity/integration/session-reporting" >}}) This involves launching your application with Embrace linked, and verifying the data shown in the dashboard.
1. [**Collect your first crash report.**]({{< relref "/unity/integration/crash-report" >}}) Here you will use Embrace to generate an intentional crash in your application so you can learn how those reports are collected and displayed.
1. [**Add a breadcrumb.**]({{< relref "/unity/integration/breadcrumbs" >}}) Learn how logging works in Embrace and how to port any existing logs you may have to the Embrace SDK.
1. [**Add alerts.**]({{< relref "/unity/integration/log-message-api" >}}) Use Embrace’s Log Events to power a real-time alerting system so you can rest easy knowing we will tell you if anything in your application breaks.

{{< button relref="/unity/integration/linking-embrace" >}}Get started{{< /button >}}
