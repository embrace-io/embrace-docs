---
title: Honeycomb Integration
description: Learn about the Embrace <> Honeycomb integration
sidebar_position: 4
---

# Data Destinations Honeycomb Integration

## Prerequisites

- Have an active Honeycomb account and an environment created.

To initiate the integration, you'll need to share your Honeycomb API Key with an Embrace onboarding specialist.


## Pulling your Honeycomb API Key ([Honeycomb documentation](https://docs.honeycomb.io/working-with-your-data/settings/api-keys/))

1. Log into your Honeycomb account.
2. Locate your Environment’s API Keys:
In the left navigation bar under the Honeycomb logo, select the Environments banner. A menu appears with Manage Environments and a list of existing Environments.
<img src={require('@site/static/images/data-destinations/honeycomb_manage_environments.png').default} alt="Image showing list of existing Environments" />
3. Select **Manage Environments**. The next screen displays a list of Environments and details about each Environment.
<img src={require('@site/static/images/data-destinations/honeycomb_manage_environments_2.png').default} alt="Image showing list of existing Environments and details about each one of them" />
4. In the row of the Environment you want to use to receive the metrics, select **View API Keys**. 
5. Click on **Create API Key**:
    - At least you must enable the following permissions:
        - Visit to team members
        - Enable
        - Send events
        - Create datasets
          <img src={require('@site/static/images/data-destinations/honeycomb_create_api_key.png').default} alt="Image showing create api key button" />
        - <img src={require('@site/static/images/data-destinations/honeycomb_api_key_modal.png').default} alt="Image showing api key modal" />
5. The next screen lists the API Keys associated with the Environment (and the one you already created).
6. Click on the **Copy key** button (adjacent to the key value).
7. Share the api key with an Embrace onboarding specialist.
