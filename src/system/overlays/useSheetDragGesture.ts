import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

type DragState = {
  pointerId: number
  startY: number
  triggered: boolean
}

type UseSheetDragGestureOptions = {
  open: boolean
  closedOffset: number
  openTriggerThreshold?: number
  openReleaseThreshold?: number
  closeTriggerThreshold?: number
  closeReleaseThreshold?: number
  onOpen: () => void
  onClose: () => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function useSheetDragGesture<T extends HTMLElement = HTMLElement>({
  open,
  closedOffset,
  openTriggerThreshold = 28,
  openReleaseThreshold = 18,
  closeTriggerThreshold = 120,
  closeReleaseThreshold = 72,
  onOpen,
  onClose,
}: UseSheetDragGestureOptions) {
  const dragRef = useRef<DragState | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    dragRef.current = null
    setDragOffset(0)
    setIsDragging(false)
  }, [open])

  function clearDrag(target?: T, pointerId?: number) {
    if (target && pointerId !== undefined && target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId)
    }

    dragRef.current = null
    setDragOffset(0)
    setIsDragging(false)
  }

  function getProgressDelta(currentY: number, startY: number) {
    return open ? currentY - startY : startY - currentY
  }

  function getClampedOffset(delta: number) {
    return open
      ? clamp(delta, 0, closedOffset)
      : clamp(-delta, -closedOffset, 0)
  }

  function onPointerDown(event: ReactPointerEvent<T>) {
    dragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      triggered: false,
    }
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: ReactPointerEvent<T>) {
    const drag = dragRef.current

    if (!drag || drag.pointerId !== event.pointerId) {
      return
    }

    const delta = getProgressDelta(event.clientY, drag.startY)

    setDragOffset(getClampedOffset(delta))

    if (!open && delta > openTriggerThreshold) {
      drag.triggered = true
      onOpen()
      clearDrag(event.currentTarget, event.pointerId)
      return
    }

    if (open && delta > closeTriggerThreshold) {
      drag.triggered = true
      onClose()
      clearDrag(event.currentTarget, event.pointerId)
    }
  }

  function onPointerUp(event: ReactPointerEvent<T>) {
    const drag = dragRef.current

    if (!drag || drag.pointerId !== event.pointerId) {
      return
    }

    const delta = getProgressDelta(event.clientY, drag.startY)

    if (!drag.triggered) {
      if (!open && delta > openReleaseThreshold) {
        onOpen()
      } else if (open && delta > closeReleaseThreshold) {
        onClose()
      }
    }

    clearDrag(event.currentTarget, event.pointerId)
  }

  function onPointerCancel(event: ReactPointerEvent<T>) {
    const drag = dragRef.current

    if (drag?.pointerId === event.pointerId) {
      clearDrag(event.currentTarget, event.pointerId)
    }
  }

  return {
    dragOffset,
    isDragging,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  }
}
