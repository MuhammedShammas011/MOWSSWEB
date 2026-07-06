import mowsOutsideImg from '../assets/MowsOutside image.png';
import kozhikodeImg from '../assets/Kozhikode.png';
import perinthalmannaImg from '../assets/perinthalmanna.png';

export const locations = [
  {
    id: 1,
    name: 'Mows Manjeri',
    area: 'Bapputty By Pass, Thurakkal',
    city: 'Manjeri',
    seats: 250,
    avail: 'open',
    tags: ['Flagship', '24/7', 'Event Space'],
    amenities: ['High-speed Wi-Fi', 'Podcasting Studio', 'Photo Shoot Studio', 'Meeting Rooms', 'Game Center', 'Chill Zone', 'Private Cabins', 'Parking'],
    hours: 'Mon–Sun, 24/7',
    since: '2023',
    videoId: 'ScMzIvxBSi4',
    image: mowsOutsideImg
  },
  {
    id: 2,
    name: 'Mows Kozhikode',
    area: 'Cyberpark Area',
    city: 'Kozhikode',
    seats: 300,
    avail: 'coming soon',
    tags: ['Tech Hub', '24/7'],
    amenities: ['High-speed Wi-Fi', 'Meeting Rooms', 'Chill Zone', 'Private Cabins'],
    hours: 'Coming Soon',
    since: '2024',
    videoId: 'ScMzIvxBSi4',
    image: kozhikodeImg
  },
  {
    id: 3,
    name: 'Mows Perinthalmanna',
    area: 'City Center',
    city: 'Perinthalmanna',
    seats: 150,
    avail: 'coming soon',
    tags: ['Boutique', 'Event Space'],
    amenities: ['High-speed Wi-Fi', 'Meeting Rooms', 'Chill Zone'],
    hours: 'Coming Soon',
    since: '2024',
    videoId: 'ScMzIvxBSi4',
    image: perinthalmannaImg
  }
];

export const plans = [
  { id: 'daily', name: 'Daily Pass', icon: '🎫', monthlyPrice: 350, annualPrice: 3000, desc: 'Access to facilities for a single day including shared spaces.', features: ['High-speed internet', 'Shared spaces', 'Amenities'], missing: ['Dedicated desk', 'Storage locker'] },
  { id: '15day', name: '15-Day Pass', icon: '📆', monthlyPrice: 2500, annualPrice: 3000, desc: 'Ideal for short-term projects providing full access to shared spaces.', features: ['High-speed internet', 'Shared spaces', 'Amenities'], missing: ['Dedicated desk', 'Storage locker'] },
  { id: 'monthly_basic', name: 'Monthly Basic', icon: '🪑', monthlyPrice: 4800, annualPrice: 3000, desc: 'Flexible monthly access to group working spaces.', features: ['High-speed internet', '4 meeting room hours/mo', '1 tea/coffee per day'], missing: ['Dedicated desk', 'Storage locker'] },
  { id: 'monthly_pro', name: 'Monthly Pro', icon: '🖥️', monthlyPrice: 5300, annualPrice: 3000, desc: 'Premium monthly access to group working spaces.', features: ['High-speed internet', '6 meeting room hours/mo', '1 tea/coffee per day'], missing: ['Private cabin'], popular: true },
  { id: 'cabin', name: 'Single Cabin', icon: '🚪', monthlyPrice: 5999, annualPrice: 3000, desc: 'Secure, dedicated private cabin for focused work.', features: ['Private cabin', '8 meeting room hours/mo', '1 tea/coffee per day', 'Secure storage'], missing: [] },
  { id: 'group', name: 'Group Space', icon: '🏢', monthlyPrice: 14000, annualPrice: 3000, desc: 'Access to group working spaces for teams.', features: ['Dedicated group space', 'High-speed internet', 'All shared amenities'], missing: [] },
  { id: 'custom', name: 'Custom Package', icon: '💼', monthlyPrice: null, annualPrice: null, desc: 'Tailored office solutions for large teams and custom requirements.', features: ['Custom layout & branding', 'Dedicated internet bandwidth', '24/7 access control', 'Dedicated support manager'], missing: [] }
];

export const testimonials = [
  { name: 'Irfan', role: 'Freelancer', location: 'Manjeri', text: 'Perfect environment for a freelancer like myself to grow and network with like-minded professionals.', rating: 5 },
  { name: 'Habeeb', role: 'Startup Founder', location: 'Manjeri', text: 'Excellent work space. The management team and staff are extremely helpful and supportive. The environment and the facilities are awesome. My staff are happy and more productive.', rating: 5 },
  { name: 'Fathima', role: 'UI/UX Designer', location: 'Manjeri', text: 'The vibe here is incredible. I used to struggle with productivity at home, but since joining Mows I get more done in 4 hours than I used to in a whole day. The podcast studio is a bonus!', rating: 5 },
  { name: 'Shafeeq', role: 'Software Engineer', location: 'Manjeri', text: 'High-speed internet, great coffee, and a buzzing community of tech folks. It does not get better than this for a developer looking to stay focused and connected.', rating: 5 },
  { name: 'Aneesh', role: 'Content Creator', location: 'Manjeri', text: 'The photo and podcast studios alone are worth the membership. Everything is professionally set up and the staff are always around to help. Highly recommended for any creator.', rating: 5 },
  { name: 'Riya', role: 'Marketing Consultant', location: 'Manjeri', text: 'I have been a member for over a year and I keep renewing because there is simply no better workspace in Manjeri. The community events are a brilliant way to network too.', rating: 5 },
];

export const amenities = [
  { icon: 'wifi', label: 'High-speed Wi-Fi', desc: 'Enterprise-grade seamless internet connectivity' },
  { icon: 'coffee', label: 'Chill Zone', desc: 'Cozy pantry area stocked with snacks, tea & coffee' },
  { icon: 'presentation', label: 'Meeting Rooms', desc: 'AV tools, projectors, microphones & whiteboards' },
  { icon: 'mic', label: 'Podcasting Studio', desc: 'Soundproofed studio with high-quality microphones' },
  { icon: 'camera', label: 'Photo Shoot Studio', desc: 'Professional-grade lighting and backdrops' },
  { icon: 'gamepad', label: 'Game Center', desc: 'Board games and video games to unwind and recharge' },
  { icon: 'lock', label: 'Secure Lockers', desc: 'Personal cabinets for secure storage' },
  { icon: 'car', label: 'Parking', desc: 'Convenient car/bike parking on-site' },
];

export const navLinks = [
  { label: 'Locations', path: '/locations' },
  { label: 'Spaces', path: '/spaces' },
  { label: 'Events', path: '/events' },
  { label: 'Community', path: '/community' },
  { label: 'Contact', path: '/contact' },
];

export const events = [
  { id: 1, title: 'Founders Networking Mixer', date: 'Oct 15, 2026', time: '6:00 PM', location: 'Mows Manjeri', type: 'Networking', image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=800&auto=format&fit=crop', desc: 'Connect with fellow founders and investors over coffee and light refreshments.' },
  { id: 2, title: 'Intro to Web Development', date: 'Jul 18, 2026', time: '10:00 AM', location: 'Mows Manjeri', type: 'Tech', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop', desc: 'A hands-on workshop covering smart contract basics and decentralized apps.' },
  { id: 3, title: 'UX Design Masterclass', date: 'Oct 22, 2026', time: '2:00 PM', location: 'Mows Manjeri', type: 'Workshop', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop', desc: 'Learn the principles of accessible and high-converting user interfaces.' },
  { id: 4, title: 'Friday Sundowner', date: 'Aug 25, 2026', time: '5:30 PM', location: 'Mows Manjeri', type: 'Social', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop', desc: 'Unwind after a productive week with a sea-view sunset party.' },
];
