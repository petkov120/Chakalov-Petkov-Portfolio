import { motion, useInView } from 'motion/react';
import React, { useRef } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';

// Memoized AnimatedSection for better performance
export const AnimatedSection = React.memo<{ 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}>(({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.1 // Trigger when 10% is visible
  });

  // Use static values instead of dynamic window checks
  const isMobile = window.innerWidth < 768;
  const yOffset = isMobile ? 20 : 50;
  const duration = isMobile ? 0.5 : 0.8;
  const adjustedDelay = isMobile ? delay * 0.5 : delay;

  return (
    <ErrorBoundary>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: yOffset }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
        transition={{ 
          duration, 
          delay: adjustedDelay, 
          ease: "easeOut" 
        }}
        className={className}
      >
        {children}
      </motion.div>
    </ErrorBoundary>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

