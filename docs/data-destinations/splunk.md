---
title: Splunk Integration
description: Learn about the Embrace <> Splunk integration
sidebar_position: 4
---

# Data Destinations Splunk Integration

## Prerequisites

- Have an active Splunk account.


## Pulling your Splunk Access Token ([Splunk documentation](https://docs.splunk.com/observability/en/admin/authentication/authentication-tokens/org-tokens.html#admin-org-tokens))

1. Log into your Splunk account.
2. Locate your Access Tokens:
In the left navigation bar select Settings, than select Access Tokens menu item. A page with your Access tokens appears.
<img src={require('@site/static/images/data-destinations/splunk_access_tokens.png').default} alt="Image showing access tokens Menu" />

3. Click on **New Token** button
<img src={require('@site/static/images/data-destinations/splunk_add_new_token_button.png').default} alt="Image showing create Access Token button" />

 - At least you must enable the following permissions:
   - Ingests


  <img src={require('@site/static/images/data-destinations/splunk_create_token_dialog.png').default} alt="Image showing Access Token modal" />

6. Click on **Create** button and the new token will appear in the table on the screen.
7. Click on the name of an Access Token.
8. Click on **Show token button** (located right behind the name). And **Copy** the generated token.
<img src={require('@site/static/images/data-destinations/splunk_token_details.png').default} alt="Image showing Access Token modal" />

8. Share the Access Token with an Embrace onboarding specialist or use Embrace's UI to add Splunk as Data Destination.

## Pulling your Splunk Realm ([Splunk documentation](https://dev.splunk.com/observability/docs/realms_in_endpoints/))

1. Log into your Splunk account.
2. Locate your Profile:
In the left navigation bar select Settings, than press **View Profile** button. A page with your profile appears appears.
<img src={require('@site/static/images/data-destinations/splunk_access_tokens.png').default} alt="Image showing view profile button" />

3. Click on **Organizations** button
4. Copy Realm
<img src={require('@site/static/images/data-destinations/splunk_realm.png').default} alt="Image showing Realm" />

5. Share the Realm with an Embrace onboarding specialist or use Embrace's UI to add Splunk as Data Destination.
