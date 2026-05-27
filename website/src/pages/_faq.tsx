import React, { useState } from 'react';

interface FaqItem {
  id: number;
  cat: string;
  q: string;
  a: React.ReactNode;
}

interface CatStyle {
  bg: string;
  color: string;
  label: string;
}

const cats: Record<string, CatStyle> = {
  access:    { bg: '#E6F1FB', color: '#185FA5', label: 'Access' },
  projects:  { bg: '#E1F5EE', color: '#0F6E56', label: 'Projects' },
  storage:   { bg: '#FAEEDA', color: '#854F0B', label: 'Storage & data' },
  resources: { bg: '#EEEDFE', color: '#534AB7', label: 'Resources' },
  slurm:     { bg: '#FAECE7', color: '#993C1D', label: 'DSRI vs. SLURM' },
};

const sectionLabels: Record<string, string> = {
  access:    'Access',
  projects:  'Projects',
  storage:   'Storage & data',
  resources: 'Resources & environment',
  slurm:     'DSRI vs. SLURM',
};

const faqs: FaqItem[] = [
  {
    id: 1, cat: 'access',
    q: 'How do I get access to the DSRI?',
    a: <>You can request an account via the <a href="https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=09acae9cdf454968bc94ad125b1f8e76&from=436967a9-738c-4112-b3f6-240a9847118e&openedFromService=true">ICTS service desk</a>. Once your account is active, follow the <a href="/docs/access-and-use-dsri">accessing and using the DSRI</a> page to get started.</>,
  },
  {
    id: 2, cat: 'access',
    q: 'Can I access the DSRI from outside the university network?',
    a: <>Yes, but you need to connect via the <a href="https://vpn.maastrichtuniversity.nl/">UM VPN</a> first. Without VPN, the DSRI is not reachable from outside the university network.</>,
  },
  {
    id: 3, cat: 'access',
    q: 'Can external collaborators access the DSRI?',
    a: <>Unfortunately, the DSRI is only accessible to people working at Maastricht University. Access requires a UM account with an email ending in <code>@maastrichtuniversity.nl</code> or <code>@student.maastrichtuniversity.nl</code>, and an active connection to the UM VPN. Collaborators based at other institutions will therefore not be able to reach the DSRI.</>,
  },
  {
    id: 4, cat: 'access',
    q: 'Can multiple users work in the same project?',
    a: <>Yes. Multiple users can be added to the same project. See <a href="/docs/manage-access-project">managing access to your project</a> for instructions.</>,
  },
  {
    id: 5, cat: 'projects',
    q: 'How long does a project stay active?',
    a: 'Projects may be deleted after a period of inactivity or at the end of a course. Make sure to back up your data and code before that happens.',
  },
  {
    id: 6, cat: 'projects',
    q: 'Can I rename or transfer a project?',
    a: <>No, projects cannot be renamed or transferred. If needed, we can create a new project and help you migrate your work. <a href="/contact">Contact us</a> to arrange this.</>,
  },
  {
    id: 7, cat: 'projects',
    q: 'My project is deleted and gone. Can you restore it?',
    a: <>DSRI does not keep backups of projects. To be resilient in case of unexpected events, follow the <a href="/docs/best-practices">best practices</a>. That way, your code and configuration can be re-installed swiftly.</>,
  },
  {
    id: 8, cat: 'storage',
    q: 'Can I store data persistently?',
    a: <>Yes. Data and code can be stored on persistent volumes, which remain available when pods or applications are restarted. See <a href="/docs/openshift-storage">add a persistent volume</a> for instructions.<br/><br/>A backup is still always necessary, as illustrated on the <a href="/docs/best-practices">best practices</a> page.</>,
  },
  {
    id: 9, cat: 'storage',
    q: 'Can I extend a persistent volume?',
    a: 'Yes. You can always increase the size of a persistent volume, but you cannot decrease it.',
  },
  {
    id: 10, cat: 'storage',
    q: 'I accidentally deleted something. Can you restore it?',
    a: 'DSRI does not provide an automatic backup service. If something was deleted from storage, it is gone. Make sure your data is stored in more than one place so you can recover from human or technical error.',
  },
  {
    id: 11, cat: 'storage',
    q: 'What happens when I restart my application?',
    a: 'Your application will restart, but only data stored on persistent volumes will remain. Anything stored outside a persistent volume will be lost.',
  },
  {
    id: 12, cat: 'resources',
    q: 'Are resources shared with other users?',
    a: 'Yes. DSRI is a shared environment, so resource availability can vary depending on demand. Try to use only the resources your workload actually needs.',
  },
  {
    id: 13, cat: 'resources',
    q: 'Can I use the DSRI portal with any browser?',
    a: 'We test the portal with Firefox and Chrome. Other browsers may work but unexpected behavior is possible.',
  },
  {
    id: 14, cat: 'slurm',
    q: 'How is the DSRI different from SLURM?',
    a: <>
      <p style={{ margin: '0 0 8px' }}>DSRI and SLURM are both research computing platforms but they serve different purposes:</p>
      <ul style={{ margin: '0 0 8px', paddingLeft: 18 }}>
        <li style={{ marginBottom: 4 }}><strong>DSRI</strong> is built on Kubernetes and designed for interactive workspaces and services (JupyterLab, RStudio, VSCode, databases). Best for exploratory data science and long-running services.</li>
        <li><strong>SLURM</strong> is a job scheduler for HPC batch computing. Best for highly parallelized computations that need to run across many nodes.</li>
      </ul>
    </>,
  },
];

const sectionOrder = ['access', 'projects', 'storage', 'resources', 'slurm'];

export default function FAQ(): JSX.Element {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const filtered = faqs.filter(f => {
    const catMatch = activeFilter === 'all' || f.cat === activeFilter;
    const searchMatch = !search || f.q.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const visibleSections = sectionOrder.filter(sec => filtered.some(f => f.cat === sec));

  const toggleItem = (id: number) =>
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ maxWidth: 780, paddingBottom: '2rem' }}>
      <p style={{ fontSize: 14, color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Answers to common questions about using the DSRI. Use the search or category filters to find what you need.
      </p>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 10 }}>
        <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'var(--ifm-color-emphasis-500)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search questions..."
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

      {/* FAQ sections */}
      {visibleSections.map(sec => (
        <div key={sec}>
          <div style={{
            fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em',
            color: 'var(--ifm-color-emphasis-500)', margin: '1.5rem 0 8px',
            paddingBottom: 6, borderBottom: '1px solid var(--ifm-color-emphasis-200)',
          }}>
            {sectionLabels[sec]}
          </div>

          {filtered.filter(f => f.cat === sec).map(f => (
            <div
              key={f.id}
              style={{
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 8, marginBottom: 6, overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleItem(f.id)}
                style={{
                  width: '100%', background: openItems[f.id] ? 'var(--ifm-color-emphasis-100)' : 'none',
                  border: 'none', textAlign: 'left', padding: '13px 16px',
                  fontSize: 14, fontWeight: 500, color: 'var(--ifm-font-color-base)',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', gap: 12, fontFamily: 'inherit',
                }}
              >
                <span>{f.q}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 11, padding: '2px 8px', borderRadius: 999,
                    background: cats[f.cat].bg, color: cats[f.cat].color,
                    whiteSpace: 'nowrap',
                  }}>
                    {cats[f.cat].label}
                  </span>
                  <span style={{
                    fontSize: 18, color: 'var(--ifm-color-emphasis-500)',
                    transition: 'transform 0.2s', display: 'inline-block',
                    transform: openItems[f.id] ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </div>
              </button>

              {openItems[f.id] && (
                <div style={{
                  padding: '0 16px 14px', fontSize: 13,
                  color: 'var(--ifm-color-emphasis-700)', lineHeight: 1.7,
                  borderTop: '1px solid var(--ifm-color-emphasis-200)',
                }}>
                  <div style={{ marginTop: 10 }}>{f.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--ifm-color-emphasis-500)', padding: '2rem 0', fontSize: 14 }}>
          No questions match your search.
        </p>
      )}
    </div>
  );
}
