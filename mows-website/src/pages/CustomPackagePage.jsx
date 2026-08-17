import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const textDark = '#13221C';
const textLight = '#174F50';
const yellow = '#fde047';
const bg = '#fcfaf5';

const SERVICES = [
  'Dedicated internet bandwidth',
  '24/7 access control',
  'Dedicated support manager',
  'Custom layout & branding',
  'Private Cabins (Customizable)',
  'Meeting Room Hours (Flexible)',
  'Event Space Access',
  'Podcasting Studio Access',
  'Photo Shoot Studio Access',
  'Reserved Parking',
];

const LOCATIONS = ['Manjeri', 'Kozhikode', 'Perinthalmanna'];
const DURATIONS = ['1 month', '3 months', '6 months', '1 year', 'Custom'];
const SPACE_TYPES = ['Hot Desk', 'Dedicated Desk', 'Private Cabin'];

export default function CustomPackagePage({ onNavigate }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [space, setSpace] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter(s => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleContinue = () => {
    if (!space || !location || !duration) return;

    // Pass custom package data to the booking page using JSON
    const payload = JSON.stringify({
      isCustom: true,
      features: selectedServices,
      location,
      duration,
      space: space
    });

    onNavigate('booking', payload);
  };

  const canContinue = space && location && duration;

  return (
    <div style={{ color: textDark, minHeight: '100vh', position: 'relative', background: bg, backgroundImage: 'linear-gradient(rgba(19,34,28,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(19,34,28,0.05) 1px,transparent 1px)', backgroundSize: '24px 24px', paddingBottom: '6rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '8rem 2rem 4rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: 14, color: '#fff', background: '#174F50', display: 'inline-block', padding: '8px 16px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 800, border: '2px solid #13221C', boxShadow: '4px 4px 0px #13221C', transform: 'rotate(-2deg)' }}>Build Your Own Space</p>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 900, margin: '0 0 1.5rem', textTransform: 'uppercase', letterSpacing: '-0.02em', WebkitTextStroke: '2px #13221C', color: '#fff', textShadow: '6px 6px 0px #13221C' }}>Custom &nbsp;&nbsp;Package</h1>
          <p style={{ fontSize: 18, color: textDark, maxWidth: 600, margin: '0 auto', fontWeight: 700 }}>Select the features and services you need. We'll tailor an environment specifically for your team's unique requirements.</p>
        </div>

        <div style={{ background: '#fff', border: '4px solid #13221C', borderRadius: 12, padding: '3rem', marginBottom: '2rem', boxShadow: '8px 8px 0px #13221C' }}>

          {/* Space Type */}
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 1rem', color: textDark, textTransform: 'uppercase' }}>What type of space?</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {SPACE_TYPES.map(s => (
                <button key={s} onClick={() => setSpace(s)} style={{ background: space === s ? '#174F50' : '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '16px', fontSize: 14, color: space === s ? '#fff' : textDark, cursor: 'pointer', fontWeight: 900, transition: 'all 0.15s', textTransform: 'uppercase', boxShadow: space === s ? '4px 4px 0px #13221C' : '4px 4px 0px rgba(19,34,28,0.1)' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Services Checklist */}
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 1rem', color: textDark, textTransform: 'uppercase' }}>Select Your Features</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
              {SERVICES.map(srv => {
                const active = selectedServices.includes(srv);
                return (
                  <div key={srv} onClick={() => toggleService(srv)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', border: `3px solid ${active ? textLight : '#13221C'}`, borderRadius: 8, background: active ? '#f0fdf4' : '#fff', cursor: 'pointer', transition: 'all 0.15s', boxShadow: active ? `4px 4px 0px ${textLight}` : '4px 4px 0px rgba(19,34,28,0.1)' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${active ? textLight : '#13221C'}`, background: active ? textLight : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, transition: 'all 0.15s' }}>
                      {active && <Check size={16} strokeWidth={3} />}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 900, color: textDark, textTransform: 'uppercase' }}>{srv}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Location */}
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 1rem', color: textDark, textTransform: 'uppercase' }}>Which location?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
              {LOCATIONS.map(l => {
                const unavail = l === 'Kozhikode' || l === 'Perinthalmanna';
                return (
                  <button key={l} onClick={() => { if (!unavail) setLocation(l); }} style={{ position: 'relative', background: unavail ? '#f3f4f6' : (location === l ? '#174F50' : '#fff'), border: '3px solid #13221C', borderRadius: 8, padding: '14px', fontSize: 14, fontWeight: 900, color: unavail ? '#9ca3af' : (location === l ? '#fff' : textDark), cursor: unavail ? 'not-allowed' : 'pointer', transition: 'all 0.15s', textAlign: 'left', textTransform: 'uppercase', boxShadow: unavail ? 'none' : (location === l ? '4px 4px 0px #13221C' : '4px 4px 0px rgba(19,34,28,0.1)') }}>
                    {l}
                    {unavail && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#13221C', color: '#fde047', fontSize: 10, padding: '4px 8px', borderRadius: 4, letterSpacing: '0.05em', whiteSpace: 'nowrap', border: '2px solid #13221C' }}>CURRENTLY UNAVAILABLE</div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration */}
          <div>
            <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 1rem', color: textDark, textTransform: 'uppercase' }}>How long?</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {DURATIONS.map(d => (
                <button key={d} onClick={() => setDuration(d)} style={{ background: duration === d ? '#174F50' : '#fff', border: '3px solid #13221C', borderRadius: 100, padding: '10px 20px', fontSize: 14, color: duration === d ? '#fff' : textDark, cursor: 'pointer', fontWeight: 900, transition: 'all 0.15s', textTransform: 'uppercase', boxShadow: duration === d ? '4px 4px 0px #13221C' : '2px 2px 0px rgba(19,34,28,0.1)' }}>
                  {d}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={() => onNavigate('spaces')} style={{ flex: 1, background: '#fff', color: textDark, border: '3px solid #13221C', borderRadius: 8, padding: '18px', fontSize: 15, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '4px 4px 0px #13221C', transition: 'transform 0.1s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translate(-2px,-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>← Cancel</button>

          <button onClick={handleContinue} disabled={!canContinue} style={{ flex: 2, background: canContinue ? yellow : '#fff', color: textDark, border: '3px solid #13221C', borderRadius: 8, padding: '18px', fontSize: 16, fontWeight: 900, cursor: canContinue ? 'pointer' : 'not-allowed', textTransform: 'uppercase', boxShadow: canContinue ? '6px 6px 0px #13221C' : 'none', opacity: canContinue ? 1 : 0.6, transition: 'transform 0.1s' }} onMouseEnter={e => { if (canContinue) e.currentTarget.style.transform = 'translate(-2px,-2px)'; }} onMouseLeave={e => { if (canContinue) e.currentTarget.style.transform = 'none'; }}>
            Pick a date →
          </button>
        </div>

      </div>
    </div>
  );
}
