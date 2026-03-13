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

:::info Retroactive Symbolication
Embrace performs symbolication server-side and retroactively. If a dSYM is uploaded after a crash has already been received, Embrace will automatically re-symbolicate older crashes when the matching dSYM arrives. This means you don't lose crash data if dSYMs are uploaded later.
:::

## Prerequisites

Before setting up dSYM uploads, ensure your Xcode project is configured to generate dSYM files:

1. Select your project in the Project Navigator
2. Select the appropriate target
3. Go to **Build Settings** > **All**
4. Search for **Debug Information Format**
5. Set the value to **DWARF with dSYM File** (`dwarf-with-dsym`) for both Debug and Release configurations

If this setting is set to `dwarf` (without dSYM), no dSYM files will be generated and the upload script will skip the upload with a warning message.

## Automatic Uploads

Automatically uploading dSYM files is the recommended approach for symbolication. This ensures that crash reports are properly symbolicated without manual intervention.

To enable automatic dSYM uploads, you will need:

- **Your App ID** - This is a 5 character code used to initialize Embrace. It was provided when you registered for an Embrace account.
- **Your API Token** - This is a longer character string found in the dashboard on the settings page, under the Tokens section.

### Setting up the Build Phase

1. Open the "Build Phases" tab in Xcode
2. Use the "+" button to add a new "Run Script" phase
3. Name the phase "Embrace Symbol Uploads"

:::warning Xcode 15+ Note
You may run into an issue in Xcode 15 and above as Run Script phases now run in a sandbox by default. Our Run Script needs to use the network to upload dSYM files, so disable sandboxing by updating the `User Script Sandboxing` Build Setting to `NO`.

Please ensure that the upload script is the **last step** in the build phase. Placing it last ensures all necessary build artifacts are generated before the upload begins.
:::

### Ensuring dSYMs are Available (Recommended)

To prevent race conditions and ensure dSYMs are generated before upload, add these **Input Files** to your Run Script phase:

```text
$(DWARF_DSYM_FOLDER_PATH)/$(DWARF_DSYM_FILE_NAME)/Contents/Resources/DWARF/$(PRODUCT_NAME)
$(DWARF_DSYM_FOLDER_PATH)/$(DWARF_DSYM_FILE_NAME)
```

This tells Xcode that your script depends on the dSYM files being available, ensuring proper build order and preventing the upload script from running before dSYMs are generated.

### Download and Setup the Upload Utility

**Important:** Starting with iOS SDK 6.x, the dSYM upload scripts are no longer bundled with the SDK package. You must download them separately.

1. **Download the support utility** from: https://downloads.embrace.io/embrace_support.zip
2. **Extract the archive** and copy both `run.sh` and `embrace_symbol_upload.darwin` to a known location in your project (e.g., `Scripts/embrace/` or `third_party/embrace/`)

### Script Configuration

Once you've placed the scripts in your project, use the following command regardless of your integration method:

```bash
EMBRACE_ID=YOUR_APP_ID EMBRACE_TOKEN=YOUR_API_TOKEN "${SRCROOT}/path/to/your/run.sh"
```

Replace `path/to/your/` with the actual path where you placed the scripts. For example:

- `"${SRCROOT}/Scripts/embrace/run.sh"`
- `"${SRCROOT}/third_party/embrace/run.sh"`
- `"${SRCROOT}/embrace_support/run.sh"`

:::info Environment Variables
Notice how the environment variables for your App ID and token are on the same line as the call to the `run.sh` script. If the environment variables are on different lines, they will not be available when run.sh executes and the command will fail.
:::

## Manual Uploads

If automatic uploads aren't suitable for your CI/CD pipeline, you can upload dSYM files manually.

### Using the Upload Utility

The upload utility is available in the support utility download. You can upload individual dSYM files or zip archives:

```bash
# Upload a single file
./embrace_symbol_upload.darwin --app YOUR_APP_ID --token YOUR_API_TOKEN dsyms.zip

# Upload multiple files
./embrace_symbol_upload.darwin --app YOUR_APP_ID --token YOUR_API_TOKEN --dsym my_dsym --dsym my_file.zip
```

### CI/CD Integration

The process above should be included to run automatically within your CI backend. Download and unzip the upload utility and call it from within your CI scripting system.

If you are using GitHub Actions, you may instead use [embrace-io/action-symbol-upload](https://github.com/marketplace/actions/upload-symbols-to-embrace) action as a step in your workflow.

## Troubleshooting

If your crashes are not being symbolicated:

1. Verify that `DEBUG_INFORMATION_FORMAT` is set to `dwarf-with-dsym` in your build settings
2. Check that the upload script is running successfully in your build logs
3. Ensure your App ID and API Token are correct
4. Verify that the dSYM files match the build that crashed

### Debug Mode

The upload script runs in the background by default, which means upload logs appear in your system logs rather than in Xcode's build output. If you need to troubleshoot upload issues, enable debug mode by adding `EMBRACE_DEBUG_DSYM=1` to your run script:

```bash
EMBRACE_DEBUG_DSYM=1 EMBRACE_ID=YOUR_APP_ID EMBRACE_TOKEN=YOUR_API_TOKEN "${SRCROOT}/path/to/your/run.sh"
```

In debug mode, the upload runs synchronously and all logs appear directly in the Xcode build output. This slows down the build, so only enable it while troubleshooting.

For more troubleshooting tips, see our [FAQ section](/ios/faq#troubleshooting-dsym-upload).

## Next Steps

With dSYM uploads configured, your crash reports will be properly symbolicated in the Embrace dashboard. Next, learn about [configuring crash reporting](/ios/6x/manual-instrumentation/error-handling) in your application.
