---
title: Single Sign On (SSO)
sidebar_position: 5
---

# Single Sign On (SSO)

Embrace offers SSO support using standard SAML 2.0. Providers such as Okta, OneLogin, Google and Microsoft have been tested.

If you need assistance configuring SSO with other providers please [email us](mailto:support@embrace.io) or [Slack us](https://community.embrace.io/).

## Supported Features

- **IdP-initiated flow** - users navigate to your organization's SSO portal and select Embrace app.
- **SP-initiated login** - users enter their username on Embrace's dashboard and are redirected to your SSO portal for authorization.
- **JIT provisioning** (optional).

### IdP-initiated SSO

Users login into your Identity Provider's SSO page and then click the Embrace icon to automatically login to Embrace's dashboard.

### SP-initiated SSO

Users can start from Embrace's [dashboard](https://dash.embrace.io) by providing just their username (email) and completing authorization process via your Identity Provider.

- Click **Continue with SSO** on the bottom of the Embrace dashboard's ([dash.embrace.io](https://dash.embrace.io)) home page.
- Enter your email address.
- Optionally, check **Remember my email** box.
- Click **Log in using SSO** to be redirected to your SSO provider to complete authentication and be redirected back to Embrace.

## Configuring SAML 2.0 SSO

### Requirements

- Enterprise-level Embrace account with SSO feature enabled.
- Username and password for Embrace user with administrator access.

### Generic Configuration

In order to properly configure SAML SSO we'll need two pieces of information which you will need to obtain from SSO provider's portal:

- **Metadata URL or XML File**: Some SSO providers referred to the Metadata URL as an "Issuer URL." Other providers might not use a URL and will only allow you to download an XML file.
- **Domain**: In most cases, it will be the domain of your company's email (i.e. example.com if your email is bob.smith@example.com).

Once you have obtained those two pieces of information, any user with Embrace "admin" privileges can navigate to [dash.embrace.io](https://dash.embrace.io) SSO settings:

1. Click **Settings Page** (gear icon on the top right hand corner of the dashboard).
2. Select the **SSO** on the left.
3. On the **SSO Configuration**, choose `URL` and enter your **Metadata URL**, or choose `File` and upload your **Metadata XML File**.
4. Enter your company's **Domain**.
5. Select whether you wish to **Make SSO Optional** or not. You should keep this option turned `on` until you have fully verified that your SSO flow is working for all of your users. Afterwards, you can toggle this option to `off` to require SSO and disable email + password login process for all users.
6. Click **Save Changes**.

   If necessary, the Embrace logo icon can be downloaded in [svg](https://embrace.io/embrace.svg), [png](https://embrace.io/wp-content/themes/embraceio/library/images/favicon/android-icon-192x192.png) or [ico](https://embrace.io/wp-content/themes/embraceio/library/images/favicon/favicon.ico) format.

### Okta {#okta}

Embrace application is published in Okta's Integration Network, which simplifies the configuration. Instead of using SAML steps above you can do the following:

### Prerequisites

- Enterprise-level Embrace account with SSO feature enabled.
- Username and password for Embrace user with administrator access.

### Configuration Steps

1. Use **Browse App Catalog** to locate Embrace's application.
2. Select the **Sign On** tab, go to **Sign on methods > SAML 2.0 > Metadata details**, and copy the SAML **Metadata URL** URL.
3. Navigate to [dash.embrace.io](https://dash.embrace.io) SSO settings screen using any user with Embrace "admin" privileges:
   - Click **Settings Page** (gear icon on the top right hand corner of the dashboard).
   - Select the **SSO** on the left.
   - On the **SSO Configuration**, choose `URL` and enter your **Metadata URL**.
   - Click **Save Changes**.
   - Navigate to **Provider Information** tab and copy your **Org ID**.
4. Within Okta's app configuration's **General Settings**, provide the **Org ID** obtained above; click Save.

### SP-initiated Configuration

- Navigate to Embrace dashboard home page at [https://dash.embrace.io](https://dash.embrace.io)
- Click **Continue with SSO**
- Enter your email address, and optionally, check **Remember my email** box.
- Click **Log in using SSO** to be redirected to Okta to complete authentication and be redirected back to Embrace.

### Attributes

The following SAML attributes are supported:

| Name | Value |
|--------|--------|
| FirstName | user.firstName |
| LastName | user.lastName |
| Email | user.email |

### Optional Attributes

Role- and project-based provisioning can be enabled by the Embrace team at the organization level. Please reach out to [support@embrace.io](mailto:support@embrace.io) to turn on this feature and receive guidance on configuring your IdP.

Once support has enabled the feature for your org, you may add the following attributes to your SAML assertion:

| Attribute | Description |
|-----------|-------------|
| `Role` | Maps IdP group values to Embrace roles. Values containing `admin` resolve to Admin; values containing `member`/`user` resolve to Member. |
| `Projects` | Scopes Member access to specific projects. Each value should be `<project_external_id>[:grant]` where grant is `manage`, `edit`, or `view` (default `manage`). |

Project external IDs are the short hashes shown in the dashboard URL and the project settings page.

#### Example Payloads Attributes

**Admin**

```xml
<saml:AttributeStatement>
  <saml:Attribute Name="Email">
    <saml:AttributeValue>jane.doe@example.com</saml:AttributeValue>
  </saml:Attribute>
  <saml:Attribute Name="FirstName">
    <saml:AttributeValue>Jane</saml:AttributeValue>
  </saml:Attribute>
  <saml:Attribute Name="LastName">
    <saml:AttributeValue>Doe</saml:AttributeValue>
  </saml:Attribute>
  <saml:Attribute Name="Role">
    <saml:AttributeValue>example-admins</saml:AttributeValue>
  </saml:Attribute>
</saml:AttributeStatement>
```

Admins inherit manage access to every project, so the `Projects` attribute is unnecessary.

**Member with scoped project access**

```xml
<saml:AttributeStatement>
  <saml:Attribute Name="Email">
    <saml:AttributeValue>jane.member@example.com</saml:AttributeValue>
  </saml:Attribute>
  <saml:Attribute Name="FirstName">
    <saml:AttributeValue>Jane</saml:AttributeValue>
  </saml:Attribute>
  <saml:Attribute Name="LastName">
    <saml:AttributeValue>Member</saml:AttributeValue>
  </saml:Attribute>
  <saml:Attribute Name="Role">
    <saml:AttributeValue>example-members</saml:AttributeValue>
  </saml:Attribute>
  <saml:Attribute Name="Projects">
    <saml:AttributeValue>M84dPR45:manage</saml:AttributeValue>
    <saml:AttributeValue>AnotherProjectId:view</saml:AttributeValue>
  </saml:Attribute>
</saml:AttributeStatement>
```

In this example the member gains manage access to the project whose external ID is `M84dPR45` (see it in the dashboard URL, e.g. `https://dash.embrace.io/settings/projects-and-apps/M84dPR45/overview`) and view-only access to `AnotherProjectId`.

### OneLogin

Similar to Okta documentation above, you can find [Embrace connector](https://www.onelogin.com/connector/embrace_saml) in OneLogin's application catalog. You will need to provide your **Org ID** that is found on the **Provider Information** tab.

## Troubleshooting

Please [email us](mailto:support@embrace.io) or [Slack us](https://community.embrace.io/) your dedicated Customer Success Manager if you have any questions.
