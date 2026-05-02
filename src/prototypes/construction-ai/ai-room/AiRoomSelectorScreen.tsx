import { useEffect, useMemo, useRef, useState } from 'react'
import { FigmaAsset } from '../../../prototype/FigmaAsset'
import { HomeIndicator, StatusBar, TopNav } from '../../../system/mobile'
import { useInertialScroll } from '../../../system/mobile/useInertialScroll'
import {
  createPdpWaterfallColumns,
  getPdpSampleSpaceDisplayHeight,
  pdpMyPhotoThumbs,
  pdpSampleSpaceCardWidth,
  pdpSampleSpacesByType,
  pdpSpaceTypeOptions,
  type PdpAiRoomDataOverrides,
  type PdpPhotoThumb,
  type PdpSampleSpaceItem,
  type PdpSelectableSpace,
  type PdpSpaceType,
} from './deps'

const assetRoot = '/assets/figma/pdp'
const statusLevelsSrc =
  '/assets/figma/portfolio-2026/onboarding/status-levels.svg'

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
  myPhotos,
}: {
  onSelect: (space: PdpSelectableSpace) => void
  myPhotos?: PdpPhotoThumb[]
}) {
  const photos = myPhotos ?? pdpMyPhotoThumbs
  return (
    <section className="pdp-selector-section pdp-selector-section--media">
      <PdpSelectorSectionHeader title="My Photos" />
      <div
        className="pdp-selector-strip pdp-selector-strip--photos"
        data-native-scroll-axis="x"
      >
        <button
          type="button"
          className="pdp-selector-camera-tile"
          aria-label="Add photo"
        >
          <span className="pdp-selector-camera-tile__icon">
            <PdpSelectorCameraIcon />
          </span>
        </button>
        {photos.map((photo) => (
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
  spaceTypeOptions,
  sampleSpacesByType,
}: {
  onSelect: (space: PdpSelectableSpace) => void
  spaceTypeOptions?: Array<{ id: PdpSpaceType; label: string }>
  sampleSpacesByType?: Record<PdpSpaceType, PdpSampleSpaceItem[]>
}) {
  const options = spaceTypeOptions ?? pdpSpaceTypeOptions
  const spacesByType = sampleSpacesByType ?? pdpSampleSpacesByType
  const [activeSpaceType, setActiveSpaceType] = useState<PdpSpaceType>(
    options[0]?.id ?? 'all',
  )
  const spaceItems = spacesByType[activeSpaceType] ?? []
  const waterfallColumns = useMemo(
    () => createPdpWaterfallColumns(spaceItems),
    [spaceItems],
  )

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
        {options.map((option) => (
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

      <div
        className="pdp-selector-grid"
        aria-label={`${activeSpaceType} sample spaces`}
      >
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
                  onClick={() =>
                    onSelect({ id: item.id, src: item.src, thumbSrc: item.src })
                  }
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

export function ConstructionSelectPhotoScreen({
  isActive,
  onClose,
  onSelectSpace,
  data,
}: {
  isActive: boolean
  isThumbnail: boolean
  onClose: () => void
  onSelectSpace: (space: PdpSelectableSpace) => void
  data?: PdpAiRoomDataOverrides
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
        <StatusBar
          levelsSrc={statusLevelsSrc}
          className="pdp-selector-status"
        />
        <TopNav
          className="pdp-selector-top-nav"
          leading={
            <div
              className="pdp-selector-nav-actions"
              aria-label="Navigation actions"
            >
              <button
                type="button"
                className="pdp-selector-nav-button"
                onClick={onClose}
                aria-label="Back"
              >
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
        <PdpSelectorPhotoSection
          onSelect={onSelectSpace}
          myPhotos={data?.myPhotos}
        />
        <PdpSelectorSampleSpacesSection
          onSelect={onSelectSpace}
          spaceTypeOptions={data?.spaceTypeOptions}
          sampleSpacesByType={data?.sampleSpacesByType}
        />
      </main>

      <div className="pdp-selector-home-indicator">
        <HomeIndicator />
      </div>
    </div>
  )
}
