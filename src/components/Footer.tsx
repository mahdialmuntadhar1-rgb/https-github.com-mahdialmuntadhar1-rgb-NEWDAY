import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { MapPin, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-orange/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group cursor-default">
              <div className="w-10 h-10 bg-neon-orange rounded-xl flex items-center justify-center shadow-neon-orange transition-transform group-hover:scale-110">
                <MapPin className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">
                Iraq<span className="text-neon-orange">Compass</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              The ultimate guide to Iraq's vibrant cities. Discover local businesses, events, and community stories in one place.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.1, color: '#FF6321' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Business Directory', 'Events Calendar', 'Deals Marketplace', 'Community Feed'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-bold text-white/40 hover:text-neon-orange transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">Support</h4>
            <ul className="space-y-4">
              {['Help Center', 'Safety Information', 'Terms of Service', 'Privacy Policy', 'Cookie Settings'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-bold text-white/40 hover:text-neon-orange transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-neon-orange" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Email</div>
                  <div className="text-sm font-bold text-white/60">hello@iraqcompass.com</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-neon-blue" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Phone</div>
                  <div className="text-sm font-bold text-white/60">+964 770 000 0000</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">
            © 2026 Iraq Compass. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">System Operational</span>
            </div>
            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">
              Made with ❤️ in Baghdad
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
