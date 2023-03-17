---
title: "Breadcrumbs"
description: Best practices when adding logging to your application using the Embrace SDK
sidebar_position: 1
---

# Breadcrumb Best Practices

:::info
Breadcrumb logging is a powerful feature. However, it is also easy to misuse.
The following tips will help you make the most of Breadcrumbs.
:::

## Log Relevant Information

Think carefully about the logging that you add.
Remember that you will be looking at these logs days after a problem session occurred, and without access to the user who created the session.
Your logs must be detailed enough to help you generate a reproducible use-case, but light enough that they don’t distract you or cause you to read redundant information. 

For example, Embrace already collects all networking events by default.
Before you add logging around these events, take a look at one of your sessions in the Embrace Dashboard.
It is likely all the information you'd want to log is already present.
When adding logs, ensure they are not duplicating information already in the session.
Your goal is to solve problems quickly.
Having to read superfluous info logs is not going to be helpful.

The goal of adding logs is to provide you with a map of the journey the user took within your application.
As such, you should add logs around unique events or decisions the user makes that won't be obvious from other events in the session.

## When To Use Breadcrumbs

We generally use the Breadcrumb method for our logging and not the LogMessage method.
Breadcrumbs are a lightweight way to add logging to your session.
They add no CPU or memory overhead, and trigger no networking calls.

For events that need to trigger an alert, use Logs. To add context to sessions, use Breadcrumbs.
In most cases, Breadcrumbs are what you want.
