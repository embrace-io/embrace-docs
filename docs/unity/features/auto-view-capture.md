---
title: Auto View Capture
description: Auto View Capture component for the Embrace Unity SDK
sidebar_position: 17
---
## Overview

The AutoViewCapture component will automatically track views that get disabled/enabled and report them to the Embrace dashboard.

## Setup

On the component you want to track (typically a base UI component) attach the `AutoViewCapture` component and ensure it's enabled.

Next up fill in the View Name with the name of the view you are capture. If left blank it will use the GameObject's name.

## Extending

The AutoViewCapture component has 2 virtual functions you can extend into your own classes if you'd like:

```
public virtual void HideView()
public virtual void ShowView()
```

In your extended class call `base.HideView` or `base.ShowView` to capture the view. This is provided in case you have a UI component that is not shown/hidden in a traditional matter like turning on or off the GameObject. For example you may have a view that slides off the screen so it's technically hidden, but not disabled.
