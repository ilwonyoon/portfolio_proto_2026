import { useEffect, useRef, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import type { FeedProduct } from './FeedProductStrip'

type FeedProductBottomSheetProps = {
  open: boolean
  title: string
  products: FeedProduct[]
  onClose: () => void
  onSelectProduct?: (productId: string) => void
  onToggleSave?: (productId: string) => void
}

export function FeedProductBottomSheet({
  open,
  title,
  products,
  onClose,
  onSelectProduct,
  onToggleSave,
}: FeedProductBottomSheetProps) {
  const [isMounted, setIsMounted] = useState(open)
  const [isVisible, setIsVisible] = useState(false)
  const frameRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (open) {
      timeoutRef.current = window.setTimeout(() => {
        setIsMounted(true)
        frameRef.current = window.requestAnimationFrame(() => {
          setIsVisible(true)
          frameRef.current = null
        })
        timeoutRef.current = null
      }, 0)
    } else if (isMounted) {
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(false)
        timeoutRef.current = window.setTimeout(() => {
          setIsMounted(false)
          timeoutRef.current = null
        }, 360)
      }, 0)
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [open, isMounted])

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
          {products.map((product) => (
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
                className="ds-feed-product-sheet__save"
                aria-label={`Save ${product.name}`}
                onClick={() => onToggleSave?.(product.id)}
              >
                <FigmaAsset
                  src="/assets/figma/personalized-feed/reaction-bar/scrap-24.svg"
                  alt=""
                  displayWidth={16}
                  displayHeight={19.3975}
                />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
