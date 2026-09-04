import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import { ArrowLeft, Wifi, Coffee, MonitorPlay, Mic, Camera, Gamepad2, Lock, Car } from 'lucide-react';

const textDark = '#13221C';
const textLight = '#174F50';
const yellow = '#fde047';
const bg = '#fcfaf5';

const amenityDetails = {
  wifi: {
    icon: <Wifi size={48} strokeWidth={2} />,
    label: 'High-speed Wi-Fi',
    tagline: 'Blazing-fast connectivity, everywhere.',
    color: '#93c5fd',
    description: 'Our enterprise-grade fibre internet ensures you stay connected without interruptions — whether you\'re on a video call, running a live stream, or transferring large files.',
    features: [
      { title: '1 Gbps Fibre Line', desc: 'Dedicated high-speed fibre backbone ensures consistent download and upload speeds throughout the day.' },
      { title: 'Zero Buffering', desc: 'Low-latency network configuration means video calls, cloud tools, and VPNs work without a hitch.' },
      { title: 'Separate SSIDs', desc: 'Dedicated member networks and guest networks keep your work data isolated and secure.' },
      { title: '24/7 Uptime', desc: 'Redundant ISP connections ensure we have zero downtime, even during peak hours.' },
      { title: 'Secure WPA3 Encryption', desc: 'Military-grade Wi-Fi security protects your data from unauthorised access on the network.' },
      { title: 'Wired Access Available', desc: 'Ethernet ports at every dedicated desk for the fastest, most stable connection possible.' },
    ],
  },
  coffee: {
    icon: <Coffee size={48} strokeWidth={2} />,
    label: 'Chill Zone',
    tagline: 'Your daily dose of fuel and calm.',
    color: '#fde047',
    description: 'Step away from your desk and recharge in our fully stocked chill zone. Great ideas are born during a good break, and we\'ve designed every corner of it to inspire casual connection and creativity.',
    features: [
      { title: 'Barista-Quality Coffee', desc: 'Premium bean-to-cup coffee machine with espresso, latte, cappuccino, and more — available all day.' },
      { title: 'Herbal Teas & Infusions', desc: 'A curated selection of Darjeeling, green, and herbal teas for a calm afternoon pick-me-up.' },
      { title: 'Snack Bar', desc: 'Healthy snacks, biscuits, and seasonal fresh fruits available throughout the day for members.' },
      { title: 'Lounge Seating', desc: 'Comfortable sofas, bean bags, and informal seating for casual meetings or a relaxed break.' },
      { title: 'Reading Corner', desc: 'A small curated library of business, design, and self-development books to browse at leisure.' },
      { title: 'Micro-Kitchen Access', desc: 'Refrigerator, microwave, and washing station for members who bring home-cooked lunches.' },
    ],
  },
  presentation: {
    icon: <MonitorPlay size={48} strokeWidth={2} />,
    label: 'Meeting Rooms',
    tagline: 'Close the deal in the right room.',
    color: '#86efac',
    description: 'Our professional meeting rooms are equipped with everything you need to run presentations, workshops, client pitches, or team standups without friction.',
    features: [
      { title: '4K Projector & Screen', desc: 'Crystal-clear projection in a dedicated darkened environment ideal for client presentations.' },
      { title: 'Wireless Casting', desc: 'Instantly share your screen from any laptop or phone via AirPlay, Chromecast, or HDMI.' },
      { title: 'Acoustic Panels', desc: 'Soundproofed walls ensure your meetings are private and free from external noise distraction.' },
      { title: 'Whiteboard & Markers', desc: 'Full-wall magnetic whiteboards with coloured markers for ideation and strategy sessions.' },
      { title: 'HD Conference Camera', desc: 'Wide-angle conference camera with built-in noise cancellation for seamless remote calls.' },
      { title: 'Flexible Layouts', desc: 'Tables and chairs can be rearranged from boardroom to classroom or workshop configurations.' },
    ],
  },
  mic: {
    icon: <Mic size={48} strokeWidth={2} />,
    label: 'Podcasting Studio',
    tagline: 'Record your voice. Own your audience.',
    color: '#d8b4fe',
    description: 'Our fully soundproofed podcasting studio is ready for recording at professional quality. Whether you\'re starting a show or recording your hundredth episode, we have the gear and space to match your ambition.',
    features: [
      { title: 'Professional Microphones', desc: 'Shure SM7B and Rode PodMic setups for broadcast-quality voice capture with zero background noise.' },
      { title: 'Acoustic Treatment', desc: 'Floor-to-ceiling acoustic foam panels for studio-grade sound isolation in every recording.' },
      { title: 'Multi-track Recording', desc: 'Record up to 4 simultaneous tracks for multi-host podcast sessions with individual level control.' },
      { title: 'Headphones & Monitoring', desc: 'Professional closed-back headphones for each host with dedicated monitoring amplifiers.' },
      { title: 'Pop Filters & Boom Arms', desc: 'Pre-configured boom arm and pop shield setups at every mic position for a clean sound.' },
      { title: 'Session Scheduling', desc: 'Easy booking through the member app — 1-hour and half-day slots available for your sessions.' },
    ],
  },
  camera: {
    icon: <Camera size={48} strokeWidth={2} />,
    label: 'Photo Shoot Studio',
    tagline: 'Frame your brand perfectly.',
    color: '#fca5a5',
    description: 'Our professional photo studio gives creators, entrepreneurs, and brands a polished space to produce product photos, headshots, reels, and branded content without needing to rent an expensive external studio.',
    features: [
      { title: 'Studio Lighting', desc: 'Adjustable softboxes, ring lights, and LED panels for professional, consistent lighting in every shot.' },
      { title: 'Multiple Backdrops', desc: 'White, black, grey, and custom printed backgrounds available for varied shooting styles.' },
      { title: 'Product Photography Setup', desc: 'Turntable and macro lighting for 360-degree product shoots, ideal for e-commerce brands.' },
      { title: 'Reflectors & Diffusers', desc: 'Full kit of reflectors and light diffusers available for natural-light looks even indoors.' },
      { title: 'Tripods & Gimbals', desc: 'Heavy-duty tripods and smartphone gimbals for content creators shooting video and reels.' },
      { title: 'Green Screen Area', desc: 'Collapsible chroma-key green screen for virtual backgrounds and post-production compositing.' },
    ],
  },
  gamepad: {
    icon: <Gamepad2 size={48} strokeWidth={2} />,
    label: 'Game Center',
    tagline: 'Work hard. Play harder.',
    color: '#fdba74',
    description: 'Recharge your creativity and build team rapport in our dedicated game center. The best collaborations happen when you\'re relaxed, and our game corner makes sure you don\'t burn out.',
    features: [
      { title: 'Console Gaming', desc: 'PlayStation 5 and Nintendo Switch consoles with a rotating library of popular titles for quick sessions.' },
      { title: 'Board Games Library', desc: 'Curated collection of strategy, party, and cooperative board games for members and their guests.' },
      { title: 'Table Tennis', desc: 'Professional-grade ping pong table available for friendly tournaments or a quick stress-relief game.' },
      { title: 'Foosball Table', desc: 'A classic foosball table that never fails to spark a lively, competitive atmosphere.' },
      { title: 'Quiet Gaming Nook', desc: 'Secluded alcove with headsets for solo gaming during lunch or after-work hours.' },
      { title: 'Community Tournaments', desc: 'Monthly gaming tournaments and leaderboards to foster friendly competition across the member community.' },
    ],
  },
  lock: {
    icon: <Lock size={48} strokeWidth={2} />,
    label: 'Secure Lockers',
    tagline: 'Your belongings are safe with us.',
    color: '#a5f3fc',
    description: 'Every member has access to a personal, lockable locker to safely store laptops, documents, and valuables throughout the day so you can step out without worry.',
    features: [
      { title: 'Personal Combination Lock', desc: 'Each locker comes with a programmable combination lock — only you know the code.' },
      { title: 'Laptop-Sized Compartments', desc: 'Generously sized to fit a 15" laptop, charger, personal items, and small accessories.' },
      { title: '24/7 CCTV Coverage', desc: 'The locker area is monitored round the clock by CCTV cameras for your peace of mind.' },
      { title: 'Dedicated Assigned Locker', desc: 'Monthly and annual members get a dedicated locker assigned just to them for the entire period.' },
      { title: 'Day-Use Lockers', desc: 'Hot desk and daily pass members can use day-use lockers on a first-come, first-served basis.' },
      { title: 'Parcel Receipt Service', desc: 'Our front-desk staff can receive courier deliveries and store them securely in your locker.' },
    ],
  },
  car: {
    icon: <Car size={48} strokeWidth={2} />,
    label: 'Parking',
    tagline: 'Hassle-free arrival, every time.',
    color: '#bbf7d0',
    description: 'Arriving at Mows should be the easiest part of your day. We offer convenient on-site parking for cars and bikes so you can focus on what matters once you walk through the door.',
    features: [
      { title: 'Covered Car Parking', desc: 'Dedicated covered parking bays for members with monthly and annual membership plans.' },
      { title: 'Bike & Scooter Zone', desc: 'Separate secure area for two-wheelers with easy access to the main entrance.' },
      { title: 'Visitor Parking', desc: 'Reserved visitor spots available for your clients and meeting guests at no additional charge.' },
      { title: 'EV Charging Points', desc: 'Electric vehicle charging stations available for members with compatible EVs and e-scooters.' },
      { title: 'CCTV Monitored', desc: 'The entire parking area is under 24/7 CCTV surveillance for the security of all vehicles.' },
      { title: 'Reserved Spots', desc: 'Premium members can reserve a named spot, guaranteeing a space even on the busiest days.' },
    ],
  },
};

export default function AmenityDetailPage({ amenitySlug, onNavigate }) {
  const amenity = amenityDetails[amenitySlug];
  useSEO({ title: amenity ? `${amenity.label} | Mows Amenities` : 'Amenity | Mows', description: amenity?.description || '', url: `/amenity-${amenitySlug}` });

  function goBackToAmenities() {
    onNavigate('home#amenities-section');
  }

  if (!amenity) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 900, color: textDark }}>Amenity not found.</p>
          <button onClick={goBackToAmenities} style={{ marginTop: 16, padding: '12px 24px', background: yellow, border: '3px solid #13221C', borderRadius: 8, fontWeight: 900, cursor: 'pointer', boxShadow: '4px 4px 0px #13221C' }}>← Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ color: textDark, minHeight: '100vh', background: bg, backgroundImage: 'linear-gradient(rgba(19, 34, 28, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 34, 28, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>

      {/* Hero */}
      <section style={{ padding: '8rem 4vw 5rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.button
          onClick={goBackToAmenities}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '2.5rem', background: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 900, cursor: 'pointer', boxShadow: '4px 4px 0px #13221C', textTransform: 'uppercase', color: textDark, transition: 'all 0.15s' }}
          whileHover={{ x: -3, boxShadow: '6px 6px 0px #13221C' }}
        >
          <ArrowLeft size={16} strokeWidth={3} /> Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '3rem', flexWrap: 'wrap' }}
        >
          <div style={{ width: 96, height: 96, borderRadius: 16, background: amenity.color, border: '4px solid #13221C', boxShadow: '6px 6px 0px #13221C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: textDark }}>
            {amenity.icon}
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontSize: 13, color: '#fff', background: '#174F50', display: 'inline-block', padding: '6px 14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800, border: '2px solid #13221C', boxShadow: '3px 3px 0px #13221C' }}>Mows Amenity</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, margin: '0 0 0.5rem', lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-0.02em', color: textDark }}>{amenity.label}</h1>
            <p style={{ fontSize: 20, fontWeight: 700, color: textLight, margin: '0 0 1.5rem' }}>{amenity.tagline}</p>
            <p style={{ fontSize: 16, color: textDark, lineHeight: 1.8, maxWidth: 640, fontWeight: 500 }}>{amenity.description}</p>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div style={{ width: '100%', height: 4, background: textDark }} />

      {/* Features */}
      <section style={{ padding: '5rem 4vw 8rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 2.5rem', color: textDark }}
        >What's Included</motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {amenity.features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ background: '#fff', border: '3px solid #13221C', borderRadius: 12, padding: '2rem', boxShadow: '6px 6px 0px #13221C', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: amenity.color, borderBottom: '2px solid #13221C' }} />
              <p style={{ fontSize: 12, fontWeight: 900, color: textLight, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 10px' }}>0{i + 1}</p>
              <h3 style={{ fontSize: 18, fontWeight: 900, margin: '0 0 10px', color: textDark, textTransform: 'uppercase' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#555', margin: 0, lineHeight: 1.7, fontWeight: 500 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '0 4vw 8rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ background: amenity.color, border: '4px solid #13221C', borderRadius: 16, padding: '3.5rem 3rem', textAlign: 'center', boxShadow: '12px 12px 0px #13221C', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: 16, left: 20, fontSize: 64, opacity: 0.1, pointerEvents: 'none', userSelect: 'none' }}>✦</div>
          <div style={{ position: 'absolute', bottom: 16, right: 24, fontSize: 80, opacity: 0.1, pointerEvents: 'none', userSelect: 'none' }}>✦</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, margin: '0 0 1rem', textTransform: 'uppercase', color: textDark }}>Ready to experience this?</h2>
          <p style={{ fontSize: 16, color: textDark, margin: '0 auto 2rem', maxWidth: 480, lineHeight: 1.6, fontWeight: 700, opacity: 0.85 }}>Every Mows membership gives you unlimited access to {amenity.label.toLowerCase()} and all our other world-class amenities.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('booking')}
              style={{ background: textDark, color: '#fff', border: '3px solid #13221C', borderRadius: 8, padding: '14px 28px', fontSize: 15, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '6px 6px 0px rgba(0,0,0,0.3)', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '8px 8px 0px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '6px 6px 0px rgba(0,0,0,0.3)'; }}
            >Book a Desk →</button>
            <button
              onClick={goBackToAmenities}
              style={{ background: '#fff', color: textDark, border: '3px solid #13221C', borderRadius: 8, padding: '14px 28px', fontSize: 15, fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '4px 4px 0px #13221C', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px #13221C'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0px #13221C'; }}
            >← Back to Home</button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
