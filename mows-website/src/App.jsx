import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LocationsPage from './pages/LocationsPage';
import SpacesPage from './pages/SpacesPage';
import BookingPage from './pages/BookingPage';
import CommunityPage from './pages/CommunityPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import { AnimatePresence } from 'framer-motion';
import AnimatedPage from './components/AnimatedPage';

export default function App() {
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('p') || 'home';
  });
  const [bookingPlan, setBookingPlan] = useState('');

  // Handle browser back/forward buttons (and swipe gestures)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setPage(params.get('p') || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Handle Backspace to return to home page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace' && page !== 'home') {
        const active = document.activeElement;
        // Do not redirect if the user is typing in an input field
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
          return;
        }
        navigateTo('home');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page]);

  function navigateTo(target, plan = '') {
    if (target === 'booking' && plan) setBookingPlan(plan);
    else if (target !== 'booking') setBookingPlan('');
    
    if (page !== target) {
      const url = target === 'home' ? window.location.pathname : `?p=${target}`;
      window.history.pushState({}, '', url);
      setPage(target);
    }
  }

  function renderPage() {
    switch (page) {
      case 'locations': return <AnimatedPage key="locations"><LocationsPage onNavigate={navigateTo} /></AnimatedPage>;
      case 'spaces': return <AnimatedPage key="spaces"><SpacesPage onNavigate={navigateTo} /></AnimatedPage>;
      case 'booking': return <AnimatedPage key="booking"><BookingPage onNavigate={navigateTo} preselectedPlan={bookingPlan} /></AnimatedPage>;
      case 'community': return <AnimatedPage key="community"><CommunityPage onNavigate={navigateTo} /></AnimatedPage>;
      case 'events': return <AnimatedPage key="events"><EventsPage onNavigate={navigateTo} /></AnimatedPage>;
      case 'contact': return <AnimatedPage key="contact"><ContactPage onNavigate={navigateTo} /></AnimatedPage>;
      default: return <AnimatedPage key="home"><HomePage onNavigate={navigateTo} /></AnimatedPage>;
    }
  }

  const noFooter = ['booking'];

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap" rel="stylesheet" />
      <Navbar currentPage={page} onNavigate={navigateTo} />
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
      {!noFooter.includes(page) && <Footer onNavigate={navigateTo} />}
    </div>
  );
}

