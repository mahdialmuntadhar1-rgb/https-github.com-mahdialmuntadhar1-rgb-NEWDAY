import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Business } from '../types';
import { Star, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { BusinessCardSkeleton } from './Skeleton';

interface FeaturedBusinessesProps {
  businesses: Business[];
  onBusinessClick: (business: Business) => void;
  isLoading?: boolean;
}

export const FeaturedBusinesses: React.FC<FeaturedBusinessesProps> = ({ businesses, onBusinessClick, isLoading = false }) => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-neon-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-widest text-neon-orange">Top Rated</div>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Featured <br /> <span className="text-white/20">Businesses</span>
            </h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="hidden md:flex items-center gap-2 text-sm font-black text-white/40 hover:text-neon-orange transition-colors uppercase tracking-widest"
          >
            View All <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <BusinessCardSkeleton />
              <BusinessCardSkeleton />
              <BusinessCardSkeleton />
            </>
          ) : (
            businesses.map((business, idx) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onBusinessClick(business)}
                className="group relative flex flex-col rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-orange/30 transition-all duration-500 cursor-pointer overflow-hidden glass"
              >
                {/* Image Container */}
                <div className="aspect-video w-full overflow-hidden relative">
                  <img 
                    src={business.image} 
                    alt={business.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-1 bg-black/50 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-black text-white">{business.rating}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-6 right-6 px-3 py-1.5 bg-neon-orange text-[10px] font-black text-white rounded-full uppercase tracking-widest shadow-neon-orange">
                    {business.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-neon-orange transition-colors">
                      {business.name}
                    </h3>
                    {business.isVerified && (
                      <CheckCircle className="w-5 h-5 text-neon-blue drop-shadow-neon-blue" />
                    )}
                  </div>

                  <p className="text-sm text-white/40 font-medium leading-relaxed line-clamp-2">
                    {business.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
                      <MapPin className="w-3 h-3 text-neon-orange" />
                      <span>{business.city}, {business.governorate}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-orange transition-all">
                      <ArrowRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
