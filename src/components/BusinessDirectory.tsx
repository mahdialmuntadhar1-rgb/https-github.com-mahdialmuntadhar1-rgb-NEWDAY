import React, { useState, useMemo } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Business, Governorate } from '../types';
import { Search, Filter, MapPin, Star, CheckCircle, ArrowLeft, ArrowRight, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BusinessDirectoryProps {
  businesses: Business[];
  onBusinessClick: (business: Business) => void;
  onBack: () => void;
  selectedGovernorate: Governorate;
  initialCategory?: string | null;
  initialSubcategory?: string | null;
}

export const BusinessDirectory: React.FC<BusinessDirectoryProps> = ({
  businesses,
  onBusinessClick,
  onBack,
  selectedGovernorate,
  initialCategory = null,
  initialSubcategory = null
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = useMemo(() => {
    const cats = new Set(businesses.map(b => b.category));
    return Array.from(cats);
  }, [businesses]);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || b.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [businesses, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-neon-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <motion.button 
              whileHover={{ x: -5 }}
              onClick={onBack}
              className="flex items-center gap-2 text-neon-orange font-black text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
            >
              <ArrowLeft className="w-4 h-4" /> {t('back')}
            </motion.button>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Business <br /> <span className="text-white/20">Directory</span>
            </h1>
            <div className="flex items-center gap-2 text-sm text-white/40 font-bold uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-neon-orange" /> {selectedGovernorate}, Iraq
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neon-orange/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-neon-orange text-white shadow-neon-orange' : 'text-white/40 hover:text-white'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-neon-orange text-white shadow-neon-orange' : 'text-white/40 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-8 mb-8 border-b border-white/5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              !selectedCategory ? 'bg-neon-orange text-white shadow-neon-orange' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                selectedCategory === cat ? 'bg-neon-orange text-white shadow-neon-orange' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
          <AnimatePresence mode="popLayout">
            {filteredBusinesses.map((business, idx) => (
              <motion.div
                key={business.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onBusinessClick(business)}
                className={`group relative flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row items-center'} rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-orange/20 transition-all duration-500 cursor-pointer overflow-hidden`}
              >
                {/* Image Section */}
                <div className={`${viewMode === 'grid' ? 'aspect-video w-full' : 'w-48 h-48'} overflow-hidden relative`}>
                  <img 
                    src={business.image} 
                    alt={business.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-1 bg-black/50 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-black text-white">{business.rating}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`p-8 ${viewMode === 'grid' ? 'space-y-4' : 'flex-1 flex items-center justify-between'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-neon-orange transition-colors">
                        {business.name}
                      </h3>
                      {business.isVerified && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <div className="text-[10px] font-black text-neon-orange uppercase tracking-widest">
                      {business.category}
                    </div>
                    {viewMode === 'list' && (
                      <p className="text-sm text-white/40 font-medium leading-relaxed line-clamp-1 max-w-xl">
                        {business.description}
                      </p>
                    )}
                  </div>

                  {viewMode === 'grid' && (
                    <p className="text-sm text-white/40 font-medium leading-relaxed line-clamp-2">
                      {business.description}
                    </p>
                  )}

                  <div className={`flex items-center justify-between ${viewMode === 'grid' ? 'pt-4 border-t border-white/5' : ''}`}>
                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
                      <MapPin className="w-3 h-3 text-neon-orange" />
                      <span>{business.city}, {business.governorate}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-orange group-hover:shadow-neon-orange transition-all">
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="py-24 text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{t('noResults')}</h3>
            <p className="text-white/40 font-medium">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
