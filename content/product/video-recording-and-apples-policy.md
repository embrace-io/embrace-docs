---
title: Video Recording and Apple's Policy
weight: 3
---

# Video Recording and Apple's Policy

In February of 2019, Apple warned apps for tracking user sessions via video and potentially capturing personal information. [Techcrunch wrote about three SDKs](https://techcrunch.com/2019/02/07/apple-glassbox-apps/), Glassbox, UXCam and Appsee, which Apple specifically identified.

Many of you have reached out to us with questions and our take, so I would like to make this an open conversation and recommend a few precautionary steps.

## Explanation

The article talks about how Apple has asked apps to disclose their use of analytics code that records user interaction or be removed from the App Store.  None of our customers have been flagged by Apple or have been removed from the App Store.

Embrace uses the same methods as New Relic, Crashlytics, and other developer tools to paint the picture of what's happening.  We also take the same non-video approach used by BuddyBuild (acquired by Apple.)  These tools and the methods they use to capture data have been around for a long time, and Apple has never taken issue with developers that use them to build more robust apps.

For the article and Apple's warning, the main issue centers around screen recordings and how it violates a users privacy.  It is especially intrusive when the screen is able record such sensitive information as credit card numbers, addresses, or passport numbers.  Despite numerous product requests from customers, we've been firm about not recording screens because of 1) privacy issues and 2) the negative impact on app performance, (especially on devices with an existing propensity to OOM or ANR or with poor connectivity.)

Embrace has a no personally identifiable information (PII) policy.  We take precautions to make sure that we don't collect PII, but, if you have any questions, please respond here or reach out to me directly.

## Recommendations

Apple has cracked down on poor behaviors in the past.  For example, Tapjoy in 2011 for incentivized downloads and AppGratis in 2013 for manipulating store rankings. The crackdowns are rare but very firm and should not be taken casually.  If you are concerned, we recommend that you remove any video recording SDK before submitting to the Apple app store. (UX focused SDKs like these are great for limited testing, like beta groups.)  Although we do not believe screenshots create any risk since it is a very common practice, if you'd like to turn them off, please reach out to us and we will turn them off immediately.
