---
title: "Update Embrace"
weight: 4
---

# Keeping Embrace Up To Date

## Updating Using CocoaPods

If you've already integrated Embrace with your application using CocoaPods, it will be simple to update Embrace with each new version.

When a new version is released, simply run the command line utility `pod update EmbraceIO` in the root of your project and CocoaPods will do the rest.

To verify an update was successful, build and run your application and watch the logs on startup for the Embrace version number to be displayed.

```sh
[Embrace] Embrace SDK enabled. Version: {{< sdk platform="ios" >}}
```

## Updating Using Carthage

Carthage is a dependency management system. As such, pulling the latest version of Embrace is as easy as running `carthage update` from the root of the project.
There are even instructions to [automatically monitor for new releases](https://github.com/Carthage/Carthage#optionally-add-build-phase-to-warn-about-outdated-dependencies). 

## Updating Manually 

When a new version of the Embrace SDK is published we announce it in our slack channels. 

If you’d like to upgrade, simply grab the latest version, which is hosted [here](https://s3.amazonaws.com/embrace-downloads-prod/embrace_{{< sdk platform="ios">}}.zip).

Overwrite your downloaded copy in the `third_party` folder and Xcode should automatically pick it up the next time you build your application. This assumes you've followed the manual integration steps from the [Linking Embrace section]({{< relref "/ios/linking-embrace#manual" >}}).
