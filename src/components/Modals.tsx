import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Business, Event, Deal, Story, BusinessPostcard, Category } from '../types';
import { X, MapPin, Phone, Globe, Star, CheckCircle, Calendar, Users, Clock, Tag, Share2, Heart, ArrowRight, Play, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface ModalProps {
  onClose: () => void;
}

export const BusinessDetailModal: React.FC<{ business: Business | null } & ModalProps> = ({ business, onClose }) => {
  const { t } = useTranslation();
  if (!business) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white transition-all z-10 hover:scale-110 active:scale-95"><X className="w-5 h-5" /></button>
          <div className="aspect-video w-full relative">
            <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-neon-orange text-white text-[10px] font-black uppercase tracking-widest rounded-full w-fit shadow-neon-orange">{business.category}</div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none flex items-center gap-3">{business.name} {business.isVerified && <CheckCircle className="w-8 h-8 text-neon-blue" />}</h2>
              </div>
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><span className="text-lg font-black text-white">{business.rating}</span></div>
            </div>
          </div>
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-white tracking-tighter uppercase">About</h3>
                <p className="text-lg text-white/60 font-medium leading-relaxed">{business.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2 hover:border-white/20 transition-colors"><div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Location</div><div className="text-sm font-bold text-white flex items-center gap-2"><MapPin className="w-4 h-4 text-neon-orange" /> {business.city}, {business.governorate}</div></div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2 hover:border-white/20 transition-colors"><div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Phone</div><div className="text-sm font-bold text-white flex items-center gap-2"><Phone className="w-4 h-4 text-neon-orange" /> {business.phone}</div></div>
              </div>
            </div>
            <div className="space-y-6">
              <button onClick={() => toast.info('Opening map...')} className="w-full py-4 rounded-2xl bg-neon-orange text-white font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-neon-orange flex items-center justify-center gap-2 hover:scale-105 active:scale-95"><MapPin className="w-4 h-4" /> Get Directions</button>
              <button onClick={() => toast.info('Calling business...')} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"><Phone className="w-4 h-4" /> Call Now</button>
              <button onClick={() => toast.info('Opening website...')} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"><Globe className="w-4 h-4" /> Visit Website</button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const EventDetailModal: React.FC<{ event: Event | null } & ModalProps> = ({ event, onClose }) => {
  if (!event) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white transition-all z-10 hover:scale-110 active:scale-95"><X className="w-5 h-5" /></button>
          <div className="aspect-video w-full relative">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-neon-orange text-[10px] font-black uppercase tracking-widest"><Calendar className="w-3 h-3" /> {new Date(event.date).toLocaleDateString()}</div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">{event.title}</h2>
              </div>
            </div>
          </div>
          <div className="p-8 space-y-8">
            <p className="text-lg text-white/60 font-medium leading-relaxed">{event.description}</p>
            <div className="flex items-center gap-8 py-6 border-y border-white/5">
              <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest"><MapPin className="w-4 h-4 text-neon-orange" /> {event.location}</div>
              <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest"><Users className="w-4 h-4 text-neon-orange" /> {event.attendees} Attending</div>
            </div>
            <button onClick={() => { toast.success('Registration successful!'); onClose(); }} className="w-full py-5 rounded-2xl bg-neon-orange text-white font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-neon-orange hover:scale-[1.02] active:scale-[0.98]">Register Now</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const DealModal: React.FC<{ deal: Deal | null } & ModalProps> = ({ deal, onClose }) => {
  if (!deal) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white/40 hover:text-white transition-all z-10 hover:scale-110 active:scale-95"><X className="w-5 h-5" /></button>
          <div className="p-12 text-center space-y-8">
            <div className="w-24 h-24 bg-neon-orange rounded-3xl flex items-center justify-center mx-auto shadow-neon-orange rotate-12"><Tag className="w-12 h-12 text-white" /></div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{deal.discount} OFF</h2>
              <p className="text-sm text-neon-orange font-black uppercase tracking-widest">At {deal.business}</p>
            </div>
            <p className="text-lg text-white/60 font-medium leading-relaxed">{deal.description}</p>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 border-dashed"><div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Your Voucher Code</div><div className="text-3xl font-mono font-black text-white tracking-widest">IRAQ-{Math.random().toString(36).substr(2, 6).toUpperCase()}</div></div>
            <button onClick={onClose} className="w-full py-5 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-orange-50 transition-all hover:scale-[1.02] active:scale-[0.98]">Done</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const StoryViewer: React.FC<{ story: Story | null } & ModalProps> = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setProgress(p => p + 1), 50);
    if (progress >= 100) onClose();
    return () => clearInterval(timer);
  }, [progress, onClose]);
  if (!story) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
      <div className="relative w-full max-w-lg h-full md:h-[90vh] md:rounded-[40px] overflow-hidden">
        <img src={story.image} alt="Story" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex gap-1 mb-4">{[1, 2, 3].map(i => (<div key={i} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: i === 1 ? `${progress}%` : i < 1 ? '100%' : '0%' }} className="h-full bg-white" /></div>))}</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><img src={story.userAvatar} className="w-10 h-10 rounded-full border-2 border-orange-500" /><div><div className="text-sm font-black text-white">{story.userName}</div><div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">2h ago</div></div></div>
            <button onClick={onClose} className="p-2 text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4"><input type="text" placeholder="Send a message..." className="flex-1 bg-white/10 border border-white/10 rounded-full py-3 px-6 text-sm text-white placeholder:text-white/40 focus:outline-none" /><button className="p-3 rounded-full bg-orange-500 text-white"><Heart className="w-5 h-5" /></button></div>
      </div>
    </div>
  );
};

export const SubcategoryModal: React.FC<{ category: Category | null, onSelect: (sub: string) => void } & ModalProps> = ({ category, onSelect, onClose }) => {
  if (!category) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all z-10 hover:scale-110 active:scale-95"><X className="w-5 h-5" /></button>
          <div className="p-12 space-y-8">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${category.color} text-white shadow-lg`}><category.icon className="w-6 h-6" /></div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">{category.label}</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {category.subcategories.map((sub: string) => (
                <button key={sub} onClick={() => onSelect(sub)} className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-orange/50 transition-all duration-300 text-left">
                  <span className="text-sm font-black text-white/80 group-hover:text-white uppercase tracking-widest">{sub}</span>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-neon-orange group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const PostcardModal: React.FC<{ postcard: BusinessPostcard | null } & ModalProps> = ({ postcard, onClose }) => {
  if (!postcard) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }} 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl bg-[#fdfcf0] border-8 border-white rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-20 pointer-events-none" />
          <div className="md:w-1/2 aspect-square md:aspect-auto relative p-4">
            <img src={postcard.image} alt="Postcard Front" className="w-full h-full object-cover rounded-lg sepia-[0.2]" />
            <div className="absolute top-8 right-8 w-20 h-20 bg-neon-orange/10 border-2 border-dashed border-neon-orange/30 rounded-lg flex items-center justify-center rotate-12"><div className="text-[10px] font-black text-neon-orange/50 uppercase tracking-widest text-center leading-tight">IRAQ<br />POST</div></div>
          </div>
          <div className="md:w-1/2 p-12 flex flex-col justify-between border-l-2 border-black/5 border-dashed">
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-4xl font-serif italic font-black text-zinc-900 tracking-tighter leading-none">{postcard.title}</h2>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest"><MapPin className="w-4 h-4 text-neon-orange" /> {postcard.governorate}, Iraq</div>
                </div>
                <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 hover:scale-110 active:scale-95 transition-transform"><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-6">
                <p className="text-xl font-serif italic text-zinc-700 leading-relaxed">"{postcard.description}"</p>
                <div className="flex items-center gap-4"><div className="flex items-center gap-1 px-3 py-1.5 bg-zinc-900 text-white rounded-xl"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><span className="text-sm font-black">{postcard.rating}</span></div><div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Verified Local Business</div></div>
              </div>
            </div>
            <div className="pt-12 flex items-center justify-between">
              <div className="space-y-1"><div className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Postmarked</div><div className="text-xs font-black text-zinc-900 uppercase tracking-widest">{new Date().toLocaleDateString()}</div></div>
              <button onClick={() => toast.success('Postcard shared!')} className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white font-black text-xs uppercase tracking-widest hover:bg-neon-orange transition-all hover:scale-105 active:scale-95"><Share2 className="w-4 h-4" /> Share Postcard</button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
