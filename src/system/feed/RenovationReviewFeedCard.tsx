import { FigmaAsset } from '../../prototype/FigmaAsset'
import { FeedMediaCarousel } from './FeedMediaCarousel'
import type { RenovationReviewFeedItem } from './HomeFeedItem'

type RenovationReviewFeedCardProps = {
  item: RenovationReviewFeedItem
}

export function RenovationReviewFeedCard({
  item,
}: RenovationReviewFeedCardProps) {
  return (
    <article className="ds-renovation-review-card">
      <header className="ds-renovation-review-card__header">
        <div className="ds-renovation-review-card__identity">
          <FigmaAsset
            src={item.profile.avatarSrc}
            alt=""
            displayWidth={40}
            displayHeight={40}
            className="ds-renovation-review-card__avatar"
          />

          <div className="ds-renovation-review-card__copy">
            <p className="ds-renovation-review-card__name">{item.profile.name}</p>
            <p className="ds-renovation-review-card__subtitle">{item.profile.subtitle}</p>
          </div>
        </div>

        <div className="ds-renovation-review-card__actions">
          {item.profile.actionLabel ? (
            <button
              type="button"
              className="ds-renovation-review-card__follow-action"
            >
              {item.profile.actionLabel}
            </button>
          ) : null}

          <span className="ds-renovation-review-card__more-action" aria-hidden="true">
            <FigmaAsset
              src="/assets/figma/personalized-feed/renovation-review/more-horizontal.svg"
              alt=""
              displayWidth={13.5}
              displayHeight={3}
              className="ds-renovation-review-card__more-icon"
            />
          </span>
        </div>
      </header>

      <FeedMediaCarousel slides={item.media.slides} topPadding={0} />

      <div className="ds-renovation-review-card__view-more-row">
        <span className="ds-renovation-review-card__view-more-label">
          {item.viewMoreLabel ?? 'View more'}
        </span>

        <span className="ds-renovation-review-card__view-more-chevron-wrap" aria-hidden="true">
          <FigmaAsset
            src="/assets/figma/personalized-feed/renovation-review/chevron-right.svg"
            alt=""
            displayWidth={7.91407}
            displayHeight={13.3519}
            className="ds-renovation-review-card__view-more-chevron"
          />
        </span>
      </div>

      <div className="ds-renovation-review-card__divider" />

      <div className="ds-renovation-review-card__body">
        <p className="ds-renovation-review-card__expert-info">{item.expertInfo}</p>
        <p className="ds-renovation-review-card__description">{item.description}</p>
      </div>
    </article>
  )
}
