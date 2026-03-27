import { useEffect, useRef } from 'react';
import { useTypewriter, useParallaxMouse } from '../hooks';

const ROLES = ['Full Stack Developer', 'AI/DS Enthusiast', 'Problem Solver'];

/* ── Aurora / nebula canvas ────────────────────────────────── */
function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0, raf = 0, t = 0;

    type Orb = { x: number; y: number; vx: number; vy: number; r: number; color: string; pulse: number };
    const orbs: Orb[] = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      orbs.length = 0;
      const cols = ['rgba(91,47,170,', 'rgba(129,140,248,', 'rgba(232,121,249,', 'rgba(34,211,238,', 'rgba(45,18,96,'];
      for (let i = 0; i < 7; i++) {
        orbs.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
          r: 180 + Math.random() * 220,
          color: cols[i % cols.length],
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, W, H);

      orbs.forEach((o, i) => {
        o.x += o.vx + Math.sin(t + i) * 0.3;
        o.y += o.vy + Math.cos(t + i * 0.7) * 0.2;
        if (o.x < -o.r) o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;

        const pulse = 1 + Math.sin(t * 2 + o.pulse) * 0.15;
        const r = o.r * pulse;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
        g.addColorStop(0, `${o.color}0.18)`);
        g.addColorStop(0.5, `${o.color}0.09)`);
        g.addColorStop(1,   `${o.color}0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connection lines between close orbs
      ctx.lineWidth = 0.5;
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dx = orbs[i].x - orbs[j].x, dy = orbs[i].y - orbs[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 300) {
            ctx.strokeStyle = `rgba(129,140,248,${(1 - dist/300) * 0.08})`;
            ctx.beginPath(); ctx.moveTo(orbs[i].x, orbs[i].y); ctx.lineTo(orbs[j].x, orbs[j].y); ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize(); init(); draw();
    window.addEventListener('resize', () => { resize(); init(); });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}

/* ── Glitch text effect ─────────────────────────────────────── */
function GlitchName({ text }: { text: string }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'relative', zIndex: 1 }} className="grad-text">{text}</span>
      <span aria-hidden style={{
        position: 'absolute', inset: 0, color: '#818cf8',
        animation: 'glitch1 4s steps(1) infinite', opacity: 0.6,
      }}>{text}</span>
      <span aria-hidden style={{
        position: 'absolute', inset: 0, color: '#e879f9',
        animation: 'glitch2 4s steps(1) infinite 0.5s', opacity: 0.4,
      }}>{text}</span>
    </div>
  );
}

/* ── Floating orb decorations ───────────────────────────────── */
function FloatOrb({ size, x, y, color, delay }: { size: number; x: string; y: string; color: string; delay: number }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      filter: `blur(${size * 0.3}px)`,
      opacity: 0.5,
      animation: `float ${5 + delay}s ease-in-out ${delay}s infinite`,
      pointerEvents: 'none',
    }} />
  );
}

/* ── Main ───────────────────────────────────────────────────── */
export default function HeroSection() {
  const role   = useTypewriter(ROLES);
  const mouse  = useParallaxMouse(0.015);

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <AuroraCanvas />

      {/* Decorative floating orbs */}
      <FloatOrb size={300} x="-5%" y="10%"   color="radial-gradient(circle, rgba(91,47,170,0.4), transparent)" delay={0} />
      <FloatOrb size={200} x="80%" y="60%"   color="radial-gradient(circle, rgba(34,211,238,0.2), transparent)" delay={1.5} />
      <FloatOrb size={150} x="60%" y="5%"    color="radial-gradient(circle, rgba(232,121,249,0.25), transparent)" delay={3} />

      {/* Grid lines background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(129,140,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '860px', transform: `translate(${mouse.x}px, ${mouse.y}px)`, transition: 'transform 0.1s ease' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: '99px',
            background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.3)',
            marginBottom: '2rem',
            animation: 'fadeSlideDown 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--electric-bright)' }}>
              AVAILABLE FOR HIRE · AI&DS FINAL YEAR · DYPIEMR PUNE
            </span>
          </div>

          {/* Name */}
          <div style={{ animation: 'fadeSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.85rem,1.5vw,1rem)', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>
              &lt;Hello World /&gt; — I'm
            </div>
            <h1 className="heading-xl" style={{ marginBottom: '1.25rem' }}>
              <GlitchName text="Pankaj  Damale" />
            </h1>
          </div>

          {/* Typewriter */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            marginBottom: '2rem',
            animation: 'fadeSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both',
          }}>
            <div style={{
              padding: '0.5rem 1rem', borderRadius: '10px',
              background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem,2vw,1.2rem)', color: 'var(--violet-300)' }}>$ </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem,2vw,1.2rem)', color: 'var(--text)' }}>{role}</span>
              <span style={{
                display: 'inline-block', width: '2px', height: '1.1em',
                background: '#a78bfa', verticalAlign: 'middle', marginLeft: '2px',
                animation: 'blink 1s step-end infinite',
              }} />
            </div>
          </div>

          {/* Bio */}
          <p style={{
            fontSize: 'clamp(0.95rem,1.5vw,1.1rem)', color: 'var(--text-muted)', lineHeight: 1.85,
            maxWidth: '600px', marginBottom: '3rem',
            animation: 'fadeSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both',
          }}>
            I craft <span style={{ color: 'var(--electric-bright)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>fast, beautiful software</span> — from OS kernels to AI-powered dev tools. 
            Passionate about systems programming, open source, and developer experience.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem',
            animation: 'fadeSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s both',
          }}>
            <a href="#projects" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
              View my work ↓
            </a>
            <a href="/resume.pdf" className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
              Download Resume ↗
            </a>
          </div>

          {/* Social row */}
          <div style={{
            display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap',
            animation: 'fadeSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.95s both',
          }}>
            {[
              { name: 'GitHub', url: 'https://github.com/Pankaj-099', bg: 'rgba(255,255,255,0.05)' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pankaj-d-47ab673a8/', bg: 'rgba(0,119,181,0.15)' },
            ].map(({ name, url, bg }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" data-hover style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.04em',
                padding: '0.45rem 1rem', borderRadius: '10px',
                background: bg, border: '1px solid var(--border)',
                color: 'var(--text-muted)', textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#c4b5fd'; el.style.borderColor = 'rgba(129,140,248,0.4)'; el.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'var(--text-muted)'; el.style.borderColor = 'var(--border)'; el.style.transform = 'translateY(0)'; }}
              >
                {name}
              </a>
            ))}
          </div>
        </div>

        {/* Right side: Floating code card */}
        <div style={{
          position: 'absolute', right: '2.5rem', top: '50%',
          transform: `translateY(-50%) translate(${-mouse.x * 2}px, ${-mouse.y * 2}px)`,
          transition: 'transform 0.15s ease',
          animation: 'fadeSlideRight 1s cubic-bezier(0.16,1,0.3,1) 1.1s both',
          display: 'none',
        }} className="hero-code-card">
          <div className="glass" style={{ padding: '1.5rem', minWidth: '280px' }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
              {['#f87171','#fbbf24','#4ade80'].map(c => (
                <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            {[
              { c: '#a78bfa', t: 'const ' }, { c: '#22d3ee', t: 'pankaj ' }, { c: '#e2e8f0', t: '= {' },
              { c: '#818cf8', t: '  role:', sp: true }, { c: '#4ade80', t: '"SWE Intern",' },
              { c: '#818cf8', t: '  stack:', sp: true }, { c: '#4ade80', t: '"Full Stack",' },
              { c: '#818cf8', t: '  gpa:', sp: true }, { c: '#fbbf24', t: '7.65,' },
              { c: '#818cf8', t: '  status:', sp: true }, { c: '#4ade80', t: '"Hireable ✓",' },
              { c: '#e2e8f0', t: '};' },
            ].map((l, i) => (
              <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.8, color: l.c }}>
                {l.sp && <span style={{ marginLeft: '1rem' }} />}{l.t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        animation: 'bounce 2s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--text-faint)' }}>SCROLL</span>
        <div style={{ width: '24px', height: '38px', border: '2px solid rgba(129,140,248,0.3)', borderRadius: '12px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '3px', height: '8px', background: '#818cf8', borderRadius: '99px',
            marginTop: '6px', animation: 'scrollDot 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideDown { from { opacity:0; transform:translateY(-20px); } }
        @keyframes fadeSlideUp   { from { opacity:0; transform:translateY(30px); } }
        @keyframes fadeSlideRight { from { opacity:0; transform:translateY(-50%) translateX(40px); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0);} 50%{transform:translateX(-50%) translateY(8px);} }
        @keyframes scrollDot { 0%,100%{transform:translateY(0);opacity:1;} 50%{transform:translateY(12px);opacity:0;} }
        @media (min-width:1100px) { .hero-code-card { display:block !important; } }
      `}</style>
    </section>
  );
}
