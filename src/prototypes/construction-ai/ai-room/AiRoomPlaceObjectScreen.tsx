import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { FigmaAsset } from '../../../prototype/FigmaAsset'
import {
  FeedProductStrip,
  type FeedProduct,
} from '../../../system/feed'
import { HomeIndicator, StatusBar, TopNav } from '../../../system/mobile'
import {
  clampPlacementPosition,
  createOriginalResultSlide,
  createPdpPlacementItem,
  pdpDefaultPlacementPosition,
  pdpGeneratedResultSrc,
  pdpLoadingDots,
  pdpPlacementPromptText,
  pdpPrimaryProduct,
  pdpResultDelayMs,
  pdpResultImageSize,
  pdpResultSwipeThreshold,
  pdpResultTagPositions,
  type PdpGeneratedSlide,
  type PdpPlacementItem,
  type PdpPlacementPhase,
  type PdpProductArchiveItem,
  type PdpSelectableSpace,
} from './deps'
import {
  ConstructionMaterialsSheet,
  PdpGeneratingStopIcon,
  PdpPlacementArrowUpIcon,
  PdpPlacementPlusIcon,
  PdpPlacementQuickMenu,
  PdpProductArchiveSheet,
  type ConstructionPlacementMenuItemId,
} from './AiRoomPlacementSheets'
import {
  getConstructionMaterialCategoryLabel,
  isConstructionSurfaceMaterial,
} from './materials-data'
import { PdpThinkingStatus } from './AiRoomThinkingStatus'

const assetRoot = '/assets/figma/pdp'
const statusLevelsSrc =
  '/assets/figma/portfolio-2026/onboarding/status-levels.svg'

export type ConstructionPlaceObjectMode =
  | 'add-products'
  | 'apply-materials'
  | 'style-transfer'

export type ConstructionAttachedMedia = {
  id: string
  src: string
  label: string
}

export type ConstructionResultContractor = {
  name: string
  rating: string
  reviewCount: number
}

type ConstructionResultTag = {
  id: string
  productId: string
  label: string
  x: number
  y: number
}

type ConstructionGeneratedSlide = PdpGeneratedSlide & {
  resultTags?: ConstructionResultTag[]
  resultProducts?: FeedProduct[]
}

const contentStyleTransferProductTagPositions = [
  { x: 285, y: 95 },
]
const resultTagRevealBaseDelayMs = 240
const resultTagRevealStaggerMs = 150

export function ConstructionPlaceObjectScreen({
  isActive,
  selectedSpace,
  onBack,
  initialMode = 'add-products',
  navTitle,
  referenceMedia,
  resultContractor,
  styleTransferResultSrc,
  styleTransferResultSrcSequence,
  styleTransferPlaceholder,
  styleTransferChips: styleTransferChipsOverride,
  styleTransferResultTags,
  styleTransferResultProducts,
  styleTransferResultTagSequence,
  styleTransferResultProductsSequence,
}: {
  isActive: boolean
  selectedSpace: PdpSelectableSpace
  onBack: () => void
  initialMode?: ConstructionPlaceObjectMode
  navTitle?: string
  referenceMedia?: ConstructionAttachedMedia
  resultContractor?: ConstructionResultContractor
  styleTransferResultSrc?: string
  styleTransferResultSrcSequence?: string[]
  styleTransferPlaceholder?: string
  styleTransferChips?: Array<{ id: string; label: string; prompt: string }>
  styleTransferResultTags?: Array<{
    id: string
    productId: string
    label: string
    x: number
    y: number
  }>
  styleTransferResultProducts?: FeedProduct[]
  styleTransferResultTagSequence?: Array<
    Array<{ id: string; productId: string; label: string; x: number; y: number }>
  >
  styleTransferResultProductsSequence?: FeedProduct[][]
}) {
  // For Add Products entry, seed with the default Moss Rug. For other modes
  // (Style Transfer, Apply Materials triggered from elsewhere), no
  // pre-seeded product — attached media is the reference image.
  const buildInitialItems = (): PdpPlacementItem[] => {
    if (initialMode === 'add-products') {
      return [createPdpPlacementItem(pdpPrimaryProduct, 0)]
    }
    if (referenceMedia) {
      // Reference image is treated as an attached "item" but with a fixed
      // position so the user is never asked to drop a marker.
      return [
        {
          id: referenceMedia.id,
          product: {
            id: referenceMedia.id,
            tabIds: ['saved'],
            brand: '',
            name: referenceMedia.label,
            category: 'Reference',
            price: '',
            imageSrc: referenceMedia.src,
          },
          category: 'Reference',
          position: pdpDefaultPlacementPosition,
        },
      ]
    }
    return []
  }

  const [placementItems, setPlacementItems] = useState<PdpPlacementItem[]>(
    buildInitialItems,
  )
  const [activePlacementItemId, setActivePlacementItemId] = useState<string | null>(
    () => buildInitialItems()[0]?.id ?? 'placeholder',
  )
  const [showSubmitHint, setShowSubmitHint] = useState(false)
  const [showAddProductTooltip, setShowAddProductTooltip] = useState(false)
  const [hasSeenPlacementInstruction, setHasSeenPlacementInstruction] = useState(false)
  const [hasSeenAddProductTooltip, setHasSeenAddProductTooltip] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false)
  const [isMaterialsSheetOpen, setIsMaterialsSheetOpen] = useState(false)
  const [activeMode, setActiveMode] =
    useState<ConstructionPlaceObjectMode>(initialMode)
  const [isPlusButtonPressed, setIsPlusButtonPressed] = useState(false)
  const [pressedMenuItemId, setPressedMenuItemId] = useState<ConstructionPlacementMenuItemId | null>(null)
  const [phase, setPhase] = useState<PdpPlacementPhase>('placing')
  const [renderReturnPhase, setRenderReturnPhase] = useState<PdpPlacementPhase>('placing')
  const [stageSrc, setStageSrc] = useState<string>(selectedSpace.src)
  const [activeMaterialKind, setActiveMaterialKind] = useState<
    'surface' | 'fixture' | null
  >(null)
  const [resultSlides, setResultSlides] = useState<ConstructionGeneratedSlide[]>(() => [
    createOriginalResultSlide(selectedSpace),
  ])
  const [activeResultSlideIndex, setActiveResultSlideIndex] = useState(0)
  const [isComparingResult, setIsComparingResult] = useState(false)
  const [loadedResultSlideIds, setLoadedResultSlideIds] = useState<string[]>([])
  const [visibleResultTagCount, setVisibleResultTagCount] = useState(0)
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
  const resultTagRevealTimeoutsRef = useRef<number[]>([])
  const isRendering = phase === 'rendering'
  const isResult = phase === 'result'
  const activeResultSlide = resultSlides[activeResultSlideIndex] ?? resultSlides[0]
  const comparisonResultSlide =
    activeResultSlideIndex > 0 ? resultSlides[activeResultSlideIndex - 1] : null
  // For style-transfer with a sequence of generated images, the consumer can
  // also pass a per-render sequence of tags and products. activeResultSlide
  // index 0 is the original photo, so the generated index is index - 1.
  const styleTransferGeneratedIndex = Math.max(activeResultSlideIndex - 1, 0)
  const activeStyleTransferTags =
    styleTransferResultTagSequence?.[styleTransferGeneratedIndex] ??
    styleTransferResultTags
  // Each generated slide carries its own product strip. Swiping between
  // slides shows the products tied to that render (e.g. desk-cluster strip on
  // the first generated slide, curtain on the second).
  const activeStyleTransferProducts =
    styleTransferResultProductsSequence?.[styleTransferGeneratedIndex] ??
    styleTransferResultProducts
  const activePlacementItem =
    placementItems.find((item) => item.id === activePlacementItemId) ?? placementItems[0] ?? null
  const markerPosition = activePlacementItem?.position ?? pdpDefaultPlacementPosition
  const placedItems = useMemo(
    () => placementItems.filter((item) => item.position !== null),
    [placementItems],
  )
  const placedProductItems = useMemo(
    () => placedItems.filter((item) => item.category !== 'Reference'),
    [placedItems],
  )
  const resultProducts: FeedProduct[] = useMemo(
    () =>
      placedProductItems.map((item) => ({
        id: item.id,
        thumbnailSrc: item.product.imageSrc,
        thumbnailAlt: item.product.name,
        name: item.product.name,
        priceLabel: item.product.price,
        discountLabel: item.product.discountRate,
        thumbnailRadius: 12,
      })),
    [placedProductItems],
  )
  const activeResultTags =
    activeResultSlide?.resultTags ??
    (activeResultSlide?.hasProductTag && activeMode === 'style-transfer'
      ? activeStyleTransferTags
      : undefined)
  const activeResultProducts =
    activeResultSlide?.resultProducts ??
    (activeResultSlide?.hasProductTag
      ? activeMode === 'style-transfer'
        ? activeStyleTransferProducts
        : resultProducts
      : undefined)
  const visibleResultTags = activeResultTags?.slice(0, visibleResultTagCount) ?? []
  const hasPendingPlacement = placementItems.some((item) => item.position === null)
  const canStartRendering = placementItems.length > 0 && !hasPendingPlacement
  const isProductSheetLayoutOpen = isProductSheetOpen && !isRendering
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
  const hasPlacementItem = placementItems.length > 0
  const hasUnplacedItem = placementItems.some((item) => item.position === null)

  // Each phase has its own prompt input. They don't share text — placing
  // is "what to generate", result is "what to change about the result".
  const [placingPrompt, setPlacingPrompt] = useState('')
  const [resultPrompt, setResultPrompt] = useState('')

  function getPlacingPlaceholder() {
    if (activeMode === 'apply-materials') {
      if (activeMaterialKind === 'surface') {
        return 'Apply this finish to the wall or floor'
      }
      if (activeMaterialKind === 'fixture') {
        return 'Place this fixture in your room'
      }
      return 'Pick a material to apply to your room'
    }
    if (activeMode === 'style-transfer') {
      return (
        styleTransferPlaceholder ??
        'Transfer the overall style of this reference, keeping the existing layout'
      )
    }
    if (!hasPlacementItem) {
      return 'Pick a product to add to your room'
    }
    if (hasUnplacedItem) {
      return 'Tap where you want to place this product'
    }
    return pdpPlacementPromptText
  }

  // Active value/placeholder change with phase. Rendering shows neither
  // a user value nor an editable placeholder — only a status placeholder.
  const inputValue = isRendering ? '' : isResult ? resultPrompt : placingPrompt
  function getRenderingPlaceholder() {
    if (activeMode === 'apply-materials') {
      if (activeMaterialKind === 'fixture') return 'Placing the fixture in your room'
      return 'Applying the new finish to your room'
    }
    if (activeMode === 'style-transfer') return 'Transferring the style to your room'
    return 'Generating your design'
  }

  const thinkingTextsByMode: Record<ConstructionPlaceObjectMode, string[]> = {
    'add-products': [
      'Analyzing your room',
      'Matching product scale',
      'Blending light and shadows',
      'Generating your design',
    ],
    'apply-materials':
      activeMaterialKind === 'fixture'
        ? [
            'Mapping the fixture into place',
            'Matching plumbing and proportions',
            'Blending light and reflections',
            'Generating your design',
          ]
        : [
            'Reading your walls and floors',
            'Mapping the new finish',
            'Adjusting tone and texture',
            'Generating your design',
          ],
    'style-transfer': [
      'Studying the reference style',
      'Reading your room layout',
      'Translating the look into your space',
      'Generating your design',
    ],
  }
  const activeThinkingTexts = thinkingTextsByMode[activeMode]

  const placeholderText = isRendering
    ? getRenderingPlaceholder()
    : isResult
      ? 'Describe what you want to change'
      : getPlacingPlaceholder()
  const handleInputChange = (next: string) => {
    if (isRendering) return
    if (isResult) {
      setResultPrompt(next)
    } else {
      setPlacingPrompt(next)
    }
  }

  // Style transfer suggestion chips. When user taps one, the chip's full
  // prompt sentence is dropped into the input as the actual value (chips
  // hide). Clearing the input restores the chip group. Verb-form labels keep
  // intent legible; consumers (e.g. content-style-transfer) override these.
  const styleTransferChips: Array<{ id: string; label: string; prompt: string }> =
    styleTransferChipsOverride ?? [
      {
        id: 'match-the-vibe',
        label: 'Match the vibe',
        prompt:
          'Match the overall mood of this reference in my bathroom — color palette, materials, and lighting feel. Keep the existing layout and fixture positions.',
      },
      {
        id: 'swap-the-finishes',
        label: 'Swap the finishes',
        prompt:
          'Apply finishes from this reference — wall tiles, floor, and surface materials only — without moving the existing fixtures or layout.',
      },
      {
        id: 'rework-the-layout',
        label: 'Rework the layout',
        prompt:
          'Reorganize the layout to match this reference — keep the same fixtures and finishes but rearrange the placement.',
      },
    ]

  const showStyleTransferChips =
    activeMode === 'style-transfer' &&
    placingPrompt.length === 0 &&
    !isRendering &&
    !isResult

  function getStyleTransferTagsForGeneratedIndex(generatedIndex: number) {
    return (
      styleTransferResultTagSequence?.[generatedIndex] ??
      styleTransferResultTags
    )
  }

  function getStyleTransferProductsForGeneratedIndex(generatedIndex: number) {
    return (
      styleTransferResultProductsSequence?.[generatedIndex] ??
      styleTransferResultProducts
    )
  }

  function buildPlacedItemResultTags(): ConstructionResultTag[] {
    return placedProductItems.map((item, index) => {
      const tagPosition =
        (styleTransferResultSrcSequence
          ? contentStyleTransferProductTagPositions[index]
          : undefined) ??
        pdpResultTagPositions[index] ??
        item.position ??
        pdpDefaultPlacementPosition

      return {
        id: `result-tag-${item.id}`,
        productId: item.product.id,
        label: item.category,
        x: tagPosition.x,
        y: tagPosition.y,
      }
    })
  }

  useEffect(() => {
    if (isActive) {
      const seedItems = buildInitialItems()
      placementInstanceCounterRef.current = 1
      setPlacementItems(seedItems)
      setActivePlacementItemId(seedItems[0]?.id ?? 'placeholder')
      setActiveMode(initialMode)
      setPlacingPrompt('')
      setResultPrompt('')
      setShowSubmitHint(false)
      setShowAddProductTooltip(false)
      setHasSeenPlacementInstruction(false)
      setHasSeenAddProductTooltip(false)
      setIsMenuOpen(false)
      setIsProductSheetOpen(false)
      setIsMaterialsSheetOpen(false)
      setIsPlusButtonPressed(false)
      setPressedMenuItemId(null)
      setPhase('placing')
      setRenderReturnPhase('placing')
      setResultSlides([createOriginalResultSlide(selectedSpace)])
      setActiveResultSlideIndex(0)
      setIsComparingResult(false)
      setLoadedResultSlideIds([])
      setVisibleResultTagCount(0)
      revealedResultSlideIdsRef.current = new Set()
      setStageSrc(selectedSpace.src)
      setActiveMaterialKind(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, selectedSpace.id, initialMode, referenceMedia?.id])

  useEffect(() => {
    setIsComparingResult(false)
  }, [activeResultSlideIndex, phase])

  useEffect(() => {
    if (!isRendering) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      const nextSlideIndex = resultSlides.length
      const generatedIndex = Math.max(nextSlideIndex - 1, 0)
      // For style-transfer, the consumer can supply a sequence of generated
      // images so the second/third render shows a different result. The
      // sequence index is (nextSlideIndex - 1) because slide[0] is the
      // original photo. Falls back to styleTransferResultSrc, then to the
      // construction-ai default asset.
      const styleTransferGeneratedSrc = (() => {
        if (
          styleTransferResultSrcSequence &&
          styleTransferResultSrcSequence.length > 0
        ) {
          const seqIndex = Math.min(
            generatedIndex,
            styleTransferResultSrcSequence.length - 1,
          )
          return styleTransferResultSrcSequence[seqIndex]
        }
        return (
          styleTransferResultSrc ??
          '/assets/figma/construction-ai/ai-room/style-transfer-result.jpg'
        )
      })()

      // When the consumer passes a sequence (content-style-transfer), every
      // render — regardless of mode — pulls from that sequence so the
      // experience stays a single style-transfer arc instead of falling back
      // to bathroom or PDP defaults when the user returns via add-products /
      // apply-materials menus.
      const generatedSrc = styleTransferResultSrcSequence
        ? styleTransferGeneratedSrc
        : activeMode === 'style-transfer'
          ? styleTransferGeneratedSrc
          : activeMode === 'apply-materials'
            ? '/assets/figma/construction-ai/ai-room/bathroom_result_2.jpeg'
            : pdpGeneratedResultSrc
      const generatedAlt =
        activeMode === 'style-transfer'
          ? 'Generated room with the reference style applied'
          : activeMode === 'apply-materials'
            ? activeMaterialKind === 'fixture'
              ? 'Generated room with the new fixture placed'
              : 'Generated room with the new finish applied'
            : 'Generated room image with the moss rug placed'
      const generatedResultTags =
        activeMode === 'style-transfer'
          ? getStyleTransferTagsForGeneratedIndex(generatedIndex)
          : buildPlacedItemResultTags()
      const generatedResultProducts =
        activeMode === 'style-transfer'
          ? getStyleTransferProductsForGeneratedIndex(generatedIndex)
          : resultProducts

      setResultSlides((currentSlides) => [
        ...currentSlides,
        {
          id: `generated-${currentSlides.length}`,
          src: generatedSrc,
          alt: generatedAlt,
          hasProductTag: true,
          resultTags:
            generatedResultTags && generatedResultTags.length > 0
              ? generatedResultTags
              : undefined,
          resultProducts:
            generatedResultProducts && generatedResultProducts.length > 0
              ? generatedResultProducts
              : undefined,
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
    if (!showAddProductTooltip) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setShowAddProductTooltip(false)
    }, 3600)

    return () => window.clearTimeout(timeoutId)
  }, [showAddProductTooltip])

  useEffect(() => {
    resultTagRevealTimeoutsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId)
    })
    resultTagRevealTimeoutsRef.current = []

    if (!isResult || !activeResultSlide?.hasProductTag || !activeResultTags) {
      setVisibleResultTagCount(0)
      return
    }

    if (!loadedResultSlideIds.includes(activeResultSlide.id)) {
      setVisibleResultTagCount(0)
      return
    }

    if (revealedResultSlideIdsRef.current.has(activeResultSlide.id)) {
      const timeoutId = window.setTimeout(() => {
        setVisibleResultTagCount(activeResultTags.length)
      }, 0)
      resultTagRevealTimeoutsRef.current.push(timeoutId)

      return
    }

    if (activeResultTags.length === 0) {
      setVisibleResultTagCount(0)
      revealedResultSlideIdsRef.current.add(activeResultSlide.id)

      return
    }

    setVisibleResultTagCount(0)
    activeResultTags.forEach((_, index) => {
      const timeoutId = window.setTimeout(
        () => {
          setVisibleResultTagCount(index + 1)

          if (index === activeResultTags.length - 1) {
            revealedResultSlideIdsRef.current.add(activeResultSlide.id)
          }
        },
        resultTagRevealBaseDelayMs + index * resultTagRevealStaggerMs,
      )
      resultTagRevealTimeoutsRef.current.push(timeoutId)
    })

    return () => {
      resultTagRevealTimeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
      resultTagRevealTimeoutsRef.current = []
    }
  }, [activeResultSlide, activeResultTags, isResult, loadedResultSlideIds])

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

  function carryResultIntoPlacing(nextMode: ConstructionPlaceObjectMode) {
    if (!isResult) return
    // Use the current generated result as the new stage background — the user
    // continues editing on top of the previous render. Clear placements so
    // the next item (product or material) starts fresh.
    const snapshotSrc = activeResultSlide?.src
    if (snapshotSrc) {
      setStageSrc(snapshotSrc)
    }
    setPlacementItems([])
    setActivePlacementItemId(null)
    setActiveMaterialKind(null)
    setPhase('placing')
    setRenderReturnPhase('placing')
    setActiveMode(nextMode)
    setPlacingPrompt('')
    setResultPrompt('')
  }

  function openProductSheet() {
    if (isResult) carryResultIntoPlacing('add-products')
    setActiveMode('add-products')
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

  function openMaterialsSheet() {
    if (isResult) carryResultIntoPlacing('apply-materials')
    setActiveMode('apply-materials')
    setIsMenuOpen(false)
    setIsMaterialsSheetOpen(true)
    setShowAddProductTooltip(false)
    setIsPlusButtonPressed(false)
    setPressedMenuItemId(null)
  }

  function closeMaterialsSheet() {
    setIsMaterialsSheetOpen(false)
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

  function selectResultSlide(index: number) {
    setVisibleResultTagCount(0)
    setActiveResultSlideIndex(index)
  }

  function moveResultSlide(direction: 'next' | 'previous') {
    setVisibleResultTagCount(0)
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
          center={
            <h1>
              {navTitle ?? `Place ${activePlacementItem?.category.toLowerCase() ?? 'item'}`}
            </h1>
          }
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
              !isComparingResult &&
              visibleResultTags.length > 0
                ? visibleResultTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      className="pdp-placement-result-tag ds-feed-media__tag"
                      style={{
                        left: `${tag.x}px`,
                        top: `${tag.y}px`,
                      }}
                      aria-label={`View tagged ${tag.label}`}
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
                  ))
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
                    onClick={() => selectResultSlide(index)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <FigmaAsset
                src={stageSrc}
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
          {!isRendering && !isResult && (activeMode === 'add-products' || activeMode === 'apply-materials')
            ? placementItems
                .filter(
                  (item) =>
                    item.category !== 'Reference' &&
                    (item.position || item.id === activePlacementItemId),
                )
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
          {shouldShowInstruction && !isRendering && !isResult && (activeMode === 'add-products' || activeMode === 'apply-materials') ? (
            <div
              className="pdp-placement-coachmark"
              aria-hidden="true"
              style={{
                left: `${markerPosition.x}px`,
                top: `${markerPosition.y + 31}px`,
              }}
            >
              <p>
                {activeMode === 'apply-materials'
                  ? activeMaterialKind === 'fixture'
                    ? 'Move the pin to where this fixture should go'
                    : 'Move the pin to the wall or floor you want to change'
                  : 'Move the pin to place your item'}
              </p>
            </div>
          ) : null}
        </section>
        {isRendering ? <PdpThinkingStatus texts={activeThinkingTexts} /> : null}
        {!isRendering && !isResult ? <span className="pdp-placement-render-dot" aria-hidden="true" /> : null}
        {isResult ? (
          <>
            {activeResultProducts && activeResultProducts.length > 0 ? (
              <div className="pdp-placement-result-product">
                <FeedProductStrip
                  products={activeResultProducts}
                  mode="rail"
                  thumbnailSize={48}
                  thumbnailRadius={12}
                  topPadding={0}
                  bottomPadding={16}
                  contentPaddingX={16}
                  itemGap={4}
                  rowHeight={64}
                  showRightFade={activeResultProducts.length > 4}
                />
              </div>
            ) : activeMode === 'style-transfer' && resultContractor ? (
              <div className="pdp-placement-result-contractor">
                <button type="button" className="pdp-placement-result-contractor__card">
                  <div className="pdp-placement-result-contractor__info">
                    <p className="pdp-placement-result-contractor__name">
                      {resultContractor.name}
                    </p>
                    <div className="pdp-placement-result-contractor__rating">
                      <span
                        className="pdp-placement-result-contractor__star"
                        aria-hidden="true"
                      >
                        ★
                      </span>
                      <strong>{resultContractor.rating}</strong>
                      <span className="pdp-placement-result-contractor__reviews">
                        Reviews {resultContractor.reviewCount}
                      </span>
                    </div>
                  </div>
                  <span className="pdp-placement-result-contractor__action">
                    View more
                    <span aria-hidden="true">›</span>
                  </span>
                </button>
              </div>
            ) : activeResultSlide?.hasProductTag && resultProducts.length > 0 ? (
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
          onOpenMaterialsSheet={openMaterialsSheet}
          onSelectStyleTransfer={() => {
            if (isResult) carryResultIntoPlacing('style-transfer')
            setActiveMode('style-transfer')
            setIsMenuOpen(false)
            setShowAddProductTooltip(false)
            setIsPlusButtonPressed(false)
            setPressedMenuItemId(null)
          }}
        />
      </div>

      <PdpProductArchiveSheet
        isOpen={isProductSheetOpen && !isRendering}
        onClose={closeProductSheet}
        onAddProduct={addArchiveProductToRoom}
      />

      <ConstructionMaterialsSheet
        isOpen={isMaterialsSheetOpen && !isRendering}
        onClose={closeMaterialsSheet}
        onAddMaterial={(material) => {
          const categoryLabel = getConstructionMaterialCategoryLabel(material.category)
          const nextItem: PdpPlacementItem = {
            id: `material-${material.id}-${placementInstanceCounterRef.current}`,
            product: {
              id: material.id,
              tabIds: ['saved'],
              brand: material.brand,
              name: material.name,
              category: categoryLabel,
              price: material.priceLabel,
              imageSrc: material.imageSrc,
            },
            category: categoryLabel,
            position: pdpDefaultPlacementPosition,
          }
          placementInstanceCounterRef.current += 1
          setPlacementItems((current) => [...current, nextItem])
          setActivePlacementItemId(nextItem.id)
          setActiveMaterialKind(
            isConstructionSurfaceMaterial(material.category) ? 'surface' : 'fixture',
          )
          closeMaterialsSheet()
        }}
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
        {showStyleTransferChips ? (
          <div
            className="pdp-placement-suggestion-chips"
            data-native-scroll-axis="x"
            aria-label="Style transfer suggestions"
          >
            {styleTransferChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className="pdp-placement-suggestion-chip"
                onClick={() => setPlacingPrompt(chip.prompt)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        ) : null}
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
          <textarea
            className="pdp-placement-panel__prompt"
            placeholder={placeholderText}
            value={inputValue}
            onChange={(event) => handleInputChange(event.target.value)}
            disabled={isRendering}
            rows={1}
            ref={(node) => {
              if (!node) return
              node.style.height = 'auto'
              node.style.height = `${Math.min(node.scrollHeight, 140)}px`
            }}
          />
        </div>
        <div className="pdp-placement-panel__controls">
          <div className="pdp-placement-panel__plus-wrap">
            {shouldShowAddProductTooltip ? (
              <div className="pdp-placement-add-tooltip" role="status">
                {activeMode === 'apply-materials'
                  ? 'Add more materials'
                  : activeMode === 'style-transfer'
                    ? 'Try a different style or finish'
                    : 'Add more products'}
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
