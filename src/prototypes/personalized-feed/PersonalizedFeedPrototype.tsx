import { useEffect, useRef, useState } from 'react'
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
import { Snackbar, useSnackbar } from '../../system/overlays'
import {
  fetchPersonalizedFeedItems,
  getInitialPersonalizedFeedItems,
} from './feed-api'
import { personalizedFeedShortcuts } from './shortcut-items'
import { DiscoverFeedContent } from './DiscoverFeedContent'
import { DiscoverFeedDetailPanel } from './DiscoverFeedDetailPanel'
import { discoverDetailFeedItems } from './discover-detail-data'

const discoverDetailTransitionMs = 420

type PersonalizedFeedPrototypeProps = {
  mode?: 'full' | 'thumbnail'
  initialTopTab?: 'for-you' | 'discover'
  scrollableTopTabs?: boolean
  feedItemsOverride?: HomeFeedItem[]
}

function PersonalizedFeedPrototype({
  initialTopTab = 'for-you',
  mode = 'full',
  scrollableTopTabs = false,
  feedItemsOverride,
}: PersonalizedFeedPrototypeProps) {
  const [activeTopTab, setActiveTopTab] = useState<'for-you' | 'discover'>(
    initialTopTab,
  )
  const [feedItems, setFeedItems] = useState<HomeFeedItem[]>(() =>
    feedItemsOverride ?? getInitialPersonalizedFeedItems(),
  )
  const [activeProductSheetItemId, setActiveProductSheetItemId] = useState<
    string | null
  >(null)
  const { snackbar: saveSnackbar, showSnackbar } = useSnackbar()
  const [isDiscoverDetailMounted, setIsDiscoverDetailMounted] = useState(false)
  const [isDiscoverDetailOpen, setIsDiscoverDetailOpen] = useState(false)
  const discoverDetailCloseTimerRef = useRef<number | null>(null)
  const discoverDetailOpenFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (feedItemsOverride) {
      setFeedItems(feedItemsOverride)
      return
    }

    let cancelled = false

    void fetchPersonalizedFeedItems().then((items) => {
      if (!cancelled) {
        setFeedItems(items)
      }
    })

    return () => {
      cancelled = true
    }
  }, [feedItemsOverride])

  useEffect(() => {
    return () => {
      if (discoverDetailCloseTimerRef.current !== null) {
        window.clearTimeout(discoverDetailCloseTimerRef.current)
      }

      if (discoverDetailOpenFrameRef.current !== null) {
        window.cancelAnimationFrame(discoverDetailOpenFrameRef.current)
      }
    }
  }, [])

  const activeProductSheetItem = [...discoverDetailFeedItems, ...feedItems].find(
    (item): item is UserUploadedFeedItem =>
      item.type === 'user-uploaded' && item.id === activeProductSheetItemId,
  )

  function handleOpenProductDetail(productId: string) {
    void productId
  }

  function showSaveSnackbar(message: string) {
    showSnackbar({
      message,
      actionLabel: 'View saved',
    })
  }

  function handleToggleFeedSave(itemId: string, isSaved: boolean) {
    void itemId
    showSaveSnackbar(`Post ${isSaved ? 'saved' : 'removed'}`)
  }

  function handleOpenDiscoverDetail() {
    if (discoverDetailCloseTimerRef.current !== null) {
      window.clearTimeout(discoverDetailCloseTimerRef.current)
      discoverDetailCloseTimerRef.current = null
    }

    if (discoverDetailOpenFrameRef.current !== null) {
      window.cancelAnimationFrame(discoverDetailOpenFrameRef.current)
    }

    setIsDiscoverDetailMounted(true)
    discoverDetailOpenFrameRef.current = window.requestAnimationFrame(() => {
      setIsDiscoverDetailOpen(true)
      discoverDetailOpenFrameRef.current = null
    })
  }

  function handleCloseDiscoverDetail() {
    setIsDiscoverDetailOpen(false)
    discoverDetailCloseTimerRef.current = window.setTimeout(() => {
      setIsDiscoverDetailMounted(false)
      discoverDetailCloseTimerRef.current = null
    }, discoverDetailTransitionMs)
  }

  const topTabs = (
    <TopTabBar
      tabs={[
        { id: 'for-you', label: 'For You' },
        { id: 'discover', label: 'Discover' },
      ]}
      activeTabId={activeTopTab}
      onChange={(tabId) => setActiveTopTab(tabId as 'for-you' | 'discover')}
    />
  )

  return (
    <HomeFeedScaffold
      mode={mode}
      className="personalized-feed"
      statusBarLevelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg"
      searchNav={sharedPersonalizedHomeSearchNav}
      topTabs={scrollableTopTabs ? undefined : topTabs}
      shortcuts={
        activeTopTab === 'for-you' ? (
          <ShortcutCarousel
            className="personalized-feed__shortcuts"
            items={personalizedFeedShortcuts}
          />
        ) : undefined
      }
      content={
        <div className="personalized-feed__content">
          {scrollableTopTabs ? (
            <div className="personalized-feed__scroll-tabs">{topTabs}</div>
          ) : null}
          {activeTopTab === 'for-you' ? (
            feedItems.map((item) => (
              <HomeFeedItemRenderer
                key={item.id}
                item={item}
                onOpenProductSheet={setActiveProductSheetItemId}
                onOpenProductDetail={(_, productId) =>
                  handleOpenProductDetail(productId)
                }
                onToggleFeedSave={handleToggleFeedSave}
              />
            ))
          ) : (
            <DiscoverFeedContent onOpenPrimaryContent={handleOpenDiscoverDetail} />
          )}
        </div>
      }
      floatingActionButton={
        activeTopTab === 'for-you' ? (
          <FloatingActionButton
            className="personalized-feed__fab"
            iconSrc="/assets/figma/personalized-feed/fab-plus.svg"
            iconWidth={20.5}
            iconHeight={20.5}
            label="Upload"
          />
        ) : undefined
      }
      hideFloatingActionButtonOnScroll={activeTopTab === 'for-you'}
      bottomNav={{
        activeItemId: 'home',
        items: sharedPersonalizedBottomNavItems,
      }}
      inertialScroll
      overlay={
        <>
          {isDiscoverDetailMounted ? (
            <DiscoverFeedDetailPanel
              isOpen={isDiscoverDetailOpen}
              items={discoverDetailFeedItems}
              onClose={handleCloseDiscoverDetail}
              onOpenProductSheet={setActiveProductSheetItemId}
              onOpenProductDetail={(_, productId) =>
                handleOpenProductDetail(productId)
              }
              onToggleFeedSave={handleToggleFeedSave}
            />
          ) : null}
          <Snackbar
            className="personalized-feed__snackbar"
            message={saveSnackbar?.message}
            actionLabel={saveSnackbar?.actionLabel}
            style={{ bottom: 'calc(89px + 8px)' }}
          />
          <FeedProductBottomSheet
            open={Boolean(activeProductSheetItem)}
            title={activeProductSheetItem?.productSheetTitle ?? ''}
            products={activeProductSheetItem?.card.products?.catalog ?? []}
            onClose={() => setActiveProductSheetItemId(null)}
            onSelectProduct={handleOpenProductDetail}
          />
        </>
      }
    />
  )
}

export default PersonalizedFeedPrototype
