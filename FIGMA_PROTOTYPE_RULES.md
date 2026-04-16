# Figma Prototype Rules

## Viewport
- Every prototype screen uses a fixed device viewport of `375px x 812px`.
- Every incoming Figma frame must have a width of `375px`.
- Frame height may exceed `812px`, but the content must stay inside the same screen and scroll vertically.
- Horizontal overflow is disabled by default.

## Figma workflow
- Start from the exact Figma frame or state link.
- Fetch `get_design_context` first.
- Fetch `get_screenshot` from the same node before implementation.
- If the node payload is too large, fetch `get_metadata` and re-request only the required child nodes.
- Validate the rendered result against the screenshot before calling the screen done.

## Frame states
- Keep separate Figma frames for each meaningful state.
- Split at minimum when the UI changes across default, active, loading, modal-open, keyboard-up, and error states.
- Use clear names such as `Home/Default`, `Home/Search Active`, or `Feed/Composer Open`.

## Asset handling
- Do not redraw or regenerate assets that already exist in Figma.
- Use original SVG exports as-is.
- Export raster assets at `2x` when possible.
- Render 2x raster assets at design size in the prototype.
- Keep exported Figma assets under `public/assets/figma`.
- Track exported assets in `public/assets/figma/manifest.json`.

## Asset naming
- Include the screen name and Figma node id in each filename.
- Recommended examples:
- `home/icon-search_12-44.svg`
- `profile/avatar_88-102@2x.png`
- `feed/hero-photo_223-19@2x.jpg`

## Implementation defaults
- Keep each screen rooted in a single 375px-wide container.
- Prefer reusable screen-shell helpers from `src/prototype`.
- Preserve exact spacing, typography, radius, and shadows from Figma unless the design system already defines the same token.
- Do not add placeholder art, substitute icon packs, or invented assets.

## Project structure
- `src/prototype/PrototypeScreen.tsx` keeps the viewport fixed and enables internal scroll.
- `src/prototype/FigmaAsset.tsx` renders exported assets at design size while preserving 2x exports.
- `public/assets/figma/manifest.json` stores export metadata for traceability.
