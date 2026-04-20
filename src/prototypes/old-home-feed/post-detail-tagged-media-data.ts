import type {
  FeedMediaSlide,
  FeedProduct,
  HomePostArticleBlock,
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
  authorAvatarSrc?: string
  infoRows: HomePostDetailMeta[][]
  expandLabel?: string
  taggedModuleIds: string[]
  articleBlocks?: HomePostArticleBlock[]
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

type ArticleTaggedModuleSeed = {
  id: string
  mediaFile: string
  mediaAlt: string
  imageHeight: number
  tagPoints: Array<{
    left: number
    top: number
  }>
  productCount: number
}

const articleAssetBase = '/assets/figma/old-home-feed/article'
const articleNextAssetBase = '/assets/figma/old-home-feed/article-next'
const articleFinalAssetBase = '/assets/figma/old-home-feed/article-final'
const organizingAssetBase = '/assets/figma/old-home-feed/organizing-finds'

function createArticleProducts(moduleId: string, productCount: number): FeedProduct[] {
  return Array.from({ length: productCount }, (_, index) => ({
    id: `${moduleId}-product-${index + 1}`,
    thumbnailSrc: `${articleAssetBase}/${moduleId}-product-${index + 1}.png`,
    thumbnailAlt: `Tagged product ${index + 1}`,
    name: `Tagged product ${index + 1}`,
    priceLabel: '',
    thumbnailRadius: 24,
  }))
}

function createArticleTaggedBlock(
  seed: ArticleTaggedModuleSeed,
): HomePostArticleBlock {
  return {
    type: 'tagged-media',
    id: seed.id,
    imageHeight: seed.imageHeight,
    slides: [
      {
        id: `${seed.id}-slide-1`,
        src: `${articleAssetBase}/${seed.mediaFile}`,
        alt: seed.mediaAlt,
        tags: seed.tagPoints.map((point, index) => ({
          id: `${seed.id}-tag-${index + 1}`,
          productId: `${seed.id}-product-${index + 1}`,
          left: point.left,
          top: point.top,
        })),
      },
    ],
    products: createArticleProducts(seed.id, seed.productCount),
  }
}

function createArticlePhotoBlock(
  id: string,
  fileName: string,
  alt: string,
  imageHeight: number,
): HomePostArticleBlock {
  return {
    type: 'photo',
    id,
    src: `${articleNextAssetBase}/${fileName}`,
    alt,
    imageHeight,
  }
}

function createArticleFinalPhotoBlock(
  id: string,
  fileName: string,
  alt: string,
  imageHeight: number,
): HomePostArticleBlock {
  return {
    type: 'photo',
    id,
    src: `${articleFinalAssetBase}/${fileName}`,
    alt,
    imageHeight,
  }
}

type OrganizingTaggedBlockSeed = {
  id: string
  imageHeight: number
  tags: Array<{
    leftPercent: number
    topPercent: number
  }>
  productCount: number
}

function createOrganizingProducts(
  moduleNumber: number,
  productCount: number,
): FeedProduct[] {
  return Array.from({ length: productCount }, (_, index) => ({
    id: `organizing-module-${moduleNumber}-product-${index + 1}`,
    thumbnailSrc: `${organizingAssetBase}/module-${moduleNumber}-product-${index + 1}.png`,
    thumbnailAlt: `Organizing find ${index + 1}`,
    name: `Organizing find ${index + 1}`,
    priceLabel: '',
    thumbnailRadius: 24,
  }))
}

function createOrganizingTaggedBlock(
  moduleNumber: number,
  seed: OrganizingTaggedBlockSeed,
): HomePostArticleBlock {
  return {
    type: 'tagged-media',
    id: seed.id,
    imageHeight: seed.imageHeight,
    slides: [
      {
        id: `${seed.id}-slide-1`,
        src: `${organizingAssetBase}/module-${moduleNumber}-main.png`,
        alt: `Organizing idea ${moduleNumber}`,
        tags: seed.tags.map((point, index) => ({
          id: `${seed.id}-tag-${index + 1}`,
          productId: `organizing-module-${moduleNumber}-product-${Math.min(
            index + 1,
            seed.productCount,
          )}`,
          left: (point.leftPercent / 100) * 343,
          top: (point.topPercent / 100) * seed.imageHeight,
        })),
      },
    ],
    products: createOrganizingProducts(moduleNumber, seed.productCount),
  }
}

function createOrganizingPhotoBlock(
  id: string,
  fileName: string,
  alt: string,
  imageHeight: number,
): HomePostArticleBlock {
  return {
    type: 'photo',
    id,
    src: `${organizingAssetBase}/${fileName}`,
    alt,
    imageHeight,
  }
}

export const oldHomeFeedArticleBlocks: HomePostArticleBlock[] = [
  {
    type: 'heading',
    id: 'preview-heading',
    level: 2,
    tone: 'brand',
    text: '⚡ 3-second home tour preview',
  },
  createArticleTaggedBlock({
    id: 'module-1',
    mediaFile: 'module-1-main.jpg',
    mediaAlt: 'Layered room preview with multiple tagged products.',
    imageHeight: 389.81,
    productCount: 9,
    tagPoints: [
      { left: 63.36, top: 69.7 },
      { left: 93.07, top: 122.47 },
      { left: 95.77, top: 284.87 },
      { left: 279.24, top: 332.54 },
      { left: 148.59, top: 158.36 },
      { left: 131.59, top: 80.98 },
      { left: 22.81, top: 199.24 },
      { left: 318.39, top: 267.37 },
      { left: 41.63, top: 247.77 },
    ],
  }),
  { type: 'spacer', id: 'spacer-1', size: 'large' },
  createArticleTaggedBlock({
    id: 'module-2',
    mediaFile: 'module-2-main.jpg',
    mediaAlt: 'Workspace and storage area with tagged decor products.',
    imageHeight: 457.33,
    productCount: 9,
    tagPoints: [
      { left: 308.98, top: 293.03 },
      { left: 37.11, top: 213.58 },
      { left: 105.27, top: 83.91 },
      { left: 197.41, top: 47.05 },
      { left: 313.58, top: 6.52 },
      { left: 16.22, top: 113.07 },
      { left: 218.57, top: 416.17 },
      { left: 53.62, top: 99.56 },
      { left: 36.54, top: 177.76 },
    ],
  }),
  { type: 'spacer', id: 'spacer-2', size: 'large' },
  createArticleTaggedBlock({
    id: 'module-3',
    mediaFile: 'module-3-main.jpg',
    mediaAlt: 'Bright studio corner with tagged furniture and accessories.',
    imageHeight: 457.3,
    productCount: 9,
    tagPoints: [
      { left: 129.16, top: 277.1 },
      { left: 263.02, top: 261.88 },
      { left: 23.26, top: 246.12 },
      { left: 10.77, top: 199.19 },
      { left: 281.12, top: 166.38 },
      { left: 192.77, top: 279.93 },
      { left: 44.59, top: 136.81 },
      { left: 291.22, top: 233.83 },
      { left: 49.89, top: 362.88 },
    ],
  }),
  { type: 'spacer', id: 'spacer-3', size: 'large' },
  createArticleTaggedBlock({
    id: 'module-4',
    mediaFile: 'module-4-main.jpg',
    mediaAlt: 'Kitchen and shelving area with tagged products.',
    imageHeight: 457.3,
    productCount: 10,
    tagPoints: [
      { left: 139.72, top: 151.18 },
      { left: 71.03, top: 279.8 },
      { left: 105.79, top: 116.31 },
      { left: 287.23, top: 191.15 },
      { left: 221.93, top: 131.96 },
      { left: 242.89, top: 80.63 },
      { left: 59.89, top: 160.79 },
      { left: 150.56, top: 164.54 },
      { left: 96.95, top: 368.43 },
      { left: 77.6, top: 133.18 },
    ],
  }),
  { type: 'spacer', id: 'spacer-4', size: 'large' },
  createArticleTaggedBlock({
    id: 'module-5',
    mediaFile: 'module-5-main.jpg',
    mediaAlt: 'Desk and bookshelf vignette with tagged styling products.',
    imageHeight: 457.3,
    productCount: 9,
    tagPoints: [
      { left: 133.86, top: 37.97 },
      { left: 138.45, top: 305.23 },
      { left: 188.34, top: 184.83 },
      { left: 67.62, top: 249.26 },
      { left: 255.89, top: 248.58 },
      { left: 300.74, top: 227.24 },
      { left: 115.67, top: 231.77 },
      { left: 133.22, top: 191.77 },
      { left: 19.33, top: 170.61 },
    ],
  }),
  { type: 'spacer', id: 'spacer-5', size: 'large' },
  createArticleTaggedBlock({
    id: 'module-6',
    mediaFile: 'module-6-main.jpg',
    mediaAlt: 'Colorful living area with tagged furniture and objects.',
    imageHeight: 457.3,
    productCount: 8,
    tagPoints: [
      { left: 88.18, top: 282.33 },
      { left: 250.14, top: 104.46 },
      { left: 145.78, top: 199.86 },
      { left: 124.62, top: 194.09 },
      { left: 131.3, top: 234.16 },
      { left: 247.52, top: 302.98 },
      { left: 284.71, top: 183.14 },
      { left: 50.41, top: 62.19 },
    ],
  }),
  { type: 'spacer', id: 'spacer-6', size: 'large' },
  createArticleTaggedBlock({
    id: 'module-7',
    mediaFile: 'module-7-main.jpg',
    mediaAlt: 'Dining and work corner with tagged home products.',
    imageHeight: 457.3,
    productCount: 8,
    tagPoints: [
      { left: 248.74, top: 246.59 },
      { left: 15.66, top: 279.29 },
      { left: 188.91, top: 266.91 },
      { left: 172.02, top: 314.23 },
      { left: 55.41, top: 72.89 },
      { left: 176.06, top: 286.88 },
      { left: 236.03, top: 96.43 },
      { left: 282.55, top: 339.52 },
    ],
  }),
  { type: 'spacer', id: 'spacer-7', size: 'large' },
  {
    type: 'callout',
    id: 'key-points',
    title: '📍 Key ideas in this home',
    items: [
      '✔ A personality-forward interior packed with color and taste',
      '✔ How to make an old sink feel intentional and stylish',
      '✔ A layout that changes by use, season, and mood',
    ],
  },
  { type: 'spacer', id: 'spacer-8', size: 'large' },
  {
    type: 'heading',
    id: 'about-heading',
    level: 4,
    text: 'About us',
  },
  {
    type: 'photo',
    id: 'intro-photo',
    src: `${articleAssetBase}/intro-photo.jpg`,
    alt: 'Room introduction photo with layered decor.',
    imageHeight: 361.48,
  },
  {
    type: 'paragraph',
    id: 'intro-copy-1',
    text:
      'Hi, we are the Acorn Sisters. We document our daily life and spaces on Ohouse and Instagram. I have already introduced my space twice through What is in My Home, and because I live with family, there were not many rooms I could show as a full home tour. So I kept putting it off.',
  },
  { type: 'spacer', id: 'spacer-9', size: 'small' },
  {
    type: 'paragraph',
    id: 'intro-copy-2',
    text:
      'But the story behind the bookshelf so many people asked about, and the process of building out the room I casually call my studio, felt like they could become a different kind of home tour. So here it is. Let me show you around.',
  },
  { type: 'spacer', id: 'spacer-10', size: 'small' },
  {
    type: 'heading',
    id: 'floor-plan-heading',
    level: 2,
    text: 'Floor plan',
  },
  {
    type: 'photo',
    id: 'floor-plan',
    src: `${articleAssetBase}/floor-plan.jpg`,
    alt: 'Floor plan drawing for the room layout.',
    imageHeight: 200.53,
  },
  {
    type: 'paragraph',
    id: 'floor-plan-copy-1',
    text:
      'First, let me introduce my room. This is an ordinary older apartment with the living room and kitchen in the center, and the rooms split to the left and right. My room used to be two small rooms side by side, but I wanted an open studio-like space, so we removed the wall between them and use it as one room.',
  },
  { type: 'spacer', id: 'spacer-11', size: 'small' },
  {
    type: 'paragraph',
    id: 'floor-plan-copy-2',
    text:
      'Of the two doors, the one visible from the entry corridor was closed off with a wall. That gave the room its own separate circulation inside the same home, and it almost feels like I am living on my own.',
  },
  { type: 'spacer', id: 'spacer-12', size: 'small' },
  {
    type: 'heading',
    id: 'bookshelf-heading',
    level: 2,
    text: 'Bookshelf area',
  },
  createArticlePhotoBlock(
    'bookshelf-1',
    'bookshelf-1.jpg',
    'Bookshelf corner with a green table and layered storage.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'bookshelf-copy',
    text:
      'The area I want to introduce in detail in this home tour is the bookshelf corner, the one so many people were curious about and asked questions about.',
  },
  {
    type: 'paragraph',
    id: 'bookshelf-copy-2',
    text:
      'This recessed area used to be a small closet. It did not seem especially useful, so we removed it and made it part of the room. Even before moving in, I had not decided exactly what this space should become.',
  },
  {
    type: 'paragraph',
    id: 'bookshelf-copy-3',
    text:
      'When the old books I should have sorted out before moving all came with me, organizing the room suddenly felt impossible. That was when this little alcove caught my eye.',
  },
  createArticlePhotoBlock(
    'bookshelf-2',
    'bookshelf-2.jpg',
    'Tall handmade bookshelf wall filled with books and decor.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'bookshelf-copy-4',
    text:
      'In my previous room, I used channel shelves across one whole wall as a bookcase. The wood shelves seemed like they would roughly fit the empty closet space, so I stacked them there temporarily. Somewhere along the way, it became the signature corner of my room.',
  },
  createArticlePhotoBlock(
    'bookshelf-process-1',
    'bookshelf-process-1.jpg',
    'Process photo showing books and wood shelves stacked into a bookcase.',
    260.98,
  ),
  {
    type: 'paragraph',
    id: 'bookshelf-copy-5',
    text:
      'People often tell me this casually stacked bookshelf looks charming, and many are surprised by it. Since it is not a ready-made piece, they ask how it stays standing, so I will show the process photos.',
  },
  {
    type: 'paragraph',
    id: 'bookshelf-copy-6',
    text:
      'As you can see, all you need is a lot of books and several wood shelves. I stacked old books I had already read into columns on both sides, placed a wood shelf on top, made another pair of columns, and repeated the process all the way to the ceiling.',
  },
  createArticlePhotoBlock(
    'bookshelf-process-2',
    'bookshelf-process-2.jpg',
    'Book columns and shelves under construction.',
    339.52,
  ),
  {
    type: 'paragraph',
    id: 'bookshelf-copy-7',
    text:
      'Because the book columns are taller than the books I wanted to store, they work well as an actual bookshelf too.',
  },
  createArticlePhotoBlock(
    'bookshelf-3',
    'bookshelf-3.jpg',
    'Completed bookshelf nook with stacked books and small objects.',
    457.28,
  ),
  {
    type: 'paragraph',
    id: 'bookshelf-copy-8',
    text:
      'At first I only stacked books along the back wall, but as more books came in after the move, I built up the side in the same way. Now it looks almost like a D-shaped book column made only from books.',
  },
  createArticlePhotoBlock(
    'bookshelf-4',
    'bookshelf-4.jpg',
    'Bookshelf wall beside a colorful rug and lounge area.',
    457.3,
  ),
  { type: 'spacer', id: 'room-one-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'room-one-heading',
    level: 2,
    text: 'First room',
  },
  {
    type: 'paragraph',
    id: 'room-one-copy-1',
    text: 'This is the space that used to be the left bedroom in the floor plan.',
  },
  {
    type: 'paragraph',
    id: 'room-one-copy-2',
    text:
      'Instead of keeping the wall, I used pieces like rugs and tables to divide the roles inside one room, so it can feel like a living room, bedroom, and study all at once.',
  },
  createArticlePhotoBlock(
    'room-one-1',
    'room-one-1.jpg',
    'First room layout with lounge furniture and colorful rug.',
    371.55,
  ),
  createArticlePhotoBlock(
    'room-one-2',
    'room-one-2.jpg',
    'Same wall styled as a cozy book room.',
    457.3,
  ),
  createArticlePhotoBlock(
    'room-one-3',
    'room-one-3.jpg',
    'Same wall styled with a table and cafe mood.',
    457.3,
  ),
  createArticlePhotoBlock(
    'room-one-4',
    'room-one-4.jpg',
    'Same wall styled as a calm study area.',
    382.39,
  ),
  {
    type: 'paragraph',
    id: 'room-one-copy-3',
    text:
      'All of the photos above show the same wall. Because there are no fixed built-in structures, I can change the layout whenever I want. Depending on the furniture I place there, the same spot becomes a book room, a cafe-like corner, or a study.',
  },
  { type: 'spacer', id: 'room-two-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'room-two-heading',
    level: 2,
    text: 'Second room',
  },
  createArticlePhotoBlock(
    'room-two-1',
    'room-two-1.jpg',
    'Second room with a warm bed setup and framed art.',
    457.28,
  ),
  {
    type: 'paragraph',
    id: 'room-two-copy-1',
    text: 'This is the space that used to be the right bedroom in the floor plan.',
  },
  {
    type: 'paragraph',
    id: 'room-two-copy-2',
    text:
      'At first, I installed a system hanger along the wall and hid it with a curtain rail, but it felt like wasted space. After clearing the hanger area, I started changing it from time to time depending on my taste and needs.',
  },
  createArticlePhotoBlock(
    'room-two-2',
    'room-two-2.jpg',
    'Second room used as a study with desk and shelves.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'room-two-copy-3',
    text: 'Sometimes I place a desk here and use it like a study.',
  },
  createArticlePhotoBlock(
    'room-two-3',
    'room-two-3.jpg',
    'Second room with bed moved to create a different mood.',
    457.27,
  ),
  {
    type: 'paragraph',
    id: 'room-two-copy-4',
    text:
      'When I want a different mood, I move the bed. Then it becomes another space again.',
  },
  createArticlePhotoBlock(
    'room-two-4',
    'room-two-4.jpg',
    'Second room arranged for a new sleeping layout.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'room-two-copy-5',
    text:
      'The setup below is something I made during winter because I wanted to knit comfortably.',
  },
  createArticlePhotoBlock(
    'room-two-5',
    'room-two-5.jpg',
    'Winter knitting setup with a cozy chair and textiles.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'room-two-copy-6',
    text:
      'Aside from the floor and wallpaper, there is not much renovation to explain. The floor is Gujeong Prague herringbone, and the wallpaper is Gaenari Silk 57144.',
  },
  {
    type: 'paragraph',
    id: 'studio-intro-copy',
    text:
      'I think I covered the other areas well enough in previous What is in My Home posts, so this time I will show the process of making the spaces I call my studios.',
  },
  { type: 'spacer', id: 'studio-one-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'studio-one-heading',
    level: 2,
    text: 'Studio 1',
  },
  createArticlePhotoBlock(
    'studio-one-1',
    'studio-one-1.jpg',
    'Studio one with a window view, sofa, and colorful rug.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'studio-one-copy-1',
    text:
      'I call it a studio because I do not have a better name for it, but it is not a professional workspace. It is a separate place where I spend time on hobbies, work, and rest. The old street trees outside the window make a beautiful scene in every season.',
  },
  createArticlePhotoBlock(
    'studio-one-2',
    'studio-one-2.jpg',
    'Studio one framed by a large handmade window wall.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'studio-one-copy-2',
    text:
      'Thanks to the love this space received, it was selected for 2025 Ohouse, but at first it looked completely different.',
  },
  {
    type: 'paragraph',
    id: 'studio-one-copy-3',
    text:
      'It had no interior work at all and was covered with blackout blinds, used almost like storage. Once I wanted to actually spend time here, I slowly worked on it over several years until it became the space it is now, which makes it even more meaningful to me.',
  },
  createArticlePhotoBlock(
    'studio-one-before-1',
    'studio-one-before-1.jpg',
    'Early studio before photo with a simple desk and cutout window.',
    347.11,
  ),
  {
    type: 'paragraph',
    id: 'studio-one-copy-4',
    text:
      'It started one day when I wondered if I could make better use of this space. After clearing the stacked things and placing a desk, I thought it would be nice to have a window in front of me. As a joke, I cut a square out of the blackout blind, but the view through that square was unexpectedly beautiful, and the whole space suddenly felt different.',
  },
  createArticlePhotoBlock(
    'studio-one-before-2',
    'studio-one-before-2.jpg',
    'Blackout blind cutout framing the outdoor view.',
    257.25,
  ),
  {
    type: 'paragraph',
    id: 'studio-one-copy-5',
    text:
      'For a while, that alone was enough. But gradually I started wanting it to feel like a real wall. I looked for a way to fix it myself without spending much money and learned about partition walls made with gypsum board.',
  },
  {
    type: 'paragraph',
    id: 'studio-one-copy-6',
    text:
      'Luckily, my handy younger sister bought the materials and built the wall and large window shape herself. It was not an easy job, and because we were not professionals, there are rough parts if you look closely. But that does not bother me. For me, it became a space I am completely happy with.',
  },
  createArticlePhotoBlock(
    'studio-one-build-1',
    'studio-one-build-1.jpg',
    'Partition wall and window frame during the studio build.',
    457.33,
  ),
  createArticlePhotoBlock(
    'studio-one-build-2',
    'studio-one-build-2.jpg',
    'Studio wall and window after the frame was installed.',
    413.02,
  ),
  {
    type: 'paragraph',
    id: 'studio-one-copy-7',
    text:
      'Into the space that once only had a window and wall, I built and placed the unfinished furniture I had collected, laid down a rug, hung frames, and slowly added my own taste and color.',
  },
  createArticlePhotoBlock(
    'studio-one-finished-1',
    'studio-one-finished-1.jpg',
    'Finished studio one with sofa, shelves, art, and a rug.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'studio-one-copy-8',
    text:
      'Once I finally brought in the sofa, it became an incredibly cozy space. Some people think of it as the living room of a detached house, and a few even ask if I live overseas. I think it gives that impression because the window shape and size are not typical.',
  },
  {
    type: 'paragraph',
    id: 'studio-one-copy-9',
    text:
      'I chose the height and width however I wanted, matching the view outside. Because of that, it feels more like a large frame that holds the four seasons.',
  },
  createArticlePhotoBlock(
    'studio-one-finished-2',
    'studio-one-finished-2.jpg',
    'Studio window view framed by a cozy handmade interior.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'studio-one-copy-10',
    text:
      'I love this space and this view just as much as everyone else seems to.',
  },
  { type: 'spacer', id: 'studio-two-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'studio-two-heading',
    level: 2,
    text: 'Studio 2',
  },
  createArticlePhotoBlock(
    'studio-two-1',
    'studio-two-1.jpg',
    'Studio two with worktable, storage, and a compact window-side setup.',
    343,
  ),
  {
    type: 'paragraph',
    id: 'studio-two-copy-1',
    text:
      'The long rectangular space is divided into three parts: Studio 1, Studio 2, and the kitchen. Studio 2 and the kitchen beside it also started as completely empty areas that I decorated one step at a time. Since they had been neglected for years, even this photo after some organizing looks plain, but it used to look even plainer.',
  },
  {
    type: 'paragraph',
    id: 'studio-two-copy-2',
    text:
      'One day, I needed a place to gather the unfinished furniture I had suddenly made all at once. After clearing the clutter, I realized this side was also a really beautiful space. The view outside the window is especially beautiful through all four seasons.',
  },
  createArticleFinalPhotoBlock(
    'studio-two-2',
    'studio-two-2.jpg',
    'Studio two before the white paint update, with a worktable and storage.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'studio-two-copy-3',
    text:
      'So last year, I finally shook off the laziness, painted it a clean white, and placed a dining table there. Even that alone made it feel completely different.',
  },
  createArticleFinalPhotoBlock(
    'studio-two-3',
    'studio-two-3.jpg',
    'Studio two after being painted white with a dining table.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'studio-two-copy-4',
    text:
      'I like this clean feeling, but I still love deep wood tones. Now I keep the desk and wood furniture toward the front, and it has become a space that feels as good as any study. The colors outside the window change with every season, and they make this place especially beautiful.',
  },
  createArticleFinalPhotoBlock(
    'studio-two-4',
    'studio-two-4.jpg',
    'Studio two arranged with darker wood furniture and a seasonal window view.',
    457.3,
  ),
  { type: 'spacer', id: 'kitchen-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'kitchen-heading',
    level: 2,
    text: 'Kitchen',
  },
  createArticleFinalPhotoBlock(
    'kitchen-1',
    'kitchen-1.jpg',
    'Kitchen with a small table between wood and stainless zones.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-1',
    text:
      'The final space I want to introduce is the kitchen. One side is styled as a wood zone, the other as a stainless zone, with a small dining table in the middle.',
  },
  createArticleFinalPhotoBlock(
    'kitchen-2',
    'kitchen-2.jpg',
    'Kitchen wall with open storage and warm wood details.',
    457.28,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-2',
    text:
      'Honestly, I did not expect to stay here this long. I only put in a small sink and left the refrigerator alone against an empty wall. But over time, I needed a place where I could do simple cooking and make coffee at home.',
  },
  {
    type: 'paragraph',
    id: 'kitchen-copy-3',
    text:
      'As always, I looked for a way to do it without spending a lot. I lined up speed racks opposite the sink and placed IKEA countertop boards on top, turning them into an island cabinet.',
  },
  createArticleFinalPhotoBlock(
    'kitchen-3',
    'kitchen-3.jpg',
    'Kitchen island area made with speed racks and countertop boards.',
    457.33,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-4',
    text:
      'For the upper cabinets, I hung cupboards made from Giyo woodwork semi-finished pieces. Under the counter, I installed a curtain rail instead of doors and hung fabric, which hides the clutter while giving the whole home cafe zone a vintage mood.',
  },
  {
    type: 'paragraph',
    id: 'kitchen-copy-5',
    text:
      'For storage, I used Ay-Kasa crates and living boxes. Browsing the Ohouse storage category gave me so many useful tips and items.',
  },
  createArticleFinalPhotoBlock(
    'kitchen-4',
    'kitchen-4.jpg',
    'Kitchen storage setup with crates, fabric, and wood shelving.',
    402.3,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-6',
    text:
      'It became a space where I can do simple prep, make coffee at home, and occasionally bake.',
  },
  createArticleFinalPhotoBlock(
    'kitchen-5',
    'kitchen-5.jpg',
    'Finished home cafe kitchen area with layered storage.',
    457.33,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-7',
    text:
      'The very last area I completed was this stainless zone. Should we look at the before photo, the one that is honestly a little sad to see?',
  },
  createArticleFinalPhotoBlock(
    'kitchen-before-1',
    'kitchen-before-1.jpg',
    'Before photo of the old stainless kitchen zone.',
    458.51,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-8',
    text:
      'I wondered if I should remove the increasingly worn, inexpensive sink and build a new one, but kitchen prices these days are no joke.',
  },
  {
    type: 'paragraph',
    id: 'kitchen-copy-9',
    text:
      'Since this is not a permanent living space and I do not know when I might leave, that cost felt too much. So once again, I rolled up my sleeves and decided to finish the space myself.',
  },
  createArticleFinalPhotoBlock(
    'kitchen-sink-1',
    'kitchen-sink-1.jpg',
    'Stainless counter update added over the old sink area.',
    457.33,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-10',
    text:
      'The original sink was not very useful because the gas range area was empty, and after many years the stains were severe. I ordered a custom 304 stainless countertop and placed it on top.',
  },
  createArticleFinalPhotoBlock(
    'kitchen-sink-2',
    'kitchen-sink-2.jpg',
    'Updated stainless sink zone with kitchen rack and tools.',
    455.19,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-11',
    text:
      'Then I added the kitchen rack and stainless pieces I carefully picked out on Ohouse. For about a full week, I looked at nothing but kitchen products until my eyes were spinning.',
  },
  createArticleFinalPhotoBlock(
    'kitchen-sink-3',
    'kitchen-sink-3.jpg',
    'Stainless kitchen tools and rack arranged above the sink.',
    457.3,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-12',
    text:
      'I hesitated because the kitchen rack was such a popular item, but for a small kitchen it was perfect. There are so many beautiful stainless kitchen tools that it felt like a whole new world, and I kept wanting to add more.',
  },
  createArticleFinalPhotoBlock(
    'kitchen-sink-4',
    'kitchen-sink-4.jpg',
    'Detailed stainless kitchen rack styling with utensils.',
    455.19,
  ),
  createArticleFinalPhotoBlock(
    'kitchen-sink-5',
    'kitchen-sink-5.jpg',
    'Close view of the finished stainless kitchen corner.',
    457.33,
  ),
  createArticleFinalPhotoBlock(
    'kitchen-detail-1',
    'kitchen-detail-1.jpg',
    'Kitchen detail with stainless holder and cloth holder.',
    455.19,
  ),
  {
    type: 'paragraph',
    id: 'kitchen-copy-13',
    text:
      'In particular, the Dulton stainless kitchen towel holder and kitchen cloth holder are pieces I really recommend.',
  },
  {
    type: 'paragraph',
    id: 'kitchen-copy-14',
    text:
      'The last thing I still want to do is paint the kitchen wall and sink cabinet doors with a Nordic mood, completing the final version. I do not know when that will happen, but maybe one day I will get to introduce it too.',
  },
  { type: 'spacer', id: 'closing-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'closing-heading',
    level: 2,
    text: 'Closing',
  },
  createArticleFinalPhotoBlock(
    'closing-1',
    'closing-1.jpg',
    'Final home tour image showing the finished layered interior.',
    457.28,
  ),
  {
    type: 'paragraph',
    id: 'closing-copy-1',
    text:
      'Before, I mostly introduced the objects I liked. But through this home tour, I looked back at old photos and remembered the beginnings and process behind spaces that have changed so much. It was genuinely fun to introduce them.',
  },
  {
    type: 'paragraph',
    id: 'closing-copy-2',
    text:
      'I hope this was enjoyable and useful for everyone reading. If I get the chance, I will come back with more newly changed spaces and information. Thank you for reading this long post.',
  },
]

export const organizingFindsArticleBlocks: HomePostArticleBlock[] = [
  createOrganizingPhotoBlock(
    'organizing-intro-graphic',
    'intro-graphic.png',
    'Organizing resolution collage with kitchen storage examples.',
    208.66,
  ),
  {
    type: 'paragraph',
    id: 'organizing-intro-1',
    text:
      'Every week, Housekeeping Standard shares the fundamentals of interior organization. This edit focuses on practical organizing finds that are easy to keep close at hand without making the room look messy.',
  },
  createOrganizingTaggedBlock(1, {
    id: 'organizing-preview',
    imageHeight: 455.42,
    productCount: 3,
    tags: [
      { leftPercent: 13.39, topPercent: 44.25 },
      { leftPercent: 50.62, topPercent: 60.42 },
      { leftPercent: 0.2, topPercent: 71.43 },
    ],
  }),
  {
    type: 'paragraph',
    id: 'organizing-intro-2',
    text:
      'Hi, I am Graninple. I like finding myself through mood-led DIY projects. Items used often are most convenient when they stay within reach, but if they are left out as-is, the space can quickly look cluttered.',
  },
  {
    type: 'paragraph',
    id: 'organizing-intro-3',
    text:
      'Here are five core home-organizing ideas and eight living items that make storage feel both useful and decorative.',
  },
  {
    type: 'heading',
    id: 'organizing-series-heading',
    level: 4,
    text: 'Organizing resolution series',
  },
  {
    type: 'callout',
    id: 'organizing-series-links',
    title: 'Previous and next reads',
    items: [
      'Episode 21: Narrow kitchen storage with white gap shelves and wall shelves',
      'Episode 22: Storage finds that make home organization easier',
      'Episode 23: How to organize seasonings with airtight containers',
    ],
  },
  { type: 'spacer', id: 'organizing-section-living-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'organizing-living-heading',
    level: 2,
    text: 'Living room with a TV',
  },
  {
    type: 'heading',
    id: 'organizing-tv-stand-heading',
    level: 4,
    text: '1. Use a TV stand with a wire grid',
  },
  createOrganizingTaggedBlock(2, {
    id: 'organizing-tv-stand',
    imageHeight: 258.19,
    productCount: 5,
    tags: [
      { leftPercent: 19.06, topPercent: 22.14 },
      { leftPercent: 62.75, topPercent: 27.32 },
      { leftPercent: 86.2, topPercent: 28.5 },
      { leftPercent: 72.34, topPercent: 34.39 },
      { leftPercent: 57.95, topPercent: 39.81 },
      { leftPercent: 15.69, topPercent: 60.31 },
      { leftPercent: 43.75, topPercent: 66.91 },
      { leftPercent: 29.89, topPercent: 74.92 },
      { leftPercent: 37.35, topPercent: 91.65 },
    ],
  }),
  {
    type: 'paragraph',
    id: 'organizing-tv-stand-copy-1',
    text:
      'This is the living room area where the TV sits. Replacing a long low cabinet with a smaller but taller piece created more usable storage and made the room feel more open.',
  },
  {
    type: 'paragraph',
    id: 'organizing-tv-stand-copy-2',
    text:
      'A TV stand lets the screen stand upright, while a simple wire grid behind it keeps the power strip and multiple cables out of view from the front.',
  },
  {
    type: 'paragraph',
    id: 'organizing-tv-stand-copy-3',
    text:
      'The set-top box and internet device are stored inside a radio-like case. If something is hard to hide completely, putting it in a good-looking box is one of my favorite organizing tricks.',
  },
  {
    type: 'heading',
    id: 'organizing-settop-heading',
    level: 4,
    text: '2. Hide the set-top box in a storage case',
  },
  createOrganizingTaggedBlock(3, {
    id: 'organizing-settop-box',
    imageHeight: 258.19,
    productCount: 3,
    tags: [{ leftPercent: 27.76, topPercent: 35.34 }],
  }),
  createOrganizingTaggedBlock(4, {
    id: 'organizing-router-detail',
    imageHeight: 258.19,
    productCount: 3,
    tags: [{ leftPercent: 88.51, topPercent: 1.64 }],
  }),
  createOrganizingTaggedBlock(5, {
    id: 'organizing-settop-object',
    imageHeight: 455.42,
    productCount: 5,
    tags: [
      { leftPercent: 23.53, topPercent: 25.6 },
      { leftPercent: 15.04, topPercent: 55.45 },
      { leftPercent: 62.17, topPercent: 66.64 },
      { leftPercent: 40.49, topPercent: 74.1 },
    ],
  }),
  {
    type: 'paragraph',
    id: 'organizing-settop-copy',
    text:
      'The front is perforated so the remote still works, and the open back has two tiers for the modem, router, and set-top box. Once stored this way, it almost reads like a Bluetooth speaker or a small decor object.',
  },
  { type: 'spacer', id: 'organizing-wall-section-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'organizing-wall-heading',
    level: 2,
    text: 'Wall and storage cabinet',
  },
  {
    type: 'heading',
    id: 'organizing-fabric-heading',
    level: 4,
    text: '3. Cover private wall fixtures with fabric and postcards',
  },
  createOrganizingTaggedBlock(6, {
    id: 'organizing-wall-fabric',
    imageHeight: 258.19,
    productCount: 4,
    tags: [
      { leftPercent: 6.8, topPercent: 31.09 },
      { leftPercent: 56.71, topPercent: 34.87 },
      { leftPercent: 84.42, topPercent: 36.28 },
      { leftPercent: 67.73, topPercent: 42.17 },
      { leftPercent: 51.92, topPercent: 49 },
      { leftPercent: 27.05, topPercent: 68.8 },
      { leftPercent: 36.47, topPercent: 78.69 },
    ],
  }),
  createOrganizingTaggedBlock(7, {
    id: 'organizing-wall-postcards',
    imageHeight: 258.19,
    productCount: 4,
    tags: [
      { leftPercent: 17.99, topPercent: 31.09 },
      { leftPercent: 74.12, topPercent: 34.86 },
      { leftPercent: 38.95, topPercent: 46.88 },
      { leftPercent: 8.04, topPercent: 60.08 },
    ],
  }),
  {
    type: 'paragraph',
    id: 'organizing-wall-copy',
    text:
      'The wall has an intercom, switches, and a heating control. I covered the video phone with fabric for privacy, and taped postcards beside the switches so the cover also feels like wall styling.',
  },
  {
    type: 'heading',
    id: 'organizing-shaker-heading',
    level: 4,
    text: '4. Store masks in a shaker box',
  },
  createOrganizingTaggedBlock(8, {
    id: 'organizing-shaker-box',
    imageHeight: 455.42,
    productCount: 3,
    tags: [
      { leftPercent: 7.5, topPercent: 34.49 },
      { leftPercent: 35.78, topPercent: 50.65 },
      { leftPercent: 44.97, topPercent: 61.48 },
    ],
  }),
  createOrganizingTaggedBlock(9, {
    id: 'organizing-mask-storage',
    imageHeight: 455.42,
    productCount: 4,
    tags: [{ leftPercent: 83.85, topPercent: 43.72 }],
  }),
  createOrganizingTaggedBlock(10, {
    id: 'organizing-shaker-room',
    imageHeight: 455.42,
    productCount: 3,
    tags: [
      { leftPercent: 13.39, topPercent: 44.26 },
      { leftPercent: 50.62, topPercent: 60.42 },
      { leftPercent: 0.2, topPercent: 71.43 },
    ],
  }),
  {
    type: 'paragraph',
    id: 'organizing-shaker-copy',
    text:
      'The oak round container is a shaker box. I keep masks inside because I use them every day, but I still want them hidden in something that looks intentional.',
  },
  { type: 'spacer', id: 'organizing-wire-section-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'organizing-wire-heading',
    level: 2,
    text: 'Cables and chargers',
  },
  {
    type: 'heading',
    id: 'organizing-cable-truck-heading',
    level: 4,
    text: '5. Turn a cable box into a point object',
  },
  createOrganizingTaggedBlock(11, {
    id: 'organizing-cable-truck',
    imageHeight: 455.42,
    productCount: 4,
    tags: [],
  }),
  {
    type: 'paragraph',
    id: 'organizing-cable-truck-copy-1',
    text:
      'Power strips and charging cables are some of the hardest things to hide. Instead of constantly unplugging them before taking photos, I stored them in truck-shaped cable boxes so they look like decor.',
  },
  {
    type: 'paragraph',
    id: 'organizing-cable-truck-copy-2',
    text:
      'There are two sizes in white and beige. Adding a Snoopy figure makes the box feel more playful and gives the room a small point of personality.',
  },
  createOrganizingTaggedBlock(12, {
    id: 'organizing-snoopy-cable',
    imageHeight: 455.42,
    productCount: 4,
    tags: [],
  }),
  {
    type: 'paragraph',
    id: 'organizing-pearl-cable-copy-1',
    text:
      'I also threaded oversized pearl beads onto a phone cable. It is bold, shiny, and surprisingly good for desk styling because it has a clear presence.',
  },
  {
    type: 'paragraph',
    id: 'organizing-pearl-cable-copy-2',
    text:
      'You can also choose transparent, silver, or wood beads depending on your taste. The only downside is the weight, so it is better to leave the phone charging rather than use it in hand.',
  },
  {
    type: 'heading',
    id: 'organizing-bookcase-charger-heading',
    level: 4,
    text: '6. Store chargers in a DIY bookcase',
  },
  createOrganizingTaggedBlock(13, {
    id: 'organizing-bookcase-charger',
    imageHeight: 258.19,
    productCount: 2,
    tags: [
      { leftPercent: 17.81, topPercent: 79.16 },
      { leftPercent: 65.06, topPercent: 87.17 },
    ],
  }),
  createOrganizingTaggedBlock(14, {
    id: 'organizing-charger-box',
    imageHeight: 258.19,
    productCount: 1,
    tags: [{ leftPercent: 16.75, topPercent: 75.87 }],
  }),
  {
    type: 'paragraph',
    id: 'organizing-bookcase-charger-copy-1',
    text:
      'Laptop charger cables are long and bulky, so if I store them with other items, everything comes out together. I keep this charger by itself in a larger box.',
  },
  createOrganizingTaggedBlock(15, {
    id: 'organizing-diy-bookcase',
    imageHeight: 258.19,
    productCount: 1,
    tags: [{ leftPercent: 4.85, topPercent: 19.78 }],
  }),
  {
    type: 'paragraph',
    id: 'organizing-bookcase-charger-copy-2',
    text:
      'The magazine-like bookcase started as an English tape case. I covered it with black film, printed a cover image, and cut white sheet material to make it look like a real book.',
  },
  createOrganizingTaggedBlock(16, {
    id: 'organizing-bookcase-under-table',
    imageHeight: 455.42,
    productCount: 3,
    tags: [
      { leftPercent: 21.88, topPercent: 24.36 },
      { leftPercent: 61.94, topPercent: 37.15 },
    ],
  }),
  {
    type: 'paragraph',
    id: 'organizing-bookcase-charger-copy-3',
    text:
      'I made two versions and keep them under the glass work table. Since the charger needs to stay close, disguising it as a book makes the storage feel much cleaner.',
  },
  { type: 'spacer', id: 'organizing-small-items-spacer', size: 'large' },
  {
    type: 'heading',
    id: 'organizing-small-items-heading',
    level: 2,
    text: 'Other small items',
  },
  {
    type: 'heading',
    id: 'organizing-stationery-heading',
    level: 4,
    text: '7. Use a DIY bookcase for stationery',
  },
  createOrganizingTaggedBlock(17, {
    id: 'organizing-stationery-bookcase',
    imageHeight: 258.19,
    productCount: 4,
    tags: [{ leftPercent: 57.06, topPercent: 1.87 }],
  }),
  {
    type: 'paragraph',
    id: 'organizing-stationery-copy',
    text:
      'Another case holds pens and notebooks. It keeps the house organized while still working as a proper storage box.',
  },
  {
    type: 'heading',
    id: 'organizing-seasonal-heading',
    level: 4,
    text: '8. Store seasonal items in a decorative box',
  },
  createOrganizingTaggedBlock(18, {
    id: 'organizing-seasonal-storage',
    imageHeight: 455.42,
    productCount: 4,
    tags: [{ leftPercent: 23.06, topPercent: 43.01 }],
  }),
  {
    type: 'paragraph',
    id: 'organizing-seasonal-copy-1',
    text:
      'This storage box was made by attaching tambour board to an empty cookie tin. I originally made it to hold a mosquito repellent device.',
  },
  createOrganizingTaggedBlock(19, {
    id: 'organizing-seasonal-wire',
    imageHeight: 455.42,
    productCount: 2,
    tags: [
      { leftPercent: 39.91, topPercent: 26.49 },
      { leftPercent: 32.84, topPercent: 38.93 },
    ],
  }),
  {
    type: 'paragraph',
    id: 'organizing-seasonal-copy-2',
    text:
      'One side is open so an electrical wire can pass through. In summer, it holds the home mat; in other seasons, I use it for mini perfumes and makeup items.',
  },
  createOrganizingTaggedBlock(20, {
    id: 'organizing-seasonal-living',
    imageHeight: 455.42,
    productCount: 4,
    tags: [{ leftPercent: 34.95, topPercent: 73.56 }],
  }),
  createOrganizingTaggedBlock(21, {
    id: 'organizing-wall-light',
    imageHeight: 455.42,
    productCount: 3,
    tags: [
      { leftPercent: 30.83, topPercent: 12.46 },
      { leftPercent: 55.81, topPercent: 84.04 },
    ],
  }),
  {
    type: 'paragraph',
    id: 'organizing-closing-1',
    text:
      'When items you use often have to stay visible, placing them in a beautiful container can become part of the styling instead of clutter.',
  },
  createOrganizingPhotoBlock(
    'organizing-outro-note',
    'outro-note.png',
    'Notice that product information may differ from current sale status.',
    76.22,
  ),
  {
    type: 'paragraph',
    id: 'organizing-closing-2',
    text:
      'It would be ideal if every object could be hidden completely, but that is rarely realistic. A more useful approach is to keep things nearby while giving the storage itself a good-looking place in the room.',
  },
]

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
    authorHandle: 'salim.standard',
    authorDisplayName: 'Housekeeping Standard',
    authorAvatarSrc: `${organizingAssetBase}/author-avatar.png`,
    infoRows: roundupRows('Organizing finds', '8 items', 'Clean look'),
    expandLabel: sharedExpandLabel,
    taggedModuleIds: ['organizing-finds'],
    articleBlocks: organizingFindsArticleBlocks,
  },
}
