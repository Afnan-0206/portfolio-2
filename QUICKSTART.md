# Quick Start Guide

## 🚀 Get Up & Running in 5 Minutes

### 1. Prerequisites
- Node.js 18+ installed
- npm or yarn

### 2. Installation
```bash
cd portfolio\ 2
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📝 First Steps to Personalize

### Step 1: Update Your Name
Open `src/components/Overlay.tsx` and change:
```typescript
<h1>Your Name <br /> Your Title</h1>
```

### Step 2: Add Your Projects
Open `src/components/Projects.tsx` and update the `projects` array with your work.

### Step 3: Change Colors (Optional)
Edit `tailwind.config.ts` to update the color palette:
```typescript
colors: {
  dark: "#your-background-color",
}
```

### Step 4: Customize Projects Description
Update project titles, descriptions, and technology tags in `Projects.tsx`.

## 🎨 Key Files to Modify

| File | Purpose | What to Edit |
|------|---------|-------------|
| `Overlay.tsx` | Scrolling text overlays | Hero text, section content |
| `Projects.tsx` | Project showcase grid | Project data, colors, links |
| `globals.css` | Global styling | Fonts, scrollbar colors |
| `tailwind.config.ts` | Theme colors | Color palette, animations |
| `layout.tsx` | Meta information | Page title, description |

## 🎯 Scroll Interaction Testing

1. **Reload the page** at `localhost:3000`
2. **Scroll down slowly** - watch the canvas frames change
3. **Continue scrolling** - overlay text should fade and move
4. **Scroll further** - reach the projects section

## 🔧 Common Customizations

### Change Scroll Height
```typescript
// In ScrollyCanvas.tsx, change h-[500vh] to:
h-[300vh]  // Faster animation
h-[800vh]  // Slower animation
```

### Update CTA Button Link
```typescript
// In Projects.tsx
onClick={() => window.location.href = 'mailto:your-email@com'}
```

### Add Contact Form
Replace "Get in Touch" button href with:
```typescript
href="/contact"  // Create a contact page
```

## 📱 Test Responsiveness

1. Open DevTools (F12)
2. Toggle device toolbar
3. Test on Mobile, Tablet, Desktop sizes
4. Verify scroll performance is smooth

## 🚀 Deployment (Easy!)

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm run build
# Upload 'out' folder to Netlify
```

### Option 3: Self-hosted
```bash
npm run build
npm start
```

## 🐛 Troubleshooting

**Canvas not showing?**
- Check browser console for errors
- Ensure images are in `public/sequence/`
- Clear browser cache and reload

**Scroll animation stuttering?**
- Reduce image count (decrease `TOTAL_FRAMES`)
- Convert PNG to WebP
- Test on newer browser

**Text not appearing?**
- Check z-index values
- Verify overlay opacity values
- Look at browser DevTools Layers tab

## 📚 Next Steps

1. **Personalize content** - Update all text with your info
2. **Customize colors** - Match your brand
3. **Add real projects** - Replace sample projects
4. **Configure domain** - Set up custom domain
5. **Add analytics** - Track visitor engagement
6. **SEO optimization** - Update meta tags

## 📖 Full Documentation

- See `README.md` for complete setup guide
- See `CUSTOMIZATION.md` for detailed customization options
- Check component files for inline comments

## 🎓 Learning Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Framer Motion Guide](https://www.framer.com/motion/introduction/)
- [Tailwind CSS](https://tailwindcss.com)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

**You're all set!** Start scrolling and enjoying your new portfolio. Happy coding! 🚀
