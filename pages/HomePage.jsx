import { useState, useEffect } from 'react';
import { locations, amenities, testimonials } from '../data';

const accent = '#C8F04A';
const dark = '#0a0a0a';
const card = 'rgba(255,255,255,0.04)';
const border = 'rgba(255,255,255,0.08)';

export default function HomePage({ onNavigate }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCount(c => c < 480 ? c + 6 : 480), 16);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: dark, color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Hero */}
      <section style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,240,74,0.1)', border: '1px solid rgba(200,240,74,0.2)', borderRadius: 20, padding: '6px 14px', marginBottom: '2rem', width: 'fit-content' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block' }}></span>
          <span style={{ fontSize: 12, color: accent, letterSpacing: '0.05em' }}>6 locations across Kerala</span>
        </div>

        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1.05, margin: '0 0 1.5rem', fontFamily: 'Georgia, serif', letterSpacing: '-0.03em', maxWidth: 800 }}>
          Work where<br />
          <span style={{ color: accent }}>ideas breathe.</span>
        </h1>

        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.55)', maxWidth: 520, lineHeight: 1.7, margin: '0 0 2.5rem' }}>
          Premium coworking spaces built for Kerala's next generation of founders, freelancers, and remote teams.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('booking')} style={{ background: accent, color: dark, border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.01em' }}>
            Book a desk →
          </button>
          <button onClick={() => onNavigate('locations')} style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
            View locations
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '3rem', marginTop: '5rem', paddingTop: '3rem', borderTop: `1px solid ${border}` }}>
          {[['6', 'Locations'], [`${count}+`, 'Seats'], ['3', 'Cities'], ['2021', 'Founded']].map(([n, l]) => (
            <div key={l}>
              <p style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: 'Georgia, serif', color: '#fff' }}>{n}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities strip */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>Everything included at every seat</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {amenities.map(a => (
              <div key={a.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px', background: card, border: `1px solid ${border}`, borderRadius: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(200,240,74,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 16 }}>✓</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, margin: '0 0 3px', color: '#fff' }}>{a.label}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations preview */}
      <section style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <div>
            <p style={{ fontSize: 12, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Our network</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, margin: 0, fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>Spaces near you</h2>
          </div>
          <button onClick={() => onNavigate('locations')} style={{ background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 18px', fontSize: 13, cursor: 'pointer' }}>
            All locations →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {locations.slice(0, 3).map(loc => (
            <div key={loc.id} onClick={() => onNavigate('locations')} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,240,74,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = border}>
              <div style={{ height: 140, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 48 }}>🏢</span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{loc.name}</p>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: loc.avail === 'open' ? 'rgba(100,220,100,0.12)' : 'rgba(255,180,50,0.12)', color: loc.avail === 'open' ? '#6dc86d' : '#ffb432' }}>
                    {loc.avail === 'open' ? 'Available' : 'Limited'}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '0 0 12px' }}>📍 {loc.area}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {loc.tags.map(t => <span key={t} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 2rem', background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 12, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, textAlign: 'center' }}>Member stories</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, margin: '0 0 3rem', textAlign: 'center', fontFamily: 'Georgia, serif' }}>Loved by Kerala's builders</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, i) => <span key={i} style={{ color: accent, fontSize: 13 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: '0 0 20px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(200,240,74,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: accent }}>
                    {t.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', background: accent, borderRadius: 24, padding: '4rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: dark, margin: '0 0 1rem', fontFamily: 'Georgia, serif' }}>Ready to find your space?</h2>
          <p style={{ fontSize: 15, color: 'rgba(10,10,10,0.6)', margin: '0 0 2rem' }}>Book a free tour at any Mows location. No commitment needed.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('booking')} style={{ background: dark, color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Book a desk now</button>
            <button onClick={() => onNavigate('contact')} style={{ background: 'transparent', color: dark, border: '1.5px solid rgba(10,10,10,0.2)', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>Request a tour</button>
          </div>
        </div>
      </section>
    </div>
  );
}
