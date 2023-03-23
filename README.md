# Embrace Docs

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static documentation generator written using React Native.

## Installation

```
$ yarn
```

## Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
You can serve contents of that static directory using `npm run serve`

## Release Workflow

We are following our normal release process:

- Create a PR with your changes - a preview site will be generated and a link to it will be added as a comment in your PR
- Merge to master and the site will be deployed to https://dev.embrace.io/docs/
- A `draft` release is created when changes are merged to master. You can `publish` the draft release to deploy to https://embrace.io/docs/

## Embrace Customizations

Besides basic "markdown" syntax we are using these Docusaurus features:

- [Admonitions](https://docusaurus.io/docs/markdown-features/admonitions) for various hints/tips/warnings "callouts"
- [Tabs](https://docusaurus.io/docs/markdown-features/tabs) to show code snippets for several languages or platforms. Note that tabs support synchronizing their state across multiple (for example, several sets of tabs on one page will all switch from Swift to Objective-C together if user clicks on any one).
- [MDX and React](https://docusaurus.io/docs/markdown-features/react) to load reusable snippets of text from shared/ directory

Docusaurus features that we could/should use:

- [Diagrams](https://docusaurus.io/docs/markdown-features/diagrams) - render diagrams using Mermaid
- [SEO](https://docusaurus.io/docs/seo) - add more keywords/descriptions to all pages
- Code blocks support [line numbers](https://docusaurus.io/docs/markdown-features/code-blocks#line-numbering) and [line highlights](https://docusaurus.io/docs/markdown-features/code-blocks#line-highlighting)
- A list of [Docusaurus plugins](https://docusaurus.io/community/resources)
  - @vitaliyf is planning to investigate integrating OpenAPI that we could potentially generate from our SDKs
- An even longer list of [Remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)

The following are the extras we added to handle Embrace's documentation:

- `@easyops-cn/docusaurus-search-local` search plugin
- `src/remark/embrace-sdk-version.js` Remark plugin that inserts latest SDK version (from `embrace.json` into various code blocks), using `{{ embrace_sdk_version platform="something" }}` syntax.
- Snippets in `shared/` that are loaded on several pages

And we customized the following:

- Various logo and titles, as well as site-wide footer in `docusaurus.config.js`
- Extra syntax-highlighting languages in `docusaurus.config.js`
- Single sidebar used site-wide in `sidebars.js` that also enforse some collapsed/open state
- Homepage via `src/components/HomepageFeatures` in `src/pages/index.js`
- Some styling via `src/css/custom.css` (for both light and dark modes)

## Tips

- If you make changes to docusaurus.config.js or some other site-wide .js files you typically need to fully restart `yarn start` process and not rely on its hot-reloading
- Search is only indexed for static `build` and is not available via local `yarn start`
