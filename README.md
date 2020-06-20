# Embrace Docs

This is a [Hugo](https://gohugo.io/) project for the Embrace documentation website.

## Getting Started

### Install Hugo

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
