import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Governorate, User } from '../types';
import { MapPin, User as UserIcon, LogOut, Languages, Sun, Moon, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  selectedGovernorate: Governorate;
  setSelectedGovernorate: (gov: Governorate) => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  navigateTo: (page: 'home' | 'dashboard' | 'listing') => void;
}

const GOVERNORATES: Governorate[] = [
  'Baghdad', 'Erbil', 'Basra', 'Nineveh', 'Duhok', 'Sulaymaniyah', 
  'Kirkuk', 'Diyala', 'Anbar', 'Babil', 'Karbala', 'Najaf', 
  'Qadisiyah', 'Muthanna', 'Dhi Qar', 'Maysan', 'Wasit', 'Salah al-Din'
];

export const Header: React.FC<HeaderProps> = ({
  selectedGovernorate,
  setSelectedGovernorate,
  user,
  onLogin,
  onLogout,
  highContrast,
  setHighContrast,
  navigateTo
}) => {
  const { t, language, setLanguage, isRTL } = useTranslation();
  const [showGovDropdown, setShowGovDropdown] = React.useState(false);

  const getGovKey = (gov: Governorate) => {
    const mapping: Record<Governorate, string> = {
      'Baghdad': 'baghdad',
      'Erbil': 'erbil',
      'Basra': 'basra',
      'Nineveh': 'nineveh',
      'Duhok': 'duhok',
      'Sulaymaniyah': 'sulaymaniyah',
      'Kirkuk': 'kirkuk',
      'Diyala': 'diyala',
      'Anbar': 'anbar',
      'Babil': 'babil',
      'Karbala': 'karbala',
      'Najaf': 'najaf',
      'Qadisiyah': 'qadisiyah',
      'Muthanna': 'muthanna',
      'Dhi Qar': 'dhiQar',
      'Maysan': 'maysan',
      'Wasit': 'wasit',
      'Salah al-Din': 'salahAlDin'
    };
    return mapping[gov];
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <div className="w-10 h-10 bg-neon-orange rounded-xl flex items-center justify-center shadow-neon-orange group-hover:scale-110 transition-transform">
              <MapPin className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase hidden sm:block">
              Iraq<span className="text-neon-orange">Compass</span>
            </span>
          </motion.div>

          {/* Governorate Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowGovDropdown(!showGovDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-orange/50 transition-all group"
            >
              <MapPin className="w-4 h-4 text-neon-orange group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-white/80">{t(getGovKey(selectedGovernorate))}</span>
            </button>

            <AnimatePresence>
              {showGovDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-2 w-64 p-[1px] rounded-2xl animated-gradient-border shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50"
                >
                  <div className="bg-[#0a0a0a] rounded-[15px] p-2 max-h-96 overflow-y-auto no-scrollbar backdrop-blur-2xl">
                    {GOVERNORATES.map((gov) => (
                      <button
                        key={gov}
                        onClick={() => {
                          setSelectedGovernorate(gov);
                          setShowGovDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                          selectedGovernorate === gov 
                            ? 'bg-neon-orange text-white shadow-neon-orange/20' 
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {t(getGovKey(gov))}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
            {(['en', 'ar', 'ku'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-full text-xs font-black uppercase transition-all ${
                  language === lang ? 'bg-neon-orange text-white shadow-neon-orange/20' : 'text-white/40 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Accessibility Toggle */}
          <button 
            onClick={() => setHighContrast(!highContrast)}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-neon-orange/30 transition-all"
            title={t('highContrast')}
          >
            {highContrast ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Profile */}
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-black text-white">{user.name}</div>
                <div className="text-[10px] font-bold text-neon-orange uppercase tracking-widest">{user.role}</div>
              </div>
              <div className="relative group">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full border-2 border-neon-orange cursor-pointer hover:scale-110 transition-transform"
                />
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('logout')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-neon-orange text-white font-black text-sm hover:bg-orange-600 transition-all shadow-neon-orange hover:scale-105 active:scale-95"
            >
              <UserIcon className="w-4 h-4" />
              {t('login')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
