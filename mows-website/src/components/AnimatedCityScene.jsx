import React from 'react';
import { motion } from 'framer-motion';

const SedanSVG = ({ color }) => (
  <svg viewBox="0 0 120 50" style={{ width: '100%', height: '100%', display: 'block' }}>
    {/* Body outline */}
    <path 
      d="M15 30 L25 30 C 30 18, 48 13, 58 13 L82 13 C 92 13, 98 18, 102 26 L112 26 C 117 26, 119 29, 119 32 L119 40 C 119 41, 118 42, 117 42 L3 42 C 2 42, 1 41, 1 40 L1 32 C 1 29, 3 29, 5 29 Z" 
      fill={color} 
      stroke="#13221C" 
      strokeWidth="2.5" 
      strokeLinejoin="round"
    />
    {/* Windows */}
    <path 
      d="M30 28 L36 19 L54 18 L54 28 Z" 
      fill="#bfdbfe" 
      stroke="#13221C" 
      strokeWidth="2" 
    />
    <path 
      d="M58 28 L58 18 L78 18 L83 28 Z" 
      fill="#bfdbfe" 
      stroke="#13221C" 
      strokeWidth="2" 
    />
    {/* Door lines */}
    <line x1="56" y1="18" x2="56" y2="42" stroke="#13221C" strokeWidth="2" />
    <circle cx="53" cy="33" r="1.5" fill="#13221C" />
    <circle cx="59" cy="33" r="1.5" fill="#13221C" />
    {/* Headlight */}
    <path d="M113 28 L119 29 L119 33 L113 32 Z" fill="#fde047" stroke="#13221C" strokeWidth="1.5" />
    {/* Taillight */}
    <path d="M1 32 L5 32 L5 36 L1 36 Z" fill="#ef4444" stroke="#13221C" strokeWidth="1.5" />
    {/* Wheels */}
    <circle cx="30" cy="42" r="10" fill="#13221C" />
    <circle cx="30" cy="42" r="4" fill="#e2e8f0" stroke="#13221C" strokeWidth="2" />
    <circle cx="90" cy="42" r="10" fill="#13221C" />
    <circle cx="90" cy="42" r="4" fill="#e2e8f0" stroke="#13221C" strokeWidth="2" />
  </svg>
);

const HatchbackSVG = ({ color }) => (
  <svg viewBox="0 0 110 50" style={{ width: '100%', height: '100%', display: 'block' }}>
    {/* Body outline */}
    <path 
      d="M5 31 L18 31 C 22 16, 40 14, 68 14 C 75 14, 85 22, 90 27 L102 27 C 106 27, 108 29, 108 32 L108 40 C 108 41, 107 42, 106 42 L4 42 C 3 42, 2 41, 2 40 L2 34 C 2 32, 3 32, 5 31 Z" 
      fill={color} 
      stroke="#13221C" 
      strokeWidth="2.5" 
      strokeLinejoin="round"
    />
    {/* Windows */}
    <path 
      d="M24 28 L30 19 L56 18 L56 28 Z" 
      fill="#bfdbfe" 
      stroke="#13221C" 
      strokeWidth="2" 
    />
    <path 
      d="M60 28 L60 18 L76 19 L81 28 Z" 
      fill="#bfdbfe" 
      stroke="#13221C" 
      strokeWidth="2" 
    />
    {/* Door lines */}
    <line x1="58" y1="18" x2="58" y2="42" stroke="#13221C" strokeWidth="2" />
    <circle cx="55" cy="33" r="1.5" fill="#13221C" />
    <circle cx="61" cy="33" r="1.5" fill="#13221C" />
    {/* Headlight */}
    <path d="M102 29 L108 30 L108 34 L102 33 Z" fill="#fde047" stroke="#13221C" strokeWidth="1.5" />
    {/* Taillight */}
    <path d="M2 33 L6 33 L6 37 L2 36 Z" fill="#ef4444" stroke="#13221C" strokeWidth="1.5" />
    {/* Wheels */}
    <circle cx="26" cy="42" r="10" fill="#13221C" />
    <circle cx="26" cy="42" r="4" fill="#e2e8f0" stroke="#13221C" strokeWidth="2" />
    <circle cx="82" cy="42" r="10" fill="#13221C" />
    <circle cx="82" cy="42" r="4" fill="#e2e8f0" stroke="#13221C" strokeWidth="2" />
  </svg>
);

const SuvSVG = ({ color }) => (
  <svg viewBox="0 0 120 55" style={{ width: '100%', height: '100%', display: 'block' }}>
    {/* Roof rack */}
    <rect x="35" y="4" width="45" height="3" fill="#13221C" rx="1.5" />
    {/* Main body */}
    <path 
      d="M5 31 L15 31 C 18 13, 32 8, 80 8 C 88 8, 94 13, 98 23 L112 23 C 117 23, 119 26, 119 30 L119 44 C 119 45, 118 46, 117 46 L3 46 C 2 46, 1 45, 1 44 L1 34 C 1 32, 3 32, 5 31 Z" 
      fill={color} 
      stroke="#13221C" 
      strokeWidth="2.5" 
      strokeLinejoin="round"
    />
    {/* Windows */}
    <path 
      d="M24 28 L28 14 L52 14 L52 28 Z" 
      fill="#bfdbfe" 
      stroke="#13221C" 
      strokeWidth="2" 
    />
    <path 
      d="M56 28 L56 14 L78 14 L84 28 Z" 
      fill="#bfdbfe" 
      stroke="#13221C" 
      strokeWidth="2" 
    />
    <path 
      d="M87 28 L87 16 L92 18 L94 28 Z" 
      fill="#bfdbfe" 
      stroke="#13221C" 
      strokeWidth="2" 
    />
    {/* Door lines */}
    <line x1="54" y1="14" x2="54" y2="46" stroke="#13221C" strokeWidth="2" />
    <circle cx="51" cy="34" r="1.5" fill="#13221C" />
    <circle cx="57" cy="34" r="1.5" fill="#13221C" />
    {/* Headlight */}
    <path d="M113 26 L119 27 L119 31 L113 30 Z" fill="#fde047" stroke="#13221C" strokeWidth="1.5" />
    {/* Taillight */}
    <path d="M1 32 L5 32 L5 36 L1 36 Z" fill="#ef4444" stroke="#13221C" strokeWidth="1.5" />
    {/* Wheels */}
    <circle cx="28" cy="46" r="11" fill="#13221C" />
    <circle cx="28" cy="46" r="5" fill="#e2e8f0" stroke="#13221C" strokeWidth="2.5" />
    <circle cx="90" cy="46" r="11" fill="#13221C" />
    <circle cx="90" cy="46" r="5" fill="#e2e8f0" stroke="#13221C" strokeWidth="2.5" />
  </svg>
);

export default function AnimatedCityScene() {
  const borderStyle = '2px solid #13221C';
  const shadowStyle = '4px 4px 0px #13221C';

  return (
    <div style={{
      width: '100%',
      height: 420,
      backgroundColor: '#e0f2fe', // sky blue
      borderRadius: 24,
      border: borderStyle,
      boxShadow: shadowStyle,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}>
      
      {/* Background clouds */}
      <motion.div 
        animate={{ left: ['100%', '-20%'] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        style={{ position: 'absolute', top: 40, fontSize: 40, opacity: 0.8 }}
      >
        ☁️
      </motion.div>
      <motion.div 
        animate={{ left: ['100%', '-20%'] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear", delay: 5 }}
        style={{ position: 'absolute', top: 80, fontSize: 30, opacity: 0.6 }}
      >
        ☁️
      </motion.div>

      {/* Buildings Area */}
      <div style={{ position: 'absolute', bottom: 120, left: 0, width: '100%', height: 200, display: 'flex', alignItems: 'flex-end', paddingLeft: 40 }}>
        
        {/* Main Coworking Building */}
        <div style={{ 
          width: 180, 
          height: 220, 
          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.45) 0%, rgba(14, 116, 144, 0.25) 50%, rgba(23, 79, 80, 0.15) 100%)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: borderStyle,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 55,
          boxShadow: 'inset -12px 0px 0px rgba(255,255,255,0.2), inset 2px 2px 0px rgba(255,255,255,0.4)'
        }}>
          {/* Diagonal glass reflection shine */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 15%, transparent 16%, transparent 35%, rgba(255,255,255,0.3) 36%, rgba(255,255,255,0.3) 42%, transparent 43%)',
            pointerEvents: 'none',
            zIndex: 1
          }}></div>

          {/* Glass panel division lines */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
            backgroundSize: '45px 55px',
            pointerEvents: 'none',
            zIndex: 2
          }}></div>

          {/* Logo sign board */}
          <div style={{
            background: '#ffffff',
            border: borderStyle,
            padding: '6px 12px',
            borderRadius: 8,
            boxShadow: '3px 3px 0px #13221C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '80%',
            maxWidth: 130,
            position: 'absolute',
            top: -40,
            zIndex: 10
          }}>
            {/* Support legs */}
            <div style={{ position: 'absolute', bottom: -12, left: '20%', width: 3, height: 12, backgroundColor: '#13221C' }}></div>
            <div style={{ position: 'absolute', bottom: -12, right: '20%', width: 3, height: 12, backgroundColor: '#13221C' }}></div>

            {/* Corner bolts */}
            <div style={{ position: 'absolute', top: 3, left: 3, width: 3, height: 3, borderRadius: '50%', backgroundColor: '#13221C' }}></div>
            <div style={{ position: 'absolute', top: 3, right: 3, width: 3, height: 3, borderRadius: '50%', backgroundColor: '#13221C' }}></div>
            <div style={{ position: 'absolute', bottom: 3, left: 3, width: 3, height: 3, borderRadius: '50%', backgroundColor: '#13221C' }}></div>
            <div style={{ position: 'absolute', bottom: 3, right: 3, width: 3, height: 3, borderRadius: '50%', backgroundColor: '#13221C' }}></div>

            <img src="/logo.png" alt="MOWS Logo" style={{ height: 18, objectFit: 'contain', filter: 'brightness(0)' }} />
            <span style={{ fontSize: 13, fontWeight: 900, color: '#13221C', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: "'Clash Grotesk', sans-serif" }}>mows</span>
          </div>
          
          {/* Top Floor Windows */}
          <div style={{ 
            position: 'absolute', 
            bottom: 135, 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 15, 
            width: '70%', 
            zIndex: 5 
          }}>
            {/* Upside Left Window (with 4 working people silhouettes) */}
            <div style={{ 
              height: 30, 
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', 
              border: borderStyle, 
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), 2px 2px 0px rgba(19,34,28,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Round table pedestal */}
              <div style={{ position: 'absolute', bottom: 0, left: '48%', width: 3, height: 6, backgroundColor: '#13221C' }}></div>
              {/* Round tabletop (oval profile) */}
              <div style={{ position: 'absolute', bottom: 5, left: '32%', width: '36%', height: 2, backgroundColor: '#13221C', borderRadius: '50%' }}></div>
              
              {/* Person 1 (front left) */}
              <div style={{ position: 'absolute', bottom: 3, left: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#13221C' }}></div>
                <div style={{ width: 7, height: 5, borderRadius: '3px 3px 0 0', backgroundColor: '#13221C', marginTop: -1 }}></div>
              </div>

              {/* Person 2 (back left, slightly higher and smaller) */}
              <div style={{ position: 'absolute', bottom: 7, left: '38%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, opacity: 0.75 }}>
                <div style={{ width: 3.5, height: 3.5, borderRadius: '50%', backgroundColor: '#13221C' }}></div>
                <div style={{ width: 6, height: 4, borderRadius: '3.5px 3.5px 0 0', backgroundColor: '#13221C', marginTop: -1 }}></div>
              </div>

              {/* Person 3 (back right, slightly higher and smaller) */}
              <div style={{ position: 'absolute', bottom: 7, left: '54%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, opacity: 0.75 }}>
                <div style={{ width: 3.5, height: 3.5, borderRadius: '50%', backgroundColor: '#13221C' }}></div>
                <div style={{ width: 6, height: 4, borderRadius: '3.5px 3.5px 0 0', backgroundColor: '#13221C', marginTop: -1 }}></div>
              </div>

              {/* Person 4 (front right) */}
              <div style={{ position: 'absolute', bottom: 3, left: '72%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#13221C' }}></div>
                <div style={{ width: 7, height: 5, borderRadius: '3px 3px 0 0', backgroundColor: '#13221C', marginTop: -1 }}></div>
              </div>

              {/* Blurred Glass Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(1.2px)',
                WebkitBackdropFilter: 'blur(1.2px)',
                pointerEvents: 'none',
                zIndex: 4
              }}></div>
            </div>

            {/* Upside Right Window */}
            <div style={{ 
              height: 30, 
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', 
              border: borderStyle, 
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), 2px 2px 0px rgba(19,34,28,0.15)' 
            }}></div>
          </div>

          {/* Bottom Floor Windows */}
          <div style={{ 
            position: 'absolute', 
            bottom: 65, 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 15, 
            width: '70%', 
            zIndex: 5 
          }}>
            {/* Bottom Left Window (Normal) */}
            <div style={{ 
              height: 30, 
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', 
              border: borderStyle, 
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), 2px 2px 0px rgba(19,34,28,0.15)' 
            }}></div>

            {/* Bottom Right Window (Man working at a desk) */}
            <div style={{ 
              height: 30, 
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', 
              border: borderStyle, 
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.9), 2px 2px 0px rgba(19,34,28,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Working desk */}
              <div style={{ position: 'absolute', bottom: 3, left: '10%', width: '80%', height: 3, backgroundColor: '#13221C', borderRadius: 1.5 }}></div>
              
              {/* Laptop screen */}
              <div style={{ position: 'absolute', bottom: 6, right: '25%', width: 7, height: 5, backgroundColor: '#13221C', borderRadius: 1 }}></div>
              <div style={{ position: 'absolute', bottom: 5, right: '23%', width: 9, height: 1.5, backgroundColor: '#13221C' }}></div>

              {/* Working Man (sitting on chair, leaning forward) */}
              <div style={{ position: 'absolute', bottom: 5, left: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Head */}
                <div style={{ width: 4.5, height: 4.5, borderRadius: '50%', backgroundColor: '#13221C' }}></div>
                {/* Torso/arms leaning forward */}
                <div style={{ width: 8, height: 6, borderRadius: '3.5px 3.5px 0 0', backgroundColor: '#13221C', marginTop: -1 }}></div>
              </div>

              {/* Blurred Glass Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(1.2px)',
                WebkitBackdropFilter: 'blur(1.2px)',
                pointerEvents: 'none',
                zIndex: 4
              }}></div>
            </div>
          </div>

          {/* Floor separator slab (divides into 2 storeys) */}
          <div style={{ 
            position: 'absolute', 
            bottom: 106, 
            left: 0, 
            width: '100%', 
            height: 8, 
            backgroundColor: '#ffffff', 
            borderTop: borderStyle,
            borderBottom: borderStyle,
            zIndex: 6 
          }}></div>

          {/* Door */}
          <div style={{ position: 'absolute', bottom: 0, width: 40, height: 50, backgroundColor: '#94a3b8', border: borderStyle, borderBottom: 'none' }}></div>
        </div>

        {/* Cafe */}
        <div style={{ 
          width: 155, 
          height: 140, 
          backgroundColor: '#ffffff', 
          border: borderStyle,
          borderLeft: 'none',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 0,
          boxShadow: 'inset -10px 0 0 rgba(0,0,0,0.03)'
        }}>
          {/* Cafe sign */}
          <div style={{
            position: 'absolute',
            top: 8,
            background: '#174F50',
            border: borderStyle,
            color: '#fff',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: '0.08em',
            boxShadow: '2px 2px 0px #13221C'
          }}>CAFE</div>

          {/* Awning (Striped Canvas) */}
          <div style={{ 
            position: 'absolute', 
            top: 32, 
            width: '110%', 
            left: '-5%', 
            height: 20, 
            background: 'repeating-linear-gradient(90deg, #174F50, #174F50 12px, #ffffff 12px, #ffffff 24px)', 
            border: borderStyle, 
            borderRadius: 4, 
            boxShadow: '2px 2px 0px rgba(19,34,28,0.2)' 
          }}></div>
          
          {/* Storefront Layout (Window & Door side-by-side) */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, width: '100%', padding: '0 12px', boxSizing: 'border-box', marginBottom: 0 }}>
            {/* Cafe window */}
            <div style={{ 
              flex: 1, 
              height: 42, 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(186,230,253,0.4) 100%)', 
              border: borderStyle, 
              position: 'relative',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8)',
              marginBottom: 16
            }}>
              {/* Glossy diagonal shine */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 20%, transparent 21%)', pointerEvents: 'none' }}></div>
            </div>
            {/* Cafe door */}
            <div style={{ 
              width: 30, 
              height: 68, 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(186,230,253,0.4) 100%)', 
              border: borderStyle, 
              borderBottom: 'none',
              position: 'relative',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8)'
            }}>
              {/* Door handle */}
              <div style={{ position: 'absolute', top: '50%', left: 4, width: 3, height: 10, backgroundColor: '#13221C', borderRadius: 1.5 }}></div>
            </div>
          </div>

          {/* Outdoor Seating (Bistro table, chairs & parasol umbrella) */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 12,
            width: 70,
            height: 48,
            zIndex: 15
          }}>
            {/* Parasol Umbrella */}
            {/* Umbrella Pole */}
            <div style={{ position: 'absolute', bottom: 0, left: '48%', width: 2, height: 34, backgroundColor: '#13221C' }}></div>
            {/* Umbrella Striped Canopy */}
            <div style={{ 
              position: 'absolute', 
              bottom: 34, 
              left: '10%', 
              width: '80%', 
              height: 14, 
              background: 'repeating-linear-gradient(90deg, #174F50, #174F50 8px, #ffffff 8px, #ffffff 16px)', 
              border: borderStyle, 
              borderRadius: '14px 14px 0 0', 
              boxShadow: '1px 1px 0px rgba(0,0,0,0.15)' 
            }}></div>

            {/* Table */}
            {/* Table Leg */}
            <div style={{ position: 'absolute', bottom: 0, left: '48%', width: 2, height: 16, backgroundColor: '#13221C' }}></div>
            {/* Tabletop */}
            <div style={{ position: 'absolute', bottom: 16, left: '25%', width: '50%', height: 2, backgroundColor: '#13221C', borderRadius: 1 }}></div>

            {/* Chair Left (facing right) */}
            <div style={{ position: 'absolute', bottom: 0, left: '5%', width: 14, height: 18 }}>
              {/* Backrest */}
              <div style={{ position: 'absolute', bottom: 8, left: 0, width: 2, height: 10, backgroundColor: '#13221C' }}></div>
              {/* Seat */}
              <div style={{ position: 'absolute', bottom: 8, left: 0, width: 12, height: 2, backgroundColor: '#13221C' }}></div>
              {/* Legs */}
              <div style={{ position: 'absolute', bottom: 0, left: 1, width: 1.5, height: 8, backgroundColor: '#13221C' }}></div>
              <div style={{ position: 'absolute', bottom: 0, left: 9, width: 1.5, height: 8, backgroundColor: '#13221C' }}></div>
            </div>

            {/* Chair Right (facing left) */}
            <div style={{ position: 'absolute', bottom: 0, right: '5%', width: 14, height: 18 }}>
              {/* Backrest */}
              <div style={{ position: 'absolute', bottom: 8, right: 0, width: 2, height: 10, backgroundColor: '#13221C' }}></div>
              {/* Seat */}
              <div style={{ position: 'absolute', bottom: 8, right: 0, width: 12, height: 2, backgroundColor: '#13221C' }}></div>
              {/* Legs */}
              <div style={{ position: 'absolute', bottom: 0, right: 1, width: 1.5, height: 8, backgroundColor: '#13221C' }}></div>
              <div style={{ position: 'absolute', bottom: 0, right: 9, width: 1.5, height: 8, backgroundColor: '#13221C' }}></div>
            </div>
          </div>
        </div>

        {/* Tree */}
        <div style={{ marginLeft: 20, position: 'relative', width: 40, height: 60 }}>
          <div style={{ position: 'absolute', bottom: 0, left: 15, width: 10, height: 20, backgroundColor: '#78350f', border: borderStyle }}></div>
          <div style={{ position: 'absolute', bottom: 15, left: 0, width: 40, height: 40, backgroundColor: '#22c55e', border: borderStyle, borderRadius: '50%' }}></div>
        </div>

        {/* Corporate Office Building 2 */}
        <div style={{
          marginLeft: 20,
          width: 100,
          height: 250,
          background: 'linear-gradient(135deg, rgba(203, 213, 225, 0.45) 0%, rgba(100, 116, 139, 0.25) 50%, rgba(51, 65, 85, 0.15) 100%)',
          border: borderStyle,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 24,
          boxShadow: 'inset -8px 0 0 rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}>
          {/* Glass reflection shine */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.45) 15%, transparent 16%, transparent 40%, rgba(255,255,255,0.2) 41%, rgba(255,255,255,0.2) 45%, transparent 46%)',
            pointerEvents: 'none',
            zIndex: 1
          }}></div>

          {/* Corporate windows (2 columns, 6 rows grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 12px', width: '70%', position: 'relative', zIndex: 5 }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ 
                height: 18, 
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', 
                border: borderStyle,
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.9), 1px 1px 0px rgba(0,0,0,0.1)' 
              }}></div>
            ))}
          </div>
        </div>

        {/* Corporate Office Building 3 */}
        <div style={{
          marginLeft: 20,
          width: 85,
          height: 280,
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(20, 83, 45, 0.25) 50%, rgba(6, 78, 59, 0.15) 100%)',
          border: borderStyle,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 24,
          boxShadow: 'inset -8px 0 0 rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}>
          {/* Glass reflection shine */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.45) 15%, transparent 16%, transparent 40%, rgba(255,255,255,0.2) 41%, rgba(255,255,255,0.2) 45%, transparent 46%)',
            pointerEvents: 'none',
            zIndex: 1
          }}></div>

          {/* Corporate windows (2 columns, 7 rows grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 10px', width: '70%', position: 'relative', zIndex: 5 }}>
            {[...Array(14)].map((_, i) => (
              <div key={i} style={{ 
                height: 18, 
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', 
                border: borderStyle,
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.9), 1px 1px 0px rgba(0,0,0,0.1)' 
              }}></div>
            ))}
          </div>
        </div>

      </div>

      {/* Parking Lot (Parallel) */}
      <div style={{ 
        position: 'absolute', 
        bottom: 60, 
        left: 0, 
        width: '100%', 
        height: 60, 
        backgroundColor: '#94a3b8', 
        borderTop: borderStyle,
        display: 'flex',
        alignItems: 'flex-end',
        paddingLeft: 40,
        gap: 20
      }}>
        {/* Parking slot markers */}
        {[1, 2].map(i => (
          <div key={i} style={{ width: 80, height: 20, borderTop: '2px solid rgba(255,255,255,0.5)', borderRight: '2px solid rgba(255,255,255,0.5)', borderLeft: '2px solid rgba(255,255,255,0.5)' }}></div>
        ))}

        {/* Static Parked Car */}
        <div style={{ 
          position: 'absolute', 
          left: 45, // inside slot 1
          bottom: 4,
          width: 70, 
          height: 30,
        }}>
          <SedanSVG color="#fde047" />
        </div>
      </div>

      {/* Road */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        width: '100%', 
        height: 60, 
        backgroundColor: '#334155', 
        borderTop: borderStyle,
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Dashed line */}
        <div style={{ width: '100%', height: 4, borderTop: '4px dashed rgba(255,255,255,0.4)' }}></div>
      </div>

      {/* Passing Car 1 (Right to Left) */}
      <motion.div
        animate={{ left: ['100%', '-20%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        style={{
          position: 'absolute',
          bottom: 24,
          width: 70,
          height: 32,
          zIndex: 10,
          transform: 'scaleX(-1)' // face left
        }}
      >
        <HatchbackSVG color="#ef4444" />
      </motion.div>

      {/* Passing Car 2 (Left to Right) */}
      <motion.div
        animate={{ left: ['-20%', '100%'] }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear", delay: 1 }}
        style={{
          position: 'absolute',
          bottom: 4,
          width: 74,
          height: 31,
          zIndex: 10
        }}
      >
        <SedanSVG color="#3b82f6" />
      </motion.div>

      {/* Parking Car (Complex Animation) */}
      {/* Drives in from right, pulls into the second parking spot */}
      <motion.div
        animate={{
          left: ['100%', '38%', '38%', '38%', '100%'], // drives from right, stops, waits, leaves
          bottom: [22, 22, 64, 64, 64], // pulls up into the parallel parking slot
          opacity: [1, 1, 1, 0, 0] // disappears after a while so it can loop naturally
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          times: [0, 0.3, 0.4, 0.8, 1], // pacing
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: 74,
          height: 34,
          zIndex: 5, // behind passing cars
          transform: 'scaleX(-1)' // drive leftwards initially
        }}
      >
        <SuvSVG color="#10b981" />
      </motion.div>

    </div>
  );
}
