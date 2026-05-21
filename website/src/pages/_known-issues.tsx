import React, { useState } from 'react';

interface Issue {
  id: number;
  cat: string;
  title: string;
  symptom: React.ReactNode;
  fix: React.ReactNode;
}

interface CatStyle {
  bg: string;
  color: string;
  label: string;
}

const cats: Record<string, CatStyle> = {
  storage:    { bg: '#FAEEDA', color: '#854F0B', label: 'Storage' },
  gpu:        { bg: '#EEEDFE', color: '#534AB7', label: 'GPU' },
  access:     { bg: '#E6F1FB', color: '#185FA5', label: 'Access' },
  deployment: { bg: '#E1F5EE', color: '#0F6E56', label: 'Deployment' },
};

const sectionLabels: Record<string, string> = {
  storage:    'Storage',
  gpu:        'GPU',
  access:     'Access',
  deployment: 'Deployment',
};

const issues: Issue[] = [
  {
    id: 1, cat: 'storage',
    title: 'Cannot access data in the persistent folder',
    symptom: 'You can no longer access data you previously stored in the persistent folder of your container. This can happen when a node goes down and the persistent volume your pod is connected to becomes unreachable.',
    fix: <>
      <p style={{ margin: '0 0 8px' }}>Restart the pod to make it reconnect to an available node:</p>
      <ol style={{ margin: '0', paddingLeft: 18 }}>
        <li style={{ marginBottom: 4 }}>Go to <strong>Topology</strong> and click on your application.</li>
        <li style={{ marginBottom: 4 }}>Go to the <strong>Details</strong> tab.</li>
        <li style={{ marginBottom: 4 }}>Decrease the pod count to <code>0</code>, then set it back to <code>1</code>.</li>
      </ol>
    </>,
  },
  {
    id: 2, cat: 'storage',
    title: 'Large volume - pod or deployment will not start',
    symptom: <>You see an error in the <strong>Events</strong> tab similar to:
      <pre style={{ margin: '8px 0 0', padding: '10px 12px', background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, fontSize: 12, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {`Error: kubelet may be retrying requests that are timing out in CRI-O due to system load. Currently at stage container volume configuration: context deadline exceeded: error reserving ctr name`}
      </pre>
      <p style={{ margin: '8px 0 0' }}>This occurs when using a large persistent volume.</p>
    </>,
    fix: <>
      <p style={{ margin: '0 0 8px' }}>Add the following annotation to your Deployment(Config). Pay attention to indentation:</p>
      <pre style={{ margin: '0 0 8px', padding: '10px 12px', background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, fontSize: 12, overflowX: 'auto' }}>
{`spec:
  template:
    metadata:
      annotations:
        io.kubernetes.cri-o.TrySkipVolumeSELinuxLabel: 'true'
    spec:
      runtimeClassName: selinux`}
      </pre>
      <p style={{ margin: '0' }}>Take note of the <strong>indentation</strong> and the place in the file.</p>
    </>,
  },
  {
    id: 3, cat: 'storage',
    title: 'Filebrowser 403 Forbidden',
    symptom: <>
      <p style={{ margin: '0 0 8px' }}>You get a <code>403 Forbidden</code> error when trying to upload files, create folders, or manage files in the Filebrowser.</p>
      <img src="/img/forbidden-issue.png" alt="Forbidden Issue" style={{ maxWidth: '100%', borderRadius: 6, border: '1px solid var(--ifm-color-emphasis-200)' }} />
    </>,
    fix: <>
      <p style={{ margin: '0 0 8px' }}>This happens when you are not using persistent storage. Make sure your application has a persistent volume attached.</p>
      <img src="/img/persistent_storage.png" alt="Persistent storage" style={{ maxWidth: '100%', borderRadius: 6, border: '1px solid var(--ifm-color-emphasis-200)' }} />
      <p style={{ margin: '8px 0 0' }}>Contact the RCS team to request persistent storage if you do not have one yet.</p>
    </>,
  },
  {
    id: 4, cat: 'deployment',
    title: 'DockerHub pull rate limit exceeded',
    symptom: <>
      <p style={{ margin: '0 0 8px' }}>In the <strong>Events</strong> tab you see a timeout error. Then check for the application ImageStream in <strong>Build &gt; Images</strong>, where you might see:</p>
      <pre style={{ margin: '0', padding: '10px 12px', background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, fontSize: 12, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {`Internal error occurred: toomanyrequests: You have reached your pull rate limit.\nYou may increase the limit by authenticating and upgrading: https://www.docker.com/increase-rate-limit`}
      </pre>
    </>,
    fix: <>
      <p style={{ margin: '0 0 8px' }}>Create a DockerHub login secret in your project:</p>
      <pre style={{ margin: '0 0 8px', padding: '10px 12px', background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, fontSize: 12, overflowX: 'auto' }}>
{`oc create secret docker-registry dockerhub-login \\
  --docker-server=docker.io \\
  --docker-username=dockerhub_username \\
  --docker-password=dockerhub_password \\
  --docker-email=example@mail.com`}
      </pre>
      <p style={{ margin: '0 0 8px' }}>Link the login secret to the default service account:</p>
      <pre style={{ margin: '0 0 8px', padding: '10px 12px', background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, fontSize: 12, overflowX: 'auto' }}>
{`oc secrets link default dockerhub-login --for=pull`}
      </pre>
      <p style={{ margin: '0' }}>To permanently avoid this issue, consider publishing the image to the <a href="/docs/guide-publish-image">GitHub Container Registry</a> instead.</p>
    </>,
  },
  {
    id: 5, cat: 'deployment',
    title: 'Process stops when terminal disconnects',
    symptom: 'You start a long-running command in the container terminal. At some point a red "disconnected" label appears, the terminal stops, and your process never finishes. This is because the process is attached to your terminal session.',
    fix: <>
      <p style={{ margin: '0 0 8px' }}>Use <code>nohup</code> and <code>&</code> to run the command in the background. Output will be saved to <code>nohup.out</code>:</p>
      <pre style={{ margin: '0 0 8px', padding: '10px 12px', background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, fontSize: 12, overflowX: 'auto' }}>
{`nohup your-command --your-args &`}
      </pre>
      <p style={{ margin: '0 0 8px' }}>To check if the process is still running:</p>
      <pre style={{ margin: '0 0 8px', padding: '10px 12px', background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, fontSize: 12, overflowX: 'auto' }}>
{`ps aux | grep your-command`}
      </pre>
      <p style={{ margin: '0' }}>Make sure your terminal is using <code>bash</code> and not <code>sh</code>. Type <code>bash</code> in the terminal to switch if needed.</p>
    </>,
  },
  {
    id: 6, cat: 'access',
    title: 'Black screen or auth error after clicking Connect via UM account',
    symptom: <>
      <p style={{ margin: '0 0 8px' }}>After clicking "Connect via UM account", you see a black screen and the page does not load. The URL may contain something like:</p>
      <pre style={{ margin: '0 0 8px', padding: '10px 12px', background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, fontSize: 12, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {`/auth/error?error=missing_state&error_type=auth`}
      </pre>
      <p style={{ margin: '0 0 8px' }}>This persists even after disconnecting and reconnecting the VPN.</p>
      <img src="/img/console-auth-error.png" alt="Console authentication error - black screen with missing_state error in URL" style={{ maxWidth: '100%', borderRadius: 6, border: '1px solid var(--ifm-color-emphasis-200)' }} />
    </>,
    fix: <>
      <p style={{ margin: '0 0 8px' }}>This is most likely caused by a <strong>cached authentication token</strong> in your browser. Try the following steps in order:</p>
      <ol style={{ margin: '0 0 8px', paddingLeft: 18 }}>
        <li style={{ marginBottom: 4 }}>Make sure you are connected to the <strong>UM VPN</strong>. DSRI is only accessible from within the university network.</li>
        <li style={{ marginBottom: 4 }}>Disconnect and reconnect the VPN, then try again.</li>
        <li style={{ marginBottom: 4 }}>Open the DSRI link in an <strong>incognito or private window</strong>.</li>
        <li style={{ marginBottom: 4 }}>Try a <strong>different browser</strong>.</li>
        <li style={{ marginBottom: 4 }}><strong>Clear your browser cookies and cache</strong> for the DSRI site, then try again with the original link.</li>
        <li>If you see the <code>missing_state</code> error in the URL, try removing that part from the URL and accessing the base URL directly.</li>
      </ol>
      <p style={{ margin: '0' }}>If none of the above works, <a href="/contact">contact the RCS team</a> and include a screenshot and the exact URL you are trying to access.</p>
    </>,
  },
  {
    id: 7, cat: 'access',
    title: 'Git authentication failed after password change',
    symptom: <>
      <p style={{ margin: '0 0 8px' }}>You see this error when running git commands:</p>
      <pre style={{ margin: '0 0 8px', padding: '10px 12px', background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, fontSize: 12, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {`remote: HTTP Basic: Access denied\nfatal: Authentication failed`}
      </pre>
      <p style={{ margin: '0' }}>This typically happens after a forced Windows password change.</p>
    </>,
    fix: <>
      <p style={{ margin: '0 0 4px' }}><strong>Windows — option 1:</strong></p>
      <ol style={{ margin: '0 0 12px', paddingLeft: 18 }}>
        <li style={{ marginBottom: 4 }}>Open PowerShell <strong>as administrator</strong> and run:<br/><code>git config --system --unset credential.helper</code></li>
        <li style={{ marginBottom: 4 }}>Remove the <strong>gitconfig</strong> file from <code>C:\Program Files\Git\mingw64\etc\</code></li>
        <li>Run <code>git pull</code> or <code>git push</code> — it will prompt for your credentials again.</li>
      </ol>
      <p style={{ margin: '0 0 4px' }}><strong>Windows — option 2 (Credential Manager):</strong></p>
      <ol style={{ margin: '0 0 12px', paddingLeft: 18 }}>
        <li style={{ marginBottom: 4 }}>Press the Windows key and type <strong>credential</strong>, or run <code>control /name Microsoft.CredentialManager</code> (WIN+R).</li>
        <li>Find the git entry under <strong>Windows Credentials</strong> and update the password.</li>
      </ol>
      <p style={{ margin: '0 0 4px' }}><strong>Mac:</strong></p>
      <ol style={{ margin: '0', paddingLeft: 18 }}>
        <li style={{ marginBottom: 4 }}>Press <code>cmd+space</code> and open <strong>Keychain Access</strong>.</li>
        <li style={{ marginBottom: 4 }}>Find the key named like <code>gitlab.*.com Access Key for user</code>. Sort by date modified to find it easily.</li>
        <li>Right click and delete it, then try your git command again.</li>
      </ol>
    </>,
  },
  {
    id: 8, cat: 'gpu',
    title: 'GPU not working or not enabled in pod',
    symptom: 'Your pod starts but the GPU is not available or not recognized inside the container.',
    fix: <>
      <p style={{ margin: '0 0 8px' }}>Check the following:</p>
      <ul style={{ margin: '0', paddingLeft: 18 }}>
        <li style={{ marginBottom: 4 }}>Make sure you have booked a GPU slot via the <a href="/gpu-booking">GPU booking calendar</a> before starting your pod.</li>
        <li style={{ marginBottom: 4 }}>Make sure your deployment has the correct GPU resource limits set.</li>
        <li>If the GPU was available before and stopped working after a pod restart, try scaling your pod down to 0 and back up to 1.</li>
      </ul>
    </>,
  },
  {
    id: 9, cat: 'gpu',
    title: 'GPU quota reached',
    symptom: 'You cannot start a GPU-enabled pod and see a quota error, or your GPU booking is not reflected in your pod.',
    fix: 'GPU resources are shared and limited. If you have reached your quota, contact the RCS team to discuss your needs. Make sure to release GPU resources when you are not actively using them.',
  },
];

const sectionOrder = ['storage', 'access', 'gpu', 'deployment'];

export default function KnownIssues(): JSX.Element {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const filtered = issues.filter(i => {
    const catMatch = activeFilter === 'all' || i.cat === activeFilter;
    const searchMatch = !search || i.title.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const visibleSections = sectionOrder.filter(sec => filtered.some(i => i.cat === sec));

  const toggleItem = (id: number) =>
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ maxWidth: 780, paddingBottom: '2rem' }}>
      <p style={{ fontSize: 14, color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        A list of known issues and how to resolve them. Use the search or category filter to find what you need. If your issue is not listed here, <a href="/contact">contact the RCS team</a>.
      </p>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 10 }}>
        <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'var(--ifm-color-emphasis-500)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', boxSizing: 'border-box', padding: '8px 12px 8px 34px',
            fontSize: 13, borderRadius: 8, border: '1px solid var(--ifm-color-emphasis-300)',
            background: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)',
            fontFamily: 'inherit', outline: 'none',
          }}
        />
      </div>

      {/* Filter dropdown */}
      <select
        style={{
          marginBottom: '1.25rem',
          padding: '8px 12px',
          borderRadius: 8,
          border: '1px solid var(--ifm-color-emphasis-300)',
          fontSize: 14,
          cursor: 'pointer',
          background: 'var(--ifm-background-color)',
          color: 'var(--ifm-font-color-base)',
          fontFamily: 'inherit',
        }}
        value={activeFilter}
        onChange={e => setActiveFilter(e.target.value)}
      >
        <option value="all">All categories</option>
        {sectionOrder.map(k => (
          <option key={k} value={k}>{sectionLabels[k]}</option>
        ))}
      </select>

      {/* Issues grouped by section */}
      {visibleSections.map(sec => (
        <div key={sec}>
          <div style={{
            fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em',
            color: 'var(--ifm-color-emphasis-500)', margin: '1.5rem 0 8px',
            paddingBottom: 6, borderBottom: '1px solid var(--ifm-color-emphasis-200)',
          }}>
            {sectionLabels[sec]}
          </div>

          {filtered.filter(i => i.cat === sec).map(issue => (
            <div
              key={issue.id}
              style={{
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 8, marginBottom: 6, overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleItem(issue.id)}
                style={{
                  width: '100%', background: openItems[issue.id] ? 'var(--ifm-color-emphasis-100)' : 'none',
                  border: 'none', textAlign: 'left', padding: '13px 16px',
                  fontSize: 14, fontWeight: 500, color: 'var(--ifm-font-color-base)',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', gap: 12, fontFamily: 'inherit',
                }}
              >
                <span>{issue.title}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 11, padding: '2px 8px', borderRadius: 999,
                    background: cats[issue.cat].bg, color: cats[issue.cat].color,
                    whiteSpace: 'nowrap',
                  }}>
                    {cats[issue.cat].label}
                  </span>
                  <span style={{
                    fontSize: 18, color: 'var(--ifm-color-emphasis-500)',
                    transition: 'transform 0.2s', display: 'inline-block',
                    transform: openItems[issue.id] ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </div>
              </button>

              {openItems[issue.id] && (
                <div style={{
                  padding: '0 16px 16px', fontSize: 13,
                  color: 'var(--ifm-color-emphasis-700)', lineHeight: 1.7,
                  borderTop: '1px solid var(--ifm-color-emphasis-200)',
                }}>
                  {/* Symptom */}
                  <div style={{ marginTop: 12, marginBottom: 12 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: 'var(--ifm-color-emphasis-500)',
                    }}>Symptom</span>
                    <div style={{ marginTop: 6 }}>{issue.symptom}</div>
                  </div>
                  {/* Fix */}
                  <div style={{
                    borderTop: '1px solid var(--ifm-color-emphasis-200)',
                    paddingTop: 12,
                  }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: 'var(--ifm-color-emphasis-500)',
                    }}>Fix</span>
                    <div style={{ marginTop: 6 }}>{issue.fix}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--ifm-color-emphasis-500)', padding: '2rem 0', fontSize: 14 }}>
          No issues match your search.
        </p>
      )}
    </div>
  );
}
