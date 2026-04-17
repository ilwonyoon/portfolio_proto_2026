import { FigmaAsset } from '../../prototype/FigmaAsset'

type FloatingActionButtonProps = {
  iconSrc: string
  iconWidth: number
  iconHeight: number
  label: string
  className?: string
}

export function FloatingActionButton({
  iconSrc,
  iconWidth,
  iconHeight,
  label,
  className,
}: FloatingActionButtonProps) {
  return (
    <button
      type="button"
      className={`ds-fab ${className ?? ''}`.trim()}
      aria-label={label}
    >
      <FigmaAsset
        src={iconSrc}
        alt=""
        displayWidth={iconWidth}
        displayHeight={iconHeight}
      />
    </button>
  )
}
