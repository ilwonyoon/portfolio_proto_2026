import { useEffect, useState } from 'react'

type CounterMotionPresetName = 'ios-smooth' | 'ios-spring'

type CounterMotionConfig = {
  durationMs: number
  easing: (progress: number) => number
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

function easeOutCubic(progress: number) {
  const clamped = clamp(progress)
  return 1 - Math.pow(1 - clamped, 3)
}

function springCountProgress(progress: number) {
  const clamped = clamp(progress)
  const accelerated = clamped * clamped * (2.35 - 1.35 * clamped)
  const spring = Math.sin(clamped * Math.PI * 2.7) * (1 - clamped) * 0.035
  return clamp(accelerated + spring)
}

export const counterMotionPresets: Record<
  CounterMotionPresetName,
  CounterMotionConfig
> = {
  'ios-smooth': {
    durationMs: 920,
    easing: easeOutCubic,
  },
  'ios-spring': {
    durationMs: 1180,
    easing: springCountProgress,
  },
}

export function useAnimatedCounter(
  targetValue: number | undefined,
  enabled = true,
  preset: CounterMotionPresetName = 'ios-smooth',
) {
  const safeTarget = targetValue ?? 0
  const [value, setValue] = useState(enabled ? 0 : safeTarget)

  useEffect(() => {
    if (!enabled) {
      setValue(safeTarget)
      return
    }

    const { durationMs, easing } = counterMotionPresets[preset]
    let frameId = 0
    const startedAt = performance.now()
    setValue(0)

    const tick = (now: number) => {
      const progress = clamp((now - startedAt) / durationMs)
      const eased = easing(progress)
      setValue(Math.min(safeTarget, Math.round(eased * safeTarget)))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      } else {
        setValue(safeTarget)
      }
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [enabled, preset, safeTarget])

  return value
}
