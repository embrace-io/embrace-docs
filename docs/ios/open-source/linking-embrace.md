---
title: Linking Embrace
sidebar_position: 0
---

# Linking Embrace

Integrating the Embrace Apple SDK is easy using Swift Package Manager. The information below will show you how. You can also pull down the open-source repository and do this manually, if your app requires it.

## Defining the SPM Package dependency

For your project, you'll want to add a package dependency in Xcode. Select `File > Add Package Dependencies...`
and enter the repository URL `https://github.com/embrace-io/embrace-apple-sdk.git` into the search bar.

Be sure to set the Dependency Rule to a recent release. When "Choose Package Products for embrace-apple-sdk" appears, Xcode will add all libraries to your application by default. For the most straightforward installation, select either `EmbraceIO` or `EmbraceIO-Dynamic` to add to your application target. For all other package products, do not add these to your target by selecting `None`.

**Explanation of Package Products**

Here's a quick summary of the 3 products this package contains:

1. **EmbraceIO** - This is the recommend product to install for quick
 integration. It provides a convenience layer over `EmbraceCore` to
 simplify the setup interface.
2. **EmbraceCore** - This is the implementation of the Embrace SDK.
If you'd like to customize your integration, this product allows you to.
3. **EmbraceCrash** - This contains the Embrace Crash Reporter. We keep this
as a separate target for those apps that may not want crash reporting enabled,
or may want to use a separate crash reporter. It is included as a dependency of
`EmbraceIO`, but not `EmbraceCore`.

We also distribute each product statically and dynamically. The `*-Dynamic` products should
be used if you prefer dynamic libraries.
