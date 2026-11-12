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

export default function PrivacyPage({ onNavigate }) {
  useSEO({ title: 'Privacy Policy | MOWS HUB', description: 'Privacy policy for MOWS HUB services and customer registration.', url: '/privacy' });

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {/* Header */}
      <div style={{ background: C.dark, padding: 'clamp(3rem, 6vw, 5rem) 2rem 2.5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.yellow, margin: '0 0 8px' }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Privacy Policy</h1>
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
          <Section title="1. Introduction">
            <p>MOWS HUB ("we", "us", "our") is committed to protecting your personal information and privacy. This Privacy Policy explains how we collect, use, store and protect information you provide when registering as a customer or using our services.</p>
            <p style={{ marginTop: 8 }}>This policy is in accordance with applicable Indian law, including the Information Technology Act 2000 and applicable rules, and principles under UIDAI Aadhaar regulations.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following categories of personal information during customer registration:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li><strong>Identity information:</strong> Full name, date of birth (where applicable).</li>
              <li><strong>Contact information:</strong> Email address, mobile phone number.</li>
              <li><strong>Identity documents:</strong> Last 4 digits of Aadhaar (never the full number), PAN card number, or passport number for foreign nationals.</li>
              <li><strong>Document scans:</strong> Copies or photographs of identity documents for verification purposes.</li>
              <li><strong>Consent records:</strong> Declaration acceptance, timestamp and IP address.</li>
            </ul>
          </Section>

          <Section title="3. Aadhaar Data Handling">
            <p style={{ background: 'rgba(216,159,62,0.1)', border: '2px solid rgba(216,159,62,0.4)', borderRadius: 8, padding: '12px 14px' }}>
              <strong>Important:</strong> MOWS HUB collects only the last 4 digits of your Aadhaar number. We do not collect, store or transmit your full 12-digit Aadhaar number. We strongly recommend uploading a masked Aadhaar document. MOWS HUB is not an Authentication User Agency (AUA) and does not perform biometric or OTP-based Aadhaar authentication. We comply with UIDAI guidelines and do not use Aadhaar data beyond the purpose of initial identity verification.
            </p>
          </Section>

          <Section title="4. How We Use Your Information">
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>To verify your identity and complete the customer registration process.</li>
              <li>To manage your membership and facilitate access to MOWS HUB facilities.</li>
              <li>To communicate with you regarding your registration and membership status.</li>
              <li>To comply with applicable legal obligations and regulatory requirements.</li>
              <li>To protect the security of our facilities and members.</li>
            </ul>
          </Section>

          <Section title="5. Document Storage & Security">
            <p>Uploaded identity documents are stored in secure, private storage that is not publicly accessible. Access is restricted to authorised MOWS HUB staff with a legitimate need to review documents for verification purposes. All access is logged for audit purposes.</p>
            <p style={{ marginTop: 8 }}>We implement industry-standard security measures including encryption in transit (HTTPS) and access controls to protect your documents.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>[DRAFT – Retention periods for customer registration records and identity documents are to be defined in consultation with legal counsel, taking into account applicable Indian law and regulatory requirements. Documents will not be retained longer than necessary for the stated purpose.]</p>
          </Section>

          <Section title="7. Sharing of Information">
            <p>We do not sell, rent or trade your personal information to third parties. We may share information only:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>When required by law, court order or regulatory authority.</li>
              <li>With trusted service providers who assist in operating our services, subject to confidentiality obligations.</li>
              <li>In connection with a merger, acquisition or sale of business assets.</li>
            </ul>
          </Section>

          <Section title="8. Your Rights">
            <p>You have the right to:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your data (subject to legal obligations).</li>
              <li>Withdraw consent for processing, where consent was the basis for processing.</li>
            </ul>
            <p style={{ marginTop: 8 }}>To exercise these rights, contact us at <strong>info@mows.in</strong>.</p>
          </Section>

          <Section title="9. Cookies & Website Data">
            <p>Our registration page does not use tracking cookies. Standard web server logs may capture IP addresses and browser information for security and performance purposes.</p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The current version will always be available on our website. Material changes will be communicated to registered customers by email.</p>
          </Section>

          <Section title="11. Contact Us">
            <p>For privacy-related inquiries, data requests or concerns, please contact:</p>
            <p style={{ marginTop: 8 }}>
              <strong>MOWS HUB</strong><br />
              PP Tower, Bapputty By Pass, Manjeri, Kerala 676121<br />
              Email: <strong>info@mows.in</strong><br />
              Phone: <strong>+91 97 78 27 121</strong>
            </p>
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
