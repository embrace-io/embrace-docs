---
title: "Tracking Components"
weight: 11
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

---

Congratulations! By this point, you should have a solid integration. Continue to the [Next Steps]({{< relref "/react-native/next-steps" >}}) page to wrap up your integration.

{{< button relref="/react-native/next-steps" >}}Next Steps{{< /button >}}
