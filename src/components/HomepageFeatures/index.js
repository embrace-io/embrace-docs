import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Android',
    Svg: require('@site/static/images/android-icon.svg').default,
    description: (<>Add Embrace to your Android project.</>),
    link: 'android/integration/add-embrace-sdk/',
  },
  {
    title: 'iOS',
    Svg: require('@site/static/images/ios-icon.svg').default,
    description: (<>Add Embrace to your iOS project.</>),
    link: 'ios/integration/linking-embrace/',
  },
  {
    title: 'React Native',
    Svg: require('@site/static/images/react-native-icon.svg').default,
    description: (<>Add Embrace to your React Native project.</>),
    link: 'react-native/integration/add-embrace-sdk/',
  },
  {
    title: 'Unity',
    Svg: require('@site/static/images/unity-icon.svg').default,
    description: (<>Add Embrace to your Unity project.</>),
    link: 'unity/integration/linking-embrace/',
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={link}><Svg className={styles.featureSvg} role="img" /></a>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
