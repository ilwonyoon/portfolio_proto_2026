import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { HomeIndicator, StatusBar, TopNav } from '../../system/mobile'
import { useInertialScroll } from '../../system/mobile/useInertialScroll'
import { PushPage } from '../../system/overlays'
import {
  pdpMyDesignThumbs,
  pdpMyPhotoThumbs,
  pdpSampleSpacesByType,
  pdpSpaceTypeOptions,
  type PdpSelectableSpace,
  type PdpSpaceType,
} from './pdp-room-selector-data'
import './pdp.css'

type PdpPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type PlacementPosition = {
  x: number
  y: number
}

type PdpPlacementMenuItemId = 'add-products' | 'style-transfer' | 'analyze-room'

const assetRoot = '/assets/figma/pdp'
const statusLevelsSrc = '/assets/figma/portfolio-2026/onboarding/status-levels.svg'
const generatingStatusMessages = [
  'Matching scale and perspective',
  'Balancing light and floor contact',
  'Refining room-ready composition',
] as const

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

function SeeInYourPlaceIcon() {
  return (
    <svg
      className="pdp-see-in-your-place-icon"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.77222 2.1875C4.96247 2.1875 5.12655 2.31447 5.17311 2.49822L5.45676 3.6208C5.71962 4.66137 6.53283 5.47457 7.57339 5.73744L8.69598 6.02108C8.87972 6.06765 9.00669 6.23172 9.00669 6.42197C9.00669 6.61223 8.87972 6.7763 8.69598 6.82286L7.57339 7.10651C6.53283 7.36937 5.71962 8.18258 5.45676 9.22314L5.17311 10.3457C5.12655 10.5295 4.96247 10.6564 4.77222 10.6564C4.58197 10.6564 4.41789 10.5295 4.37133 10.3457L4.08768 9.22314C3.82482 8.18258 3.01161 7.36937 1.97105 7.10651L0.84847 6.82286C0.664724 6.7763 0.53776 6.61223 0.53776 6.42197C0.53776 6.23172 0.664724 6.06765 0.84847 6.02108L1.97105 5.73744C3.01161 5.47457 3.82482 4.66137 4.08768 3.6208L4.37133 2.49822C4.41789 2.31447 4.58197 2.1875 4.77222 2.1875Z"
        fill="currentColor"
      />
      <path
        d="M10.4708 0.875C10.6135 0.875 10.7366 0.970431 10.7716 1.1085L10.9482 1.80802C11.127 2.51593 11.6801 3.06895 12.388 3.24776L13.0875 3.42435C13.2256 3.45923 13.321 3.58239 13.321 3.72507C13.321 3.86775 13.2256 3.99091 13.0875 4.02579L12.388 4.20238C11.6801 4.38119 11.127 4.93421 10.9482 5.64212L10.7716 6.34165C10.7366 6.47971 10.6135 6.57514 10.4708 6.57514C10.3281 6.57514 10.205 6.47971 10.17 6.34165L9.99342 5.64212C9.81461 4.93421 9.26159 4.38119 8.55368 4.20238L7.85415 4.02579C7.71608 3.99091 7.62065 3.86775 7.62065 3.72507C7.62065 3.58239 7.71608 3.45923 7.85415 3.42435L8.55368 3.24776C9.26159 3.06895 9.81461 2.51593 9.99342 1.80802L10.17 1.1085C10.205 0.970431 10.3281 0.875 10.4708 0.875Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PdpHero({ onOpenSelector }: { onOpenSelector: () => void }) {
  return (
    <section className="pdp-hero" aria-label="Product images">
      <FigmaAsset
        src={`${assetRoot}/cuba-chair-hero-2x.png`}
        alt="Carl Hansen & Søn MG501 Cuba Chair"
        displayWidth={375}
        displayHeight={375}
        exportScale={2}
        className="pdp-hero__image"
        fetchPriority="high"
      />
      <PdpMediaCounter />
      <button type="button" className="pdp-hero-secondary-cta" onClick={onOpenSelector}>
        <SeeInYourPlaceIcon />
        <span>See it in your place</span>
      </button>
    </section>
  )
}

function PdpSelectorCloseIcon() {
  return (
    <FigmaAsset
      src="/assets/figma/portfolio-2026/recommendations/close.svg"
      alt=""
      displayWidth={16.8}
      displayHeight={16.8}
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
    <section className="pdp-selector-section">
      <PdpSelectorSectionHeader title="My Photos" />
      <div className="pdp-selector-strip pdp-selector-strip--photos">
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

function PdpSelectorDesignSection({
  onSelect,
}: {
  onSelect: (space: PdpSelectableSpace) => void
}) {
  return (
    <section className="pdp-selector-section">
      <PdpSelectorSectionHeader title="My Designs" />
      <div className="pdp-selector-strip pdp-selector-strip--designs">
        {pdpMyDesignThumbs.map((design) => (
          <button
            key={design.id}
            type="button"
            className="pdp-selector-design-thumb"
            onClick={() => onSelect({ id: design.id, src: design.src, thumbSrc: design.src })}
          >
            <FigmaAsset
              src={design.src}
              alt=""
              displayWidth={140}
              displayHeight={140}
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
  const [activeSpaceType, setActiveSpaceType] = useState<PdpSpaceType>('bedroom')
  const spaceItems = pdpSampleSpacesByType[activeSpaceType]
  const leftColumnItems = spaceItems.filter((_, index) => index % 2 === 0)
  const rightColumnItems = spaceItems.filter((_, index) => index % 2 === 1)

  return (
    <section className="pdp-selector-section pdp-selector-section--sample-spaces">
      <div className="pdp-selector-section-title">
        <h2>Sample spaces</h2>
      </div>

      <div className="pdp-selector-chip-row" role="tablist" aria-label="Space type filters">
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
        <div className="pdp-selector-grid__column">
          {leftColumnItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="pdp-selector-space-card"
              style={{ height: `${item.height}px` }}
              onClick={() => onSelect({ id: item.id, src: item.src, thumbSrc: item.src })}
            >
              <FigmaAsset
                src={item.src}
                alt=""
                displayWidth={167.5}
                displayHeight={item.height}
              />
            </button>
          ))}
        </div>
        <div className="pdp-selector-grid__column">
          {rightColumnItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="pdp-selector-space-card"
              style={{ height: `${item.height}px` }}
              onClick={() => onSelect({ id: item.id, src: item.src, thumbSrc: item.src })}
            >
              <FigmaAsset
                src={item.src}
                alt=""
                displayWidth={167.5}
                displayHeight={item.height}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function PdpSelectPhotoScreen({
  isActive,
  isThumbnail,
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
    enabled: isActive && !isThumbnail,
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
            <button type="button" className="pdp-selector-close-button" onClick={onClose}>
              <PdpSelectorCloseIcon />
            </button>
          }
          center={<h1>Select Photo</h1>}
        />
      </header>

      <main
        ref={selectorScrollRef}
        className="pdp-selector-main prototype-screen__scroll-region"
        data-inertial-scroll={isActive && !isThumbnail ? 'true' : undefined}
      >
        <PdpSelectorPhotoSection onSelect={onSelectSpace} />
        <PdpSelectorDesignSection onSelect={onSelectSpace} />
        <PdpSelectorSampleSpacesSection onSelect={onSelectSpace} />
      </main>

      <div className="pdp-selector-home-indicator">
        <HomeIndicator />
      </div>
    </div>
  )
}

function PdpPlacementTagIcon() {
  return (
    <span className="pdp-placement-tag-dot" aria-hidden="true" />
  )
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

function PdpPlacementMenuAnalyzeIcon() {
  return (
    <FigmaAsset
      src={`${assetRoot}/analyze-room-24.svg`}
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
}: {
  icon: ReactNode
  title: string
  description: string
  isPressed: boolean
  onPressStart: () => void
  onPressEnd: () => void
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
}: {
  pressedItemId: PdpPlacementMenuItemId | null
  onPressItemStart: (itemId: PdpPlacementMenuItemId) => void
  onPressItemEnd: () => void
}) {
  return (
    <div className="pdp-placement-menu" role="menu" aria-label="Placement actions">
      <PdpPlacementQuickMenuItem
        icon={<PdpPlacementMenuBagIcon />}
        title="Add Products"
        description="See it in your space before you buy"
        isPressed={pressedItemId === 'add-products'}
        onPressStart={() => onPressItemStart('add-products')}
        onPressEnd={onPressItemEnd}
      />
      <PdpPlacementQuickMenuItem
        icon={<PdpPlacementMenuPhotoIcon />}
        title="Style Transfer"
        description="Style your room from a photo"
        isPressed={pressedItemId === 'style-transfer'}
        onPressStart={() => onPressItemStart('style-transfer')}
        onPressEnd={onPressItemEnd}
      />
      <PdpPlacementQuickMenuItem
        icon={<PdpPlacementMenuAnalyzeIcon />}
        title="Analyze Your Room"
        description="Find out what your room is missing"
        isPressed={pressedItemId === 'analyze-room'}
        onPressStart={() => onPressItemStart('analyze-room')}
        onPressEnd={onPressItemEnd}
      />
    </div>
  )
}

function clampPlacementPosition(position: PlacementPosition) {
  return {
    x: Math.min(Math.max(position.x, 48), 295),
    y: Math.min(Math.max(position.y, 72), 388),
  }
}

function PdpPlaceObjectScreen({
  isActive,
  selectedSpace,
  onBack,
  onGenerate,
}: {
  isActive: boolean
  selectedSpace: PdpSelectableSpace
  onBack: () => void
  onGenerate: (position: PlacementPosition) => void
}) {
  const [markerPosition, setMarkerPosition] = useState<PlacementPosition>({
    x: 171.5,
    y: 235,
  })
  const [hasPlacedObject, setHasPlacedObject] = useState(false)
  const [showInstruction, setShowInstruction] = useState(true)
  const [showSubmitHint, setShowSubmitHint] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlusButtonPressed, setIsPlusButtonPressed] = useState(false)
  const [pressedMenuItemId, setPressedMenuItemId] = useState<PdpPlacementMenuItemId | null>(null)
  const dragRef = useRef<{
    pointerId: number
    offsetX: number
    offsetY: number
    startClientX: number
    startClientY: number
    moved: boolean
  } | null>(null)

  useEffect(() => {
    if (isActive) {
      setMarkerPosition({
        x: 171.5,
        y: 235,
      })
      setHasPlacedObject(false)
      setShowInstruction(true)
      setShowSubmitHint(false)
      setIsMenuOpen(false)
      setIsPlusButtonPressed(false)
      setPressedMenuItemId(null)
    }
  }, [isActive, selectedSpace.id])

  useEffect(() => {
    if (!showSubmitHint) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setShowSubmitHint(false)
    }, 3600)

    return () => window.clearTimeout(timeoutId)
  }, [showSubmitHint])

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

    setMarkerPosition(
      clampPlacementPosition({
        x: clientX - rect.left - drag.offsetX,
        y: clientY - rect.top - drag.offsetY,
      }),
    )
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left - rect.width / 2,
      offsetY: event.clientY - rect.top - rect.height / 2,
      startClientX: event.clientX,
      startClientY: event.clientY,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
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
      if (!hasPlacedObject) {
        setShowSubmitHint(true)
      }
      setHasPlacedObject(true)
      setShowInstruction(false)
    }

    updatePosition(event.clientX, event.clientY, event.currentTarget)
  }

  function handlePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) {
      return
    }

    event.currentTarget.releasePointerCapture(event.pointerId)
    dragRef.current = null
  }

  function handlePointerCancel(event: React.PointerEvent<HTMLButtonElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) {
      return
    }

    event.currentTarget.releasePointerCapture(event.pointerId)
    dragRef.current = null
  }

  return (
    <div className="pdp-placement-screen">
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
          center={<h1>Place chair</h1>}
        />
      </header>

      <main className="pdp-placement-main">
        <section
          className={
            showInstruction
              ? 'pdp-placement-stage pdp-placement-stage--dimmed'
              : 'pdp-placement-stage'
          }
          aria-label="Place object on photo"
        >
          <FigmaAsset
            src={selectedSpace.src}
            alt=""
            displayWidth={343}
            displayHeight={460}
            className="pdp-placement-stage__photo"
          />
          <button
            type="button"
            className="pdp-placement-marker pdp-placement-marker--resting"
            style={{
              left: `${markerPosition.x}px`,
              top: `${markerPosition.y}px`,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <PdpPlacementTagIcon />
          </button>
          {showInstruction ? (
            <div
              className="pdp-placement-coachmark"
              aria-hidden="true"
              style={{
                left: `${markerPosition.x}px`,
                top: `${markerPosition.y + 32}px`,
              }}
            >
              <p>Place at desired position</p>
            </div>
          ) : null}
        </section>
      </main>

      {isMenuOpen ? (
        <button
          type="button"
          className="pdp-placement-menu-backdrop"
          aria-label="Close placement actions"
          onClick={() => {
            setIsMenuOpen(false)
            setIsPlusButtonPressed(false)
            setPressedMenuItemId(null)
          }}
        />
      ) : null}

      <div className={isMenuOpen ? 'pdp-placement-menu-wrap pdp-placement-menu-wrap--open' : 'pdp-placement-menu-wrap'}>
        <PdpPlacementQuickMenu
          pressedItemId={pressedMenuItemId}
          onPressItemStart={setPressedMenuItemId}
          onPressItemEnd={() => setPressedMenuItemId(null)}
        />
      </div>

      <div className="pdp-placement-panel">
        <div className="pdp-placement-panel__handle">
          <span />
        </div>
        <div className="pdp-placement-panel__thumb-row">
          <div className="pdp-placement-panel__thumb">
            <FigmaAsset
              src={selectedSpace.thumbSrc ?? '/assets/figma/pdp/place-chair-thumb-2x.png'}
              alt=""
              displayWidth={60}
              displayHeight={60}
              exportScale={2}
            />
          </div>
        </div>
        <div className="pdp-placement-panel__input">
          <p>Place this object to the designated place</p>
        </div>
        <div className="pdp-placement-panel__controls">
          <button
            type="button"
            className={
              isMenuOpen || isPlusButtonPressed
                ? 'pdp-placement-panel__plus-button pdp-placement-panel__plus-button--active'
                : 'pdp-placement-panel__plus-button'
            }
            aria-label="Add"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            onPointerDown={() => setIsPlusButtonPressed(true)}
            onPointerUp={() => setIsPlusButtonPressed(false)}
            onPointerCancel={() => setIsPlusButtonPressed(false)}
            onPointerLeave={() => setIsPlusButtonPressed(false)}
            onClick={() => {
              setIsMenuOpen((current) => !current)
              setPressedMenuItemId(null)
            }}
          >
            <PdpPlacementPlusIcon />
          </button>
          <button
            type="button"
            className={
              hasPlacedObject
                ? showSubmitHint
                  ? 'pdp-placement-panel__submit-button pdp-placement-panel__submit-button--enabled pdp-placement-panel__submit-button--hint'
                  : 'pdp-placement-panel__submit-button pdp-placement-panel__submit-button--enabled'
                : 'pdp-placement-panel__submit-button pdp-placement-panel__submit-button--disabled'
            }
            aria-label="Generate placement"
            disabled={!hasPlacedObject}
            onClick={() => {
              if (hasPlacedObject) {
                onGenerate(markerPosition)
              }
            }}
          >
            <PdpPlacementArrowUpIcon />
          </button>
        </div>
        <HomeIndicator />
      </div>
    </div>
  )
}

function PdpGeneratingScreen({
  selectedSpace,
  placementPosition,
  onBack,
}: {
  selectedSpace: PdpSelectableSpace
  placementPosition: PlacementPosition
  onBack: () => void
}) {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0)
  const stageStyle = {
    ['--pdp-focus-x' as string]: `${placementPosition.x}px`,
    ['--pdp-focus-y' as string]: `${placementPosition.y}px`,
  } as CSSProperties

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveMessageIndex((current) => (current + 1) % generatingStatusMessages.length)
    }, 3600)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div className="pdp-generating-screen">
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
          center={<h1>Generating</h1>}
        />
      </header>

      <main className="pdp-generating-main">
        <section className="pdp-generating-stage" style={stageStyle} aria-label="Generating room preview">
          <FigmaAsset
            src={selectedSpace.src}
            alt=""
            displayWidth={343}
            displayHeight={460}
            className="pdp-generating-stage__photo"
          />
          <div className="pdp-generating-stage__veil" />
          <div className="pdp-generating-stage__glass" aria-hidden="true" />
          <div className="pdp-generating-stage__scan" aria-hidden="true" />
        </section>
        <section className="pdp-generating-status" aria-label="Generating status">
          <div className="pdp-generating-status__thumb">
            <FigmaAsset
              src="/assets/figma/pdp/place-chair-object-2x.png"
              alt=""
              displayWidth={56}
              displayHeight={56}
              exportScale={2}
            />
          </div>
          <div className="pdp-generating-status__copy">
            <p className="pdp-generating-status__eyebrow">Creating an image</p>
            <div className="pdp-generating-status__message-stack" aria-hidden="true">
              {generatingStatusMessages.map((message, index) => (
                <p
                  key={message}
                  className={
                    index === activeMessageIndex
                      ? 'pdp-generating-status__line pdp-generating-status__line--active'
                      : 'pdp-generating-status__line'
                  }
                >
                  <span className="pdp-generating-status__line-inner">
                    <span className="pdp-generating-status__line-base">{message}</span>
                    <span className="pdp-generating-status__line-sheen" aria-hidden="true">
                      {message}
                    </span>
                    <span
                      className="pdp-generating-status__line-sheen pdp-generating-status__line-sheen--secondary"
                      aria-hidden="true"
                    >
                      {message}
                    </span>
                  </span>
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="pdp-generating-home-indicator">
        <HomeIndicator />
      </div>
    </div>
  )
}

function PdpProductInfo() {
  return (
    <section className="pdp-info" aria-label="Product information">
      <div className="pdp-title-block">
        <p className="pdp-brand">Carl Hansen &amp; Søn</p>
        <div className="pdp-name-row">
          <h1>Carl Hansen &amp; Søn MG501 Cuba Chair</h1>
          <PdpIconButton label="Share product" className="pdp-share-button">
            <PdpShareIcon />
          </PdpIconButton>
        </div>
        <PdpRating />
      </div>

      <div className="pdp-price-block">
        <div className="pdp-list-price">
          <span>35%</span>
          <span>399,000</span>
          <InfoIcon />
        </div>
        <p className="pdp-sale-price">1,090,000</p>
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
            <span>10,000 KRW per month (8 months) interest-free installment</span>
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
        <PdpHero onOpenSelector={onOpenSelector} />
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
  const [activeScreen, setActiveScreen] = useState<'product' | 'selector' | 'placer' | 'generating'>('product')
  const [selectedSpace, setSelectedSpace] = useState<PdpSelectableSpace>({
    id: 'default-bedroom',
    src: '/assets/figma/pdp/place-chair-room-2x.png',
    thumbSrc: '/assets/figma/pdp/place-chair-thumb-2x.png',
  })
  const [placementPosition, setPlacementPosition] = useState<PlacementPosition>({ x: 171.5, y: 235 })

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
                : activeScreen === 'placer' || activeScreen === 'generating'
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
            state={activeScreen === 'placer' ? 'center' : activeScreen === 'generating' ? 'peek-left' : 'offscreen-right'}
          >
            <PdpPlaceObjectScreen
              isActive={activeScreen === 'placer'}
              selectedSpace={selectedSpace}
              onBack={() => setActiveScreen('selector')}
              onGenerate={(position) => {
                setPlacementPosition(position)
                setActiveScreen('generating')
              }}
            />
          </PushPage>
          <PushPage
            className="pdp-flow__page"
            state={activeScreen === 'generating' ? 'center' : 'offscreen-right'}
          >
            <PdpGeneratingScreen
              selectedSpace={selectedSpace}
              placementPosition={placementPosition}
              onBack={() => setActiveScreen('placer')}
            />
          </PushPage>
        </div>
      </PrototypeScreen>
    </div>
  )
}
