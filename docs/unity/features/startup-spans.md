
## Overview

Tracking app starting times is important to measure the performance of your app and to see how long your users are waiting before being able to actually interact with the app.

## How it works

Start by going to Tools > Embrace > Settings
![[startup-spans-1.png]]

Under the Startup Tab enable:
**Enable Startup Spans**
**First Scene Loaded**
**Loading Time**

![[startup-spans-2.png]]

Then click 'Apply Settings'.
## Implementation

The startup spans are not fully automated. You will need to call `Embrace.Instance.EndAppStartup();` after all your plugins and everything have finished loading. It's also important that you call `Embrace.Instance.StartSDK();` beforehand as well.

## Viewing The Data

In your Embrace dashboard you can see the span details by going to your sessions and looking at the root span `AppStartup` ![[startup-spans-3.png]]

Click the 'See Details' to get more information and to view the child spans
![[startup-spans-4.png]]

Now you can view exactly how long it took your app to start up and then how long it took to load plugins and assets.

![[startup-spans-5.png]]

**FirstSceneLoaded**
This child span measures how long it took starting from the OS registering your app with the system until the first scene was loaded including all assets and MonoBehaviors running their `Awake` functions.

This is important because here you can see if you have some weighty scripts increasing your load time.

**LoadingComplete**
This child span measures the time it took starting after your first scene was loaded until you called `EndAppStartup` in your code.

This is important because you can see how long your plugins/addressables are taking to load and how long it takes for your user to actually interact with your app.