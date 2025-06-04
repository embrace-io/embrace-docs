---
title: Sourcemap Upload
description: Upload Sourcemaps files to symbolicate crash reports in your Web app
sidebar_position: 5
---

When applications are uploaded to the App Store they are often stripped of symbols for security or space reasons. Much of the data our SDK collects relies on addresses, including our crash reports. If you choose not to upload your dSYM files, you will be required to manually symbolicate these addresses.

## Automatic Uploads

Automatically uploading sourcemap files is the recommended approach for symbolication. This ensures that crash reports are properly symbolicated without manual intervention.


## Manual Uploads

If automatic uploads aren't suitable for your CI/CD pipeline, you can upload sourcemap files manually.
