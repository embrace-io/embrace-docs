---
title: Requirements
description: System requirements for the Embrace iOS SDK 6.x
sidebar_position: 2
---

# Requirements

Before you integrate the Embrace iOS SDK 6.x into your application, ensure that your development environment and target platforms meet the following requirements.

## Platform Requirements

EmbraceIO, the recommended package from Embrace Apple SDK, has the following minimum deployment requirements:

- iOS 13+
- iPadOS 13+
- tvOS 13+
- macOS 13+
- watchOS 6+

## Development Requirements

- Xcode 14.0 or later
- Swift 5.7 or later

## Package Manager Support

The Embrace SDK can be integrated using:

- Swift Package Manager (recommended)
- CocoaPods
- Manual installation (via XCFrameworks)

## Dependencies

The Embrace SDK has minimal external dependencies, which include:

- OpenTelemetry Swift libraries (included with the SDK)
- KSCrash for crash reporting (included with the SDK)

## Network Connectivity

For data upload and full functionality, the SDK requires:

- Internet connectivity for telemetry upload
- A privacy-compliant NSPrivacyInfo.xcprivacy file is included with the SDK
- The SDK monitors network connectivity and will queue data when offline

## Size Impact

The Embrace SDK is designed to have minimal impact on your app's size:

- Approximately 1-2 MB increase in compressed app size
- Approximately 2-3 MB increase in installed app size
- Memory usage is optimized and scales with your app's activity levels

## App Store Compliance

The Embrace SDK is fully compliant with App Store requirements:

- No use of private APIs or techniques that would cause App Store rejection
- Includes proper privacy manifest documentation
- Follows Apple's data collection and transparency guidelines

<!-- TODO: Add specific size measurements from the AppSizeTester example project once final measurements are available -->
