import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';

const textDark = '#13221C';
const textLight = '#174F50';
const yellow = '#fde047';
const bg = '#fcfaf5';

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

export default function ContactPage({ onNavigate }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', mobile: '', preferredLocation: '', isFranchise: false, message: '' });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ color: textDark, minHeight: '100vh', position: 'relative', background: bg, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>

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
          }}>Investment & Franchise</p>
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
            <span><HoverText text="LET'S" defaultColor="#13221C" hoverColor="#174F50" /></span>
            <span><HoverText text="BUILD" defaultColor="#13221C" hoverColor="#174F50" /></span>
            <span style={{ textShadow: '6px 6px 0px #13221C' }}>
              <HoverText text="TOGETHER." defaultColor="#174F50" />
            </span>
          </h1>
          <p style={{ fontSize: 18, color: textDark, margin: 0, fontWeight: 700 }}>
            Partner with Mows. Whether you're looking for lucrative investment opportunities or wanting to open your own franchise location, our team is ready to help you succeed.
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
              src="/ContactUpdated-1.png"
              alt="Mows Contact"
              style={{ width: '100%', height: 280, objectFit: 'cover', border: '3px solid #13221C', display: 'block' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Info & Form Body */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '4rem 2rem 6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'flex-start' }}>

        {/* Contact details */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: <MapPin size={24} />, t: 'Headquarters', d: 'PP TOWER, Bapputty by pass, Manjeri, Kerala 676121' },
              { icon: <Mail size={24} />, t: 'Email us', d: 'info@mows.in' },
              { icon: <Phone size={24} />, t: 'Call us', d: '+91 97 78 27 121' }
            ].map((item, idx) => (
              <div
                key={item.t}
                style={{
                  display: 'flex',
                  gap: 20,
                  background: '#fff',
                  border: '3px solid #13221C',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '5px 5px 0px #13221C',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  cursor: 'default',
                  transform: 'none'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '7px 7px 0px #13221C'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '5px 5px 0px #13221C'; }}
              >
                <div style={{ width: 48, height: 48, background: idx % 2 === 0 ? yellow : '#e3f8ecff', border: '2px solid #13221C', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: textDark, flexShrink: 0, boxShadow: '3px 3px 0px #13221C' }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 900, margin: '0 0 4px', textTransform: 'uppercase', color: textDark }}>{item.t}</p>
                  <p style={{ fontSize: 15, color: textLight, margin: 0, fontWeight: 700 }}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Form */}
        <div style={{ background: '#fff', border: '4px solid #13221C', borderRadius: 12, padding: '3rem', boxShadow: '12px 12px 0px #13221C' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: 80, height: 80, borderRadius: 12, background: yellow, border: '4px solid #13221C', color: textDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 1.5rem', fontWeight: 900, boxShadow: '6px 6px 0px #13221C' }}>✓</div>
              <h2 style={{ fontSize: 28, margin: '0 0 12px', fontWeight: 900, textTransform: 'uppercase', color: textDark }}>Message sent!</h2>
              <p style={{ color: textLight, fontSize: 16, margin: '0 0 2rem', fontWeight: 700 }}>Thanks for reaching out. Our team will get back to you within 24 hours.</p>
              <button
                onClick={() => setSent(false)}
                style={{
                  background: '#fff',
                  color: textDark,
                  border: '3px solid #13221C',
                  borderRadius: 8,
                  padding: '14px 28px',
                  fontSize: 15,
                  fontWeight: 900,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  boxShadow: '4px 4px 0px #13221C',
                  transition: 'transform 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translate(-2px, -2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 1rem', textTransform: 'uppercase', color: textDark, borderBottom: '3px dashed #13221C', paddingBottom: 16 }}>Send a message</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>Name <span style={{ color: '#dc2626' }}>*</span></label>
                  <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', background: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', boxShadow: '4px 4px 0px rgba(19, 34, 28, 0.1)', fontWeight: 700, transition: 'box-shadow 0.2s' }}
                    onFocus={e => e.target.style.boxShadow = '4px 4px 0px #13221C'}
                    onBlur={e => e.target.style.boxShadow = '4px 4px 0px rgba(19, 34, 28, 0.1)'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>Company</label>
                  <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={{ width: '100%', background: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', boxShadow: '4px 4px 0px rgba(19, 34, 28, 0.1)', fontWeight: 700, transition: 'box-shadow 0.2s' }}
                    onFocus={e => e.target.style.boxShadow = '4px 4px 0px #13221C'}
                    onBlur={e => e.target.style.boxShadow = '4px 4px 0px rgba(19, 34, 28, 0.1)'}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>Email <span style={{ color: '#dc2626' }}>*</span></label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: '100%', background: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', boxShadow: '4px 4px 0px rgba(19, 34, 28, 0.1)', fontWeight: 700, transition: 'box-shadow 0.2s' }}
                    onFocus={e => e.target.style.boxShadow = '4px 4px 0px #13221C'}
                    onBlur={e => e.target.style.boxShadow = '4px 4px 0px rgba(19, 34, 28, 0.1)'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>Mobile <span style={{ color: '#dc2626' }}>*</span></label>
                  <input required type="tel" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} style={{ width: '100%', background: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', boxShadow: '4px 4px 0px rgba(19, 34, 28, 0.1)', fontWeight: 700, transition: 'box-shadow 0.2s' }}
                    onFocus={e => e.target.style.boxShadow = '4px 4px 0px #13221C'}
                    onBlur={e => e.target.style.boxShadow = '4px 4px 0px rgba(19, 34, 28, 0.1)'}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>Preferred Location</label>
                <input type="text" placeholder="e.g. Manjeri, Calicut..." value={form.preferredLocation} onChange={e => setForm({ ...form, preferredLocation: e.target.value })} style={{ width: '100%', background: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', boxShadow: '4px 4px 0px rgba(19, 34, 28, 0.1)', fontWeight: 700, transition: 'box-shadow 0.2s' }}
                  onFocus={e => e.target.style.boxShadow = '4px 4px 0px #13221C'}
                  onBlur={e => e.target.style.boxShadow = '4px 4px 0px rgba(19, 34, 28, 0.1)'}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
                <input
                  type="checkbox"
                  id="franchise"
                  checked={form.isFranchise}
                  onChange={e => setForm({ ...form, isFranchise: e.target.checked })}
                  style={{ width: 22, height: 22, accentColor: '#174F50', cursor: 'pointer', border: '2px solid #13221C' }}
                />
                <label htmlFor="franchise" style={{ fontSize: 15, color: textDark, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase' }}>
                  I'm interested in Franchise opportunities
                </label>
              </div>
              <div>
                <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>Message</label>
                <textarea rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ width: '100%', background: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', boxShadow: '4px 4px 0px rgba(19, 34, 28, 0.1)', fontWeight: 700, transition: 'box-shadow 0.2s', resize: 'vertical' }}
                  onFocus={e => e.target.style.boxShadow = '4px 4px 0px #13221C'}
                  onBlur={e => e.target.style.boxShadow = '4px 4px 0px rgba(19, 34, 28, 0.1)'}
                ></textarea>
              </div>
              <button
                type="submit"
                style={{
                  background: yellow,
                  color: textDark,
                  border: '3px solid #13221C',
                  borderRadius: 8,
                  padding: '16px',
                  fontSize: 16,
                  fontWeight: 900,
                  cursor: 'pointer',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                  marginTop: 10,
                  boxShadow: '6px 6px 0px #13221C',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translate(-2px, -2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                Send message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
