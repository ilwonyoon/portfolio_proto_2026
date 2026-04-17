import type { MouseEvent, ReactNode } from 'react'

type ChipProps = {
  children: ReactNode
  selected?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  className?: string
  variant?: 'default' | 'month'
}

export function Chip({
  children,
  selected = false,
  onClick,
  className,
  variant = 'default',
}: ChipProps) {
  const variantClass =
    variant === 'month' ? 'ds-chip ds-chip--month' : 'ds-chip ds-chip--default'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={
        selected
          ? `${variantClass} ds-chip--selected ${className ?? ''}`.trim()
          : `${variantClass} ${className ?? ''}`.trim()
      }
    >
      {children}
    </button>
  )
}
