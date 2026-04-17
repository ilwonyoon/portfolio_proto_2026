import { useEffect, useRef } from 'react'

type LiquidGlassCursorProps = {
  active?: boolean
}

export function LiquidGlassCursor({
  active = true,
}: LiquidGlassCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!active) {
      return
    }

    if (!window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const cursor = cursorRef.current

    if (!cursor) {
      return
    }

    let pointerX = 0
    let pointerY = 0
    let rafId = 0

    const renderCursor = () => {
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      rafId = 0
    }

    const isInPreviewStage = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest('.workbench-stage'))

    const hideCursor = () => {
      cursor.classList.remove(
        'ds-liquid-cursor--visible',
        'ds-liquid-cursor--pressed',
      )
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isInPreviewStage(event.target)) {
        hideCursor()
        return
      }

      pointerX = event.clientX
      pointerY = event.clientY
      cursor.classList.add('ds-liquid-cursor--visible')

      if (rafId === 0) {
        rafId = window.requestAnimationFrame(renderCursor)
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!isInPreviewStage(event.target)) {
        return
      }

      cursor.classList.add('ds-liquid-cursor--pressed')
    }

    const handlePointerUp = () => {
      cursor.classList.remove('ds-liquid-cursor--pressed')
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', hideCursor)
    window.addEventListener('blur', hideCursor)
    document.addEventListener('mouseleave', hideCursor)

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
      }

      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', hideCursor)
      window.removeEventListener('blur', hideCursor)
      document.removeEventListener('mouseleave', hideCursor)
    }
  }, [active])

  if (!active) {
    return null
  }

  return <div ref={cursorRef} aria-hidden="true" className="ds-liquid-cursor" />
}
