# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern, responsive image gallery built with Next.js 15 featuring a full-screen modal slider powered by Swiper.js. The application fetches images from the JSONPlaceholder API and displays them in a masonry-style grid layout.

## Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm start            # Start production server
npm run lint         # Run ESLint
```

Visit `http://localhost:3000` after running dev server.

## Architecture

### Component Hierarchy
```
page.tsx (Entry point)
  └── ImageGallery.tsx (Client component with state management)
        ├── Image Grid (Masonry layout)
        └── ImageSlider.tsx (Modal with Swiper.js)
```

### Key Design Patterns

**Client-Side State Management**: `ImageGallery.tsx` is marked as `'use client'` and manages:
- Photo data fetched from API
- Loading and error states
- Selected image index for modal

**Service Layer Pattern**: `photoService.ts` handles all API interactions and data processing, keeping components focused on UI concerns.

**Type Safety**: All data structures defined in `src/types/photo.ts` for type-safe development.

### Image Handling

**URL Mapping**: The app fetches metadata from JSONPlaceholder but maps image URLs to picsum.photos for reliability:
- Gallery thumbnails: `600x800` resolution (optimized for tall masonry cards)
- Slider images: `1200x800` resolution (high-res for full-screen viewing)

**Next.js Image Optimization**: Uses Next.js `<Image>` component with:
- Lazy loading enabled
- Responsive sizes for different breakpoints
- Quality set to 90 for slider images

**Remote Patterns**: `next.config.ts` allows images from `picsum.photos` domain.

### Styling Approach

**Tailwind CSS v4**: All styling uses Tailwind utility classes.

**Color Scheme**: Dark theme with purple-blue gradients:
- Background: `from-[#2d1b4e] via-[#1a0f3a] to-[#0f0820]`
- Accent color: `#5b7cff` (blue)
- Cards: `#1a2845` background with blue gradient footer

**Masonry Layout**: Uses CSS columns (`columns-1 sm:columns-2 lg:columns-3`) with varying card heights for visual interest.

### Modal Slider Implementation

**Swiper.js Integration**: The slider uses Swiper v12 with:
- Fraction pagination (e.g., "3 / 50")
- Keyboard navigation
- Loop mode enabled
- Custom navigation buttons styled with Tailwind

**Body Scroll Lock**: Modal prevents background scrolling when open.

**Index-based Navigation**: Opens slider using `findIndex()` by photo ID (not array index) to handle masonry column reordering correctly.

## Important Implementation Details

### Looping Techniques Demonstrated
The codebase intentionally demonstrates various JavaScript iteration methods for educational purposes:
- `map()`: Component rendering in `ImageGallery.tsx` and `ImageSlider.tsx`
- `filter()`: Data filtering in `photoService.ts`
- `for` loop: Photo validation in `validatePhotos()`
- `for...of`: Set operations in `getUniqueAlbums()`
- `Array.from()`: Skeleton loader generation

### Error Handling
- All API calls wrapped in try-catch
- User-friendly error messages with retry functionality
- Loading skeletons match final layout structure

### Path Aliases
Uses `@/*` for `./src/*` imports (configured in `tsconfig.json`).
