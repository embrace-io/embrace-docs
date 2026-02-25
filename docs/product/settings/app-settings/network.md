---
title: Network
sidebar_position: 3
---

# Adding First Party Domains

By default, Embrace has no way of knowing which of your calls are First Party (your own API). However, you can set this up easily in the Settings page.

Once First Party calls are identified, you will be able to filter by "First Party" in applicable filter locations such as on the Networks page. **Admins** are able to set First Party Domains by going to Settings (gear symbol in the bottom left of your screen).  

1. Click on App Settings
2. Expand the Apps list if it is not open
3. Click on the "Network" tab
4. Click "Add Domain" and enter a domain\
    a. The domain field also accepts wildcarding, such as `«wildcard».nps.gov`

:::info Domain Matching
Domains must match exactly. Subdomains are **not** included automatically.

For example, if your API calls go to `api.example.com` and `cdn.example.com`, adding only `example.com` will **not** match those calls. You would need to either:

- Add each subdomain individually (`api.example.com`, `cdn.example.com`)
- Use a wildcarded domain (`«wildcard».example.com`) to match all subdomains at once, if the domain is wildcarded
:::

<img src={require('@site/static/images/settings/First-Party-Domains.png').default} style={{ width: '75%', height: '75%' }} alt="Creating first-party domains" />
