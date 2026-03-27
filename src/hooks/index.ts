import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Scroll reveal: adds .visible class ───────────────────── */
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ── Staggered children reveal ────────────────────────────── */
export function useStaggerReveal(staggerMs = 100) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((c) => { c.style.opacity = '0'; c.style.transform = 'translateY(30px)'; c.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)'; });
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        children.forEach((c, i) => {
          setTimeout(() => { c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * staggerMs);
        });
        obs.unobserve(el);
      }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [staggerMs]);
  return ref;
}

/* ── Typewriter ────────────────────────────────────────────── */
export function useTypewriter(words: string[], speed = 85, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wi];
    let t: ReturnType<typeof setTimeout>;
    if (!del && ci < cur.length) t = setTimeout(() => setCi(c => c+1), speed);
    else if (!del && ci === cur.length) t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0) t = setTimeout(() => setCi(c => c-1), speed/2);
    else if (del && ci === 0) { setDel(false); setWi(i => (i+1) % words.length); }
    setDisplay(cur.substring(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return display;
}

/* ── Animated counter ──────────────────────────────────────── */
export function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setVal(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

/* ── Scroll progress ──────────────────────────────────────── */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return p;
}

/* ── Active section ───────────────────────────────────────── */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ── Mouse parallax ───────────────────────────────────────── */
export function useParallaxMouse(strength = 0.02) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const fn = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  }, [strength]);
  useEffect(() => {
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, [fn]);
  return offset;
}
