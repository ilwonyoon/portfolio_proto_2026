import { useEffect, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { BottomNavBar, StatusBar, TopTabBar } from '../../system/mobile'
import { useBottomSheetPresence } from '../../system/overlays/useBottomSheetPresence'
import {
  CreatorTopNav,
  ProfileActions,
  creatorBottomNavItems,
} from '../creator-onboarding/CreatorOnboardingPrototype'
import {
  CreatorActivityDashboardScreen,
  populatedCreatorDashboardData,
} from '../creator-onboarding/CreatorActivityDashboard'
import '../creator-onboarding/creator-onboarding.css'
import './creator-profile-content.css'

type CreatorProfileContentPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type FeaturedContentItem = {
  id: string
  title: string
  imageSrc: string
  iconSrc: string
  imageFit?: 'cover' | 'contain'
}

type ProfileGridItem = {
  id: string
  imageSrc: string
  badge?: 'play' | 'stacked'
  fit?: 'cover' | 'contain'
}

const contentAssetRoot = '/assets/figma/creator-profile-content'
const dashboardAssetRoot = '/assets/figma/creator-dashboard'
const creatorScoreGuideDelayMs = 1800
const profileContentBottomNavItems = creatorBottomNavItems.map((item) =>
  item.id === 'my-page'
    ? {
        ...item,
        iconSrc: `${contentAssetRoot}/profile-active-blue-24.svg`,
        iconWidth: 17.37,
        iconHeight: 19.8,
      }
    : item,
)

const featuredItems: FeaturedContentItem[] = [
  {
    id: 'cat-cleaning-products',
    title:
      '8 years as a cat owner- Recommended cleaning products with genuine reviews, 500% satisfaction guaranteed.',
    imageSrc: `${contentAssetRoot}/featured-cleaning-2x.png`,
    iconSrc: `${contentAssetRoot}/play-18.svg`,
  },
  {
    id: 'designer-shop',
    title: "A designer's curated shop for interior enthusiasts, a cozy living space",
    imageSrc: `${contentAssetRoot}/featured-shop-2x.png`,
    iconSrc: `${contentAssetRoot}/datalist-18.svg`,
  },
  {
    id: 'designer-shop-duplicate',
    title: "A designer's curated shop for interior enthusiasts, a cozy living space",
    imageSrc: `${contentAssetRoot}/featured-shop-2x.png`,
    iconSrc: `${contentAssetRoot}/datalist-18.svg`,
  },
]

const profileGridItems: ProfileGridItem[] = [
  { id: 'tea-table', imageSrc: `${contentAssetRoot}/content-01-2x.png` },
  {
    id: 'cabinet',
    imageSrc: `${contentAssetRoot}/content-02-2x.png`,
    badge: 'stacked',
    fit: 'contain',
  },
  { id: 'cat-video', imageSrc: `${contentAssetRoot}/content-03-2x.png`, badge: 'play' },
  { id: 'white-table', imageSrc: `${contentAssetRoot}/content-04-2x.png` },
  { id: 'green-room', imageSrc: `${contentAssetRoot}/content-05-2x.png` },
  { id: 'laundry', imageSrc: `${contentAssetRoot}/content-06-2x.png` },
  { id: 'high-chair', imageSrc: `${contentAssetRoot}/content-07-2x.png` },
  { id: 'yellow-cabinet', imageSrc: `${contentAssetRoot}/content-08-2x.png` },
  { id: 'wood-shelf', imageSrc: `${contentAssetRoot}/content-09-2x.png` },
  { id: 'pet-corner', imageSrc: `${contentAssetRoot}/content-10-2x.png` },
  { id: 'desk', imageSrc: `${contentAssetRoot}/content-11-2x.png` },
  { id: 'cat-window', imageSrc: `${contentAssetRoot}/content-12-2x.png` },
  { id: 'decor-wall', imageSrc: `${contentAssetRoot}/content-13-2x.png` },
  { id: 'green-sofa', imageSrc: `${contentAssetRoot}/content-14-2x.png` },
  { id: 'plant-shelf', imageSrc: `${contentAssetRoot}/content-15-2x.png` },
]

const creatorScoreGuideItems = [
  {
    id: 'earn-score',
    title: 'How do I grow my score?',
    description: 'Post photos or videos, leave comments, and keep creating.',
  },
  {
    id: 'benefits',
    title: 'What can I unlock?',
    description: 'Reach milestones to access monetization, sponsorships, and memberships.',
  },
  {
    id: 'dashboard',
    title: 'Where can I check it?',
    description: 'See your score and content performance in your dashboard.',
  },
]

function CreatorProfileIntro() {
  return (
    <section className="creator-profile-content__intro" aria-label="Profile summary">
      <div className="creator-profile-content__identity">
        <div className="creator-profile-content__identity-copy">
          <h1>zipsoom</h1>
          <p>Followers 4</p>
        </div>
        <FigmaAsset
          src={`${contentAssetRoot}/avatar-2x.png`}
          alt=""
          displayWidth={80}
          displayHeight={80}
          exportScale={2}
          className="creator-profile-content__avatar"
        />
      </div>

      <p className="creator-profile-content__bio">A homebody's daily life with 3 cats</p>
      <a
        className="creator-profile-content__link"
        href="https://instagram.com/zipsoom"
        target="_blank"
        rel="noreferrer"
      >
        <FigmaAsset
          src={`${contentAssetRoot}/link-18.svg`}
          alt=""
          displayWidth={15.1}
          displayHeight={7.6}
          className="creator-profile-content__link-icon"
        />
        <span>instagram.com/zipsoom</span>
      </a>
    </section>
  )
}

function FeaturedContentCard({
  iconSrc,
  imageFit = 'cover',
  imageSrc,
  title,
}: FeaturedContentItem) {
  return (
    <article className="creator-featured-card">
      <div className="creator-featured-card__image-wrap">
        <FigmaAsset
          src={imageSrc}
          alt=""
          displayWidth={210}
          displayHeight={140}
          exportScale={2}
          className={
            imageFit === 'contain'
              ? 'creator-featured-card__image creator-featured-card__image--contain'
              : 'creator-featured-card__image'
          }
          loading="lazy"
        />
        <FigmaAsset
          src={iconSrc}
          alt=""
          displayWidth={18}
          displayHeight={18}
          className="creator-featured-card__badge"
        />
      </div>
      <p>{title}</p>
    </article>
  )
}

function FeaturedContentSection() {
  return (
    <section className="creator-featured" aria-label="Featured Content">
      <h2>Featured Content</h2>
      <div className="creator-featured__carousel">
        {featuredItems.map((item) => (
          <FeaturedContentCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}

function ProfileGridBadge({ badge }: { badge: NonNullable<ProfileGridItem['badge']> }) {
  return (
    <FigmaAsset
      src={`${contentAssetRoot}/${badge === 'play' ? 'play-18.svg' : 'stackedimages-18.svg'}`}
      alt=""
      displayWidth={18}
      displayHeight={18}
      className="creator-profile-grid__badge"
    />
  )
}

function ProfileContentGrid() {
  return (
    <section className="creator-profile-grid" aria-label="Creator content">
      {profileGridItems.map((item) => (
        <article className="creator-profile-grid__tile" key={item.id}>
          <FigmaAsset
            src={item.imageSrc}
            alt=""
            displayWidth={124.333}
            displayHeight={124.333}
            exportScale={2}
            className={
              item.fit === 'contain'
                ? 'creator-profile-grid__image creator-profile-grid__image--contain'
                : 'creator-profile-grid__image'
            }
            loading="lazy"
          />
          {item.badge ? <ProfileGridBadge badge={item.badge} /> : null}
        </article>
      ))}
    </section>
  )
}

function CreatorScoreGuideBottomSheet({
  open,
  onCheckScore,
  onClose,
}: {
  open: boolean
  onCheckScore: () => void
  onClose: () => void
}) {
  const { isMounted, isVisible } = useBottomSheetPresence(open)

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={
        isVisible
          ? 'ds-feed-product-sheet ds-feed-product-sheet--visible creator-score-guide-sheet'
          : 'ds-feed-product-sheet creator-score-guide-sheet'
      }
      role="dialog"
      aria-modal="true"
      aria-label="Creator score guide"
    >
      <button
        type="button"
        className="ds-feed-product-sheet__dim"
        aria-label="Close Creator score guide"
        onClick={onClose}
      />

      <section className="ds-feed-product-sheet__panel creator-score-guide-sheet__panel">
        <div className="creator-score-guide-sheet__handle-wrap">
          <div className="ds-feed-product-sheet__handle" />
        </div>

        <div className="creator-score-guide-sheet__content">
          <div className="creator-score-guide-sheet__headline">
            <p>Creator score is here</p>
            <h2>
              Grow your score.
              <span>Unlock benefits.</span>
            </h2>
          </div>

          <FigmaAsset
            src={`${contentAssetRoot}/score-guide-star.gif`}
            alt=""
            displayWidth={80}
            displayHeight={80}
            exportScale={2}
            className="creator-score-guide-sheet__star"
          />

          <div className="creator-score-guide-sheet__questions">
            {creatorScoreGuideItems.map((item) => (
              <article className="creator-score-guide-sheet__question" key={item.id}>
                <span className="creator-score-guide-sheet__question-mark" aria-hidden="true">
                  Q
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="creator-score-guide-sheet__footer">
          <button
            type="button"
            className="creator-score-guide-sheet__cta"
            onClick={onCheckScore}
          >
            Check my score
          </button>
          <div className="creator-score-guide-sheet__home-indicator" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>
    </div>
  )
}

function CreatorPushPromptBottomSheet({
  open,
  onAllow,
  onClose,
}: {
  open: boolean
  onAllow: () => void
  onClose: () => void
}) {
  const { isMounted, isVisible } = useBottomSheetPresence(open)

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={
        isVisible
          ? 'ds-feed-product-sheet ds-feed-product-sheet--visible creator-push-sheet'
          : 'ds-feed-product-sheet creator-push-sheet'
      }
      role="dialog"
      aria-modal="true"
      aria-label="Content activity notifications"
    >
      <button
        type="button"
        className="ds-feed-product-sheet__dim"
        aria-label="Close content activity notifications"
        onClick={onClose}
      />

      <section className="ds-feed-product-sheet__panel creator-push-sheet__panel">
        <div className="creator-push-sheet__handle-wrap">
          <div className="ds-feed-product-sheet__handle" />
        </div>

        <div className="creator-push-sheet__body">
          <h2>
            Turn on activity notifications?
          </h2>

          <article className="creator-push-sheet__preview-card">
            <div className="creator-push-sheet__preview-copy">
              <h3>145 viewed your post yesterday</h3>
              <p>See what&apos;s getting more attention.</p>
            </div>
            <FigmaAsset
              src={`${dashboardAssetRoot}/push-preview-2x.png`}
              alt=""
              displayWidth={40}
              displayHeight={40}
              exportScale={2}
              className="creator-push-sheet__preview-image"
            />
          </article>

          <p className="creator-push-sheet__fine-print">
            Includes Ohouse marketing notifications.
          </p>
        </div>

        <div className="creator-push-sheet__actions">
          <button
            type="button"
            className="creator-push-sheet__button creator-push-sheet__button--secondary"
            onClick={onClose}
          >
            Not now
          </button>
          <button
            type="button"
            className="creator-push-sheet__button creator-push-sheet__button--primary"
            onClick={onAllow}
          >
            Turn on
          </button>
        </div>
      </section>
    </div>
  )
}

function CreatorProfileContentScreen({
  onOpenDashboard,
  showScoreGuide,
  onCloseScoreGuide,
}: {
  onOpenDashboard: () => void
  showScoreGuide: boolean
  onCloseScoreGuide: () => void
}) {
  return (
    <div className="creator-profile-content__screen">
      <div className="creator-onboarding__top">
        <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
        <CreatorTopNav />
      </div>

      <main className="creator-profile-content__content">
        <CreatorProfileIntro />
        <ProfileActions
          className="creator-profile-actions--inline"
          dashboardLabel="Dashboard"
          dashboardTone="neutral"
          onDashboard={onOpenDashboard}
        />
        <FeaturedContentSection />
        <TopTabBar
          className="creator-content-tabs creator-profile-content__tabs"
          tabs={[
            { id: 'content', label: 'Content' },
            { id: 'saved', label: 'Saved' },
          ]}
          activeTabId="content"
        />
        <ProfileContentGrid />
      </main>

      <BottomNavBar
        className="creator-bottom-nav creator-profile-content__bottom-nav"
        items={profileContentBottomNavItems}
        activeItemId="my-page"
      />
      <CreatorScoreGuideBottomSheet
        open={showScoreGuide}
        onCheckScore={onOpenDashboard}
        onClose={onCloseScoreGuide}
      />
    </div>
  )
}

function CreatorProfileContentPrototype({
  mode = 'full',
}: CreatorProfileContentPrototypeProps) {
  const isThumbnail = mode === 'thumbnail'
  const [activeScreen, setActiveScreen] = useState<'profile' | 'activity'>('profile')
  const [showPushPrompt, setShowPushPrompt] = useState(false)
  const [showScoreGuide, setShowScoreGuide] = useState(false)

  function openDashboard() {
    setShowScoreGuide(false)
    setShowPushPrompt(false)
    setActiveScreen('activity')
  }

  function leaveDashboard() {
    setShowPushPrompt(false)
    setActiveScreen('profile')
  }

  useEffect(() => {
    if (isThumbnail || activeScreen !== 'profile') {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setShowScoreGuide(true)
    }, creatorScoreGuideDelayMs)

    return () => window.clearTimeout(timeoutId)
  }, [activeScreen, isThumbnail])

  return (
    <div
      className={
        isThumbnail
          ? 'creator-profile-content creator-profile-content--thumbnail'
          : 'creator-profile-content creator-profile-content--full'
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <div className={activeScreen === 'activity' ? 'creator-flow creator-flow--activity' : 'creator-flow'}>
          <div className="creator-flow__page creator-flow__page--profile">
            <CreatorProfileContentScreen
              onOpenDashboard={openDashboard}
              showScoreGuide={showScoreGuide && activeScreen === 'profile'}
              onCloseScoreGuide={() => setShowScoreGuide(false)}
            />
          </div>
          <div className="creator-flow__page creator-flow__page--activity">
            <CreatorActivityDashboardScreen
              data={populatedCreatorDashboardData}
              isActive={activeScreen === 'activity' && !isThumbnail}
              onBack={() => setShowPushPrompt(true)}
            />
          </div>
          <CreatorPushPromptBottomSheet
            open={showPushPrompt && activeScreen === 'activity'}
            onAllow={leaveDashboard}
            onClose={leaveDashboard}
          />
        </div>
      </PrototypeScreen>
    </div>
  )
}

export default CreatorProfileContentPrototype
