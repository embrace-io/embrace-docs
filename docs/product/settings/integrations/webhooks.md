---
title: Webhooks
description: Webhook Integration
sidebar_position: 1
---

The Embrace Webhooks feature is an outgoing webhook sent by Embrace  when an alert condition is met. Here is a high-level flow diagram:

<img src={require('@site/static/images/webhooks/image1.png').default} />

## Generic Webhook

In order to see a sample of the payload sent by the Embrace dash, you can setup a test webhook with [webhook.site](https://webhook.site/):

First, within the Embrace dashboard, click on the gear icon to access the Settings page.

<img src={require('@site/static/images/webhooks/image2.png').default} />

Select the Notifications tab.

In the Webhook Integration area, there is a Nickname field and the Webhook URL field:

<img src={require('@site/static/images/webhooks/image3.png').default} />

When you navigate to the [webhook.site](https://webhook.site/) page, you will get a randomly webhook URL; paste that path in the Webhook URL field in the Embrace dashboard.

<img src={require('@site/static/images/webhooks/image4.png').default} />

In this example, the Nickname is “webhook.site” and the Webhook URL is the random path from the webhook.site page.

Click on TEST to see the webhook show up on webhook.site.

## Jira Integration

In your Project, click on Project settings

<img src={require('@site/static/images/webhooks/image5.png').default} />
<img src={require('@site/static/images/webhooks/image6.png').default} />

Then click on Create rule
Search for webhook, then click on Incoming webhook

<img src={require('@site/static/images/webhooks/image7.png').default} />

Choose “No issues from the webhook”

Click Save

Add a New action

Choose Create issue

<img src={require('@site/static/images/webhooks/image9.png').default} />

Complete the rest of the Jira automation per your organization’s needs.

## PagerDuty Integration

You will need to setup a Custom Event Transformer integration (CET).

Follow the instructions on the [PagerDuty documentation for CET](https://developer.pagerduty.com/docs/custom-event-transformer)

When you get to steps 5-7, modify the JavaScript and replace it with the following code (you can also customize it to fit your needs):

```javascript
var webhook = PD.inputRequest.body;
var event_type = PD.Trigger;
if(webhook.event.metric_props.new_state=="Normal") {event_type = PD.Resolve;}

var normalized_event = {
  event_type: event_type,
  incident_key: webhook.alert.id,
  description: webhook.alert.name,
  details: {
    description: webhook.event.metric_props,
    environment: webhook.app.environment,
    app_id: webhook.app.id,
    app: webhook.app.name,
    platform: webhook.app.platform
  },
  client: "Embrace Dashboard",
  client_url: webhook.links.dashboard_url
};

PD.emitGenericEvents([normalized_event]);
```

Finally, copy the Integration URL generated in the CET Integration Configuration step into the Embrace dash.

## Troubleshooting Webhooks

Your webhook will be disabled if the alerts fail to deliver 3 times in a row.

<img src={require('@site/static/images/webhooks/image10.png').default} />

To fix the disabled webhook, select the webhook to edit. Re-test the webhook to validate.

To examine the payload that is being sent, use the [webhook.site](https://webhook.site/) page mentioned above.

Invalid Webhooks will also trigger an email alert. For example, you will get an email alert similar to this:

<img src={require('@site/static/images/webhooks/image11.png').default} />
 
After 2 failed email notifications, you will get a final email alert:

<img src={require('@site/static/images/webhooks/image12.png').default} />
