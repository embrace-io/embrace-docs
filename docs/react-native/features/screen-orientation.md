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
in as well as any changes that ocurred throughout the session.