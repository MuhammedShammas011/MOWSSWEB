import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import {
  AGREEMENT_TITLE,
  AGREEMENT_SECTIONS,
  AGREEMENT_ACKNOWLEDGEMENT,
} from '../data/coworkingAgreement';

const C = { dark: '#13221C', teal: '#174F50', yellow: '#fde047', bg: '#fcfaf5' };

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 900, color: C.dark, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '-0.01em', borderBottom: `2px dashed rgba(19,34,28,0.15)`, paddingBottom: 10 }}>{title}</h2>
      <div style={{ fontSize: 14, color: C.dark, fontWeight: 600, lineHeight: 1.8, opacity: 0.9 }}>{children}</div>
    </div>
  );
}

export default function TermsPage({ onNavigate }) {
  useSEO({
    title: 'Coworking Space Agreement – Terms & Conditions | MOWS HUB',
    description: 'Coworking Space Agreement – Terms & Conditions for MOWS HUB members.',
    url: '/terms',
  });

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {/* Header */}
      <div style={{ background: C.dark, padding: 'clamp(3rem, 6vw, 5rem) 2rem 2.5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.yellow, margin: '0 0 8px' }}>MOWS HUB Legal</p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>
            {AGREEMENT_TITLE}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '12px 0 0', fontWeight: 600 }}>Last updated: November 2026</p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
        <div style={{ background: '#fff', border: `3px solid ${C.dark}`, borderRadius: 16, padding: 'clamp(1.5rem, 4vw, 3rem)', boxShadow: `8px 8px 0px ${C.dark}` }}>
          {AGREEMENT_SECTIONS.map((sec) => (
            <Section key={sec.title} title={sec.title}>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} style={{ margin: idx > 0 ? '8px 0 0' : 0 }}>{p}</p>
              ))}
              {sec.bullets.length > 0 && (
                <ul style={{ paddingLeft: 20, marginTop: sec.paragraphs.length ? 10 : 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sec.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}
            </Section>
          ))}

          <Section title="ACKNOWLEDGEMENT">
            <p style={{ margin: 0 }}>{AGREEMENT_ACKNOWLEDGEMENT}</p>
          </Section>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={() => onNavigate ? onNavigate('register') : window.history.back()}
            style={{
              background: C.dark, color: '#fff', border: `3px solid ${C.dark}`,
              borderRadius: 10, padding: '14px 28px', fontSize: 14, fontWeight: 900,
              cursor: 'pointer', fontFamily: "'Clash Grotesk', sans-serif",
              boxShadow: `4px 4px 0px ${C.teal}`,
            }}
          >
            ← Back to Registration
          </button>
        </div>
      </div>
    </div>
  );
}
