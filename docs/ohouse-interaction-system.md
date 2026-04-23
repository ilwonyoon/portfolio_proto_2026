# Ohouse Prototype Interaction System

This document defines the shared interaction layer for the Ohouse prototype workspace. The goal is to stop rebuilding motion and behavior per screen and instead reuse a small set of interaction primitives.

## Principles

1. Match iOS reading pace before interaction.
2. Separate motion tokens from screen-specific content.
3. Keep interaction behavior reusable even when visuals differ.
4. Prefer named presets over raw numbers.

## Shared Behavior Layers

### 1. Scroll Physics

Implemented in:

- `src/system/interactions/scrollPhysics.ts`
- `src/system/mobile/useInertialScroll.ts`

Named presets:

| Preset | Use |
| --- | --- |
| `ios-feed` | Home feeds and long, casual browsing surfaces |
| `ios-detail` | Post detail and Discover detail panels |
| `ios-dashboard` | Compact analytics and dashboard surfaces |
| `ios-pdp` | Product detail pages with mixed hero/content sections |

Current adopters:

- `HomeFeedScaffold` defaults to `ios-feed`
- `HomePostDetailView` uses `ios-detail`
- `DiscoverFeedDetailPanel` uses `ios-detail`
- `CreatorActivityDashboardScreen` uses `ios-dashboard`
- `PdpPrototype` uses `ios-pdp`

### 2. Bottom Sheet Motion

Implemented in:

- `src/system/overlays/BottomSheet.tsx`
- `src/system/overlays/useBottomSheetPresence.ts`
- `src/system/overlays/useSheetDragGesture.ts`

Shared responsibilities:

- mount/unmount timing
- persistent teaser rendering when closed
- configurable peek height for drag-entry sheets
- live drag offset while tracking pointer
- scrim fade
- iOS sheet slide-up motion
- base sheet shadow
- base handle
- reusable vertical drag thresholds for teaser sheets

### 3. Scripted Pointer Layer

Implemented in:

- `src/system/overlays/LiquidGlassCursor.tsx`

Shared responsibilities:

- scripted click point rendering
- pressed state timing
- scenario playback pointer motion

### 4. Snackbar

Implemented in:

- `src/system/overlays/Snackbar.tsx`
- `src/system/overlays/useSnackbar.ts`

Shared responsibilities:

- timed visibility
- iOS-style upward fade
- standard action slot styling
- reuse across feed and bottom-sheet save flows

### 5. Push Transition

Implemented in:

- `src/system/overlays/PushPage.tsx`

Shared responsibilities:

- full-screen push from right
- peek-left previous screen state
- shared timing and easing for dashboard/detail navigation

### 6. Counter Motion

Implemented in:

- `src/system/interactions/counterMotion.ts`

Named presets:

- `ios-smooth`
- `ios-spring`

## Motion Tokens

Current reusable motion tokens:

- `motion.fast`
- `motion.base`
- `motion.emphasis`
- `motion.sheet`
- `motion.scrim`
- `motion.push`
- `motion.snackbar`
- `motion.iosSheetEase`
- `motion.iosPushEase`

Related CSS variables:

- `--motion-duration-sheet`
- `--motion-duration-scrim`
- `--motion-ease-ios-sheet`
- `--motion-duration-push`
- `--motion-ease-ios-push`
- `--motion-push-peek-offset`
- `--motion-duration-snackbar`

## System Backlog

These should be systemized next:

### High priority

1. `HideOnScroll`
   - used by FAB and sticky sections
   - should support thresholds and direction lock

### Medium priority

2. `StickyCollapseHeader`
   - tabs disappear, chips remain sticky
   - needed in Discover and related feed surfaces

3. `SheetDragGesture`
   - Upload now uses the shared gesture hook for upward teaser-open and downward drag-close
   - live offset is shared through `BottomSheet`
   - velocity-based settle behavior is still not generalized

4. `TagRevealMotion`
   - media tag stagger and visibility threshold
   - currently owned inside feed media carousel logic

5. `SelectionSpring`
   - save/like/fill icon pop
   - should be a reusable animation preset

## Recommended Usage Pattern

Prefer this:

```ts
useInertialScroll(ref, {
  enabled: isOpen,
  preset: 'ios-detail',
})
```

Avoid this unless a new behavior is being designed:

```ts
useInertialScroll(ref, {
  enabled: isOpen,
  friction: 0.931,
  maxVelocity: 23,
  minVelocity: 0.17,
  wheelGain: 0.11,
})
```

If a screen truly needs a new feel, add a new named preset first, then document where it should be used.
