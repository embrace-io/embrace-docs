---
title: iOS Privacy Disclosure
description: Privacy disclosure information
sidebar_position: 6
---

# iOS Privacy Disclosure

## What is this and who's impacted?

As Apple explains in [this WWDC 23 video](https://developer.apple.com/videos/play/wwdc2023/10060), starting in Spring 2024 all submissions to the AppStore are required to disclose what type of data they collect and why, including any data collected by 3rd party SDKs.  

Starting on version 5.23.0 Embrace provides the required xcprivacy file detailing the type of information collected by default and the reasons why. Please note that depending on your particular case you might need to tweak this information.  

Please take a few minutes to read through this section and determine if you need to do so.  

If you have any questions or would like more clarification please reach out to us on Slack
or email us at [support@embrace.com](mailto:support@embrace.com).

## What do we collect and why?

### **Data collected by default and disclosed on our "PrivacyInfo.xcprivacy" Privacy file**

#### **Identifiers:**
- Device ID

#### **Usage Data:**
- Product Interaction

#### **Diagnostics:**
- Crash Data
- Performance Data
- Other Diagnostic Data
  - Such as, but not limited to, Device type, battery level and charging state, OS version.  

#### **Location:**
- Coarse Location  
  - While we DO NOT use location services, we do temporarily record, and then discard, a partial IP address that we use to determine the user's coarse location. For more information, refer to the [Additional Guidance](https://developer.apple.com/app-store/app-privacy-details/#additional-guidance) section on Apple's Privacy Details documentation.

### **Reasons for collecting this data**

The main intention behind collecting this information is aiding you in your quest to provide users with the best experience possible.  

Solving crashes, tracking bugs down and understanding how your users interact with your app so that you can understand how to improve the experience is the sole reason we collect this information.

While the default intention behind this data collection is not to link to a user or track them between different applications, it is important to understand you might want to use this information for such purposes. If this is the case then you might need to tweak your privacy disclosure file.  

## Is there anything I should do on my end?

As presiously mentioned, we do not use this data to link to a user or track them across different apps so we're disclosing it with "NO" on both options as default.  

If you plan to use the data differently, you should update the privacy file to make it clear you will be either linking to users, tracking them or both.

### What about usernames or emails?

While we have the ability to collect usernames, emails and any other sensitive information, we do not collect it by default. You need to provide it to us.

As such, if you're planing on collecting any other type of information including, but not limited to, usernames or emails, you should disclose it on your Privacy Disclosure file.

You can find more information on [Apple's Documentation](https://developer.apple.com/app-store/app-privacy-details/#data-collection).

## Where to find more information

You can learn more about privacy disclosure on Apple's website. Here's some Apple links that might come in handy:

[Privacy Details](https://developer.apple.com/app-store/app-privacy-details/)

[Privacy Nutrition Labels](https://developer.apple.com/videos/play/wwdc2022/10167)

[App Tracking Transparency](https://developer.apple.com/videos/play/wwdc2022/10166)
