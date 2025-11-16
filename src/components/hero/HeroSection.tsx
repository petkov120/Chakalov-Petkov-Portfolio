import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { useSound } from '../../hooks/useSound';
import { Briefcase, Download } from 'lucide-react';
import imgChatGptImageJul122025011140Am2 from "figma:asset/4774270e396720874460c4f8aeecbc8d19672f4e.png";
import { AnimatedSection } from '../common/AnimatedSection';

// Hero Image Components
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

// Hero Image Collage - Hidden on small screens
const HeroImageCollage = React.memo(() => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className="hidden lg:flex items-end justify-end w-full h-full"
    >
      <motion.div 
        className="flex items-center justify-end"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className="rotate-[7.014deg]">
          <Frame3 />
        </div>
      </motion.div>
    </motion.div>
  );
});
HeroImageCollage.displayName = 'HeroImageCollage';

// CTA Buttons
export function AvailableForWorkButton() {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleClick = () => {
    playSuccessSound();
    window.location.href = 'mailto:petkovrichard8@gmail.com?subject=Available for Work - Let\'s Connect';
  };

  return (
    <motion.button 
      layout={false}
      className="flex items-center justify-center gap-2 rounded-md h-11 px-4 py-2 text-sm font-medium leading-none transition-colors bg-[#2c1810] text-white hover:bg-[#3a2115] w-full sm:w-auto"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => playHoverSound(1000, 120, 0.15)}
      onClick={handleClick}
      aria-label="Contact me - I'm available for work"
      type="button"
    >
      <Briefcase className="h-4 w-4 shrink-0" aria-hidden="true" />
      Available for work
    </motion.button>
  );
}

export function DownloadResumeButton() {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleDownload = () => {
    playSuccessSound();
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Petkov_Richard_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.button 
      layout={false}
      className="flex items-center justify-center gap-2 rounded-md h-11 px-4 py-2 text-sm font-medium leading-none transition-colors border border-[#2c1810] text-[#2c1810] bg-white hover:bg-[#f7eee6] w-full sm:w-auto"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => playHoverSound(900, 120, 0.15)}
      onClick={handleDownload}
      aria-label="Download my resume as PDF"
      type="button"
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
      Download Resume
    </motion.button>
  );
}

// Main Hero Section Component
export function HeroSection() {
  return (
    <AnimatedSection
      delay={0.6}
      className="relative pt-20 pb-32 lg:pb-48 min-h-[750px] lg:min-h-[850px] mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 bg-[#f7f6f3]"
      data-section="hero"
      id="main-content"
      role="banner"
      aria-label="Hero section with designer introduction"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-lg space-y-6">
          {/* Label */}
          <div className="text-xs sm:text-sm font-medium text-neutral-700">
            Petkov.Chakalov
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Petkov Richard
          </h1>
          
          {/* Paragraph */}
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
            With 3+ years in product design and UI development, I partner with teams to craft heartfelt solutions in education, health tech, and business growth.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <AvailableForWorkButton />
            <DownloadResumeButton />
          </div>
        </div>
        
        {/* Right: Hero Image - Hidden on small screens */}
        <div className="flex-1 flex items-center justify-end min-h-[500px] lg:min-h-[600px]">
          <HeroImageCollage />
        </div>
      </div>
    </AnimatedSection>
  );
}


