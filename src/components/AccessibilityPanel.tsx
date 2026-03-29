import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Accessibility, X, Type, Eye, Languages, CheckCircle, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContrastChecker } from './Accessibility/ContrastChecker';

interface AccessibilityPanelProps {
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ 
  highContrast, 
  setHighContrast 
}) => {
  const { t, language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  const handleFontSizeChange = (size: 'sm' | 'md' | 'lg') => {
    setFontSize(size);
    document.documentElement.style.fontSize = size === 'sm' ? '14px' : size === 'md' ? '16px' : '18px';
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-40 right-8 md:bottom-28 md:right-8 z-40 w-12 h-12 bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-center shadow-2xl group hover:border-neon-orange/50 transition-all"
      >
        <Accessibility className="w-6 h-6 text-white/40 group-hover:text-neon-orange transition-colors" />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-0 right-0 bottom-0 z-[200] w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 bg-black/50 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <Accessibility className="w-6 h-6 text-neon-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tighter uppercase leading-none">Visual Accessibility</h3>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Customize your experience</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-white/5 text-white/40 hover:text-white transition-all hover:scale-110 active:scale-95">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-12 no-scrollbar">
              {/* High Contrast Toggle */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neon-orange">
                  <Eye className="w-4 h-4" /> High Contrast
                </div>
                <button 
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all ${
                    highContrast 
                      ? 'bg-neon-orange border-neon-orange text-white shadow-neon-orange' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-neon-orange/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {highContrast ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span className="text-sm font-black uppercase tracking-widest">High Contrast Mode</span>
                  </div>
                  <div className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${highContrast ? 'bg-white' : 'bg-white/10'}`}>
                    <motion.div 
                      animate={{ x: highContrast ? 16 : 0 }}
                      className={`w-4 h-4 rounded-full ${highContrast ? 'bg-neon-orange' : 'bg-white/40'}`} 
                    />
                  </div>
                </button>
              </div>

              {/* Contrast Checker */}
              <ContrastChecker />

              {/* Language */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neon-orange">
                  <Languages className="w-4 h-4" /> {t('language')}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {(['en', 'ar', 'ku'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        language === lang 
                          ? 'bg-neon-orange border-neon-orange text-white shadow-neon-orange/20' 
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-neon-orange/30'
                      }`}
                    >
                      <span className="text-sm font-black uppercase tracking-widest">
                        {lang === 'en' ? 'English' : lang === 'ar' ? 'العربية' : 'کوردی'}
                      </span>
                      {language === lang && <CheckCircle className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Size */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neon-orange">
                  <Type className="w-4 h-4" /> Text Size
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                  {(['sm', 'md', 'lg'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleFontSizeChange(size)}
                      className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        fontSize === size ? 'bg-neon-orange text-white shadow-lg' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-black/50 border-t border-white/10">
              <button 
                onClick={() => {
                  setHighContrast(false);
                  handleFontSizeChange('md');
                  setLanguage('en');
                }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-black text-xs uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all"
              >
                Reset to Default <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
