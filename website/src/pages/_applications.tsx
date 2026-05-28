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
    <div style={{ paddingBottom: '2rem' }}>

      <p style={{ fontSize: 'var(--ifm-font-size-base)', color: 'var(--ifm-font-color-base)', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
        The DSRI provides ready-to-use workspaces and tools you can launch directly from the{' '}
        <a href="https://console-openshift-console.apps.dsri2.unimaas.nl/catalog" style={{fontWeight: 600}}>DSRI Catalog</a>.
        Most are OKD <strong>templates</strong> (pre-configured setups you launch with a few parameters) with persistent storage created automatically.
      </p>

      {/* Info Box */}
      <div style={{
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: 8,
        background: 'var(--ifm-color-emphasis-100)',
        padding: '24px',
        color: 'var(--ifm-font-color-base)', 
        lineHeight: 1.65,
        marginBottom: '2.5rem',
      }}>
        <strong style={{ color: 'var(--ifm-font-color-base)', display: 'block', marginBottom: 10, fontSize: '1.1rem' }}>
          How to launch a template
        </strong>
        <p style={{ margin: '0 0 8px' }}>
          You can find and launch templates on the DSRI in 3 ways:
        </p>
        <ul style={{ margin: '0 0 12px', paddingLeft: 18 }}>
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
        <p style={{ margin: '0 0 15px' }}>
          Once you find your template, click on it to open it. You will see a form on the left where you can fill in the parameters. When ready, click <strong>Instantiate</strong> to deploy it.
        </p>
        
        {/* IMAGE SECTION - CLEAN WITHOUT DOTS */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            display: 'inline-block',
            width: '100%'
          }}>
            <img
              src="/img/instantiate-template.png"
              alt="Instantiate Template form"
              style={{ 
                width: '100%', 
                display: 'block',
                cursor: 'zoom-in'
              }}
            />
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--ifm-font-color-base)', marginTop: 8, fontStyle: 'italic' }}>
            🔍 Click on the image to zoom in and see details
          </p>
        </div>
        
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ifm-font-color-base)', borderTop: '1px solid var(--ifm-color-emphasis-300)', paddingTop: '10px' }}>
          The form includes fields such as: <strong>Namespace</strong>, <strong>Application Name</strong>, <strong>Docker image</strong>, <strong>Storage size</strong>, and <strong>Password</strong>.
        </p>
      </div>

      <p style={{ fontSize: 'inherit', color: 'var(--ifm-font-color-base)', margin: '0 0 1.5rem', fontWeight: '600' }}>
        The following templates and applications are available on the DSRI:
      </p>

      {categories.map(cat => (
        <div key={cat.title} style={{ marginBottom: '2rem' }}>
          <div style={{
            paddingBottom: 8,
            marginBottom: 4,
            borderBottom: '2px solid var(--ifm-color-emphasis-200)',
          }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ifm-font-color-base)', margin: '0 0 2px' }}>
              {cat.title}
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--ifm-font-color-base)', opacity: 0.9, margin: 0 }}>
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
                padding: '12px 6px',
                borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                fontSize: 'inherit',
                color: 'var(--ifm-font-color-base)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ifm-color-primary)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--ifm-color-emphasis-100)';
                (e.currentTarget.querySelector('.arrow') as HTMLElement).style.opacity = '1';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ifm-font-color-base)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget.querySelector('.arrow') as HTMLElement).style.opacity = '0';
              }}
            >
              <span style={{ fontWeight: 500 }}>{app.name}</span>
              <span className="arrow" style={{ fontSize: 'inherit', opacity: 0, transition: 'opacity 0.15s', color: 'var(--ifm-color-primary)' }}>→</span>
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}