import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { FigmaAsset } from '../../../prototype/FigmaAsset'
import { HomeIndicator } from '../../../system/mobile'
import { useInertialScroll } from '../../../system/mobile/useInertialScroll'
import { BottomSheet, useSheetDragGesture } from '../../../system/overlays'
import { Chip } from '../../../system/primitives'
import {
  getPdpArchiveProductsForTab,
  pdpProductArchiveTabs,
  pdpProductSheetHeight,
  type PdpProductArchiveItem,
  type PdpProductArchiveTab,
} from './deps'
import {
  constructionMaterialCategories,
  constructionMaterials,
  type ConstructionMaterial,
  type ConstructionMaterialCategory,
} from './materials-data'

export type ConstructionPlacementMenuItemId =
  | 'add-products'
  | 'apply-materials'
  | 'style-transfer'

const assetRoot = '/assets/figma/pdp'

export function PdpPlacementArrowUpIcon() {
  return <span className="pdp-placement-arrow-icon" aria-hidden="true" />
}

export function PdpGeneratingStopIcon() {
  return (
    <span className="pdp-generating-stop-icon" aria-hidden="true">
      <span />
    </span>
  )
}

export function PdpPlacementPlusIcon() {
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

function ConstructionMenuMaterialsIcon() {
  return (
    <FigmaAsset
      src="/assets/figma/construction-ai/material.svg"
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
  onSelect,
}: {
  icon: ReactNode
  title: string
  description: string
  isPressed: boolean
  onPressStart: () => void
  onPressEnd: () => void
  onSelect: () => void
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
      onClick={onSelect}
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

export function PdpPlacementQuickMenu({
  pressedItemId,
  onPressItemStart,
  onPressItemEnd,
  onOpenProductSheet,
  onOpenMaterialsSheet,
  onSelectStyleTransfer,
}: {
  pressedItemId: ConstructionPlacementMenuItemId | null
  onPressItemStart: (itemId: ConstructionPlacementMenuItemId) => void
  onPressItemEnd: () => void
  onOpenProductSheet: () => void
  onOpenMaterialsSheet?: () => void
  onSelectStyleTransfer?: () => void
}) {
  return (
    <div
      className="pdp-placement-menu"
      role="menu"
      aria-label="Placement actions"
    >
      <PdpPlacementQuickMenuItem
        icon={<PdpPlacementMenuBagIcon />}
        title="Add Products"
        description="See it in your space before you buy"
        isPressed={pressedItemId === 'add-products'}
        onPressStart={() => onPressItemStart('add-products')}
        onPressEnd={onPressItemEnd}
        onSelect={onOpenProductSheet}
      />
      <PdpPlacementQuickMenuItem
        icon={<ConstructionMenuMaterialsIcon />}
        title="Apply Materials"
        description="Find out what your room is missing"
        isPressed={pressedItemId === 'apply-materials'}
        onPressStart={() => onPressItemStart('apply-materials')}
        onPressEnd={onPressItemEnd}
        onSelect={onOpenMaterialsSheet ?? onPressItemEnd}
      />
      <PdpPlacementQuickMenuItem
        icon={<PdpPlacementMenuPhotoIcon />}
        title="Style Transfer"
        description="Style your room from a photo"
        isPressed={pressedItemId === 'style-transfer'}
        onPressStart={() => onPressItemStart('style-transfer')}
        onPressEnd={onPressItemEnd}
        onSelect={onSelectStyleTransfer ?? onPressItemEnd}
      />
    </div>
  )
}

export function PdpProductArchiveSheet({
  isOpen,
  onClose,
  onAddProduct,
}: {
  isOpen: boolean
  onClose: () => void
  onAddProduct: (product: PdpProductArchiveItem) => void
}) {
  const [activeTabId, setActiveTabId] = useState<PdpProductArchiveTab>('all')
  const productSheetBodyRef = useRef<HTMLDivElement | null>(null)
  const sheetDragGesture = useSheetDragGesture({
    open: isOpen,
    closedOffset: pdpProductSheetHeight,
    closeTriggerThreshold: 140,
    closeReleaseThreshold: 84,
    onOpen: () => undefined,
    onClose,
  })
  useInertialScroll(productSheetBodyRef, {
    enabled: isOpen,
    preset: 'ios-feed',
  })

  useEffect(() => {
    if (isOpen) {
      setActiveTabId('all')
    }
  }, [isOpen])

  const products = getPdpArchiveProductsForTab(activeTabId)

  return (
    <BottomSheet
      open={isOpen}
      ariaLabel="Product archive"
      onClose={onClose}
      className="pdp-product-sheet"
      dimClassName="pdp-product-sheet__dim"
      panelClassName="pdp-product-sheet__panel"
      panelStyle={{ height: `${pdpProductSheetHeight}px` }}
      dragOffset={sheetDragGesture.dragOffset}
      isDragging={sheetDragGesture.isDragging}
    >
      <div
        className="pdp-product-sheet__handle-wrap"
        {...sheetDragGesture.bind}
      >
        <div className="pdp-product-sheet__handle" />
      </div>

      <div
        ref={productSheetBodyRef}
        className="pdp-product-sheet__body prototype-screen__scroll-region"
        data-inertial-scroll={isOpen ? 'true' : undefined}
      >
        <div className="pdp-product-sheet__search-wrap">
          <div className="pdp-product-sheet__search">
            <FigmaAsset
              src="/assets/figma/personalized-feed/search.svg"
              alt=""
              displayWidth={18}
              displayHeight={18}
            />
            <span>Search for a product name or brand</span>
          </div>
        </div>

        <div className="pdp-product-sheet__action-bar">
          <div
            className="pdp-product-sheet__chips"
            role="tablist"
            aria-label="Product archive filters"
          >
            {pdpProductArchiveTabs.map((tab) => (
              <Chip
                key={tab.id}
                selected={activeTabId === tab.id}
                className="pdp-product-sheet__chip"
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="pdp-product-sheet__grid">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              className="pdp-product-tile"
              aria-label={`Add ${product.brand} ${product.name} to room`}
              onClick={(event) => {
                event.currentTarget.blur()
                onAddProduct(product)
              }}
            >
              <span className="pdp-product-tile__thumb">
                <FigmaAsset
                  src={product.imageSrc}
                  alt=""
                  displayWidth={109}
                  displayHeight={109}
                  exportScale={1}
                  className={
                    product.fit === 'contain'
                      ? 'pdp-product-tile__image pdp-product-tile__image--contain'
                      : 'pdp-product-tile__image'
                  }
                />
                <span className="pdp-product-tile__plus" aria-hidden="true" />
              </span>
              <span className="pdp-product-tile__title">{product.name}</span>
              <span className="pdp-product-tile__price-row">
                {product.discountRate ? (
                  <span className="pdp-product-tile__discount">
                    {product.discountRate}
                  </span>
                ) : null}
                <span className="pdp-product-tile__price">{product.price}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <HomeIndicator />
    </BottomSheet>
  )
}

export function ConstructionMaterialsSheet({
  isOpen,
  onClose,
  onAddMaterial,
}: {
  isOpen: boolean
  onClose: () => void
  onAddMaterial: (material: ConstructionMaterial) => void
}) {
  const [activeCategory, setActiveCategory] =
    useState<ConstructionMaterialCategory>('wallpaper')
  const sheetBodyRef = useRef<HTMLDivElement | null>(null)
  const sheetDragGesture = useSheetDragGesture({
    open: isOpen,
    closedOffset: pdpProductSheetHeight,
    closeTriggerThreshold: 140,
    closeReleaseThreshold: 84,
    onOpen: () => undefined,
    onClose,
  })
  useInertialScroll(sheetBodyRef, {
    enabled: isOpen,
    preset: 'ios-detail',
  })

  useEffect(() => {
    if (isOpen) {
      setActiveCategory('wallpaper')
    }
  }, [isOpen])

  const visibleMaterials = constructionMaterials.filter(
    (material) => material.category === activeCategory,
  )

  return (
    <BottomSheet
      open={isOpen}
      ariaLabel="Materials"
      onClose={onClose}
      className="pdp-product-sheet"
      dimClassName="pdp-product-sheet__dim"
      panelClassName="pdp-product-sheet__panel"
      panelStyle={{ height: `${pdpProductSheetHeight}px` }}
      dragOffset={sheetDragGesture.dragOffset}
      isDragging={sheetDragGesture.isDragging}
    >
      <div
        className="pdp-product-sheet__handle-wrap"
        {...sheetDragGesture.bind}
      >
        <div className="pdp-product-sheet__handle" />
      </div>

      <div
        ref={sheetBodyRef}
        className="pdp-product-sheet__body prototype-screen__scroll-region"
        data-inertial-scroll={isOpen ? 'true' : undefined}
      >
        <div className="pdp-product-sheet__search-wrap">
          <div className="pdp-product-sheet__search">
            <FigmaAsset
              src="/assets/figma/personalized-feed/search.svg"
              alt=""
              displayWidth={18}
              displayHeight={18}
            />
            <span>Search materials</span>
          </div>
        </div>

        <div className="pdp-product-sheet__action-bar">
          <div
            className="pdp-product-sheet__chips"
            role="tablist"
            aria-label="Material categories"
          >
            {constructionMaterialCategories.map((category) => (
              <Chip
                key={category.id}
                selected={activeCategory === category.id}
                className="pdp-product-sheet__chip"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="pdp-product-sheet__grid">
          {visibleMaterials.map((material) => (
            <button
              key={material.id}
              type="button"
              className="pdp-product-tile"
              aria-label={`Add ${material.brand} ${material.name}`}
              onClick={(event) => {
                event.currentTarget.blur()
                onAddMaterial(material)
              }}
            >
              <span className="pdp-product-tile__thumb">
                <FigmaAsset
                  src={material.imageSrc}
                  alt=""
                  displayWidth={109}
                  displayHeight={109}
                  exportScale={1}
                  className="pdp-product-tile__image"
                />
                <span className="pdp-product-tile__plus" aria-hidden="true" />
              </span>
              <span className="pdp-product-tile__title">
                {material.brand} · {material.name}
              </span>
              <span className="pdp-product-tile__price-row">
                <span className="pdp-product-tile__price">
                  {material.priceLabel}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <HomeIndicator />
    </BottomSheet>
  )
}
