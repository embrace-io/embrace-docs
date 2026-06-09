---
title: What's changing with sessions
description: We're aligning sessions across mobile and web in the timeline and all SDKs
sidebar_position: 2
---

We're making sessions better, and we want to tell you about it early.

### The short version

Today, a "session" on mobile means a single foreground period of your app, ending whenever the app leaves the foreground. That definition has served us well for years, but as we expand into web, it created a mismatch: web has a long-established, well-understood idea of a session that refers to an extended period of user activity, often spanning hours. 

The good news is that we already have the concept that bridges the two: the **stitched session timeline**. It captures what people actually care about — a user's meaningful experience in your app over time, not just one foreground period in isolation.
So we're aligning everything around it. Going forward, a session means the same thing on mobile and web: the user's experience within your app. It's a more intuitive, more useful definition, and it's one most people already think in terms of.

### What this means for you

You don't have to do anything, and nothing breaks. After the change:

- **Your existing data and metrics keep working.** The session metrics you rely on today will still be available in widgets and custom metrics. 
- **SDKs get capabilities first.** You can now define sessions more precisely — including ending a session yourself — and set properties at the new session scope. 
- **The dashboard will catch up soon.** In an upcoming refresh, what we call "stitched sessions" today will simply be called **sessions**, and you'll see true session metrics built on this definition.

### Why we're telling you now

We're rolling this out in the SDKs first so you can start using the new functionality right away, ahead of the product changes. 

If you want a refresher on the concept this is all built around, take a look at [Stitched Sessions](/product/sessions/stitched-sessions.md).

:::note A note on terminology
If you're working with our SDKs or data, you'll see two terms that disambiguate the old and new definitions:

- **`user_session`** is the new session — the stitched session timeline, representing a user's meaningful experience in your app. This is the concept to build on going forward.
- **`session_part`** is what we used to call a session: a single foreground or background period of the app. Parts now map to the building blocks of a `user_session`.

We're intentionally de-emphasizing `session_part`. Treat it as an implementation detail, and reach for `user_session` whenever you're reasoning about sessions.
:::

