---
title: Session Reporting
description: Upload sessions from your mobile application using the Embrace SDK
sidebar_position: 2
---

# Session Reporting

## Create your first session

Once Embrace is configured and started in your app, it automatically starts capturing user sessions. 

A session is any length of user experience that occurs while the app is in the foreground or background. Note that foreground sessions and background sessions behave differently, and so are recorded separately. This means that, for example, opening a push notification from your app will end a foreground session and start a background session. 

Sessions are recorded as OTel spans with Attributes and SpanEvents for various app lifecycle, user experience, and device information. Embrace always uploads sessions on subsequent launches or foregrounding/backgroundings of the app.

You can learn more about moments and measuring performance yourself in the
[Moments](/ios/5x/features/moments) section.

## Trigger a session upload to the dashboard

To trigger a session upload, simply send the application to the background by pressing the simulators 'home' button or swipe up, depending on the simulator you're running, or press `Cmd+Shift+H` on your keyboard. 
Typically the SDK will be given sufficient time to upload the session, but sometimes the app is not able to complete the upload in the background. To ensure the session was uploaded, launch the application again. Refresh the dashboard in your browser and you should now see that you've moved on to the next step.
