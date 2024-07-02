---
title: Custom Network Rollup Rules 
sidebar_position: 1
---

# Custom Network Rollup Rules

Embrace provides automatic collapsing of network paths to group similar paths together for analytics purposes.
We automatically collapse certain path elements if they match a common pattern, and we also group endpoints
that have a similar prefix. This heuristic can be good enough for most cases, but sometimes it is necessary
to override the behavior.

On the network settings page you can specify a list of desired groupings (or network rollup rules) that you want to
apply to your endpoints. When we process a network request, we apply all the network rollup rules in sequence, where
the first|last match wins.

<img src={require('@site/static/images/network-rollup-rules-example.png').default} alt="Screenshot of settings page with network rollup rules" />

Custom rules are applied on the backend on a going forward basis.

# Rules Reference

We currently provide the following patterns:

* «wildcard» - Matches any single path segment
* «**» - Matches any number of path segments
* «ext:file_extension» - Matches a string ending with a period and a 2 to 5 character extension.

Here are some examples for custom rules:

api.domain.com/«wildcard»/login
api.domain.com/images/«**»/«ext:jpg»

The `api.domain.com/«wildcard»/login` will match the following paths:
- api.domain.com/v1/login
- api.domain.com/v2/login
- api.domain.com/extern/login

It will not match `api.domain.com/login`, since the wildcard needs something between the domain and login path segment.

The rule `api.domain.com/images/«**»/«ext:jpg»` will match any endpoint with the prefix `api.domain.com/images` that
ends with a JPG file. It will match the following:
- api.domain.com/images/icon.jpg
- api.domain.com/images/0x0/bin/a/d/adb4108c-cb6f-4c9f-9df6-6787903c5442/file.jpg
