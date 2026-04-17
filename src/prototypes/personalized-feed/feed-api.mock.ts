import type {
  ApiFeedProduct,
  ApiFeedSlide,
  PersonalizedFeedApiResponse,
} from './feed-api-contract'

const reactionIcons = {
  like: {
    src: '/assets/figma/personalized-feed/reaction-bar/heart-24.svg',
    alt: 'Like',
  },
  comment: {
    src: '/assets/figma/personalized-feed/reaction-bar/comment-24.svg',
    alt: 'Comment',
  },
  share: {
    src: '/assets/figma/personalized-feed/reaction-bar/export-24.svg',
    alt: 'Share',
  },
  save: {
    src: '/assets/figma/personalized-feed/reaction-bar/scrap-24.svg',
    alt: 'Scrap',
  },
} as const

const userUploadedProducts: ApiFeedProduct[] = [
  {
    id: 'panthella-floor-lamp',
    image: {
      src: '/assets/figma/personalized-feed/view-more/product-sheet-1.png',
      alt: 'Louis Poulsen Panthella Floor Lamp',
    },
    name: 'Louis Poulsen Panthella Floor Lamp',
    priceLabel: '139,000',
    thumbnailRadius: 6,
  },
  {
    id: 'cuba-chair',
    image: {
      src: '/assets/figma/personalized-feed/view-more/product-sheet-2.png',
      alt: "Carl Hansen & Søn MG501 Cuba Chair",
    },
    name: "Carl Hansen & Søn MG501 Cuba Chair",
    discountLabel: '25%',
    priceLabel: '1,140,000',
    thumbnailRadius: 6,
  },
  {
    id: 'round-dining-table',
    image: {
      src: '/assets/figma/personalized-feed/view-more/product-sheet-3.png',
      alt: 'ROUND DINING TABLE - CERAMIC',
    },
    name: 'ROUND DINING TABLE - CERAMIC',
    priceLabel: '271,000',
    thumbnailRadius: 6,
  },
  {
    id: 'arezzo-sideboard',
    image: {
      src: '/assets/figma/personalized-feed/view-more/product-sheet-4.png',
      alt: 'Arezzo Sideboard Slide Storage 1600/1800',
    },
    name: 'Arezzo Sideboard Slide Storage 1600/1800',
    discountLabel: '4%',
    priceLabel: '709,000',
    thumbnailRadius: 4,
  },
  {
    id: 'drifting-clouds-mobile',
    image: {
      src: '/assets/figma/personalized-feed/view-more/product-sheet-5.png',
      alt: 'FLENSTED MOBILES - Drifting Clouds',
    },
    name: 'FLENSTED MOBILES - Drifting Clouds',
    discountLabel: '12%',
    priceLabel: '172,050',
    thumbnailRadius: 4,
  },
  {
    id: 'nesino-floor-stand-lamp',
    image: {
      src: '/assets/figma/personalized-feed/view-more/product-sheet-6.png',
      alt: 'Official Importer_Nesino Floor Stand Table Lamp 7 Color',
    },
    name: 'Official Importer_Nesino Floor Stand Table Lamp 7 Color',
    discountLabel: '28%',
    priceLabel: '211,900',
    thumbnailRadius: 4,
  },
]

const userUploadedSlides: ApiFeedSlide[] = [
  {
    id: 'studio-1',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
      alt: 'Bright studio with a woven chair, side table, and cabinet.',
    },
    tags: [
      { id: 'tag-chair', productId: 'cuba-chair', x: 81, y: 181 },
      { id: 'tag-side-table', productId: 'panthella-floor-lamp', x: 161, y: 271 },
      { id: 'tag-cabinet', productId: 'arezzo-sideboard', x: 302, y: 91 },
    ],
  },
  {
    id: 'studio-2',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
      alt: 'Bright studio angle focused on the lounge chair and window.',
    },
    tags: [
      { id: 'tag-chair-2', productId: 'cuba-chair', x: 111, y: 214 },
      { id: 'tag-table-2', productId: 'round-dining-table', x: 193, y: 262 },
    ],
  },
  {
    id: 'studio-3',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
      alt: 'Studio detail focusing on the cabinet and art styling.',
    },
    tags: [
      { id: 'tag-art-3', productId: 'drifting-clouds-mobile', x: 244, y: 118 },
      { id: 'tag-cabinet-3', productId: 'arezzo-sideboard', x: 296, y: 166 },
    ],
  },
  {
    id: 'studio-4',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
      alt: 'Studio scene showing furniture styling details.',
    },
    tags: [
      { id: 'tag-chair-4', productId: 'cuba-chair', x: 96, y: 208 },
      { id: 'tag-pillow-4', productId: 'nesino-floor-stand-lamp', x: 286, y: 152 },
    ],
  },
  {
    id: 'studio-5',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
      alt: 'Studio view highlighting the lounge chair and side table.',
    },
    tags: [
      { id: 'tag-chair-5', productId: 'cuba-chair', x: 88, y: 178 },
      { id: 'tag-table-5', productId: 'panthella-floor-lamp', x: 162, y: 270 },
    ],
  },
  {
    id: 'studio-6',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
      alt: 'Studio composition showing seating and soft daylight.',
    },
    tags: [
      { id: 'tag-chair-6', productId: 'cuba-chair', x: 112, y: 214 },
      { id: 'tag-plant-6', productId: 'drifting-clouds-mobile', x: 286, y: 120 },
    ],
  },
  {
    id: 'studio-7',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
      alt: 'Studio composition featuring art, cabinet, and table styling.',
    },
    tags: [
      { id: 'tag-art-7', productId: 'drifting-clouds-mobile', x: 244, y: 118 },
      { id: 'tag-cabinet-7', productId: 'arezzo-sideboard', x: 302, y: 91 },
    ],
  },
  {
    id: 'studio-8',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
      alt: 'Studio angle focused on chair, lamp, and cabinet details.',
    },
    tags: [
      { id: 'tag-chair-8', productId: 'cuba-chair', x: 98, y: 206 },
      { id: 'tag-cabinet-8', productId: 'arezzo-sideboard', x: 288, y: 152 },
    ],
  },
  {
    id: 'studio-9',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-photo.png',
      alt: 'Studio shot with framed artwork and product callouts.',
    },
    tags: [
      { id: 'tag-frame-9', productId: 'drifting-clouds-mobile', x: 244, y: 118 },
      { id: 'tag-side-table-9', productId: 'panthella-floor-lamp', x: 161, y: 271 },
    ],
  },
  {
    id: 'studio-10',
    image: {
      src: '/assets/figma/personalized-feed/feed-card/media-base.jpg',
      alt: 'Studio shot for carousel testing with highlighted furniture.',
    },
    tags: [
      { id: 'tag-chair-10', productId: 'cuba-chair', x: 111, y: 214 },
      { id: 'tag-pillow-10', productId: 'nesino-floor-stand-lamp', x: 286, y: 152 },
    ],
  },
]

const recommendedPlantInteriorProducts: ApiFeedProduct[] = [
  {
    id: 'stone-serve-plate',
    image: {
      src: '/assets/figma/personalized-feed/btf-recommended/product-1.png',
      alt: 'Stone textured serving plate',
    },
    name: 'Stone textured serving plate',
    priceLabel: '52,000',
    thumbnailRadius: 4,
  },
  {
    id: 'ceramic-clock',
    image: {
      src: '/assets/figma/personalized-feed/btf-recommended/product-2.png',
      alt: 'Ceramic table clock',
    },
    name: 'Ceramic table clock',
    priceLabel: '39,000',
    thumbnailRadius: 4,
  },
  {
    id: 'sheer-curtain',
    image: {
      src: '/assets/figma/personalized-feed/btf-recommended/product-3.png',
      alt: 'Warm white sheer curtain',
    },
    name: 'Warm white sheer curtain',
    priceLabel: '68,000',
    thumbnailRadius: 4,
  },
  {
    id: 'wooden-side-stool',
    image: {
      src: '/assets/figma/personalized-feed/btf-recommended/product-4.png',
      alt: 'Wooden side stool',
    },
    name: 'Wooden side stool',
    priceLabel: '119,000',
    previewBadgeLabel: 'Similar',
    thumbnailRadius: 4,
  },
]

const recommendedPlantInteriorSlides: ApiFeedSlide[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `plant-interior-${index + 1}`,
    image: {
      src: '/assets/figma/personalized-feed/btf-recommended/hero.png',
      alt: 'Housewarming table setting with plated dishes and a centerpiece.',
    },
    tags: [
      { id: 'plant-tag-1', productId: 'stone-serve-plate', x: 81, y: 181 },
      { id: 'plant-tag-2', productId: 'ceramic-clock', x: 161, y: 271 },
      { id: 'plant-tag-3', productId: 'wooden-side-stool', x: 302, y: 91 },
    ],
  }),
)

const campingSlides: ApiFeedSlide[] = Array.from({ length: 10 }, (_, index) => ({
  id: `camping-${index + 1}`,
    image: {
      src: '/assets/figma/personalized-feed/btf-camping/hero.png',
      alt: 'Orange camping tent at dusk under a blue evening sky.',
    },
    tags: [],
  }),
)

const routineProducts: ApiFeedProduct[] = [
  {
    id: 'tea-mug',
    image: {
      src: '/assets/figma/personalized-feed/btf-routine/product-1.png',
      alt: 'Glass mug',
    },
    name: 'Glass mug',
    priceLabel: '12,900',
    previewBadgeLabel: 'Sale',
    previewBadgeTone: 'critical',
    thumbnailRadius: 4,
  },
  {
    id: 'tea-kettle',
    image: {
      src: '/assets/figma/personalized-feed/btf-routine/product-2.png',
      alt: 'Ceramic kettle',
    },
    name: 'Ceramic kettle',
    priceLabel: '39,000',
    thumbnailRadius: 4,
  },
  {
    id: 'wood-tray',
    image: {
      src: '/assets/figma/personalized-feed/btf-routine/product-3.png',
      alt: 'Wood tea tray',
    },
    name: 'Wood tea tray',
    priceLabel: '24,000',
    thumbnailRadius: 4,
  },
  {
    id: 'vinyl-speaker',
    image: {
      src: '/assets/figma/personalized-feed/btf-routine/product-4.png',
      alt: 'Vintage speaker',
    },
    name: 'Vintage speaker',
    priceLabel: '128,000',
    previewBadgeLabel: 'Similar',
    thumbnailRadius: 4,
  },
]

const routineSlides: ApiFeedSlide[] = Array.from({ length: 10 }, (_, index) => ({
  id: `routine-${index + 1}`,
  image: {
    src: '/assets/figma/personalized-feed/btf-routine/hero.png',
    alt: 'Cozy home routine scene with tea and playlist mood.',
  },
  tags: [
    { id: `routine-tag-1-${index + 1}`, productId: 'tea-mug', x: 81, y: 181 },
    { id: `routine-tag-2-${index + 1}`, productId: 'tea-kettle', x: 161, y: 271 },
    { id: `routine-tag-3-${index + 1}`, productId: 'vinyl-speaker', x: 302, y: 91 },
  ],
}))

const tounouProducts: ApiFeedProduct[] = [
  {
    id: 'poster-frame',
    image: {
      src: '/assets/figma/personalized-feed/btf-tounou/product-1.png',
      alt: 'Poster frame',
    },
    name: 'Poster frame',
    priceLabel: '18,000',
    thumbnailRadius: 4,
  },
  {
    id: 'round-clock',
    image: {
      src: '/assets/figma/personalized-feed/btf-tounou/product-2.png',
      alt: 'Round wall clock',
    },
    name: 'Round wall clock',
    priceLabel: '41,000',
    thumbnailRadius: 4,
  },
  {
    id: 'linen-curtain',
    image: {
      src: '/assets/figma/personalized-feed/btf-tounou/product-3.png',
      alt: 'Linen curtain',
    },
    name: 'Linen curtain',
    priceLabel: '54,000',
    thumbnailRadius: 4,
  },
  {
    id: 'accent-cabinet',
    image: {
      src: '/assets/figma/personalized-feed/btf-tounou/product-4.png',
      alt: 'Accent cabinet',
    },
    name: 'Accent cabinet',
    priceLabel: '239,000',
    previewBadgeLabel: 'Similar',
    thumbnailRadius: 4,
  },
]

const tounouSlides: ApiFeedSlide[] = Array.from({ length: 10 }, (_, index) => ({
  id: `tounou-${index + 1}`,
  image: {
    src: '/assets/figma/personalized-feed/btf-tounou/hero.png',
    alt: 'Tounou art editing shop inspired interior scene.',
  },
  tags: [
    { id: `tounou-tag-1-${index + 1}`, productId: 'poster-frame', x: 81, y: 181 },
    { id: `tounou-tag-2-${index + 1}`, productId: 'round-clock', x: 161, y: 271 },
    { id: `tounou-tag-3-${index + 1}`, productId: 'accent-cabinet', x: 302, y: 91 },
  ],
}))

const plateSlides: ApiFeedSlide[] = Array.from({ length: 10 }, (_, index) => ({
  id: `plate-${index + 1}`,
  image: {
    src: '/assets/figma/personalized-feed/btf-plate/hero.png',
    alt: 'Styled dining scene with lettering plate.',
  },
  tags: [
    { id: `plate-tag-${index + 1}`, productId: 'cuckoo-lettering-plate', x: 301, y: 91 },
  ],
}))

const kitchenProducts: ApiFeedProduct[] = [
  {
    id: 'tile-tray',
    image: {
      src: '/assets/figma/personalized-feed/btf-kitchen/product-1.png',
      alt: 'Tile tray',
    },
    name: 'Tile tray',
    priceLabel: '18,000',
    thumbnailRadius: 4,
  },
  {
    id: 'espresso-cup',
    image: {
      src: '/assets/figma/personalized-feed/btf-kitchen/product-2.png',
      alt: 'Espresso cup',
    },
    name: 'Espresso cup',
    priceLabel: '14,900',
    thumbnailRadius: 4,
  },
  {
    id: 'stainless-kettle',
    image: {
      src: '/assets/figma/personalized-feed/btf-kitchen/product-3.png',
      alt: 'Stainless kettle',
    },
    name: 'Stainless kettle',
    priceLabel: '36,000',
    thumbnailRadius: 4,
  },
  {
    id: 'wood-board',
    image: {
      src: '/assets/figma/personalized-feed/btf-kitchen/product-4.png',
      alt: 'Wood board',
    },
    name: 'Wood board',
    priceLabel: '22,000',
    previewBadgeLabel: 'Similar',
    thumbnailRadius: 4,
  },
]

const kitchenSlides: ApiFeedSlide[] = Array.from({ length: 10 }, (_, index) => ({
  id: `kitchen-${index + 1}`,
  image: {
    src: '/assets/figma/personalized-feed/btf-kitchen/hero.png',
    alt: 'Home cafe kitchen styling with tiled floor.',
  },
  tags: [
    { id: `kitchen-tag-1-${index + 1}`, productId: 'tile-tray', x: 81, y: 181 },
    { id: `kitchen-tag-2-${index + 1}`, productId: 'espresso-cup', x: 161, y: 271 },
    { id: `kitchen-tag-3-${index + 1}`, productId: 'wood-board', x: 302, y: 91 },
  ],
}))

const soopSlides: ApiFeedSlide[] = Array.from({ length: 10 }, (_, index) => ({
  id: `soop-${index + 1}`,
  image: {
    src: '/assets/figma/personalized-feed/btf-soop87/hero.png',
    alt: 'Sunny plant corner with hanging air plant.',
  },
  tags: [
    { id: `soop-tag-${index + 1}`, productId: 'tillandsia-capitata', x: 161, y: 271 },
  ],
}))

const postcardProducts: ApiFeedProduct[] = [
  {
    id: 'postcard-frame',
    image: {
      src: '/assets/figma/personalized-feed/btf-postcard/product-1.png',
      alt: 'Postcard frame',
    },
    name: 'Postcard frame',
    priceLabel: '13,900',
    thumbnailRadius: 4,
  },
  {
    id: 'mini-vase',
    image: {
      src: '/assets/figma/personalized-feed/btf-postcard/product-2.png',
      alt: 'Mini vase',
    },
    name: 'Mini vase',
    priceLabel: '21,000',
    thumbnailRadius: 4,
  },
  {
    id: 'bedroom-linen',
    image: {
      src: '/assets/figma/personalized-feed/btf-postcard/product-3.png',
      alt: 'Bedroom linen',
    },
    name: 'Bedroom linen',
    priceLabel: '64,000',
    thumbnailRadius: 4,
  },
  {
    id: 'wood-side-shelf',
    image: {
      src: '/assets/figma/personalized-feed/btf-postcard/product-4.png',
      alt: 'Wood side shelf',
    },
    name: 'Wood side shelf',
    priceLabel: '118,000',
    previewBadgeLabel: 'Similar',
    thumbnailRadius: 4,
  },
]

const postcardSlides: ApiFeedSlide[] = Array.from({ length: 10 }, (_, index) => ({
  id: `postcard-${index + 1}`,
  image: {
    src: '/assets/figma/personalized-feed/btf-postcard/hero.png',
    alt: 'Bedroom styling with postcard and decor.',
  },
  tags: [
    { id: `postcard-tag-1-${index + 1}`, productId: 'postcard-frame', x: 81, y: 181 },
    { id: `postcard-tag-2-${index + 1}`, productId: 'mini-vase', x: 161, y: 271 },
    { id: `postcard-tag-3-${index + 1}`, productId: 'wood-side-shelf', x: 302, y: 91 },
  ],
}))

const longformAdviceSlides: ApiFeedSlide[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: `longform-advice-${index + 1}`,
    image: {
      src: '/assets/figma/personalized-feed/btf-longform/hero.png',
      alt: 'Longform storage advice hero scene.',
    },
    tags: [],
  }),
)

const brandPromoSlides = Array.from({ length: 10 }, (_, index) => ({
  id: `flatpoint-slide-${index + 1}`,
  image: {
    src: '/assets/figma/personalized-feed/brand-promo/hero.png',
    alt: 'Flat Point modular furniture promotion.',
  },
  tags: [],
}))

const adSlides = Array.from({ length: 10 }, (_, index) => ({
  id: `hay-ad-slide-${index + 1}`,
  image: {
    src: '/assets/figma/personalized-feed/ad/hero.png',
    alt: 'HAY desk lamp advertisement.',
  },
  tags: [
    {
      id: `hay-ad-tag-${index + 1}`,
      productId: 'apex-desk-clamp-light',
      x: 146,
      y: 262,
    },
  ],
}))

const renovationReviewSlides = Array.from({ length: 10 }, (_, index) => ({
  id: `slow-luu-review-slide-${index + 1}`,
  image: {
    src: '/assets/figma/personalized-feed/renovation-review/hero-overlay.png',
    alt: 'Compact studio renovation review with bedroom and kitchen view.',
  },
  tags: [],
}))

export const personalizedFeedApiResponse: PersonalizedFeedApiResponse = {
  items: [
    {
      id: 'h-house-studio',
      type: 'user-uploaded',
      productSheetTitle: 'In this photo 24',
      header: {
        avatar: {
          src: '/assets/figma/personalized-feed/feed-card/avatar.png',
          alt: 'H.House profile',
        },
        name: 'H.House',
        subtitle: 'Cultivating today',
        actionLabel: 'Follow',
      },
      media: {
        slides: userUploadedSlides,
      },
      products: {
        catalog: userUploadedProducts,
        previewProductIds: [
          'panthella-floor-lamp',
          'cuba-chair',
          'round-dining-table',
          'arezzo-sideboard',
        ],
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: 175,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: 14,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 12,
          },
        ],
        save: {
          icon: reactionIcons.save,
          iconWidth: 16,
          iconHeight: 19.3975,
          count: 868,
        },
      },
      comments: {
        description:
          'This is my favorite piece of furniture in the studio. I place my plants on it and store my plant care essentials here.',
        commentCount: 14,
        items: [
          {
            id: 'comment-1',
            author: 'minironi_home',
            body:
              'storage cabinet is so stylish. It blends well with the accessories too. The postcards are cute as well :)',
          },
          {
            id: 'comment-2',
            author: 'docbshakcn',
            body:
              'The boardroom is so beautiful; it seems like the atmosphere is everything.',
          },
        ],
      },
    },
    {
      id: 'h-house-routine',
      type: 'user-uploaded',
      productSheetTitle: 'In this photo 4',
      header: {
        avatar: {
          src: '/assets/figma/personalized-feed/btf-routine/avatar.png',
          alt: 'H.House profile',
        },
        name: 'H.House',
        subtitle: 'Cultivating today',
        actionLabel: 'Follow',
      },
      media: {
        slides: routineSlides,
      },
      products: {
        catalog: routineProducts,
        previewProductIds: ['tea-mug', 'tea-kettle', 'wood-tray', 'vinyl-speaker'],
        viewMoreVisibility: 'never',
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: 420,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: 55,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 67,
          },
        ],
        save: {
          icon: reactionIcons.save,
          iconWidth: 16,
          iconHeight: 19.3975,
          count: '3K',
        },
      },
      comments: {
        description:
          'These days, my hobby is finding playlists that match my taste and wrapping up the day with a cup of tea while listening to music. 🎶',
        items: [],
        viewAllVisibility: 'never',
      },
    },
    {
      id: 'recommended-product-ad',
      type: 'product-ad',
      title: 'Recommended For You',
      badgeLabel: 'AD',
      products: [
        {
          id: 'oatmeal-house-bunker-storage',
          image: {
            src: '/assets/figma/personalized-feed/product-ad/product-1.png',
            alt: 'Daisy LED lighting 3-tier bunker storage in a bedroom.',
          },
          brandName: 'Oatmeal House',
          name: 'Daisy LED Lighting 3-Tier Bunker Storage',
          discountLabel: '40%',
          priceLabel: '229,000',
        },
        {
          id: 'table-mood-capsule-drawer',
          image: {
            src: '/assets/figma/personalized-feed/product-ad/product-2.png',
            alt: 'Slim coffee capsule storage and machine tray.',
          },
          brandName: 'Table Mood',
          name: 'Nespresso Slim Coffee Capsule Compatible Drawer',
          discountLabel: '36%',
          priceLabel: '44,910',
        },
        {
          id: 'xiaomi-smart-trash-can',
          image: {
            src: '/assets/figma/personalized-feed/product-ad/product-3.png',
            alt: 'Automatic sensor smart trash can near a potted plant.',
          },
          brandName: 'Xiaomi',
          name: 'Miho Automatic Sensor Smart Trash Can',
          discountLabel: '46%',
          priceLabel: '82,900',
        },
        {
          id: 'room-spray-250ml',
          image: {
            src: '/assets/figma/personalized-feed/product-ad/product-4.png',
            alt: 'Fabric fragrance deodorizer room spray bottle.',
          },
          brandName: '912',
          name: 'Fabric Fragrance Deodorizer Room Spray Multi 250ml',
          discountLabel: '40% Off',
          priceLabel: '$8,900',
        },
        {
          id: 'coco-design-stainless',
          image: {
            src: '/assets/figma/personalized-feed/product-ad/product-5.png',
            alt: 'Stainless mid-century modern kitchen item.',
          },
          brandName: 'Coco Design',
          name: 'Launch Celebration Stainless Mid-Century Modern Piece',
          discountLabel: '36% Off',
          priceLabel: '$123,500',
        },
        {
          id: 'half-moon-rhipsalis',
          image: {
            src: '/assets/figma/personalized-feed/product-ad/product-6.png',
            alt: 'Hanging rhipsalis plant in a white yellow pot.',
          },
          brandName: 'Half Moon Flower Market',
          name: 'Hanging Rhipsalis White Yellow Pot',
          discountLabel: '12% Off',
          priceLabel: '$12,000',
        },
      ],
    },
    {
      id: 'h-house-tounou',
      type: 'user-uploaded',
      productSheetTitle: 'In this photo 4',
      header: {
        avatar: {
          src: '/assets/figma/personalized-feed/btf-tounou/avatar.png',
          alt: 'H.House profile',
        },
        name: 'H.House',
        subtitle: 'Cultivating today',
        actionLabel: 'Follow',
      },
      media: {
        slides: tounouSlides,
      },
      products: {
        catalog: tounouProducts,
        previewProductIds: [
          'poster-frame',
          'round-clock',
          'linen-curtain',
          'accent-cabinet',
        ],
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: 79,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: 3,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 12,
          },
        ],
        save: {
          icon: reactionIcons.save,
          iconWidth: 16,
          iconHeight: 19.3975,
          count: 868,
        },
      },
      comments: {
        description:
          '<Introducing My Favorite Brand 2: TOUNOU> An art editing shop, TOUNOU, where just browsing makes time fly. It features a wide variety of colorful works from different artists, including posters, fabrics, and electronic accessories, so there is plenty to see.',
        items: [],
        viewAllVisibility: 'never',
      },
    },
    {
      id: 'flatpoint-promotion',
      type: 'brand-promo',
      profile: {
        avatar: {
          src: '/assets/figma/personalized-feed/brand-promo/avatar.png',
          alt: 'flatpoint profile',
        },
        brandName: 'flatpoint',
        saveCount: 868,
      },
      media: {
        slides: brandPromoSlides,
      },
      title: 'FLAT POINT promotion',
      description:
        'Classic Modular Furniture: Completing Everyday Points with a 10% Coupon',
      products: [
        {
          id: 'flatpoint-lamp',
          image: {
            src: '/assets/figma/personalized-feed/brand-promo/product-1.png',
            alt: 'Flat Point featured product lamp',
          },
          name: 'Flat Point featured product lamp',
          priceLabel: '',
          thumbnailRadius: 4,
        },
        {
          id: 'flatpoint-chair',
          image: {
            src: '/assets/figma/personalized-feed/brand-promo/product-2.png',
            alt: 'Flat Point featured product chair',
          },
          name: 'Flat Point featured product chair',
          priceLabel: '',
          thumbnailRadius: 4,
        },
      ],
    },
    {
      id: 'hay-ad',
      type: 'ad',
      profile: {
        brandName: 'HAY',
        badgeLabel: 'AD',
      },
      media: {
        slides: adSlides,
      },
      viewMoreLabel: 'View more',
      description:
        "\"I think this is truly the prettiest among the lights! The colors and shapes are just to my liking 🙃\" - Review by Mokongne",
      featuredProduct: {
        id: 'apex-desk-clamp-light',
        image: {
          src: '/assets/figma/personalized-feed/ad/product.png',
          alt: 'APEX Desk Clamp Light',
        },
        name: '[Overseas] APEX Desk Clamp Light 3 Colors',
        discountLabel: '28%',
        priceLabel: '189,120',
        thumbnailRadius: 4,
        ratingLabel: '4.8',
        reviewCountLabel: '24,875',
      },
    },
    {
      id: 'slow-luu-renovation-review',
      type: 'renovation-review',
      profile: {
        avatar: {
          src: '/assets/figma/personalized-feed/renovation-review/avatar.png',
          alt: 'slow_luu profile',
        },
        name: 'slow_luu',
        subtitle: 'Storage tips organized like J',
        actionLabel: 'Follow',
      },
      media: {
        slides: renovationReviewSlides,
      },
      viewMoreLabel: 'View more',
      expertInfo: 'Nowon-gu, Seoul • 1500sqft • 30 million',
      description:
        '"We had many picky requirements and desires, so it must have been difficult for you to accommodate all of them, but you listened to each one and..."',
    },
    {
      id: 'camping-intro',
      type: 'user-uploaded',
      productSheetTitle: 'In this photo 0',
      header: {
        avatar: {
          src: '/assets/figma/personalized-feed/btf-camping/avatar.png',
          alt: 'slow_luu profile',
        },
        name: 'slow_luu',
        subtitle: 'Storage tips organized like J',
        actionLabel: 'Follow',
        showOverflowAction: true,
      },
      media: {
        slides: campingSlides,
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 12,
          },
        ],
        save: {
          icon: {
            src: '/assets/figma/personalized-feed/btf-camping/scrap-filled.svg',
            alt: 'Saved',
          },
          iconWidth: 16,
          iconHeight: 19.3975,
          count: 868,
        },
      },
      comments: {
        description:
          "What's in my camp? 🙋🏻‍♀️ Let me introduce the tent I use for camping!",
        items: [],
        viewAllVisibility: 'never',
      },
      contentsInfo: '01.25',
    },
    {
      id: 'slow-luu-lettering-plate',
      type: 'user-uploaded',
      productSheetTitle: 'In this photo 1',
      header: {
        avatar: {
          src: '/assets/figma/personalized-feed/btf-plate/avatar.png',
          alt: 'slow_luu profile',
        },
        name: 'slow_luu',
        subtitle: 'Storage tips organized like J',
        actionLabel: 'Follow',
        showOverflowAction: true,
      },
      media: {
        slides: plateSlides,
      },
      featuredProduct: {
        id: 'cuckoo-lettering-plate',
        image: {
          src: '/assets/figma/personalized-feed/btf-plate/product.png',
          alt: 'Coucou Lettering Plate, 2 Types',
        },
        name: 'Coucou Lettering Plate, 2 Types',
        discountLabel: '28%',
        priceLabel: '9,900',
        thumbnailRadius: 4,
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: 175,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: 14,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 12,
          },
        ],
        save: {
          icon: reactionIcons.save,
          iconWidth: 16,
          iconHeight: 19.3975,
          count: 868,
        },
      },
      comments: {
        description:
          'This is my favorite piece of furniture in the studio. I keep my plants on it and store my plant care supplies as well. It is a makeshift desk.',
        items: [],
        viewAllVisibility: 'never',
      },
    },
    {
      id: 'slow-luu-kitchen-cafe',
      type: 'user-uploaded',
      productSheetTitle: 'In this photo 4',
      header: {
        avatar: {
          src: '/assets/figma/personalized-feed/btf-kitchen/avatar.png',
          alt: 'slow_luu profile',
        },
        name: 'slow_luu',
        subtitle: 'Storage tips organized like J',
        actionLabel: 'Follow',
        showOverflowAction: true,
      },
      media: {
        slides: kitchenSlides,
      },
      products: {
        catalog: kitchenProducts,
        previewProductIds: [
          'tile-tray',
          'espresso-cup',
          'stainless-kettle',
          'wood-board',
        ],
        viewMoreVisibility: 'never',
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: 7,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: 1,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 12,
          },
        ],
        save: {
          icon: reactionIcons.save,
          iconWidth: 16,
          iconHeight: 19.3975,
          count: 868,
        },
      },
      comments: {
        description:
          "When I was designing the kitchen storage, I created a space for a home cafe zone, and recently I laid tiles on the floor! Since I plan to place heavier appliances, I did not worry about the grout work and just carefully set them down to fit the size :) It's amazing how just changing the floor can create such a new atmosphere..🖤",
        items: [
          {
            id: 'kitchen-comment-1',
            author: 'docbshakcn',
            body:
              'The boardroom is so beautiful; it seems like the atmosphere is all thanks to the boardroom.',
          },
        ],
        viewAllVisibility: 'never',
      },
      contentsInfo: '01.25',
    },
    {
      id: 'soop87-most-busy',
      type: 'user-uploaded',
      productSheetTitle: 'In this photo 1',
      header: {
        avatar: {
          src: '/assets/figma/personalized-feed/btf-soop87/avatar.png',
          alt: 'soop87 profile',
        },
        name: 'soop87',
        subtitle: '#MostBusyAtHome',
        showOverflowAction: true,
      },
      media: {
        slides: soopSlides,
      },
      featuredProduct: {
        id: 'tillandsia-capitata',
        image: {
          src: '/assets/figma/personalized-feed/btf-soop87/product.png',
          alt: 'Tillandsia capitata, an exotic hanging plant - wood set',
        },
        name: 'Tillandsia capitata, an exotic hanging plant - wood set',
        discountLabel: '28%',
        priceLabel: '25,600',
        thumbnailRadius: 4,
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: 13,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: 6,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 12,
          },
        ],
        save: {
          icon: reactionIcons.save,
          iconWidth: 16,
          iconHeight: 19.3975,
          count: 868,
        },
      },
      comments: {
        description:
          'The afternoon sun makes the plants sparkle✨ With the propagation power of pothos, it feels like this place has turned into a pothos zone👀',
        items: [],
        viewAllVisibility: 'never',
      },
    },
    {
      id: 'related-plant-interior',
      type: 'user-uploaded',
      productSheetTitle: 'In this photo 12',
      recommendationTitle: {
        prefix: 'Related ',
        emphasis: "'plant interior'",
      },
      header: {
        avatar: {
          src: '/assets/figma/personalized-feed/btf-recommended/avatar.png',
          alt: 'slow_luu profile',
        },
        name: 'slow_luu',
        subtitle: 'Storage tips organized like J',
        actionLabel: 'Follow',
        showOverflowAction: true,
        topPadding: 0,
      },
      media: {
        slides: recommendedPlantInteriorSlides,
      },
      products: {
        catalog: recommendedPlantInteriorProducts,
        previewProductIds: [
          'stone-serve-plate',
          'ceramic-clock',
          'sheer-curtain',
          'wooden-side-stool',
        ],
        viewMoreVisibility: 'never',
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: 32,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: 14,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 12,
          },
        ],
        save: {
          icon: reactionIcons.save,
          iconWidth: 16,
          iconHeight: 19.3975,
          count: 868,
        },
      },
      comments: {
        description:
          'A housewarming party is always fun! :) At first, I was worried about whether to buy a 1400 or a 1600 dining table since the kitchen is not very spacious.',
        items: [],
        viewAllVisibility: 'never',
      },
    },
    {
      id: 'slow-luu-postcard-bedroom',
      type: 'user-uploaded',
      productSheetTitle: 'In this photo 4',
      header: {
        avatar: {
          src: '/assets/figma/personalized-feed/btf-postcard/avatar.png',
          alt: 'slow_luu profile',
        },
        name: 'slow_luu',
        subtitle: 'Storage tips organized like J',
        actionLabel: 'Follow',
        showOverflowAction: true,
      },
      media: {
        slides: postcardSlides,
      },
      products: {
        catalog: postcardProducts,
        previewProductIds: [
          'postcard-frame',
          'mini-vase',
          'bedroom-linen',
          'wood-side-shelf',
        ],
        viewMoreVisibility: 'never',
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: 353,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: 121,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 12,
          },
        ],
        save: {
          icon: reactionIcons.save,
          iconWidth: 16,
          iconHeight: 19.3975,
          count: 868,
        },
      },
      comments: {
        description:
          "In our couple's space, the master bedroom, I've put up a postcard that gives off a sense of my partner's support🖤 Every time I see it, it feels like it's about us, and it lifts my spirits!",
        commentCount: 121,
        items: [
          {
            id: 'postcard-comment-1',
            author: 'minironi_home',
            body:
              'storage cabinet is so stylish. It blends well with the accessories too. The postcards are cute as well :)',
          },
        ],
      },
      contentsInfo: '2023.12.25',
    },
    {
      id: 'storage-master-advice',
      type: 'longform-advice',
      profile: {
        avatar: {
          src: '/assets/figma/personalized-feed/btf-longform/avatar.png',
          alt: 'slow_luu profile',
        },
        name: 'slow_luu',
        subtitle: 'Storage tips organized like J',
        actionLabel: 'Follow',
        showOverflowAction: true,
      },
      media: {
        slides: longformAdviceSlides,
        imageHeight: 280,
      },
      imageBar: {
        title: "A storage expert's best buys and best-used picks this year",
        ctaLabel: 'View details',
      },
      reactions: {
        metrics: [
          {
            id: 'Like',
            icon: reactionIcons.like,
            iconWidth: 20.8,
            iconHeight: 17.8946,
            count: 234,
          },
          {
            id: 'Comment',
            icon: reactionIcons.comment,
            iconWidth: 19.5,
            iconHeight: 19.4371,
            count: 76,
          },
          {
            id: 'Share',
            icon: reactionIcons.share,
            iconWidth: 17.8,
            iconHeight: 19.2395,
            count: 12,
          },
        ],
        save: {
          icon: reactionIcons.save,
          iconWidth: 16,
          iconHeight: 19.3975,
          count: 868,
        },
      },
    },
  ],
}
