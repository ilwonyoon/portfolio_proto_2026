import { useState } from 'react'
import './personalized-feed.css'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { FeedCard, FeedProductBottomSheet } from '../../system/feed'
import {
  BottomNavBar,
  FloatingActionButton,
  HomeSearchNav,
  ShortcutCarousel,
  StatusBar,
  TopTabBar,
} from '../../system/mobile'
import {
  personalizedFeedCardData,
  personalizedFeedProductSheetTitle,
} from './feed-content-data'
import { personalizedFeedShortcuts } from './shortcut-items'

type PersonalizedFeedPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

function PersonalizedFeedPrototype({ mode = 'full' }: PersonalizedFeedPrototypeProps) {
  const isThumbnail = mode === 'thumbnail'
  const [activeTopTab, setActiveTopTab] = useState<'for-you' | 'discover'>(
    'for-you',
  )
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false)

  function handleOpenProductDetail(productId: string) {
    void productId
  }

  return (
    <div
      className={
        isThumbnail
          ? 'personalized-feed personalized-feed--thumbnail'
          : 'personalized-feed personalized-feed--full'
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <div className="personalized-feed__screen">
          <div className="personalized-feed__top">
            <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
            <HomeSearchNav
              menuIcon={{
                label: 'Open menu',
                src: '/assets/figma/personalized-feed/menu.svg',
                width: 20.8,
                height: 14.9,
              }}
              searchIcon={{
                label: 'Search',
                src: '/assets/figma/personalized-feed/search.svg',
                width: 15.05,
                height: 15.48,
              }}
              actions={[
                {
                  label: 'Notifications',
                  src: '/assets/figma/personalized-feed/notification.svg',
                  width: 18.2,
                  height: 20.18,
                },
                {
                  label: 'Bookmarks',
                  src: '/assets/figma/personalized-feed/bookmark.svg',
                  width: 16,
                  height: 19.39,
                },
                {
                  label: 'Cart',
                  src: '/assets/figma/personalized-feed/cart.svg',
                  width: 22.72,
                  height: 20.6,
                },
              ]}
              placeholder="Search anything"
            />
            <TopTabBar
              tabs={[
                { id: 'for-you', label: 'For You' },
                { id: 'discover', label: 'Discover' },
              ]}
              activeTabId={activeTopTab}
              onChange={(tabId) =>
                setActiveTopTab(tabId as 'for-you' | 'discover')
              }
            />
          </div>

          <div className="personalized-feed__body">
            <div className="personalized-feed__main">
              <ShortcutCarousel
                className="personalized-feed__shortcuts"
                items={personalizedFeedShortcuts}
              />
              <div className="personalized-feed__content">
                {activeTopTab === 'for-you' ? (
                  <FeedCard
                    {...personalizedFeedCardData}
                    onOpenProductSheet={() => setIsProductSheetOpen(true)}
                    onOpenProductDetail={handleOpenProductDetail}
                  />
                ) : null}
              </div>
            </div>
            <FloatingActionButton
              className="personalized-feed__fab"
              iconSrc="/assets/figma/personalized-feed/fab-plus.svg"
              iconWidth={20.5}
              iconHeight={20.5}
              label="Upload"
            />
          </div>

          <BottomNavBar
            activeItemId="home"
            items={[
              {
                id: 'home',
                label: 'Home',
                iconSrc: '/assets/figma/personalized-feed/home-filled.svg',
                iconWidth: 24,
                iconHeight: 24,
              },
              {
                id: 'community',
                label: 'Community',
                iconSrc: '/assets/figma/personalized-feed/community.svg',
                iconWidth: 24,
                iconHeight: 24,
              },
              {
                id: 'shopping',
                label: 'Shopping',
                iconSrc: '/assets/figma/personalized-feed/shopping.svg',
                iconWidth: 24,
                iconHeight: 24,
              },
              {
                id: 'interior',
                label: 'Interior',
                iconSrc: '/assets/figma/personalized-feed/interior.svg',
                iconWidth: 21.8,
                iconHeight: 20.19,
              },
              {
                id: 'my-page',
                label: 'My Page',
                iconSrc: '/assets/figma/personalized-feed/profile.svg',
                iconWidth: 17.37,
                iconHeight: 19.8,
              },
            ]}
          />

          <FeedProductBottomSheet
            open={isProductSheetOpen}
            title={personalizedFeedProductSheetTitle}
            products={personalizedFeedCardData.products?.catalog ?? []}
            onClose={() => setIsProductSheetOpen(false)}
            onSelectProduct={handleOpenProductDetail}
          />
        </div>
      </PrototypeScreen>
    </div>
  )
}

export default PersonalizedFeedPrototype
