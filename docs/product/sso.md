---
title: SSO Configuration
sidebar_position: 2
---

# SSO Configuration

Embrace offers SSO support using standard SAML 2.0. Providers such as Okta, OneLogin, Google and Microsoft have been tested.

If you need assistance configuring SSO with other providers please [email us](mailto:support@embrace.io) or Slack us.

For [IdP](https://www.cloudflare.com/learning/access-management/what-is-an-identity-provider/)-initiated flow, users should navigate to your organization's SSO portal and select our app from the portal. 

For [SP](https://auth0.com/docs/authenticate/single-sign-on/inbound-single-sign-on)-initiated login, users should click "Continue with SSO" on the bottom of the Embrace dashboard's ([dash.embrace.io](https://dash.embrace.io)) home page. Tey can then enter their email, and they will be redirected to your SSO provider for authentication.

## Configuring SSO

In order to properly configure SAML SSO we'll need two pieces of information which you will need to obtain from SSO provider's portal:

1.  **Metadata URL or XML File**: Some SSO providers referred to the Metadata URL as an "Issuer URL." Other providers might not use a URl and will only allow you to download an XML file.
2. **Domain**: In most cases, it will be the domain of your company's email (i.e. example.com if your email is bob.smith@example.com).

Once you have obtained those two pieces of information, any user with Embrace "admin" privileges can navigate to [dash.embrace.io](https://dash.embrace.io) SSO settings:

1. Click **Settings Page** (gear icon on the top right hand corner of the dashboard).
2. Select the **SSO** on the left.
*Note: SSO is an enterprise-level feature and you'll need to contact support@embrace.io if it has not yet been enabled for your organization.*
3. On the **SSO Configuration**, choose `URL` and enter your **Metadata URL**, or choose `File` and upload your **Metadata XML File**.
4. Enter your company's **Domain**.
5. Select whether you wish to **Make SSO Optional** or not. You should keep this option turned `on` until you have fully verified that your SSO flow is working for all of your users. Afterwards, you can toggle this option to `off` to require SSO and disable email + password login process for all users.
5. Click **Save Changes**.

## Okta

1. Use **Browse App Catalog** to locate Embrace's application.
2. Copy the SAML **Metadata URL** URL.
3. Navigate to to [dash.embrace.io](https://dash.embrace.io) SSO settings using any user wih Embrace "admin" privileges:
   - Click **Settings Page** (gear icon on the top right hand corner of the dashboard).
   - Select the **SSO** on the left.
   - On the **SSO Configuration**, choose `URL` and enter your **Metadata URL**.
   - Click **Save Changes**.
   - Navigate to **Provider Information** tab and copy your **Org ID**.
4. On Okta's app configuration's General Settings, provide the **Org ID** obtained above; click Save.

## OneLogin

Similar to Okta documentation above, you can find [Embrace connector](https://www.onelogin.com/connector/embrace_saml) in OneLogin's application catalog. You will need to provide your **Org ID** that is found on the **Provider Information** tab.

Feel free to [email us](mailto:support@embrace.io) or [Slack us](http://community.embrace.io/) if you have any questions.
