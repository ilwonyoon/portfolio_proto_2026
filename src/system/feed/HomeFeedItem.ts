import type { FeedCardProps } from './FeedCard'
import type { FeedCardHeaderProps } from './FeedCardHeader'
import type { FeedMediaSlide } from './FeedMediaCarousel'
import type { FeedProduct } from './FeedProductStrip'
import type { FeedReactionBarProps } from './FeedReactionBar'

export type UserUploadedFeedItem = {
  id: string
  type: 'user-uploaded'
  productSheetTitle: string
  card: FeedCardProps
}

export type BrandPromoFeedItem = {
  id: string
  type: 'brand-promo'
  profile: {
    avatarSrc: string
    brandName: string
    saveCount: number
  }
  media: {
    slides: FeedMediaSlide[]
  }
  title: string
  description: string
  products: FeedProduct[]
}

export type AdFeedItem = {
  id: string
  type: 'ad'
  profile: {
    brandName: string
    badgeLabel: string
  }
  media: {
    slides: FeedMediaSlide[]
  }
  viewMoreLabel?: string
  colorOptions?: Array<{
    id: string
    color: string
    borderColor?: string
  }>
  description: string
  featuredProduct: FeedProduct & {
    ratingLabel?: string
    reviewCountLabel?: string
  }
}

export type RenovationReviewFeedItem = {
  id: string
  type: 'renovation-review'
  profile: {
    avatarSrc: string
    name: string
    subtitle: string
    actionLabel?: string
  }
  media: {
    slides: FeedMediaSlide[]
  }
  viewMoreLabel?: string
  expertInfo: string
  description: string
}

export type ProductAdModuleProduct = {
  id: string
  imageSrc: string
  imageAlt: string
  brandName: string
  name: string
  discountLabel?: string
  priceLabel: string
}

export type ProductAdFeedItem = {
  id: string
  type: 'product-ad'
  title: string
  badgeLabel: string
  products: ProductAdModuleProduct[]
}

export type LongformAdviceFeedItem = {
  id: string
  type: 'longform-advice'
  header: FeedCardHeaderProps
  media: {
    slides: FeedMediaSlide[]
    imageHeight?: number
  }
  imageBar: {
    title: string
    ctaLabel: string
  }
  reactions: FeedReactionBarProps
}

export type HomeFeedItem =
  | UserUploadedFeedItem
  | BrandPromoFeedItem
  | AdFeedItem
  | RenovationReviewFeedItem
  | ProductAdFeedItem
  | LongformAdviceFeedItem
