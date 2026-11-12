require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Database = require('better-sqlite3');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 5001;

// ── Middleware ────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// ── Rate Limiting ─────────────────────────────────────────────────────────────
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 registrations per IP per hour
  message: { success: false, message: 'Too many registration attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests.' },
});

// ── Storage Directories ───────────────────────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, 'uploads', 'kyc-documents');
const DB_PATH = path.join(__dirname, 'data', 'registrations.db');

// Ensure directories exist
[UPLOAD_DIR, path.join(__dirname, 'data')].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Database Setup (SQLite) ───────────────────────────────────────────────────
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id TEXT PRIMARY KEY,
    registration_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    nationality TEXT NOT NULL,
    id_type TEXT NOT NULL,
    doc_number TEXT,
    consent_status INTEGER DEFAULT 1,
    consent_timestamp TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    admin_notes TEXT DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS registration_documents (
    id TEXT PRIMARY KEY,
    registration_id TEXT NOT NULL,
    doc_type TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (registration_id) REFERENCES registrations(id)
  );

  CREATE TABLE IF NOT EXISTS admin_audit_log (
    id TEXT PRIMARY KEY,
    registration_id TEXT,
    admin_action TEXT NOT NULL,
    admin_ip TEXT,
    details TEXT,
    created_at TEXT NOT NULL
  );
`);

// ── Multer Configuration (private storage, no public access) ──────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const regDir = path.join(UPLOAD_DIR, req.regId || 'tmp');
    if (!fs.existsSync(regDir)) fs.mkdirSync(regDir, { recursive: true });
    cb(null, regDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
  // Also validate magic bytes server-side — basic check here
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only JPG, PNG, WEBP, PDF allowed.'), false);
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
});

const kycUpload = upload.fields([
  { name: 'customerPhoto', maxCount: 1 },
  { name: 'aadhaarFront', maxCount: 1 },
  { name: 'aadhaarBack', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'passportFront', maxCount: 1 },
  { name: 'passportBack', maxCount: 1 },
  { name: 'visaPage', maxCount: 1 },
]);

// ── Nodemailer ────────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// ── Helper: Generate Registration ID ─────────────────────────────────────────
function generateRegId() {
  const year = new Date().getFullYear();
  // Count existing registrations for this year for sequential numbering
  const count = db.prepare("SELECT COUNT(*) as cnt FROM registrations WHERE created_at LIKE ?").get(`${year}%`);
  const num = String((count?.cnt || 0) + 1).padStart(4, '0');
  return `MOWS-${year}-${num}`;
}

// ── Helper: Admin Auth ────────────────────────────────────────────────────────
function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  const validToken = process.env.ADMIN_TOKEN || 'mowsadmin2026';
  if (!token || token !== validToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  next();
}

// ── POST /api/register ────────────────────────────────────────────────────────
app.post('/api/register', registrationLimiter, (req, res, next) => {
  const id = uuidv4();
  req.regId = id;
  next();
}, kycUpload, async (req, res) => {
  try {
    const {
      fullName, email, phone, nationality, idType,
      docNumber, termsAccepted, consentTimestamp,
    } = req.body;

    // Server-side validation
    if (!fullName || !email || !phone || !nationality || !idType) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    if (!termsAccepted || termsAccepted === 'false') {
      return res.status(400).json({ success: false, message: 'Terms and conditions must be accepted.' });
    }

    // Check for duplicate email within last 24 hours (prevent spam)
    const existing = db.prepare(
      "SELECT id FROM registrations WHERE email = ? AND created_at > datetime('now', '-24 hours')"
    ).get(email);
    if (existing) {
      return res.status(429).json({ success: false, message: 'A registration with this email was recently submitted. Please wait before trying again.' });
    }

    const id = req.regId || uuidv4();
    const registrationId = generateRegId();
    const now = new Date().toISOString();

    // Insert registration
    db.prepare(`
      INSERT INTO registrations (id, registration_id, full_name, email, phone, nationality, id_type, doc_number, consent_status, consent_timestamp, status, admin_notes, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'pending', '', ?, ?)
    `).run(id, registrationId, fullName, email, phone, nationality, idType, docNumber || '', consentTimestamp || now, now, now);

    // Store document references
    const files = req.files || {};
    const docInsert = db.prepare(`
      INSERT INTO registration_documents (id, registration_id, doc_type, file_name, file_path, file_size, mime_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const [fieldName, fileArray] of Object.entries(files)) {
      const file = fileArray[0];
      docInsert.run(uuidv4(), id, fieldName, file.originalname, file.path, file.size, file.mimetype, now);
    }

    // Send notification email to admin
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"MOWS HUB Registration" <${process.env.SMTP_USER}>`,
          to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
          subject: `New KYC Registration: ${registrationId} – ${fullName}`,
          html: `
            <h2>New Customer Registration</h2>
            <p><strong>Registration ID:</strong> ${registrationId}</p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Category:</strong> ${nationality === 'indian' ? 'Indian Citizen' : 'Foreign National'}</p>
            <p><strong>ID Type:</strong> ${idType}</p>
            <p><strong>Submitted:</strong> ${now}</p>
            <p>Log in to the admin portal to review and verify this registration.</p>
          `,
        });
      } catch (mailErr) {
        console.error('Admin notification email failed:', mailErr.message);
        // Don't fail the registration for email errors
      }
    }

    res.json({ success: true, registrationId, message: 'Registration submitted successfully.' });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Internal server error. Please try again.' });
  }
});

// ── GET /api/admin/registrations ──────────────────────────────────────────────
app.get('/api/admin/registrations', adminLimiter, requireAdmin, (req, res) => {
  try {
    const { search, status, nationality, idType } = req.query;
    let query = 'SELECT * FROM registrations WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR registration_id LIKE ?)';
      const like = `%${search}%`;
      params.push(like, like, like, like);
    }
    if (status && status !== 'all') { query += ' AND status = ?'; params.push(status); }
    if (nationality && nationality !== 'all') { query += ' AND nationality = ?'; params.push(nationality); }
    if (idType && idType !== 'all') { query += ' AND id_type = ?'; params.push(idType); }

    query += ' ORDER BY created_at DESC';

    const registrations = db.prepare(query).all(...params).map(r => ({
      id: r.id,
      registrationId: r.registration_id,
      fullName: r.full_name,
      email: r.email,
      phone: r.phone,
      nationality: r.nationality,
      idType: r.id_type,
      docNumber: r.doc_number,
      status: r.status,
      adminNotes: r.admin_notes,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      documents: db.prepare('SELECT doc_type, file_name, mime_type, file_size FROM registration_documents WHERE registration_id = ?').all(r.id).map(d => ({
        name: d.doc_type,
        filename: d.file_name,
        mimeType: d.mime_type,
        fileSize: d.file_size,
        url: `/api/admin/documents/${r.id}/${d.doc_type}?token=${encodeURIComponent(req.headers['x-admin-token'] || req.query.token || '')}`,
      })),
    }));

    // Log admin access
    db.prepare('INSERT INTO admin_audit_log (id, registration_id, admin_action, admin_ip, details, created_at) VALUES (?, NULL, ?, ?, ?, ?)').run(
      uuidv4(), 'VIEW_LIST', req.ip, `Fetched ${registrations.length} registrations`, new Date().toISOString()
    );

    res.json({ success: true, registrations });
  } catch (err) {
    console.error('Admin list error:', err);
    res.status(500).json({ success: false, message: 'Error fetching registrations.' });
  }
});

// ── PATCH /api/admin/registrations/:id ───────────────────────────────────────
app.patch('/api/admin/registrations/:id', adminLimiter, requireAdmin, (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const { id } = req.params;
    const now = new Date().toISOString();

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    db.prepare('UPDATE registrations SET status = ?, admin_notes = ?, updated_at = ? WHERE id = ?').run(
      status, adminNotes || '', now, id
    );

    // Audit log
    db.prepare('INSERT INTO admin_audit_log (id, registration_id, admin_action, admin_ip, details, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(
      uuidv4(), id, `STATUS_CHANGE_${status?.toUpperCase()}`, req.ip, `Status changed to ${status}`, now
    );

    res.json({ success: true, message: 'Registration updated.' });
  } catch (err) {
    console.error('Admin update error:', err);
    res.status(500).json({ success: false, message: 'Error updating registration.' });
  }
});

// ── GET /api/admin/documents/:regId/:docType ──────────────────────────────────
// Secure document viewing - never serves via public URL
app.get('/api/admin/documents/:regId/:docType', adminLimiter, requireAdmin, (req, res) => {
  try {
    const { regId, docType } = req.params;
    const doc = db.prepare('SELECT * FROM registration_documents WHERE registration_id = ? AND doc_type = ?').get(regId, docType);

    if (!doc) return res.status(404).json({ success: false, message: 'Document not found.' });
    if (!fs.existsSync(doc.file_path)) return res.status(404).json({ success: false, message: 'File not found on disk.' });

    // Audit log
    db.prepare('INSERT INTO admin_audit_log (id, registration_id, admin_action, admin_ip, details, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(
      uuidv4(), regId, 'VIEW_DOCUMENT', req.ip, `Viewed ${docType}`, new Date().toISOString()
    );

    res.setHeader('Content-Type', doc.mime_type);
    res.setHeader('Content-Disposition', `inline; filename="${doc.file_name}"`);
    res.setHeader('Cache-Control', 'no-store');
    fs.createReadStream(doc.file_path).pipe(res);
  } catch (err) {
    console.error('Document serve error:', err);
    res.status(500).json({ success: false, message: 'Error serving document.' });
  }
});

// ── Existing: Contact & Booking endpoints ─────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, message } = req.body;
  const mailOptions = {
    from: `"Mows Website" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
    subject: `New Contact Request from ${name}`,
    html: `<h2>New Contact Request</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Company:</strong> ${company}</p><p><strong>Message:</strong> ${message}</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

app.post('/api/booking', async (req, res) => {
  const { name, email, phone, space, location, duration, startDate, message } = req.body;
  const mailOptions = {
    from: `"Mows Booking" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
    subject: `New Booking Request for ${space} at ${location}`,
    html: `<h2>New Booking Request</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Space Type:</strong> ${space}</p><p><strong>Location:</strong> ${location}</p><p><strong>Duration:</strong> ${duration}</p><p><strong>Start Date:</strong> ${startDate}</p><p><strong>Note:</strong> ${message || 'None'}</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Booking request sent successfully!' });
  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ success: false, message: 'Failed to send booking request.' });
  }
});

// ── Start Server ───────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
  console.log(`KYC documents stored in: ${UPLOAD_DIR}`);
  console.log(`Database: ${DB_PATH}`);
});
