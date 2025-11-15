import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';

export function PortfolioScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "treatmentpath", label: "TreatmentPath" },
    { id: "universityx", label: "Universityx" },
    { id: "openxp", label: "Openxp" },
    { id: "customer-experience", label: "Customer Exp." },
    { id: "molerhealth", label: "MolerHealth" },
    { id: "wikipedia", label: "Wikipedia" },
    { id: "showcase", label: "Showcase" }
  ];

  // Optimized scroll handler with better throttling
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollTime = 0;
    
    const handleScroll = () => {
      const now = performance.now();
      
      // Throttle to max 60fps and skip if called too frequently
      if (now - lastScrollTime < 16) return;
      lastScrollTime = now;
      
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        try {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const scrollTop = window.pageYOffset;
          
          // Update scroll progress
          const progress = Math.min(scrollTop / documentHeight, 1);
          setScrollProgress(progress);
          
          // Update visibility
          setIsVisible(scrollTop > 100);
          
          // Update active section - simplified logic
          const sections = document.querySelectorAll('[data-section]');
          const viewportCenter = windowHeight / 2;
          
          let currentSection = 'hero';
          let minDistance = Infinity;
          
          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < windowHeight) {
              const sectionCenter = rect.top + rect.height / 2;
              const distance = Math.abs(viewportCenter - sectionCenter);
              
              if (distance < minDistance) {
                minDistance = distance;
                const sectionId = section.getAttribute('data-section');
                if (sectionId) {
                  currentSection = sectionId;
                }
              }
            }
          });
          
          // Only update if section actually changed
          setActiveSection(prev => prev !== currentSection ? currentSection : prev);
        } catch (error) {
          console.warn('Scroll handler error:', error);
        }
      });
    };

    // Add event listeners with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      console.log(`Portfolio - Scrolling to section: ${sectionId}`);
      
      // Calculate target position with offset for better centering
      const rect = element.getBoundingClientRect();
      const targetPosition = window.pageYOffset + rect.top - window.innerHeight * 0.1;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update active section immediately for better UX
      setActiveSection(sectionId);
    } else {
      console.warn(`Section with data-section="${sectionId}" not found`);
      const allSections = document.querySelectorAll('[data-section]');
      console.log('Available sections:', Array.from(allSections).map(s => ({
        id: s.getAttribute('data-section'),
        rect: s.getBoundingClientRect()
      })));
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-40"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-16 md:w-20 flex flex-col justify-center space-y-3 md:space-y-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-gray-200/50">
        {/* Section indicators as horizontal lines with different weights */}
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          
          const getLineHeight = (sectionId: string) => {
            switch (sectionId) {
              case "hero": return "h-1.5";
              case "treatmentpath":
              case "universityx":
              case "openxp": return "h-1.5";
              case "customer-experience":
              case "molerhealth":
              case "wikipedia": return "h-1";
              case "showcase": return "h-0.5";
              default: return "h-1";
            }
          };
          
          return (
            <motion.button
              key={section.id}
              className={`w-full ${getLineHeight(section.id)} rounded-full transition-all duration-300 cursor-pointer group relative shadow-sm focus:outline-none ${
                isActive 
                  ? 'bg-[#ac83f3] shadow-[#ac83f3]/30' 
                  : 'bg-gray-300 hover:bg-[#ac83f3]/60 shadow-gray-300/40'
              }`}
              onClick={() => scrollToSection(section.id)}
              whileHover={{ 
                scaleX: 1.15,
                scaleY: 1.1,
                backgroundColor: isActive ? "#ac83f3" : "#ac83f3"
              }}
              whileTap={{ scale: 0.95 }}
              title={section.label}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ 
                opacity: 1, 
                scaleX: 1,
                backgroundColor: isActive ? "#ac83f3" : "#d1d5db"
              }}
              transition={{ 
                delay: index * 0.05, 
                duration: 0.3,
                backgroundColor: { duration: 0.2 }
              }}
              aria-label={`Navigate to ${section.label} section`}
              aria-pressed={isActive}
              tabIndex={0}
            >
              {/* Active indicator pulse */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-[#ac83f3] rounded-full opacity-50"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              {/* Enhanced hover tooltip */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[60] hidden md:block">
                <motion.div
                  className="bg-gray-900/95 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-2xl border border-gray-700/50"
                  initial={{ scale: 0.8, x: -10 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {section.label}
                </motion.div>
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-900/95 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            </motion.button>
          );
        })}

        {/* Enhanced vertical progress line */}
        <div className="relative mt-4 mb-2">
          <div className="w-1 md:w-1.5 h-12 md:h-16 bg-gray-300/60 rounded-full mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full opacity-40" />
            
            <motion.div
              className="w-full bg-gradient-to-b from-[#ac83f3] via-[#ac83f3] to-[#9c6fec] rounded-full shadow-sm"
              style={{ height: `${scrollProgress * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            
            <motion.div
              className="absolute w-2 md:w-3 h-2 md:h-3 bg-[#ac83f3] rounded-full shadow-lg border-2 border-white -translate-x-1/2 left-1/2"
              style={{ 
                top: `${Math.max(0, Math.min(scrollProgress * 100 - 1.5, 100 - 3))}%`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>
        </div>

        {/* Enhanced progress percentage */}
        <div className="text-center">
          <motion.div 
            className="text-[8px] md:text-[9px] text-gray-500 font-mono font-medium tracking-wider"
            animate={{ 
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {Math.round(scrollProgress * 100)}%
          </motion.div>
          <div className="w-3 md:w-6 h-px bg-gray-400 mx-auto mt-1 opacity-40" />
        </div>
      </div>
    </motion.div>
  );
}


