---
title: "Webhooks"
description: Webhook Integration instructions
weight: 3
---
The Embrace Webhooks feature is an outgoing webhook sent by Embrace  when an alert condition is met. Here is a high-level flow diagram: 




{{<image src="/docs/images/webhooks/image1.png" caption="Webhook flow" width="624" height="212">}}


<h3>Generic Webhook</h3>


In order to see a sample of the payload sent by the Embrace dash, you can setup a test webhook with [webhook.site](https://webhook.site/):

First, within the Embrace dashboard, click on the gear icon to access the Settings page. 




{{<image src="/docs/images/webhooks/image2.png" caption="dashboard settings" width="291" height="132">}}


Select the Notifications tab.  \
In the Webhook Integration area, there is a Nickname field and the Webhook URL field: 




{{<image src="/docs/images/webhooks/image3.png" caption="webhook field" width="332" height="112">}}


When you navigate to the [webhook.site](https://webhook.site/) page, you will get a randomly generated path; paste that path in the Webhook URL field in the Embrace dash. 

For example:  https://webhook.site/b8a8c93a-0111-48d0-aedc-051092311a6a




{{<image src="/docs/images/webhooks/image4.png"  caption="webhook.site test" width="324" height="129">}}


In this example, the Nickname is “webhook.site” and the Webhook URL is the random path from the webhook.site page. 

Click on TEST to see the webhook show up on webhook.site. 

<h3>Jira integration</h3>


In your Project, click on Project settings 




{{<image src="/docs/images/webhooks/image5.png" caption="Jira Project Settings" width="624" height="463">}}






{{<image src="/docs/images/webhooks/image6.png" caption="Jira Automation" width="624" height="193">}}

Then click on Create rule 

Search for webhook, then click on Incoming webhook 




{{<image src="/docs/images/webhooks/image7.png" caption="Webhook Trigger" width="624" height="162">}}


Copy the generated Webhook URL; in this example, the Webhook URL is 


```
https://automation.atlassian.com/pro/hooks/<random-40-character-string>
```






{{<image src="/docs/images/webhooks/image8.png" caption="Incoming webhook URL" width="624" height="252">}}


Choose “No issues from the webhook” 

Click Save 

Add a New action 

Choose Create issue




{{<image src="/docs/images/webhooks/image9.png"  caption="Create issue" width="624" height="241">}}


Complete the rest of the Jira automation per your organization’s needs. 

<h3>Microsoft Teams Integration </h3>


Follow the instructions on the [Microsoft Teams documentation for Incoming Webhooks](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)

Copy the URL generated in step 5 and paste that into the Embrace dash. 

<h3>xMatters Integration</h3>


Follow the instructions on the [xMatters Workflow documentation for Webhooks](https://help.xmatters.com/integrations/other/webhooks.htm?cshid=Webhook)

Copy the URL generated in the Inbound Webhook Configuration step into the Embrace dash. 

<h3>Troubleshooting</h3>


Your webhook will be disabled if there is a problem during the validation step (i.e., the TEST button). 




{{<image src="/docs/images/webhooks/image10.png" caption="Disabled webhook" width="624" height="116">}}


To fix the disabled webhook, select the webhook to edit. Re-test the webhook to validate. 

To examine the payload that is being sent, use the Webhook.site page mentioned above. 

Invalid Webhooks will also trigger an email alert. For example, you will get an email alert similar to this: 


{{<image src="/docs/images/webhooks/image11.png" caption="Invalid webhook email warning" width="624" height="604">}}
 

After 2 failed email notifications, you will get a final email alert: 



{{<image src="/docs/images/webhooks/image12.png" caption="Final webhook email warning" width="624" height="666">}}


Enjoy our new webhook feature!
