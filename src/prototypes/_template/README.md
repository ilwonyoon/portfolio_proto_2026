# Prototype Template

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
