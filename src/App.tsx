import React, { useState, useEffect } from 'react';
import TreatmentPathCaseStudy from './components/TreatmentPathCaseStudy';
import UniversityxCaseStudy from './components/UniversityxCaseStudy';
import OpenxpCaseStudy from './components/OpenxpCaseStudy';
import { PortfolioScrollIndicator } from './components/portfolio/PortfolioScrollIndicator';
import { HeroSection } from './components/hero/HeroSection';
import {
  TreatmentPathProject,
  UniversityxProject,
  OpenxpProject,
  MolerHealthProject,
  CustomerExperienceProject,
  WikipediaProject
} from './components/projects';
import { ShowcaseGallery } from './components/showcase/ShowcaseGallery';
import { SPACING } from './constants/spacing.js';

// Memoized Portfolio Page Component for better performance
const PortfolioPage = React.memo<{ onViewCaseStudy: (caseStudy: string) => void }>(({ onViewCaseStudy }) => {
  return (
    <div className="bg-[#f7f6f3] w-full min-h-screen relative">
      {/* Portfolio Scroll Indicator */}
      <PortfolioScrollIndicator />
      
      {/* Main content with consistent spacing */}
      <div className={`flex flex-col ${SPACING.gap.large}`}>
        <HeroSection />
        <TreatmentPathProject onViewCaseStudy={() => onViewCaseStudy('treatmentpath')} />
        <UniversityxProject onViewCaseStudy={() => onViewCaseStudy('universityx')} />
        <OpenxpProject onViewCaseStudy={() => onViewCaseStudy('openxp')} />
        <CustomerExperienceProject />
        <MolerHealthProject />
        <WikipediaProject />
        <ShowcaseGallery />
      </div>
    </div>
  );
});

// Memoized Case Study Page Component
const CaseStudyPage = React.memo<{ onBackHome: () => void; caseStudy: string }>(({ onBackHome, caseStudy }) => {
  return (
    <div className="w-full min-h-screen">
      {caseStudy === 'treatmentpath' && <TreatmentPathCaseStudy onClose={onBackHome} />}
      {caseStudy === 'universityx' && <UniversityxCaseStudy onClose={onBackHome} />}
      {caseStudy === 'openxp' && <OpenxpCaseStudy onClose={onBackHome} />}
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
          aria-label={`${activeCaseStudy === 'treatmentpath' ? 'TreatmentPath' : activeCaseStudy === 'universityx' ? 'Universityx' : 'Openxp'} case study`}
          aria-modal="true"
        >
          <CaseStudyPage onBackHome={navigateToPortfolio} caseStudy={activeCaseStudy} />
        </div>
      )}
    </div>
  );
}
