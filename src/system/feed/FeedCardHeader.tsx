import { FigmaAsset } from '../../prototype/FigmaAsset'

export type FeedCardHeaderProps = {
  avatarSrc: string
  name: string
  subtitle: string
  actionLabel?: string
  showOverflowAction?: boolean
  topPadding?: 0 | 16
}

export function FeedCardHeader({
  avatarSrc,
  name,
  subtitle,
  actionLabel,
  showOverflowAction = false,
  topPadding = 16,
}: FeedCardHeaderProps) {
  return (
    <header className="ds-feed-card-header" style={{ paddingTop: topPadding }}>
      <div className="ds-feed-card-header__identity">
        <FigmaAsset
          src={avatarSrc}
          alt=""
          displayWidth={40}
          displayHeight={40}
          className="ds-feed-card-header__avatar"
        />
        <div className="ds-feed-card-header__copy">
          <p className="ds-feed-card-header__name">{name}</p>
          <p className="ds-feed-card-header__subtitle">{subtitle}</p>
        </div>
      </div>
      {actionLabel || showOverflowAction ? (
        <div className="ds-feed-card-header__actions">
          {actionLabel ? (
            <button type="button" className="ds-feed-card-header__action">
              {actionLabel}
            </button>
          ) : null}

          {showOverflowAction ? (
            <span className="ds-feed-card-header__overflow" aria-hidden="true">
              <FigmaAsset
                src="/assets/figma/personalized-feed/renovation-review/more-horizontal.svg"
                alt=""
                displayWidth={13.5}
                displayHeight={3}
                className="ds-feed-card-header__overflow-icon"
              />
            </span>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
