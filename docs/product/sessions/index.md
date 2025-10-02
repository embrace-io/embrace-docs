---
title: Sessions
sidebar_position: 1
---

# Get Total Insight into Activity with User Sessions

Embrace's User Sessions allow developers to recreate user activity with detailed data, helping identify and resolve issues efficiently.

User Sessions give you every technical detail for every session that users were in your app. User Sessions are crucial for modeling and debugging app behavior, as they capture everything a user does from app launch to termination, including user actions and technical events.  

## What is a User Session?

User Sessions are an encapsulation of all app activity a specific user had during one use of the app. The User Session creates a picture that includes all app lifecycle and user interface details, business logic and networking, and other technical details that occurred in your app while it was in the foreground or background. It also includes key metadata for the session including device info, user personas,  

The first User Session begin when a user launches the app to the foreground. That foreground session can end or terminate in a variety of states:

- when the app is sent to the background (for example, when switching to another application like email)
- when the app runs into an exception, crash, or ANR that terminates use of the app
- the developer decides to end the session in their code under certain conditions (for example, deciding they would like to end sessions when a user logs out)
<!-- TODO Add details of background sessions. -->

## Implementation details

Sessions are automatically collected by the Embrace SDKs, ingested by Embrace's backend, and displayed in the Embrace dashboard. Once Sessions have been collected, they can be used in the dashboard a variety of ways:

- [Stitched Sessions](/product/sessions/stitched-sessions.md) let you see user activity over time for all users or specific cohorts of users.
- [User Timelines](/product/sessions/user-timeline.md) let you dig into the experience for individual users.
- [Session Filters](/product/sessions//filter-sessions.md) let you filter users into groups by experiments, real-world conditions, and any other dimensions you attach to users.

## Learn more

This walkthrough video will show you how developers use User Sessions to make sense of app activity:

<div>
    <iframe width="660" height="415" src="https://www.youtube.com/embed/uoiWh7ZEOtA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Additionally, you can learn about [Use Cases](/product/sessions/use-cases.md) to learn more about how developers use Sessions to dig into user experiences.

Finally, read about these User Session topics:

- [Track complete user sessions to deliver optimal user experiences](https://embrace.io/blog/track-complete-user-sessions-to-deliver-optimal-mobile-experiences/)
