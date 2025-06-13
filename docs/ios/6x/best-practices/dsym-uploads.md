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

**Important:** Starting with iOS SDK 6.x, the dSYM upload scripts are no longer bundled with the SDK package. Make sure to:

1. Download the support utility from: https://downloads.embrace.io/embrace_support.zip
2. Include the `run.sh` and `embrace_symbol_upload.darwin` files in your CI artifacts or project repository
3. Update your CI scripts to use the correct path to these files

For complete setup instructions, see [dSYM Upload](/ios/6x/getting-started/dsym-upload). 
