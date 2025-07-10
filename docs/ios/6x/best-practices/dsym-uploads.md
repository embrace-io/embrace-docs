---
title: dSYM Upload Automation
description: Best practices for automating dSYM uploads with the Embrace iOS SDK 6.x
sidebar_position: 5
---

# dSYM Upload Automation

For detailed information about automating dSYM uploads with CI systems, please refer to our dedicated guide:

[Automated Builds and dSYM Uploads](/ios/best-practices/ci-dsym-upload/)

The guide covers:

- Setting up artifact storage in various CI providers
- Finding and collecting dSYM files
- Creating automated scripts for dSYM collection
- Working with Xcode Cloud
- Manual and automated uploads

This is an essential best practice for ensuring proper symbolication of crash reports in the Embrace dashboard.

## Key Changes in iOS SDK 6.x

**Important:** Starting with iOS SDK 6.x, the dSYM upload scripts are no longer bundled with the SDK package. Make sure to change your CI scripts to download and unzip the support utility from https://downloads.embrace.io/embrace_support.zip

For complete setup instructions, see [dSYM Upload](/ios/6x/getting-started/dsym-upload).
