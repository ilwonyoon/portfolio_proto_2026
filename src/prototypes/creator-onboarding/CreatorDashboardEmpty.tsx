import { useEffect, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { StatusBar, TopNav, TopTabBar } from '../../system/mobile'

const dashboardAssetRoot = '/assets/figma/creator-dashboard'

type CreatorDashboardEmptyProps = {
  mode?: 'full' | 'thumbnail'
  onBack?: () => void
}

type CreatorDashboardEmptyScreenProps = {
  isActive?: boolean
  onBack?: () => void
  onJoinProgram?: () => void
}

const activitySections = [
  {
    id: 'start',
    iconSrc: `${dashboardAssetRoot}/medal-outline-16.svg`,
    iconWidth: 16,
    iconHeight: 16,
    title: 'Start creating',
    body: 'Share photos, videos, or comments to build your score.',
  },
  {
    id: 'benefits',
    iconSrc: `${dashboardAssetRoot}/star-16.svg`,
    iconWidth: 13.63,
    iconHeight: 13.12,
    title: 'Unlock benefits as your score grows',
    body: 'Earn rewards, sponsorships, and new opportunities.',
    linkLabel: 'Learn more',
  },
  {
    id: 'analytics',
    iconSrc: `${dashboardAssetRoot}/stat-16.svg`,
    iconWidth: 9.5,
    iconHeight: 10.83,
    title: 'Track your content performance',
    body: 'See how people respond to your posts.',
  },
]

function springCountProgress(progress: number) {
  const clamped = Math.min(Math.max(progress, 0), 1)
  const accelerated = clamped * clamped * (2.35 - 1.35 * clamped)
  const spring = Math.sin(clamped * Math.PI * 2.7) * (1 - clamped) * 0.035

  return Math.min(Math.max(accelerated + spring, 0), 1)
}

function useAnimatedCounter(targetValue: number, enabled = true) {
  const [value, setValue] = useState(enabled ? 0 : targetValue)

  useEffect(() => {
    if (!enabled) {
      setValue(targetValue)
      return
    }

    let animationFrame = 0
    const startedAt = performance.now()
    const durationMs = 1180
    setValue(0)

    const tick = (now: number) => {
      const progress = (now - startedAt) / durationMs
      const easedProgress = springCountProgress(progress)

      setValue(Math.min(targetValue, Math.round(easedProgress * targetValue)))

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick)
      } else {
        setValue(targetValue)
      }
    }

    animationFrame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [enabled, targetValue])

  return value
}

function DashboardBackButton({ onBack }: { onBack?: () => void }) {
  return (
    <button
      type="button"
      className="creator-dashboard-back"
      aria-label="Back"
      onClick={onBack}
    >
      <FigmaAsset
        src={`${dashboardAssetRoot}/arrow-left-24.svg`}
        alt=""
        displayWidth={20.5}
        displayHeight={18.87}
        className="creator-dashboard-back__icon"
      />
    </button>
  )
}

function DashboardHero({ isActive }: { isActive: boolean }) {
  const saveCount = useAnimatedCounter(24, isActive)

  return (
    <div className="creator-dashboard-hero" aria-hidden="true">
      <div className="creator-dashboard-hero__image-frame">
        <FigmaAsset
          src={`${dashboardAssetRoot}/hero-image-2x.png`}
          alt=""
          displayWidth={209.14}
          displayHeight={183}
          exportScale={2}
          className="creator-dashboard-hero__image"
        />
        <span className="creator-dashboard-hero__overlay" />
      </div>
      <div className="creator-dashboard-hero__badge">
        <span className="creator-dashboard-hero__scrap-slot">
          <FigmaAsset
            src={`${dashboardAssetRoot}/scrap-filled-16.svg`}
            alt=""
            displayWidth={10.67}
            displayHeight={12.93}
          />
        </span>
        <span>{saveCount}</span>
      </div>
    </div>
  )
}

function DashboardActivitySection({
  body,
  iconHeight,
  iconSrc,
  iconWidth,
  linkLabel,
  title,
}: (typeof activitySections)[number]) {
  return (
    <section className="creator-dashboard-section">
      <div className="creator-dashboard-section__heading">
        <span className="creator-dashboard-section__icon-slot" aria-hidden="true">
          <FigmaAsset
            src={iconSrc}
            alt=""
            displayWidth={iconWidth}
            displayHeight={iconHeight}
          />
        </span>
        <h3>{title}</h3>
      </div>
      <div className="creator-dashboard-section__body">
        <p>{body}</p>
        {linkLabel ? (
          <button type="button" className="creator-dashboard-section__link">
            <span>{linkLabel}</span>
            <FigmaAsset
              src={`${dashboardAssetRoot}/chevron-right-12.svg`}
              alt=""
              displayWidth={5.95}
              displayHeight={10.09}
            />
          </button>
        ) : null}
      </div>
    </section>
  )
}

export function CreatorDashboardEmptyScreen({
  isActive = true,
  onBack,
  onJoinProgram,
}: CreatorDashboardEmptyScreenProps) {
  return (
    <div
      className={
        isActive
          ? 'creator-dashboard__screen creator-dashboard__screen--active'
          : 'creator-dashboard__screen'
      }
    >
      <div className="creator-dashboard__top">
        <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
        <TopNav
          className="creator-dashboard-nav"
          leading={<DashboardBackButton onBack={onBack} />}
          center={<h1>Creator dashboard</h1>}
        />
        <TopTabBar
          className="creator-dashboard-tabs"
          tabs={[
            { id: 'activity', label: 'Activity' },
            { id: 'program', label: 'Program' },
          ]}
          activeTabId="activity"
        />
      </div>

      <main className="creator-dashboard__content">
        <DashboardHero isActive={isActive} />
        <h2>Share your first photo and start creating</h2>
        <div className="creator-dashboard__sections">
          {activitySections.map((section) => (
            <DashboardActivitySection key={section.id} {...section} />
          ))}
        </div>
        <button
          type="button"
          className="creator-dashboard__cta"
          onClick={onJoinProgram}
        >
          Join program
        </button>
        <p className="creator-dashboard__footnote">
          *Today&apos;s analytics will be available tomorrow.
        </p>
      </main>
    </div>
  )
}

export function CreatorDashboardEmpty({
  mode = 'full',
  onBack,
}: CreatorDashboardEmptyProps) {
  const isThumbnail = mode === 'thumbnail'

  return (
    <div
      className={
        isThumbnail
          ? 'creator-dashboard creator-dashboard--thumbnail'
          : 'creator-dashboard creator-dashboard--full'
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <CreatorDashboardEmptyScreen isActive={!isThumbnail} onBack={onBack} />
      </PrototypeScreen>
    </div>
  )
}
