import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Phone, ShoppingBag, Instagram, ChevronRight, Star, MapPin, 
  Mail, Clock, ArrowRight, Menu, X, Utensils, Flame, Sparkles, 
  CheckCircle, MessageSquare, ShieldCheck, ChevronLeft
} from 'lucide-react';

import { MenuItem, CartItem, Review } from './types';
import { REVIEWS } from './data/menuData';
import BookingModal from './components/BookingModal';
import OrderDrawer from './components/OrderDrawer';
import MobileMenu from './components/MobileMenu';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import WaitlistModal from './components/WaitlistModal';
import BanquetModal from './components/BanquetModal';
import LegalModal from './components/LegalModal';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingExperience, setBookingExperience] = useState<'dining' | 'shisha'>('dining');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isBanquetOpen, setIsBanquetOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms'>('privacy');
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const headerSolid = isScrolled || !isHomePage;

  // Cart state stored in localStorage for maximum persistence and polish
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zahra_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing cart from localStorage:', e);
      return [];
    }
  });

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSuccess, setIsContactSuccess] = useState(false);

  // Active review carousel state
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Store cart in localStorage
  useEffect(() => {
    localStorage.setItem('zahra_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle header scroll transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change (if no hash)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  // Prevent scrolling when modals are open
  useEffect(() => {
    if (isWaitlistOpen || isBanquetOpen || isBookingOpen || isCartOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isWaitlistOpen, isBanquetOpen, isBookingOpen, isCartOpen, isMobileMenuOpen]);

  // Sync review auto-advance carousel (every 6s)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleAddItemToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItem.id === item.id);
      if (existing) {
        return prev.map(i => i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const handleOpenBooking = (exp: 'dining' | 'shisha') => {
    setBookingExperience(exp);
    setIsBookingOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactEmail || !contactMessage) {
      alert('Please fill in all contact details.');
      return;
    }
    setIsContactSubmitting(true);
    setTimeout(() => {
      setIsContactSubmitting(false);
      setIsContactSuccess(true);
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactMessage('');
    }, 1500);
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1C1A17] font-sans antialiased selection:bg-[#bd5e2d] selection:text-white min-h-screen overflow-x-hidden">
      
      {/* --- ELITE HEADER UTILITY --- */}
      <header className={`fixed top-0 w-full z-45 transition-all duration-200 ${headerSolid ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/50 py-2 shadow-sm' : 'bg-transparent py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          
          {/* Brand Identity Block */}
          <Link to="/" className="flex flex-col group cursor-pointer">
            <span className={`text-sm sm:text-base font-bold tracking-[0.25em] font-sans transition-colors ${headerSolid ? 'text-neutral-900' : 'text-white'}`}>ZAHRA</span>
            <span className={`text-[9px] uppercase tracking-[0.22em] font-medium mt-0.5 ${headerSolid ? 'text-neutral-400' : 'text-neutral-300'}`}>• SURRY HILLS •</span>
          </Link>

          {/* Inline Navigation Links (Desktop) */}
          <nav className={`hidden lg:flex items-center space-x-1.5 text-[11px] font-semibold tracking-[0.18em] ${headerSolid ? 'text-neutral-600' : 'text-neutral-200'}`}>
            {[
              { name: 'HOME', href: '/' },
              { name: 'MENU', href: '/menu' },
              { name: 'BANQUETS', action: () => setIsBanquetOpen(true) },
              { name: 'WAITLIST', action: () => setIsWaitlistOpen(true) },
              { name: 'RESERVATIONS', action: () => setIsBookingOpen(true) },
              { name: 'OUR STORY', href: '/#story' },
              { name: 'CONTACT', href: '/#contact' }
            ].map((link) => (
              link.href ? (
                  <Link
                    key={link.name} 
                    to={link.href} 
                    onClick={(e) => {
                      if (link.href.includes('#')) {
                        if (location.pathname === '/') {
                          e.preventDefault();
                          const id = link.href.split('#')[1];
                          const el = document.querySelector('#' + id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        window.scrollTo(0, 0);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-[4px] transition-all duration-150 ${headerSolid ? 'hover:text-neutral-900 hover:bg-neutral-100' : 'hover:text-white hover:bg-white/10'}`}
                  >
                    {link.name}
                  </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={link.action}
                  className={`px-3.5 py-2 rounded-[4px] transition-all duration-150 ${headerSolid ? 'hover:text-neutral-900 hover:bg-neutral-100' : 'hover:text-white hover:bg-white/10'}`}
                >
                  {link.name}
                </button>
              )
            ))}
          </nav>

          {/* Action Arrays */}
          <div className="flex items-center gap-3">
            <a href="tel:0283104420" className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] border text-[11px] font-semibold tracking-[0.15em] transition-all ${headerSolid ? 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100' : 'bg-white/5 border-white/10 text-neutral-200 hover:bg-white/15'}`}>
              <Phone size={12} className="text-[#bd5e2d]" /> (02) 8310 4420
            </a>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 bg-[#bd5e2d] hover:bg-[#a64e22] text-white font-semibold text-[11px] tracking-[0.15em] rounded-[4px] uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag size={13} />
              <span>ORDER</span>
              {cartTotalItems > 0 && (
                <span className="bg-white text-[#bd5e2d] font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-1.5 rounded-[4px] lg:hidden transition-colors ${headerSolid ? 'text-neutral-600 hover:text-black hover:bg-neutral-100' : 'text-neutral-200 hover:text-white hover:bg-white/10'}`}
              aria-label="Open Mobile Menu"
            >
              <Menu size={20} />
            </button>
            
            <a 
              href="#instagram"
              onClick={(e) => e.preventDefault()}
              className={`p-1.5 rounded-[4px] transition-colors hidden sm:inline-block ${headerSolid ? 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100' : 'text-neutral-300 hover:text-white hover:bg-white/10'}`} 
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage handleOpenBooking={handleOpenBooking} />} />
          <Route path="/menu" element={<MenuPage handleAddItemToCart={handleAddItemToCart} setIsCartOpen={setIsCartOpen} cart={cart} />} />
        </Routes>
      </main>

      {/* --- FORM ARRAY ARCHITECTURE --- */}
      <section className="py-16 md:py-24 bg-white text-black border-t border-neutral-100" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-8 lg:gap-16">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <span className="text-sm font-semibold tracking-[0.3em] text-[#bd5e2d] uppercase block">GET IN TOUCH</span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 leading-tight uppercase">REACH OUR TEAM</h2>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed font-light">
              Tables of ten or more, a private room, or catering for a gathering off-site — send a note and a host will reply.
            </p>
            
            <div className="pt-6 space-y-4 text-sm text-neutral-600 border-t border-neutral-100">
              <p><strong className="text-neutral-900 font-semibold tracking-wider text-xs block mb-1">DIRECT CALL</strong>
                <a href="tel:0283104420" className="text-base text-[#bd5e2d] hover:underline transition-all">(02) 8310 4420</a>
              </p>
              <p className="pt-2"><strong className="text-neutral-900 font-semibold tracking-wider text-xs block mb-1">EMAIL INQUIRIES</strong>
                <a href="mailto:hello@zahra.kitchen" className="text-base text-neutral-800 hover:text-[#bd5e2d] hover:underline transition-all">hello@zahra.kitchen</a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-neutral-50 p-8 sm:p-10 rounded-[4px] border border-neutral-200/50 shadow-xs relative">
            <AnimatePresence mode="wait">
              {!isContactSuccess ? (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] sm:text-xs font-bold tracking-wider text-neutral-500 uppercase">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe" 
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 focus:border-[#bd5e2d] focus:outline-none rounded-[3px] text-xs sm:text-sm transition-colors text-black placeholder-neutral-400" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] sm:text-xs font-bold tracking-wider text-neutral-500 uppercase">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="0412 345 678" 
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 focus:border-[#bd5e2d] focus:outline-none rounded-[3px] text-xs sm:text-sm transition-colors text-black placeholder-neutral-400" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] sm:text-xs font-bold tracking-wider text-neutral-500 uppercase">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="your@email.com" 
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 focus:border-[#bd5e2d] focus:outline-none rounded-[3px] text-xs sm:text-sm transition-colors text-black placeholder-neutral-400" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold tracking-wider text-neutral-500 uppercase">Message *</label>
                    <textarea 
                      rows={4} 
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us about your event, dietary queries, or general requests..." 
                      className="w-full px-4 py-2.5 bg-white border border-neutral-200 focus:border-[#bd5e2d] focus:outline-none rounded-[3px] text-xs sm:text-sm transition-colors resize-none text-black placeholder-neutral-400" 
                    />
                  </div>

                  <div className="pt-1">
                    <button 
                      type="submit" 
                      disabled={isContactSubmitting}
                      className="px-6 py-3.5 bg-neutral-900 hover:bg-[#bd5e2d] disabled:bg-neutral-400 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-[3px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                    >
                      {isContactSubmitting ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        'SEND MESSAGE'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="flex justify-center text-[#bd5e2d]">
                    <CheckCircle size={44} className="text-[#bd5e2d]" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold tracking-wide text-neutral-900 uppercase">ENQUIRY TRANSMITTED</h3>
                    <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed mt-1 font-light">
                      Thanks. A Zahra host will reply within one business day.
                    </p>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={() => setIsContactSuccess(false)}
                      className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-[3px] transition-all"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-neutral-950 border-t border-neutral-900 pt-10 pb-6 text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex flex-col cursor-pointer group">
              <span className="text-2xl font-extrabold font-sans tracking-widest text-white group-hover:text-[#bd5e2d] transition-colors">ZAHRA</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold mt-1">• Lebanese Cuisine • Shisha • Dessert</span>
            </Link>
            <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-sm">
              A Lebanese kitchen and shisha lounge in Surry Hills. Charcoal grill, shared mezze, sweets, and a deck for the later hours.
            </p>
            <div className="flex gap-2.5 pt-1">
              <a 
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="Instagram Link"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4 text-xs sm:text-sm">
            <h4 className="font-bold tracking-widest text-white uppercase text-xs">RESTAURANT HOURS</h4>
            <div className="space-y-2 font-light text-neutral-400">
              <div className="flex justify-between max-w-xs">
                <span>Tuesday - Thursday:</span>
                <span className="text-white font-medium">5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Friday - Saturday:</span>
                <span className="text-white font-medium">5:00 PM - 12:00 AM</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Sunday:</span>
                <span className="text-white font-medium">5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between max-w-xs border-t border-neutral-900 pt-2">
                <span>Monday:</span>
                <span className="text-neutral-500 font-bold">CLOSED</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4 text-xs sm:text-sm">
            <h4 className="font-bold tracking-widest text-white uppercase text-xs">QUICK NAVIGATION</h4>
            <div className="grid grid-cols-2 gap-3 font-bold tracking-wider">
              {[
                { name: 'HOME', href: '/' },
                { name: 'MENU', href: '/menu' },
                { name: 'BANQUETS', action: () => setIsBanquetOpen(true) },
                { name: 'WAITLIST', action: () => setIsWaitlistOpen(true) },
                { name: 'BOOKINGS', action: () => setIsBookingOpen(true) },
                { name: 'OUR STORY', href: '/#story' },
                { name: 'CONTACT', href: '/#contact' },
                { name: 'DIRECTIONS', href: 'https://maps.google.com/?q=48+Crown+Street+Surry+Hills+NSW+2010' }
              ].map(l => (
                l.action ? (
                  <button
                    key={l.name}
                    onClick={l.action}
                    className="hover:text-white hover:underline transition-colors uppercase text-xs text-left"
                  >
                    {l.name}
                  </button>
                ) : l.href?.startsWith('http') ? (
                  <a
                    key={l.name}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors uppercase text-xs"
                  >
                    {l.name}
                  </a>
                ) : (
                  <Link
                    key={l.name}
                    to={l.href!}
                    onClick={(e) => {
                      if (l.href?.includes('#') && location.pathname === '/') {
                        e.preventDefault();
                        const id = l.href.split('#')[1];
                        const el = document.querySelector('#' + id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else if (!l.href?.includes('#')) {
                        window.scrollTo(0, 0);
                      }
                    }}
                    className="hover:text-white hover:underline transition-colors uppercase text-xs"
                  >
                    {l.name}
                  </Link>
                )
              ))}
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs tracking-widest font-bold uppercase space-y-2 sm:space-y-0 text-neutral-600">
          <p>© {new Date().getFullYear()} ZAHRA SURRY HILLS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <button onClick={() => { setLegalType('privacy'); setIsLegalOpen(true); }} className="hover:text-neutral-400 transition-colors cursor-pointer">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => { setLegalType('terms'); setIsLegalOpen(true); }} className="hover:text-neutral-400 transition-colors cursor-pointer">Terms &amp; Conditions</button>
          </div>
        </div>
      </footer>

      {/* --- FLOATING DIALOG OVERLAYS --- */}
      
      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      {/* Banquet Modal */}
      <BanquetModal
        isOpen={isBanquetOpen}
        onClose={() => setIsBanquetOpen(false)}
      />

      {/* Legal Modal */}
      <LegalModal 
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        type={legalType}
      />

      {/* Booking Reservation Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialExperience={bookingExperience}
      />

      {/* Online Order Cart Slide-Over Drawer */}
      <OrderDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        setCart={setCart}
      />

      {/* Mobile Burguer Drawer Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onOpenBooking={() => handleOpenBooking('dining')}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWaitlist={() => setIsWaitlistOpen(true)}
        onOpenBanquet={() => setIsBanquetOpen(true)}
        cartCount={cartTotalItems}
      />

    </div>
  );
}
