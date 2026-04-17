import type {
  FeedCardCommentsSection,
  FeedCardProps,
  FeedCardProductsSection,
  FeedMediaSlide,
  FeedProduct,
  HomeFeedItem,
  FeedCardHeaderProps,
  FeedReactionBarProps,
} from '../../system/feed'
import { personalizedFeedApiResponse } from './feed-api.mock'
import type {
  AdFeedApiItem,
  ApiFeedComment,
  ApiFeedProduct,
  ApiFeedSlide,
  BrandPromoFeedApiItem,
  LongformAdviceFeedApiItem,
  ProductAdFeedApiItem,
  PersonalizedFeedApiItem,
  PersonalizedFeedApiResponse,
  RenovationReviewFeedApiItem,
  UserUploadedFeedApiItem,
} from './feed-api-contract'

function mapApiSlide(slide: ApiFeedSlide): FeedMediaSlide {
  return {
    id: slide.id,
    src: slide.image.src,
    alt: slide.image.alt,
    tags: slide.tags.map((tag) => ({
      id: tag.id,
      productId: tag.productId,
      left: tag.x,
      top: tag.y,
    })),
  }
}

function mapApiProduct(product: ApiFeedProduct): FeedProduct {
  return {
    id: product.id,
    thumbnailSrc: product.image.src,
    thumbnailAlt: product.image.alt,
    name: product.name,
    priceLabel: product.priceLabel,
    discountLabel: product.discountLabel,
    previewBadgeLabel: product.previewBadgeLabel,
    previewBadgeTone: product.previewBadgeTone,
    thumbnailRadius: product.thumbnailRadius,
  }
}

function mapApiComments(
  comments: UserUploadedFeedApiItem['comments'],
): FeedCardCommentsSection {
  const items: ApiFeedComment[] = comments.items

  return {
    description: comments.description,
    showDescriptionMore: comments.showDescriptionMore,
    commentCount: comments.commentCount,
    maxVisibleComments: comments.maxVisibleComments,
    viewAllVisibility: comments.viewAllVisibility,
    items: items.map((item) => ({
      id: item.id,
      author: item.author,
      body: item.body,
      emphasize: item.emphasize,
    })),
  }
}

function mapApiProducts(
  products: UserUploadedFeedApiItem['products'],
): FeedCardProductsSection | undefined {
  if (!products) {
    return undefined
  }

  return {
    catalog: products.catalog.map(mapApiProduct),
    presentation: products.presentation,
    previewProductIds: products.previewProductIds,
    previewCount: products.previewCount,
    viewMoreVisibility: products.viewMoreVisibility,
    viewMoreLabel: products.viewMoreLabel,
  }
}

function mapApiReactions(
  reactions:
    | UserUploadedFeedApiItem['reactions']
    | LongformAdviceFeedApiItem['reactions'],
): FeedReactionBarProps {
  return {
    metrics: reactions.metrics.map((metric) => ({
      id: metric.id,
      iconSrc: metric.icon.src,
      iconWidth: metric.iconWidth,
      iconHeight: metric.iconHeight,
      count: metric.count,
    })),
    saveIconSrc: reactions.save.icon.src,
    saveIconWidth: reactions.save.iconWidth,
    saveIconHeight: reactions.save.iconHeight,
    saveCount: reactions.save.count,
  }
}

function mapUserUploadedItem(item: UserUploadedFeedApiItem): HomeFeedItem {
  const card: FeedCardProps = {
    recommendationTitle: item.recommendationTitle,
    header: {
      avatarSrc: item.header.avatar.src,
      name: item.header.name,
      subtitle: item.header.subtitle,
      actionLabel: item.header.actionLabel,
      showOverflowAction: item.header.showOverflowAction,
      topPadding: item.header.topPadding,
    },
    media: {
      slides: item.media.slides.map(mapApiSlide),
      imageHeight: item.media.imageHeight,
      topPadding: item.media.topPadding,
    },
    products: mapApiProducts(item.products),
    featuredProduct: item.featuredProduct
      ? { product: mapApiProduct(item.featuredProduct) }
      : undefined,
    reactions: mapApiReactions(item.reactions),
    comments: mapApiComments(item.comments),
    contentsInfo: item.contentsInfo,
  }

  return {
    id: item.id,
    type: 'user-uploaded',
    productSheetTitle: item.productSheetTitle,
    card,
  }
}

function mapLongformAdviceItem(item: LongformAdviceFeedApiItem): HomeFeedItem {
  const header: FeedCardHeaderProps = {
    avatarSrc: item.profile.avatar.src,
    name: item.profile.name,
    subtitle: item.profile.subtitle,
    actionLabel: item.profile.actionLabel,
    showOverflowAction: item.profile.showOverflowAction,
  }

  return {
    id: item.id,
    type: 'longform-advice',
    header,
    media: {
      slides: item.media.slides.map(mapApiSlide),
      imageHeight: item.media.imageHeight ?? 280,
    },
    imageBar: item.imageBar,
    reactions: mapApiReactions(item.reactions),
  }
}

function mapBrandPromoItem(item: BrandPromoFeedApiItem): HomeFeedItem {
  return {
    id: item.id,
    type: 'brand-promo',
    profile: {
      avatarSrc: item.profile.avatar.src,
      brandName: item.profile.brandName,
      saveCount: item.profile.saveCount,
    },
    media: {
      slides: item.media.slides.map(mapApiSlide),
    },
    title: item.title,
    description: item.description,
    products: item.products.map(mapApiProduct),
  }
}

function mapAdItem(item: AdFeedApiItem): HomeFeedItem {
  return {
    id: item.id,
    type: 'ad',
    profile: {
      brandName: item.profile.brandName,
      badgeLabel: item.profile.badgeLabel,
    },
    media: {
      slides: item.media.slides.map(mapApiSlide),
    },
    viewMoreLabel: item.viewMoreLabel,
    description: item.description,
    featuredProduct: {
      ...mapApiProduct(item.featuredProduct),
      ratingLabel: item.featuredProduct.ratingLabel,
      reviewCountLabel: item.featuredProduct.reviewCountLabel,
    },
  }
}

function mapRenovationReviewItem(
  item: RenovationReviewFeedApiItem,
): HomeFeedItem {
  return {
    id: item.id,
    type: 'renovation-review',
    profile: {
      avatarSrc: item.profile.avatar.src,
      name: item.profile.name,
      subtitle: item.profile.subtitle,
      actionLabel: item.profile.actionLabel,
    },
    media: {
      slides: item.media.slides.map(mapApiSlide),
    },
    viewMoreLabel: item.viewMoreLabel,
    expertInfo: item.expertInfo,
    description: item.description,
  }
}

function mapProductAdItem(item: ProductAdFeedApiItem): HomeFeedItem {
  return {
    id: item.id,
    type: 'product-ad',
    title: item.title,
    badgeLabel: item.badgeLabel,
    products: item.products.map((product) => ({
      id: product.id,
      imageSrc: product.image.src,
      imageAlt: product.image.alt,
      brandName: product.brandName,
      name: product.name,
      discountLabel: product.discountLabel,
      priceLabel: product.priceLabel,
    })),
  }
}

export function mapPersonalizedFeedApiItem(
  item: PersonalizedFeedApiItem,
): HomeFeedItem {
  switch (item.type) {
    case 'user-uploaded':
      return mapUserUploadedItem(item)
    case 'brand-promo':
      return mapBrandPromoItem(item)
    case 'ad':
      return mapAdItem(item)
    case 'renovation-review':
      return mapRenovationReviewItem(item)
    case 'product-ad':
      return mapProductAdItem(item)
    case 'longform-advice':
      return mapLongformAdviceItem(item)
  }
}

export function mapPersonalizedFeedApiResponse(
  response: PersonalizedFeedApiResponse,
): HomeFeedItem[] {
  return response.items.map(mapPersonalizedFeedApiItem)
}

export function getInitialPersonalizedFeedItems(): HomeFeedItem[] {
  return mapPersonalizedFeedApiResponse(personalizedFeedApiResponse)
}

export async function fetchPersonalizedFeedResponse(): Promise<PersonalizedFeedApiResponse> {
  return personalizedFeedApiResponse
}

export async function fetchPersonalizedFeedItems(): Promise<HomeFeedItem[]> {
  const response = await fetchPersonalizedFeedResponse()

  return mapPersonalizedFeedApiResponse(response)
}
