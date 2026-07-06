import { useState } from 'react';
import { locations } from '../data';

const accent = '#C8F04A';
const dark = '#0a0a0a';
const border = 'rgba(255,255,255,0.08)';
const card = 'rgba(255,255,255,0.04)';

function dotColor(avail) {
  if (avail === 'open') return '#6dc86d';
  if (avail === 'limited') return '#ffb432';
  return '#ff5f5f';
}
function availLabel(avail) {
  if (avail === 'open') return 'Available';
  if (avail === 'limited') return 'Limited';
  return 'Full';
}

export default function LocationsPage({ onNavigate }) {
  const [view, setView] = useState('list');
  const [activeId, setActiveId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');

  const cities = ['all', ...Array.from(new Set(locations.map(l => l.city)))];

  const filtered = locations.filter(l => {
    const matchCity = cityFilter === 'all' || l.city === cityFilter;
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.area.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchSearch;
  });

  const selected = locations.find(l => l.id === activeId);

  function selectLoc(id) {
    setPlaying(false);
    setActiveId(prev => prev === id ? null : id);
  }

  return (
    <div style={{ background: dark, color: '#fff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '4rem 2rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 12, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Our network</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, margin: '0 0 1rem', fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>Find your Mows</h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: 0 }}>6 locations across Kerala — each with its own character.</p>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 2rem', display: 'flex', gap: 16 }}>
        {[['6', 'Locations'], ['3', 'Cities'], ['480+', 'Seats'], ['24/7', 'At select spaces']].map(([n, l]) => (
          <div key={l} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: '1rem 1.5rem', flex: 1 }}>
            <p style={{ fontSize: 24, fontWeight: 700, margin: 0, fontFamily: 'Georgia, serif' }}>{n}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 1.5rem', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search locations…"
          style={{ flex: 1, minWidth: 200, background: card, border: `1px solid ${border}`, borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#fff', outline: 'none' }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {cities.map(c => (
            <button key={c} onClick={() => setCityFilter(c)} style={{
              background: cityFilter === c ? accent : card,
              color: cityFilter === c ? dark : 'rgba(255,255,255,0.5)',
              border: `1px solid ${cityFilter === c ? accent : border}`,
              borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: cityFilter === c ? 600 : 400, cursor: 'pointer',
            }}>{c === 'all' ? 'All cities' : c}</button>
          ))}
        </div>
        <div style={{ display: 'flex', border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
          {['list', 'grid'].map(v => (
            <button key={v} onClick={() => { setView(v); setActiveId(null); setPlaying(false); }} style={{
              background: view === v ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: view === v ? '#fff' : 'rgba(255,255,255,0.4)',
              border: 'none', padding: '8px 12px', cursor: 'pointer', fontSize: 14,
            }}>{v === 'list' ? '☰' : '⊞'}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 4rem' }}>
        {view === 'list' ? (
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            {/* List */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filtered.map(loc => (
                <div key={loc.id} onClick={() => selectLoc(loc.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: activeId === loc.id ? 'rgba(200,240,74,0.06)' : card, border: `1px solid ${activeId === loc.id ? 'rgba(200,240,74,0.3)' : border}`, borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { if (activeId !== loc.id) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  onMouseLeave={e => { if (activeId !== loc.id) e.currentTarget.style.borderColor = border; }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🏢</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 3px', color: activeId === loc.id ? accent : '#fff' }}>{loc.name}</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>📍 {loc.area}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor(loc.avail) }}></span>
                      {availLabel(loc.avail)}
                    </span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{loc.seats} seats</span>
                    {activeId !== loc.id && <span style={{ fontSize: 10, color: accent }}>▶ preview</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Video panel */}
            <div style={{ width: 280, flexShrink: 0 }}>
              {!selected ? (
                <div style={{ background: card, border: `1px dashed ${border}`, borderRadius: 16, padding: '3rem 1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>
                  <p style={{ fontSize: 32, margin: '0 0 12px' }}>▶</p>
                  <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>Select a location to preview its video</p>
                </div>
              ) : (
                <div style={{ background: card, border: `1px solid rgba(200,240,74,0.2)`, borderRadius: 16, overflow: 'hidden' }}>
                  {/* Video screen */}
                  <div onClick={() => setPlaying(p => !p)} style={{ position: 'relative', height: 160, background: '#000', cursor: 'pointer', overflow: 'hidden' }}>
                    {playing ? (
                      <iframe src={`https://www.youtube.com/embed/${selected.videoId}?autoplay=1&mute=1`} style={{ width: '100%', height: '100%', border: 'none' }} allow="autoplay; encrypted-media" allowFullScreen title={selected.name} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(200,240,74,0.2)', border: '1.5px solid rgba(200,240,74,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>▶</div>
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Watch location video</span>
                      </div>
                    )}
                  </div>
                  {/* Meta */}
                  <div style={{ padding: '1rem' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 3px', color: accent }}>{selected.name}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '0 0 10px' }}>📍 {selected.area} · {selected.seats} seats</p>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
                      {selected.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      <button onClick={() => onNavigate('booking')} style={{ flex: 1, background: accent, color: dark, border: 'none', borderRadius: 8, padding: '8px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Book desk</button>
                      <button onClick={() => onNavigate('contact')} style={{ flex: 1, background: 'transparent', color: 'rgba(255,255,255,0.6)', border: `1px solid ${border}`, borderRadius: 8, padding: '8px', fontSize: 12, cursor: 'pointer' }}>Book tour</button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {selected.amenities.map(a => (
                        <span key={a} style={{ fontSize: 10, padding: '3px 7px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: `1px solid ${border}` }}>✓ {a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.map(loc => (
              <div key={loc.id} onClick={() => onNavigate('booking')} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,240,74,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = border}>
                <div style={{ height: 120, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🏢</div>
                <div style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{loc.name}</p>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor(loc.avail) }}></span>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '0 0 10px' }}>📍 {loc.area}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {loc.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
