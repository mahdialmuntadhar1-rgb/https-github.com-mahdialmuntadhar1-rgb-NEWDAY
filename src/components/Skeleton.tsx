import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`bg-white/5 rounded-2xl ${className}`}
    />
  );
};

export const BusinessCardSkeleton = () => (
  <div className="p-4 rounded-[32px] bg-white/5 border border-white/10 space-y-4">
    <Skeleton className="aspect-video w-full rounded-2xl" />
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="w-8 h-8 rounded-full" />
    </div>
  </div>
);

export const PostSkeleton = () => (
  <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <Skeleton className="h-20 w-full" />
    <Skeleton className="aspect-video w-full rounded-2xl" />
    <div className="flex gap-4">
      <Skeleton className="h-8 w-16 rounded-full" />
      <Skeleton className="h-8 w-16 rounded-full" />
    </div>
  </div>
);
