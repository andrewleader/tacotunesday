import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'YouTube channel',
    Svg: require('@site/static/img/drop-svgrepo-com.svg').default,
    description: (
      <>
        See all my videos.
      </>
    ),
    link: 'https://www.youtube.com/@tacotunesday'
  },
  {
    title: 'Learn about my build',
    Svg: require('@site/static/img/build-svgrepo-com.svg').default,
    description: (
      <>
        Read everything about my build.
      </>
    ),
    link: '/docs/overview'
  },
  {
    title: 'See my blog',
    Svg: require('@site/static/img/follow-svgrepo-com.svg').default,
    description: (
      <>
        Read the latest about my adventures.
      </>
    ),
    link: '/blog'
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <a href={link} className={styles.featureLink}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
    <section>
      <div style={{ display: "flex", justifyContent: "center", background: "black" }}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/tvZSY5xBkpk?si=LmkMeO4lKYfvGVZY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </section>
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
