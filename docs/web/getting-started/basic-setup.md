---
title: Basic Setup
description: Setting up the Embrace Web SDK in your application
sidebar_position: 1
---

# Install the package

npm:

```sh
npm install @embrace-io/web-sdk
```

yarn:

```sh
yarn add @embrace-io/web-sdk
```

:::tip
For CDN installs, see [Including the SDK as a code snippet from CDN](#including-the-sdk-as-a-code-snippet-from-cdn).
:::

## Initialize the SDK

Once you've created an Embrace web application you can initialize the SDK using the appID you were given along with
the app version of your application. The following should be done as early in your app's lifecycle as possible to start
capturing telemetry:

```typescript
import { sdk } from '@embrace-io/web-sdk';

const result = sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
});

if (!!result) {
  console.log("Successfully initialized the Embrace SDK");
} else {
  console.log("Failed to initialize the Embrace SDK");
}
```

At this point you should be able to rebuild your app and have Embrace begin collecting telemetry. Data should start to
show up in the Embrace Dashboard once the SDK reports at least 1 completed session. You can learn more about how sessions
are calculated [here](/web/core-concepts/sessions.md).

:::note  
It may take a few minutes before the first sessions appear in your Embrace dashboard.
:::

## Keeping your app version up-to-date

Embrace uses the `appVersion` you provide to segment collected telemetry and allow you to view differences between
releases, as such you should make sure this value is updated whenever you release a new version of your application. If
you use your `package.json` to track versions of your app then a way to keep this up-to-date is simply to read that
value when initializing the SDK (assuming that your bundler provides a method for importing json files):

```typescript
import * as packageInfo from "../<some-path>/package.json";

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: packageInfo.version,
});
```

Alternatively if your app version is generated as part of your CI/CD process, you can use our CLI tool to inject your
app version into your bundle at build time. The process is done as part of [uploading sourcemaps](/web/getting-started/sourcemap-uploads.md).

## Including the SDK as a code snippet from CDN

We recommend you include our SDK as a regular npm dependency (see above). If you prefer to include the SDK as a code
snippet from CDN, you can do so by adding the following script tag to your main HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/@embrace-io/web-sdk@X.X.X"></script>
```

Replacing `X.X.X` with the version of the SDK you wish to include. Check available version on [npm](https://www.npmjs.com/package/@embrace-io/web-sdk).

We recommend you add this script tag to the `<head>` of your HTML file, so that it loads before your app code. This will
expose the SDK as a global variable `EmbraceWebSdk` on the `window` object. This needs to be added before any script
that makes use of the sdk.

The rest of this documentation assumes using the SDK from an NPM installation, here are some required changes to keep in
mind as you refer to further instructions:

1) Importing the sdk from node modules is no longer valid. Instead, reference it from the global `window` object:

   ```diff
   - import { sdk } from '@embrace-io/web-sdk';
   + const { sdk } = window.EmbraceWebSdk;
   ```

2) Our CLI tool does not support injecting an app version when loading from CDN since in that case our SDK is not

bundled with your code, instead you will need to make sure to pass in your app version when initializing the sdk as in
the following example:

   ```javascript
   sdk.initSDK({
     appVersion: '0.0.1',
     /*...*/
   });
   ```

### Async CDN Loading

If you prefer to load the SDK asynchronously to avoid blocking the rendering of your page, you'll need to add the
following snippet to your HTML file. Remember to replace `X.X.X` with the version of the SDK you want to include:

```html
<script>
   !function(){window.EmbraceWebSdkOnReady=window.EmbraceWebSdkOnReady||{q:[],onReady:function(e){window.EmbraceWebSdkOnReady.q.push(e)}};let e=document.createElement("script");e.async=!0,e.src="https://cdn.jsdelivr.net/npm/@embrace-io/web-sdk@X.X.X",e.onload=function(){window.EmbraceWebSdkOnReady.q.forEach(e=>e()),window.EmbraceWebSdkOnReady.q=[],window.EmbraceWebSdkOnReady.onReady=function(e){e()}};let n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)}();
</script>
```

By deferring the loading of the SDK, any early calls to the SDK need to be wrapped in the `onReady` method:

```javascript
window.EmbraceWebSdkOnReady.onReady(() => {
   window.EmbraceWebSdk.sdk.initSDK({
      appVersion: '0.0.1',
      /*...*/
   });
})
```

This is necessary to ensure that the SDK is fully loaded before you start using it.

:::warning
The SDK may miss some early telemetry events emitted before the SDK is initialized if you use this method.
:::

## Using the SDK without the Embrace Dashboard

If you'd prefer not to send data to Embrace you can simply omit the embrace app id when calling `initSDK`. Note that in
this case at least one custom exporter needs to be configured following the steps
from [OpenTelemetry Export](/web/advanced-features/opentelemetry-export.md).

## Troubleshooting

### Compatibility with OTel packages

The SDK is built on top of OpenTelemetry and as such it is possible to use it alongside other OTel libraries. If you
wish to customize the sdk behaviour by configuring custom resources, exporters, processors or instrumentations you
should make sure to use versions of the OTel packages that are compatible with what the SDK uses. this table
summarizes those compatible versions of the OTel packages:

| Open Telemetry APIs | Core  | Instrumentations & Contrib |
|---------------------|-------|----------------------------|
| ^1.9.0              | ^1.30 | ^0.57.0                    |

For a full list of dependencies used by the SDK, please refer to the [package.json](https://github.com/embrace-io/embrace-web-sdk/blob/main/package.json)
and [package-lock.json](https://github.com/embrace-io/embrace-web-sdk/blob/main/package-lock.json) files in the SDK repository.

### Turning on verbose logging in the SDK

By default, the SDK will only send error level logs to the console. The log level of the SDK can be increased when
initializing as follows:

```typescript
import { sdk } from '@embrace-io/web-sdk';

sdk.initSDK({
  appID: "YOUR_EMBRACE_APP_ID",
  appVersion: "YOUR_APP_VERSION",
  logLevel: sdk.DiagLogLevel.INFO,
});
```

## Next Steps

After basic setup, you can:

- Configure [Sourcemap Upload](/web/getting-started/sourcemap-uploads.md) to view symbolicated stack traces for
- Learn about [Sessions](/web/core-concepts/sessions.md) and how they track user activity
exceptions and logs in the Embrace dashboard
- Explore [Traces & Spans](/web/core-concepts/traces-spans.md) for performance monitoring
- Dig into what is available through [automatic instrumentation](/web/automatic-instrumentation/index.md)
