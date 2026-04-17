import { FigmaAsset } from '../../prototype/FigmaAsset'

export type FeedProduct = {
  id: string
  thumbnailSrc: string
  thumbnailAlt: string
  name: string
  priceLabel: string
  discountLabel?: string
  previewBadgeLabel?: string
  previewBadgeTone?: 'neutral' | 'critical'
  thumbnailRadius?: 4 | 6
}

export type FeedProductStripProps = {
  products: FeedProduct[]
  previewProductIds?: string[]
  previewCount?: number
  viewMoreVisibility?: 'auto' | 'always' | 'never'
  viewMoreLabel?: string
  onViewMore?: () => void
  onSelectProduct?: (productId: string) => void
}

export function resolveFeedPreviewProducts(
  products: FeedProduct[],
  previewProductIds?: string[],
  previewCount = 4,
) {
  const previewProducts =
    previewProductIds?.length
      ? previewProductIds
          .map((productId) => products.find((product) => product.id === productId))
          .filter((product): product is FeedProduct => Boolean(product))
      : products.slice(0, previewCount)

  return previewProducts.slice(0, previewCount)
}

export function FeedProductStrip({
  products,
  previewProductIds,
  previewCount = 4,
  viewMoreVisibility = 'auto',
  viewMoreLabel = 'View more',
  onViewMore,
  onSelectProduct,
}: FeedProductStripProps) {
  if (products.length === 0) {
    return null
  }

  const visiblePreviewProducts = resolveFeedPreviewProducts(
    products,
    previewProductIds,
    previewCount,
  )
  const shouldShowViewMore =
    viewMoreVisibility === 'always'
      ? true
      : viewMoreVisibility === 'never'
        ? false
        : products.length > visiblePreviewProducts.length

  return (
    <section className="ds-feed-product-strip">
      <div className="ds-feed-product-strip__items">
        {visiblePreviewProducts.map((product) => (
          <button
            key={product.id}
            type="button"
            className="ds-feed-product-strip__thumbnail"
            aria-label={product.thumbnailAlt}
            onClick={() => onSelectProduct?.(product.id)}
            style={{ borderRadius: product.thumbnailRadius ?? 6 }}
          >
            <FigmaAsset
              src={product.thumbnailSrc}
              alt=""
              displayWidth={48}
              displayHeight={48}
              className="ds-feed-product-strip__thumbnail-image"
            />
            {product.previewBadgeLabel ? (
              <span
                className={
                  product.previewBadgeTone === 'critical'
                    ? 'ds-feed-product-strip__badge ds-feed-product-strip__badge--critical'
                    : 'ds-feed-product-strip__badge'
                }
              >
                {product.previewBadgeLabel}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {shouldShowViewMore ? (
        <button
          type="button"
          className="ds-feed-product-strip__view-more"
          onClick={onViewMore}
        >
          <span>{viewMoreLabel}</span>
          <FigmaAsset
            src="/assets/figma/personalized-feed/feed-card/chevron-right-12.svg"
            alt=""
            displayWidth={5.94741}
            displayHeight={10.0889}
            className="ds-feed-product-strip__chevron"
          />
        </button>
      ) : null}
    </section>
  )
}
