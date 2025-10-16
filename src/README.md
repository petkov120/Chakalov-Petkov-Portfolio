# Portfolio Website - Petkov Chakalov Richard

A pixel-perfect portfolio website built with React, TypeScript, Tailwind CSS v4, and Motion (Framer Motion). Features smooth scroll animations, interactive showcases, and comprehensive case studies.

## 🚀 Features

- **Pixel-Perfect Design** - Imported from Figma with preserved design fidelity
- **Smooth Animations** - Motion-powered fade-ins, slide-ins, and scroll effects
- **Interactive Showcases** - Dynamic UI components with hover states and interactions
- **Case Studies** - Detailed project presentations for TreatmentPath and Universityx
- **Sound Effects** - Subtle audio feedback using Web Audio API
- **Fully Accessible** - WCAG AA compliant with keyboard navigation
- **Responsive Design** - Mobile-first approach with breakpoints for all devices
- **Performance Optimized** - Lazy loading, memoization, and efficient rendering

## 📋 Prerequisites

- Node.js 18+ or Bun
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Local Development Setup

### 1. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using bun:
```bash
bun install
```

### 2. Start Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

Using bun:
```bash
bun dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### 3. Build for Production

Using npm:
```bash
npm run build
```

Using yarn:
```bash
yarn build
```

Using bun:
```bash
bun run build
```

### 4. Preview Production Build

Using npm:
```bash
npm run preview
```

Using yarn:
```bash
yarn preview
```

Using bun:
```bash
bun run preview
```

## 🎨 Design System

The design system is comprehensively documented in `/styles/design-system.css`. It includes:

### Color Palette
- **Brand Colors**: Primary purple (#ac83f3), Dark brown (#2c1810)
- **Background**: Cream (#f7f6f3), White (#ffffff)
- **Text**: Primary dark (#150c0c), Secondary gray (#7c736a)
- **Project Colors**: Unique colors for each project showcase

### Typography
- **Heading Primary**: Arial
- **Heading Secondary**: Lora
- **Body**: IBM Plex Sans Condensed
- **Monospace**: IBM Plex Mono
- **UI Elements**: Inter

### Spacing System
- Base unit: 4px (0.25rem)
- Scale: 1x, 2x, 3x, 4x, 5x, 6x, 8x, 10x, 12x, 16x, 20x, 24x, 32x

### Responsive Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Animation Tokens
- **Duration**: instant (0.1s), fast (0.2s), normal (0.3s), slow (0.5s)
- **Easing**: linear, ease-in, ease-out, ease-in-out, bounce
- **Spring**: stiffness 300, damping 25

## 📁 Project Structure

```
├── App.tsx                    # Main application component
├── components/
│   ├── ErrorBoundary.tsx      # Error handling
│   ├── LazyImage.tsx          # Optimized image loading
│   ├── LoadingState.tsx       # Loading indicators
│   ├── TreatmentPathCaseStudy.tsx
│   ├── UniversityxCaseStudy.tsx
│   ├── figma/                 # Figma-imported components
│   │   └── ImageWithFallback.tsx
│   └── ui/                    # Shadcn UI components
├── hooks/
│   └── useSound.ts            # Web Audio API hook
├── imports/                   # Figma imported assets & SVGs
├── styles/
│   ├── design-system.css      # Design tokens & system
│   └── globals.css            # Global styles
└── guidelines/
    └── Guidelines.md          # Development guidelines
```

## 🎯 Key Components

### Portfolio Navigation
- Sticky scroll indicator on desktop
- Section-based navigation with smooth scrolling
- Active section highlighting

### Hero Section
- Animated text introduction
- Floating app mockup images
- Call-to-action buttons (Available for Work, Download Resume)

### Project Showcases
- TreatmentPath (Healthcare)
- Universityx (EdTech)
- Openxp (EdTech)
- Customer Experience Solutions (B2B)
- MolerHealth (Healthcare)
- Wikipedia Community Profile

### Interactive Gallery
- Shopping app interface (fully interactive)
- Dashboard analytics
- UI component showcases
- Form elements
- Navigation systems

## 🔧 Configuration

### Tailwind CSS v4
The project uses Tailwind CSS v4 with custom configuration in `/styles/globals.css`. Design tokens are defined using CSS custom properties.

### TypeScript
TypeScript configuration is optimized for React development with strict type checking.

### Motion (Framer Motion)
Import using:
```typescript
import { motion } from 'motion/react'
```

## 🎵 Sound System

The application uses the Web Audio API for subtle interaction sounds:
- Hover sounds with varying frequencies (600-1000 Hz)
- Success sounds for actions
- Configurable volume levels (0.08-0.2)

## ♿ Accessibility

- **Keyboard Navigation**: Full support with visible focus indicators
- **Screen Readers**: ARIA labels and semantic HTML
- **Skip Links**: Jump to main content
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **High Contrast**: Supports `prefers-contrast: high`
- **Touch Targets**: Minimum 44px for mobile

## 🚀 Performance Optimizations

- **React.memo**: Memoized components to prevent unnecessary re-renders
- **Lazy Loading**: Images and heavy components
- **RequestAnimationFrame**: Optimized scroll handlers
- **Will-Change**: GPU acceleration for animations
- **Code Splitting**: Separate bundles for case studies

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
# Add any environment variables here
VITE_RESUME_URL=https://your-resume-url.com/resume.pdf
```

## 🤝 Contributing

This is a personal portfolio project. If you find any issues or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

© 2025 Petkov Chakalov Richard. All rights reserved.

## 📧 Contact

- Email: petkovrichard8@gmail.com
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- Design imported from Figma
- UI components from Shadcn/UI
- Icons from Lucide React
- Animations powered by Motion (Framer Motion)
- Built with Vite + React + TypeScript

---

**Last Updated**: January 2025
**Version**: 1.0.0
