---
title: Linking Embrace
weight: 2
description: Linking Embrace with your application is quick and easy.

---
# Linking Embrace with your Application

Embrace is distributed as a framework.
You will be dynamically linking that framework with your application.
We support three methods for accomplishing that:

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
{{< image src="/docs/images/sample-podfile.png" alt="Sample PodFile" title="Sample Podfile" caption="Our sample project's PodFile" width="736" height="190" >}}

{{< image src="/docs/images/pod-update.png" alt="Running pod update" title="Pod Update" caption="Example of running 'pod update' on our sample project." width="736" height="213" >}}

{{< image src="/docs/images/pod-update-workspace.png" alt="Workspace created after running 'pod update'" title="Created Workspace" caption="After running 'pod update' a workspace is created. It should look like this when opened." width="736" height="263" >}}


## Carthage

Carthage is a dependency manager for iOS applications, you can learn more about
it [here](https://github.com/Carthage/Carthage). Carthage handles less of the
integration for you so there will be more manual steps. However, you get to
retain more control over how your project is built and linked. Note that
Embrace is distributed as a binary artifact, so Carthage is only downloading the
artifact in this case.


First edit or create a `Cartfile` at the root of your project, add a line to file
as follows:
```sh
binary "https://s3.amazonaws.com/embrace-downloads-prod/embrace-ios.json"
```


Now run `carthage update` from the root and carthage will download and prepare
the Embrace framework for integration:

```sh
elanz in ~/dev/playground/carthagetester  > Carthage update
*** Downloading binary-only framework embrace-ios at
"https://s3.amazonaws.com/embrace-downloads-prod/embrace-ios.json"
*** xcodebuild output can be found in
/var/folders/qp/gt8h3p297jb778655s3c4z4h0000gn/T/carthage-xcodebuild.e1oenh.log
*** Downloading binary-only framework embrace-ios at
"https://s3.amazonaws.com/embrace-downloads-prod/embrace-ios.json"
*** Downloading embrace-ios.framework binary at "4.1.18"
```

{{< image src="/docs/images/carthage-download-example.png" alt="Carthage download example" title="Carthage Folder" caption="Carthage downloads binary dependencies into a folder called 'Carthage' under the project root." width="736" height="320" >}}


At this point Carthage has downloaded the Embrace binary artifact and placed it
in a folder at the root of your project.  

To continue with your integration, find that framework and have it's location
open in a finder window. Also, open your project or workspace in xcode. From
here you should follow the Carthage integration documentation for adding
frameworks to a project, which you can find [here](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).

After you've completed that, you should be able to import and use the Embrace
module in your project. If you encounter any issues it might help to read
through the manual integration steps below as they go over a lot of the same
concepts as used by Carthage.
 

## Manual

Adding a new framework to your project manually may seem difficult, the process
is actually pretty straightforward in recent Xcode releases. Just follow along 
with the screenshots and reach out on Slack if you want any help during the process.

Here is the general process we will be following:

1. Download the Embrace SDK distribution
1. Add the Embrace framework to our project
1. Setup embedding so the framework is included with builds
1. Import Embrace and perform a test build

First we must download the latest Embrace release. Embrace is distributed as a
zip file, the latest version is currently hosted [here](https://s3.amazonaws.com/embrace-downloads-prod/embrace_{{< sdk platform="ios">}}.zip).
After downloading the zip, extract it into a location within your project. If you
don’t already have a spot for third party frameworks, we recommend following the
file structure shown here:

{{< image src="/docs/images/ios-download-embrace-sdk.png" alt="Embrace SDK extracted into third_party folder."
title="Download Embrace SDK" caption="The Embrace SDK was extracted into a folder called third_party. Setting up a good folder structure now will help as your project grows in complexity." width="736" height="368" >}}

Next open your project file and a finder window showing the Embrace framework,
it should look something like this:

{{< image src="/docs/images/ios-prepare-manual-linking.png" alt="Preparation for the manual linking step" title="Manual linking" caption="Preparation for the manual linking step" width="736" height="355" >}}

Now move to the ‘Build Phases’ tab in Xcode and expand the “Link Binary with
Libraries” phase.

{{< image src="/docs/images/ios-build-phase-tab.png" alt="Build Phases tab" title="Build Phases tab" caption="On the Build Phases tab with the the Linking phase expanded" width="736" height="354" >}}

We’re going to drag the Embrace.framework into the Linking phase in Xcode. Make
sure to drag the .framework and not the outer folder containing the readme file.

{{< image src="/docs/images/ios-xcode-group.png" alt="Drag in framework" title="Drag into Xcode" caption="After dragging in the framework, Xcode automatically created a group for it in the project." width="736" height="355" >}}

We’re almost done. Our framework is now being linked when we build. However, it
will not be automatically included in our App Store release unless we also embed
the framework. There are a number of ways to accomplish this; if you are already
using a technique, please continue. We recommend using the General tab's linking
and embedding settings. Make sure to choose "Embed without signing" as the
Embrace binary is distributed in an already signed format.

{{< image src="/docs/images/ios-embed-framework.png" alt="Using the General tab" title="General tab" caption="Using the General tab to configure embedding the Embrace framework" width="736" height="491" >}}

At this point you've completed the manual integration of Embrace. You can now
import the Embrace module into your application and perform a test build to make
sure this all worked.

---

Next, let's make sure we upload dSYMs correctly so stack traces get
symbolicated.

{{< button relref="/ios/dsym-upload" >}}Learn About dSYM Uploads{{< /button >}}
