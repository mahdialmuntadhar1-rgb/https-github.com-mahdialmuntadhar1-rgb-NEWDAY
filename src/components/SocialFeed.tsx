import React, { useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Post, User } from '../types';
import { Heart, MessageCircle, Share2, MoreHorizontal, Plus, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { PostSkeleton } from './Skeleton';

interface SocialFeedProps {
  posts: Post[];
  user: User | null;
  onCreatePost: () => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ 
  posts, 
  user, 
  onCreatePost,
  onLoadMore,
  hasMore = false,
  isLoading = false
}) => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading && onLoadMore) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoading, onLoadMore]);

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-3xl px-4 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-widest text-neon-orange">Community</div>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Social <br /> <span className="text-white/20">Feed</span>
            </h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreatePost}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-neon-orange text-white font-black text-sm hover:bg-orange-600 transition-all shadow-neon-orange group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            {(!user || user.role === 'user') ? t('joinAsOwnerToPost') : t('createPost')}
          </motion.button>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                className="group relative flex flex-col rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-orange/30 transition-all duration-500 overflow-hidden glass"
              >
                {/* Header */}
                <div className="p-8 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={post.userAvatar} 
                        alt={post.userName} 
                        className="w-12 h-12 rounded-full border-2 border-neon-orange shadow-neon-orange/20"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-neon-blue rounded-full flex items-center justify-center border-2 border-black shadow-neon-blue/20">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tighter group-hover:text-neon-orange transition-colors">
                        {post.userName}
                      </h4>
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        {new Date(post.createdAt).toLocaleDateString()} • {post.governorate}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-8 pb-4 relative z-10">
                  <p className="text-lg text-white/80 font-medium leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Image */}
                {post.image && (
                  <div className="px-8 pb-4 relative z-10">
                    <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 group-hover:border-neon-orange/20 transition-colors">
                      <img 
                        src={post.image} 
                        alt="Post attachment" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="p-8 pt-4 flex items-center justify-between border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-6">
                    <motion.button 
                      whileTap={{ scale: 1.2 }}
                      className="flex items-center gap-2 text-white/40 hover:text-red-500 transition-all group/btn"
                    >
                      <Heart className="w-5 h-5 group-hover/btn:fill-red-500 transition-all group-active/btn:scale-125" />
                      <span className="text-xs font-black">{post.likes}</span>
                    </motion.button>
                    <button className="flex items-center gap-2 text-white/40 hover:text-neon-blue transition-all group/btn">
                      <MessageCircle className="w-5 h-5 group-hover/btn:fill-neon-blue transition-all" />
                      <span className="text-xs font-black">Comments</span>
                    </button>
                  </div>
                  <button className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Infinite Scroll Trigger */}
          <div ref={ref} className="py-12 flex flex-col gap-8">
            {isLoading && (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            )}
            {!hasMore && posts.length > 0 && (
              <div className="text-center text-white/20 text-xs font-black uppercase tracking-widest">
                You've reached the end of the feed
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

