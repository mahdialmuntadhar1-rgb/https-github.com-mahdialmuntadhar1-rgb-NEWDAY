import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Utensils, Coffee, Hotel, ShoppingBag, Landmark, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Category } from '../types';

interface CategoriesProps {
  onCategoryClick: (category: Category) => void;
}

const CATEGORIES: Category[] = [
  { 
    id: 'restaurants', 
    label: 'Restaurants', 
    icon: Utensils, 
    color: 'bg-orange-500', 
    subcategories: ['Traditional', 'Fast Food', 'Fine Dining', 'Seafood', 'Grills'] 
  },
  { 
    id: 'cafes', 
    label: 'Cafes', 
    icon: Coffee, 
    color: 'bg-blue-500', 
    subcategories: ['Traditional Tea', 'Modern Coffee', 'Shisha Lounges', 'Dessert Shops'] 
  },
  { 
    id: 'hotels', 
    label: 'Hotels', 
    icon: Hotel, 
    color: 'bg-purple-500', 
    subcategories: ['Luxury', 'Budget', 'Resorts', 'Apartments'] 
  },
  { 
    id: 'shops', 
    label: 'Shops', 
    icon: ShoppingBag, 
    color: 'bg-green-500', 
    subcategories: ['Malls', 'Local Souks', 'Electronics', 'Fashion'] 
  },
  { 
    id: 'culture', 
    label: 'Culture', 
    icon: Landmark, 
    color: 'bg-red-500', 
    subcategories: ['Museums', 'Historic Sites', 'Art Galleries', 'Libraries'] 
  },
  { 
    id: 'services', 
    label: 'Services', 
    icon: Briefcase, 
    color: 'bg-yellow-500', 
    subcategories: ['Healthcare', 'Banking', 'Transport', 'Education'] 
  },
];

export const Categories: React.FC<CategoriesProps> = ({ onCategoryClick }) => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-widest text-neon-orange">Explore by</div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Categories</h2>
          </div>
          <div className="text-sm text-white/40 font-bold max-w-xs md:text-right uppercase tracking-widest">
            Browse through thousands of local businesses and services across the country.
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => onCategoryClick(cat)}
              className="group relative flex flex-col items-center justify-center p-8 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-orange/50 transition-all duration-500 overflow-hidden shadow-2xl"
            >
              <div className={`p-4 rounded-2xl ${cat.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 mb-4`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">
                {cat.label}
              </span>
              
              {/* Subcategories count */}
              <div className="mt-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                {cat.subcategories.length} Types
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Decorative Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRight className="w-4 h-4 text-neon-orange" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
