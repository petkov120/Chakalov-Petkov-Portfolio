import { motion, useScroll, useTransform, useInView } from 'motion/react';
import React, { useRef, forwardRef, useState, useEffect } from 'react';
import { useSound } from './hooks/useSound';
import svgPaths from "./imports/svg-189wftbrja";
import svgPathsMobile from "./imports/svg-23jrtcn751";
import imgChatGptImageJul122025014208Am1 from "figma:asset/3f8ca804325f91b64a84f45b771e2522e94460ec.png";
import imgChatGptImageJul122025011140Am2 from "figma:asset/4774270e396720874460c4f8aeecbc8d19672f4e.png";
import imgAvaters from "figma:asset/f578f9c2a181ef669150341163e63e6e9da01878.png";
import imgCreateTreatmentPlans1 from "figma:asset/23a18e1b36e71291ecc500711318a906c582dbc2.png";
import imgImage1 from "figma:asset/52a2a939ff2f14f947fd7a0deb01f9edd8fbcb14.png";
import imgPta1 from "figma:asset/3b9ef818ebbe3856fb9217a87724459cdaf11b3b.png";
import imgImage18 from "figma:asset/b059f9431d8213763d6d45caa2f8248c6abc01b6.png";
import imgImage17 from "figma:asset/6f31396b79f9b52ec91036453081ba53c48657af.png";
import imgImage19 from "figma:asset/2c69f2a3a0a3856b9073212a8575a6bc2d5d73d3.png";
// MolerHealth Dashboard Image - CRITICAL: DO NOT REMOVE OR MODIFY
import imgMolerHealthDashboard from "figma:asset/5025ca67f7b26dbaee82a29b4768defa630a62ab.png";
import imgWikipediaCommunity from "figma:asset/984df121712d5b613fcd794b93bdb08ede8b0769.png";
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import TreatmentPathCaseStudy from './components/TreatmentPathCaseStudy';
import UniversityxCaseStudy from './components/UniversityxCaseStudy';
import { ErrorBoundary } from './components/ErrorBoundary';

// Portfolio Scroll Indicator Component
function PortfolioScrollIndicator() {
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
  }, []); // Remove activeSection dependency to prevent excessive re-renders

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      console.log(`Portfolio - Scrolling to section: ${sectionId}`); // Debug log
      
      // Calculate target position with offset for better centering
      const rect = element.getBoundingClientRect();
      const targetPosition = window.pageYOffset + rect.top - window.innerHeight * 0.1; // 10% from top
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update active section immediately for better UX
      setActiveSection(sectionId);
    } else {
      console.warn(`Section with data-section="${sectionId}" not found`);
      // Debug: List all available sections
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
          
          // Different line weights based on section importance
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
              {/* Enhanced hover tooltip - positioned to the right */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[60] hidden md:block">
                <motion.div
                  className="bg-gray-900/95 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-2xl border border-gray-700/50"
                  initial={{ scale: 0.8, x: -10 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {section.label}
                </motion.div>
                {/* Arrow pointing left */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-900/95 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            </motion.button>
          );
        })}

        {/* Enhanced vertical progress line */}
        <div className="relative mt-4 mb-2">
          <div className="w-1 md:w-1.5 h-12 md:h-16 bg-gray-300/60 rounded-full mx-auto overflow-hidden">
            {/* Background track */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full opacity-40" />
            
            {/* Progress fill with gradient */}
            <motion.div
              className="w-full bg-gradient-to-b from-[#ac83f3] via-[#ac83f3] to-[#9c6fec] rounded-full shadow-sm"
              style={{ height: `${scrollProgress * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            
            {/* Animated progress indicator dot */}
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

// Memoized AnimatedSection for better performance
const AnimatedSection = React.memo<{ 
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

// Hero Section Components (from Figma import)
function Frame383() {
  const { playHoverSound } = useSound();

  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-6 md:gap-6 lg:gap-8 grow items-start justify-start leading-[0] min-h-px min-w-px p-0 relative shrink-0 lg:max-w-[60%] xl:max-w-[55%]">
      <motion.div 
        className="font-['FreeSans:Bold',_sans-serif] not-italic relative shrink-0 text-[#150c0c] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl tracking-[0.03em] w-full cursor-default"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        onMouseEnter={() => playHoverSound(600, 120, 0.08)}
      >
        <p className="block leading-[1.2]">Petkov.Chakalov</p>
      </motion.div>
      <motion.div 
        className="font-['Arial:Bold',_sans-serif] not-italic relative shrink-0 text-[#140202] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-[-0.04em] w-full cursor-default"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        onMouseEnter={() => playHoverSound(700, 150, 0.1)}
      >
        <p className="block leading-[0.85]">{`Chakalov `}</p>
      </motion.div>
      <motion.div 
        className="font-['Arial:Bold',_sans-serif] not-italic relative shrink-0 text-[#150c0c] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-[-0.04em] w-full cursor-default"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        onMouseEnter={() => playHoverSound(800, 150, 0.1)}
      >
        <p className="block leading-[0.85] md:whitespace-nowrap">Petkov Richard</p>
      </motion.div>
      <motion.div 
        className="font-['Lora:Medium',_sans-serif] relative shrink-0 text-[#150c0c] text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl tracking-[-0.02em] w-full cursor-default"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        onMouseEnter={() => playHoverSound(500, 180, 0.09)}
      >
        <p className="block leading-[1.1] lg:whitespace-nowrap">Software Product Designer</p>
      </motion.div>
    </div>
  );
}

// Exact Frame2 component from Figma import with animations
function Frame2() {
  const { playHoverSound } = useSound();

  return (
    <motion.div 
      className="bg-[#ffffff] h-[397.218px] overflow-clip relative rounded-[1.36px] shadow-[-0.533px_1.814px_5.539px_0px_rgba(0,0,0,0.2)] w-[330.264px] cursor-pointer"
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => playHoverSound(900, 100, 0.12)}
    >
      <div
        className="absolute bg-[39.53%_0%] bg-no-repeat bg-size-[120.03%_100%] h-[342.849px] translate-x-[-50%] translate-y-[-50%] w-[285.633px]"
        data-name="ChatGPT Image Jul 12, 2025, 01_42_08 AM 1"
        style={{
          top: "calc(50% + 0.022px)",
          left: "calc(50% - 0.737px)",
          backgroundImage: `url('${imgChatGptImageJul122025014208Am1}')`,
        }}
      />
    </motion.div>
  );
}

// Exact Frame3 component from Figma import with animations
function Frame3() {
  const { playHoverSound } = useSound();

  return (
    <motion.div 
      className="bg-[#ffffff] h-[380.756px] overflow-clip relative rounded-[1.192px] shadow-[-0.52px_1.772px_5.412px_0px_rgba(0,0,0,0.2)] w-[316.83px] cursor-pointer"
      whileHover={{ scale: 1.05, rotate: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => playHoverSound(850, 100, 0.12)}
    >
      <div
        className="absolute bg-no-repeat bg-size-[123.5%_100%] bg-top-left h-[352.759px] rounded-[3.733px] translate-x-[-50%] translate-y-[-50%] w-[285.623px]"
        data-name="ChatGPT Image Jul 12, 2025, 01_11_40 AM 2"
        style={{
          top: "calc(50% + 0.007px)",
          left: "calc(50% - 0.294px)",
          backgroundImage: `url('${imgChatGptImageJul122025011140Am2}')`,
        }}
      />
    </motion.div>
  );
}

// Updated Frame384 with mobile-optimized layout
// Memoized Frame384 to prevent unnecessary re-renders
const Frame384 = React.memo(() => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <>
      {/* Desktop version - hidden on mobile */}
      <motion.div 
        ref={ref}
        style={{ y }}
        className="hidden lg:block box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full min-w-[600px]"
      >
        {/* Frame2 - First app screenshot */}
        <motion.div 
          className="absolute flex h-[462.649px] items-center justify-center right-[-50px] top-[186px] w-[412.939px]"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className="flex-none rotate-[346.669deg]">
            <Frame2 />
          </div>
        </motion.div>
        
        {/* Frame3 - Second app screenshot */}
        <motion.div 
          className="absolute flex h-[416.587px] items-center justify-center right-[22px] top-0 w-[360.935px]"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="flex-none rotate-[7.014deg]">
            <Frame3 />
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile version - very small at top */}
      <div className="lg:hidden absolute top-2 right-2 flex gap-1 md:gap-2 z-10">
        {/* Mini Frame2 */}
        <motion.div 
          className="flex items-center justify-center w-[24px] h-[28px] sm:w-[32px] sm:h-[38px] md:w-[42px] md:h-[50px]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex-none rotate-[346.669deg] scale-[0.08] sm:scale-[0.10] md:scale-[0.13]">
            <Frame2 />
          </div>
        </motion.div>
        
        {/* Mini Frame3 */}
        <motion.div 
          className="flex items-center justify-center w-[22px] h-[26px] sm:w-[30px] sm:h-[36px] md:w-[40px] md:h-[48px]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex-none rotate-[7.014deg] scale-[0.08] sm:scale-[0.10] md:scale-[0.13]">
            <Frame3 />
          </div>
        </motion.div>
      </div>
    </>
  );
});

function Frame385() {
  return (
    <div className="box-border content-stretch flex flex-col lg:flex-row gap-6 sm:gap-7 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-24 items-start lg:items-center justify-start p-0 relative shrink-0 w-full">
      <Frame383 />
      <Frame384 />
    </div>
  );
}

function Work() {
  return (
    <div className="relative shrink-0 size-5 md:size-8 lg:size-10" data-name="work">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="work">
          <path
            d={svgPaths.p885b100}
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d={svgPaths.p3d1e9800}
            id="Vector_2"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d={svgPaths.p7d937c0}
            id="Vector_3"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Download() {
  return (
    <div className="relative shrink-0 size-8 md:size-10" data-name="download">
      <svg className="block size-full" fill="none" viewBox="0 0 32 32">
        <path
          d="M16 3v18m0 0l-6-6m6 6l6-6M9 29h14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Frame367() {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleClick = () => {
    playSuccessSound();
    // Open email client
    window.location.href = 'mailto:petkovrichard8@gmail.com?subject=Available for Work - Let\'s Connect';
  };

  return (
    <motion.button 
      className="bg-[#2c1810] box-border content-stretch flex gap-1.5 sm:gap-2 md:gap-2.5 items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2 sm:py-2.5 md:py-3 lg:py-4 xl:py-5 2xl:py-6 relative rounded-full shrink-0 w-full max-w-[180px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] cursor-pointer transition-all duration-300 ease-out focus:outline-none"
      whileHover={{ 
        scale: window.innerWidth < 768 ? 1.02 : 1.05,
        backgroundColor: "#4a2c1a",
        boxShadow: "0 0 30px rgba(76, 44, 26, 0.4), 0 0 60px rgba(76, 44, 26, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400 }}
      onMouseEnter={() => playHoverSound(1000, 120, 0.15)}
      onClick={handleClick}
      aria-label="Contact me - I'm available for work"
      type="button"
    >
      <div className="relative shrink-0 size-5 md:size-8 lg:size-10" data-name="work">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="work">
            <path
              d={svgPaths.p885b100}
              id="Vector"
              stroke="var(--stroke-0, white)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d={svgPaths.p3d1e9800}
              id="Vector_2"
              stroke="var(--stroke-0, white)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d={svgPaths.p7d937c0}
              id="Vector_3"
              stroke="var(--stroke-0, white)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
      <div className="font-['Inter:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-nowrap tracking-[-0.02em]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Available for work</p>
      </div>
    </motion.button>
  );
}

function ResumeButton() {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleDownload = () => {
    playSuccessSound();
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Petkov_Richard_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.button 
      className="bg-[#ffffff] border-2 border-[#2c1810] box-border content-stretch flex gap-1.5 md:gap-2.5 items-center justify-center px-3 md:px-8 lg:px-[32px] py-2.5 md:py-5 lg:py-[18px] relative rounded-full shrink-0 w-full max-w-[180px] md:max-w-[320px] cursor-pointer transition-all duration-300 ease-out focus:outline-none"
      whileHover={{ 
        scale: window.innerWidth < 768 ? 1.02 : 1.05,
        backgroundColor: "#f8f8f8",
        borderColor: "#4a2c1a",
        boxShadow: "0 0 30px rgba(44, 24, 16, 0.3), 0 0 60px rgba(44, 24, 16, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400 }}
      onMouseEnter={() => playHoverSound(900, 120, 0.15)}
      onClick={handleDownload}
      aria-label="Download my resume as PDF"
      type="button"
    >
      <div className="relative shrink-0 size-4 md:size-10">
        <svg className="block size-full" fill="none" viewBox="0 0 32 32">
          <path
            d="M16 3v18m0 0l-6-6m6 6l6-6M9 29h14"
            stroke="#2c1810"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="font-['Inter:Semi_Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#2c1810] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-nowrap tracking-[-0.02em]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Download Resume</p>
      </div>
    </motion.button>
  );
}

function Frame386() {
  return (
    <AnimatedSection delay={0.6} className="box-border content-stretch flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-start justify-start p-0 relative shrink-0 w-full lg:max-w-[65%] xl:max-w-[60%]">
      <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#7c736a] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[-0.01em] w-full">
        <p className="block">
          With 3+ years in product design and UI development, I partner with teams to craft heartfelt solutions in
          education, health tech, customer experience, and business growth.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full">
        <Frame367 />
        <ResumeButton />
      </div>
    </AnimatedSection>
  );
}

// Mobile Hero Section Components (from new Figma import)
function MobileFrame2060() {
  const { playHoverSound } = useSound();

  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[13px] items-start justify-start leading-[0] p-0 right-[47.4px] top-7 w-[300px]">
      <motion.div 
        className="font-['Arial:Bold',_sans-serif] not-italic relative shrink-0 text-[#140202] text-[32px] tracking-[-1.28px] w-full cursor-default"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        onMouseEnter={() => playHoverSound(700, 150, 0.1)}
      >
        <p className="block leading-[normal]">{`Chakalov `}</p>
      </motion.div>
      <motion.div 
        className="font-['Arial:Bold',_sans-serif] not-italic relative shrink-0 text-[#150c0c] text-[32px] tracking-[-1.28px] w-full cursor-default"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        onMouseEnter={() => playHoverSound(800, 150, 0.1)}
      >
        <p className="block leading-[normal]">Petkov Richard</p>
      </motion.div>
      <motion.div 
        className="font-['Lora:Medium',_sans-serif] font-medium relative shrink-0 text-[#150c0c] text-[24px] tracking-[-0.48px] w-full cursor-default"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        onMouseEnter={() => playHoverSound(500, 180, 0.09)}
      >
        <p className="block leading-[normal]">Software Product Designer</p>
      </motion.div>
    </div>
  );
}

function MobileFrame2() {
  return (
    <div className="bg-[#ffffff] h-[89.842px] overflow-clip relative rounded-[0.308px] shadow-[-0.12px_0.41px_1.253px_0px_rgba(0,0,0,0.2)] w-[74.699px]">
      <div
        className="absolute bg-[39.53%_0%] bg-no-repeat bg-size-[120.03%_100%] h-[77.545px] translate-x-[-50%] translate-y-[-50%] w-[64.604px]"
        data-name="ChatGPT Image Jul 12, 2025, 01_42_08 AM 1"
        style={{
          top: "calc(50% + 0.005px)",
          left: "calc(50% - 0.167px)",
          backgroundImage: `url('${imgChatGptImageJul122025014208Am1}')`,
        }}
      />
    </div>
  );
}

function MobileFrame2062() {
  return (
    <div className="box-border content-stretch flex items-start justify-start overflow-clip p-0 relative shrink-0 w-full">
      <MobileFrame2060 />
      <motion.div 
        className="absolute flex h-[104.629px] items-center justify-center right-0 top-0 w-[93.388px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex-none rotate-[346.669deg]">
          <MobileFrame2 />
        </div>
      </motion.div>
    </div>
  );
}

function MobileFrame2063() {
  const { playHoverSound } = useSound();

  return (
    <div className="box-border content-stretch flex flex-col gap-0 items-start justify-start p-0 relative shrink-0 w-full">
      <motion.div 
        className="font-['IBM_Plex_Mono:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#150c0c] text-[13px] tracking-[0.39px] w-full cursor-default"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        onMouseEnter={() => playHoverSound(600, 120, 0.08)}
      >
        <p className="block leading-[normal]">Petkov.Chakalov</p>
      </motion.div>
      <MobileFrame2062 />
    </div>
  );
}

function MobileWork() {
  return (
    <div className="relative shrink-0 size-[19.385px]" data-name="work">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="work">
          <path
            d={svgPathsMobile.p3556ad00}
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.21154"
          />
          <path
            d={svgPathsMobile.p1dc4bd80}
            id="Vector_2"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.21154"
          />
          <path
            d={svgPathsMobile.p3a812300}
            id="Vector_3"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.21154"
          />
        </g>
      </svg>
    </div>
  );
}

function MobileFrame367() {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleClick = () => {
    playSuccessSound();
    // Open email client
    window.location.href = 'mailto:petkovrichard8@gmail.com?subject=Available for Work - Let\'s Connect';
  };

  return (
    <motion.div 
      className="bg-[#2c1810] box-border content-stretch flex gap-[6.058px] items-center justify-center px-[27.26px] py-[15.144px] relative rounded-[127.212px] shrink-0 w-[327px] cursor-pointer transition-all duration-300 ease-out"
      whileHover={{ 
        scale: 1.02,
        backgroundColor: "#4a2c1a",
        boxShadow: "0 0 30px rgba(76, 44, 26, 0.4), 0 0 60px rgba(76, 44, 26, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400 }}
      onMouseEnter={() => playHoverSound(1000, 120, 0.15)}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <MobileWork />
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16.962px] text-nowrap tracking-[-0.3392px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Available for work</p>
      </div>
    </motion.div>
  );
}

function MobileResumeButton() {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleDownload = () => {
    playSuccessSound();
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Petkov_Richard_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      className="bg-[#ffffff] border-2 border-[#2c1810] box-border content-stretch flex gap-[6.058px] items-center justify-center px-[27.26px] py-[15.144px] relative rounded-[127.212px] shrink-0 w-[327px] cursor-pointer transition-all duration-300 ease-out"
      whileHover={{ 
        scale: 1.02,
        backgroundColor: "#f8f8f8",
        borderColor: "#4a2c1a",
        boxShadow: "0 0 30px rgba(44, 24, 16, 0.3), 0 0 60px rgba(44, 24, 16, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400 }}
      onMouseEnter={() => playHoverSound(900, 120, 0.15)}
      onClick={handleDownload}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative shrink-0 size-[19.385px]" data-name="download">
        <svg className="block size-full" fill="none" viewBox="0 0 20 20">
          <path
            d="M10 1.875v11.25m0 0l-3.75-3.75m3.75 3.75l3.75-3.75M5.625 18.125h8.75"
            stroke="#2c1810"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#2c1810] text-[16.962px] text-nowrap tracking-[-0.3392px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Download Resume</p>
      </div>
    </motion.div>
  );
}

function MobileHeroSection() {
  return (
    <div className="bg-[#f7f6f3] relative w-full" data-name="Frame">
      <div className="relative w-full">
        <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start pb-8 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 2xl:pt-20 relative w-full max-w-7xl mx-auto">
          <MobileFrame2063 />
          <motion.div 
            className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#7c736a] text-[16px] tracking-[-0.16px] w-[327px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <p className="adjustLetterSpacing block leading-[31px]">
              With 3+ years in product design and UI development, I partner with teams to craft heartfelt solutions in
              education, health tech, customer experience, and business growth.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-4 w-full pb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
          >
            <MobileFrame367 />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
            >
              <MobileResumeButton />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <>
      {/* Desktop Hero Section */}
      <div 
        className="hidden md:block relative min-h-screen shrink-0 w-full bg-[#f7f6f3]" 
        data-name="Frame" 
        data-section="hero"
        id="main-content"
        role="banner"
        aria-label="Hero section with designer introduction"
      >
        <div className="relative size-full">
          <div className="box-border content-stretch flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-start justify-start pb-8 sm:pb-10 md:pb-12 lg:pb-16 xl:pb-20 2xl:pb-24 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 2xl:pt-20 relative min-h-screen max-w-7xl mx-auto">
            <Frame385 />
            <Frame386 />
          </div>
        </div>
      </div>

      {/* Mobile Hero Section */}
      <div 
        className="md:hidden relative shrink-0 w-full" 
        data-section="hero"
        id="main-content"
        role="banner"
        aria-label="Hero section with designer introduction"
      >
        <MobileHeroSection />
      </div>
    </>
  );
}

const ProjectSlide = forwardRef<HTMLDivElement, { 
  backgroundColor: string; 
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}>(({ backgroundColor, children, className = "", onClick }, ref) => {
  const { playHoverSound } = useSound();

  return (
    <motion.div
      ref={ref}
      className={`h-[280px] sm:h-[340px] md:h-[500px] lg:h-[700px] xl:h-[861px] overflow-clip relative rounded-[12px] md:rounded-[18px] lg:rounded-[26px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:shadow-[-1px_3.406px_10.4px_0px_rgba(0,0,0,0.15)] lg:shadow-[-1px_3.406px_10.4px_0px_rgba(0,0,0,0.2)] shrink-0 w-full cursor-pointer ${className}`}
      style={{ backgroundColor }}
      whileHover={{ scale: window.innerWidth < 768 ? 1.01 : 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => playHoverSound(750, 150, 0.12)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
});

function TreatmentPathProject({ onViewCaseStudy }: { onViewCaseStudy: () => void }) {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleProjectClick = () => {
    onViewCaseStudy();
    playSuccessSound();
  };

  return (
    <AnimatedSection className="min-h-[60vh] sm:min-h-[80vh] md:min-h-screen relative shrink-0 w-full mb-8 sm:mb-0" data-section="treatmentpath">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 min-h-[60vh] sm:min-h-[80vh] md:min-h-screen items-start justify-start px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 relative w-full max-w-7xl mx-auto">
          <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 items-start justify-start p-0 relative shrink-0 w-full">
            <ProjectSlide 
              backgroundColor="#ac83f3"
              className="group relative overflow-hidden focus:ring-2 focus:ring-[#ac83f3] focus:ring-offset-4 focus:outline-none"
              onClick={handleProjectClick}
              role="button"
              tabIndex={0}
              aria-label="View TreatmentPath case study"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjectClick();
                }
              }}
            >
              <motion.div
                className="absolute h-[75%] sm:h-[80%] md:h-[85%] lg:h-[90%] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[85%] sm:w-[90%] md:w-[85%] lg:w-[80%] max-w-[655px] max-h-[1017px]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-full h-full bg-center bg-contain bg-no-repeat"
                  style={{ backgroundImage: `url('${imgCreateTreatmentPlans1}')` }}
                  role="img"
                  aria-label="TreatmentPath dental management system interface preview"
                />
              </motion.div>
              
              {/* Click to view overlay */}
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 font-['Inter:Semi_Bold',_sans-serif] text-[#150c0c] text-sm sm:text-lg tracking-[-0.02em] flex items-center gap-2 shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span>👁️</span>
                  <span className="hidden sm:inline">View Case Study</span>
                  <span className="sm:hidden">View</span>
                </motion.div>
              </motion.div>
            </ProjectSlide>

            <AnimatedSection delay={0.2} className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-center justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="relative shrink-0 w-full">
                  <div className="relative size-full">
                    <div className="box-border content-stretch flex flex-row items-center justify-between gap-4 md:gap-6 px-3 py-[5px] relative w-full">
                      <div className="font-['Lora:Medium',_sans-serif] leading-[0] relative shrink-0 text-[#150c0c] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-nowrap tracking-[-0.02em]">
                        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">TreatmentPath</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-[3px] items-end justify-start leading-[0] p-0 relative shrink-0 text-nowrap">
                        <div className="font-['Lora:Medium',_sans-serif] relative shrink-0 text-[#150c0c] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[-0.02em]">
                          <p className="adjustLetterSpacing block leading-[normal] text-nowrap whitespace-pre text-right">Healthtech</p>
                        </div>
                        <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] not-italic relative shrink-0 text-[#7c736a] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl tracking-[-0.01em]">
                          <p className="adjustLetterSpacing block leading-[normal] text-nowrap whitespace-pre text-right">2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1523 1">
                      <line stroke="#7C736A" strokeOpacity="0.3 sm:1" x2="1523" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#7c736a] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[-0.01em] w-full">
                <p className="block">
                  TreatmentPath is a healthcare technology platform designed to streamline patient treatment workflows. 
                  The aim was to make an easy-to-use system for healthcare providers to manage treatment plans effectively. 
                  With AI tools like voice-to-text and smart response templates, medical professionals can easily make better decisions about patient care and treatment options while reducing administrative overhead.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function UniversityxProject({ onViewCaseStudy }: { onViewCaseStudy: () => void }) {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleProjectClick = () => {
    onViewCaseStudy();
    playSuccessSound();
  };

  return (
    <AnimatedSection className="min-h-[60vh] sm:min-h-[80vh] md:min-h-screen relative shrink-0 w-full mb-8 sm:mb-0" data-section="universityx">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 min-h-[60vh] sm:min-h-[80vh] md:min-h-screen items-start justify-start px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 relative w-full max-w-7xl mx-auto">
          <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 items-start justify-start p-0 relative shrink-0 w-full">
            <ProjectSlide 
              backgroundColor="#9d2d9d"
              className="group relative overflow-hidden focus:ring-2 focus:ring-[#9d2d9d] focus:ring-offset-4 focus:outline-none"
              onClick={handleProjectClick}
              role="button"
              tabIndex={0}
              aria-label="View Universityx case study"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProjectClick();
                }
              }}
            >
              <motion.div
                className="absolute bg-center bg-contain bg-no-repeat h-[75%] md:h-[80%] lg:h-[85%] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[95%] md:w-[90%] lg:w-[85%] max-w-[1038px] max-h-[631px] rounded-[7.797px]"
                style={{ 
                  backgroundImage: `url('${imgPta1}')` 
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                viewport={{ once: true }}
                role="img"
                aria-label="Universityx AI and gamification platform interface preview"
              />
              
              {/* Click to view overlay */}
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 font-['Inter:Semi_Bold',_sans-serif] text-[#150c0c] text-sm sm:text-lg tracking-[-0.02em] flex items-center gap-2 shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span>👁️</span>
                  <span className="hidden sm:inline">View Case Study</span>
                  <span className="sm:hidden">View</span>
                </motion.div>
              </motion.div>
            </ProjectSlide>

            <AnimatedSection delay={0.2} className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-center justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="relative shrink-0 w-full">
                  <div className="relative size-full">
                    <div className="box-border content-stretch flex flex-row items-center justify-between gap-4 md:gap-6 px-3 py-[5px] relative w-full">
                      <div className="font-['Lora:Medium',_sans-serif] leading-[0] relative shrink-0 text-[#150c0c] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-nowrap tracking-[-0.02em]">
                        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Universityx</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-[3px] items-end justify-start leading-[0] p-0 relative shrink-0">
                        <div className="font-['Lora:Medium',_sans-serif] relative shrink-0 text-[#150c0c] text-base md:text-xl lg:text-2xl xl:text-3xl tracking-[-0.02em] w-full">
                          <p className="block leading-[normal] text-right">edtech</p>
                        </div>
                        <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] not-italic relative shrink-0 text-[#7c736a] text-sm md:text-lg lg:text-xl xl:text-2xl tracking-[-0.01em] w-full">
                          <p className="block leading-[normal] text-right">2024-2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1523 1">
                      <line stroke="#7C736A" strokeOpacity="0.3 sm:1" x2="1523" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#7c736a] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[-0.01em] w-full">
                <p className="block">
                  Created AI and gamification solutions to improve student engagement and retention. This helps students learn
                  more effectively, reduces the workload for lecturers, and increases revenue for schools. Led the product
                  design process that won ₦10 million at Wema Bank's Hackaholics 5.0.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function OpenxpProject() {
  return (
    <AnimatedSection className="min-h-[60vh] sm:min-h-[80vh] md:min-h-screen relative shrink-0 w-full mb-8 sm:mb-0" data-section="openxp">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 min-h-[60vh] sm:min-h-[80vh] md:min-h-screen items-start justify-start px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 relative w-full max-w-7xl mx-auto">
          <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 items-start justify-start p-0 relative shrink-0 w-full">
            <ProjectSlide backgroundColor="#372270">
              <motion.div
                className="absolute bg-center bg-contain bg-no-repeat h-[75%] md:h-[80%] lg:h-[85%] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[85%] lg:w-[80%] max-w-[929px] max-h-[682px]"
                style={{ backgroundImage: `url('${imgImage17}')` }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                viewport={{ once: true }}
              />
            </ProjectSlide>

            <AnimatedSection delay={0.2} className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-center justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="relative shrink-0 w-full">
                  <div className="relative size-full">
                    <div className="box-border content-stretch flex flex-row items-center justify-between gap-4 md:gap-6 px-3 py-[5px] relative w-full">
                      <div className="font-['Lora:Medium',_sans-serif] leading-[0] relative shrink-0 text-[#150c0c] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-nowrap tracking-[-0.02em]">
                        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Openxp</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-[3px] items-end justify-start leading-[0] p-0 relative shrink-0">
                        <div className="font-['Lora:Medium',_sans-serif] relative shrink-0 text-[#150c0c] text-base md:text-xl lg:text-2xl xl:text-3xl tracking-[-0.02em] w-full">
                          <p className="block leading-[normal] text-right">edtech</p>
                        </div>
                        <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] not-italic relative shrink-0 text-[#7c736a] text-sm md:text-lg lg:text-xl xl:text-2xl tracking-[-0.01em] w-full">
                          <p className="block leading-[normal] text-right">2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1523 1">
                      <line stroke="#7C736A" strokeOpacity="0.3 sm:1" x2="1523" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#7c736a] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[-0.01em] w-full">
                <p className="block">
                  Openxp is an exam prep software designed to help you get ready for those big career-defining tests. The aim
                  was to create an easy-to-use app for exam preparation. With AI tools, students can easily make better choices
                  about their careers and subjects. I even led the development of two versions of this app!
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// CRITICAL: MolerHealth Project - DO NOT REMOVE OR MODIFY THE IMAGE REFERENCE
function MolerHealthProject() {
  return (
    <AnimatedSection className="min-h-[60vh] sm:min-h-[80vh] md:min-h-screen relative shrink-0 w-full mb-8 sm:mb-0" data-section="molerhealth">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 min-h-[60vh] sm:min-h-[80vh] md:min-h-screen items-start justify-start px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 relative w-full max-w-7xl mx-auto">
          <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 items-start justify-start p-0 relative shrink-0 w-full">
            {/* MolerHealth Dashboard - PROTECTED IMAGE IMPLEMENTATION */}
            <ProjectSlide backgroundColor="#10b981">
              <motion.div
                className="absolute bg-center bg-contain bg-no-repeat h-[75%] md:h-[80%] lg:h-[85%] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[85%] lg:w-[80%] max-w-[929px] max-h-[682px]"
                style={{ 
                  // CRITICAL: This image reference must NEVER be changed or removed
                  backgroundImage: `url('${imgMolerHealthDashboard}')` 
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                viewport={{ once: true }}
              />
            </ProjectSlide>

            <AnimatedSection delay={0.2} className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-center justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="relative shrink-0 w-full">
                  <div className="relative size-full">
                    <div className="box-border content-stretch flex flex-row items-center justify-between gap-4 md:gap-6 px-3 py-[5px] relative w-full">
                      <div className="font-['Lora:Medium',_sans-serif] leading-[0] relative shrink-0 text-[#150c0c] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-nowrap tracking-[-0.02em]">
                        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">MolerHealth</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-[3px] items-end justify-start leading-[0] p-0 relative shrink-0">
                        <div className="font-['Lora:Medium',_sans-serif] relative shrink-0 text-[#150c0c] text-base md:text-xl lg:text-2xl xl:text-3xl tracking-[-0.02em] w-full">
                          <p className="block leading-[normal] text-right">Healthtech</p>
                        </div>
                        <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] not-italic relative shrink-0 text-[#7c736a] text-sm md:text-lg lg:text-xl xl:text-2xl tracking-[-0.01em] w-full">
                          <p className="block leading-[normal] text-right">2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1523 1">
                      <line stroke="#7C736A" strokeOpacity="0.3 sm:1" x2="1523" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#7c736a] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[-0.01em] w-full">
                <p className="block">
                  MolerHealth is a comprehensive medical dashboard system designed to streamline healthcare practice management. 
                  The platform provides doctors with intuitive patient analytics, appointment scheduling, and treatment tracking tools. 
                  With real-time data visualization and efficient workflow management, healthcare providers can focus more on patient care 
                  while maintaining complete oversight of their practice operations.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function CustomerExperienceProject() {
  return (
    <AnimatedSection className="min-h-[60vh] sm:min-h-[80vh] md:min-h-screen relative shrink-0 w-full mb-8 sm:mb-0" data-section="customer-experience">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 min-h-[60vh] sm:min-h-[80vh] md:min-h-screen items-start justify-start px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 relative w-full max-w-7xl mx-auto">
          <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 items-start justify-start p-0 relative shrink-0 w-full">
            <ProjectSlide backgroundColor="#0d6efd">
              <motion.div
                className="absolute bg-center bg-contain bg-no-repeat h-[75%] md:h-[80%] lg:h-[85%] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[85%] lg:w-[80%] max-w-[929px] max-h-[682px]"
                style={{ backgroundImage: `url('${imgImage19}')` }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                viewport={{ once: true }}
              />
            </ProjectSlide>

            <AnimatedSection delay={0.2} className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-center justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="relative shrink-0 w-full">
                  <div className="relative size-full">
                    {/* Mobile Layout - Acronym */}
                    <div className="box-border content-stretch flex flex-row items-center justify-between gap-4 sm:hidden px-3 py-[5px] relative w-full">
                      <div className="font-['Lora:Medium',_sans-serif] leading-[0] relative shrink-0 text-[#150c0c] text-lg tracking-[-0.02em]">
                        <p className="adjustLetterSpacing block leading-[normal] text-nowrap whitespace-pre">C.E.S</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-[3px] items-end justify-start leading-[0] p-0 relative shrink-0">
                        <div className="font-['Lora:Medium',_sans-serif] relative shrink-0 text-[#150c0c] text-sm tracking-[-0.02em]">
                          <p className="adjustLetterSpacing block leading-[normal] text-right">B2B Customer Software</p>
                        </div>
                        <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] not-italic relative shrink-0 text-[#7c736a] text-sm tracking-[-0.01em]">
                          <p className="block leading-[normal] text-right">2024</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Small screens and up - Full title */}
                    <div className="box-border content-stretch hidden sm:flex flex-row items-center justify-between gap-4 md:gap-6 px-3 py-[5px] relative w-full">
                      <div className="font-['Lora:Medium',_sans-serif] leading-[0] relative shrink-0 text-[#150c0c] text-lg md:text-2xl lg:text-3xl xl:text-4xl text-nowrap tracking-[-0.02em]">
                        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Customer Experience Solutions</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-[3px] items-end justify-start leading-[0] p-0 relative shrink-0">
                        <div className="font-['Lora:Medium',_sans-serif] relative shrink-0 text-[#150c0c] text-base md:text-lg lg:text-xl xl:text-2xl text-nowrap tracking-[-0.02em]">
                          <p className="adjustLetterSpacing block leading-[normal] whitespace-pre text-right">B2B Customer Software</p>
                        </div>
                        <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] min-w-full not-italic relative shrink-0 text-[#7c736a] text-sm md:text-lg lg:text-xl xl:text-2xl tracking-[-0.01em]">
                          <p className="block leading-[normal] text-right">2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1523 1">
                      <line stroke="#7C736A" strokeOpacity="0.3 sm:1" x2="1523" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#7c736a] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[-0.01em] w-full">
                <p className="block">
                  Designed comprehensive customer experience solutions for B2B software platforms. Focused on creating intuitive
                  interfaces that enhance user satisfaction and business outcomes. Led cross-functional teams to deliver
                  data-driven design solutions that improved customer retention by 40%.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function WikipediaProject() {
  return (
    <AnimatedSection className="min-h-[60vh] sm:min-h-[80vh] md:min-h-screen relative shrink-0 w-full mb-8 sm:mb-0" data-section="wikipedia">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 min-h-[60vh] sm:min-h-[80vh] md:min-h-screen items-start justify-start px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 relative w-full max-w-7xl mx-auto">
          <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 items-start justify-start p-0 relative shrink-0 w-full">
            <ProjectSlide backgroundColor="#0645AD">
              <motion.div
                className="absolute bg-center bg-contain bg-no-repeat h-[75%] md:h-[80%] lg:h-[85%] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[85%] lg:w-[80%] max-w-[929px] max-h-[682px]"
                style={{ backgroundImage: `url('${imgWikipediaCommunity}')` }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                viewport={{ once: true }}
              />
            </ProjectSlide>

            <AnimatedSection delay={0.2} className="box-border content-stretch flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-center justify-start p-0 relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col gap-3 sm:gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="relative shrink-0 w-full">
                  <div className="relative size-full">
                    {/* Mobile Layout - Acronym */}
                    <div className="box-border content-stretch flex flex-row items-center justify-between gap-4 sm:hidden px-3 py-[5px] relative w-full">
                      <div className="font-['Lora:Medium',_sans-serif] leading-[0] relative shrink-0 text-[#150c0c] text-lg tracking-[-0.02em]">
                        <p className="adjustLetterSpacing block leading-[normal] text-nowrap whitespace-pre">W.C.P</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-[3px] items-end justify-start leading-[0] p-0 relative shrink-0">
                        <div className="font-['Lora:Medium',_sans-serif] relative shrink-0 text-[#150c0c] text-base tracking-[-0.02em]">
                          <p className="block leading-[normal] text-right">Community Platform</p>
                        </div>
                        <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] not-italic relative shrink-0 text-[#7c736a] text-sm tracking-[-0.01em]">
                          <p className="block leading-[normal] text-right">2023</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Small screens and up - Full title */}
                    <div className="box-border content-stretch hidden sm:flex flex-row items-center justify-between gap-4 md:gap-6 px-3 py-[5px] relative w-full">
                      <div className="font-['Lora:Medium',_sans-serif] leading-[0] relative shrink-0 text-[#150c0c] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-nowrap tracking-[-0.02em]">
                        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Wikipedia Community Profile</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-[3px] items-end justify-start leading-[0] p-0 relative shrink-0">
                        <div className="font-['Lora:Medium',_sans-serif] relative shrink-0 text-[#150c0c] text-base md:text-xl lg:text-2xl xl:text-3xl tracking-[-0.02em] w-full">
                          <p className="block leading-[normal] text-right">Community Platform</p>
                        </div>
                        <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] not-italic relative shrink-0 text-[#7c736a] text-sm md:text-lg lg:text-xl xl:text-2xl tracking-[-0.01em] w-full">
                          <p className="block leading-[normal] text-right">2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1523 1">
                      <line stroke="#7C736A" strokeOpacity="0.3 sm:1" x2="1523" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#7c736a] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[-0.01em] w-full">
                <p className="block">
                  Designed an improved version of the Wikipedia Community Portal focused on accessibility and cognitive clarity. 
                  Created prototypes with assistive features like text-to-speech, a distraction-free reading mode, and simplified navigation. 
                  Applied principles such as the inverted pyramid, whitespace management, and reduced visual load for users with dyslexia.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ShowcaseItem({ title, category, backgroundColor, delay, children, isInteractive = false }: {
  title: string;
  category: string;
  backgroundColor: string;
  delay: number;
  children: React.ReactNode;
  isInteractive?: boolean;
}) {
  const { playHoverSound } = useSound();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleClick = () => {
    if (isInteractive) {
      setIsModalOpen(true);
      playHoverSound(900, 200, 0.2);
    }
  };

  return (
    <>
      <motion.div
        className="relative group cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        onMouseEnter={() => playHoverSound(600 + delay * 100, 120, 0.1)}
        onClick={handleClick}
      >
        <motion.div
          className="relative h-[240px] md:h-[320px] overflow-hidden rounded-[12px] md:rounded-[16px] shadow-lg"
          style={{ backgroundColor }}
          whileHover={{ 
            scale: window.innerWidth < 768 ? 1.02 : 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {children}
          
          {/* Overlay with title and category */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="font-['Lora:Medium',_sans-serif] text-lg md:text-xl tracking-[-0.02em]">
                {title}
              </div>
              <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] text-sm md:text-base tracking-[-0.01em] opacity-80">
                {category}
              </div>
              {isInteractive && (
                <div className="flex items-center gap-2 mt-2 text-xs opacity-90">
                  <span>🚀</span>
                  <span>Click to interact</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Interactive Modal */}
      {isInteractive && isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            className="relative bg-gray-900 shadow-2xl overflow-hidden w-full h-full md:w-[375px] md:h-[667px] md:rounded-[24px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Hidden on mobile, visible on desktop */}
            <motion.button
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm text-white w-8 h-8 rounded-full items-center justify-center hidden md:flex"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </motion.button>
            
            {/* Full Interactive Shopping App */}
            <InteractiveShoppingApp onClose={() => setIsModalOpen(false)} />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// Preview version for showcase grid
function UIShowcase1() {
  return (
    <div className="absolute inset-2 bg-gray-900 rounded-[12px] overflow-hidden">
      {/* Mobile Status Bar */}
      <div className="bg-black text-white px-4 py-1 flex justify-between items-center text-xs">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
          <div className="w-4 h-2 bg-white rounded-sm opacity-40"></div>
          <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
        </div>
      </div>

      {/* App Header */}
      <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🛍️</span>
          </div>
          <span className="text-gray-800 text-sm font-medium">Shop</span>
        </div>
        <div className="relative p-2">
          <span className="text-lg">🛒</span>
        </div>
      </div>

      {/* Static Preview */}
      <div className="flex-1 bg-gray-50 p-3">
        <div className="text-center mb-3">
          <h3 className="text-gray-800 text-sm font-medium mb-1">Featured Products</h3>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-1 rounded-full bg-green-500"></div>
            <div className="w-2 h-1 rounded-full bg-gray-300"></div>
            <div className="w-2 h-1 rounded-full bg-gray-300"></div>
            <div className="w-2 h-1 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Static Product Card */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-3">
          <div className="w-full h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-2xl">🎧</span>
          </div>
          <h4 className="text-gray-800 text-sm font-medium mb-1">Wireless Earbuds</h4>
          <div className="flex justify-between items-center">
            <span className="text-green-600 text-lg font-bold">$89</span>
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Add to Cart
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <div className="bg-gray-200 p-2 rounded-full opacity-50">←</div>
          <div className="bg-gray-200 p-2 rounded-full">→</div>
        </div>
      </div>
    </div>
  );
}

// Simplified interactive version for modal
function InteractiveShoppingApp({ onClose }: { onClose?: () => void }) {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [cartItems, setCartItems] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { playHoverSound } = useSound();

  const products = [
    { id: 1, name: "Wireless Earbuds", price: 89, emoji: "🎧", description: "Premium sound quality" },
    { id: 2, name: "Smart Watch", price: 249, emoji: "⌚", description: "Track your fitness" },
    { id: 3, name: "Phone Case", price: 29, emoji: "📱", description: "Protect your device" },
    { id: 4, name: "Charging Cable", price: 19, emoji: "🔌", description: "Fast charging" }
  ];

  const addToCart = (product: typeof products[0]) => {
    playHoverSound(800, 100, 0.15);
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1
      }];
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col">
      {/* Status Bar */}
      <div className="bg-black text-white px-4 py-2 flex justify-between items-center text-sm">
        <span>9:41</span>
        {onClose && (
          <button className="md:hidden text-lg" onClick={onClose}>←</button>
        )}
        <div className="flex gap-1">
          <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
          <div className="w-4 h-2 bg-white rounded-sm opacity-40"></div>
          <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-4 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            🛍️
          </div>
          <span className="text-gray-800 font-semibold">TechShop</span>
        </div>
        <button
          className="relative p-2"
          onClick={() => setShowCart(!showCart)}
        >
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {!showCart ? (
        /* Product View */
        <div className="flex-1 bg-gray-50 p-4 flex flex-col">
          <div className="text-center mb-6">
            <h3 className="text-gray-800 text-lg font-semibold mb-3">Featured Products</h3>
            <div className="flex justify-center gap-2">
              {products.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentProduct ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex-1">
            <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center shadow-md">
              <span className="text-4xl">{products[currentProduct].emoji}</span>
            </div>
            <h4 className="text-gray-800 text-lg font-semibold mb-2">{products[currentProduct].name}</h4>
            <p className="text-gray-600 text-sm mb-4">{products[currentProduct].description}</p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 text-2xl font-bold">${products[currentProduct].price}</span>
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-green-600 transition-colors"
                onClick={() => addToCart(products[currentProduct])}
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-gray-200 p-4 rounded-full disabled:opacity-50"
              disabled={currentProduct === 0}
              onClick={() => setCurrentProduct(prev => Math.max(0, prev - 1))}
            >
              ←
            </button>
            <button
              className="bg-gray-200 p-4 rounded-full disabled:opacity-50"
              disabled={currentProduct === products.length - 1}
              onClick={() => setCurrentProduct(prev => Math.min(products.length - 1, prev + 1))}
            >
              →
            </button>
          </div>
        </div>
      ) : (
        /* Cart View */
        <div className="flex-1 bg-gray-50 flex flex-col">
          <div className="bg-white px-4 py-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800 text-lg font-semibold">Cart ({totalItems})</h3>
              <button
                className="text-gray-500 flex items-center gap-2"
                onClick={() => setShowCart(false)}
              >
                ← Back
              </button>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 flex-1 flex flex-col justify-center">
              <span className="text-6xl mb-4">🛒</span>
              <span className="text-gray-400 text-lg">Your cart is empty</span>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl mb-3 p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🎧</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-gray-800 font-semibold">{item.name}</h5>
                      <p className="text-green-600 font-bold">${item.price}</p>
                    </div>
                    <span className="text-lg font-medium px-3 py-1 bg-gray-100 rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-800 text-xl font-semibold">Total:</span>
                  <span className="text-green-600 text-3xl font-bold">${totalPrice}</span>
                </div>
                <button className="w-full bg-green-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-600 transition-colors">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function UIShowcase2() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 w-full h-full shadow-md">
        <div className="flex justify-between items-center mb-3">
          <div className="h-3 bg-gray-300 rounded w-20"></div>
          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
        </div>
        <div className="relative h-32 bg-gradient-to-t from-blue-100 to-transparent rounded-lg overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              points="0,80 40,60 80,40 120,50 160,20 200,30"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function UIShowcase3() {
  return (
    <div className="absolute inset-4 flex flex-col gap-2">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md flex-1 flex flex-col justify-center gap-2">
        <motion.div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-2 rounded-lg text-sm"
          whileHover={{ scale: 1.05 }}
        >
          Primary Button
        </motion.div>
        <motion.div 
          className="border-2 border-gray-300 text-gray-700 text-center py-2 rounded-lg text-sm"
          whileHover={{ scale: 1.05 }}
        >
          Secondary Button
        </motion.div>
        <div className="flex gap-2">
          <motion.div 
            className="flex-1 bg-green-500 text-white text-center py-1 rounded text-xs"
            whileHover={{ scale: 1.05 }}
          >
            Success
          </motion.div>
          <motion.div 
            className="flex-1 bg-red-500 text-white text-center py-1 rounded text-xs"
            whileHover={{ scale: 1.05 }}
          >
            Error
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function UIShowcase4() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 w-full shadow-md">
        <div className="w-full h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg mb-3"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-2 bg-gray-200 rounded w-16"></div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UIShowcase5() {
  return (
    <div className="absolute inset-4 flex flex-col justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md space-y-3">
        <div className="space-y-1">
          <div className="h-2 bg-gray-300 rounded w-12"></div>
          <div className="h-8 bg-gray-100 border border-gray-300 rounded"></div>
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-300 rounded w-16"></div>
          <div className="h-8 bg-gray-100 border border-gray-300 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <div className="h-2 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

function UIShowcase6() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 w-full shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg"></div>
          <div className="flex gap-3">
            <div className="w-6 h-2 bg-gray-300 rounded"></div>
            <div className="w-6 h-2 bg-gray-300 rounded"></div>
            <div className="w-6 h-2 bg-gray-300 rounded"></div>
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShowcaseGallery() {
  return (
    <AnimatedSection className="min-h-screen relative shrink-0 w-full bg-gradient-to-b from-[#f7f6f3] to-[#f0f0ed]" data-section="showcase">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-start justify-start px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-20 relative min-h-screen max-w-7xl mx-auto">
          
          {/* Section Header */}
          <AnimatedSection className="w-full text-center">
            <motion.div 
              className="font-['Lora:Medium',_sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-[#150c0c] tracking-[-0.02em] mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Interactive Showcase
            </motion.div>
            <motion.div 
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#7c736a] tracking-[-0.01em] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              A collection of UI components, interactions, and design explorations crafted with attention to detail and user experience.
            </motion.div>
          </AnimatedSection>

          {/* Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 w-full">
            <ShowcaseItem
              title="Shopping App Interface"
              category="Mobile E-commerce"
              backgroundColor="#667eea"
              delay={0}
              isInteractive={true}
            >
              <UIShowcase1 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Dashboard Analytics"
              category="Data Visualization"
              backgroundColor="#764ba2"
              delay={0.1}
            >
              <UIShowcase2 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Button Components"
              category="UI Elements"
              backgroundColor="#f093fb"
              delay={0.2}
            >
              <UIShowcase3 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Card Design"
              category="Layout Components"
              backgroundColor="#4facfe"
              delay={0.3}
            >
              <UIShowcase4 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Form Elements"
              category="Input Design"
              backgroundColor="#43e97b"
              delay={0.4}
            >
              <UIShowcase5 />
            </ShowcaseItem>

            <ShowcaseItem
              title="Navigation System"
              category="User Experience"
              backgroundColor="#fa709a"
              delay={0.5}
            >
              <UIShowcase6 />
            </ShowcaseItem>
          </div>

          {/* Bottom Spacing */}
          <div className="w-full h-20"></div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Memoized Portfolio Page Component for better performance
const PortfolioPage = React.memo<{ onViewCaseStudy: (caseStudy: string) => void }>(({ onViewCaseStudy }) => {
  return (
    <div className="bg-[#f7f6f3] w-full min-h-screen relative">
      {/* Portfolio Scroll Indicator */}
      <PortfolioScrollIndicator />
      
      <HeroSection />
      <TreatmentPathProject onViewCaseStudy={() => onViewCaseStudy('treatmentpath')} />
      <UniversityxProject onViewCaseStudy={() => onViewCaseStudy('universityx')} />
      <OpenxpProject />
      <CustomerExperienceProject />
      <MolerHealthProject />
      <WikipediaProject />
      <ShowcaseGallery />
    </div>
  );
});

// Memoized Case Study Page Component
const CaseStudyPage = React.memo<{ onBackHome: () => void; caseStudy: string }>(({ onBackHome, caseStudy }) => {
  return (
    <div className="w-full min-h-screen">
      {caseStudy === 'treatmentpath' && <TreatmentPathCaseStudy onClose={onBackHome} />}
      {caseStudy === 'universityx' && <UniversityxCaseStudy onClose={onBackHome} />}
    </div>
  );
});

export default function App() {
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'case-study'>('portfolio');
  const [activeCaseStudy, setActiveCaseStudy] = useState<string>('treatmentpath');

  const navigateToCaseStudy = (caseStudy: string) => {
    setActiveCaseStudy(caseStudy);
    setCurrentPage('case-study');
  };

  const navigateToPortfolio = () => {
    setCurrentPage('portfolio');
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentPage === 'case-study') {
        navigateToPortfolio();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Optimized keyboard and scroll management
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentPage === 'case-study') {
        navigateToPortfolio();
      }
    };

    // Batch DOM updates
    requestAnimationFrame(() => {
      if (currentPage === 'case-study') {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscape, { passive: true });
      } else {
        document.body.style.overflow = 'unset';
      }
    });

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [currentPage]);

  // Performance optimizations - run once on mount
  React.useEffect(() => {
    // Reduce motion for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('motion-reduce');
    }

    // Optimize rendering performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Preload critical images in idle time
        const criticalImages = [
          imgCreateTreatmentPlans1,
          imgPta1,
          imgMolerHealthDashboard
        ];
        
        criticalImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen w-full">
      {/* Skip Navigation Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100]">
        <a
          href="#main-content"
          className="bg-white text-black px-4 py-2 rounded-lg shadow-lg font-medium underline focus:ring-2 focus:ring-[#ac83f3] focus:outline-none"
        >
          Skip to main content
        </a>
      </div>
      
      {currentPage === 'portfolio' && (
        <div
          key="portfolio"
          className="w-full"
          role="main"
          aria-label="Portfolio showcase"
        >
          <PortfolioPage onViewCaseStudy={navigateToCaseStudy} />
        </div>
      )}
      
      {currentPage === 'case-study' && (
        <div
          key="case-study"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#f7f6f3]"
          role="dialog"
          aria-label={`${activeCaseStudy === 'treatmentpath' ? 'TreatmentPath' : 'Universityx'} case study`}
          aria-modal="true"
        >
          <CaseStudyPage onBackHome={navigateToPortfolio} caseStudy={activeCaseStudy} />
        </div>
      )}
    </div>
  );
}