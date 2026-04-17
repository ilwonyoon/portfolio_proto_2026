import { AdFeedCard } from './AdFeedCard'
import { BrandPromoFeedCard } from './BrandPromoFeedCard'
import { FeedCard } from './FeedCard'
import type { HomeFeedItem } from './HomeFeedItem'
import { LongformAdviceFeedCard } from './LongformAdviceFeedCard'
import { ProductAdModule } from './ProductAdModule'
import { RenovationReviewFeedCard } from './RenovationReviewFeedCard'

type HomeFeedItemRendererProps = {
  item: HomeFeedItem
  onOpenProductSheet?: (itemId: string) => void
  onOpenProductDetail?: (itemId: string, productId: string) => void
}

export function HomeFeedItemRenderer({
  item,
  onOpenProductSheet,
  onOpenProductDetail,
}: HomeFeedItemRendererProps) {
  switch (item.type) {
    case 'user-uploaded':
      return (
        <FeedCard
          {...item.card}
          onOpenProductSheet={() => onOpenProductSheet?.(item.id)}
          onOpenProductDetail={(productId) =>
            onOpenProductDetail?.(item.id, productId)
          }
        />
      )

    case 'brand-promo':
      return (
        <BrandPromoFeedCard
          item={item}
          onSelectProduct={(productId) =>
            onOpenProductDetail?.(item.id, productId)
          }
        />
      )

    case 'ad':
      return (
        <AdFeedCard
          item={item}
          onOpenProductDetail={(productId) =>
            onOpenProductDetail?.(item.id, productId)
          }
        />
      )

    case 'renovation-review':
      return <RenovationReviewFeedCard item={item} />

    case 'product-ad':
      return (
        <ProductAdModule
          item={item}
          onSelectProduct={(productId) =>
            onOpenProductDetail?.(item.id, productId)
          }
        />
      )

    case 'longform-advice':
      return <LongformAdviceFeedCard item={item} />
  }
}
