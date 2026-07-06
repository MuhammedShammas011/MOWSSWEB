import { useState, useEffect } from 'react';
import { events } from '../data';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import eventDemo1 from '../assets/Events-1.jpg';
import eventDemo2 from '../assets/Events-2.jpg';
import eventDemo3 from '../assets/Events-3.jpg';
import eventDemo4 from '../assets/Events-4.jpg';
import eventDemo5 from '../assets/Events-5.jpg';

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

const textDark = '#13221C';
const textLight = '#174F50';
const yellow = '#fde047';
const bg = '#fcfaf5';

export default function EventsPage({ onNavigate }) {
  const [filter, setFilter] = useState('All');

  const eventImages = [eventDemo1, eventDemo2, eventDemo3, eventDemo4, eventDemo5];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex(prev => (prev + 1) % eventImages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Get unique categories including 'All'
  const categories = ['All', ...new Set(events.map(e => e.type))];

  const filteredEvents = filter === 'All'
    ? events
    : events.filter(e => e.type === filter);

  return (
    <div style={{ color: textDark, paddingTop: '50px', paddingBottom: '8rem', minHeight: '100vh', background: bg, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>

      {/* CSS Styles injection for Ticket design */}
      <style>{`
        .ticket-card {
          display: flex;
          flex-direction: row;
          border: 3px solid #13221C;
          border-radius: 12px;
          background: #fff;
          position: relative;
          box-shadow: 6px 6px 0px #13221C;
          transition: transform 0.15s, box-shadow 0.15s;
          overflow: visible;
        }
        .ticket-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: 10px 10px 0px #13221C;
        }
        .ticket-stub {
          width: 120px;
          flex-shrink: 0;
          background: #174F50;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border-right: 3px dashed #13221C;
          text-align: center;
          border-top-left-radius: 9px;
          border-bottom-left-radius: 9px;
        }
        .ticket-content {
          flex: 1;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-top-right-radius: 9px;
          border-bottom-right-radius: 9px;
          background: #fff;
        }
        .ticket-notch-top {
          position: absolute;
          top: -14px;
          left: 108px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fcfaf5;
          border: 3px solid #13221C;
          z-index: 5;
        }
        .ticket-notch-bottom {
          position: absolute;
          bottom: -14px;
          left: 108px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fcfaf5;
          border: 3px solid #13221C;
          z-index: 5;
        }
        @media (max-width: 768px) {
          .ticket-card {
            flex-direction: column;
          }
          .ticket-stub {
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
          .ticket-content {
            border-top-right-radius: 0;
            border-bottom-left-radius: 9px;
          }
          .ticket-notch-top {
            top: 76px;
            left: -14px;
          }
          .ticket-notch-bottom {
            top: 76px;
            right: -14px;
            left: auto;
          }
        }
      `}</style>

      {/* Header / Hero */}
      <section style={{ padding: '3rem 4vw 4rem', maxWidth: 1400, margin: '0 auto 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', flexWrap: 'wrap' }}>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: 1, minWidth: 320, maxWidth: 650, textAlign: 'left' }}
        >
          <p style={{ fontSize: 14, color: '#fff', background: '#174F50', display: 'inline-block', padding: '8px 16px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 800, border: '2px solid #13221C', boxShadow: '4px 4px 0px #13221C', transform: 'rotate(-2deg)' }}>
            Community & Growth
          </p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 1.5rem', lineHeight: 1.1 }}>
            <span style={{ color: '#13221C' }}>
              <HoverText text="Upcoming " defaultColor="#13221C" hoverColor="#174F50" />
            </span>
            <span style={{ color: '#174F50', WebkitTextStroke: '2px #13221C', textShadow: '6px 6px 0px #13221C', display: 'inline-block' }}>
              <HoverText text="Events." defaultColor="#174F50" hoverColor="#174F50" />
            </span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: textDark, maxWidth: 600, margin: '0', lineHeight: 1.6, fontWeight: 700 }}>
            Join workshops, pitch clinics, and networking mixers designed to help you connect, learn, and grow.
          </p>
        </motion.div>

        {/* Right side Slideshow */}
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
            {/* Tape effect */}
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%) rotate(-4deg)', width: 90, height: 26, background: '#fde047', border: '3px solid #13221C', zIndex: 10 }}></div>
            <img 
              src={eventImages[currentImgIndex]} 
              alt="Mows Event Demo" 
              style={{ width: '100%', height: 260, objectFit: 'cover', border: '3px solid #13221C', display: 'block' }} 
            />
          </div>
        </motion.div>
      </section>

      {/* Filters (Sticker Tabs) */}
      <section style={{ padding: '0 4vw', maxWidth: 1400, margin: '0 auto 4rem', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? '#174F50' : '#fff',
              color: filter === cat ? '#fff' : textDark,
              border: '3px solid #13221C',
              padding: '10px 24px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 900,
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: filter === cat ? '4px 4px 0px #13221C' : '2px 2px 0px #13221C',
              transform: `rotate(${idx % 2 === 0 ? 1 : -1}deg)`,
              transition: 'transform 0.1s, box-shadow 0.1s'
            }}
            onMouseEnter={e => {
              if (filter !== cat) {
                e.currentTarget.style.transform = 'scale(1.05) rotate(0deg)';
                e.currentTarget.style.boxShadow = '4px 4px 0px #13221C';
              }
            }}
            onMouseLeave={e => {
              if (filter !== cat) {
                e.currentTarget.style.transform = `rotate(${idx % 2 === 0 ? 1 : -1}deg)`;
                e.currentTarget.style.boxShadow = '2px 2px 0px #13221C';
              }
            }}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Events Grid */}
      <section style={{ padding: '0 4vw', maxWidth: 1400, margin: '0 auto 0 0' }}>
        {filteredEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: textDark, background: '#fff', border: '3px solid #13221C', borderRadius: 12, boxShadow: '6px 6px 0px #13221C', fontWeight: 700 }}>
            <p style={{ fontSize: 18, margin: 0 }}>No events found for this category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 36 }}>
            {filteredEvents.map((event) => {
              const [month, dateNum] = event.date.replace(',', '').split(' ');
              return (
                <div key={event.id} className="ticket-card">
                  {/* Ticket Notches */}
                  <div className="ticket-notch-top"></div>
                  <div className="ticket-notch-bottom"></div>

                  {/* Left / Top Date Stub */}
                  <div className="ticket-stub">
                    <p style={{ fontSize: 14, fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', color: yellow }}>{month}</p>
                    <p style={{ fontSize: 36, fontWeight: 900, margin: '4px 0 0', lineHeight: 1.1 }}>{dateNum}</p>
                    <p style={{ fontSize: 11, fontWeight: 900, margin: '8px 0 0', opacity: 0.8, textTransform: 'uppercase' }}>ADMIT ONE</p>
                  </div>

                  {/* Right / Bottom Main Content */}
                  <div className="ticket-content">
                    <div>
                      {/* Image Preview inside Ticket */}
                      <div style={{ height: 120, borderRadius: 8, overflow: 'hidden', border: '2px solid #13221C', marginBottom: 16 }}>
                        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      {/* Header details */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ fontSize: 11, fontWeight: 900, color: '#fff', background: '#13221C', padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase' }}>
                            {event.type}
                          </span>
                          <span style={{ fontSize: 13, fontWeight: 800, color: textLight, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <Clock size={14} /> {event.time}
                          </span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 800, color: textLight, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <MapPin size={14} /> {event.location}
                        </span>
                      </div>

                      <h3 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 8px', color: textDark, textTransform: 'uppercase', lineHeight: 1.2 }}>{event.title}</h3>
                      <p style={{ fontSize: 14, color: textDark, margin: '0 0 20px', lineHeight: 1.5, fontWeight: 600 }}>{event.desc}</p>
                    </div>

                    <button
                      onClick={() => {
                        alert('Registration for ' + event.title + ' is coming soon!');
                      }}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#a5ebcfff',
                        border: '3px solid #13221C',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 900,
                        color: textDark,
                        cursor: 'pointer',
                        transition: 'transform 0.1s, box-shadow 0.1s',
                        boxShadow: '4px 4px 0px #13221C',
                        textTransform: 'uppercase'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translate(-2px, -2px)';
                        e.currentTarget.style.boxShadow = '6px 6px 0px #13221C';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '4px 4px 0px #13221C';
                      }}
                    >
                      GRAB TICKET →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
