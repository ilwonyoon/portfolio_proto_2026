# Prototype Platform Plan

## Goal

This repository should evolve from a single hardcoded prototype into a reusable prototype workbench for Ohouse-style flows. The target state is a local app where multiple prototypes can coexist, each prototype can be previewed from a shared browser UI, and common design rules are implemented once through reusable tokens and components instead of screen-level hardcoding.

This plan assumes that the rules the user manages in `AGENTS.md` remain stable and should continue to apply as ongoing implementation constraints, even though a repo-local `AGENTS.md` file is not currently present in this repository.

## Current State

- The repository currently contains one prototype flow implemented mostly in [src/App.tsx](./src/App.tsx) and [src/App.css](./src/App.css).
- Shared Figma-related infrastructure already exists in [src/prototype/PrototypeScreen.tsx](./src/prototype/PrototypeScreen.tsx), [src/prototype/FigmaAsset.tsx](./src/prototype/FigmaAsset.tsx), and [public/assets/figma/manifest.json](./public/assets/figma/manifest.json).
- Visual behavior, screen routing, copy, state, layout, and component styling are still tightly coupled.
- The current setup is sufficient for one prototype, but it will become fragile once multiple flows, multiple brands, or multiple preview routes are added.

## Primary Objectives

1. Separate prototype-specific code from reusable system code.
2. Extract a minimal but real design system from the current implementation.
3. Introduce a prototype browser UI with a left preview navigation area.
4. Make new prototypes additive instead of requiring edits across the whole app.
5. Preserve Figma-driven asset discipline, fixed mobile viewport rules, and current motion/content patterns.

## Non-Goals For The First Refactor

- Building a full enterprise-grade design system.
- Generalizing every screen pattern before a second prototype exists.
- Replacing the current visual language with a different one.
- Adding remote CMS, backend persistence, or prototype publishing workflows.

## Constraints

- The mobile viewport remains `375 x 812` by default unless a prototype explicitly overrides it.
- Figma assets remain source-of-truth assets and continue to be stored under `public/assets/figma`.
- Raster assets continue to prefer `2x` export and render at design size.
- Existing user-specified rules in `AGENTS.md` should be treated as durable project rules.
- Refactors should not make current recording or preview workflows worse.

## Target Architecture

### 1. App Shell

The root app should become a prototype browser instead of a single prototype entry point.

Expected responsibilities:

- left sidebar with prototype list
- optional per-prototype screen list or flow step list
- main preview canvas with mobile device frame
- route or state-driven switching between prototypes
- reset / restart flow controls for quick QA and recording

### 2. Design System Layer

The repository should gain a lightweight system layer that covers only the reusable primitives already proven by the current prototype.

The first system extraction should include:

- color tokens
- typography tokens
- spacing scale
- radius scale
- elevation / shadow tokens
- motion timing values
- mobile chrome primitives such as status bar, nav, progress bar, CTA button, and home indicator

### 3. Prototype Modules

Each prototype should live in its own folder and own its own screens, data, and local composition logic.

Each module should eventually contain:

- screen components
- flow/state definitions
- copy/content data
- option lists
- prototype-specific asset references
- prototype metadata for preview registration

### 4. Figma Asset Layer

The current asset handling pattern should become an explicit platform concern rather than an implementation detail.

This layer should manage:

- local asset paths
- export scale metadata
- prototype-to-node mapping
- reusable loading helpers
- naming conventions for future prototypes

## Recommended Folder Structure

```text
src/
  app/
    AppShell.tsx
    router.tsx
    prototype-registry.ts
  system/
    tokens/
      colors.ts
      typography.ts
      spacing.ts
      radius.ts
      shadows.ts
      motion.ts
    styles/
      globals.css
    primitives/
      Button.tsx
      Chip.tsx
      Card.tsx
      IconButton.tsx
    mobile/
      DeviceFrame.tsx
      StatusBar.tsx
      TopNav.tsx
      ProgressBar.tsx
      HomeIndicator.tsx
    figma/
      FigmaAsset.tsx
      figma-asset-registry.ts
  prototypes/
    portfolio-2026/
      index.ts
      meta.ts
      flow.ts
      copy.ts
      options.ts
      screens/
        OnboardingIntro.tsx
        HomeType.tsx
        LivingWith.tsx
        FinalPreferences.tsx
        Recommendations.tsx
```

## Extraction Priorities

### Phase 1: Stabilize Shared Foundations

This phase should happen before more screens are added.

- extract tokens from current values in `App.css`
- move `PrototypeScreen` into a more general mobile shell layer
- keep `FigmaAsset` as a shared primitive
- introduce a shared typography/token contract for SF Pro-based styles
- centralize fixed viewport constants

Deliverable:

- no repeated raw values for core brand blue, muted gray, CTA states, chip states, or common spacing values

### Phase 2: Split The Current Prototype

- move the current single flow out of `App.tsx`
- create a `prototypes/portfolio-2026` module
- split screens by step instead of keeping one monolithic component
- move copy and options into data files
- keep state flow local to the prototype module

Deliverable:

- `App.tsx` or app shell no longer owns step-specific UI

### Phase 3: Add Prototype Browser

- create a left sidebar UI
- register available prototypes through a registry file
- allow switching between prototypes without editing code
- add local preview navigation for flow steps or named screens

Deliverable:

- one local app can host multiple prototypes and preview them intentionally

### Phase 4: Normalize System Components

- convert recurring UI into system primitives
- formalize chip variants, CTA variants, cards, top nav variants, and screen headers
- reduce CSS sprawl by grouping component styles around primitives and shared mobile UI

Deliverable:

- new prototype screens can be assembled mostly from existing primitives

### Phase 5: Add A New Prototype Using The New Structure

This phase validates whether the architecture is actually reusable.

- create a second prototype folder
- register it without disturbing the existing one
- verify assets, tokens, preview navigation, and flow switching all scale cleanly

Deliverable:

- adding a second prototype requires local work inside one new prototype module plus one registry entry

## Design System Candidates To Extract Immediately

The current prototype already proves that these should become first-class tokens or primitives:

- brand blue foreground and active border/background
- muted foreground
- disabled text and button background
- base white surface
- standard card border and shadow
- `20/28/-0.3` heading
- `17/26/-0.3` card title
- `16/24/-0.3` body
- `14/18/-0.3` chip text
- pill chip selected/unselected states
- primary CTA enabled/disabled states
- standard mobile shell radius `40`

## Preview UX Requirements

The future preview browser should support:

- quick switching between prototypes
- quick switching between important screens
- a stable recording mode
- predictable mobile viewport framing
- minimal interference from horizontal scroll interactions inside prototypes
- clear separation between navigation chrome and rendered prototype surface

## Risks

- Extracting too much too early will create fake abstractions.
- Leaving too much inside the current `App.tsx` will make the second prototype harder than the first.
- Mixing prototype-specific copy and system primitives will produce brittle APIs.
- Token extraction without naming discipline will simply move hardcoded values into a different file.

## Implementation Rules For This Refactor

- Favor the smallest real abstraction that already appears at least twice or is clearly platform-defining.
- Keep prototype-specific wording and business logic out of system primitives.
- Keep Figma asset usage explicit and auditable.
- Prefer additive migration over big-bang rewrites.
- Preserve current working previews at every refactor checkpoint.

## Proposed First Execution Slice

The first implementation pass after this plan should be limited to:

1. create `system/tokens`
2. create reusable mobile shell primitives
3. move the current prototype into `prototypes/portfolio-2026`
4. create a minimal app shell with left sidebar and one registered prototype

This slice is large enough to unlock the next prototype, but small enough to finish without destabilizing the current workbench.
