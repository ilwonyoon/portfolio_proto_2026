import { useState } from 'react'
import { personalizedFeedShortcuts } from '../prototypes/personalized-feed/shortcut-items'
import {
  BottomNavBar,
  HomeSearchNav,
  ShortcutCarousel,
  StatusBar,
  TopTabBar,
  sharedPersonalizedBottomNavItems,
  sharedPersonalizedHomeSearchNav,
} from '../system'
import { Button, Chip } from '../system/primitives'

export function ComponentLibraryPanel() {
  const [activeTabId, setActiveTabId] = useState('for-you')

  return (
    <section
      className="component-library-panel"
      aria-label="Shared component libraries"
    >
      <div className="component-library-panel__section">
        <p className="component-library-panel__eyebrow">Component libraries</p>
        <h2 className="component-library-panel__title">
          Reuse these modules before building a new prototype.
        </h2>
        <p className="component-library-panel__copy">
          Start here to check whether the structure already exists in the shared
          system layer.
        </p>
      </div>

      <div className="component-library-panel__section">
        <p className="component-library-panel__subhead">Entry points</p>
        <div className="component-library-panel__code-list">
          <code>src/system/mobile</code>
          <code>src/system/feed</code>
          <code>src/system/primitives</code>
          <code>src/system/tokens</code>
        </div>
      </div>

      <div className="component-library-panel__section">
        <p className="component-library-panel__subhead">Home shell components</p>
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
          <div className="component-library-panel__bottom-nav-preview">
            <BottomNavBar
              activeItemId="home"
              items={sharedPersonalizedBottomNavItems}
            />
          </div>
        </div>
      </div>

      <div className="component-library-panel__section">
        <p className="component-library-panel__subhead">Primitives</p>
        <div className="component-library-panel__primitive-row">
          <Chip>Default chip</Chip>
          <Chip selected>Selected chip</Chip>
        </div>
        <div className="component-library-panel__primitive-row">
          <Button enabled>Primary CTA</Button>
        </div>
      </div>
    </section>
  )
}
