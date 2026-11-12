import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, ChevronDown, X, FileText, Download, Shield } from 'lucide-react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function resolveApiUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const C = {
  dark: '#13221C',
  teal: '#174F50',
  yellow: '#fde047',
  bg: '#fcfaf5',
  mist: '#E8F4F4',
  red: '#dc2626',
  green: '#16a34a',
  orange: '#ea580c',
};

const STATUS = {
  pending: { label: 'Pending Verification', color: C.orange, bg: '#fff7ed', icon: <Clock size={12} /> },
  approved: { label: 'Approved', color: C.green, bg: '#f0fdf4', icon: <CheckCircle size={12} /> },
  rejected: { label: 'Rejected', color: C.red, bg: '#fef2f2', icon: <XCircle size={12} /> },
};

// ── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: s.bg, color: s.color,
      border: `2px solid ${s.color}`,
      borderRadius: 20, padding: '4px 10px',
      fontSize: 11, fontWeight: 900,
      textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>
      {s.icon} {s.label}
    </span>
  );
}

const DOC_LABELS = {
  customerPhoto: 'Customer Photo',
  aadhaarFront: 'Aadhaar – Front',
  aadhaarBack: 'Aadhaar – Back',
  panCard: 'PAN Card',
  passportFront: 'Passport – Info Page',
  passportBack: 'Passport – Last Page',
  visaPage: 'Visa / Immigration Doc',
};

// ── Document Helper ──────────────────────────────────────────────────────────
function isImageDoc(doc) {
  if (doc.mimeType && doc.mimeType.startsWith('image/')) return true;
  const target = (doc.filename || doc.url || '').toLowerCase();
  return /\.(jpe?g|png|webp|gif)(\?|$)/.test(target);
}

function isPdfDoc(doc) {
  if (doc.mimeType === 'application/pdf') return true;
  const target = (doc.filename || doc.url || '').toLowerCase();
  return /\.pdf(\?|$)/.test(target);
}

function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Detail Modal ─────────────────────────────────────────────────────────────
function RegistrationModal({ reg, adminToken, onClose, onUpdateStatus }) {
  const [note, setNote] = useState(reg.adminNotes || '');
  const [saving, setSaving] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  const photoDoc = (reg.documents || []).find(d => d.name === 'customerPhoto');
  const photoUrl = photoDoc ? resolveApiUrl(photoDoc.url) : '';

  async function updateStatus(status) {
    setSaving(true);
    try {
      const r = await fetch(`${API_BASE}/api/admin/registrations/${reg.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({ status, adminNotes: note }),
      });
      const data = await r.json();
      if (data.success) {
        onUpdateStatus(reg.id, status, note);
        onClose();
      }
    } catch {
      onUpdateStatus(reg.id, status, note);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(19,34,28,0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: '#fff',
          border: `4px solid ${C.dark}`,
          borderRadius: 20,
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          boxShadow: `12px 12px 0px ${C.dark}`,
          maxWidth: 600, width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {photoUrl && (
              <img
                src={photoUrl}
                alt={reg.fullName}
                style={{
                  width: 56, height: 56,
                  objectFit: 'cover',
                  borderRadius: 12,
                  border: `3px solid ${C.dark}`,
                  boxShadow: `3px 3px 0px ${C.dark}`,
                  flexShrink: 0,
                }}
              />
            )}
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: C.dark, margin: 0 }}>{reg.fullName}</h2>
              <p style={{ fontSize: 12, color: C.teal, margin: '4px 0 0', fontWeight: 700 }}>{reg.registrationId}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: `2px solid ${C.dark}`, borderRadius: 8, padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `2px 2px 0px ${C.dark}` }}>
            <X size={18} color={C.dark} />
          </button>
        </div>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Email', value: reg.email },
            { label: 'Phone', value: reg.phone },
            { label: 'Category', value: reg.nationality === 'indian' ? 'Indian Citizen' : 'Foreign National' },
            { label: 'ID Type', value: reg.idType === 'aadhaar' ? 'Aadhaar Card' : reg.idType === 'pan' ? 'PAN Card' : 'Passport' },
            { label: 'Doc Number', value: reg.docNumber || '—' },
            { label: 'Registered', value: new Date(reg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
          ].map(item => (
            <div key={item.label} style={{ background: C.mist, border: `2px solid rgba(23,79,80,0.2)`, borderRadius: 8, padding: '10px 12px' }}>
              <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.teal, margin: '0 0 3px' }}>{item.label}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, margin: 0, wordBreak: 'break-all' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Current Status */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.dark, marginBottom: 8 }}>Current Status</p>
          <StatusBadge status={reg.status} />
        </div>

        {/* Documents */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.dark, marginBottom: 10 }}>
            Documents & Photo Submitted ({(reg.documents || []).length})
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(reg.documents || []).length === 0 ? (
              <p style={{ fontSize: 13, color: C.teal, fontWeight: 600 }}>No documents attached to this record.</p>
            ) : reg.documents.map((doc, i) => {
              const isImg = isImageDoc(doc);
              const isPdf = isPdfDoc(doc);
              const docUrl = resolveApiUrl(doc.url);
              return (
                <div key={i} style={{ background: 'rgba(23,79,80,0.04)', border: `2px solid ${C.dark}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', flexWrap: 'wrap' }}>
                    <FileText size={16} color={C.teal} />
                    <div style={{ flex: 1, minWidth: 140 }}>
                      <p style={{ fontSize: 13, fontWeight: 800, color: C.dark, margin: 0 }}>{DOC_LABELS[doc.name] || doc.name}</p>
                      {(doc.filename || doc.fileSize) && (
                        <p style={{ fontSize: 11, color: C.teal, fontWeight: 600, margin: '2px 0 0' }}>
                          {doc.filename}{doc.fileSize ? ` · ${formatFileSize(doc.fileSize)}` : ''}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {(isImg || isPdf) && (
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(previewDoc?.name === doc.name ? null : doc)}
                          style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.yellow, color: C.dark, border: `2px solid ${C.dark}`, borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
                        >
                          <Eye size={12} /> {previewDoc?.name === doc.name ? 'Hide' : 'Preview'}
                        </button>
                      )}
                      <a
                        href={docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.dark, color: '#fff', border: `2px solid ${C.dark}`, borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 800, cursor: 'pointer', textDecoration: 'none' }}
                      >
                        <Eye size={12} /> Open
                      </a>
                      <a
                        href={docUrl}
                        download={doc.filename || doc.name}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#fff', color: C.dark, border: `2px solid ${C.dark}`, borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 800, cursor: 'pointer', textDecoration: 'none' }}
                      >
                        <Download size={12} /> Save
                      </a>
                    </div>
                  </div>
                  {/* Inline image thumbnail */}
                  {isImg && docUrl && (
                    <div
                      onClick={() => setPreviewDoc(doc)}
                      style={{ background: '#f1f5f9', borderTop: `2px solid rgba(19,34,28,0.12)`, padding: 8, cursor: 'zoom-in', textAlign: 'center' }}
                    >
                      <img
                        src={docUrl}
                        alt={DOC_LABELS[doc.name] || doc.name}
                        style={{ maxWidth: '100%', maxHeight: previewDoc?.name === doc.name ? 420 : 180, objectFit: 'contain', borderRadius: 6, display: 'inline-block' }}
                      />
                    </div>
                  )}
                  {/* Expandable inline PDF preview */}
                  {isPdf && previewDoc?.name === doc.name && docUrl && (
                    <div style={{ borderTop: `2px solid rgba(19,34,28,0.12)`, background: '#fff' }}>
                      <iframe
                        src={docUrl}
                        title={DOC_LABELS[doc.name] || doc.name}
                        style={{ width: '100%', height: 360, border: 'none', display: 'block' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Admin Notes */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.dark, display: 'block', marginBottom: 8 }}>
            Verification Notes (Internal)
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            placeholder="Add internal verification notes..."
            style={{
              width: '100%', background: '#fff', border: `3px solid ${C.dark}`,
              borderRadius: 8, padding: '12px', fontSize: 13, color: C.dark,
              fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 600,
              resize: 'vertical', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <button
            onClick={() => updateStatus('pending')}
            disabled={saving}
            style={{
              background: '#fff', color: C.orange, border: `3px solid ${C.orange}`,
              borderRadius: 10, padding: '12px', fontSize: 12, fontWeight: 900,
              cursor: 'pointer', fontFamily: "'Clash Grotesk', sans-serif",
              boxShadow: `3px 3px 0px ${C.orange}`, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = `5px 5px 0px ${C.orange}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `3px 3px 0px ${C.orange}`; }}
          >
            <Clock size={14} style={{ marginRight: 4 }} /> Pending
          </button>
          <button
            onClick={() => updateStatus('rejected')}
            disabled={saving}
            style={{
              background: '#fff', color: C.red, border: `3px solid ${C.red}`,
              borderRadius: 10, padding: '12px', fontSize: 12, fontWeight: 900,
              cursor: 'pointer', fontFamily: "'Clash Grotesk', sans-serif",
              boxShadow: `3px 3px 0px ${C.red}`, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = `5px 5px 0px ${C.red}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `3px 3px 0px ${C.red}`; }}
          >
            <XCircle size={14} style={{ marginRight: 4 }} /> Reject
          </button>
          <button
            onClick={() => updateStatus('approved')}
            disabled={saving}
            style={{
              background: C.green, color: '#fff', border: `3px solid ${C.green}`,
              borderRadius: 10, padding: '12px', fontSize: 12, fontWeight: 900,
              cursor: 'pointer', fontFamily: "'Clash Grotesk', sans-serif",
              boxShadow: `3px 3px 0px ${C.dark}`, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = `5px 5px 0px ${C.dark}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `3px 3px 0px ${C.dark}`; }}
          >
            <CheckCircle size={14} style={{ marginRight: 4 }} /> Approve
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminRegistrationsPage({ onNavigate }) {
  const [authed, setAuthed] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [authError, setAuthError] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterNationality, setFilterNationality] = useState('all');
  const [filterIdType, setFilterIdType] = useState('all');
  const [selectedReg, setSelectedReg] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!adminPass.trim()) {
      setAuthError('Please enter admin password.');
      return;
    }
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/admin/registrations`, {
        headers: { 'x-admin-token': adminPass },
      });
      const contentType = r.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) throw new Error('Offline');
      if (r.status === 401) {
        setAuthError('Incorrect admin password.');
        setLoading(false);
        return;
      }
      const data = await r.json();
      if (data.registrations) {
        setRegistrations(data.registrations);
        setIsDemoMode(false);
        setAuthed(true);
        setAuthError('');
      } else {
        setAuthError(data.message || 'Authentication failed.');
      }
    } catch {
      // Fallback when backend is offline
      if (adminPass === 'mowsadmin2026') {
        setRegistrations(DEMO_DATA);
        setIsDemoMode(true);
        setAuthed(true);
        setAuthError('');
      } else {
        setAuthError('Incorrect admin password.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadRegistrations(token = adminPass) {
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/admin/registrations`, {
        headers: { 'x-admin-token': token },
      });
      const contentType = r.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) throw new Error('Offline');
      const data = await r.json();
      if (data.registrations) {
        setRegistrations(data.registrations);
        setIsDemoMode(false);
      } else {
        setRegistrations(DEMO_DATA);
        setIsDemoMode(true);
      }
    } catch {
      setRegistrations(DEMO_DATA);
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  }

  function updateLocalStatus(id, status, notes) {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status, adminNotes: notes } : r));
  }

  // Filter logic
  const filtered = registrations.filter(r => {
    const q = search.toLowerCase();
    const matchesSearch = !q || r.fullName.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.phone.includes(q) || r.registrationId.toLowerCase().includes(q);
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesNat = filterNationality === 'all' || r.nationality === filterNationality;
    const matchesId = filterIdType === 'all' || r.idType === filterIdType;
    return matchesSearch && matchesStatus && matchesNat && matchesId;
  });

  const counts = {
    all: registrations.length,
    pending: registrations.filter(r => r.status === 'pending').length,
    approved: registrations.filter(r => r.status === 'approved').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  };

  // ── Login Screen ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#fff',
            border: `4px solid ${C.dark}`,
            borderRadius: 20,
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            boxShadow: `12px 12px 0px ${C.dark}`,
            maxWidth: 420, width: '100%',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 60, height: 60, background: C.yellow, border: `3px solid ${C.dark}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: `4px 4px 0px ${C.dark}` }}>
              <Shield size={28} color={C.dark} strokeWidth={2.5} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: C.dark, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Admin Access</h1>
            <p style={{ fontSize: 13, color: C.teal, fontWeight: 600, margin: 0 }}>MOWS HUB Registration Management</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.dark, display: 'block', marginBottom: 8 }}>Admin Password</label>
              <input
                type="password"
                value={adminPass}
                onChange={e => setAdminPass(e.target.value)}
                placeholder="Enter admin password"
                style={{
                  width: '100%', background: '#fff', border: `3px solid ${authError ? C.red : C.dark}`,
                  borderRadius: 10, padding: '14px 16px', fontSize: 15, color: C.dark,
                  outline: 'none', boxSizing: 'border-box', fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 600,
                }}
              />
              {authError && <p style={{ color: C.red, fontSize: 12, fontWeight: 700, margin: '6px 0 0' }}>{authError}</p>}
            </div>
            <button
              type="submit"
              style={{
                background: C.dark, color: '#fff', border: `3px solid ${C.dark}`,
                borderRadius: 10, padding: '15px', fontSize: 15, fontWeight: 900,
                cursor: 'pointer', fontFamily: "'Clash Grotesk', sans-serif",
                boxShadow: `5px 5px 0px ${C.teal}`,
              }}
            >
              Sign In →
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(19,34,28,0.4)', marginTop: 16, fontWeight: 600 }}>
            🔒 Admin access only. All activity is logged.
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {/* Top bar */}
      <div style={{ background: C.dark, borderBottom: `3px solid ${C.dark}`, padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>MOWS HUB – Registration Management</h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '2px 0 0', fontWeight: 600 }}>Admin Portal · Secure Access</p>
        </div>
        <button
          onClick={() => { setAuthed(false); setAdminPass(''); }}
          style={{ background: 'none', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: "'Clash Grotesk', sans-serif" }}
        >
          Sign Out
        </button>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem)' }}>
        {isDemoMode && (
          <div style={{ background: '#fff7ed', border: `2px solid ${C.orange}`, borderRadius: 10, padding: '10px 14px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.orange }}>
              Demo Mode: Backend server unreachable — showing sample records without uploaded files.
            </span>
            <button
              type="button"
              onClick={() => loadRegistrations()}
              style={{ background: C.orange, color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
            >
              Retry Connection
            </button>
          </div>
        )}
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Total', count: counts.all, color: C.dark, bg: C.yellow },
            { label: 'Pending', count: counts.pending, color: C.orange, bg: '#fff7ed' },
            { label: 'Approved', count: counts.approved, color: C.green, bg: '#f0fdf4' },
            { label: 'Rejected', count: counts.rejected, color: C.red, bg: '#fef2f2' },
          ].map(stat => (
            <div key={stat.label} style={{ background: stat.bg, border: `3px solid ${C.dark}`, borderRadius: 12, padding: '1rem', boxShadow: `4px 4px 0px ${C.dark}` }}>
              <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: stat.color, margin: '0 0 4px' }}>{stat.label}</p>
              <p style={{ fontSize: 28, fontWeight: 900, color: C.dark, margin: 0 }}>{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.teal, pointerEvents: 'none' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, ID..."
              style={{
                width: '100%', paddingLeft: 38, padding: '12px 14px 12px 38px',
                border: `3px solid ${C.dark}`, borderRadius: 10,
                background: '#fff', fontSize: 13, color: C.dark,
                fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 600,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {[
            { key: 'filterStatus', state: filterStatus, setter: setFilterStatus, label: 'Status', options: [['all','All Status'],['pending','Pending'],['approved','Approved'],['rejected','Rejected']] },
            { key: 'filterNat', state: filterNationality, setter: setFilterNationality, label: 'Category', options: [['all','All'],['indian','Indian'],['foreign','Foreign']] },
            { key: 'filterId', state: filterIdType, setter: setFilterIdType, label: 'ID Type', options: [['all','All ID Types'],['aadhaar','Aadhaar'],['pan','PAN'],['passport','Passport']] },
          ].map(f => (
            <div key={f.key} style={{ position: 'relative', flexShrink: 0 }}>
              <select
                value={f.state}
                onChange={e => f.setter(e.target.value)}
                style={{
                  paddingRight: 32, padding: '12px 32px 12px 14px',
                  border: `3px solid ${C.dark}`, borderRadius: 10,
                  background: '#fff', fontSize: 13, color: C.dark,
                  fontFamily: "'Clash Grotesk', sans-serif", fontWeight: 700,
                  outline: 'none', cursor: 'pointer', appearance: 'none',
                }}
              >
                {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: C.dark }} />
            </div>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: C.teal, fontWeight: 700, fontSize: 15 }}>Loading registrations...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', border: `3px solid ${C.dark}`, borderRadius: 16, boxShadow: `6px 6px 0px ${C.dark}` }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: C.dark, margin: '0 0 8px' }}>No registrations found</p>
            <p style={{ fontSize: 13, color: C.teal, fontWeight: 600, margin: 0 }}>Adjust filters or search terms.</p>
          </div>
        ) : (
          <div style={{ background: '#fff', border: `3px solid ${C.dark}`, borderRadius: 16, boxShadow: `8px 8px 0px ${C.dark}`, overflow: 'hidden' }}>
            {/* Mobile-friendly card list (hidden on desktop) */}
            <div className="reg-cards" style={{ display: 'none' }}>
              {filtered.map(reg => (
                <div key={reg.id} style={{ padding: '1rem 1rem', borderBottom: `2px solid rgba(19,34,28,0.1)` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 900, color: C.dark, margin: 0 }}>{reg.fullName}</p>
                      <p style={{ fontSize: 11, color: C.teal, fontWeight: 700, margin: '2px 0' }}>{reg.registrationId}</p>
                    </div>
                    <StatusBadge status={reg.status} />
                  </div>
                  <p style={{ fontSize: 12, color: C.dark, fontWeight: 600, margin: '0 0 10px', opacity: 0.7 }}>{reg.email} · {reg.phone} · {(reg.documents || []).length} doc(s)</p>
                  <button
                    onClick={() => setSelectedReg(reg)}
                    style={{ background: C.dark, color: '#fff', border: `2px solid ${C.dark}`, borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: "'Clash Grotesk', sans-serif" }}
                  >
                    <Eye size={12} style={{ marginRight: 4 }} /> View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="reg-table" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: C.dark }}>
                    {['Reg ID', 'Name', 'Email', 'Phone', 'Category', 'ID Type', 'Docs', 'Date', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((reg, i) => (
                    <tr key={reg.id} style={{ background: i % 2 === 0 ? '#fff' : 'rgba(232,244,244,0.3)', borderBottom: `1px solid rgba(19,34,28,0.08)`, transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(253,224,71,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : 'rgba(232,244,244,0.3)'}
                    >
                      <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 900, color: C.teal, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{reg.registrationId}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 800, color: C.dark, whiteSpace: 'nowrap' }}>{reg.fullName}</td>
                      <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: C.dark, maxWidth: 200 }}>{reg.email}</td>
                      <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: C.dark, whiteSpace: 'nowrap' }}>{reg.phone}</td>
                      <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: C.dark, whiteSpace: 'nowrap' }}>{reg.nationality === 'indian' ? '🇮🇳 Indian' : '🌍 Foreign'}</td>
                      <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: C.dark, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{reg.idType}</td>
                      <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 800, color: C.teal, whiteSpace: 'nowrap' }}>{(reg.documents || []).length} file(s)</td>
                      <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: C.dark, whiteSpace: 'nowrap' }}>{new Date(reg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}</td>
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}><StatusBadge status={reg.status} /></td>
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          onClick={() => setSelectedReg(reg)}
                          style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.dark, color: '#fff', border: `2px solid ${C.dark}`, borderRadius: 8, padding: '7px 12px', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: "'Clash Grotesk', sans-serif", whiteSpace: 'nowrap' }}
                        >
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(19,34,28,0.4)', fontWeight: 600, marginTop: 16 }}>
          Showing {filtered.length} of {registrations.length} registrations · All admin actions are logged for audit purposes.
        </p>
      </div>

      {selectedReg && (
        <RegistrationModal
          reg={selectedReg}
          adminToken={adminPass}
          onClose={() => setSelectedReg(null)}
          onUpdateStatus={updateLocalStatus}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .reg-cards { display: block !important; }
          .reg-table { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── Demo data (shown when backend is not connected) ──────────────────────────
const DEMO_DATA = [
  {
    id: '1', registrationId: 'MOWS-2026-0001', fullName: 'Mohammed Irshad', email: 'irshad@example.com',
    phone: '+91 98765 43210', nationality: 'indian', idType: 'aadhaar', docNumber: '****1234',
    status: 'pending', adminNotes: '', createdAt: '2026-11-10T09:30:00Z', documents: [],
  },
  {
    id: '2', registrationId: 'MOWS-2026-0002', fullName: 'Fatima Al-Rashid', email: 'fatima@example.com',
    phone: '+971 55 123 4567', nationality: 'foreign', idType: 'passport', docNumber: 'A1234567',
    status: 'approved', adminNotes: 'Documents verified. Passport and visa valid.', createdAt: '2026-11-11T14:15:00Z', documents: [],
  },
  {
    id: '3', registrationId: 'MOWS-2026-0003', fullName: 'Rahul Menon', email: 'rahul@example.com',
    phone: '+91 99887 76655', nationality: 'indian', idType: 'pan', docNumber: 'ABCDE1234F',
    status: 'pending', adminNotes: '', createdAt: '2026-11-12T08:00:00Z', documents: [],
  },
  {
    id: '4', registrationId: 'MOWS-2026-0004', fullName: 'Sarah Johnson', email: 'sarah@example.com',
    phone: '+1 555 987 6543', nationality: 'foreign', idType: 'passport', docNumber: 'US987654',
    status: 'rejected', adminNotes: 'Visa document unclear. Please resubmit.', createdAt: '2026-11-09T16:45:00Z', documents: [],
  },
];
