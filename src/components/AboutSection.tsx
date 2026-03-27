import { useReveal, useCounter } from '../hooks';
import photo from '../assets/myself.jpg';

function StatCard({ value, suffix = '', label, sub, color, delay }: {
  value: number; suffix?: string; label: string; sub: string; color: string; delay: number;
}) {
  const { val, ref } = useCounter(value, 1600);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="glass" style={{
      padding: '1.5rem 1.25rem', textAlign: 'center', borderRadius: '16px',
      opacity: 0, transform: 'translateY(24px)',
      animation: `statIn 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s forwards`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: color, opacity: 0.15, filter: 'blur(20px)' }} />
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 900, lineHeight: 1, marginBottom: '0.35rem' }}>
        <span style={{ background: color, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {val}{suffix}
        </span>
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.2rem' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-faint)' }}>{sub}</div>
    </div>
  );
}

export default function AboutSection() {
  const leftRef  = useReveal() as React.RefObject<HTMLDivElement>;
  const rightRef = useReveal() as React.RefObject<HTMLDivElement>;

  return (
    <section id="about" className="section">
      {/* Section background decoration */}
      <div style={{ position: 'absolute', left: '-200px', top: '20%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,18,96,0.4), transparent)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'center' }}>

          {/* Left — animated image frame */}
          <div ref={leftRef} className="reveal-left" style={{ position: 'relative' }}>
            {/* Orbit ring 1 */}
            <div style={{
              position: 'absolute', inset: '-40px', borderRadius: '50%',
              border: '1px solid rgba(129,140,248,0.15)',
              animation: 'spinSlow 20s linear infinite',
            }}>
              <div style={{
                position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%) translateY(-50%)',
                width: '10px', height: '10px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #818cf8, #e879f9)',
                boxShadow: '0 0 12px #818cf8',
              }} />
            </div>
            {/* Orbit ring 2 */}
            <div style={{
              position: 'absolute', inset: '-80px', borderRadius: '50%',
              border: '1px dashed rgba(232,121,249,0.1)',
              animation: 'spinSlow 35s linear infinite reverse',
            }}>
              <div style={{
                position: 'absolute', bottom: '15%', right: '0',
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#22d3ee', boxShadow: '0 0 10px #22d3ee',
              }} />
            </div>

            {/* Main image box */}
            <div className="grad-border" style={{ aspectRatio: '4/5', maxWidth: '340px', margin: '3rem auto', position: 'relative', overflow: 'hidden' }}>
              {/* Scan line animation */}
              <div style={{
                position: 'absolute', left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.5), transparent)',
                animation: 'scanLine 3s linear infinite',
                zIndex: 3,
              }} />
              {/* Your photo */}
              <img
                  src={photo}
                  alt="Your Name"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
              />
              {/* Corner decoration */}
              {['top-left','top-right','bottom-left','bottom-right'].map(pos => {
                const isTop = pos.includes('top'), isLeft = pos.includes('left');
                return <div key={pos} style={{
                  position: 'absolute',
                  [isTop ? 'top' : 'bottom']: '12px', [isLeft ? 'left' : 'right']: '12px',
                  width: '20px', height: '20px',
                  borderTop: isTop ? '2px solid #818cf8' : 'none',
                  borderBottom: !isTop ? '2px solid #818cf8' : 'none',
                  borderLeft: isLeft ? '2px solid #818cf8' : 'none',
                  borderRight: !isLeft ? '2px solid #818cf8' : 'none',
                  zIndex: 4,
                }} />;
              })}
            </div>

            {/* Floating status badge */}
            <div style={{
              position: 'absolute', bottom: '3.5rem', right: '-1.5rem',
              background: 'rgba(2,8,23,0.95)', border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: '14px', padding: '0.75rem 1rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(74,222,128,0.1)',
              animation: 'float 6s ease-in-out infinite',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#4ade80' }}>Open to Work</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)', marginTop: '0.2rem' }}>
                June 2026 ↗
              </div>
            </div>
          </div>

          {/* Right — bio */}
          <div ref={rightRef} className="reveal-right">
            <div className="section-label">About Me</div>
            <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>
              Crafting code{' '}
              <br />
              <span className="font-serif grad-text" style={{ fontStyle: 'italic' }}>with purpose</span>
            </h2>

            {[
              "Final-year AI & DS student at DYPIEMR, Pune (graduating 2026). I navigate the full stack — from OS kernels and compilers to pixel-perfect UIs and scalable distributed systems.",
              "Outside coursework, Grind competitive programming, and build projects that solve real problems. I believe the best engineers have both breadth and depth.",
              "Actively seeking full-time Job roles. I care deeply about code quality, developer experience, and impact.",
            ].map((p, i) => (
              <p key={i} style={{
                color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.95rem',
                marginBottom: '1rem',
                opacity: 0, transform: 'translateY(16px)',
                animation: `statIn 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s forwards`,
              }}>{p}</p>
            ))}

            {/* Quick facts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', margin: '1.75rem 0' }}>
              {[
                ['🎓', 'B.E. AI & DS — DYPIEMR, Pune', '2022–2026'],
                ['📍', 'Pune, Maharashtra', 'IN · Open to relocation'],
                ['💻', 'Full Stack + Systems', 'React · Java · Python'],
                ['🌐', 'Languages', 'English · Hindi · Marathi'],
              ].map(([icon, label, sub], i) => (
                <div key={label} className="glass" style={{
                  padding: '0.875rem 1rem', borderRadius: '12px', display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                  opacity: 0, animation: `statIn 0.6s cubic-bezier(0.16,1,0.3,1) ${0.65 + i * 0.1}s forwards`,
                }}>
                  <span style={{ fontSize: '1rem' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-faint)' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="/resume.pdf" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
              Download Resume ↓
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
          marginTop: '5rem',
        }}>
          <StatCard value={7} suffix=".65" label="CGPA" sub="out of 10" color="linear-gradient(135deg,#818cf8,#7c3aed)" delay={0.1} />
          <StatCard value={150} suffix="+" label="Problems" sub="LeetCode · CF" color="linear-gradient(135deg,#22d3ee,#818cf8)" delay={0.2} />
          <StatCard value={5} label="Projects" color="linear-gradient(135deg,#e879f9,#7c3aed)" delay={0.3} />
        </div>
      </div>

      <style>{`
        @keyframes statIn { to { opacity:1; transform:translateY(0); } }
        @keyframes spinSlow { to { transform:rotate(360deg); } }
      `}</style>
    </section>
  );
}
