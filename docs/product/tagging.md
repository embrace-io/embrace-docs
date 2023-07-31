---
title: Crash Tagging with Codeowners
sidebar_position: 1
---

# Tagging automatically highlights the most relevant person, team, or company to fix a Crash

Embrace tags each stack frame by the most specific matching condition in your Codeowners file.  This is then rolled up to the Crash, and Crash Group levels.

#TODO: tagging image

## Create tag rules by uploading your Codeowners file

POST your file to `https://dsym-store.emb-api.com/v2/store/tagging/codeowner`.  Include your `app`, `token`, and `file`.

#TODO: screenshot of postman

## Consume tagged crashes via Metrics API

Query for `hourly_crashes_by_tag` at [Metrics API](/embrace-api/code_samples)
