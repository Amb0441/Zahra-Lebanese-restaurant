import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { X, Plus, ShoppingBag } from 'lucide-react';

interface MenuSectionProps {
  handleAddItemToCart?: (item: MenuItem) => void;
}

// Map item IDs to beautiful, crisp, tiny, high-contrast food and beverage thumbnail images (Unsplash)
const getItemThumbnail = (id: string, name: string): string => {
  const images = [
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529144415895-6aaf8be872fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1577906236967-7389df03db3d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
  ];
  let sum = 0;
  for (let i = 0; i < id.length + name.length; i++) {
    sum += (id + name).charCodeAt(i);
  }
  return images[sum % images.length];
};

const CATEGORIES = [
  { id: 'mezza', label: 'MEZZA' },
  { id: 'small-pan-grill', label: 'SMALL PAN / FROM THE GRILL' },
  { id: 'signature-dishes', label: 'SIGNATURE DISHES' },
  { id: 'kids-menu', label: 'KIDS MENU' },
  { id: 'salads-sides', label: 'SALADS / SIDES' },
  { id: 'feast-options', label: 'FEAST OPTIONS' },
  { id: 'desserts-mocktails-snacks', label: 'DESSERTS / FRUIT MOCKTAIL / SNACKS' },
  { id: 'beverages', label: 'BEVERAGES' },
  { id: 'shisha', label: 'SHISHA' }
];

const DIETARY_FILTERS = [
  { code: 'V', label: 'Vegetarian' },
  { code: 'VG', label: 'Vegan' },
  { code: 'GF', label: 'Gluten-Free' }
];

export default function MenuSection({ handleAddItemToCart }: MenuSectionProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('mezza');
  const [activeDietary, setActiveDietary] = useState<string[]>([]);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  const toggleDietary = (code: string) => {
    setActiveDietary(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
  };

  const filteredItems = MENU_ITEMS.filter(item => {
    if (item.category !== activeCategory) return false;
    if (activeDietary.length > 0) {
      if (!item.dietary) return false;
      return activeDietary.every(d => item.dietary?.includes(d));
    }
    return true;
  });
  
  // Group by subcategory
  const itemsBySubcategory = filteredItems.reduce((acc, item) => {
    const sub = item.subcategory || 'OTHER';
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const hasSubcategories = Object.keys(itemsBySubcategory).length > 0 && !(Object.keys(itemsBySubcategory).length === 1 && Object.keys(itemsBySubcategory)[0] === 'OTHER');

  return (
    <section className="py-8 sm:py-12 bg-[#faf8f5]" id="menu">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col gap-8 items-center text-center mb-10">
          
          <div className="space-y-6 w-full">
            <div className="flex overflow-x-auto gap-4 sm:gap-8 pt-4 pb-2 px-4 sm:px-0 sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b border-neutral-200/50">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 pb-3 text-xs sm:text-[13px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'text-[#bd5e2d] font-bold border-b-2 border-[#bd5e2d]'
                      : 'text-neutral-400 font-medium hover:text-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 px-4 pb-4">
              {DIETARY_FILTERS.map(filter => (
                <button
                  key={filter.code}
                  onClick={() => toggleDietary(filter.code)}
                  className={`flex items-center gap-2 px-3 py-1 text-[11px] font-medium tracking-widest uppercase transition-all ${
                    activeDietary.includes(filter.code)
                      ? 'text-[#bd5e2d]'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${activeDietary.includes(filter.code) ? 'bg-[#bd5e2d]' : 'bg-neutral-300'}`}></span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {hasSubcategories ? (
                <div className="space-y-10">
                  {Object.entries(itemsBySubcategory).map(([sub, items]) => (
                    <div key={sub} className="flex flex-col pt-8 first:pt-4 border-t border-neutral-200/60 first:border-t-0">
                      <div className="flex flex-col items-center justify-center mb-8 mt-2">
                        <div className="h-px w-12 bg-[#bd5e2d] mb-5"></div>
                        <h3 className="text-3xl md:text-4xl font-serif text-neutral-900 capitalize tracking-wide text-center">
                          {sub.toLowerCase()}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                        {items.map((item, index) => (
                          <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                            whileHover={{ scale: 1.03 }}
                            className="group flex flex-col items-start gap-4 relative cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                          >
                            <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100/50">
                              <img 
                                src={getItemThumbnail(item.id, item.name)} 
                                alt={item.name} 
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  if (!target.dataset.failed) {
                                    target.dataset.failed = 'true';
                                    target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80';
                                  }
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                              />
                              <div className="absolute inset-0 border border-black/5 z-10 pointer-events-none mix-blend-overlay"></div>
                            </div>
                            <div className="w-full flex-1 flex flex-col">
                              <div className="flex justify-between items-baseline gap-3 mb-2 w-full">
                                <h4 className="text-[1.35rem] font-serif text-neutral-900 leading-tight">{item.name}</h4>
                                <div className="flex-1 border-b border-dotted border-neutral-300/80 relative -top-1 opacity-70"></div>
                                <span className="text-[1.15rem] font-serif text-[#bd5e2d] shrink-0">${item.price.toFixed(2)}</span>
                              </div>
                              {item.dietary && item.dietary.length > 0 && (
                                <div className="flex gap-2 flex-wrap mb-2">
                                  {item.dietary.map(d => (
                                    <span key={d} className="inline-flex items-center text-[#bd5e2d]/70 text-[10px] font-medium tracking-widest uppercase">
                                      {d}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <p className="text-sm text-neutral-600 font-light leading-relaxed italic mt-1">
                                {item.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 py-8">
                  {filteredItems.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                      whileHover={{ scale: 1.03 }}
                      className="group flex flex-col items-start gap-4 relative cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100/50">
                        <img 
                          src={getItemThumbnail(item.id, item.name)} 
                          alt={item.name} 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.dataset.failed) {
                              target.dataset.failed = 'true';
                              target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80';
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                        />
                        <div className="absolute inset-0 border border-black/5 z-10 pointer-events-none mix-blend-overlay"></div>
                      </div>
                      <div className="w-full flex-1 flex flex-col">
                        <div className="flex justify-between items-baseline gap-3 mb-2 w-full">
                          <h4 className="text-[1.35rem] font-serif text-neutral-900 leading-tight">{item.name}</h4>
                          <div className="flex-1 border-b border-dotted border-neutral-300/80 relative -top-1 opacity-70"></div>
                          <span className="text-[1.15rem] font-serif text-[#bd5e2d] shrink-0">${item.price.toFixed(2)}</span>
                        </div>
                        {item.dietary && item.dietary.length > 0 && (
                          <div className="flex gap-2 flex-wrap mb-2">
                            {item.dietary.map(d => (
                              <span key={d} className="inline-flex items-center text-[#bd5e2d]/70 text-[10px] font-medium tracking-widest uppercase">
                                {d}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-neutral-600 font-light leading-relaxed italic mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    
      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-neutral-800 hover:bg-neutral-100 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative w-full h-48 sm:h-56 bg-neutral-100 shrink-0">
                <img 
                  src={getItemThumbnail(selectedItem.id, selectedItem.name)} 
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.dataset.failed) {
                      target.dataset.failed = 'true';
                      target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80';
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto min-h-[160px] flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-1">
                  <h3 className="text-2xl font-serif text-neutral-900">{selectedItem.name}</h3>
                  <span className="text-xl font-serif text-[#bd5e2d] shrink-0">${selectedItem.price.toFixed(2)}</span>
                </div>
                
                <p className="text-xs tracking-widest text-neutral-400 uppercase font-semibold mb-3">
                  {selectedItem.category} {selectedItem.subcategory ? `• ${selectedItem.subcategory}` : ''}
                </p>
                
                                <div className="flex gap-2 flex-wrap mb-4">
                  {!['beverages', 'shisha'].includes(selectedItem.category) && (
                    <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded text-[10px] font-bold tracking-widest uppercase">
                      Halal
                    </span>
                  )}
                  {selectedItem.dietary?.map(d => {
                    const label = d === 'V' ? 'Vegetarian' : d === 'VG' ? 'Vegan' : d === 'GF' ? 'Gluten-Free' : d;
                    return (
                      <span key={d} className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded text-[10px] font-bold tracking-widest uppercase">
                        {label}
                      </span>
                    );
                  })}
                </div>
                
                <p className="text-neutral-600 leading-relaxed mb-8">
                  {selectedItem.description || 'A delicious offering from our menu.'}
                </p>

                <button 
                  onClick={() => {
                    if (handleAddItemToCart) handleAddItemToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="w-full mt-auto py-4 bg-[#bd5e2d] hover:bg-[#a65227] text-white rounded-xl font-medium tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Order - ${selectedItem.price.toFixed(2)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
