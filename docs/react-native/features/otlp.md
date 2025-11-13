---
title: OTLP Export
sidebar_position: 9
---

# OTLP Export

Embrace provides the `@embrace-io/react-native-otlp` package that can be used to export telemetry into a backend of choice.

The [OpenTelemetry Protocol](https://opentelemetry.io/docs/specs/otel/protocol/) (OTLP) is an open standard that enables the transfer of observability data—such as traces and logs—from applications to various monitoring and analytics backends. By adopting OTLP, developers can send telemetry data in a consistent format, making integration with multiple backends straightforward.

This package provides an easy way to export trace and log data to any OTLP-compatible backend over HTTP. If the app_id / token values are provided the package also keeps sending telemetry data to Embrace, ensuring continuous observability with Embrace’s platform while allowing users to export data to other observability backends.

For more information about how Android / iOS Native custom export work please visit the [OpenTelemetry Integration](/open-telemetry/integration/) guide.

## Install the package

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

## Implementation

For this example we will use Grafana Cloud in terms of redirecting telemetry data over there using OTLP endpoints. For more information about this please visit their online [docs](https://grafana.com/docs/grafana-cloud/send-data/otlp/send-data-otlp/).

```javascript
import React, {useEffect, useMemo, useState} from "react";
import {useEmbrace} from "@embrace-io/react-native";
import {View, Text} from "react-native";
import {Stack} from "expo-router";

const GRAFANA_TOKEN = "__GRAFANA_TOKEN__"; // `grafana_instance:token` converted into a base64 string.
const EXPORTER_CONFIG = {
  logExporter: {
    endpoint: "https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/logs",
    headers: [
      {
        key: "Authorization",
        token: `Basic ${GRAFANA_TOKEN}`,
      },
    ],
  },
  traceExporter: {
    endpoint:
      "https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/traces",
    headers: [
      {
        key: "Authorization",
        token: `Basic ${GRAFANA_TOKEN}`,
      },
    ],
  },
};

// iOS is configurable through code, Android configuration happens at build time
const IOS_SDK_CONFIG = {appId: "__APP_ID__"};

function RootLayout() {
  const {isPending, isStarted} = useEmbrace({
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
      console.log("An error occurred during Embrace initialization");
    }
  }

  // regular content of the application
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
  );
}

export default RootLayout;
```

## Initializing in the Native layer

If you already have the Embrace React Native SDK initialized your native code or if you are planning to run the install scripts mentioned in our [docs section](/react-native/integration/add-embrace-sdk/#native-setup) you could still get the benefit of the OTLP custom export feature. Remember that the install scripts are adding the minimum code needed for initializing Embrace in the Native side but are not integrating the configuration for exporting the telemetry data into your backend of your choice. For this you would need to manually tweak both the Android/iOS sides.

### iOS

If you already ran the install script mentioned above you would be able to find the `EmbraceInitializer.swift` file with some initial code that you can update:

<Tabs groupId="ios-otlp-native-layer" queryString="ios-otlp-native-layer">
<TabItem value="swift" label="Swift">

```swift
import Foundation
import EmbraceIO
import RNEmbraceOTLP

let GRAFANA_AUTH_TOKEN = "Basic __YOUR TOKEN__"
let GRAFANA_TRACES_ENDPOINT = "https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/traces"
let GRAFANA_LOGS_ENDPOINT = "https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/logs"

@objcMembers class EmbraceInitializer: NSObject {
    static func start() -> Void {
        do {
          // Preparing Span Exporter config with the minimum required
          let traceExporter = OtlpHttpTraceExporter(endpoint: URL(string: GRAFANA_TRACES_ENDPOINT)!,
            config: OtlpConfiguration(
                headers: [("Authorization", GRAFANA_AUTH_TOKEN)]
            )
          )

          // Preparing Log Exporter config with the minimum required
          let logExporter = OtlpHttpLogExporter(endpoint: URL(string: GRAFANA_LOGS_ENDPOINT)!,
             config: OtlpConfiguration(
                headers: [("Authorization", GRAFANA_AUTH_TOKEN)]
             )
          )

          try Embrace
              .setup(
                  options: Embrace.Options(
                      appId: "__YOUR APP ID__",
                      platform: .reactNative,
                      export: OpenTelemetryExport(spanExporter: traceExporter, logExporter: logExporter) // passing the configuration into `export`
                  )
              )
              .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

</TabItem>
</Tabs>

### Android

Similar to iOS, if you already ran the install script you will see the following line already in place in your `MainApplication` file:

```text
Embrace.getInstance().start(this)
```

Tweak the `onCreate` method using the following snippet to initialize the exporters with the minimum configuration needed.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-otlp-native-layer" queryString="android-otlp-native-layer">
<TabItem value="kotlin" label="Kotlin">

Add the following imports:

```kotlin
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter
```

And then the following in the OnCreate method:

```kotlin
// Preparing Span Exporter config with the minimum required
val spanExporter = OtlpHttpSpanExporter.builder()
                                .setEndpoint("https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/traces")
                                .addHeader("Authorization", "Basic __YOUR TOKEN__")

// Preparing Log Exporter config with the minimum required
val logExporter = OtlpHttpLogRecordExporter.builder()
                                .setEndpoint("https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/logs")
                                .addHeader("Authorization", "Basic __YOUR TOKEN__")

Embrace.getInstance().addSpanExporter(spanExporter.build())
Embrace.getInstance().addLogRecordExporter(logExporter.build())

// This is the line already added by the install script
Embrace.getInstance().start(this)
```

</TabItem>

<TabItem value="java" label="Java">

Add the following imports:

```java
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter;
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;
```

And then the following in the OnCreate method:

```java
// Preparing Span Exporter config with the minimum required
OtlpHttpSpanExporter spanExporter = OtlpHttpSpanExporter.builder();
                                .setEndpoint("https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/traces")
                                .addHeader("Authorization", "Basic __YOUR TOKEN__");

// Preparing Log Exporter config with the minimum required
OtlpHttpLogRecordExporter logExporter = OtlpHttpLogRecordExporter.builder();
                                .setEndpoint("https://otlp-gateway-prod-us-central-0.grafana.net/otlp/v1/logs")
                                .addHeader("Authorization", "Basic __YOUR TOKEN__");

Embrace.getInstance().addSpanExporter(spanExporter.build());
Embrace.getInstance().addLogRecordExporter(logExporter.build());

// This is the line already added by the install script
Embrace.getInstance().start(this);
```

</TabItem>
</Tabs>

In case you want to avoid sending telemetry into Embrace you could do it by removing the app_id/token values from each Platform configuration. For more information please visit the how to [Use without an Embrace account](/react-native/integration/login-embrace-dashboard#use-without-an-embrace-account) section.

## Disable tracing for the OTLP export network requests

Embrace automatically creates spans for network requests, however because the OTLP export itself makes a network request
this can produce a cycle where the export's network request creates a span which is then exported and then creates another
span, etc.

To avoid this you can configure the endpoint to which you are exporting to be ignored on both Android and iOS:
<Tabs>

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
      "disabled_url_patterns": [
        "grafana.net"
      ]
    }
  }
}
```

See the [Android Configure File](/android/features/configuration-file/#networking---disabled_url_patterns-string-array)
page for more details.

</TabItem>

<TabItem value="ios" label="iOS">

When initializing in the JS layer you can simply include the `disabledUrlPatterns` key, in the above example if you were
exporting to Grafana you would add the following in the `SDK_CONFIG`:

```json
"disabledUrlPatterns": [
    "grafana.net"
]
```

When initializing in Swift more configuration is required when setting up Embrace. First add the following import to
`EmbraceInitializer.swift`:

```swift
import EmbraceCrash
```

Then setup a custom `URLSessionCaptureService` that ignores the Grafana export (see [Configuring the iOS SDK](/ios/6x/getting-started/configuration-options.md)
for more details):

```swift
let servicesBuilder = CaptureServiceBuilder()
let urlSessionServiceOptions = URLSessionCaptureService.Options(
  injectTracingHeader: true,
  requestsDataSource: nil,
  ignoredURLs: ["grafana.net"]
)
// manually adding the URLSessionCaptureService
servicesBuilder.add(.urlSession(options: urlSessionServiceOptions))
// adding defaults
servicesBuilder.addDefaults()
```

Finally pass the additional configuration when starting the SDK:

```swift
try Embrace
    .setup(
        options: Embrace.Options(
          appId: "__YOUR APP ID__",
          platform: .reactNative,
          captureServices: servicesBuilder.build(),
          crashReporter: EmbraceCrashReporter(),
          export: OpenTelemetryExport(spanExporter: traceExporter, logExporter: logExporter) // passing the configuration into `export`
        )
    )
    .start()
```

</TabItem>
</Tabs>
