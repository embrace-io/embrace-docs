---
title: Linking Embrace
sidebar_position: 1
---

# Linking Embrace

Integrating the Embrace Apple SDK can be accomplished using either the Swift Package Manager or CocoaPods. The information below outlines the steps for both methods. Additionally, you can pull down the [open-source](https://github.com/embrace-io/embrace-apple-sdk) repository and integrate it manually if your app requires a custom setup.

1. [Swift Package Manager](/ios/open-source/integration/linking-embrace/#swift-package-manager): Use Xcode to manage the Embrace dependency for you.
2. [CocoaPods](/ios/open-source/integration/linking-embrace/#cocoapods): Simply add `EmbraceIO` to your Podfile to automate most of the integration process.

## Swift Package Manager

For your project, you'll want to add a package dependency in Xcode. Select `File > Add Package Dependencies...`
and enter the repository URL `https://github.com/embrace-io/embrace-apple-sdk.git` into the search bar.

Be sure to set the Dependency Rule to a recent release. When "Choose Package Products for embrace-apple-sdk" appears, Xcode will add all libraries to your application by default. For the most straightforward installation, select `EmbraceIO` to add to your application target. For all other package products, do not add these to your target by selecting `None`.

**Explanation of Package Products**

<img src={require('@site/static/images/spm-products.png').default} />

Here's a quick summary of the 5 products this package contains:

1. **EmbraceIO** - This is the recommend product to install for quick
 integration. It provides a convenience layer over `EmbraceCore` to
 simplify the setup interface.
2. **EmbraceCore** - This is the implementation of the Embrace SDK.
If you'd like to customize your integration, this product allows you to.
3. **EmbraceCrash** - This contains the Embrace Crash Reporter. We keep this
as a separate target for those apps that may not want crash reporting enabled,
or may want to use a separate crash reporter. It is included as a dependency of
`EmbraceIO`, but not `EmbraceCore`.
4. **EmbraceCrashlyticsSupport** - This product enables Crashlytics/Firebase as
your primary crash reporter. Embrace will continue to mirror reports sent to Crashlytics,
ensuring that data is still available in the Embrace Dashboard. 
This is an optional product for those who specifically need Crashlytics as their crash
reporter but also want to leverage the Embrace Dashboard.
5. **EmbraceSemantics** - This module contains constants and attributes used internally
to extend OTel Semantic Conventions.

## CocoaPods

Installing through CocoaPods is straightforward. Add the main pod to your Podfile:

```
pod 'EmbraceIO', '~> 6.5.2'
``` 

By default, this command installs all the necessary components to use the SDK.

:::info 
If you wish to continue using Crashlytics as your primary crash reporter while also
having those crashes reported to the Embrace Dashboard and using all associated features,
you will need to install an additional pod:
```
pod 'Embrace/EmbraceCrashlyticsSupport'
```
:::


## Known Issues

- **Datadog**: There are some known incompatibilities between the Datadog iOS SDK and dependencies like [OpenTelemetry-Swift](https://github.com/open-telemetry/opentelemetry-swift/). 
We have forked the Datadog SDK and created a version that can integrate better with other frameworks. It can be found in [our public repository](https://github.com/embrace-io/dd-sdk-ios).