import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const Icon = isPrivacy ? ShieldCheck : FileText;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between sticky top-0 bg-white z-20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#bd5e2d]/10 rounded-lg">
                  <Icon size={20} className="text-[#bd5e2d]" />
                </div>
                <h2 className="text-lg font-serif font-bold text-neutral-900">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="prose prose-sm sm:prose-base max-w-none text-neutral-600 prose-headings:font-serif prose-headings:text-neutral-900 prose-a:text-[#bd5e2d] prose-a:no-underline hover:prose-a:underline">
                {isPrivacy ? (
                  <>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>Welcome to Zahra's privacy policy. We keep booking, waitlist, and enquiry details only to run the restaurant.</p>
                    
                    <h3>1. Information We Collect</h3>
                    <p>When you use our reservation system or sign up for our waitlist, we may collect:</p>
                    <ul>
                      <li>Full name and contact details (email, phone number)</li>
                      <li>Reservation history and dining preferences</li>
                      <li>Dietary requirements and special requests</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>Your information is used exclusively to:</p>
                    <ul>
                      <li>Confirm and manage your table reservations</li>
                      <li>Communicate important updates regarding your booking</li>
                      <li>Improve our services and dining experiences</li>
                    </ul>

                    <h3>3. Data Security</h3>
                    <p>We implement appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
                    
                    <h3>4. Third-Party Services</h3>
                    <p>We may share your data with trusted third-party service providers who assist us in operating our booking platform and business communications, strictly under confidentiality agreements.</p>
                    
                    <h3>5. Your Rights</h3>
                    <p>You have the right to request access to, correction, or deletion of your personal data at any time by contacting us.</p>
                  </>
                ) : (
                  <>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>By accessing or using our services, you agree to be bound by these Terms and Conditions.</p>

                    <h3>1. Reservations and Cancellations</h3>
                    <p>Reservations are subject to availability. We kindly ask for at least 24 hours notice for cancellations. For large groups (10+), a deposit may be required to secure the booking.</p>

                    <h3>2. Shisha Lounge Policy (18+)</h3>
                    <p>The Shisha Deck is strictly an 18+ environment. Valid photo identification may be required upon entry. Management reserves the right to refuse service to anyone unable to provide proof of age.</p>

                    <h3>3. Dietary Requirements</h3>
                    <p>While we take all dietary requirements seriously and implement cross-contamination prevention procedures, we cannot guarantee a 100% allergen-free environment due to the nature of our kitchen operations.</p>

                    <h3>4. Right of Admission</h3>
                    <p>Management reserves the right to refuse admission or ask patrons to leave if their behavior is deemed inappropriate, disruptive, or in violation of our house policies.</p>

                    <h3>5. Intellectual Property</h3>
                    <p>Menus, images, and branding on this website belong to Zahra and may not be reused without permission.</p>
                  </>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-[#bd5e2d] text-white text-xs font-bold tracking-widest uppercase rounded-lg transition-colors cursor-pointer"
              >
                Accept & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
