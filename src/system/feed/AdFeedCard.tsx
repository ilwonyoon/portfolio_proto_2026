import { FigmaAsset } from '../../prototype/FigmaAsset'
import { FeedMediaCarousel } from './FeedMediaCarousel'
import type { AdFeedItem } from './HomeFeedItem'

type AdFeedCardProps = {
  item: AdFeedItem
  onOpenProductDetail?: (productId: string) => void
}

export function AdFeedCard({
  item,
  onOpenProductDetail,
}: AdFeedCardProps) {
  return (
    <article className="ds-ad-feed-card">
      <header className="ds-ad-feed-card__header">
        <div className="ds-ad-feed-card__brand-group">
          <p className="ds-ad-feed-card__brand-name">{item.profile.brandName}</p>
          <span className="ds-ad-feed-card__chevron-wrap" aria-hidden="true">
            <FigmaAsset
              src="/assets/figma/personalized-feed/feed-card/chevron-right-12.svg"
              alt=""
              displayWidth={5.94741}
              displayHeight={10.0889}
              className="ds-ad-feed-card__chevron"
            />
          </span>
        </div>

        <span className="ds-ad-feed-card__badge">{item.profile.badgeLabel}</span>
      </header>

      <FeedMediaCarousel
        slides={item.media.slides}
        onSelectTag={onOpenProductDetail}
        topPadding={0}
      />

      <div className="ds-ad-feed-card__view-more-row">
        <span className="ds-ad-feed-card__view-more-label">
          {item.viewMoreLabel ?? 'View more'}
        </span>
        <span className="ds-ad-feed-card__view-more-chevron-wrap" aria-hidden="true">
          <FigmaAsset
            src="/assets/figma/personalized-feed/brand-promo/chevron-right.svg"
            alt=""
            displayWidth={7.91407}
            displayHeight={13.3519}
            className="ds-ad-feed-card__view-more-chevron"
          />
        </span>
      </div>

      <div className="ds-ad-feed-card__divider" />

      <p className="ds-ad-feed-card__description">{item.description}</p>

      <div className="ds-ad-feed-card__featured-product">
        <div className="ds-ad-feed-card__featured-main">
          <span className="ds-ad-feed-card__featured-thumb">
            <FigmaAsset
              src={item.featuredProduct.thumbnailSrc}
              alt=""
              displayWidth={60}
              displayHeight={60}
              className="ds-ad-feed-card__featured-thumb-image"
            />
          </span>

          <div className="ds-ad-feed-card__featured-copy">
            <p className="ds-ad-feed-card__featured-name">{item.featuredProduct.name}</p>

            <div className="ds-ad-feed-card__featured-price">
              {item.featuredProduct.discountLabel ? (
                <span className="ds-ad-feed-card__featured-discount">
                  {item.featuredProduct.discountLabel}
                </span>
              ) : null}
              <span>{item.featuredProduct.priceLabel}</span>
            </div>

            {item.featuredProduct.ratingLabel || item.featuredProduct.reviewCountLabel ? (
              <div className="ds-ad-feed-card__featured-review">
                <span className="ds-ad-feed-card__featured-rating">
                  <FigmaAsset
                    src="/assets/figma/personalized-feed/ad/star.svg"
                    alt=""
                    displayWidth={12}
                    displayHeight={12}
                    className="ds-ad-feed-card__featured-star"
                  />
                  <span>{item.featuredProduct.ratingLabel}</span>
                </span>
                {item.featuredProduct.reviewCountLabel ? (
                  <span className="ds-ad-feed-card__featured-review-count">
                    {item.featuredProduct.reviewCountLabel}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <span className="ds-ad-feed-card__save-icon-wrap" aria-hidden="true">
          <FigmaAsset
            src="/assets/figma/personalized-feed/reaction-bar/scrap-24.svg"
            alt=""
            displayWidth={16}
            displayHeight={19.3975}
            className="ds-ad-feed-card__save-icon"
          />
        </span>
      </div>
    </article>
  )
}
