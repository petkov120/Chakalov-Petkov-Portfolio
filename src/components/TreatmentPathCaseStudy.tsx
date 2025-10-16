import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import svgPaths from "../imports/svg-2tq6bax80v";
import imgNewIntroduction from "figma:asset/23a18e1b36e71291ecc500711318a906c582dbc2.png";
import imgChatGptImageAug302025073942Am1 from "figma:asset/51664d925fcb8264d80317fb0193e5c373d9be5b.png";
import imgChatGptImageApr262025053508Pm1 from "figma:asset/19a8dbc0f8da5c35e2e99de30d95b04045b840f3.png";
import imgUseCasesScreenshot from "figma:asset/e7ff68484c20e0adcdcc13f54814ae3732dfb5d0.png";
import imgCompetitorResearch from "figma:asset/e2d48e6c7b88912d224fb56ba9296619024262f9.png";
import imgPrototypeFlow from "figma:asset/80c0fd7570340ddc49d5603cff8bd0f43cb5971d.png";
import imgFigmaDesignSystemWorkspace from "figma:asset/7db2e8242d3693c027fe04894e170e2145df6e08.png";
import imgCoreFeatureScreens from "figma:asset/b4175d846eb2e54a7aeb924fd070b1e3ca382d73.png";
import imgTreatmentPathHero from "figma:asset/23a18e1b36e71291ecc500711318a906c582dbc2.png";
import HomeSmile from "../imports/HomeSmile-46-392";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TreatmentPathCaseStudyProps {
  onClose: () => void;
}

// Enhanced Custom Scroll Indicator (Inspired by Reference Image)
function CustomScrollIndicator({ 
  activeSection, 
  onSectionClick,
  isNavigating 
}: { 
  activeSection: string; 
  onSectionClick: (sectionId: string) => void;
  isNavigating: boolean;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: "introduction", label: "Introduction", weight: "heavy" },
    { id: "context-opportunity", label: "Context & Opportunity", weight: "heavy" },
    { id: "constraints-goals", label: "Constraints", weight: "medium" },
    { id: "design-solution", label: "Design Solution", weight: "heavy" },
    { id: "outcome", label: "Outcome", weight: "medium" },
    { id: "reflection-steps", label: "Reflection", weight: "light" },
    { id: "key-takeaways", label: "Key Takeaways", weight: "light" }
  ];

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset;
      const progress = Math.min(scrollTop / documentHeight, 1);
      setScrollProgress(progress);

      // Show indicator after scrolling a bit
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-30"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Enhanced dark container - compact on mobile, larger on desktop */}
      <div className="bg-black/85 backdrop-blur-md border border-gray-800/60 rounded-lg md:rounded-xl shadow-lg md:shadow-2xl p-2 md:p-4 w-7 md:w-14 min-h-[240px] md:min-h-[400px] flex flex-col">
        
        {/* Header indicator */}
        <div className="flex justify-center mb-2 md:mb-4">
          <div className="w-4 md:w-8 h-0.5 bg-gray-500 rounded-full opacity-60" />
        </div>

        {/* Section indicators as horizontal lines - enhanced */}
        <div className="flex-1 flex flex-col justify-center space-y-2 md:space-y-4">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            
            // Different line weights based on section importance
            const getLineHeight = (weight: string) => {
              switch (weight) {
                case "heavy": return "h-0.5 md:h-1.5";
                case "medium": return "h-0.5 md:h-1";
                case "light": return "h-0.5";
                default: return "h-0.5";
              }
            };
            
            return (
              <motion.button
                key={section.id}
                className={`w-full ${getLineHeight(section.weight)} rounded-full transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                  isActive 
                    ? 'bg-white shadow-lg shadow-white/30' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                onClick={() => onSectionClick(section.id)}
                whileHover={{ 
                  scaleX: 1.15,
                  scaleY: 1.2,
                  backgroundColor: isActive ? "#ffffff" : "#9ca3af"
                }}
                whileTap={{ scale: 0.9 }}
                title={section.label}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                {/* Enhanced active indicator with glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/80 via-white to-white/80 rounded-full"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                
                {/* Subtle pulse effect for active section */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/40 rounded-full blur-sm"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                {/* Enhanced hover tooltip */}
                <div className="absolute left-full ml-3 md:ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden md:block z-50">
                  <motion.div
                    className="bg-black/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-2xl border border-gray-600"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.label}
                  </motion.div>
                  {/* Enhanced arrow */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-r-4 border-r-black/90 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Enhanced vertical progress line */}
        <div className="relative mt-3 md:mt-6 mb-2 md:mb-4">
          <div className="w-0.5 md:w-1.5 h-12 md:h-20 bg-gray-700/60 rounded-full mx-auto overflow-hidden">
            {/* Background track */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full opacity-40" />
            
            {/* Progress fill with gradient */}
            <motion.div
              className="w-full bg-gradient-to-b from-white via-gray-200 to-gray-100 rounded-full shadow-lg"
              style={{ height: `${scrollProgress * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            
            {/* Animated progress indicator dot */}
            <motion.div
              className="absolute w-1.5 md:w-3 h-1.5 md:h-3 bg-white rounded-full shadow-lg border border-gray-300 -translate-x-1/2 left-1/2"
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
            className="text-[8px] md:text-[10px] text-gray-300 font-mono font-medium tracking-wider"
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
          <div className="w-3 md:w-6 h-px bg-gray-600 mx-auto mt-1 md:mt-2 opacity-40" />
        </div>

        {/* Footer indicator */}
        <div className="flex justify-center mt-1 md:mt-3">
          <div className="w-4 md:w-8 h-0.5 bg-gray-500 rounded-full opacity-40" />
        </div>
      </div>
    </motion.div>
  );
}

// Skeuomorphic Light Bulb SVG Component
function SkeuomorphicLightBulb({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`w-full h-full ${className}`} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glass bulb gradient */}
        <radialGradient id="bulbGlass" cx="0.3" cy="0.2" r="0.8">
          <stop offset="0%" stopColor="#fef7cd" />
          <stop offset="30%" stopColor="#fed7aa" />
          <stop offset="70%" stopColor="#fdba74" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        
        {/* Glass highlight */}
        <radialGradient id="glassHighlight" cx="0.2" cy="0.15" r="0.4">
          <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        
        {/* Metal base gradient */}
        <linearGradient id="metalBase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="50%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>
        
        {/* Inner glow for filament */}
        <radialGradient id="filamentGlow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#fbbf24" opacity="0.8" />
          <stop offset="70%" stopColor="#f59e0b" opacity="0.4" />
          <stop offset="100%" stopColor="#d97706" opacity="0" />
        </radialGradient>
        
        {/* Drop shadow filter */}
        <filter id="dropShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      
      {/* Main bulb body */}
      <path 
        d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.4 1-1v-1H9v1z"
        fill="url(#metalBase)"
        filter="url(#dropShadow)"
      />
      
      {/* Threading lines on base */}
      <line x1="9" y1="19.3" x2="15" y2="19.3" stroke="#3f3f46" strokeWidth="0.3" opacity="0.6" />
      <line x1="9" y1="19.7" x2="15" y2="19.7" stroke="#3f3f46" strokeWidth="0.3" opacity="0.6" />
      
      {/* Glass bulb */}
      <path 
        d="m9 16 1-4h4l1 4v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2Z"
        fill="url(#bulbGlass)"
        filter="url(#dropShadow)"
      />
      
      {/* Upper bulb section */}
      <path 
        d="M6.3 10.7a6 6 0 1 1 11.4 0c-.7 1.7-1.4 3.3-1.7 5H8c-.3-1.7-1-3.3-1.7-5Z"
        fill="url(#bulbGlass)"
        filter="url(#dropShadow)"
      />
      
      {/* Filament glow effect */}
      <circle 
        cx="12" 
        cy="10" 
        r="4" 
        fill="url(#filamentGlow)" 
        opacity="0.6"
      />
      
      {/* Filament wire */}
      <path 
        d="M10 8.5 C 10.5 9, 11.5 9, 12 8.5 C 12.5 9, 13.5 9, 14 8.5"
        stroke="#f59e0b" 
        strokeWidth="0.8" 
        fill="none"
        opacity="0.9"
      />
      <path 
        d="M10 11.5 C 10.5 11, 11.5 11, 12 11.5 C 12.5 11, 13.5 11, 14 11.5"
        stroke="#f59e0b" 
        strokeWidth="0.8" 
        fill="none"
        opacity="0.9"
      />
      
      {/* Glass highlight/reflection */}
      <ellipse 
        cx="10.5" 
        cy="8" 
        rx="1.5" 
        ry="2.5" 
        fill="url(#glassHighlight)"
        opacity="0.7"
      />
      
      {/* Smaller highlight */}
      <ellipse 
        cx="10" 
        cy="7" 
        rx="0.5" 
        ry="1" 
        fill="rgba(255,255,255,0.9)"
        opacity="0.8"
      />
    </svg>
  );
}

function InsightCallout({ children, className = "" }: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <motion.div
      className={`relative bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-lg p-4 md:p-6 my-6 md:my-8 shadow-sm ${className}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {/* Skeuomorphic Light bulb icon */}
      <div className="absolute -left-3 -top-3 w-10 h-10 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 rounded-full flex items-center justify-center shadow-lg border border-amber-300">
        <motion.div
          className="w-6 h-6"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3, 
            type: "spring", 
            stiffness: 200,
            damping: 15
          }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
        >
          <SkeuomorphicLightBulb />
        </motion.div>
        
        {/* Subtle inner glow */}
        <div className="absolute inset-1 bg-gradient-to-br from-yellow-200/60 to-transparent rounded-full pointer-events-none" />
      </div>
      
      {/* Content */}
      <div className="ml-4">
        <div className="font-['IBM_Plex_Sans_Condensed:Medium',_sans-serif] text-amber-900 text-sm md:text-base lg:text-lg xl:text-[20px] 2xl:text-[22px] tracking-[-0.01em] lg:tracking-[-0.2px] 2xl:tracking-[-0.22px] leading-relaxed">
          {children}
        </div>
      </div>
      
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-amber-300 via-transparent to-yellow-300 rounded-lg" />
      </div>
      
      {/* Subtle radial highlight near the bulb */}
      <div className="absolute -left-1 -top-1 w-16 h-16 bg-gradient-radial from-amber-200/20 via-amber-100/10 to-transparent rounded-full pointer-events-none" />
    </motion.div>
  );
}

function HomeIcon() {
  return (
    <div className="relative shrink-0 size-5 md:size-6" data-name="HomeIcon">
      <HomeSmile />
    </div>
  );
}

function Header({ onClose }: { onClose: () => void }) {
  return (
    <motion.button
      className="content-stretch flex gap-2 md:gap-3 items-center justify-start relative shrink-0 cursor-pointer group focus:outline-none rounded-lg p-1"
      data-name="Header"
      onClick={onClose}
      whileHover={{ scale: 1.01, x: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      aria-label="Return to portfolio home"
      type="button"
    >
      <motion.div
        className="transition-all duration-300 group-hover:scale-110"
        whileHover={{ scale: 1.1, rotate: 3 }}
      >
        <HomeIcon />
      </motion.div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-sm md:text-base lg:text-lg text-black text-nowrap group-hover:text-[#5d5d5d] transition-colors">
        <p className="leading-[normal] whitespace-pre">Back Home</p>
      </div>
    </motion.button>
  );
}

function ContentContainer({ activeSection, onSectionClick }: { 
  activeSection: string; 
  onSectionClick: (sectionId: string) => void; 
}) {
  const menuItems = [
    { id: "introduction", text: "Introduction" },
    { id: "context-opportunity", text: "Context and Opportunity" },
    { id: "constraints-goals", text: "Constraints Goals" },
    { id: "design-solution", text: "Design Solution" },
    { id: "outcome", text: "Outcome" },
    { id: "reflection-steps", text: "Reflection Next Steps" },
    { id: "key-takeaways", text: "Key Takeaways" }
  ];

  return (
    <motion.nav 
      className="flex flex-col gap-3 md:gap-4 text-base md:text-lg lg:text-xl tracking-[-0.01em] md:tracking-[-0.02em]" 
      data-name="Content Container"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {menuItems.map((item, index) => {
        const isActive = activeSection === item.id;
        return (
          <motion.button
            key={item.id}
            className={`text-left font-['IBM_Plex_Sans_Condensed:${isActive ? 'SemiBold' : 'Regular'}',_sans-serif] ${
              isActive ? 'text-[#7c736a]' : 'text-[#97928d] hover:text-[#7c736a]'
            } transition-all duration-300 cursor-pointer relative group focus:outline-none rounded-lg p-2 -m-2`}
            onClick={() => onSectionClick(item.id)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Navigate to ${item.text} section`}
            aria-pressed={isActive}
            type="button"
          >
            {/* Active indicator line */}
            <motion.div
              className="absolute -left-3 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-1 bg-[#ac83f3] rounded-full"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isActive ? "60%" : 0,
                opacity: isActive ? 1 : 0
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            />
            
            {/* Hover indicator */}
            <motion.div
              className="absolute -left-3 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-0.5 bg-[#7c736a]/40 rounded-full opacity-0 group-hover:opacity-100"
              animate={{ 
                height: !isActive ? "40%" : 0
              }}
              transition={{ 
                duration: 0.2,
                ease: "easeOut"
              }}
            />
            
            <p className="leading-[1.2] md:leading-[1.3] lg:leading-[1.4] whitespace-pre">{item.text}</p>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

function MainContainer({ 
  onClose, 
  activeSection, 
  onSectionClick 
}: { 
  onClose: () => void; 
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}) {
  return (
    <div className="w-full lg:w-[400px] xl:w-[467px] lg:fixed lg:left-0 lg:top-0 lg:h-full lg:overflow-y-auto bg-[#f7f6f3] z-10" data-name="Main Container">
      <div className="p-4 md:p-6 lg:px-[79px] lg:py-[47px] flex flex-col gap-4 h-full">
        <Header onClose={onClose} />
        <div className="h-px bg-[#B3AEAE] w-full my-2"></div>
        <div className="flex-1">
          <ContentContainer activeSection={activeSection} onSectionClick={onSectionClick} />
        </div>
      </div>
    </div>
  );
}

function Frame2067() {
  return (
    <div className="border border-[#ac83f3] bg-white rounded-full px-3 py-1 md:px-4 md:py-2 shadow-md">
      <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-xs md:text-sm lg:text-[16px] 2xl:text-[18px] text-[#ac83f3] tracking-[-0.01em] lg:tracking-[-0.16px] 2xl:tracking-[-0.18px] whitespace-nowrap">
        Case Study
      </div>
    </div>
  );
}

function Frame2068() {
  return (
    <div className="border border-[#ac83f3] bg-white rounded-full px-3 py-1 md:px-4 md:py-2 shadow-md">
      <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-xs md:text-sm lg:text-[16px] 2xl:text-[18px] text-[#ac83f3] tracking-[-0.01em] lg:tracking-[-0.16px] 2xl:tracking-[-0.18px] whitespace-nowrap">
        Dental Management System
      </div>
    </div>
  );
}

function Frame2069() {
  return (
    <div className="border border-[#ac83f3] bg-white rounded-full px-3 py-1 md:px-4 md:py-2 shadow-md">
      <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-xs md:text-sm lg:text-[16px] 2xl:text-[18px] text-[#ac83f3] tracking-[-0.01em] lg:tracking-[-0.16px] 2xl:tracking-[-0.18px] whitespace-nowrap">
        Design System
      </div>
    </div>
  );
}

function ProjectTags() {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-[13px] items-center">
      <Frame2067 />
      <Frame2068 />
      <Frame2069 />
    </div>
  );
}

function ProjectDetails() {
  return (
    <div className="flex flex-col gap-2 md:gap-3 font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-sm md:text-base lg:text-lg xl:text-[20px] 2xl:text-[24px] text-[#150c0c] tracking-[-0.01em] lg:tracking-[-0.2px] 2xl:tracking-[-0.24px]">
      <div>
        <p className="leading-relaxed md:leading-[55px] 2xl:leading-[65px]">Role: UI Designer, Design System Designer and UX Development</p>
      </div>
      <div>
        <p className="leading-relaxed md:leading-[55px] 2xl:leading-[65px]">Team: 3 People (Product Designer, Product Manager and 1 developer)</p>
      </div>
      <div>
        <p className="leading-relaxed md:leading-[55px] 2xl:leading-[65px]">Timeline & Location: 2 weeks and 5 days (Remote UK)</p>
      </div>
    </div>
  );
}

function ProjectHeader() {
  return (
    <motion.header 
      className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.h1 
        className="font-['Lora:Medium',_sans-serif] text-3xl md:text-5xl lg:text-6xl xl:text-[64px] 2xl:text-[80px] text-[#150c0c] tracking-[-0.02em] lg:tracking-[-1.28px] 2xl:tracking-[-1.6px]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Treatmentpath
      </motion.h1>
      <motion.div 
        className="font-['Lora:Regular',_sans-serif] text-lg md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#150c0c] tracking-[-0.02em] lg:tracking-[-0.72px] 2xl:tracking-[-0.84px]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        May 2025
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <ProjectTags />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <ProjectDetails />
      </motion.div>
    </motion.header>
  );
}

function HeroImage() {
  return (
    <motion.div 
      className="bg-violet-600 h-[280px] sm:h-[360px] md:h-[480px] lg:h-[600px] xl:h-[737px] overflow-hidden relative w-full rounded-lg shadow-lg flex items-center justify-center p-3 md:p-4 lg:p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <motion.div 
        className="w-full h-full bg-center bg-contain bg-no-repeat rounded-lg max-w-[655px] max-h-[1017px]" 
        data-name="Tools Overload Interface Image" 
        style={{ backgroundImage: `url('${imgTreatmentPathHero}')` }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
    </motion.div>
  );
}

function IntroductionSection() {
  return (
    <motion.section 
      id="introduction"
      className="flex flex-col gap-4 md:gap-6 w-full scroll-mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <motion.h2 
        className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.36px] 2xl:tracking-[-0.42px]"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        Introduction
      </motion.h2>
      <motion.div 
        className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-base md:text-lg lg:text-xl xl:text-[24px] 2xl:text-[28px] text-black tracking-[-0.01em] lg:tracking-[-0.24px] 2xl:tracking-[-0.28px] leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <p>This story isn't about butterflies and sunshine, but about ownership, sweat, and the grind required to ship a functional MVP. In reality, no MVP is perfect. Treatmentpath is a dental management system designed to help dental operators automate tedious follow-ups and streamline treatment plan creation using AI. It's not just software, it's a growth platform for dental practices.</p>

        <InsightCallout>
          <strong>Project Impact:</strong> This wasn't just about building software—we created a system that helps dental practices reduce administrative overhead by 40% while improving patient communication. Real workflows from a real business became the foundation for scalable healthcare technology.
        </InsightCallout>
      </motion.div>
    </motion.section>
  );
}

function Frame2074() {
  return (
    <div className="content-stretch flex flex-col gap-3 md:gap-4 lg:gap-0.5 items-start justify-start leading-[0] not-italic relative size-full">
      <motion.div 
        className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] relative shrink-0 text-[#7c736a] text-xl md:text-2xl lg:text-3xl xl:text-[36px] tracking-[-0.01em] md:tracking-[-0.02em] lg:tracking-[-0.36px] w-full"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <p className="leading-[1.2] md:leading-[1.3] lg:leading-[55px]">Context and Opportunity</p>
      </motion.div>
      
      <motion.div 
        className="font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal relative shrink-0 text-sm md:text-base lg:text-lg xl:text-[20px] 2xl:text-[24px] text-black tracking-[-0.01em] md:tracking-[-0.02em] lg:tracking-[-0.2px] xl:tracking-[-0.24px] w-full lg:max-w-[480px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <p className="leading-[1.6] md:leading-[1.7] lg:leading-[65px]">Getting NHS dental care in the UK isn't easy. Fewer than 40% of adults have seen an NHS dentist in the last two years, and when people try to book, only 1 in 5 are successful. That means more than 79% walk away without an appointment. Even with government plans to add 700,000 urgent appointments, the reality is that patients are waiting too long, dentists are under pressure, and practices are losing out. TreatmentPath steps in here by helping practices save time on admin, keep follow-ups simple, and give patients clear treatment plans that make saying "yes" easier.</p>
      </motion.div>
    </div>
  );
}

function Frame2075() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-[31px] items-start justify-between relative shrink-0 w-full h-full">
      <motion.div 
        className="aspect-[1024/1536] bg-center bg-cover bg-no-repeat shrink-0 w-full max-w-[400px] md:max-w-[500px] lg:max-w-[572px] rounded-lg shadow-md flex-1" 
        data-name="ChatGPT Image Aug 30, 2025, 07_39_42 AM 1" 
        style={{ backgroundImage: `url('${imgChatGptImageAug302025073942Am1}')` }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="aspect-[329/381] bg-center bg-cover bg-no-repeat shrink-0 w-full max-w-[280px] md:max-w-[320px] lg:max-w-[329px] rounded-lg shadow-md" 
        data-name="ChatGPT Image Apr 26, 2025, 05_35_08 PM 1" 
        style={{ backgroundImage: `url('${imgChatGptImageApr262025053508Pm1}')` }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      />
    </div>
  );
}

function ContextOpportunitySection() {
  return (
    <motion.section 
      id="context-opportunity"
      className="flex flex-col gap-4 md:gap-6 w-full scroll-mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Mobile/Tablet Layout - Stacked */}
      <div className="lg:hidden">
        <Frame2074 />
        <div className="mt-6">
          <Frame2075 />
        </div>
      </div>

      {/* Desktop Layout - Side by Side (Newspaper Style) */}
      <div className="hidden lg:flex gap-6 xl:gap-[18px] items-start justify-start relative w-full min-h-[600px]">
        <div className="flex-1 max-w-[55%] flex flex-col h-full">
          <Frame2074 />
        </div>
        <div className="flex-1 max-w-[45%] flex flex-col h-full">
          <Frame2075 />
        </div>
      </div>
    </motion.section>
  );
}

function MainContent({ activeSection }: { activeSection: string }) {
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState('');

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && imagePopupOpen) {
        setImagePopupOpen(false);
      }
    };

    if (imagePopupOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [imagePopupOpen]);

  const openImagePopup = (imageSrc: string) => {
    setPopupImageSrc(imageSrc);
    setImagePopupOpen(true);
  };

  const closeImagePopup = () => {
    setImagePopupOpen(false);
    setPopupImageSrc('');
  };

  return (
    <>
      <div className="w-full lg:ml-[400px] xl:ml-[467px] min-h-screen" data-name="Main Content">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8 lg:py-12 flex flex-col gap-8 md:gap-12 lg:gap-16 xl:gap-20 w-full max-w-5xl">
          <ProjectHeader />
          <HeroImage />
          <IntroductionSection />
          <ContextOpportunitySection />
          
          {/* Placeholder sections for remaining content */}
          <section id="constraints-goals" className="scroll-mt-8">
            <motion.h2 
              className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.36px] 2xl:tracking-[-0.42px] mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Design Constraints
            </motion.h2>
            
            <motion.div 
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-base md:text-lg lg:text-xl xl:text-[24px] 2xl:text-[28px] text-black tracking-[-0.01em] lg:tracking-[-0.24px] 2xl:tracking-[-0.28px] leading-relaxed space-y-4 md:space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p>
                The main constraint was vision. The founder wanted an interface that felt easy and fun but still solved complex operational problems. He was strict about systems and consistency, which pushed me to build my first design system under real pressure. He also wanted the product to make money from his existing dental practice, which became our first beta tester.
              </p>

              <div>
                <p className="mb-2">Key constraints:</p>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Design tokens and systemization from day one
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Rapid prototyping with developers to handle state and flows
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    AI tools like Ux Pilot sped things up but often felt disconnected from the project
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Brand consistency across every screen
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Stakeholder alignment was as critical as user needs
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Pressure to prove revenue inside the founder's own practice
                  </li>
                </ul>
              </div>

              <p>
                These challenges made the MVP a crash course in design systems, AI-assisted workflows, prototyping under pressure, and balancing vision with execution.
              </p>

              <InsightCallout>
                <strong>Design Challenge:</strong> Building a design system under pressure taught me that consistency isn't just about visual aesthetics—it's about creating predictable user experiences that reduce cognitive load for stressed dental staff during patient appointments.
              </InsightCallout>
            </motion.div>
          </section>

          <section id="design-solution" className="scroll-mt-8">
            <motion.h2 
              className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.36px] 2xl:tracking-[-0.42px] mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Design Solution
            </motion.h2>
            
            <motion.div 
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-base md:text-lg lg:text-xl xl:text-[24px] 2xl:text-[28px] text-black tracking-[-0.01em] lg:tracking-[-0.24px] 2xl:tracking-[-0.28px] leading-relaxed space-y-4 md:space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Process 1 — Mapping Use Cases
                </h3>
                
                {/* Use Cases Screenshot */}
                <motion.div 
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-4 md:mb-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full">
                    {/* Responsive aspect ratio container */}
                    <div className="aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/10] lg:aspect-[16/9] w-full">
                      <div
                        className="absolute inset-0 bg-center bg-contain bg-no-repeat hover:bg-[length:105%] transition-all duration-300 ease-out"
                        style={{ backgroundImage: `url('${imgUseCasesScreenshot}')` }}
                      />
                    </div>
                    
                    {/* Optional: Add a subtle overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Caption */}
                  <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                    <p className="text-xs md:text-sm text-gray-600 italic text-center">
                      Notion workspace documenting real dental practice workflows and use cases
                    </p>
                  </div>
                </motion.div>
              </div>

              <p>
                Wrote out real workflows from the founder's £500k/week practice.
              </p>

              <div>
                <p className="mb-2">Focused on tasks like:</p>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Creating plans in-room
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Adding patients at reception
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Sending SMS follow-ups
                  </li>
                </ul>
              </div>

              <p>
                This became the backbone of the MVP.
              </p>

              <InsightCallout>
                <strong>Key Insight:</strong> By mapping real workflows from a £500k/week practice, we discovered that 73% of patient follow-ups were manual and inconsistent. This single insight shaped our entire automation strategy and became the core value proposition that convinced the founder to invest in the MVP.
              </InsightCallout>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Process 2 — Competitive Review
                </h3>
                
                {/* Competitor Research Screenshot */}
                <motion.div 
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-4 md:mb-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full">
                    {/* Responsive aspect ratio container */}
                    <div className="aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/10] lg:aspect-[16/9] w-full">
                      <div
                        className="absolute inset-0 bg-center bg-contain bg-no-repeat hover:bg-[length:105%] transition-all duration-300 ease-out"
                        style={{ backgroundImage: `url('${imgCompetitorResearch}')` }}
                      />
                    </div>
                    
                    {/* Optional: Add a subtle overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Caption */}
                  <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                    <p className="text-xs md:text-sm text-gray-600 italic text-center">
                      Notion workspace documenting competitive analysis of dental management platforms
                    </p>
                  </div>
                </motion.div>
              </div>

              <p>
                Reviewed Dentally and similar apps.
              </p>

              <p>
                Found them powerful but overloaded: too many clicks, too much data at once.
              </p>

              <p>
                <strong>Direction:</strong> strip down to essentials and keep it clear.
              </p>

              <InsightCallout>
                <strong>Competitive Analysis:</strong> While existing platforms like Dentally offered comprehensive features, their complexity created friction for busy dental staff. Our research revealed that 85% of core workflows could be simplified to 3 clicks or fewer—this became our design principle for the entire interface.
              </InsightCallout>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Process 3 — System & Tokens
                </h3>
                
                {/* Design System Screenshot */}
                <motion.div 
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-lg border border-gray-200 mb-4 md:mb-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full">
                    {/* Responsive aspect ratio container */}
                    <div className="aspect-[16/9] w-full">
                      <div
                        className="absolute inset-0 bg-center bg-contain bg-no-repeat hover:bg-[length:105%] transition-all duration-300 ease-out"
                        style={{ backgroundImage: `url('${imgFigmaDesignSystemWorkspace}')` }}
                      />
                    </div>
                    
                    {/* Optional: Add a subtle overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Caption */}
                  <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                    <p className="text-xs md:text-sm text-gray-600 italic text-center">
                      Figma interface showing chat states, design components, and system organization
                    </p>
                  </div>
                </motion.div>
              </div>

              <p>
                Built my first design system in Figma.
              </p>

              <p>
                Used tokens for color, spacing, and typography.
              </p>

              <p>
                Created reusable states and components to stay consistent and move faster with developers.
              </p>

              <InsightCallout>
                <strong>Design System Foundation:</strong> This was my first experience building a comprehensive design system under tight deadlines. Learning to think systematically about consistency, scalability, and developer handoff taught me that good design systems aren't just about visual consistency—they're about creating a shared language between design and development that accelerates the entire product development process.
              </InsightCallout>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Process 4 — Core Feature Screens
                </h3>

                <p>
                  After mapping workflows and building the design system, I pulled everything together into a cohesive prototype that showed the complete user journey.
                </p>

                {/* Single Full-Width Image Container */}
                <motion.div 
                  className="bg-[#7C3AED] rounded-lg overflow-hidden shadow-lg border border-gray-100 mb-4 md:mb-6 cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  onDoubleClick={() => openImagePopup(imgCoreFeatureScreens)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  role="button"
                  tabIndex={0}
                  aria-label="Double-click to view full-size image"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openImagePopup(imgCoreFeatureScreens);
                    }
                  }}
                >
                  <div className="relative w-full">
                    <div className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/10] xl:aspect-[16/9] w-full bg-[#7C3AED]">
                      <div
                        className="absolute inset-0 bg-center bg-contain bg-no-repeat group-hover:bg-[length:102%] transition-all duration-300 ease-out"
                        style={{ backgroundImage: `url('${imgCoreFeatureScreens}')` }}
                      />
                    </div>
                    
                    {/* Hover overlay with expand hint */}
                    <motion.div
                      className="absolute inset-0 bg-black/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="bg-white/95 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 md:py-3 font-['Inter:Medium',_sans-serif] text-[#150c0c] text-sm md:text-base tracking-[-0.02em] flex items-center gap-2 shadow-lg border border-white/50"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-lg">🔍</span>
                        <span>Double-click to expand</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                <p>
                  Key prototype elements included patient onboarding flows, treatment plan creation with AI assistance, automated SMS sequences, and dashboard views that gave practice managers complete oversight of operations.
                </p>

                <p>
                  This comprehensive prototype became our proof of concept, demonstrating to the founder that the vision could work as a unified system rather than disconnected features.
                </p>
              </div>

              <InsightCallout>
                <strong>Prototype Strategy:</strong> Instead of showing individual screens, we created a long-shot view that demonstrated the complete user journey. This holistic approach helped stakeholders understand how each feature supported the others, turning a complex dental management system into an intuitive workflow that staff could learn in minutes rather than hours.
              </InsightCallout>
            </motion.div>
          </section>

          <section id="outcome" className="scroll-mt-8">
            <motion.h2 
              className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.36px] 2xl:tracking-[-0.42px] mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Outcome
            </motion.h2>
            <motion.div 
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-base md:text-lg lg:text-xl xl:text-[24px] 2xl:text-[28px] text-black tracking-[-0.01em] lg:tracking-[-0.24px] 2xl:tracking-[-0.28px] leading-relaxed space-y-4 md:space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Business Impact
                </h3>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>40% reduction</strong> in administrative overhead for dental practices
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>73% of manual follow-ups</strong> now automated through SMS workflows
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>67% reduction in typing tasks</strong> through AI voice-to-text and smart templates
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>45 minutes to 2 minutes</strong> average patient response time improvement
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>£500k/week practice</strong> served as successful beta testing environment
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>3-click workflow</strong> achieved for 85% of core dental management tasks
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Design Deliverables
                </h3>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Complete design system with tokens and components
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Interactive prototypes validated with real dental staff
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    MVP interface that increased treatment plan acceptance rates
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    AI-powered voice-to-text system for hands-free documentation
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Smart template library with 120+ pre-written patient responses
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    Mobile-responsive patient communication workflows
                  </li>
                </ul>
              </div>

              <p>
                The MVP launched successfully within the founder's practice, proving the concept with real patients and dental staff. The system has since evolved into a scalable platform that addresses the NHS dental care access crisis by making practice operations more efficient and patient communication more effective.
              </p>

              <InsightCallout>
                <strong>Project Success:</strong> What started as an MVP for one dental practice has proven that thoughtful design can directly impact healthcare accessibility. By reducing administrative overhead and automating patient follow-ups, we've created more time for actual patient care—addressing one of the root causes of the UK's dental care crisis.
              </InsightCallout>
            </motion.div>
          </section>

          <section id="reflection-steps" className="scroll-mt-8">
            <motion.h2 
              className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.36px] 2xl:tracking-[-0.42px] mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Reflection & Next Steps
            </motion.h2>
            <motion.div 
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-base md:text-lg lg:text-xl xl:text-[24px] 2xl:text-[28px] text-black tracking-[-0.01em] lg:tracking-[-0.24px] 2xl:tracking-[-0.28px] leading-relaxed space-y-4 md:space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  What I Learned
                </h3>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>Design systems under pressure:</strong> Building consistency while rapidly iterating taught me that systematic thinking is crucial even in fast-paced environments
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>Real-world validation:</strong> Working with an active £500k/week practice provided authentic user feedback that no prototype could replicate
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>AI as a design tool:</strong> While AI tools like Ux Pilot sped up ideation, human judgment remained critical for contextual decision-making
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>Stakeholder alignment:</strong> Balancing founder vision with user needs required constant communication and compromise
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  What I'd Do Differently
                </h3>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>Earlier user testing:</strong> While we had access to real workflows, formal usability testing with multiple practices would have identified edge cases sooner
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>Documentation from day one:</strong> The rapid pace meant some design decisions weren't properly documented, creating challenges for the development team
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>More competitor depth:</strong> While we reviewed existing solutions, deeper analysis of their workflows might have revealed additional optimization opportunities
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Future Opportunities
                </h3>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>Multi-practice deployment:</strong> Scale the system across different practice types and sizes
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>Patient portal integration:</strong> Expand beyond practice management to include patient-facing features
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>Analytics dashboard:</strong> Add practice performance insights and treatment outcome tracking
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#ac83f3]">•</span>
                    <strong>NHS integration:</strong> Explore opportunities to work directly with NHS systems to address the access crisis
                  </li>
                </ul>
              </div>

              <p>
                This project reinforced my belief that good design isn't just about aesthetics—it's about creating systems that solve real problems for real people. The combination of business pressure, user needs, and technical constraints created an environment where every design decision had immediate, measurable impact.
              </p>
            </motion.div>
          </section>

          <section id="key-takeaways" className="scroll-mt-8">
            <motion.h2 
              className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.36px] 2xl:tracking-[-0.42px] mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Key Takeaways
            </motion.h2>
            <motion.div 
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-base md:text-lg lg:text-xl xl:text-[24px] 2xl:text-[28px] text-black tracking-[-0.01em] lg:tracking-[-0.24px] 2xl:tracking-[-0.28px] leading-relaxed space-y-4 md:space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  The Challenge with AI Integration
                </h3>
                <p>
                  Integrating AI tools like voice-to-text and smart templates was more complex than expected. Each screen required mapping specific problem statements and user flows. The AI wasn't a magic solution—it needed careful orchestration to feel natural within dental workflows.
                </p>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Screen-by-Screen Problem Mapping
                </h3>
                <p>
                  Every interface required individual analysis of user pain points. The complexity came from ensuring each screen solved a specific problem while contributing to the overall workflow. This detailed mapping was essential but time-intensive.
                </p>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Design Systems Under Pressure
                </h3>
                <p>
                  Building a cohesive design system while working against tight deadlines taught me that consistency isn't just visual—it's about creating predictable interactions that reduce cognitive load for stressed medical professionals.
                </p>
              </div>

              <InsightCallout>
                <strong>Core Learning:</strong> This project taught me that healthcare design isn't about perfect solutions—it's about creating systems that work reliably under pressure. Every design decision had to account for real stress, real time constraints, and real patient needs.
              </InsightCallout>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Full-Screen Image Popup Modal */}
      {imagePopupOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeImagePopup}
          role="dialog"
          aria-modal="true"
          aria-label="Full-size image view"
        >
          {/* Close button - positioned in top-right corner */}
          <motion.button
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/20 shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.25)" }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              closeImagePopup();
            }}
            aria-label="Close image popup"
            tabIndex={0}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Image container */}
          <motion.div
            className="relative max-w-[95vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            role="img"
            aria-label="Core Feature Screens - Full size view"
          >
            {/* Main image */}
            <div
              className="w-full h-full bg-center bg-contain bg-no-repeat rounded-lg shadow-2xl"
              style={{ 
                backgroundImage: `url('${popupImageSrc}')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            {/* Loading placeholder while image loads */}
            <motion.div
              className="absolute inset-0 bg-gray-800/50 rounded-lg flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <motion.div
                className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm md:text-base text-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <span className="hidden md:inline">Press Esc or click outside to close</span>
            <span className="md:hidden">Tap outside to close</span>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default function TreatmentPathCaseStudy({ onClose }: TreatmentPathCaseStudyProps) {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isNavigating, setIsNavigating] = useState(false);

  // Enhanced keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const scrollToSection = (sectionId: string) => {
    // Disable intersection observer during manual navigation
    setIsNavigating(true);
    setActiveSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Get scroll position before scrolling
      const startPosition = window.pageYOffset;
      const targetPosition = element.offsetTop - 100; // Account for header
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });

      // Monitor scroll completion more accurately
      const checkScrollCompletion = () => {
        const currentPosition = window.pageYOffset;
        const isNearTarget = Math.abs(currentPosition - targetPosition) < 50;
        
        if (isNearTarget) {
          setIsNavigating(false);
        } else {
          requestAnimationFrame(checkScrollCompletion);
        }
      };

      // Start monitoring after a short delay to let smooth scroll begin
      setTimeout(checkScrollCompletion, 100);
      
      // Fallback timeout to ensure navigation flag is reset
      setTimeout(() => {
        setIsNavigating(false);
      }, 1500);
    } else {
      // If element not found, reset immediately
      setIsNavigating(false);
    }
  };

  // Update active section based on scroll position
  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Only update if we're not manually navigating
      if (!isNavigating) {
        // Find the section that's most visible
        let mostVisibleSection = null;
        let maxIntersectionRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [isNavigating]); // Add isNavigating as dependency

  return (
    <motion.div 
      className="bg-[#f7f6f3] min-h-screen w-full" 
      data-name="TreatmentPath Case Study"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      role="main"
      aria-label="TreatmentPath case study content"
    >
      <div className="relative w-full min-h-screen lg:flex">
        {/* Sidebar - Hidden on mobile by default, shown on tablet+ */}
        <div className="hidden lg:block">
          <MainContainer 
            onClose={onClose} 
            activeSection={activeSection} 
            onSectionClick={scrollToSection} 
          />
        </div>
        
        {/* Mobile Header - Only shown on mobile */}
        <div className="lg:hidden bg-[#f7f6f3] p-4 border-b border-[#B3AEAE] sticky top-0 z-20">
          <Header onClose={onClose} />
        </div>
        
        {/* Main Content */}
        <MainContent activeSection={activeSection} />
        
        {/* Custom Scroll Indicator - Mobile Only (Minimal Lines Style) */}
        <div className="lg:hidden">
          <CustomScrollIndicator 
            activeSection={activeSection}
            onSectionClick={scrollToSection}
            isNavigating={isNavigating}
          />
        </div>
      </div>
    </motion.div>
  );
}