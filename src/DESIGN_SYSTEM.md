# Design System Documentation

Complete reference for the portfolio website design system. All tokens are defined in `/styles/design-system.css`.

## Table of Contents
- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Components](#components)
- [Animations](#animations)
- [Accessibility](#accessibility)

---

## Colors

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-primary` | #ac83f3 | Primary brand color, CTAs, highlights |
| `--brand-primary-hover` | #9c6fec | Hover state for primary elements |
| `--brand-primary-light` | rgba(172, 131, 243, 0.1) | Backgrounds, subtle highlights |
| `--brand-primary-shadow` | rgba(172, 131, 243, 0.3) | Glows and shadows |
| `--brand-dark` | #2c1810 | Dark UI elements, buttons |
| `--brand-dark-hover` | #4a2c1a | Hover state for dark elements |

### Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | #f7f6f3 | Main page background |
| `--bg-secondary` | #f0f0ed | Secondary sections |
| `--bg-white` | #ffffff | Cards, modals, overlays |
| `--bg-dark` | #140202 | Dark mode backgrounds |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | #150c0c | Main headings, primary text |
| `--text-secondary` | #7c736a | Body text, descriptions |
| `--text-muted` | #b8b3ad | Tertiary text, metadata |
| `--text-white` | #ffffff | Text on dark backgrounds |

### Project Colors

Each project has a unique brand color:

| Project | Token | Value |
|---------|-------|-------|
| TreatmentPath | `--project-treatmentpath` | #ac83f3 (Purple) |
| Universityx | `--project-universityx` | #9d2d9d (Magenta) |
| Openxp | `--project-openxp` | #372270 (Deep Purple) |
| Customer Experience | `--project-customer-exp` | #0d6efd (Blue) |
| MolerHealth | `--project-molerhealth` | #10b981 (Green) |
| Wikipedia | `--project-wikipedia` | #0645AD (Wikipedia Blue) |

### Usage Example

```css
/* Using design tokens */
.button-primary {
  background-color: var(--brand-primary);
  color: var(--text-white);
}

.button-primary:hover {
  background-color: var(--brand-primary-hover);
  box-shadow: var(--shadow-primary);
}

.project-card {
  background-color: var(--project-treatmentpath);
}
```

```tsx
// In React components
<div style={{ backgroundColor: 'var(--brand-primary)' }}>
  <h2 style={{ color: 'var(--text-white)' }}>Title</h2>
</div>
```

---

## Typography

### Font Families

| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading-primary` | 'Arial', sans-serif | Main headings, hero text |
| `--font-heading-secondary` | 'Lora', serif | Project titles, secondary headings |
| `--font-body` | 'IBM Plex Sans Condensed' | Body text, descriptions |
| `--font-mono` | 'IBM Plex Mono' | Code, technical text |
| `--font-ui` | 'Inter', sans-serif | UI elements, buttons |
| `--font-display` | 'FreeSans', sans-serif | Decorative text |

### Font Sizes (Responsive)

| Token | Mobile | Tablet | Desktop | XL Desktop |
|-------|--------|--------|---------|------------|
| `--text-xs` | 12px | 12px | 12px | 12px |
| `--text-sm` | 14px | 14px | 14px | 14px |
| `--text-base` | 16px | 16px | 16px | 16px |
| `--text-lg` | 18px | 18px | 18px | 18px |
| `--text-xl` | 20px | 20px | 20px | 20px |
| `--text-2xl` | 24px | 28px | 28px | 28px |
| `--text-3xl` | 30px | 32px | 36px | 36px |
| `--text-4xl` | 36px | 40px | 48px | 56px |
| `--text-5xl` | 48px | 56px | 64px | 80px |
| `--text-6xl` | 60px | 64px | 72px | 96px |
| `--text-7xl` | 72px | 88px | 96px | 112px |
| `--text-8xl` | 96px | 96px | 112px | 128px |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-regular` | 400 | Body text |
| `--font-weight-medium` | 500 | Emphasis, labels |
| `--font-weight-semibold` | 600 | Subheadings |
| `--font-weight-bold` | 700 | Strong emphasis |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-none` | 0.85 | Hero titles, tight spacing |
| `--leading-tight` | 1.1 | Large headings |
| `--leading-snug` | 1.2 | Headings |
| `--leading-normal` | 1.5 | Body text, paragraphs |
| `--leading-relaxed` | 1.6 | Long-form content |
| `--leading-loose` | 2 | Extra spacing |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-tighter` | -0.04em | Large headings |
| `--tracking-tight` | -0.02em | Headings, titles |
| `--tracking-normal` | -0.01em | Body text |
| `--tracking-wide` | 0.03em | Small caps, labels |
| `--tracking-wider` | 0.05em | Buttons, emphasis |

### Usage Example

```css
.hero-title {
  font-family: var(--font-heading-primary);
  font-size: var(--text-8xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-tighter);
  color: var(--text-primary);
}

.body-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-normal);
  color: var(--text-secondary);
}
```

---

## Spacing

### Scale

Based on a 4px (0.25rem) base unit:

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--spacing-0` | 0 | 0px | No spacing |
| `--spacing-1` | 0.25rem | 4px | Minimal gaps |
| `--spacing-2` | 0.5rem | 8px | Small gaps |
| `--spacing-3` | 0.75rem | 12px | Compact spacing |
| `--spacing-4` | 1rem | 16px | Default spacing |
| `--spacing-5` | 1.25rem | 20px | Medium spacing |
| `--spacing-6` | 1.5rem | 24px | Large spacing |
| `--spacing-8` | 2rem | 32px | Section spacing |
| `--spacing-10` | 2.5rem | 40px | Large gaps |
| `--spacing-12` | 3rem | 48px | Section dividers |
| `--spacing-16` | 4rem | 64px | Major sections |
| `--spacing-20` | 5rem | 80px | Hero sections |
| `--spacing-24` | 6rem | 96px | Page sections |
| `--spacing-32` | 8rem | 128px | Large sections |

### Container Padding

| Breakpoint | Token | Value |
|------------|-------|-------|
| Mobile | `--container-padding-mobile` | 1.5rem (24px) |
| Tablet | `--container-padding-tablet` | 4rem (64px) |
| Desktop | `--container-padding-desktop` | 6.125rem (98px) |

### Usage Example

```css
.section {
  padding: var(--spacing-20) var(--container-padding-desktop);
  gap: var(--spacing-8);
}

.card {
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-4);
}
```

---

## Components

### Buttons

#### Primary Button
```css
.button-primary {
  background-color: var(--brand-dark);
  color: var(--text-white);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--radius-button);
  font-family: var(--font-ui);
  font-weight: var(--font-weight-semibold);
  transition: var(--transition-all);
}

.button-primary:hover {
  background-color: var(--brand-dark-hover);
  box-shadow: var(--shadow-button);
  transform: scale(var(--hover-scale-md));
}
```

#### Secondary Button
```css
.button-secondary {
  background-color: var(--bg-white);
  color: var(--brand-dark);
  border: 2px solid var(--brand-dark);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--radius-button);
}

.button-secondary:hover {
  background-color: var(--gray-100);
  box-shadow: var(--shadow-button-secondary);
  transform: scale(var(--hover-scale-md));
}
```

### Cards

```css
.project-card {
  background-color: var(--bg-white);
  padding: var(--card-padding-lg);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}

.project-slide {
  height: var(--slide-height-desktop);
  border-radius: var(--radius-3xl);
  overflow: hidden;
}
```

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 0.25rem (4px) | Small elements |
| `--radius-md` | 0.5rem (8px) | Inputs, tags |
| `--radius-lg` | 0.75rem (12px) | Cards, modals |
| `--radius-xl` | 1rem (16px) | Large cards |
| `--radius-2xl` | 1.125rem (18px) | Featured cards |
| `--radius-3xl` | 1.625rem (26px) | Project slides |
| `--radius-full` | 9999px | Buttons, pills |

---

## Animations

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | 0.1s | Quick feedback |
| `--duration-fast` | 0.2s | Fast transitions |
| `--duration-normal` | 0.3s | Default transitions |
| `--duration-slow` | 0.5s | Slow transitions |
| `--duration-slower` | 0.8s | Content animations |
| `--duration-slowest` | 1s | Hero animations |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-linear` | linear | Constant speed |
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | Accelerating |
| `--ease-out` | cubic-bezier(0, 0, 0.2, 1) | Decelerating |
| `--ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Smooth |
| `--ease-bounce` | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Bouncy |

### Spring Animation

```tsx
// Using Motion (Framer Motion)
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{
    type: "spring",
    stiffness: 300, // var(--spring-stiffness)
    damping: 25     // var(--spring-damping)
  }}
>
  Content
</motion.div>
```

### Common Animations

#### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
```

#### Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
```

#### Scale
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
```

---

## Shadows

### Elevation System

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle depth |
| `--shadow-md` | 0 2px 8px rgba(0,0,0,0.1) | Cards |
| `--shadow-lg` | 0 4px 16px rgba(0,0,0,0.15) | Elevated cards |
| `--shadow-xl` | 0 8px 32px rgba(0,0,0,0.2) | Modals |
| `--shadow-2xl` | Complex gradient | Hero elements |

### Component Shadows

```css
/* Card Shadow */
--shadow-card: -1px 3.406px 10.4px 0px rgba(0, 0, 0, 0.2);

/* Button Glow */
--shadow-button: 
  0 0 30px rgba(76, 44, 26, 0.4), 
  0 0 60px rgba(76, 44, 26, 0.2), 
  inset 0 2px 4px rgba(255, 255, 255, 0.1);

/* Primary Brand Shadow */
--shadow-primary: 0 0 30px rgba(172, 131, 243, 0.4);
```

---

## Accessibility

### Focus States

```css
*:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

### Touch Targets

Minimum size: `--touch-target-min: 44px`

```css
.button, .link {
  min-height: var(--touch-target-min);
  min-width: var(--touch-target-min);
}
```

### High Contrast Mode

Automatically adjusts for users with `prefers-contrast: high`:
- Increased border widths
- Higher contrast colors
- Removes transparency

### Reduced Motion

Respects `prefers-reduced-motion: reduce`:
- Animation durations set to 0.01ms
- Transforms disabled
- Scroll behavior set to auto

---

## Z-Index System

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | 1 | Base elements |
| `--z-dropdown` | 10 | Dropdowns |
| `--z-sticky` | 20 | Sticky headers |
| `--z-fixed` | 30 | Fixed elements |
| `--z-modal-backdrop` | 40 | Modal backdrops |
| `--z-modal` | 50 | Modals |
| `--z-popover` | 60 | Popovers |
| `--z-tooltip` | 70 | Tooltips |
| `--z-notification` | 80 | Toasts |
| `--z-max` | 100 | Top layer |

---

## Usage Best Practices

### 1. Always Use Design Tokens

❌ **Don't:**
```css
.element {
  color: #ac83f3;
  padding: 24px;
  font-size: 48px;
}
```

✅ **Do:**
```css
.element {
  color: var(--brand-primary);
  padding: var(--spacing-6);
  font-size: var(--text-5xl);
}
```

### 2. Maintain Consistency

- Use the spacing scale for all gaps and padding
- Use defined colors only
- Follow the typography scale
- Use standard animation durations

### 3. Responsive Design

- Mobile-first approach
- Use responsive design tokens
- Test at all breakpoints

### 4. Performance

- Use GPU acceleration for animations
- Apply `will-change` for animated elements
- Optimize heavy animations on mobile

---

## Questions or Updates?

For questions about the design system or to propose changes:
- Email: petkovrichard8@gmail.com
- File location: `/styles/design-system.css`

**Last Updated**: January 2025
