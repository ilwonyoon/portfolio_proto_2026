import { FeedCardHeader } from './FeedCardHeader'
import type { FeedCardHeaderProps } from './FeedCardHeader'
import { FeedCommentThread } from './FeedCommentThread'
import type { FeedComment } from './FeedCommentThread'
import { FeedContentsInfo } from './FeedContentsInfo'
import { FeedFeaturedProductRow } from './FeedFeaturedProductRow'
import type { FeedFeaturedProductRowProps } from './FeedFeaturedProductRow'
import { FeedMediaCarousel } from './FeedMediaCarousel'
import type { FeedMediaSlide } from './FeedMediaCarousel'
import { FeedProductStrip } from './FeedProductStrip'
import type { FeedProduct } from './FeedProductStrip'
import { FeedReactionBar } from './FeedReactionBar'
import type { FeedReactionBarProps } from './FeedReactionBar'
import { FeedRecommendationTitle } from './FeedRecommendationTitle'
import type { FeedRecommendationTitleProps } from './FeedRecommendationTitle'
import { resolveFeedPreviewProducts } from './feedProductUtils'

export type FeedCardProductsSection = {
  catalog: FeedProduct[]
  presentation?: 'strip' | 'featured'
  previewProductIds?: string[]
  previewCount?: number
  viewMoreVisibility?: 'auto' | 'always' | 'never'
  viewMoreLabel?: string
}

export type FeedCardCommentsSection = {
  description?: string
  showDescriptionMore?: boolean
  commentCount?: number
  items: FeedComment[]
  maxVisibleComments?: number
  viewAllVisibility?: 'auto' | 'always' | 'never'
}

export type FeedCardProps = {
  variant?: 'standard' | 'compact'
  recommendationTitle?: FeedRecommendationTitleProps
  header?: FeedCardHeaderProps
  media: {
    slides: FeedMediaSlide[]
    imageHeight?: number
    topPadding?: number
  }
  products?: FeedCardProductsSection
  featuredProduct?: FeedFeaturedProductRowProps
  reactions?: FeedReactionBarProps
  comments?: FeedCardCommentsSection
  contentsInfo?: string
  onOpenProductSheet?: () => void
  onOpenProductDetail?: (productId: string) => void
}

export function FeedCard({
  variant = 'standard',
  recommendationTitle,
  header,
  media,
  products,
  featuredProduct,
  reactions,
  comments,
  contentsInfo,
  onOpenProductSheet,
  onOpenProductDetail,
}: FeedCardProps) {
  const promotedFeaturedProduct =
    !featuredProduct && products?.presentation === 'featured'
      ? (() => {
          const previewProducts = resolveFeedPreviewProducts(
            products.catalog,
            products.previewProductIds,
            products.previewCount,
          )

          if (previewProducts.length === 0) {
            return undefined
          }

          return { product: previewProducts[0] } satisfies FeedFeaturedProductRowProps
        })()
      : undefined

  const resolvedFeaturedProduct = featuredProduct ?? promotedFeaturedProduct
  const shouldRenderProductStrip = Boolean(products && !resolvedFeaturedProduct)
  const reactionTopPadding = shouldRenderProductStrip || resolvedFeaturedProduct ? 0 : 12

  return (
    <article className={`ds-feed-card ds-feed-card--${variant}`}>
      {recommendationTitle ? (
        <FeedRecommendationTitle {...recommendationTitle} />
      ) : null}
      {header ? <FeedCardHeader {...header} /> : null}
      <FeedMediaCarousel
        slides={media.slides}
        imageHeight={media.imageHeight}
        topPadding={media.topPadding}
        onSelectTag={onOpenProductDetail}
      />
      {shouldRenderProductStrip ? (
        <FeedProductStrip
          products={products!.catalog}
          previewProductIds={products!.previewProductIds}
          previewCount={products!.previewCount}
          viewMoreVisibility={products!.viewMoreVisibility}
          viewMoreLabel={products!.viewMoreLabel}
          onViewMore={onOpenProductSheet}
          onSelectProduct={onOpenProductDetail}
        />
      ) : null}
      {resolvedFeaturedProduct ? (
        <FeedFeaturedProductRow
          {...resolvedFeaturedProduct}
          onSelectProduct={onOpenProductDetail}
        />
      ) : null}
      {reactions ? (
        <FeedReactionBar {...reactions} topPadding={reactionTopPadding} />
      ) : null}
      {comments ? (
        <FeedCommentThread
          description={comments.description}
          showDescriptionMore={comments.showDescriptionMore}
          commentCount={comments.commentCount}
          comments={comments.items}
          maxVisibleComments={comments.maxVisibleComments}
          viewAllVisibility={comments.viewAllVisibility}
        />
      ) : null}
      {contentsInfo ? <FeedContentsInfo text={contentsInfo} /> : null}
    </article>
  )
}
