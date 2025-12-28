---
title: Track Components
description: Track the mounting and unmounting of React Components for your React Native application using the Embrace SDK
sidebar_position: 4
---

# Track Components

By default, Embrace will track native views.
If you'd like to track when a React component is mounted and unmounted, you can do so with the `startView` helper
available from the `@embrace-io/react-native-tracer-provider` package.

The `startView` helper simply provides a Span, so it's up to you as a developer to define when a view "starts" and "ends".
Perhaps it's when a component is mounted and unmounted, or maybe it's when a style is applied that makes the component
visible or not visible to the user.

First get a `tracer` following the instructions from the [Traces guide](/react-native/features/traces/#integration-steps).
The method can then be used as follows:

```javascript
import {startView} from '@embrace-io/react-native-tracer-provider';

const viewSpan = startView(tracer, 'MyView');

// ...at some later point...
viewSpan.end();
```  

## Breadcrumbs as a lighter weight option

Logging a breadcrumb with the name of the component could be helpful as a lightweight option to record when components
become visible if you don't care about the duration:

```javascript

import {addBreadcrumb} from '@embrace-io/react-native';

addBreadcrumb(`Rendered [${myComponent}]`);
```
