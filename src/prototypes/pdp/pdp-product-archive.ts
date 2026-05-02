// Product archive fixture data + types for the PDP prototype.
// The AI Room flow re-uses these via getPdpArchiveProductsForTab; derivative
// prototypes can import the seed list and remap as needed.

import { inferProductCategory } from './pdp-helpers'

export type PdpProductArchiveTab = 'all' | 'saved' | 'recently-viewed'

export type PdpProductArchiveItem = {
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

export type PdpProductArchiveSeedItem = Omit<
  PdpProductArchiveItem,
  'tabIds' | 'meta'
>

const pdpAssetRoot = '/assets/figma/pdp'

export const pdpProductArchiveTabs: {
  id: PdpProductArchiveTab
  label: string
}[] = [
  { id: 'all', label: 'All' },
  { id: 'saved', label: 'Saved' },
  { id: 'recently-viewed', label: 'Recently Viewed' },
]

export const pdpProductArchiveSeedItems: PdpProductArchiveSeedItem[] = [
  { id: 'retro-sheer-curtain', brand: 'Dormor', name: 'Retro Pattern Sheer Doorway Curtain, 14 Colors', price: '37,800', discountRate: '28%', imageSrc: `${pdpAssetRoot}/product-archive/retro-sheer-curtain.png` },
  { id: 'module-fabric-sofa', brand: 'Heimish Home', name: '2.5-Seater Modular Fabric Sofa with Ottoman', price: '659,000', discountRate: '15%', imageSrc: `${pdpAssetRoot}/product-archive/wood-storage-chest.png` },
  { id: 'spiano-floor-lamp', brand: 'Spiano', name: 'Adjustable Fabric Shade Floor Lamp', price: '89,900', discountRate: '32%', imageSrc: '/assets/figma/personalized-feed/ad/spiano-product.png' },
  { id: 'moss-rug', brand: 'Nomia', name: 'Moss Rug, Dust-Free Living Room Carpet', price: '42,900', discountRate: '28%', imageSrc: `${pdpAssetRoot}/moss-rug-hero.png` },
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

export const pdpProductArchiveItems: PdpProductArchiveItem[] =
  pdpProductArchiveSeedItems.map((product, index) => ({
    ...product,
    category: product.category ?? inferProductCategory(product),
    tabIds: index < 30 ? ['saved'] : ['recently-viewed'],
    meta: index < 30 ? 'Saved' : 'Recently viewed',
  }))

export const pdpProductArchiveOrderByTab: Record<
  PdpProductArchiveTab,
  string[]
> = {
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
