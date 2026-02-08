---
title: Network Spans Forwarding
sidebar_position: 7
---

# Network Spans Forwarding

For a full explanation of this feature please refer to the [Network Spans Forwarding Product Overview](/data-forwarding/network-spans-forwarding/).

## Enablement

Once all requirements described in [Network Spans Forwarding](/data-forwarding/network-spans-forwarding/#enable-network-spans-forwarding) are met (*local configuration*), the feature will be set up by an integrations specialist who will reach out to confirm details (*remote configuration*).

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
