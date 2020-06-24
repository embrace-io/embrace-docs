---
title: "Integration Steps"
weight: 1
---

# Integration Steps

Integrating any new SDK with your application can be a daunting task.  We’ve
designed our documentation to guide you through the process as painlessly as
possible.  Steps 1-6 get you to a basic integration that will already give you
some great insights in your application.  Steps 7-10 then show you how you can
use the advanced features of Embrace to add even more value for your
organization and decision making.

Regardless of the path you choose, you will be performing the following common
steps to complete your integration:


1. [**Link Embrace with your application.**]({{< relref "/ios/linking-embrace">}}) This is the basic technical process of getting the Embrace SDK linked with your application so you can use it.
1. [**DSym Upload.**]({{< relref "/ios/dsym-upload" >}}) An important step to ensure Embrace can symbolicated addresses in your sessions.
1. [**Update Embrace.**]({{< relref "/ios/update-embrace" >}})  Keeping your dependencies up to date is just as important as the initial integration.  Learn how to easily find out about new Embrace versions and included them in your builds.
1. [**Open and login to the Embrace Dashboard.**]({{< relref "/ios/login-embrace-dashboard" >}}) Your data is available in the dashboard. It is important that you have this open while working on the integration to monitor progress.
1. [**Create your first session.**]({{< relref "/ios/session-reporting" >}}) This involves launching your application with Embrace linked, and verifying the data shown in the dashboard.
1. [**Collect your first crash report.**]({{< relref "/ios/crash-report" >}}) Here you will use Embrace to generate an on-purpose crash in your application so you can learn how those reports are collected and displayed.
1. [**Add a breadcrumb.**]({{< relref "/ios/breadcrumbs" >}}) Learn how logging works in Embrace and how to port any existing logs you may have to the Embrace SDK.
1. [**Know your users.**]({{< relref "/ios/identify-users" >}})  Add your own custom identifiers to users and sessions to make sure you can aggregate and find sessions correctly.
1. [**Add Alerts.**]({{< relref "/ios/logging" >}})  Use Embrace’s Log Events to power a real-time alerting system so you can rest easy knowing we will tell you if your application breaks.
1. [**Measure Performance.**]({{< relref "/ios/performance-monitoring" >}}) In this final section you will learn how you can use Embrace to go beyond logging and crashes and start to examine critical user flows within your application. Measure performance, completion, and abandonment easily and consistently.
