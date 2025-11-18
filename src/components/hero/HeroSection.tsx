import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { useSound } from '../../hooks/useSound';
import { Download, Github } from 'lucide-react';
import imgChatGptImageJul122025011140Am2 from "figma:asset/4774270e396720874460c4f8aeecbc8d19672f4e.png";
import { AnimatedSection } from '../common/AnimatedSection';
import { SPACING } from '../../constants/spacing.js';

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
export function DownloadResumeButton() {
  const { playHoverSound, playSuccessSound } = useSound();

  const handleDownload = async () => {
    playSuccessSound();
    try {
      // Dynamically import the PDF generation function
      const { generateResumePDF } = await import('../resume/ResumePDF');
      await generateResumePDF(
        () => {
          // Download started
        },
        () => {
          // Download complete
          playSuccessSound();
        }
      );
    } catch (error) {
      console.error('Error generating resume PDF:', error);
      // Fallback: show error message
      alert('Error generating resume. Please try again.');
    }
  };

  return (
    <motion.button 
      layout={false}
      className="flex items-center justify-center gap-2.5 rounded-lg h-10 md:h-11 px-5 md:px-6 py-2.5 text-sm font-semibold leading-none transition-all duration-200 border-2 border-[#2c1810] text-[#2c1810] bg-white hover:bg-[#2c1810] hover:text-white hover:shadow-md active:scale-[0.98] w-auto"
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

export function GitHubLink() {
  const { playHoverSound } = useSound();

  return (
    <motion.a
      href="https://github.com/petkov120"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2.5 rounded-lg h-10 md:h-11 px-5 md:px-6 py-2.5 text-sm font-semibold leading-none bg-black text-white hover:bg-neutral-900 shadow-md shadow-black/20 transition-all duration-200 group"
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => playHoverSound(800, 100, 0.1)}
      aria-label="View my GitHub profile"
    >
      <Github className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
      <span className="tracking-tight">View GitHub</span>
    </motion.a>
  );
}

// Main Hero Section Component
export function HeroSection() {
  return (
    <AnimatedSection
      delay={0.6}
      className={`relative pt-16 md:pt-20 pb-12 md:pb-0 mx-auto ${SPACING.maxWidth.content} ${SPACING.container.combined} bg-[#f7f6f3]`}
      data-section="hero"
      id="main-content"
      role="banner"
      aria-label="Hero section with designer introduction"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-lg flex flex-col" style={{ gap: '16px' }}>
          {/* Label */}
          <div className="text-xs sm:text-sm font-medium text-neutral-700">
            Petkov.Chakalov
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Petkov Richard
          </h1>
          
          {/* Paragraph */}
          <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed">
            I design intelligent digital products at the intersection of design, AI, and front-end engineering.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row" style={{ gap: '16px' }}>
            <GitHubLink />
            <DownloadResumeButton />
          </div>
        </div>
        
        {/* Right: Hero Image - Hidden on small screens */}
        <div className="hidden lg:flex flex-1 items-center justify-end min-h-[400px] lg:min-h-[500px] relative" style={{ padding: '16px' }}>
          <HeroImageCollage />
        </div>
      </div>
    </AnimatedSection>
  );
}


