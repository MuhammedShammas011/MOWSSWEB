import { useState } from 'react';
import { motion } from 'framer-motion';
import LocationIcon from '../assets/LocationBlack.png';

const textDark = '#13221C';
const textLight = '#174F50';
const yellow = '#fde047';
const bg = '#fcfaf5';

const events = [
  { id: 1, date: 'May 14', title: 'Founder Fireside: Scaling in Kerala', loc: 'Mows Manjeri', type: 'Networking', spots: 12 },
  { id: 2, date: 'May 18', title: 'Design Sprint Workshop', loc: 'Mows Kozhikode', type: 'Workshop', spots: 8 },
  { id: 3, date: 'May 22', title: 'AI & Automation for SMBs', loc: 'Mows Perinthalmanna', type: 'Talk', spots: 30 },
  { id: 4, date: 'May 28', title: 'Monthly Member Mixer', loc: 'Mows Manjeri', type: 'Social', spots: 50 },
  { id: 5, date: 'Jun 5', title: 'Product Demo Day', loc: 'Mows Kozhikode', type: 'Showcase', spots: 40 },
  { id: 6, date: 'Jun 12', title: 'Freelancer Fundamentals', loc: 'Mows Perinthalmanna', type: 'Workshop', spots: 15 },
];

const typeColors = { Networking: '#059669', Workshop: '#2563eb', Talk: '#d97706', Social: '#7c3aed', Showcase: '#0d9488' };

const blog = [
  { date: 'Apr 28', title: "Why Kochi is becoming South India's startup hub", tag: 'Ecosystem', read: '4 min' },
  { date: 'Apr 15', title: 'How 3 Mows members landed their first clients from the common area', tag: 'Member stories', read: '3 min' },
  { date: 'Apr 2', title: 'Hot desk vs dedicated desk: which is right for you?', tag: 'Guide', read: '5 min' },
];

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

export default function CommunityPage({ onNavigate }) {
  const [rsvpd, setRsvpd] = useState(new Set());
  const [spotCounts, setSpotCounts] = useState(() => Object.fromEntries(events.map(e => [e.id, e.spots])));

  function toggleRsvp(id) {
    setRsvpd(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setSpotCounts(s => ({ ...s, [id]: s[id] + 1 }));
      } else {
        next.add(id);
        setSpotCounts(s => ({ ...s, [id]: Math.max(0, s[id] - 1) }));
      }
      return next;
    });
  }

  return (
    <div style={{ color: textDark, minHeight: '100vh', position: 'relative', background: bg, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>

      {/* CSS Styles injection for Ticket design */}
      <style>{`
        .community-ticket {
          display: flex;
          flex-direction: row;
          border: 3px solid #13221C;
          border-radius: 12px;
          background: #fff;
          position: relative;
          box-shadow: 4px 4px 0px #13221C;
          transition: transform 0.15s, box-shadow 0.15s;
          overflow: visible;
        }
        .community-ticket:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px #13221C;
        }
        .community-stub {
          width: 100px;
          flex-shrink: 0;
          background: #174F50;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px;
          border-right: 3px dashed #13221C;
          text-align: center;
          border-top-left-radius: 9px;
          border-bottom-left-radius: 9px;
        }
        .community-content {
          flex: 1;
          padding: 16px 24px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          background: #fff;
          border-top-right-radius: 9px;
          border-bottom-right-radius: 9px;
        }
        .community-notch-top {
          position: absolute;
          top: -14px;
          left: 88px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fcfaf5;
          border: 3px solid #13221C;
          z-index: 5;
        }
        .community-notch-bottom {
          position: absolute;
          bottom: -14px;
          left: 88px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fcfaf5;
          border: 3px solid #13221C;
          z-index: 5;
        }
        @media (max-width: 768px) {
          .community-ticket {
            flex-direction: column;
          }
          .community-stub {
            width: 100%;
            border-right: none;
            border-bottom: 3px dashed #13221C;
            flex-direction: row;
            gap: 16px;
            justify-content: center;
            border-top-left-radius: 9px;
            border-top-right-radius: 9px;
            border-bottom-left-radius: 0;
          }
          .community-content {
            flex-direction: column;
            align-items: flex-start;
            border-top-right-radius: 0;
            border-bottom-left-radius: 9px;
          }
          .community-notch-top {
            top: 76px;
            left: -14px;
          }
          .community-notch-bottom {
            top: 76px;
            right: -14px;
            left: auto;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ minHeight: '60vh', padding: '8rem 4vw 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', flexWrap: 'wrap' }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: 1, minWidth: 320, maxWidth: 650, textAlign: 'left' }}
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
          }}>Mows community</p>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            margin: '0 0 1.5rem',
            color: textDark,
            WebkitTextStroke: '2px #13221C',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <span><HoverText text="MORE" defaultColor="#13221C" hoverColor="#174F50" /></span>
            <span><HoverText text="THAN" defaultColor="#13221C" hoverColor="#174F50" /></span>
            <span style={{ textShadow: '6px 6px 0px #13221C' }}>
              <HoverText text="A DESK." defaultColor="#174F50" />
            </span>
          </h1>
          <p style={{ fontSize: 18, color: textDark, margin: 0, fontWeight: 700 }}>
            Events, workshops, and connections that help you grow — included with every membership. Join a network of ambitious builders.
          </p>
        </motion.div>

        {/* Right side Polaroid image */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5 }}
        >
          <div style={{
            background: '#fff',
            padding: '12px 12px 32px 12px',
            borderRadius: 4,
            border: '4px solid #13221C',
            boxShadow: '10px 10px 0px #13221C',
            transform: 'rotate(2deg)',
            maxWidth: 380,
            width: '100%',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%) rotate(-4deg)', width: 90, height: 26, background: '#fde047', border: '3px solid #13221C', zIndex: 10 }}></div>
            <img
              src="/community-bg.png"
              alt="Mows Community"
              style={{ width: '100%', height: 260, objectFit: 'cover', border: '3px solid #13221C', display: 'block' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '4rem 2rem 6rem' }}>

        {/* Stat strip */}
        <div style={{ display: 'flex', gap: 24, marginBottom: '5rem', flexWrap: 'wrap', position: 'relative' }}>
          {/* Connector line behind (stretches full width of the page viewport) */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: 6,
            backgroundColor: '#13221C',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }}></div>

          {[['1,200+', 'Active members'], ['40+', 'Events per year'], ['18', 'Community partners'], ['₹2Cr+', 'Deals made here']].map(([n, l]) => (
            <div key={l} style={{ background: '#c5f8d9ff', border: '3px solid #13221C', borderRadius: 12, padding: '2rem', flex: 1, minWidth: 200, boxShadow: '4px 4px 0px #13221C', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 36, fontWeight: 900, margin: 0, color: textDark }}>{n}</p>
              <p style={{ fontSize: 14, color: textLight, margin: '8px 0 0', fontWeight: 800, textTransform: 'uppercase' }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Events Section */}
        <div style={{ marginBottom: '6rem', background: '#fff', border: '4px solid #13221C', padding: '4rem 3vw', boxShadow: '12px 12px 0px #13221C' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0, textTransform: 'uppercase', color: textDark }}>Upcoming events</h2>
            <span style={{ fontSize: 13, padding: '8px 16px', borderRadius: 8, color: '#fff', background: '#13221C', fontWeight: 900, textTransform: 'uppercase', border: '2px solid #13221C', boxShadow: '3px 3px 0px #174F50' }}>Open to all members</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {events.map((e) => {
              const isRsvpd = rsvpd.has(e.id);
              const spots = spotCounts[e.id];
              const full = spots === 0;
              const [month, dateNum] = e.date.split(' ');
              return (
                <div key={e.id} className="community-ticket">
                  {/* Ticket Notches */}
                  <div className="community-notch-top"></div>
                  <div className="community-notch-bottom"></div>

                  {/* Left stub */}
                  <div className="community-stub" style={{ background: isRsvpd ? '#174F50' : '#13221C' }}>
                    <p style={{ fontSize: 13, color: yellow, margin: 0, textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.05em' }}>{month}</p>
                    <p style={{ fontSize: 32, fontWeight: 900, margin: '2px 0 0', lineHeight: 1.1 }}>{dateNum}</p>
                  </div>

                  {/* Right Content details */}
                  <div className="community-content">
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: '#13221C', color: '#fff', fontWeight: 900, textTransform: 'uppercase' }}>{e.type}</span>
                      </div>
                      <p style={{ fontSize: 18, fontWeight: 900, margin: '0 0 4px', color: textDark, textTransform: 'uppercase' }}>{e.title}</p>
                      <p style={{ fontSize: 14, color: textLight, margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <img src={LocationIcon} alt="Location" style={{ width: 14, height: 14 }} />
                        {e.loc}
                      </p>
                    </div>

                    <button
                      onClick={() => alert("Registration not opened")}
                      style={{
                        background: yellow,
                        color: textDark,
                        border: '3px solid #13221C',
                        borderRadius: 8,
                        padding: '10px 24px',
                        fontSize: 14,
                        fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'transform 0.1s, box-shadow 0.1s',
                        textTransform: 'uppercase',
                        boxShadow: '4px 4px 0px #13221C'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translate(-2px, -2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                    >
                      Register
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {rsvpd.size > 0 && (
            <div style={{ marginTop: 32, padding: '1.5rem 2rem', borderRadius: 8, fontSize: 15, color: textDark, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, background: '#e3f8ecff', border: '3px solid #13221C', boxShadow: '4px 4px 0px #13221C' }}>
              <span style={{ color: '#059669', fontWeight: 900, fontSize: 20 }}>✓</span>
              You are registered for <strong style={{ color: '#174F50' }}>{rsvpd.size}</strong> event{rsvpd.size > 1 ? 's' : ''}. We look forward to seeing you!
            </div>
          )}
        </div>

        {/* Blog section */}
        <div style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 2.5rem', textTransform: 'uppercase', color: textDark }}>From the blog</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {blog.map((b, i) => (
              <div key={b.title} style={{ background: '#fff', border: '3px solid #13221C', borderRadius: 12, padding: '2.5rem', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', boxShadow: '6px 6px 0px #13221C', transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-4px, -4px) rotate(0deg)'; e.currentTarget.style.boxShadow = '10px 10px 0px #13221C'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? -1 : 1}deg)`; e.currentTarget.style.boxShadow = '6px 6px 0px #13221C'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ fontSize: 11, padding: '4px 12px', borderRadius: 4, background: '#13221C', color: '#fff', fontWeight: 900, textTransform: 'uppercase' }}>{b.tag}</span>
                  <span style={{ fontSize: 13, color: textLight, fontWeight: 800 }}>{b.read} read</span>
                </div>
                <p style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.4, margin: '0 0 20px', color: textDark, textTransform: 'uppercase' }}>{b.title}</p>
                <p style={{ fontSize: 14, color: textLight, margin: 0, fontWeight: 700 }}>{b.date}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderRadius: 12, padding: '3.5rem 2rem', textAlign: 'center', background: '#8bb8a9ff', border: '4px solid #13221C', boxShadow: '12px 12px 0px #13221C', position: 'relative', overflow: 'hidden', maxWidth: 960, margin: '0 auto' }}>
          {/* Sparkles Decals */}
          <div style={{ position: 'absolute', top: 12, left: 16, color: '#fff', opacity: 0.15, fontSize: 60, fontFamily: 'Georgia, serif', pointerEvents: 'none', userSelect: 'none' }}>✦</div>
          <div style={{ position: 'absolute', bottom: 12, right: 24, color: '#fff', opacity: 0.15, fontSize: 70, fontFamily: 'Georgia, serif', pointerEvents: 'none', userSelect: 'none' }}>✦</div>
          {/* <div style={{ position: 'absolute', top: '15%', right: '10%', color: '#fff', opacity: 0.1, fontSize: 120, fontFamily: 'Georgia, serif', pointerEvents: 'none', userSelect: 'none' }}>✦</div>
          <div style={{ position: 'absolute', bottom: '10%', left: '5%', color: '#fff', opacity: 0.08, fontSize: 140, fontFamily: 'Georgia, serif', pointerEvents: 'none', userSelect: 'none' }}>✦</div> */}

          {/* Join Now Sash Sticker */}
          <div style={{ position: 'absolute', top: 12, right: -12, background: yellow, color: textDark, border: '2px solid #13221C', padding: '4px 24px', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', transform: 'rotate(-5deg)', boxShadow: '2px 2px 0px #13221C' }}>
            JOIN NOW
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '0 0 1rem', textTransform: 'uppercase', color: '#fff', WebkitTextStroke: '1px #13221C', textShadow: '4px 4px 0px #13221C', fontWeight: 900 }}>
            <span style={{ color: '#13221C', textShadow: 'none', WebkitTextStroke: 'none' }}>Join a space</span>, join a community
          </h2>
          <p style={{ fontSize: 16, color: '#000000ff', margin: '0 auto 2rem', maxWidth: 540, lineHeight: 1.6, fontWeight: 700 }}>Every Mows membership includes access to all events and our shared member network.</p>
          <button onClick={() => onNavigate('booking')} style={{ background: '#ffffffff', color: textDark, border: '3px solid #13221C', borderRadius: 8, padding: '14px 28px', fontSize: 15, fontWeight: 900, cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', textTransform: 'uppercase', boxShadow: '6px 6px 0px #13221C' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '8px 8px 0px #13221C'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '6px 6px 0px #13221C'; }}
          >Get a membership →</button>
        </div>
      </div>
    </div>
  );
}
