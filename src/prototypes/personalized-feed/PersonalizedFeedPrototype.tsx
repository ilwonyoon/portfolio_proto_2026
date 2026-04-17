import { useEffect, useState } from 'react'
import './personalized-feed.css'
import {
  FeedProductBottomSheet,
  HomeFeedItemRenderer,
  type HomeFeedItem,
  type UserUploadedFeedItem,
} from '../../system/feed'
import {
  FloatingActionButton,
  HomeFeedScaffold,
  ShortcutCarousel,
  TopTabBar,
  sharedPersonalizedBottomNavItems,
  sharedPersonalizedHomeSearchNav,
} from '../../system/mobile'
import {
  fetchPersonalizedFeedItems,
  getInitialPersonalizedFeedItems,
} from './feed-api'
import { personalizedFeedShortcuts } from './shortcut-items'

type PersonalizedFeedPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

function PersonalizedFeedPrototype({ mode = 'full' }: PersonalizedFeedPrototypeProps) {
  const [activeTopTab, setActiveTopTab] = useState<'for-you' | 'discover'>(
    'for-you',
  )
  const [feedItems, setFeedItems] = useState<HomeFeedItem[]>(
    getInitialPersonalizedFeedItems,
  )
  const [activeProductSheetItemId, setActiveProductSheetItemId] = useState<
    string | null
  >(null)

  useEffect(() => {
    let cancelled = false

    void fetchPersonalizedFeedItems().then((items) => {
      if (!cancelled) {
        setFeedItems(items)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const activeProductSheetItem = feedItems.find(
    (item): item is UserUploadedFeedItem =>
      item.type === 'user-uploaded' && item.id === activeProductSheetItemId,
  )

  function handleOpenProductDetail(productId: string) {
    void productId
  }

  return (
    <HomeFeedScaffold
      mode={mode}
      className="personalized-feed"
      statusBarLevelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg"
      searchNav={sharedPersonalizedHomeSearchNav}
      topTabs={
        <TopTabBar
          tabs={[
            { id: 'for-you', label: 'For You' },
            { id: 'discover', label: 'Discover' },
          ]}
          activeTabId={activeTopTab}
          onChange={(tabId) => setActiveTopTab(tabId as 'for-you' | 'discover')}
        />
      }
      shortcuts={
        <ShortcutCarousel
          className="personalized-feed__shortcuts"
          items={personalizedFeedShortcuts}
        />
      }
      content={
        <div className="personalized-feed__content">
          {activeTopTab === 'for-you'
            ? feedItems.map((item) => (
                <HomeFeedItemRenderer
                  key={item.id}
                  item={item}
                  onOpenProductSheet={setActiveProductSheetItemId}
                  onOpenProductDetail={(_, productId) =>
                    handleOpenProductDetail(productId)
                  }
                />
              ))
            : null}
        </div>
      }
      floatingActionButton={
        <FloatingActionButton
          className="personalized-feed__fab"
          iconSrc="/assets/figma/personalized-feed/fab-plus.svg"
          iconWidth={20.5}
          iconHeight={20.5}
          label="Upload"
        />
      }
      bottomNav={{
        activeItemId: 'home',
        items: sharedPersonalizedBottomNavItems,
      }}
      overlay={
        <FeedProductBottomSheet
          open={Boolean(activeProductSheetItem)}
          title={activeProductSheetItem?.productSheetTitle ?? ''}
          products={activeProductSheetItem?.card.products?.catalog ?? []}
          onClose={() => setActiveProductSheetItemId(null)}
          onSelectProduct={handleOpenProductDetail}
        />
      }
    />
  )
}

export default PersonalizedFeedPrototype
