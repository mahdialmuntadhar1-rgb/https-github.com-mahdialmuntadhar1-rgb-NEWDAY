import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Story } from '../types';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface StoriesRingProps {
  stories: Story[];
  onStoryClick: (story: Story) => void;
}

export const StoriesRing: React.FC<StoriesRingProps> = ({ stories, onStoryClick }) => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-4">
          {/* Add Story Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-3 flex-shrink-0 group"
          >
            <div className="relative w-20 h-20 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-neon-orange/50 group-hover:bg-white/10 transition-all duration-500">
              <Plus className="w-8 h-8 text-white/20 group-hover:text-neon-orange transition-colors" />
            </div>
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-white transition-colors">
              Add Story
            </span>
          </motion.button>

          {/* Stories List */}
          {stories.map((story, idx) => (
            <motion.button
              key={story.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStoryClick(story)}
              className="flex flex-col items-center gap-3 flex-shrink-0 group"
            >
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-neon-orange via-neon-blue to-neon-purple group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-neon-orange/20">
                <div className="p-0.5 rounded-full bg-[#050505]">
                  <img 
                    src={story.userAvatar} 
                    alt={story.userName} 
                    className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                {/* Live Indicator */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neon-orange text-[8px] font-black text-white rounded-full uppercase tracking-widest border border-black shadow-neon-orange">
                  Live
                </div>
              </div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                {story.userName.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
