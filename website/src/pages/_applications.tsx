import React from 'react';

interface App {
  name: string;
  path: string;
}

interface Category {
  title: string;
  description: string;
  apps: App[];
}

const categories: Category[] = [
  {
    title: 'Workspaces',
    description: 'Interactive development environments for data science',
    apps: [
      { name: 'Jupyter Notebooks', path: '/docs/deploy-jupyter' },
      { name: 'JupyterHub', path: '/docs/deploy-jupyterhub' },
      { name: 'RStudio', path: '/docs/deploy-rstudio' },
      { name: 'Visual Studio Code', path: '/docs/deploy-vscode' },
      { name: 'MATLAB', path: '/docs/deploy-matlab' },
      { name: 'Ubuntu VNC Desktop', path: '/docs/deploy-ubuntu-desktop' },
    ],
  },
  {
    title: 'Data & Compute',
    description: 'Tools for data storage, processing and distributed computing',
    apps: [
      { name: 'Databases', path: '/docs/deploy-database' },
      { name: 'Dask Cluster', path: '/docs/dask-cluster' },
      { name: 'MPI Jobs', path: '/docs/mpi-jobs' },
      { name: 'Filebrowser', path: '/docs/deploy-filebrowser' },
    ],
  },
  {
    title: 'Domain Specific',
    description: 'Specialized tools for specific research domains',
    apps: [
      { name: 'Neuroimaging', path: '/docs/neuroscience' },
      { name: 'Genomics', path: '/docs/catalog-genomics' },
      { name: 'Imaging Software', path: '/docs/catalog-imaging' },
    ],
  },
  {
    title: 'CI/CD & Workflows',
    description: 'Automation and workflow orchestration tools',
    apps: [
      { name: 'GitHub Runners', path: '/docs/workflows-github-actions' },
      { name: 'GitLab Runners', path: '/docs/workflows-gitlab-runner' },
      { name: 'Nextflow', path: '/docs/workflows-nextflow' },
    ],
  },
];

export default function Applications(): JSX.Element {
  return (
    <div style={{ maxWidth: 780, paddingBottom: '2rem' }}>

      <p style={{ fontSize: 14, color: 'var(--ifm-color-emphasis-700)', lineHeight: 1.7, margin: '0 0 1rem' }}>
        The DSRI provides ready-to-use workspaces and tools you can launch directly from the{' '}
        <a href="https://console-openshift-console.apps.dsri2.unimaas.nl/catalog">DSRI Catalog</a>.
        Most are OKD <strong>templates</strong> (pre-configured setups you launch with a few parameters) with persistent storage created automatically.
      </p>

      <div style={{
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: 8,
        background: 'var(--ifm-color-emphasis-100)',
        padding: '14px 16px',
        fontSize: 13,
        color: 'var(--ifm-color-emphasis-700)',
        lineHeight: 1.65,
        marginBottom: '2rem',
      }}>
        <strong style={{ color: 'var(--ifm-font-color-base)', display: 'block', marginBottom: 10 }}>
          How to launch a template
        </strong>
        <p style={{ margin: '0 0 8px' }}>
          You can find and launch templates on the DSRI in 3 ways:
        </p>
        <ul style={{ margin: '0 0 10px', paddingLeft: 18 }}>
          <li style={{ marginBottom: 6 }}>
            Open the <a href="https://console-openshift-console.apps.dsri2.unimaas.nl/catalog">DSRI Catalog</a> directly and make sure the <strong>Templates</strong> checkbox is checked.
          </li>
          <li style={{ marginBottom: 6 }}>
            In the <strong>Developer</strong> view, click <strong>+Add</strong> &rarr; <strong>Developer Catalog</strong> &rarr; <strong>All services</strong>.
          </li>
          <li>
            In your project's <strong>Topology</strong> view, click the <strong>+</strong> icon in the top left corner.
          </li>
        </ul>
        <p style={{ margin: '0 0 10px' }}>
          Once you find your template, click on it to open it. You will see a form on the left where you can fill in the parameters, and a description of the template on the right. When ready, click <strong>Instantiate</strong> to deploy it.
        </p>
        <img
          src="/img/instantiate-template.png"
          alt="Instantiate Template form in the DSRI"
          style={{ maxWidth: '100%', borderRadius: 6, border: '1px solid var(--ifm-color-emphasis-200)', marginBottom: 8 }}
        />
        <p style={{ margin: 0, fontSize: 12, color: 'var(--ifm-color-emphasis-500)' }}>
          The form includes fields such as: <strong>Namespace</strong> (your project), <strong>Application Name</strong>, <strong>Docker image</strong>, <strong>Storage size</strong> for the persistent volume that you can change to your needs, <strong>Password</strong> to access the application, and optional fields like a <strong>Git Repository</strong> to clone at startup.
        </p>
      </div>

      <p style={{ fontSize: 13, color: 'var(--ifm-color-emphasis-600)', margin: '0 0 1.5rem' }}>
        The following templates and applications are available on the DSRI. Click any of them to view the deployment instructions.
      </p>

      {categories.map(cat => (
        <div key={cat.title} style={{ marginBottom: '1.75rem' }}>
          <div style={{
            paddingBottom: 8,
            marginBottom: 4,
            borderBottom: '1px solid var(--ifm-color-emphasis-200)',
          }}>
            <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--ifm-font-color-base)', margin: '0 0 2px' }}>
              {cat.title}
            </p>
            <p style={{ fontSize: 12, color: 'var(--ifm-color-emphasis-500)', margin: 0 }}>
              {cat.description}
            </p>
          </div>

          {cat.apps.map(app => (
            <a
              key={app.name}
              href={app.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 4px',
                borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                fontSize: 13,
                color: 'var(--ifm-font-color-base)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ifm-color-primary)';
                (e.currentTarget.querySelector('.arrow') as HTMLElement).style.opacity = '1';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ifm-font-color-base)';
                (e.currentTarget.querySelector('.arrow') as HTMLElement).style.opacity = '0';
              }}
            >
              <span>{app.name}</span>
              <span className="arrow" style={{ fontSize: 13, opacity: 0, transition: 'opacity 0.15s', color: 'var(--ifm-color-primary)' }}>→</span>
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
