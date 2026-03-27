import { useState, useRef, useEffect } from 'react';
import { SKILLS, SKILL_CATEGORIES } from '../data';
import { useReveal } from '../hooks';

function AnimatedBar({ level, color, visible }: { level: number; color: string; visible: boolean }) {
  return (
    <div style={{ height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden', marginTop: '0.3rem', position: 'relative' }}>
      <div style={{
        height: '100%', borderRadius: '99px',
        background: `linear-gradient(90deg, ${color}, rgba(255,255,255,0.3))`,
        width: visible ? `${level}%` : '0%',
        transition: `width 1.4s cubic-bezier(0.16,1,0.3,1) ${Math.random() * 0.4}s`,
        boxShadow: `0 0 10px ${color}`,
        position: 'relative',
      }}>
        {/* Shimmer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: visible ? 'shimmer 2s linear infinite' : 'none',
        }} />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [active, setActive]       = useState('Languages');
  const [visible, setVisible]     = useState(false);
  const sectionRef = useReveal(0.1) as React.RefObject<HTMLDivElement>;
  const innerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = SKILLS.filter(s => s.category === active);

  return (
    <section id="skills" className="section" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 50%, var(--bg) 100%)' }}>
      {/* Decorative right blob */}
      <div style={{ position: 'absolute', right: '-150px', top: '30%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(129,140,248,0.08), transparent)', pointerEvents: 'none' }} />

      <div className="container">
        <div ref={sectionRef} className="reveal">
          <div className="section-label">Tech Stack</div>
          <h2 className="heading-lg" style={{ marginBottom: '0.75rem' }}>
            My{' '}
            <span className="grad-text">Toolkit</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '500px', marginBottom: '3rem' }}>
            Years of deliberate practice across the full stack — from low-level systems to cloud-native frontends.
          </p>

          {/* Category tabs with animated underline */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {SKILL_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.04em',
                padding: '0.5rem 1.1rem', borderRadius: '10px', cursor: 'none', border: 'none',
                background: active === cat ? 'linear-gradient(135deg, var(--violet-600), var(--electric))' : 'rgba(255,255,255,0.04)',
                color: active === cat ? 'white' : 'var(--text-muted)',
                boxShadow: active === cat ? '0 4px 20px rgba(129,140,248,0.35)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                transform: active === cat ? 'scale(1.05)' : 'scale(1)',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div ref={innerRef} style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem',
          }}>
            {filtered.map((skill, i) => (
              <div key={skill.name} className="glass glow-card" style={{
                padding: '1.4rem',
                opacity: 0, transform: 'translateY(20px) scale(0.95)',
                animation: `skillIn 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s forwards`,
                position: 'relative', overflow: 'hidden',
              }}>
                {/* BG glow */}
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '60px', height: '60px', borderRadius: '50%', background: skill.color, opacity: 0.08, filter: 'blur(15px)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{skill.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: skill.color, fontWeight: 600 }}>
                    {skill.level}%
                  </span>
                </div>
                <AnimatedBar level={skill.level} color={skill.color} visible={visible} />
              </div>
            ))}
          </div>

          {/* Tools row */}
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.14em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Also in my toolkit
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Git', 'SqlAlchemy', 'Pydantic', 'Postman', 'Clerk', 'Websocket', 'Pytest', 'Vercel', 'Render', 'Upstash', 'Alembic'].map((t, i) => (
                <span key={t} className="tag" style={{
                  opacity: 0, animation: `statIn 0.4s ease ${0.05 * i}s forwards`,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes skillIn { to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes statIn  { to { opacity:1; } }
      `}</style>
    </section>
  );
}
