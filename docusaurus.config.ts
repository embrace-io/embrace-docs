import {Config} from "@docusaurus/types";

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// Embrace Remark Plugins
const embraceSdkVersion = require("./src/remark/embrace-sdk-version");

const config: Config = {
  title: "Embrace Documentation",
  tagline: "Take the guesswork out of building next-level mobile experiences.",
  favicon: "/images/favicon.png",
  trailingSlash: true,
  noIndex: false,
  url: process.env.URL ?? "https://embrace.io",
  baseUrl: process.env.BASE_URL ?? "/docs/",
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

  plugins: [
    'docusaurus-plugin-hotjar',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/ios/5x/features/tracing/',
            from: '/ios/features/performance-monitoring/',
          },
          {
            to: '/ios/5x/features/',
            from: '/ios/features/',
          },
          {
            to: '/ios/5x/features/background-sessions/',
            from: '/ios/features/background-sessions/',
          },
          {
            to: '/ios/5x/features/configuration-file/',
            from: '/ios/features/configuration-file/',
          },
          {
            to: '/ios/5x/features/current-session-id-api/',
            from: '/ios/features/current-session-id-api/',
          },
          {
            to: '/ios/5x/features/identify-users/',
            from: '/ios/features/identify-users/',
          },
          {
            to: '/ios/5x/features/last-run-end-state/',
            from: '/ios/features/last-run-end-state/',
          },
          {
            to: '/ios/5x/features/moments/',
            from: '/ios/features/moments/',
          },
          {
            to: '/ios/5x/features/network-body-capture/',
            from: '/ios/features/network-body-capture/',
          },
          {
            to: '/ios/5x/features/push-notifications/',
            from: '/ios/features/push-notifications/',
          },
          {
            to: '/ios/5x/features/tracing/',
            from: '/ios/features/tracing/',
          },
          {
            to: '/ios/5x/features/web-thread-monitoring/',
            from: '/ios/features/web-thread-monitoring/',
          },
          {
            to: '/ios/5x/integration/',
            from: '/ios/integration/',
          },
          {
            to: '/ios/5x/integration/breadcrumbs/',
            from: '/ios/integration/breadcrumbs/',
          },
          {
            to: '/ios/5x/integration/cli-tool/',
            from: '/ios/integration/cli-tool/',
          },
          {
            to: '/ios/5x/integration/crash-report/',
            from: '/ios/integration/crash-report/',
          },
          {
            to: '/ios/5x/integration/dsym-upload/',
            from: '/ios/integration/dsym-upload/',
          },
          {
            to: '/ios/5x/integration/integration-steps/',
            from: '/ios/integration/integration-steps/',
          },
          {
            to: '/ios/5x/integration/linking-embrace/',
            from: '/ios/integration/linking-embrace/',
          },
          {
            to: '/ios/5x/integration/log-message-api/',
            from: '/ios/integration/log-message-api/',
          },
          {
            to: '/ios/5x/integration/login-embrace-dashboard/',
            from: '/ios/integration/login-embrace-dashboard/',
          },
          {
            to: '/ios/5x/integration/next-steps/',
            from: '/ios/integration/next-steps/',
          },
          {
            to: '/ios/5x/integration/session-reporting/',
            from: '/ios/integration/session-reporting/',
          },
          {
            to: '/ios/5x/integration/update-embrace/',
            from: '/ios/integration/update-embrace/',
          },
          {
            to: '/android/features/tracing/',
            from: '/android/features/performance-monitoring/',
          },
        ],
      },
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
    ({
      hotjar: {
        applicationId: 3734357,
      },
      image: "images/embrace_logo_black-text_transparent-bg_400x200.svg",

      // https://docusaurus.io/docs/api/themes/configuration#color-mode---dark-mode
      colorMode: {
        // defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },

      navbar: {
        logo: {
          alt: "Embrace",
          src: "images/embrace_logo_black-text_transparent-bg_400x200.svg",
          srcDark: "images/embrace_logo_white-text_transparent-bg_400x200.svg",
        },

        items: [
          {
            type: "html",
            value:
              'Questions? Reach out via <a href="mailto:support@embrace.io">email</a> or <a href="https://join.slack.com/t/embraceio-community/shared_invite/zt-ywr4jhzp-DLROX0ndN9a0soHMf6Ksow">Slack</a>',
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
                label: "User Session Insights",
                to: "https://embrace.io/product/user-session-insights/",
              },
              {
                label: "Crash Reporting",
                to: "https://embrace.io/product/crash-reporting/",
              },
              {
                label: "Network Monitoring",
                to: "https://embrace.io/product/network-monitoring/",
              },
              {
                label: "ANR Reporting",
                to: "https://embrace.io/product/anr-reporting/",
              },
              {
                label: "Error Tracking",
                to: "https://embrace.io/product/error-tracking/",
              },
            ],
          },
          {
            title: " ",
            items: [
              {
                label: "App Exits",
                to: "https://embrace.io/product/app-exits/",
              },
              {
                label: "Custom Dashboards",
                to: "https://embrace.io/product/custom-dashboards/",
              },
              {
                label: "Alerting",
                to: "https://embrace.io/product/alerting/",
              },
              {
                label: "App Performance",
                to: "https://embrace.io/product/app-performance/",
              },
              {
                label: "Integrations",
                to: "https://embrace.io/product/integrations/",
              },
              {
                label: "API",
                to: "https://embrace.io/product/api/",
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

        copyright: `Copyright © ${new Date().getFullYear()} Embrace`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["clike", "java", "kotlin", "swift", "csharp", "groovy", "json", "shell-session", "dart", "promql"],
      },
    }),
};

module.exports = config;
