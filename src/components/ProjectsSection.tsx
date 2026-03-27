import { useState, useRef, useCallback } from 'react';
import { PROJECTS } from '../data';
import { useReveal } from '../hooks';
import type { Project } from '../data';

const STATUS_META: Record<string, { label: string; color: string }> = {
  completed:    { label: 'Completed',    color: '#4ade80' },
  'in-progress':{ label: 'In Progress', color: '#fbbf24' },
  archived:     { label: 'Archived',    color: '#94a3b8' },
};

/* ── 3D Tilt Card ─────────────────────────────────────────── */
function TiltCard({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const ref  = useRef<HTMLDivElement>(null);
  const raf  = useRef(0);
  const cur  = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const tgt  = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    tgt.current = { rx: (y - 0.5) * -14, ry: (x - 0.5) * 14, gx: x * 100, gy: y * 100 };
  }, []);

  const onLeave = useCallback(() => { tgt.current = { rx: 0, ry: 0, gx: 50, gy: 50 }; }, []);

  const animate = useCallback(() => {
    const el = ref.current; if (!el) return;
    const lerp = 0.08;
    cur.current.rx += (tgt.current.rx - cur.current.rx) * lerp;
    cur.current.ry += (tgt.current.ry - cur.current.ry) * lerp;
    cur.current.gx += (tgt.current.gx - cur.current.gx) * lerp;
    cur.current.gy += (tgt.current.gy - cur.current.gy) * lerp;
    el.style.transform = `perspective(900px) rotateX(${cur.current.rx}deg) rotateY(${cur.current.ry}deg) translateZ(8px)`;
    (el.children[0] as HTMLElement).style.background =
      `radial-gradient(circle at ${cur.current.gx}% ${cur.current.gy}%, rgba(129,140,248,0.08), transparent 60%)`;
    raf.current = requestAnimationFrame(animate);
  }, []);

  const onEnter = useCallback(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(animate); }, [animate]);
  const stopAnim = useCallback(() => { cancelAnimationFrame(raf.current); if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; }, []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={() => { onLeave(); stopAnim(); }}
      onClick={onClick}
      style={{ cursor: 'none', transition: 'box-shadow 0.3s ease', willChange: 'transform',
        borderRadius: '20px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      }}
      data-hover
    >
      {/* Shimmer overlay */}
      <div style={{ borderRadius: 'inherit', transition: 'background 0.1s ease' }} />
      {children}
    </div>
  );
}

/* ── Project Card ─────────────────────────────────────────── */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const s = STATUS_META[project.status];
  return (
    <TiltCard onClick={onClick}>
      <div className="glass" style={{ padding: '0', overflow: 'hidden', borderRadius: '20px', height: '100%' }}>
        {/* Color banner */}
        <div style={{
          height: '5px', background: project.color,
          boxShadow: `0 0 20px rgba(129,140,248,0.4)`,
        }} />
        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100% - 5px)' }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span className="tag" style={{ background: 'rgba(129,140,248,0.12)', borderColor: 'rgba(129,140,248,0.25)' }}>
                {project.category}
              </span>
              {project.featured && (
                <span className="tag" style={{ background: 'rgba(232,121,249,0.1)', color: '#e879f9', borderColor: 'rgba(232,121,249,0.25)' }}>
                  ✦ Featured
                </span>
              )}
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-faint)' }}>{project.year}</span>
          </div>

          {/* Title */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
              {project.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.7 }}>
              {project.description}
            </p>
          </div>

          {/* Tech */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
            {project.techStack.slice(0, 5).map(t => <span key={t} className="tag">{t}</span>)}
            {project.techStack.length > 5 && <span className="tag">+{project.techStack.length - 5}</span>}
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-faint)' }}>{s.label}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#a78bfa' }}>
              View details →
            </span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

/* ── Modal ────────────────────────────────────────────────── */
function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const s = STATUS_META[project.status];
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 3000,
      background: 'rgba(2,8,23,0.9)', backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
      animation: 'fadeIn 0.2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-1)', borderRadius: '24px', maxWidth: '700px', width: '100%',
        maxHeight: '88vh', overflow: 'auto',
        border: '1px solid var(--border)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(129,140,248,0.08)',
        animation: 'modalIn 0.4s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative',
      }}>
        {/* Gradient top bar */}
        <div style={{ height: '4px', background: project.color, borderRadius: '24px 24px 0 0' }} />

        <div style={{ padding: '2.5rem' }}>
          {/* Close */}
          <button onClick={onClose} data-hover style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
            cursor: 'none', color: 'var(--text-muted)', fontSize: '1.1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { (e.currentTarget).style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget).style.background = 'rgba(255,255,255,0.05)'; }}
          >×</button>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <span className="tag">{project.category}</span>
            <span className="tag" style={{ color: s.color, background: `${s.color}18`, borderColor: `${s.color}33` }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.color, display: 'inline-block', marginRight: '4px' }} />{s.label}
            </span>
            <span className="tag">{project.year}</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            {project.title}
          </h2>

          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem', fontSize: '0.95rem' }}>
            {project.longDesc}
          </p>

          {/* Highlights */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.14em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '0.875rem' }}>Key Highlights</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.6rem 0.875rem', background: 'rgba(129,140,248,0.04)', borderRadius: '10px', border: '1px solid rgba(129,140,248,0.1)' }}>
                  <span style={{ color: '#a78bfa', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>→</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
            {project.techStack.map(t => <span key={t} className="tag">{t}</span>)}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem' }}>⌥ GitHub</a>
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>↗ Live Demo</a>}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn  { from{opacity:0;} }
        @keyframes modalIn { from{opacity:0;transform:translateY(30px) scale(0.96);} }
      `}</style>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAll, setShowAll]   = useState(false);
  const revealRef = useReveal() as React.RefObject<HTMLDivElement>;

  const displayed = showAll ? PROJECTS : PROJECTS.filter(p => p.featured);

  return (
    <section id="projects" className="section" style={{ background: 'linear-gradient(180deg, var(--bg-2), var(--bg))' }}>
      <div style={{ position: 'absolute', left: '50%', top: '0', transform: 'translateX(-50%)', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(129,140,248,0.1), transparent)', pointerEvents: 'none' }} />

      <div className="container">
        <div ref={revealRef} className="reveal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}>
            <div>
              <div className="section-label">Projects</div>
              <h2 className="heading-lg">
                Things I've{' '}
                <span className="grad-text font-serif" style={{ fontStyle: 'italic' }}>built</span>
              </h2>
            </div>
            <button className="btn btn-outline" style={{ fontSize: '0.8rem' }} onClick={() => setShowAll(v => !v)}>
              {showAll ? '← Featured Only' : `See All (${PROJECTS.length}) →`}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {displayed.map((p, i) => (
              <div key={p.id} style={{ opacity: 0, animation: `projectIn 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s forwards`, height: '100%' }}>
                <ProjectCard project={p} onClick={() => setSelected(p)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @keyframes projectIn { to{opacity:1;} }
      `}</style>
    </section>
  );
}
