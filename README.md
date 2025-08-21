# Embrace Documentation

This repository hosts the source code for the [Embrace documentation site](https://embrace.io/docs/).

The docs site is automatically deployed from this repository on a regular daily interval. We welcome all contributors who would like to grow knowledge and clarity regarding the Embrace mobile SDKs, dashboard, and data forwarding features. Please feel free to make a pull request to make an addition, or open an issue to make a suggestion of what might be change.

This website is built using [Docusaurus](https://docusaurus.io/), a modern static documentation generator written using React. Some specific changes to Docusaurus are noted below in [Embrace Customizations](./#embrace-customizations).

## Updating These Docs

You can make edits to these docs from within GitHub UI or by forking/cloning the repo to make edits locally. Ensure that any edits conform to the [Embrace Docs Style Guide](https://embraceio.notion.site/Embrace-Public-Docs-Style-Guide-19f7e3c99852804abd7deacc2b14cc14).

### Recommendations

For quick edits that don't require adding or reorganizing pages, you can edit the specific Markdown file from within the [docs](./docs/) folder. Edit the file, commit your changes and make a PR.

For larger reorganization, you should follow the structure of the [docs](./docs) folder to see where your new pages will go. Any change to the landing page organization will be in the [Categories.tsx](./src/pages/_Home/Categories/Categories.tsx) file. Any change to the outer-most level of organization will be in the [sidebars.ts](./sidebars.ts) file.

## Local Development

You can edit and build these docs on your local machine by pulling the repo and following the instructions below. We recommend using an integrated development environment like [VSCode](https://code.visualstudio.com/) to simultaneously edit the source files, note markdown or linking errors, and run the docs via Node.

### Installation

```console
npm i
```

This command will install all node packages and their dependencies. This command is usually optional, as the packages are prebuilt in this repository.

### Start  

```console
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live when a file is saved, without having to restart the server.

## Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
You can serve contents of that static directory using `npm run serve`

## Linting

We use [rumdl](https://github.com/rvben/rumdl) to enforce standard lint (formatting) rules on all markdown files. A summary of lint results will be posted as a comment in your pull request. You must resolve all lint violations before you merge your change. Most of them can be automatically fixed using `rumdl check --fix`.

You should install and run the linter before comitting your changes:

```console
brew tap rvben/rumdl
brew install rumdl

rumdl check --statistics
rumdl --fix
```

PS. You can also install rumdl as a Python package using `uv pip install rumdl`

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

- If you make changes to `docusaurus.config.js` or some other site-wide `.js` files you typically need to fully restart `npm start` process and not rely on its hot-reloading.
- The searchbox on the site is only indexed for static `build` and is not available via local `npm start`.
- Docusaurus will navigate *relative links* for you. When linking within these docs, use a path from the section's folder rather than the absolute path of the page. Also, you can leave off the markdown file extension in a link. For example, linking to iOS trace instrumentation should be in `/ios/6x/tracing`, not `/docs/ios/6x/tracing.md`.
