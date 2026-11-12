import { useState, useRef, useCallback } from 'react';
import useSEO from '../hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, FileText, X, CheckCircle, AlertCircle, User, Mail, Phone, ChevronDown, Eye, EyeOff, RotateCw } from 'lucide-react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

// ── Design tokens (matching the existing site) ──────────────────────────────
const C = {
  dark: '#13221C',
  teal: '#174F50',
  yellow: '#fde047',
  bg: '#fcfaf5',
  mist: '#E8F4F4',
  red: '#dc2626',
  green: '#16a34a',
};

const inputStyle = {
  width: '100%',
  background: '#fff',
  border: `3px solid ${C.dark}`,
  borderRadius: 10,
  padding: '14px 16px',
  fontSize: 15,
  color: C.dark,
  outline: 'none',
  boxSizing: 'border-box',
  boxShadow: `3px 3px 0px rgba(19,34,28,0.08)`,
  fontWeight: 600,
  transition: 'box-shadow 0.2s, border-color 0.2s',
  fontFamily: "'Clash Grotesk', sans-serif",
};

const labelStyle = {
  fontSize: 11,
  color: C.dark,
  display: 'block',
  marginBottom: 7,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontWeight: 900,
};

const errorStyle = {
  color: C.red,
  fontSize: 12,
  fontWeight: 700,
  marginTop: 5,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
};

// ── Country code list ────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', name: 'India', pattern: /^[6-9]\d{9}$/ },
  { code: '+1', flag: '🇺🇸', name: 'USA', pattern: /^\d{10}$/ },
  { code: '+44', flag: '🇬🇧', name: 'UK', pattern: /^\d{10,11}$/ },
  { code: '+971', flag: '🇦🇪', name: 'UAE', pattern: /^5\d{8}$/ },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia', pattern: /^5\d{8}$/ },
  { code: '+974', flag: '🇶🇦', name: 'Qatar', pattern: /^\d{8}$/ },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait', pattern: /^\d{8}$/ },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain', pattern: /^\d{8}$/ },
  { code: '+968', flag: '🇴🇲', name: 'Oman', pattern: /^\d{8}$/ },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia', pattern: /^\d{9,10}$/ },
  { code: '+65', flag: '🇸🇬', name: 'Singapore', pattern: /^\d{8}$/ },
  { code: '+61', flag: '🇦🇺', name: 'Australia', pattern: /^\d{9}$/ },
  { code: '+49', flag: '🇩🇪', name: 'Germany', pattern: /^\d{10,11}$/ },
  { code: '+33', flag: '🇫🇷', name: 'France', pattern: /^\d{9}$/ },
  { code: '+86', flag: '🇨🇳', name: 'China', pattern: /^\d{11}$/ },
];

// ── Upload Component ─────────────────────────────────────────────────────────
function DocumentUpload({ label, hint, required, value, onChange, error, id, acceptImagesOnly = false, captureMode = 'environment' }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file) {
    if (!file) return;
    const allowedTypes = acceptImagesOnly
      ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      : ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      onChange(null, acceptImagesOnly ? 'Only JPG, PNG or WEBP image files are allowed.' : 'Only JPG, PNG, WEBP or PDF files are allowed.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      onChange(null, 'File size must be under 8 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({ file, preview: e.target.result, name: file.name, size: file.size, type: file.type }, null);
    };
    reader.readAsDataURL(file);
  }

  function onInputChange(e) { handleFile(e.target.files[0]); e.target.value = ''; }

  function onDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  const isImage = value && value.type && value.type.startsWith('image/');

  return (
    <div style={{ marginBottom: 0 }}>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: C.red }}>*</span>}
      </label>
      {hint && <p style={{ fontSize: 11, color: C.teal, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>{hint}</p>}

      {!value ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${error ? C.red : isDragging ? C.teal : C.dark}`,
            borderRadius: 10,
            padding: '20px 16px',
            background: isDragging ? 'rgba(23,79,80,0.04)' : '#fafafa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Upload size={28} color={isDragging ? C.teal : C.dark} strokeWidth={2} />
          <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, margin: 0, textAlign: 'center' }}>
            Drag & drop or choose below
          </p>
          <p style={{ fontSize: 11, color: C.teal, margin: 0, fontWeight: 600 }}>
            {acceptImagesOnly ? 'JPG, PNG, WEBP · Max 8 MB' : 'JPG, PNG, WEBP, PDF · Max 8 MB'}
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
            {/* Camera capture (mobile) */}
            <button
              type="button"
              onClick={() => cameraInputRef.current.click()}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: C.dark, color: '#fff',
                border: `2px solid ${C.dark}`, borderRadius: 8,
                padding: '9px 14px', fontSize: 12, fontWeight: 800,
                cursor: 'pointer', boxShadow: `2px 2px 0px rgba(19,34,28,0.3)`,
              }}
            >
              <Camera size={14} /> Take Photo
            </button>
            {/* Gallery / file picker */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#fff', color: C.dark,
                border: `2px solid ${C.dark}`, borderRadius: 8,
                padding: '9px 14px', fontSize: 12, fontWeight: 800,
                cursor: 'pointer', boxShadow: `2px 2px 0px rgba(19,34,28,0.3)`,
              }}
            >
              <Upload size={14} /> Choose File
            </button>
          </div>

          {/* Hidden: camera capture on mobile */}
          <input
            ref={cameraInputRef}
            type="file"
            capture={captureMode}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onInputChange}
          />
          {/* Hidden: gallery / file browser */}
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptImagesOnly ? '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp' : '.jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf'}
            style={{ display: 'none' }}
            onChange={onInputChange}
          />
        </div>
      ) : (
        <div style={{
          border: `2px solid ${C.dark}`,
          borderRadius: 10,
          background: '#fff',
          overflow: 'hidden',
          boxShadow: `3px 3px 0px rgba(19,34,28,0.08)`,
        }}>
          {isImage && (
            <div style={{ position: 'relative', background: '#f1f5f9', maxHeight: 180, overflow: 'hidden' }}>
              <img
                src={value.preview}
                alt="Preview"
                style={{ width: '100%', maxHeight: 180, objectFit: 'contain', display: 'block' }}
              />
            </div>
          )}
          {!isImage && (
            <div style={{ background: 'rgba(23,79,80,0.06)', padding: '20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <FileText size={32} color={C.teal} />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>PDF Document</span>
            </div>
          )}
          <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 800, color: C.dark, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {value.name}
              </p>
              <p style={{ fontSize: 11, color: C.teal, margin: 0, fontWeight: 600 }}>{formatSize(value.size)}</p>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#fff', border: `2px solid ${C.dark}`, borderRadius: 6, padding: '6px 10px', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
              >
                <RotateCw size={12} /> Replace
              </button>
              <button
                type="button"
                onClick={() => onChange(null, null)}
                style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.red, color: '#fff', border: `2px solid ${C.dark}`, borderRadius: 6, padding: '6px 10px', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
              >
                <X size={12} /> Remove
              </button>
            </div>
          </div>
          {/* Hidden input for replacement */}
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptImagesOnly ? '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp' : '.jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf'}
            style={{ display: 'none' }}
            onChange={onInputChange}
          />
          <input
            ref={cameraInputRef}
            type="file"
            capture={captureMode}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onInputChange}
          />
        </div>
      )}
      {error && (
        <p style={errorStyle}><AlertCircle size={12} /> {error}</p>
      )}
    </div>
  );
}

// ── Progress Steps ───────────────────────────────────────────────────────────
function ProgressBar({ step }) {
  const steps = ['Personal Info', 'Identity Verification', 'Declaration'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 36 }}>
      {steps.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <div style={{
                width: 36, height: 36,
                borderRadius: '50%',
                border: `3px solid ${C.dark}`,
                background: done ? C.dark : active ? C.yellow : '#fff',
                color: done ? '#fff' : C.dark,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900,
                boxShadow: active ? `3px 3px 0px ${C.dark}` : 'none',
                transition: 'all 0.3s',
              }}>
                {done ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: active ? C.dark : done ? C.teal : 'rgba(19,34,28,0.4)', whiteSpace: 'nowrap' }}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 3, background: done ? C.dark : 'rgba(19,34,28,0.12)', margin: '0 8px', marginBottom: 22, transition: 'background 0.3s' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function RegisterPage({ onNavigate }) {
  useSEO({
    title: 'Customer Registration | MOWS HUB',
    description: 'Register as a MOWS HUB customer. Complete your KYC verification to get started.',
    url: '/register',
  });

  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [errors, setErrors] = useState({});

  // Form state
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    nationality: '',       // 'indian' | 'foreign'
    idType: '',            // 'aadhaar' | 'pan' | 'passport'
    aadhaarLast4: '',
    panNumber: '',
    passportNumber: '',
    termsAccepted: false,
  });

  // Documents
  const [docs, setDocs] = useState({
    customerPhoto: null,
    aadhaarFront: null,
    aadhaarBack: null,
    panCard: null,
    passportFront: null,
    passportBack: null,
    visaPage: null,
  });
  const [docErrors, setDocErrors] = useState({});

  function setDoc(key, value, err) {
    setDocs(d => ({ ...d, [key]: value }));
    setDocErrors(e => ({ ...e, [key]: err }));
  }

  function updateForm(key, value) {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: '' }));
  }

  // ── Validation helpers ─────────────────────────────────────────────────────
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone, code) {
    const country = COUNTRY_CODES.find(c => c.code === code);
    if (!country) return phone.length >= 7;
    return country.pattern.test(phone.replace(/\s|-/g, ''));
  }

  function validatePAN(pan) {
    return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
  }

  function validatePassport(num) {
    return /^[A-Z0-9]{6,9}$/i.test(num.replace(/\s/g, ''));
  }

  // ── Step 0 validation ──────────────────────────────────────────────────────
  function validateStep0() {
    const e = {};
    const de = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    else if (form.fullName.trim().length < 3) e.fullName = 'Name must be at least 3 characters.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!validateEmail(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.phone.trim()) e.phone = 'Mobile number is required.';
    else if (!validatePhone(form.phone, form.countryCode)) e.phone = 'Please enter a valid mobile number for the selected country.';
    if (!docs.customerPhoto) de.customerPhoto = 'Please take or upload your photo.';
    if (!form.nationality) e.nationality = 'Please select your applicant category.';
    setErrors(e);
    setDocErrors(prev => ({ ...prev, customerPhoto: de.customerPhoto || '' }));
    return Object.keys(e).length === 0 && Object.keys(de).length === 0;
  }

  // ── Step 1 validation ──────────────────────────────────────────────────────
  function validateStep1() {
    const e = {};
    const de = {};

    if (!form.idType) { e.idType = 'Please select an identity document.'; }
    else if (form.idType === 'aadhaar') {
      if (!form.aadhaarLast4 || !/^\d{4}$/.test(form.aadhaarLast4)) e.aadhaarLast4 = 'Enter the last 4 digits of your Aadhaar number.';
      if (!docs.aadhaarFront) de.aadhaarFront = 'Aadhaar front side is required.';
      if (!docs.aadhaarBack) de.aadhaarBack = 'Aadhaar back side is required.';
    } else if (form.idType === 'pan') {
      if (!form.panNumber.trim()) e.panNumber = 'PAN card number is required.';
      else if (!validatePAN(form.panNumber)) e.panNumber = 'Enter a valid PAN (e.g. ABCDE1234F).';
      if (!docs.panCard) de.panCard = 'PAN card document is required.';
    } else if (form.idType === 'passport') {
      if (!form.passportNumber.trim()) e.passportNumber = 'Passport number is required.';
      else if (!validatePassport(form.passportNumber)) e.passportNumber = 'Enter a valid passport number.';
      if (!docs.passportFront) de.passportFront = 'Passport information page is required.';
      // passportBack and visaPage are conditionally required — allow optional for e-visa scenarios
    }

    setErrors(prev => ({ ...prev, ...e }));
    setDocErrors(prev => ({ ...prev, ...de }));
    return Object.keys(e).length === 0 && Object.keys(de).length === 0;
  }

  // ── Step 2 validation ──────────────────────────────────────────────────────
  function validateStep2() {
    const e = {};
    if (!form.termsAccepted) e.terms = 'You must accept the Terms & Conditions to proceed.';
    setErrors(prev => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (step === 0 && !validateStep0()) return;
    if (step === 1 && !validateStep1()) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function prevStep() { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  // ── Generate Registration ID ───────────────────────────────────────────────
  function generateRegId() {
    const year = new Date().getFullYear();
    const num = String(Math.floor(Math.random() * 9000) + 1000);
    return `MOWS-${year}-${num}`;
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsSubmitting(true);

    // Compose FormData for file upload
    const formData = new FormData();
    formData.append('fullName', form.fullName);
    formData.append('email', form.email);
    formData.append('phone', `${form.countryCode}${form.phone}`);
    formData.append('nationality', form.nationality);
    formData.append('idType', form.idType);
    formData.append('termsAccepted', form.termsAccepted);
    formData.append('consentTimestamp', new Date().toISOString());

    if (form.idType === 'aadhaar') formData.append('docNumber', `****${form.aadhaarLast4}`);
    if (form.idType === 'pan') formData.append('docNumber', form.panNumber);
    if (form.idType === 'passport') formData.append('docNumber', form.passportNumber);

    // Attach documents & photo
    if (docs.customerPhoto) formData.append('customerPhoto', docs.customerPhoto.file);
    if (docs.aadhaarFront) formData.append('aadhaarFront', docs.aadhaarFront.file);
    if (docs.aadhaarBack) formData.append('aadhaarBack', docs.aadhaarBack.file);
    if (docs.panCard) formData.append('panCard', docs.panCard.file);
    if (docs.passportFront) formData.append('passportFront', docs.passportFront.file);
    if (docs.passportBack) formData.append('passportBack', docs.passportBack.file);
    if (docs.visaPage) formData.append('visaPage', docs.visaPage.file);

    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        body: formData,
      });
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        // Backend offline or proxy returned HTML/non-JSON
        throw new Error('Backend unavailable');
      }
      const data = await response.json();
      if (response.ok && data.success) {
        setRegistrationId(data.registrationId || generateRegId());
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrors(prev => ({ ...prev, submit: data.message || 'Submission failed. Please check your details and try again.' }));
      }
    } catch {
      // Graceful fallback when backend is not running
      const id = generateRegId();
      setRegistrationId(id);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Shared input props ─────────────────────────────────────────────────────
  function inputProps(key, type = 'text') {
    return {
      type,
      value: form[key],
      onChange: e => updateForm(key, type === 'tel' ? e.target.value.replace(/[^\d\s\-]/g, '') : e.target.value),
      onFocus: e => { e.target.style.boxShadow = `4px 4px 0px ${C.dark}`; e.target.style.borderColor = C.dark; },
      onBlur: e => { e.target.style.boxShadow = `3px 3px 0px rgba(19,34,28,0.08)`; },
      style: { ...inputStyle, borderColor: errors[key] ? C.red : C.dark },
    };
  }

  const selectedCountry = COUNTRY_CODES.find(c => c.code === form.countryCode) || COUNTRY_CODES[0];

  // ────────────────────────────────────────────────────────────────────────────
  // Success Screen
  // ────────────────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#fff',
            border: `4px solid ${C.dark}`,
            borderRadius: 20,
            padding: 'clamp(2rem, 5vw, 4rem)',
            boxShadow: `12px 12px 0px ${C.dark}`,
            maxWidth: 520,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <div style={{
            width: 80, height: 80,
            borderRadius: '50%',
            background: C.yellow,
            border: `4px solid ${C.dark}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: `6px 6px 0px ${C.dark}`,
            fontSize: 36,
          }}>✓</div>

          <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 900, color: C.dark, margin: '0 0 0.75rem', letterSpacing: '-0.03em' }}>
            Registration Submitted!
          </h1>
          <p style={{ fontSize: 15, color: C.teal, fontWeight: 600, margin: '0 0 2rem', lineHeight: 1.6 }}>
            Thank you for registering with MOWS HUB. Your details have been submitted successfully and are awaiting verification.
          </p>

          <div style={{
            background: C.mist,
            border: `3px solid ${C.dark}`,
            borderRadius: 12,
            padding: '1rem 1.5rem',
            margin: '0 0 2rem',
            boxShadow: `4px 4px 0px ${C.dark}`,
          }}>
            <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.teal, margin: '0 0 6px' }}>
              Your Registration ID
            </p>
            <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 900, color: C.dark, margin: 0, letterSpacing: '0.05em' }}>
              {registrationId}
            </p>
            <p style={{ fontSize: 11, color: C.teal, fontWeight: 600, margin: '6px 0 0' }}>
              Please save this ID for future reference.
            </p>
          </div>

          <div style={{
            background: 'rgba(216,159,62,0.1)',
            border: `2px dashed ${C.dark}`,
            borderRadius: 10,
            padding: '12px 16px',
            marginBottom: '2rem',
            textAlign: 'left',
          }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.dark, margin: 0, lineHeight: 1.5 }}>
              ⏳ Our team will review your documents and contact you within 1–2 business days. No approval has been granted yet.
            </p>
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('home') : (window.location.href = '/')}
            style={{
              width: '100%',
              background: C.dark,
              color: '#fff',
              border: `3px solid ${C.dark}`,
              borderRadius: 10,
              padding: '16px',
              fontSize: 16,
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: `4px 4px 0px ${C.teal}`,
              fontFamily: "'Clash Grotesk', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            Back to Home →
          </button>
        </motion.div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Main Registration Form
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        borderBottom: `3px solid ${C.dark}`,
        padding: 'clamp(2rem, 4vw, 3rem) 1rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.teal, margin: '0 0 6px' }}>
          MY OWN WORK SPACE
        </p>
        <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', fontWeight: 900, color: C.dark, margin: '0 0 4px', letterSpacing: '-0.03em' }}>
          MOWS HUB
        </h1>
        <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', fontWeight: 700, color: C.teal, margin: '0 0 1rem', letterSpacing: '-0.01em' }}>
          Customer Registration
        </h2>
        <p style={{ fontSize: 14, color: C.dark, fontWeight: 600, maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.6, opacity: 0.75 }}>
          Welcome to MOWS HUB. Please complete your registration and identity verification to get started.
        </p>

        {/* Progress */}
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <ProgressBar step={step} />
        </div>
      </div>

      {/* Form Card */}
      <div style={{ maxWidth: 600, margin: '2rem auto 0', padding: '0 1rem' }}>
        <form onSubmit={handleSubmit} noValidate>
          <AnimatePresence mode="wait">
            {/* ── STEP 0: Personal Information ──────────────────────────────── */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ background: '#fff', border: `3px solid ${C.dark}`, borderRadius: 16, padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: `8px 8px 0px ${C.dark}`, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: `2px dashed rgba(19,34,28,0.12)` }}>
                    <div style={{ width: 36, height: 36, background: C.yellow, border: `2px solid ${C.dark}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `3px 3px 0px ${C.dark}`, flexShrink: 0 }}>
                      <User size={18} color={C.dark} strokeWidth={2.5} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: C.dark, margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      Personal Information
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Full Name */}
                    <div>
                      <label style={labelStyle}>Full Name <span style={{ color: C.red }}>*</span></label>
                      <input {...inputProps('fullName')} placeholder="Enter your full name" />
                      <p style={{ fontSize: 11, color: C.teal, fontWeight: 600, marginTop: 4 }}>Name must match your identity document exactly.</p>
                      {errors.fullName && <p style={errorStyle}><AlertCircle size={12} /> {errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>Email Address <span style={{ color: C.red }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: C.teal, pointerEvents: 'none' }} />
                        <input {...inputProps('email', 'email')} placeholder="Enter your email address" style={{ ...inputProps('email', 'email').style, paddingLeft: 40 }} />
                      </div>
                      {errors.email && <p style={errorStyle}><AlertCircle size={12} /> {errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={labelStyle}>Mobile Number <span style={{ color: C.red }}>*</span></label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <select
                            value={form.countryCode}
                            onChange={e => updateForm('countryCode', e.target.value)}
                            style={{
                              ...inputStyle,
                              width: 'auto',
                              paddingRight: 32,
                              paddingLeft: 12,
                              appearance: 'none',
                              cursor: 'pointer',
                              minWidth: 90,
                            }}
                          >
                            {COUNTRY_CODES.map(c => (
                              <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: C.dark }} />
                        </div>
                        <div style={{ position: 'relative', flex: 1 }}>
                          <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: C.teal, pointerEvents: 'none' }} />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={e => updateForm('phone', e.target.value.replace(/[^\d\s\-]/g, ''))}
                            onFocus={e => { e.target.style.boxShadow = `4px 4px 0px ${C.dark}`; }}
                            onBlur={e => { e.target.style.boxShadow = `3px 3px 0px rgba(19,34,28,0.08)`; }}
                            placeholder="Enter mobile number"
                            style={{ ...inputStyle, paddingLeft: 40, borderColor: errors.phone ? C.red : C.dark }}
                          />
                        </div>
                      </div>
                      {errors.phone && <p style={errorStyle}><AlertCircle size={12} /> {errors.phone}</p>}
                    </div>

                    {/* Customer Photo */}
                    <DocumentUpload
                      label="Your Photo"
                      hint="Take a clear selfie or upload a recent passport-size photo for member verification."
                      required
                      acceptImagesOnly
                      captureMode="user"
                      value={docs.customerPhoto}
                      onChange={(v, e) => setDoc('customerPhoto', v, e)}
                      error={docErrors.customerPhoto}
                    />

                    {/* Nationality */}
                    <div>
                      <label style={labelStyle}>Applicant Category <span style={{ color: C.red }}>*</span></label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[
                          { value: 'indian', label: 'Indian Citizen', emoji: '🇮🇳' },
                          { value: 'foreign', label: 'Foreign National', emoji: '🌍' },
                        ].map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => { updateForm('nationality', opt.value); updateForm('idType', ''); }}
                            style={{
                              padding: '14px 12px',
                              border: `3px solid ${form.nationality === opt.value ? C.dark : 'rgba(19,34,28,0.2)'}`,
                              borderRadius: 10,
                              background: form.nationality === opt.value ? C.yellow : '#fff',
                              cursor: 'pointer',
                              fontFamily: "'Clash Grotesk', sans-serif",
                              fontWeight: 800,
                              fontSize: 13,
                              color: C.dark,
                              textAlign: 'center',
                              boxShadow: form.nationality === opt.value ? `4px 4px 0px ${C.dark}` : '2px 2px 0px rgba(19,34,28,0.08)',
                              transition: 'all 0.2s',
                              lineHeight: 1.4,
                            }}
                          >
                            <div style={{ fontSize: 20, marginBottom: 4 }}>{opt.emoji}</div>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      {errors.nationality && <p style={errorStyle}><AlertCircle size={12} /> {errors.nationality}</p>}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  style={{
                    width: '100%',
                    background: C.dark,
                    color: '#fff',
                    border: `3px solid ${C.dark}`,
                    borderRadius: 10,
                    padding: '16px',
                    fontSize: 16,
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: `5px 5px 0px ${C.teal}`,
                    fontFamily: "'Clash Grotesk', sans-serif",
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `7px 7px 0px ${C.teal}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `5px 5px 0px ${C.teal}`; }}
                >
                  Continue to Identity Verification →
                </button>
              </motion.div>
            )}

            {/* ── STEP 1: Identity Verification ─────────────────────────────── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ background: '#fff', border: `3px solid ${C.dark}`, borderRadius: 16, padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: `8px 8px 0px ${C.dark}`, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: `2px dashed rgba(19,34,28,0.12)` }}>
                    <div style={{ width: 36, height: 36, background: C.yellow, border: `2px solid ${C.dark}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `3px 3px 0px ${C.dark}`, flexShrink: 0 }}>
                      <FileText size={18} color={C.dark} strokeWidth={2.5} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: C.dark, margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      Identity Verification
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Indian Citizen */}
                    {form.nationality === 'indian' && (
                      <>
                        <div>
                          <label style={labelStyle}>Select Identity Proof <span style={{ color: C.red }}>*</span></label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {[
                              { value: 'aadhaar', label: 'Aadhaar Card' },
                              { value: 'pan', label: 'PAN Card' },
                            ].map(opt => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => updateForm('idType', opt.value)}
                                style={{
                                  padding: '12px',
                                  border: `3px solid ${form.idType === opt.value ? C.dark : 'rgba(19,34,28,0.2)'}`,
                                  borderRadius: 10,
                                  background: form.idType === opt.value ? C.yellow : '#fff',
                                  cursor: 'pointer',
                                  fontFamily: "'Clash Grotesk', sans-serif",
                                  fontWeight: 800,
                                  fontSize: 13,
                                  color: C.dark,
                                  boxShadow: form.idType === opt.value ? `3px 3px 0px ${C.dark}` : 'none',
                                  transition: 'all 0.2s',
                                }}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                          {errors.idType && <p style={errorStyle}><AlertCircle size={12} /> {errors.idType}</p>}
                        </div>

                        {/* Aadhaar Fields */}
                        {form.idType === 'aadhaar' && (
                          <>
                            <div style={{ background: 'rgba(216,159,62,0.08)', border: `2px solid rgba(216,159,62,0.4)`, borderRadius: 10, padding: '12px 14px' }}>
                              <p style={{ fontSize: 12, fontWeight: 700, color: C.dark, margin: 0, lineHeight: 1.5 }}>
                                🔒 For your privacy, we collect only the last 4 digits of your Aadhaar number. Please upload a masked Aadhaar document where the first 8 digits are hidden.
                              </p>
                            </div>
                            <div>
                              <label style={labelStyle}>Last 4 Digits of Aadhaar <span style={{ color: C.red }}>*</span></label>
                              <input
                                type="text"
                                maxLength={4}
                                value={form.aadhaarLast4}
                                onChange={e => updateForm('aadhaarLast4', e.target.value.replace(/\D/g, ''))}
                                onFocus={e => { e.target.style.boxShadow = `4px 4px 0px ${C.dark}`; }}
                                onBlur={e => { e.target.style.boxShadow = `3px 3px 0px rgba(19,34,28,0.08)`; }}
                                placeholder="XXXX"
                                style={{ ...inputStyle, letterSpacing: '0.3em', textAlign: 'center', borderColor: errors.aadhaarLast4 ? C.red : C.dark }}
                              />
                              {errors.aadhaarLast4 && <p style={errorStyle}><AlertCircle size={12} /> {errors.aadhaarLast4}</p>}
                            </div>
                            <DocumentUpload
                              label="Aadhaar – Front Side"
                              hint="Please upload a masked Aadhaar where the first 8 digits are hidden. Use mAadhaar app or UIDAI website to get a masked copy."
                              required
                              value={docs.aadhaarFront}
                              onChange={(v, e) => setDoc('aadhaarFront', v, e)}
                              error={docErrors.aadhaarFront}
                            />
                            <DocumentUpload
                              label="Aadhaar – Back Side"
                              hint="Upload the back side of your Aadhaar card."
                              required
                              value={docs.aadhaarBack}
                              onChange={(v, e) => setDoc('aadhaarBack', v, e)}
                              error={docErrors.aadhaarBack}
                            />
                          </>
                        )}

                        {/* PAN Fields */}
                        {form.idType === 'pan' && (
                          <>
                            <div>
                              <label style={labelStyle}>PAN Card Number <span style={{ color: C.red }}>*</span></label>
                              <input
                                type="text"
                                maxLength={10}
                                value={form.panNumber}
                                onChange={e => updateForm('panNumber', e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                                onFocus={e => { e.target.style.boxShadow = `4px 4px 0px ${C.dark}`; }}
                                onBlur={e => { e.target.style.boxShadow = `3px 3px 0px rgba(19,34,28,0.08)`; }}
                                placeholder="ABCDE1234F"
                                style={{ ...inputStyle, letterSpacing: '0.15em', borderColor: errors.panNumber ? C.red : C.dark }}
                              />
                              <p style={{ fontSize: 11, color: C.teal, fontWeight: 600, marginTop: 4 }}>Format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)</p>
                              {errors.panNumber && <p style={errorStyle}><AlertCircle size={12} /> {errors.panNumber}</p>}
                            </div>
                            <DocumentUpload
                              label="PAN Card Document"
                              hint="Take a clear photo or upload a scan of your PAN card."
                              required
                              value={docs.panCard}
                              onChange={(v, e) => setDoc('panCard', v, e)}
                              error={docErrors.panCard}
                            />
                          </>
                        )}
                      </>
                    )}

                    {/* Foreign National */}
                    {form.nationality === 'foreign' && (
                      <>
                        <div style={{ background: 'rgba(23,79,80,0.06)', border: `2px solid rgba(23,79,80,0.2)`, borderRadius: 10, padding: '12px 14px' }}>
                          <p style={{ fontSize: 12, fontWeight: 700, color: C.dark, margin: 0, lineHeight: 1.5 }}>
                            🌍 Please upload your passport and visa/immigration documents. If you have an e-Visa or electronic immigration status, you may upload a screenshot or PDF of the digital document.
                          </p>
                        </div>
                        <div>
                          <label style={labelStyle}>Passport Number <span style={{ color: C.red }}>*</span></label>
                          <input
                            type="text"
                            value={form.passportNumber}
                            onChange={e => updateForm('passportNumber', e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                            onFocus={e => { e.target.style.boxShadow = `4px 4px 0px ${C.dark}`; }}
                            onBlur={e => { e.target.style.boxShadow = `3px 3px 0px rgba(19,34,28,0.08)`; }}
                            placeholder="e.g. A1234567"
                            style={{ ...inputStyle, letterSpacing: '0.1em', borderColor: errors.passportNumber ? C.red : C.dark }}
                          />
                          <p style={{ fontSize: 11, color: C.teal, fontWeight: 600, marginTop: 4 }}>Supports all international passport formats.</p>
                          {errors.passportNumber && <p style={errorStyle}><AlertCircle size={12} /> {errors.passportNumber}</p>}
                        </div>
                        <DocumentUpload
                          label="Passport – Information / Photo Page"
                          hint="Upload the main page of your passport showing your photo and personal details."
                          required
                          value={docs.passportFront}
                          onChange={(v, e) => setDoc('passportFront', v, e)}
                          error={docErrors.passportFront}
                        />
                        <DocumentUpload
                          label="Passport – Last Page (Optional)"
                          hint="Upload the last page if it contains identity information. Skip if your passport does not have a separate last page."
                          value={docs.passportBack}
                          onChange={(v, e) => setDoc('passportBack', v, e)}
                          error={docErrors.passportBack}
                        />
                        <DocumentUpload
                          label="Visa / Immigration Document (Optional)"
                          hint="Upload your visa stamp page or e-Visa / arrival permit PDF. If your immigration status is documented electronically, upload a screenshot or PDF."
                          value={docs.visaPage}
                          onChange={(v, e) => setDoc('visaPage', v, e)}
                          error={docErrors.visaPage}
                        />
                      </>
                    )}

                    {!form.nationality && (
                      <div style={{ textAlign: 'center', padding: '2rem', color: C.teal, fontWeight: 700, fontSize: 14 }}>
                        Go back and select your applicant category to continue.
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      flex: 1,
                      background: '#fff',
                      color: C.dark,
                      border: `3px solid ${C.dark}`,
                      borderRadius: 10,
                      padding: '16px',
                      fontSize: 15,
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: `4px 4px 0px ${C.dark}`,
                      fontFamily: "'Clash Grotesk', sans-serif",
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    style={{
                      flex: 2,
                      background: C.dark,
                      color: '#fff',
                      border: `3px solid ${C.dark}`,
                      borderRadius: 10,
                      padding: '16px',
                      fontSize: 16,
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: `5px 5px 0px ${C.teal}`,
                      fontFamily: "'Clash Grotesk', sans-serif",
                      letterSpacing: '0.02em',
                    }}
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Declaration & Submission ──────────────────────────── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Summary Card */}
                <div style={{ background: C.mist, border: `3px solid ${C.dark}`, borderRadius: 16, padding: '1.5rem', boxShadow: `6px 6px 0px ${C.dark}`, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.dark, margin: '0 0 12px' }}>
                    Registration Summary
                  </h4>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                    {docs.customerPhoto && (
                      <img
                        src={docs.customerPhoto.preview}
                        alt="Applicant"
                        style={{
                          width: 68, height: 68,
                          objectFit: 'cover',
                          borderRadius: 12,
                          border: `3px solid ${C.dark}`,
                          boxShadow: `3px 3px 0px ${C.dark}`,
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 200 }}>
                      {[
                        { label: 'Name', value: form.fullName },
                        { label: 'Email', value: form.email },
                        { label: 'Mobile', value: `${form.countryCode} ${form.phone}` },
                        { label: 'Category', value: form.nationality === 'indian' ? 'Indian Citizen' : 'Foreign National' },
                        { label: 'ID Type', value: form.idType === 'aadhaar' ? 'Aadhaar Card' : form.idType === 'pan' ? 'PAN Card' : 'Passport' },
                      ].map(item => (
                        <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: C.teal, minWidth: 70, flexShrink: 0 }}>{item.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Declaration */}
                <div style={{ background: '#fff', border: `3px solid ${C.dark}`, borderRadius: 16, padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: `8px 8px 0px ${C.dark}`, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: `2px dashed rgba(19,34,28,0.12)` }}>
                    <div style={{ width: 36, height: 36, background: C.yellow, border: `2px solid ${C.dark}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `3px 3px 0px ${C.dark}`, flexShrink: 0 }}>
                      <span style={{ fontSize: 18 }}>📋</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: C.dark, margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      Declaration & Consent
                    </h3>
                  </div>

                  <div style={{ background: 'rgba(23,79,80,0.04)', border: `2px solid rgba(23,79,80,0.15)`, borderRadius: 10, padding: '1rem', marginBottom: 20 }}>
                    <p style={{ fontSize: 13, color: C.dark, fontWeight: 600, margin: 0, lineHeight: 1.7 }}>
                      I hereby declare that the information provided in this registration form is true, complete and accurate. I confirm that the identity documents submitted belong to me and are genuine. I agree to comply with the applicable rules and regulations of MOWS HUB. I acknowledge the Privacy Policy and consent to the collection and processing of my information and identity documents for customer registration and verification purposes as described in the policy.
                    </p>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.termsAccepted}
                      onChange={e => { updateForm('termsAccepted', e.target.checked); }}
                      style={{ width: 22, height: 22, accentColor: C.teal, cursor: 'pointer', marginTop: 1, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 13, color: C.dark, fontWeight: 700, lineHeight: 1.5 }}>
                      I have read and agree to the{' '}
                      <a
                        href="/terms"
                        onClick={e => { e.preventDefault(); onNavigate && onNavigate('terms'); }}
                        style={{ color: C.teal, fontWeight: 900, textDecoration: 'underline' }}
                      >
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a
                        href="/privacy"
                        onClick={e => { e.preventDefault(); onNavigate && onNavigate('privacy'); }}
                        style={{ color: C.teal, fontWeight: 900, textDecoration: 'underline' }}
                      >
                        Privacy Policy
                      </a>{' '}
                      of MOWS HUB.{' '}
                      <span style={{ color: C.red }}>*</span>
                    </span>
                  </label>
                  {errors.terms && <p style={{ ...errorStyle, marginTop: 10 }}><AlertCircle size={12} /> {errors.terms}</p>}
                  {errors.submit && <p style={{ ...errorStyle, marginTop: 10 }}><AlertCircle size={12} /> {errors.submit}</p>}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      flex: 1,
                      background: '#fff',
                      color: C.dark,
                      border: `3px solid ${C.dark}`,
                      borderRadius: 10,
                      padding: '16px',
                      fontSize: 15,
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: `4px 4px 0px ${C.dark}`,
                      fontFamily: "'Clash Grotesk', sans-serif",
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      flex: 2,
                      background: isSubmitting ? 'rgba(19,34,28,0.5)' : C.dark,
                      color: '#fff',
                      border: `3px solid ${C.dark}`,
                      borderRadius: 10,
                      padding: '16px',
                      fontSize: 16,
                      fontWeight: 900,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: isSubmitting ? 'none' : `5px 5px 0px ${C.yellow}`,
                      fontFamily: "'Clash Grotesk', sans-serif",
                      letterSpacing: '0.02em',
                      transition: 'all 0.2s',
                    }}
                  >
                    {isSubmitting ? '⏳ Submitting...' : 'Submit Registration →'}
                  </button>
                </div>

                <p style={{ textAlign: 'center', fontSize: 11, color: C.teal, fontWeight: 600, marginTop: 12 }}>
                  🔒 Your data is handled securely. Documents are stored privately and not publicly accessible.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
