import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Deal } from '../types';
import { Tag, Clock, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface DealsMarketplaceProps {
  deals: Deal[];
  onClaimDeal: (deal: Deal) => void;
}

export const DealsMarketplace: React.FC<DealsMarketplaceProps> = ({ deals, onClaimDeal }) => {
  const { t } = useTranslation();

  const handleClaim = (deal: Deal) => {
    onClaimDeal(deal);
    toast.success(`Claimed ${deal.discount} at ${deal.business}!`, {
      description: 'Check your profile for the voucher code.',
      duration: 5000,
    });
  };

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-widest text-neon-orange flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Save Big Today
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Exclusive <br /> <span className="text-white/20">Deals</span>
            </h2>
          </div>
          <div className="text-sm text-white/40 font-bold max-w-xs md:text-right uppercase tracking-widest">
            Grab these limited-time offers from our top-rated partners.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, idx) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-orange/50 transition-all duration-500 overflow-hidden shadow-2xl"
            >
              {/* Discount Badge */}
              <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-neon-orange text-white rounded-2xl shadow-neon-orange transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                <span className="text-2xl font-black leading-none">{deal.discount}</span>
              </div>

              {/* Image Section */}
              <div className="aspect-square w-full overflow-hidden relative">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Expiry Overlay */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest z-10">
                  <Clock className="w-3 h-3 text-neon-orange" />
                  <span>Expires in {Math.floor(Math.random() * 24) + 1}h</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-4 relative z-10">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white tracking-tighter group-hover:text-neon-orange transition-colors">
                    {deal.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    <Tag className="w-3 h-3 text-neon-orange" />
                    <span>{deal.business}</span>
                  </div>
                </div>

                <p className="text-xs text-white/40 font-medium leading-relaxed line-clamp-2">
                  {deal.description}
                </p>

                <button 
                  onClick={() => handleClaim(deal)}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-neon-orange hover:border-neon-orange transition-all duration-500 flex items-center justify-center gap-2 group/btn hover:scale-105 active:scale-95 shadow-lg"
                >
                  {t('claimDeal')}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
