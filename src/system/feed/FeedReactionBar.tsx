import { FigmaAsset } from '../../prototype/FigmaAsset'

export type FeedReactionMetric = {
  id: string
  iconSrc: string
  iconWidth?: number
  iconHeight?: number
  count?: number | string
}

export type FeedReactionBarProps = {
  metrics: FeedReactionMetric[]
  saveIconSrc: string
  saveIconWidth?: number
  saveIconHeight?: number
  saveCount?: number | string
  topPadding?: number
}

export function FeedReactionBar({
  metrics,
  saveIconSrc,
  saveIconWidth,
  saveIconHeight,
  saveCount,
  topPadding = 0,
}: FeedReactionBarProps) {
  return (
    <section className="ds-feed-reaction-bar" style={{ paddingTop: topPadding }}>
      <div className="ds-feed-reaction-bar__metrics">
        {metrics.map((metric) => (
          <button
            key={metric.id}
            type="button"
            className="ds-feed-reaction-bar__metric"
            aria-label={
              metric.count !== undefined ? `${metric.id} ${metric.count}` : metric.id
            }
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
            {metric.count !== undefined ? <span>{metric.count}</span> : null}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="ds-feed-reaction-bar__metric ds-feed-reaction-bar__metric--save"
        aria-label={saveCount !== undefined ? `Scrap ${saveCount}` : 'Scrap'}
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
        {saveCount !== undefined ? <span>{saveCount}</span> : null}
      </button>
    </section>
  )
}
