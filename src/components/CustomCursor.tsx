import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const pos    = useRef({ x: 0, y: 0 });
  const ring   = useRef({ x: 0, y: 0 });
  const trails = useRef<{ x: number; y: number }[]>(Array(8).fill({ x: 0, y: 0 }));
  const raf    = useRef(0);
  const hover  = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const onEnter = () => { hover.current = true; };
    const onLeave = () => { hover.current = false; };

    const scan = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    const animate = () => {
      // Dot snaps immediately
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top  = `${pos.current.y}px`;
      }
      // Ring lerps behind
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
        const s = hover.current ? 2.5 : 1;
        ringRef.current.style.transform = `translate(-50%,-50%) scale(${s})`;
        ringRef.current.style.opacity = hover.current ? '0.25' : '0.65';
      }
      // Trails
      trails.current = [{ ...pos.current }, ...trails.current.slice(0, -1)];
      trailsRef.current.forEach((el, i) => {
        if (!el) return;
        const t = trails.current[i];
        el.style.left = `${t.x}px`;
        el.style.top  = `${t.y}px`;
        el.style.opacity = `${(1 - i / trails.current.length) * 0.15}`;
        el.style.transform = `translate(-50%,-50%) scale(${1 - i * 0.08})`;
      });
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    scan();
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
  }, []);

  const base: React.CSSProperties = { position: 'fixed', pointerEvents: 'none', zIndex: 99999, borderRadius: '50%' };

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} ref={el => { if (el) trailsRef.current[i] = el; }} style={{
          ...base, width: '8px', height: '8px',
          background: 'linear-gradient(135deg, #818cf8, #e879f9)',
          transform: 'translate(-50%,-50%)',
          transition: 'opacity 0.1s',
        }} />
      ))}
      {/* Core dot */}
      <div ref={dotRef} style={{
        ...base, width: '7px', height: '7px',
        background: '#c4b5fd',
        transform: 'translate(-50%,-50%)',
        boxShadow: '0 0 12px #818cf8, 0 0 24px rgba(129,140,248,0.5)',
        mixBlendMode: 'screen',
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        ...base, width: '38px', height: '38px',
        border: '1.5px solid rgba(167,139,250,0.7)',
        transform: 'translate(-50%,-50%)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
        boxShadow: '0 0 16px rgba(129,140,248,0.2)',
      }} />
    </>
  );
}
