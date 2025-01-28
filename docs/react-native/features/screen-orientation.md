---
title: Track Screen Orientation
sidebar_position: 6
---

# Track Screen Orientation

Embrace provides a hook that will automatically log breadcrumbs whenever your app changes its orientation. To set this
up simply invoke the hook at a point in your app after Embrace has been initialized:

```javascript
import { useOrientationListener } from "@embrace-io/react-native-orientation-change-tracker";

useOrientationListener()
```

You will then see breadcrumbs in the session timeline reporting on the initial orientation that the application began
in as well as any changes that occurred throughout the session.

:::warning
For Expo apps the hook will provide the initial orientation but not report on any future changes. To get orientation
changes reported in this case you will need to install [Expo's ScreenOrientation package](https://docs.expo.dev/versions/latest/sdk/screen-orientation/)
and then use our [Breadcrumb Logs](integration/breadcrumbs/) to log a breadcrumb yourself when you detect an orientation
change from their listener.
:::