
---
title: "Automated Builds and dSYM Uploads"
description: Update your build workflow to store dSYM artifacts for later use
sidebar_position: 1
aliases:
  - /ios/best-practices/ci-dsym-upload
---

# CI Providers and Job Artifacts

Most common CI providers (Bitrise, Buildkite, CircleCI, GitHub Actions, etc.) have provided mechanism for storing build "artifacts". These artifacts are outputs from a build job. When automating the build process for your Xcode project, it is wise to store the application binary as a build artifact. This allows for easy distribution when the job completes.

Similarly, it is recommended to store any dSYM files created during the build. In this article, we'll walk through where dSYM files are generated and provide some quick scripts to use to easily collect and store these artifacts.

### Storing Artifacts by CI Provider

Here are quick links to documentation for storing artifacts in common mobile CI providers.

1. [Bitrise](https://devcenter.bitrise.io/en/builds/managing-build-files.html)
1. [Buildkite](https://buildkite.com/docs/pipelines/artifacts)
1. [CircleCI](https://circleci.com/docs/artifacts/)
1. [Github Actions](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts#about-workflow-artifacts)


# The Gist

Most CI systems operate via a build "job", where that job consists of multiple "steps". These jobs run on an "agent" - an environment to host this process. These build jobs become very customizable and very different but for the sake of this document we will focus on the following example workflow:

The following is a psuedo job declaration syntax:
```
Build Job
  1. Checkout Repository
  2. Run Tests
  3. Build App
  4. Deploy app
```

The first three steps are pretty self explanatory, we want to validate our build, then create an app release ready for distribution.

The "Deploy App" step is very team dependent. It may be an automated deployment to TestFlight or something more customized that involves uploading the app binary to a web server that can be accessed by authorized testers. In this scenario, only the app artifact is copied from the build agent. For release builds, this lacks a very important piece - dSYMs.

Let's update the above job to account for these missing dSYMs.

```
Build Job
  1. Checkout Repository
  2. Run Tests
  3. Build App
  4. Deploy app
  5. Collect dSYM files
  6. Store dSYM files as artifact
```

This added fifth step asks an important question. Where do dSYM files live? Where can I find them? We'll answer these in the following section.

# Finding dSYMs

So where do dSYM files live? Xcode refers to the location of the dSYM files as the `DWARF_DSYM_FOLDER_PATH`. There are a couple of build settings that relate to dSYMs that are useful to know about, even if you have no intention of overriding them.

```sh
$ xcodebuild -showBuildSettings -project MyProject.xcodeproj
# ...
DWARF_DSYM_FILE_NAME = MyProject.app.dSYM
DWARF_DSYM_FOLDER_PATH = /Users/myuser/Library/Developer/Xcode/DerivedData/MyProject-csghshgvxlwqxigvbxpltluvkykv/Build/Products/Release-iphoneos
# ...
```
Keep in mind that these settings are available in an Xcode build context, so you'd have access to them in an custom Run Script phase.

Let's break down that `DWARF_DSYM_FOLDER_PATH` value:

- `~/Library/Developer/Xcode/DerivedData`. A path to the Xcode DerivedData directory. This is the location Xcode uses as a build cache. You may have some experience deleting this directory when Xcode is having one of those days.
-  `MyProject-csghshgvxlwqxigvbxpltluvkykv`. This is a project specific folder. It appends a seemingly random hash to the end
- `Build/Products/`. This subpath is the location for finalized build artifacts.
- `Release-iphoneos`. This path is a combination of the Build Configuration and the SDK used. Artifacts will differ based on build configuration (Debug/Release) and the platform (iphoneos, iphonesimulator, etc.). In a CI environment, its likely that a specific step would build a single build configuration.

Its useful to have an understanding on where these dSYM files are generated. It'll be even more useful to automate searching them.

### Automation and Inspection

Let's create a script that searches this directory for our dSYM files.

```bash
$ find ~/Library/Developer/Xcode/DerivedData/MyProject*/Build/Products -iname "*.dsym"
```
Notice that we are using the project name and a wildcard to bypass the random hash Xcode appends to the project directory. Be sure to update `MyProject` to match the name of your project, or make this path component just the wildcard to find dSYMs in all your projects.

This command uses the `find` tool to search for `.dsym` bundles. Xcode creates these dSYM bundles that contain the underlying DWARF dSYM file. We can pass the path to this bundle to another tool, `dwarfdump` to retrieve information about dSYM file. This includes the UUID and architecture the binary was built targeting.

```bash
$ dwarfdump -u path/to/MyProject.app.dSYM

UUID: CD36DDDA-9DBA-3A6C-8569-1D9FF6D33AC1 (arm64) path/to/MyProject.app.dSYM/Contents/Resources/DWARF/MyProject
```

We can put these commands together to provide a descriptive output of our built dSYM files
```bash
find ~/Library/Developer/Xcode/DerivedData/MyProject*/Build/Products -iname "*.dsym" | xargs -n 1 dwarfdump -u
```

### Collection

The goal of our job in CI wasn't just to output what dSYM files we have built, but to collect and store these as artifacts. This can be done by creating a directory to copy these files into, then to zip into a single archive.

```bash
mkdir ./dsym_output
find ~/Library/Developer/Xcode/DerivedData/MyProject*/Build/Products -iname "*.dsym" | xargs -n 1 -J % cp -r % ./dsym_output
zip -r dsym_output.zip ./dsym_output
```

Once you have this archive built, be sure to store it with your CI provider. Below is an example using GitHub Actions:
```yaml
steps:
  - name: Collect dSYM Archive
    run: |
      mkdir ./dsym_output
      find ~/Library/Developer/Xcode/DerivedData/MyProject*/Build/Products -iname "*.dsym" | xargs -n 1 -J % cp -r % ./dsym_output
      zip -r dsym_output.zip ./dsym_output

  - name: Store dSYM Archvie
        uses: actions/upload-artifact@v3
        with:
          name: dSYM Archive
          path: dsym_output.zip
```

It is recommended that this `dsym_output.zip` archive is saved as a build artifact. Even better, it should be saved to a longer term storage solution like AWS S3 or a private web server.

### Upload

Its also possible to manually run the Embrace upload tool directly from a CI step. Here is our reference guide for a [manual upload](/ios/integration/dsym-upload#manual-uploads) to the Embrace dashboard.

The `APP_KEY` and `API_TOKEN` envvars should be retrieved from the Embrace dashboard.

```sh
/path/to/EmbraceIO/upload -app $APP_KEY -token $API_TOKEN dsym_output.zip
```

If the Embrace `upload` utility is in a known location you should use the existing binary. If it is non-deterministic or not included alongside the Embrace package itself, then you can download the utility directly.

```
$ curl -o ./embrace_support.zip https://s3.amazonaws.com/embrace-downloads-prod/embrace_support.zip
$ unzip ./embrace_support.zip
$ ./upload -app $APP_KEY -token $API_TOKEN dsym_output.zip

```

# dSYM Upload

If you haven't already, check out our [dSYM Upload Integration Document](/ios/integration/dsym-upload). This document walks through the Xcode project configuration that allows for the automatic upload of dSYM files to the Embrace dashboard.

