import { useState } from 'react';
import { Lock, Printer, Target, Car, Coffee, Mail, ShieldCheck, CheckCircle2, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoIconImg from '../assets/Logo MOWS Secondary Colors-06 1.png';

const textDark = '#13221C';
const textLight = '#174F50';
const yellow = '#fde047';
const bg = '#fcfaf5';

const spaceTypes = ['Hot Desk', 'Dedicated Desk', 'Private Cabin', 'Meeting Room'];
const locationNames = ['Manjeri', 'Kozhikode', 'Perinthalmanna'];
const durations = ['Day pass', '1 week', '1 month', '3 months', '6 months', '1 year'];

const PRICING = {
  'Hot Desk':       { 'Day pass': 399,  '1 week': 1999,  '1 month': 5999,  '3 months': 15999, '6 months': 27999, '1 year': 49999  },
  'Dedicated Desk': { 'Day pass': 699,  '1 week': 3499,  '1 month': 9999,  '3 months': 26999, '6 months': 49999, '1 year': 88999  },
  'Private Cabin':  { 'Day pass': 1499, '1 week': 6999,  '1 month': 18999, '3 months': 53999, '6 months': 99999, '1 year': 179999 },
  'Meeting Room':   { 'Day pass': 999,  '1 week': 4999,  '1 month': 12999, '3 months': 34999, '6 months': 62999, '1 year': 109999 },
};

// Maps Spaces-page plan names → { space, duration } for auto-fill
const PLAN_MAP = {
  'Daily Pass':     { space: 'Hot Desk',       duration: 'Day pass'  },
  '15-Day Pass':    { space: 'Hot Desk',       duration: '1 week'    },
  'Monthly Basic':  { space: 'Hot Desk',       duration: '1 month'   },
  'Monthly Pro':    { space: 'Dedicated Desk', duration: '1 month'   },
  'Single Cabin':   { space: 'Private Cabin',  duration: '1 month'   },
  'Group Space':    { space: 'Meeting Room',   duration: '1 month'   },
};

const ADDONS = [
  { id: 'locker',   label: 'Personal Locker',      desc: 'Secure storage for your essentials', price: 299,  icon: <Lock   size={22} strokeWidth={2.5} /> },
  { id: 'printing', label: 'Printing Credits',      desc: '100 pages/month included',           price: 199,  icon: <Printer size={22} strokeWidth={2.5} /> },
  { id: 'meeting',  label: 'Meeting Room Hours',    desc: '5 extra hours per month',            price: 499,  icon: <Target  size={22} strokeWidth={2.5} /> },
  { id: 'parking',  label: 'Reserved Parking',      desc: 'Dedicated parking spot',             price: 599,  icon: <Car     size={22} strokeWidth={2.5} /> },
  { id: 'coffee',   label: 'Barista Coffee Pass',   desc: 'Unlimited specialty coffee',         price: 799,  icon: <Coffee  size={22} strokeWidth={2.5} /> },
  { id: 'mail',     label: 'Mail Handling',         desc: 'Receive & forward your mail',        price: 149,  icon: <Mail    size={22} strokeWidth={2.5} /> },
];

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function MiniCalendar({ selected, onSelect }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year,  setYear]  = useState(today.getFullYear());

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null).concat([...Array(daysInMonth)].map((_, i) => i + 1));
  while (cells.length % 7 !== 0) cells.push(null);

  function isPast(d) {
    if (!d) return true;
    const date = new Date(year, month, d); date.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return date < t;
  }
  function isSelected(d) {
    if (!d || !selected) return false;
    return selected.getDate()===d && selected.getMonth()===month && selected.getFullYear()===year;
  }
  function prevMonth() { if (month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); }
  function nextMonth() { if (month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); }

  return (
    <div style={{background:'#fff',border:'3px solid #13221C',borderRadius:12,padding:'1.5rem',boxShadow:'6px 6px 0px #13221C'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <button onClick={prevMonth} style={{background:'#fff',border:'2px solid #13221C',color:textDark,cursor:'pointer',fontSize:18,width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'2px 2px 0px #13221C'}}>‹</button>
        <span style={{fontSize:16,fontWeight:900,textTransform:'uppercase',color:textDark}}>{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} style={{background:'#fff',border:'2px solid #13221C',color:textDark,cursor:'pointer',fontSize:18,width:36,height:36,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'2px 2px 0px #13221C'}}>›</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:8}}>
        {DAYS.map(d=><div key={d} style={{textAlign:'center',fontSize:12,color:textDark,padding:'4px 0',fontWeight:900,textTransform:'uppercase'}}>{d}</div>)}
        {cells.map((d,i)=>(
          <div key={i} onClick={()=>{if(d&&!isPast(d))onSelect(new Date(year,month,d));}}
            style={{textAlign:'center',padding:'8px 4px',fontSize:14,borderRadius:8,cursor:d&&!isPast(d)?'pointer':'default',background:isSelected(d)?'#174F50':'#fff',color:isSelected(d)?'#fff':isPast(d)?'rgba(19,34,28,0.3)':textDark,fontWeight:900,transition:'all 0.15s',border:d&&!isPast(d)?'2px solid #13221C':'2px solid transparent',boxShadow:isSelected(d)?'2px 2px 0px #13221C':'none'}}
            onMouseEnter={e=>{if(d&&!isPast(d)&&!isSelected(d)){e.currentTarget.style.background='#fde047';e.currentTarget.style.boxShadow='2px 2px 0px #13221C';}}}
            onMouseLeave={e=>{if(!isSelected(d)){e.currentTarget.style.background='#fff';e.currentTarget.style.boxShadow='none';}}}>
            {d||''}
          </div>
        ))}
      </div>
    </div>
  );
}

function fmt(n){ return '₹'+n.toLocaleString('en-IN'); }

export default function BookingPage({ onNavigate, preselectedPlan='' }) {
  const [isEnquiry, setIsEnquiry] = useState(false);
  const [step, setStep] = useState(1);

  // If arriving from Spaces page, auto-derive space type & duration from the plan name
  const mapped = PLAN_MAP[preselectedPlan] || null;
  const initSpace    = mapped ? mapped.space    : preselectedPlan;
  const initDuration = mapped ? mapped.duration : '';

  const [form, setForm] = useState({ space: initSpace, location:'', duration: initDuration, date:null, name:'', email:'', phone:'', company:'' });
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ number:'', expiry:'', cvv:'', holder:'' });
  const [upiId, setUpiId] = useState('');
  const [payProcessing, setPayProcessing] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const basePrice   = (form.space && form.duration && PRICING[form.space]) ? (PRICING[form.space][form.duration]||0) : 0;
  const addonsTotal = selectedAddons.reduce((sum,id)=>{const a=ADDONS.find(x=>x.id===id);return sum+(a?a.price:0);},0);
  const totalAmount = basePrice + addonsTotal;
  const gst         = Math.round(totalAmount*0.18);
  const grandTotal  = totalAmount + gst;

  function toggleAddon(id){ setSelectedAddons(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]); }
  function updateCard(k,v){ setCardDetails(c=>({...c,[k]:v})); }
  function update(k,v){ setForm(f=>({...f,[k]:v})); }

  function canNext(){
    if(isEnquiry) return form.name&&form.email&&form.phone&&form.company;
    // When plan is preselected from Spaces page, duration is already auto-filled
    if(step===1) return form.space && form.location && (form.duration || !!preselectedPlan);
    if(step===2) return form.date;
    if(step===3) return form.name&&form.email&&form.phone&&form.company;
    if(step===4) return true;
    if(step===5){
      if(paymentMethod==='card') return cardDetails.number.replace(/\s/g,'').length>=16&&cardDetails.expiry&&cardDetails.cvv.length>=3&&cardDetails.holder;
      if(paymentMethod==='upi') return upiId.includes('@');
      return true;
    }
    return true;
  }

  const submitBooking = async () => {
    setIsSubmitting(true);
    const dateStr = form.date ? form.date.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}) : 'N/A';
    const payload = {
      access_key: '60bc935a-6c8a-4da4-949f-e618b1318895',
      subject: isEnquiry ? `New Enquiry from ${form.name}` : `New Booking: ${form.space} at Mows ${form.location}`,
      name: form.name, email: form.email, phone: form.phone, company: form.company||'N/A',
      type: isEnquiry?'Enquiry':'Booking',
    };
    if(!isEnquiry){ Object.assign(payload,{ space:form.space, location:form.location, duration:form.duration, startDate:dateStr, addons:selectedAddons.join(', ')||'None', amountPaid:fmt(grandTotal) }); }
    try {
      const r = await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)});
      const res = await r.json();
      if(res.success) {
        setDone(true);
      } else alert('Something went wrong!');
    } catch(e){ console.error(e); alert('Failed to send. Check connection.'); }
    finally{ setIsSubmitting(false); }
  };

  function handlePayNow(){
    setPayProcessing(true);
    // Phase 1: show spinner for 2s
    setTimeout(()=>{
      setPayProcessing(false);
      setPaySuccess(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      // Phase 2: submit immediately
      submitBooking();
    }, 2000);
  }

  function reset(){
    setDone(false); setStep(1); setShowDownloadToast(false);
    setForm({space:'',location:'',duration:'',date:null,name:'',email:'',phone:'',company:''});
    setSelectedAddons([]); setPaymentMethod('card'); setCardDetails({number:'',expiry:'',cvv:'',holder:''}); setUpiId('');
  }

  function downloadInvoice() {
    const invoiceNo = 'MOWS-' + Date.now().toString().slice(-6);
    const dateStr   = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
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
      <p><strong>Duration:</strong> ${form.duration}</p>
      <p><strong>Start date:</strong> ${startDate}</p>
    </div>
  </div>

  <div class="section">
    <table>
      <thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody>
        <tr><td>${form.space} — ${form.duration} at Mows ${form.location}</td><td style="text-align:right">${fmt(basePrice)}</td></tr>
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

  const steps = ['Choose space','Pick a date','Your details','Add-ons','Payment'];

  const inp = { width:'100%',background:'#fff',border:'3px solid #13221C',borderRadius:8,padding:'14px 18px',fontSize:15,color:textDark,outline:'none',boxSizing:'border-box',boxShadow:'4px 4px 0px rgba(19,34,28,0.1)',fontWeight:700,transition:'box-shadow 0.2s' };

  // ── Done screen ──
  if(done) return (
    <div style={{color:textDark,minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:bg,backgroundImage:'linear-gradient(rgba(19,34,28,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(19,34,28,0.05) 1px,transparent 1px)',backgroundSize:'24px 24px'}}>
      <div style={{textAlign:'center',maxWidth:520,width:'100%',padding:'3rem',background:'#fff',border:'4px solid #13221C',borderRadius:12,boxShadow:'12px 12px 0px #13221C',margin:'2rem'}}>
        <div style={{width:80,height:80,borderRadius:12,background:yellow,border:'4px solid #13221C',color:textDark,display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,margin:'0 auto 1.5rem',boxShadow:'6px 6px 0px #13221C',fontWeight:900}}>✓</div>
        <h2 style={{fontSize:32,marginBottom:8,color:textDark,fontWeight:900,textTransform:'uppercase'}}>{isEnquiry?'Enquiry sent!':'Payment Successful'}</h2>
        <p style={{color:textDark,lineHeight:1.7,marginBottom:24,fontSize:15,fontWeight:700}}>
          {isEnquiry ? <>Thanks! We'll contact you at <strong style={{color:textLight}}>{form.email}</strong> shortly.</> : <>Confirmation sent to <strong style={{color:textLight}}>{form.email}</strong>.<br/>We'll send access details 24h before your visit.</>}
        </p>
        {!isEnquiry&&(
          <div style={{borderRadius:8,padding:'1.5rem',textAlign:'left',marginBottom:20,background:'#fcfaf5',border:'3px solid #13221C'}}>
            {[['Space',form.space],['Location','Mows '+form.location],['Duration',form.duration],['Start date',form.date?.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})],selectedAddons.length>0&&['Add-ons',selectedAddons.map(id=>ADDONS.find(a=>a.id===id)?.label).join(', ')],['Amount paid',fmt(grandTotal)]].filter(Boolean).map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:k!=='Amount paid'?'2px dashed rgba(19,34,28,0.2)':'none'}}>
                <span style={{fontSize:13,color:textDark,fontWeight:800,textTransform:'uppercase'}}>{k}</span>
                <span style={{fontSize:13,fontWeight:900,color:k==='Amount paid'?textLight:textDark}}>{v}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          {!isEnquiry && (
            <button onClick={downloadInvoice} style={{background:'#174F50',color:'#fff',border:'3px solid #13221C',borderRadius:8,padding:'14px 24px',fontSize:14,fontWeight:900,cursor:'pointer',textTransform:'uppercase',boxShadow:'4px 4px 0px #13221C',display:'flex',alignItems:'center',gap:8,transition:'all 0.2s'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translate(-2px,-2px)';e.currentTarget.style.boxShadow='6px 6px 0px #13221C';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='4px 4px 0px #13221C';}}>
              <Download size={16} strokeWidth={2.5}/> Download Invoice
            </button>
          )}

          <button onClick={()=>onNavigate('home')} style={{background:'#fff',color:textDark,border:'3px solid #13221C',borderRadius:8,padding:'14px 28px',fontSize:14,fontWeight:900,cursor:'pointer',textTransform:'uppercase',boxShadow:'4px 4px 0px #13221C'}}>Back to home</button>
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
              <p style={{ margin: 0, fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment Successful</p>
              <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 700, opacity: 0.9 }}>Your booking has been confirmed.</p>
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
    <div style={{color:textDark,minHeight:'100vh',position:'relative',background:bg,backgroundImage:'linear-gradient(rgba(19,34,28,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(19,34,28,0.05) 1px,transparent 1px)',backgroundSize:'24px 24px'}}>
      <div style={{maxWidth:720,margin:'0 auto',padding:'8rem 2rem 4rem'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:'4rem'}}>
          <p style={{fontSize:14,color:'#fff',background:'#174F50',display:'inline-block',padding:'8px 16px',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:16,fontWeight:800,border:'2px solid #13221C',boxShadow:'4px 4px 0px #13221C',transform:'rotate(-2deg)'}}>Get started</p>
          <h1 style={{fontSize:'clamp(2.5rem,5vw,4rem)',fontWeight:900,margin:'0 0 1.5rem',textTransform:'uppercase',letterSpacing:'-0.02em',WebkitTextStroke:'2px #13221C',color:'#fff',textShadow:'6px 6px 0px #13221C'}}>{isEnquiry?'Make an Enquiry':'Book your desk'}</h1>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:'3rem'}}>
            <button onClick={()=>{setIsEnquiry(false);setStep(1);}} style={{background:!isEnquiry?'#174F50':'#fff',color:!isEnquiry?'#fff':textDark,border:'3px solid #13221C',borderRadius:8,padding:'10px 24px',fontSize:15,fontWeight:900,cursor:'pointer',boxShadow:!isEnquiry?'4px 4px 0px #13221C':'none',textTransform:'uppercase'}}>Booking</button>
            <button onClick={()=>{setIsEnquiry(true);setStep(1);}} style={{background:isEnquiry?'#174F50':'#fff',color:isEnquiry?'#fff':textDark,border:'3px solid #13221C',borderRadius:8,padding:'10px 24px',fontSize:15,fontWeight:900,cursor:'pointer',boxShadow:isEnquiry?'4px 4px 0px #13221C':'none',textTransform:'uppercase'}}>Enquiry</button>
          </div>

          {!isEnquiry&&(
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:'2rem',flexWrap:'wrap'}}>
              {steps.map((label,i)=>(
                <div key={label} style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                    <div style={{width:34,height:34,borderRadius:8,background:step>i+1?'#174F50':(step===i+1?yellow:'#fff'),border:'3px solid #13221C',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:step>i+1?'#fff':textDark,fontWeight:900,boxShadow:step>=i+1?'4px 4px 0px #13221C':'2px 2px 0px #13221C',transition:'all 0.3s'}}>{step>i+1?'✓':i+1}</div>
                    <span style={{fontSize:10,color:textDark,whiteSpace:'nowrap',fontWeight:900,textTransform:'uppercase'}}>{label}</span>
                  </div>
                  {i<4&&<div style={{width:28,height:4,background:step>i+1?textDark:'transparent',borderTop:step<=i+1?'4px dashed #13221C':'none',marginBottom:22,transition:'background 0.3s'}}></div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step card */}
        <div style={{background:'#fff',border:'4px solid #13221C',borderRadius:12,padding:'3rem',marginBottom:'2rem',boxShadow:'8px 8px 0px #13221C'}}>

          {/* ENQUIRY */}
          {isEnquiry?(
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <p style={{fontSize:20,fontWeight:900,margin:'0 0 8px',color:textDark,textTransform:'uppercase'}}>Enquiry details</p>
              {[['Name','name','Full name','text'],['Email','email','you@example.com','email'],['Phone','phone','+91 98765 43210','tel']].map(([label,key,ph,type])=>(
                <div key={key}>
                  <label style={{fontSize:13,color:textDark,display:'block',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:900}}>{label} <span style={{color:'#dc2626'}}>*</span></label>
                  <input type={type} value={form[key]} onChange={e=>update(key,e.target.value)} placeholder={ph} style={inp} onFocus={e=>e.target.style.boxShadow='4px 4px 0px #13221C'} onBlur={e=>e.target.style.boxShadow='4px 4px 0px rgba(19,34,28,0.1)'}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:13,color:textDark,display:'block',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:900}}>How can we help? <span style={{color:'#dc2626'}}>*</span></label>
                <textarea rows="4" value={form.company} onChange={e=>update('company',e.target.value)} placeholder="Tell us about your requirements..." style={{...inp,resize:'vertical'}} onFocus={e=>e.target.style.boxShadow='4px 4px 0px #13221C'} onBlur={e=>e.target.style.boxShadow='4px 4px 0px rgba(19,34,28,0.1)'}></textarea>
              </div>
            </div>

          ):step===1?(
            <div>
              <p style={{fontSize:18,fontWeight:900,margin:'0 0 1rem',color:textDark,textTransform:'uppercase'}}>What type of space?</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16,marginBottom:'2.5rem'}}>
                {spaceTypes.map(s=>(
                  <button key={s} onClick={()=>update('space',s)} style={{background:form.space===s?'#174F50':'#fff',border:'3px solid #13221C',borderRadius:8,padding:'16px',fontSize:14,fontWeight:900,color:form.space===s?'#fff':textDark,cursor:'pointer',transition:'all 0.15s',textAlign:'left',textTransform:'uppercase',boxShadow:form.space===s?'4px 4px 0px #13221C':'4px 4px 0px rgba(19,34,28,0.1)'}}>
                    {s}
                    {form.duration&&PRICING[s]&&<span style={{display:'block',fontSize:12,marginTop:4,opacity:0.85,fontWeight:700}}>{fmt(PRICING[s][form.duration]||0)}</span>}
                  </button>
                ))}
              </div>
              <p style={{fontSize:18,fontWeight:900,margin:'0 0 1rem',color:textDark,textTransform:'uppercase'}}>Which location?</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16,marginBottom:'2.5rem'}}>
                {locationNames.map(l=>{
                  const unavail=l==='Kozhikode'||l==='Perinthalmanna';
                  return(<button key={l} onClick={()=>{if(!unavail)update('location',l);}} style={{position:'relative',background:unavail?'#f3f4f6':(form.location===l?'#174F50':'#fff'),border:'3px solid #13221C',borderRadius:8,padding:'14px',fontSize:14,fontWeight:900,color:unavail?'#9ca3af':(form.location===l?'#fff':textDark),cursor:unavail?'not-allowed':'pointer',transition:'all 0.15s',textAlign:'left',textTransform:'uppercase',boxShadow:unavail?'none':(form.location===l?'4px 4px 0px #13221C':'4px 4px 0px rgba(19,34,28,0.1)')}}>
                    {l}
                    {unavail&&<div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#13221C',color:'#fde047',fontSize:10,padding:'4px 8px',borderRadius:4,letterSpacing:'0.05em',whiteSpace:'nowrap',border:'2px solid #13221C'}}>CURRENTLY UNAVAILABLE</div>}
                  </button>);
                })}
              </div>
              {preselectedPlan ? (
                /* Plan already selected from Spaces page — show locked summary */
                <div style={{marginTop:'0.5rem',padding:'1rem 1.25rem',background:'#f0fdf4',border:'3px solid #13221C',borderRadius:8,display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
                  <div>
                    <p style={{margin:0,fontSize:13,fontWeight:800,textTransform:'uppercase',color:textDark,opacity:0.6}}>Selected plan</p>
                    <p style={{margin:'4px 0 0',fontSize:17,fontWeight:900,color:textLight}}>{preselectedPlan}</p>
                    <p style={{margin:'2px 0 0',fontSize:13,fontWeight:700,color:textDark}}>{form.space} · {form.duration}</p>
                  </div>
                  <span style={{fontSize:22,fontWeight:900,color:textLight}}>{basePrice > 0 ? fmt(basePrice) : '—'}</span>
                </div>
              ) : (
                <>
                  <p style={{fontSize:18,fontWeight:900,margin:'0 0 1rem',color:textDark,textTransform:'uppercase'}}>How long?</p>
                  <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                    {durations.map(d=><button key={d} onClick={()=>update('duration',d)} style={{background:form.duration===d?'#174F50':'#fff',border:'3px solid #13221C',borderRadius:100,padding:'10px 20px',fontSize:14,color:form.duration===d?'#fff':textDark,cursor:'pointer',fontWeight:900,transition:'all 0.15s',textTransform:'uppercase',boxShadow:form.duration===d?'4px 4px 0px #13221C':'2px 2px 0px rgba(19,34,28,0.1)'}}>{d}</button>)}
                  </div>
                  {form.space&&form.duration&&(
                    <div style={{marginTop:'1.5rem',padding:'1rem 1.25rem',background:'#f0fdf4',border:'3px solid #13221C',borderRadius:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <span style={{fontSize:14,fontWeight:800,color:textDark,textTransform:'uppercase'}}>Base price</span>
                      <span style={{fontSize:22,fontWeight:900,color:textLight}}>{fmt(basePrice)}</span>
                    </div>
                  )}
                </>
              )}
            </div>

          ):step===2?(
            <div>
              <p style={{fontSize:18,fontWeight:900,margin:'0 0 1.5rem',color:textDark,textTransform:'uppercase'}}>When do you want to start?</p>
              <MiniCalendar selected={form.date} onSelect={d=>update('date',d)}/>
              {form.date&&<p style={{fontSize:16,color:textDark,marginTop:24,textAlign:'center',fontWeight:900,padding:'12px',borderRadius:8,border:'3px solid #13221C',background:yellow,boxShadow:'4px 4px 0px #13221C'}}>📅 {form.date.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>}
            </div>

          ):step===3?(
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <p style={{fontSize:20,fontWeight:900,margin:'0 0 8px',color:textDark,textTransform:'uppercase'}}>Your details</p>
              {[['Name','name','Full name','text'],['Email','email','you@example.com','email'],['Phone','phone','+91 98765 43210','tel'],['Company','company','Your company name','text']].map(([label,key,ph,type])=>(
                <div key={key}>
                  <label style={{fontSize:13,color:textDark,display:'block',marginBottom:8,textTransform:'uppercase',letterSpacing:'0.05em',fontWeight:900}}>{label} <span style={{color:'#dc2626'}}>*</span></label>
                  <input type={type} value={form[key]} onChange={e=>update(key,e.target.value)} placeholder={ph} style={inp} onFocus={e=>e.target.style.boxShadow='4px 4px 0px #13221C'} onBlur={e=>e.target.style.boxShadow='4px 4px 0px rgba(19,34,28,0.1)'}/>
                </div>
              ))}
            </div>

          ):step===4?(
            <div>
              <p style={{fontSize:20,fontWeight:900,margin:'0 0 4px',color:textDark,textTransform:'uppercase'}}>Enhance your experience</p>
              <p style={{fontSize:14,color:textLight,margin:'0 0 1.5rem',fontWeight:700}}>Optional add-ons — you can skip this step</p>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {ADDONS.map(addon=>{
                  const active=selectedAddons.includes(addon.id);
                  return(
                    <div key={addon.id} onClick={()=>toggleAddon(addon.id)} style={{display:'flex',alignItems:'center',gap:16,padding:'16px 20px',border:`3px solid ${active?'#174F50':'#13221C'}`,borderRadius:10,background:active?'#f0fdf4':'#fff',cursor:'pointer',transition:'all 0.15s',boxShadow:active?'4px 4px 0px #174F50':'3px 3px 0px rgba(19,34,28,0.1)'}}>
                      <div style={{width:44,height:44,borderRadius:8,border:'2px solid #13221C',background:active?'#13221C':'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:active?'#fde047':'#13221C',transition:'all 0.15s'}}>{addon.icon}</div>
                      <div style={{flex:1}}>
                        <p style={{margin:0,fontSize:15,fontWeight:900,color:textDark,textTransform:'uppercase'}}>{addon.label}</p>
                        <p style={{margin:'2px 0 0',fontSize:12,color:textLight,fontWeight:700}}>{addon.desc}</p>
                      </div>
                      <div style={{textAlign:'right',flexShrink:0}}>
                        <p style={{margin:0,fontSize:16,fontWeight:900,color:active?textLight:textDark}}>+{fmt(addon.price)}</p>
                        <p style={{margin:'2px 0 0',fontSize:10,color:textDark,fontWeight:700,textTransform:'uppercase',opacity:0.6}}>per month</p>
                      </div>
                      <div style={{width:24,height:24,borderRadius:6,border:`3px solid ${active?'#174F50':'#13221C'}`,background:active?'#174F50':'#fff',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:14,fontWeight:900,flexShrink:0,transition:'all 0.15s'}}>{active?'✓':''}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{marginTop:'1.5rem',background:'#fcfaf5',border:'3px solid #13221C',borderRadius:10,overflow:'hidden'}}>
                <div style={{padding:'1rem 1.25rem',display:'flex',justifyContent:'space-between',borderBottom:'2px dashed rgba(19,34,28,0.2)'}}>
                  <span style={{fontSize:13,fontWeight:800,textTransform:'uppercase'}}>{form.space} — {form.duration}</span>
                  <span style={{fontSize:14,fontWeight:900}}>{fmt(basePrice)}</span>
                </div>
                {selectedAddons.map(id=>{const a=ADDONS.find(x=>x.id===id);return(
                  <div key={id} style={{padding:'0.75rem 1.25rem',display:'flex',justifyContent:'space-between',borderBottom:'2px dashed rgba(19,34,28,0.1)'}}>
                    <span style={{fontSize:13,fontWeight:700,color:textLight}}>+ {a.label}</span>
                    <span style={{fontSize:13,fontWeight:800}}>{fmt(a.price)}</span>
                  </div>
                );})}
                <div style={{padding:'0.75rem 1.25rem',display:'flex',justifyContent:'space-between',borderBottom:'2px dashed rgba(19,34,28,0.15)'}}>
                  <span style={{fontSize:13,fontWeight:800,textTransform:'uppercase'}}>GST (18%)</span>
                  <span style={{fontSize:13,fontWeight:800}}>{fmt(gst)}</span>
                </div>
                <div style={{padding:'1rem 1.25rem',display:'flex',justifyContent:'space-between',background:yellow}}>
                  <span style={{fontSize:16,fontWeight:900,textTransform:'uppercase'}}>Total</span>
                  <span style={{fontSize:20,fontWeight:900,color:textDark}}>{fmt(grandTotal)}</span>
                </div>
              </div>
            </div>

          ):step===5?(
            <div>
              <p style={{fontSize:20,fontWeight:900,margin:'0 0 4px',color:textDark,textTransform:'uppercase'}}>Secure Payment</p>
              <p style={{fontSize:13,color:textLight,margin:'0 0 1.5rem',fontWeight:700,display:'flex',alignItems:'center',gap:6}}>🔒 Your payment is encrypted and secure</p>

              {/* Order summary */}
              <div style={{background:'#f0fdf4',border:'3px solid #13221C',borderRadius:10,padding:'1rem 1.25rem',marginBottom:'1.5rem'}}>
                <p style={{margin:'0 0 10px',fontSize:13,fontWeight:900,textTransform:'uppercase'}}>Order summary</p>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:700}}>{form.space} · {form.location} · {form.duration}</span>
                  <span style={{fontSize:13,fontWeight:900}}>{fmt(basePrice)}</span>
                </div>
                {selectedAddons.map(id=>{const a=ADDONS.find(x=>x.id===id);return(
                  <div key={id} style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontSize:12,color:textLight,fontWeight:700}}>+ {a.label}</span>
                    <span style={{fontSize:12,fontWeight:800}}>{fmt(a.price)}</span>
                  </div>
                );})}
                <div style={{display:'flex',justifyContent:'space-between',marginTop:8,paddingTop:8,borderTop:'2px dashed rgba(19,34,28,0.2)'}}>
                  <span style={{fontSize:12,fontWeight:800}}>GST (18%)</span>
                  <span style={{fontSize:12,fontWeight:800}}>{fmt(gst)}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:8,paddingTop:8,borderTop:'3px solid #13221C'}}>
                  <span style={{fontSize:16,fontWeight:900,textTransform:'uppercase'}}>Total Due</span>
                  <span style={{fontSize:22,fontWeight:900,color:textLight}}>{fmt(grandTotal)}</span>
                </div>
              </div>

              {/* Payment tabs */}
              <div style={{display:'flex',gap:10,marginBottom:'1.5rem'}}>
                {[['card','💳 Card'],['upi','📱 UPI'],['netbanking','🏦 Net Banking']].map(([m,label])=>(
                  <button key={m} onClick={()=>setPaymentMethod(m)} style={{flex:1,padding:'10px 6px',fontSize:13,fontWeight:900,border:'3px solid #13221C',borderRadius:8,background:paymentMethod===m?'#13221C':'#fff',color:paymentMethod===m?'#fff':textDark,cursor:'pointer',transition:'all 0.15s',boxShadow:paymentMethod===m?'3px 3px 0px #174F50':'2px 2px 0px rgba(19,34,28,0.1)',textTransform:'uppercase'}}>{label}</button>
                ))}
              </div>

              {paymentMethod==='card'&&(
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  <div>
                    <label style={{fontSize:12,fontWeight:900,textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Cardholder name</label>
                    <input placeholder="Name on card" value={cardDetails.holder} onChange={e=>updateCard('holder',e.target.value)} style={inp} onFocus={e=>e.target.style.boxShadow='4px 4px 0px #13221C'} onBlur={e=>e.target.style.boxShadow='4px 4px 0px rgba(19,34,28,0.1)'}/>
                  </div>
                  <div>
                    <label style={{fontSize:12,fontWeight:900,textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Card number</label>
                    <input placeholder="1234 5678 9012 3456" maxLength={19} value={cardDetails.number} onChange={e=>updateCard('number',e.target.value.replace(/\D/g,'').replace(/(\d{4})/g,'$1 ').trim())} style={inp} onFocus={e=>e.target.style.boxShadow='4px 4px 0px #13221C'} onBlur={e=>e.target.style.boxShadow='4px 4px 0px rgba(19,34,28,0.1)'}/>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                    <div>
                      <label style={{fontSize:12,fontWeight:900,textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>Expiry date</label>
                      <input placeholder="MM / YY" maxLength={7} value={cardDetails.expiry} onChange={e=>{let v=e.target.value.replace(/\D/g,'');if(v.length>=2)v=v.slice(0,2)+' / '+v.slice(2,4);updateCard('expiry',v);}} style={inp} onFocus={e=>e.target.style.boxShadow='4px 4px 0px #13221C'} onBlur={e=>e.target.style.boxShadow='4px 4px 0px rgba(19,34,28,0.1)'}/>
                    </div>
                    <div>
                      <label style={{fontSize:12,fontWeight:900,textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>CVV</label>
                      <input placeholder="•••" maxLength={4} type="password" value={cardDetails.cvv} onChange={e=>updateCard('cvv',e.target.value.replace(/\D/g,''))} style={inp} onFocus={e=>e.target.style.boxShadow='4px 4px 0px #13221C'} onBlur={e=>e.target.style.boxShadow='4px 4px 0px rgba(19,34,28,0.1)'}/>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:10,alignItems:'center',marginTop:4,opacity:0.7}}>
                    {['VISA','MC','AMEX','RuPay'].map(c=><span key={c} style={{fontSize:10,fontWeight:900,border:'2px solid #13221C',borderRadius:4,padding:'3px 8px',background:'#fcfaf5'}}>{c}</span>)}
                  </div>
                </div>
              )}

              {paymentMethod==='upi'&&(
                <div>
                  <label style={{fontSize:12,fontWeight:900,textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:8}}>UPI ID</label>
                  <input placeholder="yourname@upi" value={upiId} onChange={e=>setUpiId(e.target.value)} style={inp} onFocus={e=>e.target.style.boxShadow='4px 4px 0px #13221C'} onBlur={e=>e.target.style.boxShadow='4px 4px 0px rgba(19,34,28,0.1)'}/>
                  <p style={{fontSize:12,color:textLight,marginTop:10,fontWeight:700}}>Supports GPay, PhonePe, Paytm, BHIM & all UPI apps.</p>
                  <div style={{display:'flex',gap:10,marginTop:12,flexWrap:'wrap'}}>
                    {['GPay','PhonePe','Paytm','BHIM'].map(u=><span key={u} style={{fontSize:11,fontWeight:900,border:'2px solid #13221C',borderRadius:6,padding:'5px 12px',background:'#fff'}}>{u}</span>)}
                  </div>
                </div>
              )}

              {paymentMethod==='netbanking'&&(
                <div>
                  <label style={{fontSize:12,fontWeight:900,textTransform:'uppercase',letterSpacing:'0.05em',display:'block',marginBottom:12}}>Select your bank</label>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
                    {['SBI','HDFC','ICICI','Axis','Kotak','BOI'].map(bank=>(
                      <button key={bank} style={{padding:'14px',border:'3px solid #13221C',borderRadius:8,background:'#fff',fontWeight:900,fontSize:14,cursor:'pointer',textTransform:'uppercase',boxShadow:'2px 2px 0px rgba(19,34,28,0.15)',transition:'all 0.15s'}}
                        onMouseEnter={e=>{e.currentTarget.style.background=yellow;e.currentTarget.style.boxShadow='3px 3px 0px #13221C';}}
                        onMouseLeave={e=>{e.currentTarget.style.background='#fff';e.currentTarget.style.boxShadow='2px 2px 0px rgba(19,34,28,0.15)';}}>{bank}</button>
                    ))}
                  </div>
                  <p style={{fontSize:12,color:textLight,marginTop:12,fontWeight:700}}>You will be redirected to your bank's secure page.</p>
                </div>
              )}

              <button onClick={handlePayNow} disabled={!canNext()||payProcessing||paySuccess}
                style={{width:'100%',marginTop:'1.5rem',padding:'18px',background:paySuccess?'#22c55e':(canNext()&&!payProcessing?yellow:'#f3f4f6'),border:'3px solid #13221C',borderRadius:8,fontSize:17,fontWeight:900,color:paySuccess?'#fff':textDark,cursor:canNext()&&!payProcessing&&!paySuccess?'pointer':'not-allowed',textTransform:'uppercase',boxShadow:paySuccess?'6px 6px 0px #15803d':(canNext()&&!payProcessing?'6px 6px 0px #13221C':'none'),transition:'all 0.3s',letterSpacing:'0.04em',opacity:canNext()||paySuccess?1:0.6}}
                onMouseEnter={e=>{if(canNext()&&!payProcessing&&!paySuccess)e.currentTarget.style.transform='translate(-2px,-2px)';}}
                onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                {payProcessing?(
                  <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
                    <span style={{display:'inline-block',width:18,height:18,border:'3px solid #13221C',borderTopColor:'transparent',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}></span>
                    Processing payment...
                  </span>
                ):paySuccess?(
                  <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
                    <CheckCircle2 size={20} strokeWidth={2.5}/>
                    Payment Successful
                  </span>
                ):(
                  <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10}}><ShieldCheck size={20} strokeWidth={2.5}/> Pay {fmt(grandTotal)}</span>
                )}
              </button>
              <p style={{textAlign:'center',fontSize:12,color:textDark,marginTop:12,fontWeight:700,opacity:0.7}}>Demo mode — no real payment will be charged.</p>
            </div>
          ):null}
        </div>

        {/* Navigation buttons */}
        {step<5&&(
          <div style={{display:'flex',gap:16}}>
            <button onClick={()=>{ if(!isEnquiry&&step>1){setStep(s=>s-1);}else{onNavigate('spaces');} }}
              style={{flex:1,background:'#fff',color:textDark,border:'3px solid #13221C',borderRadius:8,padding:'18px',fontSize:15,fontWeight:900,cursor:'pointer',textTransform:'uppercase',boxShadow:'4px 4px 0px #13221C',transition:'transform 0.1s'}}
              onMouseEnter={e=>e.currentTarget.style.transform='translate(-2px,-2px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>← Back</button>
            <button onClick={()=>{ if(isEnquiry){submitBooking();}else{setStep(s=>s+1);} }}
              disabled={!canNext()||isSubmitting}
              style={{flex:2,background:canNext()&&!isSubmitting?yellow:'#fff',color:textDark,border:'3px solid #13221C',borderRadius:8,padding:'18px',fontSize:16,fontWeight:900,cursor:canNext()&&!isSubmitting?'pointer':'not-allowed',textTransform:'uppercase',boxShadow:canNext()&&!isSubmitting?'6px 6px 0px #13221C':'none',opacity:canNext()?1:0.6,transition:'transform 0.1s'}}
              onMouseEnter={e=>{if(canNext()&&!isSubmitting)e.currentTarget.style.transform='translate(-2px,-2px)';}}
              onMouseLeave={e=>{if(canNext()&&!isSubmitting)e.currentTarget.style.transform='none';}}>
              {isSubmitting?'Sending...':(isEnquiry?'Send Enquiry →':step===4?'Continue to Payment →':'Continue →')}
            </button>
          </div>
        )}
        {step===5&&(
          <button onClick={()=>setStep(4)} style={{width:'100%',background:'#fff',color:textDark,border:'3px solid #13221C',borderRadius:8,padding:'14px',fontSize:15,fontWeight:900,cursor:'pointer',textTransform:'uppercase',boxShadow:'4px 4px 0px #13221C',transition:'transform 0.1s'}}
            onMouseEnter={e=>e.currentTarget.style.transform='translate(-2px,-2px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='none'}>← Back to Add-ons</button>
        )}
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
              <p style={{ margin: 0, fontSize: 16, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment Successful</p>
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
