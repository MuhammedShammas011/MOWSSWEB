import { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import { Lock, Printer, Target, Car, Coffee, Mail, CheckCircle2, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { load } from '@cashfreepayments/cashfree-js';
import logoIconImg from '../assets/Logo MOWS Secondary Colors-06 1.png';

const textDark = '#13221C';
const textLight = '#174F50';
const yellow = '#fde047';
const bg = '#fcfaf5';

const spaceTypes = ['Hot Desk', 'Dedicated Desk', 'Private Cabin', 'Meeting Room', 'Studio / Podcast', 'Virtual Office'];
const locationNames = ['Manjeri', 'Kozhikode', 'Perinthalmanna'];
const DURATIONS_MAP = {
  'Hot Desk': ['1 day', '1 week', '15 days', '1 month', '3 months', '6 months', '1 year'],
  'Dedicated Desk': ['1 week', '15 days', '1 month', '3 months', '6 months', '1 year'],
  'Private Cabin': [],
  'Meeting Room': ['1 hr', '2 hr', '3 hr', '4 hr'],
  'Studio / Podcast': ['1 hr', '2 hr', '3 hr', '4 hr'],
};

const PRICING = {
  'Hot Desk': { '1 day': 400, 'Day pass': 400, '1 week': 2500, '15 days': 3000, '1 month': 4100, '3 months': 12000, '6 months': 25000, '1 year': 41000 },
  'Dedicated Desk': { '1 week': 3000, '15 days': 3500, '1 month': 4600, '3 months': 13000, '6 months': 26000, '1 year': 46000 },
  'Private Cabin': {},
  'Meeting Room': { '1 hr': 500, '2 hr': 900, '3 hr': 1300, '4 hr': 2800 },
  'Studio / Podcast': { '1 hr': 500, '2 hr': 1000, '3 hr': 1400, '4 hr': 2800 },
};

// Maps Spaces-page plan names → { space, duration } for auto-fill
const PLAN_MAP = {
  'Daily Pass': { space: 'Hot Desk', duration: '1 day' },
  '15-Day Pass': { space: 'Hot Desk', duration: '15 days' },
  'Monthly Basic': { space: 'Hot Desk', duration: '1 month' },
  'Monthly Pro': { space: 'Dedicated Desk', duration: '1 month' },
  'Single Cabin': { space: 'Private Cabin', duration: '' },
  'Group Space': { space: 'Meeting Room', duration: '1 hr' },
  'Studio Session': { space: 'Studio / Podcast', duration: '1 hr' },
  'Virtual Address': { space: 'Virtual Office', duration: '1 year' },
};

const ADDONS = [
  { id: 'locker', label: 'Personal Locker', desc: 'Secure storage for your essentials', price: 299, icon: <Lock size={22} strokeWidth={2.5} /> },
  { id: 'printing', label: 'Printing Credits', desc: '100 pages/month included', price: 199, icon: <Printer size={22} strokeWidth={2.5} /> },
  { id: 'meeting', label: 'Meeting Room Hours', desc: '5 extra hours per month', price: 499, icon: <Target size={22} strokeWidth={2.5} /> },
  { id: 'parking', label: 'Reserved Parking', desc: 'Dedicated parking spot', price: 599, icon: <Car size={22} strokeWidth={2.5} /> },
  { id: 'coffee', label: 'Barista Coffee Pass', desc: 'Unlimited specialty coffee', price: 799, icon: <Coffee size={22} strokeWidth={2.5} /> },
  { id: 'mail', label: 'Mail Handling', desc: 'Receive & forward your mail', price: 149, icon: <Mail size={22} strokeWidth={2.5} /> },
];

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
    const date = new Date(year, month, d); date.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return date < t;
  }
  function isSelected(d) {
    if (!d || !selected) return false;
    return selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;
  }
  function prevMonth() { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }
  function nextMonth() { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }

  return (
    <div style={{ background: '#fff', border: '3px solid #13221C', borderRadius: 12, padding: '1.5rem', boxShadow: '6px 6px 0px #13221C' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button onClick={prevMonth} style={{ background: '#fff', border: '2px solid #13221C', color: textDark, cursor: 'pointer', fontSize: 18, width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '2px 2px 0px #13221C' }}>‹</button>
        <span style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', color: textDark }}>{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} style={{ background: '#fff', border: '2px solid #13221C', color: textDark, cursor: 'pointer', fontSize: 18, width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '2px 2px 0px #13221C' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8 }}>
        {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 12, color: textDark, padding: '4px 0', fontWeight: 900, textTransform: 'uppercase' }}>{d}</div>)}
        {cells.map((d, i) => (
          <div key={i} onClick={() => { if (d && !isPast(d)) onSelect(new Date(year, month, d)); }}
            style={{ textAlign: 'center', padding: '8px 4px', fontSize: 14, borderRadius: 8, cursor: d && !isPast(d) ? 'pointer' : 'default', background: isSelected(d) ? '#174F50' : '#fff', color: isSelected(d) ? '#fff' : isPast(d) ? 'rgba(19,34,28,0.3)' : textDark, fontWeight: 900, transition: 'all 0.15s', border: d && !isPast(d) ? '2px solid #13221C' : '2px solid transparent', boxShadow: isSelected(d) ? '2px 2px 0px #13221C' : 'none' }}
            onMouseEnter={e => { if (d && !isPast(d) && !isSelected(d)) { e.currentTarget.style.background = '#fde047'; e.currentTarget.style.boxShadow = '2px 2px 0px #13221C'; } }}
            onMouseLeave={e => { if (!isSelected(d)) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = 'none'; } }}>
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }

export default function BookingPage({ onNavigate, preselectedPlan = '' }) {
  useSEO({ title: 'Book a Space | Mows', description: 'Book your perfect workspace or schedule an enquiry with Mows today.', url: '/booking' });

  let parsedCustom = null;
  if (typeof preselectedPlan === 'string' && preselectedPlan.startsWith('{')) {
    try { parsedCustom = JSON.parse(preselectedPlan); } catch (err) { console.error(err); }
  }

  const [isEnquiry, setIsEnquiry] = useState(false);
  const [step, setStep] = useState(parsedCustom ? 2 : 1);

  // If arriving from Spaces page, auto-derive space type & duration from the plan name
  const mapped = parsedCustom ? null : (PLAN_MAP[preselectedPlan] || null);
  const initSpace = parsedCustom ? parsedCustom.space : (mapped ? mapped.space : preselectedPlan);
  const initDuration = parsedCustom ? parsedCustom.duration : (mapped ? mapped.duration : '');
  const initLocation = parsedCustom ? parsedCustom.location : '';

  const [form, setForm] = useState({ space: initSpace, location: initLocation, duration: initDuration, date: null, name: '', email: '', phone: '', company: '', customFeatures: parsedCustom ? parsedCustom.features : [] });
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Virtual Office & Business Registration States
  const [voPlan, setVoPlan] = useState('basic'); 
  const [voRegistration, setVoRegistration] = useState('opc'); 
  const [voAddons, setVoAddons] = useState([]); 

  function toggleVoAddon(id) {
    setVoAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const getVirtualOfficeDuration = () => {
    if (voPlan === 'basic') {
      const extra = [];
      if (voAddons.includes('drafting')) extra.push('Drafting');
      if (voAddons.includes('gst_msme')) extra.push('GST+MSME');
      return `Office Basic Plan (Annual)${extra.length ? ` + ${extra.join(', ')}` : ''}`;
    }
    if (voPlan === 'pro') {
      const extra = [];
      if (voAddons.includes('llp_reg')) extra.push('LLP Registration');
      return `Office Pro Plan (Annual)${extra.length ? ` + ${extra.join(', ')}` : ''}`;
    }
    if (voPlan === 'reg') {
      const regMap = { opc: 'OPC Registration', pvtltd: 'Pvt Ltd Registration', partnership: 'Partnership' };
      const regName = regMap[voRegistration] || 'Company Registration';
      const extra = voAddons.includes('gst_msme_reg') ? ' + GST+MSME' : '';
      return `Company Registration — ${regName}${extra}`;
    }
    return '';
  };

  const effectiveDuration = form.space === 'Virtual Office' ? getVirtualOfficeDuration() : form.duration;

  const getVirtualOfficePrice = () => {
    if (voPlan === 'basic') {
      let p = 14400;
      if (voAddons.includes('drafting')) p += 500;
      if (voAddons.includes('gst_msme')) p += 2000;
      return p;
    }
    if (voPlan === 'pro') {
      let p = 18000;
      if (voAddons.includes('llp_reg')) p += 13500;
      return p;
    }
    if (voPlan === 'reg') {
      let p = voRegistration === 'opc' ? 13500 : (voRegistration === 'pvtltd' ? 16950 : 9322);
      if (voAddons.includes('gst_msme_reg')) p += 2000;
      return p;
    }
    return 0;
  };

  const basePrice = form.space === 'Virtual Office' 
    ? getVirtualOfficePrice()
    : ((form.space && effectiveDuration && PRICING[form.space]) ? (PRICING[form.space][effectiveDuration] || 0) : 0);
  const addonsTotal = selectedAddons.reduce((sum, id) => { const a = ADDONS.find(x => x.id === id); return sum + (a ? a.price : 0); }, 0);
  const totalAmount = basePrice + addonsTotal;
  const gst = Math.round(totalAmount * 0.18);
  const grandTotal = totalAmount + gst;

  function toggleAddon(id) { setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); }
  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function canNext() {
    if (isEnquiry) return form.name && form.email && form.phone && form.company;
    if (step === 1) return form.space && form.location && (effectiveDuration || !!preselectedPlan);
    if (step === 2) return form.date;
    if (step === 3) return form.name && form.email && form.phone && form.company;
    if (step === 4) return true;
    return true;
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    if (orderId) {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      fetch(`${baseUrl}/api/verify-payment/${orderId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.status === 'PAID') {
            setDone(true);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
          } else {
            alert('Payment was not completed or was cancelled.');
          }
        })
        .catch(err => console.error('Verification error:', err));
    }
  }, []);

  const submitBooking = async () => {
    setIsSubmitting(true);
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    if (isEnquiry) {
      const payload = {
        name: form.name, email: form.email, phone: form.phone, company: form.company || 'N/A',
        type: 'Enquiry', message: 'Enquiry form submitted'
      };
      try {
        const r = await fetch(`${baseUrl}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const res = await r.json();
        if (res.success) setDone(true);
        else alert('Failed to submit enquiry.');
      } catch (err) {
        console.error(err);
        alert('Network error.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    try {
      const r = await fetch(`${baseUrl}/api/create-cashfree-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          space: form.space,
          location: form.location,
          duration: effectiveDuration,
          amount: grandTotal,
        }),
      });

      const res = await r.json();

      if (!res.success || !res.paymentSessionId) {
        alert(res.message || 'Could not launch payment gateway.');
        setIsSubmitting(false);
        return;
      }

      const mode = import.meta.env.VITE_CASHFREE_MODE || 'sandbox';
      const cashfree = await load({ mode });
      await cashfree.checkout({
        paymentSessionId: res.paymentSessionId,
        redirectTarget: '_self',
      });
    } catch (err) {
      console.error(err);
      alert('Error launching payment gateway.');
    } finally {
      setIsSubmitting(false);
    }
  };

  function reset() {
    setDone(false); setStep(1); setShowDownloadToast(false);
    setForm({ space: '', location: '', duration: '', date: null, name: '', email: '', phone: '', company: '' });
    setSelectedAddons([]); setVoAddons([]); setVoPlan('basic'); setVoRegistration('opc');
  }

  function downloadInvoice() {
    const invoiceNo = 'MOWS-' + Date.now().toString().slice(-6);
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const startDate = form.date?.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) || 'N/A';
    const addonsRows = selectedAddons.map(id => {
      const a = ADDONS.find(x => x.id === id);
      return `<tr><td>${a?.label || id}</td><td style="text-align:right">${fmt(a?.price || 0)}</td></tr>`;
    }).join('');
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Invoice ${invoiceNo}</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Montserrat', sans-serif; color: #13221C; background: #fcfaf5; padding: 48px; }
  .invoice-container { background: #fff; border: 4px solid #13221C; border-radius: 12px; padding: 40px; box-shadow: 12px 12px 0px #13221C; max-width: 800px; margin: 0 auto; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 4px solid #13221C; padding-bottom: 24px; }
  .brand img { height: 36px; object-fit: contain; }
  .brand p { font-size: 13px; color: #174F50; margin-top: 8px; font-weight: 700; }
  .invoice-meta { text-align: right; }
  .invoice-meta h2 { font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; color: #13221C; }
  .invoice-meta p { font-size: 14px; font-weight: 700; color: #13221C; margin-top: 6px; }
  .section { margin-bottom: 32px; }
  .section h3 { font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; background: #13221C; display: inline-block; padding: 6px 12px; margin-bottom: 16px; border-radius: 4px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
  .info-block { border: 3px solid #13221C; padding: 20px; border-radius: 8px; background: #fff; box-shadow: 4px 4px 0px rgba(19,34,28,0.1); }
  .info-block p { font-size: 14px; color: #13221C; line-height: 1.8; font-weight: 700; }
  .info-block strong { font-weight: 900; color: #174F50; }
  table { width: 100%; border-collapse: collapse; border: 3px solid #13221C; }
  th { background: #13221C; color: #fff; padding: 12px 16px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; text-align: left; font-weight: 900; }
  td { padding: 14px 16px; font-size: 14px; border-bottom: 2px solid #13221C; font-weight: 700; color: #13221C; }
  tr:last-child td { border-bottom: none; }
  .total-row td { font-weight: 900; font-size: 16px; background: #fde047; border-top: 3px solid #13221C; text-transform: uppercase; }
  .gst-row td { font-size: 13px; color: #13221C; background: #f0fdf4; }
  .footer { margin-top: 40px; padding-top: 24px; border-top: 3px dashed #13221C; text-align: center; font-size: 13px; color: #13221C; font-weight: 700; }
  .status-badge { display: inline-block; background: #22c55e; color: #fff; font-size: 13px; font-weight: 900; padding: 6px 16px; border-radius: 100px; border: 2px solid #13221C; box-shadow: 2px 2px 0px #13221C; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 12px; }
  @media print { 
    @page { margin: 0; }
    body { padding: 40px; background: #fff; } 
    .invoice-container { border: none; box-shadow: none; padding: 0; max-width: 100%; } 
  }
</style>
</head>
<body>
<div class="invoice-container">
  <div class="header">
    <div class="brand">
      <div style="display:flex; align-items:center; gap:12px;">
        <img src="${window.location.origin}${logoIconImg}" alt="MOWS Icon" style="height:36px; object-fit:contain;" onerror="this.style.display='none'" />
        <img src="${window.location.origin}/logo-wordmark.png" alt="MOWS" style="height:36px; object-fit:contain;" onerror="this.style.display='none'" />
      </div>
      <p>Mows Coworking Space<br/>${form.location ? 'Mows ' + form.location : ''}</p>
    </div>
    <div class="invoice-meta">
      <h2>Invoice</h2>
      <p>Invoice No: <strong>#${invoiceNo}</strong></p>
      <p>Date: ${dateStr}</p>
      <div class="status-badge">✓ Paid</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="info-block">
      <h3>Billed To</h3>
      <p><strong>${form.name}</strong></p>
      <p>${form.email}</p>
      <p>${form.phone}</p>
      ${form.company ? `<p>${form.company}</p>` : ''}
    </div>
    <div class="info-block">
      <h3>Booking Details</h3>
      <p><strong>Space:</strong> ${form.space}</p>
      <p><strong>Location:</strong> Mows ${form.location}</p>
      <p><strong>Duration:</strong> ${effectiveDuration}</p>
      <p><strong>Start date:</strong> ${startDate}</p>
    </div>
  </div>

  <div class="section">
    <table>
      <thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody>
        <tr><td>${form.space} — ${effectiveDuration} at Mows ${form.location}</td><td style="text-align:right">${fmt(basePrice)}</td></tr>
        ${addonsRows}
        <tr class="gst-row"><td>GST (18%)</td><td style="text-align:right">${fmt(gst)}</td></tr>
        <tr class="total-row"><td>Total Paid</td><td style="text-align:right">${fmt(grandTotal)}</td></tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    <p>Thank you for choosing Mows Coworking! Your access details will be emailed 24 hours before your visit.</p>
    <p style="margin-top:8px">For support: hello@mows.in | www.mows.in</p>
  </div>
</div>
</body>
</html>`;
    const w = window.open('', '_blank', 'width=800,height=900');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.onafterprint = () => {
        setShowDownloadToast(true);
        setTimeout(() => setShowDownloadToast(false), 5000);
      };
      setTimeout(() => { w.focus(); w.print(); }, 400);
    }
  }

  const steps = ['Choose space', 'Pick a date', 'Your details', 'Add-ons'];

  const inp = { width: '100%', background: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '14px 18px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', boxShadow: '4px 4px 0px rgba(19,34,28,0.1)', fontWeight: 700, transition: 'box-shadow 0.2s' };

  // ── Done screen ──
  if (done) return (
    <div style={{ color: textDark, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, backgroundImage: 'linear-gradient(rgba(19,34,28,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(19,34,28,0.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 520, width: '100%', padding: '3rem', background: '#fff', border: '4px solid #13221C', borderRadius: 12, boxShadow: '12px 12px 0px #13221C', margin: '2rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: 12, background: yellow, border: '4px solid #13221C', color: textDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 1.5rem', boxShadow: '6px 6px 0px #13221C', fontWeight: 900 }}>✓</div>
        <h2 style={{ fontSize: 32, marginBottom: 8, color: textDark, fontWeight: 900, textTransform: 'uppercase' }}>{isEnquiry ? 'Enquiry sent!' : 'Booking Submitted!'}</h2>
        <p style={{ color: textDark, lineHeight: 1.7, marginBottom: 24, fontSize: 15, fontWeight: 700 }}>
          {isEnquiry ? <>Thanks! We'll contact you at <strong style={{ color: textLight }}>{form.email}</strong> shortly.</> : <>Booking details submitted successfully.<br />We'll review and send access details to <strong style={{ color: textLight }}>{form.email}</strong> shortly.</>}
        </p>
        {!isEnquiry && (
          <div style={{ borderRadius: 8, padding: '1.5rem', textAlign: 'left', marginBottom: 20, background: '#fcfaf5', border: '3px solid #13221C' }}>
            {[['Space', form.space], ['Location', 'Mows ' + form.location], ['Duration', effectiveDuration], ['Start date', form.date?.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })], selectedAddons.length > 0 && ['Add-ons', selectedAddons.map(id => ADDONS.find(a => a.id === id)?.label).join(', ')]].filter(Boolean).map(([k, v], idx, arr) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx !== arr.length - 1 ? '2px dashed rgba(19,34,28,0.2)' : 'none' }}>
                <span style={{ fontSize: 13, color: textDark, fontWeight: 800, textTransform: 'uppercase' }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: textDark }}>{v}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {!isEnquiry && (
            <button onClick={downloadInvoice} style={{ background: '#174F50', color: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '14px 24px', fontSize: 14, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '4px 4px 0px #13221C', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #13221C'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0px #13221C'; }}>
              <Download size={16} strokeWidth={2.5} /> Download Invoice
            </button>
          )}

          <button onClick={reset} style={{ background: yellow, color: textDark, border: '3px solid #13221C', borderRadius: 8, padding: '14px 24px', fontSize: 14, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '4px 4px 0px #13221C' }}>Book Another Space</button>
          <button onClick={() => onNavigate('home')} style={{ background: '#fff', color: textDark, border: '3px solid #13221C', borderRadius: 8, padding: '14px 28px', fontSize: 14, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '4px 4px 0px #13221C' }}>Back to home</button>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              position: 'fixed', top: 32, right: 32, zIndex: 9999,
              background: '#22c55e', color: '#fff', padding: '16px 24px',
              borderRadius: 12, border: '3px solid #13221C',
              boxShadow: '6px 6px 0px #13221C', display: 'flex',
              alignItems: 'center', gap: 16
            }}
          >
            <CheckCircle2 size={24} strokeWidth={3} />
            <div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{isEnquiry ? 'Enquiry sent!' : 'Booking Submitted!'}</p>
              <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 700, opacity: 0.9 }}>Your booking is under process.</p>
            </div>
            <button onClick={() => setShowToast(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: 16, display: 'flex' }}>
              <X size={20} strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDownloadToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              position: 'fixed', top: 32, right: 32, zIndex: 9999,
              background: '#3b82f6', color: '#fff', padding: '16px 24px',
              borderRadius: 12, border: '3px solid #13221C',
              boxShadow: '6px 6px 0px #13221C', display: 'flex',
              alignItems: 'center', gap: 16
            }}
          >
            <Download size={24} strokeWidth={3} />
            <div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Invoice Downloaded</p>
              <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 700, opacity: 0.9 }}>Your PDF invoice is ready.</p>
            </div>
            <button onClick={() => setShowDownloadToast(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: 16, display: 'flex' }}>
              <X size={20} strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div style={{ color: textDark, minHeight: '100vh', position: 'relative', background: bg, backgroundImage: 'linear-gradient(rgba(19,34,28,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(19,34,28,0.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="booking-container" style={{ maxWidth: 720, margin: '0 auto', padding: '8rem 2rem 4rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: 14, color: '#fff', background: '#174F50', display: 'inline-block', padding: '8px 16px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 800, border: '2px solid #13221C', boxShadow: '4px 4px 0px #13221C', transform: 'rotate(-2deg)' }}>Get started</p>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 900, margin: '0 0 1.5rem', textTransform: 'uppercase', letterSpacing: '-0.02em', WebkitTextStroke: '2px #13221C', color: '#fff', textShadow: '6px 6px 0px #13221C' }}>{isEnquiry ? 'Make an Enquiry' : 'Book your desk'}</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '3rem' }}>
            <button onClick={() => { setIsEnquiry(false); setStep(1); }} style={{ background: !isEnquiry ? '#174F50' : '#fff', color: !isEnquiry ? '#fff' : textDark, border: '3px solid #13221C', borderRadius: 8, padding: '10px 24px', fontSize: 15, fontWeight: 900, cursor: 'pointer', boxShadow: !isEnquiry ? '4px 4px 0px #13221C' : 'none', textTransform: 'uppercase' }}>Booking</button>
            <button onClick={() => { setIsEnquiry(true); setStep(1); }} style={{ background: isEnquiry ? '#174F50' : '#fff', color: isEnquiry ? '#fff' : textDark, border: '3px solid #13221C', borderRadius: 8, padding: '10px 24px', fontSize: 15, fontWeight: 900, cursor: 'pointer', boxShadow: isEnquiry ? '4px 4px 0px #13221C' : 'none', textTransform: 'uppercase' }}>Enquiry</button>
          </div>

          {!isEnquiry && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '2rem', flexWrap: 'wrap' }}>
              {steps.map((label, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: step > i + 1 ? '#174F50' : (step === i + 1 ? yellow : '#fff'), border: '3px solid #13221C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: step > i + 1 ? '#fff' : textDark, fontWeight: 900, boxShadow: step >= i + 1 ? '4px 4px 0px #13221C' : '2px 2px 0px #13221C', transition: 'all 0.3s' }}>{step > i + 1 ? '✓' : i + 1}</div>
                    <span style={{ fontSize: 10, color: textDark, whiteSpace: 'nowrap', fontWeight: 900, textTransform: 'uppercase' }}>{label}</span>
                  </div>
                  {i < steps.length - 1 && <div style={{ width: 28, height: 4, background: step > i + 1 ? textDark : 'transparent', borderTop: step <= i + 1 ? '4px dashed #13221C' : 'none', marginBottom: 22, transition: 'background 0.3s' }}></div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step card */}
        <div className="booking-card" style={{ background: '#fff', border: '4px solid #13221C', borderRadius: 12, padding: '3rem', marginBottom: '2rem', boxShadow: '8px 8px 0px #13221C' }}>

          {/* ENQUIRY */}
          {isEnquiry ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 8px', color: textDark, textTransform: 'uppercase' }}>Enquiry details</p>
              {[['Name', 'name', 'Full name', 'text'], ['Email', 'email', 'you@example.com', 'email'], ['Phone', 'phone', '+91 98765 43210', 'tel']].map(([label, key, ph, type]) => (
                <div key={key}>
                  <label style={{ fontSize: 13, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>{label} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type={type} value={form[key]} onChange={e => update(key, e.target.value)} placeholder={ph} style={inp} onFocus={e => e.target.style.boxShadow = '4px 4px 0px #13221C'} onBlur={e => e.target.style.boxShadow = '4px 4px 0px rgba(19,34,28,0.1)'} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 13, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>How can we help? <span style={{ color: '#dc2626' }}>*</span></label>
                <textarea rows="4" value={form.company} onChange={e => update('company', e.target.value)} placeholder="Tell us about your requirements..." style={{ ...inp, resize: 'vertical' }} onFocus={e => e.target.style.boxShadow = '4px 4px 0px #13221C'} onBlur={e => e.target.style.boxShadow = '4px 4px 0px rgba(19,34,28,0.1)'}></textarea>
              </div>
            </div>

          ) : step === 1 ? (
            <div>
              <p style={{ fontSize: 18, fontWeight: 900, margin: '0 0 1rem', color: textDark, textTransform: 'uppercase' }}>What type of space?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: '2.5rem' }}>
                {spaceTypes.map(s => {
                  const unavail = s === 'Private Cabin';
                  return (
                    <button key={s} onClick={() => { if (!unavail) { update('space', s); update('duration', ''); } }} style={{ position: 'relative', background: unavail ? '#f3f4f6' : (form.space === s ? '#174F50' : '#fff'), border: '3px solid #13221C', borderRadius: 8, padding: '16px', fontSize: 14, fontWeight: 900, color: unavail ? '#9ca3af' : (form.space === s ? '#fff' : textDark), cursor: unavail ? 'not-allowed' : 'pointer', transition: 'all 0.15s', textAlign: 'left', textTransform: 'uppercase', boxShadow: unavail ? 'none' : (form.space === s ? '4px 4px 0px #13221C' : '4px 4px 0px rgba(19,34,28,0.1)') }}>
                      {s}
                      {unavail && <div style={{ position: 'absolute', top: -12, right: 12, background: '#13221C', color: '#fde047', fontSize: 10, padding: '4px 8px', borderRadius: 4, letterSpacing: '0.05em', whiteSpace: 'nowrap', border: '2px solid #13221C' }}>NOT AVAILABLE</div>}
                    </button>
                  );
                })}
              </div>
              <p style={{ fontSize: 18, fontWeight: 900, margin: '0 0 1rem', color: textDark, textTransform: 'uppercase' }}>Which location?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: '2.5rem' }}>
                {locationNames.map(l => {
                  const unavail = l === 'Kozhikode' || l === 'Perinthalmanna';
                  return (<button key={l} onClick={() => { if (!unavail) update('location', l); }} style={{ position: 'relative', background: unavail ? '#f3f4f6' : (form.location === l ? '#174F50' : '#fff'), border: '3px solid #13221C', borderRadius: 8, padding: '14px', fontSize: 14, fontWeight: 900, color: unavail ? '#9ca3af' : (form.location === l ? '#fff' : textDark), cursor: unavail ? 'not-allowed' : 'pointer', transition: 'all 0.15s', textAlign: 'left', textTransform: 'uppercase', boxShadow: unavail ? 'none' : (form.location === l ? '4px 4px 0px #13221C' : '4px 4px 0px rgba(19,34,28,0.1)') }}>
                    {l}
                    {unavail && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#13221C', color: '#fde047', fontSize: 10, padding: '4px 8px', borderRadius: 4, letterSpacing: '0.05em', whiteSpace: 'nowrap', border: '2px solid #13221C' }}>CURRENTLY UNAVAILABLE</div>}
                  </button>);
                })}
              </div>
              {form.space === 'Virtual Office' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: '1.5rem' }}>
                  <p style={{ fontSize: 18, fontWeight: 900, margin: 0, color: textDark, textTransform: 'uppercase' }}>Select Virtual Office Plan & Services</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* 1. Office Basic */}
                    <div 
                      onClick={() => setVoPlan('basic')}
                      style={{
                        border: `3px solid ${voPlan === 'basic' ? '#174F50' : '#13221C'}`,
                        borderRadius: 12, padding: '18px 20px', cursor: 'pointer',
                        background: voPlan === 'basic' ? '#f0fdf4' : '#fff',
                        boxShadow: voPlan === 'basic' ? '4px 4px 0px #174F50' : '3px 3px 0px rgba(19,34,28,0.1)',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 16, fontWeight: 900, color: textDark, textTransform: 'uppercase' }}>Office Basic</span>
                        <span style={{ fontSize: 15, fontWeight: 900, color: '#174F50' }}>₹14,400 + GST</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#174F50', marginBottom: 10, textTransform: 'uppercase' }}>
                        👤 Proprietorship / Single Owner (₹1,200/mo billed annually)
                      </div>
                      <ul style={{ margin: '0 0 10px 18px', padding: 0, fontSize: 13, fontWeight: 700, color: textDark, lineHeight: 1.6 }}>
                        <li>11 Months Rental Agreement</li>
                        <li>GST & NOC Support</li>
                        <li>Email Handling Support</li>
                        <li>Bank Account Opening Support</li>
                      </ul>

                      {voPlan === 'basic' && (
                        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '2px dashed #13221C' }}>
                          <p style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', marginBottom: 8, color: textDark }}>Do you need CA service? </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[
                              { id: 'drafting', label: 'Drafting Service', price: 500 },
                              { id: 'gst_msme', label: 'GST + MSME Registration', price: 2000 }
                            ].map(opt => {
                              const checked = voAddons.includes(opt.id);
                              return (
                                <label key={opt.id} onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer', color: textDark }}>
                                  <input 
                                    type="checkbox" 
                                    checked={checked} 
                                    onChange={() => toggleVoAddon(opt.id)}
                                    style={{ width: 18, height: 18, accentColor: '#174F50' }}
                                  />
                                  {opt.label} ( ₹{opt.price.toLocaleString('en-IN')} + GST)
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 2. Office Pro */}
                    <div 
                      onClick={() => setVoPlan('pro')}
                      style={{
                        border: `3px solid ${voPlan === 'pro' ? '#174F50' : '#13221C'}`,
                        borderRadius: 12, padding: '18px 20px', cursor: 'pointer',
                        background: voPlan === 'pro' ? '#f0fdf4' : '#fff',
                        boxShadow: voPlan === 'pro' ? '4px 4px 0px #174F50' : '3px 3px 0px rgba(19,34,28,0.1)',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 16, fontWeight: 900, color: textDark, textTransform: 'uppercase' }}>Office Pro</span>
                        <span style={{ fontSize: 15, fontWeight: 900, color: '#174F50' }}>₹18,000 + GST</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#174F50', marginBottom: 10, textTransform: 'uppercase' }}>
                        🏢 Partnership, LLP, Pvt Ltd, OPC (₹1,500/mo billed annually)
                      </div>
                      <ul style={{ margin: '0 0 10px 18px', padding: 0, fontSize: 13, fontWeight: 700, color: textDark, lineHeight: 1.6 }}>
                        <li>11 Months Rental Agreement</li>
                        <li>GST & NOC Support</li>
                        <li>Email Handling Support</li>
                        <li>Bank Account Opening Support</li>
                      </ul>

                      {voPlan === 'pro' && (
                        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '2px dashed #13221C' }}>
                          <p style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', marginBottom: 8, color: textDark }}>Do you need CA service? </p>
                          <label onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer', color: textDark }}>
                            <input 
                              type="checkbox" 
                              checked={voAddons.includes('llp_reg')} 
                              onChange={() => toggleVoAddon('llp_reg')}
                              style={{ width: 18, height: 18, accentColor: '#174F50' }}
                            />
                            LLP Registration ( ₹13,500 + GST)
                          </label>
                        </div>
                      )}
                    </div>

                    {/* 3. Company Registration Services */}
                    <div 
                      onClick={() => setVoPlan('reg')}
                      style={{
                        border: `3px solid ${voPlan === 'reg' ? '#174F50' : '#13221C'}`,
                        borderRadius: 12, padding: '18px 20px', cursor: 'pointer',
                        background: voPlan === 'reg' ? '#f0fdf4' : '#fff',
                        boxShadow: voPlan === 'reg' ? '4px 4px 0px #174F50' : '3px 3px 0px rgba(19,34,28,0.1)',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 16, fontWeight: 900, color: textDark, textTransform: 'uppercase' }}>Company Registration Services</span>
                        <span style={{ fontSize: 13, fontWeight: 900, color: '#174F50' }}>Select Entity</span>
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: textLight, margin: '0 0 10px' }}>Standalone registration services for new business entities</p>

                      {voPlan === 'reg' && (
                        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '2px dashed #13221C' }} onClick={e => e.stopPropagation()}>
                          <p style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', marginBottom: 10, color: textDark }}>Select Entity Registration:</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                              { id: 'opc', title: 'OPC Registration', price: 13500, desc: 'Name app (1 free), DSC for min. 1 person' },
                              { id: 'pvtltd', title: 'Pvt Ltd Registration', price: 16950, desc: 'Name app (1 time), DSC for min. 2 persons' },
                              { id: 'partnership', title: 'Partnership', price: 9322, desc: 'Includes Deed, Stamp Paper, PAN Card' }
                            ].map(item => (
                              <div 
                                key={item.id} 
                                onClick={() => setVoRegistration(item.id)}
                                style={{
                                  padding: 12, borderRadius: 8, border: `2px solid ${voRegistration === item.id ? '#174F50' : '#13221C'}`,
                                  background: voRegistration === item.id ? yellow : '#fff', cursor: 'pointer'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 14, color: textDark }}>
                                  <span>{item.title}</span>
                                  <span>₹{item.price.toLocaleString('en-IN')} + GST</span>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: textDark, marginTop: 4 }}>{item.desc}</div>
                              </div>
                            ))}
                          </div>

                          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(19,34,28,0.15)' }}>
                            <p style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', marginBottom: 8, color: textDark }}>Next Step Service:</p>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer', color: textDark }}>
                              <input 
                                type="checkbox" 
                                checked={voAddons.includes('gst_msme_reg')} 
                                onChange={() => toggleVoAddon('gst_msme_reg')}
                                style={{ width: 18, height: 18, accentColor: '#174F50' }}
                              />
                              Include GST + MSME Registration ( ₹2,000 + GST)
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: 18, fontWeight: 900, margin: '0 0 1rem', color: textDark, textTransform: 'uppercase' }}>How long?</p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {(DURATIONS_MAP[form.space] || []).map(d => {
                      const is1YearFree = d === '1 year' && (form.space === 'Hot Desk' || form.space === 'Dedicated Desk');
                      return (
                        <button key={d} onClick={() => update('duration', d)} style={{ background: form.duration === d ? '#174F50' : '#fff', border: '3px solid #13221C', borderRadius: 100, padding: '10px 20px', fontSize: 14, color: form.duration === d ? '#fff' : textDark, cursor: 'pointer', fontWeight: 900, transition: 'all 0.15s', textTransform: 'uppercase', boxShadow: form.duration === d ? '4px 4px 0px #13221C' : '2px 2px 0px rgba(19,34,28,0.1)' }}>
                          {d}{is1YearFree ? ' (2 mos free)' : ''}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

          ) : step === 2 ? (
            <div>
              <p style={{ fontSize: 18, fontWeight: 900, margin: '0 0 1.5rem', color: textDark, textTransform: 'uppercase' }}>When do you want to start?</p>
              <MiniCalendar selected={form.date} onSelect={d => update('date', d)} />
              {form.date && <p style={{ fontSize: 16, color: textDark, marginTop: 24, textAlign: 'center', fontWeight: 900, padding: '12px', borderRadius: 8, border: '3px solid #13221C', background: yellow, boxShadow: '4px 4px 0px #13221C' }}>📅 {form.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>}
            </div>

          ) : step === 3 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 8px', color: textDark, textTransform: 'uppercase' }}>Your details</p>
              {[['Name', 'name', 'Full name', 'text'], ['Email', 'email', 'you@example.com', 'email'], ['Phone', 'phone', '+91 98765 43210', 'tel'], ['Company', 'company', 'Your company name', 'text']].map(([label, key, ph, type]) => (
                <div key={key}>
                  <label style={{ fontSize: 13, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 900 }}>{label} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type={type} value={form[key]} onChange={e => update(key, e.target.value)} placeholder={ph} style={inp} onFocus={e => e.target.style.boxShadow = '4px 4px 0px #13221C'} onBlur={e => e.target.style.boxShadow = '4px 4px 0px rgba(19,34,28,0.1)'} />
                </div>
              ))}
            </div>

          ) : step === 4 ? (
            <div>
              <p style={{ fontSize: 20, fontWeight: 900, margin: '0 0 4px', color: textDark, textTransform: 'uppercase' }}>Enhance your experience</p>
              <p style={{ fontSize: 14, color: textLight, margin: '0 0 1.5rem', fontWeight: 700 }}>Optional add-ons you can skip this step</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {ADDONS.map(addon => {
                  const active = selectedAddons.includes(addon.id);
                  return (
                    <div key={addon.id} onClick={() => toggleAddon(addon.id)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', border: `3px solid ${active ? '#174F50' : '#13221C'}`, borderRadius: 10, background: active ? '#f0fdf4' : '#fff', cursor: 'pointer', transition: 'all 0.15s', boxShadow: active ? '4px 4px 0px #174F50' : '3px 3px 0px rgba(19,34,28,0.1)' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 8, border: '2px solid #13221C', background: active ? '#13221C' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: active ? '#fde047' : '#13221C', transition: 'all 0.15s' }}>{addon.icon}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: 15, fontWeight: 900, color: textDark, textTransform: 'uppercase' }}>{addon.label}</p>
                        <p style={{ margin: '2px 0 0', fontSize: 12, color: textLight, fontWeight: 700 }}>{addon.desc}</p>
                      </div>

                      <div style={{ width: 24, height: 24, borderRadius: 6, border: `3px solid ${active ? '#174F50' : '#13221C'}`, background: active ? '#174F50' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 900, flexShrink: 0, transition: 'all 0.15s' }}>{active ? '✓' : ''}</div>
                    </div>
                  );
                })}
              </div>
            </div>

          ) : null}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={() => { if (!isEnquiry && step > 1) { setStep(s => s - 1); } else { onNavigate('spaces'); } }}
            style={{ flex: 1, background: '#fff', color: textDark, border: '3px solid #13221C', borderRadius: 8, padding: '18px', fontSize: 15, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '4px 4px 0px #13221C', transition: 'transform 0.1s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translate(-2px,-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}>← Back</button>
          <button onClick={() => { if (isEnquiry || step === 4) { submitBooking(); } else { setStep(s => s + 1); } }}
            disabled={!canNext() || isSubmitting}
            style={{ flex: 2, background: canNext() && !isSubmitting ? yellow : '#fff', color: textDark, border: '3px solid #13221C', borderRadius: 8, padding: '18px', fontSize: 16, fontWeight: 900, cursor: canNext() && !isSubmitting ? 'pointer' : 'not-allowed', textTransform: 'uppercase', boxShadow: canNext() && !isSubmitting ? '6px 6px 0px #13221C' : 'none', opacity: canNext() ? 1 : 0.6, transition: 'transform 0.1s' }}
            onMouseEnter={e => { if (canNext() && !isSubmitting) e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
            onMouseLeave={e => { if (canNext() && !isSubmitting) e.currentTarget.style.transform = 'none'; }}>
            {isSubmitting ? 'Sending...' : (isEnquiry ? 'Send Enquiry →' : step === 4 ? 'Submit Booking →' : 'Continue →')}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              position: 'fixed', top: 32, right: 32, zIndex: 9999,
              background: '#22c55e', color: '#fff', padding: '16px 24px',
              borderRadius: 12, border: '3px solid #13221C',
              boxShadow: '6px 6px 0px #13221C', display: 'flex',
              alignItems: 'center', gap: 16
            }}
          >
            <CheckCircle2 size={24} strokeWidth={3} />
            <div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{isEnquiry ? 'Enquiry sent!' : 'Booking Submitted!'}</p>
              <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 700, opacity: 0.9 }}>Your booking has been confirmed.</p>
            </div>
            <button onClick={() => setShowToast(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: 16, display: 'flex' }}>
              <X size={20} strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
