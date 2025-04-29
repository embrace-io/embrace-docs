---
title: Unity Cloud Build Compatibility
description: Use Unity Cloud Build with the Embrace Unity SDK
sidebar_position: 11
---

# Working with Unity Cloud Build

Unity provides a service for automating builds of your project called [Unity Cloud Build](https://unity.com/solutions/ci-cd), which can run tests and create executables. This service can be very useful as a part of your CI process; therefore, we work to ensure that the Embrace SDK is compatible with Unity Cloud Build. 

For Android, the build process should work out of the box. However, for iOS you will need to make a change to how you're working with Unity Cloud Build in order to properly integrate with the service.

The Embrace Unity SDK leverages the [Swift Package Manager (SPM or SwiftPM)](https://www.swift.org/documentation/package-manager/) to pull in the Embrace Apple SDK. This is a change from older versions of the Unity SDK that worked by embedding `.xcframework` files directly in the final application executable. Note: this requirement is not specific to the Embrace SDK, but to any Unity project that importing libraries via SPM.

This change to our process means that you'll need to provide an override to the iOS build configuration of your Unity Cloud Build configuration. To familiarize yourself with how to edit your project's workflow in Unity Cloud Build, check the documentation [here](https://discussions.unity.com/t/how-to-set-up-a-fastlane-gymfile-and-multiple-provisioning-profiles/711408).

Based on the aforementioned documentation, we just need to provide a Gymfile with the specific contents we need:

```ruby
xcargs "-UseModernBuildSystems=YES CODE_SIGN_STYLE=Manual"
```

Just make a Gymfile with any name you like in your project, path to it from the required Fastlane configuration json file, and Unity Cloud Build should override the xcargs and successfully build your project.

Note: this requirement is not specific to the Embrace SDK, but to any Unity project that importing libraries via SPM.