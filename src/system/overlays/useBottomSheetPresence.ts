import { useEffect, useRef, useState } from 'react'

export function useBottomSheetPresence(open: boolean, exitDurationMs = 420) {
  const [isMounted, setIsMounted] = useState(open)
  const [isVisible, setIsVisible] = useState(open)
  const firstEffectRef = useRef(true)
  const frameRefs = useRef<number[]>([])
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    function cancelScheduledWork() {
      frameRefs.current.forEach((frameId) => window.cancelAnimationFrame(frameId))
      frameRefs.current = []

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    if (firstEffectRef.current) {
      firstEffectRef.current = false
      return cancelScheduledWork
    }

    cancelScheduledWork()

    if (open) {
      setIsMounted(true)
      setIsVisible(false)

      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(() => {
          setIsVisible(true)
          frameRefs.current = []
        })

        frameRefs.current = [secondFrame]
      })

      frameRefs.current = [firstFrame]
    } else {
      setIsVisible(false)
      timeoutRef.current = window.setTimeout(() => {
        setIsMounted(false)
        timeoutRef.current = null
      }, exitDurationMs)
    }

    return cancelScheduledWork
  }, [exitDurationMs, open])

  return { isMounted, isVisible }
}
