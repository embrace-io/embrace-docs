import * as process from "node:process";

import { type Config } from "@docusaurus/types";

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

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
  onBrokenMarkdownLinks: "throw",
  onDuplicateRoutes: "throw",
  onBrokenAnchors: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  scripts: [
    {
      id: "runllm-widget-script",
      type: "module",
      src: "https://widget.runllm.com",
      crossorigin: "true",
      "runllm-name": "Embrace Assistant",
      "runllm-assistant-id": "284",
      "runllm-position": "BOTTOM_RIGHT",
      "runllm-keyboard-shortcut": "Mod+j",
      "runllm-preset": "docusaurus",
      async: true,
    },
    {
      src: "scripts/init.js",
    },
    ...(process.env.EMBR_ENV === "production"
      ? [
          {
            src: `https://js.qualified.com/qualified.js?token=${process.env.QUALIFIED_TOKEN}`,
            async: true,
          },
        ]
      : []),
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        explicitSearchResultPath: true,
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        indexBlog: false,
        docsRouteBasePath: "/",
        removeDefaultStopWordFilter: false,
      },
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/product/boards/custom-dashboards/",
            from: "/product/custom-dashboards/",
          },
          {
            to: "/product/sessions/",
            from: "/features/user-session-insights/",
          },
          {
            to: "/data-marshaling-and-transmission/",
            from: "/product/data-marshaling-and-transmission/",
          },
          {
            to: "/region/",
            from: "/product/region/",
          },
          {
            to: "/dpa/",
            from: "/gdpr-data-processing-addendum-dpa/",
          },
          {
            to: "/ios/open-source/upgrade-guide/#moments-have-been-replaced-by-traces",
            from: "/ios/open-source/moments-to-tracing/",
          },
          {
            to: "/ios/open-source/#built-on-opentelemetry/",
            from: "/ios/upgrade-guide/built-on-otel/",
          },
          {
            to: "/ios/open-source/upgrade-guide/",
            from: "/ios/upgrade-guide/",
          },
          {
            to: "/ios/5x/features/traces/",
            from: "/ios/features/performance-monitoring/",
          },
          {
            to: "/ios/5x/features/",
            from: "/ios/features/",
          },
          {
            to: "/ios/5x/features/background-sessions/",
            from: "/ios/features/background-sessions/",
          },
          {
            to: "/ios/5x/features/configuration-file/",
            from: "/ios/features/configuration-file/",
          },
          {
            to: "/ios/5x/features/current-session-id-api/",
            from: "/ios/features/current-session-id-api/",
          },
          {
            to: "/ios/5x/features/identify-users/",
            from: "/ios/features/identify-users/",
          },
          {
            to: "/ios/5x/features/last-run-end-state/",
            from: "/ios/features/last-run-end-state/",
          },
          {
            to: "/ios/5x/features/moments/",
            from: "/ios/features/moments/",
          },
          {
            to: "/ios/5x/features/network-body-capture/",
            from: "/ios/features/network-body-capture/",
          },
          {
            to: "/ios/5x/features/push-notifications/",
            from: "/ios/features/push-notifications/",
          },
          {
            to: "/ios/5x/features/traces/",
            from: "/ios/features/tracing/",
          },
          {
            to: "/ios/5x/features/web-thread-monitoring/",
            from: "/ios/features/web-thread-monitoring/",
          },
          {
            to: "/ios/5x/integration/",
            from: "/ios/integration/",
          },
          {
            to: "/ios/5x/integration/breadcrumbs/",
            from: "/ios/integration/breadcrumbs/",
          },
          {
            to: "/ios/5x/integration/cli-tool/",
            from: "/ios/integration/cli-tool/",
          },
          {
            to: "/ios/5x/integration/crash-report/",
            from: "/ios/integration/crash-report/",
          },
          {
            to: "/ios/5x/integration/dsym-upload/",
            from: "/ios/integration/dsym-upload/",
          },
          {
            to: "/ios/5x/integration/integration-steps/",
            from: "/ios/integration/integration-steps/",
          },
          {
            to: "/ios/5x/integration/linking-embrace/",
            from: "/ios/integration/linking-embrace/",
          },
          {
            to: "/ios/5x/integration/log-message-api/",
            from: "/ios/integration/log-message-api/",
          },
          {
            to: "/ios/5x/integration/login-embrace-dashboard/",
            from: "/ios/integration/login-embrace-dashboard/",
          },
          {
            to: "/ios/5x/integration/next-steps/",
            from: "/ios/integration/next-steps/",
          },
          {
            to: "/ios/5x/integration/session-reporting/",
            from: "/ios/integration/session-reporting/",
          },
          {
            to: "/ios/5x/integration/update-embrace/",
            from: "/ios/integration/update-embrace/",
          },
          {
            to: "/android/features/traces/",
            from: "/android/features/performance-monitoring/",
          },
          {
            to: "/features/error-logs-tracking",
            from: "/open-telemetry/error-logs-tracking",
          },
          {
            to: "/features/traces",
            from: "/product/performance-tracing",
          },
          {
            to: "/android/features/traces",
            from: "/android/features/tracing",
          },
          {
            to: "/flutter/features/traces",
            from: "/flutter/features/tracing",
          },
          {
            to: "/ios/5x/features/traces",
            from: "/ios/5x/features/tracing",
          },
          {
            to: "/ios/open-source/features/traces",
            from: "/ios/open-source/tracing",
          },
          {
            to: "/react-native/4x/features/traces",
            from: "/react-native/4x/features/tracing",
          },
          {
            to: "/react-native/features/traces",
            from: "/react-native/features/tracing",
          },
          {
            to: "/unity/features/traces",
            from: "/unity/features/performance-tracing",
          },
          {
            to: "/features/traces",
            from: "/features/performance-tracing",
          },
          {
            to: "/data-destinations/chronosphere-setup",
            from: "/code/da-unexpected-input-chronosphere-credentials",
          },
          {
            to: "/data-destinations/elastic-setup",
            from: "/code/da-unexpected-input-elastic-credentials",
          },
          {
            to: "/data-destinations/grafana-cloud-setup",
            from: "/code/da-unexpected-input-grafana_cloud-instance-id",
          },
          {
            to: "/data-destinations/grafana-cloud-setup",
            from: "/code/da-unexpected-input-grafana_cloud-api-key",
          },
          {
            to: "/data-destinations/grafana-cloud-setup",
            from: "/code/da-unexpected-input-grafana_cloud-credentials",
          },
          {
            to: "/data-destinations/observe-setup",
            from: "/code/da-unexpected-input-observe-credentials",
          },
          {
            to: "/data-destinations/splunk",
            from: "/code/da-unexpected-input-splunk-api-key",
          },
          {
            to: "/data-destinations/splunk/",
            from: "/code/da-unexpected-input-splunk-credentials",
          },
        ],
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          editUrl: "https://github.com/embrace-io/embrace-docs/tree/main/",
          routeBasePath: "/",
          remarkPlugins: [embraceSdkVersion],
          showLastUpdateTime: false,
          sidebarPath: require.resolve("./sidebars.js"),
        },
        gtag: {
          anonymizeIP: true,
          trackingID: "G-38TSBDNVVD",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      },
    ],
  ],

  themeConfig: {
    image: "images/embrace_logo_black-text_transparent-bg_400x200.svg",

    // https://docusaurus.io/docs/api/themes/configuration#color-mode---dark-mode
    colorMode: {
      // defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },

    announcementBar: {
      id: 'new-structure-announcement', // Change this ID when contents change so that it becomes visible to users who previously [x] hidden it
      content:
        'Embrace\'s documentation has changed! Please open an issue or make pull requests <a target="_blank" href="https://github.com/embrace-io/embrace-docs">in Github with any changes!</a>',
      backgroundColor: "#EEFF04",
      isCloseable: true,
    },

    navbar: {
      logo: {
        alt: "Embrace",
        src: "images/embrace_logo_black-text_transparent-bg_400x200.svg",
        srcDark: "images/embrace_logo_white-text_transparent-bg_400x200.svg",
      },

      items: [
        {
          to: "https://embrace.io/product?utm_source=docs&utm_medium=banner&utm_campaign=product_tab",
          label: "Product",
          position: "left",
        },
        {
          to: "https://embrace.io/unify-mobile-and-backend-observability?utm_source=docs&utm_medium=banner&utm_campaign=product_tab",
          label: "Solutions",
          position: "left",
        },
        {
          to: "https://embrace.io/blog?utm_source=docs&utm_medium=banner&utm_campaign=learn_tab",
          label: "Learn",
          position: "left",
        },
        {
          to: "https://embrace.io/pricing?utm_source=docs&utm_medium=banner&utm_campaign=pricing_tab",
          label: "Pricing",
          position: "left",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
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
        {
          label: "Edit these docs",
          to: "https://github.com/embrace-io/embrace-docs/",
        },
        {
          html:
            'Questions? Reach out via <a href="mailto:support@embrace.io">email</a> or <a href="https://community.embrace.io/">Slack</a>',
        },
      ],

      copyright: `Copyright © ${new Date().getFullYear()} Embrace`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: [
        "clike",
        "java",
        "kotlin",
        "swift",
        "csharp",
        "groovy",
        "json",
        "shell-session",
        "dart",
        "promql",
      ],
    },
  },
};

module.exports = config;
