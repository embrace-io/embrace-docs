---
title: "Uploading dSYMs"
description: Upload dSYM files to see translated stack traces
sidebar_position: 3
aliases:
  - /ios/dsym-upload/
---

# Uploading dSYMs

When applications are uploaded to the AppStore they are often stripped of symbols for security or space reasons.
Much of the data our SDK collects relies on addresses, including our crash reports.
If you choose not to upload your dSYM files, you will be required to manually symbolicate these addresses.

## Automatic Uploads

Automatically uploading dSYM files is a good option for you if you are not using bitcode to distribute your application.  

To enable automatic dSYM uploads, we will need to locate a number of items first:

1. **Your API key.** This is a 5 character code used to start Embrace. It was provided to you when you registered for an Embrace account.
1. **Your API token.** This is a longer character string. You can find it in the dashboard on the settings page, under the Tokens section.

Now, open the "Build Phases" tab in Xcode. We will be adding a new phase.

{{< image src="/docs/images/ios-xcode-build-phase.png" alt="Build Phase in Xcode" title="Build Phase" caption="Xcode opened to the 'Build Phases' tab. Note the '+' button in the upper middle for adding new phases" width="1600" height="1069">}}

Use the "+" button on this tab to add a new "Run Script" phase. Name the phase "Embrace Symbol Uploads".

This phase is going to be calling Embrace's `run.sh` upload script. You can configure the phase to only run on builds you want symbols uploaded to Embrace for, and skip the step on internal only builds to save time.  

The run.sh script is distributed alongside the `Embrace.framework` file. Depending on how you linked Embrace, this file will be in a different location.
See the section relevant for your integration for how to call the run script.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-type" queryString="ios-type">
<TabItem value="cocoapods" label="CocoaPods">

Use this command format for CocoaPods integrations.

```shell-session
EMBRACE_ID=USE_YOUR_KEY EMBRACE_TOKEN=USE_YOUR_TOKEN "${PODS_ROOT}/EmbraceIO/run.sh"
```

Notice how the script's location is a reference to the CocoaPods installation folder.

</TabItem>
<TabItem value="carthage" label="Carthage">

Carthage linking requires a download of a Carthage Support zip file from [this location](https://s3.amazonaws.com/embrace-downloads-prod/embrace_support.zip).

Place those files in your project where you can easily find and reference them later.
The path you put these files in will be the path used by the dSYM upload phase.
The zip file contains the `run.sh` script, so modify the path below to match your location.

```shell-session
EMBRACE_ID=USE_YOUR_KEY EMBRACE_TOKEN=USE_YOUR_TOKEN "$SRCROOT/my/path/EmbraceIO/run.sh"
```

</TabItem>
<TabItem value="manual" label="Manual">

For Manual linking, the command looks similar to the CocoaPods version but the location has changed.

```shell-session
EMBRACE_ID=USE_YOUR_KEY EMBRACE_TOKEN=USE_YOUR_TOKEN "$SRCROOT/third_party/EmbraceIO/run.sh"
```

In this version we're referencing the Embrace folder inside our `third_party` folder at the root of our project.  

</TabItem>
<TabItem value="spm" label="SPM">

SPM linking requires a download of our support utility, which we publish at [this location](https://s3.amazonaws.com/embrace-downloads-prod/embrace_support.zip). SPM uses the same utility as Carthage for uploads.

Place those files in your project where you can easily find and reference them later.
The path you put these files in will be the path used by the dSYM upload phase.
The zip file contains the `run.sh` script, so modify the path below to match your location.

```shell-session
EMBRACE_ID=USE_YOUR_KEY EMBRACE_TOKEN=USE_YOUR_TOKEN "$SRCROOT/my/path/EmbraceIO/run.sh"
```

</TabItem>
</Tabs>

:::info
In the examples above, notice how the environment variables for your key and token are on the same line as the call to the `run.sh` script. If the environment variables are on different lines, they will not be available when run.sh executes and the command will fail.
:::

:::info
If your crashes are not being symbolicated due to dSYM files being missing, see the section on [troubleshooting dSYM uploads](/ios/faq#troubleshooting-dsym-upload) in the FAQ.
:::

## Manual Uploads

If your app is using bitcode or a CI system that makes accessing or modifying the build phases impossible, you can still upload your dSYM files manually.  

When applications are built with bitcode, it means the final binary and symbols only exist on Apple servers post-submission. As such you must download those symbols manually from Apple. You can do this from the Organizer window in Xcode.

{{< image src="/docs/images/ios-xcode-organizer.png" alt="Organizer window in Xcode" title="Organizer window in Xcode" caption="The organizer window will allow you to download the dSYM files from Apple" width="1600" height="1236" >}}

Once you have the dSYMs on your computer, you can upload it to Embrace using our upload utility. 
 
The upload utility is distributed with the Embrace SDK. See the section above on [automatically uploading dSYMs](/ios/integration/dsym-upload#automatic-uploads) to learn how to locate this file in your project. You will also need your API key and API token.

Run the upload tool and your dSYM will be sent to Embrace.

```shell-session
/EmbraceIO/upload -app $APP_KEY -token $API_TOKEN dsyms.zip
```

This process can be scripted into your CI backend as well. Simply include the upload utility with your project's repo and call it from within the CI scripting system.

--- 

dSYM's are complicated, but ensuring that Embrace has them will make the data you collect much more useful. Please reach out if you have any trouble with this process.

In the next section, we'll learn how to keep Embrace updated.
