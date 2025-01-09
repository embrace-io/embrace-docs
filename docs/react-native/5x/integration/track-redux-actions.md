---
title: Track Redux's Actions
description: Add logging to your React Native application to track actions dispatched using the Embrace SDK
sidebar_position: 9
---

# Add React Actions tracker

## Adding Context to Sessions

Embrace can collect basic session data and crashes as you've already seen in the [Crash Reporting](/react-native/5x/integration/crash-reporting) and [Session Reporting](/react-native/5x/integration/session-reporting) sections.
Embrace can also collect the redux's actions that are being dispatched and include it as context within your sessions.
Here's how you add the action tracker to the session.

:::info
Currently we are only supporting the Redux SDK and others libraries that supports middleware as Saga, if you are using another library please contact us at [support@embrace.com](mailto:support@embrace.com) or on Slack if you would like to request support.
:::

## Adding the component

Embrace has a separate module for tracking Redux's Actions, to use it you will need to add the Action Tracker

### Install the component

```shell-session
yarn add @embrace-io/react-native-action-tracker
```

```shell-session
npm install @embrace-io/react-native-action-tracker
```

### Adding the component to your code

Add the Embrace's Middleware to your middleware's list

```javascript
import {applyMiddleware, compose, configureStore} from '@reduxjs/toolkit';
import {buildEmbraceMiddleware} from '@embrace-io/react-native-action-tracker';
import myReducer from './reducers/MyReducer';
import otherMiddleware from './middlewares/OtherMiddleware';

//Add the embrace middleware 'buildEmbraceMiddleware' an
const middlewareEnhancer = applyMiddleware(otherMiddleware(), buildEmbraceMiddleware());

const composedEnhancers = compose(middlewareEnhancer);

export default configureStore({
  reducer: {
    myReducer: myReducer,
  },
  enhancers: [composedEnhancers],
});
```
