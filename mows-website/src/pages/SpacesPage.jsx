import { useState, useRef, useEffect } from 'react';
import { plans, locations } from '../data';
import LocationIcon from '../assets/LocationBlack.png';
import spaceDemo1 from '../assets/SpaceDemo-1.jpg';
import spaceDemo2 from '../assets/SpaceDemo-2.jpg';
import spaceDemo3 from '../assets/SpaceDemo-3.jpg';
import spaceDemo4 from '../assets/SpaceDemo-4.jpg';
import spaceDemo5 from '../assets/SpaceDemo-5.jpg';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { Ticket, CalendarDays, Armchair, Monitor, DoorClosed, Users, Package, Printer, Mail, Car } from 'lucide-react';

const accent = 'var(--color-amber-gold)';
const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';

const addons = [
  { icon: '🖨️', name: 'Printing credits', desc: '100 pages/mo', price: 300 },
  { icon: '📮', name: 'Mail handling', desc: 'Receive & forward', price: 500 },
  { icon: '🚗', name: 'Reserved parking', desc: 'Covered spot', price: 800 },
  { icon: '🖥️', name: 'Monitor rental', desc: '27" + peripherals', price: 600 },
];

const getPlanIcon = (id) => {
  switch (id) {
    case 'daily': return <Ticket size={32} />;
    case '15day': return <CalendarDays size={32} />;
    case 'monthly_basic': return <Armchair size={32} />;
    case 'monthly_pro': return <Monitor size={32} />;
    case 'cabin': return <DoorClosed size={32} />;
    case 'group': return <Users size={32} />;
    default: return <Package size={32} />;
  }
};

const getAddonIcon = (iconStr) => {
  if (iconStr.includes('🖨️')) return <Printer size={28} />;
  if (iconStr.includes('📮')) return <Mail size={28} />;
  if (iconStr.includes('🚗')) return <Car size={28} />;
  if (iconStr.includes('🖥️')) return <Monitor size={28} />;
  return <Package size={28} />;
};

function AnimatedNumber({ value }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const currentVal = parseInt(node.textContent.replace(/,/g, '')) || 0;
      const controls = animate(currentVal, value, {
        duration: 0.4,
        ease: "easeOut",
        onUpdate(v) {
          node.textContent = Math.round(v).toLocaleString('en-IN');
        }
      });
      return () => controls.stop();
    }
  }, [value]);

  return <span ref={nodeRef}>{value.toLocaleString('en-IN')}</span>;
}

const HoverText = ({ text, defaultColor, hoverColor }) => (
  <>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        whileHover={{ scale: 1.25, y: -4, color: hoverColor || defaultColor, rotate: (i % 2 === 0 ? 5 : -5) }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{ display: 'inline-block', transformOrigin: 'bottom center', color: defaultColor }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </>
);

// TiltCard removed as it does not match neo-brutalist aesthetic

export default function SpacesPage({ onNavigate }) {
  const [annual, setAnnual] = useState(false);
  const [selectedLocId, setSelectedLocId] = useState(1);

  const spaceImages = [spaceDemo1, spaceDemo2, spaceDemo3, spaceDemo4, spaceDemo5];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex(prev => (prev + 1) % spaceImages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const loc = locations.find(l => l.id === selectedLocId);
  const multiplier = loc ? loc.priceMultiplier : 1;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: textDark, background: '#fcfaf5', backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <section style={{ minHeight: '60vh', padding: '8rem 4vw 4rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', flexWrap: 'wrap' }}>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ flex: 1, minWidth: 320, maxWidth: 650, padding: '0', textAlign: 'left' }}
        >
          <p style={{
            fontSize: 14,
            color: '#fff',
            background: '#174F50',
            boxShadow: '4px 4px 0px #13221C',
            border: '2px solid #13221C',
            display: 'inline-block',
            padding: '8px 16px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            fontWeight: 800,
            transform: 'rotate(-2deg)'
          }}>Plans & pricing</p>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            margin: '0 0 1rem',
            color: textDark,
            WebkitTextStroke: '2px #13221C',
            lineHeight: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <span><HoverText text="FIND" defaultColor="#13221C" hoverColor="#174F50" /></span>
            <span><HoverText text="YOUR" defaultColor="#13221C" hoverColor="#174F50" /></span>
            <span style={{ textShadow: '6px 6px 0px #13221C' }}>
              <HoverText text="FIT." defaultColor="#174F50" />
            </span>
          </h1>
          <p style={{ fontSize: 18, color: '#000000ff', margin: '0 0 3rem', maxWidth: 600, fontWeight: 700 }}>All plans include premium Wi-Fi, unlimited tea & coffee, and access to all common areas.</p>

          {/* Billing toggle */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, borderRadius: 8, padding: '8px 24px', background: '#fff', border: '3px solid #13221C', boxShadow: '4px 4px 0px #13221C' }}>
              <span style={{ fontSize: 15, fontWeight: 900, color: !annual ? textDark : textLight, cursor: 'pointer', transition: 'color 0.2s', textTransform: 'uppercase' }} onClick={() => setAnnual(false)}>Monthly</span>
              <div onClick={() => setAnnual(a => !a)} style={{ width: 56, height: 32, background: annual ? '#174F50' : '#fcfaf5', borderRadius: 4, position: 'relative', cursor: 'pointer', border: '3px solid #13221C', transition: 'background 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{ position: 'absolute', top: 2, left: annual ? 26 : 2, width: 22, height: 22, borderRadius: 2, background: '#fde047', border: '2px solid #13221C' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setAnnual(true)}>
                <span style={{ fontSize: 15, fontWeight: 900, color: annual ? textDark : textLight, transition: 'color 0.2s', textTransform: 'uppercase' }}>Annual</span>
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  style={{ fontSize: 12, color: '#fff', background: '#174F50', padding: '4px 12px', borderRadius: 4, fontWeight: 800, border: '2px solid #13221C', textTransform: 'uppercase' }}
                >
                  Save 20%
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5 }}
        >
          <div style={{
            background: '#fff',
            padding: '12px 12px 32px 12px',
            borderRadius: 4,
            border: '4px solid #13221C',
            boxShadow: '10px 10px 0px #13221C',
            transform: 'rotate(2deg)',
            maxWidth: 380,
            width: '100%',
            position: 'relative'
          }}>
            {/* Tape effect */}
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%) rotate(-4deg)', width: 90, height: 26, background: '#fde047', border: '3px solid #13221C', zIndex: 10 }}></div>
            <img
              src={spaceImages[currentImgIndex]}
              alt="Mows Space Demo"
              style={{ width: '100%', height: 260, objectFit: 'cover', border: '3px solid #13221C', display: 'block' }}
            />
          </div>
        </motion.div>
      </section>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        <div style={{
          background: '#fff',
          border: '4px solid #13221C',
          //borderRadius: 16,
          padding: '4rem',
          boxShadow: '12px 12px 0px #13221C',
          marginBottom: '6rem',
          overflow: 'hidden'
        }}>
          {/* Location Selector */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p style={{
              fontSize: 18,
              fontWeight: 900,
              margin: '0 auto 2rem',
              color: '#13221C',
              background: '#fde047',
              display: 'inline-block',
              padding: '12px 24px',
              borderRadius: 8,
              boxShadow: '6px 6px 0px #13221C',
              border: '3px solid #13221C',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              // transform: 'rotate(-2deg)'
            }}>Where do you want to work?</p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 800, margin: '0 auto' }}>
              {locations.map(l => {
                const isUnavailable = l.avail !== 'open';
                return (
                  <motion.button
                    key={l.id}
                    onClick={() => {
                      if (isUnavailable) return;
                      setSelectedLocId(l.id);
                    }}
                    onMouseEnter={e => {
                      if (isUnavailable) return;
                      e.currentTarget.style.transform = 'translate(-4px, -4px)';
                      e.currentTarget.style.boxShadow = '8px 8px 0px #13221C';
                    }}
                    onMouseLeave={e => {
                      if (isUnavailable) return;
                      e.currentTarget.style.transform = selectedLocId === l.id ? 'translate(-4px, -4px)' : 'none';
                      e.currentTarget.style.boxShadow = selectedLocId === l.id ? '8px 8px 0px #13221C' : '4px 4px 0px #13221C';
                    }}
                    style={{
                      background: isUnavailable ? '#f3f4f6' : (selectedLocId === l.id ? '#174F50' : '#fff'),
                      border: '3px solid #13221C',
                      borderRadius: 12,
                      padding: '16px 32px',
                      fontSize: 16,
                      fontWeight: 900,
                      color: isUnavailable ? '#9ca3af' : (selectedLocId === l.id ? '#fff' : '#13221C'),
                      cursor: isUnavailable ? 'not-allowed' : 'pointer',
                      boxShadow: isUnavailable ? 'none' : (selectedLocId === l.id ? '8px 8px 0px #13221C' : '4px 4px 0px #13221C'),
                      transform: selectedLocId === l.id ? 'translate(-4px, -4px)' : 'none',
                      transition: 'transform 0.15s, box-shadow 0.15s, background-color 0.2s',
                      textTransform: 'uppercase',
                      position: 'relative'
                    }}
                  >
                    {l.name}
                    {isUnavailable && (
                      <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#13221C', color: '#fde047', fontSize: 10, padding: '4px 8px', borderRadius: 4, letterSpacing: '0.05em', whiteSpace: 'nowrap', border: '2px solid #13221C' }}>
                        CURRENTLY UNAVAILABLE
                      </div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Plan cards */}
          {!selectedLocId ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ maxWidth: 350, margin: '0 auto 2rem', padding: '2rem 2rem', textAlign: 'center' }}>
              <img src={LocationIcon} alt="Location Icon" style={{ width: 48, height: 48, margin: '0 auto 1rem', display: 'block' }} />
              <p style={{ fontSize: 24, fontWeight: 900, margin: '0 0 8px', color: '#13221C' }}>Select a location</p>
              <p style={{ fontSize: 15, color: '#13221C', margin: 0, fontWeight: 700 }}>Choose a location above to see available plans and pricing.</p>
            </motion.div>
          ) : (
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 900, textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center', color: '#13221C', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <span><Package size={36} /></span> Available Packages
              </h2>

              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  overflowX: 'auto',
                  paddingTop: '16px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingBottom: '2rem',
                  scrollSnapType: 'x mandatory',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none'
                }}
                className="no-scrollbar"
              >
                {plans.filter(p => !annual || (p.id !== 'daily' && p.id !== '15day')).map((plan, i) => {
                  const mPrice = plan.monthlyPrice ? Math.round(plan.monthlyPrice * multiplier) : null;
                  const aPrice = plan.annualPrice ? Math.round(plan.annualPrice * multiplier) : null;
                  const currentPrice = annual ? aPrice : mPrice;

                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                      style={{ display: "flex", flexShrink: 0, scrollSnapAlign: 'start' }}
                    >
                      <div
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translate(-4px, -4px)';
                          e.currentTarget.style.boxShadow = '8px 8px 0px #13221C';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = '4px 4px 0px #13221C';
                        }}
                        style={{
                          width: 320,
                          background: plan.popular ? '#fde047' : '#fcfaf5',
                          border: '3px solid #13221C',
                          borderRadius: 12,
                          padding: '1.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          boxShadow: '4px 4px 0px #13221C',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                      >
                        {plan.popular && (
                          <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%) rotate(-2deg)', background: '#174F50', color: '#fff', fontSize: 12, fontWeight: 900, padding: '8px 20px', borderRadius: 4, letterSpacing: '0.1em', border: '3px solid #13221C', boxShadow: '4px 4px 0px #13221C' }}>
                            MOST POPULAR
                          </div>
                        )}
                        <div style={{ color: '#13221C', marginBottom: 12 }}>{getPlanIcon(plan.id)}</div>
                        <p style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px', color: '#13221C', textTransform: 'uppercase' }}>{plan.name}</p>
                        <div style={{ marginBottom: 12, minHeight: 64 }}>
                          {currentPrice ? (
                            <>
                              <span style={{ fontSize: 42, fontWeight: 900, color: '#13221C' }}>
                                ₹<AnimatedNumber value={currentPrice} />
                              </span>
                              <span style={{ fontSize: 16, color: '#13221C', fontWeight: 700 }}>
                                {plan.id === 'daily' ? '/day' : plan.id === '15day' ? '/15 days' : '/mo'}
                              </span>
                              {annual && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  style={{ fontSize: 13, color: '#fff', background: '#174F50', display: 'inline-block', padding: '2px 8px', borderRadius: 4, border: '2px solid #13221C', marginTop: 8, fontWeight: 800 }}
                                >
                                  Save ₹{((mPrice - aPrice) * 12).toLocaleString('en-IN')}/yr
                                </motion.div>
                              )}
                            </>
                          ) : (
                            <span style={{ fontSize: 36, fontWeight: 900, color: '#13221C' }}>Custom</span>
                          )}
                        </div>
                        <p style={{ fontSize: 14, color: '#13221C', lineHeight: 1.5, margin: '0 0 14px', fontWeight: 700 }}>
                          {plan.desc}
                        </p>
                        <div style={{ marginBottom: 20 }}>
                          <span style={{ 
                            display: 'inline-block', 
                            color: '#fff', 
                            background: '#174F50', 
                            border: '2px solid #13221C', 
                            padding: '6px 12px', 
                            borderRadius: 6, 
                            fontWeight: 900, 
                            textTransform: 'uppercase', 
                            fontSize: 12, 
                            letterSpacing: '0.02em',
                            boxShadow: '3px 3px 0px #13221C' 
                          }}>
                            {plan.id === 'daily' ? 'Daily pass rate' : plan.id === '15day' ? '15-Day pass rate' : `${plan.name} rate`}: {plan.monthlyPrice ? `₹${plan.monthlyPrice.toLocaleString('en-IN')}/-` : 'Custom Quote'}
                          </span>
                        </div>
                        <div style={{ borderTop: `4px dashed #13221C`, paddingTop: 20, marginBottom: 20, flex: 1 }}>
                          {plan.features.map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                              <span style={{ color: '#174F50', fontSize: 16, fontWeight: 900, marginTop: 2 }}>✓</span>
                              <span style={{ fontSize: 14, color: '#13221C', fontWeight: 700 }}>{f}</span>
                            </div>
                          ))}
                          {plan.missing.map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10, opacity: 0.6 }}>
                              <span style={{ fontSize: 16, fontWeight: 900, marginTop: 2, color: '#13221C' }}>–</span>
                              <span style={{ fontSize: 14, color: '#13221C', textDecoration: 'line-through', fontWeight: 700 }}>{f}</span>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => plan.id === 'team' ? onNavigate('contact') : onNavigate('booking', plan.name)}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translate(-2px, -2px)';
                            e.currentTarget.style.boxShadow = '6px 6px 0px #13221C';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '4px 4px 0px #13221C';
                          }}
                          style={{
                            background: plan.popular ? '#13221C' : '#fff',
                            color: plan.popular ? '#fff' : '#13221C',
                            border: '3px solid #13221C',
                            borderRadius: 8,
                            padding: '16px',
                            fontSize: 15,
                            fontWeight: 900,
                            cursor: 'pointer',
                            width: '100%',
                            boxShadow: '4px 4px 0px #13221C',
                            transition: 'transform 0.1s, box-shadow 0.1s',
                            textTransform: 'uppercase'
                          }}
                        >
                          {plan.id === 'team' ? 'Contact us →' : 'Book now →'}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Add-ons section removed — add-ons are now handled inside the booking flow */}
        {false && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: 850, margin: '0 auto' }}
          >
            <p style={{
              fontSize: 14,
              color: '#fff',
              background: '#174F50',
              boxShadow: '4px 4px 0px #13221C',
              border: '2px solid #13221C',
              display: 'inline-block',
              padding: '8px 16px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 800,
              transform: 'rotate(2deg)',
              marginLeft: '50%',
              transformOrigin: 'center left'
            }}>Optional add-ons</p>
            <p style={{ fontSize: 24, color: '#13221C', textAlign: 'center', marginBottom: 32, fontWeight: 900, textTransform: 'uppercase' }}>Customize your membership</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 20 }}>
              {addons.map(a => {
                const active = selectedAddons.has(a.name);
                return (
                  <motion.div
                    key={a.name}
                    onClick={() => toggleAddon(a.name)}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translate(-2px, -2px)';
                      e.currentTarget.style.boxShadow = '6px 6px 0px #13221C';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = active ? '4px 4px 0px #13221C' : '4px 4px 0px rgba(19,34,28,0.2)';
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: 12,
                      padding: '1.5rem',
                      cursor: 'pointer',
                      userSelect: 'none',
                      background: active ? '#fde047' : '#fff',
                      border: '3px solid #13221C',
                      boxShadow: active ? '4px 4px 0px #13221C' : '4px 4px 0px rgba(19,34,28,0.2)',
                      transition: 'transform 0.1s, box-shadow 0.1s, background 0.3s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <div style={{ color: '#13221C', width: 56, height: 56, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '2px solid #13221C' }}>{getAddonIcon(a.icon)}</div>
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 900, margin: 0, color: '#13221C', textTransform: 'uppercase' }}>{a.name}</p>
                        <p style={{ fontSize: 14, color: '#13221C', margin: '4px 0 0', fontWeight: 700 }}>{a.desc}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontSize: 18, fontWeight: 900, margin: 0, color: '#13221C' }}>₹{a.price}<span style={{ fontSize: 13, fontWeight: 700, color: '#13221C' }}>/mo</span></p>
                      <motion.div
                        animate={{ backgroundColor: active ? '#13221C' : '#fcfaf5', color: active ? '#fff' : '#13221C' }}
                        style={{ display: 'inline-block', marginTop: 8, padding: '6px 12px', borderRadius: 4, fontSize: 12, fontWeight: 900, border: '2px solid #13221C' }}
                      >
                        {active ? '✓ Added' : '+ Add'}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Add-on total and proceed */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              style={{ marginTop: 32, padding: '2rem 2.5rem', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#174F50', color: '#fff', border: '4px solid #13221C', boxShadow: '8px 8px 0px #13221C' }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>Selected add-ons</p>
                <p style={{ fontSize: 14, color: '#fde047', margin: '6px 0 0', fontWeight: 800 }}>{selectedAddons.size} item{selectedAddons.size !== 1 ? 's' : ''} selected</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                {addonTotal > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <motion.p
                      key={addonTotal}
                      initial={{ scale: 1.2, color: '#fcfaf5' }}
                      animate={{ scale: 1, color: '#fde047' }}
                      style={{ fontSize: 28, fontWeight: 900, margin: 0 }}
                    >
                      +₹<AnimatedNumber value={addonTotal} /><span style={{ fontSize: 15, color: '#fff', fontWeight: 700 }}>/mo</span>
                    </motion.p>
                  </div>
                )}
                <motion.button
                  onClick={() => onNavigate('booking')}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    e.currentTarget.style.boxShadow = '6px 6px 0px #13221C';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '4px 4px 0px #13221C';
                  }}
                  style={{ background: '#fde047', color: '#13221C', border: '3px solid #13221C', borderRadius: 8, padding: '16px 28px', fontSize: 15, fontWeight: 900, cursor: 'pointer', boxShadow: '4px 4px 0px #13221C', transition: 'transform 0.1s, box-shadow 0.1s', textTransform: 'uppercase' }}
                >
                  {addonTotal > 0 ? 'Book with add-ons →' : 'Proceed to Booking →'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
