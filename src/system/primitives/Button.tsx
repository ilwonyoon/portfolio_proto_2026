import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  enabled?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  enabled = false,
  onClick,
  disabled,
  className,
  type = 'button',
}: ButtonProps) {
  const isDisabled = disabled ?? !enabled

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={
        enabled
          ? `ds-button ds-button--enabled ${className ?? ''}`.trim()
          : `ds-button ${className ?? ''}`.trim()
      }
    >
      {children}
    </button>
  )
}
