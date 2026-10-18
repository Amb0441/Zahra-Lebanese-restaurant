import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Phone, Sparkles, Star, MapPin, 
  Mail, Clock, Instagram, ChevronRight
} from 'lucide-react';
import { REVIEWS } from '../data/menuData';

interface HomePageProps {
  handleOpenBooking: (exp: 'dining' | 'shisha') => void;
}

export default function HomePage({ handleOpenBooking }: HomePageProps) {
  const [activeReviewIndex, setActiveReviewIndex] = React.useState(0);

  // Sync review auto-advance carousel (every 6s)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex(prev => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
                  {/* --- ASYMMETRIC SPLIT HERO --- */}
      <section className="relative min-h-[100vh] w-full bg-[#0a0a0a] flex items-center pt-20 pb-20 overflow-hidden">
        
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full bg-gradient-to-l from-neutral-900/50 to-transparent" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Typography & Actions */}
          <div className="flex flex-col items-start pt-12 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-8 bg-[#bd5e2d]" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#bd5e2d] uppercase">
                Lebanese kitchen & shisha deck
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.1] mb-6"
            >
              Charcoal, <br />
              <span className="italic font-light text-neutral-400">mezze</span> <br />
              and late light
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm sm:text-base text-neutral-400 font-light max-w-md leading-relaxed mb-10"
            >
              Zahra is a Lebanese restaurant in Surry Hills. Share cold and hot mezze, skewers from the grill, and sweets, then stay on for the lounge.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => handleOpenBooking('dining')}
                className="w-full sm:w-auto px-8 py-4 bg-[#bd5e2d] hover:bg-[#a65227] text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all"
              >
                Reserve a Table
              </button>
              
              <Link 
                to="/menu"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-neutral-800 hover:border-neutral-600 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all"
              >
                Explore Menu
                <ChevronRight size={14} className="text-[#bd5e2d]" />
              </Link>
            </motion.div>

            {/* Quick Stats / Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 grid grid-cols-2 gap-8 border-t border-neutral-800 pt-8 w-full max-w-md"
            >
              <div>
                <div className="text-[#bd5e2d] font-serif text-2xl mb-1">Authentic</div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Charcoal Grill</div>
              </div>
              <div>
                <div className="text-[#bd5e2d] font-serif text-2xl mb-1">Premium</div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Shisha Lounge</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Asymmetric Image Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[700px] w-full mt-12 lg:mt-0"
          >
            {/* Main Image */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[85%] sm:w-3/4 h-[85%] sm:h-3/4 z-10">
              <div className="w-full h-full relative overflow-hidden rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" 
                  alt="Lebanese Feast"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-neutral-900/20 mix-blend-multiply" />
              </div>
            </div>

            {/* Accent Image Top Left */}
            <div className="absolute top-0 sm:top-[5%] left-0 w-[40%] sm:w-1/3 h-[30%] sm:h-1/4 z-20">
              <div className="w-full h-full relative overflow-hidden rounded-sm border-4 border-[#0a0a0a]">
                <img 
                  src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=600&q=80" 
                  alt="Mezza Plate"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Accent Image Bottom Right */}
            <div className="absolute bottom-0 sm:bottom-[5%] right-0 w-[45%] sm:w-2/5 h-[35%] sm:h-1/3 z-20">
              <div className="w-full h-full relative overflow-hidden rounded-sm border-4 border-[#0a0a0a]">
                <img 
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80" 
                  alt="Grill"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute top-[15%] right-[5%] w-24 h-24 sm:w-32 sm:h-32 border border-[#bd5e2d]/30 rounded-full z-0" />
            <div className="absolute bottom-[15%] left-[5%] w-32 h-32 sm:w-48 sm:h-48 border border-neutral-800 rounded-full z-0" />
          </motion.div>
          
        </div>
      </section>

      {/* --- NARRATIVE STORY ARCHITECTURE --- */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-neutral-900 overflow-hidden" id="story">
        <img 
          src="https://images.unsplash.com/photo-1516211697506-8360bd793446?auto=format&fit=crop&w=2000&q=80" 
          alt="Heritage Ambiance" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" 
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-4">
            <span className="text-sm font-semibold tracking-[0.3em] text-[#bd5e2d] uppercase">OUR STORY</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight">
              THE COURTYARD TABLE
            </h2>
          </div>
          
          <div className="text-sm sm:text-base text-neutral-300 space-y-6 leading-relaxed font-light max-w-2xl mx-auto">
            <p>
              The first Zahra table was a family kitchen that kept gaining chairs. Bread, hummus, grilled lamb, and a pipe passed between friends until the room felt like a courtyard.
            </p>
            <p>
              That table is now in Surry Hills. <strong className="text-white font-medium">Zahra</strong> is named for the bloom at the centre of the meal: bright, shared, and meant to last the evening.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => handleOpenBooking('dining')}
              className="px-8 py-3 bg-[#bd5e2d] text-white text-sm font-bold tracking-[0.2em] uppercase rounded-[3px] hover:bg-[#a64e22] transition-colors cursor-pointer"
            >
              BOOK A TABLE
            </button>
            <Link 
              to="/menu"
              className="px-8 py-3 border border-white/30 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm text-sm font-bold tracking-[0.2em] uppercase rounded-sm transition-colors"
            >
              EXPLORE MENU
            </Link>
          </div>
        </div>
      </section>

      {/* --- GOOGLE REVIEWS SLIDER --- */}
      <section className="py-16 md:py-24 bg-white text-neutral-900 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-10">
          
          <div className="space-y-4">
            <div className="flex justify-center text-amber-500 gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900">
              GUEST EXPERIENCES
            </h3>
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest">
              4.9 / 5.0 Average Rating
            </p>
          </div>

          <div className="relative min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl mx-auto"
              >
                <p className="text-lg sm:text-xl md:text-2xl text-neutral-800 font-light leading-relaxed mb-8">
                  "{REVIEWS[activeReviewIndex].comment}"
                </p>
                
                <div className="flex flex-col items-center gap-3">
                  {REVIEWS[activeReviewIndex].avatarUrl && (
                    <img 
                       src={REVIEWS[activeReviewIndex].avatarUrl} 
                       alt={REVIEWS[activeReviewIndex].author} 
                       referrerPolicy="no-referrer"
                       className="w-12 h-12 rounded-full object-cover shadow-sm"
                    />
                  )}
                  <h5 className="text-xs font-bold text-neutral-900 uppercase tracking-widest">
                    {REVIEWS[activeReviewIndex].author}
                  </h5>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    {REVIEWS[activeReviewIndex].timeAgo}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-3 justify-center pt-8">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveReviewIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeReviewIndex === idx ? 'bg-neutral-900 w-8' : 'bg-neutral-200 hover:bg-neutral-300 w-2'}`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* --- INSTAGRAM INTEGRATED TRACK --- */}
      <section className="bg-neutral-50 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0.5">
          {[
            { id: 1, url: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&h=600&q=80', alt: 'Falafel Hummus Dip' },
            { id: 2, url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&h=600&q=80', alt: 'Fresh Cocktails and Drinks' },
            { id: 3, url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&h=600&q=80', alt: 'Lebanese Desserts Baklava' },
            { id: 4, url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&h=600&q=80', alt: 'Spicy Grilled Skewers' },
            { id: 5, url: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&h=600&q=80', alt: 'Tabbouleh Mint Salad' }
          ].map((img) => (
            <a 
              key={img.id} 
              href="#instagram"
              onClick={(e) => e.preventDefault()}
              className="group relative aspect-square overflow-hidden bg-neutral-200 block"
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>
        <div className="text-center pt-10">
          <a href="#instagram" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-neutral-900 hover:text-[#bd5e2d] transition-colors">
            Follow @zahra.surryhills <ChevronRight size={16} />
          </a>
        </div>
      </section>

      {/* --- LOCATION & FUNCTION MIX --- */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[500px] w-full bg-neutral-900 flex flex-col justify-end p-8 sm:p-12 lg:p-20 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
            alt="Zahra in Surry Hills"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          <div className="relative z-10 max-w-md space-y-6">
            <div className="text-sm font-semibold tracking-[0.3em] text-[#bd5e2d] uppercase">
              LOCATION
            </div>
            <div className="space-y-2">
              <h4 className="text-3xl font-light tracking-tight text-white uppercase">ZAHRA</h4>
              <p className="text-neutral-400 font-light text-sm sm:text-base">48 Crown Street, Surry Hills NSW 2010</p>
            </div>
            
            <div className="space-y-3 pt-6 border-t border-white/20 text-sm text-neutral-300 font-light">
              <div className="flex items-center gap-3"><Clock size={16} className="text-[#bd5e2d]" /> Closed Mon | Tue - Sun: 5:00 PM - Late</div>
              <div className="flex items-center gap-3"><Phone size={16} className="text-[#bd5e2d]" /> (02) 8310 4420</div>
              <div className="flex items-center gap-3"><Mail size={16} className="text-[#bd5e2d]" /> hello@zahra.kitchen</div>
            </div>

            <div className="pt-6">
              <a 
                href="https://maps.google.com/?q=48+Crown+Street+Surry+Hills+NSW+2010" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex px-8 py-3 bg-white text-black text-sm font-bold tracking-[0.2em] uppercase transition-colors hover:bg-neutral-200 items-center gap-2"
              >
                <MapPin size={16} className="text-[#bd5e2d]" />
                GET DIRECTIONS
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[500px] w-full bg-neutral-950 p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
          <div className="max-w-xl space-y-8">
            <span className="text-sm font-semibold tracking-[0.3em] text-[#bd5e2d] uppercase">PRIVATE EVENTS</span>
            <h3 className="text-4xl sm:text-5xl font-light tracking-tight text-white leading-tight uppercase">
              HOST YOUR <br /> GATHERING
            </h3>
            <p className="text-neutral-400 font-light leading-relaxed text-sm sm:text-base">
              From birthdays to work dinners, Zahra sets banquet menus, holds a corner of the room, and keeps the service unhurried.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => handleOpenBooking('dining')}
                className="px-8 py-3 border border-white/30 text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
              >
                ENQUIRE NOW
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
