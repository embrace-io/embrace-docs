# Embrace Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static documentation generator written using React Native and is published to [https://embrace.io/docs/](https://embrace.io/docs/)

## Updating

You can make edits to these docs from within GitHub UI or by forking/cloning the repo to make edits locally with an editor.

For quick edits that don't require adding or reorganizing pages, you can edit the specific Markdown file from within the [docs](./docs/) folder. Edit the file, commit your changes and make a PR, then follow the Release Workflow below.

For larger reorganization, you should follow the structure of the [docs](./docs) folder to see where your new pages will go. Any change to the landing page organization will be in the [Categories.tsx](./src/pages/_Home/Categories/Categories.tsx) file. Any change to the outer-most level of organization will be in the [sidebars.ts](./sidebars.ts) file.

## Installation

```
$ npm i
```

## Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
You can serve contents of that static directory using `npm run serve`

## Embrace Customizations

Besides basic "markdown" syntax we are using these Docusaurus features:

- [Admonitions](https://docusaurus.io/docs/markdown-features/admonitions) for various hints/tips/warnings "callouts"
- [Tabs](https://docusaurus.io/docs/markdown-features/tabs) to show code snippets for several languages or platforms. Note that tabs support synchronizing their state across multiple (for example, several sets of tabs on one page will all switch from Swift to Objective-C together if user clicks on any one).
- [MDX and React](https://docusaurus.io/docs/markdown-features/react) to load reusable snippets of text from shared/ directory

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

- If you make changes to docusaurus.config.js or some other site-wide .js files you typically need to fully restart `npm start` process and not rely on its hot-reloading
- Search is only indexed for static `build` and is not available via local `npm start`
