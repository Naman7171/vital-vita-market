
// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  category: string;
  tags: string[];
  images: string[];
  featured: boolean;
  bestSeller: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Wishlist {
  products: Product[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
