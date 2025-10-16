import React from 'react';
import { motion } from 'motion/react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = "Loading...", className = "" }: LoadingStateProps) {
  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`} role="status" aria-live="polite">
      <div className="text-center">
        {/* Animated loading indicator */}
        <motion.div
          className="w-12 h-12 mx-auto mb-4 border-3 border-gray-200 border-t-[#ac83f3] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
        
        {/* Loading text with subtle animation */}
        <motion.div
          className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-[#7c736a] text-sm md:text-base tracking-[-0.01em]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {message}
        </motion.div>
        
        {/* Screen reader text */}
        <span className="sr-only">Content is loading, please wait</span>
      </div>
    </div>
  );
}

export function ImageLoadingState({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-gray-100 animate-pulse flex items-center justify-center ${className}`} role="img" aria-label="Image loading">
      <motion.div
        className="text-gray-400 text-2xl"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        🖼️
      </motion.div>
    </div>
  );
}

export function ContentLoadingState({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Content loading">
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-4 bg-gray-200 rounded animate-pulse ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.2 
          }}
        />
      ))}
      <span className="sr-only">Content is loading</span>
    </div>
  );
}