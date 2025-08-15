---
title: Honeycomb Integration
description: Learn about the Embrace <> Honeycomb integration
sidebar_position: 5
---

# Honeycomb Integration

## Prerequisites

- Have an active Honeycomb account and an environment created.

## Pulling your Honeycomb API Key ([Honeycomb documentation](https://docs.honeycomb.io/working-with-your-data/settings/api-keys/))

1. Log into your Honeycomb account.
2. Locate your Environment’s API Keys:

In the left navigation bar under the Honeycomb logo, select the Environments banner. A menu appears with Manage Environments and a list of existing Environments.
<img src={require('@site/static/images/data-destinations/honeycomb_manage_environments.png').default} alt="Image showing list of existing Environments" />

3. Select **Manage Environments**. The next screen displays a list of Environments and details about each Environment.
<img src={require('@site/static/images/data-destinations/honeycomb_manage_environments_2.png').default} alt="Image showing list of existing Environments and details about each one of them" />
4. Select **View API Keys** in the row corresponding to the environment you wish to use for receiving metrics.  
5. Click on **Create API Key**:

<img src={require('@site/static/images/data-destinations/honeycomb_create_api_key.png').default} alt="Image showing create api key button" />

- At least you must enable the following permissions:
  - Visible to team members
  - Enable
  - Send events
  - Create datasets

<img src={require('@site/static/images/data-destinations/honeycomb_api_key_modal.png').default} alt="Image showing api key modal" />

6. The next screen lists the API Keys associated with the Environment (and the one you already created).
7. Click on the **Copy key** button (adjacent to the key value).
8. Share the api key with an Embrace onboarding specialist.
