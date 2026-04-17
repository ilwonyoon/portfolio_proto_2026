import type { ReactNode } from 'react'

type TopNavProps = {
  leading?: ReactNode
  trailing?: ReactNode
  center?: ReactNode
  className?: string
}

export function TopNav({
  leading,
  trailing,
  center,
  className,
}: TopNavProps) {
  return (
    <div className={`ds-top-nav ${className ?? ''}`.trim()}>
      <div className="ds-top-nav__side">{leading}</div>
      <div className="ds-top-nav__center">{center}</div>
      <div className="ds-top-nav__side ds-top-nav__side--end">{trailing}</div>
    </div>
  )
}
