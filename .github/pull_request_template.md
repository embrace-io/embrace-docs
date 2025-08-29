## Checklist before you pull:

- [ ] Double-check that any changes fit the [Embrace Docs Style Guide](https://embrace.io/docs/embrace-docs-style-guide/).

- [ ] Please ensure that there is no customer-identifying information in text or images.

- [ ] If you renamed any pages then perhaps you likely want to add a redirect from old to new URL so that we don't end up with broken links. You can do this by adding a pair of to/from values in `docusaurus.config.js` under `@docusaurus/plugin-client-redirects`

- [ ] If you link to a header within a page in the docs, make sure that header has an explicit tag. E.g., the H3 header `### Hello World {#my-explicit-id}` has an explicit tag `my-explicit-id`.
