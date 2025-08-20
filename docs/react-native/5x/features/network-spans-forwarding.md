---
title: Network Spans Forwarding
sidebar_position: 7
---

# Network Spans Forwarding

For a full explanation of this feature please refer to the [Network Spans Forwarding Product Overview](/product/network-spans-forwarding/).  

## Enablement

Once all requirements described in [Network Spans Forwarding](/product/network-spans-forwarding/#enable-network-spans-forwarding) are met (*local configuration*), the feature will be set up by an integrations specialist who will reach out to confirm details (*remote configuration*).
At this point everything should be working on iOS. For Android one additional configuration is required in `android/app/src/main/embrace-config.json` placed in the Android folder. This feature **is not** enabled by default for this Platform but you can turn this ON by adding the `enable_network_span_forwarding` attribute:


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

For more information about this file please refer to the [Android / Configuration File section](/android/features/configuration-file/).

## Turning off the feature

If you want to disable this feature you would need to reach out to us to remove the *remote configuration* turned on previously. As final step you would need to tweak your *local configuration* to completely disable this feature.

### iOS

You should tweak the SDK Initialization and add a `true` value for the `disableNetworkSpanForwarding` property since the configuration for this platform is done through the code.
You may then pass the proper object into the `initialize` method for starting the SDK as usual.

```javascript
// App.tsx, or the root of the application
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

### Android

Remove the parameter that was added or set to `false`.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "sdk_config": {
      "networking": {
          "enable_network_span_forwarding": false
      }
  }
}
```
