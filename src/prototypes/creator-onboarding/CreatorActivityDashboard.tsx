import { useRef, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { useAnimatedCounter } from '../../system/interactions'
import { StatusBar, TopNav, TopTabBar } from '../../system/mobile'
import { useInertialScroll } from '../../system/mobile/useInertialScroll'
import { BottomSheet } from '../../system/overlays'

const dashboardAssetRoot = '/assets/figma/creator-dashboard'

type MetricTrend = {
  label?: string
  direction?: 'up' | 'down'
}

type DashboardMetric = {
  id: string
  label: string
  value: string
  animatedValue?: number
  valueFormatter?: (value: number) => string
  trend?: MetricTrend
  wide?: boolean
}

type SearchTerm = {
  rank: number
  term: string
  count: string
}

type PopularStat = {
  icon: 'views' | 'scrap' | 'heart' | 'tag' | 'comment'
  label: string
}

type PopularContent = {
  id: string
  thumbnailSrc: string
  thumbnailBadge?: 'datalist' | 'play'
  title: string
  eyebrow: string
  stats: PopularStat[]
}

type CreatorActivityDashboardData = {
  title?: string
  scoreTitle: string
  scoreSubtitle: string
  scoreValue: number
  scoreProgressMax?: number
  insightsTitle: string
  insightsPeriod: string
  metrics: DashboardMetric[]
  searchTerms?: SearchTerm[]
  popularItems?: PopularContent[]
}

type CreatorActivityDashboardScreenProps = {
  onBack?: () => void
  data?: CreatorActivityDashboardData
  isActive?: boolean
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

const initialDashboardData: CreatorActivityDashboardData = {
  scoreTitle: 'Creator score',
  scoreSubtitle: 'Start posting to build your score.',
  scoreValue: 0,
  insightsTitle: 'Last 30 days',
  insightsPeriod: '-',
  metrics: initialMetrics,
  searchTerms: initialSearchTerms,
  title: 'Creator dashboard',
}

export const populatedCreatorDashboardData: CreatorActivityDashboardData = {
  scoreTitle: 'Creator Index',
  scoreSubtitle: 'Increased by 35 points',
  scoreValue: 482,
  insightsTitle: 'Insights',
  insightsPeriod: 'Last week',
  metrics: [
    {
      id: 'views',
      label: 'Views',
      value: '2,486',
      animatedValue: 2486,
      valueFormatter: formatInteger,
      trend: { label: '612', direction: 'up' },
    },
    {
      id: 'saved',
      label: 'Saved',
      value: '164',
      animatedValue: 164,
      valueFormatter: formatInteger,
      trend: { label: '28', direction: 'up' },
    },
    {
      id: 'likes',
      label: 'Likes',
      value: '73',
      animatedValue: 73,
      valueFormatter: formatInteger,
      trend: { label: '14', direction: 'up' },
    },
    {
      id: 'product-clicks',
      label: 'Product Clicks',
      value: '96',
      animatedValue: 96,
      valueFormatter: formatInteger,
      trend: { label: '19', direction: 'up' },
    },
    {
      id: 'comments',
      label: 'Comments',
      value: '11',
      animatedValue: 11,
      valueFormatter: formatInteger,
      trend: { label: '3', direction: 'up' },
      wide: true,
    },
  ],
  popularItems: [
    {
      id: 'storage-cabinet',
      thumbnailSrc: `${dashboardAssetRoot}/popular-01-2x.png`,
      thumbnailBadge: 'datalist',
      eyebrow: 'Trending Up',
      title: 'The views increased by 24 times compared to yesterday!',
      stats: [
        { icon: 'views', label: '1.5K' },
        { icon: 'scrap', label: '34' },
        { icon: 'heart', label: '22' },
        { icon: 'tag', label: '3' },
        { icon: 'comment', label: '4' },
      ],
    },
    {
      id: 'green-living-room',
      thumbnailSrc: `${dashboardAssetRoot}/popular-02-2x.png`,
      thumbnailBadge: 'play',
      eyebrow: 'Trending Up',
      title: 'The views increased by 24 times compared to yesterday!',
      stats: [
        { icon: 'views', label: '684' },
        { icon: 'scrap', label: '18' },
        { icon: 'heart', label: '11' },
        { icon: 'tag', label: '2' },
        { icon: 'comment', label: '2' },
      ],
    },
    {
      id: 'plant-corner',
      thumbnailSrc: `${dashboardAssetRoot}/popular-03-2x.png`,
      eyebrow: 'Trending Up',
      title: 'The views increased by 24 times compared to yesterday!',
      stats: [
        { icon: 'views', label: '426' },
        { icon: 'scrap', label: '12' },
        { icon: 'heart', label: '7' },
        { icon: 'tag', label: '1' },
        { icon: 'comment', label: '1' },
      ],
    },
  ],
  searchTerms: [
    { rank: 1, term: 'Cat-friendly cleaning', count: '328' },
    { rank: 2, term: 'Small-space storage', count: '214' },
    { rank: 3, term: 'Home cafe table', count: '162' },
    { rank: 4, term: 'White bedding ideas', count: '97' },
  ],
  title: 'Dashboard',
}

function formatInteger(value: number) {
  return Math.round(value).toLocaleString('en-US')
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

function MetricTrendBadge({ trend }: { trend?: MetricTrend }) {
  if (!trend?.label || trend.label === '-' || trend.label === '--') {
    return <span className="creator-activity-metric__trend creator-activity-metric__trend--empty">-</span>
  }

  return (
    <span
      className={
        trend.direction === 'down'
          ? 'creator-activity-metric__trend creator-activity-metric__trend--down'
          : 'creator-activity-metric__trend'
      }
    >
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

function DashboardMetricCard({
  animatedValue,
  isActive,
  label,
  trend,
  value,
  valueFormatter,
  wide,
}: DashboardMetric & { isActive: boolean }) {
  const counterValue = useAnimatedCounter(animatedValue, isActive)
  const displayValue =
    animatedValue === undefined
      ? value
      : (valueFormatter ?? formatInteger)(counterValue)

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
        <p className="creator-activity-metric__value">{displayValue}</p>
        <MetricTrendBadge trend={trend} />
      </div>
    </article>
  )
}

function ActivityScorePanel({
  isActive,
  onOpenInfo,
  scoreSubtitle,
  scoreTitle,
  scoreValue,
  scoreProgressMax = 1000,
}: {
  isActive: boolean
  onOpenInfo: () => void
  scoreSubtitle: string
  scoreTitle: string
  scoreValue: number
  scoreProgressMax?: number
}) {
  const animatedProgress = useAnimatedCounter(scoreValue, isActive)
  const scoreDisplay = formatInteger(scoreValue)
  const progressWidth = `${Math.min(animatedProgress / scoreProgressMax, 1) * 100}%`

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
            <h2>{scoreTitle}</h2>
            <span className="creator-activity-score__info" aria-hidden="true">
              <FigmaAsset
                src={`${dashboardAssetRoot}/info-16.svg`}
                alt=""
                displayWidth={13.33}
                displayHeight={13.33}
              />
            </span>
          </button>
          <p>{scoreSubtitle}</p>
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
          <span>{scoreDisplay}</span>
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
          <span
            className="creator-activity-score__bar"
            style={{ width: progressWidth }}
          />
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
  return (
    <BottomSheet
      open={open}
      ariaLabel="What is Creator score?"
      closeLabel="Close Creator score information"
      onClose={onClose}
      className="creator-score-sheet"
      dimClassName="ds-feed-product-sheet__dim"
      panelClassName="ds-feed-product-sheet__panel creator-score-sheet__panel"
    >
        <div className="ds-feed-product-sheet__header creator-score-sheet__header">
          <div className="ds-bottom-sheet__handle ds-feed-product-sheet__handle" />

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
    </BottomSheet>
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

function InsightsSection({
  isActive,
  metrics,
  period,
  title,
}: {
  isActive: boolean
  metrics: DashboardMetric[]
  period: string
  title: string
}) {
  return (
    <section className="creator-activity-insights" aria-label={title}>
      <SectionHeader title={title} eyebrow={period} />
      <div className="creator-activity-metric-grid">
        {metrics.map((metric) => (
          <DashboardMetricCard key={metric.id} {...metric} isActive={isActive} />
        ))}
      </div>
    </section>
  )
}

function SearchTermsSection({ items }: { items: SearchTerm[] }) {
  return (
    <section className="creator-activity-search" aria-label="Top search terms">
      <SectionHeader title="Top search terms" />
      <div className="creator-activity-search-card">
        {items.map((item) => (
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

function PopularBadge({ type }: { type: NonNullable<PopularContent['thumbnailBadge']> }) {
  const iconSize =
    type === 'play'
      ? { height: 8.13, width: 7.53 }
      : { height: 12, width: 12 }

  return (
    <span className="creator-popular-card__badge-slot" aria-hidden="true">
      <FigmaAsset
        src={`${dashboardAssetRoot}/${type === 'play' ? 'play-12.svg' : 'datalist-12.svg'}`}
        alt=""
        displayWidth={iconSize.width}
        displayHeight={iconSize.height}
        className="creator-popular-card__badge"
      />
    </span>
  )
}

function PopularStatIcon({ icon }: { icon: PopularStat['icon'] }) {
  const iconMap: Record<
    PopularStat['icon'],
    {
      file: string
      height: number
      width: number
    }
  > = {
    comment: { file: 'comment-16.svg', height: 13, width: 13 },
    heart: { file: 'heart-16.svg', height: 14, width: 14 },
    scrap: { file: 'scrap-16.svg', height: 13, width: 11 },
    tag: { file: 'tag-16.svg', height: 13, width: 13 },
    views: { file: 'views-16.svg', height: 11, width: 10 },
  }
  const iconAsset = iconMap[icon]

  return (
    <span className="creator-popular-card__stat-icon-slot" aria-hidden="true">
      <FigmaAsset
        src={`${dashboardAssetRoot}/${iconAsset.file}`}
        alt=""
        displayWidth={iconAsset.width}
        displayHeight={iconAsset.height}
        className="creator-popular-card__stat-icon"
      />
    </span>
  )
}

function RecentlyPopularSection({ items }: { items: PopularContent[] }) {
  return (
    <section className="creator-popular" aria-label="Recently Popular">
      <SectionHeader title="Recently Popular" eyebrow="Last week" />
      <div className="creator-popular__carousel">
        {items.map((item) => (
          <article className="creator-popular-card" key={item.id}>
            <div className="creator-popular-card__top">
              <div className="creator-popular-card__media">
                <FigmaAsset
                  src={item.thumbnailSrc}
                  alt=""
                  displayWidth={52}
                  displayHeight={65}
                  exportScale={2}
                  className="creator-popular-card__image"
                />
                {item.thumbnailBadge ? <PopularBadge type={item.thumbnailBadge} /> : null}
              </div>
              <div className="creator-popular-card__copy">
                <p className="creator-popular-card__eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
              </div>
              <FigmaAsset
                src={`${dashboardAssetRoot}/chevron-right-12.svg`}
                alt=""
                displayWidth={6}
                displayHeight={10}
                className="creator-popular-card__chevron"
              />
            </div>
            <div className="creator-popular-card__divider" />
            <div className="creator-popular-card__stats">
              {item.stats.map((stat) => (
                <span className="creator-popular-card__stat" key={`${item.id}-${stat.icon}`}>
                  <PopularStatIcon icon={stat.icon} />
                  <span>{stat.label}</span>
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function CreatorActivityDashboardScreen({
  data = initialDashboardData,
  isActive = true,
  onBack,
}: CreatorActivityDashboardScreenProps) {
  const [isScoreSheetOpen, setIsScoreSheetOpen] = useState(false)
  const contentRef = useRef<HTMLElement | null>(null)

  useInertialScroll(contentRef, {
    enabled: isActive,
    preset: 'ios-dashboard',
  })

  return (
    <div className="creator-activity__screen">
      <div className="creator-dashboard__top">
        <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
        <TopNav
          className="creator-dashboard-nav"
          leading={<DashboardBackButton onBack={onBack} />}
          center={<h1>{data.title ?? 'Creator dashboard'}</h1>}
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
      <main
        ref={contentRef}
        className="creator-activity__content prototype-screen__scroll-region"
        data-inertial-scroll={isActive ? 'true' : undefined}
      >
        <ActivityScorePanel
          isActive={isActive}
          onOpenInfo={() => setIsScoreSheetOpen(true)}
          scoreProgressMax={data.scoreProgressMax}
          scoreSubtitle={data.scoreSubtitle}
          scoreTitle={data.scoreTitle}
          scoreValue={data.scoreValue}
        />
        <InsightsSection
          isActive={isActive}
          metrics={data.metrics}
          period={data.insightsPeriod}
          title={data.insightsTitle}
        />
        {data.popularItems?.length ? <RecentlyPopularSection items={data.popularItems} /> : null}
        {data.searchTerms?.length ? <SearchTermsSection items={data.searchTerms} /> : null}
      </main>
      <CreatorScoreBottomSheet
        open={isScoreSheetOpen}
        onClose={() => setIsScoreSheetOpen(false)}
      />
    </div>
  )
}
