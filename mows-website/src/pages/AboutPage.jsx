import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const textDark = '#13221C';
const textLight = '#174F50';
const yellow = '#fde047';
const bg = '#fcfaf5';

const founders = [
  {
    name: 'Mohammed Shahal',
    role: 'Co-Founder & CEO',
    initials: 'MS',
    color: '#fde047',
    quote: 'We built Mows because we believed every ambitious person in Malappuram deserves a world-class workspace — not just in metro cities.',
    story: 'Shahal saw first-hand how talented professionals in Malappuram were forced to work from noisy homes or travel hours to find a good workspace. He decided to change that, channeling his passion for community into creating a space where ideas flourish.',
  },
  {
    name: 'Mohammed Shafeeq',
    role: 'Co-Founder & COO',
    initials: 'MS',
    color: '#d1fae5',
    quote: 'Operations is about removing friction. Every detail at Mows — from the Wi-Fi speed to the chair ergonomics — is intentional.',
    story: 'Shafeeq brings operational excellence to Mows. With a background in business management, he ensures that every branch runs like a Swiss watch, focusing on member experience at every touchpoint.',
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
  { value: '500+', label: 'Active Members' },
  { value: '3', label: 'Locations' },
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

export default function AboutPage({ onNavigate }) {
  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: "'Clash Grotesk', sans-serif", color: textDark }}>

      {/* Hero */}
      <section style={{
        background: textDark,
        padding: '8rem 2rem 6rem',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(rgba(253,224,71,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(253,224,71,0.04) 1px,transparent 1px)',
        backgroundSize: '32px 32px'
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: yellow, opacity: 0.08, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: textLight, opacity: 0.12, filter: 'blur(50px)' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-block', background: yellow, border: '3px solid #fde047', borderRadius: 6, padding: '6px 16px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: textDark, marginBottom: '1.5rem' }}
          >
            Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 1.5rem', color: '#fff', letterSpacing: '-0.03em' }}
          >
            We did not find the <br />
            <span style={{ color: yellow }}>workspace we wanted.</span>
            <br /> So we built it.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: 640, fontWeight: 600, margin: 0 }}
          >
            Mows is Kerala's boldest coworking network — born from frustration, fuelled by community, and built to prove that world-class workspaces belong everywhere, not just in metro cities.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ borderBottom: '4px solid #13221C', borderTop: '4px solid #13221C', background: yellow }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? '3px solid #13221C' : 'none'
            }}>
              <p style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: 0, color: textDark }}>{s.value}</p>
              <p style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '4px 0 0', color: textLight }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Origin Story */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
      <section style={{ background: textDark, padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(253,224,71,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(253,224,71,0.03) 1px,transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <FadeInWhenVisible>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ display: 'inline-block', background: yellow, border: '3px solid #fde047', borderRadius: 6, padding: '6px 16px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: textDark, marginBottom: '1rem' }}>The People Behind Mows</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>Meet the Founders</h2>
            </div>
          </FadeInWhenVisible>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {founders.map((f, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    background: '#fff',
                    border: '4px solid #13221C',
                    borderRadius: 16,
                    padding: '2.5rem',
                    boxShadow: '8px 8px 0px #000',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: -10, right: 20, fontSize: 120, fontWeight: 900, color: textDark, opacity: 0.04, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>"</div>
                  <div style={{
                    width: 72, height: 72,
                    borderRadius: 12,
                    background: f.color,
                    border: '3px solid #13221C',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, fontWeight: 900, color: textDark,
                    marginBottom: '1.5rem',
                    boxShadow: '4px 4px 0px #13221C',
                  }}>
                    {f.initials}
                  </div>
                  <p style={{ fontSize: 22, fontWeight: 900, margin: '0 0 4px', color: textDark }}>{f.name}</p>
                  <p style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: textLight, margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 24, height: 3, background: textLight, borderRadius: 2, display: 'inline-block' }} />
                    {f.role}
                  </p>
                  <p style={{ fontSize: 16, fontStyle: 'italic', lineHeight: 1.6, color: textDark, fontWeight: 700, margin: '0 0 1.5rem', borderLeft: '4px solid #fde047', paddingLeft: '1rem' }}>
                    "{f.quote}"
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: textDark, fontWeight: 600, opacity: 0.8, margin: 0 }}>
                    {f.story}
                  </p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '6rem 2rem' }}>
        <FadeInWhenVisible>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ display: 'inline-block', background: textLight, border: '3px solid #13221C', borderRadius: 6, padding: '6px 16px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '1rem' }}>
              The Journey
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: textDark, margin: 0, letterSpacing: '-0.02em' }}>From Idea to Movement</h2>
          </div>
        </FadeInWhenVisible>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 4, background: textDark, transform: 'translateX(-50%)' }} />
          {timeline.map((t, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.08}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem' }}>
                {i % 2 === 0 ? (
                  <>
                    <div style={{ textAlign: 'right' }}>
                      <motion.div
                        whileHover={{ x: -4, boxShadow: '8px 8px 0px #13221C' }}
                        style={{ background: '#fff', border: '3px solid #13221C', borderRadius: 12, padding: '1.5rem', boxShadow: '5px 5px 0px #13221C', display: 'inline-block', textAlign: 'left', transition: 'box-shadow 0.15s', maxWidth: 320 }}
                      >
                        <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 6px', color: textDark }}>{t.title}</p>
                        <p style={{ fontSize: 14, lineHeight: 1.6, color: textDark, fontWeight: 600, opacity: 0.8, margin: 0 }}>{t.desc}</p>
                      </motion.div>
                    </div>
                    <div style={{ width: 52, height: 52, borderRadius: 10, background: yellow, border: '4px solid #13221C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, color: textDark, flexShrink: 0, boxShadow: '3px 3px 0px #13221C', zIndex: 2 }}>{t.year}</div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div style={{ width: 52, height: 52, borderRadius: 10, background: textLight, border: '4px solid #13221C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, color: '#fff', flexShrink: 0, boxShadow: '3px 3px 0px #13221C', zIndex: 2 }}>{t.year}</div>
                    <div>
                      <motion.div
                        whileHover={{ x: 4, boxShadow: '8px 8px 0px #13221C' }}
                        style={{ background: '#fff', border: '3px solid #13221C', borderRadius: 12, padding: '1.5rem', boxShadow: '5px 5px 0px #13221C', display: 'inline-block', transition: 'box-shadow 0.15s', maxWidth: 320 }}
                      >
                        <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 6px', color: textDark }}>{t.title}</p>
                        <p style={{ fontSize: 14, lineHeight: 1.6, color: textDark, fontWeight: 600, opacity: 0.8, margin: 0 }}>{t.desc}</p>
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ background: yellow, padding: '6rem 2rem', borderTop: '4px solid #13221C', borderBottom: '4px solid #13221C' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInWhenVisible>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: textDark, margin: 0 }}>What Drives Us</h2>
            </div>
          </FadeInWhenVisible>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🏗️', title: 'Built Local', desc: 'Mows was built by Malappuram people for Malappuram people. We are not a chain — we are a community.' },
              { icon: '⚡', title: 'Relentless Quality', desc: "From the Wi-Fi speed to the chair, every detail is obsessed over. Premium isn't optional." },
              { icon: '🤝', title: 'Community First', desc: 'A workspace without community is just a room. We invest in the people who use our spaces.' },
              { icon: '🌱', title: 'Built to Grow', desc: 'We think long term. Every Mows branch is designed to anchor its city and expand opportunities.' },
            ].map((v, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '8px 8px 0px #13221C' }}
                  style={{ background: '#fff', border: '3px solid #13221C', borderRadius: 12, padding: '2rem', boxShadow: '5px 5px 0px #13221C', transition: 'box-shadow 0.15s' }}
                >
                  <div style={{ fontSize: 32, marginBottom: '1rem' }}>{v.icon}</div>
                  <p style={{ fontSize: 18, fontWeight: 900, margin: '0 0 8px', color: textDark }}>{v.title}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: textDark, fontWeight: 600, opacity: 0.8, margin: 0 }}>{v.desc}</p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: bg }}>
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
      </section>

    </div>
  );
}
