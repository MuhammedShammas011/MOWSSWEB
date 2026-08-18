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
import CustomPackagePage from './pages/CustomPackagePage';
import AmenityDetailPage from './pages/AmenityDetailPage';
import { AnimatePresence } from 'framer-motion';
import AnimatedPage from './components/AnimatedPage';

export default function App() {
  const [page, setPage] = useState(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path.startsWith('amenity-')) return 'amenity';
    return path || 'home';
  });
  const [bookingPlan, setBookingPlan] = useState('');
  const [amenitySlug, setAmenitySlug] = useState(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    return path.startsWith('amenity-') ? path.replace('amenity-', '') : '';
  });

  // Handle browser back/forward buttons (and swipe gestures)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      if (path.startsWith('amenity-')) {
        setAmenitySlug(path.replace('amenity-', ''));
        setPage('amenity');
      } else {
        setPage(path || 'home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top on every page change, unless there is a hash in the URL
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      // Small timeout to allow the page to render first
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    const [baseTarget, hash] = target.split('#');

    if (baseTarget === 'booking' && plan) setBookingPlan(plan);
    else if (baseTarget !== 'booking') setBookingPlan('');

    // Handle amenity sub-routes e.g. 'amenity/wifi' -> URL: /amenity-wifi
    if (baseTarget.startsWith('amenity/')) {
      const slug = baseTarget.replace('amenity/', '');
      setAmenitySlug(slug);
      window.history.pushState({}, '', `/amenity-${slug}${hash ? '#' + hash : ''}`);
      setPage('amenity');
      return;
    }

    if (page !== baseTarget) {
      const url = baseTarget === 'home' ? '/' : `/${baseTarget}`;
      window.history.pushState({}, '', `${url}${hash ? '#' + hash : ''}`);
      setPage(baseTarget);
    } else if (hash) {
      // If we are already on the page and just navigating to a hash
      window.history.pushState({}, '', `${window.location.pathname}#${hash}`);
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      case 'custom-package': return <AnimatedPage key="custom-package"><CustomPackagePage onNavigate={navigateTo} /></AnimatedPage>;
      case 'amenity': return <AnimatedPage key={`amenity-${amenitySlug}`}><AmenityDetailPage amenitySlug={amenitySlug} onNavigate={navigateTo} /></AnimatedPage>;
      default: return <AnimatedPage key="home"><HomePage onNavigate={navigateTo} /></AnimatedPage>;
    }
  }

  const noFooter = ['booking', 'custom-package'];

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

