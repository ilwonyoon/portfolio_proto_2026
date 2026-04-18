import type {
  FeedMediaSlide,
  FeedProduct,
  HomePostDetailMeta,
} from '../../system/feed'

type TaggedProductSeed = {
  name: string
  assetName: string
}

type TaggedModuleSeed = {
  id: string
  mediaSrc: string
  mediaAlt: string
  tagPoints: Array<{
    id: string
    left: number
    top: number
  }>
  products: TaggedProductSeed[]
}

export type OldHomeFeedTaggedModule = {
  id: string
  slides: FeedMediaSlide[]
  products: FeedProduct[]
}

export type OldHomeFeedPostDetail = {
  authorHandle: string
  authorDisplayName: string
  infoRows: HomePostDetailMeta[][]
  expandLabel?: string
  taggedModuleIds: string[]
}

const sharedExpandLabel = 'Show 5 more'

function createTaggedModule(seed: TaggedModuleSeed): OldHomeFeedTaggedModule {
  return {
    id: seed.id,
    slides: [
      {
        id: `${seed.id}-slide-1`,
        src: seed.mediaSrc,
        alt: seed.mediaAlt,
        tags: seed.tagPoints.map((point, index) => ({
          id: `${seed.id}-${point.id}`,
          productId: `${seed.id}-product-${index + 1}`,
          left: point.left,
          top: point.top,
        })),
      },
    ],
    products: seed.products.map((product, index) => ({
      id: `${seed.id}-product-${index + 1}`,
      thumbnailSrc: product.assetName,
      thumbnailAlt: product.name,
      name: product.name,
      priceLabel: '',
      thumbnailRadius: 24,
    })),
  }
}

const brightStudioModule = createTaggedModule({
  id: 'bright-studio',
  mediaSrc: '/assets/figma/old-home-feed/tagged-media-v2/media-main.png',
  mediaAlt: 'Bright studio with tagged desk and styling products',
  tagPoints: [
    { id: 'tag-1', left: 129.17, top: 275.11 },
    { id: 'tag-2', left: 263.01, top: 259.88 },
    { id: 'tag-3', left: 23.26, top: 244.11 },
    { id: 'tag-4', left: 10.77, top: 197.19 },
    { id: 'tag-5', left: 281.12, top: 164.4 },
    { id: 'tag-6', left: 192.77, top: 277.95 },
    { id: 'tag-7', left: 44.59, top: 134.81 },
    { id: 'tag-8', left: 291.21, top: 231.81 },
    { id: 'tag-9', left: 49.91, top: 360.9 },
  ],
  products: [
    {
      name: 'Amber desk lamp',
      assetName: '/assets/figma/old-home-feed/tagged-media-v2/product-1.png',
    },
    {
      name: 'Green accent chair',
      assetName: '/assets/figma/old-home-feed/tagged-media-v2/product-2.png',
    },
    {
      name: 'Emerald tote hanger',
      assetName: '/assets/figma/old-home-feed/tagged-media-v2/product-3.png',
    },
    {
      name: 'Desk organizer tray',
      assetName: '/assets/figma/old-home-feed/tagged-media-v2/product-4.png',
    },
    {
      name: 'Gallery floral artwork',
      assetName: '/assets/figma/old-home-feed/tagged-media-v2/product-5.png',
    },
    {
      name: 'Glass espresso mug',
      assetName: '/assets/figma/old-home-feed/tagged-media-v2/product-6.png',
    },
    {
      name: 'Vinyl crate side stack',
      assetName: '/assets/figma/old-home-feed/tagged-media-v2/product-7.png',
    },
    {
      name: 'Turntable storage console',
      assetName: '/assets/figma/old-home-feed/tagged-media-v2/product-8.png',
    },
    {
      name: 'Hanging spider plant',
      assetName: '/assets/figma/old-home-feed/tagged-media-v2/product-9.png',
    },
  ],
})

const cozyStudyModule = createTaggedModule({
  id: 'cozy-study',
  mediaSrc: '/assets/figma/old-home-feed/tagged-media/media-main.jpg',
  mediaAlt: 'Cozy study room with tagged styling products',
  tagPoints: [
    { id: 'tag-1', left: 38, top: 232 },
    { id: 'tag-2', left: 103, top: 209 },
    { id: 'tag-3', left: 179, top: 117 },
    { id: 'tag-4', left: 198, top: 166 },
    { id: 'tag-5', left: 82, top: 326 },
    { id: 'tag-6', left: 215, top: 163 },
    { id: 'tag-7', left: 257, top: 261 },
    { id: 'tag-8', left: 308, top: 351 },
    { id: 'tag-9', left: 160, top: 247 },
  ],
  products: [
    {
      name: 'Mustard mini lamp',
      assetName: '/assets/figma/old-home-feed/tagged-media/product-1.png',
    },
    {
      name: 'Wide desktop monitor',
      assetName: '/assets/figma/old-home-feed/tagged-media/product-2.png',
    },
    {
      name: 'Wall cap hook',
      assetName: '/assets/figma/old-home-feed/tagged-media/product-3.png',
    },
    {
      name: 'Graphic hanging tote',
      assetName: '/assets/figma/old-home-feed/tagged-media/product-4.png',
    },
    {
      name: 'Pattern throw chair',
      assetName: '/assets/figma/old-home-feed/tagged-media/product-5.png',
    },
    {
      name: 'Large floral frame',
      assetName: '/assets/figma/old-home-feed/tagged-media/product-6.png',
    },
    {
      name: 'Glow orb table lamp',
      assetName: '/assets/figma/old-home-feed/tagged-media/product-7.png',
    },
    {
      name: 'Retro stereo stack',
      assetName: '/assets/figma/old-home-feed/tagged-media/product-8.png',
    },
    {
      name: 'Clear keyboard cover',
      assetName: '/assets/figma/old-home-feed/tagged-media/product-9.png',
    },
  ],
})

export const oldHomeFeedTaggedModuleCatalog: Record<string, OldHomeFeedTaggedModule> = {
  [brightStudioModule.id]: brightStudioModule,
  [cozyStudyModule.id]: cozyStudyModule,
}

const homeTourRows = (
  homeType: string,
  size: string,
  household: string,
): HomePostDetailMeta[][] => [
  [
    { label: 'Home type', value: homeType },
    { label: 'Size', value: size },
    { label: 'Scope', value: 'Home styling' },
  ],
  [{ label: 'Household', value: household }],
]

const roundupRows = (
  topic: string,
  pickCount: string,
  tone: string,
): HomePostDetailMeta[][] => [
  [
    { label: 'Topic', value: topic },
    { label: 'Pick count', value: pickCount },
    { label: 'Tone', value: tone },
  ],
  [{ label: 'Format', value: 'Tagged product roundup' }],
]

export const oldHomeFeedPostDetails: Record<string, OldHomeFeedPostDetail> = {
  'home-tour-1': {
    authorHandle: 'dotorisisters',
    authorDisplayName: 'Acorn Sisters',
    infoRows: homeTourRows('Other', '43 pyeong', 'Living with parents'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['bright-studio', 'cozy-study'],
  },
  'home-tour-2': {
    authorHandle: 'eastern.archive',
    authorDisplayName: 'Eastern Archive',
    infoRows: homeTourRows('Apartment', '32 pyeong', 'Living alone'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['cozy-study'],
  },
  'home-tour-3': {
    authorHandle: 'lounge.zip',
    authorDisplayName: 'Lounge Zip',
    infoRows: homeTourRows('Apartment', '28 pyeong', 'With partner'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['bright-studio'],
  },
  'home-tour-4': {
    authorHandle: 'white.attic',
    authorDisplayName: 'White Attic',
    infoRows: homeTourRows('Apartment', '24 pyeong', 'With partner'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['bright-studio', 'cozy-study'],
  },
  'you-might-like-1': {
    authorHandle: 'ohouse.editor',
    authorDisplayName: 'Todayhome Editor',
    infoRows: roundupRows('Affordable picks', '9 items', 'Practical'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['bright-studio'],
  },
  'you-might-like-2': {
    authorHandle: 'kitchen.notes',
    authorDisplayName: 'Kitchen Notes',
    infoRows: roundupRows('Cutlery curation', '6 items', 'Daily use'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['cozy-study'],
  },
  'you-might-like-3': {
    authorHandle: 'gift.archive',
    authorDisplayName: 'Gift Archive',
    infoRows: roundupRows('Housewarming gifts', '6 items', 'Stylish'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['bright-studio'],
  },
  'you-might-like-4': {
    authorHandle: 'newlywed.log',
    authorDisplayName: 'Newlywed Log',
    infoRows: roundupRows('Housewarming picks', '5 items', 'Highly rated'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['cozy-study'],
  },
  'white-tone-1': {
    authorHandle: 'blanc.home',
    authorDisplayName: 'Blanc Home',
    infoRows: homeTourRows('Apartment', '29 pyeong', 'With partner'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['bright-studio'],
  },
  'white-tone-2': {
    authorHandle: 'white.christmas',
    authorDisplayName: 'White Christmas',
    infoRows: homeTourRows('Apartment', '28 pyeong', 'With partner'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['bright-studio', 'cozy-study'],
  },
  'white-tone-3': {
    authorHandle: 'compact.room',
    authorDisplayName: 'Compact Room',
    infoRows: homeTourRows('Studio apartment', '17 pyeong', 'With partner'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['cozy-study'],
  },
  'white-tone-4': {
    authorHandle: 'redo.studio',
    authorDisplayName: 'Redo Studio',
    infoRows: homeTourRows('Apartment', '31 pyeong', 'Living alone'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['cozy-study', 'bright-studio'],
  },
  'weekly-best-1': {
    authorHandle: 'organize.lab',
    authorDisplayName: 'Organize Lab',
    infoRows: roundupRows('Trash bag storage', '4 ideas', 'Clever'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['bright-studio'],
  },
  'weekly-best-2': {
    authorHandle: 'gift.archive',
    authorDisplayName: 'Gift Archive',
    infoRows: roundupRows('Moving season gifts', '6 items', 'Giftable'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['cozy-study'],
  },
  'weekly-best-3': {
    authorHandle: 'style.roundup',
    authorDisplayName: 'Style Roundup',
    infoRows: roundupRows('Styling finds', '10 items', 'Unexpected'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['bright-studio', 'cozy-study'],
  },
  'weekly-best-4': {
    authorHandle: 'living.polish',
    authorDisplayName: 'Living Polish',
    infoRows: roundupRows('Organizing finds', '8 items', 'Clean look'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['cozy-study'],
  },
}
