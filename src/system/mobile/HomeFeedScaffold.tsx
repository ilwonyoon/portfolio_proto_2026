import type { ReactNode } from 'react'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { BottomNavBar } from './BottomNavBar'
import type { BottomNavBarProps } from './BottomNavBar'
import { HomeSearchNav } from './HomeSearchNav'
import type { HomeSearchNavProps } from './HomeSearchNav'
import { StatusBar } from './StatusBar'

type HomeFeedScaffoldProps = {
  mode?: 'full' | 'thumbnail'
  className?: string
  statusBarLevelsSrc: string
  searchNav: HomeSearchNavProps
  bottomNav: BottomNavBarProps
  topTabs?: ReactNode
  shortcuts?: ReactNode
  content?: ReactNode
  floatingActionButton?: ReactNode
  overlay?: ReactNode
}

export function HomeFeedScaffold({
  mode = 'full',
  className,
  statusBarLevelsSrc,
  searchNav,
  bottomNav,
  topTabs,
  shortcuts,
  content,
  floatingActionButton,
  overlay,
}: HomeFeedScaffoldProps) {
  const isThumbnail = mode === 'thumbnail'

  return (
    <div
      className={
        isThumbnail
          ? `ds-home-feed-shell ds-home-feed-shell--thumbnail ${className ?? ''}`.trim()
          : `ds-home-feed-shell ds-home-feed-shell--full ${className ?? ''}`.trim()
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <div className="ds-home-feed-shell__screen">
          <div className="ds-home-feed-shell__top">
            <StatusBar levelsSrc={statusBarLevelsSrc} />
            <HomeSearchNav {...searchNav} />
            {topTabs}
          </div>

          <div className="ds-home-feed-shell__body">
            <div className="ds-home-feed-shell__main prototype-screen__scroll-region">
              {shortcuts ? (
                <div className="ds-home-feed-shell__shortcuts">{shortcuts}</div>
              ) : null}
              {content ? (
                <div className="ds-home-feed-shell__content">{content}</div>
              ) : null}
            </div>
            {floatingActionButton}
          </div>

          <BottomNavBar {...bottomNav} />
          {overlay}
        </div>
      </PrototypeScreen>
    </div>
  )
}
