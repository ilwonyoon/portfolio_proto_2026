import { useEffect, useMemo, useRef, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'

export type FeedProductTagPoint = {
  id: string
  productId: string
  left: number
  top: number
}

export type FeedMediaSlide = {
  id: string
  src: string
  alt: string
  tags: FeedProductTagPoint[]
}

type FeedMediaCarouselProps = {
  slides: FeedMediaSlide[]
  onSlideChange?: (index: number) => void
  onSelectTag?: (productId: string) => void
}

const SWIPE_THRESHOLD = 36
const TAG_REVEAL_BASE_DELAY = 240
const TAG_REVEAL_STAGGER = 150
const DOT_GAP = 7

type DotVariant = 'active' | 'normal' | 'small' | 'tiny'

const dotSizeByVariant: Record<DotVariant, number> = {
  active: 8,
  normal: 8,
  small: 6,
  tiny: 4,
}

const DOT_TRACK_HEIGHT = 8

export function FeedMediaCarousel({
  slides,
  onSlideChange,
  onSelectTag,
}: FeedMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleTagCount, setVisibleTagCount] = useState(0)
  const pointerIdRef = useRef<number | null>(null)
  const startXRef = useRef<number | null>(null)
  const timeoutsRef = useRef<number[]>([])

  const activeSlide = slides[activeIndex]
  const currentLabel = String(activeIndex + 1)
  const displayTotal = String(slides.length)

  useEffect(() => {
    onSlideChange?.(activeIndex)
  }, [activeIndex, onSlideChange])

  useEffect(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutsRef.current = []

    activeSlide.tags.forEach((_, index) => {
      const timeoutId = window.setTimeout(() => {
        setVisibleTagCount(index + 1)
      }, TAG_REVEAL_BASE_DELAY + index * TAG_REVEAL_STAGGER)
      timeoutsRef.current.push(timeoutId)
    })

    return () => {
      timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      timeoutsRef.current = []
    }
  }, [activeSlide])

  const visibleTags = useMemo(
    () => activeSlide.tags.slice(0, visibleTagCount),
    [activeSlide.tags, visibleTagCount],
  )

  const dotDescriptors = useMemo(() => {
    const total = slides.length

    if (total <= 5) {
      return slides.map((slide, index) => ({
        id: slide.id,
        variant: index === activeIndex ? 'active' : ('normal' as DotVariant),
      }))
    }

    if (activeIndex <= 2) {
      return slides.slice(0, 5).map((slide, index) => ({
        id: slide.id,
        variant:
          index === activeIndex
            ? 'active'
            : (['normal', 'normal', 'normal', 'small', 'tiny'][index] as DotVariant),
      }))
    }

    if (activeIndex >= total - 3) {
      return slides.slice(total - 5).map((slide, index) => ({
        id: slide.id,
        variant:
          total - 5 + index === activeIndex
            ? 'active'
            : (['tiny', 'small', 'normal', 'normal', 'normal'][index] as DotVariant),
      }))
    }

    return slides.slice(activeIndex - 2, activeIndex + 3).map((slide, index) => ({
      id: slide.id,
      variant: (['tiny', 'small', 'active', 'small', 'tiny'][index] as DotVariant),
    }))
  }, [slides, activeIndex])

  function changeSlide(nextIndex: number) {
    setVisibleTagCount(0)
    setActiveIndex(nextIndex)
  }

  function goToNext() {
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1
    changeSlide(nextIndex)
  }

  function goToPrevious() {
    const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1
    changeSlide(nextIndex)
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    startXRef.current = event.changedTouches[0]?.clientX ?? null
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    const endX = event.changedTouches[0]?.clientX ?? null

    handleSwipeEnd(endX)
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    pointerIdRef.current = event.pointerId
    startXRef.current = event.clientX
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId)
      pointerIdRef.current = null
    }

    handleSwipeEnd(event.clientX)
  }

  function handlePointerCancel(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId)
      pointerIdRef.current = null
    }

    startXRef.current = null
  }

  function handleSwipeEnd(endX: number | null) {
    if (startXRef.current === null || endX === null) {
      startXRef.current = null
      return
    }

    const delta = endX - startXRef.current

    if (delta <= -SWIPE_THRESHOLD) {
      goToNext()
    } else if (delta >= SWIPE_THRESHOLD) {
      goToPrevious()
    }

    startXRef.current = null
  }

  return (
    <section className="ds-feed-media">
      <div
        className="ds-feed-media__viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onDragStart={(event) => event.preventDefault()}
      >
        <div
          className="ds-feed-media__track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="ds-feed-media__slide">
              <FigmaAsset
                src={slide.src}
                alt={slide.alt}
                displayWidth={375}
                displayHeight={375}
                className="ds-feed-media__image"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className="ds-feed-media__counter">
          <div className="ds-feed-media__counter-group">
            <span className="ds-feed-media__counter-part ds-feed-media__counter-part--current">
              {currentLabel}
            </span>
            <span className="ds-feed-media__counter-part ds-feed-media__counter-part--slash">
              /
            </span>
            <span className="ds-feed-media__counter-part ds-feed-media__counter-part--total">
              {displayTotal}
            </span>
          </div>
        </div>

        {visibleTags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            className="ds-feed-media__tag"
            style={{ left: tag.left, top: tag.top }}
            aria-label="View tagged product"
            onClick={() => onSelectTag?.(tag.productId)}
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
        ))}

        <div className="ds-feed-media__dots" aria-hidden="true">
          <div className="ds-feed-media__dots-track">
            {dotDescriptors.map((dot, index) => {
              const size = dotSizeByVariant[dot.variant]
              const left = dotDescriptors
                .slice(0, index)
                .reduce(
                  (offset, descriptor) => offset + dotSizeByVariant[descriptor.variant] + DOT_GAP,
                  0,
                )
              const top = (DOT_TRACK_HEIGHT - size) / 2

              return (
                <span
                  key={dot.id}
                  className={`ds-feed-media__dot ds-feed-media__dot--${dot.variant}`}
                  style={{ width: size, height: size, left, top }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
