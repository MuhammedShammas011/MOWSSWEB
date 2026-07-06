import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LocationsPage from './pages/LocationsPage';
import SpacesPage from './pages/SpacesPage';
import BookingPage from './pages/BookingPage';
import CommunityPage from './pages/CommunityPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [page, setPage] = useState('home');

  function renderPage() {
    switch (page) {
      case 'locations': return <LocationsPage onNavigate={setPage} />;
      case 'spaces': return <SpacesPage onNavigate={setPage} />;
      case 'booking': return <BookingPage onNavigate={setPage} />;
      case 'community': return <CommunityPage onNavigate={setPage} />;
      case 'contact': return <ContactPage onNavigate={setPage} />;
      default: return <HomePage onNavigate={setPage} />;
    }
  }

  const noFooter = ['booking'];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Navbar currentPage={page} onNavigate={setPage} />
      <main>{renderPage()}</main>
      {!noFooter.includes(page) && <Footer onNavigate={setPage} />}
    </div>
  );
}
