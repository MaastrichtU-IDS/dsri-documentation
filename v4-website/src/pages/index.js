import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Get started quickly',
    imageUrl: 'img/okd-panda.svg',
    description: (
      <>
        <a href="/dsri-documentation/docs/deploy-from-template">Easily deploy popular Data Science applications</a>&nbsp;
        on a remote server from the DSRI web interface using existing templates, such as RStudio, JupyterLab or VisualStudio Code.
      </>
    ),
  },
  {
    title: 'Run any program in a container',
    imageUrl: 'img/undraw_deliveries.svg',
    description: (
      <>
        Most programs can be installed and run in containers easily. 
        Customize an existing Docker image or create a new one to deploy exactly what you need
      </>
    ),
  },
  {
    title: 'Share computing environments',
    imageUrl: 'img/undraw_data.svg',
    // imageUrl: 'img/undraw_collaborators.svg',
    description: (
      <>
        Share common development environments with other researchers at Maastricht University. 
        And help improve those environments for you, and the rest of UM community!
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Data Science Research Infrastructure at Maastricht University">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          {/* <Logo img_src={`${baseUrl}img/dsri_logo.png`} /> */}
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        {/* Video img/screencast_dsri_deploy_template.webm */}
        <div className="container">
          <h1 style={{textAlign: 'center'}}>
            How do you deploy an application on the DSRI? (1min)
          </h1>
          <video width="100%" height="100%" controls>
            <source src="img/DSRI-Introduction.mp4" type="video/mp4"/>
          </video>
        </div>
      </main>
    </Layout>
  );
}

export default Home;





