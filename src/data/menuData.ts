import { MenuItem, Review } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- MEZZA ---
  { id: 'm1', name: 'Kabees W Zaytoun', description: 'Selection of pickles & olives', price: 10, category: 'mezza', dietary: ['V', 'VG', 'GF'], subcategory: 'COLD MEZZA' },
  { id: 'm2', name: 'Baba Ghanouj', description: 'Charred eggplant, tahini, lemon, garlic', price: 14, category: 'mezza', dietary: ['V', 'VG', 'GF'], subcategory: 'COLD MEZZA' },
  { id: 'm3', name: 'Mhamra', description: 'Charred red capsicum, paprika, chilli, coriander, spices, garlic, walnuts, olive oil', price: 15, category: 'mezza', dietary: ['V', 'VG', 'GF'], subcategory: 'COLD MEZZA' },
  { id: 'm7', name: 'Hummus', description: 'Chickpeas, tahini, lemon juice, garlic, olive oil', price: 12, category: 'mezza', dietary: ['V', 'VG', 'GF'], subcategory: 'COLD MEZZA' },
  { id: 'm8', name: 'Labneh', description: 'Strained yoghurt, olive oil, dried mint', price: 12, category: 'mezza', dietary: ['V', 'GF'], subcategory: 'COLD MEZZA' },
  { id: 'm4', name: 'Batenjen Me2leh', description: 'Fried eggplant, pomegranate molasses, mint', price: 17, category: 'mezza', dietary: ['V', 'VG', 'GF'], subcategory: 'HOT MEZZA' },
  { id: 'm5', name: 'Arnabit Me2leh', description: 'Fried cauliflower, tahini dip', price: 17, category: 'mezza', dietary: ['V', 'VG', 'GF'], subcategory: 'HOT MEZZA' },
  { id: 'm6', name: 'Batata Me2liyeh', description: 'Fried potato chips', price: 10, category: 'mezza', dietary: ['V', 'VG', 'GF'], subcategory: 'HOT MEZZA' },
  { id: 'm9', name: 'Cheese Sambousek', description: 'Pastry filled with mixed cheese and parsley (4 pieces)', price: 14, category: 'mezza', dietary: ['V'], subcategory: 'HOT MEZZA' },
  { id: 'm10', name: 'Meat Sambousek', description: 'Pastry filled with minced meat, onions, pine nuts (4 pieces)', price: 15, category: 'mezza', subcategory: 'HOT MEZZA' },
  { id: 'm11', name: 'Falafel', description: 'Fried chickpea & fava bean croquettes, tahini sauce, pickles (6 pieces)', price: 16, category: 'mezza', dietary: ['V', 'VG'], subcategory: 'HOT MEZZA' },
  
  // --- SMALL PAN / FROM THE GRILL ---
  { id: 'sp1', name: 'Makanek', description: 'Pan fried Lebanese sausages, lemon, pomegranate molasses, pine nuts', price: 17, category: 'small-pan-grill', subcategory: 'SMALL PAN' },
  { id: 'sp2', name: 'Makanek Harra', description: 'Pan fried Lebanese spicy sausages, lemon, pomegranate molasses, pine nuts', price: 17, category: 'small-pan-grill', subcategory: 'SMALL PAN' },
  { id: 'sp3', name: 'Lahem Me2leh', description: 'Pan fried diced lamb, garlic, olive oil, spices', price: 19, category: 'small-pan-grill', subcategory: 'SMALL PAN' },
  { id: 'g1', name: 'Meshwi Mshakal', description: 'Assorted skewers of kafta, shish tawouk, lahem, grilled tomato & onion, biwaz, grilled capsicum spice bread, garlic dip', price: 32, category: 'small-pan-grill', subcategory: 'FROM THE GRILL' },
  { id: 'g2', name: 'Meshwi Mshakal for Two', description: '2 x assorted skewers of kafta, shish tawouk, lahem, grilled tomato & onion, grilled capsicum spice bread, biwaz, garlic dip', price: 52, category: 'small-pan-grill', subcategory: 'FROM THE GRILL' },
  { id: 'g3', name: 'Lahem Meshwi', description: '3 x skewers of lamb, grilled tomato & onion, grilled capsicum spice bread, biwaz, garlic dip', price: 36, category: 'small-pan-grill', subcategory: 'FROM THE GRILL' },

  { id: 'sp4', name: 'Soujouk', description: 'Pan fried spicy Armenian sausages, garlic, tomato, lemon', price: 17, category: 'small-pan-grill', subcategory: 'SMALL PAN' },
  { id: 'sp5', name: 'Jawaneh', description: 'Pan fried chicken wings, garlic, coriander, lemon', price: 16, category: 'small-pan-grill', subcategory: 'SMALL PAN' },
  { id: 'sp6', name: 'Sawdit Djej', description: 'Pan fried chicken liver, garlic, pomegranate molasses', price: 18, category: 'small-pan-grill', subcategory: 'SMALL PAN' },
  { id: 'sp7', name: 'Fattet Batenjen', description: 'Layered crispy bread, eggplant, garlic yogurt, pine nuts', price: 21, category: 'small-pan-grill', dietary: ['V'], subcategory: 'SMALL PAN' },
  { id: 'g4', name: 'Shish Tawouk', description: '3 x skewers of marinated chicken breast, garlic dip', price: 32, category: 'small-pan-grill', subcategory: 'FROM THE GRILL' },
  { id: 'g5', name: 'Kafta Meshwi', description: '4 x skewers of seasoned minced lamb, biwaz, garlic dip', price: 32, category: 'small-pan-grill', subcategory: 'FROM THE GRILL' },
  { id: 'g6', name: 'Farrouj Meshwi', description: 'Charcoal grilled half chicken, garlic dip, pickles', price: 28, category: 'small-pan-grill', subcategory: 'FROM THE GRILL' },


  // --- SIGNATURE DISHES ---
  { id: 'sd1', name: 'Kebbeh Nayeh', description: 'Fine minced raw meat, burghul, secret mix, radish, onion, fresh chilli, mint, olive oil', price: 28, category: 'signature-dishes' },
  { id: 'sd2', name: '2raydis Harra', description: 'Chilli prawns, tahini, red capsicum, paprika, onion, coriander, vermicelli rice', price: 46, category: 'signature-dishes' },
  { id: 'sd3', name: 'Samkeh Harra', description: 'Pan fried barramundi fillet, chilli, tahini, red capsicum, paprika, spices, roasted nuts, onion, coriander', price: 39, category: 'signature-dishes' },
  { id: 'sd4', name: 'Samkeh A Toum', description: 'Pan fried barramundi, coriander, paprika, lemon, garlic with rocket salad', price: 39, category: 'signature-dishes' },
  { id: 'sd5', name: 'Shawarma Lahem', description: 'Lean lamb strips marinated in vinegar, special spices, served with tomato & onion, tahini, pickles, grilled capsicum spice bread', price: 33, category: 'signature-dishes' },
  { id: 'sd6', name: 'Shawarma Djej', description: 'Chicken thigh strips marinated in garlic, vinegar, lemon juice & special spices, served with tomato & onion, garlic, pickles, grilled capsicum spice bread', price: 30, category: 'signature-dishes' },
  { id: 'sd7', name: 'Mansaf Djej', description: 'Slow cooked chicken, minced meat, seasoned rice, roasted nuts, yoghurt dip', price: 33, category: 'signature-dishes' },
  { id: 'sd8', name: 'Mansaf Lahem', description: 'Slow braised lamb, minced meat, seasoned rice, roasted nuts, yoghurt dip', price: 36, category: 'signature-dishes' },
  { id: 'sd9', name: 'Sayadiyeh', description: 'Spiced fish served with caramelized onion rice, topped with roasted pine nuts and almonds', price: 42, category: 'signature-dishes' },
  { id: 'sd10', name: 'Fattet Hummus', description: 'Layered warm chickpeas, crispy bread, garlic yogurt, topped with browned butter and pine nuts', price: 24, category: 'signature-dishes' },

  // --- KIDS MENU ---
  { id: 'k1', name: 'Hand rolled kafta & chips', description: '', price: 15, category: 'kids-menu' },
  { id: 'k2', name: 'Nuggets & chips', description: '', price: 15, category: 'kids-menu' },
  { id: 'k3', name: 'Shish tawouk & chips', description: '', price: 15, category: 'kids-menu' },
  { id: 'k4', name: 'Chicken wings & chips', description: '', price: 15, category: 'kids-menu' },
  { id: 'k5', name: 'Kids Burger & chips', description: '', price: 16, category: 'kids-menu' },

  // --- SALADS / SIDES ---
  { id: 'ss1', name: 'Fattoush', description: 'Lettuce, tomato, capsicum, cucumber, radish, parsley, shallots, sumac, crunchy Lebanese bread, garlic, mint, pomegranate molasses, lemon dressing', price: 19, category: 'salads-sides', dietary: ['V', 'VG'], subcategory: 'SALADS' },
  { id: 'ss2', name: 'Tabouleh', description: 'Parsley, tomato, mint, burghul, onion, shallots, lemon dressing', price: 19, category: 'salads-sides', dietary: ['V', 'VG'], subcategory: 'SALADS' },
  { id: 'ss3', name: 'Salata', description: 'Cos lettuce, Lebanese cucumber, tomato, onion, mint, garlic, lemon dressing', price: 19, category: 'salads-sides', dietary: ['V', 'VG', 'GF'], subcategory: 'SALADS' },
  { id: 'ss7', name: 'Greek Salad', description: 'Tomato, cucumber, onion, feta cheese, olives, oregano, olive oil', price: 21, category: 'salads-sides', dietary: ['V', 'GF'], subcategory: 'SALADS' },
  { id: 'ss8', name: 'Batata Harra', description: 'Spicy diced potatoes, coriander, garlic, chili, lemon juice', price: 14, category: 'salads-sides', dietary: ['V', 'VG', 'GF'], subcategory: 'SIDES' },
  { id: 'ss4', name: 'Mansaf Rice', description: '', price: 13, category: 'salads-sides', subcategory: 'SIDES' },
  { id: 'ss5', name: 'Noodle Rice', description: '', price: 10, category: 'salads-sides', dietary: ['V', 'VG'], subcategory: 'SIDES' },
  { id: 'ss6', name: 'Chilli Paste', description: '', price: 6, category: 'salads-sides', dietary: ['V', 'VG', 'GF'], subcategory: 'SIDES' },

  // --- FEAST OPTIONS ---
  { id: 'fo1', name: 'Lebanese Bread', description: 'Fresh & Crunchy bread', price: 50, category: 'feast-options', dietary: ['V', 'VG'], subcategory: 'VEGETARIAN' }, // price is 50 per person min 2, will show as 50
  { id: 'fo2', name: 'Olives & Pickles', description: 'Cucumber, turnip, peppers, wild cucumber, olives', price: 50, category: 'feast-options', dietary: ['V', 'VG', 'GF'], subcategory: 'VEGETARIAN' },
  { id: 'fo3', name: 'Baba Ghanouj', description: 'Charred eggplant, tahini, lemon, garlic, olive oil', price: 50, category: 'feast-options', dietary: ['V', 'VG', 'GF'], subcategory: 'VEGETARIAN' },
  { id: 'fo4', name: 'Lebanese Bread', description: 'Fresh & Crunchy bread', price: 65, category: 'feast-options', dietary: ['V', 'VG'], subcategory: 'BAALBEK' },
  { id: 'fo5', name: 'Olives & Pickles', description: 'Cucumber, turnip, peppers, wild cucumber, olives', price: 65, category: 'feast-options', dietary: ['V', 'VG', 'GF'], subcategory: 'BAALBEK' },
  { id: 'fo6', name: 'Baba Ghanouj', description: 'Charred eggplant, tahini, lemon, garlic, olive oil', price: 65, category: 'feast-options', dietary: ['V', 'VG', 'GF'], subcategory: 'BAALBEK' },

  { id: 'fo7', name: 'Lebanese Bread', description: 'Fresh & Crunchy bread', price: 85, category: 'feast-options', dietary: ['V', 'VG'], subcategory: 'ZAHRA ROYAL' },
  { id: 'fo8', name: 'Olives & Pickles', description: 'Cucumber, turnip, peppers, wild cucumber, olives', price: 85, category: 'feast-options', dietary: ['V', 'VG', 'GF'], subcategory: 'ZAHRA ROYAL' },
  { id: 'fo9', name: 'Baba Ghanouj', description: 'Charred eggplant, tahini, lemon, garlic, olive oil', price: 85, category: 'feast-options', dietary: ['V', 'VG', 'GF'], subcategory: 'ZAHRA ROYAL' },
  { id: 'fo10', name: 'Hummus Beiruti', description: 'Chickpeas, tahini, lemon juice, garlic, parsley', price: 85, category: 'feast-options', dietary: ['V', 'VG', 'GF'], subcategory: 'ZAHRA ROYAL' },


  // --- DESSERTS / FRUIT MOCKTAIL / SNACKS ---
  { id: 'df1', name: 'Knefeh', description: 'Semolina, breadcrumbs, pistachios, sugar syrup, rose & orange blossom water', price: 18, category: 'desserts-mocktails-snacks', dietary: ['V'], subcategory: 'DESSERTS' },
  { id: 'df2', name: 'Knefeh B Jebneh', description: 'Semolina, cheese, breadcrumbs, vermicelli pan fried noodles, pistachios, sugar syrup, rose & orange blossom water', price: 18, category: 'desserts-mocktails-snacks', dietary: ['V'], subcategory: 'DESSERTS' },
  { id: 'df3', name: 'Nammoura', description: 'Semolina, butter, sugar, rose water, almond', price: 14, category: 'desserts-mocktails-snacks', dietary: ['V'], subcategory: 'DESSERTS' },
  { id: 'df7', name: 'Baklava Plate', description: 'Assortment of layered filo pastry, filled with chopped nuts and sweetened with syrup', price: 16, category: 'desserts-mocktails-snacks', dietary: ['V'], subcategory: 'DESSERTS' },
  { id: 'df8', name: 'Halawet El Jibn', description: 'Sweet cheese rolls stuffed with clotted cream (ashta), crowned with pistachios and rose petal jam', price: 17, category: 'desserts-mocktails-snacks', dietary: ['V'], subcategory: 'DESSERTS' },
  { id: 'df9', name: 'Muhallebi', description: 'Creamy milk pudding infused with orange blossom water and topped with crushed pistachios', price: 12, category: 'desserts-mocktails-snacks', dietary: ['V', 'GF'], subcategory: 'DESSERTS' },
  { id: 'df4', name: 'Strawberry Fantasy', description: 'Strawberry blended mocktail with a mix of seasonal fruit, ashta & soaked almonds, drizzled in honey', price: 15, category: 'desserts-mocktails-snacks', dietary: ['V', 'GF'], subcategory: 'FRUIT MOCKTAIL' },
  { id: 'df5', name: 'Golden Sunset', description: 'Mango blended mocktail with a mix of seasonal fruit, ashta & soaked almonds, drizzled in honey', price: 15, category: 'desserts-mocktails-snacks', dietary: ['V', 'GF'], subcategory: 'FRUIT MOCKTAIL' },
  { id: 'df6', name: 'Exotic Emerald', description: 'Avocado blended mocktail with a mix of seasonal fruit, ashta & soaked almonds, drizzled in honey', price: 15, category: 'desserts-mocktails-snacks', dietary: ['V', 'GF'], subcategory: 'FRUIT MOCKTAIL' },

  // --- BEVERAGES ---
  { id: 'bv1', name: 'Naughty Lebo', description: 'Midori, Pineapple Juice, Lime, Sumac', price: 20, category: 'beverages', subcategory: 'COCKTAILS' },
  { id: 'bv2', name: 'Mojito Beirutiyeh', description: 'Bacardi, Cointreau, Passionfruit, Fresh Lime, Mint, Fresh Zaatar', price: 20, category: 'beverages', subcategory: 'COCKTAILS' },
  { id: 'bv3', name: 'Queen Of Lebanon', description: 'Gin, Fresh Raspberry, Lime, Rose Syrup', price: 20, category: 'beverages', subcategory: 'COCKTAILS' },
  { id: 'bv4', name: 'Watermelon Bellini', description: 'Fresh watermelon, Strawberry, Mint, Lime', price: 14, category: 'beverages', subcategory: 'MOCKTAILS' },
  { id: 'bv5', name: 'Lemon & Mint Crush', description: 'Fresh Lemon, Lime Juice, Fresh Mint, Sugar', price: 14, category: 'beverages', subcategory: 'MOCKTAILS' },
  { id: 'bv6', name: 'Peach Punch', description: 'Peach Tea, Passionfruit, Lemon, Soda Water', price: 14, category: 'beverages', subcategory: 'MOCKTAILS' },
  { id: 'bv7', name: 'Lebanese Coffee', description: 'Traditional unfiltered dark roasted coffee, cardamom infused', price: 6, category: 'beverages', subcategory: 'HOT DRINKS' },
  { id: 'bv8', name: 'Mint Tea', description: 'Black tea infused with fresh mint leaves and sugar', price: 5, category: 'beverages', subcategory: 'HOT DRINKS' },
  { id: 'bv9', name: 'Ayran', description: 'Traditional savory yogurt-based beverage with a hint of salt', price: 8, category: 'beverages', subcategory: 'COLD DRINKS' },
  { id: 'bv10', name: 'Fresh Orange Juice', description: 'Freshly squeezed seasonal oranges', price: 9, category: 'beverages', subcategory: 'COLD DRINKS' },

  { id: 'bv11', name: 'Beirut Sunset', description: 'Aperol, Prosecco, Soda, Fresh Orange', price: 18, category: 'beverages', subcategory: 'COCKTAILS' },
  { id: 'bv12', name: 'Espresso Martini', description: 'Vodka, Kahlua, Espresso, Sugar Syrup', price: 22, category: 'beverages', subcategory: 'COCKTAILS' },
  { id: 'bv13', name: 'Arak (Glass)', description: 'Traditional Lebanese anise spirit', price: 12, category: 'beverages', subcategory: 'COCKTAILS' },
  { id: 'bv14', name: 'Virgin Mojito', description: 'Fresh Lime, Mint, Soda, Sugar', price: 12, category: 'beverages', subcategory: 'MOCKTAILS' },
  { id: 'bv15', name: 'Pomegranate Spritz', description: 'Pomegranate Juice, Soda, Mint, Lime', price: 14, category: 'beverages', subcategory: 'MOCKTAILS' },
  { id: 'bv16', name: 'Jallab', description: 'Date molasses, rose water, pine nuts, crushed ice', price: 10, category: 'beverages', subcategory: 'COLD DRINKS' },
  { id: 'bv17', name: 'Polo', description: 'Fresh Lemon & Mint blended with ice', price: 11, category: 'beverages', subcategory: 'COLD DRINKS' },
  { id: 'bv18', name: 'Iced Coffee', description: 'Espresso, milk, ice cream, whipped cream', price: 9, category: 'beverages', subcategory: 'COLD DRINKS' },
  { id: 'bv19', name: 'Chamomile Tea', description: 'Herbal tea', price: 5, category: 'beverages', subcategory: 'HOT DRINKS' },
  { id: 'bv20', name: 'Latte / Cappuccino', description: 'Espresso with steamed milk', price: 5, category: 'beverages', subcategory: 'HOT DRINKS' },


  // --- SHISHA ---
  { id: 'sh1', name: 'Berry Breeze', description: 'Blueberry, Kiwi, Mint', price: 60, category: 'shisha', subcategory: 'HOUSE FLAVOURS' },
  { id: 'sh2', name: 'Blue Eye', description: 'Passionfruit, Watermelon, Mint, Blueberry, Melon, Ice', price: 60, category: 'shisha', subcategory: 'HOUSE FLAVOURS' },
  { id: 'sh3', name: 'Gothem', description: 'Blueberry, Melon, Grape', price: 60, category: 'shisha', subcategory: 'HOUSE FLAVOURS' },
  { id: 'sh4', name: 'Hearts Desire', description: 'Fruit salad', price: 60, category: 'shisha', subcategory: 'HOUSE FLAVOURS' },
  { id: 'sh5', name: 'Zahra Nights', description: 'House blend of stone fruit and mint', price: 60, category: 'shisha', subcategory: 'HOUSE FLAVOURS' },
  { id: 'sh6', name: 'Bagdadi', description: 'First Head 60, Second Head 40', price: 60, category: 'shisha', subcategory: 'CHOOSE UP TO 2 FLAVOURS' },
  { id: 'sh7', name: 'Blueberry + Mint', description: 'First Head 60, Second Head 40', price: 60, category: 'shisha', subcategory: 'CHOOSE UP TO 2 FLAVOURS' },
  { id: 'sh8', name: 'Double Apple', description: 'First Head 60, Second Head 40', price: 60, category: 'shisha', subcategory: 'CHOOSE UP TO 2 FLAVOURS' },
  { id: 'sh9', name: 'Grape + Mint', description: 'First Head 60, Second Head 40', price: 60, category: 'shisha', subcategory: 'CHOOSE UP TO 2 FLAVOURS' },
  { id: 'sh10', name: 'Gum + Mint', description: 'First Head 60, Second Head 40', price: 60, category: 'shisha', subcategory: 'CHOOSE UP TO 2 FLAVOURS' },
  { id: 'sh11', name: 'Kiwi', description: 'First Head 60, Second Head 40', price: 60, category: 'shisha', subcategory: 'CHOOSE UP TO 2 FLAVOURS' },
  { id: 'sh12', name: 'Love 66', description: 'First Head 60, Second Head 40', price: 60, category: 'shisha', subcategory: 'CHOOSE UP TO 2 FLAVOURS' }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Maya Chen',
    rating: 5,
    timeAgo: '2 weeks ago',
    comment: 'The room is warm, the wait was short, and the grill came out still smoking. Staff kept the coals going on the deck without hovering.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'r2',
    author: 'Sienna Henderson',
    rating: 5,
    timeAgo: '1 month ago',
    comment: 'Came back for the hummus and the outdoor deck. The mezze arrives ready to share, and the lounge stays lively without getting loud.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 'r3',
    author: 'Marcus Vance',
    rating: 5,
    timeAgo: '2 months ago',
    comment: 'Had a wonderful meal here today with the family! The food was delicious and the atmosphere was perfect. We had the Mixed Grill Feast and the meats were so tender and juicy. Traditional Bouza is a must!',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
  }
];
