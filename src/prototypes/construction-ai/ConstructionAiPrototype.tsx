import React, { useRef, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { Chip } from '../../system/primitives'
import { HomeIndicator, StatusBar, TopNav } from '../../system/mobile'
import { useInertialScroll } from '../../system/mobile/useInertialScroll'
import { BottomSheet, PushPage } from '../../system/overlays'
import { useSheetDragGesture } from '../../system/overlays/useSheetDragGesture'
import { PdpAiRoomFlowContent } from '../pdp/PdpPrototype'
import './construction-ai.css'

type ConstructionAiPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type ConstructionScreen = 'contractors' | 'project-photo' | 'ai-room'

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
  priceRangeLabel: string
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

const figmaMapLabelPins = [
  { id: 'joy-design', label: '조이디자인', left: 56, top: 113 },
  { id: 'line-terior', label: '라인테리어', left: 301, top: 113, width: 72 },
  { id: 'line-design-center', label: '라인디자인', left: 188, top: 153 },
  { id: 'line-design-left', label: '라인디자인', left: 55, top: 226 },
  { id: 'raon-design', label: '라온디자인', left: 267, top: 200 },
  { id: 'line-design-bottom', label: '라인디자인', left: 127, top: 291 },
  { id: 'line-design-right', label: '라인디자인', left: 275, top: 287 },
  { id: 'line-design-lower', label: '라인디자인', left: 288, top: 374 },
]

const figmaMapDotPins = [
  { id: 'dot-01', left: 218, top: 90 },
  { id: 'dot-02', left: 296, top: 97 },
  { id: 'dot-03', left: 213, top: 115 },
  { id: 'dot-04', left: 213, top: 262 },
  { id: 'dot-05', left: 80, top: 318 },
  { id: 'dot-06', left: 335, top: 366 },
]

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

const contractors: Contractor[] = [
  {
    id: 'taesung-interior',
    name: 'Taesung Interior',
    rating: '4.9',
    reviewCount: 28,
    contractCount: 8,
    distanceLabel: '0.5km',
    neighborhood: 'Hwamyeong-dong',
    priceRangeLabel: 'Mainly mid-to-low cost construction',
    mapX: 45,
    mapY: 38,
    photos: [
      {
        id: 'taesung-cover-01',
        room: 'living',
        src: `${o2oRoot}/contractor-01-1.avif`,
        alt: 'Representative renovation portfolio image from Taesung Interior.',
      },
      {
        id: 'taesung-cover-02',
        room: 'living',
        src: `${o2oRoot}/contractor-01-2.avif`,
        alt: 'Second representative renovation portfolio image from Taesung Interior.',
      },
      {
        id: 'taesung-cover-03',
        room: 'living',
        src: `${o2oRoot}/contractor-01-3.jpg`,
        alt: 'Third representative renovation portfolio image from Taesung Interior.',
      },
    ],
    portfolioPhotos: koreanRenovationPortfolio,
  },
  {
    id: 'raon-r-design',
    name: 'Raon R Design',
    rating: '4.8',
    reviewCount: 41,
    contractCount: 12,
    distanceLabel: '1.2km',
    neighborhood: 'Nogyang-dong',
    priceRangeLabel: 'Mainly mid-to-low cost construction',
    mapX: 68,
    mapY: 53,
    photos: Array.from({ length: 8 }, (_, index) => ({
      id: `raon-cover-${index + 1}`,
      room: 'living' as const,
      src: `${o2oRoot}/contractor-02-${index + 1}.${index === 4 ? 'avif' : 'jpg'}`,
      alt: `Representative renovation portfolio image ${index + 1} from Raon R Design.`,
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
    priceRangeLabel: 'Mainly mid-to-low cost construction',
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
      <FigmaAsset
        src={`${mapRoot}/map-tile-top.png`}
        alt=""
        displayWidth={535}
        displayHeight={379}
        exportScale={1}
        className="construction-ai-map-frame__tile construction-ai-map-frame__tile--top"
      />
      <FigmaAsset
        src={`${mapRoot}/map-tile-bottom.png`}
        alt=""
        displayWidth={579}
        displayHeight={386}
        exportScale={1}
        className="construction-ai-map-frame__tile construction-ai-map-frame__tile--bottom"
      />
      {figmaMapLabelPins.map((pin) => (
        <span
          key={pin.id}
          className="construction-ai-map-label-pin"
          style={{
            left: pin.left,
            top: pin.top,
            width: pin.width ?? 60,
          }}
        >
          {pin.label}
        </span>
      ))}
      {figmaMapDotPins.map((pin) => (
        <span
          key={pin.id}
          className="construction-ai-map-dot-pin"
          style={{ left: pin.left, top: pin.top }}
        />
      ))}
      <span className="construction-ai-map-home-pin" style={{ left: 146, top: 128 }}>
        <FigmaAsset
          src={`${mapRoot}/map-marker-home.svg`}
          alt=""
          displayWidth={18}
          displayHeight={18}
          exportScale={1}
        />
      </span>
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
      <ContractorImageRail
        photos={contractor.photos}
        onSelectPhoto={(photo) => onSelectPhoto(contractor, photo)}
      />
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
                  ({contractor.reviewCount} Reviews) · {contractor.contractCount} Recents
                </span>
              </span>
            </span>
          </div>
          <div className="construction-ai-contractor-card__price">
            <span>{contractor.priceRangeLabel}</span>
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
  const mainRef = useRef<HTMLDivElement | null>(null)
  const [activeSort, setActiveSort] = useState(sortOptions[0])

  useInertialScroll(mainRef, {
    enabled: isActive && !isThumbnail,
    preset: 'ios-feed',
  })

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
          ref={mainRef}
          className="construction-ai-contractor-sheet prototype-screen__scroll-region"
          data-inertial-scroll={isActive && !isThumbnail ? 'true' : undefined}
          aria-label="Nearby renovation pros"
        >
          <div className="construction-ai-contractor-sheet__handle" aria-hidden="true" />
          <header className="construction-ai-contractor-sheet__header">
            <div>
              <h2>Nearby renovation pros</h2>
              <p>3 Ohouse standards partners around you</p>
            </div>
          </header>
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

function ContractorPhotoPickerScreen({
  isActive,
  isThumbnail,
  contractor,
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
  const mainRef = useRef<HTMLDivElement | null>(null)
  const [activeSpace, setActiveSpace] = useState<SpaceFilterId>('all')
  const filteredPhotos =
    activeSpace === 'all'
      ? contractor.portfolioPhotos
      : contractor.portfolioPhotos.filter((photo) => photo.room === activeSpace)

  useInertialScroll(mainRef, {
    enabled: isActive && !isThumbnail,
    preset: 'ios-detail',
  })

  return (
    <div className="construction-ai-screen">
      <header className="construction-ai-header construction-ai-header--compact">
        <StatusBar levelsSrc={statusLevelsSrc} />
        <TopNav
          className="construction-ai-top-nav"
          leading={
            <button
              type="button"
              className="construction-ai-nav-button"
              aria-label="Back"
              onClick={onBack}
            >
              <ConstructionBackIcon />
            </button>
          }
          center={<h1>Select Project Photo</h1>}
        />
      </header>
      <main
        ref={mainRef}
        className="construction-ai-photo-picker prototype-screen__scroll-region"
        data-inertial-scroll={isActive && !isThumbnail ? 'true' : undefined}
      >
        <section className="construction-ai-photo-picker__hero">
          <FigmaAsset
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            displayWidth={343}
            displayHeight={228}
            exportScale={1}
            className="construction-ai-photo-picker__hero-image"
          />
          <div>
            <ConstructionStandardBadge />
            <h2>{contractor.name}</h2>
            <p>Choose a contractor project, then preview the style in your own room.</p>
          </div>
        </section>
        <div className="construction-ai-space-filter" data-native-scroll-axis="x">
          {spaceFilters.map((filter) => (
            <Chip
              key={filter.id}
              selected={activeSpace === filter.id}
              className="construction-ai-space-filter__chip"
              onClick={() => setActiveSpace(filter.id)}
            >
              {filter.label}
            </Chip>
          ))}
        </div>
        <section className="construction-ai-photo-grid" aria-label="Project photos">
          {filteredPhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              className="construction-ai-photo-grid__item"
              onClick={() => onSelectProjectPhoto(photo)}
            >
              <FigmaAsset
                src={photo.src}
                alt={photo.alt}
                displayWidth={167.5}
                displayHeight={112}
                exportScale={1}
                className="construction-ai-photo-grid__image"
              />
            </button>
          ))}
        </section>
      </main>
      <HomeIndicator />
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

  function selectContractorPhoto(contractor: Contractor, photo: ContractorProjectPhoto) {
    setSelectedContractor(contractor)
    setSelectedPhoto(photo)
    setActiveScreen('project-photo')
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
            state={activeScreen === 'contractors' ? 'center' : 'peek-left'}
          >
            <ContractorListScreen
              isActive={activeScreen === 'contractors'}
              isThumbnail={isThumbnail}
              onSelectPhoto={selectContractorPhoto}
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
              onBack={() => setActiveScreen('contractors')}
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
            <PdpAiRoomFlowContent mode={mode} />
          </PushPage>
        </div>
      </PrototypeScreen>
    </div>
  )
}
