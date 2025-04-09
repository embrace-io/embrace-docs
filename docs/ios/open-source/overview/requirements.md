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
- Manual installation

## Dependencies

The Embrace SDK has minimal external dependencies, which include:

- OpenTelemetry Swift libraries (included with the SDK)

## Network Connectivity

For data upload and full functionality, the SDK requires:

- Internet connectivity for telemetry upload
- Appropriate permissions in your app's Info.plist file

## Size Impact

The Embrace SDK is designed to have minimal impact on your app's size:

- Approximately 2-3 MB increase in installed app size
- Runtime memory usage is optimized for minimal footprint

## Note for App Store Submissions

The Embrace SDK is fully compliant with App Store requirements and does not use any private APIs or techniques that would cause App Store rejection. 