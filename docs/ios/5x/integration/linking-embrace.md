---
title: Linking Embrace
sidebar_position: 3
description: Linking Embrace with your application is quick and easy.
---

# Linking Embrace with your Application

Embrace is distributed as a framework.
You will be dynamically linking that framework with your application.
We support four methods for accomplishing that:

- [**CocoaPods.**](/ios/5x/integration/linking-embrace/#cocoapods) You can easily add Embrace to your Podfile and have most of this work done for you.
- [**Carthage.**](/ios/5x/integration/linking-embrace/#carthage) Carthage will help you keep track of Embrace versions and upgrades, you will still perform much of the linking process manually.
- [**Swift Package Manager.**](/ios/5x/integration/linking-embrace/#swift-package-manager) Use Xcode to manage the Embrace dependency for you.
- [**Manual.**](/ios/5x/integration/linking-embrace/#manual) You will download the framework directly and manually link it with your project.

We’ve broken out the integration for each method individually below. You only need to look at the section relevant to your application and can safely skip the other 3.

Make sure to continue reading after linking to learn how to open and use the Embrace Dashboard.

:::info Notes on our documentation
While writing this documentation we were using Xcode 11.5 with iOS SDK 13.5.
The screenshots you will see all come from this version of Xcode. Older or
newer versions may have UI differences. If you have any problems at all
following our instructions, please reach out to us on Slack and we’d love to
help you out.

Additionally we will be referencing our publicly available sample application
and project throughout. You can find that project on [GitHub](https://github.com/embrace-io/embrace-demo-apps/tree/master/ios/sample_integration).
:::

## CocoaPods

CocoaPods is a dependency management system for iOS; You can learn more about it
[here](https://cocoapods.org/). You'll work with CocoaPods from the command line via
the `pod` command, and you'll configure it via a `PodFile` at the root of your
project.

With CocoaPods your Apple TV target will also be automatically configured through a single `Podfile` addition.

If you are starting a new project, first initialize the project and repo using
Xcode. Then, run `pod init` from the command line and a `PodFile` will be created
for you.

If you have an existing project, then use your existing `PodFile` for the
following steps:

1. Open your `PodFile` in a text editor and add this entry to your target: `"pod 'EmbraceIO'"`. Make sure to include Embrace in any other variants, such as QA or Dev builds.
2. Save and close your `PodFile`.
3. Run the command `pod update` and your new dependency will be automatically integrated.
4. From now on you will open the xcworkspace associated with your project and not the older xcproject file.

   <img src={require('@site/static/images/sample-podfile.png').default} />

   <img src={require('@site/static/images/pod-update.png').default} />

   <img src={require('@site/static/images/pod-update-workspace.png').default} />

## Carthage

Carthage is a dependency manager for iOS applications; You can learn more about
it [here](https://github.com/Carthage/Carthage). Carthage handles less of the
integration for you so there will be more manual steps. However, you get to
retain more control over how your project is built and linked. Note that
Embrace is distributed as a binary artifact, so Carthage is only downloading the
artifact in this case.

First edit or create a `Cartfile` at the root of your project, add a line to file
as follows:

```text
binary "https://downloads.embrace.io/embrace-apple-sdk.json"
```

If you also have an Apple TV target in your project, also add this to your `Cartfile`:

```text
binary "https://downloads.embrace.io/embrace-apple-tvos-sdk.json"
```

Now run `carthage update` from the root and carthage will download and prepare
the Embrace framework for integration:

```shell-session
Carthage update

*** Downloading binary-only framework embrace-ios at "https://downloads.embrace.io/embrace-apple-sdk.json"
*** xcodebuild output can be found in /var/folders/qp/gt8h3p297jb778655s3c4z4h0000gn/T/carthage-xcodebuild.e1oenh.log
*** Downloading binary-only framework embrace-ios at "https://downloads.embrace.io/embrace-apple-sdk.json"
*** Downloading embrace-ios.framework binary at "4.1.18"
```

<img src={require('@site/static/images/carthage-download-example.png').default} />

At this point Carthage has downloaded the Embrace binary artifact and placed it
in a folder at the root of your project.

To continue with your integration, find that framework and have its location
open in a finder window. Also, open your project or workspace in Xcode. From
here you should follow the Carthage integration documentation for adding
frameworks to a project, which you can find [here](https://github.com/Carthage/Carthage#if-youre-building-for-ios-tvos-or-watchos).

For Apple TV targets, repeat these steps using the `tvos` variant of the Embrace framework.

After you've completed that, you should be able to import and use the Embrace
module in your project. If you encounter any issues it might help to read
through the manual integration steps below as they go over a lot of the same
concepts as used by Carthage.

## Swift Package Manager

With Xcode 12 Apple is adding the ability to manage binary framework dependencies, like Embrace, via the Swift Package Manager. If your team is already managing source-built dependencies this way, adding Embrace will be simple and not require any third party tools.

Apple TV targets are automatically configured via the Swift Package Manager by following these steps.

The screenshots here are taken using Xcode 12.

First open your project in a compatible version of Xcode. Binary distributions are only compatible with Xcode 12 or higher. This process will not work in Xcode 11 or below.

<img src={require('@site/static/images/ios-spm-step-1.png').default} alt="Xcode project ready to integrate Embrace via Swift Package Manager" title="Swift Package Manager Step 1" caption="Xcode project open to the Swift Package Manager UI" />

Pressing the `+` button on this screen will open the add repository dialog box. The Embrace repository is: [https://github.com/embrace-io/embrace-spm](https://github.com/embrace-io/embrace-spm).

<img src={require('@site/static/images/ios-spm-step-2.png').default} alt="The add repository dialog box" title="Swift Package Manager Step 2" caption="Adding the Embrace repository" />

After entering the URL, click next and you will be taken to the version settings page. Here you configure what version of Embrace to use and how to check for updates. We recommend the default settings unless your app has specific version requirements.

<img src={require('@site/static/images/ios-spm-step-3.png').default} alt="The version settings screen" title="Swift Package Manager Step 3" caption="Configuring the Embrace version to use" />

After clicking next, the Swift Package Manager may take a few minutes to download a copy of our repository. Once downloaded you will get a chance to confirm the libraries and target associations you'd like to use. For simple apps, the default settings should work. If you have many targets or publish to both Apple TV and iOS, ensure that the associations are correct before continuing.

<img src={require('@site/static/images/ios-spm-step-4.png').default} alt="The target association screen" title="Swift Package Manager Step 4" caption="Configuring the targets to use with the Embrace library" />

Finally you should now see the Embrace package has been added to your project and is being tracked by the Swift Package Manager.

<img src={require('@site/static/images/ios-spm-step-5.png').default} alt="Verifying the installation" title="Swift Package Manager Step 5" caption="Verify that Embrace has been correctly added to your project" />

## Manual

Although adding a new framework to your project manually may seem difficult, the process
is actually pretty straightforward in recent Xcode releases. Just follow along
with the screenshots and reach out on Slack if you want any help during the process.

Here is the general process we will be following:

1. Download the Embrace SDK distribution
2. Add the Embrace framework to our project
3. Setup embedding so the framework is included with builds
4. Import Embrace and perform a test build

   First we must download the latest Embrace release which you can do using the following command:

```shell-session
curl -o embrace_{{ embrace_sdk_version platform="ios" }} https://downloads.embrace.io/embrace_{{ embrace_sdk_version platform="ios" }}.zip
```

   After downloading the zip, extract it into a location within your project. If you
   don't already have a spot for third party frameworks, we recommend following the
   file structure shown here:

   <img src={require('@site/static/images/ios-download-embrace-sdk.png').default} title="Download Embrace SDK" caption="The Embrace SDK was extracted into a folder called third_party. Setting up a good folder structure now will help as your project grows in complexity." />

   Next open your project file and a finder window showing the Embrace framework,
   it should look something like this:

   <img src={require('@site/static/images/ios-prepare-manual-linking.png').default} alt="Preparation for the manual linking step" title="Manual linking" caption="Preparation for the manual linking step" />

   Now move to the ‘Build Phases’ tab in Xcode and expand the “Link Binary with
   Libraries” phase.

   <img src={require('@site/static/images/ios-build-phase-tab.png').default} alt="Build Phases tab" title="Build Phases tab" caption="On the Build Phases tab with the the Linking phase expanded" />

   We’re going to drag the Embrace.framework into the Linking phase in Xcode. Make
   sure to drag the .framework and not the outer folder containing the readme file.

   <img src={require('@site/static/images/ios-xcode-group.png').default} alt="Drag in framework" title="Drag into Xcode" caption="After dragging in the framework, Xcode automatically created a group for it in the project." />

   We’re almost done. Our framework is now being linked when we build. However, it
   will not be automatically included in our App Store release unless we also embed
   the framework. There are a number of ways to accomplish this; if you are already
   using a technique, please continue. We recommend using the General tab's linking
   and embedding settings. Make sure to choose "Embed without signing" as the
   Embrace binary is distributed in an already signed format.

   <img src={require('@site/static/images/ios-embed-framework.png').default} alt="Using the General tab" title="General tab" caption="Using the General tab to configure embedding the Embrace framework" />

   For Apple TV targets repeat the above steps using the Embrace framework found in the `tvos` folder.

   At this point you've completed the manual integration of Embrace. You can now
   import the Embrace module into your application and perform a test build to make
   sure this all worked.

   Next, let's look at how sessions are sent to Embrace.
