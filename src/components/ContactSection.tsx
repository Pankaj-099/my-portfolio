import { useState } from 'react';
import { useReveal } from '../hooks';

type Form = { name: string; email: string; subject: string; message: string };
type Status = 'idle' | 'sending' | 'sent' | 'error';
const INIT: Form = { name: '', email: '', subject: '', message: '' };

const LINKS = [
  { name: 'GitHub', url: 'https://github.com/Pankaj-099', color: '#818cf8', icon: '⌥' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pankaj-d-47ab673a8/', color: '#22d3ee', icon: '⚡' },
  { name: 'Email', url: 'damalepankaj71@gmail.com', color: '#e879f9', icon: '✉' },
];

export default function ContactSection() {
  const [form, setForm]     = useState<Form>(INIT);
  const [status, setStatus] = useState<Status>('idle');
  const [focused, setFocused] = useState('');
  const ref = useReveal() as React.RefObject<HTMLDivElement>;

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1600));
    setStatus('sent'); setForm(INIT);
    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputBase: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)', borderRadius: '12px',
    padding: '0.875rem 1.1rem', color: 'var(--text)',
    fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  };
  const focusStyle = (name: string): React.CSSProperties => focused === name
    ? { borderColor: 'rgba(129,140,248,0.6)', boxShadow: '0 0 0 3px rgba(129,140,248,0.12)' }
    : {};

  return (
    <section id="contact" className="section">
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(45,18,96,0.15), transparent)', pointerEvents: 'none' }} />

      <div className="container">
        <div ref={ref} className="reveal">
          {/* Header centered */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Contact</div>
            <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
              Let's build something{' '}
              <br />
              <span className="grad-text font-serif" style={{ fontStyle: 'italic' }}>extraordinary together</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>
              Open to full-time SWE / SDE roles, internships, and interesting collaborations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'start' }}>
            {/* Left */}
            <div>
              {/* Availability badge */}
              <div className="grad-border" style={{ marginBottom: '2.5rem' }}>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.5rem' }}>✅</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#4ade80', marginBottom: '0.25rem' }}>Available from June 2026</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Remote · Hybrid · Open to relocation</div>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div style={{ marginBottom: '2.5rem' }}>
                {[
                  { icon: '✉️', label: 'Email', value: 'damalepankaj71@gmail.com', href: 'mailto:damalepankaj71@gmail.com' },
                  { icon: '📍', label: 'Location', value: 'Pune, Maharashtra, IN', href: null },
                  { icon: '🎓', label: 'Graduating', value: 'May 2026 · DYPIEMR, Pune', href: null },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{label}</div>
                      {href ? (
                        <a href={href} style={{ color: '#a78bfa', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>{value}</a>
                      ) : (
                        <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {LINKS.map(({ name, url, color, icon }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" data-hover style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    padding: '0.75rem 1rem', borderRadius: '12px',
                    background: `${color}0d`, border: `1px solid ${color}22`,
                    textDecoration: 'none', color: color, fontWeight: 600, fontSize: '0.85rem',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.background = `${color}18`; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = `0 4px 20px ${color}30`; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.background = `${color}0d`; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
                  >
                    <span>{icon}</span>{name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
              {/* Gradient top accent */}
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #818cf8, #e879f9, #22d3ee)', borderRadius: '3px 3px 0 0', margin: '-2.5rem -2.5rem 2rem' }} />

              {status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'bounceIn 0.5s var(--spring)' }}>🚀</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Message sent!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {(['name', 'email'] as const).map(field => (
                      <div key={field}>
                        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', display: 'block', marginBottom: '0.4rem' }}>
                          {field} {field === 'email' ? '·required' : '·required'}
                        </label>
                        <input type={field === 'email' ? 'email' : 'text'} placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
                          value={form[field]} onChange={set(field)}
                          style={{ ...inputBase, ...focusStyle(field) }}
                          onFocus={() => setFocused(field)} onBlur={() => setFocused('')}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', display: 'block', marginBottom: '0.4rem' }}>Subject</label>
                    <input type="text" placeholder="Job opportunity / Collaboration / Say hi"
                      value={form.subject} onChange={set('subject')}
                      style={{ ...inputBase, ...focusStyle('subject') }}
                      onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', display: 'block', marginBottom: '0.4rem' }}>Message ·required</label>
                    <textarea rows={5} placeholder="Tell me about the role, project, or just say hi..."
                      value={form.message} onChange={set('message')}
                      style={{ ...inputBase, ...focusStyle('message'), resize: 'vertical', minHeight: '120px' }}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={submit} data-hover
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', opacity: status === 'sending' ? 0.7 : 1, letterSpacing: '0.05em' }}
                    disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <><span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Sending...</>
                    ) : 'Send Message ✦'}
                  </button>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)', textAlign: 'center' }}>
                    Typically respond within 24h · No spam
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounceIn { 0%{transform:scale(0);} 60%{transform:scale(1.2);} 100%{transform:scale(1);} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
