import { useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { StatusBar, TopNav, TopTabBar } from '../../system/mobile'
import { useBottomSheetPresence } from '../../system/overlays/useBottomSheetPresence'

const dashboardAssetRoot = '/assets/figma/creator-dashboard'

type MetricTrend = {
  label?: string
  direction?: 'up' | 'down'
}

type DashboardMetric = {
  id: string
  label: string
  value: string
  trend?: MetricTrend
  wide?: boolean
}

type SearchTerm = {
  rank: number
  term: string
  count: string
}

type CreatorActivityDashboardScreenProps = {
  onBack?: () => void
}

const initialMetrics: DashboardMetric[] = [
  { id: 'views', label: 'Views', value: '0', trend: { label: '-' } },
  { id: 'saves', label: 'Saves', value: '0', trend: { label: '-' } },
  { id: 'likes', label: 'Likes', value: '0', trend: { label: '-' } },
  { id: 'product-clicks', label: 'Product clicks', value: '0', trend: { label: '-' } },
  { id: 'comments', label: 'Comments', value: '0', trend: { label: '-' }, wide: true },
]

const initialSearchTerms: SearchTerm[] = [
  { rank: 1, term: 'Home dining', count: '0' },
  { rank: 2, term: 'Storage ideas', count: '0' },
  { rank: 3, term: 'Home decor', count: '0' },
  { rank: 4, term: 'Living room ideas', count: '0' },
]

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

function MetricTrendBadge({ trend }: { trend?: MetricTrend }) {
  if (!trend?.label || trend.label === '-') {
    return <span className="creator-activity-metric__trend creator-activity-metric__trend--empty">-</span>
  }

  return (
    <span className="creator-activity-metric__trend">
      {trend.label}
      {trend.direction ? (
        <FigmaAsset
          src={`${dashboardAssetRoot}/${trend.direction === 'up' ? 'trend-up-8.svg' : 'trend-down-8.svg'}`}
          alt=""
          displayWidth={8}
          displayHeight={6.86}
          className="creator-activity-metric__trend-icon"
        />
      ) : null}
    </span>
  )
}

function DashboardMetricCard({ label, trend, value, wide }: DashboardMetric) {
  return (
    <article
      className={
        wide
          ? 'creator-activity-metric creator-activity-metric--wide'
          : 'creator-activity-metric'
      }
    >
      <p className="creator-activity-metric__label">{label}</p>
      <div className="creator-activity-metric__value-row">
        <p className="creator-activity-metric__value">{value}</p>
        <MetricTrendBadge trend={trend} />
      </div>
    </article>
  )
}

function ActivityScorePanel({ onOpenInfo }: { onOpenInfo: () => void }) {
  return (
    <section className="creator-activity-score" aria-label="Creator score">
      <div className="creator-activity-score__main">
        <div className="creator-activity-score__copy">
          <button
            type="button"
            className="creator-activity-score__title-row"
            aria-label="Learn about Creator score"
            onClick={onOpenInfo}
          >
            <h2>Creator score</h2>
            <span className="creator-activity-score__info" aria-hidden="true">
              <FigmaAsset
                src={`${dashboardAssetRoot}/info-16.svg`}
                alt=""
                displayWidth={13.33}
                displayHeight={13.33}
              />
            </span>
          </button>
          <p>Start posting to build your score.</p>
        </div>
        <button
          type="button"
          className="creator-activity-score__value"
          aria-label="Learn about Creator score"
          onClick={onOpenInfo}
        >
          <FigmaAsset
            src={`${dashboardAssetRoot}/score-level.gif`}
            alt=""
            displayWidth={40}
            displayHeight={40}
            className="creator-activity-score__badge"
          />
          <span>0</span>
          <FigmaAsset
            src={`${dashboardAssetRoot}/chevron-right-16.svg`}
            alt=""
            displayWidth={7.91}
            displayHeight={13.35}
            className="creator-activity-score__chevron"
          />
        </button>
      </div>
      <div className="creator-activity-score__progress">
        <div className="creator-activity-score__track">
          <span className="creator-activity-score__bar" />
        </div>
        <div className="creator-activity-score__scale" aria-hidden="true">
          <span>0</span>
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>1000</span>
        </div>
      </div>
    </section>
  )
}

function CreatorScoreBottomSheet({
  open,
  onClose,
}: {
  open: boolean
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
          ? 'ds-feed-product-sheet ds-feed-product-sheet--visible creator-score-sheet'
          : 'ds-feed-product-sheet creator-score-sheet'
      }
      role="dialog"
      aria-modal="true"
      aria-label="What is Creator score?"
    >
      <button
        type="button"
        className="ds-feed-product-sheet__dim"
        aria-label="Close Creator score information"
        onClick={onClose}
      />

      <section className="ds-feed-product-sheet__panel creator-score-sheet__panel">
        <div className="ds-feed-product-sheet__header creator-score-sheet__header">
          <div className="ds-feed-product-sheet__handle" />

          <div className="ds-feed-product-sheet__nav creator-score-sheet__nav">
            <div className="ds-feed-product-sheet__nav-spacer" />
            <h2 className="ds-feed-product-sheet__title">What is Creator score?</h2>
            <button
              type="button"
              className="ds-feed-product-sheet__dismiss"
              aria-label="Close Creator score information"
              onClick={onClose}
            >
              <FigmaAsset
                src="/assets/figma/personalized-feed/view-more/dismiss-18.svg"
                alt=""
                displayWidth={14.739}
                displayHeight={14.739}
              />
            </button>
          </div>
        </div>

        <div className="creator-score-sheet__content">
          <div className="creator-score-sheet__badge-wrap">
            <FigmaAsset
              src={`${dashboardAssetRoot}/score-level.gif`}
              alt=""
              displayWidth={80}
              displayHeight={80}
              className="creator-score-sheet__badge"
            />
          </div>

          <ul className="creator-score-sheet__list">
            <li>
              Your Creator score is based on how your posts perform, including
              views, likes, saves, and comments. It can go up or down with your
              monthly activity.
            </li>
            <li>
              As your score grows, you may qualify for special Ohouse creator
              programs. Score requirements can vary by program availability.
            </li>
          </ul>

          <button type="button" className="creator-score-sheet__learn-more">
            <span>Learn more</span>
            <FigmaAsset
              src={`${dashboardAssetRoot}/chevron-right-16.svg`}
              alt=""
              displayWidth={6.8}
              displayHeight={11.5}
            />
          </button>
        </div>

        <div className="creator-score-sheet__home-indicator" aria-hidden="true">
          <span />
        </div>
      </section>
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow?: string
  title: string
}) {
  return (
    <div className="creator-activity-section-header">
      <h2>{title}</h2>
      {eyebrow ? <p>{eyebrow}</p> : null}
    </div>
  )
}

function InsightsSection() {
  return (
    <section className="creator-activity-insights" aria-label="Last 30 days">
      <SectionHeader title="Last 30 days" eyebrow="-" />
      <div className="creator-activity-metric-grid">
        {initialMetrics.map((metric) => (
          <DashboardMetricCard key={metric.id} {...metric} />
        ))}
      </div>
    </section>
  )
}

function SearchTermsSection() {
  return (
    <section className="creator-activity-search" aria-label="Top search terms">
      <SectionHeader title="Top search terms" />
      <div className="creator-activity-search-card">
        {initialSearchTerms.map((item) => (
          <div className="creator-activity-search-row" key={item.rank}>
            <span className="creator-activity-search-row__rank">{item.rank}</span>
            <span className="creator-activity-search-row__term">{item.term}</span>
            <span className="creator-activity-search-row__count">{item.count}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function CreatorActivityDashboardScreen({
  onBack,
}: CreatorActivityDashboardScreenProps) {
  const [isScoreSheetOpen, setIsScoreSheetOpen] = useState(false)

  return (
    <div className="creator-activity__screen">
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
      <main className="creator-activity__content">
        <ActivityScorePanel onOpenInfo={() => setIsScoreSheetOpen(true)} />
        <InsightsSection />
        <SearchTermsSection />
      </main>
      <CreatorScoreBottomSheet
        open={isScoreSheetOpen}
        onClose={() => setIsScoreSheetOpen(false)}
      />
    </div>
  )
}
