import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Event } from '../types';
import { Calendar, MapPin, Users, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface PersonalizedEventsProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export const PersonalizedEvents: React.FC<PersonalizedEventsProps> = ({ events, onEventClick }) => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-widest text-neon-orange">Don't Miss Out</div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Upcoming <br /> <span className="text-white/20">Events</span>
            </h2>
          </div>
          <div className="text-sm text-white/40 font-bold max-w-xs md:text-right italic uppercase tracking-widest">
            "Experience the heartbeat of the city through local gatherings and celebrations."
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onEventClick(event)}
              className="group relative flex flex-col sm:flex-row rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-orange/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl"
            >
              {/* Image Section */}
              <div className="sm:w-1/3 aspect-square sm:aspect-auto overflow-hidden relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Date Badge */}
                <div className="absolute top-6 left-6 flex flex-col items-center justify-center w-14 h-14 bg-neon-orange text-white rounded-2xl shadow-neon-orange z-10">
                  <span className="text-lg font-black leading-none">{new Date(event.date).getDate()}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-8 flex flex-col justify-between relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-neon-orange text-[10px] font-black uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-neon-orange transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-sm text-white/40 font-medium leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin className="w-3 h-3 text-neon-orange" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      <Users className="w-3 h-3 text-neon-orange" />
                      <span>{event.attendees} Going</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-orange transition-all shadow-lg">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
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
