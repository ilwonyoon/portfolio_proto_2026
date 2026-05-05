import type { HomeFeedItem, UserUploadedFeedItem } from '../../system/feed'
import { getInitialPersonalizedFeedItems } from '../personalized-feed/feed-api'

const feedRoot = '/assets/figma/content-style-transfer/feed'
const reactionAssetRoot = '/assets/figma/personalized-feed/reaction-bar'

const reactionIcons = {
  like: `${reactionAssetRoot}/heart-24.svg`,
  comment: `${reactionAssetRoot}/comment-24.svg`,
  share: `${reactionAssetRoot}/export-24.svg`,
  save: `${reactionAssetRoot}/scrap-24.svg`,
}

type FeedTagPos = { left: number; top: number }

function buildFigmaUserItem(args: {
  id: string
  assetSlug: string
  name: string
  subtitle: string
  description: string
  metrics: { like: number | string; comment: number | string; share: number | string; save: number | string }
  productNames: string[]
  tagPositions: FeedTagPos[]
  slideCountLabel?: string // not strictly needed; carousel infers from slides
  comments?: {
    description: string
    commentCount: number
    items: { id: string; author: string; body: string }[]
  }
}): UserUploadedFeedItem {
  const root = `${feedRoot}/${args.assetSlug}`
  return {
    id: args.id,
    type: 'user-uploaded',
    productSheetTitle: `In this photo ${args.productNames.length}`,
    card: {
      header: {
        avatarSrc: `${root}/avatar.jpg`,
        name: args.name,
        subtitle: args.subtitle,
        actionLabel: 'Follow',
      },
      media: {
        slides: [
          {
            id: `${args.id}-photo-01`,
            src: `${root}/photo-01.jpg`,
            alt: `${args.name} styling photo`,
            tags: args.tagPositions.map((pos, i) => ({
              productId: `${args.id}-product-${i + 1}`,
              left: pos.left,
              top: pos.top,
            })),
          },
        ],
      },
      products: {
        catalog: args.productNames.map((name, i) => ({
          id: `${args.id}-product-${i + 1}`,
          thumbnailSrc: `${root}/product-${i + 1}.jpg`,
          thumbnailAlt: name,
          name,
          priceLabel: '',
        })),
        previewProductIds: args.productNames.map(
          (_, i) => `${args.id}-product-${i + 1}`,
        ),
        previewCount: Math.min(args.productNames.length, 4),
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            iconSrc: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: args.metrics.like,
          },
          {
            id: 'Comment',
            iconSrc: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: args.metrics.comment,
          },
          {
            id: 'Share',
            iconSrc: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: args.metrics.share,
          },
        ],
        saveIconSrc: reactionIcons.save,
        saveIconWidth: 16,
        saveIconHeight: 19.3975,
        saveCount: args.metrics.save,
      },
      comments: args.comments ?? {
        description: args.description,
        commentCount:
          typeof args.metrics.comment === 'number' ? args.metrics.comment : 0,
        items: [],
      },
    },
  }
}

const figmaItems: UserUploadedFeedItem[] = [
  buildFigmaUserItem({
    id: 'irishhanny',
    assetSlug: 'irishhanny',
    name: 'Irishhanny',
    subtitle: 'Building a warm home with my baby',
    description:
      'Since this room doubles as a rest space, the desk is intentionally kept minimal — just a few small objects so the eye stays on the screen or notebook, which makes it easier to focus.',
    metrics: { like: 90, comment: '', share: 40, save: 531 },
    productNames: [
      'Standing desk in white',
      'Ergonomic mesh chair',
      'Studio architect lamp',
      'Open shelf storage rack',
    ],
    tagPositions: [
      { left: 39, top: 195 },
      { left: 161, top: 271 },
      { left: 231, top: 123 },
      { left: 210, top: 221 },
    ],
    comments: {
      description:
        'Since this room doubles as a rest space, the desk is intentionally kept minimal — just a few small objects so the eye stays on the screen or notebook, which makes it easier to focus.',
      commentCount: 14,
      items: [
        {
          id: 'irishhanny-comment-1',
          author: 'minironi_home',
          body:
            'storage cabinet is so stylish. It blends well with the accessories too. The postcards are cute as well :)',
        },
        {
          id: 'irishhanny-comment-2',
          author: 'docbshakcn',
          body:
            'The boardroom is so beautiful; it seems like the atmosphere is everything.',
        },
      ],
    },
  }),
  buildFigmaUserItem({
    id: 'h-house-1',
    assetSlug: 'h-house',
    name: 'H.House',
    subtitle: 'Cultivating today',
    description:
      'This is my favorite piece of furniture in the studio. I place my plants on it and store my plant care essentials here.',
    metrics: { like: 175, comment: 14, share: 12, save: 868 },
    productNames: [
      'Woven seat lounge chair',
      'Dome floor lamp, white',
      'Walnut louver storage cabinet',
      'Glass top side table',
    ],
    tagPositions: [
      { left: 81, top: 181 },
      { left: 161, top: 271 },
      { left: 302, top: 91 },
    ],
  }),
  buildFigmaUserItem({
    id: 'h-house-2',
    assetSlug: 'h-house-2',
    name: 'H.House',
    subtitle: 'Cultivating today',
    description:
      'These days, my hobby is finding playlists that match my taste and wrapping up the day with a cup of tea while listening to music.',
    metrics: { like: 420, comment: 55, share: 67, save: '3K' },
    productNames: [
      'Slim wooden console',
      'Ceramic accent vase',
      'Linen reading chair',
      'Brass arc lamp',
    ],
    tagPositions: [
      { left: 81, top: 181 },
      { left: 161, top: 271 },
      { left: 302, top: 91 },
    ],
  }),
  buildFigmaUserItem({
    id: 'h-house-3',
    assetSlug: 'h-house-3',
    name: 'H.House',
    subtitle: 'Cultivating today',
    description:
      'Introducing My Favorite Brand 2: TOUNOU. An art editing shop where time flies — colorful posters, fabrics, and small electronic accessories from many artists.',
    metrics: { like: 79, comment: 3, share: 12, save: 868 },
    productNames: [
      'TOUNOU pendant light',
      'TOUNOU dining table',
      'TOUNOU bedside lamp',
      'TOUNOU walnut sideboard',
    ],
    tagPositions: [
      { left: 81, top: 181 },
      { left: 161, top: 271 },
      { left: 302, top: 91 },
    ],
  }),
]

export function getContentStyleTransferFeedItems(): HomeFeedItem[] {
  // Replace the first four user-uploaded cards with the Figma 6543:61888
  // sequence (Irishhanny + three H.House posts). Other module types (ads,
  // brand promos, longform) are kept from the personalized-feed mock so the
  // shell still feels populated.
  const base = getInitialPersonalizedFeedItems()
  let replacedCount = 0
  return base.map((item) => {
    if (item.type === 'user-uploaded' && replacedCount < figmaItems.length) {
      const replacement = figmaItems[replacedCount]
      replacedCount += 1
      return replacement
    }
    return item
  })
}
