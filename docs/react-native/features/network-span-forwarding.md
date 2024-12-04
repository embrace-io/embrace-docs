---
title: Network Span Forwarding
sidebar_position: 7
---

# Network Span Forwarding

For a full explanation of this feature please refer to [Essentials / Product Overview / Network Span Forwarding](/product/network-spans-forwarding/) section.

## Enablement

Once all requirements described in [Network Span Forwarding](/product/network-spans-forwarding/) are met, the feature will be set up by an integrations specialist who will reach out to confirm details.

## Android

You may enable the feature by adding the proper configuration through the `app/src/main/embrace-config.json` placed in the `android` folder that is supposed to be part of your React Native project. NSF is not enabled by default for Android platform for React Native projects. For more information about this file, please refer to the [Configuration File section](/android/features/configuration-file/).

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "sdk_config": {
      "networking": {
          "enable_network_span_forwarding": true
      }
  }
}
```

## iOS

Differently than Android, the Embrace React Native SDK enables by default the Network Span Forwarding feature for iOS.
Only if you want to disable the feature you can pass a `true` value for the `disableNetworkSpanForwarding` property since the configuration for this platform is done through the code.
You may then pass the proper object into the `initialize` method for starting the SDK as usual.

```javascript
// at the root of the application
import {initialize} from "@embrace-io/react-native";

export const App = () => {
  const [isEmbraceLoaded, setIsEmbraceLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      const sdkConfig = {
        ios: {
          appId: "xxxxx",
          appGroupId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          //  this feature is enabled by default but you can turn it off by passing a `true` value.
          disableNetworkSpanForwarding: true,
        },
      };

      await initialize(config); // passing the config to the Embrace React Native SDK.
      setEmbraceLoaded(true);
    };

    init();
  }, []);

  if (!isEmbraceLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading Embrace</Text>
      </View>
    );
  }

  // the rest of your app goes here
  return <AppContent />;
};
```