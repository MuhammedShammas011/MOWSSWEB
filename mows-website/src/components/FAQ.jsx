import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "What are your operating hours?",
    a: "Our spaces are accessible 24/7 for dedicated desk and private cabin members. For hot desk and day pass users, our standard hours are Monday to Saturday, 8:00 AM to 8:00 PM."
  },
  {
    q: "Is high-speed Wi-Fi included?",
    a: "Yes! All our workspaces come equipped with enterprise-grade, high-speed Wi-Fi to ensure you never drop a call or lose connection during important work."
  },
  {
    q: "Can I book a meeting room if I am not a member?",
    a: "Absolutely. Our meeting rooms and event spaces are available for non-members to book by the hour or by the day."
  },
  {
    q: "Are there parking facilities available?",
    a: "Yes, we provide dedicated parking spaces for our members and visitors at all our locations."
  },
  {
    q: "Do you offer custom enterprise solutions?",
    a: "Yes, we can customize private cabins and entire floors to match your company's branding and specific team requirements. Reach out to our sales team for more details."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

const HoverText = ({ text, textStyle = {} }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              whileHover={{ scale: 1.25, y: -4, color: '#174F50', rotate: (charIndex % 2 === 0 ? 5 : -5) }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              style={{ display: 'inline-block', transformOrigin: 'bottom center', ...textStyle }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{
      backgroundColor: '#fcfaf5',
      backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      padding: '6rem 4vw',
      color: '#13221C',
      borderTop: '2px solid #13221C',
      fontFamily: "'Clash Grotesk', sans-serif",
    }}>
      <div style={{ maxWidth: 1300, margin: 'auto', width: '100%' }}>
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          <div style={{ textAlign: 'left', maxWidth: 800, marginBottom: '4rem' }}>
            <motion.p variants={itemVariants} style={{ fontSize: 13, color: '#fff', background: '#174F50', boxShadow: '4px 4px 0px #13221C', display: 'inline-block', padding: '6px 14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800 }}>
              FAQ
            </motion.p>
            <motion.h2 variants={itemVariants} style={{
              fontFamily: "'Clash Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 1.05,
              color: '#13221C',
              margin: '0 0 1.5rem',
              letterSpacing: '-0.02em',
            }}>
              <HoverText text="Frequently Asked " />
              <HoverText text="Questions" textStyle={{ color: '#174F50', WebkitTextStroke: '2px #13221C', textShadow: '4px 4px 0px #13221C' }} />
            </motion.h2>
            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', opacity: 0.8, fontWeight: 500, maxWidth: 600 }}>
              Everything you need to know about working at Mows.
            </motion.p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                animate={{
                  boxShadow: isOpen ? '6px 6px 0px #13221C' : '2px 2px 0px #13221C',
                  x: isOpen ? -2 : 0,
                  y: isOpen ? -2 : 0

                }}
                style={{ 
                  border: '2px solid #13221C', 
                  borderRadius: 12, 
                  background: '#fcfaf5', 
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => toggleFAQ(index)}
              >
                <div
                  style={{
                    width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.3rem', fontWeight: 700, color: '#13221C' }}>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    style={{ fontSize: '2rem', fontWeight: 300, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: isOpen ? '#fde047' : 'transparent', border: isOpen ? '2px solid #13221C' : '2px solid transparent', borderRadius: '50%' }}
                  >
                    +
                  </motion.div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div style={{ padding: '0 2rem 2rem', fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(19, 34, 28, 0.8)', fontWeight: 500 }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      </div>
    </section>
  );
}
