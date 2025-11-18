/**
 * Consistent spacing system for the portfolio
 * Using a simplified scale: base spacing * multiplier
 */

export const SPACING = {
  // Container padding (horizontal)
  container: {
    mobile: 'px-4',
    desktop: 'md:px-8 lg:px-12',
    combined: 'px-4 md:px-8 lg:px-12'
  },
  
  // Section spacing (vertical)
  section: {
    small: 'py-20 md:py-16',
    medium: 'py-16 md:py-24',
    large: 'py-20 md:py-32'
  },
  
  // Gap between elements
  gap: {
    small: 'gap-8 md:gap-12',
    medium: 'gap-12 md:gap-16',
    large: 'gap-12 md:gap-16'
  },
  
  // Max widths
  maxWidth: {
    content: 'max-w-5xl',
    narrow: 'max-w-3xl'
  }
} as const;

