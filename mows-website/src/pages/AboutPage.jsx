import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import shahilImg from '../assets/Shahil Mohammed K.jpg';
import nihalImg from '../assets/Mohammed Nihal C.jpg';
import irshadImg from '../assets/Irshad Puthiyakath.jpg';

const textDark = '#13221C';
const textLight = '#174F50';
const yellow = '#fde047';
const bg = '#fcfaf5';

const founders = [
  {
    name: 'Shahil Mohammed K',
    role: 'CEO, Co-Founder',
    initials: 'MS',
    color: '#fde047',
    image: shahilImg,
    quote: 'Leads vision, strategy, decisions, growth, operations, and overall company success.',
  },
  {
    name: 'Muhammed Nihal C',
    role: 'COO, Co-Founder',
    initials: 'MN',
    color: '#d1fae5',
    image: nihalImg,
    quote: 'Manages operations, efficiency, processes, resources, and ensures seamless business execution',
  },
  {
    name: 'Irshad Puthiyakath',
    role: 'CMO, Co-Founder',
    initials: 'IP',
    color: '#bfdbfe',
    image: irshadImg,
    quote: 'Drives marketing strategy, branding, customer engagement, growth, and market positioning',
  },
];

const timeline = [
  { year: '2021', title: 'The Idea', desc: 'Two friends, frustrated by the lack of professional workspaces in Malappuram, sketch out a bold concept on a napkin at a local cafe.' },
  { year: '2022', title: 'Planning & Design', desc: 'Months of research, community interviews, and design iterations shape the blueprint for what Mows would become — a workspace built around people.' },
  { year: '2023', title: 'Mows Manjeri Opens', desc: 'The flagship Mows Manjeri launches with 250 seats, a podcast studio, photo studio, and an electric community of founding members.' },
  { year: '2024', title: 'Expansion Begins', desc: 'Mows announces locations in Kozhikode and Perinthalmanna, bringing the same premium coworking experience to more of Kerala.' },
  { year: '2025+', title: 'The Future', desc: 'With a franchise model and growing demand, Mows is on track to become Kerala\'s leading network of premium coworking spaces.' },
];

const stats = [
  { value: '200+', label: 'Active Members' },
  { value: '2021', label: 'Founded' },
  { value: '100%', label: 'Community Built' },
];

function FadeInWhenVisible({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const HoverText = ({ text, defaultColor, hoverColor }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              whileHover={{ scale: 1.25, y: -4, color: hoverColor || defaultColor, rotate: (charIndex % 2 === 0 ? 5 : -5) }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              style={{ display: 'inline-block', transformOrigin: 'bottom center', color: defaultColor }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </>
  );
};

export default function AboutPage({ onNavigate }) {
  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: "'Clash Grotesk', sans-serif", color: textDark }}>
      <style>{`
        .origin-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .origin-stats-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .founders-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
        .values-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        
        @media (max-width: 900px) {
          .founders-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .origin-grid { grid-template-columns: 1fr; gap: 2.5rem !important; }
          .origin-stats-grid { grid-template-columns: 1fr; }
          .founders-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: 1fr; }
          .value-card { margin-left: 0 !important; margin-top: -3px !important; }
          .value-card:first-child { margin-top: 0 !important; }
          
          .journey-line { left: 20px !important; }
          .journey-marker { left: 20px !important; width: 60px !important; font-size: 12px !important; height: 32px !important; }
          .journey-connector { left: 20px !important; width: 30px !important; top: 12px !important; }
          .journey-card { margin-left: 65px !important; padding: 1.5rem !important; border-top-left-radius: 20px !important; border-bottom-right-radius: 20px !important; }
          .journey-card p:first-of-type { font-size: 20px !important; }
        }
      `}</style>

      {/* Shared Grid Wrapper for Hero and Stats */}
      <div style={{ position: 'relative', backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>

      {/* Hero */}
      <section style={{
        padding: '8rem 2rem 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-block', background: yellow, border: '3px solid #13221C', boxShadow: '4px 4px 0px #13221C', borderRadius: 6, padding: '6px 16px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: textDark, marginBottom: '1.5rem' }}
          >
            Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 1.5rem', color: textDark, letterSpacing: '-0.03em' }}
          >
            <HoverText text="We did not find the" defaultColor={textDark} hoverColor={textLight} /><br />
            <span style={{
              color: '#174F50',
              WebkitTextStroke: '1px #13221C',
              textShadow: '4px 4px 0px #13221C',
              display: 'inline-block',
            }}>
              <HoverText text="workspace we wanted." defaultColor="#174F50" hoverColor="#174F50" />
            </span>
            <br />
            <HoverText text="So we built it." defaultColor={textDark} hoverColor={textLight} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 18, lineHeight: 1.7, color: textDark, maxWidth: 640, fontWeight: 600, margin: 0 }}
          >
            Three founders, united by one mission: disrupting industries, challenging limits, and leading MOWS with passion, creativity, and relentless determination to redefine what’s possible.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ 
        padding: '2.5rem 2rem', 
        position: 'relative', 
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap', position: 'relative' }}>
          {/* Connector line behind */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: 4,
            backgroundColor: '#13221C',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }}></div>

          {stats.map((s, i) => (
            <div key={i} style={{ 
              background: '#d1fae5', 
              border: '3px solid #13221C', 
              borderRadius: 12, 
              padding: '1.25rem 1.5rem', 
              flex: 1, 
              minWidth: 150, 
              boxShadow: '6px 6px 0px #13221C', 
              textAlign: 'center', 
              position: 'relative', 
              zIndex: 1,
              transition: 'transform 0.15s, box-shadow 0.15s',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '8px 8px 0px #13221C';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '6px 6px 0px #13221C';
            }}
            >
              <p style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, margin: 0, color: '#000', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '6px 0 0', color: '#174F50' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* Origin Story */}
      <section style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden', borderBottom: '4px solid #13221C' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div className="origin-grid" style={{ maxWidth: 1100, margin: '0 auto', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <FadeInWhenVisible>
            <div>
              <p style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: textLight, marginBottom: '1rem' }}>— Where it started</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 1.5rem', color: textDark }}>
                A napkin sketch in a Manjeri cafe.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: textDark, fontWeight: 600, margin: '0 0 1rem', opacity: 0.85 }}>
                In 2021, two childhood friends sat across a table in Manjeri, both struggling with the same problem: nowhere in their hometown offered the kind of professional environment needed to build something great.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: textDark, fontWeight: 600, margin: 0, opacity: 0.85 }}>
                They mapped out a coworking space concept — one with professional amenities, a real community, and no compromise on quality. That sketch became Mows. What started as a single floor in Manjeri is now a growing network across Kerala.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.15}>
            <div className="origin-stats-grid" style={{ gap: '1rem' }}>
              {[
                { label: 'Founded', value: '2021', bg: yellow, light: false },
                { label: 'First Member', value: '2023', bg: '#fff', light: false },
                { label: 'Cities', value: '3', bg: textLight, light: true },
                { label: 'Our Goal', value: '10+ cities', bg: '#fff', light: false },
              ].map((c, i) => (
                <div key={i} style={{
                  background: c.bg,
                  border: '3px solid #13221C',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '5px 5px 0px #13221C',
                }}>
                  <p style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: c.light ? 'rgba(255,255,255,0.7)' : textLight, margin: '0 0 8px' }}>{c.label}</p>
                  <p style={{ fontSize: 26, fontWeight: 900, margin: 0, color: c.light ? '#fff' : textDark }}>{c.value}</p>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Founders */}
      <section style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden', borderBottom: '4px solid #13221C' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <FadeInWhenVisible>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ display: 'inline-block', background: yellow, border: '3px solid #13221C', boxShadow: '4px 4px 0px #13221C', borderRadius: 6, padding: '6px 16px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: textDark, marginBottom: '1rem' }}>The People Behind Mows</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: textDark, margin: 0, letterSpacing: '-0.02em' }}>Meet the Founders</h2>
            </div>
          </FadeInWhenVisible>

          <div className="founders-grid" style={{ gap: '2rem' }}>
            {founders.map((f, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, rotate: 0.4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  style={{
                    background: '#fff',
                    border: '4px solid #13221C',
                    borderRadius: 0,
                    boxShadow: '8px 8px 0px #13221C',
                    position: 'relative',
                    overflow: 'visible',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  {/* 9:16 Portrait Photo Area */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '9/16',
                    maxHeight: 420,
                    background: f.image
                      ? `url(${f.image}) ${f.photoPosition || 'center'}/cover no-repeat`
                      : `linear-gradient(145deg, ${f.color} 0%, ${f.color}cc 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                    borderBottom: '4px solid #13221C',
                    flexShrink: 0,
                  }}>
                    {/* Diagonal slash accent */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0,
                      width: '100%', height: 70,
                      background: '#13221C',
                      clipPath: 'polygon(0 60%, 100% 0%, 100% 100%, 0% 100%)',
                    }} />

                    {/* Initials watermark */}
                    {!f.image && (
                      <span style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -60%)',
                        fontSize: 96, fontWeight: 900, color: '#13221C', opacity: 0.12,
                        lineHeight: 1, userSelect: 'none',
                      }}>
                        {f.initials}
                      </span>
                    )}

                    {/* Role badge — pinned to bottom of photo, overlapping the slash */}
                    <div style={{
                      position: 'absolute', bottom: 12, left: 20,
                      background: yellow,
                      border: '2.5px solid #13221C',
                      boxShadow: '3px 3px 0px #13221C',
                      padding: '4px 12px',
                      fontSize: 11, fontWeight: 900,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: textDark,
                      zIndex: 4,
                    }}>
                      {f.role}
                    </div>
                  </div>

                  {/* Info section */}
                  <div style={{ padding: '1.8rem 1.8rem 2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <p style={{ fontSize: 22, fontWeight: 900, margin: '0 0 1.2rem', color: textDark, letterSpacing: '-0.02em' }}>
                      {f.name}
                    </p>
                    <p style={{
                      fontSize: 14, fontStyle: 'italic', lineHeight: 1.6,
                      color: textDark, fontWeight: 700,
                      margin: '0 0 1.2rem',
                      paddingLeft: '1rem',
                      borderLeft: '4px solid #fde047',
                    }}>
                      "{f.quote}"
                    </p>
                    <p style={{ fontSize: 13, lineHeight: 1.75, color: textDark, fontWeight: 600, opacity: 0.8, margin: 0, marginTop: 'auto' }}>
                      {f.story}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    width: 32, height: 32,
                    background: yellow,
                    border: '3px solid #13221C',
                    zIndex: 5,
                  }} />
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden', borderBottom: '4px solid #13221C' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <FadeInWhenVisible>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <p style={{ display: 'inline-block', background: textLight, border: '3px solid #13221C', boxShadow: '4px 4px 0px #13221C', borderRadius: 6, padding: '6px 16px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '1rem' }}>
                The Journey
              </p>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: textDark, margin: 0, letterSpacing: '-0.03em' }}>From Idea to Movement</h2>
            </div>
          </FadeInWhenVisible>

          <div style={{ position: 'relative', paddingBottom: '2rem' }}>
            {/* Animated Vertical Line */}
            <motion.div 
              className="journey-line"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ position: 'absolute', left: 40, top: 0, width: 8, background: textDark, transform: 'translateX(-50%)', zIndex: 1 }} 
            />
            
            {timeline.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 60, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: 0.2 + (i * 0.15), type: 'spring', damping: 20 }}
                style={{ position: 'relative', marginBottom: i === timeline.length - 1 ? 0 : '4rem', display: 'flex' }}
              >
                {/* Year Marker on the line */}
                <div className="journey-marker" style={{ 
                  width: 80, height: 40, 
                  background: i % 2 === 0 ? yellow : textLight, 
                  border: '4px solid #13221C', 
                  borderRadius: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontWeight: 900, fontSize: 14, color: i % 2 === 0 ? textDark : '#fff', 
                  boxShadow: '4px 4px 0px #13221C', 
                  position: 'absolute', left: 40, top: 0, 
                  transform: 'translate(-50%, 0)', 
                  zIndex: 3 
                }}>
                  {t.year}
                </div>

                {/* Connecting horizontal line */}
                <div className="journey-connector" style={{ position: 'absolute', left: 40, top: 16, width: 40, height: 8, background: textDark, zIndex: 0 }} />

                {/* Content Card */}
                <motion.div
                  className="journey-card"
                  whileHover={{ scale: 1.02, x: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ 
                    marginLeft: 100,
                    background: '#fff', border: '4px solid #13221C', borderRadius: 0, 
                    padding: '2.5rem', boxShadow: '10px 10px 0px #13221C', 
                    flex: 1, position: 'relative',
                    borderTopLeftRadius: 32, borderBottomRightRadius: 32
                  }}
                >
                  <div style={{ width: 40, height: 8, background: textLight, border: '2px solid #13221C', marginBottom: '1.2rem' }} />
                  <p style={{ fontSize: 26, fontWeight: 900, margin: '0 0 12px', color: textDark, letterSpacing: '-0.02em' }}>{t.title}</p>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: textDark, fontWeight: 600, opacity: 0.85, margin: 0 }}>{t.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden', borderBottom: '4px solid #13221C' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <FadeInWhenVisible>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}>
              <div>
                <p style={{ display: 'inline-block', background: yellow, border: '3px solid #13221C', boxShadow: '4px 4px 0px #13221C', borderRadius: 6, padding: '6px 16px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: textDark, marginBottom: '1rem' }}>Our Values</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: textDark, margin: 0, letterSpacing: '-0.02em' }}>What Drives Us</h2>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: textDark, fontWeight: 600, opacity: 0.7, maxWidth: 340, margin: 0 }}>
                Four principles that shape every decision, every design, and every community we build.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="values-grid" style={{ gap: '0' }}>
            {[
              { num: '01', title: 'Built Local', svgPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10', desc: 'Mows was built by Malappuram people for Malappuram people. We are not a chain — we are a community.', accent: yellow },
              { num: '02', title: 'Relentless Quality', svgPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', desc: "From the Wi-Fi speed to the chair, every detail is obsessed over. Premium isn't optional.", accent: '#d1fae5' },
              { num: '03', title: 'Community First', svgPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75', desc: 'A workspace without community is just a room. We invest in the people who use our spaces.', accent: '#bfdbfe' },
              { num: '04', title: 'Built to Grow', svgPath: 'M23 6L13.5 15.5l-5-5L1 18 M17 6h6v6', desc: 'We think long term. Every Mows branch is designed to anchor its city and expand opportunities.', accent: '#fce7f3' },
            ].map((v, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.07}>
                <motion.div
                  className="value-card"
                  whileHover={{ backgroundColor: v.accent, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: '#fff',
                    border: '3px solid #13221C',
                    borderRadius: 0,
                    padding: '3rem 2.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    marginTop: i < 2 ? 0 : -3,
                    marginLeft: i % 2 === 1 ? -3 : 0,
                    cursor: 'default',
                  }}
                >
                  {/* Large background number */}
                  <span style={{
                    position: 'absolute', top: -10, right: 16,
                    fontSize: 120, fontWeight: 900, color: textDark, opacity: 0.05,
                    lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                  }}>
                    {v.num}
                  </span>

                  {/* Accent top bar */}
                  <div style={{ width: 48, height: 5, background: v.accent, border: '2px solid #13221C', marginBottom: '1.5rem' }} />

                  {/* SVG Icon box */}
                  <div style={{ width: 48, height: 48, background: textDark, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {i === 0 && <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
                      {i === 1 && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>}
                      {i === 2 && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
                      {i === 3 && <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>}
                    </svg>
                  </div>

                  <p style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: textLight, margin: '0 0 0.5rem' }}>{v.num}</p>
                  <p style={{ fontSize: 22, fontWeight: 900, margin: '0 0 1rem', color: textDark, letterSpacing: '-0.01em' }}>
                    {v.title}
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: textDark, fontWeight: 600, opacity: 0.8, margin: 0 }}>{v.desc}</p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: '#d1fae5', borderBottom: '4px solid #13221C', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
        <FadeInWhenVisible>
          <p style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: textLight, marginBottom: '1rem' }}>Join the movement</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: textDark, margin: '0 0 1.5rem', letterSpacing: '-0.02em' }}>
            Be part of something bigger.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: textDark, opacity: 0.75, fontWeight: 600, maxWidth: 480, margin: '0 auto 2.5rem' }}>
            Whether you are a freelancer, startup, or enterprise — there is a seat at Mows waiting for you.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ y: -4, boxShadow: '8px 8px 0px #13221C' }}
              whileTap={{ y: 0, boxShadow: '2px 2px 0px #13221C' }}
              onClick={() => onNavigate('spaces')}
              style={{ background: textDark, color: '#fff', border: '3px solid #13221C', borderRadius: 10, padding: '18px 36px', fontSize: 16, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '5px 5px 0px #13221C', transition: 'box-shadow 0.15s, transform 0.15s' }}
            >
              See our spaces
            </motion.button>
            <motion.button
              whileHover={{ y: -4, boxShadow: '8px 8px 0px #13221C' }}
              whileTap={{ y: 0, boxShadow: '2px 2px 0px #13221C' }}
              onClick={() => onNavigate('contact')}
              style={{ background: '#fff', color: textDark, border: '3px solid #13221C', borderRadius: 10, padding: '18px 36px', fontSize: 16, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '5px 5px 0px #13221C', transition: 'box-shadow 0.15s, transform 0.15s' }}
            >
              Get in touch
            </motion.button>
          </div>
        </FadeInWhenVisible>
        </div>
      </section>

    </div>
  );
}
