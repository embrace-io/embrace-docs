// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// Embrace Remark Plugins
const embraceSdkVersion = require("./src/remark/embrace-sdk-version");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Embrace Documentation",
  tagline: "Learn how to set up comprehensive mobile app performance monitoring.",
  favicon: "/images/favicon.png",
  trailingSlash: true,
  noIndex: false,
  url: process.env.URL ?? "https://embrace.io",
  baseUrl: process.env.BASE_URL ?? "/docs",
  staticDirectories: ["static"],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "embrace-io", // Usually your GitHub org/user name.
  projectName: "embrace-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        explicitSearchResultPath: true,
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        indexBlog: false,
        docsRouteBasePath: "/",
        removeDefaultStopWordFilter: false,
      }),
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          remarkPlugins: [embraceSdkVersion],
          showLastUpdateTime: false,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "images/embrace_logo_black-text_transparent-bg_400x200.svg",

      navbar: {
        logo: {
          alt: "Embrace Mobile",
          src: "images/embrace_logo_black-text_transparent-bg_400x200.svg",
          srcDark: "images/embrace_logo_white-text_transparent-bg_400x200.svg",
        },

        items: [
          {
            type: "html",
            value:
              'Questions? Reach out via <a href="mailto:support@embrace.io">email</a> or <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjx2cc1CVetJ956WoeWlLL65HoyXMb-cyje0xwppOASD5DAg/viewform">Slack</a>',
            position: "right",
          },
        ],
      },

/*
      announcementBar: {
        id: 'announcementBar-20230315', // Increment this when contents change so that it becomes visible to users who previously [x] hidden it
        content: `Welcome to our new docs!`,
      },
*/

      footer: {
        style: "dark",

        links: [
          {
            title: " ",
            items: [
              {
                label: "Embrace Overview",
                to: "https://embrace.io/product/",
              },
              {
                label: "Crash Reporting",
                to: "https://embrace.io/product/crash-reporting/",
              },
              {
                label: "Session Replay",
                to: "https://embrace.io/product/session-replay/",
              },
              {
                label: "App Health and Stability",
                to: "https://embrace.io/product/app-health-and-stability/",
              },
            ],
          },
          {
            title: " ",
            items: [
              {
                label: "Network Monitoring",
                to: "https://embrace.io/product/network-monitoring/",
              },
              {
                label: "Error Log Management",
                to: "https://embrace.io/product/error-log-management/",
              },
              {
                label: "Real-Time Dashboards",
                to: "https://embrace.io/product/real-time-dashboards/",
              },
              {
                label: "Unity",
                to: "https://embrace.io/unity/",
              },
            ],
          },
          {
            title: " ",
            items: [
              {
                label: "Privacy Policy",
                to: "/privacy-policy/",
              },
              {
                label: "Terms of Service",
                to: "/terms-of-service/",
              },
              {
                label: "Data Processing Agreement",
                to: "/dpa/",
              },
            ],
          },
        ],

        copyright: `Copyright © ${new Date().getFullYear()} Embrace Mobile, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["clike", "java", "kotlin", "swift", "csharp", "groovy", "json", "shell-session", "dart", "promql"],
      },
    }),
};

module.exports = config;
