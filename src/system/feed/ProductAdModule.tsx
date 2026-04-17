import { FigmaAsset } from '../../prototype/FigmaAsset'
import type { ProductAdFeedItem } from './HomeFeedItem'

type ProductAdModuleProps = {
  item: ProductAdFeedItem
  onSelectProduct?: (productId: string) => void
  onToggleSave?: (productId: string) => void
}

export function ProductAdModule({
  item,
  onSelectProduct,
  onToggleSave,
}: ProductAdModuleProps) {
  return (
    <section className="ds-product-ad-module" aria-label={item.title}>
      <header className="ds-product-ad-module__header">
        <h2 className="ds-product-ad-module__title">{item.title}</h2>
        <span className="ds-product-ad-module__badge">{item.badgeLabel}</span>
      </header>

      <div className="ds-product-ad-module__rail" role="list">
        {item.products.map((product, index) => (
          <article
            key={product.id}
            className={
              index === item.products.length - 1
                ? 'ds-product-ad-module__card ds-product-ad-module__card--last'
                : 'ds-product-ad-module__card'
            }
            role="listitem"
          >
            <div className="ds-product-ad-module__media">
              <button
                type="button"
                className="ds-product-ad-module__media-button"
                aria-label={product.imageAlt}
                onClick={() => onSelectProduct?.(product.id)}
              >
                <FigmaAsset
                  src={product.imageSrc}
                  alt=""
                  displayWidth={134}
                  displayHeight={134}
                  className="ds-product-ad-module__image"
                />
              </button>

              <button
                type="button"
                className="ds-product-ad-module__save-button"
                aria-label={`Save ${product.name}`}
                onClick={() => onToggleSave?.(product.id)}
              >
                <FigmaAsset
                  src="/assets/figma/personalized-feed/product-ad/save-toggle.svg"
                  alt=""
                  displayWidth={24}
                  displayHeight={24.4916}
                  className="ds-product-ad-module__save-icon"
                />
              </button>
            </div>

            <button
              type="button"
              className="ds-product-ad-module__info"
              onClick={() => onSelectProduct?.(product.id)}
            >
              <p className="ds-product-ad-module__brand">{product.brandName}</p>
              <p className="ds-product-ad-module__name">{product.name}</p>
              <div className="ds-product-ad-module__price-row">
                {product.discountLabel ? (
                  <span className="ds-product-ad-module__discount">
                    {product.discountLabel}
                  </span>
                ) : null}
                <span className="ds-product-ad-module__price">{product.priceLabel}</span>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
