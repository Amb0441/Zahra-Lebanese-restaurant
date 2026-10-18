import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function OrderDrawer({ isOpen, onClose, cart, setCart }: OrderDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'completed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const gst = subtotal * 0.1;
  const total = subtotal; // standard menu pricing includes GST usually

  const handleUpdateQuantity = (itemId: string, amount: number) => {
    setCart(prev => prev.map(item => {
      if (item.menuItem.id === itemId) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(prev => prev.filter(item => item.menuItem.id !== itemId));
  };

  const handleNextStep = () => {
    if (cart.length === 0) return;
    if (step === 'cart') {
      setStep('checkout');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail || !pickupTime) {
      setErrorMsg('Please fill in all details.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('completed');
    }, 1200);
  };

  const handleClose = () => {
    if (step === 'completed') {
      setCart([]);
      setStep('cart');
      setCustomerName('');
      setCustomerPhone('');
      setCustomerEmail('');
      setPickupTime('');
    }
    setErrorMsg('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-6">
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="w-screen max-w-sm bg-white border-l border-neutral-200 text-neutral-900 flex flex-col shadow-xl relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-neutral-200 bg-neutral-50/50">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={15} className="text-[#bd5e2d]" />
                  <span className="font-bold tracking-[0.15em] text-xs sm:text-sm uppercase text-neutral-800">
                    {step === 'cart' && `YOUR ORDER (${cart.length})`}
                    {step === 'checkout' && 'SECURE CHECKOUT'}
                    {step === 'completed' && 'ORDER PLACED'}
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-[2px] text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Step 1: Cart View */}
              {step === 'cart' && (
                <div className="flex-1 flex flex-col min-h-0">
                  {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <div className="p-4 bg-neutral-50 rounded-full border border-neutral-100 text-[#bd5e2d]">
                        <ShoppingBag size={32} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold tracking-wide text-neutral-800 uppercase">Your order is empty</h4>
                        <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed font-light">
                          Explore our signature dining menu and dessert range to start adding items.
                        </p>
                      </div>
                      <Link
                        to="/menu"
                        onClick={onClose}
                        className="px-6 py-3 bg-neutral-900 hover:bg-[#bd5e2d] text-white font-bold text-xs tracking-[0.15em] uppercase rounded-[3px] transition-all cursor-pointer shadow-sm text-center"
                      >
                        Explore Menu
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Cart Items List */}
                      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-neutral-100">
                        {cart.map((item, index) => (
                          <div key={item.menuItem.id} className={`flex gap-3 pt-4 ${index === 0 ? 'pt-0' : ''}`}>
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between items-start gap-2">
                                <h5 className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wide">{item.menuItem.name}</h5>
                                <span className="text-xs sm:text-sm font-bold text-[#bd5e2d]">${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                              </div>
                              <p className="text-xs text-neutral-500 font-light line-clamp-2 leading-tight">{item.menuItem.description}</p>
                              
                              <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center bg-neutral-50/50 border border-neutral-200/60 rounded-[3px] overflow-hidden">
                                  <button
                                    onClick={() => handleUpdateQuantity(item.menuItem.id, -1)}
                                    className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                                  >
                                    <Minus size={11} />
                                  </button>
                                  <span className="px-2 text-xs font-bold text-neutral-800 min-w-[20px] text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item.menuItem.id, 1)}
                                    className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                                  >
                                    <Plus size={11} />
                                  </button>
                                </div>
                                <button
                                  onClick={() => handleRemoveItem(item.menuItem.id)}
                                  className="text-[10px] sm:text-xs font-bold text-neutral-400 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer uppercase"
                                >
                                  <Trash2 size={12} /> Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer & Pricing Summary */}
                      <div className="border-t border-neutral-200 bg-neutral-50/50 p-6 space-y-4">
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between text-neutral-500 font-light">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-neutral-500 font-light">
                            <span>Included GST (10%)</span>
                            <span>${gst.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-neutral-900 font-bold text-xs sm:text-sm border-t border-neutral-200 pt-2 uppercase">
                            <span>Total (Pick-up only)</span>
                            <span className="text-[#bd5e2d]">${total.toFixed(2)}</span>
                          </div>
                        </div>

                        <button
                          onClick={handleNextStep}
                          className="w-full py-3.5 bg-neutral-900 hover:bg-[#bd5e2d] text-white text-xs font-bold tracking-[0.15em] uppercase rounded-[3px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          PROCEED TO CHECKOUT
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 2: Checkout Form */}
              {step === 'checkout' && (
                <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                    {errorMsg && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-[2px] font-medium">
                        {errorMsg}
                      </div>
                    )}

                    <div className="bg-neutral-50 border border-neutral-200 p-4 space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-[#bd5e2d] font-bold tracking-wider uppercase text-[10px]">
                        <AlertCircle size={12} /> PICKUP ORDER ONLY
                      </div>
                      <p className="text-neutral-500 font-light leading-relaxed">
                        Order preparation takes 15-25 minutes depending on volume.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-[3px] text-xs sm:text-sm text-neutral-800 focus:border-[#bd5e2d] focus:outline-none placeholder-neutral-400 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">Contact Phone *</label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="0412 345 678"
                          className="w-full px-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-[3px] text-xs sm:text-sm text-neutral-800 focus:border-[#bd5e2d] focus:outline-none placeholder-neutral-400 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full px-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-[3px] text-xs sm:text-sm text-neutral-800 focus:border-[#bd5e2d] focus:outline-none placeholder-neutral-400 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase">Preferred Pickup Time *</label>
                        <select
                          required
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full px-4 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-[3px] text-xs sm:text-sm text-neutral-800 focus:border-[#bd5e2d] focus:outline-none transition-colors"
                        >
                          <option value="">Select a time...</option>
                          {['As soon as possible', 'In 30 minutes', 'In 45 minutes', 'In 1 hour'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Submit */}
                  <div className="border-t border-neutral-200 bg-neutral-50/50 p-6 space-y-4">
                    <div className="flex justify-between items-center text-xs sm:text-sm uppercase font-bold">
                      <span className="text-neutral-500">Total Due on Pickup</span>
                      <span className="text-[#bd5e2d]">${total.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setStep('cart')}
                        className="py-3 bg-white hover:bg-neutral-50 text-neutral-600 text-xs font-bold tracking-[0.15em] uppercase rounded-[3px] border border-neutral-200 transition-all text-center cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-3 bg-neutral-900 hover:bg-[#bd5e2d] disabled:bg-neutral-400 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-[3px] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 3: Order Completed View */}
              {step === 'completed' && (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-5">
                  <div className="flex justify-center">
                    <CheckCircle size={48} className="text-[#bd5e2d]" />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold tracking-wide text-neutral-900 uppercase">ORDER RECEIVED</h4>
                    <p className="text-xs sm:text-sm text-neutral-500 max-w-xs mx-auto leading-relaxed font-light">
                      Thank you. The kitchen at <span className="text-[#bd5e2d] font-semibold">Zahra</span> is preparing your order.
                    </p>
                  </div>

                  <div className="bg-neutral-50/50 rounded-[3px] border border-neutral-200 p-5 text-left space-y-3 max-w-xs w-full text-xs">
                    <div className="flex justify-between border-b border-neutral-200 pb-2">
                      <span className="text-neutral-400 uppercase font-bold tracking-wider text-[10px]">Order Code</span>
                      <span className="text-neutral-900 font-bold uppercase">ZAHRA-{Math.floor(Math.random() * 90000) + 10000}</span>
                    </div>
                    <div className="space-y-1.5 text-neutral-600 font-light">
                      <div><strong className="text-neutral-800 font-bold uppercase text-[10px] tracking-wider block">Name:</strong> {customerName}</div>
                      <div><strong className="text-neutral-800 font-bold uppercase text-[10px] tracking-wider block">Pickup:</strong> {pickupTime}</div>
                      <div><strong className="text-neutral-800 font-bold uppercase text-[10px] tracking-wider block">Total:</strong> ${total.toFixed(2)}</div>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="px-8 py-3 bg-neutral-900 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-[3px] transition-all shadow-md cursor-pointer hover:bg-[#bd5e2d]"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
