---
title: dSYM Upload
description: Upload dSYM files to symbolicate crash reports in your iOS 6.x app
sidebar_position: 5
---

# dSYM Upload

When applications are uploaded to the App Store they are often stripped of symbols for security or space reasons. Much of the data our SDK collects relies on addresses, including our crash reports. If you choose not to upload your dSYM files, you will be required to manually symbolicate these addresses.

:::warning Important Note
Starting on April 25, 2023 Apple requires all apps to be built with Xcode 14. Apple deprecated bitcode in Xcode 14. This means you may be unable to download dSYMs from Apple in the near future. We recommend that you setup automatic uploads. [Apple Announcement](https://developer.apple.com/news/?id=2ygwqlzd)
:::

## Automatic Uploads

Automatically uploading dSYM files is the recommended approach for symbolication. This ensures that crash reports are properly symbolicated without manual intervention.

To enable automatic dSYM uploads, you will need:

1. **Your App ID** - This is a 5 character code used to initialize Embrace. It was provided when you registered for an Embrace account.
2. **Your API Token** - This is a longer character string found in the dashboard on the settings page, under the Tokens section.

### Setting up the Build Phase

1. Open the "Build Phases" tab in Xcode
2. Use the "+" button to add a new "Run Script" phase
3. Name the phase "Embrace Symbol Uploads"

:::warning Xcode 15+ Note
You may run into an issue in Xcode 15 and above as Run Script phases now run in a sandbox by default. Our Run Script needs to use the network to upload dSYM files, so disable sandboxing by updating the `User Script Sandboxing` Build Setting to `NO`.

Please ensure that the upload script is the **last step** in the build phase. Placing it last ensures all necessary build artifacts are generated before the upload begins.
:::

### Script Configuration by Integration Method

The run.sh script location depends on how you integrated the Embrace SDK:

#### Swift Package Manager

For SPM integrations, download the support utility from [our releases page](https://github.com/embrace-io/embrace-apple-sdk/releases) and place it in your project. Then use:

```bash
EMBRACE_ID=YOUR_APP_ID EMBRACE_TOKEN=YOUR_API_TOKEN "${SRCROOT}/path/to/EmbraceIO/run.sh"
```

#### CocoaPods

For CocoaPods integrations:

```bash
EMBRACE_ID=YOUR_APP_ID EMBRACE_TOKEN=YOUR_API_TOKEN "${PODS_ROOT}/EmbraceIO/run.sh"
```

#### Manual Integration

For manual linking:

```bash
EMBRACE_ID=YOUR_APP_ID EMBRACE_TOKEN=YOUR_API_TOKEN "${SRCROOT}/third_party/EmbraceIO/run.sh"
```

:::info Environment Variables
Notice how the environment variables for your App ID and token are on the same line as the call to the `run.sh` script. If the environment variables are on different lines, they will not be available when run.sh executes and the command will fail.
:::

## Manual Uploads

If automatic uploads aren't suitable for your CI/CD pipeline, you can upload dSYM files manually.

### Using the Upload Utility

The upload utility is distributed with the Embrace SDK. You can upload individual dSYM files or zip archives:

```bash
# Upload a single file
./embrace_symbol_upload.darwin --app YOUR_APP_ID --token YOUR_API_TOKEN dsyms.zip

# Upload multiple files
./embrace_symbol_upload.darwin --app YOUR_APP_ID --token YOUR_API_TOKEN --dsym my_dsym --dsym my_file.zip
```

### CI/CD Integration

This process can be scripted into your CI backend. Include the upload utility with your project's repository and call it from within your CI scripting system.

## Troubleshooting

If your crashes are not being symbolicated:

1. Verify that dSYM files are being generated in your build settings
2. Check that the upload script is running successfully in your build logs
3. Ensure your App ID and API Token are correct
4. Verify that the dSYM files match the build that crashed

For more troubleshooting tips, see our [FAQ section](/ios/faq#troubleshooting-dsym-upload).

## Next Steps

With dSYM uploads configured, your crash reports will be properly symbolicated in the Embrace dashboard. Next, learn about [configuring crash reporting](/ios/6x/manual-instrumentation/error-handling) in your application. 