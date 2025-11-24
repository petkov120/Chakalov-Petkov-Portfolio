import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useSound } from '../../hooks/useSound';
import { SPACING } from '../../constants/spacing.js';
import { UnderConstructionModal } from './UnderConstructionModal';

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  description: string;
  imageSrc: string;
  backgroundColor: string;
  onViewCaseStudy?: () => void;
  dataSection?: string;
  showUnderConstruction?: boolean;
}

export function ProjectCard({ 
  title, 
  category, 
  year, 
  description, 
  imageSrc, 
  backgroundColor,
  onViewCaseStudy,
  dataSection,
  showUnderConstruction = false
}: ProjectCardProps) {
  const { playHoverSound, playSuccessSound } = useSound();
  const [isUnderConstructionModalOpen, setIsUnderConstructionModalOpen] = useState(false);

  const handleClick = () => {
    if (onViewCaseStudy) {
      onViewCaseStudy();
      playSuccessSound();
    } else if (showUnderConstruction) {
      setIsUnderConstructionModalOpen(true);
      playHoverSound(800, 150, 0.15);
    }
  };

  return (
    <>
      <section className={`mx-auto ${SPACING.maxWidth.content} ${SPACING.container.combined} mb-8 md:mb-0`} data-section={dataSection}>
        <div className="rounded-3xl border border-[#eadfd2] bg-white/80 shadow-[0px_25px_70px_rgba(20,12,12,0.08)] backdrop-blur-sm overflow-hidden">
          {/* Thumbnail area */}
          <div 
            className={`p-6 md:p-8 cursor-pointer group relative flex items-center justify-center ${(onViewCaseStudy || showUnderConstruction) ? '' : 'pointer-events-none'}`}
            style={{ backgroundColor }}
            onClick={(onViewCaseStudy || showUnderConstruction) ? handleClick : undefined}
            role={(onViewCaseStudy || showUnderConstruction) ? "button" : undefined}
            tabIndex={(onViewCaseStudy || showUnderConstruction) ? 0 : undefined}
            onKeyDown={(onViewCaseStudy || showUnderConstruction) ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            } : undefined}
            onMouseEnter={() => playHoverSound(750, 150, 0.12)}
          >
            <motion.div
              className="w-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              viewport={{ once: true }}
            >
              <img
                src={imageSrc}
                alt={`${title} UI preview`}
                className="max-w-full h-auto object-contain max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
              />
            </motion.div>
            
            {(onViewCaseStudy || showUnderConstruction) && (
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
          <div className="px-6 md:px-8 py-6 md:py-8 bg-[#f9f5f1] space-y-4">
            <header className="flex flex-col gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-[#150c0c] tracking-tight">
                {title}
              </h3>
              <div className="text-[17px] sm:text-[19px] font-medium uppercase tracking-[0.15em] text-[#7c736a]">
                {category} · <span className="font-bold">{year}</span>
              </div>
            </header>
            <p className="text-base sm:text-lg leading-relaxed text-[#4f3f35]">
              {description}
            </p>
          </div>
        </div>
      </section>

      <UnderConstructionModal
        isOpen={isUnderConstructionModalOpen}
        onClose={() => setIsUnderConstructionModalOpen(false)}
      />
    </>
  );
}


