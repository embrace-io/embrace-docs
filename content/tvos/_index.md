---
bookCollapseSection: true
title: "Apple TV"
description: Learn about Embrace for the Apple TV platform
weight: 2
---

# Apple TV Platform Documentation

## Getting Started

Embrace on Apple TV provides a nearly identical API to the iOS platform. Integrating Embrace for Apple TV into your application is also very similar to the process on iOS.

Take note of the following differences and then follow the iOS integration guide and documentation to complete the process.

## CocoaPods

Using CocoaPods to add Embrace to your Apple TV project is the easiest method. Simply follow the iOS integration guide and CocoaPods will automatically download and link the Apple TV compatible framework for your project.

## Carthage

Carthage is another great option for adding Apple TV support to your project. In this case you will follow the iOS guide but use this json file when configuring Carthage:

```sh
binary "https://s3.amazonaws.com/embrace-downloads-prod/embrace-tvos.json"
```

## Manual

Our manual integration process is exactly same on Apple TV as on iOS. The zip you download during manual integration contains both the Apple TV and the iOS frameworks, simply select the correct one for your platform and complete the integration.


Now that you know the differences for Apple TV, continue onto the iOS documentation to get startet:

1. [**Integration Guide**]({{< relref "/ios/integration">}})
2. [**Feature Reference**]({{< relref "/ios/features">}})

If you are just starting out with Embrace, follow the [**Integration Guide**]({{< relref "/ios/integration">}}) to learn
the key steps to successfully using our product.  

Once you've completed that, browse through our [**Feature Reference**]({{< relref "/ios/features">}}) guides to learn how
to use some of the advanced features our SDK provides.  

You can also view our [FAQ]({{< relref "/ios/faq" >}})
and [Change Log]({{< relref "/ios/changelog" >}})
