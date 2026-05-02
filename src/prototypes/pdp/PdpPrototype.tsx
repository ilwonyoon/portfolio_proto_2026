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
  type PdpAiRoomDataOverrides,
  type PdpPhotoThumb,
  type PdpSampleSpaceItem,
  type PdpSelectableSpace,
  type PdpSpaceType,
} from './pdp-room-selector-data'
import {
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
} from './pdp-placement-data'
import {
  clampPlacementPosition,
  createOriginalResultSlide,
  createPdpWaterfallColumns,
  getPdpSampleSpaceDisplayHeight,
  inferProductCategory,
  orderPdpArchiveProducts,
} from './pdp-helpers'
import {
  createPdpPlacementItem,
  getPdpArchiveProductsForTab,
  pdpPrimaryProduct,
  pdpProductArchiveItems,
  pdpProductArchiveOrderByTab,
  pdpProductArchiveTabs,
  pdpProductFullName,
  type PdpPlacementItem,
  type PdpProductArchiveItem,
  type PdpProductArchiveTab,
} from './pdp-product-archive'
import { PdpSelectPhotoScreen } from './AiRoomSelectorScreen'
import {
  PdpGeneratingStopIcon,
  PdpPlacementArrowUpIcon,
  PdpPlacementPlusIcon,
  PdpPlacementQuickMenu,
  PdpProductArchiveSheet,
} from './AiRoomPlacementSheets'
import { PdpThinkingStatus } from './AiRoomThinkingStatus'
import './pdp.css'

gsap.registerPlugin(MorphSVGPlugin)

type PdpPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type PdpFlowScreen = 'product' | 'selector' | 'placer'

type PdpAiRoomFlowProps = {
  mode?: 'full' | 'thumbnail'
  data?: PdpAiRoomDataOverrides
}

type PdpFlowContentProps = PdpPrototypeProps & {
  includeProductEntry: boolean
  initialScreen: PdpFlowScreen
  data?: PdpAiRoomDataOverrides
}

const assetRoot = '/assets/figma/pdp'
const statusLevelsSrc = '/assets/figma/portfolio-2026/onboarding/status-levels.svg'
const pdpProductImageSrc = `${assetRoot}/moss-rug-hero.png`
const pdpProductName = 'Moss Rug'

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

function PdpFlowContent({
  includeProductEntry,
  initialScreen,
  mode = 'full',
  data,
}: PdpFlowContentProps) {
  const isThumbnail = mode === 'thumbnail'
  const [activeScreen, setActiveScreen] = useState<PdpFlowScreen>(initialScreen)
  const [selectedSpace, setSelectedSpace] = useState<PdpSelectableSpace>({
    id: 'default-bedroom',
    src: pdpSelectedRoomSrc,
  })

  return (
    <div className="pdp-flow">
      {includeProductEntry ? (
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
      ) : null}
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
          data={data}
          onClose={() =>
            includeProductEntry
              ? setActiveScreen('product')
              : setActiveScreen('selector')
          }
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
  )
}

function PdpFlowRoot({
  includeProductEntry,
  initialScreen,
  mode = 'full',
  data,
}: PdpFlowContentProps) {
  const isThumbnail = mode === 'thumbnail'

  return (
    <div className={isThumbnail ? 'pdp-prototype pdp-prototype--thumbnail' : 'pdp-prototype'}>
      <PrototypeScreen contentHeight={812} variant="bare">
        <PdpFlowContent
          includeProductEntry={includeProductEntry}
          initialScreen={initialScreen}
          mode={mode}
          data={data}
        />
      </PrototypeScreen>
    </div>
  )
}

export function PdpAiRoomFlowContent({ mode = 'full', data }: PdpAiRoomFlowProps) {
  return (
    <PdpFlowContent
      includeProductEntry={false}
      initialScreen="selector"
      mode={mode}
      data={data}
    />
  )
}

export function PdpAiRoomFlow({ mode = 'full', data }: PdpAiRoomFlowProps) {
  return (
    <PdpFlowRoot
      includeProductEntry={false}
      initialScreen="selector"
      mode={mode}
      data={data}
    />
  )
}

export default function PdpPrototype({ mode = 'full' }: PdpPrototypeProps) {
  return (
    <PdpFlowRoot
      includeProductEntry
      initialScreen="product"
      mode={mode}
    />
  )
}
