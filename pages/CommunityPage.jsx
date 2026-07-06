const accent = '#C8F04A';
const dark = '#0a0a0a';
const border = 'rgba(255,255,255,0.08)';
const card = 'rgba(255,255,255,0.04)';

const events = [
  { date: 'May 14', title: 'Founder Fireside: Scaling in Kerala', loc: 'Kochi Central', type: 'Networking', spots: 12 },
  { date: 'May 18', title: 'Design Sprint Workshop', loc: 'Infopark', type: 'Workshop', spots: 8 },
  { date: 'May 22', title: 'AI & Automation for SMBs', loc: 'Thrissur Hub', type: 'Talk', spots: 30 },
  { date: 'May 28', title: 'Monthly Member Mixer', loc: 'Kozhikode Bay', type: 'Social', spots: 50 },
  { date: 'Jun 5', title: 'Product Demo Day', loc: 'Kochi Central', type: 'Showcase', spots: 40 },
  { date: 'Jun 12', title: 'Freelancer Fundamentals', loc: 'Kakkanad', type: 'Workshop', spots: 15 },
];

const typeColors = { Networking: '#C8F04A', Workshop: '#60b4ff', Talk: '#ff8c6b', Social: '#c084fc', Showcase: '#34d399' };

const blog = [
  { date: 'Apr 28', title: 'Why Kochi is becoming South India's startup hub', tag: 'Ecosystem', read: '4 min' },
  { date: 'Apr 15', title: 'How 3 Mows members landed their first clients from the common area', tag: 'Member stories', read: '3 min' },
  { date: 'Apr 2', title: 'Hot desk vs dedicated desk: which is right for you?', tag: 'Guide', read: '5 min' },
];

export default function CommunityPage({ onNavigate }) {
  return (
    <div style={{ background: dark, color: '#fff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem' }}>

        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: 12, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Mows community</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, margin: '0 0 1rem', fontFamily: 'Georgia, serif', letterSpacing: '-0.03em' }}>More than a desk</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 500 }}>Events, workshops, and connections that help you grow — included with every membership.</p>
        </div>

        {/* Stat strip */}
        <div style={{ display: 'flex', gap: 16, marginBottom: '3rem', flexWrap: 'wrap' }}>
          {[['1,200+', 'Active members'], ['40+', 'Events per year'], ['18', 'Community partners'], ['₹2Cr+', 'Deals made here']].map(([n, l]) => (
            <div key={l} style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.25rem 1.5rem', flex: 1, minWidth: 150 }}>
              <p style={{ fontSize: 28, fontWeight: 700, margin: 0, fontFamily: 'Georgia, serif', color: accent }}>{n}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Events */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, fontFamily: 'Georgia, serif' }}>Upcoming events</h2>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Open to all members</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {events.map(e => (
              <div key={e.title} style={{ display: 'flex', alignItems: 'center', gap: 16, background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1rem 1.25rem', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={ev => ev.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={ev => ev.currentTarget.style.borderColor = border}>
                <div style={{ width: 54, textAlign: 'center', flexShrink: 0 }}>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{e.date.split(' ')[0]}</p>
                  <p style={{ fontSize: 22, fontWeight: 700, margin: 0, fontFamily: 'Georgia, serif' }}>{e.date.split(' ')[1]}</p>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, margin: '0 0 3px' }}>{e.title}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>📍 {e.loc}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: `${typeColors[e.type]}18`, color: typeColors[e.type] }}>{e.type}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{e.spots} spots</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 1.5rem', fontFamily: 'Georgia, serif' }}>From the blog</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {blog.map(b => (
              <div key={b.title} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: '1.5rem', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,240,74,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = border}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: 'rgba(200,240,74,0.1)', color: accent }}>{b.tag}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{b.read} read</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5, margin: '0 0 12px' }}>{b.title}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0 }}>{b.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div style={{ background: 'rgba(200,240,74,0.05)', border: `1px solid rgba(200,240,74,0.15)`, borderRadius: 20, padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 26, margin: '0 0 1rem' }}>Join a space, join a community</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 1.5rem' }}>Every Mows membership includes access to all events and the member network.</p>
          <button onClick={() => onNavigate('booking')} style={{ background: accent, color: dark, border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Get a membership →</button>
        </div>
      </div>
    </div>
  );
}
