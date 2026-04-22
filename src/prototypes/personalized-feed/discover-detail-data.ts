import type { HomeFeedItem, UserUploadedFeedItem } from '../../system/feed'

const assetRoot = '/assets/figma/personalized-feed/discover-detail'
const reactionIconRoot = '/assets/figma/personalized-feed/reaction-bar'

const reactionIcons = {
  like: `${reactionIconRoot}/heart-24.svg`,
  comment: `${reactionIconRoot}/comment-24.svg`,
  share: `${reactionIconRoot}/export-24.svg`,
  save: `${reactionIconRoot}/scrap-24.svg`,
} as const

function createReactionBar({
  comment,
  like,
  save,
  share,
}: {
  like: number | string
  comment: number | string
  share: number | string
  save: number | string
}): UserUploadedFeedItem['card']['reactions'] {
  return {
    metrics: [
      {
        id: 'Like',
        iconSrc: reactionIcons.like,
        iconWidth: 20.8,
        iconHeight: 17.8946,
        count: like,
      },
      {
        id: 'Comment',
        iconSrc: reactionIcons.comment,
        iconWidth: 19.5,
        iconHeight: 19.4371,
        count: comment,
      },
      {
        id: 'Share',
        iconSrc: reactionIcons.share,
        iconWidth: 17.8,
        iconHeight: 19.2395,
        count: share,
      },
    ],
    saveIconSrc: reactionIcons.save,
    saveIconWidth: 16,
    saveIconHeight: 19.3975,
    saveCount: save,
  }
}

function createRepeatedSlides({
  alt,
  imageSrc,
  postId,
  productIds,
  tagPositions,
}: {
  alt: string
  imageSrc: string
  postId: string
  productIds: string[]
  tagPositions: Array<{ left: number; top: number }>
}) {
  return Array.from({ length: 10 }, (_, index) => ({
    id: `${postId}-slide-${index + 1}`,
    src: imageSrc,
    alt,
    tags: tagPositions.map((position, tagIndex) => ({
      id: `${postId}-tag-${index + 1}-${tagIndex + 1}`,
      productId: productIds[tagIndex] ?? productIds[0] ?? '',
      left: position.left,
      top: position.top,
    })),
  }))
}

const profile = {
  avatarSrc: `${assetRoot}/avatar-2x.png`,
  name: 'H.House',
  subtitle: 'Cultivating today',
  actionLabel: 'Follow',
} as const

const firstPostProducts = [
  {
    id: 'white-storage-cabinet',
    thumbnailSrc: `${assetRoot}/post-01-product-01-2x.png`,
    thumbnailAlt: 'White storage cabinet',
    name: 'White Storage Cabinet',
    priceLabel: '139,000',
    thumbnailRadius: 4,
  },
  {
    id: 'studio-rug',
    thumbnailSrc: `${assetRoot}/post-01-product-02-2x.png`,
    thumbnailAlt: 'Patterned studio rug',
    name: 'Patterned Studio Rug',
    priceLabel: '271,000',
    thumbnailRadius: 4,
  },
  {
    id: 'green-lounge-chair',
    thumbnailSrc: `${assetRoot}/post-01-product-03-2x.png`,
    thumbnailAlt: 'Green lounge chair',
    name: 'Green Lounge Chair',
    priceLabel: '1,140,000',
    thumbnailRadius: 4,
  },
  {
    id: 'round-area-rug',
    thumbnailSrc: `${assetRoot}/post-01-product-04-2x.png`,
    thumbnailAlt: 'Round area rug',
    name: 'Round Area Rug',
    priceLabel: '172,050',
    thumbnailRadius: 4,
  },
]

const secondPostProducts = [
  {
    id: 'black-side-table',
    thumbnailSrc: `${assetRoot}/post-02-product-01-2x.png`,
    thumbnailAlt: 'Black side table',
    name: 'Black Side Table',
    priceLabel: '89,000',
    thumbnailRadius: 4,
  },
  {
    id: 'green-lounge-chair-2',
    thumbnailSrc: `${assetRoot}/post-02-product-02-2x.png`,
    thumbnailAlt: 'Green lounge chair',
    name: 'Green Lounge Chair',
    priceLabel: '1,140,000',
    thumbnailRadius: 4,
  },
  {
    id: 'potted-plant',
    thumbnailSrc: `${assetRoot}/post-02-product-03-2x.png`,
    thumbnailAlt: 'Potted plant',
    name: 'Potted Plant',
    priceLabel: '25,600',
    thumbnailRadius: 4,
  },
  {
    id: 'abstract-poster',
    thumbnailSrc: `${assetRoot}/post-02-product-04-2x.png`,
    thumbnailAlt: 'Abstract poster',
    name: 'Abstract Poster',
    priceLabel: '18,000',
    previewBadgeLabel: 'Similar',
    thumbnailRadius: 4,
  },
]

const thirdPostProducts = [
  {
    id: 'black-frame',
    thumbnailSrc: `${assetRoot}/post-03-product-01-2x.png`,
    thumbnailAlt: 'Black poster frame',
    name: 'Black Poster Frame',
    priceLabel: '18,000',
    thumbnailRadius: 4,
  },
  {
    id: 'art-poster',
    thumbnailSrc: `${assetRoot}/post-03-product-02-2x.png`,
    thumbnailAlt: 'Art poster',
    name: 'Art Poster',
    priceLabel: '41,000',
    thumbnailRadius: 4,
  },
  {
    id: 'linen-curtain',
    thumbnailSrc: `${assetRoot}/post-03-product-03-2x.png`,
    thumbnailAlt: 'Linen curtain',
    name: 'Linen Curtain',
    priceLabel: '54,000',
    thumbnailRadius: 4,
  },
  {
    id: 'magazine-cover',
    thumbnailSrc: `${assetRoot}/post-03-product-04-2x.png`,
    thumbnailAlt: 'Magazine cover',
    name: 'Magazine Cover',
    priceLabel: '22,000',
    previewBadgeLabel: 'Similar',
    thumbnailRadius: 4,
  },
]

export const discoverDetailFeedItems: HomeFeedItem[] = [
  {
    id: 'discover-detail-green-chair',
    type: 'user-uploaded',
    productSheetTitle: 'In this photo 24',
    card: {
      header: profile,
      media: {
        topPadding: 0,
        slides: createRepeatedSlides({
          postId: 'discover-green-chair',
          imageSrc: `${assetRoot}/hero-01-2x.png`,
          alt: 'A bright studio with a green lounge chair and plant styling.',
          productIds: firstPostProducts.map((product) => product.id),
          tagPositions: [
            { left: 127, top: 156 },
            { left: 71, top: 251 },
            { left: 51, top: 341 },
            { left: 252, top: 181 },
          ],
        }),
      },
      products: {
        catalog: firstPostProducts,
        previewProductIds: firstPostProducts.map((product) => product.id),
      },
      reactions: createReactionBar({
        like: 175,
        comment: 14,
        share: 12,
        save: 868,
      }),
      comments: {
        description:
          'This is my favorite piece of furniture in the studio. I place my plants on it and store my plant care essentials here.',
        commentCount: 14,
        items: [
          {
            id: 'discover-detail-comment-1',
            author: 'minironi_home',
            body:
              'storage cabinet is so stylish. It blends well with the accessories too. The postcards are cute as well :)',
          },
          {
            id: 'discover-detail-comment-2',
            author: 'docbshakcn',
            body:
              'The boardroom is so beautiful; it seems like the atmosphere is everything.',
          },
        ],
      },
    },
  },
  {
    id: 'discover-detail-sunlit-routine',
    type: 'user-uploaded',
    productSheetTitle: 'In this photo 4',
    card: {
      header: {
        ...profile,
        topPadding: 0,
      },
      media: {
        topPadding: 0,
        slides: createRepeatedSlides({
          postId: 'discover-sunlit-routine',
          imageSrc: `${assetRoot}/hero-02-2x.png`,
          alt: 'A sunlit room with a green chair, side table, and plants.',
          productIds: secondPostProducts.map((product) => product.id),
          tagPositions: [
            { left: 81, top: 181 },
            { left: 161, top: 271 },
            { left: 302, top: 91 },
          ],
        }),
      },
      products: {
        catalog: secondPostProducts,
        previewProductIds: secondPostProducts.map((product) => product.id),
        viewMoreVisibility: 'never',
      },
      reactions: createReactionBar({
        like: 420,
        comment: 55,
        share: 67,
        save: '3K',
      }),
      comments: {
        description:
          'These days, my hobby is finding playlists that match my taste and wrapping up the day with a cup of tea while listening to music. 🎶',
        items: [],
        viewAllVisibility: 'never',
      },
    },
  },
  {
    id: 'discover-detail-product-ad',
    type: 'product-ad',
    title: 'Recommended For You',
    badgeLabel: 'AD',
    products: [
      {
        id: 'oatmeal-house-bunker-storage',
        imageSrc: `${assetRoot}/ad-product-01-2x.png`,
        imageAlt: 'Daisy LED lighting 3-tier bunker storage in a bedroom.',
        brandName: 'Oatmeal House',
        name: 'Daisy LED Lighting 3-Tier Bunker Storage',
        discountLabel: '40%',
        priceLabel: '229,000',
      },
      {
        id: 'table-mood-capsule-drawer',
        imageSrc: `${assetRoot}/ad-product-02-2x.png`,
        imageAlt: 'Slim coffee capsule storage and machine tray.',
        brandName: 'Table Mood',
        name: 'Nespresso Slim Coffee Capsule Compatible Drawer',
        discountLabel: '36%',
        priceLabel: '44,910',
      },
      {
        id: 'xiaomi-smart-trash-can',
        imageSrc: `${assetRoot}/ad-product-03-2x.png`,
        imageAlt: 'Automatic sensor smart trash can near a potted plant.',
        brandName: 'Xiaomi',
        name: 'Miho Automatic Sensor Smart Trash Can',
        discountLabel: '46%',
        priceLabel: '82,900',
      },
      {
        id: 'room-spray-250ml',
        imageSrc: `${assetRoot}/ad-product-04-2x.png`,
        imageAlt: 'Fabric fragrance deodorizer room spray bottle.',
        brandName: '912',
        name: 'Fabric Fragrance Fabric Deodorizer Room Spray Multi 250ml',
        discountLabel: '40% Off',
        priceLabel: '$8,900',
      },
      {
        id: 'coco-design-stainless',
        imageSrc: `${assetRoot}/ad-product-05-2x.png`,
        imageAlt: 'Stainless mid-century modern kitchen item.',
        brandName: 'Coco Design',
        name: 'Launch Celebration Domestic Stainless Steel Mid-Century Modern Strong',
        discountLabel: '36% Off',
        priceLabel: '$123,500',
      },
      {
        id: 'half-moon-rhipsalis',
        imageSrc: `${assetRoot}/ad-product-06-2x.png`,
        imageAlt: 'Hanging rhipsalis plant in a white yellow pot.',
        brandName: 'Half Moon Flower Market',
        name: 'Hanging Rhipsalis White Yellow Pot',
        discountLabel: '12% Off',
        priceLabel: '$12,000',
      },
    ],
  },
  {
    id: 'discover-detail-tounou',
    type: 'user-uploaded',
    productSheetTitle: 'In this photo 4',
    card: {
      header: profile,
      media: {
        topPadding: 0,
        slides: createRepeatedSlides({
          postId: 'discover-tounou',
          imageSrc: `${assetRoot}/hero-03-2x.png`,
          alt: 'A white interior with green chair, wall art, and cabinet styling.',
          productIds: thirdPostProducts.map((product) => product.id),
          tagPositions: [
            { left: 81, top: 181 },
            { left: 161, top: 271 },
            { left: 302, top: 91 },
          ],
        }),
      },
      products: {
        catalog: thirdPostProducts,
        previewProductIds: thirdPostProducts.map((product) => product.id),
        viewMoreVisibility: 'never',
      },
      reactions: createReactionBar({
        like: 79,
        comment: 3,
        share: 12,
        save: 868,
      }),
      comments: {
        description:
          "<Introducing My Favorite Brand 2: TOUNOU> An art editing shop, TOUNOU, where just browsing makes time fly. 🖤 It features a wide variety of colorful works from different artists, including posters, fabrics, and electronic accessories, so there's plenty to see.",
        items: [],
        viewAllVisibility: 'never',
      },
    },
  },
]
