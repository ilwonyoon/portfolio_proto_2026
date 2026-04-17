import { FeedCardHeader } from './FeedCardHeader'
import type { FeedCardHeaderProps } from './FeedCardHeader'
import { FeedCommentThread } from './FeedCommentThread'
import type { FeedComment } from './FeedCommentThread'
import { FeedMediaCarousel } from './FeedMediaCarousel'
import type { FeedMediaSlide } from './FeedMediaCarousel'
import { FeedProductStrip } from './FeedProductStrip'
import type { FeedProduct } from './FeedProductStrip'
import { FeedReactionBar } from './FeedReactionBar'
import type { FeedReactionBarProps } from './FeedReactionBar'

export type FeedCardProductsSection = {
  catalog: FeedProduct[]
  previewProductIds?: string[]
  previewCount?: number
  viewMoreVisibility?: 'auto' | 'always' | 'never'
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
  header?: FeedCardHeaderProps
  media: {
    slides: FeedMediaSlide[]
  }
  products?: FeedCardProductsSection
  reactions?: FeedReactionBarProps
  comments?: FeedCardCommentsSection
  onOpenProductSheet?: () => void
  onOpenProductDetail?: (productId: string) => void
}

export function FeedCard({
  variant = 'standard',
  header,
  media,
  products,
  reactions,
  comments,
  onOpenProductSheet,
  onOpenProductDetail,
}: FeedCardProps) {
  return (
    <article className={`ds-feed-card ds-feed-card--${variant}`}>
      {header ? <FeedCardHeader {...header} /> : null}
      <FeedMediaCarousel slides={media.slides} onSelectTag={onOpenProductDetail} />
      {products ? (
        <FeedProductStrip
          products={products.catalog}
          previewProductIds={products.previewProductIds}
          previewCount={products.previewCount}
          viewMoreVisibility={products.viewMoreVisibility}
          onViewMore={onOpenProductSheet}
          onSelectProduct={onOpenProductDetail}
        />
      ) : null}
      {reactions ? <FeedReactionBar {...reactions} /> : null}
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
    </article>
  )
}
