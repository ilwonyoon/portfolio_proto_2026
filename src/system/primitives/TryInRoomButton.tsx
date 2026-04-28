import { useEffect, useState, type ButtonHTMLAttributes } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'

type TryInRoomButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label?: string
  expanded?: boolean
  collapseAfterMs?: number | null
}

export function TryInRoomButton({
  label = 'Try in your room',
  expanded,
  collapseAfterMs = 1400,
  className,
  type = 'button',
  ...buttonProps
}: TryInRoomButtonProps) {
  const [isExpanded, setIsExpanded] = useState(expanded ?? true)
  const isControlled = expanded !== undefined

  useEffect(() => {
    if (isControlled) {
      setIsExpanded(expanded)
      return
    }

    setIsExpanded(true)

    if (collapseAfterMs === null) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIsExpanded(false)
    }, collapseAfterMs)

    return () => window.clearTimeout(timeoutId)
  }, [collapseAfterMs, expanded, isControlled])

  return (
    <button
      {...buttonProps}
      type={type}
      className={
        isExpanded
          ? `ds-try-in-room-button ds-try-in-room-button--expanded ${className ?? ''}`.trim()
          : `ds-try-in-room-button ${className ?? ''}`.trim()
      }
    >
      <FigmaAsset
        src="/assets/figma/pdp/ai.svg"
        alt=""
        displayWidth={20}
        displayHeight={20}
        className="ds-try-in-room-button__icon"
      />
      <span className="ds-try-in-room-button__label">{label}</span>
    </button>
  )
}
