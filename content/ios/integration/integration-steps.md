---
title: "Integration Steps"
weight: 1
aliases:
  - /ios/integration-steps/
---

# Integration Steps

Integrating any new SDK with your application can be a daunting task. We’ve
designed our documentation to guide you through the process as painlessly as
possible. Following these steps will ensure you have a solid foundation for
montoring your application in production.

Regardless of the path you choose, you will be performing the following common
steps to complete your integration:


1. [**Link Embrace with your application.**]({{< relref "/ios/integration/linking-embrace">}}) This is the basic technical process of getting the Embrace SDK linked with your application so you can use it.
1. [**DSym Upload.**]({{< relref "/ios/integration/dsym-upload" >}}) An important step to ensure Embrace can symbolicate addresses in your sessions.
1. [**Update Embrace.**]({{< relref "/ios/integration/update-embrace" >}}) Keeping your dependencies up to date is just as important as the initial integration. Learn how to easily find out about new Embrace versions and included them in your builds.
1. [**Open and login to the Embrace Dashboard.**]({{< relref "/ios/integration/login-embrace-dashboard" >}}) Your data is available in the dashboard, it is important that you have this open while working on the integration to monitor progress.
1. [**Create your first session.**]({{< relref "/ios/integration/session-reporting" >}}) This involves launching your application with Embrace linked, and verifying the data shown in the dashboard.
1. [**Collect your first crash report.**]({{< relref "/ios/integration/crash-report" >}}) Here you will use Embrace to generate an intentional crash in your application so you can learn how those reports are collected and displayed.
1. [**Add a breadcrumb.**]({{< relref "/ios/integration/breadcrumbs" >}}) Learn how logging works in Embrace and how to port any existing logs you may have to the Embrace SDK.
1. [**Add Alerts.**]({{< relref "/ios/integration/log-message-api" >}}) Use Embrace’s Log Events to power a real-time alerting system so you can rest easy knowing we will tell you if your application breaks.


{{< button relref="/ios/integration/linking-embrace" >}}Get started{{< /button >}}
