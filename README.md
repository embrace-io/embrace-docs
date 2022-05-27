# Embrace Docs

This is a [Hugo](https://gohugo.io/) project for the Embrace documentation website.

## Getting Started

### Install Hugo

> **_IMPORTANT:_**  As of May 2022, the latest version of Hugo currently does not work so you should download 0.72 from https://github.com/gohugoio/hugo/releases/tag/v0.72.0 and not use other tools below because they install "latest"

Install the Hugo CLI using homebrew.

```sh
brew install hugo
```

This project was started using hugo version `v0.72.0/extended`

You can check the installed hugo version by running:

```sh
hugo version
```

### Clone the project

```sh
git clone https://github.com/embrace-io/embrace-docs.git
```

Then, initialize the submodules (this if for the
[theme](https://github.com/alex-shpak/hugo-book) we're using.)

```sh
cd embrace-docs
git submodule init
git submodule update
```

### Run the project

Run the project in development mode, by the following at the root of the project:

```sh
hugo server -D
```

Visit [http://localhost:1313/docs](http://localhost:1313/docs)


## Adding Content

To add a page, add a markdown file to the `content` folder.

## Custom Shortcodes

The following custom shortcodes are available. Learn more about Hugo shortcodes
[here](https://gohugo.io/content-management/shortcodes/).

**api**
Gets URL to API docs.

```
{{< api ios >}}
```

Available options are `ios`, `android`, and `rn`.

Note: Only `rn` has been added currently. 


**sdk**
Gets latest version of SDK, as defined in `config.yaml`.

```
{{< sdk platform="ios" >}}

```

Available options for `platform` are `"ios"`, `"android"`, and `"rn"`.


**image**
Use this for displaying images. It uses amp-img. You must
specify the width and height to be AMP-compatible, and to also improve SEO.
```
{{< image src="my-image.png" width="100" height="100" alt="My Image" title="My Image" caption="This is my image" >}}
```


[Additional shortcodes](https://themes.gohugo.io/hugo-book/#shortcodes) are available from the [theme](https://github.com/alex-shpak/hugo-book) we're using.


**readFile**
Reads file and parses contents as markdown.
Note that although there's plans on supporting it soon, currently it's not possible to render shortcodes from parsed strings.
Follow the status of the [issue here](https://github.com/gohugoio/hugo/issues/6703).

```
{{< readFile file="shared/log-limit.md" >}}
```

### Deployment

- Staging

When you merge your change to `master` branch [GitHub Actions](https://github.com/embrace-io/embrace-docs/actions) will automatically deploy your change and make it accessible via https://dev.embrace.io/docs

- Production

To deploy to production, create a [GitHub "release"](https://github.com/embrace-io/embrace-docs/releases) with a date-based version YYYYMMDD.n (e.g. 20220330.1) where "n" starts at 1 and is incremented if you need to do more releases on the same day. A [GitHub Action will run](https://github.com/embrace-io/embrace-docs/actions) and deploy your changes to live https://embrace.io/docs
