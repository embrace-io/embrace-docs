---
title: What's changing with sessions
description: Redefining sessions in Embrace will make your data better, and we want to tell you about it early
sidebar_position: 2
---

## Some Background

If you have ever described a user's experience in your app as a "session," you probably pictured the full arc of that visit: The moment they opened the app to the moment they stop engaging. That is how most mobile teams think about it, and the analogous experience is the standard for web teams. This is represented by the black box in the visualization below. 

Historically, Embrace has been a bit of an outlier in our terminology and definitions. What most people think of as a user session, we’ve always called a “stitched session” and we’ve instead referred to the smaller component pieces representing individual user interactions as “sessions” (gray boxes in the diagram). Confused yet? Not to worry. Moving forward, we’re updating the definitions in Embrace so they align to existing conventions and are consistent across mobile and web. 

<img src={require('@site/static/images/user-session.png').default} />

Very soon, in the Embrace SDK and platform, we will sunset the use of “stitched session” language and will call the period of time when users are experiencing your app a “session”. The individual user interactions will be called “session parts”. For the rest of this document, when a session is mentioned that will refer to the new definition unless noted otherwise. 

## What this work will entail
We’ll be rolling this change out in two phases. The first phase comes with the upcoming version of our SDKs. The second phase will reflect the terminology changes in the platform UI. 

### Phase 1 - June - Embrace Mobile SDK
You don't have to do anything, and nothing breaks. After the change:

* **Your existing data and metrics keep working.** The session metrics you rely on today will still be available in widgets and custom metrics.
* **New SDK capabilities.** You can now define sessions more precisely — including ending a session yourself — and set properties at the new session scope. For more information about these changes, check out the change logs for each platform SDK you’ve instrumented. 

:::note A reminder on terminology: If you're working with our SDKs or data, you'll see two terms that disambiguate the old and new definitions:

* **`user_session`** is the new session — the stitched session timeline, representing a user's meaningful experience in your app. This is the concept to build on going forward.
* **`session_part`** is what we used to call a session: a single foreground or background period of the app. Parts now map to the building blocks of a `user_session.`

### Phase 2 - July - Embrace Platform UI Updates

During the second phase, the labeling of sessions will be updated in the platform UI and dashboards. There will be additional communication and documentation to detail these changes closer to the date that they’ll roll out.   

## What you need to know
These are non-breaking changes and require no action on your part for everything to keep working the way you expect. In the coming weeks we will publish more details about the changes in dashboards. In the meantime, if you have any questions about these changes please reach out to us on the [community Slack](https://community.embrace.io) or email us at [support@embrace.io](mailto:support@embrace.io). 

