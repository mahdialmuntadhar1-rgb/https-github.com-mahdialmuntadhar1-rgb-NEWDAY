import React from 'react';
import { Home, Search, PlusSquare, LayoutDashboard, User } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileNavProps {
  activeTab: 'home' | 'search' | 'create' | 'dashboard' | 'profile';
  onTabChange: (tab: 'home' | 'search' | 'create' | 'dashboard' | 'profile') => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'create', icon: PlusSquare, label: 'Post' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dash' },
    { id: 'profile', icon: User, label: 'Profile' },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#050505]/80 backdrop-blur-2xl border-t border-white/10 md:hidden z-[100] px-6">
      <div className="h-full flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'text-neon-orange' : 'text-white/40 group-hover:text-white/60'}`}>
                <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-neon-orange' : ''}`} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-neon-orange' : 'text-white/20'}`}>
                {tab.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 w-1 h-1 bg-neon-orange rounded-full shadow-neon-orange"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
