# Quick Start Guide

Get your portfolio running locally in under 5 minutes!

## Prerequisites

Make sure you have one of these installed:
- **Node.js 18+** and npm
- **Yarn**
- **Bun** (recommended for speed)

## Installation Steps

### 1. Install Dependencies

Choose your package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using bun (fastest)
bun install
```

### 2. Start Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun dev
```

Your site will open at: **http://localhost:5173**

## Project Structure

```
portfolio/
├── App.tsx                 # Main app component
├── components/             # React components
│   ├── TreatmentPathCaseStudy.tsx
│   ├── UniversityxCaseStudy.tsx
│   └── ui/                # Shadcn UI components
├── styles/
│   ├── design-system.css  # All design tokens
│   └── globals.css        # Global styles
├── hooks/
│   └── useSound.ts        # Audio feedback
└── imports/               # Figma assets

```

## Design System

All design tokens are in `/styles/design-system.css`:

```css
/* Use design tokens like this */
.my-element {
  color: var(--brand-primary);        /* #ac83f3 */
  font-family: var(--font-heading-primary);
  padding: var(--spacing-6);          /* 24px */
  border-radius: var(--radius-xl);    /* 16px */
}
```

See full documentation in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## Key Features

### Sections
1. **Hero** - Animated introduction with name and role
2. **TreatmentPath** - Healthcare platform case study
3. **Universityx** - EdTech platform case study
4. **Openxp** - Exam prep software
5. **Customer Experience** - B2B solutions
6. **MolerHealth** - Healthcare dashboard
7. **Wikipedia** - Community profile redesign
8. **Interactive Showcase** - UI component gallery

### Navigation
- Desktop: Scroll indicator on left side
- Mobile: Natural scroll with progress
- Click project cards to view full case studies

## Customization

### Change Colors

Edit `/styles/design-system.css`:

```css
:root {
  --brand-primary: #YOUR_COLOR;
  --brand-dark: #YOUR_COLOR;
}
```

### Update Content

Main sections are in `App.tsx`. Search for:
- Hero text: "Chakalov Petkov Richard"
- Project descriptions: Each project has a description section
- Contact email: "petkovrichard8@gmail.com"

### Add Resume Download

Update the resume URL in `App.tsx`:

```typescript
function ResumeButton() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/path-to-your-resume.pdf'; // Update this
    link.download = 'Your_Name_Resume.pdf';  // Update this
    // ...
  };
}
```

## Build for Production

```bash
# Build
npm run build
# or
yarn build
# or
bun run build

# Preview production build
npm run preview
```

Output will be in the `/dist` folder.

## Common Issues

### Port already in use?
Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3000, // Change from 5173 to any port
}
```

### Images not loading?
Images are imported from Figma. Make sure all imports exist:
```typescript
import imgExample from "figma:asset/...";
```

### Fonts not loading?
Fonts are loaded from Google Fonts in `index.html`. Check your internet connection.

## Performance Tips

- **Lighthouse Score**: Aim for 90+ on Performance
- **Image Optimization**: Images are lazy-loaded
- **Code Splitting**: Case studies load separately
- **Animation**: Uses GPU acceleration

## Next Steps

1. **Customize Content**: Update text, images, and projects
2. **Update Resume**: Add your actual resume PDF
3. **Deploy**: Deploy to Vercel, Netlify, or your hosting
4. **SEO**: Update meta tags in `index.html`
5. **Analytics**: Add Google Analytics or similar

## Resources

- [Full README](./README.md)
- [Design System Documentation](./DESIGN_SYSTEM.md)
- [Motion Documentation](https://motion.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)

## Support

Questions? Contact: petkovrichard8@gmail.com

---

**Happy building! 🚀**
