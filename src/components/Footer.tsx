export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Glow line at top */}
      <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '1px', background: 'linear-gradient(90deg, transparent, #818cf8, transparent)', boxShadow: '0 0 16px #818cf8' }} />

      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} Pankaj Damale ·{' '}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', background: 'linear-gradient(90deg, #818cf8, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Designed & built from scratch
          </span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-faint)', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          Built with <span style={{ color: '#22d3ee' }}>React</span> + <span style={{ color: '#818cf8' }}>TypeScript</span> · Made with ♥ in Pune
        </div>
      </div>
    </footer>
  );
}
