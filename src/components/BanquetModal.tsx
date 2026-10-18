import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Utensils, X, CheckCircle2 } from 'lucide-react';

interface BanquetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BANQUETS = {
  theCedars: { 
    id: 'cedars',
    name: 'The Cedars Banquet',
    pricePerHead: 65, 
    minGuests: 4, 
    items: ["Hummus", "Baba Ghanouj", "Tabouli", "Fattoush", "Falafel", "Sambousek", "Kebbeh", "Mixed Grill (Skewers)", "Lebanese Bread", "Garlic Dip"] 
  },
  royalMidan: {
    id: 'royal',
    name: 'Zahra Feast',
    pricePerHead: 85,
    minGuests: 6,
    items: ["Hummus with Meat", "Baba Ghanouj", "Tabouli", "Fattoush", "Fried Kebbeh", "Cheese Sambousek", "Meat Sambousek", "Makanek", "Premium Mixed Grill", "Seafood Platter", "Lebanese Bread", "Garlic Dip", "Dessert Platter"]
  }
};

export default function BanquetModal({ isOpen, onClose }: BanquetModalProps) {
  const [guestCount, setGuestCount] = useState(10);
  const [selectedBanquet, setSelectedBanquet] = useState(BANQUETS.theCedars);
  const [isBooked, setIsBooked] = useState(false);
  const [queueCode, setQueueCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsBooked(false);
      setQueueCode('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (guestCount < selectedBanquet.minGuests) {
      setGuestCount(selectedBanquet.minGuests);
    }
  }, [selectedBanquet, guestCount]);

  const totalCost = selectedBanquet.pricePerHead * guestCount;

  const handleBook = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const mockCodes = ["A42", "A43", "A44"];
      setQueueCode(mockCodes[Math.floor(Math.random() * mockCodes.length)]);
      setIsSubmitting(false);
      setIsBooked(true);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[3px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#bd5e2d] uppercase">Group Estimator</span>
                <h2 className="text-xl font-light tracking-tight text-neutral-900 uppercase">Build Your Banquet</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-[2px] text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/50 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 md:p-8">
              {!isBooked ? (
                <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
                  
                  {/* Left Column (Inputs) */}
                <div className="md:col-span-7 space-y-8">
                  {/* Select Package */}
                  <div className="space-y-4">
                    <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase block">1. Select Package</label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {Object.values(BANQUETS).map(banquet => (
                        <button
                          key={banquet.id}
                          onClick={() => setSelectedBanquet(banquet)}
                          className={`p-5 rounded-xl border text-left transition-all duration-300 ${
                            selectedBanquet.id === banquet.id 
                              ? 'border-[#bd5e2d] bg-[#bd5e2d]/5 ring-1 ring-[#bd5e2d] shadow-sm' 
                              : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-neutral-900 leading-tight pr-2">{banquet.name}</h4>
                            {selectedBanquet.id === banquet.id && <CheckCircle2 size={18} className="text-[#bd5e2d] shrink-0" />}
                          </div>
                          <p className="text-[#bd5e2d] font-bold text-lg">${banquet.pricePerHead} <span className="text-xs text-neutral-500 font-normal">/ person</span></p>
                          <p className="text-[10px] text-neutral-400 mt-2 uppercase tracking-wider font-semibold">Min {banquet.minGuests} guests</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Guests */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">2. Number of Guests</label>
                      <span className="text-lg font-bold text-neutral-900">{guestCount} Guests</span>
                    </div>
                    
                    <div className="pt-2 pb-6 space-y-4">
                      <input 
                        type="range" 
                        min={Math.max(4, selectedBanquet.minGuests)} 
                        max="100" 
                        value={guestCount} 
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#bd5e2d]"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1">
                        <span>{Math.max(4, selectedBanquet.minGuests)}</span>
                        <span>50</span>
                        <span>100+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (Summary) */}
                <div className="md:col-span-5 flex flex-col h-full">
                  <div className="bg-neutral-50 border border-neutral-200/60 rounded-2xl p-6 sm:p-8 flex flex-col h-full sticky top-0">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-6">Estimate Summary</h3>
                    
                    <div className="flex flex-col gap-2 pb-6 border-b border-neutral-200/60 mb-6">
                      <p className="text-sm font-semibold text-neutral-600">{selectedBanquet.name}</p>
                      <div className="flex justify-between items-end">
                        <p className="text-4xl font-light text-neutral-900 tracking-tight">${totalCost.toLocaleString()}</p>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">For</p>
                          <p className="text-base font-bold text-[#bd5e2d] flex items-center gap-1.5"><Users size={14}/> {guestCount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 flex-1">
                      <h4 className="text-[10px] font-bold tracking-[0.15em] text-neutral-900 uppercase flex items-center gap-2">
                        <Utensils size={14} className="text-[#bd5e2d]"/> Included Mezza
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium text-neutral-600">
                        {selectedBanquet.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#bd5e2d] mt-0.5 opacity-50">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-4">
                      <button 
                        onClick={handleBook}
                        disabled={isSubmitting}
                        className="w-full py-4 bg-neutral-900 hover:bg-[#bd5e2d] disabled:bg-neutral-400 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-[3px] transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            PROCESSING...
                          </>
                        ) : 'INQUIRE NOW'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center space-y-6 max-w-lg mx-auto"
              >
                <div className="flex justify-center">
                  <CheckCircle2 size={48} className="text-[#bd5e2d]" />
                </div>
                
                <div className="space-y-1.5">
                  <h4 className="text-xl font-bold tracking-tight text-neutral-900 uppercase">BANQUET CONFIRMED</h4>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">
                    Your group inquiry has been recorded. Use the Queue ID below on our Waitlist to check your status when you arrive.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-xl border border-neutral-100 p-6 text-left space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-neutral-200/60">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Queue ID</span>
                    <span className="text-2xl font-black text-[#bd5e2d]">{queueCode}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-neutral-400 text-[10px] block uppercase font-bold tracking-wider mb-1">Package</span>
                      <span className="text-neutral-900 font-bold text-xs">{selectedBanquet.name}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 text-[10px] block uppercase font-bold tracking-wider mb-1">Guests</span>
                      <span className="text-neutral-900 font-bold text-xs">{guestCount} People</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 text-[10px] block uppercase font-bold tracking-wider mb-1">Total Estimate</span>
                      <span className="text-neutral-900 font-bold text-xs">${totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onClose}
                    className="px-8 py-3.5 bg-neutral-900 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-[3px] transition-all cursor-pointer hover:bg-[#bd5e2d] shadow-sm w-full"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
