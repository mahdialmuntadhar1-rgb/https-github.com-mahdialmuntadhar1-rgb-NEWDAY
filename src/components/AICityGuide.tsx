import React, { useState } from 'react';
import { Sparkles, Send, Loader2, MapPin, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateCityGuideResponse } from '../services/gemini';
import Markdown from 'react-markdown';
import { useTranslation } from '../context/TranslationContext';

interface AICityGuideProps {
  governorate: string;
}

export const AICityGuide: React.FC<AICityGuideProps> = ({ governorate }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const aiResponse = await generateCityGuideResponse(query, governorate);
      setResponse(aiResponse);
    } catch (err) {
      setError("Failed to get a response from the AI guide. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    `${t('aiGuideSuggestions.restaurants')} ${t(governorate.toLowerCase())}`,
    `${t('aiGuideSuggestions.historical')} ${t(governorate.toLowerCase())}`,
    `${t('aiGuideSuggestions.food')} ${t(governorate.toLowerCase())}`,
    `${t('aiGuideSuggestions.hidden')} ${t(governorate.toLowerCase())}`
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-neon-orange rounded-2xl flex items-center justify-center shadow-neon-orange"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            {t('aiGuide').split(' ')[0]} <br /> <span className="text-white/20">{t('aiGuide').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm max-w-lg">
            {t('aiGuideSubtitle')} <span className="text-neon-orange">{t(governorate.toLowerCase())}</span>. {t('tagline')}.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleAskAI} className="relative mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`${t('aiGuidePlaceholder')} ${t(governorate.toLowerCase())}...`}
              className="w-full bg-white/5 border border-white/10 rounded-[32px] py-6 pl-8 pr-20 text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-neon-orange/50 transition-all shadow-2xl"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-neon-orange rounded-full flex items-center justify-center text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:scale-110 active:scale-95"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </button>
          </form>

          {/* Suggestions */}
          {!response && !isLoading && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(suggestion)}
                  className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-black text-white/40 uppercase tracking-widest hover:bg-white/10 hover:text-white hover:border-neon-orange/50 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-12 rounded-[40px] bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-6"
              >
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-neon-orange/20 border-t-neon-orange rounded-full animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-neon-orange animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white tracking-tighter uppercase">{t('aiGuideConsulting')}</h3>
                  <p className="text-white/40 font-medium">{t('aiGuideGathering')} {t(governorate.toLowerCase())}.</p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-[32px] bg-red-500/10 border border-red-500/20 flex items-center gap-4 text-red-500"
              >
                <Info className="w-6 h-6 flex-shrink-0" />
                <p className="font-bold text-sm uppercase tracking-widest">{error}</p>
              </motion.div>
            )}

            {response && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 md:p-16 rounded-[48px] bg-white/5 border border-white/10 shadow-2xl relative group"
              >
                <div className="absolute top-8 right-8 flex items-center gap-2 text-[10px] font-black text-neon-orange uppercase tracking-widest">
                  <MapPin className="w-3 h-3" /> {t(governorate.toLowerCase())} {t('guide')}
                </div>
                
                <div className="prose prose-invert prose-orange max-w-none">
                  <div className="markdown-body">
                    <Markdown>{response}</Markdown>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <button 
                    onClick={() => { setResponse(null); setQuery(''); }}
                    className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-neon-orange transition-colors"
                  >
                    {t('aiGuideClear')}
                  </button>
                  <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                    {t('aiGuidePoweredBy')} <span className="text-neon-orange">Gemini AI</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
