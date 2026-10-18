export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  tags?: string[];
  imageUrl?: string;
  dietary?: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  comment: string;
  avatarUrl?: string;
}

export interface BookingDetails {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  experience: 'dining' | 'shisha';
  specialRequests?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOption?: string;
}
