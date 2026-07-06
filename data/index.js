export const locations = [
  { id: 1, name: 'Mows Kochi Central', area: 'MG Road, Kochi', city: 'Kochi', seats: 120, avail: 'open', tags: ['24/7', 'Café', 'Parking'], amenities: ['High-speed Wi-Fi', 'Café & pantry', 'Meeting rooms', '24/7 access', 'Locker room', 'Parking', 'Phone booths', 'Printing'], hours: 'Mon–Sun, 24/7', since: '2021', videoId: 'ScMzIvxBSi4', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', priceMultiplier: 1.0 },
  { id: 2, name: 'Mows Infopark', area: 'Infopark, Kochi', city: 'Kochi', seats: 200, avail: 'limited', tags: ['Tech hub', 'Metro nearby'], amenities: ['High-speed Wi-Fi', 'Meeting rooms', 'Event space', 'Metro access', 'Cafeteria', 'Bike parking'], hours: 'Mon–Sat, 7am–11pm', since: '2022', videoId: '2VwsvrPFr9U', image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=800&auto=format&fit=crop', priceMultiplier: 0.9 },
  { id: 3, name: 'Mows Kakkanad', area: 'Kakkanad, Kochi', city: 'Kochi', seats: 80, avail: 'open', tags: ['Quiet zone', 'Near IT'], amenities: ['High-speed Wi-Fi', 'Quiet zones', 'Locker room', 'Parking', 'Coffee bar'], hours: 'Mon–Fri, 8am–10pm', since: '2023', videoId: '8NJD6lVR4-M', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop', priceMultiplier: 0.8 },
  { id: 4, name: 'Mows Thrissur Hub', area: 'Round South, Thrissur', city: 'Thrissur', seats: 60, avail: 'open', tags: ['City centre', 'Café'], amenities: ['High-speed Wi-Fi', 'Café', 'Meeting room', 'Parking', 'Printing'], hours: 'Mon–Sat, 8am–9pm', since: '2022', videoId: 'imuEMGxC3v4', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=800&auto=format&fit=crop', priceMultiplier: 0.75 },
  { id: 5, name: 'Mows Kozhikode Bay', area: 'Beach Road, Kozhikode', city: 'Kozhikode', seats: 90, avail: 'full', tags: ['Sea view', 'Events'], amenities: ['High-speed Wi-Fi', 'Event hall', 'Rooftop deck', 'Coffee bar', 'Meeting rooms'], hours: 'Mon–Sat, 9am–9pm', since: '2023', videoId: 'THNPmhBl-8I', image: 'https://images.unsplash.com/photo-1503144883582-dbf1d431c435?q=80&w=800&auto=format&fit=crop', priceMultiplier: 1.1 },
  { id: 6, name: 'Mows Calicut Tech', area: 'Cyberpark, Kozhikode', city: 'Kozhikode', seats: 110, avail: 'limited', tags: ['Cyberpark', '24/7'], amenities: ['High-speed Wi-Fi', '24/7 access', 'Cafeteria', 'Meeting rooms', 'Locker room', 'Phone booths'], hours: 'Mon–Sun, 24/7', since: '2024', videoId: 'nNVk7RRCbPE', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop', priceMultiplier: 0.95 },
];

export const plans = [
  { id: 'hot', name: 'Hot Desk', icon: '🪑', monthlyPrice: 3500, annualPrice: 2800, desc: 'Flexible daily access to any open desk. Great for freelancers and remote workers.', features: ['Any open desk', 'High-speed Wi-Fi', 'Tea & coffee', '2 meeting room hrs/mo'], missing: ['Dedicated desk', 'Storage locker', 'Business address'] },
  { id: 'dedicated', name: 'Dedicated Desk', icon: '🖥️', monthlyPrice: 7500, annualPrice: 6000, desc: 'Your own reserved desk, 24/7. Keep your setup exactly how you like it.', features: ['Reserved desk, 24/7', 'High-speed Wi-Fi', 'Tea & coffee', '8 meeting room hrs/mo', 'Storage locker'], missing: ['Private cabin', 'Business address'], popular: true },
  { id: 'cabin', name: 'Private Cabin', icon: '🚪', monthlyPrice: 18000, annualPrice: 14400, desc: 'Fully enclosed private office for individuals or small teams up to 4 people.', features: ['Private cabin, 24/7', 'High-speed Wi-Fi', 'Tea & coffee', 'Unlimited meeting hrs', 'Storage locker', 'Business address'], missing: [] },
  { id: 'team', name: 'Team Suite', icon: '🏢', monthlyPrice: null, annualPrice: null, desc: 'Branded team space for 5–20 people with full infrastructure and an account manager.', features: ['Dedicated floor space', 'Dedicated internet', 'Branded signage', 'Unlimited meeting hrs', 'Business address', 'Account manager'], missing: [] },
];

export const testimonials = [
  { name: 'Arjun Menon', role: 'Founder, StackSprint', location: 'Kochi Central', text: 'Mows gave us a real office feel without the overhead. We scaled from 2 to 8 people all within Mows and it never felt like a hassle.', rating: 5 },
  { name: 'Priya Nair', role: 'UX Designer, Freelance', location: 'Infopark', text: 'The Infopark location is incredible for networking. I landed two client projects just from conversations in the common area.', rating: 5 },
  { name: 'Vishnu Raj', role: 'CTO, Logibyte', location: 'Thrissur Hub', text: 'We moved our entire tech team here from a traditional office. Cost dropped by 60% and team morale actually went up.', rating: 5 },
  { name: 'Sreelakshmi K', role: 'Content Strategist', location: 'Kozhikode Bay', text: 'Working with a sea view every morning is honestly unfair to every other coworking space I have ever tried.', rating: 5 },
];

export const amenities = [
  { icon: 'wifi', label: 'High-speed Wi-Fi', desc: '1 Gbps dedicated fiber at every seat' },
  { icon: 'coffee', label: 'Café & pantry', desc: 'Unlimited tea, coffee and filtered water' },
  { icon: 'presentation', label: 'Meeting rooms', desc: 'Bookable rooms with AV and whiteboards' },
  { icon: 'clock-24', label: '24/7 access', desc: 'Key-card entry at select locations' },
  { icon: 'monitor', label: 'Studio Room', desc: 'Dedicated space for creators and podcasters' },
  { icon: 'gamepad', label: 'Game Center', desc: 'Unwind and network in our gaming lounge' },
  { icon: 'calendar', label: 'Event Space', desc: 'Host workshops and meetups seamlessly' },
  { icon: 'mail', label: 'Virtual Office', desc: 'Professional business address and mail handling' },
];

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Locations', path: '/locations' },
  { label: 'Spaces', path: '/spaces' },
  { label: 'Events', path: '/events' },
  { label: 'Community', path: '/community' },
  { label: 'Contact', path: '/contact' },
];

export const events = [
  { id: 1, title: 'Founders Networking Mixer', date: 'Oct 15, 2026', time: '6:00 PM', location: 'Mows Kochi Central', type: 'Networking', image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=800&auto=format&fit=crop', desc: 'Connect with fellow founders and investors over coffee and light refreshments.' },
  { id: 2, title: 'Intro to Web3 Development', date: 'Oct 18, 2026', time: '10:00 AM', location: 'Mows Infopark', type: 'Tech', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop', desc: 'A hands-on workshop covering smart contract basics and decentralized apps.' },
  { id: 3, title: 'UX Design Masterclass', date: 'Oct 22, 2026', time: '2:00 PM', location: 'Mows Thrissur Hub', type: 'Workshop', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop', desc: 'Learn the principles of accessible and high-converting user interfaces.' },
  { id: 4, title: 'Friday Sundowner', date: 'Oct 25, 2026', time: '5:30 PM', location: 'Mows Kozhikode Bay', type: 'Social', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop', desc: 'Unwind after a productive week with a sea-view sunset party.' },
  { id: 5, title: 'Pitch Deck Clinic', date: 'Oct 30, 2026', time: '11:00 AM', location: 'Mows Kakkanad', type: 'Business', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop', desc: 'Get your startup pitch deck reviewed live by industry experts.' },
  { id: 6, title: 'AI Automation Seminar', date: 'Nov 05, 2026', time: '3:00 PM', location: 'Mows Calicut Tech', type: 'Tech', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format&fit=crop', desc: 'Explore practical use cases for AI agents in daily workflows.' },
];
