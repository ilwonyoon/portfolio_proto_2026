import { useEffect, useRef, useState, type ReactNode } from 'react'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { BottomNavBar } from './BottomNavBar'
import type { BottomNavBarProps } from './BottomNavBar'
import { HomeSearchNav } from './HomeSearchNav'
import type { HomeSearchNavProps } from './HomeSearchNav'
import { StatusBar } from './StatusBar'
import { useInertialScroll } from './useInertialScroll'
import type { ScrollPhysicsPresetName } from '../interactions'

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
  hideFloatingActionButtonOnScroll?: boolean
  inertialScroll?: boolean
  inertialScrollPreset?: ScrollPhysicsPresetName
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
  hideFloatingActionButtonOnScroll = false,
  inertialScroll = false,
  inertialScrollPreset = 'ios-feed',
  overlay,
}: HomeFeedScaffoldProps) {
  const isThumbnail = mode === 'thumbnail'
  const mainRef = useRef<HTMLDivElement | null>(null)
  const lastScrollTopRef = useRef(0)
  const [isFloatingActionButtonVisible, setIsFloatingActionButtonVisible] =
    useState(true)

  useInertialScroll(mainRef, {
    enabled: inertialScroll && !isThumbnail,
    preset: inertialScrollPreset,
  })

  useEffect(() => {
    const container = mainRef.current

    if (!hideFloatingActionButtonOnScroll || isThumbnail || !container) {
      setIsFloatingActionButtonVisible(true)
      return
    }

    let frameId = 0
    lastScrollTopRef.current = container.scrollTop

    const updateVisibility = () => {
      const currentScrollTop = container.scrollTop
      const delta = currentScrollTop - lastScrollTopRef.current

      if (currentScrollTop <= 8) {
        setIsFloatingActionButtonVisible(true)
        lastScrollTopRef.current = currentScrollTop
        frameId = 0
        return
      }

      if (Math.abs(delta) >= 4) {
        setIsFloatingActionButtonVisible(delta < 0)
        lastScrollTopRef.current = currentScrollTop
      }

      frameId = 0
    }

    const handleScroll = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updateVisibility)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      container.removeEventListener('scroll', handleScroll)
    }
  }, [hideFloatingActionButtonOnScroll, isThumbnail])

  const bodyClassName =
    hideFloatingActionButtonOnScroll && !isFloatingActionButtonVisible
      ? 'ds-home-feed-shell__body ds-home-feed-shell__body--fab-hidden'
      : 'ds-home-feed-shell__body'

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

          <div className={bodyClassName}>
            <div
              ref={mainRef}
              className="ds-home-feed-shell__main prototype-screen__scroll-region"
              data-inertial-scroll={inertialScroll && !isThumbnail ? 'true' : undefined}
            >
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
