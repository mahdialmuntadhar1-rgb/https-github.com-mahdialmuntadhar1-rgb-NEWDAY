import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { User, Post } from '../types';
import { LayoutDashboard, Plus, Image as ImageIcon, Send, BarChart3, Users, MessageSquare, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface DashboardProps {
  user: User;
  onCreatePost: (content: string, image?: string) => Promise<void>;
  userPosts: Post[];
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onCreatePost, userPosts, onBack }) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onCreatePost(content, image);
      setContent('');
      setImage('');
      toast.success('Post published successfully!', {
        description: 'Your community can now see your update.',
      });
    } catch (error) {
      toast.error('Failed to publish post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { label: 'Total Views', value: '12.4K', icon: BarChart3, color: 'text-blue-500' },
    { label: 'Followers', value: '842', icon: Users, color: 'text-orange-500' },
    { label: 'Engagement', value: '4.8%', icon: MessageSquare, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-neon-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-neon-orange flex items-center justify-center shadow-neon-orange">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                Owner <span className="text-white/20">Dashboard</span>
              </h1>
              <p className="text-sm text-white/40 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                Welcome back, {user.name} <span className="w-1 h-1 rounded-full bg-neon-orange shadow-neon-orange" /> {user.role}
              </p>
            </div>
          </div>
          <motion.button 
            whileHover={{ x: -5 }}
            onClick={onBack}
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-neon-orange/30 transition-all font-black text-sm uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> {t('back')}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Actions */}
          <div className="lg:col-span-1 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 hover:border-neon-orange/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-2xl font-black text-white tracking-tighter">{stat.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="p-8 rounded-[40px] bg-gradient-to-br from-neon-orange to-orange-600 shadow-neon-orange relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <h3 className="text-xl font-black text-white tracking-tighter mb-4 uppercase relative z-10">Grow Your Business</h3>
              <p className="text-sm text-white/80 font-medium leading-relaxed mb-6 relative z-10">
                Promote your business to reach thousands of potential customers in your governorate.
              </p>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-white text-neon-orange font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-all relative z-10 shadow-xl"
              >
                Create Ad Campaign
              </motion.button>
            </div>
          </div>

          {/* Right Column: Post Composer & Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Post Composer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-[40px] bg-white/5 border border-white/10 hover:border-neon-orange/20 transition-colors"
            >
              <h3 className="text-xl font-black text-white tracking-tighter mb-6 uppercase flex items-center gap-2">
                <Plus className="w-5 h-5 text-neon-orange" /> {t('createPost')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening at your business?"
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-orange/50 transition-all resize-none font-medium"
                />
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative flex-1 w-full">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Image URL (optional)"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neon-orange/50 transition-all"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting || !content.trim()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-neon-orange text-white font-black text-sm uppercase tracking-widest hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-neon-orange group"
                  >
                    {isSubmitting ? 'Publishing...' : t('createPost')}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white/40 tracking-tighter uppercase px-4">Your Recent Posts</h3>
              <div className="space-y-4">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <div key={post.id} className="p-6 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 hover:border-neon-orange/20 transition-all">
                      <div className="flex items-center gap-4">
                        {post.image ? (
                          <img src={post.image} className="w-12 h-12 rounded-2xl object-cover" alt="Post" />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-neon-orange/20 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-neon-orange" />
                          </div>
                        )}
                        <div className="space-y-1">
                          <div className="text-sm font-black text-white line-clamp-1">{post.content}</div>
                          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                            {new Date(post.createdAt).toLocaleDateString()} • {post.likes} Likes
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-full bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:bg-neon-orange group-hover:text-white transition-all">
                        Edit
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center rounded-[40px] border border-dashed border-white/10">
                    <p className="text-white/20 text-sm font-black uppercase tracking-widest">No posts yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

