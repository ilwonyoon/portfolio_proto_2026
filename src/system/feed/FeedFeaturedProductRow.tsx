import { FigmaAsset } from '../../prototype/FigmaAsset'
import type { FeedProduct } from './FeedProductStrip'

export type FeedFeaturedProductRowProps = {
  product: FeedProduct
  onSelectProduct?: (productId: string) => void
}

export function FeedFeaturedProductRow({
  product,
  onSelectProduct,
}: FeedFeaturedProductRowProps) {
  return (
    <section className="ds-feed-featured-product-row">
      <button
        type="button"
        className="ds-feed-featured-product-row__button"
        aria-label={product.thumbnailAlt}
        onClick={() => onSelectProduct?.(product.id)}
      >
        <span className="ds-feed-featured-product-row__thumb">
          <FigmaAsset
            src={product.thumbnailSrc}
            alt=""
            displayWidth={48}
            displayHeight={48}
            className="ds-feed-featured-product-row__thumb-image"
          />
        </span>

        <span className="ds-feed-featured-product-row__copy">
          <span className="ds-feed-featured-product-row__name">{product.name}</span>
          <span className="ds-feed-featured-product-row__price">
            {product.discountLabel ? (
              <span className="ds-feed-featured-product-row__discount">
                {product.discountLabel}
              </span>
            ) : null}
            <span>{product.priceLabel}</span>
          </span>
        </span>
      </button>
    </section>
  )
}
