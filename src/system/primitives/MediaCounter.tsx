import { FigmaAsset } from '../../prototype/FigmaAsset'

type MediaCounterProps = {
  current: number
  total: number
  className?: string
  trailingIconSrc?: string
  trailingIconWidth?: number
  trailingIconHeight?: number
}

export function MediaCounter({
  current,
  total,
  className,
  trailingIconSrc,
  trailingIconWidth = 12,
  trailingIconHeight = 12,
}: MediaCounterProps) {
  return (
    <div className={`ds-media-counter ${className ?? ''}`.trim()}>
      <div className="ds-media-counter__group">
        <span className="ds-media-counter__part ds-media-counter__part--current">
          {current}
        </span>
        <span className="ds-media-counter__part ds-media-counter__part--slash">
          /
        </span>
        <span className="ds-media-counter__part ds-media-counter__part--total">
          {total}
        </span>
      </div>
      {trailingIconSrc ? (
        <FigmaAsset
          src={trailingIconSrc}
          alt=""
          displayWidth={trailingIconWidth}
          displayHeight={trailingIconHeight}
          className="ds-media-counter__icon"
        />
      ) : null}
    </div>
  )
}
