// Adds iOS-style inertial wheel scrolling to a scrollable container.
//
// Gotchas observed in this project:
// - The container element MUST be the actual `overflow-y: auto` scroller.
//   If you point the ref at a wrapper that doesn't itself scroll, the wheel
//   listener attaches but native scroll happens on a different element and
//   the inertia animation never runs.
// - Apply the `prototype-screen__scroll-region` class on the same node you
//   pass via `ref`. Without it some bottom-sheet / push-page wrappers swallow
//   the wheel event before it reaches this hook's listener (in particular
//   inside `<BottomSheet>` panels which set `overflow: hidden` on the
//   wrapping panel — the inner body needs an explicit native-scroll style).
// - Set `enabled` to the screen's "active" / sheet's "open" flag. The hook
//   only attaches the wheel listener while enabled, so toggling this prop
//   when the surface is hidden avoids stale listeners and lets the listener
//   re-bind after the sheet animates in.
// - The listener uses `{ passive: false }` because it calls
//   `event.preventDefault()`. If a parent registers its own
//   `{ passive: true }` wheel handler that calls `stopPropagation`, this
//   hook will silently no-op. Keep parents passive-friendly or attach this
//   hook on the same node.
// - Skips entirely when `prefers-reduced-motion: reduce` is on (system
//   accessibility setting). That's intentional, not a bug — verify the OS
//   setting before debugging missing inertia.
import { useEffect, type RefObject } from 'react'
import {
  resolveScrollPhysicsConfig,
  type ScrollPhysicsPresetName,
} from '../interactions'

type InertialScrollOptions = {
  enabled?: boolean
  preset?: ScrollPhysicsPresetName
  friction?: number
  maxVelocity?: number
  minVelocity?: number
  wheelGain?: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function normalizeWheelDelta(event: WheelEvent, container: HTMLElement) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * container.clientHeight
  }

  return event.deltaY
}

function shouldAllowNativeWheel(event: WheelEvent) {
  if (event.ctrlKey || event.metaKey) {
    return true
  }

  return Math.abs(event.deltaX) > Math.abs(event.deltaY)
}

export function useInertialScroll(
  scrollRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    preset = 'ios-feed',
    friction,
    maxVelocity,
    minVelocity,
    wheelGain,
  }: InertialScrollOptions = {},
) {
  const resolvedConfig = resolveScrollPhysicsConfig(preset, {
    friction,
    maxVelocity,
    minVelocity,
    wheelGain,
  })
  const {
    friction: resolvedFriction,
    maxVelocity: resolvedMaxVelocity,
    minVelocity: resolvedMinVelocity,
    wheelGain: resolvedWheelGain,
  } = resolvedConfig

  useEffect(() => {
    const container = scrollRef.current

    if (!enabled || !container) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let frameId = 0
    let lastFrameAt = 0
    let velocity = 0

    const stop = () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
        frameId = 0
      }

      lastFrameAt = 0
      velocity = 0
    }

    const animate = (now: number) => {
      const delta = lastFrameAt === 0 ? 16.67 : Math.min(now - lastFrameAt, 40)
      lastFrameAt = now

      const maxScrollTop = container.scrollHeight - container.clientHeight
      const currentScrollTop = container.scrollTop
      const nextScrollTop = clamp(
        currentScrollTop + velocity * (delta / 16.67),
        0,
        maxScrollTop,
      )

      container.scrollTop = nextScrollTop

      const hitBoundary =
        (nextScrollTop <= 0 && velocity < 0) ||
        (nextScrollTop >= maxScrollTop && velocity > 0)

      if (hitBoundary) {
        stop()
        return
      }

      velocity *= Math.pow(resolvedFriction, delta / 16.67)

      if (Math.abs(velocity) <= resolvedMinVelocity) {
        stop()
        return
      }

      frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(animate)
    }

    const handleWheel = (event: WheelEvent) => {
      if (shouldAllowNativeWheel(event)) {
        return
      }

      const deltaY = normalizeWheelDelta(event, container)

      event.preventDefault()
      velocity = clamp(
        velocity + deltaY * resolvedWheelGain,
        -resolvedMaxVelocity,
        resolvedMaxVelocity,
      )

      start()
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('pointerdown', stop)

    return () => {
      stop()
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('pointerdown', stop)
    }
  }, [
    enabled,
    resolvedFriction,
    resolvedMaxVelocity,
    resolvedMinVelocity,
    resolvedWheelGain,
    scrollRef,
  ])
}
