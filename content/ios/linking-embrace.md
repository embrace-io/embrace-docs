---
title: "Linking Embrace"
weight: 2
---

# Linking Embrace with your Application

Embrace is distributed as a framework.
You will be dynamically linking that framework with your application.
We support 3 methods for accomplishing that:

1. [**CocoaPods.**]({{< relref "/ios/linking-embrace#cocoapods" >}}) You can easily add Embrace to your PodFile and have most of this work done for you.
1. [**Carthage.**]({{< relref "/ios/linking-embrace#carthage" >}}) Carthage will help you keep track of Embrace versions and upgrades, you will still perform much of the linking process manually.
1. [**Manual.**]({{< relref "/ios/linking-embrace#manual" >}}) You will download the framework directly and manually link it with your project.

We’ve broken out the integration for each method individually below.
You only need to look at the section relevant to your application and can safely skip the other 3.  

Make sure to continue reading after linking to learn how to open and use the Embrace Dashboard.

{{< hint info >}}
**Notes on our documentation**

While writing this documentation we were using Xcode 11.5 with iOS SDK 13.5.
The screenshots you will see all come from this version of Xcode.  Older or
newer versions may have UI differences.  If you have any problems at all
following our instructions, please reach out to us on Slack and we’d love to
help you out.

Additionally we will be referencing our publicly available sample application
and project throughout. You can find that project on [GitHub](https://github.com/embrace-io/embrace-demo-apps/tree/master/sample_integration).
{{< /hint >}}



## CocoaPods

CocoaPods is a dependency management system for iOS; You can learn more about it
[here](https://cocoapods.org). You'll work with CocoaPods from the command line via
the `pod` command, and you'll configure it via a `PodFile` at the root of your
project.

If you are starting a new project, first initialize the project and repo using
Xcode. Then, run `pod init` from the command line and a `PodFile` will be created
for you.

If you have an existing project, then use your existing `PodFile` for the
following steps:


1. Open your `PodFile` in a text editor and add this entry to your target: `"pod 'EmbraceIO'"`. Make sure to include Embrace in any other variants, such as QA or Dev builds.
1. Save and close your `PodFile`.
1. Run the command `pod update` and your new dependency will be automatically integrated.
1. From now on your will open the xcworkspace associated with your project and not the older xcproject file.

[comment]: # (TODO: Make these into amp images)
{{< figure src="/docs/images/sample-podfile.png" alt="Sample PodFile" title="Sample Podfile" caption="Our sample project's PodFile" >}}


{{< figure src="/docs/images/pod-update.png" alt="Running pod update" title="Pod Update" caption="Example of running 'pod update' on our sample project." >}}


{{< figure src="/docs/images/pod-update-workspace.png" alt="Workspace created after running 'pod update'" title="Created Workspace" caption="After running 'pod update' a workspace is created. It should look like this when opened." >}}


## Carthage

stuff here

## Manual

stuff here
