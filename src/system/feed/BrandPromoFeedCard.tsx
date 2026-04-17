import { FigmaAsset } from '../../prototype/FigmaAsset'
import { FeedMediaCarousel } from './FeedMediaCarousel'
import type { BrandPromoFeedItem } from './HomeFeedItem'

type BrandPromoFeedCardProps = {
  item: BrandPromoFeedItem
  onSelectProduct?: (productId: string) => void
}

const PRODUCT_SLOT_COUNT = 3

export function BrandPromoFeedCard({
  item,
  onSelectProduct,
}: BrandPromoFeedCardProps) {
  const visibleProducts = item.products.slice(0, PRODUCT_SLOT_COUNT)
  const emptySlotCount = Math.max(0, PRODUCT_SLOT_COUNT - visibleProducts.length)

  return (
    <article className="ds-brand-promo-card">
      <header className="ds-brand-promo-card__header">
        <div className="ds-brand-promo-card__identity">
          <FigmaAsset
            src={item.profile.avatarSrc}
            alt=""
            displayWidth={40}
            displayHeight={40}
            className="ds-brand-promo-card__avatar"
          />
          <p className="ds-brand-promo-card__brand-name">{item.profile.brandName}</p>
        </div>
      </header>

      <FeedMediaCarousel slides={item.media.slides} topPadding={0} />

      <section className="ds-brand-promo-card__body">
        <div className="ds-brand-promo-card__title-row">
          <div className="ds-brand-promo-card__title-group">
            <h2 className="ds-brand-promo-card__title">{item.title}</h2>
            <span className="ds-brand-promo-card__title-chevron-wrap" aria-hidden="true">
              <FigmaAsset
                src="/assets/figma/personalized-feed/brand-promo/chevron-right.svg"
                alt=""
                displayWidth={7.91407}
                displayHeight={13.3519}
                className="ds-brand-promo-card__title-chevron"
              />
            </span>
          </div>

          <div className="ds-brand-promo-card__save">
            <FigmaAsset
              src="/assets/figma/personalized-feed/reaction-bar/scrap-24.svg"
              alt=""
              displayWidth={16}
              displayHeight={19.3975}
              className="ds-brand-promo-card__save-icon"
            />
            <span>{item.profile.saveCount}</span>
          </div>
        </div>

        <p className="ds-brand-promo-card__description">{item.description}</p>
      </section>

      <div className="ds-brand-promo-card__products" aria-label="Brand promotion products">
        {visibleProducts.map((product) => (
          <button
            key={product.id}
            type="button"
            className="ds-brand-promo-card__product"
            aria-label={product.thumbnailAlt}
            onClick={() => onSelectProduct?.(product.id)}
          >
            <FigmaAsset
              src={product.thumbnailSrc}
              alt=""
              displayWidth={96}
              displayHeight={96}
              className="ds-brand-promo-card__product-image"
            />
          </button>
        ))}

        {Array.from({ length: emptySlotCount }, (_, index) => (
          <span
            key={`empty-slot-${index}`}
            className="ds-brand-promo-card__product ds-brand-promo-card__product--empty"
            aria-hidden="true"
          />
        ))}
      </div>
    </article>
  )
}
