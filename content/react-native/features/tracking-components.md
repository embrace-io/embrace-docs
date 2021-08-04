---
title: "Tracking Components"
description: Track the mounting and unmounting of React Components for your React Native application using the Embrace SDK
weight: 3
aliases:
  - /react-native/tracking-components/
---

# Tracking Components

By default, Embrace will track native views.
If you'd like to track when a React component is mounted and unmounted, you can do so with the `startView` and `endView` functions.

These methods are flexible, so it's up to you as a developer to define when a view "starts" and "ends".
Perhaps it's when a component is mounted and unmounted, or maybe it's when a style is applied that makes the component visible or not visible to the user.

```javascript
import {startView, endView} from 'react-native-embrace';

startView('MyView');

endView('MyView');
```

There's also a `logScreen` function available, which will log a breadcrumb with the name of the screen.
This could be helpful as a lightweight way to breadcrumb which screens were visible, but in most cases it's recommended to use `startView` and `endView`.

```javascript
import {logScreen} from 'react-native-embrace';

// This will add a breadcrumb to the session with the following format: "Opening screen [MyView]".
logScreen('MyView'); 
```
