# Customization Guide

This guide shows you how to personalize the portfolio to match your brand and content.

## 1. Hero Section & Personal Brand

### Update Your Name & Tagline
**File:** `src/components/Overlay.tsx`

```typescript
// Section 1: Hero
<h1 className="text-8xl font-bold mb-6">
  Your Name <br /> Your Title
</h1>
<p className="text-xl">Your tagline here</p>
```

### Customize Scroll Sections
```typescript
// Section 2 (30% scroll)
<h2>I specialize in <span>specific skills</span></h2>
<p>Your unique value proposition</p>

// Section 3 (60% scroll)
<h2>Building <span>amazing things</span> since XXXX</h2>
<p>Your experience summary</p>
```

## 2. Color & Theme Customization

### Update Global Colors
**File:** `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      dark: "#121212",        // Change background
      "dark-gray": "#1a1a1a", // Change accent surfaces
      "dark-lighter": "#2a2a2a", // Change interactive elements
    },
  },
}
```

### Modify Gradient Accents
In `src/components/Overlay.tsx` and `src/components/Projects.tsx`, update gradient colors:

```typescript
// Change from blue/purple
from-blue-400 to-purple-400

// To your brand colors
from-emerald-400 to-teal-400
```

## 3. Projects Customization

### Update Project Data
**File:** `src/components/Projects.tsx`

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Detailed description of what you built and the impact",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "linear-gradient(135deg, #your-color1 0%, #your-color2 100%)",
  },
  // ... add your projects
];
```

### Add Project Links
Update the "View Project" link:

```typescript
<motion.a
  href="https://your-project-url.com"
  target="_blank"
  rel="noopener noreferrer"
>
  View Project →
</motion.a>
```

### Customize Project Card Styling
Modify glass-morphism effect:

```typescript
// In Projects.tsx
className="backdrop-blur-xl bg-white/5 border border-white/10"
// Change blur amount: backdrop-blur-md, backdrop-blur-lg, backdrop-blur-xl
// Change opacity: bg-white/5, bg-white/10, bg-white/15
```

## 4. Typography & Fonts

### Change Font Family
**File:** `tailwind.config.ts`

```typescript
fontFamily: {
  sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto"],
}
```

Or with Google Fonts in `src/app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      {children}
    </html>
  );
}
```

### Adjust Typography Sizes
```typescript
// In components, modify Tailwind classes:
text-4xl → text-3xl or text-5xl
text-lg → text-base or text-xl
font-bold → font-semibold or font-extrabold
```

## 5. Animation & Performance Tuning

### Adjust Scroll Height
**File:** `src/components/ScrollyCanvas.tsx`

```typescript
// Change from 500vh to your preferred scroll multiplier
<div className="relative h-[500vh] w-full">
```

Options:
- `300vh` - Faster animation sequence
- `500vh` - Default (cinematic)
- `800vh` - Slower, more dramatic

### Modify Animation Durations
**File:** `src/components/Overlay.tsx`

```typescript
transition={{ duration: 0.8, delay: 0.2 }}
// Reduce duration for snappier animations
// Increase for slower, smoother transitions
```

### Customize Parallax Offsets
```typescript
// Change scroll ranges to adjust when text appears/disappears
const section2Opacity = useTransform(
  scrollYProgress, 
  [0.2, 0.4, 0.5], // Adjust these values
  [0, 1, 0]
);
```

## 6. Background & Layout

### Change Background Color
**File:** `src/app/globals.css`

```css
body {
  background-color: #121212; /* Change to your color */
}
```

**File:** `tailwind.config.ts` - also update the `dark` color token

### Adjust Canvas Container
**File:** `src/components/ScrollyCanvas.tsx`

```typescript
// Make canvas take full height or specific size
className="w-full h-full object-cover"
// object-fit options: cover, contain, fill, scale-down
```

## 7. CTA Button Customization

### Update "Get in Touch" Button
**File:** `src/components/Projects.tsx`

```typescript
<motion.button
  onClick={() => window.location.href = 'mailto:your-email@example.com'}
>
  Get in Touch
</motion.button>
```

Or connect to a form:
```typescript
<motion.a href="/contact" className="...">
  Let's Talk
</motion.a>
```

## 8. Mobile Responsiveness

### Adjust Mobile Typography
In component files, modify responsive classes:

```typescript
// Current: text-6xl md:text-7xl lg:text-8xl
// Change to: text-4xl md:text-6xl lg:text-8xl (smaller on mobile)
```

### Fine-tune Spacing for Mobile
```typescript
// Adjust padding/gaps
px-4 md:px-8 lg:px-16  // Mobile, tablet, desktop
py-12 md:py-24 lg:py-32
```

## 9. Add Social Links

Create a footer component or update the existing footer in `src/app/page.tsx`:

```typescript
<footer className="...">
  <div className="flex justify-center gap-6 mb-6">
    <a href="https://twitter.com/yourhandle" target="_blank">Twitter</a>
    <a href="https://github.com/yourhandle" target="_blank">GitHub</a>
    <a href="https://linkedin.com/in/yourprofile" target="_blank">LinkedIn</a>
  </div>
  <p>© 2024 Your Name. All rights reserved.</p>
</footer>
```

## 10. SEO & Metadata

### Update Page Metadata
**File:** `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "Your Name | Creative Developer",
  description: "Your professional tagline and what makes you unique",
  openGraph: {
    title: "Your Name | Creative Developer",
    description: "Your tagline",
    type: "website",
    locale: "en_US",
  },
};
```

### Update OG Image
1. Create a 1200x630px image
2. Place it in `public/og-image.png`
3. Update metadata:

```typescript
openGraph: {
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
    },
  ],
},
```

## 11. Performance Optimization

### Optimize Images
Consider converting PNG sequence to WebP for smaller file sizes:
```bash
# Using imagemagick or online converter
for img in sequence/frame_*.png; do
  convert "$img" "${img%.png}.webp"
done
```

Then update frame paths in `ScrollyCanvas.tsx`:
```typescript
img.src = `/sequence/frame_${paddedIndex}_delay-0.067s.webp`;
```

### Enable Image Lazy Loading
In `next.config.js`:
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 86400,
}
```

## 12. Dark Mode Alternative (Light Theme)

To create a light theme variant:

**File:** `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      dark: "#ffffff",        // White background
      "dark-gray": "#f5f5f5", // Light gray
      "dark-lighter": "#eeeeee",
    },
  },
}
```

Update text colors throughout components from `text-white` to `text-black`.

## 13. Deployment Checklist

Before deploying:

- [ ] Update all portfolio text with your info
- [ ] Replace project data with your work
- [ ] Test scroll performance on mobile
- [ ] Update social links
- [ ] Configure custom domain
- [ ] Add Google Analytics
- [ ] Test across browsers
- [ ] Optimize image sizes
- [ ] Review meta tags for SEO

## 14. Browser Compatibility

Current support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers, consider using `@supports` queries:

```css
@supports (backdrop-filter: blur(10px)) {
  .glass-effect {
    backdrop-filter: blur(10px);
  }
}
```

---

Need help? Refer to the main README.md or adjust individual component files in `src/components/`.
