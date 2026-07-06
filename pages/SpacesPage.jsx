import { useState } from 'react';
import { plans } from '../data';

const accent = '#C8F04A';
const dark = '#0a0a0a';
const border = 'rgba(255,255,255,0.08)';
const card = 'rgba(255,255,255,0.04)';

const addons = [
  { icon: '🖨️', name: 'Printing credits', desc: '100 pages/mo', price: 300 },
  { icon: '📮', name: 'Mail handling', desc: 'Receive & forward', price: 500 },
  { icon: '🚗', name: 'Reserved parking', desc: 'Covered spot', price: 800 },
  { icon: '🖥️', name: 'Monitor rental', desc: '27" + peripherals', price: 600 },
];

export default function SpacesPage({ onNavigate }) {
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{ background: dark, color: '#fff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: 12, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Plans & pricing</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, margin: '0 0 1rem', fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>Find your fit</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: '0 0 2rem' }}>All plans include Wi-Fi, tea & coffee, and access to common areas.</p>

          {/* Billing toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: card, border: `1px solid ${border}`, borderRadius: 30, padding: '6px 16px' }}>
            <span style={{ fontSize: 13, color: !annual ? '#fff' : 'rgba(255,255,255,0.4)' }}>Monthly</span>
            <div onClick={() => setAnnual(a => !a)} style={{ width: 40, height: 22, background: annual ? accent : 'rgba(255,255,255,0.15)', borderRadius: 11, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', top: 3, left: annual ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: annual ? dark : '#fff', transition: 'left 0.2s' }}></div>
            </div>
            <span style={{ fontSize: 13, color: annual ? accent : 'rgba(255,255,255,0.4)' }}>Annual</span>
            {annual && <span style={{ fontSize: 11, background: 'rgba(200,240,74,0.15)', color: accent, padding: '2px 8px', borderRadius: 20 }}>Save 20%</span>}
          </div>
        </div>

        {/* Plan cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16, marginBottom: '4rem' }}>
          {plans.map(plan => (
            <div key={plan.id} style={{ background: plan.popular ? 'rgba(200,240,74,0.06)' : card, border: `1px solid ${plan.popular ? 'rgba(200,240,74,0.35)' : border}`, borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: accent, color: dark, fontSize: 10, fontWeight: 700, padding: '3px 12px', borderRadius: '0 0 8px 8px', letterSpacing: '0.05em' }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontSize: 28, marginBottom: 10 }}>{plan.icon}</div>
              <p style={{ fontSize: 16, fontWeight: 600, margin: '0 0 6px', fontFamily: 'Georgia, serif' }}>{plan.name}</p>
              <div style={{ marginBottom: 12 }}>
                {plan.monthlyPrice ? (
                  <>
                    <span style={{ fontSize: 32, fontWeight: 700, fontFamily: 'Georgia, serif' }}>
                      ₹{(annual ? plan.annualPrice : plan.monthlyPrice).toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/mo</span>
                  </>
                ) : (
                  <span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Georgia, serif' }}>Custom</span>
                )}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '0 0 16px' }}>{plan.desc}</p>
              <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16, marginBottom: 16, flex: 1 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ color: accent, fontSize: 13 }}>✓</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, opacity: 0.35 }}>
                    <span style={{ fontSize: 13 }}>–</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate(plan.id === 'team' ? 'contact' : 'booking')} style={{ background: plan.popular ? accent : 'transparent', color: plan.popular ? dark : 'rgba(255,255,255,0.7)', border: `1px solid ${plan.popular ? accent : border}`, borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', width: '100%' }}>
                {plan.id === 'team' ? 'Contact us →' : 'Choose plan →'}
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div>
          <p style={{ fontSize: 12, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, textAlign: 'center' }}>Optional add-ons</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {addons.map(a => (
              <div key={a.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: card, border: `1px solid ${border}`, borderRadius: 12, padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>{a.name}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{a.desc}</p>
                  </div>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: accent }}>₹{a.price}<span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>/mo</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ strip */}
        <div style={{ marginTop: '4rem', padding: '2.5rem', background: card, border: `1px solid ${border}`, borderRadius: 16, textAlign: 'center' }}>
          <p style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>Not sure which plan fits?</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Book a free tour and we'll walk you through the options in person.</p>
          <button onClick={() => onNavigate('contact')} style={{ background: accent, color: dark, border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Book a free tour →</button>
        </div>
      </div>
    </div>
  );
}
