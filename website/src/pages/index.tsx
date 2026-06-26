import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import axios from 'axios';
import styles from './styles.module.css';

import { Grid, Typography } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Resolve environment variables:
declare var process : { env: { API_URL: string } }
const apiUrl: string = (process.env.API_URL as string) || 'https://api.dsri.maastrichtuniversity.nl';
// const apiUrl: string = (process.env.API_URL as string) || 'http://localhost:8000';

const features = [
  {
    title: 'Get started quickly',
    imageUrl: 'img/okd-panda.svg',
    description: (
      <>
        <a href="/docs/start-workspace">Easily deploy popular Data Science workspaces</a>,
        from the DSRI web interface in a few clicks, such as RStudio, JupyterLab or VisualStudio Code.
      </>
    ),
  },
  {
    title: 'Run any program in a container',
    imageUrl: 'img/okd-panda-laptop.svg',
    // imageUrl: 'img/undraw_deliveries.svg',
    description: (
      <>
        Most programs can be installed and run in containers easily.
        Customize an existing workspace image, or create a new one from scratch to deploy exactly what you need.
      </>
    ),
  },
  {
    title: 'Share computing environments',
    imageUrl: 'img/undraw_data.svg',
    // imageUrl: 'img/undraw_collaborators.svg',
    description: (
      <>
        Share development environments and tips with other researchers at Maastricht University.
        Help improve those environments for you, and everyone in the community!
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img src={imgUrl} alt={title} style={{height: '200px'}} />
          {/* <img className={styles.featureImage} src={imgUrl} alt={title} /> */}
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const affiliationLabels: Record<string, string> = {
  icts:  'ICT Services',
  fhml:  'Faculty of Health, Medicine and Life Sciences',
  bu:    'Maastricht University',
  law:   'Faculty of Law',
  fin:   'Finance',
  sbe:   'School of Business and Economics',
  fasos: 'Faculty of Arts and Social Sciences',
  ub:    'University Library',
  fpn:   'Faculty of Psychology and Neuroscience',
  fs:    'Faculty of Science',
  fse:   'Faculty of Science and Engineering',
};

const buildBarChart  = (affiliations: Record<string, { projects: number }>) => {
  const labels: string[] = [];
  const data: number[] = [];

  const manualOffsets: Record<string, number> = {
    fasos: 1,
    law:   1,
    sbe:   1,
  };

  Object.entries(affiliations).forEach(([id, val]) => {
    labels.push(affiliationLabels[id] ?? id.toUpperCase());
    data.push(val.projects + (manualOffsets[id] ?? 0)); // account for L40S project
  });
  
  return {
    data: {
      labels,
      datasets: [{
        data,
        label: ' Projects',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)', 'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)', 'rgb(255, 159, 64)',
          'rgb(255, 205, 86)', 'rgb(75, 192, 192)',
          'rgb(54, 162, 235)', 'rgb(153, 102, 255)',
          'rgb(201, 203, 207)', 'rgb(255, 99, 132)',
          'rgb(255, 159, 64)', 'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: { 
          beginAtZero: true,
          grace: 1,
          ticks: {
            precision: 0
          }
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  };
};

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const [state, setState] = React.useState({
    stats: {} as any,
    projectsDeptChart: {} as any,
    numberOfAffiliations: 0
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);

  React.useEffect(() => {
    axios.get(apiUrl + '/stats/stats', {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res: any) => {
        updateState({
          stats : res.data,
          numberOfAffiliations: Object.keys(res.data['affiliations']).length,
          projectsDeptChart: buildBarChart(res.data['affiliations'])
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  return (
    <Layout title={`${siteConfig.title}`} description="Data Science Research Infrastructure at Maastricht University">
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
              Get Informed
            </Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <a
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              href={"https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=09acae9cdf454968bc94ad125b1f8e76&from=436967a9-738c-4112-b3f6-240a9847118e&openedFromService=true"}
              target="_blank"
              rel="noopener noreferrer">
              Get Access
            </a>
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
        { state.projectsDeptChart['data'] &&
          <Grid container alignItems="center" justifyContent="center"
              spacing={2} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Grid item xs={12}>
              <p>
                The DSRI hosts <b>{state.stats['total_projects'] + 3}</b> projects across <b>{state.numberOfAffiliations}</b> affiliations at Maastricht University.
              </p>
            </Grid>
            <Grid item xs={1} sm={3}></Grid>
            <Grid item xs={10} sm={6} style={{ textAlign: 'center' }}>
              <Typography variant='h6'>Projects per affiliation</Typography>
              <Bar 
                data={state.projectsDeptChart['data']}
                options={state.projectsDeptChart['options']}
              />
            </Grid>
            <Grid item xs={1} sm={3}></Grid>
          </Grid>
        }
      </main>
    </Layout>
  );
}

export default Home;
