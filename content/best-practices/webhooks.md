---
title: "Webhooks"
description: Coming Soon
weight: 3
---
The Embrace Webhooks feature is an outgoing webhook sent by Embrace  when an alert condition is met. Here is a high-level flow diagram: 




![alt_text](/docs/images/webhooks/image1.png "webhook flow")


<h3>Generic Webhook</h3>


In order to see a sample of the payload sent by the Embrace dash, you can setup a test webhook with [webhook.site](https://webhook.site/):

First, within the Embrace dashboard, click on the gear icon to access the Settings page. 




![alt_text](/docs/images/webhooks/image2.png "dashboard settings")


Select the Notifications tab.  \
In the Webhook Integration area, there is a Nickname field and the Webhook URL field: 




![alt_text](/docs/images/webhooks/image3.png "webhook field")


When you navigate to the [webhook.site](https://webhook.site/) page, you will get a randomly generated path; paste that path in the Webhook URL field in the Embrace dash. 

For example:  https://webhook.site/b8a8c93a-0111-48d0-aedc-051092311a6a




![alt_text](/docs/images/webhooks/image4.png "webhook.site test")


In this example, the Nickname is “webhook.site” and the Webhook URL is the random path from the webhook.site page. 

Click on TEST to see the webhook show up on webhook.site. 

<h3>Jira integration</h3>


In your Project, click on Project settings 




![alt_text](/docs/images/webhooks/image5.png "Jira Project Settings")






![alt_text](/docs/images/webhooks/image6.png "Jira Automation")

Then click on Create rule 

Search for webhook, then click on Incoming webhook 




![alt_text](/docs/images/webhooks/image7.png "Webhook Trigger")


Copy the generated Webhook URL; in this example, the Webhook URL is 


```
https://automation.atlassian.com/pro/hooks/<random-40-character-string>
```




<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to /docs/images/webhooks/image8.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](/docs/images/webhooks/image8.png "Incoming webhook URL")


Choose “No issues from the webhook” 

Click Save 

Add a New action 

Choose Create issue




![alt_text](/docs/images/webhooks/image9.png "Create issue")


Complete the rest of the Jira automation per your organization’s needs. 

<h3>Microsoft Teams Integration </h3>


Follow the instructions on the [Microsoft Teams documentation for Incoming Webhooks](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook)

Copy the URL generated in step 5 and paste that into the Embrace dash. 

<h3>xMatters Integration</h3>


Follow the instructions on the [xMatters Workflow documentation for Webhooks](https://help.xmatters.com/integrations/other/webhooks.htm?cshid=Webhook)

Copy the URL generated in the Inbound Webhook Configuration step into the Embrace dash. 

<h3>Troubleshooting</h3>


Your webhook will be disabled if there is a problem during the validation step (i.e., the TEST button). 




![alt_text](/docs/images/webhooks/image10.png "Disabled webhook")


To fix the disabled webhook, select the webhook to edit. Re-test the webhook to validate. 

To examine the payload that is being sent, use the Webhook.site page mentioned above. 

Invalid Webhooks will also trigger an email alert. For example, you will get an email alert similar to this: 


![alt_text](/docs/images/webhooks/image11.png "Invalid webhook email warning")
 

After 2 failed email notifications, you will get a final email alert: 



![alt_text](/docs/images/webhooks/image12.png "Final webhook email warning")


Enjoy our new webhook feature!
