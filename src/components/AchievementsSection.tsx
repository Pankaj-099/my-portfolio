import { ACHIEVEMENTS } from '../data';
import { useStaggerReveal } from '../hooks';

export default function AchievementsSection() {
  const gridRef  = useStaggerReveal(80) as React.RefObject<HTMLDivElement>;

  return (
    <section id="achievements" className="section" style={{ background: 'linear-gradient(180deg, var(--bg), var(--bg-2) 50%, var(--bg))' }}>
      <div style={{ position: 'absolute', left: '30%', top: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(129,140,248,0.07), transparent)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Recognition</div>
          <h2 className="heading-lg" style={{ marginBottom: '0.75rem' }}>
            Achievements &{' '}
            <span className="grad-text font-serif" style={{ fontStyle: 'italic' }}>Milestones</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem' }}>
            Competitions, certifications and moments I'm proud of.
          </p>
        </div>

        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
          {ACHIEVEMENTS.map((ach) => (
            <div key={ach.id} className="glass" style={{ padding: '2rem', borderRadius: '20px', position: 'relative', overflow: 'hidden', transition: 'transform 0.4s var(--expo), border-color 0.3s ease', cursor: ach.link ? 'none' : 'default' }}
              onMouseEnter={e => { (e.currentTarget).style.transform = 'translateY(-6px)'; (e.currentTarget).style.borderColor = `${ach.color}44`; }}
              onMouseLeave={e => { (e.currentTarget).style.transform = 'translateY(0)'; (e.currentTarget).style.borderColor = 'var(--border)'; }}
            >
              {/* Background glow circle */}
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: ach.color, opacity: 0.08, filter: 'blur(25px)', pointerEvents: 'none' }} />

              {/* Top bar color */}
              <div style={{ position: 'absolute', top: 0, left: '2rem', right: '2rem', height: '2px', background: ach.color, borderRadius: '0 0 99px 99px', opacity: 0.7 }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                {/* Icon with glow */}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: `linear-gradient(135deg, ${ach.color}22, ${ach.color}0a)`,
                  border: `1px solid ${ach.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem', boxShadow: `0 4px 20px ${ach.color}22`,
                  animation: 'float 5s ease-in-out infinite',
                }}>
                  {ach.icon}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                  <span className="tag" style={{
                    background: `${ach.color}18`, color: ach.color, borderColor: `${ach.color}33`,
                    textTransform: 'uppercase', fontSize: '0.62rem', letterSpacing: '0.1em',
                  }}>
                    {ach.type}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-faint)' }}>{ach.year}</span>
                </div>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.3rem' }}>
                {ach.title}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: ach.color, marginBottom: '0.6rem' }}>
                {ach.platform}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.855rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                {ach.description}
              </p>

              {ach.link && (
                <a href={ach.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.73rem', color: ach.color, textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.7'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                  View profile ↗
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Coding stats banner */}
        <div className="grad-border" style={{ marginTop: '4rem' }}>
          <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Competitive Programming
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}></h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'var(--border)' }}>
              {[

              ].map(({ p, r, rank, color }) => (
                <div key={p} style={{ background: 'var(--bg-1)', padding: '1.5rem 1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.3rem', background: color, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {r}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.78rem', marginBottom: '0.15rem' }}>{rank}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)' }}>{p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
