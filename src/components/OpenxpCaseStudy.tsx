import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import svgPaths from "../imports/svg-2tq6bax80v";
import imgImage17 from "figma:asset/6f31396b79f9b52ec91036453081ba53c48657af.png";
// Placeholder images - to be replaced later
const imgPlaceholder1 = imgImage17;
const imgPlaceholder2 = imgImage17;
const imgPlaceholder3 = imgImage17;
import HomeSmile from "../imports/HomeSmile-46-392";
import { ImageWithFallback } from './figma/ImageWithFallback';
// Design Solution images

// Placeholder images for design solution sections
const imgDesignSolution1 = imgImage17;
const imgDesignSolution2 = imgImage17;
const imgDesignSolution3 = imgImage17;
const imgDesignSolution4 = imgImage17;
const imgDesignSolution5 = imgImage17;
const imgDesignSolution6 = imgImage17;
const imgDesignSolution7 = imgImage17;
const imgReflectionImage = imgImage17;

interface OpenxpCaseStudyProps {
  onClose: () => void;
}

// Enhanced Custom Scroll Indicator (Same as TreatmentPath)
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

// Skeuomorphic Light Bulb SVG Component (Same as TreatmentPath)
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
              className="absolute -left-3 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-1 bg-[#372270] rounded-full"
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
    <div className="border border-[#372270] bg-white rounded-full px-3 py-1 md:px-4 md:py-2 shadow-md">
      <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-xs md:text-sm lg:text-[16px] 2xl:text-[18px] text-[#372270] tracking-[-0.01em] lg:tracking-[-0.16px] 2xl:tracking-[-0.18px] whitespace-nowrap">
        Case Study
      </div>
    </div>
  );
}

function Frame2068() {
  return (
    <div className="border border-[#372270] bg-white rounded-full px-3 py-1 md:px-4 md:py-2 shadow-md">
      <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-xs md:text-sm lg:text-[16px] 2xl:text-[18px] text-[#372270] tracking-[-0.01em] lg:tracking-[-0.16px] 2xl:tracking-[-0.18px] whitespace-nowrap">
        Exam Prep Software
      </div>
    </div>
  );
}

function Frame2069() {
  return (
    <div className="border border-[#372270] bg-white rounded-full px-3 py-1 md:px-4 md:py-2 shadow-md">
      <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-xs md:text-sm lg:text-[16px] 2xl:text-[18px] text-[#372270] tracking-[-0.01em] lg:tracking-[-0.16px] 2xl:tracking-[-0.18px] whitespace-nowrap">
        AI Tools
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
        <p className="leading-relaxed md:leading-[55px] 2xl:leading-[65px]">Role: Lead Product Designer and UX Strategy</p>
      </div>
      <div>
        <p className="leading-relaxed md:leading-[55px] 2xl:leading-[65px]">Team: Small team (Product Designer, Product Manager, developers)</p>
      </div>
      <div>
        <p className="leading-relaxed md:leading-[55px] 2xl:leading-[65px]">Timeline & Location: 2024</p>
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
        Openxp
      </motion.h1>
      <motion.div 
        className="font-['Lora:Regular',_sans-serif] text-lg md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#150c0c] tracking-[-0.02em] lg:tracking-[-0.72px] 2xl:tracking-[-0.84px]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        2024
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

function VictoryBanner() {
  return (
    <motion.section
      className="relative w-full mb-6 md:mb-8 lg:mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Victory Banner Container - Full Hero Size */}
      <motion.div
        className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 h-[280px] sm:h-[360px] md:h-[480px] lg:h-[600px] xl:h-[737px] overflow-hidden rounded-lg md:rounded-xl shadow-xl border-2 border-yellow-300"
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full bg-gradient-to-br from-yellow-600 via-transparent to-amber-600" />
        </div>
        
        {/* Large Competition Victory Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <div
            className="w-full h-full bg-center bg-cover bg-no-repeat"
            style={{ 
              backgroundImage: `url('${imgCompetitionVictory}')` 
            }}
            aria-label="Universityx team holding ₦10 million check at Hackaholics 5.0 competition"
          />
        </motion.div>

        {/* Overlay with Victory Information */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
            
            {/* Victory Content */}
            <div className="flex items-end gap-4 md:gap-6">
              
              {/* Trophy Icon */}
              <motion.div
                className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-yellow-500/20 backdrop-blur-sm border border-yellow-300/30 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, duration: 0.6, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-xl md:text-2xl lg:text-3xl">🏆</span>
              </motion.div>

              {/* Victory Text */}
              <div className="flex-1">
                <motion.div
                  className="font-['IBM_Plex_Sans_Condensed:Bold',_sans-serif] text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl tracking-[-0.01em] mb-1 md:mb-2 drop-shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  🎉 Competition Victory!
                </motion.div>
                <motion.div
                  className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-yellow-200 text-base md:text-xl lg:text-2xl xl:text-3xl tracking-[-0.01em] mb-2 md:mb-3 drop-shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  ₦10 Million Grand Prize Winner
                </motion.div>
                <motion.div
                  className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-yellow-100 text-sm md:text-lg lg:text-xl tracking-[-0.01em] drop-shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  Wema Bank's Hackaholics 5.0 - Leading Product Design Team
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 text-yellow-200 drop-shadow-lg"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-2xl md:text-3xl lg:text-4xl">✨</span>
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-4 md:bottom-28 md:left-6 lg:bottom-36 lg:left-8 text-yellow-200 drop-shadow-lg"
          animate={{ 
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-xl md:text-2xl lg:text-3xl">🎊</span>
        </motion.div>
        <motion.div
          className="absolute top-20 left-8 md:top-32 md:left-12 lg:top-40 lg:left-16 text-yellow-300 drop-shadow-lg"
          animate={{ 
            rotate: [0, 15, -5, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-lg md:text-xl lg:text-2xl">🌟</span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function HeroImage() {
  return (
    <motion.div 
      className="bg-[#372270] h-[280px] sm:h-[360px] md:h-[480px] lg:h-[600px] xl:h-[737px] overflow-hidden relative w-full rounded-lg shadow-lg flex items-center justify-center p-3 md:p-4 lg:p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <motion.div 
        className="w-full h-full bg-center bg-contain bg-no-repeat rounded-lg max-w-[1038px] max-h-[631px]" 
        data-name="Openxp Platform Interface" 
        style={{ backgroundImage: `url('${imgImage17}')` }}
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
        <p>Openxp is an exam prep software designed to help students prepare for career-defining tests. The platform combines AI tools with intuitive design to create an easy-to-use application for exam preparation. This project focused on creating a solution that helps students make better choices about their careers and subjects through personalized learning experiences.</p>

        <InsightCallout>
          <strong>Project Overview:</strong> Leading the design and development of two versions of Openxp provided valuable experience in iterative design and user-centered development. The platform addresses the challenge of exam preparation by providing students with AI-powered tools that make studying more effective and engaging.
        </InsightCallout>

        <p>The platform tackles the critical problem of exam preparation by providing students with personalized study paths, AI-powered assistance, and intuitive interfaces that make learning more accessible and effective. Through thoughtful design and AI integration, Openxp transforms exam preparation from a stressful experience into an organized, manageable journey.</p>
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
        <p className="leading-[1.6] md:leading-[1.7] lg:leading-[65px]">Exam preparation is a critical challenge for students pursuing career-defining certifications and tests. Many students struggle with organizing their study materials, tracking their progress, and accessing personalized guidance. Traditional study methods often lack the structure and support needed for effective exam preparation. The rise of AI tools and digital learning platforms created an opportunity to redesign how students prepare for important exams.</p>
      </motion.div>
    </div>
  );
}

function Frame2075() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-[31px] items-start justify-between relative shrink-0 w-full h-full">
      <motion.div 
        className="aspect-[4/3] bg-center bg-cover bg-no-repeat shrink-0 w-full max-w-[400px] md:max-w-[500px] lg:max-w-[572px] rounded-lg shadow-md flex-1" 
        data-name="Student Avatars" 
        style={{ backgroundImage: `url('${imgPlaceholder1}')` }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="aspect-[16/10] bg-center bg-cover bg-no-repeat shrink-0 w-full max-w-[320px] md:max-w-[400px] lg:max-w-[450px] rounded-lg shadow-md" 
        data-name="Mobile Interface Screenshot" 
        style={{ backgroundImage: `url('${imgPlaceholder2}')` }}
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
          
          <section id="constraints-goals" className="scroll-mt-8">
            <motion.h2 
              className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.36px] 2xl:tracking-[-0.42px] mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Design Constraints & Goals
            </motion.h2>
            
            <motion.div 
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-base md:text-lg lg:text-xl xl:text-[24px] 2xl:text-[28px] text-black tracking-[-0.01em] lg:tracking-[-0.24px] 2xl:tracking-[-0.28px] leading-relaxed space-y-4 md:space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p>
                The primary constraint was creating an exam prep platform that felt intuitive and supportive without overwhelming students. We needed to design an interface that made complex exam preparation feel manageable and organized. The technical challenge was integrating AI tools that could provide personalized guidance while maintaining simplicity and ease of use.
              </p>

              <div>
                <p className="mb-2">Key constraints and goals:</p>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    Create an easy-to-use interface for exam preparation
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    Integrate AI tools that help students make better career and subject choices
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    Design for students preparing for career-defining tests
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    Support multiple exam types and subjects
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    Provide clear progress tracking and study organization
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    Ensure the platform works across different devices
                  </li>
                </ul>
              </div>

              <p>
                These constraints shaped our approach to creating a focused, user-friendly exam preparation experience that helps students feel confident and prepared.
              </p>

              <InsightCallout>
                <strong>Design Approach:</strong> Leading the development of two versions of Openxp provided valuable insights into iterative design and user-centered development. The platform addresses exam preparation challenges by providing students with AI-powered tools that make studying more effective and engaging.
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
                  Process 1 — AI-Powered Exam Preparation
                </h3>
                
                <p className="mb-4">
                  An intelligent exam prep system that helps students prepare for career-defining tests. The AI tools provide personalized study recommendations, help students make better choices about their careers and subjects, and create an organized approach to exam preparation.
                </p>

                <div>
                  <p className="mb-2 mt-4 font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif]">Core Features</p>
                  <ul className="space-y-1 pl-6 md:pl-8">
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      AI-powered study recommendations
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Career and subject guidance
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Personalized study paths
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Progress tracking and organization
                    </li>
                  </ul>
                </div>

                {/* AI Tutor Interface Screenshot */}
                <motion.div 
                  className="bg-[#372270] rounded-lg overflow-hidden shadow-lg border border-gray-100 mb-4 md:mb-6 cursor-pointer group mt-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  onDoubleClick={() => openImagePopup(imgDesignSolution1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  role="button"
                  tabIndex={0}
                  aria-label="AI-Tutor interface showing real-time adaptive guidance"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openImagePopup(imgDesignSolution1);
                    }
                  }}
                >
                  <div className="relative w-full">
                    <div className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/10] xl:aspect-[16/9] w-full bg-[#372270] flex items-center justify-center overflow-hidden">
                      <ImageWithFallback
                        src={imgDesignSolution1}
                        alt="Openxp interface placeholder"
                        className="w-full h-full object-contain"
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
                  
                  {/* Caption */}
                  <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                    <p className="text-xs md:text-sm text-gray-600 italic text-center">
                      Screenshot: Openxp interface placeholder - to be updated.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Process 2 — Study Organization & Tracking
                </h3>
                
                <p className="mb-4">
                  Built an intuitive system for organizing study materials and tracking progress. Students can easily manage their exam preparation, see their progress, and stay organized throughout their study journey.
                </p>

                <div>
                  <p className="mb-2 mt-4 font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif]">Core Features</p>
                  <ul className="space-y-1 pl-6 md:pl-8">
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Study material organization
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Progress tracking and analytics
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Exam preparation timeline management
                    </li>
                  </ul>
                </div>

                {/* Screenshots */}
                <div className="flex flex-col gap-4 md:gap-6 mt-4">
                  <motion.div 
                    className="bg-[#372270] rounded-lg overflow-hidden shadow-lg border border-gray-100 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    onDoubleClick={() => openImagePopup(imgDesignSolution2)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    role="button"
                    tabIndex={0}
                    aria-label="Quiz Interaction UI showing immediate XP feedback on correct answers"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openImagePopup(imgDesignSolution2);
                      }
                    }}
                  >
                    <div className="relative w-full">
                      <div className="aspect-[4/3] w-full bg-[#372270]">
                        <div
                          className="absolute inset-0 bg-center bg-contain bg-no-repeat group-hover:bg-[length:102%] transition-all duration-300 ease-out"
                          style={{ backgroundImage: `url('${imgDesignSolution2}')` }}
                        />
                      </div>
                      
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
                    <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                      <p className="text-xs md:text-sm text-gray-600 italic text-center">
                        Openxp interface placeholder - to be updated
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-[#372270] rounded-lg overflow-hidden shadow-lg border border-gray-100 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    onDoubleClick={() => openImagePopup(imgDesignSolution3)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    role="button"
                    tabIndex={0}
                    aria-label="Lesson Completion UI showing visual streaks, accuracy, and celebration moments"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openImagePopup(imgDesignSolution3);
                      }
                    }}
                  >
                    <div className="relative w-full">
                      <div className="aspect-[4/3] w-full bg-[#372270]">
                        <div
                          className="absolute inset-0 bg-center bg-contain bg-no-repeat group-hover:bg-[length:102%] transition-all duration-300 ease-out"
                          style={{ backgroundImage: `url('${imgDesignSolution3}')` }}
                        />
                      </div>
                      
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
                    <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                      <p className="text-xs md:text-sm text-gray-600 italic text-center">
                        Openxp interface placeholder - to be updated
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Process 3 — User Interface & Experience
                </h3>
                
                <p className="mb-4">
                  Designed an easy-to-use interface that makes exam preparation feel manageable and organized. The platform provides clear navigation, intuitive workflows, and a supportive user experience that helps students focus on their studies.
                </p>

                <div>
                  <p className="mb-2 mt-4 font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif]">Core Features</p>
                  <ul className="space-y-1 pl-6 md:pl-8">
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Intuitive navigation and workflows
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Clean, organized interface design
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Responsive design for multiple devices
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Accessible and user-friendly interactions
                    </li>
                  </ul>
                </div>

                {/* Screenshots */}
                <div className="flex flex-col gap-4 md:gap-6 mt-4">
                  <motion.div 
                    className="bg-[#372270] rounded-lg overflow-hidden shadow-lg border border-gray-100 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    onDoubleClick={() => openImagePopup(imgDesignSolution4)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    role="button"
                    tabIndex={0}
                    aria-label="Course Setup UI for managing modules, assignments, and quizzes"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openImagePopup(imgDesignSolution4);
                      }
                    }}
                  >
                    <div className="relative w-full">
                      <div className="aspect-[4/3] w-full bg-[#372270]">
                        <div
                          className="absolute inset-0 bg-center bg-contain bg-no-repeat group-hover:bg-[length:102%] transition-all duration-300 ease-out"
                          style={{ backgroundImage: `url('${imgDesignSolution4}')` }}
                        />
                      </div>
                      
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
                    <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                      <p className="text-xs md:text-sm text-gray-600 italic text-center">
                        Openxp interface placeholder - to be updated
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-[#372270] rounded-lg overflow-hidden shadow-lg border border-gray-100 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    onDoubleClick={() => openImagePopup(imgDesignSolution5)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    role="button"
                    tabIndex={0}
                    aria-label="Analytics Dashboard UI showing student performance and progress summaries"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openImagePopup(imgDesignSolution5);
                      }
                    }}
                  >
                    <div className="relative w-full">
                      <div className="aspect-[4/3] w-full bg-[#372270]">
                        <div
                          className="absolute inset-0 bg-center bg-contain bg-no-repeat group-hover:bg-[length:102%] transition-all duration-300 ease-out"
                          style={{ backgroundImage: `url('${imgDesignSolution5}')` }}
                        />
                      </div>
                      
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
                    <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                      <p className="text-xs md:text-sm text-gray-600 italic text-center">
                        Openxp interface placeholder - to be updated
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Process 4 — Version Iteration & Development
                </h3>
                
                <p className="mb-4">
                  Led the development of two versions of Openxp, applying iterative design principles and user feedback to improve the platform. Each version built upon previous learnings to create a more refined and effective exam preparation experience.
                </p>

                <div>
                  <p className="mb-2 mt-4 font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif]">Core Features</p>
                  <ul className="space-y-1 pl-6 md:pl-8">
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Iterative design improvements
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      User feedback integration
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Enhanced features and functionality
                    </li>
                    <li className="relative">
                      <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                      Improved user experience across versions
                    </li>
                  </ul>
                </div>

                {/* Screenshots */}
                <div className="flex flex-col gap-4 md:gap-6 mt-4">
                  <motion.div 
                    className="bg-[#372270] rounded-lg overflow-hidden shadow-lg border border-gray-100 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    onDoubleClick={() => openImagePopup(imgDesignSolution6)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    role="button"
                    tabIndex={0}
                    aria-label="Institution Dashboard UI showing overview of enrolled students, lecturers, and programs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openImagePopup(imgDesignSolution6);
                      }
                    }}
                  >
                    <div className="relative w-full">
                      <div className="aspect-[4/3] w-full bg-[#372270]">
                        <div
                          className="absolute inset-0 bg-center bg-contain bg-no-repeat group-hover:bg-[length:102%] transition-all duration-300 ease-out"
                          style={{ backgroundImage: `url('${imgDesignSolution6}')` }}
                        />
                      </div>
                      
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
                    <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                      <p className="text-xs md:text-sm text-gray-600 italic text-center">
                        Openxp interface placeholder - to be updated
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-[#372270] rounded-lg overflow-hidden shadow-lg border border-gray-100 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    onDoubleClick={() => openImagePopup(imgDesignSolution7)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    role="button"
                    tabIndex={0}
                    aria-label="Programs Management UI for faculties and departments management with course-level control"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openImagePopup(imgDesignSolution7);
                      }
                    }}
                  >
                    <div className="relative w-full">
                      <div className="aspect-[4/3] w-full bg-[#372270]">
                        <div
                          className="absolute inset-0 bg-center bg-contain bg-no-repeat group-hover:bg-[length:102%] transition-all duration-300 ease-out"
                          style={{ backgroundImage: `url('${imgDesignSolution7}')` }}
                        />
                      </div>
                      
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
                    <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                      <p className="text-xs md:text-sm text-gray-600 italic text-center">
                        Openxp interface placeholder - to be updated
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="outcome" className="scroll-mt-8">
            <motion.h2 
              className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-xl md:text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[42px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.36px] 2xl:tracking-[-0.42px] mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Outcome & Impact
            </motion.h2>
            <motion.div 
              className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] text-base md:text-lg lg:text-xl xl:text-[24px] 2xl:text-[28px] text-black tracking-[-0.01em] lg:tracking-[-0.24px] 2xl:tracking-[-0.28px] leading-relaxed space-y-4 md:space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Project Outcomes
                </h3>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Two versions developed</strong> with iterative improvements based on user feedback
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Improved exam preparation experience</strong> for students preparing for career-defining tests
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>AI-powered tools</strong> that help students make better career and subject choices
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>User-friendly interface</strong> that makes exam preparation more manageable
                  </li>
                </ul>
              </div>

              <p>
                The platform successfully demonstrated that thoughtful design and AI integration could transform exam preparation from a stressful experience into an organized, manageable journey. The two versions of Openxp provided valuable insights into iterative design and user-centered development.
              </p>

              <InsightCallout>
                <strong>Project Impact:</strong> Leading the design and development of two versions of Openxp provided valuable experience in iterative design and user-centered development. The platform addresses exam preparation challenges by providing students with AI-powered tools that make studying more effective and engaging.
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
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Iterative design:</strong> Developing two versions of Openxp provided valuable insights into how iterative design improves user experience and product effectiveness
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>AI tool integration:</strong> Successfully integrating AI tools that help students make better career and subject choices required careful consideration of user needs and interface design
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>User-centered design:</strong> Creating an easy-to-use interface for exam preparation required deep understanding of student needs and study workflows
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Version iteration:</strong> Leading the development of two versions taught me the importance of building on previous learnings and incorporating user feedback
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Design simplicity:</strong> Making exam preparation feel manageable and organized required careful attention to information architecture and user flows
                  </li>
                </ul>
              </div>

              {/* What We Learnt Image */}
              <motion.div 
                className="bg-[#372270] rounded-lg overflow-hidden shadow-lg border border-gray-100 mb-4 md:mb-6 cursor-pointer group mt-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                onDoubleClick={() => openImagePopup(imgReflectionImage)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                aria-label="Illustration about not being overwhelmed by AI tools"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                      openImagePopup(imgReflectionImage);
                  }
                }}
              >
                <div className="relative w-full">
                  <div className="w-full bg-[#372270] flex items-center justify-center overflow-hidden" style={{ minHeight: '400px' }}>
                    <ImageWithFallback
                      src={imgReflectionImage}
                      alt="Openxp reflection image placeholder"
                      className="w-full h-auto object-contain max-h-[600px]"
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
                
                {/* Caption */}
                <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                  <p className="text-xs md:text-sm text-gray-600 italic text-center">
                    Openxp reflection image placeholder - to be updated
                  </p>
                </div>
              </motion.div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  What I'd Do Differently
                </h3>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Earlier user testing:</strong> Conducting more user testing earlier in the design process would have identified usability issues sooner
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>More diverse exam types:</strong> Testing with students preparing for different types of exams would have provided broader insights
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Enhanced AI features:</strong> Gradually introducing more advanced AI features might have improved user adoption and understanding
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Future Opportunities
                </h3>
                <ul className="space-y-1 pl-6 md:pl-8">
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Expanded exam coverage:</strong> Support more exam types and certification programs
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Enhanced AI features:</strong> Develop more advanced AI tools for personalized study recommendations
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Mobile optimization:</strong> Further optimize the mobile experience for on-the-go studying
                  </li>
                  <li className="relative">
                    <span className="absolute -left-6 md:-left-8 text-[#372270]">•</span>
                    <strong>Community features:</strong> Add collaborative study features and peer support options
                  </li>
                </ul>
              </div>

              <p>
                Openxp demonstrated that thoughtful design and AI integration can transform exam preparation from a stressful experience into an organized, manageable journey. The two versions of the platform provided valuable insights into iterative design and user-centered development, showing how continuous improvement leads to better user experiences.
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
                  The Value of Iterative Design
                </h3>
                <p>
                  Developing two versions of Openxp demonstrated the power of iterative design. Each version built upon previous learnings, incorporating user feedback and design improvements to create a more refined and effective exam preparation experience.
                </p>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  AI Tools as Study Assistants
                </h3>
                <p>
                  The most successful AI features were those that helped students make better choices about their careers and subjects without overwhelming them. AI tools should enhance the study experience, providing guidance and organization rather than replacing the student's own learning process.
                </p>
              </div>

              <div>
                <h3 className="font-['IBM_Plex_Sans_Condensed:SemiBold',_sans-serif] text-lg md:text-xl lg:text-2xl xl:text-[28px] 2xl:text-[32px] text-[#7c736a] tracking-[-0.01em] lg:tracking-[-0.28px] 2xl:tracking-[-0.32px] mb-2 md:mb-3">
                  Simplicity in Exam Preparation
                </h3>
                <p>
                  Effective exam prep software requires careful balance between functionality and simplicity. The most impactful design elements were those that made complex exam preparation feel manageable and organized, helping students focus on their studies rather than navigating a complicated interface.
                </p>
              </div>

              <InsightCallout>
                <strong>Design Success Factor:</strong> Leading the development of two versions of Openxp validated our approach of solving real problems with thoughtful design. The platform demonstrates that great exam prep software isn't about adding features—it's about understanding student needs and creating solutions that make exam preparation feel manageable and organized.
              </InsightCallout>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Full-Screen Image Popup Modal (Same as TreatmentPath) */}
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
            aria-label="Openxp Platform Interface - Full size view"
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

export default function OpenxpCaseStudy({ onClose }: OpenxpCaseStudyProps) {
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
      data-name="Openxp Case Study"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      role="main"
      aria-label="Openxp case study content"
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
