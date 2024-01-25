---
title: SSO Configuration
sidebar_position: 2
---

# SSO Configuration

Embrace offers SSO support using SAML 2.0. This documentation goes over how to configure SSO for your organization using OneLogin as the SSO provider, however these steps would be very similar with other providers and Okta, PingIdentity and Google have been tested.

If you need assistance configuring SSO with other providers please [email us](mailto:support@embrace.io) or Slack us.

For IdP-initiated flow, your users will navigate to your organization's SSO portal and select our app from the portal. For SP-initiated login, users need to click "Continue with SSO" on the bottom of dash.embrace.io and enter their email and they will be redirected to your SSO provider for authentication.

## Configuring SSO for OneLogin

In order to properly configure SSO for OneLogin, we'll need two pieces of information which you will need to obtain from OneLogin's web portal:

1.  **Metadata URL**: This can be found in the OneLogin admin portal, referred to as the Issuer URL. Add the Embrace app connector from OneLogin's App Catalog and navigate to SSO in the side menu. The Issuer URL should be displayed there.

<img src={require('@site/static/images/onelogin-sso-issuer-url.png').default} />

2. **Domain**: In most cases, it will be the domain of your email (i.e. example.com if your email is bob.smith@example.com).

Once you have obtained those two pieces of information, navigate to [dash.embrace.io](https://dash.embrace.io) and select your app:
1. Navigate to the **Settings Page** (gear icon on the top right hand corner of the dashboard).
2. Select the **SSO Tab**.
*Note: SSO is an enterprise-level feature and you'll need to contact support@embrace.io if it has not yet been enabled for your organization.*
3. Once you're able to access the **SSO Tab**, input your **Metadata URL** and your **Domain**.
*Note: You must be an admin to make changes to the SSO configuration.*

<img src={require('@site/static/images/sso-configuration.png').default} />

4. Select if you wish to **Allow Login** or not. If you toggle **Allow Login**, you will allow your organization's users to bypass the SSO flow. If your organization adheres to strict SSO policies, this is highly **not recommended**.

5. Once the **Metadata URL** and **Login Domain** are input and saved, we will generate an **Org ID** for you towards the right of the config panel.

<img src={require('@site/static/images/sso-org-id.png').default} />

6. Once you've generated your **Org ID**, head back to your OneLogin portal and select the Embrace app.

7.  Back in OneLogin, navigate to Configuration in the side menu and input your **Org ID** that we've generated into the **Org ID** field.

<img src={require('@site/static/images/sso-onelogin-org-id.png').default} />

If you've followed all of these instructions, SSO should be configured for your organization.
We're planning on adding support for other SSO providers as well as SP-initiated login in the future.

Feel free to [email us](mailto:support@embrace.io) or Slack us if you have any questions or feedback!
