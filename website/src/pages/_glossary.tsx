import React, { useState } from 'react';

interface Term { term: string; cat: string; short: string; body: string; }

const cats = {
  Kubernetes: { color: '#378ADD', bg: '#E6F1FB', text: '#0C447C' },
  OpenShift:  { color: '#D85A30', bg: '#FAECE7', text: '#712B13' },
  Storage:    { color: '#1D9E75', bg: '#E1F5EE', text: '#085041' },
  Workload:   { color: '#7F77DD', bg: '#EEEDFE', text: '#3C3489' },
  Networking: { color: '#BA7517', bg: '#FAEEDA', text: '#633806' },
  Security:   { color: '#D4537E', bg: '#FBEAF0', text: '#72243E' },
};

const terms: Term[] = [
  { term: 'Pod', cat: 'Kubernetes', short: 'The smallest deployable unit in Kubernetes.', body: 'A pod consists of one or more containers and runs on a worker node. It is the smallest logical unit in Kubernetes.' },
  { term: 'Node', cat: 'Kubernetes', short: 'A worker machine in the cluster.', body: 'A node is a worker machine in the OpenShift Container Platform cluster.' },
  { term: 'Kubernetes', cat: 'Kubernetes', short: 'Open-source container orchestration platform.', body: 'Kubernetes (K8s) is an open-source system for automating deployment and management.' },
  { term: 'Deployment', cat: 'Workload', short: 'Declarative updates for pods.', body: 'Provides declarative updates for pods and replica sets.' },
  { term: 'Service', cat: 'Networking', short: 'Internal load balancer for pods.', body: 'Serves as an internal load balancer for pods.' },
  { term: 'Route', cat: 'Networking', short: 'Expose services via a public DNS entry.', body: 'OpenShift API object that allows exposing services via public DNS.' },
  { term: 'Secret', cat: 'Security', short: 'Holds sensitive data in the cluster.', body: 'Holds secret data like passwords and tokens.' },
  { term: 'Project', cat: 'OpenShift', short: 'Isolated namespace for users.', body: 'Allows a community of users to organize content in isolation.' },
  { term: 'OpenShift', cat: 'OpenShift', short: 'Hybrid cloud, enterprise Kubernetes platform.', body: 'Red Hat OpenShift is an enterprise Kubernetes platform.' },
  { term: 'Persistent volume claim', cat: 'Storage', short: 'Request persistent storage.', body: 'Used to request a persistent volume resource.' },
];

const allCats = [...new Set(terms.map(t => t.cat))];

export default function Glossary(): JSX.Element {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const filtered = terms.filter(t => {
    const q = query.toLowerCase();
    const matchQ = !q || t.term.toLowerCase().includes(q) || t.short.toLowerCase().includes(q);
    const matchCat = !activeTag || t.cat === activeTag;
    return matchQ && matchCat;
  });

  // Styles defined inside to ensure they are applied
  const pillStyle = (active: boolean): React.CSSProperties => ({
    display: 'inline-block',
    padding: '8px 16px',
    margin: '0 8px 8px 0',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    // FORCE colors so theme can't hide them
    background: active ? '#444444' : '#eeeeee',
    color: active ? '#ffffff' : '#444444',
    border: '1px solid #cccccc',
    listStyle: 'none',
  });

  return (
    <div style={{ padding: '1rem 0' }}>
      
      {/* Search Input */}
      <input
        type="search"
        placeholder="Search terms..."
        style={{
          width: '100%', padding: '12px', marginBottom: '20px',
          borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px'
        }}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {/* Categories using a List (ul/li) to force separation */}
      <ul style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        padding: 0, 
        margin: '0 0 20px 0', 
        listStyle: 'none' 
      }}>
        <li 
          style={pillStyle(activeTag === null)} 
          onClick={() => setActiveTag(null)}
        >
          All
        </li>
        {allCats.map(c => (
          <li 
            key={c}
            style={pillStyle(activeTag === c)} 
            onClick={() => setActiveTag(c)}
          >
            {c}
          </li>
        ))}
      </ul>

      {/* Grid of Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        {filtered.map(t => {
          const c = (cats as any)[t.cat];
          const isOpen = openTerm === t.term;
          return (
            <div 
              key={t.term} 
              onClick={() => setOpenTerm(isOpen ? null : t.term)}
              style={{
                background: 'var(--ifm-card-background-color, #fff)',
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, marginRight: 8 }} />
                  <span style={{ fontWeight: 'bold' }}>{t.term}</span>
                </div>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', background: c.bg, color: c.text }}>{t.cat}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>{t.short}</p>
              {isOpen && (
                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee', fontSize: '13px' }}>
                  {t.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}