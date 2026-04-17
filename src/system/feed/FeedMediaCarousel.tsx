import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'
import { MediaCounter } from '../primitives'

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
  overlay?: ReactNode
  imageHeight?: number
  topPadding?: number
}

const SWIPE_THRESHOLD = 36
const TAG_REVEAL_BASE_DELAY = 240
const TAG_REVEAL_STAGGER = 150
const TAG_REVEAL_VISIBILITY_THRESHOLD = 0.45
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
  overlay,
  imageHeight = 375,
  topPadding = 16,
}: FeedMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isViewportVisible, setIsViewportVisible] = useState(false)
  const [visibleTagCount, setVisibleTagCount] = useState(0)
  const revealedSlideIdsRef = useRef<Set<string>>(new Set())
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const pointerIdRef = useRef<number | null>(null)
  const startXRef = useRef<number | null>(null)
  const timeoutsRef = useRef<number[]>([])

  const hasSlides = slides.length > 0
  const safeActiveIndex = hasSlides ? Math.min(activeIndex, slides.length - 1) : 0
  const activeSlide = useMemo(
    () =>
      hasSlides
        ? slides[safeActiveIndex]
        : { id: 'empty', src: '', alt: '', tags: [] },
    [hasSlides, safeActiveIndex, slides],
  )
  const currentLabel = hasSlides ? String(safeActiveIndex + 1) : '0'
  const displayTotal = String(slides.length)

  useEffect(() => {
    if (hasSlides) {
      onSlideChange?.(safeActiveIndex)
    }
  }, [hasSlides, safeActiveIndex, onSlideChange])

  useEffect(() => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    const scrollRoot = viewport.closest('.prototype-screen__scroll-region')
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsViewportVisible(
          entry?.isIntersecting === true &&
            entry.intersectionRatio >= TAG_REVEAL_VISIBILITY_THRESHOLD,
        )
      },
      {
        root: scrollRoot instanceof Element ? scrollRoot : null,
        threshold: [0, TAG_REVEAL_VISIBILITY_THRESHOLD, 1],
      },
    )

    observer.observe(viewport)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutsRef.current = []

    if (!hasSlides || !onSelectTag || !isViewportVisible) {
      return () => {
        timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
        timeoutsRef.current = []
      }
    }

    if (revealedSlideIdsRef.current.has(activeSlide.id)) {
      const timeoutId = window.setTimeout(() => {
        setVisibleTagCount(activeSlide.tags.length)
      }, 0)
      timeoutsRef.current.push(timeoutId)

      return () => {
        timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
        timeoutsRef.current = []
      }
    }

    if (activeSlide.tags.length === 0) {
      revealedSlideIdsRef.current.add(activeSlide.id)

      return () => {
        timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
        timeoutsRef.current = []
      }
    }

    activeSlide.tags.forEach((_, index) => {
      const timeoutId = window.setTimeout(() => {
        setVisibleTagCount(index + 1)

        if (index === activeSlide.tags.length - 1) {
          revealedSlideIdsRef.current.add(activeSlide.id)
        }
      }, TAG_REVEAL_BASE_DELAY + index * TAG_REVEAL_STAGGER)
      timeoutsRef.current.push(timeoutId)
    })

    return () => {
      timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      timeoutsRef.current = []
    }
  }, [activeSlide, hasSlides, isViewportVisible, onSelectTag])

  const visibleTags = useMemo(
    () => (hasSlides ? activeSlide.tags.slice(0, visibleTagCount) : []),
    [activeSlide.tags, hasSlides, visibleTagCount],
  )

  const dotDescriptors = useMemo(() => {
    if (!hasSlides) {
      return []
    }

    const total = slides.length

    if (total <= 5) {
      return slides.map((slide, index) => ({
        id: slide.id,
        variant: index === safeActiveIndex ? 'active' : ('normal' as DotVariant),
      }))
    }

    if (safeActiveIndex <= 2) {
      return slides.slice(0, 5).map((slide, index) => ({
        id: slide.id,
        variant:
          index === safeActiveIndex
            ? 'active'
            : (['normal', 'normal', 'normal', 'small', 'tiny'][index] as DotVariant),
      }))
    }

    if (safeActiveIndex >= total - 3) {
      return slides.slice(total - 5).map((slide, index) => ({
        id: slide.id,
        variant:
          total - 5 + index === safeActiveIndex
            ? 'active'
            : (['tiny', 'small', 'normal', 'normal', 'normal'][index] as DotVariant),
      }))
    }

    return slides
      .slice(safeActiveIndex - 2, safeActiveIndex + 3)
      .map((slide, index) => ({
        id: slide.id,
        variant: (['tiny', 'small', 'active', 'small', 'tiny'][index] as DotVariant),
      }))
  }, [hasSlides, safeActiveIndex, slides])

  function changeSlide(nextIndex: number) {
    if (!hasSlides) {
      return
    }

    setVisibleTagCount(0)
    setActiveIndex(nextIndex)
  }

  function goToNext() {
    if (!hasSlides) {
      return
    }

    const nextIndex =
      safeActiveIndex === slides.length - 1 ? 0 : safeActiveIndex + 1
    changeSlide(nextIndex)
  }

  function goToPrevious() {
    if (!hasSlides) {
      return
    }

    const nextIndex =
      safeActiveIndex === 0 ? slides.length - 1 : safeActiveIndex - 1
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
    <section className="ds-feed-media" style={{ paddingTop: topPadding }}>
      <div
        ref={viewportRef}
        className="ds-feed-media__viewport"
        style={{ height: imageHeight }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onDragStart={(event) => event.preventDefault()}
      >
        <div
          className="ds-feed-media__track"
          style={{ transform: `translateX(-${safeActiveIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="ds-feed-media__slide">
              <FigmaAsset
                src={slide.src}
                alt={slide.alt}
                displayWidth={375}
                displayHeight={imageHeight}
                className="ds-feed-media__image"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding={index === 0 ? 'sync' : 'async'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {hasSlides ? (
          <MediaCounter
            current={Number(currentLabel)}
            total={Number(displayTotal)}
            className="ds-feed-media__counter"
          />
        ) : null}

        {overlay ? <div className="ds-feed-media__overlay">{overlay}</div> : null}

        {hasSlides && onSelectTag
          ? visibleTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                className="ds-feed-media__tag"
                style={{ left: tag.left, top: tag.top }}
                aria-label="View tagged product"
                onClick={() => onSelectTag(tag.productId)}
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
            ))
          : null}

        {hasSlides ? (
          <div className="ds-feed-media__dots" aria-hidden="true">
            <div className="ds-feed-media__dots-track">
              {dotDescriptors.map((dot, index) => {
                const size = dotSizeByVariant[dot.variant]
                const left = dotDescriptors
                  .slice(0, index)
                  .reduce(
                    (offset, descriptor) =>
                      offset + dotSizeByVariant[descriptor.variant] + DOT_GAP,
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
        ) : null}
      </div>
    </section>
  )
}
