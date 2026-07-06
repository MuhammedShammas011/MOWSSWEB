export default function Footer({ onNavigate }) {
  const cols = [
    { title: 'Spaces', links: ['Hot Desk', 'Dedicated Desk', 'Private Cabin', 'Team Suite'] },
    { title: 'Locations', links: ['Kochi Central', 'Infopark', 'Thrissur Hub', 'Kozhikode Bay'] },
    { title: 'Company', links: ['About', 'Community', 'Blog', 'Careers'] },
    { title: 'Support', links: ['Contact', 'FAQ', 'Member Portal', 'Tour Request'] },
  ];

  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: '#C8F04A', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#0a0a0a', fontFamily: 'Georgia, serif' }}>M</span>
              </div>
              <span style={{ fontSize: 18, fontWeight: 600, color: '#fff', fontFamily: 'Georgia, serif' }}>mows</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 220, margin: '0 0 20px' }}>
              Kerala's most loved coworking network. 6 locations across Kochi, Thrissur and Kozhikode.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Instagram', 'LinkedIn', 'Twitter'].map(s => (
                <div key={s} style={{ width: 34, height: 34, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{s[0]}</span>
                </div>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>{col.title}</p>
              {col.links.map(l => (
                <p key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 10, cursor: 'pointer', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >{l}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>© 2026 Mows Coworking. All rights reserved.</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
