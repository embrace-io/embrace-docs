// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Embrace - Documentation',
  tagline: 'Learn how to set up comprehensive mobile app performance monitoring.',
  favicon: 'static/favicon.png',
  trailingSlash: true,
  noIndex: false,

  // Set the production url of your site here
  url: 'https://embrace.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs',

  staticDirectories: ['static'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'embrace-io', // Usually your GitHub org/user name.
  projectName: 'embrace-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',

          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'TODOimg/docusaurus-social-card.jpg',

      navbar: {
        logo: {
          alt: 'Embrace Mobile',
          src: 'images/embrace_color_logo.png',
        },
//        title: 'HomeLink1',

//        items: [
//          {
//            type: 'doc',
//            docId: 'best-practices/app-performance',
//            position: 'left',
//            label: 'OptionalMenuItem2',
//          },
//        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Placeholder Section 1',
            items: [
              {
                label: 'Section1 Link1',
                href: 'https://embrace.io/?link1',
              },
              {
                label: 'Section1 Link2',
                href: 'https://embrace.io/?link2',
              },
              {
                label: 'Section1 Link3',
                href: 'https://embrace.io/?link3',
              },
            ],
          },
          {
            title: 'Placeholder Section 2',
            items: [
              {
                label: 'Blog',
                to: 'https://embrace.io/blog/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/embrace-io',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Embrace Mobile, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["clike","java","kotlin","swift","csharp","groovy","json","shell-session","dart"],
      },
    }),
};

module.exports = config;
