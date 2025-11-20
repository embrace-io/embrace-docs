---
title: Breadcrumbs
sidebar_position: 6
description: Add logging to your Android application using Breadcrumbs with the Embrace SDK
---

# Enrich your sessions with Breadcrumb

## Adding Relevant Information to Sessions

Embrace can collect your logging data as 'breadcrumbs' and include it as relevant information and details to enrich your sessions.

Here's how you add a Breadcrumb to the session:
```kotlin
Embrace.getInstance().addBreadcrumb("onDragEvent called, starting drag")
```

In the above example, a Breadcrumb is being logged when a drag event listener is called.
This event is not otherwise shown in the session and can be important depending on what the user does next.

:::warning Important
Breadcrumb messages must be 256 characters or less.
:::

:::info
For how to best use Breadcrumbs, check out the [Best Practices](/best-practices/breadcrumbs/) page.
:::