import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { BusinessPostcard } from '../types';
import { MapPin, ArrowRight, Star, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface BusinessPostcardsSectionProps {
  postcards: BusinessPostcard[];
  onPostcardClick: (postcard: BusinessPostcard) => void;
}

export const BusinessPostcardsSection: React.FC<BusinessPostcardsSectionProps> = ({ postcards, onPostcardClick }) => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-widest text-neon-orange flex items-center gap-2">
              <Heart className="w-3 h-3 shadow-neon-orange" /> From Iraq, with Love
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Business <br /> <span className="text-white/20">Postcards</span>
            </h2>
          </div>
          <div className="hidden md:block text-sm text-white/40 font-bold max-w-xs text-right italic">
            "A vintage take on modern local businesses. Collect and share your favorites."
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {postcards.map((postcard, idx) => (
            <motion.div
              key={postcard.id}
              initial={{ opacity: 0, scale: 0.9, rotate: idx % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              whileHover={{ rotate: idx % 2 === 0 ? 2 : -2, scale: 1.05 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => onPostcardClick(postcard)}
              className="group relative flex flex-col p-6 rounded-[40px] bg-[#fdfcf0] border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden transform transition-all duration-500"
            >
              {/* Vintage Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-20 pointer-events-none" />
              
              {/* Image Section */}
              <div className="aspect-[4/3] w-full overflow-hidden relative rounded-2xl border-2 border-black/5">
                <img 
                  src={postcard.image} 
                  alt={postcard.title} 
                  className="w-full h-full object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-700"
                />
                
                {/* Stamp */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-neon-orange/10 border-2 border-dashed border-neon-orange/30 rounded-lg flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <div className="text-[8px] font-black text-neon-orange/50 uppercase tracking-widest text-center leading-tight">
                    IRAQ<br />POST
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="pt-6 space-y-4 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif italic font-black text-zinc-900 tracking-tighter leading-none">
                      {postcard.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin className="w-3 h-3 text-neon-orange" />
                      <span>{postcard.governorate}, Iraq</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-zinc-900 text-white rounded-lg shadow-lg">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-black">{postcard.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 font-medium leading-relaxed font-serif italic line-clamp-2">
                  "{postcard.description}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    Series 01 / No. {idx + 1}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-neon-orange transition-all shadow-lg group-hover:shadow-neon-orange/20">
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Rough Edges Effect */}
              <div className="absolute inset-0 border-[12px] border-white/50 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
