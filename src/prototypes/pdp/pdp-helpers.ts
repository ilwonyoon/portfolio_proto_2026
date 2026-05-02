// Pure helpers for the PDP prototype + AI room flow.
// Kept in one file so derivative prototypes can import the same utilities
// without dragging the entire PdpPrototype module in.

import type {
  PdpSampleSpaceItem,
  PdpSelectableSpace,
} from './pdp-room-selector-data'
import {
  pdpSampleSpaceCardWidth,
  type PdpGeneratedSlide,
  type PlacementPosition,
} from './pdp-placement-data'

export function inferProductCategory(product: { id: string; name: string }) {
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

export function orderPdpArchiveProducts<T extends { id: string }>(
  products: T[],
  orderIds: string[],
): T[] {
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

export function getPdpSampleSpaceDisplayHeight(item: PdpSampleSpaceItem) {
  if (typeof item.displayHeight === 'number') {
    return item.displayHeight
  }

  return (pdpSampleSpaceCardWidth * item.height) / item.width
}

export function createPdpWaterfallColumns(items: PdpSampleSpaceItem[]) {
  const columns: [PdpSampleSpaceItem[], PdpSampleSpaceItem[]] = [[], []]
  const columnHeights = [0, 0]

  items.forEach((item) => {
    const columnIndex = columnHeights[0] <= columnHeights[1] ? 0 : 1
    columns[columnIndex].push(item)
    columnHeights[columnIndex] += getPdpSampleSpaceDisplayHeight(item) + 12
  })

  return columns
}

export function createOriginalResultSlide(
  selectedSpace: PdpSelectableSpace,
): PdpGeneratedSlide {
  return {
    id: `original-${selectedSpace.id}`,
    src: selectedSpace.src,
    alt: 'Original room photo',
    hasProductTag: false,
  }
}

export function clampPlacementPosition(position: PlacementPosition) {
  return {
    x: Math.min(Math.max(position.x, 48), 295),
    y: Math.min(Math.max(position.y, 48), 295),
  }
}
