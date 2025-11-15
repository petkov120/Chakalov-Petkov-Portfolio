import { motion } from 'motion/react';
import React from 'react';
import { useSound } from '../../hooks/useSound';
import { AnimatedSection } from '../common/AnimatedSection';

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  description: string;
  imageSrc: string;
  backgroundColor: string;
  onViewCaseStudy?: () => void;
  dataSection?: string;
}

export function ProjectCard({ 
  title, 
  category, 
  year, 
  description, 
  imageSrc, 
  backgroundColor,
  onViewCaseStudy,
  dataSection
}: ProjectCardProps) {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleClick = () => {
    if (onViewCaseStudy) {
      onViewCaseStudy();
      playSuccessSound();
    }
  };

  return (
    <article 
      className="max-w-3xl mx-auto rounded-3xl bg-white shadow-sm overflow-hidden"
      data-section={dataSection}
    >
      {/* Thumbnail area */}
      <div 
        className={`p-6 sm:p-8 cursor-pointer group relative ${onViewCaseStudy ? '' : 'pointer-events-none'}`}
        style={{ backgroundColor }}
        onClick={onViewCaseStudy ? handleClick : undefined}
        role={onViewCaseStudy ? "button" : undefined}
        tabIndex={onViewCaseStudy ? 0 : undefined}
        onKeyDown={onViewCaseStudy ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        } : undefined}
        onMouseEnter={() => playHoverSound(750, 150, 0.12)}
      >
        <motion.div
          className="mx-auto max-h-72 w-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
        >
          <div
            className="w-full h-full bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url('${imageSrc}')` }}
            role="img"
            aria-label={`${title} UI preview`}
          />
        </motion.div>
        
        {onViewCaseStudy && (
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 font-medium text-[#150c0c] text-sm sm:text-base tracking-tight flex items-center gap-2 shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>👁️</span>
              <span className="hidden sm:inline">View Case Study</span>
              <span className="sm:hidden">View</span>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Text area */}
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-3">
        <header className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm sm:text-base font-semibold text-[#150c0c]">
            {title}
          </h3>
          <div className="text-[11px] sm:text-xs text-neutral-500 text-right">
            {category}
            <span className="ml-1">· {year}</span>
          </div>
        </header>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-700">
          {description}
        </p>
      </div>
    </article>
  );
}


