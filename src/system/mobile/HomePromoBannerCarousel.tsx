import { useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { MediaCounter } from '../primitives'

export type HomePromoBannerSlide = {
  id: string
  src: string
  alt: string
}

type HomePromoBannerCarouselProps = {
  slides: HomePromoBannerSlide[]
  totalCount?: number
  counterIconSrc?: string
  className?: string
}

const SWIPE_THRESHOLD = 36

export function HomePromoBannerCarousel({
  slides,
  totalCount,
  counterIconSrc,
  className,
}: HomePromoBannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)

  const safeIndex = slides.length > 0 ? Math.min(activeIndex, slides.length - 1) : 0
  const displayTotal = totalCount ?? slides.length

  function handleSwipeEnd(endX: number | null) {
    if (startX === null || endX === null || slides.length <= 1) {
      setStartX(null)
      return
    }

    const delta = endX - startX

    if (delta <= -SWIPE_THRESHOLD) {
      setActiveIndex((currentIndex) =>
        currentIndex === slides.length - 1 ? 0 : currentIndex + 1,
      )
    } else if (delta >= SWIPE_THRESHOLD) {
      setActiveIndex((currentIndex) =>
        currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
      )
    }

    setStartX(null)
  }

  return (
    <section className={`ds-home-promo-banner ${className ?? ''}`.trim()}>
      <div
        className="ds-home-promo-banner__viewport"
        onTouchStart={(event) => setStartX(event.changedTouches[0]?.clientX ?? null)}
        onTouchEnd={(event) => handleSwipeEnd(event.changedTouches[0]?.clientX ?? null)}
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) {
            return
          }

          setStartX(event.clientX)
        }}
        onPointerUp={(event) => handleSwipeEnd(event.clientX)}
        onPointerCancel={() => setStartX(null)}
        onDragStart={(event) => event.preventDefault()}
      >
        <div
          className="ds-home-promo-banner__track"
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="ds-home-promo-banner__slide">
              <FigmaAsset
                src={slide.src}
                alt={slide.alt}
                displayWidth={343}
                displayHeight={98}
                className="ds-home-promo-banner__image"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding={index === 0 ? 'sync' : 'async'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {slides.length > 0 ? (
          <MediaCounter
            current={safeIndex + 1}
            total={displayTotal}
            className="ds-home-promo-banner__counter"
            trailingIconSrc={counterIconSrc}
          />
        ) : null}
      </div>
    </section>
  )
}
