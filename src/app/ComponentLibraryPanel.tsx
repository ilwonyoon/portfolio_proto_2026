import { useEffect, useMemo, useState } from 'react'
import { FigmaAsset } from '../prototype/FigmaAsset'
import { personalizedFeedShortcuts } from '../prototypes/personalized-feed/shortcut-items'
import {
  BottomNavBar,
  BottomSheet,
  HomeSearchNav,
  IconButton,
  MediaCounter,
  PushPage,
  ShortcutCarousel,
  Snackbar,
  StatusBar,
  TopNav,
  TopTabBar,
  sharedPersonalizedBottomNavItems,
  sharedPersonalizedHomeSearchNav,
} from '../system'
import { Button, Chip, TryInRoomButton } from '../system/primitives'
import { colors, motion, radius, shadows, spacing, typography } from '../system/tokens'

const colorTokens = [
  ['Canvas', '--color-canvas', colors.canvas],
  ['Surface', '--color-surface', colors.surface],
  ['Surface subtle', '--color-surface-subtle', colors.surfaceSubtle],
  ['Surface selected', '--color-surface-selected', colors.surfaceSelected],
  ['Text primary', '--color-text-primary', colors.textPrimary],
  ['Text secondary', '--color-text-secondary', colors.textSecondary],
  ['Text disabled', '--color-text-disabled', colors.textDisabled],
  ['Border', '--color-border', colors.border],
  ['Brand', '--color-brand', colors.brand],
  ['Brand strong', '--color-brand-strong', colors.brandStrong],
  ['Progress track', '--color-progress-track', colors.progressTrack],
] as const

const typeTokens = [
  {
    name: 'Nav title 16',
    key: 'oh-type-nav-title',
    sample: 'Design system',
    fontSize: typography.ohousePrototype.navTitle16.fontSize,
    lineHeight: typography.ohousePrototype.navTitle16.lineHeight,
    letterSpacing: typography.ohousePrototype.navTitle16.letterSpacing,
    fontWeight: typography.ohousePrototype.navTitle16.fontWeight,
  },
  {
    name: 'Section heading 17',
    key: 'oh-type-section-heading',
    sample: 'Shared foundations and patterns',
    fontSize: typography.ohousePrototype.sectionHeading17.fontSize,
    lineHeight: typography.ohousePrototype.sectionHeading17.lineHeight,
    letterSpacing: typography.ohousePrototype.sectionHeading17.letterSpacing,
    fontWeight: typography.ohousePrototype.sectionHeading17.fontWeight,
  },
  {
    name: 'Body 14',
    key: 'oh-type-body-14',
    sample: 'Use this for placeholder text, helper copy, and compact labels.',
    fontSize: typography.ohousePrototype.body14.fontSize,
    lineHeight: typography.ohousePrototype.body14.lineHeight,
    letterSpacing: typography.ohousePrototype.body14.letterSpacing,
    fontWeight: typography.ohousePrototype.body14.fontWeight,
  },
  {
    name: 'Detail 13',
    key: 'oh-type-detail-13',
    sample: 'Secondary metadata that still needs hierarchy.',
    fontSize: typography.ohousePrototype.detail13.fontSize,
    lineHeight: typography.ohousePrototype.detail13.lineHeight,
    letterSpacing: typography.ohousePrototype.detail13.letterSpacing,
    fontWeight: typography.ohousePrototype.detail13.fontWeight,
  },
  {
    name: 'Detail 12',
    key: 'oh-type-detail-12',
    sample: 'Dense supporting labels and compact metadata.',
    fontSize: typography.ohousePrototype.detail12.fontSize,
    lineHeight: typography.ohousePrototype.detail12.lineHeight,
    letterSpacing: typography.ohousePrototype.detail12.letterSpacing,
    fontWeight: typography.ohousePrototype.detail12.fontWeight,
  },
  {
    name: 'Metric 24',
    key: 'oh-type-metric-24',
    sample: '482',
    fontSize: typography.ohousePrototype.metric24.fontSize,
    lineHeight: typography.ohousePrototype.metric24.lineHeight,
    letterSpacing: typography.ohousePrototype.metric24.letterSpacing,
    fontWeight: typography.ohousePrototype.metric24.fontWeight,
  },
] as const

const tokenGroups = [
  {
    title: 'Spacing',
    items: Object.entries(spacing).map(([key, value]) => `${key} = ${value}px`),
  },
  {
    title: 'Radius',
    items: Object.entries(radius).map(([key, value]) => `${key} = ${value}px`),
  },
  {
    title: 'Motion',
    items: [
      `sheet = ${motion.sheet}ms`,
      `push = ${motion.push}ms`,
      `snackbar = ${motion.snackbar}ms`,
      `scrim = ${motion.scrim}ms`,
      `iosSheetEase = ${motion.iosSheetEase}`,
    ],
  },
  {
    title: 'Shadow',
    items: [
      `device = ${shadows.device}`,
      `card = ${shadows.card}`,
      `bottomSheet = ${shadows.bottomSheet}`,
    ],
  },
] as const

const libraryGroups = [
  {
    title: 'Tokens',
    path: 'src/system/tokens',
    items: ['colors', 'typography', 'spacing', 'radius', 'motion', 'shadows'],
  },
  {
    title: 'Primitives',
    path: 'src/system/primitives',
    items: ['Button', 'Chip', 'IconButton', 'MediaCounter', 'SectionDivider'],
  },
  {
    title: 'Mobile shell',
    path: 'src/system/mobile',
    items: [
      'StatusBar',
      'HomeSearchNav',
      'TopTabBar',
      'BottomNavBar',
      'FloatingActionButton',
      'ProgressBar',
      'ShortcutCarousel',
      'HomeFeedScaffold',
    ],
  },
  {
    title: 'Feed modules',
    path: 'src/system/feed',
    items: [
      'FeedCard',
      'FeedMediaCarousel',
      'FeedReactionBar',
      'FeedProductStrip',
      'FeedProductBottomSheet',
      'HomePostDetailView',
      'HomeTaggedProductModule',
      'ProductAdModule',
    ],
  },
  {
    title: 'Overlays',
    path: 'src/system/overlays',
    items: [
      'BottomSheet',
      'Snackbar',
      'PushPage',
      'LiquidGlassCursor',
      'useSnackbar',
      'useSheetDragGesture',
      'useBottomSheetPresence',
    ],
  },
  {
    title: 'Interactions',
    path: 'src/system/interactions',
    items: ['scrollPhysics', 'useAnimatedCounter'],
  },
] as const

function DesignSystemHeroStats() {
  const stats = [
    { label: 'Token groups', value: '6' },
    { label: 'Core components', value: '20+' },
    { label: 'Overlay patterns', value: '4' },
    { label: 'Prototype surfaces', value: '9' },
  ]

  return (
    <div className="component-library-panel__hero-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="component-library-panel__hero-stat">
          <span className="component-library-panel__hero-stat-value">
            {stat.value}
          </span>
          <span className="component-library-panel__hero-stat-label">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function MobileShellPreview() {
  const [activeTabId, setActiveTabId] = useState('for-you')

  return (
    <div className="component-library-panel__device-preview">
      <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
      <HomeSearchNav {...sharedPersonalizedHomeSearchNav} />
      <TopTabBar
        tabs={[
          { id: 'for-you', label: 'For You' },
          { id: 'discover', label: 'Discover' },
        ]}
        activeTabId={activeTabId}
        onChange={setActiveTabId}
      />
      <div className="component-library-panel__shortcut-preview">
        <ShortcutCarousel items={personalizedFeedShortcuts.slice(0, 6)} />
      </div>
      <div className="component-library-panel__shell-content">
        <div className="component-library-panel__shell-card">
          <p className="component-library-panel__shell-card-label">
            Reusable shell block
          </p>
          <p className="component-library-panel__shell-card-title">
            Home navigation and shortcut stack
          </p>
          <p className="component-library-panel__shell-card-copy">
            Search nav, tabs, shortcut rail, and bottom navigation are shared
            across feed variants.
          </p>
        </div>
      </div>
      <div className="component-library-panel__bottom-nav-preview">
        <BottomNavBar activeItemId="home" items={sharedPersonalizedBottomNavItems} />
      </div>
    </div>
  )
}

function OverlaySandbox() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [pushOpen, setPushOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    if (!snackbarMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setSnackbarMessage('')
    }, 1800)

    return () => window.clearTimeout(timeoutId)
  }, [snackbarMessage])

  return (
    <div className="component-library-panel__overlay-demo">
      <div className="component-library-panel__overlay-actions">
        <button
          type="button"
          className="component-library-panel__demo-action"
          onClick={() => {
            setPushOpen(false)
            setSheetOpen(true)
          }}
        >
          Open sheet
        </button>
        <button
          type="button"
          className="component-library-panel__demo-action"
          onClick={() => setSnackbarMessage('Saved to your library')}
        >
          Show snackbar
        </button>
        <button
          type="button"
          className="component-library-panel__demo-action"
          onClick={() => {
            setSheetOpen(false)
            setPushOpen(true)
          }}
        >
          Push page
        </button>
      </div>

      <div className="component-library-panel__device-preview component-library-panel__device-preview--overlay">
        <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
        <TopNav
          center={<h3 className="component-library-panel__overlay-title">Overlay sandbox</h3>}
          trailing={
            <IconButton label="Search">
              <FigmaAsset
                src="/assets/figma/pdp/search.svg"
                alt=""
                displayWidth={21.84}
                displayHeight={21.84}
              />
            </IconButton>
          }
        />

        <div className="component-library-panel__overlay-body">
          <div className="component-library-panel__overlay-card">
            <p className="component-library-panel__overlay-card-label">
              Shared overlays
            </p>
            <p className="component-library-panel__overlay-card-title">
              BottomSheet, Snackbar, PushPage
            </p>
            <p className="component-library-panel__overlay-card-copy">
              One motion system now drives sheets, pushed screens, snackbars,
              and shared gesture thresholds.
            </p>
          </div>

          <div className="component-library-panel__overlay-metrics">
            <div>
              <span>Sheet</span>
              <strong>{motion.sheet}ms</strong>
            </div>
            <div>
              <span>Push</span>
              <strong>{motion.push}ms</strong>
            </div>
            <div>
              <span>Snackbar</span>
              <strong>{motion.snackbar}ms</strong>
            </div>
          </div>
        </div>

        <Snackbar
          className="component-library-panel__overlay-snackbar"
          message={snackbarMessage}
          actionLabel="View"
          onAction={() => setSnackbarMessage('Opened saved items')}
        />

        <BottomSheet
          open={sheetOpen}
          ariaLabel="Overlay demo sheet"
          onClose={() => setSheetOpen(false)}
          panelClassName="component-library-panel__overlay-sheet"
          panelStyle={{ height: '280px' }}
        >
          <div className="component-library-panel__overlay-sheet-handle">
            <div className="ds-bottom-sheet__handle" />
          </div>
          <div className="component-library-panel__overlay-sheet-content">
            <p className="component-library-panel__overlay-sheet-eyebrow">
              Shared bottom sheet
            </p>
            <h4 className="component-library-panel__overlay-sheet-title">
              Reuse one container and style the content.
            </h4>
            <p className="component-library-panel__overlay-sheet-copy">
              Peek height, scrim, shadow, motion, and gesture support now live in
              the system layer.
            </p>
          </div>
          <div className="component-library-panel__overlay-sheet-footer">
            <Button variant="sheet" enabled onClick={() => setSheetOpen(false)}>
              Done
            </Button>
          </div>
        </BottomSheet>

        <PushPage
          className="component-library-panel__overlay-push"
          state={pushOpen ? 'center' : 'offscreen-right'}
        >
          <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
          <TopNav
            leading={
              <IconButton label="Back" onClick={() => setPushOpen(false)}>
                <FigmaAsset
                  src="/assets/figma/pdp/back.svg"
                  alt=""
                  displayWidth={14.24}
                  displayHeight={24}
                />
              </IconButton>
            }
            center={<h3 className="component-library-panel__overlay-title">Pushed page</h3>}
          />
          <div className="component-library-panel__push-body">
            <p className="component-library-panel__overlay-card-label">
              Shared transition
            </p>
            <p className="component-library-panel__overlay-card-title">
              PushPage keeps the navigation motion consistent.
            </p>
            <p className="component-library-panel__overlay-card-copy">
              Use it for onboarding steps, dashboards, and detail panels that
              should move like iOS.
            </p>
            <Button variant="sheet" enabled onClick={() => setPushOpen(false)}>
              Close
            </Button>
          </div>
        </PushPage>
      </div>
    </div>
  )
}

export function ComponentLibraryPanel() {
  const componentCount = useMemo(
    () => libraryGroups.reduce((total, group) => total + group.items.length, 0),
    [],
  )

  return (
    <section
      className="component-library-panel"
      aria-label="Design system and component library"
    >
      <section className="component-library-panel__hero">
        <div className="component-library-panel__hero-copy">
          <p className="component-library-panel__eyebrow">Design system</p>
          <h2 className="component-library-panel__title">
            Shared tokens, components, and interaction patterns
          </h2>
          <p className="component-library-panel__copy">
            This page folds the old component library into one review surface.
            Check tokens first, then confirm whether the component or motion
            pattern already exists before adding new UI.
          </p>
        </div>
        <DesignSystemHeroStats />
      </section>

      <section className="component-library-panel__band">
        <div className="component-library-panel__band-header">
          <div>
            <p className="component-library-panel__subhead">Foundations</p>
            <h3 className="component-library-panel__band-title">
              Semantic tokens used across prototypes
            </h3>
          </div>
          <div className="component-library-panel__code-list">
            <code>src/system/tokens</code>
            <code>{componentCount} exported modules</code>
          </div>
        </div>

        <div className="component-library-panel__foundation-grid">
          <article className="design-system-panel">
            <div className="design-system-panel__section">
              <p className="design-system-panel__label">Color</p>
              <p className="design-system-panel__copy">
                Semantic color tokens should replace raw values in new work.
              </p>
            </div>
            <div className="token-swatches">
              {colorTokens.map(([label, token, value]) => (
                <div key={token} className="token-swatches__item">
                  <span
                    className="token-swatches__chip"
                    style={{ background: value }}
                  />
                  <span className="token-swatches__meta">
                    <strong>{label}</strong>
                    <span>{token}</span>
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="design-system-panel">
            <div className="design-system-panel__section">
              <p className="design-system-panel__label">Typography</p>
              <p className="design-system-panel__copy">
                SF Pro mapping for nav, body, detail, and metric roles.
              </p>
            </div>
            <div className="component-library-panel__type-stack">
              {typeTokens.map((typeToken) => (
                <div key={typeToken.key} className="component-library-panel__type-item">
                  <span className="component-library-panel__type-meta">
                    {typeToken.name} · {typeToken.key}
                  </span>
                  <span
                    className="component-library-panel__type-sample"
                    style={{
                      fontSize: `${typeToken.fontSize}px`,
                      lineHeight: `${typeToken.lineHeight}px`,
                      letterSpacing: `${typeToken.letterSpacing}px`,
                      fontWeight: typeToken.fontWeight,
                    }}
                  >
                    {typeToken.sample}
                  </span>
                </div>
              ))}
            </div>
          </article>

          {tokenGroups.map((group) => (
            <article key={group.title} className="design-system-panel">
              <div className="design-system-panel__section">
                <p className="design-system-panel__label">{group.title}</p>
                <div className="component-library-panel__token-pill-row">
                  {group.items.map((item) => (
                    <span key={item} className="component-library-panel__token-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="component-library-panel__band">
        <div className="component-library-panel__band-header">
          <div>
            <p className="component-library-panel__subhead">Libraries</p>
            <h3 className="component-library-panel__band-title">
              Reusable component groups
            </h3>
          </div>
        </div>

        <div className="component-library-panel__library-grid">
          {libraryGroups.map((group) => (
            <article key={group.title} className="design-system-panel">
              <div className="design-system-panel__section">
                <p className="design-system-panel__label">{group.title}</p>
                <code className="component-library-panel__path">{group.path}</code>
              </div>
              <div className="component-library-panel__token-pill-row">
                {group.items.map((item) => (
                  <span key={item} className="component-library-panel__token-pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="component-library-panel__band">
        <div className="component-library-panel__band-header">
          <div>
            <p className="component-library-panel__subhead">Live previews</p>
            <h3 className="component-library-panel__band-title">
              Representative UI built from shared parts
            </h3>
          </div>
        </div>

        <div className="component-library-panel__preview-grid">
          <article className="design-system-panel">
            <div className="design-system-panel__section">
              <p className="design-system-panel__label">Primitives</p>
              <div className="component-library-panel__primitive-stack">
                <div className="component-library-panel__primitive-row">
                  <Chip>Default chip</Chip>
                  <Chip selected>Selected chip</Chip>
                  <Chip variant="month">Month chip</Chip>
                </div>
                <div className="component-library-panel__primitive-row">
                  <Button enabled>Primary CTA</Button>
                  <Button>Disabled CTA</Button>
                </div>
                <div className="component-library-panel__primitive-row">
                  <IconButton label="Search">
                    <FigmaAsset
                      src="/assets/figma/personalized-feed/search.svg"
                      alt=""
                      displayWidth={15.05}
                      displayHeight={15.48}
                    />
                  </IconButton>
                  <MediaCounter current={3} total={10} />
                </div>
                <div className="component-library-panel__primitive-row">
                  <TryInRoomButton expanded />
                  <TryInRoomButton expanded={false} aria-label="Try in your room" />
                </div>
              </div>
            </div>
          </article>

          <article className="design-system-panel">
            <div className="design-system-panel__section">
              <p className="design-system-panel__label">Mobile shell</p>
              <p className="design-system-panel__copy">
                Search nav, tabs, shortcut rail, and bottom nav are already built.
              </p>
            </div>
            <MobileShellPreview />
          </article>

          <article className="design-system-panel component-library-panel__preview-panel--wide">
            <div className="design-system-panel__section">
              <p className="design-system-panel__label">Overlay sandbox</p>
              <p className="design-system-panel__copy">
                Test shared motion and container patterns without leaving the
                design system page.
              </p>
            </div>
            <OverlaySandbox />
          </article>
        </div>
      </section>
    </section>
  )
}
