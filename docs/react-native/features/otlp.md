---
title: OTLP export
sidebar_position: 9
---

## OTLP export

Embrace provides the `@embrace-io/react-native-otlp` package that can be used to export telemetry into a backend of choice.

The [OpenTelemetry Protocol](https://opentelemetry.io/docs/specs/otel/protocol/) (OTLP) is an open standard that enables the transfer of observability data—such as traces and logs—from applications to various monitoring and analytics backends. By adopting OTLP, developers can send telemetry data in a consistent format, making integration with multiple backends straightforward.

This package provides an easy way to export trace and log data to any OTLP-compatible backend over HTTP. If the app_id / token values are provided the package also keeps sending telemetry data to Embrace, ensuring continuous observability with Embrace’s platform while allowing users to export data to other observability backends.

For more information about how Android / iOS Native custom export work please visit the [OpenTelemetry Integration](/open-telemetry/integration/) guide.

:::info
Note that exporters must be configured before the native Embrace SDKs are started, so exporters can only be configured in JavaScript using `@embrace-io/react-native-otlp` if you are initializing the SDK in the JavaScript layer of your app. If you are initializing the Embrace Android and iOS SDKs in your native code you will need to [configure custom exporters in the native layer](#initializing-in-the-native-layer)
:::

### Install the package

npm:

```sh
npm install @embrace-io/react-native-otlp
```

yarn:

```sh
yarn add @embrace-io/react-native-otlp
```

For iOS you will also need to install or update pods for the application:

```sh
cd ios && USE_FRAMEWORKS=dynamic pod install --repo-update
```

If you are not using Expo, you need to update your Metro configuration before running the application.
To do this, open your `metro.config.js` file and set `transformer.unstable_allowRequireContext` to true:

```javascript
// metro.config.js
module.exports = {
  transformer: {
    unstable_allowRequireContext: true,
    // ... other configuration
  },
};
```

This update is required because, under the hood, we check at runtime whether the `@embrace-io/react-native-otlp` package is installed. This package is mandatory if the OTLP feature is needed.

Expo applications use the `@expo/metro-config` package, which applies a default Metro configuration that enables this flag by default. As a result, this step is not necessary for Expo projects.

### Implementation

For this example we will use Grafana Cloud in terms of redirecting telemetry data over there using OTLP endpoints. For more information about this please visit their online [docs](https://grafana.com/docs/grafana-cloud/send-data/otlp/send-data-otlp/).

```javascript
import React, { useEffect, useMemo, useState } from 'react';
import { useEmbrace } from '@embrace-io/react-native';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

const GRAFANA_TOKEN = '__GRAFANA_TOKEN__'; // `grafana_instance:token` converted into a base64 string.
const EXPORTER_CONFIG = {
  logExporter: {
    endpoint: 'https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/logs',
    headers: [
      {
        key: 'Authorization',
        token: `Basic ${GRAFANA_TOKEN}`,
      },
    ],
  },
  traceExporter: {
    endpoint:
      'https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/traces',
    headers: [
      {
        key: 'Authorization',
        token: `Basic ${GRAFANA_TOKEN}`,
      },
    ],
  },
};

// iOS is configurable through code, Android configuration happens at build time
const IOS_SDK_CONFIG = { appId: '__APP_ID__' };

function RootLayout() {
  const { isPending, isStarted } = useEmbrace({
    ios: IOS_SDK_CONFIG,
    exporters: EXPORTER_CONFIG,
  });

  if (isPending) {
    return (
      <View>
        <Text>Loading Embrace</Text>
      </View>
    );
  } else {
    if (!isStarted) {
      console.log('An error occurred during Embrace initialization');
    }
  }

  // regular content of the application
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default RootLayout;
```

In case you want to avoid sending telemetry into Embrace you could do it by removing the app_id/token values from each Platform configuration. For more information please see our guide on how to [use Embrace without an account](/react-native/integration/login-embrace-dashboard/#use-without-an-embrace-account).

### Disable tracing for the OTLP export network requests

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Embrace automatically creates spans for network requests, however because the OTLP export itself makes a network request
this can produce a cycle where the export's network request creates a span which is then exported and then creates another
span, etc.

To avoid this you can configure the endpoint to which you are exporting to be ignored on both Android and iOS:
<Tabs groupId="platform" queryString="platform">

<TabItem value="android" label="Android">

Edit `android/app/src/main/embrace-config.json` in your app and add the `disabled_url_patterns` key. In the above example
if you were exporting to Grafana your config would look like:

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "sdk_config": {
    "app_framework": "react_native",
    "networking": {
      "enable_network_span_forwarding": true,
      "disabled_url_patterns": ["grafana.net"]
    }
  }
}
```

See the [Android Configure File](/android/configuration/configuration-file/#networking---disabled_url_patterns-string-array)
page for more details.

</TabItem>

<TabItem value="ios" label="iOS">

Add the `disabledUrlPatterns` key when initializing in the JS layer. In the above example for exporting to Grafana you would add the following in the `SDK_CONFIG`:

```json
"disabledUrlPatterns": [
    "grafana.net"
]
```

</TabItem>
</Tabs>

### Initializing in the native layer

If you already have the Embrace React Native SDK initialized in your native code or if you are planning to run the install scripts mentioned in our [integration guide](/react-native/integration/add-embrace-sdk/#native-setup) you can still benefit from the OTLP custom export feature. Remember that the install scripts only add the minimum code required to initialize the native Embrace SDKs. Details on how to configure custom exporters can be found in the native SDK documentation for each platform:

- [Android](/android/features/traces/#export-to-opentelemetry-collectors)
- [iOS](/ios/6x/advanced-features/opentelemetry-export/)
