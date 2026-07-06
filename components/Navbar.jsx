import { useState } from 'react';
import { navLinks } from '../data';

export default function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '64px',
    }}>
      <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: 32, height: 32, background: '#C8F04A', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#0a0a0a', fontFamily: 'Georgia, serif' }}>M</span>
        </div>
        <span style={{ fontSize: 18, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', fontFamily: 'Georgia, serif' }}>mows</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {navLinks.map(l => (
          <button key={l.path} onClick={() => onNavigate(l.label.toLowerCase())} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, color: currentPage === l.label.toLowerCase() ? '#C8F04A' : 'rgba(255,255,255,0.6)',
            fontWeight: currentPage === l.label.toLowerCase() ? 500 : 400,
            transition: 'color 0.2s', letterSpacing: '0.01em',
          }}>{l.label}</button>
        ))}
        <button onClick={() => onNavigate('booking')} style={{
          background: '#C8F04A', color: '#0a0a0a', border: 'none', borderRadius: 8,
          padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          letterSpacing: '0.01em', transition: 'opacity 0.15s',
        }}>Book a desk</button>
      </div>
    </nav>
  );
}
