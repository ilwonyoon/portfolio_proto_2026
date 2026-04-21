import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { StatusBar, TopNav, TopTabBar } from '../../system/mobile'
import '../creator-onboarding/creator-onboarding.css'
import './creator-program-dashboard.css'

type CreatorProgramDashboardPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type RewardItem = {
  id: string
  amount: string
  period: string
  label: string
}

type ProgramItem = {
  id: string
  title: string
  description: string
  requirement?: string
  locked?: boolean
}

const dashboardAssetRoot = '/assets/figma/creator-dashboard'

const rewardItems: RewardItem[] = [
  {
    id: 'monetization',
    amount: '56,000 P',
    period: 'March 1 - March 30',
    label: 'Monetization',
  },
  {
    id: 'curator',
    amount: '9,000 won',
    period: 'March 1 - March 31',
    label: 'Curator',
  },
]

const programItems: ProgramItem[] = [
  {
    id: 'challenge',
    title: 'Challenge',
    description: 'Post with recommended topics and earn points.',
  },
  {
    id: 'product-curator',
    title: 'Product Curator',
    description: 'Share product picks on social and earn rewards.',
  },
  {
    id: 'content-monetization',
    title: 'Content Monetization',
    description: 'Earn from content that helps people discover products.',
    requirement: 'Over 250 points',
  },
  {
    id: 'ohouse-pro-review',
    title: 'Ohouse Pro Review',
    description: 'Get invited to review products as your score grows.',
    requirement: 'Over 250 points',
  },
  {
    id: 'creator-networks',
    title: 'Creator Networks',
    description: 'Connect with creators and grow together.',
    requirement: 'Over 250 points',
  },
  {
    id: 'pro-reviewer',
    title: 'Pro Reviewer',
    description: 'Unlock advanced review opportunities.',
    requirement: 'Over 500 points',
    locked: true,
  },
  {
    id: 'special-creator',
    title: 'Special Creator Program',
    description: 'Access special benefits for representative creators.',
    requirement: 'Over 500 points',
    locked: true,
  },
]

function DashboardBackButton() {
  return (
    <button type="button" className="creator-dashboard-back" aria-label="Back">
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

function ProgramDashboardTop() {
  return (
    <div className="creator-dashboard__top">
      <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
      <TopNav
        className="creator-dashboard-nav"
        leading={<DashboardBackButton />}
        center={<h1>Dashboard</h1>}
      />
      <TopTabBar
        className="creator-dashboard-tabs"
        tabs={[
          { id: 'activity', label: 'Activity' },
          { id: 'program', label: 'Program' },
        ]}
        activeTabId="program"
      />
    </div>
  )
}

function RewardRow({ amount, label, period }: RewardItem) {
  return (
    <div className="creator-program-reward-row">
      <div className="creator-program-reward-row__main">
        <span className="creator-program-reward-row__amount">{amount}</span>
        <span className="creator-program-badge">{period}</span>
      </div>
      <span className="creator-program-reward-row__label">{label}</span>
    </div>
  )
}

function ProgramRow({ description, locked, requirement, title }: ProgramItem) {
  return (
    <button type="button" className="creator-program-row">
      <div className="creator-program-row__copy">
        <div className="creator-program-row__title-line">
          {locked ? (
            <FigmaAsset
              src={`${dashboardAssetRoot}/lock-16.svg`}
              alt=""
              displayWidth={11.33}
              displayHeight={12.33}
              className="creator-program-row__lock"
            />
          ) : null}
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>
      <div className="creator-program-row__meta">
        {requirement ? (
          <span className="creator-program-badge creator-program-badge--requirement">
            {requirement}
          </span>
        ) : null}
        <FigmaAsset
          src={`${dashboardAssetRoot}/chevron-right-12.svg`}
          alt=""
          displayWidth={6}
          displayHeight={10}
          className="creator-program-row__chevron"
        />
      </div>
    </button>
  )
}

function CreatorProgramDashboardScreen() {
  return (
    <div className="creator-dashboard__screen creator-program-dashboard__screen">
      <ProgramDashboardTop />

      <main className="creator-program-dashboard__content">
        <section className="creator-program-summary" aria-label="Expected rewards">
          <div className="creator-program-summary__headline">
            <h2>65,000 P</h2>
            <p>Expected rewards for December</p>
          </div>
          <div className="creator-program-summary__divider" />
          <div className="creator-program-summary__rewards">
            {rewardItems.map((item) => (
              <RewardRow key={item.id} {...item} />
            ))}
          </div>
        </section>

        <div className="creator-program-group-divider" aria-hidden="true" />

        <section className="creator-program-list" aria-label="Participating Programs">
          <h2>Participating Programs</h2>
          <div className="creator-program-list__rows">
            {programItems.map((item) => (
              <ProgramRow key={item.id} {...item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function CreatorProgramDashboardPrototype({
  mode = 'full',
}: CreatorProgramDashboardPrototypeProps) {
  const isThumbnail = mode === 'thumbnail'

  return (
    <div
      className={
        isThumbnail
          ? 'creator-program-dashboard creator-program-dashboard--thumbnail'
          : 'creator-program-dashboard creator-program-dashboard--full'
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <CreatorProgramDashboardScreen />
      </PrototypeScreen>
    </div>
  )
}

export default CreatorProgramDashboardPrototype
