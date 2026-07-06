import { useState } from 'react';
import { locations } from '../data';
import LocationIcon from '../assets/LocationBlack.png';
import ArielViewImg from '../assets/DubaiArielView.jpg';
import mowsInteriorVideo from '../assets/MowsInterior.mp4';
import { motion } from 'framer-motion';

const HoverText = ({ text, defaultColor, hoverColor }) => (
  <>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        whileHover={{ scale: 1.25, y: -4, color: hoverColor || defaultColor, rotate: (i % 2 === 0 ? 5 : -5) }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{ display: 'inline-block', transformOrigin: 'bottom center', color: defaultColor }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </>
);

const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';

function dotColor(avail) {
  if (avail === 'open') return '#059669';
  if (avail === 'limited') return '#d97706';
  if (avail === 'coming soon') return '#6b7280';
  return '#dc2626';
}
function availLabel(avail) {
  if (avail === 'open') return 'Available';
  if (avail === 'limited') return 'Limited';
  if (avail === 'coming soon') return 'Coming Soon';
  return 'Full';
}

export default function LocationsPage({ onNavigate }) {
  const [view, setView] = useState('list');
  const [activeId, setActiveId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [imgErrors, setImgErrors] = useState({});

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

  function thumbUrl(videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return (
    <div style={{ color: textDark, minHeight: '100vh', position: 'relative', backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>

      {/* Header */}
      <section style={{
        minHeight: '45vh',
        padding: '6rem 2rem 4rem',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '4rem',
        borderBottom: '4px solid #13221C',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: '#fcfaf5', overflow: 'hidden' }}>
          {/* Grid pattern base */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

          {/* Dotted line with location pins */}
          <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.3 }}>
            <path d="M -100 200 Q 200 350 500 200 T 1300 300" fill="none" stroke="#13221C" strokeWidth="4" strokeDasharray="12 12" />

            {/* Location symbols exactly on the path */}
            <g className="animate-float" style={{ animationDelay: '0s' }}>
              <image href={LocationIcon} x="56" y="215" width="48" height="48" />
            </g>
            <g className="animate-float" style={{ animationDelay: '1s' }}>
              <image href={LocationIcon} x="638" y="102" width="48" height="48" />
            </g>
            <g className="animate-float" style={{ animationDelay: '2s' }}>
              <image href={LocationIcon} x="1038" y="152" width="48" height="48" />
            </g>
          </svg>

          {/* Gradient fade to blend into the rest of the page */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, #fcfaf5 0%, rgba(252,250,245,0) 100%)' }}></div>
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ padding: '3rem', flex: 1, minWidth: 320, textAlign: 'left', position: 'relative' }}
        >
          <p style={{
            fontSize: 14,
            color: '#fff',
            background: '#174F50',
            boxShadow: '4px 4px 0px #13221C',
            border: '2px solid #13221C',
            display: 'inline-block',
            padding: '8px 16px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            fontWeight: 800,
            transform: 'rotate(-2deg)'
          }}>Our network</p>
          <h1 style={{
            fontSize: 'clamp(4rem, 8vw, 6rem)',
            margin: '0 0 1rem',
            WebkitTextStroke: '2px #13221C',
            lineHeight: 1,
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <span>
              <HoverText text="MOWS" defaultColor="#13221C" hoverColor="#174F50" />
            </span>
            <span style={{ textShadow: '6px 6px 0px #13221C' }}>
              <HoverText text="LOCATIONS" defaultColor="#174F50" />
            </span>
          </h1>
          <p style={{ fontSize: 18, color: '#13221C', margin: '1rem 0 0', maxWidth: 600, lineHeight: 1.4, fontWeight: 700 }}>
            3 locations across Kerala — each designed to provide an inspiring, distraction-free environment for professionals.
          </p>
        </motion.div>
 
        {/* Right Side Image */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ flex: 1, minWidth: 320, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1, padding: '2rem' }}
        >
          <div style={{
            background: '#fcfaf5',
            padding: '16px 16px 40px 16px',
            borderRadius: 4,
            border: '4px solid #13221C',
            boxShadow: '10px 10px 0px #13221C',
            transform: 'rotate(4deg)',
            maxWidth: 380,
            width: '100%',
            position: 'relative',
            transition: 'transform 0.3s ease'
          }}
          >
            {/* Tape effect */}
            <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%) rotate(-6deg)', width: 100, height: 32, background: '#fde047', border: '3px solid #13221C', zIndex: 2 }}></div>
            <img src={ArielViewImg} alt="Mows Locations Aerial View" style={{ width: '100%', height: 'auto', border: '3px solid #13221C', display: 'block', filter: 'contrast(1.1) sepia(0.2)' }} />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <div className="animate-fade-up delay-100" style={{ maxWidth: 1100, margin: '-2rem auto 2rem', padding: '0 2rem', display: 'flex', gap: 16, flexWrap: 'wrap', position: 'relative', zIndex: 10, }}>
        {[['3', 'Locations'], ['480+', 'Seats'], ['24/7', 'At select spaces']].map(([n, l], i) => (
          <div key={l} style={{
            background: '#c5f8d9ff',
            borderRadius: 12,
            padding: '1.5rem 2rem',
            flex: 1,
            minWidth: 120,
            border: '3px solid #13221C',
            boxShadow: '4px 4px 0px #13221C',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: 36, fontWeight: 900, margin: 0, color: '#13221C', lineHeight: 1 }}>{n}</p>
            <p style={{ fontSize: 14, color: '#174F50', margin: '4px 0 0', fontWeight: 800, textTransform: 'uppercase' }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="animate-fade-up delay-200" style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 2rem', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search locations…"
          style={{
            flex: 1,
            minWidth: 200,
            borderRadius: 8,
            padding: '16px 24px',
            fontSize: 16,
            outline: 'none',
            background: '#fff',
            border: '3px solid #13221C',
            boxShadow: '4px 4px 0px #13221C',
            fontWeight: 700,
            color: '#13221C'
          }} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cities.map(c => (
            <button key={c} onClick={() => setCityFilter(c)} style={{
              background: cityFilter === c ? '#13221C' : '#fff',
              color: cityFilter === c ? '#fff' : '#13221C',
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'transform 0.1s, box-shadow 0.1s',
              border: '3px solid #13221C',
              boxShadow: cityFilter === c ? '2px 2px 0px #174F50' : '4px 4px 0px #13221C',
              textTransform: 'uppercase',
              transform: cityFilter === c ? 'translate(2px, 2px)' : 'none'
            }}
              onMouseEnter={e => {
                if (cityFilter !== c) {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0px #13221C';
                }
              }}
              onMouseLeave={e => {
                if (cityFilter !== c) {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '4px 4px 0px #13221C';
                }
              }}
            >{c === 'all' ? 'All cities' : c}</button>
          ))}
        </div>
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '3px solid #13221C', boxShadow: '4px 4px 0px #13221C' }}>
          {['list', 'grid'].map(v => (
            <button key={v} onClick={() => { setView(v); setActiveId(null); setPlaying(false); }} style={{
              background: view === v ? '#174F50' : '#fff',
              color: view === v ? '#fff' : '#13221C',
              border: 'none',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: 20,
              fontWeight: 900,
              borderRight: v === 'list' ? '3px solid #13221C' : 'none'
            }}>{v === 'list' ? '☰' : '⊞'}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="animate-fade-up delay-300" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 6rem' }}>
        {view === 'list' ? (
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* List */}
            <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.length === 0 && (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#13221C', borderRadius: 12, background: '#fff', border: '3px solid #13221C', boxShadow: '4px 4px 0px #13221C', fontWeight: 700 }}>No locations match your search.</div>
              )}
              {filtered.map(loc => (
                <div key={loc.id} onClick={() => loc.avail !== 'coming soon' && selectLoc(loc.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 12,
                    cursor: loc.avail === 'coming soon' ? 'not-allowed' : 'pointer',
                    opacity: loc.avail === 'coming soon' ? 0.6 : 1,
                    filter: loc.avail === 'coming soon' ? 'grayscale(100%)' : 'none',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                    background: activeId === loc.id ? '#fde047' : '#fff',
                    border: '3px solid #13221C',
                    boxShadow: activeId === loc.id ? '2px 2px 0px #174F50' : '4px 4px 0px #13221C',
                    transform: activeId === loc.id ? 'translate(2px, 2px)' : 'none'
                  }}
                  onMouseEnter={e => {
                    if (activeId !== loc.id && loc.avail !== 'coming soon') {
                      e.currentTarget.style.transform = 'translate(-2px, -2px)';
                      e.currentTarget.style.boxShadow = '6px 6px 0px #13221C';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeId !== loc.id && loc.avail !== 'coming soon') {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '4px 4px 0px #13221C';
                    }
                  }}>
                  <div style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: '#13221C', border: '3px solid #13221C' }}>
                    {!imgErrors[loc.id] ? (
                      <img src={loc.image || thumbUrl(loc.videoId)} alt={loc.name}
                        onError={() => setImgErrors(p => ({ ...p, [loc.id]: true }))}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, background: '#fff' }}>🏢</div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 18, fontWeight: 900, margin: '0 0 4px', color: '#13221C' }}>{loc.name}</p>
                    <p style={{ fontSize: 14, color: '#174F50', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <img src={LocationIcon} alt="Location" style={{ width: 16, height: 16 }} />
                      {loc.area}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#13221C', fontWeight: 800, background: '#fcfaf5', border: '2px solid #13221C', padding: '2px 8px', borderRadius: 4 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor(loc.avail), border: '1px solid #13221C' }}></span>
                      {availLabel(loc.avail).toUpperCase()}
                    </span>
                    <span style={{ fontSize: 13, color: '#174F50', fontWeight: 800 }}>{loc.seats} seats</span>
                    {activeId !== loc.id && loc.avail !== 'coming soon' && <span style={{ fontSize: 11, color: '#fff', background: '#13221C', padding: '2px 6px', borderRadius: 4, fontWeight: 800, marginTop: 2, textTransform: 'uppercase' }}>Details ▶</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Video panel */}
            {selected && (
              <div style={{ width: 360, flexShrink: 0 }}>
                <div className="animate-fade-scale" style={{ borderRadius: 12, overflow: 'hidden', backgroundColor: '#fcfaf5', backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', border: '3px solid #13221C', boxShadow: '6px 6px 0px #13221C' }}>
                  <div style={{ aspectRatio: '1/1', background: '#13221C', overflow: 'hidden', borderBottom: '3px solid #13221C', position: 'relative' }}>
                    <video
                      src={mowsInteriorVideo}
                      controls
                      autoPlay
                      muted
                      loop
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <p style={{ fontSize: 24, fontWeight: 900, margin: '0 0 6px', color: '#13221C', lineHeight: 1.1 }}>{selected.name}</p>
                    <p style={{ fontSize: 15, color: '#174F50', margin: '0 0 20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <img src={LocationIcon} alt="Location" style={{ width: 16, height: 16 }} />
                      {selected.area} · {selected.seats} seats
                    </p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                      {selected.tags.map(t => <span key={t} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 4, background: '#13221C', color: '#fde047', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                      <button onClick={() => onNavigate('booking')} style={{ flex: 1, background: '#fde047', color: '#13221C', border: '3px solid #13221C', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 900, cursor: 'pointer', transition: 'transform 0.1s, box-shadow 0.1s', boxShadow: '4px 4px 0px #13221C', textTransform: 'uppercase' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #13221C'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0px #13221C'; }}>Book desk</button>
                      <button onClick={() => onNavigate('contact')} style={{ flex: 1, background: '#fff', color: '#13221C', border: '3px solid #13221C', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 900, cursor: 'pointer', transition: 'transform 0.1s, box-shadow 0.1s', boxShadow: '4px 4px 0px #13221C', textTransform: 'uppercase' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #13221C'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0px #13221C'; }}>Book tour</button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {selected.amenities.map(a => (
                        <span key={a} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 4, background: '#fcfaf5', color: '#13221C', border: `2px solid #13221C`, fontWeight: 700 }}>✦ {a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Mobile query */}
            <style>{`@media(max-width:800px){div[style*="width: 360px"]{width:100% !important;}}`}</style>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
            {filtered.map((loc, i) => (
              <div key={loc.id} onClick={() => loc.avail !== 'coming soon' && onNavigate('booking')} className="animate-fade-up"
                style={{
                  animationDelay: `${i * 100}ms`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: loc.avail === 'coming soon' ? 'not-allowed' : 'pointer',
                  opacity: loc.avail === 'coming soon' ? 0.6 : 1,
                  filter: loc.avail === 'coming soon' ? 'grayscale(100%)' : 'none',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  background: '#fff',
                  border: '3px solid #13221C',
                  boxShadow: '6px 6px 0px #13221C',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={e => {
                  if (loc.avail !== 'coming soon') {
                    e.currentTarget.style.transform = 'translate(-4px, -4px)';
                    e.currentTarget.style.boxShadow = '10px 10px 0px #13221C';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (loc.avail !== 'coming soon') {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '6px 6px 0px #13221C';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                  }
                }}>
                <div style={{ height: 200, background: '#13221C', overflow: 'hidden', position: 'relative', borderBottom: '3px solid #13221C' }}>
                  {!imgErrors[`g${loc.id}`] ? (
                    <img src={loc.image || thumbUrl(loc.videoId)} alt={loc.name}
                      onError={() => setImgErrors(p => ({ ...p, [`g${loc.id}`]: true }))}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, background: '#fff' }}>🏢</div>
                  )}
                  <span style={{
                    position: 'absolute', top: 16, right: 16, padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 900,
                    color: '#13221C', background: '#fcfaf5', border: '2px solid #13221C', boxShadow: '2px 2px 0px #13221C', textTransform: 'uppercase'
                  }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: dotColor(loc.avail), border: '1px solid #13221C', marginRight: 6 }}></span>
                    {availLabel(loc.avail)}
                  </span>
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <p style={{ fontSize: 24, fontWeight: 900, margin: 0, color: '#13221C', lineHeight: 1.1 }}>{loc.name}</p>
                    <span style={{ fontSize: 13, color: '#13221C', background: '#fde047', padding: '2px 8px', borderRadius: 4, border: '2px solid #13221C', fontWeight: 800 }}>{loc.seats} seats</span>
                  </div>
                  <p style={{ fontSize: 15, color: '#174F50', margin: '0 0 20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <img src={LocationIcon} alt="Location" style={{ width: 16, height: 16 }} />
                    {loc.area}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
                    {loc.tags.map(t => <span key={t} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 4, background: '#fcfaf5', color: '#13221C', border: '2px solid #13221C', fontWeight: 800, textTransform: 'uppercase' }}>{t}</span>)}
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

