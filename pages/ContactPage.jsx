import { useState } from 'react';

const accent = '#C8F04A';
const dark = '#0a0a0a';
const border = 'rgba(255,255,255,0.08)';
const card = 'rgba(255,255,255,0.04)';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }
  const canSend = form.name && form.email && form.message;

  const contacts = [
    { icon: '📍', label: 'Head office', value: 'MG Road, Kochi, Kerala 682016' },
    { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
    { icon: '✉️', label: 'Email', value: 'hello@mows.in' },
    { icon: '💬', label: 'WhatsApp', value: 'Chat with us directly' },
  ];

  const faqs = [
    { q: 'Can I try before I commit?', a: 'Yes! Book a free day pass at any location to get a feel for the space before choosing a plan.' },
    { q: 'Is there a lock-in period?', a: 'Monthly plans have no lock-in. Annual plans are prepaid and come with a 20% discount.' },
    { q: 'Can I use multiple locations?', a: 'Dedicated Desk and above members get access to all Mows locations with their plan.' },
    { q: 'How do I book a meeting room?', a: 'Via the member portal or WhatsApp. Meeting rooms can be booked in 1-hour slots.' },
  ];

  if (sent) return (
    <div style={{ background: dark, color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>✉️</div>
        <h2 style={{ fontFamily: 'Georgia, serif', marginBottom: 12 }}>Message sent!</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>We'll get back to you within 24 hours.</p>
        <button onClick={() => setSent(false)} style={{ background: accent, color: dark, border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send another</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: dark, color: '#fff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem' }}>

        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: 12, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Get in touch</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, margin: 0, fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>Say hello</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', marginBottom: '4rem' }}>

          {/* Left: contact info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '2.5rem' }}>
              {contacts.map(c => (
                <div key={c.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '1rem 1.25rem', background: card, border: `1px solid ${border}`, borderRadius: 12 }}>
                  <span style={{ fontSize: 20 }}>{c.icon}</span>
                  <div>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.label}</p>
                    <p style={{ fontSize: 13, margin: 0, color: c.label === 'WhatsApp' ? accent : '#fff' }}>{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '1.5rem' }}>
              <p style={{ fontSize: 14, fontWeight: 500, margin: '0 0 1rem' }}>Office hours</p>
              {[['Kochi Central / Calicut Tech', '24/7'], ['Other locations', 'Mon–Sat, 8am–9pm'], ['Support team', 'Mon–Sat, 9am–6pm']].map(([d, t]) => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{d}</span>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: '2rem' }}>
            <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 1.5rem' }}>Send us a message</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['Name', 'name', 'Full name'], ['Email', 'email', 'you@email.com']].map(([l, k, p]) => (
                  <div key={k}>
                    <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</label>
                    <input value={form[k]} onChange={e => update(k, e.target.value)} placeholder={p}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${border}`, borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = accent} onBlur={e => e.target.style.borderColor = border} />
                  </div>
                ))}
              </div>
              {[['Phone', 'phone', '+91 98765 43210'], ['Subject', 'subject', 'How can we help?']].map(([l, k, p]) => (
                <div key={k}>
                  <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</label>
                  <input value={form[k]} onChange={e => update(k, e.target.value)} placeholder={p}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${border}`, borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = accent} onBlur={e => e.target.style.borderColor = border} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message</label>
                <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Tell us what you're looking for…" rows={4}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${border}`, borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#fff', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = accent} onBlur={e => e.target.style.borderColor = border} />
              </div>
              <button onClick={() => canSend && setSent(true)} style={{ background: canSend ? accent : 'rgba(255,255,255,0.06)', color: canSend ? dark : 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 600, cursor: canSend ? 'pointer' : 'default', transition: 'all 0.2s' }}>
                Send message →
              </button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 1.5rem', fontFamily: 'Georgia, serif' }}>Frequently asked</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: 12 }}>
            {faqs.map(f => (
              <div key={f.q} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.25rem 1.5rem' }}>
                <p style={{ fontSize: 14, fontWeight: 500, margin: '0 0 8px' }}>{f.q}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.65 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
