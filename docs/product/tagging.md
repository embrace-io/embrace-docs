---
title: Crash Tagging with Codeowners
sidebar_position: 1
---

# Tagging automatically highlights the most relevant person, team, or company to fix a Crash

Embrace tags each stack frame by the most specific matching condition in your Codeowners file.  This is then rolled up to the Crash, and Crash Group levels.

<img src={require('@site/static/images/Crash Tag example.png').default} alt="cartoon of crash tags" />

## Create tag rules

### directly in the dashboard
On any Crash, you can directly create a rule in the stack frame.  Click on the edit icon and fill out the modal with any RE2 regex rule and your desired tag.

<img src="https://github.com/embrace-io/embrace-docs/assets/4923780/dae75c84-1cd9-4233-933d-fbabb6877594" alt="edit-in-stack" width="500px">

<img src="https://github.com/embrace-io/embrace-docs/assets/4923780/b4e51364-eec3-4800-ae8c-43e8f2201384" alt="rule-modal">


You can also see, create, and modify rules in the Settings view.
<img src="https://github.com/embrace-io/embrace-docs/assets/4923780/7206f399-2519-4c6d-8fc2-156fa710f2c5" alt="rules-in-settings">


### with a Codeowners file

POST your file to `https://dsym-store.emb-api.com/v2/store/tagging/codeowner`.  Include your `app`, `token`, and `file`.

<img src={require('@site/static/images/Postman-Codeowners example.png').default} alt="screenshot of Codeowners upload" />

## Consume tagged crashes via Metrics API

New crashes will be automatically tagged as they happen.  Tags will show up on the Crash Summary page (as "Owners") and the Crash Details page (as header and in the stack frames).

<img src={require('@site/static/images/Screenshot 2023-09-20 at 1.26.34 PM.png').default} alt="screenshot of Owners column" />

Query for `hourly_crashes_by_tag` at [Metrics API](/embrace-api/code_samples)
