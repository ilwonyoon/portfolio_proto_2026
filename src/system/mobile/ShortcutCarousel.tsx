import type { ReactNode } from 'react'

export type ShortcutCarouselItem = {
  id: string
  label: string
  icon: ReactNode
  labelTone?: 'muted' | 'strong'
}

type ShortcutCarouselProps = {
  items: ShortcutCarouselItem[]
  className?: string
  ariaLabel?: string
  onItemClick?: (itemId: string) => void
}

export function ShortcutCarousel({
  items,
  className,
  ariaLabel = 'Shortcuts',
  onItemClick,
}: ShortcutCarouselProps) {
  return (
    <div
      className={`ds-shortcut-carousel ${className ?? ''}`.trim()}
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const labelToneClass =
          item.labelTone === 'strong'
            ? 'ds-shortcut-carousel__label ds-shortcut-carousel__label--strong'
            : 'ds-shortcut-carousel__label'

        return (
          <button
            key={item.id}
            type="button"
            className="ds-shortcut-carousel__item"
            aria-label={item.label}
            onClick={() => onItemClick?.(item.id)}
          >
            <span className="ds-shortcut-carousel__icon-wrap" aria-hidden="true">
              {item.icon}
            </span>
            <span className={labelToneClass}>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
