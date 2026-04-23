import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { useBottomSheetPresence } from './useBottomSheetPresence'

type BottomSheetProps = {
  open: boolean
  ariaLabel: string
  children: ReactNode
  onClose: () => void
  className?: string
  panelClassName?: string
  dimClassName?: string
  closeLabel?: string
  exitDurationMs?: number
  panelStyle?: CSSProperties
  persistWhenClosed?: boolean
  peekHeight?: number
  dragOffset?: number
  isDragging?: boolean
  panelProps?: HTMLAttributes<HTMLElement>
  dimProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(' ')
}

export function BottomSheet({
  open,
  ariaLabel,
  children,
  onClose,
  className,
  panelClassName,
  dimClassName,
  closeLabel = 'Close sheet',
  exitDurationMs = 420,
  panelStyle,
  persistWhenClosed = false,
  peekHeight = 0,
  dragOffset = 0,
  isDragging = false,
  panelProps,
  dimProps,
}: BottomSheetProps) {
  const { isMounted, isVisible } = useBottomSheetPresence(open, exitDurationMs)
  const shouldRender = persistWhenClosed || isMounted
  const { className: panelPropsClassName, style: panelPropsStyle, ...restPanelProps } =
    panelProps ?? {}
  const { className: dimPropsClassName, ...restDimProps } = dimProps ?? {}

  if (!shouldRender) {
    return null
  }

  return (
    <div
      className={joinClassNames(
        'ds-bottom-sheet',
        isVisible && 'ds-bottom-sheet--visible',
        isDragging && 'ds-bottom-sheet--dragging',
        className,
      )}
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        {...restDimProps}
        className={joinClassNames('ds-bottom-sheet__dim', dimClassName, dimPropsClassName)}
      />

      <section
        className={joinClassNames(
          'ds-bottom-sheet__panel',
          panelClassName,
          panelPropsClassName,
        )}
        style={{
          '--ds-bottom-sheet-peek': `${peekHeight}px`,
          '--ds-bottom-sheet-drag-offset': `${dragOffset}px`,
          ...panelStyle,
          ...panelPropsStyle,
        } as CSSProperties}
        role={open ? 'dialog' : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? ariaLabel : undefined}
        {...restPanelProps}
      >
        {children}
      </section>
    </div>
  )
}
