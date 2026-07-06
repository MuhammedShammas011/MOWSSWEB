import { useState } from 'react';
import { locations, amenities, testimonials } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import FlowArt, { FlowSection } from '../components/ui/story-scroll';
import AnimatedCityScene from '../components/AnimatedCityScene';
import LocationIcon from '../assets/LocationBlack.png';

const accent = 'var(--color-amber-gold)';
const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const HoverText = ({ text }) => (
  <>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        whileHover={{ scale: 1.25, y: -4, color: '#174F50', rotate: (i % 2 === 0 ? 5 : -5) }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </>
);

export default function HomePage({ onNavigate }) {
  return (
    <FlowArt className="w-full overflow-x-hidden" aria-label="Mows HomePage Flow">

      {/* 1. Hero FlowSection */}
      <FlowSection
        aria-label="Hero"
        style={{
          backgroundColor: '#fcfaf5',
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          padding: '0 4vw',
          gap: '1rem',
          minHeight: '100vh',
        }}>
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: '1.5rem', maxWidth: 800, marginTop: '-10vh' }}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#174F50',
              border: '2px solid #13221C',
              padding: '6px 18px',
              fontFamily: "'Clash Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              color: '#ffffffff',
              boxShadow: '4px 4px 0px #000000ff',
              textTransform: 'uppercase',
            }}>
              CO-WORKING SPACE
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontFamily: "'Clash Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                lineHeight: 1.05,
                color: '#13221C',
                margin: 0,
                letterSpacing: '-0.02em',
                cursor: 'default',
              }}>
              <HoverText text="Find the space" /><br />
              <HoverText text="your " />
              <span style={{
                color: '#174F50',
                WebkitTextStroke: '2px #13221C',
                textShadow: '4px 4px 0px #13221C',
                display: 'inline-block',
              }}>
                <HoverText text="work" />
              </span>
              <br />
              <HoverText text="comes alive." />
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={itemVariants} style={{
              fontFamily: "'Clash Grotesk', sans-serif",
              fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
              color: 'rgba(11, 11, 11, 0.65)',
              fontWeight: 400,
              lineHeight: 1.50,
              margin: 0,
              maxWidth: 600,
            }}>
              Private desks, meeting rooms, high-speed internet, and a thriving community  designed to work as one for ambitious professionals and teams.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem', justifyContent: 'flex-start' }}>
              {/* Primary Button */}
              <motion.button
                onClick={() => onNavigate('booking')}
                whileHover={{ y: 3, x: 3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: "'Clash Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '14px 28px',
                  borderRadius: '100px',
                  border: '2px solid #13221C',
                  background: '#174F50',
                  color: '#ffffffff',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px #13221C',
                  transition: 'box-shadow 0.15s ease, transform 0.15s ease',
                }}
              >
                BOOK A DESK
              </motion.button>

              {/* Secondary Button */}
              <motion.button
                onClick={() => onNavigate('spaces')}
                whileHover={{ y: 3, x: 3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: "'Clash Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '14px 28px',
                  borderRadius: '100px',
                  border: '2px solid #13221C',
                  background: 'transparent',
                  color: '#13221C',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px #13221C',
                  transition: 'box-shadow 0.15s ease, transform 0.15s ease',
                }}
              >
                EXPLORE SPACES
              </motion.button>
            </motion.div>
          </motion.div>


        </div>
      </FlowSection>

      {/* Section Divider */}
      <div style={{ width: '100%', height: 6, backgroundColor: '#13221C', position: 'relative', zIndex: 10, marginTop: '-5rem' }}></div>

      {/* 2. Amenities FlowSection */}
      <FlowSection aria-label="Amenities" style={{ backgroundColor: '#fcfaf5', paddingBottom: '10rem', paddingTop: '6rem', backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        <div style={{ maxWidth: 1300, margin: 'auto', width: '100%' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            style={{ textAlign: 'left', maxWidth: 800, marginBottom: '4rem' }}
          >
            <motion.p variants={itemVariants} style={{ fontSize: 13, color: '#fff', background: '#174F50', boxShadow: '4px 4px 0px #13221C', display: 'inline-block', padding: '6px 14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800 }}>Enterprise-grade infrastructure</motion.p>
            <motion.h2 variants={itemVariants} style={{
              fontFamily: "'Clash Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 1.05,
              color: '#13221C',
              margin: '0 0 1.5rem',
              letterSpacing: '-0.02em',
            }}>
              <HoverText text="Everything you " />
              <span style={{
                color: '#174F50',
                WebkitTextStroke: '2px #13221C',
                textShadow: '4px 4px 0px #13221C',
                display: 'inline-block',
              }}>
                <HoverText text="need." />
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} style={{ fontSize: 18, color: textDark, lineHeight: 1.1, maxWidth: 600 }}>We handle the logistics so you can focus on building. Every membership includes unlimited access to our premium amenities.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}
          >
            {amenities.map((a, i) => {
              const colors = ['#fde047', '#fca5a5', '#86efac', '#93c5fd', '#d8b4fe', '#fdba74'];
              const cardColor = colors[i % colors.length];
              return (
                <motion.div
                  key={a.label}
                  variants={itemVariants}
                  whileHover={{ x: 3, y: 3, boxShadow: '2px 2px 0px #13221C' }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 16,
                    background: '#fcfaf5',
                    border: '2px solid #13221C',
                    boxShadow: '6px 6px 0px #13221C',
                    transition: 'box-shadow 0.15s ease, transform 0.15s ease',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ height: 8, background: cardColor, borderBottom: '2px solid #13221C' }} />
                  <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#13221C' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </div>
                    <p style={{ fontSize: 20, fontWeight: 800, margin: '0 0 10px', color: '#13221C' }}>{a.label}</p>
                    <p style={{ fontSize: 14, color: '#555', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{a.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </FlowSection>
      {/* Section Divider */}
      <div style={{ width: '100%', height: 6, backgroundColor: '#13221C', position: 'relative', zIndex: 10 }}></div>

      {/* 3. Locations FlowSection */}
      <FlowSection aria-label="Locations" style={{ paddingBottom: '10rem', paddingTop: '6rem', backgroundColor: '#fcfaf5', backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        <div style={{ maxWidth: 1300, margin: 'auto', width: '100%' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: 20 }}
          >
            <div style={{ maxWidth: 800, textAlign: 'left' }}>
              <motion.p variants={itemVariants} style={{ fontSize: 13, color: '#fff', background: '#174F50', boxShadow: '4px 4px 0px #13221C', display: 'inline-block', padding: '6px 14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800 }}>Our network</motion.p>
              <motion.h2 variants={itemVariants} style={{
                fontFamily: "'Clash Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                lineHeight: 1.05,
                color: '#13221C',
                margin: '0 0 1.5rem',
                letterSpacing: '-0.02em',
              }}>
                <HoverText text="Spaces near " />
                <span style={{
                  color: '#174F50',
                  WebkitTextStroke: '2px #13221C',
                  textShadow: '4px 4px 0px #13221C',
                  display: 'inline-block',
                }}>
                  <HoverText text="you." />
                </span>
              </motion.h2>
              <motion.p variants={itemVariants} style={{ fontSize: 18, color: textDark, lineHeight: 1.1, maxWidth: 600 }}>Strategically located in Kerala's top business districts. Seamlessly move between our spaces.</motion.p>
            </div>
            <motion.button
              variants={itemVariants}
              onClick={() => onNavigate('locations')}
              className="interactive"
              whileHover={{ y: 2, x: 2, boxShadow: '2px 2px 0px #13221C' }}
              whileTap={{ y: 4, x: 4, boxShadow: '0px 0px 0px #13221C', scale: 0.98 }}
              style={{
                background: 'var(--color-forest-teal)', color: '#fff', border: '2px solid #13221C', borderRadius: 100,
                padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                letterSpacing: '0.02em', boxShadow: '4px 4px 0px #13221C',
                transition: 'box-shadow 0.15s ease, transform 0.15s ease',
              }}
            >
              View all →
            </motion.button>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}
          >
            {locations.slice(0, 3).map((loc, i) => (
              <motion.div
                key={loc.id}
                variants={itemVariants}
                whileHover={loc.avail === 'coming soon' ? {} : { x: 3, y: 3, boxShadow: '2px 2px 0px #13221C' }}
                onClick={() => loc.avail !== 'coming soon' && onNavigate('locations')}
                className={loc.avail === 'coming soon' ? "" : "interactive"}
                style={{ padding: '16px', borderRadius: 24, background: '#e3f8ecff', overflow: 'hidden', cursor: loc.avail === 'coming soon' ? 'not-allowed' : 'pointer', opacity: loc.avail === 'coming soon' ? 0.55 : 1, filter: loc.avail === 'coming soon' ? 'grayscale(100%)' : 'none', border: '2px solid #13221C', boxShadow: '6px 6px 0px #13221C', transition: 'box-shadow 0.15s ease, transform 0.15s ease' }}
              >
                <div style={{ height: 180, borderRadius: 16, background: '#e2e8f0', overflow: 'hidden' }}>
                  <img src={loc.image ? loc.image : `https://img.youtube.com/vi/${loc.videoId}/hqdefault.jpg`} alt={loc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.2rem 0.2rem 0.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <p style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{loc.name}</p>
                    <span className="glass-panel-heavy" style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, color: loc.avail === 'coming soon' ? '#6b7280' : (loc.avail === 'open' ? '#059669' : '#d97706') }}>
                      {loc.avail === 'coming soon' ? 'Coming Soon' : (loc.avail === 'open' ? 'Available' : 'Limited')}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: textLight, margin: '0 0 16px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <img src={LocationIcon} alt="Location" style={{ width: 14, height: 14 }} />
                    {loc.area}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {loc.tags.map(t => <span key={t} className="glass-panel-heavy" style={{ fontSize: 11, padding: '4px 10px', borderRadius: 12, color: textLight, fontWeight: 600 }}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FlowSection>

      {/* Section Divider */}
      <div style={{ width: '100%', height: 6, backgroundColor: '#13221C', position: 'relative', zIndex: 10 }}></div>

      {/* 4. Franchise FlowSection */}
      <FlowSection aria-label="Franchise Segment" style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#f3e4c9ff',
        color: textDark,
        backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}>
        <div style={{ maxWidth: 1300, margin: 'auto', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            style={{ textAlign: 'left', flex: '1 1 500px', maxWidth: 600 }}
          >
            <motion.p variants={itemVariants} style={{ fontSize: 13, color: '#fff', background: '#174F50', boxShadow: '4px 4px 0px #13221C', display: 'inline-block', padding: '6px 14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800 }}>Partner with Mows</motion.p>
            <motion.h2 variants={itemVariants} style={{
              fontFamily: "'Clash Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 1.05,
              color: '#13221C',
              margin: '0 0 1.5rem',
              letterSpacing: '-0.02em',
            }}>
              <HoverText text="Build the future of " />
              <span style={{
                color: '#174F50',
                WebkitTextStroke: '2px #13221C',
                textShadow: '4px 4px 0px #13221C',
                display: 'inline-block',
              }}>
                <HoverText text="work." />
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} style={{ fontSize: 18, color: '#13221C', lineHeight: 1.1, margin: '0 0 2rem' }}>
              We are expanding across India. Partnering with MOWS means gaining access to our proven operational playbook and enterprise-grade tech.
            </motion.p>
            <motion.ul variants={itemVariants} style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['Turnkey operational model', 'Integrated ERP & Booking software', 'National marketing support', 'Architectural & design blueprints'].map((item, i) => (
                <li
                  key={item}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, fontSize: 16, fontWeight: 700, color: '#13221C',
                    background: '#ffffff',
                    border: '2px solid #13221C',
                    boxShadow: '4px 4px 0px #13221C',
                    padding: '12px 20px',
                    borderRadius: 12,
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', background: '#174F50', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 16, fontWeight: 900, border: '2px solid #13221C'
                  }}>✦</div>
                  {item}
                </li>
              ))}
            </motion.ul>
            <motion.button
              variants={itemVariants}
              onClick={() => onNavigate('contact')}
              className="interactive"
              whileHover={{ y: 2, x: 2, boxShadow: '2px 2px 0px #13221C' }}
              whileTap={{ y: 4, x: 4, boxShadow: '0px 0px 0px #13221C', scale: 0.98 }}
              style={{
                background: 'var(--color-forest-teal)', color: '#fff', border: '2px solid #13221C', borderRadius: 100,
                padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                letterSpacing: '0.02em', boxShadow: '4px 4px 0px #13221C',
                transition: 'box-shadow 0.15s ease, transform 0.15s ease',
              }}
            >
              Connect with Franchise Team →
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: '1 1 500px', minWidth: 320 }}
          >
            <AnimatedCityScene />
          </motion.div>
        </div>
      </FlowSection>

      {/* Section Divider */}
      <div style={{ width: '100%', height: 6, backgroundColor: '#13221C', position: 'relative', zIndex: 10 }}></div>

      {/* 5. Testimonials FlowSection */}
      <FlowSection aria-label="Testimonials" style={{ backgroundColor: '#fcfaf5', paddingTop: '6rem', paddingBottom: '6rem', backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        <div style={{ maxWidth: 1300, margin: 'auto', width: '100%', textAlign: 'left' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.p variants={itemVariants} style={{ fontSize: 13, color: '#fff', background: '#174F50', boxShadow: '4px 4px 0px #13221C', display: 'inline-block', padding: '6px 14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800 }}>Member stories</motion.p>
            <motion.h2 variants={itemVariants} style={{
              fontFamily: "'Clash Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 1.05,
              color: '#13221C',
              margin: '0 0 1.5rem',
              letterSpacing: '-0.02em',
            }}>
              <HoverText text="Loved by " />
              <span style={{
                color: '#174F50',
                WebkitTextStroke: '2px #13221C',
                textShadow: '4px 4px 0px #13221C',
                display: 'inline-block',
              }}>
                <HoverText text="People." />
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginTop: '4rem' }}
          >
            {testimonials.map((t, i) => {
              const colors = ['#fde047', '#fca5a5', '#86efac', '#93c5fd', '#d8b4fe', '#fdba74'];
              const cardColor = colors[i % colors.length];
              return (
                <motion.div
                  key={t.name}
                  variants={itemVariants}
                  whileHover={{ x: 4, y: 4, boxShadow: '2px 2px 0px #13221C' }}
                  style={{
                    borderRadius: 20,
                    background: '#ffffff',
                    border: '2px solid #13221C',
                    boxShadow: '6px 6px 0px #13221C',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.15s ease, transform 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Colored top bar */}
                  <div style={{ height: 8, background: cardColor, borderBottom: '2px solid #13221C' }} />

                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Big quote mark */}
                    <div style={{ fontSize: 64, lineHeight: 0.8, color: '#13221C', fontWeight: 900, opacity: 0.12, fontFamily: 'Georgia, serif', userSelect: 'none' }}>"</div>

                    {/* Stars */}
                    <div style={{ display: 'flex', gap: 3 }}>
                      {[...Array(t.rating)].map((_, j) => (
                        <span key={j} style={{ color: '#f59e0b', fontSize: 14 }}>★</span>
                      ))}
                    </div>

                    {/* Quote */}
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: '#13221C', margin: 0, fontWeight: 500, flex: 1 }}>"{t.text}"</p>

                    {/* Author */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, borderTop: '2px solid #13221C' }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 10,
                        background: cardColor, border: '2px solid #13221C',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 15, fontWeight: 900, color: '#13221C',
                        flexShrink: 0,
                      }}>
                        {t.name[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 800, margin: '0 0 2px', color: '#13221C' }}>{t.name}</p>
                        <p style={{ fontSize: 12, color: '#555', margin: 0, fontWeight: 600 }}>{t.role} · {t.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </FlowSection>

      {/* 6. CTA FlowSection */}
      <FlowSection aria-label="CTA Banner" style={{ backgroundColor: '#fcfaf5', paddingBottom: '6rem', backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        <div style={{ width: '100%', maxWidth: 1100, margin: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              borderRadius: 24,
              padding: '5rem 2rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#8bb8a9ff',
              border: '2px solid #13221C',
              boxShadow: '12px 12px 0px #13221C'
            }}
          >
            {/* Decorative background grid/elements */}
            <div style={{ position: 'absolute', top: -20, left: -20, opacity: 0.1, fontSize: 120 }}>✦</div>
            <div style={{ position: 'absolute', bottom: -20, right: -20, opacity: 0.1, fontSize: 120 }}>✦</div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <motion.h2 variants={itemVariants} style={{
                fontFamily: "'Clash Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.05,
                color: '#13221C',
                margin: '0 0 1.5rem',
                letterSpacing: '-0.02em',
              }}>
                <HoverText text="Ready to find " />
                <span style={{
                  color: '#fff',
                  WebkitTextStroke: '2px #13221C',
                  textShadow: '4px 4px 0px #13221C',
                  display: 'inline-block',
                }}>
                  <HoverText text="your space?" />
                </span>
              </motion.h2>
              <p style={{ fontSize: 18, color: '#13221C', margin: '0 auto 2.5rem', maxWidth: 540, lineHeight: 1.6, fontWeight: 700 }}>Book a free tour at any Mows location. No commitment needed. Experience the environment firsthand.</p>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button
                  onClick={() => onNavigate('booking')}
                  className="interactive"
                  whileHover={{ y: 2, x: 2, boxShadow: '2px 2px 0px #13221C' }}
                  whileTap={{ y: 4, x: 4, boxShadow: '0px 0px 0px #13221C', scale: 0.98 }}
                  style={{
                    background: 'var(--color-forest-teal)', color: '#fff', border: '2px solid #13221C', borderRadius: 100,
                    padding: '16px 32px', fontSize: 15, fontWeight: 800, cursor: 'pointer',
                    boxShadow: '4px 4px 0px #13221C', transition: 'box-shadow 0.15s ease, transform 0.15s ease'
                  }}
                >
                  Book a desk now
                </motion.button>
                <motion.button
                  onClick={() => onNavigate('contact')}
                  className="interactive"
                  whileHover={{ y: 2, x: 2, boxShadow: '2px 2px 0px #13221C' }}
                  whileTap={{ y: 4, x: 4, boxShadow: '0px 0px 0px #13221C', scale: 0.98 }}
                  style={{
                    background: '#fff', color: '#13221C', border: '2px solid #13221C', borderRadius: 100,
                    padding: '16px 32px', fontSize: 15, fontWeight: 800, cursor: 'pointer',
                    boxShadow: '4px 4px 0px #13221C', transition: 'box-shadow 0.15s ease, transform 0.15s ease'
                  }}
                >
                  Request a tour
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </FlowSection>

    </FlowArt>
  );
}
