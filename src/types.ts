export type Role = 'user' | 'owner' | 'admin';

export type Governorate = 
  | 'Baghdad' 
  | 'Erbil' 
  | 'Basra' 
  | 'Nineveh' 
  | 'Duhok' 
  | 'Sulaymaniyah' 
  | 'Kirkuk' 
  | 'Diyala' 
  | 'Anbar' 
  | 'Babil' 
  | 'Karbala' 
  | 'Najaf' 
  | 'Qadisiyah' 
  | 'Muthanna' 
  | 'Dhi Qar' 
  | 'Maysan' 
  | 'Wasit' 
  | 'Salah al-Din';

export interface Category {
  id: string;
  label: string;
  icon: any;
  color: string;
  subcategories: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  businessId?: string;
}

export type Language = 'en' | 'ar' | 'ku';

export interface Business {
  id: string;
  name: string;
  category: string;
  city: string;
  governorate: Governorate;
  isVerified: boolean;
  image: string;
  description: string;
  rating: number;
  featured?: boolean;
  phone?: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: number;
  createdAt: string;
  governorate: Governorate;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  createdAt: string;
  governorate: Governorate;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  governorate: Governorate;
  image: string;
  attendees: number;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  business: string;
  discount: string;
  expiry: string;
  image: string;
  governorate: Governorate;
}

export interface BusinessPostcard {
  id: string;
  title: string;
  description: string;
  image: string;
  city: string;
  governorate: Governorate;
  isVerified: boolean;
  rating?: number;
}
