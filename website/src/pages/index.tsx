import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import axios from 'axios';
import styles from './styles.module.css';

import { Grid, TextField, FormControl, Box, Card, Paper, Typography } from "@mui/material";
import { Pie, Doughnut, Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-labels';

// import {Chart, ArcElement} from 'chart.js'
// Chart.register(ArcElement);
import 'chart.js/auto';

// Resolve environment variables:
declare var process : { env: { API_URL: string } }
const apiUrl: string = (process.env.API_URL as string) || 'http://localhost:8000';
// const apiUrl: string = (process.env.API_URL as string) || 'https://api.dsri.maastrichtuniversity.nl';

const features = [
  {
    title: 'Get started quickly',
    imageUrl: 'img/okd-panda.svg',
    description: (
      <>
        <a href="/docs/start-workspace">Easily deploy popular Data Science applications</a>&nbsp;
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

function Feature({ imageUrl, title, description }) {
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
  const { siteConfig = {} } = context;

  const [state, setState] = React.useState({
    stats: {},
    usersDeptPie: {},
    projectTypesPie: {},
    timelineChart: {},
    numberOfDepts: 0
  });
  const stateRef = React.useRef(state);
  // Avoid conflict when async calls
  const updateState = React.useCallback((update) => {
    stateRef.current = {...stateRef.current, ...update};
    setState(stateRef.current);
  }, [setState]);

  const pieColors = [
    '#81d4fa', // blue
    '#ffcc80', // orange
    '#a5d6a7', // green
    '#b39ddb', // purple
    '#ef5350' // red
  ]

  const buildCharts  = (stats: any) => {
    const deptUsersArray = []
    const deptLabelArray = []
    Object.keys(stats).map((dept: string) => {
      if (stats[dept]['users'] > 3) {
        deptUsersArray.push(stats[dept]['users'])
        deptLabelArray.push(dept)
      }
    })
    updateState({
      numberOfDepts: deptLabelArray.length
    })
    const config = {
      type: 'pie',
      data: {
        datasets: [{
          data: deptUsersArray,
          label: 'Users per department',
          labels: deptLabelArray,
          backgroundColor: pieColors,
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)',
          //   'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
          //   'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)',
          //   'rgba(201, 203, 207, 0.2)'
          // ],
          // borderColor: [
          //   'rgb(255, 99, 132)', 'rgb(255, 159, 64)',
          //   'rgb(255, 205, 86)', 'rgb(75, 192, 192)',
          //   'rgb(54, 162, 235)', rgb(153, 102, 255)',
          //   'rgb(201, 203, 207)'
          // ],
          // borderWidth: 1
        }],
        labels: deptLabelArray
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        animation: { animateScale: true, animateRotate: true },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(tooltipItem: any) {
                // var dataset = data.datasets[tooltipItem.datasetIndex];
                const index = tooltipItem.dataIndex;
                console.log(tooltipItem)
                const label = departmentsList.filter(dept => {
                  return dept.id === deptLabelArray[index];
                })
                console.log(label);
                return ' ' + label[0]['label']
                // return dataset.labels[index];
                // return 'toto'
              }
            }
          },
          datalabels: {
            legend: false,
            color: 'black',
            // https://github.com/chartjs/chartjs-plugin-datalabels/blob/master/docs/guide/positioning.md
            labels: {
              title: {
                anchor: 'end',
                align: 'end',
                offset: -55,
                formatter: function(value: any, context: any) {
                  return context.dataset['labels'][context['dataIndex']];
                }
              },
              value: {
                anchor: 'center',
                formatter: function(value: any, context: any) {
                  return value;
                }
              }
            },
          }
        }
      }
    };
    return config;
  }

  const departmentsList = [
    {id: 'BIGCAT', label: 'Department of Bioinformatics'},
    {id: 'DKE', label: 'Department of Knowledge Engineering'},
    {id: 'FHML', label: 'Faculty of Health, Medicine and Life Sciences'},
    {id: 'FSE', label: 'Faculty of Science and Engineering'},
    {id: 'GWFP', label: 'Gravitational Waves and Fundamental Physics'},
    {id: 'HSR', label: 'Health Services Research'},
    {id: 'ICTS', label: 'ICT Services'},
    {id: 'IDS', label: 'Institute of Data Science'},
    {id: 'MAASTRO', label: 'Maastro Clinic'},
    {id: 'MACSBIO', label: 'Maastricht Centre for Systems Biology'},
    {id: 'MSCM', label: 'Department of Marketing and Supply Chain Management'},
    {id: 'MSP', label: 'Maastricht Science Programme'},
    {id: 'NUTRIM', label: 'School of Nutrition and Translational Research in Metabolism'},
    {id: 'PHARTOX', label: 'Department of Pharmacology & Toxicology'},
    {id: 'SBE', label: 'School of Business and Economics'},
    {id: 'TECH LAB', label: 'Law and Tech Lab'},
    {id: 'TGX', label: 'Department of Toxicogenomics'},
    {id: 'PSYCHO', label: 'Faculty of Psychology and Neuroscience'},
    {id: 'UM', label: 'Maastricht University'},
    // {id: 'PN', label: '???'},
    // {id: 'Other', label: 'Other'},
  ]
  const projectTypeMap = {
    "Machine Learning on CPU (python, jupyter, matlab)": "ML on CPU",
    "Machine Learning on GPU (python, jupyter, matlab)": "ML on GPU",
    "Bioinformatics pipeline (python, conda, sequencing pipeline, workflows)": "Bioinformatics",
    "Data hosting (SQL, knowledge graph, key-value stores, data lakes)": "Database",
    "Data processing (python, java, workflows, services orchestration)": "Data processing",
    "Continuous Delivery / Integration (website deployment, jenkins, argo cd)": "Websites",
    "Bayesian Econometric models": "Econometric models",
  }

  const buildBarChart  = (projects: any) => {
    const projectsUsersArray = []
    const projectsLabelArray = []
    const projectsDescArray = []
    Object.keys(projects).map((projectType: string) => {
      if (projectType && projects[projectType]['users'] > 3) {
        projectsUsersArray.push(projects[projectType]['users'])
        // projectsLabelArray.push(projectType)
        projectsLabelArray.push(projectTypeMap[projectType])
        projectsDescArray.push(projectType)
      }
    })
    const config = {
      type: 'bar',
      data: {
        datasets: [{
          data: projectsUsersArray,
          label: ' Users',
          // labels: deptUsersArray
          // labels: projectsDescArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)', 'rgb(255, 159, 64)',
            'rgb(255, 205, 86)', 'rgb(75, 192, 192)',
            'rgb(54, 162, 235)', 'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }],
        labels: projectsLabelArray
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        // responsive: true,
        // // maintainAspectRatio: false,
        // animation: { animateScale: true, animateRotate: true },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: function(tooltipItem: any) {
                return projectsDescArray[tooltipItem[0].dataIndex];
              }
            }
          },
        }
      }
    };
    return config;
  }

  const buildTimelineChart  = (timeline: any) => {
    const daysArray = []
    const usersArray = []
    Object.keys(timeline).map((day: string) => {
      daysArray.push(day)
      // projectsLabelArray.push(projectType)
      usersArray.push(timeline[day])
    })
    const config = {
      type: 'line',
      data: {
        datasets: [{
          data: usersArray,
          label: ' Number of Users',
          // labels: deptUsersArray
          // labels: projectsDescArray,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 3
        }],
        labels: daysArray
      },
      options: {
        elements: {
          point:{
            radius: 0,
            hitRadius: 8
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
    return config;
  }


  React.useEffect(() => {
    axios.get(apiUrl + '/user/stats', 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res: any) => {
        updateState({
          stats: res.data,
          usersDeptPie: buildCharts(res.data['departments']),
          projectTypesPie: buildBarChart(res.data['projects']),
          timelineChart: buildTimelineChart(res.data['users_timeline'])
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
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('register/')}>
              {/* href="https://forms.gle/QiXzWCnTMWDiS55u7"> */}
              Get Access
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
        { state.usersDeptPie['data'] &&
          <Grid container alignItems="center" justifyContent="center"
              spacing={2} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Grid item xs={12}>
              <p>
                The DSRI is used by <b>{state.stats['users']}</b> researchers and students in <b>{state.numberOfDepts}</b> departments at Maastricht University
              </p>
            </Grid>
            <Grid item xs={1} sm={3}></Grid>
            <Grid item xs={10} sm={6} style={{ textAlign: 'right' }}>
              <Line data={state.timelineChart['data']} 
                options={state.timelineChart['options']}
              />
            </Grid>
            <Grid item xs={1} sm={3}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={11} sm={3} style={{ textAlign: 'center' }}>
              <Typography variant='h6'>
                Users per department
              </Typography>
              <Pie data={state.usersDeptPie['data']} 
                options={state.usersDeptPie['options']}
                // style={{margin: '30px'}}
                plugins={[
                  ChartDataLabels,
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={5} style={{ textAlign: 'center' }}>
              <Typography variant='h6'>
                Users per project types
              </Typography>
              <Bar data={state.projectTypesPie['data']} 
                options={state.projectTypesPie['options']}
                plugins={[
                  ChartDataLabels,
                ]}
              />
            </Grid>

          </Grid>
        }
        {/* Video img/video_dsri_introduction.webm */}
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>
            How do you deploy an application on the DSRI?
          </h1>
          {/* <video width="100%" height="100%" controls> */}
          {/* <source src="img/video_dsri_introduction.mkv" type="video/webm"/> */}
          {/* <source src="img/video_dsri_introduction.webm" type="video/webm"/> */}
          <iframe width="560" height="315"
            src="https://www.youtube.com/embed/Y0BjotH1LiE"
            title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
          </iframe>
          {/* </video> */}
        </div>
      </main>
    </Layout>
  );
}

export default Home;
