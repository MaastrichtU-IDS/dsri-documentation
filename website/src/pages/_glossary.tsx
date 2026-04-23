import React, { useState } from 'react';

interface Term {
  term: string;
  cat: string;
  short: string;
  body: string;
}

interface CatStyle {
  color: string;
  bg: string;
  text: string;
}

const cats: Record<string, CatStyle> = {
  Kubernetes: { color: '#378ADD', bg: '#E6F1FB', text: '#0C447C' },
  OpenShift:  { color: '#D85A30', bg: '#FAECE7', text: '#712B13' },
  Storage:    { color: '#1D9E75', bg: '#E1F5EE', text: '#085041' },
  Workload:   { color: '#7F77DD', bg: '#EEEDFE', text: '#3C3489' },
  Networking: { color: '#BA7517', bg: '#FAEEDA', text: '#633806' },
  Security:   { color: '#D4537E', bg: '#FBEAF0', text: '#72243E' },
};

const terms: Term[] = [
  {
    term: 'Pod', cat: 'Kubernetes',
    short: 'The smallest deployable unit in Kubernetes.',
    body: 'A pod consists of one or more containers and runs on a worker node. It is the smallest logical unit in Kubernetes.',
  },
  {
    term: 'Node', cat: 'Kubernetes',
    short: 'A worker machine in the cluster.',
    body: 'A node is a worker machine in the OpenShift Container Platform cluster. It is either a virtual machine (VM) or a physical machine.',
  },
  {
    term: 'Kubernetes', cat: 'Kubernetes',
    short: 'Open-source container orchestration platform.',
    body: 'Kubernetes (also known as K8s) is a portable, extensible, open-source platform for managing containerized workloads and services. It facilitates declarative configuration and automation, with a large, rapidly growing ecosystem. <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">kubernetes.io ↗</a>',
  },
  {
    term: 'Deployment', cat: 'Workload',
    short: 'Declarative updates for pods and replica sets.',
    body: '<strong>Deployment</strong> — a Kubernetes-native object that provides declarative updates for pods and replica sets.<br/><br/><strong>DeploymentConfig</strong> — an OpenShift-specific object that defines the template for a pod and manages deploying new images or configuration changes. Uses replication controllers. Predates Kubernetes Deployment objects.',
  },
  {
    term: 'Service', cat: 'Networking',
    short: 'Internal load balancer for pods.',
    body: 'A Kubernetes-native API object that serves as an internal load balancer. A service is a named abstraction of a software service (e.g., <code>mysql</code>) consisting of a local port (e.g., <code>3306</code>) that the proxy listens on, and a selector that determines which pods respond to requests.',
  },
  {
    term: 'Route', cat: 'Networking',
    short: 'Expose services via a public DNS entry.',
    body: 'An OpenShift-specific API object that allows developers to expose services through an HTTP(S)-aware load balancing and proxy layer via a public DNS entry.',
  },
  {
    term: 'Secret', cat: 'Security',
    short: 'Holds sensitive data in the cluster.',
    body: 'A Kubernetes API object that holds secret data of a certain type, such as passwords, tokens, or keys.',
  },
  {
    term: 'Service Account', cat: 'Kubernetes',
    short: 'Identity for workloads running in the cluster.',
    body: 'A service account binds together a name (understood by users and peripheral systems), a principal that can be authenticated and authorized, and a set of secrets.',
  },
  {
    term: 'Project', cat: 'OpenShift',
    short: 'Isolated namespace for a community of users.',
    body: 'A project allows a community of users to organize and manage their content in isolation from other communities. It is an extension of the Namespace object from Kubernetes.',
  },
  {
    term: 'OpenShift', cat: 'OpenShift',
    short: 'Hybrid cloud, enterprise Kubernetes platform.',
    body: 'Red Hat OpenShift is a hybrid cloud, enterprise Kubernetes application platform, trusted by 2,000+ organizations. It includes a container host and runtime, enterprise Kubernetes, validated integrations, an integrated container registry, developer workflows, and easy access to services. <a href="https://www.openshift.com/" target="_blank" rel="noopener noreferrer">openshift.com ↗</a>',
  },
  {
    term: 'OKD', cat: 'OpenShift',
    short: 'Community distribution of Kubernetes.',
    body: 'OKD is a distribution of Kubernetes optimized for continuous application development and multi-tenant deployment. It is a sibling distribution to Red Hat OpenShift, adding developer and operations-centric tools on top of Kubernetes. <a href="https://www.okd.io/" target="_blank" rel="noopener noreferrer">okd.io ↗</a>',
  },
  {
    term: 'OpenShift CLI', cat: 'OpenShift',
    short: 'Command-line interface (oc) for OpenShift.',
    body: 'The <code>oc</code> tool is the command-line interface for OpenShift 3 and 4. When referencing as a prerequisite, use: <em>Install the OpenShift CLI (oc).</em>',
  },
  {
    term: 'Operator', cat: 'Workload',
    short: 'Packaged Kubernetes application logic.',
    body: 'Operators are the preferred method of packaging, deploying, and managing a Kubernetes application in an OpenShift cluster. An Operator takes human operational knowledge and encodes it into software that is packaged and shared with customers.',
  },
  {
    term: 'Image stream', cat: 'Workload',
    short: 'Manage and update container images.',
    body: 'Image streams provide a means of creating and updating container images in an ongoing way. They allow you to track changes to images and trigger updates automatically.',
  },
  {
    term: 'Dockerfile', cat: 'Workload',
    short: 'Build instructions for a Docker image.',
    body: 'Docker can build images automatically by reading the instructions from a Dockerfile — a text document that contains all the commands you would normally execute manually to build a Docker image.',
  },
  {
    term: 'Persistent volume claim', cat: 'Storage',
    short: 'Request persistent storage in the cluster.',
    body: 'Developers can use a persistent volume claim (PVC) to request a persistent volume (PV) resource without having specific knowledge of the underlying storage infrastructure.',
  },
];

const allCats = [...new Set(terms.map(t => t.cat))];

const styles: Record<string, React.CSSProperties> = {
  wrap: { padding: '1rem 0' },
  search: {
    width: '100%', boxSizing: 'border-box', marginBottom: '1.25rem',
    fontSize: 15, padding: '10px 14px', borderRadius: 10,
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'var(--ifm-background-color)',
    color: 'var(--ifm-font-color-base)', outline: 'none',
  },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.25rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 },
  noResults: { textAlign: 'center', color: 'var(--ifm-color-emphasis-500)', fontSize: 14, padding: '2rem 0', gridColumn: '1/-1' },
};

export default function Glossary(): JSX.Element {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const filtered = terms.filter(t => {
    const matchQ = !q || t.term.toLowerCase().includes(q) || t.short.toLowerCase().includes(q) || t.body.toLowerCase().includes(q);
    const matchCat = !activeTag || t.cat === activeTag;
    return matchQ && matchCat;
  });

  const tagStyle = (active: boolean): React.CSSProperties => ({
    fontSize: 12, padding: '4px 12px', borderRadius: 99, cursor: 'pointer',
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: active ? 'var(--ifm-color-emphasis-200)' : 'var(--ifm-background-color)',
    color: active ? 'var(--ifm-font-color-base)' : 'var(--ifm-color-emphasis-600)',
    userSelect: 'none',
    tags: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.25rem' },
  });

  const cardStyle = (open: boolean): React.CSSProperties => ({
    background: 'var(--ifm-card-background-color)',
    border: `1px solid ${open ? 'var(--ifm-color-emphasis-400)' : 'var(--ifm-color-emphasis-200)'}`,
    borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer',
    transition: 'border-color 0.12s',
  });

  return (
    <div style={styles.wrap}>
      <input
        style={styles.search}
        type="search"
        placeholder="Search terms..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div style={styles.tags}>
        <span style={tagStyle(activeTag === null)} onClick={() => setActiveTag(null)}>All</span>
        {allCats.map(c => (
          <span key={c} style={tagStyle(activeTag === c)} onClick={() => setActiveTag(c)}>{c}</span>
        ))}
      </div>

      <div style={styles.grid}>
        {filtered.length === 0 && (
          <div style={styles.noResults}>No matching terms</div>
        )}
        {filtered.map(t => {
          const c = cats[t.cat];
          const open = openTerm === t.term;
          return (
            <div
              key={t.term}
              style={cardStyle(open)}
              onClick={() => setOpenTerm(open ? null : t.term)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 15, fontWeight: 500 }}>{t.term}</span>
                <span style={{
                  marginLeft: 'auto', fontSize: 11, padding: '2px 8px', borderRadius: 99,
                  background: c.bg, color: c.text, whiteSpace: 'nowrap',
                }}>{t.cat}</span>
              </div>
              {!open && (
                <p style={{ fontSize: 13, color: 'var(--ifm-color-emphasis-600)', margin: '8px 0 0', lineHeight: 1.5 }}>
                  {t.short}
                </p>
              )}
              {open && (
                <div style={{
                  fontSize: 13, color: 'var(--ifm-color-emphasis-700)', marginTop: 10,
                  borderTop: '1px solid var(--ifm-color-emphasis-200)', paddingTop: 10, lineHeight: 1.65,
                }} dangerouslySetInnerHTML={{ __html: t.body }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
