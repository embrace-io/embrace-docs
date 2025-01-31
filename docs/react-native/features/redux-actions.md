---
title: Track Redux Actions
sidebar_position: 5
---

# Track Redux Actions

Embrace provides the `@embrace-io/react-native-redux` package that can be used to collect telemetry around dispatching
actions with Redux. It provides a custom middleware that can be configured with your Redux store.

## Install the component

:::info
Note that this package requires a Tracer Provider to record its telemetry, if you haven't already you can set that up by
following the instructions from our [Traces guide](/react-native/features/traces/#integration-steps).
:::

npm:

```sh
npm install @embrace-io/react-native-redux
```

yarn:

```sh
yarn add @embrace-io/react-native-redux
```

## Add the middleware

### With hooks

```javascript
import React, {useEffect, useState} from "react";
import {EnhancedStore, configureStore, Tuple} from "@reduxjs/toolkit";
import {useEmbrace} from "@embrace-io/react-native";
import {useEmbraceNativeTracerProvider} from "@embrace-io/react-native-tracer-provider";
import {useEmbraceMiddleware} from "@embrace-io/react-native-redux";

const MyApp = () => {
  const {isStarted} = useEmbrace({ios: {appId: "__APP_ID__"}});
  const {tracerProvider} = useEmbraceNativeTracerProvider({}, isStarted);
  const {middleware} = useEmbraceMiddleware(tracerProvider);
  const [store, setStore] = useState<EnhancedStore>();

  useEffect(() => {
    if (middleware && !store) {
      setStore(
        configureStore({
          reducer: rootReducer,
          middleware: () => new Tuple(middleware),
        }),
      );
    }
  }, [middleware, store]);

  ...

};
```

### Without hooks

```javascript
import {configureStore, Tuple} from "@reduxjs/toolkit";
import {initialize} from "@embrace-io/react-native";
import {EmbraceNativeTracerProvider} from "@embrace-io/react-native-tracer-provider";
import {createEmbraceMiddleware} from "@embrace-io/react-native-redux";

const setupStore = async () => {
  await initialize({sdkConfig: {ios: {appId: "abc123"}}});

  const tracerProvider = new EmbraceNativeTracerProvider();

  return configureStore({
    reducer: rootReducer,
    middleware: () => new Tuple(createEmbraceMiddleware(tracerProvider)),
  });
};
```

You will then see spans in the session timeline that represent the dispatch of actions through Redux.
