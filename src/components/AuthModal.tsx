import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Role } from '../types';
import { X, User, Store, Mail, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: Role) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<Role>('user');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-orange/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-neon-orange/5 blur-[80px] rounded-full pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-neon-orange/30 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-12 relative z-10">
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="text-xs font-black uppercase tracking-widest text-neon-orange flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 shadow-neon-orange" /> {activeTab === 'signin' ? 'Welcome Back' : 'Join Us'}
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                    {activeTab === 'signin' ? t('login') : t('signup')}
                  </h2>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setActiveTab('signin')}
                    className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === 'signin' ? 'bg-neon-orange text-white shadow-neon-orange' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {t('login')}
                  </button>
                  <button
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === 'signup' ? 'bg-neon-orange text-white shadow-neon-orange' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {t('signup')}
                  </button>
                </div>

                {/* Role Selector (Only for Sign Up) */}
                {activeTab === 'signup' && (
                  <div className="space-y-4">
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Select Your Role</div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedRole('user')}
                        className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                          selectedRole === 'user' ? 'bg-neon-orange/10 border-neon-orange text-white shadow-[0_0_20px_rgba(255,99,33,0.1)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                        }`}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-widest">{t('visitor')}</span>
                      </button>
                      <button
                        onClick={() => setSelectedRole('owner')}
                        className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                          selectedRole === 'owner' ? 'bg-neon-orange/10 border-neon-orange text-white shadow-[0_0_20px_rgba(255,99,33,0.1)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                        }`}
                      >
                        <Store className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-widest">{t('businessOwner')}</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onLogin(selectedRole)}
                    className="w-full flex items-center justify-center gap-4 p-5 rounded-[24px] bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-orange-50 transition-all shadow-xl group"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {activeTab === 'signin' ? t('continueWithGoogle') : t('continueWithGoogle')}
                  </motion.button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <div className="relative flex justify-center"><span className="bg-[#0a0a0a] px-4 text-[10px] font-black text-white/20 uppercase tracking-widest">OR</span></div>
                  </div>

                  <div className="space-y-2">
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-4 p-5 rounded-[24px] bg-white/5 border border-white/10 text-white/20 font-black text-sm uppercase tracking-widest cursor-not-allowed"
                    >
                      <Mail className="w-5 h-5" />
                      {t('comingSoon')}
                    </button>
                    <p className="text-[10px] text-center font-bold text-white/20 uppercase tracking-widest">
                      {t('emailComingSoon')}
                    </p>
                  </div>
                </div>

                <div className="pt-8 flex items-center gap-4 text-white/20">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3" /> Encrypted
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3" /> Private
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
