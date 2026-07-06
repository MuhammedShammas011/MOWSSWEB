import React from 'react';

const textDark = 'var(--color-mist-teal)';
const textLight = 'rgba(232, 244, 244, 0.6)';
const border = 'rgba(255, 255, 255, 0.05)';

const links = {
  SPACES: ['Hot Desk', 'Dedicated Desk', 'Private Cabin', 'Meeting Rooms'],
  COMPANY: ['About us', 'Careers', 'Community', 'Contact'],
};

const linkMap = {
  'Hot Desk': 'spaces', 'Dedicated Desk': 'spaces', 'Private Cabin': 'spaces', 'Meeting Rooms': 'spaces',
  'Community': 'community', 'Contact': 'contact'
};

const socials = [
  { n: 'Facebook', u: 'https://www.facebook.com/mowshub', i: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg> },
  { n: 'Instagram', u: 'https://www.instagram.com/mowshub/', i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
  { n: 'LinkedIn', u: 'https://www.linkedin.com/company/mowshub', i: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
];

export default function Footer({ onNavigate }) {
  function handleNav(label) {
    const route = linkMap[label];
    if (route) {
      onNavigate(route);
    }
  }

  return (
    <footer style={{ 
      backgroundColor: '#fcfaf5', 
      backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      color: '#13221C', 
      position: 'relative', 
      overflow: 'hidden', 
      fontFamily: "'Clash Grotesk', sans-serif", 
      borderTop: '6px solid #13221C' 
    }}>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: '6rem 4rem 2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4rem', marginBottom: '6rem' }}>

          {/* Left Column - Branding */}
          <div style={{ flex: '1 1 400px', maxWidth: 500 }}>
            <p style={{ fontSize: 18, color: '#13221C', lineHeight: 1.1, marginBottom: '2rem', fontWeight: 600 }}>
              PP TOWER, Bapputty bypass,<br />Thurakkal, Manjeri, Kerala 676121
            </p>

            <div style={{ display: 'inline-block', background: '#fff', color: '#13221C', padding: '12px 24px', border: '2px solid #13221C', borderRadius: 8, boxShadow: '4px 4px 0 #13221C', marginBottom: '3rem' }}>
              <p style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>info@mows.in</p>
              <p style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>+91  9778  2  7121</p>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a key={s.n} href={s.u} target="_blank" rel="noreferrer" title={s.n}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 48, height: 48, background: '#13221C', color: '#fff',
                    fontSize: 24, textDecoration: 'none', border: '2px solid #13221C',
                    borderRadius: 12, transition: 'transform 0.15s, box-shadow 0.15s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    e.currentTarget.style.boxShadow = '4px 4px 0 #174F50';
                    e.currentTarget.style.background = '#174F50';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = '#13221C';
                  }}>
                  {s.i}
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns - Links */}
          <div style={{ display: 'flex', gap: '6rem', flexWrap: 'wrap' }}>
            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <p style={{ fontSize: 14, fontWeight: 900, marginBottom: 24, color: '#174F50', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {items.map(item => (
                    <li key={item}>
                      <button onClick={() => handleNav(item)}
                        style={{
                          background: 'none', border: 'none', padding: '4px 8px', marginLeft: '-8px',
                          fontSize: 16, color: '#13221C', cursor: linkMap[item] ? 'pointer' : 'default',
                          transition: 'all 0.15s', textAlign: 'left', fontWeight: 700, borderRadius: 4
                        }}
                        onMouseEnter={e => {
                          if (linkMap[item]) {
                            e.currentTarget.style.background = '#fde047';
                            e.currentTarget.style.color = '#13221C';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (linkMap[item]) {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.color = '#13221C';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }
                        }}>
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Massive Bottom Text */}
      <div style={{ width: '100%', overflow: 'visible', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: '-4rem', paddingBottom: '3rem' }}>
        <h1 style={{
          fontSize: '28vw',
          fontWeight: 900,
          margin: 0,
          lineHeight: 0.75,
          color: '#174F50',
          WebkitTextStroke: 'clamp(2px, 0.5vw, 6px) #13221C',
          textShadow: 'clamp(4px, 1vw, 12px) clamp(4px, 1vw, 12px) 0px #13221C',
          letterSpacing: '-0.04em',
          position: 'relative'
        }}>
          MOWS

          <span style={{
            position: 'absolute',
            top: '4%',
            right: '1%',
            fontSize: 'clamp(0.7rem, 1vw, 1.2rem)',
            fontWeight: 800,
            color: '#13221C',
            backgroundColor: '#fde047',
            padding: '6px 16px',
            border: '2px solid #13221C',
            boxShadow: '3px 3px 0px #13221C',
            transform: 'rotate(-12deg)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            WebkitTextStroke: '0px',
            textShadow: 'none',
            lineHeight: 1,
            zIndex: 10
          }}>
            Beyond Workspace!
          </span>
        </h1>
      </div>
    </footer>
  );
}


