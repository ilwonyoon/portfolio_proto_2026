import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  enabled?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  dataScriptTarget?: string
  variant?: 'default' | 'sheet'
}

export function Button({
  children,
  enabled = false,
  onClick,
  disabled,
  className,
  type = 'button',
  dataScriptTarget,
  variant = 'default',
}: ButtonProps) {
  const isDisabled = disabled ?? !enabled
  const variantClass =
    variant === 'sheet' ? 'ds-button ds-button--sheet' : 'ds-button'

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      data-script-target={dataScriptTarget}
      className={
        enabled
          ? `${variantClass} ds-button--enabled ${className ?? ''}`.trim()
          : `${variantClass} ${className ?? ''}`.trim()
      }
    >
      {children}
    </button>
  )
}
