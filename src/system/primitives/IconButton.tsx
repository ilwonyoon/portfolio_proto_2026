import type { ReactNode } from 'react'

type IconButtonProps = {
  children: ReactNode
  label: string
  onClick?: () => void
}

export function IconButton({ children, label, onClick }: IconButtonProps) {
  return (
    <button
      className="ds-icon-button"
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
