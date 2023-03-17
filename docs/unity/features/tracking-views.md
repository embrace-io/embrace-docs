---
title: Tracking Views
description: Track custom views for your Unity application using the Embrace SDK
sidebar_position: 3
---

# Tracking Views

Instead of tracking screens, Embrace uses views. Use the Custom View API to start and end views manually. See the documentation [here]({{< api unity >}}).

```csharp
Embrace.Instance.StartView("MyView");
Embrace.Instance.EndView("MyView");
```
