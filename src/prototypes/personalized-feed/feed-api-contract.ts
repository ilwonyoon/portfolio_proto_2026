export type ApiVisibility = 'auto' | 'always' | 'never'

export type ApiImageAsset = {
  src: string
  alt: string
}

export type ApiFeedTag = {
  id: string
  productId: string
  x: number
  y: number
}

export type ApiFeedSlide = {
  id: string
  image: ApiImageAsset
  tags: ApiFeedTag[]
}

export type ApiFeedRecommendationTitle = {
  text?: string
  prefix?: string
  emphasis?: string
}

export type ApiFeedProduct = {
  id: string
  image: ApiImageAsset
  name: string
  priceLabel: string
  discountLabel?: string
  previewBadgeLabel?: string
  previewBadgeTone?: 'neutral' | 'critical'
  thumbnailRadius?: 4 | 6
  ratingLabel?: string
  reviewCountLabel?: string
}

export type ApiReactionMetric = {
  id: string
  icon: ApiImageAsset
  iconWidth?: number
  iconHeight?: number
  count?: number | string
}

export type ApiFeedComment = {
  id: string
  author?: string
  body: string
  emphasize?: boolean
}

export type UserUploadedFeedApiItem = {
  id: string
  type: 'user-uploaded'
  productSheetTitle: string
  recommendationTitle?: ApiFeedRecommendationTitle
  header: {
    avatar: ApiImageAsset
    name: string
    subtitle: string
    actionLabel?: string
    showOverflowAction?: boolean
    topPadding?: 0 | 16
  }
  media: {
    slides: ApiFeedSlide[]
    imageHeight?: number
    topPadding?: number
  }
  products?: {
    catalog: ApiFeedProduct[]
    presentation?: 'strip' | 'featured'
    previewProductIds?: string[]
    previewCount?: number
    viewMoreVisibility?: ApiVisibility
    viewMoreLabel?: string
  }
  reactions: {
    metrics: ApiReactionMetric[]
    save: {
      icon: ApiImageAsset
      iconWidth?: number
      iconHeight?: number
      count?: number | string
    }
  }
  comments: {
    description?: string
    showDescriptionMore?: boolean
    commentCount?: number
    items: ApiFeedComment[]
    maxVisibleComments?: number
    viewAllVisibility?: ApiVisibility
  }
  contentsInfo?: string
  featuredProduct?: ApiFeedProduct
}

export type BrandPromoFeedApiItem = {
  id: string
  type: 'brand-promo'
  profile: {
    avatar: ApiImageAsset
    brandName: string
    saveCount: number
  }
  media: {
    slides: ApiFeedSlide[]
  }
  title: string
  description: string
  products: ApiFeedProduct[]
}

export type AdFeedApiItem = {
  id: string
  type: 'ad'
  profile: {
    brandName: string
    badgeLabel: string
  }
  media: {
    slides: ApiFeedSlide[]
  }
  viewMoreLabel?: string
  description: string
  featuredProduct: ApiFeedProduct
}

export type RenovationReviewFeedApiItem = {
  id: string
  type: 'renovation-review'
  profile: {
    avatar: ApiImageAsset
    name: string
    subtitle: string
    actionLabel?: string
  }
  media: {
    slides: ApiFeedSlide[]
  }
  viewMoreLabel?: string
  expertInfo: string
  description: string
}

export type ProductAdModuleApiProduct = {
  id: string
  image: ApiImageAsset
  brandName: string
  name: string
  discountLabel?: string
  priceLabel: string
}

export type ProductAdFeedApiItem = {
  id: string
  type: 'product-ad'
  title: string
  badgeLabel: string
  products: ProductAdModuleApiProduct[]
}

export type LongformAdviceFeedApiItem = {
  id: string
  type: 'longform-advice'
  profile: {
    avatar: ApiImageAsset
    name: string
    subtitle: string
    actionLabel?: string
    showOverflowAction?: boolean
  }
  media: {
    slides: ApiFeedSlide[]
    imageHeight?: number
  }
  imageBar: {
    title: string
    ctaLabel: string
  }
  reactions: {
    metrics: ApiReactionMetric[]
    save: {
      icon: ApiImageAsset
      iconWidth?: number
      iconHeight?: number
      count?: number | string
    }
  }
}

export type PersonalizedFeedApiItem =
  | UserUploadedFeedApiItem
  | BrandPromoFeedApiItem
  | AdFeedApiItem
  | RenovationReviewFeedApiItem
  | ProductAdFeedApiItem
  | LongformAdviceFeedApiItem

export type PersonalizedFeedApiResponse = {
  items: PersonalizedFeedApiItem[]
}
