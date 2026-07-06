import { useState } from 'react';
import { navLinks } from '../data';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 1)';

export default function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform background opacity based on scroll position
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.6)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.4)']
  );

  const navBackdropFilter = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px) saturate(100%)', 'blur(40px) saturate(200%)']
  );

  function go(page) {
    onNavigate(page);
    setMenuOpen(false);
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 100 }}>
        <motion.nav
          style={{
            background: '#fcfaf5',
            borderBottom: '2px solid #13221C',
            width: '100%',
            padding: '0 4vw',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: '100px',
            position: 'relative'
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Center Circular Logo Container */}
          <motion.button
            onClick={() => go('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: "-50%", y: "50%" }}
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 0,
              width: '72px',
              height: '72px',
              zIndex: 10,
              borderRadius: '50%',
              border: '2px solid #13221C',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer',
            }}>
            <motion.img
              src="/logo-icon.png"
              alt="Mows Logo"
              style={{
                width: 44,
                height: 44,
                objectFit: 'contain',
                display: 'block',
                filter: 'brightness(0)',
              }}
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />
          </motion.button>

          {/* Left: Brand / Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go('home')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}
              className="interactive"
            >
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#13221C', letterSpacing: '-0.02em' }}>MOWS</span>
            </motion.button>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }} className="desktop-nav">
            {navLinks.map(l => {
              const pageKey = l.label.toLowerCase();
              const active = currentPage === pageKey;
              return (
                <motion.button
                  key={l.path}
                  onClick={() => go(pageKey)}
                  className="interactive"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(23, 79, 80,0.03)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: active ? 'rgba(23, 79, 80,0.06)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    fontSize: 16, color: active ? textDark : textLight,
                    fontWeight: active ? 700 : 600,
                    transition: 'color 0.2s', letterSpacing: '0.01em',
                    padding: '8px 16px',
                    borderRadius: 100,
                    position: 'relative'
                  }}
                >
                  {l.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        x: '-50%',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        backgroundColor: textDark
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }} className="desktop-nav">
            <motion.button
              onClick={() => go('booking')}
              className="interactive"
              whileHover={{ y: 2, x: 2, boxShadow: '2px 2px 0px #13221C' }}
              whileTap={{ y: 4, x: 4, boxShadow: '0px 0px 0px #13221C', scale: 0.98 }}
              style={{
                background: textDark, color: '#fff', border: '2px solid #13221C', borderRadius: 100,
                padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                letterSpacing: '0.02em', boxShadow: '4px 4px 0px #13221C',
                transition: 'box-shadow 0.15s ease, transform 0.15s ease',
              }}
            >
              Book a desk
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} style={{
            display: 'none', background: '#f1f5f9', border: 'none', cursor: 'pointer',
            flexDirection: 'column', gap: 4, padding: 10, borderRadius: 100, width: 44, height: 44, alignItems: 'center', justifyContent: 'center'
          }} className="hamburger interactive" aria-label="Toggle menu">
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 16, height: 2, background: textDark,
                borderRadius: 2,
                transition: 'transform 0.2s, opacity 0.2s',
                transform: menuOpen ? (i === 0 ? 'translateY(6px) rotate(45deg)' : i === 2 ? 'translateY(-6px) rotate(-45deg)' : 'scaleX(0)') : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </motion.nav>
      </div>

      <div style={{ height: 88 }}></div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99,
              background: 'rgba(253, 253, 253, 0.98)',
              backdropFilter: 'blur(30px)',
              padding: '100px 24px 40px',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}
          >
            {navLinks.map((l, i) => {
              const pageKey = l.label.toLowerCase();
              return (
                <motion.button
                  key={l.path}
                  onClick={() => go(pageKey)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                  style={{
                    background: currentPage === pageKey ? 'rgba(23, 79, 80, 0.05)' : 'transparent',
                    border: `1px solid ${currentPage === pageKey ? 'rgba(23, 79, 80, 0.1)' : 'transparent'}`,
                    borderRadius: 20, padding: '18px 24px',
                    fontSize: 20, color: currentPage === pageKey ? textDark : textLight,
                    fontWeight: currentPage === pageKey ? 800 : 600,
                    textAlign: 'left', cursor: 'pointer',
                    fontFamily: "'Clash Grotesk', sans-serif",
                    transition: 'all 0.2s'
                  }}
                  className="interactive"
                >
                  {l.label}
                </motion.button>
              );
            })}
            <motion.div
              style={{ marginTop: 'auto' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            >
              <button onClick={() => go('booking')} style={{
                width: '100%', background: textDark, color: '#fff', border: 'none',
                borderRadius: 24, padding: '20px', fontSize: 18, fontWeight: 800,
                cursor: 'pointer', fontFamily: "'Clash Grotesk', sans-serif",
                boxShadow: '0 10px 25px rgba(23, 79, 80,0.2)'
              }} className="interactive">Book a desk →</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
