import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { useSound } from '../../hooks/useSound';
import svgPaths from "../../imports/svg-189wftbrja";
import imgChatGptImageJul122025014208Am1 from "figma:asset/3f8ca804325f91b64a84f45b771e2522e94460ec.png";
import imgChatGptImageJul122025011140Am2 from "figma:asset/4774270e396720874460c4f8aeecbc8d19672f4e.png";
import { AnimatedSection } from '../common/AnimatedSection';

// Hero Image Components
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
      className="hidden lg:block relative size-full min-w-0 md:min-w-[600px]"
    >
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
      className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium transition-colors w-full sm:w-auto bg-[#2c1810] text-white hover:bg-[#3a2115]"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => playHoverSound(1000, 120, 0.15)}
      onClick={handleClick}
      aria-label="Contact me - I'm available for work"
      type="button"
    >
      <div className="relative shrink-0 size-4 sm:size-5 mr-2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="work">
            <path
              d={svgPaths.p885b100}
              id="Vector"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d={svgPaths.p3d1e9800}
              id="Vector_2"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d={svgPaths.p7d937c0}
              id="Vector_3"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
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
      className="inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-medium transition-colors w-full sm:w-auto border border-[#2c1810] text-[#2c1810] bg-white hover:bg-[#f7eee6]"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => playHoverSound(900, 120, 0.15)}
      onClick={handleDownload}
      aria-label="Download my resume as PDF"
      type="button"
    >
      <div className="relative shrink-0 size-4 sm:size-5 mr-2">
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
      Download Resume
    </motion.button>
  );
}

// Main Hero Section Component
export function HeroSection() {
  return (
    <AnimatedSection
      delay={0.6}
      className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-12 lg:py-20 bg-[#f7f6f3]"
      data-section="hero"
      id="main-content"
      role="banner"
      aria-label="Hero section with designer introduction"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
        {/* Left: Text Content */}
        <div className="flex-1">
          {/* Label */}
          <div className="text-xs sm:text-sm font-medium text-neutral-700">
            Petkov.Chakalov
          </div>
          
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mt-2">
            Petkov Richard
          </h1>
          
          {/* Paragraph */}
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-neutral-700 leading-relaxed max-w-xl">
            With 3+ years in product design and UI development, I partner with teams to craft heartfelt solutions in education, health tech, customer experience, and business growth.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <AvailableForWorkButton />
            <DownloadResumeButton />
          </div>
        </div>
        
        {/* Right: Hero Image - Hidden on small screens */}
        <div className="hidden lg:block flex-1">
          <div className="w-[320px] xl:w-[380px] 2xl:w-[420px] mx-auto">
            <HeroImageCollage />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


