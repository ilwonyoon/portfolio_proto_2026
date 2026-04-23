import { useRef, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { StatusBar, TopNav } from '../../system/mobile'
import { BottomSheet, useSheetDragGesture } from '../../system/overlays'
import { Chip } from '../../system/primitives'
import './upload.css'

type UploadPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type Product = {
  id: string
  name: string
  meta: string
  imageSrc: string
  fit?: 'cover' | 'contain'
}

type TagPosition = {
  x: number
  y: number
}

type ProductTag = {
  id: string
  product: Product
  position: TagPosition
}

type ProductSheetTab = 'purchased' | 'tagged'

const assetRoot = '/assets/figma/upload'
const mediaSize = 343
const tagMarkerSize = 30
const uploadProductSheetHeight = 768
const uploadProductSheetPeekHeight = 203
const initialTagPosition: TagPosition = {
  x: mediaSize / 2,
  y: mediaSize / 2,
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

const purchasedProducts: Product[] = [
  {
    id: 'dolia-table-lamp',
    name: 'DOLIA E26 table lamp, black',
    meta: 'Purchased Jun 18',
    imageSrc: `${assetRoot}/purchased-01-2x.png`,
  },
  {
    id: 'fritz-hansen-series-7',
    name: 'Fritz Hansen Series 7 swivel armchair',
    meta: 'Purchased Jun 17',
    imageSrc: `${assetRoot}/purchased-02-2x.png`,
    fit: 'contain',
  },
  {
    id: 'pidan-trackball',
    name: 'Pidan Studio 3-tier trackball',
    meta: 'Purchased Jun 15',
    imageSrc: `${assetRoot}/purchased-03-2x.png`,
    fit: 'contain',
  },
  {
    id: 'pidan-bowtie',
    name: 'Pidan Studio cat bowtie',
    meta: 'Purchased Jun 12',
    imageSrc: `${assetRoot}/purchased-04-2x.png`,
    fit: 'contain',
  },
  {
    id: 'kanokano-cat-tower',
    name: 'Kanokano Arch Cat Tower',
    meta: 'Purchased Jun 10',
    imageSrc: `${assetRoot}/purchased-05-2x.png`,
    fit: 'contain',
  },
  {
    id: 'ufo-waterproof-neck-collar',
    name: 'UFO waterproof neck collar',
    meta: 'Purchased Jun 8',
    imageSrc: `${assetRoot}/purchased-06-2x.png`,
  },
  {
    id: 'nua-sisal-rug',
    name: 'Dutch Nua sisal-look all-season rug',
    meta: 'Purchased Jun 5',
    imageSrc: `${assetRoot}/purchased-07-2x.png`,
  },
  {
    id: 'kanokano-cat-bed',
    name: 'Kanokano Arch Cat Bed',
    meta: 'Purchased May 31',
    imageSrc: `${assetRoot}/purchased-08-2x.png`,
    fit: 'contain',
  },
  {
    id: 'samsung-m7-monitor',
    name: 'Samsung M7 32-inch UHD smart monitor',
    meta: 'Purchased May 29',
    imageSrc: `${assetRoot}/purchased-09-2x.png`,
  },
  {
    id: 'salmon-lounge-chair',
    name: 'Low lounge chair in soft salmon fabric',
    meta: 'Purchased May 25',
    imageSrc: `${assetRoot}/purchased-10-2x.png`,
  },
  {
    id: 'artemide-nessino',
    name: 'Artemide Nessino table lamp collection',
    meta: 'Purchased May 21',
    imageSrc: `${assetRoot}/purchased-11-2x.png`,
    fit: 'contain',
  },
  {
    id: 'sdi-desk-chair',
    name: 'SDI ergonomic swivel desk chair',
    meta: 'Purchased May 18',
    imageSrc: `${assetRoot}/purchased-12-2x.png`,
    fit: 'contain',
  },
]

const taggedProducts: Product[] = [
  {
    id: 'tagged-rattan-laundry-basket',
    name: 'Rattan laundry basket laundry bin hamper',
    meta: 'Used in 12 posts',
    imageSrc: `${assetRoot}/tagged-01-2x.png`,
  },
  {
    id: 'tagged-fritz-hansen-series-7',
    name: 'Fritz Hansen Series 7 swivel armchair',
    meta: 'Used in 10 posts',
    imageSrc: `${assetRoot}/tagged-02-2x.png`,
    fit: 'contain',
  },
  {
    id: 'tagged-milk-chiffon-curtain',
    name: 'Premium milk chiffon curtain',
    meta: 'Used in 9 posts',
    imageSrc: `${assetRoot}/tagged-03-2x.png`,
  },
  {
    id: 'tagged-tolomeo-floor-lamp',
    name: 'Artemide Tolomeo Mega floor lamp',
    meta: 'Used in 8 posts',
    imageSrc: `${assetRoot}/tagged-04-2x.png`,
    fit: 'contain',
  },
  {
    id: 'tagged-nua-sisal-rug',
    name: 'Dutch Nua sisal-look all-season rug',
    meta: 'Used in 7 posts',
    imageSrc: `${assetRoot}/tagged-05-2x.png`,
  },
  {
    id: 'tagged-samsung-m7-monitor',
    name: 'Samsung M7 32-inch UHD smart monitor',
    meta: 'Used in 6 posts',
    imageSrc: `${assetRoot}/tagged-06-2x.png`,
  },
  {
    id: 'tagged-lg-whisen-ac',
    name: 'LG Whisen Kahn multi air conditioner',
    meta: 'Used in 4 posts',
    imageSrc: `${assetRoot}/tagged-07-2x.png`,
  },
]

function BackButton() {
  return (
    <button type="button" className="upload-nav-button" aria-label="Back">
      <FigmaAsset
        src="/assets/figma/creator-dashboard/arrow-left-24.svg"
        alt=""
        displayWidth={24}
        displayHeight={24}
      />
    </button>
  )
}

function DoneButton() {
  return (
    <button type="button" className="upload-done-button">
      Done
    </button>
  )
}

function ProductTagMarker({
  className,
  selected = false,
  position,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: {
  className?: string
  selected?: boolean
  position: TagPosition
  onPointerDown?: (event: React.PointerEvent<HTMLButtonElement>) => void
  onPointerMove?: (event: React.PointerEvent<HTMLButtonElement>) => void
  onPointerUp?: (event: React.PointerEvent<HTMLButtonElement>) => void
  onPointerCancel?: (event: React.PointerEvent<HTMLButtonElement>) => void
}) {
  return (
    <button
      type="button"
      className={[
        'upload-product-tag',
        selected ? 'upload-product-tag--selected' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Tagged product"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      style={{
        left: position.x - tagMarkerSize / 2,
        top: position.y - tagMarkerSize / 2,
      }}
    >
      <span className="upload-product-tag__halo" />
      <span className="upload-product-tag__dot">
        <span />
      </span>
    </button>
  )
}

function UploadTagBubble({
  tag,
  position,
  onDelete,
}: {
  tag: ProductTag
  position: TagPosition
  onDelete: () => void
}) {
  const bubbleWidth = 202
  const bubbleHeight = 48
  const bubbleTop = position.y - bubbleHeight - 14
  const normalizedTop =
    bubbleTop >= 8 ? bubbleTop : position.y + tagMarkerSize / 2 + 10

  return (
    <div
      className="upload-tag-bubble"
      style={{
        left: clamp(position.x - bubbleWidth / 2, 8, mediaSize - bubbleWidth - 8),
        top: clamp(normalizedTop, 8, mediaSize - bubbleHeight - 8),
      }}
    >
      <FigmaAsset
        src={tag.product.imageSrc}
        alt=""
        displayWidth={32}
        displayHeight={32}
        className="upload-tag-bubble__thumb"
      />
      <p>{tag.product.name}</p>
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}

function UploadMediaCanvas({
  tags,
  activeTagId,
  onOpenSheet,
  pendingTagPosition,
  onChangePendingTagPosition,
  onMoveTag,
  onToggleTag,
  onCollapseTag,
  onDeleteTag,
}: {
  tags: ProductTag[]
  activeTagId: string | null
  onOpenSheet: (position: TagPosition) => void
  pendingTagPosition: TagPosition
  onChangePendingTagPosition: (position: TagPosition) => void
  onMoveTag: (tagId: string, position: TagPosition) => void
  onToggleTag: (tagId: string) => void
  onCollapseTag: () => void
  onDeleteTag: (tagId: string) => void
}) {
  const showCoachmark = tags.length === 0
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<{
    pointerId: number
    tagId: string
    startClientX: number
    startClientY: number
    moved: boolean
  } | null>(null)

  function clampTagPosition(position: TagPosition) {
    const min = tagMarkerSize / 2
    const max = mediaSize - tagMarkerSize / 2

    return {
      x: Math.min(Math.max(position.x, min), max),
      y: Math.min(Math.max(position.y, min), max),
    }
  }

  function getCanvasLocalPosition(
    event: React.PointerEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
  ) {
    const canvas = canvasRef.current

    if (!canvas) {
      return pendingTagPosition
    }

    const rect = canvas.getBoundingClientRect()
    const scaleX = mediaSize / rect.width
    const scaleY = mediaSize / rect.height

    return clampTagPosition({
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    })
  }

  function handleOpenSheet(event: React.MouseEvent<HTMLButtonElement>) {
    const position = getCanvasLocalPosition(event)

    onChangePendingTagPosition(position)
    onOpenSheet(position)
  }

  function handleTagPointerDown(
    event: React.PointerEvent<HTMLButtonElement>,
    tagId: string,
  ) {
    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)

    dragRef.current = {
      pointerId: event.pointerId,
      tagId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      moved: false,
    }
  }

  function handleTagPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current

    if (!drag || drag.pointerId !== event.pointerId) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const deltaX = event.clientX - drag.startClientX
    const deltaY = event.clientY - drag.startClientY

    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      drag.moved = true
      onCollapseTag()
    }

    onMoveTag(drag.tagId, getCanvasLocalPosition(event))
  }

  function handleTagPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current

    if (!drag || drag.pointerId !== event.pointerId) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.releasePointerCapture(event.pointerId)

    if (!drag.moved) {
      onToggleTag(drag.tagId)
    }

    dragRef.current = null
  }

  function handleTagPointerCancel(event: React.PointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current

    if (drag?.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId)
      dragRef.current = null
    }
  }

  return (
    <section className="upload-media-wrap" aria-label="Photo tagging canvas">
      <div ref={canvasRef} className="upload-media-stage">
        <button
          type="button"
          className={
            showCoachmark
              ? 'upload-media upload-media--coached'
              : 'upload-media'
          }
          onClick={handleOpenSheet}
        >
          <FigmaAsset
            src={`${assetRoot}/hero-room-2x.png`}
            alt=""
            displayWidth={343}
            displayHeight={343}
            exportScale={2}
            className="upload-media__image"
            fetchPriority="high"
            decoding="sync"
          />
        </button>

        {showCoachmark ? (
          <div className="upload-coachmark" aria-hidden="true">
            <div className="upload-coachmark__tap">
              <span className="upload-coachmark__pulse" />
              <span className="upload-coachmark__ring" />
            </div>
            <p>Please tap to add tags</p>
          </div>
        ) : null}

        {tags.map((tag) => (
          <div key={tag.id}>
            {activeTagId === tag.id ? (
              <UploadTagBubble
                tag={tag}
                position={tag.position}
                onDelete={() => onDeleteTag(tag.id)}
              />
            ) : null}
            <ProductTagMarker
              className="upload-product-tag--placed"
              selected={activeTagId === tag.id}
              position={tag.position}
              onPointerDown={(event) => handleTagPointerDown(event, tag.id)}
              onPointerMove={handleTagPointerMove}
              onPointerUp={handleTagPointerUp}
              onPointerCancel={handleTagPointerCancel}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function UploadProductCard({
  product,
  onSelect,
}: {
  product: Product
  onSelect: (product: Product) => void
}) {
  return (
    <button
      type="button"
      className="upload-product-card"
      onClick={(event) => {
        event.currentTarget.blur()
        onSelect(product)
      }}
    >
      <span className="upload-product-card__thumb">
        <FigmaAsset
          src={product.imageSrc}
          alt=""
          displayWidth={109}
          displayHeight={109}
          exportScale={2}
          className={
            product.fit === 'contain'
              ? 'upload-product-card__image upload-product-card__image--contain'
              : 'upload-product-card__image'
          }
        />
      </span>
      <span className="upload-product-card__name">{product.name}</span>
      <span className="upload-product-card__meta">{product.meta}</span>
    </button>
  )
}

function UploadProductSheet({
  activeTab,
  open,
  onClose,
  onDragOpen,
  onChangeTab,
  onSelectProduct,
}: {
  activeTab: ProductSheetTab
  open: boolean
  onClose: () => void
  onDragOpen: () => void
  onChangeTab: (tab: ProductSheetTab) => void
  onSelectProduct: (product: Product) => void
}) {
  const visibleProducts =
    activeTab === 'purchased' ? purchasedProducts : taggedProducts
  const sheetDragGesture = useSheetDragGesture({
    open,
    closedOffset: uploadProductSheetHeight - uploadProductSheetPeekHeight,
    openTriggerThreshold: 28,
    openReleaseThreshold: 18,
    closeTriggerThreshold: 140,
    closeReleaseThreshold: 84,
    onOpen: onDragOpen,
    onClose,
  })

  return (
    <BottomSheet
      open={open}
      ariaLabel="Product tags"
      onClose={onClose}
      className="upload-product-sheet"
      dimClassName="upload-product-sheet__dim"
      panelClassName="upload-product-sheet__panel"
      persistWhenClosed
      peekHeight={uploadProductSheetPeekHeight}
      dragOffset={sheetDragGesture.dragOffset}
      isDragging={sheetDragGesture.isDragging}
      panelStyle={{ height: `${uploadProductSheetHeight}px` }}
      panelProps={open ? undefined : sheetDragGesture.bind}
    >
      <div
        className="upload-product-sheet__handle-wrap"
        {...(open ? sheetDragGesture.bind : undefined)}
      >
        <div className="upload-product-sheet__handle" />
      </div>

      <div className="upload-product-sheet__search">
        <FigmaAsset
          src="/assets/figma/personalized-feed/search.svg"
          alt=""
          displayWidth={18}
          displayHeight={18}
        />
        <span>Search for a product name or brand</span>
      </div>

      <div className="upload-product-sheet__action-bar">
        <div className="upload-product-sheet__chips">
          <Chip
            selected={activeTab === 'purchased'}
            className="upload-chip"
            onClick={() => onChangeTab('purchased')}
          >
            Purchased
          </Chip>
          <Chip
            selected={activeTab === 'tagged'}
            className="upload-chip"
            onClick={() => onChangeTab('tagged')}
          >
            Tagged
          </Chip>
        </div>
        <button type="button" className="upload-product-sheet__add">
          <span>Add</span>
          <FigmaAsset
            src="/assets/figma/creator-onboarding/write-24.svg"
            alt=""
            displayWidth={16}
            displayHeight={16}
          />
        </button>
      </div>

      <div className="upload-product-sheet__grid-wrap">
        <div className="upload-product-sheet__grid">
          {visibleProducts.map((product) => (
            <UploadProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </BottomSheet>
  )
}

function UploadScreen({ mode = 'full' }: UploadPrototypeProps) {
  const isThumbnail = mode === 'thumbnail'
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [activeProductTab, setActiveProductTab] =
    useState<ProductSheetTab>('purchased')
  const [tags, setTags] = useState<ProductTag[]>([])
  const [activeTagId, setActiveTagId] = useState<string | null>(null)
  const [pendingTagPosition, setPendingTagPosition] =
    useState<TagPosition>(initialTagPosition)

  function openSheet(position: TagPosition) {
    if (isThumbnail) {
      return
    }

    setPendingTagPosition(position)
    setActiveTagId(null)
    setIsSheetOpen(true)
  }

  function openSheetAtCenter() {
    openSheet(initialTagPosition)
  }

  function selectProduct(product: Product) {
    const tagId = `${product.id}-${Date.now()}`

    setTags((currentTags) => [
      ...currentTags,
      {
        id: tagId,
        product,
        position: pendingTagPosition,
      },
    ])
    setActiveTagId(tagId)
    setIsSheetOpen(false)
  }

  function moveTag(tagId: string, position: TagPosition) {
    setTags((currentTags) =>
      currentTags.map((tag) => (tag.id === tagId ? { ...tag, position } : tag)),
    )
  }

  function toggleTag(tagId: string) {
    setActiveTagId((currentTagId) => (currentTagId === tagId ? null : tagId))
  }

  function deleteTag(tagId: string) {
    setTags((currentTags) => currentTags.filter((tag) => tag.id !== tagId))
    setActiveTagId((currentTagId) => (currentTagId === tagId ? null : currentTagId))
  }

  return (
    <div
      className={
        isThumbnail ? 'upload-prototype upload-prototype--thumbnail' : 'upload-prototype'
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <div className="upload-screen">
          <div className="upload-top">
            <StatusBar levelsSrc="/assets/figma/portfolio-2026/onboarding/status-levels.svg" />
            <TopNav
              className="upload-top-nav"
              leading={<BackButton />}
              center={<h1>Add product tag</h1>}
              trailing={<DoneButton />}
            />
          </div>

          <UploadMediaCanvas
            tags={tags}
            activeTagId={activeTagId}
            pendingTagPosition={pendingTagPosition}
            onChangePendingTagPosition={setPendingTagPosition}
            onOpenSheet={openSheet}
            onMoveTag={moveTag}
            onToggleTag={toggleTag}
            onCollapseTag={() => setActiveTagId(null)}
            onDeleteTag={deleteTag}
          />

          <UploadProductSheet
            activeTab={activeProductTab}
            open={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
            onDragOpen={openSheetAtCenter}
            onChangeTab={setActiveProductTab}
            onSelectProduct={selectProduct}
          />
        </div>
      </PrototypeScreen>
    </div>
  )
}

export default UploadScreen
