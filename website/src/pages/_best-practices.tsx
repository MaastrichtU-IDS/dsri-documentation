import React, { useState } from 'react';

interface Tip {
  id: number;
  cat: string;
  title: string;
  body: React.ReactNode;
}

interface CatStyle {
  bg: string;
  color: string;
  label: string;
}

const cats: Record<string, CatStyle> = {
  general:       { bg: '#FCEBEB', color: '#A32D2D', label: 'General' },
  configuration: { bg: '#E6F1FB', color: '#185FA5', label: 'Configuration' },
  code:          { bg: '#EEEDFE', color: '#534AB7', label: 'Code' },
  storage:       { bg: '#FAEEDA', color: '#854F0B', label: 'Storage' },
  data:          { bg: '#E1F5EE', color: '#0F6E56', label: 'Data' },
};

const sectionLabels: Record<string, string> = {
  general:       'General',
  configuration: 'Configuration',
  code:          'Code',
  storage:       'Storage',
  data:          'Data',
};

const tips: Tip[] = [
  {
    id: 1, cat: 'general',
    title: 'Accept that any resource is temporary',
    body: 'Be prepared to start a new working environment at any time. Resources on the DSRI can be restarted, moved, or removed. If you are prepared, this will be a minor inconvenience rather than a crisis.',
  },
  {
    id: 2, cat: 'general',
    title: 'Clean up old resources regularly',
    body: 'Remove old services, routes, secrets, and deployments that you no longer need. This keeps your project tidy and helps free up shared resources for other users.',
  },
  {
    id: 3, cat: 'general',
    title: 'Use multiple projects for different research tracks',
    body: 'You can create multiple projects on the DSRI, one per research topic, dataset, or course. This keeps things organized and avoids mixing unrelated workloads.',
  },
  {
    id: 4, cat: 'general',
    title: 'Being prepared makes your research more reproducible',
    body: 'Following these best practices is not just about protecting yourself from data loss, it also makes your research more reproducible and easier to hand over to colleagues or revisit later.',
  },
  {
    id: 5, cat: 'configuration',
    title: 'Make your environment setup reproducible',
    body: 'If you spend hours or even days configuring your workspace, make sure that setup can be reproduced. Use shell scripts or similar tools to capture your setup steps, not just one-off terminal commands you will forget.',
  },
  {
    id: 6, cat: 'configuration',
    title: 'Keep configuration files in version control',
    body: <>Keep your configuration files and setup scripts in a version control system like <strong>git</strong>. This lets you rebuild your workspace from scratch at any time, and makes it easy to share your setup with teammates.</>,
  },
  {
    id: 7, cat: 'code',
    title: 'Track your code with git',
    body: "Use git to track your code development. Keep your workflow as simple as possible and agree on conventions with your team. Do not be intimidated by git's power, start with the basics and build from there.",
  },
  {
    id: 8, cat: 'storage',
    title: 'Always use a persistent volume',
    body: <>When in doubt, add a <a href="/docs/openshift-storage">persistent volume</a> to your application. Data stored on a persistent volume survives pod restarts, data stored elsewhere does not.</>,
  },
  {
    id: 9, cat: 'storage',
    title: 'Make sure you can restore your data',
    body: 'Make sure that you can restore the data from elsewhere if something should go wrong.',
  },
  {
    id: 10, cat: 'storage',
    title: 'Request only the storage size you actually need',
    body: 'Request only the storage size you actually need. You can always increase a PVC later, but the space is shared with other users.',
  },
  {
    id: 11, cat: 'data',
    title: 'Never rely on DSRI as your only copy of data',
    body: 'DSRI is a computing infrastructure, not a backup service. Always keep a safe copy of your data outside the DSRI, on your local machine, university storage, or a trusted repository.',
  },
  {
    id: 12, cat: 'data',
    title: 'Handle sensitive data responsibly',
    body: 'Sensitive or personal data must be handled in accordance with UM data management policies. If you are unsure whether your data can be processed on the DSRI, contact us before uploading it.',
  },
];

const sectionOrder = ['general', 'configuration', 'code', 'storage', 'data'];

export default function BestPractices(): JSX.Element {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const filtered = tips.filter(t => {
    const catMatch = activeFilter === 'all' || t.cat === activeFilter;
    const searchMatch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const visibleSections = sectionOrder.filter(sec => filtered.some(t => t.cat === sec));

  const toggleItem = (id: number) =>
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ maxWidth: 780, paddingBottom: '2rem' }}>
      <p style={{ fontSize: 14, color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        A set of tips to help you use the DSRI safely and efficiently. Use the search or category filter to find what you need.
      </p>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 10 }}>
        <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'var(--ifm-color-emphasis-500)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search tips..."
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

      {/* Tips grouped by section */}
      {visibleSections.map(sec => (
        <div key={sec}>
          <div style={{
            fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em',
            color: 'var(--ifm-color-emphasis-500)', margin: '1.5rem 0 8px',
            paddingBottom: 6, borderBottom: '1px solid var(--ifm-color-emphasis-200)',
          }}>
            {sectionLabels[sec]}
          </div>

          {filtered.filter(t => t.cat === sec).map(t => (
            <div
              key={t.id}
              style={{
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 8, marginBottom: 6, overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleItem(t.id)}
                style={{
                  width: '100%', background: openItems[t.id] ? 'var(--ifm-color-emphasis-100)' : 'none',
                  border: 'none', textAlign: 'left', padding: '13px 16px',
                  fontSize: 14, fontWeight: 500, color: 'var(--ifm-font-color-base)',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', gap: 12, fontFamily: 'inherit',
                }}
              >
                <span>{t.title}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 11, padding: '2px 8px', borderRadius: 999,
                    background: cats[t.cat].bg, color: cats[t.cat].color,
                    whiteSpace: 'nowrap',
                  }}>
                    {cats[t.cat].label}
                  </span>
                  <span style={{
                    fontSize: 18, color: 'var(--ifm-color-emphasis-500)',
                    transition: 'transform 0.2s', display: 'inline-block',
                    transform: openItems[t.id] ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </div>
              </button>

              {openItems[t.id] && (
                <div style={{
                  padding: '0 16px 14px', fontSize: 13,
                  color: 'var(--ifm-color-emphasis-700)', lineHeight: 1.7,
                  borderTop: '1px solid var(--ifm-color-emphasis-200)',
                }}>
                  <div style={{ marginTop: 10 }}>{t.body}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--ifm-color-emphasis-500)', padding: '2rem 0', fontSize: 14 }}>
          No tips match your search.
        </p>
      )}
    </div>
  );
}