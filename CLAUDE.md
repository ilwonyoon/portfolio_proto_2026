# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server at localhost:5173
npm run build        # TypeScript check + Vite production build
npm run lint         # ESLint
npm run new:prototype  # Scaffold a new prototype from _template
```

## Architecture

### Prototype Workbench

The app is a local prototype browser (not a deployable product). `src/app/AppShell.tsx` renders a sidebar + main canvas. All prototypes are registered in `src/app/prototype-registry.ts` using `React.lazy()` — adding a new prototype means adding one entry there.

### Viewport Contract

Every prototype screen is **375 × 812px**. This is non-negotiable. Use `<PrototypeScreen>` from `src/prototype/PrototypeScreen.tsx` as the root shell. Frames taller than 812px scroll internally; horizontal overflow is disabled.

### Layer Hierarchy

```
src/
  app/               # AppShell, prototype registry
  prototype/         # PrototypeScreen, FigmaAsset — Figma-to-code helpers
  system/
    primitives/      # Chip, Button, IconButton — design system atoms
    mobile/          # StatusBar, TopNav, HomeIndicator, useInertialScroll
    overlays/        # BottomSheet, PushPage, Snackbar + drag/presence hooks
    feed/            # Feed card components
    tokens/          # Color, typography, spacing, radius, shadow, motion
  prototypes/        # One folder per prototype, self-contained
```

### Figma Assets

- All exported assets live under `public/assets/figma/<prototype-name>/`
- Raster assets exported at **2x**, rendered at design size via `<FigmaAsset displayWidth={} displayHeight={} exportScale={2} />`
- SVG icons: pass `displayWidth`/`displayHeight` as the **glyph** size (not slot size), then center inside a slot wrapper
- Never redraw or substitute assets — use original Figma exports only

### Motion & Scroll

- Inertial scroll: `useInertialScroll(ref, { preset: 'ios-feed' | 'ios-detail' })` — attach to the scrollable container
- Bottom sheet drag: `useSheetDragGesture` + `<BottomSheet>` — handles open/close/drag state
- Page transitions: `<PushPage state="center | peek-left | offscreen-right">` for iOS push navigation

### Adding a New Prototype

1. `npm run new:prototype` to scaffold from `src/prototypes/_template`
2. Register with `React.lazy()` in `src/app/prototype-registry.ts`
3. Export a default component accepting `{ mode?: 'full' | 'thumbnail' }`
4. Assets go in `public/assets/figma/<prototype-id>/`

### Figma Workflow

1. Call `get_design_context` with the node ID first
2. Call `get_screenshot` from the same node before implementing
3. Validate rendered result against the screenshot before marking a screen done
4. If the node payload is too large, use `get_metadata` then re-request specific child nodes
