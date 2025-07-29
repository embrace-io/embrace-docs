
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

In your Embrace dashboard you can see the span details by going to your sessions and looking at the root span `emb-app-startup`

Click the 'See Details' to get more information and to view the child spans
![[startup-spans2.png]]

Now you can view exactly how long it took your app to start up and then how long it took to load plugins and assets.

![[startup-spans-5 1.png]]
### Child Spans

Depending on the version of Android and other additional data your app provides, the following child spans may be recorded as part of the app startup trace, with the cold or warm root span as their parent.

#### emb-app-loaded

- The time it took starting from the OS registering your app with the system until the first scene was loaded including all assets and MonoBehaviors running their `Awake` functions.
- Only recorded for cold startups

#### emb-embrace-init

- The time it took for the Embrace SDK to initialize.
- Only recorded for cold startups

#### emb-app-init

- The time between when the first scene has loaded until `Embrace.Instance.EndAppStartup();` is called
- Only recorded for cold startups

### Sample Usage
```
private async void Start()
{
// Start the Embrace SDK
Embrace.Instance.StartSDK();

// Wait for any other plugins to initialize
await InitializePlugins();
  
// Now that the user is able to interact with the app, we can end the startup phase
Embrace.Instance.EndAppStartup();
}
```

