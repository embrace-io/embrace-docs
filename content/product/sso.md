---
title: SSO Configuration
weight: 2
---

# SSO Configuration

We offer SSO support for teams currently using SAML 2.0.
This documentation will go over how to configure SSO for your organization. 

Embrace officially supports OneLogin as an SSO provider and will plan on adding support for additional SSO providers in the future.
However, as long as you're using SAML 2.0, we can also work on configuring SSO providers other than OneLogin. Please email us at <support@embrace.io> or [Slack](https://embraceio-community.slack.com/join/shared_invite/enQtNDUxNTcxOTk3NTI0LWU2YmEyMzk4OGFjMDVkYzFhMThhY2E3ZDMwNmIxMGIxYzUzNTM4M2EzMmMyOTljZjU0ZDZiYzg4M2JhZjAwZGY#/) us if you're interested in support for other providers. 

We currently support IdP-initiated login. This means that if you're using SSO for your organization, you should navigate to your organization's SSO portal and select our app from the portal. That will bring you directly to the Embrace dashboard. You will not be able to access the dashboard via SSO if you do not go through your organization's SSO portal. If you prefer to use SP-initiated login, [please let us know](mailto: support@embrace.io) and we'll work with your provider to enable it. 

## Configuring SSO for OneLogin

In order to properly configure SSO for OneLogin, we'll need two pieces of information which you will need to obtain from OneLogin's web portal:

1.  **Metadata URL**: This can be found in the OneLogin admin portal, referred to as the Issuer URL. Add the Embrace app connector from OneLogin's App Catalog and navigate to SSO in the side menu. The Issuer URL should be displayed there.

{{< image src="/docs/images/onelogin-sso-issuer-url.png" width="610" height="350" alt="OneLogin admin portal" title="OneLogin Admin Portal" caption="Note the Issuer URL in the OneLogin Admin Portal" >}}

2. **Domain**: In most cases, it will be the domain of your email (i.e. apple.com if your email is bob.smith@apple.com).

Once you have obtained those two pieces of information, navigate to [dash.embrace.io](dash.embrace.io) and select your app: 
1. Navigate to the **Settings Page** (gear icon on the top right hand corner of the dashboard).
2. Select the **SSO Tab**.
*Note: SSO is an enterprise-level feature and you'll need to contact support@embrace.io if it has not yet been enabled for your organization.*
3. Once you're able to access the **SSO Tab**, input your **Metadata URL** and your **Domain**. 
*Note: You must be an admin to make changes to the SSO configuration.*

{{< image src="/docs/images/sso-configuration.png" width="610" height="630" alt="SSO Configuration Fields" title="SSO Configuration Fields" caption="You'll need to fill these values in the Dashboard" >}}

4. Select if you wish to **Allow Login** or not. If you toggle **Allow Login**, you will allow your organization's users to bypass the SSO flow. If your organization adheres to strict SSO policies, this is highly **not recommended**.

5. Once the **Metadata URL** and **Login Domain** are input and saved, we will generate an **Org ID** for you towards the right of the config panel.   

{{< image src="/docs/images/sso-org-id.png" width="488" height="249" alt="Generated SSO Org ID" title="Generated SSO Org ID" caption="You'll need this Org ID to finish your SSO configuration with OneLogin" >}}

6. Once you've generated your **Org ID**, head back to your OneLogin portal and select the Embrace app. 

7.  Back in OneLogin, navigate to Configuration in the side menu and input your **Org ID** that we've generated into the **Org ID** field.

{{< image src="/docs/images/sso-onelogin-org-id.png" width="610" height="215" alt="Enter the Org ID in the OneLogin admin portal" title="OneLogin Admin Portal: Org ID" caption="Finish configuring SSO in OneLogin using the generated Org ID" >}}

If you've followed all of these instructions, SSO should be configured for your organization.
We're planning on adding support for other SSO providers as well as SP-initiated login in the future. 

Feel free to email us at <support@embrace.io> or [Slack](https://embraceio-community.slack.com/join/shared_invite/enQtNDUxNTcxOTk3NTI0LWU2YmEyMzk4OGFjMDVkYzFhMThhY2E3ZDMwNmIxMGIxYzUzNTM4M2EzMmMyOTljZjU0ZDZiYzg4M2JhZjAwZGY#/) us if you have any questions or feedback!
