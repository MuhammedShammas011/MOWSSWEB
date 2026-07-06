import { useState } from 'react';

const accent = '#C8F04A';
const dark = '#0a0a0a';
const border = 'rgba(255,255,255,0.08)';
const card = 'rgba(255,255,255,0.04)';

const spaceTypes = ['Hot Desk', 'Dedicated Desk', 'Private Cabin', 'Meeting Room'];
const locationNames = ['Kochi Central', 'Infopark', 'Kakkanad', 'Thrissur Hub', 'Kozhikode Bay', 'Calicut Tech'];
const durations = ['Day pass', '1 week', '1 month', '3 months', '6 months', '1 year'];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function MiniCalendar({ selected, onSelect }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null).concat([...Array(daysInMonth)].map((_, i) => i + 1));
  while (cells.length % 7 !== 0) cells.push(null);

  function isPast(d) {
    if (!d) return true;
    const date = new Date(year, month, d);
    date.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return date < t;
  }

  function isSelected(d) {
    if (!d || !selected) return false;
    return selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;
  }

  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>‹</button>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{MONTHS[month]} {year}</span>
        <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', padding: '4px 0', fontWeight: 500 }}>{d}</div>)}
        {cells.map((d, i) => (
          <div key={i} onClick={() => { if (d && !isPast(d)) onSelect(new Date(year, month, d)); }}
            style={{ textAlign: 'center', padding: '7px 4px', fontSize: 13, borderRadius: 8, cursor: d && !isPast(d) ? 'pointer' : 'default', background: isSelected(d) ? accent : 'transparent', color: isSelected(d) ? dark : isPast(d) ? 'rgba(255,255,255,0.15)' : '#fff', fontWeight: isSelected(d) ? 600 : 400, transition: 'background 0.15s' }}
            onMouseEnter={e => { if (d && !isPast(d) && !isSelected(d)) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { if (!isSelected(d)) e.currentTarget.style.background = 'transparent'; }}>
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ space: '', location: '', duration: '', date: null, name: '', email: '', phone: '', company: '' });
  const [done, setDone] = useState(false);

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function canNext() {
    if (step === 1) return form.space && form.location && form.duration;
    if (step === 2) return form.date;
    if (step === 3) return form.name && form.email && form.phone;
    return true;
  }

  if (done) return (
    <div style={{ background: dark, color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: 'center', maxWidth: 400, padding: '2rem' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(200,240,74,0.15)', border: `2px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 1.5rem' }}>✓</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, marginBottom: 12 }}>You're booked!</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 24 }}>
          Confirmation sent to <strong style={{ color: '#fff' }}>{form.email}</strong>. We'll send your access details 24 hours before your visit.
        </p>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.25rem', textAlign: 'left', marginBottom: 24 }}>
          {[['Space', form.space], ['Location', form.location], ['Duration', form.duration], ['Date', form.date?.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{k}</span>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setDone(false); setStep(1); setForm({ space: '', location: '', duration: '', date: null, name: '', email: '', phone: '', company: '' }); }} style={{ background: accent, color: dark, border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Book another</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: dark, color: '#fff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 2rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: 12, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Get started</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, margin: '0 0 2rem', fontFamily: 'Georgia, serif' }}>Book your desk</h1>
          {/* Step progress */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {['Choose space', 'Pick a date', 'Your details', 'Confirm'].map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: step > i + 1 ? accent : step === i + 1 ? 'rgba(200,240,74,0.15)' : 'rgba(255,255,255,0.05)', border: `1.5px solid ${step >= i + 1 ? accent : border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: step > i + 1 ? dark : step === i + 1 ? accent : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 10, color: step === i + 1 ? accent : 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>{label}</span>
                </div>
                {i < 3 && <div style={{ width: 40, height: 1, background: step > i + 1 ? accent : border, marginBottom: 18 }}></div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: '2rem', marginBottom: '1.5rem' }}>

          {step === 1 && (
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 1rem' }}>What type of space?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: '1.5rem' }}>
                {spaceTypes.map(s => (
                  <button key={s} onClick={() => update('space', s)} style={{ background: form.space === s ? 'rgba(200,240,74,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${form.space === s ? accent : border}`, borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 500, color: form.space === s ? accent : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>{s}</button>
                ))}
              </div>
              <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 1rem' }}>Which location?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: '1.5rem' }}>
                {locationNames.map(l => (
                  <button key={l} onClick={() => update('location', l)} style={{ background: form.location === l ? 'rgba(200,240,74,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${form.location === l ? accent : border}`, borderRadius: 10, padding: '10px 14px', fontSize: 13, color: form.location === l ? accent : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>{l}</button>
                ))}
              </div>
              <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 1rem' }}>How long?</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {durations.map(d => (
                  <button key={d} onClick={() => update('duration', d)} style={{ background: form.duration === d ? 'rgba(200,240,74,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${form.duration === d ? accent : border}`, borderRadius: 20, padding: '7px 14px', fontSize: 12, color: form.duration === d ? accent : 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>{d}</button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 1.25rem' }}>When do you want to start?</p>
              <MiniCalendar selected={form.date} onSelect={d => update('date', d)} />
              {form.date && <p style={{ fontSize: 13, color: accent, marginTop: 12, textAlign: 'center' }}>Selected: {form.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 4px' }}>Your details</p>
              {[['Name', 'name', 'Full name'], ['Email', 'email', 'you@example.com'], ['Phone', 'phone', '+91 98765 43210'], ['Company', 'company', 'Optional']].map(([label, key, ph]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>{label}</label>
                  <input value={form[key]} onChange={e => update(key, e.target.value)} placeholder={ph}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${border}`, borderRadius: 10, padding: '11px 14px', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = accent} onBlur={e => e.target.style.borderColor = border} />
                </div>
              ))}
            </div>
          )}

          {step === 4 && (
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 1.25rem' }}>Review your booking</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Space', form.space], ['Location', form.location], ['Duration', form.duration], ['Start date', form.date?.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })], ['Name', form.name], ['Email', form.email], ['Phone', form.phone]].map(([k, v]) => v && (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {step > 1 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, background: 'transparent', color: 'rgba(255,255,255,0.5)', border: `1px solid ${border}`, borderRadius: 10, padding: '14px', fontSize: 14, cursor: 'pointer' }}>← Back</button>}
          <button onClick={() => step < 4 ? setStep(s => s + 1) : setDone(true)} disabled={!canNext()} style={{ flex: 2, background: canNext() ? accent : 'rgba(255,255,255,0.06)', color: canNext() ? dark : 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 600, cursor: canNext() ? 'pointer' : 'default', transition: 'all 0.2s' }}>
            {step === 4 ? 'Confirm booking →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
