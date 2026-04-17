# Prototype Template
## Prototype Template

Use this repository as a multi-prototype workbench.

### Create a new prototype

```bash
npm run new:prototype -- <prototype-id> "<Prototype Title>"
```

Example:

```bash
npm run new:prototype -- room-planner "Room planner"
```

This will:

- create `src/prototypes/<prototype-id>/`
- scaffold a starter React component and CSS file
- add the prototype to [src/app/prototype-registry.ts](../../app/prototype-registry.ts)

### Generated files

- `<PascalCase>Prototype.tsx`
- `<prototype-id>.css`
- `index.ts`

### Expected workflow

1. Generate the prototype folder.
2. Replace the starter screen with the Figma-driven implementation.
3. Keep shared UI in `src/system/*`.
4. Keep prototype-specific copy, assets, and layout logic inside the prototype folder.
Use this folder shape when adding a new prototype module.

## Suggested structure

```text
src/prototypes/<prototype-id>/
  index.ts
  <PrototypeName>.tsx
  <prototype-name>.css
  meta.ts
  copy.ts
  options.ts
  screens/
```

## Minimum requirements

- Register the prototype in `src/app/prototype-registry.ts`
- Keep Figma assets under `public/assets/figma/<prototype-id>/`
- Record exported assets in `public/assets/figma/manifest.json`
- Reuse shared system primitives before creating prototype-local components
- Keep screen-specific copy and options out of the main prototype component when possible

## Shared system primitives available now

- `Button`
- `Chip`
- `IconButton`
- `TopNav`
- `ProgressBar`
- `HomeIndicator`
- `PrototypeScreen`
- `FigmaAsset`
