import { useState } from 'react'
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
  onToggleSave?: (isSaved: boolean) => void
}

function parseCount(count: number | string | undefined) {
  if (count === undefined) {
    return undefined
  }

  if (typeof count === 'number') {
    return count
  }

  const normalizedCount = count.trim().toUpperCase().replace(/,/g, '')
  const match = normalizedCount.match(/^(\d+(?:\.\d+)?)([KM])?$/)

  if (!match) {
    return undefined
  }

  const value = Number(match[1])
  const multiplier = match[2] === 'M' ? 1_000_000 : match[2] === 'K' ? 1_000 : 1

  return Math.round(value * multiplier)
}

function formatCount(count: number | string | undefined, isActive: boolean) {
  const parsedCount = parseCount(count)

  if (parsedCount === undefined) {
    return count
  }

  return (parsedCount + (isActive ? 1 : 0)).toLocaleString('en-US')
}

function HeartFilledIcon() {
  return (
    <svg
      className="ds-feed-reaction-bar__filled-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        transform="translate(1.6 3.3)"
        d="M10.4 17.895C10.083 17.895 9.811 17.74 9.544 17.549C8.892 17.168 7.52 16.299 5.069 14.424C2.592 12.141 0 9.326 0 5.967C0 4.271 0.525 2.885 1.408 1.869C2.287 0.859 3.475 0.265 4.72 0.071C6.742 -0.244 8.976 0.489 10.4 2.274C11.824 0.489 14.058 -0.244 16.08 0.071C17.325 0.265 18.513 0.859 19.392 1.869C20.275 2.885 20.8 4.271 20.8 5.967C20.8 9.326 18.208 12.141 15.731 14.424C13.28 16.299 11.908 17.168 11.256 17.549C10.989 17.74 10.717 17.895 10.4 17.895Z"
        fill="currentColor"
      />
    </svg>
  )
}

function BookmarkFilledIcon() {
  return (
    <svg
      className="ds-feed-reaction-bar__filled-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        transform="translate(4 2.2)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 0H13C14.657 0 16 1.343 16 3V18.396C16 19.181 15.136 19.66 14.47 19.244L9.061 15.863C8.413 15.457 7.59 15.457 6.941 15.862L1.53 19.244C0.864 19.66 0 19.181 0 18.396V3C0 1.343 1.343 0 3 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function FeedReactionBar({
  metrics,
  saveIconSrc,
  saveIconWidth,
  saveIconHeight,
  saveCount,
  topPadding = 0,
  onToggleSave,
}: FeedReactionBarProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  function handleToggleSave() {
    const nextIsSaved = !isSaved

    setIsSaved(nextIsSaved)
    onToggleSave?.(nextIsSaved)
  }

  return (
    <section className="ds-feed-reaction-bar" style={{ paddingTop: topPadding }}>
      <div className="ds-feed-reaction-bar__metrics">
        {metrics.map((metric) => {
          const isLikeMetric = metric.id.toLowerCase() === 'like'
          const isActive = isLikeMetric && isLiked
          const displayedCount = formatCount(metric.count, isActive)

          return (
            <button
              key={metric.id}
              type="button"
              className={
                isActive
                  ? 'ds-feed-reaction-bar__metric ds-feed-reaction-bar__metric--active'
                  : 'ds-feed-reaction-bar__metric'
              }
              aria-label={
                displayedCount !== undefined
                  ? `${metric.id} ${displayedCount}`
                  : metric.id
              }
              aria-pressed={isLikeMetric ? isActive : undefined}
              onClick={
                isLikeMetric ? () => setIsLiked((current) => !current) : undefined
              }
            >
              <span className="ds-feed-reaction-bar__icon" aria-hidden="true">
                {isActive ? (
                  <HeartFilledIcon />
                ) : (
                  <FigmaAsset
                    src={metric.iconSrc}
                    alt=""
                    displayWidth={metric.iconWidth ?? 24}
                    displayHeight={metric.iconHeight ?? 24}
                    className="ds-feed-reaction-bar__icon-asset"
                  />
                )}
              </span>
              {displayedCount !== undefined ? <span>{displayedCount}</span> : null}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className={
          isSaved
            ? 'ds-feed-reaction-bar__metric ds-feed-reaction-bar__metric--save ds-feed-reaction-bar__metric--active'
            : 'ds-feed-reaction-bar__metric ds-feed-reaction-bar__metric--save'
        }
        aria-label={
          saveCount !== undefined ? `Scrap ${formatCount(saveCount, isSaved)}` : 'Scrap'
        }
        aria-pressed={isSaved}
        onClick={handleToggleSave}
      >
        <span className="ds-feed-reaction-bar__icon" aria-hidden="true">
          {isSaved ? (
            <BookmarkFilledIcon />
          ) : (
            <FigmaAsset
              src={saveIconSrc}
              alt=""
              displayWidth={saveIconWidth ?? 24}
              displayHeight={saveIconHeight ?? 24}
              className="ds-feed-reaction-bar__icon-asset"
            />
          )}
        </span>
        {saveCount !== undefined ? <span>{formatCount(saveCount, isSaved)}</span> : null}
      </button>
    </section>
  )
}
