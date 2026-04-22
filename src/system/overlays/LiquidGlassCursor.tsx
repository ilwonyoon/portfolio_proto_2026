import { useEffect, useRef } from 'react'

export type LiquidGlassCursorScriptStep = {
  id: string
  selector?: string
  action?: 'click' | 'move' | 'wait'
  readMs?: number
  moveMs?: number
  pressMs?: number
  afterMs?: number
  scrollIntoView?: boolean
}

export type LiquidGlassCursorScript = {
  id: string
  scopeSelector?: string
  initialDelayMs?: number
  steps: LiquidGlassCursorScriptStep[]
}

type LiquidGlassCursorProps = {
  active?: boolean
  script?: LiquidGlassCursorScript
  onScriptComplete?: () => void
  onScriptStart?: () => void
}

export function LiquidGlassCursor({
  active = true,
  onScriptComplete,
  onScriptStart,
  script,
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

    if (script) {
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

    window.addEventListener('pointermove', handlePointerMove, true)
    window.addEventListener('pointerdown', handlePointerDown, true)
    window.addEventListener('pointerup', handlePointerUp, true)
    window.addEventListener('pointercancel', hideCursor, true)
    window.addEventListener('blur', hideCursor)
    document.addEventListener('mouseleave', hideCursor)

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
      }

      window.removeEventListener('pointermove', handlePointerMove, true)
      window.removeEventListener('pointerdown', handlePointerDown, true)
      window.removeEventListener('pointerup', handlePointerUp, true)
      window.removeEventListener('pointercancel', hideCursor, true)
      window.removeEventListener('blur', hideCursor)
      document.removeEventListener('mouseleave', hideCursor)
    }
  }, [active, script])

  useEffect(() => {
    if (!active || !script) {
      return
    }

    const cursor = cursorRef.current

    if (!cursor) {
      return
    }

    let isCancelled = false
    let pointerX = 0
    let pointerY = 0
    let rafId = 0

    const sleep = (durationMs = 0) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, durationMs)
      })

    const renderCursor = () => {
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      rafId = 0
    }

    const setCursorPosition = (x: number, y: number) => {
      pointerX = x
      pointerY = y

      if (rafId === 0) {
        rafId = window.requestAnimationFrame(renderCursor)
      }
    }

    const getScope = () =>
      script.scopeSelector
        ? document.querySelector(script.scopeSelector)
        : document.querySelector('.workbench-stage')

    const getTarget = (selector: string) => {
      const scope = getScope()
      const root = scope ?? document
      return root.querySelector(selector)
    }

    const waitForTarget = async (selector: string) => {
      const timeoutMs = 3000
      const startedAt = performance.now()

      while (!isCancelled) {
        const target = getTarget(selector)

        if (
          target instanceof HTMLElement &&
          !target.hasAttribute('disabled') &&
          target.offsetParent !== null
        ) {
          return target
        }

        if (performance.now() - startedAt > timeoutMs) {
          return null
        }

        await sleep(100)
      }

      return null
    }

    const getScrollParent = (target: HTMLElement) => {
      let current: HTMLElement | null = target.parentElement

      while (current) {
        const style = window.getComputedStyle(current)
        const canScrollY =
          /(auto|scroll)/.test(style.overflowY) &&
          current.scrollHeight > current.clientHeight

        if (
          current.classList.contains('prototype-screen__scroll-region') ||
          canScrollY
        ) {
          return current
        }

        current = current.parentElement
      }

      return null
    }

    const scrollTargetIntoContainer = async (target: HTMLElement) => {
      const scrollParent = getScrollParent(target)

      if (!scrollParent) {
        return
      }

      const parentRect = scrollParent.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const viewportTop = parentRect.top + 56
      const viewportBottom = parentRect.bottom - 88

      if (targetRect.top >= viewportTop && targetRect.bottom <= viewportBottom) {
        return
      }

      const targetCenter =
        targetRect.top -
        parentRect.top +
        scrollParent.scrollTop +
        targetRect.height / 2
      const nextScrollTop = Math.max(
        0,
        targetCenter - scrollParent.clientHeight / 2,
      )

      scrollParent.scrollTo({
        top: nextScrollTop,
        behavior: 'smooth',
      })
      await sleep(260)
    }

    const runScript = async () => {
      cursor.classList.remove(
        'ds-liquid-cursor--visible',
        'ds-liquid-cursor--pressed',
      )

      onScriptStart?.()

      await sleep(script.initialDelayMs ?? 800)

      for (const step of script.steps) {
        if (isCancelled) {
          return
        }

        await sleep(step.readMs ?? 0)

        if (step.action === 'wait' || !step.selector) {
          await sleep(step.afterMs ?? 0)
          continue
        }

        const target = await waitForTarget(step.selector)

        if (!target || isCancelled) {
          continue
        }

        if (step.scrollIntoView !== false) {
          await scrollTargetIntoContainer(target)
        }

        const rect = target.getBoundingClientRect()
        const targetX = rect.left + rect.width / 2
        const targetY = rect.top + rect.height / 2

        setCursorPosition(targetX, targetY)

        if (step.action === 'click') {
          cursor.classList.add('ds-liquid-cursor--visible')
          await sleep(50)
          cursor.classList.add('ds-liquid-cursor--pressed')
          await sleep(step.pressMs ?? 110)
          target.click()
          cursor.classList.remove('ds-liquid-cursor--pressed')
          await sleep(90)
          cursor.classList.remove('ds-liquid-cursor--visible')
        }

        await sleep(step.afterMs ?? 320)
      }

      if (!isCancelled) {
        onScriptComplete?.()
      }
    }

    runScript()

    return () => {
      isCancelled = true

      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
      }

      cursor.classList.remove(
        'ds-liquid-cursor--visible',
        'ds-liquid-cursor--pressed',
      )
    }
  }, [active, onScriptComplete, onScriptStart, script])

  if (!active) {
    return null
  }

  return <div ref={cursorRef} aria-hidden="true" className="ds-liquid-cursor" />
}
