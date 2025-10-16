# Contributing Guide

Thank you for your interest in contributing to this portfolio project!

## Development Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd portfolio
npm install  # or yarn/bun install
```

### 2. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` with your values.

### 3. Start Development

```bash
npm run dev
```

## Project Architecture

### Component Structure

```
components/
├── ui/                    # Shadcn UI components (DO NOT MODIFY)
├── figma/                 # Protected Figma components
│   └── ImageWithFallback.tsx
├── ErrorBoundary.tsx      # Error handling
├── LazyImage.tsx          # Optimized images
├── TreatmentPathCaseStudy.tsx
└── UniversityxCaseStudy.tsx
```

### Protected Files

These files should **NOT** be modified:
- `/components/figma/ImageWithFallback.tsx`
- All files in `/components/ui/`

### Design System

The design system lives in `/styles/design-system.css`. All changes to colors, spacing, typography, etc. should be made there.

## Code Style

### TypeScript

- Use explicit types
- Avoid `any`
- Use interfaces for component props
- Document complex logic

Example:
```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  backgroundColor: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  backgroundColor,
  delay = 0 
}) => {
  // Implementation
};
```

### React Best Practices

1. **Use React.memo for expensive components**
```typescript
const ExpensiveComponent = React.memo(({ data }) => {
  // Heavy rendering logic
});
```

2. **Optimize re-renders**
```typescript
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

3. **Use proper keys for lists**
```typescript
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

### Styling Guidelines

1. **Always use design tokens**
```css
/* ❌ Bad */
.element {
  color: #ac83f3;
  padding: 24px;
}

/* ✅ Good */
.element {
  color: var(--brand-primary);
  padding: var(--spacing-6);
}
```

2. **Never use inline font styles**
```tsx
// ❌ Bad - overrides typography system
<h1 className="text-4xl font-bold">Title</h1>

// ✅ Good - uses design system
<h1>Title</h1>
```

3. **Mobile-first responsive design**
```css
.element {
  width: 100%; /* Mobile */
}

@media (min-width: 768px) {
  .element {
    width: 50%; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .element {
    width: 33.333%; /* Desktop */
  }
}
```

## Animation Guidelines

### Use Motion (Framer Motion)

```typescript
import { motion } from 'motion/react'

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  Content
</motion.div>

// Hover animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Click me
</motion.button>

// Scroll-based animation
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Scroll to reveal
</motion.div>
```

### Performance Considerations

1. **Use `React.memo` for animated components**
2. **Limit the number of animated elements**
3. **Use `will-change` sparingly**
4. **Test on mobile devices**

## Accessibility Requirements

### 1. Keyboard Navigation

All interactive elements must be keyboard accessible:

```tsx
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  tabIndex={0}
>
  Action
</button>
```

### 2. ARIA Labels

```tsx
<button 
  aria-label="Close modal"
  aria-pressed={isActive}
>
  <CloseIcon />
</button>

<section 
  role="region" 
  aria-label="Project showcase"
>
  Content
</section>
```

### 3. Focus Indicators

Never remove focus outlines without replacement:

```css
/* ❌ Bad */
button:focus {
  outline: none;
}

/* ✅ Good */
button:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
```

### 4. Color Contrast

Maintain WCAG AA compliance:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

### 5. Reduced Motion

Always respect user preferences:

```tsx
// Automatically handled by design system
// But you can also check manually:
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<motion.div
  animate={prefersReducedMotion ? {} : { x: 100 }}
>
```

## Performance Optimization

### 1. Image Optimization

```tsx
// Use ImageWithFallback for external images
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback
  src={imageUrl}
  alt="Description"
  loading="lazy"
/>

// Use direct imports for static images
import heroImage from "figma:asset/...";
<img src={heroImage} alt="Hero" />
```

### 2. Code Splitting

```tsx
// Lazy load heavy components
const CaseStudy = React.lazy(() => 
  import('./components/TreatmentPathCaseStudy')
);

<Suspense fallback={<LoadingState />}>
  <CaseStudy />
</Suspense>
```

### 3. Memoization

```tsx
// Memo expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memo callbacks
const handleClick = useCallback(() => {
  doSomething();
}, []);

// Memo components
const MemoizedComponent = React.memo(Component);
```

## Testing

### Manual Testing Checklist

Before submitting changes:

- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Test with animations disabled
- [ ] Test in different browsers
- [ ] Check Lighthouse score (aim for 90+)

### Browser Testing

Test in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Git Workflow

### Commit Messages

Use conventional commits:

```
feat: add new project showcase
fix: resolve scroll indicator positioning
docs: update design system documentation
style: improve button hover states
perf: optimize image loading
refactor: simplify animation logic
test: add accessibility tests
```

### Branch Naming

```
feature/new-project-showcase
fix/scroll-indicator-bug
docs/design-system-update
perf/image-optimization
```

## Adding New Features

### Adding a New Project

1. Import project image:
```typescript
import imgNewProject from "figma:asset/...";
```

2. Define project color in design-system.css:
```css
--project-newproject: #hexcolor;
```

3. Create project component:
```tsx
function NewProject() {
  return (
    <AnimatedSection data-section="newproject">
      <ProjectSlide backgroundColor="var(--project-newproject)">
        <motion.div>
          <img src={imgNewProject} alt="New Project" />
        </motion.div>
      </ProjectSlide>
      {/* Project details */}
    </AnimatedSection>
  );
}
```

4. Add to scroll indicator:
```typescript
const sections = [
  // ...existing sections
  { id: "newproject", label: "New Project" }
];
```

### Adding a New Case Study

1. Create component file:
```typescript
// /components/NewProjectCaseStudy.tsx
export default function NewProjectCaseStudy({ 
  onClose 
}: { 
  onClose: () => void 
}) {
  // Case study content
}
```

2. Import and add to routing:
```typescript
import NewProjectCaseStudy from './components/NewProjectCaseStudy';

// In CaseStudyPage component
{caseStudy === 'newproject' && (
  <NewProjectCaseStudy onClose={onBackHome} />
)}
```

## Design System Changes

When modifying design tokens:

1. Update `/styles/design-system.css`
2. Document changes in `/DESIGN_SYSTEM.md`
3. Test affected components
4. Ensure accessibility compliance
5. Verify responsive behavior

## Questions?

For questions or clarifications:
- Email: petkovrichard8@gmail.com
- Review existing code for patterns
- Check documentation files

## Code Review Checklist

Before requesting review:

- [ ] Code follows style guidelines
- [ ] Design tokens used consistently
- [ ] Accessibility requirements met
- [ ] Performance optimized
- [ ] Responsive on all breakpoints
- [ ] No console errors or warnings
- [ ] Documentation updated
- [ ] Tested manually

Thank you for contributing! 🎉
