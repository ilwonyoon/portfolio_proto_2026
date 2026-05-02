import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { Chip, TryInRoomButton } from '../../system/primitives'
import { FeedMediaCarousel } from '../../system/feed/FeedMediaCarousel'
import type { FeedMediaSlide } from '../../system/feed/FeedMediaCarousel'
import { HomeIndicator, StatusBar, TopNav } from '../../system/mobile'
import { useInertialScroll } from '../../system/mobile/useInertialScroll'
import { BottomSheet, PushPage } from '../../system/overlays'
import { useSheetDragGesture } from '../../system/overlays/useSheetDragGesture'
import { PdpAiRoomFlowContent } from '../pdp/PdpPrototype'
import { constructionAiRoomData } from './ai-room-data'
import './construction-ai.css'

type ConstructionAiPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type ConstructionScreen =
  | 'contractors'
  | 'portfolio'
  | 'project-photo'
  | 'ai-room'

type PortfolioCase = {
  id: string
  title: string
  cover: string
  saved: number
  views: string
  isFeatured: boolean
  photos: string[]
}

type PortfolioTabId = 'all' | 'portfolio' | 'reviews' | 'profile'
type PortfolioCategoryId = 'cases' | 'photos'

type SpaceFilterId = 'all' | 'living' | 'kitchen' | 'bedroom' | 'bathroom'

type ContractorProjectPhoto = {
  id: string
  src: string
  alt: string
  room: Exclude<SpaceFilterId, 'all'>
}

type Contractor = {
  id: string
  name: string
  rating: string
  reviewCount: number
  contractCount: number
  distanceLabel: string
  neighborhood: string
  priceTierLabel: string
  pricePerPyeongLabel: string
  mapX: number
  mapY: number
  photos: ContractorProjectPhoto[]
  portfolioPhotos: ContractorProjectPhoto[]
}

const assetRoot = '/assets/figma/construction-ai'
const o2oRoot = `${assetRoot}/o2o`
const portfolioRoot = `${assetRoot}/ohouse-portfolio`
const mapRoot = `${assetRoot}/map`
const statusLevelsSrc = '/assets/figma/portfolio-2026/onboarding/status-levels.svg'

const sortOptions = ['Default', 'Most reviewed', 'Most contracts', 'Nearby']
const spaceFilters: Array<{ id: SpaceFilterId; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'living', label: 'Living Room' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'bathroom', label: 'Bathroom' },
]

const roomLabels: Record<Exclude<SpaceFilterId, 'all'>, string> = {
  living: 'living room',
  kitchen: 'kitchen',
  bedroom: 'bedroom',
  bathroom: 'bathroom',
}

function makePortfolioPhotos(
  room: Exclude<SpaceFilterId, 'all'>,
  count: number,
): ContractorProjectPhoto[] {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0')
    return {
      id: `${room}-${number}`,
      room,
      src: `${portfolioRoot}/${room}/${room}-${number}.jpg`,
      alt: `Korean apartment ${roomLabels[room]} renovation reference ${index + 1}.`,
    }
  })
}

const koreanRenovationPortfolio = [
  ...makePortfolioPhotos('living', 19),
  ...makePortfolioPhotos('kitchen', 11),
  ...makePortfolioPhotos('bedroom', 22),
  ...makePortfolioPhotos('bathroom', 15),
]

const portfolioAssetRoot = `${assetRoot}/portfolio`

function makePortfolioCasePhotos(caseId: string, count: number): string[] {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0')
    return `${portfolioAssetRoot}/${caseId}/photo-${number}.jpg`
  })
}

const caseCoverRoot = `${portfolioAssetRoot}/cases`

const portfolioCases: PortfolioCase[] = [
  {
    id: 'case-01',
    title: 'Simple, restrained, and warmly inviting',
    saved: 5,
    views: '100',
    isFeatured: true,
    photos: makePortfolioCasePhotos('case-01', 24),
    cover: `${caseCoverRoot}/case-cover-01.avif`,
  },
  {
    id: 'case-02',
    title: 'Sticking to the basics: a warm yet understated home interior',
    saved: 4,
    views: '96',
    isFeatured: true,
    photos: makePortfolioCasePhotos('case-02', 22),
    cover: `${caseCoverRoot}/case-cover-02.avif`,
  },
  {
    id: 'case-03',
    title:
      'One roof, two families: a duplex with a separate entrance for parents and children',
    saved: 5,
    views: '144',
    isFeatured: true,
    photos: makePortfolioCasePhotos('case-03', 16),
    cover: `${caseCoverRoot}/case-cover-03.avif`,
  },
  {
    id: 'case-04',
    title:
      'Mid-century meets modern, planned from the styling stage onward',
    saved: 6,
    views: '153',
    isFeatured: false,
    photos: makePortfolioCasePhotos('case-04', 23),
    cover: `${caseCoverRoot}/case-cover-04.avif`,
  },
  {
    id: 'case-05',
    title:
      'A newlywed home full of warmth — our special first place, just for the two of us',
    saved: 11,
    views: '242',
    isFeatured: false,
    photos: makePortfolioCasePhotos('case-01', 24),
    cover: `${caseCoverRoot}/case-cover-05.avif`,
  },
  {
    id: 'case-06',
    title: 'Building a denser space with custom-made furniture',
    saved: 8,
    views: '183',
    isFeatured: false,
    photos: makePortfolioCasePhotos('case-02', 22),
    cover: `${caseCoverRoot}/case-cover-06.avif`,
  },
  {
    id: 'case-07',
    title:
      'A home shaped around how we live: capturing my own warmth in space',
    saved: 7,
    views: '149',
    isFeatured: false,
    photos: makePortfolioCasePhotos('case-03', 16),
    cover: `${caseCoverRoot}/case-cover-07.avif`,
  },
  {
    id: 'case-08',
    title: 'Partial renovation, done this way',
    saved: 4,
    views: '176',
    isFeatured: false,
    photos: makePortfolioCasePhotos('case-04', 23),
    cover: `${caseCoverRoot}/case-cover-08.avif`,
  },
  {
    id: 'case-09',
    title: 'A modern gallery-like home with a touch of mid-century mood',
    saved: 9,
    views: '205',
    isFeatured: false,
    photos: makePortfolioCasePhotos('case-01', 24),
    cover: `${caseCoverRoot}/case-cover-09.avif`,
  },
]

const portfolioAllPhotos: string[] = (() => {
  const photoExtensions: Array<{ index: number; ext: string }> = [
    { index: 1, ext: 'avif' },
    { index: 2, ext: 'avif' },
    { index: 3, ext: 'avif' },
    { index: 4, ext: 'avif' },
    { index: 5, ext: 'avif' },
    { index: 6, ext: 'avif' },
    { index: 7, ext: 'avif' },
    { index: 8, ext: 'avif' },
    { index: 9, ext: 'avif' },
    { index: 10, ext: 'avif' },
    { index: 11, ext: 'jpg' },
    { index: 12, ext: 'avif' },
    { index: 13, ext: 'avif' },
    { index: 14, ext: 'jpg' },
    { index: 15, ext: 'avif' },
    { index: 16, ext: 'avif' },
    { index: 17, ext: 'avif' },
    { index: 18, ext: 'avif' },
  ]

  return photoExtensions.map(
    ({ index, ext }) =>
      `${portfolioAssetRoot}/photos/photo-${String(index).padStart(2, '0')}.${ext}`,
  )
})()

const contractors: Contractor[] = [
  {
    id: 'taesung-interior',
    name: 'Raon R Design',
    rating: '4.9',
    reviewCount: 28,
    contractCount: 8,
    distanceLabel: '0.5km',
    neighborhood: 'Hwamyeong-dong',
    priceTierLabel: 'Mid-range',
    pricePerPyeongLabel: '₩2.4M/py',
    mapX: 45,
    mapY: 38,
    photos: [
      {
        id: 'taesung-cover-01',
        room: 'living',
        src: `${o2oRoot}/contractor-01-1.avif`,
        alt: 'Representative renovation portfolio image from Raon R Design.',
      },
      {
        id: 'taesung-cover-02',
        room: 'living',
        src: `${o2oRoot}/contractor-01-2.avif`,
        alt: 'Second representative renovation portfolio image from Raon R Design.',
      },
      {
        id: 'taesung-cover-03',
        room: 'living',
        src: `${o2oRoot}/contractor-01-3.jpg`,
        alt: 'Third representative renovation portfolio image from Raon R Design.',
      },
    ],
    portfolioPhotos: koreanRenovationPortfolio,
  },
  {
    id: 'raon-r-design',
    name: 'Taesung Interior',
    rating: '4.8',
    reviewCount: 41,
    contractCount: 12,
    distanceLabel: '1.2km',
    neighborhood: 'Nogyang-dong',
    priceTierLabel: 'Premium',
    pricePerPyeongLabel: '₩3.6M/py',
    mapX: 68,
    mapY: 53,
    photos: Array.from({ length: 8 }, (_, index) => ({
      id: `raon-cover-${index + 1}`,
      room: 'living' as const,
      src: `${o2oRoot}/contractor-02-${index + 1}.${index === 4 ? 'avif' : 'jpg'}`,
      alt: `Representative renovation portfolio image ${index + 1} from Taesung Interior.`,
    })),
    portfolioPhotos: koreanRenovationPortfolio,
  },
  {
    id: 'jangsikga',
    name: 'Jangsikga',
    rating: '4.7',
    reviewCount: 33,
    contractCount: 10,
    distanceLabel: '2.4km',
    neighborhood: 'Ujangsan-dong',
    priceTierLabel: 'Budget',
    pricePerPyeongLabel: '₩1.8M/py',
    mapX: 32,
    mapY: 62,
    photos: Array.from({ length: 4 }, (_, index) => ({
      id: `jangsikga-cover-${index + 1}`,
      room: 'living' as const,
      src: `${o2oRoot}/contractor-03-${index + 1}.avif`,
      alt: `Representative renovation portfolio image ${index + 1} from Jangsikga.`,
    })),
    portfolioPhotos: koreanRenovationPortfolio,
  },
]

function ConstructionBackIcon() {
  return (
    <span className="construction-ai-icon-box construction-ai-icon-box--nav" aria-hidden="true">
      <svg width="19" height="17" viewBox="0 0 19 17" fill="none">
        <path
          d="M8.7 1L1 8.5M1 8.5L8.7 16M1 8.5H18"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function ConstructionLocationIcon() {
  return (
    <span className="construction-ai-icon-box construction-ai-icon-box--location" aria-hidden="true">
      <FigmaAsset
        src={`${assetRoot}/icon-location.svg`}
        alt=""
        displayWidth={12.75}
        displayHeight={14.77}
        exportScale={1}
      />
    </span>
  )
}

function ConstructionStarIcon() {
  return (
    <span className="construction-ai-icon-box construction-ai-icon-box--star" aria-hidden="true">
      <FigmaAsset
        src={`${assetRoot}/icon-star-figma.svg`}
        alt=""
        displayWidth={11}
        displayHeight={10.45}
        exportScale={1}
      />
    </span>
  )
}

function ConstructionInfoIcon() {
  return (
    <span className="construction-ai-icon-box construction-ai-icon-box--info" aria-hidden="true">
      <FigmaAsset
        src={`${assetRoot}/icon-info-figma.svg`}
        alt=""
        displayWidth={10}
        displayHeight={10}
        exportScale={1}
      />
    </span>
  )
}

function ConstructionStandardBadge() {
  return (
    <span className="construction-ai-standard-badge" aria-label="Ohouse standards">
      <span className="construction-ai-standard-badge__icon" aria-hidden="true">
        <FigmaAsset
          src={`${assetRoot}/icon-standard-badge-figma.svg`}
          alt=""
          displayWidth={10}
          displayHeight={12}
          exportScale={1}
        />
      </span>
      <span>Ohouse standards</span>
    </span>
  )
}

function MapLocationPill() {
  return (
    <button type="button" className="construction-ai-map-location">
      <span className="construction-ai-map-location__content">
        <ConstructionLocationIcon />
        <span>Songpa-gu, Seoul</span>
      </span>
    </button>
  )
}

function ContractorMapFrame() {
  return (
    <div className="construction-ai-map-frame" aria-hidden="true">
      <img
        src={`${mapRoot}/map-static.png`}
        alt=""
        className="construction-ai-map-frame__static"
      />
    </div>
  )
}

function ContractorImageRail({
  photos,
  onSelectPhoto,
}: {
  photos: ContractorProjectPhoto[]
  onSelectPhoto: (photo: ContractorProjectPhoto) => void
}) {
  return (
    <div className="construction-ai-card-rail" data-native-scroll-axis="x">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          className="construction-ai-card-rail__item"
          onClick={() => onSelectPhoto(photo)}
        >
          <FigmaAsset
            src={photo.src}
            alt={photo.alt}
            displayWidth={260}
            displayHeight={173}
            exportScale={1}
            className={
              index < 2
                ? 'construction-ai-card-rail__image'
                : 'construction-ai-card-rail__image construction-ai-card-rail__image--small-radius'
            }
          />
        </button>
      ))}
    </div>
  )
}

function ContractorCard({
  contractor,
  onSelectPhoto,
}: {
  contractor: Contractor
  onSelectPhoto: (contractor: Contractor, photo: ContractorProjectPhoto) => void
}) {
  return (
    <article className="construction-ai-contractor-card">
      <div className="construction-ai-contractor-card__media">
        <ContractorImageRail
          photos={contractor.photos}
          onSelectPhoto={(photo) => onSelectPhoto(contractor, photo)}
        />
      </div>
      <div className="construction-ai-contractor-card__body">
        <div className="construction-ai-contractor-card__name-row">
          <h2>{contractor.name}</h2>
          <ConstructionStandardBadge />
        </div>
        <div className="construction-ai-contractor-card__meta-block">
          <div className="construction-ai-contractor-card__metrics">
            <span className="construction-ai-rating">
              <ConstructionStarIcon />
              <span className="construction-ai-rating__text">
                <strong>{contractor.rating}</strong>{' '}
                <span>
                  ({contractor.reviewCount} Reviews) · {contractor.contractCount} Hired
                </span>
              </span>
            </span>
          </div>
          <div className="construction-ai-contractor-card__price">
            <span>
              {contractor.priceTierLabel} ({contractor.pricePerPyeongLabel})
            </span>
            <ConstructionInfoIcon />
          </div>
        </div>
      </div>
    </article>
  )
}

function ContractorListScreen({
  isActive,
  isThumbnail,
  onSelectPhoto,
}: {
  isActive: boolean
  isThumbnail: boolean
  onSelectPhoto: (contractor: Contractor, photo: ContractorProjectPhoto) => void
}) {
  const sheetRef = useRef<HTMLElement | null>(null)
  const [activeSort, setActiveSort] = useState(sortOptions[0])
  const [isSheetExpanded, setIsSheetExpanded] = useState(false)
  const isSheetExpandedRef = useRef(false)
  isSheetExpandedRef.current = isSheetExpanded

  useInertialScroll(sheetRef, {
    enabled: isActive && !isThumbnail && isSheetExpanded,
    preset: 'ios-feed',
  })

  useEffect(() => {
    if (!isActive || isThumbnail) {
      return
    }

    const sheetEl = sheetRef.current
    if (!sheetEl) {
      return
    }

    let isWheelGestureConsumed = false
    let wheelIdleTimerId: number | null = null
    let activeTouchConsumed = false

    const resetWheelGesture = () => {
      isWheelGestureConsumed = false
      wheelIdleTimerId = null
    }

    const armWheelGestureReset = () => {
      if (wheelIdleTimerId !== null) {
        window.clearTimeout(wheelIdleTimerId)
      }
      wheelIdleTimerId = window.setTimeout(resetWheelGesture, 180)
    }

    const handleWheel = (event: WheelEvent) => {
      if (isWheelGestureConsumed) {
        event.preventDefault()
        armWheelGestureReset()
        return
      }

      if (!isSheetExpandedRef.current && event.deltaY > 0) {
        event.preventDefault()
        setIsSheetExpanded(true)
        isWheelGestureConsumed = true
        armWheelGestureReset()
        return
      }

      if (
        isSheetExpandedRef.current &&
        sheetEl.scrollTop <= 0 &&
        event.deltaY < 0
      ) {
        event.preventDefault()
        setIsSheetExpanded(false)
        isWheelGestureConsumed = true
        armWheelGestureReset()
      }
    }

    let touchStartY = 0
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0
      activeTouchConsumed = false
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (activeTouchConsumed) {
        event.preventDefault()
        return
      }

      const currentY = event.touches[0]?.clientY ?? 0
      const deltaY = touchStartY - currentY

      if (!isSheetExpandedRef.current && deltaY > 4) {
        event.preventDefault()
        setIsSheetExpanded(true)
        activeTouchConsumed = true
        return
      }

      if (
        isSheetExpandedRef.current &&
        sheetEl.scrollTop <= 0 &&
        deltaY < -4
      ) {
        event.preventDefault()
        setIsSheetExpanded(false)
        activeTouchConsumed = true
      }
    }

    const handleTouchEnd = () => {
      activeTouchConsumed = false
    }

    sheetEl.addEventListener('wheel', handleWheel, { passive: false })
    sheetEl.addEventListener('touchstart', handleTouchStart, { passive: true })
    sheetEl.addEventListener('touchmove', handleTouchMove, { passive: false })
    sheetEl.addEventListener('touchend', handleTouchEnd, { passive: true })
    sheetEl.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      if (wheelIdleTimerId !== null) {
        window.clearTimeout(wheelIdleTimerId)
      }
      sheetEl.removeEventListener('wheel', handleWheel)
      sheetEl.removeEventListener('touchstart', handleTouchStart)
      sheetEl.removeEventListener('touchmove', handleTouchMove)
      sheetEl.removeEventListener('touchend', handleTouchEnd)
      sheetEl.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [isActive, isThumbnail])

  return (
    <div className="construction-ai-screen">
      <header className="construction-ai-header">
        <StatusBar levelsSrc={statusLevelsSrc} />
        <TopNav
          className="construction-ai-top-nav"
          leading={
            <button type="button" className="construction-ai-nav-button" aria-label="Back">
              <ConstructionBackIcon />
            </button>
          }
          center={<h1>Full Renovation</h1>}
        />
      </header>
      <main
        className="construction-ai-main"
      >
        <section className="construction-ai-map" aria-label="Nearby renovation pros map">
          <ContractorMapFrame />
          <MapLocationPill />
        </section>
        <section
          ref={sheetRef}
          className={
            isSheetExpanded
              ? 'construction-ai-contractor-sheet construction-ai-contractor-sheet--expanded prototype-screen__scroll-region'
              : 'construction-ai-contractor-sheet prototype-screen__scroll-region'
          }
          data-inertial-scroll={
            isActive && !isThumbnail && isSheetExpanded ? 'true' : undefined
          }
          aria-label="Nearby renovation pros"
        >
          <div
            className="construction-ai-contractor-sheet__sticky"
            onClick={() => {
              if (!isSheetExpanded) {
                setIsSheetExpanded(true)
              }
            }}
          >
            <div className="construction-ai-contractor-sheet__handle" aria-hidden="true" />
            <div className="construction-ai-sort-row" data-native-scroll-axis="x">
              {sortOptions.map((option) => (
                <Chip
                  key={option}
                  selected={activeSort === option}
                  className="construction-ai-sort-chip"
                  onClick={() => setActiveSort(option)}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </div>
          <div className="construction-ai-contractor-list">
            {contractors.map((contractor) => (
              <ContractorCard
                key={contractor.id}
                contractor={contractor}
                onSelectPhoto={onSelectPhoto}
              />
            ))}
          </div>
        </section>
      </main>
      <HomeIndicator />
    </div>
  )
}

function ContractorPortfolioScreen({
  isActive,
  isThumbnail,
  contractor,
  onBack,
  onSelectPhoto,
}: {
  isActive: boolean
  isThumbnail: boolean
  contractor: Contractor
  onBack: () => void
  onSelectPhoto: (photoSrc: string) => void
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [activeTab, setActiveTab] = useState<PortfolioTabId>('portfolio')
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategoryId>('cases')

  useInertialScroll(scrollRef, {
    enabled: isActive && !isThumbnail,
    preset: 'ios-feed',
  })

  useEffect(() => {
    if (!isActive) {
      return
    }
    const node = scrollRef.current
    if (node) {
      node.scrollTop = 0
    }
  }, [isActive, activeCategory])

  const tabs: Array<{
    id: PortfolioTabId
    label: string
    count?: number
  }> = [
    { id: 'all', label: 'All' },
    { id: 'portfolio', label: 'Portfolio', count: 200 },
    { id: 'reviews', label: 'Reviews', count: 68 },
    { id: 'profile', label: 'Profile' },
  ]

  return (
    <div className="construction-ai-screen construction-ai-portfolio-screen">
      <header className="construction-ai-portfolio-header">
        <StatusBar levelsSrc={statusLevelsSrc} />
        <div className="construction-ai-portfolio-nav">
          <button
            type="button"
            className="construction-ai-nav-button"
            aria-label="Back"
            onClick={onBack}
          >
            <ConstructionBackIcon />
          </button>
          <button
            type="button"
            className="construction-ai-nav-button"
            aria-label="Home"
          >
            <PortfolioHomeIcon />
          </button>
        </div>
        <div className="ds-top-tab-bar construction-ai-portfolio-tabs">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                type="button"
                className={
                  isActive
                    ? 'ds-top-tab-bar__item ds-top-tab-bar__item--active'
                    : 'ds-top-tab-bar__item'
                }
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="ds-top-tab-bar__label construction-ai-portfolio-tab-label">
                  <span>{tab.label}</span>
                  {tab.count !== undefined ? (
                    <span className="construction-ai-portfolio-tab-count">
                      {tab.count}
                    </span>
                  ) : null}
                </span>
                {isActive ? (
                  <span
                    className="ds-top-tab-bar__indicator"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      </header>

      <main
        ref={scrollRef}
        className="construction-ai-portfolio-main prototype-screen__scroll-region"
        data-inertial-scroll={isActive && !isThumbnail ? 'true' : undefined}
      >
        <div className="construction-ai-portfolio-categories">
          <button
            type="button"
            className={
              activeCategory === 'cases'
                ? 'construction-ai-portfolio-category construction-ai-portfolio-category--active'
                : 'construction-ai-portfolio-category'
            }
            onClick={() => setActiveCategory('cases')}
            aria-pressed={activeCategory === 'cases'}
          >
            <span
              className="construction-ai-portfolio-category__image"
              style={{
                backgroundImage: `url(${portfolioAssetRoot}/categories/cases-thumb.avif)`,
              }}
            />
            <span className="construction-ai-portfolio-category__label">
              Projects
            </span>
          </button>
          <button
            type="button"
            className={
              activeCategory === 'photos'
                ? 'construction-ai-portfolio-category construction-ai-portfolio-category--active'
                : 'construction-ai-portfolio-category'
            }
            onClick={() => setActiveCategory('photos')}
            aria-pressed={activeCategory === 'photos'}
          >
            <span
              className="construction-ai-portfolio-category__image"
              style={{
                backgroundImage: `url(${portfolioAssetRoot}/categories/photos-thumb.avif)`,
              }}
            />
            <span className="construction-ai-portfolio-category__label">
              Photos
            </span>
          </button>
        </div>

        <div className="construction-ai-portfolio-filters" data-native-scroll-axis="x">
          {['Sort', 'Size', 'Style', 'Budget'].map((label) => (
            <Chip key={label} className="construction-ai-portfolio-filter-chip">
              <span>{label}</span>
              <PortfolioCaretIcon />
            </Chip>
          ))}
        </div>

        {activeCategory === 'cases' ? (
          <div className="construction-ai-portfolio-cases">
            {portfolioCases.map((kase) => (
              <button
                key={kase.id}
                type="button"
                className="construction-ai-portfolio-case"
                onClick={() => onSelectPhoto(kase.cover)}
              >
                <span className="construction-ai-portfolio-case__cover">
                  <img src={kase.cover} alt="" loading="lazy" />
                  {kase.isFeatured ? (
                    <span className="construction-ai-portfolio-case__badge">
                      Featured case
                    </span>
                  ) : null}
                </span>
                <span className="construction-ai-portfolio-case__title">
                  {kase.title}
                </span>
                <span className="construction-ai-portfolio-case__meta">
                  Saved {kase.saved} · {kase.views} views
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="construction-ai-portfolio-photo-grid">
            {portfolioAllPhotos.map((src) => (
              <button
                key={src}
                type="button"
                className="construction-ai-portfolio-photo"
                onClick={() => onSelectPhoto(src)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </main>

      <footer className="construction-ai-portfolio-cta-bar">
        <button
          type="button"
          className="construction-ai-portfolio-cta-bar__secondary"
        >
          Review
        </button>
        <button
          type="button"
          className="construction-ai-portfolio-cta-bar__primary"
        >
          Get a quote
        </button>
      </footer>
      <HomeIndicator />
    </div>
  )
}

function PortfolioHomeIcon() {
  return (
    <span
      className="construction-ai-icon-box construction-ai-icon-box--nav"
      aria-hidden="true"
    >
      <FigmaAsset
        src="/assets/figma/pdp/home-outline.svg"
        alt=""
        displayWidth={20.8}
        displayHeight={19.85}
        exportScale={1}
      />
    </span>
  )
}

function PhotoViewerBackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 19 17" fill="none">
      <path
        d="M8.7 1L1 8.5M1 8.5L8.7 16M1 8.5H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PortfolioCaretIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3.75L5 6.75L8 3.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ContractorPhotoPickerScreen({
  isActive,
  isThumbnail,
  contractor: _contractor,
  selectedPhoto,
  onBack,
  onSelectProjectPhoto,
}: {
  isActive: boolean
  isThumbnail: boolean
  contractor: Contractor
  selectedPhoto: ContractorProjectPhoto
  onBack: () => void
  onSelectProjectPhoto: (photo: ContractorProjectPhoto) => void
}) {
  const orderedPhotos = useMemo(() => {
    const startIndex = portfolioAllPhotos.indexOf(selectedPhoto.src)
    if (startIndex < 0) {
      return portfolioAllPhotos
    }
    return [
      ...portfolioAllPhotos.slice(startIndex),
      ...portfolioAllPhotos.slice(0, startIndex),
    ]
  }, [selectedPhoto.src])

  const slides: FeedMediaSlide[] = useMemo(
    () =>
      orderedPhotos.map((src, index) => ({
        id: `${src}-${index}`,
        src,
        alt: '',
        tags: [],
      })),
    [orderedPhotos],
  )

  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [isTryInRoomCollapsed, setIsTryInRoomCollapsed] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  void isThumbnail

  useEffect(() => {
    if (!isActive) {
      setHasEntered(false)
      return
    }
    const id = window.setTimeout(() => setHasEntered(true), 320)
    return () => window.clearTimeout(id)
  }, [isActive])

  return (
    <div className="construction-ai-screen construction-ai-photo-viewer">
      <StatusBar
        levelsSrc={statusLevelsSrc}
        className="construction-ai-photo-viewer__status-bar"
      />
      <header className="construction-ai-photo-viewer__nav">
        <button
          type="button"
          className="construction-ai-photo-viewer__nav-button"
          aria-label="Back"
          onClick={onBack}
        >
          <PhotoViewerBackIcon />
        </button>
      </header>
      <main className="construction-ai-photo-viewer__media">
        <FeedMediaCarousel
          slides={slides}
          imageWidth={375}
          imageHeight={500}
          topPadding={0}
          showCounter={false}
          showDots={false}
          showTagReveal={false}
          onSlideChange={(index) => setActiveSlideIndex(index)}
        />
        {hasEntered ? (
          <div className="construction-ai-photo-viewer__try-in-room-slot">
            <TryInRoomButton
              expanded={isTryInRoomCollapsed ? false : undefined}
              collapseAfterMs={isTryInRoomCollapsed ? null : 1400}
              aria-label="Try in your room"
              onClick={() => {
                const activeSrc =
                  orderedPhotos[activeSlideIndex] ?? selectedPhoto.src
                onSelectProjectPhoto({
                  id: activeSrc,
                  src: activeSrc,
                  alt: '',
                  room: 'living',
                })
              }}
              onTransitionEnd={(event) => {
                if (
                  event.propertyName === 'width' &&
                  !isTryInRoomCollapsed
                ) {
                  const target = event.currentTarget as HTMLButtonElement
                  if (!target.classList.contains('ds-try-in-room-button--expanded')) {
                    setIsTryInRoomCollapsed(true)
                  }
                }
              }}
            />
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default function ConstructionAiPrototype({
  mode = 'full',
}: ConstructionAiPrototypeProps) {
  const isThumbnail = mode === 'thumbnail'
  const [activeScreen, setActiveScreen] = useState<ConstructionScreen>('contractors')
  const [selectedContractor, setSelectedContractor] = useState(contractors[0])
  const [selectedPhoto, setSelectedPhoto] = useState(contractors[0].photos[0])

  function selectContractorPhoto(contractor: Contractor, _photo: ContractorProjectPhoto) {
    setSelectedContractor(contractor)
    setActiveScreen('portfolio')
  }

  function getPortfolioScreenState() {
    if (activeScreen === 'portfolio') {
      return 'center'
    }
    if (activeScreen === 'project-photo' || activeScreen === 'ai-room') {
      return 'peek-left'
    }
    return 'offscreen-right'
  }

  return (
    <div
      className={
        isThumbnail
          ? 'construction-ai-prototype construction-ai-prototype--thumbnail'
          : 'construction-ai-prototype'
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <div className="construction-ai-flow">
          <PushPage
            className="construction-ai-flow__page"
            state={
              activeScreen === 'contractors' ? 'center' : 'peek-left'
            }
          >
            <ContractorListScreen
              isActive={activeScreen === 'contractors'}
              isThumbnail={isThumbnail}
              onSelectPhoto={selectContractorPhoto}
            />
          </PushPage>
          <PushPage
            className="construction-ai-flow__page"
            state={getPortfolioScreenState()}
          >
            <ContractorPortfolioScreen
              isActive={activeScreen === 'portfolio'}
              isThumbnail={isThumbnail}
              contractor={selectedContractor}
              onBack={() => setActiveScreen('contractors')}
              onSelectPhoto={(photoSrc) => {
                setSelectedPhoto({
                  id: photoSrc,
                  room: 'living',
                  src: photoSrc,
                  alt: '',
                })
                setActiveScreen('project-photo')
              }}
            />
          </PushPage>
          <PushPage
            className="construction-ai-flow__page"
            state={
              activeScreen === 'project-photo'
                ? 'center'
                : activeScreen === 'ai-room'
                  ? 'peek-left'
                  : 'offscreen-right'
            }
          >
            <ContractorPhotoPickerScreen
              isActive={activeScreen === 'project-photo'}
              isThumbnail={isThumbnail}
              contractor={selectedContractor}
              selectedPhoto={selectedPhoto}
              onBack={() => setActiveScreen('portfolio')}
              onSelectProjectPhoto={(photo) => {
                setSelectedPhoto(photo)
                setActiveScreen('ai-room')
              }}
            />
          </PushPage>
          <PushPage
            className="construction-ai-flow__page"
            state={activeScreen === 'ai-room' ? 'center' : 'offscreen-right'}
          >
            <PdpAiRoomFlowContent mode={mode} data={constructionAiRoomData} />
          </PushPage>
        </div>
      </PrototypeScreen>
    </div>
  )
}
