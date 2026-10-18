import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { X, Phone, ShoppingBag, Flame, Sparkles } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenCart: () => void;
  onOpenWaitlist: () => void;
  onOpenBanquet: () => void;
  cartCount: number;
}

export default function MobileMenu({ isOpen, onClose, onOpenBooking, onOpenCart, onOpenWaitlist, onOpenBanquet, cartCount }: MobileMenuProps) {
  const links = [
    { name: 'HOME', href: '/' },
    { name: 'MENU', href: '/menu' },
    { name: 'BANQUETS', action: onOpenBanquet },
    { name: 'WAITLIST', action: onOpenWaitlist },
    { name: 'BOOKINGS', action: onOpenBooking },
    { name: 'ABOUT', href: '/#story' },
    { name: 'CONTACT', href: '/#contact' }
  ];

    return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xs"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-0 bg-[#0c0c0c] border-b border-neutral-800 px-6 pt-20 pb-6 space-y-4 flex flex-col justify-between"
          >
            {/* Top close button */}
            <div className="absolute top-5 right-6">
              <button
                onClick={onClose}
                className="p-1 rounded-[2px] text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Links Stack */}
            <nav className="flex flex-col space-y-2 text-center pt-2">
              {links.map(l => (
                l.action ? (
                  <button
                    key={l.name}
                    onClick={() => { onClose(); l.action(); }}
                    className="text-xs font-semibold tracking-[0.2em] text-neutral-200 hover:text-[#bd5e2d] transition-colors py-1.5 block uppercase w-full text-center"
                  >
                    {l.name}
                  </button>
                ) : l.href?.startsWith('http') ? (
                  <a
                    key={l.name}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold tracking-[0.2em] text-neutral-200 hover:text-[#bd5e2d] transition-colors py-1.5 block uppercase"
                  >
                    {l.name}
                  </a>
                ) : (
                  <Link
                    key={l.name}
                    to={l.href!}
                    onClick={(e) => {
                      if (l.href?.includes('#') && window.location.pathname === '/') {
                        e.preventDefault();
                        const id = l.href.split('#')[1];
                        const el = document.querySelector('#' + id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else if (!l.href?.includes('#')) {
                        window.scrollTo(0, 0);
                      }
                      onClose();
                    }}
                    className="text-xs font-semibold tracking-[0.2em] text-neutral-200 hover:text-[#bd5e2d] transition-colors py-1.5 block uppercase w-full text-center"
                  >
                    {l.name}
                  </Link>
                )
              ))}
            </nav>

            <div className="border-t border-neutral-800/60 my-1" />

            {/* Action Buttons Stack */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { onClose(); onOpenBooking(); }}
                className="w-full py-2.5 bg-[#bd5e2d] hover:bg-[#a64e22] text-white text-[8px] font-semibold tracking-[0.15em] uppercase rounded-[3px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={11} />
                BOOK A TABLE
              </button>
              
              <button
                onClick={() => { onClose(); onOpenCart(); }}
                className="w-full py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white text-[8px] font-semibold tracking-[0.15em] uppercase rounded-[3px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag size={11} className="text-[#bd5e2d]" />
                ORDER ONLINE ({cartCount})
              </button>

              <a
                href="tel:0283104420"
                className="w-full py-2.5 bg-neutral-900/60 border border-neutral-800/60 text-neutral-300 text-[8px] font-semibold tracking-[0.15em] uppercase rounded-[3px] text-center flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-all"
              >
                <Phone size={11} className="text-[#bd5e2d]" />
                (02) 8310 4420
              </a>
            </div>

            {/* Sub-label */}
            <div className="text-center pt-2">
              <span className="text-[8px] uppercase tracking-[0.2em] text-neutral-500 font-normal">• Lebanese Cuisine • Shisha • Dessert •</span>
              <p className="text-[9px] text-neutral-500 mt-0.5 font-mono">48 Crown Street, Surry Hills NSW 2010</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
