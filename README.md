# Scrollytelling Portfolio 🎬

A premium, high-performance personal portfolio website featuring scroll-linked canvas animations, parallax overlays, and a modern glassmorphism design system.

## Features

✨ **Scroll-Linked Canvas Animation**
- 105-frame image sequence rendered via HTML5 Canvas
- Seamless scroll performance with Framer Motion
- Automatic image preloading to prevent flickering

🎨 **Parallax Overlay System**
- Multi-section text animations
- Fade in/out and positional parallax effects
- Responsive typography scaling

🏆 **Projects Showcase**
- Glassmorphism card design with backdrop blur
- Hover animations and gradient overlays
- Tag system and CTA buttons

📱 **Responsive Design**
- Mobile-first approach
- Touch-friendly interactions
- Optimized for all screen sizes

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animation library
- **Canvas API** - High-performance rendering

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── public/
│   └── sequence/          # 105 PNG frame images
├── src/
│   ├── app/
│   │   ├── page.tsx       # Home page (entry point)
│   │   ├── layout.tsx     # Root layout
│   │   └── globals.css    # Global styles & reset
│   ├── components/
│   │   ├── ScrollyCanvas.tsx   # Canvas renderer with scroll linking
│   │   ├── Overlay.tsx         # Parallax text sections
│   │   └── Projects.tsx        # Projects grid showcase
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Key Components

### ScrollyCanvas.tsx
The core scrollytelling component that:
- Maps scroll progress to frame index (0-104)
- Preloads all images on mount
- Renders current frame to canvas
- Handles responsive canvas sizing

```typescript
// Scroll progress to frame mapping
const frameIndex = useTransform(
  scrollYProgress,
  [0, 1],
  [0, TOTAL_FRAMES - 1]
);
```

### Overlay.tsx
Provides three animated text sections:
1. **Hero** (0% scroll) - "Creative Developer"
2. **Middle** (30% scroll) - "I build digital experiences"
3. **End** (60% scroll) - "Bridging design & engineering"

Each section has:
- Fade in/out transitions
- Parallax movement (X or Y axis)
- Gradient text accents

### Projects.tsx
Displays 4 featured projects in a 2-column responsive grid with:
- Glassmorphism design (backdrop-blur, semi-transparent borders)
- Hover state animations
- Tag badges
- CTA links

## Color Palette

- **Background**: `#121212` (Dark base)
- **Accents**: Blue (`#667eea`), Purple (`#764ba2`), Pink (`#f5576c`)
- **Glass**: `rgba(255, 255, 255, 0.05)` with `border-white/10`
- **Text**: White with gray hierarchy

## Performance Optimizations

1. **Image Preloading** - All frames loaded before scroll interaction
2. **Canvas Rendering** - Direct pixel manipulation vs DOM updates
3. **Lazy Component Loading** - Projects section uses InView detection
4. **Motion Optimization** - Framer Motion uses GPU acceleration
5. **CSS Containment** - Fixed overlays prevent layout thrashing

## Customization

### Change Frame Count
Edit `ScrollyCanvas.tsx`:
```typescript
const TOTAL_FRAMES = 105; // Your total frame count
```

### Customize Scroll Height
In `ScrollyCanvas.tsx`:
```typescript
<div ref={containerRef} className="relative h-[500vh]">
  // Change 500vh to desired scroll multiplier
```

### Modify Overlay Text
Edit section text in `Overlay.tsx`:
```typescript
<h1 className="text-8xl font-bold">Your Name Here</h1>
```

### Update Projects
Modify the `projects` array in `Projects.tsx` with your own work.

## Build & Deploy

### Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Responsive Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Tips for Best Results

1. **Optimize Images** - Use consistent aspect ratios for frame sequence
2. **Test on Mobile** - Verify scroll performance on real devices
3. **Customize Colors** - Update Tailwind theme in `tailwind.config.ts`
4. **Profile Performance** - Use Chrome DevTools to monitor frame rate
5. **Adjust Timing** - Tweak parallax offset values in `Overlay.tsx`

## License

MIT - Feel free to use this as a template for your own portfolio.

---

**Built with ❤️ using Next.js, Framer Motion & Canvas**
