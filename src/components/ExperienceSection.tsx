import { useState } from 'react';
import { EXPERIENCES } from '../data';
import { useReveal } from '../hooks';

const TYPE_META: Record<string, { color: string; bg: string }> = {
  'Internship':   { color: '#818cf8', bg: 'rgba(129,140,248,0.12)' },
  'Open Source':  { color: '#4ade80', bg: 'rgba(74,222,128,0.1)'  },
  'Part-time':    { color: '#22d3ee', bg: 'rgba(34,211,238,0.1)'  },
  'Freelance':    { color: '#e879f9', bg: 'rgba(232,121,249,0.1)' },
};

export default function ExperienceSection() {
  const [open, setOpen] = useState(EXPERIENCES[0].id);
  const ref = useReveal() as React.RefObject<HTMLDivElement>;

  return (
    <section id="experience" className="section">
      <div style={{ position: 'absolute', right: '-100px', bottom: '20%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,47,170,0.12), transparent)', pointerEvents: 'none' }} />

      <div className="container">
        <div ref={ref} className="reveal">
          <div className="section-label">Experience</div>
          <h2 className="heading-lg" style={{ marginBottom: '4rem' }}>
            Where I've{' '}
            <span className="grad-text-cyan font-serif" style={{ fontStyle: 'italic' }}>worked</span>
          </h2>

          <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
            {/* Spine */}
            <div style={{
              position: 'absolute', left: '11px', top: '16px', bottom: '16px',
              width: '2px',
              background: 'linear-gradient(to bottom, #818cf8, rgba(129,140,248,0.05))',
            }}>
              {/* Moving dot on spine */}
              <div style={{
                position: 'absolute', left: '-3px', width: '8px', height: '8px', borderRadius: '50%',
                background: '#818cf8', boxShadow: '0 0 12px #818cf8',
                top: `${(EXPERIENCES.findIndex(e => e.id === open) / (EXPERIENCES.length - 1)) * 90 + 2}%`,
                transition: 'top 0.5s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {EXPERIENCES.map((exp, idx) => {
                const isOpen = open === exp.id;
                const meta   = TYPE_META[exp.type] ?? { color: '#818cf8', bg: 'rgba(129,140,248,0.1)' };
                return (
                  <div key={exp.id} style={{
                    position: 'relative',
                    opacity: 0,
                    animation: `expIn 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 0.12}s forwards`,
                  }}>
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute', left: '-2.27rem', top: '1.1rem',
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: isOpen ? meta.color : 'var(--bg)',
                      border: `2px solid ${isOpen ? meta.color : 'var(--border)'}`,
                      boxShadow: isOpen ? `0 0 16px ${meta.color}, 0 0 32px ${meta.color}44` : 'none',
                      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                      zIndex: 1,
                    }}>
                      {/* Pulse ring when active */}
                      {isOpen && <div style={{
                        position: 'absolute', inset: '-6px', borderRadius: '50%',
                        border: `1px solid ${meta.color}`,
                        animation: 'pulseRing 1.5s ease-out infinite',
                      }} />}
                    </div>

                    {/* Card */}
                    <div
                      onClick={() => setOpen(isOpen ? '' : exp.id)}
                      style={{
                        background: isOpen
                          ? `linear-gradient(135deg, rgba(129,140,248,0.07), rgba(2,8,23,0.95))`
                          : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isOpen ? 'rgba(129,140,248,0.25)' : 'rgba(255,255,255,0.05)'}`,
                        borderRadius: '18px', padding: '1.5rem',
                        cursor: 'none',
                        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                        position: 'relative', overflow: 'hidden',
                      }}
                      data-hover
                    >
                      {/* Top highlight when open */}
                      {isOpen && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: meta.color, boxShadow: `0 0 12px ${meta.color}` }} />}

                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <div>
                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                            <span className="tag" style={{ background: meta.bg, color: meta.color, borderColor: `${meta.color}44` }}>
                              {exp.type}
                            </span>
                            {exp.endDate === 'Present' && (
                              <span className="tag" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)' }}>
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', marginRight: '4px', boxShadow: '0 0 6px #4ade80' }} />Current
                              </span>
                            )}
                          </div>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                            {exp.role}
                          </h3>
                          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            {exp.companyUrl ? (
                              <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" style={{ color: meta.color, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
                                {exp.company} ↗
                              </a>
                            ) : (
                              <span style={{ color: meta.color, fontWeight: 700, fontSize: '0.9rem' }}>{exp.company}</span>
                            )}
                            <span style={{ color: 'var(--text-faint)' }}>·</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{exp.location}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                            {exp.startDate} — {exp.endDate}
                          </span>
                          <span style={{
                            display: 'inline-block', fontSize: '0.9rem', color: 'var(--text-faint)',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease',
                          }}>↓</span>
                        </div>
                      </div>

                      {/* Expandable */}
                      <div style={{ maxHeight: isOpen ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
                        <div style={{ paddingTop: '1.5rem' }}>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1rem' }}>{exp.description}</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                            {exp.achievements.map((a, i) => (
                              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', padding: '0.5rem 0.75rem', background: 'rgba(129,140,248,0.04)', borderRadius: '10px', border: '1px solid rgba(129,140,248,0.08)' }}>
                                <span style={{ color: meta.color, fontWeight: 700, flexShrink: 0 }}>→</span>
                                <span style={{ fontSize: '0.855rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{a}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {exp.tech.map(t => <span key={t} className="tag">{t}</span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes expIn { to { opacity: 1; } }
      `}</style>
    </section>
  );
}
