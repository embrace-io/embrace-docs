---
title: Data Marshaling and Transmission
sidebar_position: 11
description: How Embrace sends data off device
---

# Overview

---

Embrace is designed to be a “good citizen” within your mobile application. We’re aware that many of our customers have critical user journeys (such as completing a transaction) that cannot be interrupted or slowed by non-essential network activity. To address these concerns:

- **Data is batched and sent on a low-priority basis.**
- **We avoid sending if we detect there is no network** and use an exponential backoff when connectivity is poor.
- **We never send more than one request at a time**, minimizing the chance of saturating the network.
- **We do not share any domain or session resources** with your primary application requests, so there is no direct contention with your core APIs.

These design principles ensure that user-facing requests (such as booking flows, checkouts, or other high-priority transactions) always receive the highest priority on the device and network.

# FAQ’s

---

## **Will Embrace SDK’s network requests block or slow down my main APIs?**

No. We send data in small, batched increments and only one batch at a time. On Android, this is a single network call at a time. On iOS, we use a separate URLSession with lower priority. This ensures Embrace’s requests do not interfere with higher-priority user or application traffic.

## **What happens if the user is on a weak connection?**

We employ exponential backoff for retries when a connection fails and do not attempt to send if the device is offline. This prevents us from continuously saturating a weak or nonexistent network.

## **Can we configure the SDK to only send data when on Wi-Fi or in the background?**

Currently, no. We prioritize quick, low-frequency uploads to avoid large backlogs and ensure timely observability. Restricting uploads to Wi-Fi or background-only would risk missing critical data if the app is not backgrounded for a long enough period or closed altogether.

## **Is it possible to disable data sending entirely during critical user flows?**

We do not offer an official toggle for this. However, if needed, please reach out to discuss advanced use cases. Be aware that disabling data transmission for extended periods can create gaps in observability.
