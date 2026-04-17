import { FigmaAsset } from '../../prototype/FigmaAsset'

export type FeedReactionMetric = {
  id: string
  iconSrc: string
  iconWidth?: number
  iconHeight?: number
  count: number
}

export type FeedReactionBarProps = {
  metrics: FeedReactionMetric[]
  saveIconSrc: string
  saveIconWidth?: number
  saveIconHeight?: number
  saveCount: number
}

export function FeedReactionBar({
  metrics,
  saveIconSrc,
  saveIconWidth,
  saveIconHeight,
  saveCount,
}: FeedReactionBarProps) {
  return (
    <section className="ds-feed-reaction-bar">
      <div className="ds-feed-reaction-bar__metrics">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            type="button"
            className="ds-feed-reaction-bar__metric"
            aria-label={`${metric.id} ${metric.count}`}
          >
            <span className="ds-feed-reaction-bar__icon" aria-hidden="true">
              <FigmaAsset
                src={metric.iconSrc}
                alt=""
                displayWidth={metric.iconWidth ?? 24}
                displayHeight={metric.iconHeight ?? 24}
                className="ds-feed-reaction-bar__icon-asset"
              />
            </span>
            <span>{metric.count}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="ds-feed-reaction-bar__metric ds-feed-reaction-bar__metric--save"
        aria-label={`Scrap ${saveCount}`}
      >
        <span className="ds-feed-reaction-bar__icon" aria-hidden="true">
          <FigmaAsset
            src={saveIconSrc}
            alt=""
            displayWidth={saveIconWidth ?? 24}
            displayHeight={saveIconHeight ?? 24}
            className="ds-feed-reaction-bar__icon-asset"
          />
        </span>
        <span>{saveCount}</span>
      </button>
    </section>
  )
}
