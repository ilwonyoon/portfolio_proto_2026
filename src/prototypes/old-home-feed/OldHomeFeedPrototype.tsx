import './old-home-feed.css'
import { Fragment, useEffect, useRef, useState } from 'react'
import { oldHomeFeedGridSections } from './home-grid-sections-data'
import {
  oldHomeFeedTaggedMediaSlides,
  oldHomeFeedTaggedProducts,
} from './post-detail-tagged-media-data'
import { personalizedFeedShortcuts } from '../personalized-feed/shortcut-items'
import {
  HomePostDetailView,
  HomeTaggedProductModule,
  type HomeTourGridSectionItem,
  HomeTourGridSection,
} from '../../system/feed'
import { SectionDivider } from '../../system/primitives'
import {
  HomeFeedScaffold,
  HomePromoBannerCarousel,
  ShortcutCarousel,
  sharedPersonalizedHomeSearchNav,
} from '../../system/mobile'

type OldHomeFeedPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

const DETAIL_CLOSE_DURATION_MS = 420

function OldHomeFeedPrototype({ mode = 'full' }: OldHomeFeedPrototypeProps) {
  const [selectedPost, setSelectedPost] = useState<HomeTourGridSectionItem | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const closeTimeoutRef = useRef<number | null>(null)
  const openFrameRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }
      if (openFrameRef.current !== null) {
        window.cancelAnimationFrame(openFrameRef.current)
      }
    }
  }, [])

  function handleOpenPost(item: HomeTourGridSectionItem) {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (openFrameRef.current !== null) {
      window.cancelAnimationFrame(openFrameRef.current)
      openFrameRef.current = null
    }

    setIsDetailOpen(false)
    setSelectedPost(item)
    openFrameRef.current = window.requestAnimationFrame(() => {
      setIsDetailOpen(true)
      openFrameRef.current = null
    })
  }

  function handleClosePost() {
    setIsDetailOpen(false)
    closeTimeoutRef.current = window.setTimeout(() => {
      setSelectedPost(null)
      closeTimeoutRef.current = null
    }, DETAIL_CLOSE_DURATION_MS)
  }

  return (
    <HomeFeedScaffold
      mode={mode}
      className="old-home-feed"
      statusBarLevelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg"
      searchNav={sharedPersonalizedHomeSearchNav}
      shortcuts={
        <div className="old-home-feed__banner">
          <HomePromoBannerCarousel
            slides={[
              {
                id: 'last-big-sale',
                src: '/assets/figma/old-home-feed/banner/banner03.png',
                alt: 'Summer sale discount banner',
              },
            ]}
            totalCount={10}
            counterIconSrc="/assets/figma/old-home-feed/banner/add-12.svg"
          />
        </div>
      }
      content={
        <div className="old-home-feed__stack">
          <ShortcutCarousel
            className="personalized-feed__shortcuts"
            items={personalizedFeedShortcuts}
          />
          <SectionDivider />
          {oldHomeFeedGridSections.map((section, index) => (
            <Fragment key={section.id}>
              <HomeTourGridSection
                title={section.title}
                items={section.items}
                onSelectItem={handleOpenPost}
                viewMoreLabel={section.viewMoreLabel}
                viewMoreChevronSrc="/assets/figma/personalized-feed/brand-promo/chevron-right.svg"
                viewMoreChevronWidth={7.91407}
                viewMoreChevronHeight={13.3519}
                bookmarkIconSrc="/assets/figma/old-home-feed/home-tour-grid/toggle-bookmark.svg"
              />
              {index < oldHomeFeedGridSections.length - 1 ? <SectionDivider /> : null}
            </Fragment>
          ))}
        </div>
      }
      bottomNav={{
        activeItemId: 'home',
        items: [
          {
            id: 'home',
            label: 'Home',
            iconSrc: '/assets/figma/old-home-feed/home-filled.svg',
            iconWidth: 24,
            iconHeight: 24,
          },
          {
            id: 'explore',
            label: 'Discovery',
            iconSrc: '/assets/figma/old-home-feed/explore.svg',
            iconWidth: 19.79,
            iconHeight: 19.79,
          },
          {
            id: 'store',
            label: 'Store',
            iconSrc: '/assets/figma/old-home-feed/store.svg',
            iconWidth: 19.8,
            iconHeight: 17.8,
          },
          {
            id: 'expert',
            label: 'Services',
            iconSrc: '/assets/figma/old-home-feed/expert.svg',
            iconWidth: 21,
            iconHeight: 20.97,
          },
          {
            id: 'my-page',
            label: 'My Page',
            iconSrc: '/assets/figma/old-home-feed/profile.svg',
            iconWidth: 16.8,
            iconHeight: 20,
          },
        ],
      }}
      overlay={
        selectedPost ? (
          <HomePostDetailView
            isOpen={isDetailOpen}
            heroSrc={selectedPost.imageSrc}
            heroAlt={selectedPost.imageAlt}
            title={selectedPost.detailTitle ?? selectedPost.title}
            authorAvatarSrc="/assets/figma/old-home-feed/post-detail/author-avatar.jpg"
            authorHandle="dotorisisters"
            authorDisplayName="Acorn Sisters"
            infoRows={[
              [
                { label: 'Home type', value: 'Other' },
                { label: 'Size', value: '43 pyeong' },
                { label: 'Scope', value: 'Home styling' },
              ],
              [{ label: 'Household', value: 'Living with parents' }],
            ]}
            expandLabel="Show 5 more"
            modules={
              <HomeTaggedProductModule
                slides={oldHomeFeedTaggedMediaSlides}
                products={oldHomeFeedTaggedProducts}
                saveIconSrc="/assets/figma/old-home-feed/home-tour-grid/toggle-bookmark.svg"
              />
            }
            onClose={handleClosePost}
            onGoHome={handleClosePost}
          />
        ) : null
      }
    />
  )
}

export default OldHomeFeedPrototype
