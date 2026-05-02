// Single point where Construction AI's room flow pulls shared data /
// helpers / types from the PDP prototype. Keeping this list short makes
// it obvious what's shared vs what's been customised here.

export {
  pdpAiCirclePath,
  pdpAiStarPath,
  pdpDefaultPlacementPosition,
  pdpGeneratedResultSrc,
  pdpLoadingDotGridSize,
  pdpLoadingDots,
  pdpPlacementPromptText,
  pdpProductSheetHeight,
  pdpResultDelayMs,
  pdpResultImageSize,
  pdpResultSwipeThreshold,
  pdpResultTagPositions,
  pdpResultTagRevealDelayMs,
  pdpSampleSpaceCardWidth,
  pdpSelectedRoomSrc,
  pdpThinkingStatusTexts,
  type PdpGeneratedSlide,
  type PdpPlacementMenuItemId,
  type PdpPlacementPhase,
  type PlacementPosition,
} from '../../pdp/pdp-placement-data'

export {
  clampPlacementPosition,
  createOriginalResultSlide,
  createPdpWaterfallColumns,
  getPdpSampleSpaceDisplayHeight,
} from '../../pdp/pdp-helpers'

export {
  pdpMyPhotoThumbs,
  pdpSampleSpacesByType,
  pdpSpaceTypeOptions,
  type PdpAiRoomDataOverrides,
  type PdpPhotoThumb,
  type PdpSampleSpaceItem,
  type PdpSelectableSpace,
  type PdpSpaceType,
} from '../../pdp/pdp-room-selector-data'

export {
  createPdpPlacementItem,
  getPdpArchiveProductsForTab,
  pdpPrimaryProduct,
  pdpProductArchiveTabs,
  type PdpPlacementItem,
  type PdpProductArchiveItem,
  type PdpProductArchiveTab,
} from '../../pdp/pdp-product-archive'
