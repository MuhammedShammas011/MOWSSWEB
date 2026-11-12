import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';

const C = { dark: '#13221C', teal: '#174F50', yellow: '#fde047', bg: '#fcfaf5' };

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 900, color: C.dark, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '-0.01em', borderBottom: `2px dashed rgba(19,34,28,0.15)`, paddingBottom: 10 }}>{title}</h2>
      <div style={{ fontSize: 14, color: C.dark, fontWeight: 600, lineHeight: 1.8, opacity: 0.85 }}>{children}</div>
    </div>
  );
}

export default function TermsPage({ onNavigate }) {
  useSEO({ title: 'Terms & Conditions | MOWS HUB', description: 'Terms and conditions for using MOWS HUB services.', url: '/terms' });

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {/* Header */}
      <div style={{ background: C.dark, padding: 'clamp(3rem, 6vw, 5rem) 2rem 2.5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.yellow, margin: '0 0 8px' }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Terms & Conditions</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '12px 0 0', fontWeight: 600 }}>Last updated: November 2026</p>
        </motion.div>
      </div>

      {/* Draft Notice */}
      <div style={{ background: '#fff7ed', borderBottom: `3px solid #ea580c`, padding: '12px 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: '#ea580c', margin: 0 }}>
          ⚠️ DRAFT DOCUMENT – This content is pending legal review and approval before publication. Do not treat as final legal policy.
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
        <div style={{ background: '#fff', border: `3px solid ${C.dark}`, borderRadius: 16, padding: 'clamp(1.5rem, 4vw, 3rem)', boxShadow: `8px 8px 0px ${C.dark}` }}>
          <Section title="1. Acceptance of Terms">
            <p>By accessing or using MOWS HUB facilities, services, or submitting a registration, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.</p>
          </Section>

          <Section title="2. Services">
            <p>MOWS HUB (My Own Work Space) provides coworking spaces, meeting rooms, event spaces, and related services at its locations in Kerala, India. Access to any facility is subject to availability and compliance with our house rules.</p>
          </Section>

          <Section title="3. Customer Registration">
            <p>To use MOWS HUB facilities, customers are required to complete the customer registration and KYC (Know Your Customer) verification process. You must provide accurate, complete and truthful information. MOWS HUB reserves the right to refuse or revoke registration if false information is provided.</p>
          </Section>

          <Section title="4. Identity Verification">
            <p>As part of our KYC process, we require valid identity documents. For Indian citizens, we accept Aadhaar Card (masked, last 4 digits only) or PAN Card. For foreign nationals, we require a valid passport and supporting immigration documents.</p>
            <p style={{ marginTop: 8 }}>Submission of documents constitutes your consent for MOWS HUB to verify and retain these records in accordance with applicable law and our Privacy Policy.</p>
          </Section>

          <Section title="5. Code of Conduct">
            <p>Members and customers must:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>Maintain a professional and respectful environment.</li>
              <li>Not engage in illegal activities on the premises.</li>
              <li>Not disturb other members with excessive noise.</li>
              <li>Keep the workspace clean and organised.</li>
              <li>Comply with all safety rules and emergency procedures.</li>
            </ul>
          </Section>

          <Section title="6. Fees & Payment">
            <p>[DRAFT – Fee schedule, payment terms, refund policy, and cancellation terms to be finalised by MOWS HUB management and legal counsel.]</p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>MOWS HUB retains all rights to its branding, name, logo, website and proprietary materials. Customers retain ownership of their own work created on-premises.</p>
          </Section>

          <Section title="8. Liability">
            <p>MOWS HUB is not responsible for loss, theft or damage to personal property on the premises. Members are encouraged to secure their belongings and use the locker facilities provided.</p>
          </Section>

          <Section title="9. Termination">
            <p>MOWS HUB reserves the right to terminate access or registration without notice for violation of these terms, misconduct, or provision of false information.</p>
          </Section>

          <Section title="10. Governing Law">
            <p>These Terms & Conditions are governed by the laws of India and the State of Kerala. Any disputes shall be subject to the exclusive jurisdiction of the courts in Malappuram, Kerala.</p>
          </Section>

          <Section title="11. Changes to Terms">
            <p>MOWS HUB may update these terms at any time. Continued use of services following notification of changes constitutes acceptance of the updated terms.</p>
          </Section>

          <Section title="12. Contact">
            <p>For questions regarding these terms, please contact us at: <strong>info@mows.in</strong> or visit our reception at PP Tower, Bapputty By Pass, Manjeri, Kerala 676121.</p>
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
