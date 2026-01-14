---
title: Sourcemap Upload
description: Upload Sourcemaps files to symbolicate exceptions and logs from your Web app
sidebar_position: 2
---

# Setup

In order to view symbolicated stack traces for exceptions in Embrace you must first upload your bundle and sourcemap
files. You can do so using our CLI tool, if you haven't already you can install it using:

npm:

```sh
npm install --save-dev @embrace-io/web-cli
```

yarn:

```sh
yarn add -D @embrace-io/web-cli
```

You will also require a `Symbol Upload` API token. This can be found in your Embrace dashboard by going
to [Settings->API](https://dash.embrace.io/settings/organization/api).

Then hook the CLI into your build process and point it to your path where the built JS files live in order
to perform the upload:

```sh
npx embrace-web-cli upload -a "YOUR_EMBRACE_APP_ID" -t "YOUR_EMBRACE_UPLOAD_API_TOKEN" -p "JS_BUILD_PATH"
```

:::warning
The CLI must be run BEFORE the files are packaged (e.g., before creating a Docker image or deployment archive).
The CLI injects a comment and a short function to the end of bundle files to enable symbolication, so it needs to
happen before packaging.
:::

Additionally, if your app version is only known at build-time you can include it in the same command to have it injected
into the bundle. If you follow this method do not also include appVersion when calling `initSDK` as that value will take
precedence:

```sh
npx embrace-web-cli upload --app-version "APP_VERSION" -a "YOUR_EMBRACE_APP_ID" -t "YOUR_EMBRACE_UPLOAD_API_TOKEN" -p "JS_BUILD_PATH"
```

:::info
We currently support symbolication of function names only when defined with the function keyword.
For functions assigned to constants, or variables, you will still see the unsymbolicated token.
Line and column numbers, along with file names, will always be symbolicated to the original source.
:::
