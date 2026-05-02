// Constants and types for the AI Room placement / generation flow.
// Kept separate from PdpPrototype.tsx so the same data can be reused (or
// adapted via overrides) by other AI Room prototypes derived from this one.

export type PlacementPosition = {
  x: number
  y: number
}

export type PdpPlacementPhase = 'placing' | 'rendering' | 'result'

export type PdpGeneratedSlide = {
  id: string
  src: string
  alt: string
  hasProductTag: boolean
}

export type PdpPlacementMenuItemId = 'add-products' | 'style-transfer'

const assetRoot = '/assets/figma/pdp'

export const pdpSelectedRoomSrc = `${assetRoot}/place-selected-room.png`
export const pdpGeneratedResultSrc = `${assetRoot}/generated-room-result.png`
export const pdpSampleSpaceCardWidth = 167.5

export const pdpResultDelayMs = 12000
export const pdpResultSwipeThreshold = 36
export const pdpResultTagRevealDelayMs = 520
export const pdpResultImageSize = 343
export const pdpProductSheetHeight = 524

export const pdpThinkingStatusTexts = [
  'Analyzing your room',
  'Matching product scale',
  'Blending light and shadows',
  'Generating your design',
]

export const pdpLoadingDotGridSize = 32
export const pdpLoadingDots = Array.from(
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

export const pdpAiStarPath =
  'M77.8611 118.868C72.2323 117.121 72.2322 109.154 77.8611 107.407L91.3607 103.217C97.0244 101.46 101.459 97.025 103.217 91.3613L107.406 77.8617C109.153 72.2329 117.12 72.2329 118.867 77.8617L123.057 91.3613C124.814 97.025 129.249 101.46 134.912 103.217L148.412 107.407C154.041 109.154 154.041 117.121 148.412 118.868L134.913 123.057C129.249 124.815 124.814 129.249 123.057 134.913L118.867 148.413C117.12 154.042 109.153 154.042 107.406 148.413L103.217 134.913C101.459 129.249 97.0244 124.815 91.3607 123.057L77.8611 118.868Z'
export const pdpAiCirclePath =
  'M113.5 75.5A38 38 0 1 1 113.5 151.5A38 38 0 1 1 113.5 75.5Z'

export const pdpPlacementPromptText =
  'Place this object to the designated place'

export const pdpDefaultPlacementPosition: PlacementPosition = {
  x: 171.5,
  y: 171.5,
}

export const pdpResultTagPositions: PlacementPosition[] = [
  { x: 171.5, y: 266.5 },
  { x: 248.5, y: 161.5 },
]
