---
title: User Terminations
sidebar_position: 5
---

# User Terminations

In the Embrace dashboard, User terminations represent sessions where the app was explicitly closed by the user, rather than by a crash, issue, or system event.

User terminations are detected by the Embrace SDK when it receives a signal that the user has intentionally closed the app. For example, in iOS, this occurs when the app transitions to the background and is then killed by the user (e.g., swiping up in the app switcher), and the SDK can confirm the termination was not due to a crash or OOM.

## Why are User Terminations helpful?

What developers can learn from User Terminations page:
- **User behavior:** High rates of user terminations may indicate user frustration, confusion, or dissatisfaction with the app experience (e.g., force-quitting due to freezes, slow performance, or unwanted background activity).
- **Session health:** Tracking user terminations helps distinguish between organic exits and problematic ones (crashes, OOMs), providing a more accurate picture of app stability.
- **Feature impact:** Spikes in user terminations after new releases or feature rollouts can highlight UX issues or regressions.