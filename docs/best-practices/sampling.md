---
title: To Sample Or Not To Sample
description: Recommendations and best practices around Sampling in the Embrace SDK
sidebar_position: 5
---

# To Sample Or Not To Sample

Developers familiar with observability might wish to sample their telemetry from the Embrace SDKs. As a practice, sampling makes sense in traditional monitoring:

* By grabbing a few elements from all available data, you can form conclusions about the whole set of data.
* Sampling is configurable from a central dashboard on-demand.
* It really keeps costs down!

Telemetry sampling is usually a sampling of key signals like logs and traces. Embrace usage is billed at the level of the Session, each of which can contain tens or even hundreds of those signals. Therefore, in the mobile context, "sampling" might mean throwing away entire user experiences.

Further, in mobile, sampling limits reproducibility of the user's experience. Mobile apps are not running in static environments with controlled technical factors like location, device capabilities, and internet access (and others). The ability to dive deep into the user data will allow you to know if any of these factors outside your app's code base affect the performance of your app.

The considerations are between cost and loss of data fidelity, and Embrace strongly prefers that you keep the entire picture of your app experience. We prefer it so much that we've built per-Session cost savings into our [pricing model](https://embrace.io/pricing/) if your app gets more usage. Why be penalized for success?

## How Does Sampling Work In Embrace?

If turned on, sampling is configured in the Embrace dashboard, not the individual SDKs. With thousands or even millions of app sessions running concurrently, the Embrace backend configures the active sessions of your app to stay as close as is reasonable to that sampling rate you've set.

From the SDK level, your app will receive this determination at startup and at an hourly interval. The result will be applied at the next app cold start. Since sampling is per-session, if the active user's session is set to be sampled, you will not receive any activity from their session in the Embrace dashboard.

You can set the sampling rate in the "Data Usage" section of your "Settings" page:

<img src={require('@site/static/images/settings-filtering.png').default} alt="Screenshot of Usage Filtering on Settings page" />
