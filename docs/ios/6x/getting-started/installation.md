---
title: Installation
description: Installing the Embrace iOS SDK 6.x in your project
sidebar_position: 1
---

# Installation

Integrating the Embrace Apple SDK can be accomplished using either the Swift Package Manager or CocoaPods. The information below outlines the steps for both methods. Additionally, you can pull down the [open-source](https://github.com/embrace-io/embrace-apple-sdk) repository and integrate it manually if your app requires a custom setup.

## Swift Package Manager

For your project, you'll want to add a package dependency in Xcode. Select `File > Add Package Dependencies...`
and enter the repository URL `https://github.com/embrace-io/embrace-apple-sdk.git` into the search bar.

Be sure to set the Dependency Rule to a recent release. When "Choose Package Products for embrace-apple-sdk" appears, Xcode will add all libraries to your application by default. For the most straightforward installation, select `EmbraceIO` to add to your application target. For all other package products, select `None`.

**Explanation of Package Products**

<img src={require('@site/static/images/spm-products.png').default} />

Here's a quick summary of the products this package contains:

1. **EmbraceIO** - This is the recommended product to install for quick integration. It provides a convenience layer over `EmbraceCore` to simplify the setup interface.
2. **EmbraceCore** - This is the main implementation of the Embrace SDK. If you'd like to customize your integration, this product allows you to.
3. **EmbraceCrash** - This contains the Embrace Crash Reporter. We keep this as a separate target for those apps that may not want crash reporting enabled, or may want to use a separate crash reporter. It is included as a dependency of `EmbraceIO`, but not `EmbraceCore`.
4. **EmbraceCrashlyticsSupport** - This product enables Crashlytics/Firebase as your primary crash reporter. Embrace will continue to mirror reports sent to Crashlytics, ensuring that data is still available in the Embrace Dashboard. This is an optional product for those who specifically need Crashlytics as their crash reporter but also want to leverage the Embrace Dashboard.
5. **EmbraceSemantics** - This module contains constants and attributes used internally to extend OTel Semantic Conventions.

## CocoaPods

Installing through CocoaPods is straightforward. Add the main pod to your Podfile:

```ruby
pod 'EmbraceIO', '~> 6.9.1'
``` 

By default, this command installs all the necessary components to use the SDK.

:::info 
If you wish to continue using Crashlytics as your primary crash reporter while also
having those crashes reported to the Embrace Dashboard and using all associated features,
you will need to install an additional pod:
```ruby
pod 'EmbraceIO/EmbraceCrashlyticsSupport'
```
:::

## Known Issues

- **Datadog**: There are some known incompatibilities between the Datadog iOS SDK and dependencies like [OpenTelemetry-Swift](https://github.com/open-telemetry/opentelemetry-swift/). 
We have forked the Datadog SDK and created a version that can integrate better with other frameworks. It can be found in [our public repository](https://github.com/embrace-io/dd-sdk-ios).

- **SwiftUI Hosting Controllers**: Some very short-lived view controllers, particularly in hosting controllers acting as internal bridges in SwiftUI, may experience issues. These have been addressed in recent versions.

- **Tuist Projects**: When using the SDK in Tuist-generated projects, you may need to pass the `-ObjC` linker flag. In SPM, this can be enabled by setting the environment variable `EMBRACE_ENABLE_TUIST_OBJC_LINK`.

## Next Steps

After installing the Embrace SDK, you need to [set up and configure](/ios/6x/getting-started/basic-setup.md) it in your application code. 