import type { FeedProduct } from './FeedProductStrip'

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
