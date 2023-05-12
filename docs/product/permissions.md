---
title: User Permissions on Organizations and Projects
sidebar_position: 4
---
Roles categorize users and define what permissions those users have in the Embrace dashboard, such as what projects they can read or what settings they can modify.

# 1. Organization Roles

To configure roles for your organization:

1. Navigate to your [Settings page](https://dash.embrace.io/settings/my-profile/preferences).
2. Click on the [Users & Teams](https://dash.embrace.io/settings/organization/users-and-teams/users) tab on the left hand navigation bar.
3. On this page you can add, remove, and edit user roles & teams.

### Admin Role

Users have full control over all organization settings, full access to all projects, and full edit access to user & team permissions.

Examples of what the Admin can configurable:

- Jira integration
- Webhook
- Single Sign-On

### Member Role

Users have default access to different projects within Embrace, depending on the individual settings for the projects.

# 2. Teams

Embrace teams allow groups of users to organize their project permissions as a group. Only Org Admins can create new teams. Click on the Teams tab on the top of the [Users & Teams page](https://dash.embrace.io/settings/organization/users-and-teams/teams) to edit teams.

# 3. Project Permissions

Each project in Embrace can be configured to allow certain access to a subset of your users within your organization.

To configure roles for your projects:

1. Navigate to your [Settings page](https://dash.embrace.io/settings/my-profile/preferences).
2. Click on the project you would like to configure on the left hand navigation.
3. Click on the “Project Permissions” tab on the top of the page.

## Assigning Access to Individual Users and Teams

Users and teams can be added to projects individually with a given access level.

### Full Access

Users with full access to a project can configure permissions for all users of that project and configure all settings for that project.

### Regular

Users with regular access to a project will have access to all the data sent to Embrace but will have limited controls over changing the permissions of the project.

## Configure Project Default Access Level

Projects can also be configured to allow default access for all org members for a given project. These are the configurable access levels.

- Regular: All members have regular access
- Restricted: Only specified users & teams have access to the project

# 4. Example Org and Project Configuration

<img src={require('@site/static/images/rbac-structure.png').default} alt="Sample Organization Structure with Multiple Teams" />
