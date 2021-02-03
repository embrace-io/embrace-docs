---
title: "Performance Monitoring"
description: Best practices when measuring the performance of your application using the Embrace SDK
weight: 3
---

# Best Practices for Moments

## Keep It Short

Moments are best used for tracking critical user flows that are generally short in nature, like:

1. Rendering a border onto an image
1. Uploading a file to your server
1. Loading a new set of TableView cells from a local database
1. Processing the checkout from your shopping cart

Longer events, such as filling out an entire form or taking a photo with the camera, are worse candidates for moments as these tasks can have a high variance from user to user.
Only measure moments that truly matter to your business, and that you would dedicate engineering resources to improving.

## Tracking Abandonment

Moments measure abandonment by default. 

If the moment never completes, because:

* the user exits the app before the moment ends
* the app crashes
* an unexpected code path is taken 

the timer runs out, and we record that moment as an abandonment.
Looking at these later can help you to understand user behavior and how changes you make affect it over time.
