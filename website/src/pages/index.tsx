import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import axios from 'axios';
import styles from './styles.module.css';

import { Grid, TextField, FormControl, Box, Card, Paper } from "@mui/material";
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-labels';

// import {Chart, ArcElement} from 'chart.js'
// Chart.register(ArcElement);
import 'chart.js/auto';

// Resolve environment variables:
declare var process : { env: { API_URL: string } }
const apiUrl: string = (process.env.API_URL as string) || 'http://localhost:8000';
// const apiUrl: string = (process.env.API_URL as string) || 'https://api.dsri.semanticscience.org';

const features = [
  {
    title: 'Get started quickly',
    imageUrl: 'img/okd-panda.svg',
    description: (
      <>
        <a href="/dsri-documentation/docs/start-workspace">Easily deploy popular Data Science applications</a>&nbsp;
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
    projectTypesPie: {}
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
    Object.keys(stats).map((dept: string) => {
      deptUsersArray.push(stats[dept]['users'])
    })
    const config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: deptUsersArray,
          backgroundColor: pieColors,
          label: 'Users per department',
          // labels: deptUsersArray
          labels: Object.keys(stats)
        }],
        labels: Object.keys(stats)
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        animation: { animateScale: true, animateRotate: true },
        tooltips: {
          // callbacks: {
          //   label: function(item, data) {
          //       console.log(data.datasets[item.datasetIndex])
          //       return data.datasets[item.datasetIndex].label+ ": "+ data.labels[item.index]+ ": "+ data.datasets[item.datasetIndex].data[item.index];
          //   }
          // }
          callbacks: {
            label: function(tooltipItem: any, data: any) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var index = tooltipItem.index;
              return dataset.labels[index];
            }
          }
        },
        plugins: {
          legend: { display: false },
          // labels: [
          //   {
          //     render: 'label',
          //     position: 'outside'
          //   },
          //   {
          //     render: 'value'
          //   }
          // ],
          datalabels: {
            legend: false,
            color: 'black',
            // https://github.com/chartjs/chartjs-plugin-datalabels/blob/master/docs/guide/positioning.md
            labels: {
              title: {
                anchor: 'end',
                // offset: '-10',
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
            // formatter: function(value: any, context: any) {
            //   // return value + ' from ' + context.dataset['labels'][context['dataIndex']];
            //   // return context.dataset['labels'][context['dataIndex']];
            //   return value;
            // }
            // formatter: function(value: any, context: any) {
            //   if (context.datasetIndex == 0) {
            //     context.font = "bold 20em Montserrat";
            //     return context.dataset.labels[context.dataIndex];
            //   } else {
            //     return context.dataset.labels[context.dataIndex];
            //   }
            // }
          }
        }
      }
    };
    return config;
  }


  const buildBarChart  = (projects: any) => {
    const projectsUsersArray = []
    Object.keys(projects).map((dept: string) => {
      projectsUsersArray.push(projects[dept]['users'])
    })
    const config = {
      type: 'bar',
      data: {
        datasets: [{
          data: projectsUsersArray,
          // backgroundColor: pieColors,
          label: 'Users per project type',
          // labels: deptUsersArray
          labels: Object.keys(projects),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }],
        labels: Object.keys(projects)
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
        // responsive: true,
        // // maintainAspectRatio: false,
        // animation: { animateScale: true, animateRotate: true },
        // tooltips: {
        //   // callbacks: {
        //   //   label: function(item, data) {
        //   //       console.log(data.datasets[item.datasetIndex])
        //   //       return data.datasets[item.datasetIndex].label+ ": "+ data.labels[item.index]+ ": "+ data.datasets[item.datasetIndex].data[item.index];
        //   //   }
        //   // }
        //   callbacks: {
        //     label: function(tooltipItem: any, data: any) {
        //       var dataset = data.datasets[tooltipItem.datasetIndex];
        //       var index = tooltipItem.index;
        //       return dataset.labels[index];
        //     }
        //   }
        // },
        // plugins: {
        //   legend: { display: false },
        //   // labels: [
        //   //   {
        //   //     render: 'label',
        //   //     position: 'outside'
        //   //   },
        //   //   {
        //   //     render: 'value'
        //   //   }
        //   // ],
        //   datalabels: {
        //     legend: false,
        //     color: 'black',
        //     // https://github.com/chartjs/chartjs-plugin-datalabels/blob/master/docs/guide/positioning.md
        //     labels: {
        //       title: {
        //         anchor: 'end',
        //         // offset: '-10',
        //         formatter: function(value: any, context: any) {
        //           return context.dataset['labels'][context['dataIndex']];
        //         }
        //       },
        //       value: {
        //         anchor: 'center',
        //         formatter: function(value: any, context: any) {
        //           return value;
        //         }
        //       }
        //     },
        //     // formatter: function(value: any, context: any) {
        //     //   // return value + ' from ' + context.dataset['labels'][context['dataIndex']];
        //     //   // return context.dataset['labels'][context['dataIndex']];
        //     //   return value;
        //     // }
        //     // formatter: function(value: any, context: any) {
        //     //   if (context.datasetIndex == 0) {
        //     //     context.font = "bold 20em Montserrat";
        //     //     return context.dataset.labels[context.dataIndex];
        //     //   } else {
        //     //     return context.dataset.labels[context.dataIndex];
        //     //   }
        //     // }
        //   }
        // }
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
          projectTypesPie: buildBarChart(res.data['projects'])
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
              // to={useBaseUrl('register/')}>
              href="https://forms.gle/QiXzWCnTMWDiS55u7">
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
          <Grid container spacing={2} style={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <p>
                The DSRI is used by <b>{state.stats['users']}</b> researchers and students in <b>{Object.keys(state.stats['departments']).length}</b> departments at Maastricht University
              </p>
            </Grid>
            {/* <Grid item xs={2}></Grid>
            <Grid item xs={4} style={{ textAlign: 'right' }}>
              <Pie data={state.usersDeptPie['data']} 
                options={state.usersDeptPie['options']}
                // style={{margin: '30px'}}
                plugins={[
                  ChartDataLabels,
                  // {
                  //   beforeDraw: function(chart: any) {
                  //     var width = chart.chart.width,
                  //         height = chart.chart.height,
                  //         ctx = chart.chart.ctx;
                  //     ctx.restore();
                  //     var fontSize = (height / 114).toFixed(2);
                  //     ctx.font = fontSize + "em sans-serif";
                  //     ctx.textBaseline = "middle";
                  //     var text = Math.round(Objects.keys(state.stats['departments'])),
                  //         textX = Math.round((width - ctx.measureText(text).width) / 2),
                  //         textY = height / 2;
                  //     ctx.fillText(text, textX, textY);
                  //     ctx.save();
                  //   }
                  // }
                ]}
              />
            </Grid>
            <Grid item xs={4} style={{ textAlign: 'left' }}>
              <Bar data={state.projectTypesPie['data']} 
                options={state.projectTypesPie['options']}
                // style={{maxWidth: '800px'}}
                plugins={[
                  ChartDataLabels,
                ]}
              />
            </Grid> */}

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





