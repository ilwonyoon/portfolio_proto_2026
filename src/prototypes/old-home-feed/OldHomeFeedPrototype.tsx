import './old-home-feed.css'
import { oldHomeTourSectionItems } from './home-tour-section-data'
import { personalizedFeedShortcuts } from '../personalized-feed/shortcut-items'
import { HomeTourGridSection } from '../../system/feed'
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

function OldHomeFeedPrototype({ mode = 'full' }: OldHomeFeedPrototypeProps) {
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
          <HomeTourGridSection
            title="Home tour for you"
            items={oldHomeTourSectionItems}
            bookmarkIconSrc="/assets/figma/old-home-feed/home-tour-grid/toggle-bookmark.svg"
          />
        </div>
      }
      bottomNav={{
        activeItemId: 'home',
        items: [
          {
            id: 'home',
            label: '홈',
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
            label: '스토어',
            iconSrc: '/assets/figma/old-home-feed/store.svg',
            iconWidth: 19.8,
            iconHeight: 17.8,
          },
          {
            id: 'expert',
            label: '이사/시공/수리',
            iconSrc: '/assets/figma/old-home-feed/expert.svg',
            iconWidth: 21,
            iconHeight: 20.97,
          },
          {
            id: 'my-page',
            label: '마이페이지',
            iconSrc: '/assets/figma/old-home-feed/profile.svg',
            iconWidth: 16.8,
            iconHeight: 20,
          },
        ],
      }}
    />
  )
}

export default OldHomeFeedPrototype
