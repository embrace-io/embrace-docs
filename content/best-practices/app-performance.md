---
title: "Performance Monitoring"
weight: 3
---

# Best Practices for Moments

## Keep It Short

Moments are best used for tracking critical user flows that are generally short in nature, like:

1. Rendering a border onto an image
1. Uploading a file to your server
1. Loading a new set of TableView cells from Core Data
1. Processing the checkout from your shopping cart

Longer events, such as filling out an entire form or taking a photo with the camera, are worse candidates for Moments as these tasks can have a high variance from user to user.
Only measure Moments that truly matter to your business, and that you would dedicate engineering resources to improving.

## Tracking Abandonment

Moments measure abandonment by default. 

If the Moment never completes, because
* the user exits the app before the Moment ends
* the app crashes
* an unexpected code path is taken 

the timer runs out and we record that Moment as an abandonment.
Looking at these later can help you to understand user behavior and how changes you make affect it over time.
