import { useEffect, useState } from 'react'
import './creator-onboarding.css'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import {
  BottomNavBar,
  FloatingActionButton,
  StatusBar,
  TopTabBar,
  sharedPersonalizedBottomNavItems,
} from '../../system/mobile'
import { CreatorActivityDashboardScreen } from './CreatorActivityDashboard'
import { CreatorDashboardEmptyScreen } from './CreatorDashboardEmpty'

type CreatorOnboardingPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

export const creatorOnboardingAssetRoot = '/assets/figma/creator-onboarding'
const creatorTooltipDelayMs = 1400
export const creatorBottomNavItems = sharedPersonalizedBottomNavItems.map((item) =>
  item.id === 'home'
    ? {
        ...item,
        iconSrc: `${creatorOnboardingAssetRoot}/home-24.svg`,
        iconWidth: 20.8,
        iconHeight: 19.85,
      }
    : item.id === 'my-page'
      ? {
          ...item,
          iconSrc: `${creatorOnboardingAssetRoot}/user-active-24.svg`,
          iconWidth: 16.8,
          iconHeight: 20,
        }
      : item,
)

const onboardingCards = [
  {
    id: 'photo',
    iconSrc: `${creatorOnboardingAssetRoot}/photo-24.svg`,
    iconWidth: 24,
    iconHeight: 24,
    title: 'Upload a photo and earn Ohouse points',
    description: 'Get 1,000P for your first photo',
    actionLabel: 'Upload now',
  },
  {
    id: 'profile',
    iconSrc: `${creatorOnboardingAssetRoot}/profile-24.svg`,
    iconWidth: 17.37,
    iconHeight: 19.8,
    title: 'Show your style with a profile photo',
    description: 'Grow your following',
    actionLabel: 'Set up',
  },
  {
    id: 'intro',
    iconSrc: `${creatorOnboardingAssetRoot}/comment-24.svg`,
    iconWidth: 19.5,
    iconHeight: 19.44,
    title: 'Complete your bio and share your style',
    description: 'Help more people find you',
    actionLabel: 'Add intro',
  },
]

export function CreatorTopNav() {
  return (
    <div className="creator-top-nav">
      <div className="creator-top-nav__tabs" aria-label="Profile section">
        <button
          type="button"
          className="creator-top-nav__tab creator-top-nav__tab--active"
          aria-pressed="true"
        >
          Profile
        </button>
        <button
          type="button"
          className="creator-top-nav__tab"
          aria-pressed="false"
        >
          Shopping
        </button>
      </div>

      <div className="creator-top-nav__actions">
        <button
          type="button"
          className="creator-icon-button creator-icon-button--notification"
          aria-label="Notifications"
        >
          <FigmaAsset
            src={`${creatorOnboardingAssetRoot}/notification-24.svg`}
            alt=""
            displayWidth={18.2}
            displayHeight={20.25}
            className="creator-icon-button__asset"
          />
          <span className="creator-icon-button__dot" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="creator-icon-button"
          aria-label="Settings"
        >
          <FigmaAsset
            src={`${creatorOnboardingAssetRoot}/settings-24.svg`}
            alt=""
            displayWidth={18.7}
            displayHeight={18.95}
            className="creator-icon-button__asset"
          />
        </button>
        <button
          type="button"
          className="creator-icon-button creator-icon-button--cart"
          aria-label="Cart"
        >
          <FigmaAsset
            src={`${creatorOnboardingAssetRoot}/cart-24.svg`}
            alt=""
            displayWidth={22.72}
            displayHeight={20.6}
            className="creator-icon-button__asset"
          />
          <span className="creator-cart-badge">2</span>
        </button>
      </div>
    </div>
  )
}

function ProfileSummary() {
  return (
    <section className="creator-profile-summary" aria-label="Profile summary">
      <div className="creator-profile-summary__text">
        <h1>nugu</h1>
        <p>
          Followers <strong>0</strong>
        </p>
      </div>
      <FigmaAsset
        src={`${creatorOnboardingAssetRoot}/avatar-placeholder-2x.png`}
        alt=""
        displayWidth={80}
        displayHeight={80}
        exportScale={2}
        className="creator-profile-summary__avatar"
      />
    </section>
  )
}

function CreatorTip({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="creator-tip" role="status">
      <p>Start creating and join the Creator Program.</p>
      <button type="button" aria-label="Dismiss" className="creator-tip__dismiss" onClick={onDismiss}>
        <FigmaAsset
          src={`${creatorOnboardingAssetRoot}/dismiss-12.svg`}
          alt=""
          displayWidth={12}
          displayHeight={12}
        />
      </button>
    </div>
  )
}

export function ProfileActions({
  className,
  dashboardLabel = 'Join program',
  dashboardTone = 'primary',
  onDashboard,
  showTip,
  onDismissTip,
}: {
  className?: string
  dashboardLabel?: string
  dashboardTone?: 'primary' | 'neutral'
  onDashboard: () => void
  showTip?: boolean
  onDismissTip?: () => void
}) {
  return (
    <div className={`creator-profile-actions ${className ?? ''}`.trim()}>
      {showTip && onDismissTip ? <CreatorTip onDismiss={onDismissTip} /> : null}
      <button
        type="button"
        className={
          dashboardTone === 'neutral'
            ? 'creator-profile-actions__dashboard creator-profile-actions__dashboard--neutral'
            : 'creator-profile-actions__dashboard'
        }
        onClick={onDashboard}
      >
        {dashboardLabel}
      </button>
      <button type="button" className="creator-profile-actions__icon" aria-label="Edit profile">
        <FigmaAsset
          src={`${creatorOnboardingAssetRoot}/write-24.svg`}
          alt=""
          displayWidth={20}
          displayHeight={20}
          className="creator-profile-actions__asset creator-profile-actions__asset--write"
        />
      </button>
      <button type="button" className="creator-profile-actions__icon" aria-label="Share profile">
        <FigmaAsset
          src={`${creatorOnboardingAssetRoot}/share-24.svg`}
          alt=""
          displayWidth={15.8}
          displayHeight={17.08}
          className="creator-profile-actions__asset"
        />
      </button>
    </div>
  )
}

function CreatorOnboardingCard({
  actionLabel,
  description,
  iconHeight,
  iconSrc,
  iconWidth,
  title,
}: (typeof onboardingCards)[number]) {
  return (
    <article className="creator-onboarding-card">
      <div className="creator-onboarding-card__header">
        <span className="creator-onboarding-card__icon" aria-hidden="true">
          <FigmaAsset
            src={iconSrc}
            alt=""
            displayWidth={iconWidth}
            displayHeight={iconHeight}
          />
        </span>
        <div className="creator-onboarding-card__copy">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <button type="button" className="creator-onboarding-card__button">
        {actionLabel}
      </button>
    </article>
  )
}

function CreatorProfileScreen({
  onJoinProgram,
  onDismissTip,
  showCreatorTip,
}: {
  onJoinProgram: () => void
  onDismissTip: () => void
  showCreatorTip: boolean
}) {
  return (
    <div className="creator-onboarding__screen">
      <div className="creator-onboarding__top">
        <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
        <CreatorTopNav />
      </div>

      <main className="creator-onboarding__content">
        <ProfileSummary />
        <ProfileActions
          onDashboard={onJoinProgram}
          showTip={showCreatorTip}
          onDismissTip={onDismissTip}
        />
        <TopTabBar
          className="creator-content-tabs"
          tabs={[
            { id: 'content', label: 'Content' },
            { id: 'scraps', label: 'Scraps' },
          ]}
          activeTabId="content"
        />
        <section className="creator-completion">
          <span>Complete your profile</span>
          <span>3 left</span>
        </section>
        <section
          className="creator-onboarding-card-strip"
          aria-label="Profile setup tasks"
        >
          {onboardingCards.map((card) => (
            <CreatorOnboardingCard key={card.id} {...card} />
          ))}
        </section>
      </main>

      <FloatingActionButton
        className="creator-onboarding__fab"
        iconSrc={`${creatorOnboardingAssetRoot}/fab-upload-24.svg`}
        iconWidth={24}
        iconHeight={24}
        label="Create"
      />

      <BottomNavBar
        className="creator-bottom-nav"
        items={creatorBottomNavItems}
        activeItemId="my-page"
      />
    </div>
  )
}

function CreatorOnboardingPrototype({
  mode = 'full',
}: CreatorOnboardingPrototypeProps) {
  const isThumbnail = mode === 'thumbnail'
  const [showCreatorTip, setShowCreatorTip] = useState(false)
  const [activeScreen, setActiveScreen] = useState<
    'profile' | 'dashboard' | 'activity'
  >('profile')

  useEffect(() => {
    if (isThumbnail) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setShowCreatorTip(true)
    }, creatorTooltipDelayMs)

    return () => window.clearTimeout(timeoutId)
  }, [isThumbnail])

  return (
    <div
      className={
        isThumbnail
          ? 'creator-onboarding creator-onboarding--thumbnail'
          : 'creator-onboarding creator-onboarding--full'
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <div
          className={
            activeScreen === 'activity'
              ? 'creator-flow creator-flow--activity'
              : activeScreen === 'dashboard'
                ? 'creator-flow creator-flow--dashboard'
                : 'creator-flow'
          }
        >
          <div className="creator-flow__page creator-flow__page--profile">
            <CreatorProfileScreen
              onJoinProgram={() => setActiveScreen('dashboard')}
              showCreatorTip={showCreatorTip}
              onDismissTip={() => setShowCreatorTip(false)}
            />
          </div>
          <div className="creator-flow__page creator-flow__page--dashboard">
            <CreatorDashboardEmptyScreen
              isActive={activeScreen === 'dashboard' && !isThumbnail}
              onBack={() => setActiveScreen('profile')}
              onJoinProgram={() => setActiveScreen('activity')}
            />
          </div>
          <div className="creator-flow__page creator-flow__page--activity">
            <CreatorActivityDashboardScreen
              onBack={() => setActiveScreen('dashboard')}
            />
          </div>
        </div>
      </PrototypeScreen>
    </div>
  )
}

export default CreatorOnboardingPrototype
