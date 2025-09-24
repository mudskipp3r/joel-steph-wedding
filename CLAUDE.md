# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.3 wedding website for Joel & Stephanie, featuring interactive elements, password protection, and sophisticated animations. The site uses TypeScript, GSAP for animations, and includes Google Maps integration.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

The dev server runs on port 3002 (fallback from 3000) and auto-reloads with Turbopack.

## Core Architecture

### Password Protection System
The entire site is wrapped with `PasswordProtection` component in `layout.tsx`. It uses:
- SHA-256 hashing with `NEXT_PUBLIC_SITE_PASSWORD_HASH` environment variable
- LocalStorage persistence for authentication state
- Elegant gradient login screen with wedding branding

### Page Structure & Layout
The site uses a layered approach:
1. **Fixed Hero Section**: Video background with overlay positioned fixed at top
2. **Spacer div**: 100vh height to allow content to scroll over hero
3. **Main Content**: Positioned with high z-index (10) to overlay hero
   - Cream background (#faf9f6) with rounded top corners
   - Contains all main sections in sequence

### Animation Framework
Heavy use of GSAP with ScrollTrigger for sophisticated animations:
- **ScheduleSection**: Split-screen with pinned map, scroll-triggered events
- **MiddleSection**: Pinned scroll animations with word-by-word reveals
- **BackgroundColorManager**: Coordinates background transitions across sections

### Interactive Schedule System
`ScheduleSection.tsx` implements a complex split-screen timeline:
- **Left side**: Scrolling timeline with hollow dots connected by vertical line
- **Right side**: Pinned Google Maps with custom markers and smooth transitions
- **Event coordination**: Scroll position determines active event and map location
- **Typography hierarchy**: Instrument Sans for times, Instrument Serif for titles

### Google Maps Integration
- Custom TypeScript declarations for Google Maps API
- Environment-based API key (`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)
- Custom SVG markers with event-specific colors
- Intelligent zoom levels based on distance between locations
- Error handling with fallback states

## Environment Variables

Required for full functionality:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API access
- `NEXT_PUBLIC_SITE_PASSWORD_HASH`: SHA-256 hash for password protection
- `PROMO_CODE`: Additional authentication/promo functionality

## Typography System

The site uses a deliberate font pairing:
- **Instrument Serif**: Headlines, event titles, elegant display text
- **Instrument Sans**: Body text, UI elements, functional content
- **Font hierarchy**: Times are 3rem Sans, titles are 4.5rem Serif

## Key Components

- **PasswordProtection**: Site-wide authentication wrapper
- **HeroSection**: Fixed video background with fallback image
- **ScheduleSection**: Interactive timeline with Google Maps
- **MiddleSection**: Animated pinned scroll sections
- **BackgroundColorManager**: Coordinates page-wide color transitions

## Build Considerations

- Uses Turbopack for faster builds and dev server
- TypeScript strict mode with custom Google Maps type definitions
- Some ESLint warnings exist but don't prevent successful builds
- Video assets (AILoop.mp4) included in public/images/

## Deployment Notes

Configured for Netlify deployment with environment variables. The site requires:
1. Google Maps API key for interactive maps
2. Password hash for site protection
3. Static asset serving for video background