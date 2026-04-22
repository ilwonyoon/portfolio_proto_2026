import { useEffect, useRef, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { useBottomSheetPresence } from '../overlays/useBottomSheetPresence'
import type { FeedProduct } from './FeedProductStrip'

type FeedProductBottomSheetProps = {
  open: boolean
  title: string
  products: FeedProduct[]
  onClose: () => void
  onSelectProduct?: (productId: string) => void
  onToggleSave?: (productId: string) => void
}

type ProductSheetToast = {
  productName: string
  action: 'saved' | 'removed'
}

function BookmarkFilledIcon() {
  return (
    <svg
      className="ds-feed-product-sheet__save-filled-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        transform="translate(4 2.2)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 0H13C14.657 0 16 1.343 16 3V18.396C16 19.181 15.136 19.66 14.47 19.244L9.061 15.863C8.413 15.457 7.59 15.457 6.941 15.862L1.53 19.244C0.864 19.66 0 19.181 0 18.396V3C0 1.343 1.343 0 3 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function FeedProductBottomSheet({
  open,
  title,
  products,
  onClose,
  onSelectProduct,
  onToggleSave,
}: FeedProductBottomSheetProps) {
  const { isMounted, isVisible } = useBottomSheetPresence(open)
  const toastTimerRef = useRef<number | null>(null)
  const [savedProductIds, setSavedProductIds] = useState<Set<string>>(
    () => new Set(),
  )
  const [toast, setToast] = useState<ProductSheetToast | null>(null)

  useEffect(() => {
    if (!open) {
      setToast(null)
    }
  }, [open])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  function showToast(nextToast: ProductSheetToast) {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current)
    }

    setToast(nextToast)
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null)
      toastTimerRef.current = null
    }, 1600)
  }

  function handleToggleSave(productId: string, productName: string) {
    const willSave = !savedProductIds.has(productId)

    setSavedProductIds((current) => {
      const next = new Set(current)

      if (next.has(productId)) {
        next.delete(productId)
      } else {
        next.add(productId)
      }

      return next
    })

    onToggleSave?.(productId)
    showToast({
      productName,
      action: willSave ? 'saved' : 'removed',
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={
        isVisible
          ? 'ds-feed-product-sheet ds-feed-product-sheet--visible'
          : 'ds-feed-product-sheet'
      }
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="ds-feed-product-sheet__dim"
        aria-label="Close product list"
        onClick={onClose}
      />

      <section className="ds-feed-product-sheet__panel">
        <div className="ds-feed-product-sheet__header">
          <div className="ds-feed-product-sheet__handle" />

          <div className="ds-feed-product-sheet__nav">
            <div className="ds-feed-product-sheet__nav-spacer" />
            <h2 className="ds-feed-product-sheet__title">{title}</h2>
            <button
              type="button"
              className="ds-feed-product-sheet__dismiss"
              aria-label="Close product list"
              onClick={onClose}
            >
              <FigmaAsset
                src="/assets/figma/personalized-feed/view-more/dismiss-18.svg"
                alt=""
                displayWidth={14.739}
                displayHeight={14.739}
              />
            </button>
          </div>
        </div>

        <div className="ds-feed-product-sheet__content">
          {products.map((product) => {
            const isSaved = savedProductIds.has(product.id)

            return (
              <div key={product.id} className="ds-feed-product-sheet__row">
                <button
                  type="button"
                  className="ds-feed-product-sheet__product"
                  onClick={() => onSelectProduct?.(product.id)}
                >
                  <span
                    className="ds-feed-product-sheet__thumb"
                    style={{ borderRadius: product.thumbnailRadius ?? 6 }}
                  >
                    <FigmaAsset
                      src={product.thumbnailSrc}
                      alt=""
                      displayWidth={64}
                      displayHeight={64}
                      className="ds-feed-product-sheet__thumb-image"
                    />
                  </span>

                  <span className="ds-feed-product-sheet__info">
                    <span className="ds-feed-product-sheet__name">{product.name}</span>
                    <span className="ds-feed-product-sheet__price">
                      {product.discountLabel ? (
                        <span className="ds-feed-product-sheet__discount">
                          {product.discountLabel}
                        </span>
                      ) : null}
                      <span className="ds-feed-product-sheet__price-label">
                        {product.priceLabel}
                      </span>
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  className={
                    isSaved
                      ? 'ds-feed-product-sheet__save ds-feed-product-sheet__save--active'
                      : 'ds-feed-product-sheet__save'
                  }
                  aria-label={`${isSaved ? 'Remove bookmark for' : 'Save'} ${product.name}`}
                  aria-pressed={isSaved}
                  onClick={() => handleToggleSave(product.id, product.name)}
                >
                  {isSaved ? (
                    <BookmarkFilledIcon />
                  ) : (
                    <FigmaAsset
                      src="/assets/figma/personalized-feed/reaction-bar/scrap-24.svg"
                      alt=""
                      displayWidth={16}
                      displayHeight={19.3975}
                    />
                  )}
                </button>
              </div>
            )
          })}
        </div>

        <div
          className={
            toast
              ? 'ds-feed-product-sheet__toast ds-feed-product-sheet__toast--visible'
              : 'ds-feed-product-sheet__toast'
          }
          role="status"
          aria-live="polite"
        >
          <span className="ds-feed-product-sheet__toast-copy">
            {toast ? `${toast.productName} ${toast.action}` : ''}
          </span>
          <button
            type="button"
            className="ds-feed-product-sheet__toast-action"
            aria-label="View saved items"
          >
            View saved
          </button>
        </div>
      </section>
    </div>
  )
}
