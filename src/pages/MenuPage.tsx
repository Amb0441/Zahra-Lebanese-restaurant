import React from 'react';
import MenuSection from '../components/MenuSection';
import { CartItem, MenuItem } from '../types';

interface MenuPageProps {
  handleAddItemToCart: (item: MenuItem) => void;
  setIsCartOpen: (open: boolean) => void;
  cart: CartItem[];
}

export default function MenuPage({ handleAddItemToCart }: MenuPageProps) {
  return (
    <div className="pt-20 pb-0 bg-[#FAF8F5] min-h-screen">
      <MenuSection handleAddItemToCart={handleAddItemToCart} />
    </div>
  );
}
