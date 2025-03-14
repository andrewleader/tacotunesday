import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.heroImages}>
          <img src="/img/truck-exterior.jpg" alt="Picture of exterior"/>
          <img src="/img/truck-interior.jpg" alt="Picture of interior"/>
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/build/overview">
            See the build
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Tune M1 camper on the 2024 Tacoma Off-Road 5' truck">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
