import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, X, Search, CheckCircle } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_WAITLIST = [
  { queueId: "A42", name: "Alex", partySize: 4, estimatedWait: "20 mins", status: "waiting", ahead: 3 },
  { queueId: "A43", name: "Sarah", partySize: 2, estimatedWait: "25 mins", status: "waiting", ahead: 4 },
  { queueId: "A44", name: "Michael", partySize: 6, estimatedWait: "35 mins", status: "waiting", ahead: 6 },
];

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [codeInput, setCodeInput] = useState('');
  const [currentUser, setCurrentUser] = useState<typeof MOCK_WAITLIST[0] | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCodeInput('');
      setCurrentUser(null);
      setErrorMsg('');
      setProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentUser) {
      const timer = setTimeout(() => {
        setProgress(60);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MOCK_WAITLIST.find(u => u.queueId.toLowerCase() === codeInput.toLowerCase());
    if (found) {
      setCurrentUser(found);
      setErrorMsg('');
    } else {
      setErrorMsg('Queue ID not found. Please check your SMS and try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border-t-4 border-[#bd5e2d]"
          >
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-neutral-400 bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-900 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {!currentUser ? (
              <form onSubmit={handleCheck} className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-50 text-[#bd5e2d] mb-6">
                  <Search size={28} />
                </div>
                
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">Check Waitlist Status</h2>
                <p className="text-sm text-neutral-500 mb-8 leading-relaxed">Enter the Queue ID from your SMS confirmation to check your live position.</p>
                
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium mb-6 text-left">
                    {errorMsg}
                  </div>
                )}
                
                <div className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase">Queue ID *</label>
                    <input
                      type="text"
                      required
                      value={codeInput}
                      placeholder="e.g. A42"
                      onChange={(e) => setCodeInput(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm font-bold text-neutral-900 uppercase focus:border-[#bd5e2d] focus:outline-none placeholder-neutral-400 transition-colors"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 bg-neutral-900 hover:bg-[#bd5e2d] text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all flex items-center justify-center shadow-md"
                  >
                    Check Status
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neutral-100">
                  <div 
                    className="h-full bg-[#bd5e2d] transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 text-[#bd5e2d] mb-6">
                  <Clock size={28} />
                </span>
                
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">You're on the list, {currentUser.name}!</h2>
                <p className="text-sm text-neutral-500 mb-8">We'll text you when your table is ready.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Queue ID</span>
                    <span className="text-2xl font-bold text-neutral-900">{currentUser.queueId}</span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Party Size</span>
                    <span className="text-2xl font-bold text-neutral-900 flex items-center justify-center gap-2">
                      {currentUser.partySize} <Users size={18} className="text-neutral-400" />
                    </span>
                  </div>
                </div>
                
                <div className="p-6 bg-orange-50 rounded-xl border border-orange-100/50">
                  <span className="block text-xs font-bold text-[#bd5e2d] uppercase tracking-wider mb-2">Estimated Wait</span>
                  <span className="text-4xl font-black text-orange-700 tracking-tight">{currentUser.estimatedWait}</span>
                  <p className="text-xs text-[#bd5e2d]/70 mt-3 font-medium">Currently {currentUser.ahead} parties ahead of you</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
