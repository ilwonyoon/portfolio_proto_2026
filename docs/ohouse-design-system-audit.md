# Ohouse Prototype Design System Audit

This audit captures the shared tokens and reusable components that have emerged while building the Ohouse prototypes. It is intended to guide future refactors so new screens use the system first and only add prototype-specific CSS when the pattern is genuinely new.

## Current Token Coverage

### Color

Defined in `src/system/styles/tokens.css` and mirrored in `src/system/tokens/colors.ts`.

| Token | Value | Primary Usage |
| --- | --- | --- |
| `--color-surface` | `#ffffff` | Phone screens, cards, sheets |
| `--color-surface-subtle` | `#f7f9fa` | Search fields, soft cards, dividers |
| `--color-surface-selected` | `#e5f6ff` | Selected controls |
| `--color-text-primary` | `#2f3438` | Main text and icons |
| `--color-text-secondary` | `#828c94` | Metadata, descriptions |
| `--color-text-disabled` | `#c2c8cc` | Placeholders and inactive text |
| `--color-border` | `#e6e6e6` | Hairlines and bordered buttons |
| `--color-brand` | `#00a1ff` | Primary CTA |
| `--color-brand-strong` | `#0aa5ff` | Filled interactive icons, active saved state |
| `--oh-sheet-scrim` | `rgba(0, 0, 0, 0.3)` | Default bottom sheet overlay |
| `--oh-sheet-scrim-strong` | `rgba(33, 38, 41, 0.5)` | Creator sheet overlays |

Raw color audit showed the highest remaining repeats are `#ffffff`, `#2f3438`, `#828c94`, `#f7f9fa`, `#eaedef`, `#0aa5ff`, and `#00a1ff`. These should be replaced with semantic tokens as prototype CSS is touched.

### Typography

The current useful Ohouse prototype type families are:

| Token Family | Size / Line | Usage |
| --- | --- | --- |
| `--oh-type-nav-title-*` | `16 / 20` | App nav titles |
| `--oh-type-section-heading-*` | `17 / 22` | Feed/dashboard section headings |
| `--oh-type-tab-*` | `15 / 24` | Top tabs and segmented labels |
| `--oh-type-body-16-*` | `16 / 20` | Main UI copy and CTA-adjacent text |
| `--oh-type-body-15-*` | `15 / 20` | Product row names, compact body |
| `--oh-type-body-14-*` | `14 / 18` | Metadata and compact controls |
| `--oh-type-detail-13-*` | `13 / 18` | Card captions and secondary detail |
| `--oh-type-detail-12-*` | `12 / 16` | Badges, counters, minor labels |
| `--oh-type-metric-20-*` | `20 / 24` | Dashboard metric values |
| `--oh-type-metric-24-*` | `24 / 30` | Large dashboard scores |
| `--type-article-*` | `16 / 24`, `22 / 28`, `18 / 24` | Long-form post/article content |

The largest remaining raw type patterns are `14 / 18 / -0.3`, `14 / 20 / -0.3`, `16 / 20 / -0.3`, `16 / 21 / -0.31`, and `15 / 20 / -0.24`. These map naturally to `detail/body/button/nav` token aliases.

## Reusable Components Already in Place

### Mobile Shell

- `PrototypeScreen`
- `StatusBar`
- `TopNav`
- `HomeSearchNav`
- `TopTabBar`
- `BottomNavBar`
- `HomeIndicator`
- `HomeFeedScaffold`
- `FloatingActionButton`
- `ProgressBar`
- `useInertialScroll`

### Feed System

- `FeedCard`
- `FeedCardHeader`
- `FeedMediaCarousel`
- `FeedReactionBar`
- `FeedProductStrip`
- `FeedProductBottomSheet`
- `FeedFeaturedProductRow`
- `HomeTaggedProductModule`
- `HomePostDetailView`
- `HomePostArticleContent`
- `ProductAdModule`

### Primitives

- `Button`
- `IconButton`
- `Chip`
- `MediaCounter`
- `SectionDivider`

### Overlays

- `BottomSheet`
- `useBottomSheetPresence`
- `LiquidGlassCursor`

`BottomSheet` now owns the common sheet lifecycle, dim button, panel mount/unmount timing, iOS-style slide transition, scrim opacity, and base shadow. Content-specific sheets should pass their own panel class and keep local content styling.

## Bottom Sheet Pattern

Use `BottomSheet` for any sheet that enters from the bottom of a 375 x 812 prototype screen.

Required behavior:

- Root is absolute and contained inside the phone screen.
- Opening uses a two-frame mount before visible state to avoid instant pop-in.
- Panel transition uses `--motion-ease-ios-sheet`.
- Dim opacity transition uses `--motion-duration-scrim`.
- Closing keeps the sheet mounted until the exit animation completes.
- Content-specific sheets own height, footer, body layout, and CTA placement.

Current adopters:

- `FeedProductBottomSheet`
- `CreatorScoreBottomSheet`
- `CreatorScoreGuideBottomSheet`
- `CreatorPushPromptBottomSheet`

Upload product tagging now uses `BottomSheet` for lifecycle, scrim, peek teaser, live drag offset, and sheet transition, plus `useSheetDragGesture` for reusable open/close thresholds. Upload still owns its tag-selection behavior.

## Next Refactor Targets

1. Replace raw color values in prototype CSS with semantic tokens.
2. Add typography utility classes or mixins for `oh-body-14`, `oh-body-15`, `oh-body-16`, `oh-detail-13`, `oh-section-heading`.
3. Move repeated phone full/thumbnail wrapper rules into a `PrototypeFrame` helper.
4. Generalize snackbar/toast into a reusable overlay component.
5. Add velocity-aware settle behavior to the shared sheet gesture layer so close/open can depend on drag speed as well as distance.
