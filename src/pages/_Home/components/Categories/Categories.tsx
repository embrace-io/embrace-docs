/* eslint-disable react/jsx-props-no-spreading */
import {
  IconAlarmPlus,
  IconBrackets,
  IconBrandYoutube,
  IconChartArrows,
  IconChartBar,
  IconChartLine,
  IconCheck,
  IconDeviceMobileBolt,
  IconDeviceMobileX,
  IconFlame,
  IconLayoutGridAdd,
  IconPuzzle,
  IconSdk,
  IconSettings,
  IconTelescope,
  IconTimelineEventExclamation,
  IconUsersGroup,
  IconWifi,
} from "@tabler/icons-react";
import LogoUnity from "@site/static/images/unity.svg";
import LogoReactNative from "@site/static/images/react-native.svg";
import PerformanceTraces from "@site/static/images/performance_traces.svg";
import Logo from "@site/static/images/logo.svg";
import LogoSplunk from "@site/static/images/logo-splunk.svg";
import LogoNewRelic from "@site/static/images/logo-new-relic.svg";
import LogoHoneycomb from "@site/static/images/logo-honeycomb.svg";
import logoGrafana from "@site/static/images/logo-grafana.png";
import LogoDataDog from "@site/static/images/logo-datadog.svg";
import LogoChronosphere from "@site/static/images/logo-chronosphere.svg";
import LogoElastic from "@site/static/images/logo-elastic.svg";
import LogoObserve from "@site/static/images/logo-observe.svg";
import LogoIOS from "@site/static/images/ios.svg";
import LogoFlutter from "@site/static/images/flutter.svg";
import LogoAndroid from "@site/static/images/android.svg";
// import LogoWeb from "@site/static/images/web.svg";
import type { HomeCardProps } from "@site/src/pages/_Home/components/HomeCard/HomeCard";
import Category from "@site/src/pages/_Home/components/Category/Category";

import styles from "./Categories.module.css";

type Categories =
  | "Essentials"
  | "OpenTelemetry"
  | "Data Forwarding"
  | "Features"
  | "Partner Solutions"
  | "Instrumentation";

const DEFAULT_TABLER_ICON_PROPS = {
  size: 24,
  stroke: 1.5,
  color: "var(--icon-color)",
};
const CATEGORIES: Record<Categories, HomeCardProps[]> = {
  Instrumentation: [
    {
      title: "Android",
      description: "Add Embrace to your Android project.",
      icon: <LogoAndroid className={styles.platformLogo} />,
      linkTo: "/android",
    },
    {
      title: "iOS",
      description: "Add Embrace to your iOS project.",
      icon: <LogoIOS className={styles.platformLogo} />,
      linkTo: "/ios",
    },
    // {
    //   title: "Web",
    //   description: "Add Embrace to your Web project.",
    //   icon: <LogoWeb className={styles.platformLogo} />,
    //   linkTo: "/web",
    // },
    {
      title: "React Native",
      description: "Add Embrace to your React Native project.",
      icon: <LogoReactNative className={styles.platformLogo} />,
      linkTo: "/react-native",
    },
    {
      title: "Unity",
      description: "Add Embrace to your Unity project.",
      icon: <LogoUnity className={styles.platformLogo} />,
      linkTo: "/unity",
    },
    {
      title: "Flutter",
      description: "Add Embrace to your Flutter project.",
      icon: <LogoFlutter className={styles.platformLogo} />,
      linkTo: "/flutter",
    },
  ],
  Essentials: [
    {
      title: "Product Overview",
      description: "Mobile monitoring to elevate your user experience.",
      icon: <Logo className={styles.svgIcon} />,
      linkTo: "/product",
    },
    {
      title: "Best Practices",
      description:
        "Discover best practices to get the most out of our product.",
      icon: <IconCheck {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/best-practices",
    },
    {
      title: "Tutorials",
      description: "Check out our tutorials to easily learn about our product.",
      icon: <IconBrandYoutube {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "https://www.youtube.com/channel/UC8EjpY1ol3QGdp2qk1uZARQ",
    },
  ],
  OpenTelemetry: [
    {
      title: "Overview",
      description:
        "See how Embrace builds on top of OpenTelemetry to provide a seamless integration into the ecosystem.",
      icon: <IconTelescope {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/open-telemetry/",
    },
    {
      title: "Integration Setup",
      description:
        "Learn how to use the Embrace SDK to send data to and retrieve data from OpenTelemetry components.",
      icon: <IconSettings {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/open-telemetry/integration/",
    },
    {
      title: "SDK Repositories",
      description:
        "The Embrace OSS Android, Apple, React Native, Unity, and Flutter SDKs.",
      icon: <IconSdk {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/open-telemetry/sdk-repositories",
    },
  ],
  "Data Forwarding": [
    {
      title: "Data Destinations",
      description:
        "Deliver your metrics to your cross-platform observability tool of choice.",
      icon: <IconPuzzle {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/data-destinations",
    },
    {
      title: "Custom Metrics API",
      description:
        "Manage (create, get and delete) all the custom metrics of your organization.",
      icon: <IconChartLine {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/custom-metrics-api",
    },
    {
      title: "Metrics API",
      description: "Query your metrics from Embrace using PromQL.",
      icon: <IconChartBar {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/embrace-api",
    },
    {
      title: "Spans API",
      description: "Query your spans using TraceQL. ",
      icon: <IconBrackets {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/spans-api",
    },
    {
      title: "Spans Forwarding",
      description:
        "Automatically add a unique identifier to every network request your app makes.",
      icon: <IconChartArrows {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/network-spans-forwarding",
    },
    // TODO: review
    {
      title: "Custom Dashboards",
      description:
        "Stay on top of key mobile KPIs and unusual activity that matter for your team.",
      icon: <IconLayoutGridAdd {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/boards/custom-dashboards.md",
    },
  ],
  Features: [
    {
      title: "Traces",
      description:
        "Complete visibility into any customized operation you’d like to track.",
      icon: <PerformanceTraces className={styles.svgIcon} />,
      linkTo: "/product/traces",
    },
    {
      title: "Error Logs Tracking",
      description: "Identify issues faster with Error Tracking.",
      icon: <IconTimelineEventExclamation {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/logs",
    },
    {
      title: "User Session Insights",
      description:
        "Recreate every single user journey for every issue with exceptional detail.",
      icon: <IconUsersGroup {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/sessions",
    },
    {
      title: "Crash Reporting",
      description:
        "Highly accurate crash groupings with built-in intelligence.",
      icon: <IconFlame {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/crashes",
    },
    {
      title: "Network Monitoring",
      description:
        "Identify and resolve the networking issues behind your app’s crashes.",
      icon: <IconWifi {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/network",
    },
    {
      title: "Alerting",
      description: "Customizable alerts let you cut through the noise.",
      icon: <IconAlarmPlus {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/features/alerting",
    },
    {
      title: "ANR Reporting",
      description: "Resolve freezes faster with intelligent ANR Reporting.",
      icon: <IconDeviceMobileBolt {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/troubleshooting/anr-reporting",
    },
    {
      title: "Troubleshooting",
      description:
        "User Terminations, Out-of-Memory (OOM) Exits and Uncategorized Exits (UE).",
      icon: <IconDeviceMobileX {...DEFAULT_TABLER_ICON_PROPS} />,
      linkTo: "/product/troubleshooting",
    },
  ],
  "Partner Solutions": [
    {
      title: "Grafana",
      icon: <img src={logoGrafana} alt="Logo Grafana" />,
      linkTo: "/partners/grafana",
    },
    {
      title: "Elastic",
      icon: <LogoElastic />,
      linkTo: "/data-destinations/elastic-setup",
    },
    {
      title: "Observe",
      icon: <LogoObserve />,
      linkTo: "/data-destinations/observe-setup",
    },
    {
      title: "Chronosphere",
      icon: <LogoChronosphere />,
      linkTo: "/data-destinations/chronosphere-setup",
    },
    {
      title: "Honeycomb",
      icon: <LogoHoneycomb />,
      linkTo: "/data-destinations/honeycomb",
    },
    {
      title: "Datadog",
      icon: <LogoDataDog />,
      linkTo: "/data-destinations/data-dog-setup",
    },
    {
      title: "New Relic",
      icon: <LogoNewRelic />,
      linkTo: "/data-destinations/new-relic-setup",
    },
    {
      title: "Splunk",
      icon: <LogoSplunk />,
      linkTo: "/data-destinations/splunk",
    },
  ],
};

const Categories = () => {
  return Object.entries(CATEGORIES).map(([category, items]) => (
    <Category
      key={category}
      title={category}
      items={items}
      className={styles.category}
    />
  ));
};

export default Categories;
