---
title: "Integration Validation"
weight: 1
aliases:
  - /ios/integration-validation/
---


# Integration Validation

In order to ease the process of configuring the Xcode project for use with the 
Embrace SDK. We provide a CLI tool that you can use to help validate your 
project. 

Feel free to
[download the tool](https://s3.amazonaws.com/embrace-downloads-prod/embtool.pkg).

By default, the package installer will install the binary into your
`/usr/local/bin` path. This is a default location in your `$PATH`, so you can
confirm the installation by using:

```bash
$ which embtool
/usr/local/bin/embtool

atemmons@Embrace embrace-docs % embtool --help
OVERVIEW: A command line tool to help with Embrace integration

```

There are a few subcommands to be aware of when using this tool.

### Project Validation

```bash
$ embtool project validate --help
$ embtool project validate <path-to-xcodeproj>
```

The `project validate` subcommand is useful to verify your project's
configuration. Some examples of things it will check are:

1) the presence of an Embrace-Info.plist.
1) the presence of the Embrace Run Script build phase.
1) the configured `DEBUG_INFORMATION_FORMAT` build setting.
1) the validity of the Embrace API_KEY and upload EMBRACE_TOKEN.

This command is great to run when you are stuck configuring your Xcode project,
or if an issue occurs and you'd like to provide context to the Embrace support
team.

### Project Installation

```bash
$ embtool project install --help
$ embtool project install --api-key <api-key> --token <token> <path-to-xcodeproj>
```

The `project install` subcommand is great when you are first integrating with
Embrace or if your project relies on a project generation step as it builds
in a CI environment. This tool will edit your .xcodeproj in order to inject the
necessary configuration for use alongside the Embrace SDK. Some examples if
edits it will make are:

1) Configure the `DEBUG_INFORMATION_FORMAT` build setting to include dsym files
1) Adding the Embrace Run Script phase used to upload dsyms

It is recommended that you run this command with a clean state in your
version control system. For instance in git, stash any changes you may have
made so it is very clear what changes the install command makes.








