import { useState, useEffect } from 'react';
import { useActiveSection, useScrollProgress } from '../hooks';

const LINKS = [
  { label: 'About',        id: 'about' },
  { label: 'Skills',       id: 'skills' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact',      id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const active   = useActiveSection(LINKS.map(l => l.id));
  const progress = useScrollProgress();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '2px', zIndex: 10001,
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #818cf8, #e879f9, #22d3ee)',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 10px #818cf8',
      }} />

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        background: scrolled ? 'rgba(2,8,23,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(129,140,248,0.1)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Logo */}
          <a href="#hero" style={{ textDecoration: 'none', marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #5b2faa, #818cf8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(129,140,248,0.4)',
              fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'white',
            }}>PD</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>
              Pankaj Damale
            </span>
          </a>

          {/* Desktop links */}
          <ul style={{ display: 'flex', listStyle: 'none', gap: '0.15rem', alignItems: 'center' }} className="nav-desktop">
            {LINKS.map(({ label, id }) => (
              <li key={id}>
                <a href={`#${id}`} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.04em',
                  textDecoration: 'none', padding: '0.45rem 0.9rem', borderRadius: '10px',
                  color: active === id ? '#c4b5fd' : 'var(--text-muted)',
                  background: active === id ? 'rgba(129,140,248,0.12)' : 'transparent',
                  border: active === id ? '1px solid rgba(129,140,248,0.25)' : '1px solid transparent',
                  transition: 'all 0.25s ease',
                  display: 'block',
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#c4b5fd'; (e.target as HTMLElement).style.background = 'rgba(129,140,248,0.08)'; }}
                  onMouseLeave={e => {
                    if (active !== id) {
                      (e.target as HTMLElement).style.color = 'var(--text-muted)';
                      (e.target as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.55rem 1.25rem' }}>
            Let's Talk ✦
          </a>

          {/* Burger */}
          <button onClick={() => setOpen(v => !v)} style={{
            background: 'none', border: 'none', cursor: 'none',
            display: 'none', flexDirection: 'column', gap: '5px', padding: '4px',
          }} className="nav-burger" aria-label="menu">
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '1.5px',
                background: open && i === 1 ? 'transparent' : 'var(--text)',
                transformOrigin: 'center',
                transform: open ? (i===0 ? 'translateY(6.5px) rotate(45deg)' : i===2 ? 'translateY(-6.5px) rotate(-45deg)' : 'none') : 'none',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(2,8,23,0.97)',
        backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {LINKS.map(({ label, id }, i) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)} style={{
            fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800,
            color: active === id ? '#a78bfa' : 'var(--text)',
            textDecoration: 'none', padding: '0.5rem 1rem',
            transform: open ? 'translateX(0)' : 'translateX(60px)',
            opacity: open ? 1 : 0,
            transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
          }}>{label}</a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
