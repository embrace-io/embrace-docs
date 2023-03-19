// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// Embrace Remark Plugins
const embraceSdkVersion = require('./src/remark/embrace-sdk-version');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Embrace Documentation',
  tagline: 'Learn how to set up comprehensive mobile app performance monitoring.',
  favicon: 'static/favicon.png',
  trailingSlash: true,
  noIndex: false,
  url: 'https://embrace.io',
  baseUrl: '/docs',
  staticDirectories: ['static'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'embrace-io', // Usually your GitHub org/user name.
  projectName: 'embrace-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          remarkPlugins: [embraceSdkVersion],
          showLastUpdateTime: false,
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
      image: 'TODOimg/docusaurus-social-card.jpg',

      navbar: {
        logo: {
          alt: 'Embrace Mobile',
          src: 'images/embrace_color_logo.png',
        },
/*
        title: 'HomeLink1',

        items: [
          {
            type: 'doc',
            docId: 'best-practices/app-performance',
            position: 'left',
            label: 'OptionalMenuItem2',
          },
        ],
*/
      },

      footer: {
        style: 'dark',

        links: [
          {
            title: ' ',
            items: [
              {
                label: 'Embrace Overview',
                to: 'https://embrace.io/product/',
              },
              {
                label: 'Crash Reporting',
                to: 'https://embrace.io/product/crash-reporting/',
              },
              {
                label: 'Session Replay',
                to: 'https://embrace.io/product/session-replay/',
              },
              {
                label: 'App Health and Stability',
                to: 'https://embrace.io/product/app-health-and-stability/',
              },
          ]
          },
          {
            title: ' ',
            items: [
              {
                label: 'Network Monitoring',
                to: 'https://embrace.io/product/network-monitoring/',
              },
              {
                label: 'Error Log Management',
                to: 'https://embrace.io/product/error-log-management/',
              },
              {
                label: 'Real-Time Dashboards',
                to: 'https://embrace.io/product/real-time-dashboards/',
              },
              {
                label: 'Unity',
                to: 'https://embrace.io/unity/',
              },
            ],
          },
          {
            title: ' ',
            items: [
              {
                label: 'Privacy Policy',
                to: '/privacy-policy/',
              },
              {
                label: 'Terms of Service',
                to: '/terms-of-service/',
              },
              {
                label: 'Data Processing Agreement',
                to: '/dpa/',
              },
            ],
          },
        ],

        copyright: `Copyright © ${new Date().getFullYear()} Embrace Mobile, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["clike","java","kotlin","swift","csharp","groovy","json","shell-session","dart","promql"],
      },
    }),
};

module.exports = config;
