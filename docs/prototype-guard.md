# Prototype Guard

This repo now includes lightweight pre/post hook commands for prototype work.

## Commands

```bash
npm run prototype:pre -- <prototype-id>
npm run prototype:post -- <prototype-id>
```

Example:

```bash
npm run prototype:pre -- creator-onboarding
npm run prototype:post -- creator-onboarding
```

## What `prototype:pre` does

- prints the implementation checklist for prototype work
- warns about repeated icon-import mistakes from this repo's history
- scans `public/assets/figma/<prototype-id>` for icon assets whose filename suffix
  does not match the real SVG viewBox size

This is specifically meant to stop the repeated `-24.svg => use 24x24 everywhere`
mistake.

## What `prototype:post` does

- scans `src/prototypes/<prototype-id>` for static icon usage
- compares the code's `displayWidth/displayHeight` or `iconWidth/iconHeight`
  values against the actual SVG viewBox
- fails when the implementation appears to use the slot/container size instead of
  the real vector size

## Core rule

For icons:

- slot size and vector size are different things
- the wrapper/button/layout owns the slot size
- `FigmaAsset` should receive the actual measured vector size from the SVG viewBox

Example:

- wrong: filename is `notification-24.svg`, so code uses `24 x 24`
- right: SVG viewBox is `18.20 x 20.25`, so the asset uses that size and the
  parent layout provides the `24 x 24` slot

## Current scope

The guard focuses on the repeated icon import issue first.

It does not yet enforce:

- token-only color usage
- typography token-only usage
- asset export scale rules
- component reuse thresholds

Those can be added later to the same guard.
