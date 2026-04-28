import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { HomeIndicator, StatusBar, TopNav } from '../../system/mobile'
import { useInertialScroll } from '../../system/mobile/useInertialScroll'
import { BottomSheet, PushPage, useSheetDragGesture } from '../../system/overlays'
import { FeedProductStrip, type FeedProduct } from '../../system/feed'
import { Chip, TryInRoomButton } from '../../system/primitives'
import {
  pdpMyPhotoThumbs,
  pdpSampleSpacesByType,
  pdpSpaceTypeOptions,
  type PdpSampleSpaceItem,
  type PdpSelectableSpace,
  type PdpSpaceType,
} from './pdp-room-selector-data'
import './pdp.css'

gsap.registerPlugin(MorphSVGPlugin)

type PdpPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type PlacementPosition = {
  x: number
  y: number
}

type PdpPlacementPhase = 'placing' | 'rendering' | 'result'

type PdpGeneratedSlide = {
  id: string
  src: string
  alt: string
  hasProductTag: boolean
}

type PdpPlacementMenuItemId = 'add-products' | 'style-transfer'
type PdpProductArchiveTab = 'all' | 'saved' | 'recently-viewed'

type PdpProductArchiveItem = {
  id: string
  tabIds: PdpProductArchiveTab[]
  brand: string
  name: string
  category?: string
  price: string
  discountRate?: string
  meta?: string
  imageSrc: string
  fit?: 'cover' | 'contain'
}

type PdpProductArchiveSeedItem = Omit<PdpProductArchiveItem, 'tabIds' | 'meta'>

type PdpPlacementItem = {
  id: string
  product: PdpProductArchiveItem
  category: string
  position: PlacementPosition | null
}

const assetRoot = '/assets/figma/pdp'
const statusLevelsSrc = '/assets/figma/portfolio-2026/onboarding/status-levels.svg'
const pdpSampleSpaceCardWidth = 167.5
const pdpProductImageSrc = `${assetRoot}/moss-rug-hero.png`
const pdpGeneratedResultSrc = `${assetRoot}/generated-room-result.png`
const pdpSelectedRoomSrc = `${assetRoot}/place-selected-room.png`
const pdpProductName = 'Moss Rug'
const pdpProductFullName = 'Moss Rug, Large Dust-Free Living Room Carpet, 3 Sizes'
const pdpResultDelayMs = 12000
const pdpResultSwipeThreshold = 36
const pdpResultTagRevealDelayMs = 520
const pdpResultImageSize = 343
const pdpProductSheetHeight = 524
const pdpThinkingStatusTexts = [
  'Analyzing your room',
  'Matching product scale',
  'Blending light and shadows',
  'Generating your design',
]
const pdpLoadingDotGridSize = 32
const pdpLoadingDots = Array.from(
  { length: pdpLoadingDotGridSize * pdpLoadingDotGridSize },
  (_, index) => {
    const column = index % pdpLoadingDotGridSize
    const row = Math.floor(index / pdpLoadingDotGridSize)
    const rowWave = Math.sin(row * 0.86) * 122
    const diagonalRipple = Math.sin((column + row) * 0.42) * 64
    const localJitter = ((column * 17 + row * 31) % 29) - 14
    const delay = Math.round(column * 52 + rowWave + diagonalRipple + localJitter)
    const driftX = Math.sin((row + column) * 0.55) * 0.52
    const driftY = Math.cos((row * 1.3 - column) * 0.34) * 0.52
    const peakScale = 1.05 + ((column * 7 + row * 11) % 9) * 0.045

    return {
      id: `dot-${row}-${column}`,
      delay,
      driftX,
      driftY,
      peakScale,
    }
  },
)
const pdpAiStarPath =
  'M77.8611 118.868C72.2323 117.121 72.2322 109.154 77.8611 107.407L91.3607 103.217C97.0244 101.46 101.459 97.025 103.217 91.3613L107.406 77.8617C109.153 72.2329 117.12 72.2329 118.867 77.8617L123.057 91.3613C124.814 97.025 129.249 101.46 134.912 103.217L148.412 107.407C154.041 109.154 154.041 117.121 148.412 118.868L134.913 123.057C129.249 124.815 124.814 129.249 123.057 134.913L118.867 148.413C117.12 154.042 109.153 154.042 107.406 148.413L103.217 134.913C101.459 129.249 97.0244 124.815 91.3607 123.057L77.8611 118.868Z'
const pdpAiCirclePath = 'M113.5 75.5A38 38 0 1 1 113.5 151.5A38 38 0 1 1 113.5 75.5Z'
const pdpPlacementPromptText = 'Place this object to the designated place'
const pdpDefaultPlacementPosition: PlacementPosition = {
  x: 171.5,
  y: 171.5,
}
const pdpResultTagPositions: PlacementPosition[] = [
  { x: 171.5, y: 266.5 },
  { x: 248.5, y: 161.5 },
]

const pdpProductArchiveTabs: { id: PdpProductArchiveTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'saved', label: 'Saved' },
  { id: 'recently-viewed', label: 'Recently Viewed' },
]

const pdpProductArchiveSeedItems: PdpProductArchiveSeedItem[] = [
  { id: 'retro-sheer-curtain', brand: 'Dormor', name: 'Retro Pattern Sheer Doorway Curtain, 14 Colors', price: '37,800', discountRate: '28%', imageSrc: `${assetRoot}/product-archive/retro-sheer-curtain.png` },
  { id: 'module-fabric-sofa', brand: 'Heimish Home', name: '2.5-Seater Modular Fabric Sofa with Ottoman', price: '659,000', discountRate: '15%', imageSrc: `${assetRoot}/product-archive/wood-storage-chest.png` },
  { id: 'spiano-floor-lamp', brand: 'Spiano', name: 'Adjustable Fabric Shade Floor Lamp', price: '89,900', discountRate: '32%', imageSrc: '/assets/figma/personalized-feed/ad/spiano-product.png' },
  { id: 'moss-rug', brand: 'Nomia', name: 'Moss Rug, Dust-Free Living Room Carpet', price: '42,900', discountRate: '28%', imageSrc: `${assetRoot}/moss-rug-hero.png` },
  { id: 'modular-drawer', brand: 'Casaon', name: 'White Modular 3-Drawer Storage Unit', price: '109,000', discountRate: '18%', imageSrc: '/assets/figma/personalized-feed/product-ad/product-1.png' },
  { id: 'boucle-lounge-chair', brand: 'By Heyday', name: 'Ivory Boucle Lounge Chair', price: '239,000', discountRate: '12%', imageSrc: '/assets/figma/personalized-feed/product-ad/product-2.png' },
  { id: 'rattan-laundry-basket', brand: 'Home & House', name: 'Large Rattan Laundry Basket', price: '28,900', discountRate: '24%', imageSrc: '/assets/figma/personalized-feed/product-ad/product-3.png' },
  { id: 'mini-air-purifier', brand: 'Balmuda', name: 'Compact Bedroom Air Purifier', price: '219,000', discountRate: '10%', imageSrc: '/assets/figma/personalized-feed/product-ad/product-4.png' },
  { id: 'soft-area-rug', brand: 'Daylive', name: 'Soft Low-Pile Area Rug 200x300', price: '86,900', discountRate: '35%', imageSrc: '/assets/figma/personalized-feed/product-ad/product-5.png' },
  { id: 'cable-organizer-box', brand: 'Sysmax', name: 'Cable Organizer Box for Power Strips', price: '16,900', discountRate: '21%', imageSrc: '/assets/figma/personalized-feed/product-ad/product-6.png' },
  { id: 'round-side-table', brand: 'Monday House', name: 'White Round Side Table 480', price: '39,900', discountRate: '20%', imageSrc: '/assets/figma/personalized-feed/view-more/product-sheet-2.png' },
  { id: 'warm-table-lamp', brand: 'Olumi', name: 'Warm Fabric Shade Table Lamp', price: '46,900', discountRate: '31%', imageSrc: '/assets/figma/personalized-feed/view-more/product-sheet-3.png' },
  { id: 'low-storage-cabinet', brand: 'Sornia', name: 'Low Oak Living Room Storage Cabinet', price: '178,000', discountRate: '16%', imageSrc: '/assets/figma/personalized-feed/view-more/product-sheet-4.png' },
  { id: 'ceramic-vase-set', brand: 'Maison de Room', name: 'Cream Ceramic Object Vase Set', price: '24,900', discountRate: '25%', imageSrc: '/assets/figma/personalized-feed/view-more/product-sheet-5.png' },
  { id: 'kitchen-runner-mat', brand: 'Hanssem', name: 'Terrazzo PVC Kitchen Runner Mat', price: '32,900', discountRate: '23%', imageSrc: '/assets/figma/personalized-feed/view-more/product-sheet-6.png' },
  { id: 'walnut-dining-chair', brand: 'Chair Factory', name: 'Walnut Round Dining Chair', price: '76,000', discountRate: '17%', imageSrc: '/assets/figma/personalized-feed/btf-routine/product-1.png' },
  { id: 'steel-wire-shelf', brand: 'Roomnhome', name: 'White Steel Wire Shelf, 3-Tier', price: '49,900', discountRate: '30%', imageSrc: '/assets/figma/personalized-feed/btf-routine/product-2.png' },
  { id: 'cotton-bedspread', brand: 'Bazar', name: 'Washed Cotton Bedspread, Queen', price: '58,900', discountRate: '19%', imageSrc: '/assets/figma/personalized-feed/btf-routine/product-3.png' },
  { id: 'slim-trash-bin', brand: 'Litem', name: 'Slim Recycling Bin Set, 2 Pieces', price: '29,900', discountRate: '22%', imageSrc: '/assets/figma/personalized-feed/btf-routine/product-4.png' },
  { id: 'cream-bookcase', brand: 'IKEA', name: 'Cream Open Bookcase 800', price: '119,000', discountRate: '8%', imageSrc: '/assets/figma/personalized-feed/btf-postcard/product-1.png' },
  { id: 'entry-bench', brand: 'MarketB', name: 'Natural Entryway Storage Bench', price: '67,900', discountRate: '15%', imageSrc: '/assets/figma/personalized-feed/btf-postcard/product-2.png' },
  { id: 'glass-coffee-table', brand: 'Casamia', name: 'Oval Tempered Glass Coffee Table', price: '149,000', discountRate: '13%', imageSrc: '/assets/figma/personalized-feed/btf-postcard/product-3.png' },
  { id: 'fabric-ottoman', brand: 'Jackson Chameleon', name: 'Mini Fabric Ottoman Stool', price: '98,000', discountRate: '10%', imageSrc: '/assets/figma/personalized-feed/btf-postcard/product-4.png' },
  { id: 'beige-floor-cushion', brand: 'Modern House', name: 'Oversized Beige Floor Cushion', price: '35,900', discountRate: '27%', imageSrc: '/assets/figma/personalized-feed/btf-recommended/product-1.png' },
  { id: 'wood-wall-clock', brand: 'Muas', name: 'Silent Wood Wall Clock', price: '25,900', discountRate: '15%', imageSrc: '/assets/figma/personalized-feed/btf-recommended/product-2.png' },
  { id: 'ivory-sheer-curtain', brand: 'ShesHome', name: 'Ivory Soft Sheer Curtain', price: '41,900', discountRate: '34%', imageSrc: '/assets/figma/personalized-feed/btf-recommended/product-3.png' },
  { id: 'oak-nightstand', brand: 'Dodot', name: 'Oak Two-Drawer Nightstand', price: '82,000', discountRate: '12%', imageSrc: '/assets/figma/personalized-feed/btf-recommended/product-4.png' },
  { id: 'dish-drying-rack', brand: 'Silicook', name: 'Stainless Steel Dish Drying Rack', price: '47,900', discountRate: '18%', imageSrc: '/assets/figma/personalized-feed/btf-kitchen/product-1.png' },
  { id: 'cream-dinnerware', brand: 'Corelle', name: 'Cream White Dinnerware Set for Two', price: '74,900', discountRate: '20%', imageSrc: '/assets/figma/personalized-feed/btf-kitchen/product-2.png' },
  { id: 'wood-cutting-board', brand: 'Neoflam', name: 'Campo Wood Cutting Board, Medium', price: '31,900', discountRate: '15%', imageSrc: '/assets/figma/personalized-feed/btf-kitchen/product-3.png' },
  { id: 'pantry-basket', brand: 'Changsin Living', name: 'Pantry Organizer Basket Set, 4 Pieces', price: '19,900', discountRate: '24%', imageSrc: '/assets/figma/personalized-feed/btf-kitchen/product-4.png' },
  { id: 'steel-wall-shelf', brand: 'RareRow', name: 'Steel Wall Shelf 600', price: '59,000', discountRate: '11%', imageSrc: '/assets/figma/personalized-feed/brand-promo/product-1.png' },
  { id: 'round-display-shelf', brand: 'RareRow', name: 'Round Display Shelf in Cream', price: '89,000', discountRate: '13%', imageSrc: '/assets/figma/personalized-feed/brand-promo/product-2.png' },
  { id: 'linen-pendant-light', brand: 'Tounou', name: 'Linen Pendant Light for Dining Rooms', price: '129,000', discountRate: '18%', imageSrc: '/assets/figma/personalized-feed/btf-tounou/product-1.png' },
  { id: 'solid-dining-table', brand: 'Tounou', name: 'Solid Wood Dining Table 1200', price: '329,000', discountRate: '14%', imageSrc: '/assets/figma/personalized-feed/btf-tounou/product-2.png' },
  { id: 'ceramic-table-lamp', brand: 'Tounou', name: 'Ceramic Bedside Table Lamp', price: '64,900', discountRate: '22%', imageSrc: '/assets/figma/personalized-feed/btf-tounou/product-3.png' },
  { id: 'low-sideboard', brand: 'Tounou', name: 'Low Sideboard Cabinet in Walnut', price: '268,000', discountRate: '9%', imageSrc: '/assets/figma/personalized-feed/btf-tounou/product-4.png' },
  { id: 'compact-plant-pot', brand: 'Soop87', name: 'Compact Ceramic Plant Pot', price: '18,900', discountRate: '16%', imageSrc: '/assets/figma/personalized-feed/btf-soop87/product.png' },
  { id: 'modern-plate-set', brand: 'Ohouse Select', name: 'Modern Plate Set for Two', price: '45,900', discountRate: '25%', imageSrc: '/assets/figma/personalized-feed/btf-plate/product.png' },
  { id: 'side-chair', brand: 'Ohouse Select', name: 'Soft Upholstered Side Chair', price: '96,000', discountRate: '19%', imageSrc: '/assets/figma/personalized-feed/ad/product.png' },
  { id: 'beige-armchair', brand: 'Maison Archive', name: 'Beige Accent Armchair', price: '188,000', discountRate: '17%', imageSrc: '/assets/figma/personalized-feed/discover-detail/post-01-product-02-2x.png' },
  { id: 'oak-stool', brand: 'Maison Archive', name: 'Oak Utility Stool', price: '52,900', discountRate: '20%', imageSrc: '/assets/figma/personalized-feed/discover-detail/post-01-product-03-2x.png' },
  { id: 'framed-art-print', brand: 'Paper Garden', name: 'Framed Art Print 50x50', price: '42,000', discountRate: '30%', imageSrc: '/assets/figma/personalized-feed/discover-detail/post-01-product-04-2x.png', fit: 'contain' },
  { id: 'white-storage-bin', brand: 'Like It', name: 'White Stackable Storage Bin', price: '14,900', discountRate: '24%', imageSrc: '/assets/figma/personalized-feed/discover-detail/post-02-product-01-2x.png' },
  { id: 'modular-shelf', brand: 'Montage Home', name: 'Modular Shelf Unit in Ivory', price: '139,000', discountRate: '18%', imageSrc: '/assets/figma/personalized-feed/discover-detail/post-02-product-02-2x.png' },
  { id: 'table-mirror', brand: 'Studio Noon', name: 'Rounded Table Mirror', price: '33,900', discountRate: '15%', imageSrc: '/assets/figma/personalized-feed/discover-detail/post-02-product-03-2x.png' },
  { id: 'cushion-cover', brand: 'Zara Home', name: 'Neutral Cushion Cover Set', price: '29,900', discountRate: '26%', imageSrc: '/assets/figma/personalized-feed/discover-detail/post-02-product-04-2x.png' },
  { id: 'ceramic-diffuser', brand: 'Kundal', name: 'Ceramic Diffuser, White Musk', price: '15,900', discountRate: '22%', imageSrc: '/assets/figma/personalized-feed/discover-detail/post-03-product-01-2x.png' },
  { id: 'bedside-lamp', brand: 'Lumir', name: 'Bedside Reading Lamp in Warm White', price: '119,000', discountRate: '12%', imageSrc: '/assets/figma/personalized-feed/discover-detail/post-03-product-02-2x.png' },
  { id: 'slim-desk-chair', brand: 'Desker', name: 'Slim Mesh Desk Chair for Work Rooms', price: '189,000', discountRate: '11%', imageSrc: '/assets/figma/personalized-feed/discover-detail/ad-product-04-2x.png' },
]

const pdpProductArchiveItems: PdpProductArchiveItem[] = pdpProductArchiveSeedItems.map(
  (product, index) => ({
    ...product,
    category: product.category ?? inferProductCategory(product),
    tabIds: index < 30 ? ['saved'] : ['recently-viewed'],
    meta: index < 30 ? 'Saved' : 'Recently viewed',
  }),
)

const pdpProductArchiveOrderByTab: Record<PdpProductArchiveTab, string[]> = {
  all: [
    'moss-rug',
    'soft-area-rug',
    'glass-coffee-table',
    'warm-table-lamp',
    'linen-pendant-light',
    'round-side-table',
    'module-fabric-sofa',
    'retro-sheer-curtain',
    'modular-drawer',
    'low-storage-cabinet',
    'beige-armchair',
    'ceramic-table-lamp',
  ],
  saved: [
    'retro-sheer-curtain',
    'ivory-sheer-curtain',
    'oak-nightstand',
    'cream-bookcase',
    'wood-wall-clock',
    'beige-floor-cushion',
    'fabric-ottoman',
    'entry-bench',
    'walnut-dining-chair',
    'cotton-bedspread',
    'kitchen-runner-mat',
    'cream-dinnerware',
  ],
  'recently-viewed': [
    'steel-wall-shelf',
    'round-display-shelf',
    'linen-pendant-light',
    'solid-dining-table',
    'ceramic-table-lamp',
    'low-sideboard',
    'compact-plant-pot',
    'modern-plate-set',
    'side-chair',
    'beige-armchair',
    'oak-stool',
    'framed-art-print',
  ],
}

const pdpPrimaryProduct: PdpProductArchiveItem = {
  id: 'pdp-moss-rug',
  tabIds: ['saved'],
  brand: 'Nomia',
  name: pdpProductFullName,
  category: 'Rug',
  price: '42,900',
  discountRate: '28%',
  imageSrc: pdpProductImageSrc,
}

function inferProductCategory(product: Pick<PdpProductArchiveItem, 'id' | 'name'>) {
  const text = `${product.id} ${product.name}`.toLowerCase()

  if (text.includes('rug') || text.includes('carpet')) return 'Rug'
  if (text.includes('coffee table')) return 'Coffee Table'
  if (text.includes('side table')) return 'Side Table'
  if (text.includes('dining table')) return 'Dining Table'
  if (text.includes('table')) return 'Table'
  if (text.includes('chair') || text.includes('armchair')) return 'Chair'
  if (text.includes('sofa')) return 'Sofa'
  if (text.includes('lamp') || text.includes('light')) return 'Lamp'
  if (text.includes('curtain')) return 'Curtain'
  if (text.includes('shelf') || text.includes('bookcase')) return 'Shelf'
  if (
    text.includes('storage') ||
    text.includes('cabinet') ||
    text.includes('drawer') ||
    text.includes('sideboard')
  ) {
    return 'Storage'
  }
  if (text.includes('basket')) return 'Basket'
  if (text.includes('mirror')) return 'Mirror'
  if (text.includes('vase')) return 'Vase'
  if (text.includes('ottoman') || text.includes('stool')) return 'Stool'
  if (text.includes('cushion')) return 'Cushion'
  if (text.includes('clock')) return 'Clock'
  if (text.includes('mat')) return 'Mat'
  if (text.includes('bench')) return 'Bench'
  if (text.includes('dinnerware') || text.includes('plate')) return 'Dinnerware'
  if (text.includes('plant pot')) return 'Plant Pot'
  if (text.includes('diffuser')) return 'Diffuser'
  if (text.includes('art print')) return 'Art'

  return 'Object'
}

function orderPdpArchiveProducts(
  products: PdpProductArchiveItem[],
  orderIds: string[],
) {
  const orderIndexById = new Map(orderIds.map((id, index) => [id, index]))

  return [...products].sort((a, b) => {
    const aIndex = orderIndexById.get(a.id) ?? Number.MAX_SAFE_INTEGER
    const bIndex = orderIndexById.get(b.id) ?? Number.MAX_SAFE_INTEGER

    if (aIndex !== bIndex) {
      return aIndex - bIndex
    }

    return products.indexOf(a) - products.indexOf(b)
  })
}

function getPdpArchiveProductsForTab(tabId: PdpProductArchiveTab) {
  const tabProducts =
    tabId === 'all'
      ? pdpProductArchiveItems
      : pdpProductArchiveItems.filter((product) => product.tabIds.includes(tabId))

  return orderPdpArchiveProducts(tabProducts, pdpProductArchiveOrderByTab[tabId])
}

function createPdpPlacementItem(
  product: PdpProductArchiveItem,
  instanceIndex: number,
): PdpPlacementItem {
  return {
    id: `${product.id}-${instanceIndex}`,
    product,
    category: product.category ?? inferProductCategory(product),
    position: null,
  }
}

function getPdpSampleSpaceDisplayHeight(item: PdpSampleSpaceItem) {
  if (typeof item.displayHeight === 'number') {
    return item.displayHeight
  }

  return (pdpSampleSpaceCardWidth * item.height) / item.width
}

function createPdpWaterfallColumns(items: PdpSampleSpaceItem[]) {
  const columns: [PdpSampleSpaceItem[], PdpSampleSpaceItem[]] = [[], []]
  const columnHeights = [0, 0]

  items.forEach((item) => {
    const columnIndex = columnHeights[0] <= columnHeights[1] ? 0 : 1
    columns[columnIndex].push(item)
    columnHeights[columnIndex] += getPdpSampleSpaceDisplayHeight(item) + 12
  })

  return columns
}

function PdpIconButton({
  className,
  label,
  children,
}: {
  className?: string
  label: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={className ? `pdp-icon-button ${className}` : 'pdp-icon-button'}
      aria-label={label}
    >
      {children}
    </button>
  )
}

function PdpTopNavigation() {
  return (
    <TopNav
      className="pdp-top-nav"
      leading={
        <div className="pdp-top-nav__group">
          <PdpIconButton label="Back">
            <FigmaAsset
              src={`${assetRoot}/arrow-left.svg`}
              alt=""
              displayWidth={20.5}
              displayHeight={18.867}
            />
          </PdpIconButton>
          <PdpIconButton label="Home">
            <FigmaAsset
              src={`${assetRoot}/home-outline.svg`}
              alt=""
              displayWidth={20.8}
              displayHeight={19.85}
            />
          </PdpIconButton>
        </div>
      }
      trailing={
        <div className="pdp-top-nav__group">
          <PdpIconButton label="Search">
            <FigmaAsset
              src={`${assetRoot}/search-24.svg`}
              alt=""
              displayWidth={24}
              displayHeight={24}
            />
          </PdpIconButton>
          <PdpIconButton label="Cart">
            <FigmaAsset
              src={`${assetRoot}/cart-24.svg`}
              alt=""
              displayWidth={24}
              displayHeight={24}
            />
          </PdpIconButton>
        </div>
      }
    />
  )
}

function PdpMediaCounter() {
  return (
    <div className="pdp-media-counter" aria-label="Image 1 of 5">
      <span>1</span>
      <span>/</span>
      <span>5</span>
    </div>
  )
}

function PdpRating() {
  const filledStars = Array.from({ length: 4 }, (_, index) => (
    <FigmaAsset
      key={`star-${index + 1}`}
      src={`${assetRoot}/star-filled.svg`}
      alt=""
      displayWidth={12.517}
      displayHeight={11.947}
      className="pdp-rating__star"
    />
  ))

  return (
    <div className="pdp-rating" aria-label="4.5 out of 5 stars, 257 reviews">
      <span className="pdp-rating__stars" aria-hidden="true">
        {filledStars}
        <FigmaAsset
          src={`${assetRoot}/star-half.svg`}
          alt=""
          displayWidth={14}
          displayHeight={14}
          className="pdp-rating__star"
        />
      </span>
      <button type="button" className="pdp-rating__count">
        (257)
      </button>
    </div>
  )
}

function PdpShareIcon() {
  return (
    <span className="pdp-share-icon" aria-hidden="true">
      <FigmaAsset
        src={`${assetRoot}/share-24.svg`}
        alt=""
        displayWidth={20}
        displayHeight={22.858}
      />
    </span>
  )
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <FigmaAsset
      src={`${assetRoot}/info-16.svg`}
      alt=""
      displayWidth={16}
      displayHeight={16}
      className={className}
    />
  )
}

function ChevronRight() {
  return (
    <FigmaAsset
      src={`${assetRoot}/chevron-right-16.svg`}
      alt=""
      displayWidth={8}
      displayHeight={13.354}
      className="pdp-inline-icon"
    />
  )
}

function PdpHero({
  isThumbnail,
  onOpenSelector,
}: {
  isThumbnail: boolean
  onOpenSelector: () => void
}) {
  return (
    <section className="pdp-hero" aria-label="Product images">
      <FigmaAsset
        src={pdpProductImageSrc}
        alt={`Nomia ${pdpProductName}`}
        displayWidth={375}
        displayHeight={375}
        exportScale={1}
        className="pdp-hero__image"
        fetchPriority="high"
      />
      <PdpMediaCounter />
      <TryInRoomButton
        className="pdp-hero-secondary-cta"
        collapseAfterMs={isThumbnail ? null : 1400}
        onClick={onOpenSelector}
      />
    </section>
  )
}

function PdpSelectorBackIcon() {
  return (
    <FigmaAsset
      src={`${assetRoot}/arrow-left.svg`}
      alt=""
      displayWidth={20.5}
      displayHeight={18.867}
    />
  )
}

function PdpSelectorCameraIcon() {
  return (
    <FigmaAsset
      src={`${assetRoot}/select-photo-camera-24.svg`}
      alt=""
      displayWidth={24}
      displayHeight={24}
    />
  )
}

function PdpSelectorSectionHeader({
  title,
  actionLabel = 'See all',
}: {
  title: string
  actionLabel?: string
}) {
  return (
    <div className="pdp-selector-section-header">
      <h2>{title}</h2>
      <button type="button">{actionLabel}</button>
    </div>
  )
}

function PdpSelectorPhotoSection({
  onSelect,
}: {
  onSelect: (space: PdpSelectableSpace) => void
}) {
  return (
    <section className="pdp-selector-section pdp-selector-section--media">
      <PdpSelectorSectionHeader title="My Photos" />
      <div className="pdp-selector-strip pdp-selector-strip--photos" data-native-scroll-axis="x">
        <button type="button" className="pdp-selector-camera-tile" aria-label="Add photo">
          <span className="pdp-selector-camera-tile__icon">
            <PdpSelectorCameraIcon />
          </span>
        </button>
        {pdpMyPhotoThumbs.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className="pdp-selector-photo-thumb"
            onClick={() => onSelect({ id: photo.id, src: photo.src })}
          >
            <FigmaAsset
              src={photo.src}
              alt=""
              displayWidth={75}
              displayHeight={75}
              exportScale={2}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

function PdpSelectorSampleSpacesSection({
  onSelect,
}: {
  onSelect: (space: PdpSelectableSpace) => void
}) {
  const [activeSpaceType, setActiveSpaceType] = useState<PdpSpaceType>('all')
  const spaceItems = pdpSampleSpacesByType[activeSpaceType]
  const waterfallColumns = useMemo(() => createPdpWaterfallColumns(spaceItems), [spaceItems])

  return (
    <section className="pdp-selector-section pdp-selector-section--sample-spaces">
      <div className="pdp-selector-section-title">
        <h2>Sample spaces</h2>
      </div>

      <div
        className="pdp-selector-chip-row"
        role="tablist"
        aria-label="Space type filters"
        data-native-scroll-axis="x"
      >
        {pdpSpaceTypeOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={activeSpaceType === option.id}
            className={
              activeSpaceType === option.id
                ? 'pdp-selector-chip pdp-selector-chip--selected'
                : 'pdp-selector-chip'
            }
            onClick={() => setActiveSpaceType(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="pdp-selector-grid" aria-label={`${activeSpaceType} sample spaces`}>
        {waterfallColumns.map((columnItems, columnIndex) => (
          <div
            key={columnIndex === 0 ? 'left-column' : 'right-column'}
            className="pdp-selector-grid__column"
          >
            {columnItems.map((item) => {
              const displayHeight = getPdpSampleSpaceDisplayHeight(item)

              return (
                <button
                  key={item.id}
                  type="button"
                  className="pdp-selector-space-card"
                  style={{ height: `${displayHeight}px` }}
                  onClick={() => onSelect({ id: item.id, src: item.src, thumbSrc: item.src })}
                >
                  <FigmaAsset
                    src={item.src}
                    alt=""
                    displayWidth={pdpSampleSpaceCardWidth}
                    displayHeight={displayHeight}
                    exportScale={2}
                  />
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

function PdpSelectPhotoScreen({
  isActive,
  onClose,
  onSelectSpace,
}: {
  isActive: boolean
  isThumbnail: boolean
  onClose: () => void
  onSelectSpace: (space: PdpSelectableSpace) => void
}) {
  const selectorScrollRef = useRef<HTMLDivElement | null>(null)

  useInertialScroll(selectorScrollRef, {
    enabled: isActive,
    preset: 'ios-detail',
  })

  useEffect(() => {
    if (isActive) {
      selectorScrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [isActive])

  return (
    <div className="pdp-selector-screen">
      <header className="pdp-selector-header">
        <StatusBar levelsSrc={statusLevelsSrc} className="pdp-selector-status" />
        <TopNav
          className="pdp-selector-top-nav"
          leading={
            <div className="pdp-selector-nav-actions" aria-label="Navigation actions">
              <button type="button" className="pdp-selector-nav-button" onClick={onClose} aria-label="Back">
                <PdpSelectorBackIcon />
              </button>
            </div>
          }
          center={<h1>New Design</h1>}
        />
      </header>

      <main
        ref={selectorScrollRef}
        className="pdp-selector-main prototype-screen__scroll-region"
        data-inertial-scroll={isActive ? 'true' : undefined}
      >
        <PdpSelectorPhotoSection onSelect={onSelectSpace} />
        <PdpSelectorSampleSpacesSection onSelect={onSelectSpace} />
      </main>

      <div className="pdp-selector-home-indicator">
        <HomeIndicator />
      </div>
    </div>
  )
}

function createOriginalResultSlide(selectedSpace: PdpSelectableSpace): PdpGeneratedSlide {
  return {
    id: `original-${selectedSpace.id}`,
    src: selectedSpace.src,
    alt: 'Original room photo',
    hasProductTag: false,
  }
}

function PdpPlacementArrowUpIcon() {
  return <span className="pdp-placement-arrow-icon" aria-hidden="true" />
}

function PdpPlacementPlusIcon() {
  return (
    <span className="pdp-placement-plus-icon" aria-hidden="true">
      <span />
    </span>
  )
}

function PdpPlacementMenuBagIcon() {
  return (
    <FigmaAsset
      src={`${assetRoot}/shopping-bag-24.svg`}
      alt=""
      displayWidth={24}
      displayHeight={24}
    />
  )
}

function PdpPlacementMenuPhotoIcon() {
  return (
    <FigmaAsset
      src={`${assetRoot}/photo-24.svg`}
      alt=""
      displayWidth={24}
      displayHeight={24}
    />
  )
}

function PdpPlacementQuickMenuItem({
  icon,
  title,
  description,
  isPressed,
  onPressStart,
  onPressEnd,
  onSelect,
}: {
  icon: ReactNode
  title: string
  description: string
  isPressed: boolean
  onPressStart: () => void
  onPressEnd: () => void
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={
        isPressed
          ? 'pdp-placement-menu__item pdp-placement-menu__item--pressed'
          : 'pdp-placement-menu__item'
      }
      onPointerDown={onPressStart}
      onPointerUp={onPressEnd}
      onPointerCancel={onPressEnd}
      onPointerLeave={onPressEnd}
      onClick={onSelect}
    >
      <span className="pdp-placement-menu__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="pdp-placement-menu__copy">
        <span className="pdp-placement-menu__title">{title}</span>
        <span className="pdp-placement-menu__description">{description}</span>
      </span>
    </button>
  )
}

function PdpPlacementQuickMenu({
  pressedItemId,
  onPressItemStart,
  onPressItemEnd,
  onOpenProductSheet,
}: {
  pressedItemId: PdpPlacementMenuItemId | null
  onPressItemStart: (itemId: PdpPlacementMenuItemId) => void
  onPressItemEnd: () => void
  onOpenProductSheet: () => void
}) {
  return (
    <div className="pdp-placement-menu" role="menu" aria-label="Placement actions">
      <PdpPlacementQuickMenuItem
        icon={<PdpPlacementMenuBagIcon />}
        title="Add products"
        description="See it in your space before you buy"
        isPressed={pressedItemId === 'add-products'}
        onPressStart={() => onPressItemStart('add-products')}
        onPressEnd={onPressItemEnd}
        onSelect={onOpenProductSheet}
      />
      <PdpPlacementQuickMenuItem
        icon={<PdpPlacementMenuPhotoIcon />}
        title="Style from photo"
        description="Restyle your room from an image"
        isPressed={pressedItemId === 'style-transfer'}
        onPressStart={() => onPressItemStart('style-transfer')}
        onPressEnd={onPressItemEnd}
        onSelect={onPressItemEnd}
      />
    </div>
  )
}

function PdpProductArchiveSheet({
  isOpen,
  onClose,
  onAddProduct,
}: {
  isOpen: boolean
  onClose: () => void
  onAddProduct: (product: PdpProductArchiveItem) => void
}) {
  const [activeTabId, setActiveTabId] = useState<PdpProductArchiveTab>('all')
  const productSheetBodyRef = useRef<HTMLDivElement | null>(null)
  const sheetDragGesture = useSheetDragGesture({
    open: isOpen,
    closedOffset: pdpProductSheetHeight,
    closeTriggerThreshold: 140,
    closeReleaseThreshold: 84,
    onOpen: () => undefined,
    onClose,
  })
  useInertialScroll(productSheetBodyRef, {
    enabled: isOpen,
    preset: 'ios-feed',
  })

  useEffect(() => {
    if (isOpen) {
      setActiveTabId('all')
    }
  }, [isOpen])

  const products = getPdpArchiveProductsForTab(activeTabId)

  return (
    <BottomSheet
      open={isOpen}
      ariaLabel="Product archive"
      onClose={onClose}
      className="pdp-product-sheet"
      dimClassName="pdp-product-sheet__dim"
      panelClassName="pdp-product-sheet__panel"
      panelStyle={{ height: `${pdpProductSheetHeight}px` }}
      dragOffset={sheetDragGesture.dragOffset}
      isDragging={sheetDragGesture.isDragging}
    >
      <div className="pdp-product-sheet__handle-wrap" {...sheetDragGesture.bind}>
        <div className="pdp-product-sheet__handle" />
      </div>

      <div
        ref={productSheetBodyRef}
        className="pdp-product-sheet__body"
        data-inertial-scroll={isOpen ? 'true' : undefined}
      >
        <div className="pdp-product-sheet__search-wrap">
          <div className="pdp-product-sheet__search">
            <FigmaAsset
              src="/assets/figma/personalized-feed/search.svg"
              alt=""
              displayWidth={18}
              displayHeight={18}
            />
            <span>Search for a product name or brand</span>
          </div>
        </div>

        <div className="pdp-product-sheet__action-bar">
          <div className="pdp-product-sheet__chips" role="tablist" aria-label="Product archive filters">
            {pdpProductArchiveTabs.map((tab) => (
              <Chip
                key={tab.id}
                selected={activeTabId === tab.id}
                className="pdp-product-sheet__chip"
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="pdp-product-sheet__grid">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              className="pdp-product-tile"
              aria-label={`Add ${product.brand} ${product.name} to room`}
              onClick={(event) => {
                event.currentTarget.blur()
                onAddProduct(product)
              }}
            >
              <span className="pdp-product-tile__thumb">
                <FigmaAsset
                  src={product.imageSrc}
                  alt=""
                  displayWidth={109}
                  displayHeight={109}
                  exportScale={1}
                  className={
                    product.fit === 'contain'
                      ? 'pdp-product-tile__image pdp-product-tile__image--contain'
                      : 'pdp-product-tile__image'
                  }
                />
                <span className="pdp-product-tile__plus" aria-hidden="true" />
              </span>
              <span className="pdp-product-tile__title">{product.name}</span>
              <span className="pdp-product-tile__price-row">
                {product.discountRate ? (
                  <span className="pdp-product-tile__discount">{product.discountRate}</span>
                ) : null}
                <span className="pdp-product-tile__price">{product.price}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <HomeIndicator />
    </BottomSheet>
  )
}

function clampPlacementPosition(position: PlacementPosition) {
  return {
    x: Math.min(Math.max(position.x, 48), 295),
    y: Math.min(Math.max(position.y, 48), 295),
  }
}

function PdpThinkingStatusIcon() {
  const shapeRef = useRef<SVGPathElement | null>(null)
  const groupRef = useRef<SVGGElement | null>(null)
  const haloRef = useRef<SVGCircleElement | null>(null)

  useEffect(() => {
    if (!shapeRef.current || !groupRef.current || !haloRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(shapeRef.current, {
        attr: { d: pdpAiCirclePath },
        transformOrigin: '50% 50%',
      })
      gsap.set(groupRef.current, {
        transformOrigin: '50% 50%',
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
      })
      gsap.set(haloRef.current, {
        transformOrigin: '50% 50%',
        opacity: 0,
        scale: 0.78,
      })

      const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0,
      })

      timeline
        .to(groupRef.current, {
          duration: 0.24,
          x: -3,
          y: -10,
          rotate: 16,
          scaleX: 0.95,
          scaleY: 1.06,
          ease: 'sine.out',
        }, 0)
        .to(groupRef.current, {
          duration: 0.22,
          x: 4,
          y: 7,
          rotate: 42,
          scaleX: 1.06,
          scaleY: 0.92,
          ease: 'sine.in',
        }, 0.24)
        .to(groupRef.current, {
          duration: 0.24,
          x: 6,
          y: -8,
          rotate: 76,
          scaleX: 0.94,
          scaleY: 1.05,
          ease: 'sine.out',
        }, 0.46)
        .to(groupRef.current, {
          duration: 0.22,
          x: -4,
          y: 5,
          rotate: 118,
          scaleX: 1.05,
          scaleY: 0.94,
          ease: 'sine.inOut',
        }, 0.7)
        .to(groupRef.current, {
          duration: 0.24,
          x: -2,
          y: -6,
          rotate: 164,
          scaleX: 0.97,
          scaleY: 1.03,
          ease: 'sine.out',
        }, 0.92)
        .to(groupRef.current, {
          duration: 0.28,
          x: 0,
          y: 0,
          rotate: 214,
          scaleX: 1,
          scaleY: 1,
          ease: 'sine.inOut',
        }, 1.16)
        .to(haloRef.current, {
          duration: 0.34,
          opacity: 0.2,
          scale: 0.94,
          ease: 'power2.out',
        }, 0.86)
        .to(groupRef.current, {
          duration: 0.52,
          x: 2,
          y: -2,
          rotate: 238,
          scaleX: 0.99,
          scaleY: 1.01,
          ease: 'sine.inOut',
        }, 1.62)
        .to(groupRef.current, {
          duration: 0.54,
          x: -1,
          y: 2,
          rotate: 252,
          scaleX: 1.01,
          scaleY: 0.99,
          ease: 'sine.inOut',
        }, 2.14)
        .to(groupRef.current, {
          duration: 0.58,
          x: 0,
          y: 0,
          rotate: 266,
          scaleX: 0.98,
          scaleY: 0.98,
          ease: 'sine.inOut',
        }, 2.68)
        .to(groupRef.current, {
          duration: 0.16,
          x: 0,
          y: 0,
          rotate: 280,
          scaleX: 0.98,
          scaleY: 0.98,
          ease: 'power2.in',
        }, 3.3)
        .to(groupRef.current, {
          duration: 0.94,
          rotate: 1080,
          scaleX: 1.09,
          scaleY: 1.09,
          ease: 'power3.out',
        }, 3.46)
        .to(shapeRef.current, {
          duration: 0.94,
          morphSVG: {
            shape: pdpAiStarPath,
            shapeIndex: 'auto',
          },
          ease: 'power2.inOut',
        }, 3.46)
        .to(haloRef.current, {
          duration: 0.36,
          opacity: 0.42,
          scale: 1.22,
          ease: 'power2.out',
        }, '-=0.36')
        .to(groupRef.current, {
          duration: 0.22,
          scaleX: 1,
          scaleY: 1,
          rotate: 1080,
          ease: 'back.out(1.8)',
        }, 4.4)
        .to(haloRef.current, {
          duration: 0.48,
          opacity: 0,
          scale: 1.58,
          ease: 'power2.out',
        }, '-=0.4')
        .to(groupRef.current, {
          duration: 0.38,
          rotate: 1170,
          x: 0,
          scaleX: 0.96,
          scaleY: 0.96,
          ease: 'power3.inOut',
        }, 4.64)
        .to(shapeRef.current, {
          duration: 0.38,
          morphSVG: {
            shape: pdpAiCirclePath,
            shapeIndex: 'auto',
          },
          ease: 'power3.inOut',
        }, 4.64)
        .to(groupRef.current, {
          duration: 0.06,
          rotate: 1080,
          scaleX: 1,
          scaleY: 1,
          ease: 'power2.out',
        }, 5.02)
        .set(groupRef.current, {
          rotate: 0,
        })
    })

    return () => ctx.revert()
  }, [])

  return (
    <svg className="pdp-thinking-status__icon-svg" viewBox="47.5 47.5 132 132" aria-hidden="true">
      <circle
        ref={haloRef}
        className="pdp-thinking-status__halo"
        cx="113.5"
        cy="113.5"
        r="43"
      />
      <g ref={groupRef}>
        <path ref={shapeRef} className="pdp-thinking-status__mark" d={pdpAiCirclePath} />
      </g>
    </svg>
  )
}

function PdpThinkingStatus() {
  return (
    <div className="pdp-thinking-status" role="status" aria-live="polite">
      <span className="pdp-thinking-status__icon">
        <PdpThinkingStatusIcon />
      </span>
      <span className="pdp-thinking-status__viewport" aria-hidden="true">
        <span className="pdp-thinking-status__track">
          {pdpThinkingStatusTexts.map((text) => (
            <span key={text} className="pdp-thinking-status__text">
              {text}
            </span>
          ))}
          <span className="pdp-thinking-status__text">{pdpThinkingStatusTexts[0]}</span>
        </span>
      </span>
      <span className="pdp-thinking-status__sr">{pdpThinkingStatusTexts[0]}</span>
    </div>
  )
}

function PdpPlaceObjectScreen({
  isActive,
  selectedSpace,
  onBack,
}: {
  isActive: boolean
  selectedSpace: PdpSelectableSpace
  onBack: () => void
}) {
  const [placementItems, setPlacementItems] = useState<PdpPlacementItem[]>(() => [
    createPdpPlacementItem(pdpPrimaryProduct, 0),
  ])
  const [activePlacementItemId, setActivePlacementItemId] = useState('pdp-moss-rug-0')
  const [showSubmitHint, setShowSubmitHint] = useState(false)
  const [showAddProductTooltip, setShowAddProductTooltip] = useState(false)
  const [hasSeenPlacementInstruction, setHasSeenPlacementInstruction] = useState(false)
  const [hasSeenAddProductTooltip, setHasSeenAddProductTooltip] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false)
  const [isPlusButtonPressed, setIsPlusButtonPressed] = useState(false)
  const [pressedMenuItemId, setPressedMenuItemId] = useState<PdpPlacementMenuItemId | null>(null)
  const [phase, setPhase] = useState<PdpPlacementPhase>('placing')
  const [renderReturnPhase, setRenderReturnPhase] = useState<PdpPlacementPhase>('placing')
  const [resultSlides, setResultSlides] = useState<PdpGeneratedSlide[]>(() => [
    createOriginalResultSlide(selectedSpace),
  ])
  const [activeResultSlideIndex, setActiveResultSlideIndex] = useState(0)
  const [isComparingResult, setIsComparingResult] = useState(false)
  const [loadedResultSlideIds, setLoadedResultSlideIds] = useState<string[]>([])
  const [visibleResultTagSlideId, setVisibleResultTagSlideId] = useState<string | null>(null)
  const dragRef = useRef<{
    pointerId: number
    offsetX: number
    offsetY: number
    startClientX: number
    startClientY: number
    moved: boolean
  } | null>(null)
  const suppressMarkerClickRef = useRef(false)
  const placementInstanceCounterRef = useRef(1)
  const resultSwipeRef = useRef<{
    pointerId: number
    startClientX: number
  } | null>(null)
  const revealedResultSlideIdsRef = useRef<Set<string>>(new Set())
  const resultTagRevealTimeoutRef = useRef<number | null>(null)
  const isRendering = phase === 'rendering'
  const isResult = phase === 'result'
  const activeResultSlide = resultSlides[activeResultSlideIndex] ?? resultSlides[0]
  const comparisonResultSlide =
    activeResultSlideIndex > 0 ? resultSlides[activeResultSlideIndex - 1] : null
  const activePlacementItem =
    placementItems.find((item) => item.id === activePlacementItemId) ?? placementItems[0] ?? null
  const markerPosition = activePlacementItem?.position ?? pdpDefaultPlacementPosition
  const placedItems = placementItems.filter((item) => item.position !== null)
  const resultProducts: FeedProduct[] = placedItems.map((item) => ({
    id: item.id,
    thumbnailSrc: item.product.imageSrc,
    thumbnailAlt: item.product.name,
    name: item.product.name,
    priceLabel: item.product.price,
    discountLabel: item.product.discountRate,
    thumbnailRadius: 12,
  }))
  const hasPendingPlacement = placementItems.some((item) => item.position === null)
  const canStartRendering = placementItems.length > 0 && !hasPendingPlacement
  const isProductSheetLayoutOpen = isProductSheetOpen && !isRendering && !isResult
  const shouldShowInstruction = Boolean(
    activePlacementItem &&
      activePlacementItem.position === null &&
      placementItems.length === 1 &&
      !hasSeenPlacementInstruction &&
      !isProductSheetLayoutOpen,
  )
  const shouldShowAddProductTooltip =
    Boolean(activePlacementItem?.position) &&
    showAddProductTooltip &&
    !isRendering &&
    !isResult &&
    !isMenuOpen &&
    !isProductSheetOpen
  const panelPromptText =
    isRendering || isResult ? 'Describe what you want to change' : pdpPlacementPromptText

  useEffect(() => {
    if (isActive) {
      const initialPlacementItem = createPdpPlacementItem(pdpPrimaryProduct, 0)
      placementInstanceCounterRef.current = 1
      setPlacementItems([initialPlacementItem])
      setActivePlacementItemId(initialPlacementItem.id)
      setShowSubmitHint(false)
      setShowAddProductTooltip(false)
      setHasSeenPlacementInstruction(false)
      setHasSeenAddProductTooltip(false)
      setIsMenuOpen(false)
      setIsProductSheetOpen(false)
      setIsPlusButtonPressed(false)
      setPressedMenuItemId(null)
      setPhase('placing')
      setRenderReturnPhase('placing')
      setResultSlides([createOriginalResultSlide(selectedSpace)])
      setActiveResultSlideIndex(0)
      setIsComparingResult(false)
      setLoadedResultSlideIds([])
      setVisibleResultTagSlideId(null)
      revealedResultSlideIdsRef.current = new Set()
    }
  }, [isActive, selectedSpace.id])

  useEffect(() => {
    setIsComparingResult(false)
  }, [activeResultSlideIndex, phase])

  useEffect(() => {
    if (!isRendering) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      const nextSlideIndex = resultSlides.length

      setResultSlides((currentSlides) => [
        ...currentSlides,
        {
          id: `generated-${currentSlides.length}`,
          src: pdpGeneratedResultSrc,
          alt: 'Generated room image with the moss rug placed',
          hasProductTag: true,
        },
      ])
      setActiveResultSlideIndex(nextSlideIndex)
      setPhase('result')
    }, pdpResultDelayMs)

    return () => window.clearTimeout(timeoutId)
  }, [isRendering, resultSlides.length])

  useEffect(() => {
    if (!showSubmitHint) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setShowSubmitHint(false)
    }, 3600)

    return () => window.clearTimeout(timeoutId)
  }, [showSubmitHint])

  useEffect(() => {
    if (resultTagRevealTimeoutRef.current !== null) {
      window.clearTimeout(resultTagRevealTimeoutRef.current)
      resultTagRevealTimeoutRef.current = null
    }

    if (!isResult || !activeResultSlide?.hasProductTag) {
      setVisibleResultTagSlideId(null)
      return
    }

    if (!loadedResultSlideIds.includes(activeResultSlide.id)) {
      setVisibleResultTagSlideId(null)
      return
    }

    if (revealedResultSlideIdsRef.current.has(activeResultSlide.id)) {
      setVisibleResultTagSlideId(activeResultSlide.id)
      return
    }

    setVisibleResultTagSlideId(null)
    resultTagRevealTimeoutRef.current = window.setTimeout(() => {
      revealedResultSlideIdsRef.current.add(activeResultSlide.id)
      setVisibleResultTagSlideId(activeResultSlide.id)
      resultTagRevealTimeoutRef.current = null
    }, pdpResultTagRevealDelayMs)

    return () => {
      if (resultTagRevealTimeoutRef.current !== null) {
        window.clearTimeout(resultTagRevealTimeoutRef.current)
        resultTagRevealTimeoutRef.current = null
      }
    }
  }, [activeResultSlide, isResult, loadedResultSlideIds])

  function updatePosition(clientX: number, clientY: number, element: HTMLElement) {
    const stage = element.closest('.pdp-placement-stage')

    if (!(stage instanceof HTMLElement)) {
      return
    }

    const rect = stage.getBoundingClientRect()
    const drag = dragRef.current

    if (!drag) {
      return
    }

    const nextPosition = clampPlacementPosition({
      x: clientX - rect.left - drag.offsetX,
      y: clientY - rect.top - drag.offsetY,
    })

    setPlacementItems((currentItems) =>
      currentItems.map((item) =>
        item.id === activePlacementItemId ? { ...item, position: nextPosition } : item,
      ),
    )
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (isRendering || !activePlacementItem) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    if (!activePlacementItem.position) {
      setHasSeenPlacementInstruction(true)
    }
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left - rect.width / 2,
      offsetY: event.clientY - rect.top - rect.height / 2,
      startClientX: event.clientX,
      startClientY: event.clientY,
      moved: false,
    }
    setShowAddProductTooltip(false)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (isRendering) {
      return
    }

    const drag = dragRef.current

    if (drag?.pointerId !== event.pointerId) {
      return
    }

    if (isMenuOpen) {
      setIsMenuOpen(false)
      setIsPlusButtonPressed(false)
      setPressedMenuItemId(null)
    }

    const deltaX = event.clientX - drag.startClientX
    const deltaY = event.clientY - drag.startClientY

    if (!drag.moved && (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2)) {
      drag.moved = true
      if (!activePlacementItem?.position) {
        setShowSubmitHint(true)
      }
    }

    updatePosition(event.clientX, event.clientY, event.currentTarget)
  }

  function handlePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current

    if (drag?.pointerId !== event.pointerId) {
      return
    }

    event.currentTarget.releasePointerCapture(event.pointerId)
    if (drag.moved) {
      suppressMarkerClickRef.current = true
      if (!hasSeenAddProductTooltip) {
        setShowAddProductTooltip(true)
        setHasSeenAddProductTooltip(true)
      }
    }
    dragRef.current = null
  }

  function handlePointerCancel(event: React.PointerEvent<HTMLButtonElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) {
      return
    }

    event.currentTarget.releasePointerCapture(event.pointerId)
    dragRef.current = null
  }

  function startRendering() {
    if (!canStartRendering) {
      return
    }

    setIsMenuOpen(false)
    setIsProductSheetOpen(false)
    setIsPlusButtonPressed(false)
    setPressedMenuItemId(null)
    setShowSubmitHint(false)
    setRenderReturnPhase(phase === 'result' ? 'result' : 'placing')
    setPhase('rendering')
  }

  function stopRendering() {
    setPhase(renderReturnPhase === 'result' ? 'result' : 'placing')
  }

  function openProductSheet() {
    setIsMenuOpen(false)
    setIsProductSheetOpen(true)
    setShowAddProductTooltip(false)
    setIsPlusButtonPressed(false)
    setPressedMenuItemId(null)
  }

  function closeProductSheet() {
    setIsProductSheetOpen(false)
    setIsPlusButtonPressed(false)
    setPressedMenuItemId(null)
  }

  function addArchiveProductToRoom(product: PdpProductArchiveItem) {
    const nextPlacementItem = createPdpPlacementItem(
      product,
      placementInstanceCounterRef.current,
    )
    placementInstanceCounterRef.current += 1

    setPlacementItems((currentItems) => [...currentItems, nextPlacementItem])
    setActivePlacementItemId(nextPlacementItem.id)
    setIsProductSheetOpen(false)
    setIsMenuOpen(false)
    setShowAddProductTooltip(false)
    setIsPlusButtonPressed(false)
    setPressedMenuItemId(null)
    setPhase('placing')
    setShowSubmitHint(true)
  }

  function removePlacementItem(itemId: string) {
    setPlacementItems((currentItems) => {
      if (currentItems.length <= 1) {
        return currentItems
      }

      const nextItems = currentItems.filter((item) => item.id !== itemId)

      if (itemId === activePlacementItemId) {
        setActivePlacementItemId(nextItems[0]?.id ?? currentItems[0].id)
      }

      return nextItems
    })
    setShowAddProductTooltip(false)
  }

  function markResultSlideLoaded(slideId: string) {
    setLoadedResultSlideIds((currentIds) =>
      currentIds.includes(slideId) ? currentIds : [...currentIds, slideId],
    )
  }

  function moveResultSlide(direction: 'next' | 'previous') {
    setActiveResultSlideIndex((currentIndex) => {
      if (direction === 'next') {
        return Math.min(currentIndex + 1, resultSlides.length - 1)
      }

      return Math.max(currentIndex - 1, 0)
    })
  }

  function handleResultPointerDown(event: React.PointerEvent<HTMLElement>) {
    if (!isResult || event.button !== 0) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    resultSwipeRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
    }
  }

  function handleResultPointerUp(event: React.PointerEvent<HTMLElement>) {
    const swipe = resultSwipeRef.current

    if (!swipe || swipe.pointerId !== event.pointerId) {
      return
    }

    event.currentTarget.releasePointerCapture(event.pointerId)
    resultSwipeRef.current = null

    const deltaX = event.clientX - swipe.startClientX

    if (deltaX <= -pdpResultSwipeThreshold) {
      moveResultSlide('next')
    } else if (deltaX >= pdpResultSwipeThreshold) {
      moveResultSlide('previous')
    }
  }

  function handleResultPointerCancel(event: React.PointerEvent<HTMLElement>) {
    if (resultSwipeRef.current?.pointerId !== event.pointerId) {
      return
    }

    event.currentTarget.releasePointerCapture(event.pointerId)
    resultSwipeRef.current = null
  }

  function handleComparePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (!comparisonResultSlide || event.button !== 0) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsComparingResult(true)
  }

  function stopComparingResult(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setIsComparingResult(false)
  }

  return (
    <div
      className={
        [
          'pdp-placement-screen',
          isResult ? 'pdp-placement-screen--result' : '',
          isRendering ? 'pdp-placement-screen--rendering' : '',
          isProductSheetLayoutOpen ? 'pdp-placement-screen--product-sheet-open' : '',
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      <header className="pdp-selector-header">
        <StatusBar levelsSrc={statusLevelsSrc} className="pdp-selector-status" />
        <TopNav
          className="pdp-selector-top-nav"
          leading={
            <button type="button" className="pdp-selector-close-button" onClick={onBack}>
              <FigmaAsset
                src={`${assetRoot}/arrow-left.svg`}
                alt=""
                displayWidth={20.5}
                displayHeight={18.867}
              />
            </button>
          }
          center={<h1>Place {activePlacementItem?.category.toLowerCase() ?? 'item'}</h1>}
        />
      </header>

      <main
        className={
          isResult
            ? 'pdp-placement-main pdp-placement-main--result'
            : isRendering
              ? 'pdp-placement-main pdp-placement-main--rendering'
              : 'pdp-placement-main'
        }
      >
        <section
          className={
            isResult
              ? 'pdp-placement-stage pdp-placement-stage--result'
              : isRendering
              ? 'pdp-placement-stage pdp-placement-stage--rendering'
              : shouldShowInstruction
              ? 'pdp-placement-stage pdp-placement-stage--dimmed'
              : 'pdp-placement-stage'
          }
          aria-label={`Place ${activePlacementItem?.category.toLowerCase() ?? 'item'} on photo`}
          onPointerDown={isResult ? handleResultPointerDown : undefined}
          onPointerUp={isResult ? handleResultPointerUp : undefined}
          onPointerCancel={isResult ? handleResultPointerCancel : undefined}
          onDragStart={(event) => event.preventDefault()}
        >
          {isResult ? (
            <>
              <div
                className="pdp-placement-result-track"
                style={{ transform: `translateX(-${activeResultSlideIndex * pdpResultImageSize}px)` }}
              >
                {resultSlides.map((slide) => (
                  <div key={slide.id} className="pdp-placement-result-slide">
                    <FigmaAsset
                      src={slide.src}
                      alt={slide.alt}
                      displayWidth={343}
                      displayHeight={343}
                      className="pdp-placement-result-image"
                      exportScale={1}
                      onLoad={() => markResultSlideLoaded(slide.id)}
                    />
                  </div>
                ))}
              </div>
              {comparisonResultSlide ? (
                <>
                  {isComparingResult ? (
                    <FigmaAsset
                      src={comparisonResultSlide.src}
                      alt=""
                      displayWidth={343}
                      displayHeight={343}
                      className="pdp-placement-result-compare-image"
                      exportScale={1}
                    />
                  ) : null}
                  <button
                    type="button"
                    className="pdp-placement-result-compare-button"
                    aria-label="Hold to compare with previous result"
                    aria-pressed={isComparingResult}
                    onPointerDown={handleComparePointerDown}
                    onPointerUp={stopComparingResult}
                    onPointerCancel={stopComparingResult}
                    onLostPointerCapture={() => setIsComparingResult(false)}
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                    }}
                  >
                    <span aria-hidden="true" />
                  </button>
                </>
              ) : null}
              {activeResultSlide?.hasProductTag &&
              visibleResultTagSlideId === activeResultSlide.id &&
              !isComparingResult
                ? placedItems.map((item, index) => {
                    const tagPosition =
                      pdpResultTagPositions[index] ?? item.position ?? pdpDefaultPlacementPosition

                    return (
                      <button
                        key={item.id}
                        type="button"
                        className="pdp-placement-result-tag ds-feed-media__tag"
                        style={{
                          left: `${tagPosition.x}px`,
                          top: `${tagPosition.y}px`,
                        }}
                        aria-label={`View tagged ${item.category}`}
                      >
                        <FigmaAsset
                          src="/assets/figma/personalized-feed/feed-card/product-tag-bg.svg"
                          alt=""
                          displayWidth={18}
                          displayHeight={18}
                          className="ds-feed-media__tag-bg"
                        />
                        <FigmaAsset
                          src="/assets/figma/personalized-feed/feed-card/product-tag-plus.svg"
                          alt=""
                          displayWidth={7.71429}
                          displayHeight={7.71429}
                          className="ds-feed-media__tag-plus"
                        />
                      </button>
                    )
                  })
                : null}
              <div className="pdp-placement-result-dots" aria-label="Generated image carousel">
                {resultSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={
                      index === activeResultSlideIndex
                        ? 'pdp-placement-result-dot pdp-placement-result-dot--active'
                        : 'pdp-placement-result-dot'
                    }
                    aria-label={index === 0 ? 'Show original image' : `Show generated image ${index}`}
                    onClick={() => setActiveResultSlideIndex(index)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <FigmaAsset
                src={selectedSpace.src}
                alt=""
                displayWidth={343}
                displayHeight={343}
                exportScale={1}
                className="pdp-placement-stage__photo"
              />
              <div className="pdp-placement-stage__render-blur" aria-hidden="true">
                {isRendering ? (
                  <span className="pdp-placement-stage__render-dots">
                    {pdpLoadingDots.map((dot) => (
                      <span
                        key={dot.id}
                        className="pdp-placement-stage__render-dot"
                        style={{
                          '--pdp-dot-delay': `${dot.delay}ms`,
                          '--pdp-dot-drift-x': `${dot.driftX.toFixed(2)}px`,
                          '--pdp-dot-drift-y': `${dot.driftY.toFixed(2)}px`,
                          '--pdp-dot-peak-scale': dot.peakScale.toFixed(2),
                        } as CSSProperties}
                      />
                    ))}
                  </span>
                ) : null}
              </div>
            </>
          )}
          {!isRendering && !isResult
            ? placementItems
                .filter((item) => item.position || item.id === activePlacementItemId)
                .map((item) => {
                  const isActive = item.id === activePlacementItemId
                  const itemPosition = item.position ?? pdpDefaultPlacementPosition

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={
                        isActive
                          ? 'pdp-placement-marker pdp-placement-marker--resting pdp-placement-marker--active'
                          : 'pdp-placement-marker pdp-placement-marker--resting'
                      }
                      style={{
                        left: `${itemPosition.x}px`,
                        top: `${itemPosition.y}px`,
                      }}
                      aria-label={`Place ${item.category}`}
                      onPointerDown={isActive ? handlePointerDown : undefined}
                      onPointerMove={isActive ? handlePointerMove : undefined}
                      onPointerUp={isActive ? handlePointerUp : undefined}
                      onPointerCancel={isActive ? handlePointerCancel : undefined}
                      onClick={() => {
                        if (suppressMarkerClickRef.current) {
                          suppressMarkerClickRef.current = false
                          return
                        }
                        setActivePlacementItemId(item.id)
                        setShowAddProductTooltip(false)
                      }}
                    >
                      {item.category}
                    </button>
                  )
                })
            : null}
          {shouldShowInstruction && !isRendering && !isResult ? (
            <div
              className="pdp-placement-coachmark"
              aria-hidden="true"
              style={{
                left: `${markerPosition.x}px`,
                top: `${markerPosition.y + 31}px`,
              }}
            >
              <p>Move the pin to place your item</p>
            </div>
          ) : null}
        </section>
        {isRendering ? <PdpThinkingStatus /> : null}
        {!isRendering && !isResult ? <span className="pdp-placement-render-dot" aria-hidden="true" /> : null}
        {isResult ? (
          <>
            {activeResultSlide?.hasProductTag && resultProducts.length > 0 ? (
              <div className="pdp-placement-result-product">
                <FeedProductStrip
                  products={resultProducts}
                  mode="rail"
                  thumbnailSize={48}
                  thumbnailRadius={12}
                  topPadding={0}
                  bottomPadding={16}
                  contentPaddingX={16}
                  itemGap={4}
                  rowHeight={64}
                  showRightFade={resultProducts.length > 4}
                />
              </div>
            ) : null}
          </>
        ) : null}
      </main>

      {isMenuOpen && !isRendering ? (
        <button
          type="button"
          className="pdp-placement-menu-backdrop"
          aria-label="Close placement actions"
          onClick={() => {
            setIsMenuOpen(false)
            setIsProductSheetOpen(false)
            setIsPlusButtonPressed(false)
            setPressedMenuItemId(null)
          }}
        />
      ) : null}

      <div
        className={
          isMenuOpen && !isRendering
            ? 'pdp-placement-menu-wrap pdp-placement-menu-wrap--open'
            : 'pdp-placement-menu-wrap'
        }
      >
        <PdpPlacementQuickMenu
          pressedItemId={pressedMenuItemId}
          onPressItemStart={setPressedMenuItemId}
          onPressItemEnd={() => setPressedMenuItemId(null)}
          onOpenProductSheet={openProductSheet}
        />
      </div>

      <PdpProductArchiveSheet
        isOpen={isProductSheetOpen && !isRendering}
        onClose={closeProductSheet}
        onAddProduct={addArchiveProductToRoom}
      />

      <div
        className={
          [
            'pdp-placement-panel',
            isRendering || isResult ? 'pdp-placement-panel--input' : '',
          ]
            .filter(Boolean)
            .join(' ')
        }
      >
        <div className="pdp-placement-panel__handle">
          <span />
        </div>
        <div className="pdp-placement-panel__thumb-row" aria-label="Products to place">
          {placementItems.map((item) => (
            <div
              key={item.id}
              className={
                item.id === activePlacementItemId
                  ? 'pdp-placement-panel__thumb pdp-placement-panel__thumb--active'
                  : item.position
                    ? 'pdp-placement-panel__thumb pdp-placement-panel__thumb--placed'
                    : 'pdp-placement-panel__thumb'
              }
            >
              <button
                type="button"
                className="pdp-placement-panel__thumb-button"
                aria-label={`Place ${item.category}`}
                onClick={() => {
                  setActivePlacementItemId(item.id)
                  setShowAddProductTooltip(false)
                }}
              >
                <FigmaAsset
                  src={item.product.imageSrc}
                  alt=""
                  displayWidth={60}
                  displayHeight={60}
                  exportScale={1}
                  className={
                    item.product.fit === 'contain'
                      ? 'pdp-placement-panel__thumb-image pdp-placement-panel__thumb-image--contain'
                      : 'pdp-placement-panel__thumb-image'
                  }
                />
              </button>
              {placementItems.length > 1 ? (
                <button
                  type="button"
                  className="pdp-placement-panel__thumb-dismiss"
                  aria-label={`Remove ${item.category}`}
                  onClick={() => removePlacementItem(item.id)}
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="pdp-placement-panel__input">
          <p className="pdp-placement-panel__prompt">{panelPromptText}</p>
        </div>
        <div className="pdp-placement-panel__controls">
          <div className="pdp-placement-panel__plus-wrap">
            {shouldShowAddProductTooltip ? (
              <div className="pdp-placement-add-tooltip" role="status">
                Add more products
              </div>
            ) : null}
            <button
              type="button"
              className={
                isMenuOpen || isPlusButtonPressed || isProductSheetOpen
                  ? 'pdp-placement-panel__plus-button pdp-placement-panel__plus-button--active'
                  : 'pdp-placement-panel__plus-button'
              }
              aria-label="Add"
              aria-haspopup="menu"
              aria-expanded={!isRendering && (isMenuOpen || isProductSheetOpen)}
              disabled={isRendering}
              onPointerDown={() => setIsPlusButtonPressed(true)}
              onPointerUp={() => setIsPlusButtonPressed(false)}
              onPointerCancel={() => setIsPlusButtonPressed(false)}
              onPointerLeave={() => setIsPlusButtonPressed(false)}
              onClick={() => {
                if (isRendering) {
                  return
                }
                setShowAddProductTooltip(false)
                setIsMenuOpen((current) => !current)
                setIsProductSheetOpen(false)
                setPressedMenuItemId(null)
              }}
            >
              <PdpPlacementPlusIcon />
            </button>
          </div>
          <button
            type="button"
            className={
              isRendering
                ? 'pdp-placement-panel__submit-button pdp-placement-panel__submit-button--stop'
                : isResult
                  ? 'pdp-placement-panel__submit-button pdp-placement-panel__submit-button--disabled'
                : canStartRendering
                ? showSubmitHint
                  ? 'pdp-placement-panel__submit-button pdp-placement-panel__submit-button--enabled pdp-placement-panel__submit-button--hint'
                  : 'pdp-placement-panel__submit-button pdp-placement-panel__submit-button--enabled'
                : 'pdp-placement-panel__submit-button pdp-placement-panel__submit-button--disabled'
            }
            aria-label={isRendering ? 'Stop rendering' : 'Generate placement'}
            disabled={!isRendering && !canStartRendering}
            onClick={() => {
              if (isRendering) {
                stopRendering()
                return
              }

              startRendering()
            }}
          >
            {isRendering ? <PdpGeneratingStopIcon /> : <PdpPlacementArrowUpIcon />}
          </button>
        </div>
        <HomeIndicator />
      </div>
    </div>
  )
}

function PdpGeneratingStopIcon() {
  return (
    <span className="pdp-generating-stop-icon" aria-hidden="true">
      <span />
    </span>
  )
}

function PdpProductInfo() {
  return (
    <section className="pdp-info" aria-label="Product information">
      <div className="pdp-title-block">
        <p className="pdp-brand">Nomia</p>
        <div className="pdp-name-row">
          <h1>{pdpProductFullName}</h1>
          <PdpIconButton label="Share product" className="pdp-share-button">
            <PdpShareIcon />
          </PdpIconButton>
        </div>
        <PdpRating />
      </div>

      <div className="pdp-price-block">
        <div className="pdp-list-price">
          <span>31%</span>
          <span>62,900 KRW</span>
          <InfoIcon />
        </div>
        <p className="pdp-sale-price">42,900</p>
      </div>

      <div className="pdp-price-guarantee">
        <span>Guaranteed Price</span>
        <span>Lowest online price daily</span>
        <InfoIcon />
      </div>

      <div className="pdp-coupon-card">
        <span className="pdp-coupon-card__icon">
          <FigmaAsset
            src={`${assetRoot}/cart-24.svg`}
            alt=""
            displayWidth={18}
            displayHeight={18}
          />
        </span>
        <span className="pdp-coupon-card__copy">
          <span>More discount available on checkout</span>
          <span>Orders over 400,000 KRW</span>
        </span>
      </div>
    </section>
  )
}

function PdpBenefitShipping() {
  return (
    <section className="pdp-benefit-shipping" aria-label="Benefits and shipping">
      <div className="pdp-field-row">
        <p className="pdp-field-row__label">Benefits</p>
        <div className="pdp-field-row__content">
          <p className="pdp-strong">350P Reward (VIP 3% applied)</p>
          <p className="pdp-line-with-icon">
            <span>8 months interest-free installment</span>
            <ChevronRight />
          </p>
        </div>
      </div>

      <div className="pdp-field-row">
        <p className="pdp-field-row__label">Shipping</p>
        <div className="pdp-field-row__content pdp-field-row__content--shipping">
          <p className="pdp-line-with-icon pdp-strong">
            <span>Free Shipping</span>
            <ChevronRight />
          </p>
          <p>Direct Delivery from Supplier</p>
          <p className="pdp-note">
            <FigmaAsset
              src={`${assetRoot}/check-16.svg`}
              alt=""
              displayWidth={12.1}
              displayHeight={8.5}
              className="pdp-note__check"
            />
            <span>Delivery to Jeju not available</span>
          </p>
          <button type="button" className="pdp-arrival-button">
            <FigmaAsset
              src={`${assetRoot}/delivery-time.svg`}
              alt=""
              displayWidth={17.54}
              displayHeight={17.392}
            />
            <span>Arrive by 11/9 (Wed)</span>
            <FigmaAsset
              src={`${assetRoot}/chevron-down-16.svg`}
              alt=""
              displayWidth={13.35}
              displayHeight={7.91}
              className="pdp-arrival-button__chevron"
            />
          </button>
          <button type="button" className="pdp-bundled-button">
            <span>Add bundled shipping items</span>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}

function PdpCtaBar() {
  return (
    <div className="pdp-cta-bar">
      <div className="pdp-cta-bar__toolbar">
        <button type="button" className="pdp-save-button" aria-label="Save product">
          <FigmaAsset
            src={`${assetRoot}/scrap-24.svg`}
            alt=""
            displayWidth={16}
            displayHeight={19.4}
          />
          <span>1,234</span>
        </button>
        <button type="button" className="pdp-buy-button">
          Buy Now
        </button>
      </div>
      <HomeIndicator />
    </div>
  )
}

function PdpDetailScreen({
  isActive,
  isThumbnail,
  onOpenSelector,
}: {
  isActive: boolean
  isThumbnail: boolean
  onOpenSelector: () => void
}) {
  const mainRef = useRef<HTMLDivElement | null>(null)

  useInertialScroll(mainRef, {
    enabled: isActive && !isThumbnail,
    preset: 'ios-pdp',
  })

  return (
    <div className="pdp-screen">
      <header className="pdp-header">
        <StatusBar levelsSrc={statusLevelsSrc} />
        <PdpTopNavigation />
      </header>

      <main
        ref={mainRef}
        className="pdp-main prototype-screen__scroll-region"
        data-inertial-scroll={isActive && !isThumbnail ? 'true' : undefined}
      >
        <PdpHero isThumbnail={isThumbnail} onOpenSelector={onOpenSelector} />
        <div className="pdp-content-wrap">
          <PdpProductInfo />
          <PdpBenefitShipping />
          <div className="pdp-divider" />
        </div>
      </main>

      <PdpCtaBar />
    </div>
  )
}

export default function PdpPrototype({ mode = 'full' }: PdpPrototypeProps) {
  const isThumbnail = mode === 'thumbnail'
  const [activeScreen, setActiveScreen] = useState<'product' | 'selector' | 'placer'>('product')
  const [selectedSpace, setSelectedSpace] = useState<PdpSelectableSpace>({
    id: 'default-bedroom',
    src: pdpSelectedRoomSrc,
  })

  return (
    <div className={isThumbnail ? 'pdp-prototype pdp-prototype--thumbnail' : 'pdp-prototype'}>
      <PrototypeScreen contentHeight={812} variant="bare">
        <div className="pdp-flow">
          <PushPage
            className="pdp-flow__page"
            state={activeScreen === 'product' ? 'center' : 'peek-left'}
          >
            <PdpDetailScreen
              isActive={activeScreen === 'product'}
              isThumbnail={isThumbnail}
              onOpenSelector={() => setActiveScreen('selector')}
            />
          </PushPage>
          <PushPage
            className="pdp-flow__page"
            state={
              activeScreen === 'selector'
                ? 'center'
                : activeScreen === 'placer'
                  ? 'peek-left'
                  : 'offscreen-right'
            }
          >
            <PdpSelectPhotoScreen
              isActive={activeScreen === 'selector'}
              isThumbnail={isThumbnail}
              onClose={() => setActiveScreen('product')}
              onSelectSpace={(space) => {
                setSelectedSpace(space)
                setActiveScreen('placer')
              }}
            />
          </PushPage>
          <PushPage
            className="pdp-flow__page"
            state={activeScreen === 'placer' ? 'center' : 'offscreen-right'}
          >
            <PdpPlaceObjectScreen
              isActive={activeScreen === 'placer'}
              selectedSpace={selectedSpace}
              onBack={() => setActiveScreen('selector')}
            />
          </PushPage>
        </div>
      </PrototypeScreen>
    </div>
  )
}
