import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Flame, Utensils, CheckCircle, Sparkles, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExperience?: 'dining' | 'shisha';
}

export default function BookingModal({ isOpen, onClose, initialExperience = 'dining' }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState<'dining' | 'shisha'>(initialExperience);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const timeSlots = experience === 'dining' 
    ? ['12:00 PM', '1:00 PM', '2:00 PM', '5:30 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:30 PM']
    : ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMsg('');
    setStep(1);
    setDate('');
    setTime('');
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  const nextStep = () => {
    if (step === 2 && (!date || !time)) {
      setErrorMsg('Please select a date and time.');
      return;
    }
    setErrorMsg('');
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setErrorMsg('');
    setStep(prev => prev - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[95vh] md:max-h-[85vh] md:flex-row md:h-[600px] min-h-[500px]"
          >
            {/* Left/Top Image Section */}
            {!isSuccess && (
              <div className="relative h-48 md:h-auto md:w-2/5 shrink-0 bg-neutral-900">
                <img 
                  src={experience === 'dining' 
                    ? "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80" 
                    : "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"}
                  alt={experience} 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent md:bg-gradient-to-r md:from-neutral-900/40 md:to-neutral-900/90" />
                
                <button
                  onClick={handleClose}
                  className="absolute top-4 left-4 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors z-20 md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h2 className="text-3xl font-serif mb-2">
                    {experience === 'dining' ? 'Dining Experience' : 'Shisha Lounge'}
                  </h2>
                  <p className="text-white/80 text-sm font-light leading-relaxed">
                    {experience === 'dining' 
                      ? 'Reserve a table for an authentic Lebanese feast with your family and friends.' 
                      : 'Relax in our premium lounge with signature flavors. 18+ only.'}
                  </p>
                </div>
              </div>
            )}

            {/* Right/Bottom Content Section */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
              
              {!isSuccess && (
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 rounded-full transition-colors z-20 hidden md:block"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {!isSuccess ? (
                <div className="flex-1 flex flex-col h-full">
                  {/* Progress Header */}
                  <div className="px-8 pt-8 pb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-2 mb-2 text-[#bd5e2d] text-xs font-bold tracking-[0.2em] uppercase">
                      <Sparkles size={14} />
                      Step {step} of 3
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map(i => (
                        <div 
                          key={i} 
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-[#bd5e2d]' : 'bg-neutral-200'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-8 flex-1 overflow-y-auto">
                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium"
                      >
                        {errorMsg}
                      </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-xl font-serif text-neutral-900 mb-2">Select Your Experience</h3>
                            <p className="text-neutral-500 text-sm">Choose the area where you would like to be seated.</p>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setExperience('dining')}
                              className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                                experience === 'dining' 
                                  ? 'border-[#bd5e2d] bg-amber-50/50' 
                                  : 'border-neutral-200 hover:border-neutral-300'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${experience === 'dining' ? 'bg-[#bd5e2d] text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                                <Utensils size={20} />
                              </div>
                              <h4 className="font-bold text-neutral-900 mb-1">Dining Room</h4>
                              <p className="text-xs text-neutral-500">Perfect for families and groups</p>
                            </button>

                            <button
                              type="button"
                              onClick={() => setExperience('shisha')}
                              className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                                experience === 'shisha' 
                                  ? 'border-[#bd5e2d] bg-amber-50/50' 
                                  : 'border-neutral-200 hover:border-neutral-300'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${experience === 'shisha' ? 'bg-[#bd5e2d] text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                                <Flame size={20} />
                              </div>
                              <h4 className="font-bold text-neutral-900 mb-1">Shisha Lounge</h4>
                              <p className="text-xs text-neutral-500">Premium lounge seating (18+)</p>
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-xl font-serif text-neutral-900 mb-2">When are you joining us?</h3>
                            <p className="text-neutral-500 text-sm">Select a date, party size and preferred time.</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase flex items-center gap-2">
                                <Calendar size={14} className="text-[#bd5e2d]" /> Date
                              </label>
                              <input
                                type="date"
                                required
                                value={date}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:border-[#bd5e2d] focus:ring-1 focus:ring-[#bd5e2d] outline-none transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase flex items-center gap-2">
                                <Users size={14} className="text-[#bd5e2d]" /> Guests
                              </label>
                              <select
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:border-[#bd5e2d] focus:ring-1 focus:ring-[#bd5e2d] outline-none transition-all"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                ))}
                                <option value={12}>10+ People</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-3 pt-2 border-t border-neutral-100">
                            <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase flex items-center gap-2">
                              <Clock size={14} className="text-[#bd5e2d]" /> Available Times
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setTime(slot)}
                                  className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer uppercase tracking-wider ${
                                    time === slot
                                      ? 'border-[#bd5e2d] bg-[#bd5e2d] text-white'
                                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-xl font-serif text-neutral-900 mb-2">Your Details</h3>
                            <p className="text-neutral-500 text-sm">We'll use this to confirm your booking.</p>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">Full Name</label>
                              <input
                                type="text"
                                required
                                value={name}
                                placeholder="John Doe"
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:border-[#bd5e2d] focus:ring-1 focus:ring-[#bd5e2d] outline-none transition-all"
                              />
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">Email</label>
                                <input
                                  type="email"
                                  required
                                  value={email}
                                  placeholder="john@example.com"
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:border-[#bd5e2d] focus:ring-1 focus:ring-[#bd5e2d] outline-none transition-all"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">Phone</label>
                                <input
                                  type="tel"
                                  required
                                  value={phone}
                                  placeholder="(02) 8310 4420"
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:border-[#bd5e2d] focus:ring-1 focus:ring-[#bd5e2d] outline-none transition-all"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">Special Requests</label>
                              <textarea
                                rows={2}
                                value={notes}
                                placeholder="Allergies, high chair needed, etc..."
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:border-[#bd5e2d] focus:ring-1 focus:ring-[#bd5e2d] outline-none resize-none transition-all"
                              />
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 md:p-8 border-t border-neutral-100 bg-neutral-50/50 flex justify-between items-center mt-auto">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-2 rounded-xl hover:bg-neutral-100"
                      >
                        <ChevronLeft size={16} /> Back
                      </button>
                    ) : (
                      <div /> // Spacer
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-8 py-3 bg-neutral-900 hover:bg-[#bd5e2d] text-white text-sm font-bold tracking-widest uppercase rounded-xl transition-all flex items-center gap-2"
                      >
                        Next <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-[#bd5e2d] hover:bg-[#a65227] disabled:bg-neutral-400 text-white text-sm font-bold tracking-widest uppercase rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#bd5e2d]/20"
                      >
                        {isSubmitting ? 'PROCESSING...' : 'CONFIRM'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                // Success Screen
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-serif text-neutral-900 mb-3">Reservation Confirmed</h3>
                  <p className="text-neutral-500 max-w-md mx-auto mb-8">
                    Thank you, {name.split(' ')[0]}! Your booking for <strong>{guests} people</strong> on <strong>{date}</strong> at <strong>{time}</strong> in the <strong>{experience === 'dining' ? 'Dining Room' : 'Shisha Lounge'}</strong> has been confirmed. We've sent the details to {email}.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 bg-neutral-900 hover:bg-[#bd5e2d] text-white font-bold tracking-widest text-xs uppercase rounded-xl transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
