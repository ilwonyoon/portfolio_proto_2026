# Figma Prototype 2026

React + Vite starter for Figma-to-prototype work with a fixed `375 x 812` device viewport, internal vertical scrolling for tall frames, and explicit exported-asset handling rules.

## Start

```bash
npm install
npm run dev
```

## Core rules

- Screen width is always `375px`.
- Device viewport is always `375 x 812`.
- Frames taller than `812px` scroll inside the same screen.
- Exported Figma assets live in `public/assets/figma`.
- Raster assets should be exported at `2x` and rendered at design size.

Detailed operating rules live in [FIGMA_PROTOTYPE_RULES.md](./FIGMA_PROTOTYPE_RULES.md).

## Structure

- `src/prototype/PrototypeScreen.tsx`: fixed-width device shell with internal scroll.
- `src/prototype/FigmaAsset.tsx`: helper for displaying exported `2x` assets at design size.
- `public/assets/figma/manifest.json`: metadata ledger for exported Figma assets.
- `src/App.tsx`: starter demo screen showing the shell and scroll behavior.

## Next steps

1. Export Figma assets into `public/assets/figma`.
2. Record each export in `public/assets/figma/manifest.json`.
3. Replace the demo frame in `src/App.tsx` with the first real Figma screen.
4. Compare the result to the screenshot from the same Figma node.
