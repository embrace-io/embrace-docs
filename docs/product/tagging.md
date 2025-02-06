---
title: Crash Tagging with Codeowners
sidebar_position: 1
---

# Tagging Automatically Highlights the Most Relevant Person, Team, or Company to Fix a Crash

Embrace tags each stack frame by the most specific matching condition in your CODEOWNERS file.  This is then rolled up to the Crash, and Crash Group levels.

<img src={require('@site/static/images/Crash Tag example.png').default} alt="cartoon of crash tags" />

## Create Tag Rules

### Directly in the Dashboard
On any Crash, you can directly create a rule in the stack frame.  Click on the edit icon and fill out the modal with any RE2 regex rule and your desired tag.

<img src={require('@site/static/images/tagging-ui-1.png').default} alt="edit-in-stack" width="500px"/>

<img src={require('@site/static/images/tagging-ui-3.png').default} alt="rules-in-settings" width="500px"/>

### In App Settings

You can also see, create, and modify rules in the Settings view.
1. Click on the Settings icon in the lower left hand corner of the dashboard.
2. Select App Settings from the dropdown.
3. Navigate to the "Owner Rules" tab.

<img src={require('@site/static/images/tagging-ui-2.png').default} alt="rule-modal" width="500px"/>

### With a CODEOWNERS File
POST your file to `https://dsym-store.emb-api.com/v2/store/tagging/codeowner`.  Include your `app`, 
`token` (the symbol upload token used to upload symbols files) , `file` and `base_direcory`. The `base_directory` is the
prefix that will be stripped from the stack frame file paths before matching.  This is useful for matching stack traces
from React Native.

<img src={require('@site/static/images/Postman-Codeowners example.png').default} alt="screenshot of Codeowners upload" />

**NOTE: Automatically tagging owners using a CODEOWNERS file is most useful in crashes where the stack trace information
matches your source code layout. Matching will not work in cases where the crash frame does not match your source code.
For example, a native Android crash in a React Native app will not match the JavaScript source code for the app.**

Use the following curl command to upload the CODEOWNERS file:

```shell
curl https://dsym-store.emb-api.com/v2/store/tagging/codeowner \
  --form app=<app_id> \
  --form token=<token> \
  --form file=@./CODEOWNERS \
  --form base_directory=<base_directory>
```

## Consume tagged crashes via Metrics API

New crashes will be automatically tagged as they happen.  Tags will show up on the Crash Summary page (as "Owners") and the Crash Details page (as header and in the stack frames).

You can find an example query for `hourly_crashes_by_tag` at [Metrics API](/embrace-api/code_samples)
