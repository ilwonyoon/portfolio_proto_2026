import type { CSSProperties } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { resolveFeedPreviewProducts } from './feedProductUtils'

export type FeedProduct = {
  id: string
  thumbnailSrc: string
  thumbnailAlt: string
  name: string
  priceLabel: string
  discountLabel?: string
  previewBadgeLabel?: string
  previewBadgeTone?: 'neutral' | 'critical'
  thumbnailRadius?: number
}

export type FeedProductStripProps = {
  products: FeedProduct[]
  previewProductIds?: string[]
  previewCount?: number
  mode?: 'preview' | 'rail'
  viewMoreVisibility?: 'auto' | 'always' | 'never'
  viewMoreLabel?: string
  thumbnailSize?: number
  thumbnailRadius?: number
  topPadding?: number
  bottomPadding?: number
  contentPaddingX?: number
  itemGap?: number
  rowHeight?: number
  showRightFade?: boolean
  rightFadeWidth?: number
  onViewMore?: () => void
  onSelectProduct?: (productId: string) => void
}

export function FeedProductStrip({
  products,
  previewProductIds,
  previewCount = 4,
  mode = 'preview',
  viewMoreVisibility = 'auto',
  viewMoreLabel = 'View more',
  thumbnailSize = 48,
  thumbnailRadius,
  topPadding = 16,
  bottomPadding = 16,
  contentPaddingX = 16,
  itemGap = 4,
  rowHeight,
  showRightFade = false,
  rightFadeWidth = 100,
  onViewMore,
  onSelectProduct,
}: FeedProductStripProps) {
  if (products.length === 0) {
    return null
  }

  const visiblePreviewProducts =
    mode === 'rail'
      ? products
      : resolveFeedPreviewProducts(products, previewProductIds, previewCount)
  const shouldShowViewMore =
    mode === 'rail'
      ? false
      : viewMoreVisibility === 'always'
      ? true
      : viewMoreVisibility === 'never'
        ? false
        : products.length > visiblePreviewProducts.length

  const stripStyle = {
    '--ds-feed-product-strip-thumbnail-size': `${thumbnailSize}px`,
    '--ds-feed-product-strip-top-padding': `${topPadding}px`,
    '--ds-feed-product-strip-bottom-padding': `${bottomPadding}px`,
    '--ds-feed-product-strip-side-padding': `${contentPaddingX}px`,
    '--ds-feed-product-strip-item-gap': `${itemGap}px`,
    '--ds-feed-product-strip-row-height': `${rowHeight ?? thumbnailSize + topPadding + bottomPadding}px`,
    '--ds-feed-product-strip-right-fade-width': `${rightFadeWidth}px`,
  } as CSSProperties

  return (
    <section
      className={`ds-feed-product-strip ds-feed-product-strip--${mode}`}
      style={stripStyle}
    >
      {mode === 'rail' ? (
        <div className="ds-feed-product-strip__scroll">
          <div className="ds-feed-product-strip__items">
            {visiblePreviewProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                className="ds-feed-product-strip__thumbnail"
                aria-label={product.thumbnailAlt}
                onClick={() => onSelectProduct?.(product.id)}
                style={{ borderRadius: product.thumbnailRadius ?? thumbnailRadius ?? 6 }}
              >
                <FigmaAsset
                  src={product.thumbnailSrc}
                  alt=""
                  displayWidth={thumbnailSize}
                  displayHeight={thumbnailSize}
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
        </div>
      ) : (
        <div className="ds-feed-product-strip__items">
          {visiblePreviewProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              className="ds-feed-product-strip__thumbnail"
              aria-label={product.thumbnailAlt}
              onClick={() => onSelectProduct?.(product.id)}
              style={{ borderRadius: product.thumbnailRadius ?? thumbnailRadius ?? 6 }}
            >
              <FigmaAsset
                src={product.thumbnailSrc}
                alt=""
                displayWidth={thumbnailSize}
                displayHeight={thumbnailSize}
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
      )}

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

      {mode === 'rail' && showRightFade ? (
        <div className="ds-feed-product-strip__right-fade" aria-hidden="true" />
      ) : null}
    </section>
  )
}
