import { useEffect, useRef } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { HomeFeedItemRenderer, type HomeFeedItem } from '../../system/feed'
import {
  BottomNavBar,
  FloatingActionButton,
  StatusBar,
  sharedPersonalizedBottomNavItems,
} from '../../system/mobile'
import { useInertialScroll } from '../../system/mobile/useInertialScroll'
import { PushPage } from '../../system/overlays'

type DiscoverFeedDetailPanelProps = {
  isOpen: boolean
  items: HomeFeedItem[]
  onClose: () => void
  onOpenProductSheet: (itemId: string) => void
  onOpenProductDetail: (itemId: string, productId: string) => void
  onToggleFeedSave: (itemId: string, isSaved: boolean) => void
}

export function DiscoverFeedDetailPanel({
  isOpen,
  items,
  onClose,
  onOpenProductDetail,
  onOpenProductSheet,
  onToggleFeedSave,
}: DiscoverFeedDetailPanelProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useInertialScroll(scrollRef, {
    enabled: isOpen,
    preset: 'ios-detail',
  })

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [isOpen])

  return (
    <section
      className={
        isOpen
          ? 'personalized-discover-detail personalized-discover-detail--open'
          : 'personalized-discover-detail'
      }
      aria-hidden={!isOpen}
    >
      <PushPage
        className="personalized-discover-detail__panel"
        state={isOpen ? 'center' : 'offscreen-right'}
      >
        <div
          ref={scrollRef}
          className="personalized-discover-detail__scroll prototype-screen__scroll-region"
        >
          <header className="personalized-discover-detail__header">
            <StatusBar
              levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg"
              className="personalized-discover-detail__status"
            />
            <nav className="personalized-discover-detail__top-nav" aria-label="Post detail">
              <button
                type="button"
                className="personalized-discover-detail__back"
                aria-label="Back to Discover"
                onClick={onClose}
              >
                <FigmaAsset
                  src="/assets/figma/creator-dashboard/arrow-left-24.svg"
                  alt=""
                  displayWidth={20.5}
                  displayHeight={18.867}
                  className="personalized-discover-detail__back-icon"
                />
              </button>
            </nav>
          </header>

          <div className="personalized-discover-detail__content">
            {items.map((item) => (
              <HomeFeedItemRenderer
                key={item.id}
                item={item}
                onOpenProductSheet={onOpenProductSheet}
                onOpenProductDetail={onOpenProductDetail}
                onToggleFeedSave={onToggleFeedSave}
              />
            ))}
          </div>
        </div>

        <BottomNavBar
          className="personalized-discover-detail__bottom-nav"
          activeItemId="home"
          items={sharedPersonalizedBottomNavItems}
        />
        <FloatingActionButton
          className="personalized-discover-detail__fab"
          iconSrc="/assets/figma/personalized-feed/fab-plus.svg"
          iconWidth={20.5}
          iconHeight={20.5}
          label="Upload"
        />
      </PushPage>
    </section>
  )
}
