---
title: Symbolicating Crash Reports
description: Upload your app's desymbolicated files to Embrace for readable stack traces.
sidebar_position: 3
---

# Symbolicating Crash Reports

In order to have stack traces in error logs or crashes be as readable as possible, its important to upload your app's desymbolication files to the Embrace backend. The best way to do this is to add a build step to your project.

First, download our [support utility](https://downloads.embrace.io/embrace_support.zip). This is an archive that contains the Embrace symbol upload binaries for multiple platforms and also a shell script `run.sh`. These should be copied into your project at a known location like `embrace_support/embrace_symbol_upload.darwin` and `embrace_support/run.sh`.

Then, in your app target's Xcode Build Phases pane, add a new 'Run Script Phase' at the end of the list of Build Phases. This run script phase should invoke the `run.sh` script with the envvars `EMBRACE_ID` and `EMBRACE_TOKEN`:

```
EMBRACE_ID='USE_YOUR_KEY' EMBRACE_TOKEN='USE_YOUR_TOKEN' "path/to/run.sh"
```

These envvars are retrieved from your Embrace dashboard and are:

- **EMBRACE_ID** The 'appId' value you have configured in `Embrace.Options`.
- **EMBRACE_TOKEN** A secret token to authorize the upload request. This is a longer key that you can find in the settings page.

![run script in xcode](https://github.com/embrace-io/embrace-apple-sdk/raw/main/Documentation/assets/GettingStarted/run-script-phase.png)
