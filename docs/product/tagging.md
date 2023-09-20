---
title: Crash Tagging with Codeowners
sidebar_position: 1
---

# Tagging automatically highlights the most relevant person, team, or company to fix a Crash

Embrace tags each stack frame by the most specific matching condition in your Codeowners file.  This is then rolled up to the Crash, and Crash Group levels.

<img src={require('@site/static/images/Crash Tag example.png').default} alt="cartoon of crash tags" />

## Create tag rules by uploading your Codeowners file

POST your file to `https://dsym-store.emb-api.com/v2/store/tagging/codeowner`.  Include your `app`, `token`, and `file`.

<img src={require('@site/static/images/Postman-Codeowners example.png').default} alt="screenshot of Codeowners upload" />

## Consume tagged crashes via Metrics API

New crashes will be automatically tagged as they happen.  Tags will show up on the Crash Summary page (as "Owners") and the Crash Details page (as header and in the stack frames).

<img src={require('@site/static/images/Screenshot 2023-09-20 at 1.26.34 PM.png').default} alt="screenshot of Owners column" />

Query for `hourly_crashes_by_tag` at [Metrics API](/embrace-api/code_samples)
