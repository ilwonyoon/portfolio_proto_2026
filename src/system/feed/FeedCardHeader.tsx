import { FigmaAsset } from '../../prototype/FigmaAsset'

export type FeedCardHeaderProps = {
  avatarSrc: string
  name: string
  subtitle: string
  actionLabel?: string
}

export function FeedCardHeader({
  avatarSrc,
  name,
  subtitle,
  actionLabel,
}: FeedCardHeaderProps) {
  return (
    <header className="ds-feed-card-header">
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
      {actionLabel ? (
        <button type="button" className="ds-feed-card-header__action">
          {actionLabel}
        </button>
      ) : null}
    </header>
  )
}
