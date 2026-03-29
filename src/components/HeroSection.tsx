import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Compass, Store, TrendingUp, UserPlus, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExplore: () => void;
  onViewBusinesses: () => void;
  onTrending: () => void;
  onJoinOwner: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onViewBusinesses,
  onTrending,
  onJoinOwner
}) => {
  const { t } = useTranslation();

  const actions = [
    { icon: Compass, label: t('exploreCity'), onClick: onExplore, color: 'bg-neon-orange', shadow: 'shadow-neon-orange' },
    { icon: Store, label: t('viewBusinesses'), onClick: onViewBusinesses, color: 'bg-neon-blue', shadow: 'shadow-neon-blue' },
    { icon: TrendingUp, label: t('seeTrending'), onClick: onTrending, color: 'bg-neon-purple', shadow: 'shadow-neon-purple' },
    { icon: UserPlus, label: t('joinAsOwner'), onClick: onJoinOwner, color: 'bg-neon-green', shadow: 'shadow-neon-green' },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-[#050505]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-neon-orange/10 blur-[150px] rounded-full -z-10 opacity-50" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-neon-blue/10 blur-[120px] rounded-full -z-10 opacity-30" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-neon-purple/10 blur-[100px] rounded-full -z-10 opacity-20" />

      <div className="mx-auto max-w-7xl px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-neon-orange text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-neon-orange/10"
          >
            <span className="w-2 h-2 rounded-full bg-neon-orange animate-pulse shadow-neon-orange" />
            Discover Iraq's Hidden Gems
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-8 uppercase">
            YOUR <span className="text-neon-orange drop-shadow-neon-orange">COMPASS</span> <br />
            TO THE <span className="italic font-serif text-white/20">HEART</span> OF <span className="text-neon-blue drop-shadow-neon-blue">IRAQ</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/40 font-medium leading-relaxed mb-16 px-4">
            Connect with local businesses, discover exclusive deals, and explore the vibrant 
            culture of every governorate across the cradle of civilization.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {actions.map((action, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  delay: 0.4 + idx * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                onClick={action.onClick}
                className="group relative flex flex-col items-center gap-6 p-10 rounded-[50px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-orange/30 transition-all duration-500 overflow-hidden shadow-2xl"
              >
                <div className={`p-5 rounded-2xl ${action.color} text-white ${action.shadow} group-hover:scale-110 transition-transform duration-500`}>
                  <action.icon className="w-8 h-8" />
                </div>
                <span className="text-xs font-black text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">
                  {action.label}
                </span>
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                  <ArrowRight className="w-5 h-5 text-neon-orange" />
                </div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Marquee or Stats (Optional) */}
      <div className="mt-32 w-full overflow-hidden border-y border-white/5 py-8 bg-white/[0.02] relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-white/10 text-[10px] font-black uppercase tracking-[0.5em]">
              <span className="hover:text-neon-orange transition-colors cursor-default">Baghdad</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-orange/20" />
              <span className="hover:text-neon-blue transition-colors cursor-default">Erbil</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-blue/20" />
              <span className="hover:text-neon-purple transition-colors cursor-default">Basra</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-purple/20" />
              <span className="hover:text-neon-green transition-colors cursor-default">Nineveh</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
