---
title: Issue Monitoring and Workflow 
sidebar_position: 1
---

# Issue Monitoring and Workflow 

Our dashboard gives you a plethora of metrics to provide full visibility into the health and stability of your app. Rather than clicking through pages filled with metrics to get a basic understanding of key issues within your app, we've rolled-up relevant issues into our *Issues* page. Navigate to the page by selecting *Issues* in the left hand menu on the dashboard.

Prioritize issues by instance or unique user count, filtering by time, app version and issue state. Our workflow will allow you to control issues by **Resolving**, **Snoozing** and **Ignoring** current issues and **Reopening** old issues.

Snoozed or closed issues that reopen will generate a slack or email alert assuming you have alerts enabled.

This documentation will explain all the available features for particular issues.

*We plan to add support for additional insights around networking, logging and session events. We'll continue to update this doc as more and more features roll out.*

## Crashes

Our workflow feature set is diverse for crashes. Unlike other traditional crash reporters, we retroactively symbolicate crashes that we received before the dSYM was uploaded. That way you see a consistent crash grouping rather than two separate groupings for the same issue. We also allow you to filter between crash groupings that have been symbolicated and crash groupings that have not.

### **Resolve**
Resolve will close out the selected crash grouping(s). You can Resolve crash grouping(s) by selecting one of two options: 
- **Now** - Close until we receive another crash instance.
- **Next** - Close until we receive a crash instance from a later version.

### **Snooze**
Snooze will mute the selected crash grouping(s). You can set either a **Time** duration or an **Instance** threshold. The issue will not resurface until the duration or threshold is reached. If a crash returns after the **Time** or **Instance** thresholds have been reached, we will re-open the issue.

### **Ignore** 
Ignoring an issue will close it out until you re-open it.

### **Reopen** 
Reopens issue(s) that have been resolved, snoozed or ignored.

## Logs

Log messages are powerful tools when it comes to debugging issues. When we detect changes in new and existing logs, we will also surface them in the issues page for you to prioritize with our workflow. 

The log workflow is identical to that of crashes and will follow the same logic when **Resolving**, **Snoozing**, **Ignoring**, and **Reopening**. 

## Bad Endpoints

There are network endpoints that generally receive a certain level of errors (404’s when users miss-input  login credentials, constant 400s to dev endpoints). However, endpoints that have 100% error rates, with rare exceptions, serve no purpose and can create stability issues within the app. 

We surface endpoints in the Bad Endpoints tab when we detect one of two behaviors: 
1. A network endpoint generates 100% of 4xx or 5xx errors  
2. An endpoint has a 100% connection error rate (even if that request generates a 200)

Connection errors and status codes are not always mutually exclusive. It is possible to generate a 200 from the server while a device reports a NSURL issue. Thus when 100% of requests generate connection errors, even if they come with a 200 response, we will still surface the endpoint for your dev teams to look into.  

The network workflow is identical to that of crashes and will follow the same logic when **Resolving**, **Snoozing**, **Ignoring**, and **Reopening**. 

---

*We are continually iterating on this feature by adding more functionality in the coming weeks for different issue types (i.e. session events, rage taps). In the meantime, we'd love to know what you think! Your partnership got us this far so please don't hesitate to reach out via Slack or <support@embrace.io> for any questions or feedback.*
