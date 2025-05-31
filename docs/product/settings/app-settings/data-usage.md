---
title: Data Usage
description: Recommendations and best practices around Sampling in the Embrace SDK
sidebar_position: 2
---

## Limiting Traffic in Embrace

Developers familiar with observability may wish to sample their telemetry from the Embrace SDKs. As a practice, sampling makes sense in traditional monitoring:

* By grabbing a few elements from all available data, you can form conclusions about the whole set of data.
* Sampling is configurable from a central dashboard on-demand.
* It really keeps costs down!

Application sampling is usually a sampling of key signals like logs and traces. Embrace usage is billed at the level of the Session, each of which can contain tens or even hundreds of those signals. Therefore, in the mobile context, "sampling" might mean throwing away entire user experiences.

Further, in mobile, sampling limits reproducibility of the user's experience. Mobile apps are not running in static environments with controlled technical factors like location, device capabilities, and internet access (and others). The ability to dive deep into the app data will allow you to know what factors in your app's codebase, or outside it, affect the performance of your app. And the larger the dataset, the more clarity you'll have into exactly what affects the user experience.

The considerations are between cost and loss of data fidelity, and Embrace strongly prefers that you keep the entire picture of your app experience. We prefer it so much that we've built per-Session cost savings into our [pricing model](https://embrace.io/pricing/) as your app gets more usage and volume. Why be penalized for success?

## How Is Traffic Configured In Embrace?

If turned on, "sampling" is configured in the Embrace dashboard, not the individual SDKs. With thousands or even millions of app sessions running concurrently, the Embrace backend configures the active sessions of your app to stay as close as is reasonable to that sampling rate you've set. This is not head-sampling or tail-sampling, and is basically deterministic rather than random.

From the SDK level, your app will receive this determination at startup and at an hourly interval. The result will be applied at the next app cold start. Since sampling is per-device, if the active user's session is set to be sampled, you will not receive any activity from their session in the Embrace dashboard.

You can set the sampling rate in the "Data Usage" section of your "Settings" page:

<img src={require('@site/static/images/settings-filtering.png').default} alt="Screenshot of Usage Filtering on Settings page" />

It is important to note that, since billing occurs per-session, setting traffic to 0% will stop billing after any active Embrace sessions are reconfigured by the backend. If you have any questions, please [contact us](mailto:support@embrace.io)
