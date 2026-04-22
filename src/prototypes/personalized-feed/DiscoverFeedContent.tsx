import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'

type DiscoverCardItem = {
  id: string
  imageSrc: string
  title: string
  author: string
  avatarSrc?: string
  likes: string
  compact?: boolean
}

type DiscoverFilterId =
  | 'all'
  | 'kids-room'
  | 'live-with-cat'
  | 'food-waste-processor'
  | 'home-assistant'
  | 'stand-by-me'

type DiscoverFilterItem = {
  id: DiscoverFilterId
  label: string
}

type DiscoverContentSet = {
  featured: DiscoverCardItem[]
  trending?: DiscoverCardItem[]
  newItems: DiscoverCardItem[]
}

type DiscoverCardProps = DiscoverCardItem & {
  priority?: boolean
  onOpen?: () => void
}

const discoverAssetRoot = '/assets/figma/personalized-feed/discover'
const bookmarkIconSrc = '/assets/figma/personalized-feed/bookmark.svg'
const heartIconSrc = '/assets/figma/personalized-feed/feed-card/heart.svg'
const contentSwapFadeMs = 90
const preloadedDiscoverImages = new Set<string>()

const filterItems: DiscoverFilterItem[] = [
  { id: 'all', label: 'All' },
  { id: 'kids-room', label: 'Kids room' },
  { id: 'live-with-cat', label: 'Live with cat' },
  { id: 'food-waste-processor', label: 'Food Waste Processor' },
  { id: 'home-assistant', label: 'Home Assistant' },
  { id: 'stand-by-me', label: 'Stand By Me' },
]

const featuredItems: DiscoverCardItem[] = [
  {
    id: 'lucky-living-items',
    imageSrc: `${discoverAssetRoot}/discover-card-01-2x.png`,
    title: "This year's luck is all mine🍀 Cute and practical lucky living items",
    author: 'studio5mm',
    avatarSrc: `${discoverAssetRoot}/discover-avatar-01-2x.png`,
    likes: '428',
  },
  {
    id: 'home-cafe-details',
    imageSrc: `${discoverAssetRoot}/discover-card-02-2x.png`,
    title: 'A cup is all about the details!☕ A must-have for home cafe lovers',
    author: 'forti',
    avatarSrc: `${discoverAssetRoot}/discover-avatar-02-2x.png`,
    likes: '392',
  },
  {
    id: 'plant-interior',
    imageSrc: `${discoverAssetRoot}/discover-card-03-2x.png`,
    title: '10 hot items for customized plant interiors by space',
    author: 'ponyshome',
    avatarSrc: `${discoverAssetRoot}/discover-avatar-03-2x.png`,
    likes: '1.2K',
  },
  {
    id: 'stationery-workspace',
    imageSrc: `${discoverAssetRoot}/discover-card-04-2x.png`,
    title: "Introduction to the stationery store owner's workspace & wish list items",
    author: 'party',
    avatarSrc: `${discoverAssetRoot}/discover-avatar-04-2x.png`,
    likes: '276',
  },
]

const trendingItems: DiscoverCardItem[] = [
  {
    id: 'pretty-designs-1',
    imageSrc: `${discoverAssetRoot}/discover-hot-01-2x.png`,
    title: 'Pretty designs too!💖 5 living items under 10,000 won that I bought myself',
    author: 'myhome',
    likes: '1.8K',
    compact: true,
  },
  {
    id: 'pretty-designs-2',
    imageSrc: `${discoverAssetRoot}/discover-hot-02-2x.png`,
    title: 'Pretty designs too!💖 5 living items under 10,000 won that I bought myself',
    author: 'interiorlog',
    likes: '946',
    compact: true,
  },
  {
    id: 'pretty-designs-3',
    imageSrc: `${discoverAssetRoot}/discover-hot-01-2x.png`,
    title: 'Pretty designs too!💖 5 living items under 10,000 won that I bought myself',
    author: 'roomarchive',
    likes: '721',
    compact: true,
  },
]

const newItems: DiscoverCardItem[] = [
  {
    id: 'officetel-illustrator',
    imageSrc: `${discoverAssetRoot}/discover-new-01-2x.png`,
    title: 'An illustrator filling happiness with my own work in a 7-pyeong officetel',
    author: 'myhome',
    avatarSrc: `${discoverAssetRoot}/discover-new-avatar-01-2x.png`,
    likes: '328',
  },
  {
    id: 'original-cup',
    imageSrc: `${discoverAssetRoot}/discover-new-02-2x.png`,
    title: 'The original cup is just a slight difference!☕ A must-have item for home cafe lovers',
    author: 'User ID',
    avatarSrc: `${discoverAssetRoot}/discover-new-avatar-02-2x.png`,
    likes: '189',
  },
  {
    id: 'photo-zone-home',
    imageSrc: `${discoverAssetRoot}/discover-new-03-2x.png`,
    title:
      'Every corner of the house is a photo zone! Creating a home that reflects my style through furniture arrangement',
    author: 'User ID',
    avatarSrc: `${discoverAssetRoot}/discover-new-avatar-03-2x.png`,
    likes: '542',
  },
  {
    id: 'focal-wall',
    imageSrc: `${discoverAssetRoot}/discover-new-04-2x.png`,
    title: 'A building with an unremovable wall, rather turning it into a focal point',
    author: 'Nickname guide is...',
    avatarSrc: `${discoverAssetRoot}/discover-new-avatar-01-2x.png`,
    likes: '267',
  },
]

const liveWithCatItems: DiscoverCardItem[] = [
  {
    id: 'cat-nap-corner',
    imageSrc: `${discoverAssetRoot}/discover-cat-card-01-2x.png`,
    title: 'A cozy sleep corner made for quiet cat naps',
    author: 'studio5mm',
    avatarSrc: `${discoverAssetRoot}/discover-cat-avatar-01-2x.png`,
    likes: '712',
  },
  {
    id: 'cat-furniture-small-space',
    imageSrc: `${discoverAssetRoot}/discover-cat-card-02-2x.png`,
    title: 'Small-space cat furniture that blends into the room',
    author: 'forti',
    avatarSrc: `${discoverAssetRoot}/discover-cat-avatar-02-2x.png`,
    likes: '486',
  },
  {
    id: 'cat-tower-styling',
    imageSrc: `${discoverAssetRoot}/discover-cat-card-03-2x.png`,
    title: 'Cat tower styling that still feels light and airy',
    author: 'ponyshome',
    avatarSrc: `${discoverAssetRoot}/discover-cat-avatar-03-2x.png`,
    likes: '1.1K',
  },
  {
    id: 'cat-sofa-corner',
    imageSrc: `${discoverAssetRoot}/discover-cat-card-04-2x.png`,
    title: 'A sofa corner your cat will claim first',
    author: 'party',
    avatarSrc: `${discoverAssetRoot}/discover-cat-avatar-04-2x.png`,
    likes: '829',
  },
]

const liveWithCatNewItems: DiscoverCardItem[] = [
  {
    id: 'cat-scratcher-corner',
    imageSrc: `${discoverAssetRoot}/discover-cat-new-01-2x.png`,
    title: 'A scratcher corner that keeps the room calm',
    author: 'myhome',
    avatarSrc: `${discoverAssetRoot}/discover-cat-new-avatar-01-2x.png`,
    likes: '356',
  },
  {
    id: 'cat-bath-play',
    imageSrc: `${discoverAssetRoot}/discover-cat-new-02-2x.png`,
    title: 'A tiny cat cafe setup with plants and sunlight',
    author: 'User ID',
    avatarSrc: `${discoverAssetRoot}/discover-cat-new-avatar-02-2x.png`,
    likes: '624',
  },
  {
    id: 'cat-balcony-view',
    imageSrc: `${discoverAssetRoot}/discover-cat-new-03-2x.png`,
    title: 'A clean balcony view with room for cat lounging',
    author: 'User ID',
    avatarSrc: `${discoverAssetRoot}/discover-cat-new-avatar-03-2x.png`,
    likes: '291',
  },
  {
    id: 'cat-friendly-white-room',
    imageSrc: `${discoverAssetRoot}/discover-cat-new-04-2x.png`,
    title: 'A quiet white living room with cat-friendly paths',
    author: 'Nickname guide is...',
    avatarSrc: `${discoverAssetRoot}/discover-cat-new-avatar-01-2x.png`,
    likes: '438',
  },
]

const kidsRoomItems: DiscoverCardItem[] = [
  {
    id: 'kids-reading-nook',
    imageSrc: `${discoverAssetRoot}/discover-kids-card-01-2x.png`,
    title: 'A playful reading nook for a small kids room',
    author: 'studio5mm',
    avatarSrc: `${discoverAssetRoot}/discover-kids-avatar-01-2x.png`,
    likes: '684',
  },
  {
    id: 'kids-storage-soft-room',
    imageSrc: `${discoverAssetRoot}/discover-kids-card-02-2x.png`,
    title: 'Soft storage ideas for toys, books, and daily mess',
    author: 'forti',
    avatarSrc: `${discoverAssetRoot}/discover-kids-avatar-02-2x.png`,
    likes: '512',
  },
  {
    id: 'bright-nursery-corner',
    imageSrc: `${discoverAssetRoot}/discover-kids-card-03-2x.png`,
    title: 'A bright nursery corner with room to grow',
    author: 'ponyshome',
    avatarSrc: `${discoverAssetRoot}/discover-kids-avatar-03-2x.png`,
    likes: '943',
  },
  {
    id: 'calm-playroom-layout',
    imageSrc: `${discoverAssetRoot}/discover-kids-card-04-2x.png`,
    title: 'A calm playroom layout for everyday routines',
    author: 'party',
    avatarSrc: `${discoverAssetRoot}/discover-kids-avatar-04-2x.png`,
    likes: '768',
  },
]

const kidsRoomNewItems: DiscoverCardItem[] = [
  {
    id: 'kids-dreamy-lights',
    imageSrc: `${discoverAssetRoot}/discover-kids-new-01-2x.png`,
    title: 'Warm lighting ideas for a dreamy kids room',
    author: 'myhome',
    avatarSrc: `${discoverAssetRoot}/discover-kids-new-avatar-01-2x.png`,
    likes: '421',
  },
  {
    id: 'shared-kids-room',
    imageSrc: `${discoverAssetRoot}/discover-kids-new-02-2x.png`,
    title: 'A shared kids room with soft colors and tidy storage',
    author: 'User ID',
    avatarSrc: `${discoverAssetRoot}/discover-kids-new-avatar-02-2x.png`,
    likes: '337',
  },
  {
    id: 'kids-colorful-play-table',
    imageSrc: `${discoverAssetRoot}/discover-kids-new-03-2x.png`,
    title: 'A colorful play table that anchors the whole room',
    author: 'User ID',
    avatarSrc: `${discoverAssetRoot}/discover-kids-new-avatar-03-2x.png`,
    likes: '805',
  },
  {
    id: 'kids-shelf-wall',
    imageSrc: `${discoverAssetRoot}/discover-kids-new-04-2x.png`,
    title: 'A tidy shelf wall for toys, books, and favorite things',
    author: 'Nickname guide is...',
    avatarSrc: `${discoverAssetRoot}/discover-kids-new-avatar-01-2x.png`,
    likes: '594',
  },
]

const allDiscoverContent: DiscoverContentSet = {
  featured: featuredItems,
  trending: trendingItems,
  newItems,
}

const discoverContentByFilter: Partial<Record<DiscoverFilterId, DiscoverContentSet>> = {
  all: allDiscoverContent,
  'live-with-cat': {
    featured: liveWithCatItems,
    newItems: liveWithCatNewItems,
  },
  'kids-room': {
    featured: kidsRoomItems,
    newItems: kidsRoomNewItems,
  },
}

function getContentImages(content: DiscoverContentSet) {
  return [...content.featured, ...(content.trending ?? []), ...content.newItems].flatMap(
    (item) => (item.avatarSrc ? [item.imageSrc, item.avatarSrc] : [item.imageSrc]),
  )
}

function preloadImage(src: string) {
  if (preloadedDiscoverImages.has(src) || typeof Image === 'undefined') {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const image = new Image()

    image.onload = () => {
      preloadedDiscoverImages.add(src)
      resolve()
    }
    image.onerror = () => resolve()
    image.src = src

    if (image.decode) {
      image
        .decode()
        .then(() => {
          preloadedDiscoverImages.add(src)
          resolve()
        })
        .catch(() => resolve())
    }
  })
}

function preloadDiscoverContent(content: DiscoverContentSet) {
  return Promise.all(getContentImages(content).map(preloadImage))
}

function DiscoverFilterRail({
  activeFilterId,
  onSelectFilter,
}: {
  activeFilterId: DiscoverFilterId
  onSelectFilter: (filterId: DiscoverFilterId) => void
}) {
  const filtersRef = useRef<HTMLDivElement | null>(null)
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const filters = filtersRef.current
    const scrollParent = filters?.closest('.prototype-screen__scroll-region')

    if (!(filters instanceof HTMLElement) || !(scrollParent instanceof HTMLElement)) {
      return
    }

    const scrollContainer = scrollParent
    const stuckScrollTop = filters.offsetTop

    function updateStuckState() {
      setIsStuck(scrollContainer.scrollTop >= stuckScrollTop)
    }

    updateStuckState()
    scrollContainer.addEventListener('scroll', updateStuckState, { passive: true })

    return () => scrollContainer.removeEventListener('scroll', updateStuckState)
  }, [])

  return (
    <div
      ref={filtersRef}
      className={
        isStuck
          ? 'personalized-discover__filters personalized-discover__filters--stuck'
          : 'personalized-discover__filters'
      }
      aria-label="Discover filters"
    >
      {filterItems.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={activeFilterId === item.id}
          onClick={() => onSelectFilter(item.id)}
          className={
            activeFilterId === item.id
              ? 'personalized-discover__chip personalized-discover__chip--active'
              : 'personalized-discover__chip'
          }
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function SaveButton() {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
  }

  return (
    <button
      type="button"
      className="personalized-discover-card__save"
      aria-label="Save content"
      onClick={handleClick}
    >
      <FigmaAsset
        src={bookmarkIconSrc}
        alt=""
        displayWidth={16}
        displayHeight={19.4}
        className="personalized-discover-card__save-icon"
      />
    </button>
  )
}

function DiscoverCard({
  author,
  avatarSrc,
  compact = false,
  imageSrc,
  likes,
  onOpen,
  priority = false,
  title,
}: DiscoverCardProps) {
  const imageWidth = compact ? 140 : 167.5
  const imageHeight = compact ? 186.5 : 223.33
  const isInteractive = Boolean(onOpen)

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!onOpen) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen()
    }
  }

  return (
    <article
      className={
        compact
          ? `personalized-discover-card personalized-discover-card--compact${isInteractive ? ' personalized-discover-card--interactive' : ''}`
          : `personalized-discover-card${isInteractive ? ' personalized-discover-card--interactive' : ''}`
      }
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <div className="personalized-discover-card__image-wrap">
        <FigmaAsset
          src={imageSrc}
          alt=""
          displayWidth={imageWidth}
          displayHeight={imageHeight}
          exportScale={2}
          className="personalized-discover-card__image"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
        <SaveButton />
      </div>

      <div className="personalized-discover-card__copy">
        <h3>{title}</h3>
        <div className="personalized-discover-card__meta">
          <div className="personalized-discover-card__author">
            {avatarSrc ? (
              <FigmaAsset
                src={avatarSrc}
                alt=""
                displayWidth={18}
                displayHeight={18}
                exportScale={2}
                className="personalized-discover-card__avatar"
                loading="lazy"
              />
            ) : null}
            <span>{author}</span>
          </div>
          <div className="personalized-discover-card__likes" aria-label={`${likes} likes`}>
            <FigmaAsset
              src={heartIconSrc}
              alt=""
              displayWidth={12.6}
              displayHeight={10.8}
              className="personalized-discover-card__heart"
            />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function DiscoverGrid({
  getItemOpenHandler,
  items,
  priority = false,
}: {
  getItemOpenHandler?: (item: DiscoverCardItem, index: number) => (() => void) | undefined
  items: DiscoverCardItem[]
  priority?: boolean
}) {
  return (
    <div className="personalized-discover-grid">
      {items.map((item, index) => (
        <DiscoverCard
          key={item.id}
          {...item}
          onOpen={getItemOpenHandler?.(item, index)}
          priority={priority && index < 4}
        />
      ))}
    </div>
  )
}

function TrendingSection({ items }: { items: DiscoverCardItem[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="personalized-discover-trending" aria-label="This Week Trending">
      <h2>This Week Trending</h2>
      <div className="personalized-discover-trending__rail">
        {items.map((item) => (
          <DiscoverCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}

type DiscoverFeedContentProps = {
  onOpenPrimaryContent?: () => void
}

export function DiscoverFeedContent({
  onOpenPrimaryContent,
}: DiscoverFeedContentProps) {
  const [activeFilterId, setActiveFilterId] = useState<DiscoverFilterId>('all')
  const [renderedFilterId, setRenderedFilterId] = useState<DiscoverFilterId>('all')
  const [isContentVisible, setIsContentVisible] = useState(true)
  const transitionRequestId = useRef(0)
  const transitionTimeoutRef = useRef<number | null>(null)
  const content = discoverContentByFilter[renderedFilterId] ?? allDiscoverContent

  useEffect(() => {
    Object.values(discoverContentByFilter).forEach((contentSet) => {
      if (contentSet) {
        void preloadDiscoverContent(contentSet)
      }
    })
  }, [])

  useEffect(
    () => () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    },
    [],
  )

  function handleSelectFilter(nextFilterId: DiscoverFilterId) {
    if (nextFilterId === activeFilterId) {
      return
    }

    const nextContent = discoverContentByFilter[nextFilterId] ?? allDiscoverContent
    const requestId = transitionRequestId.current + 1
    transitionRequestId.current = requestId
    setActiveFilterId(nextFilterId)

    void preloadDiscoverContent(nextContent).finally(() => {
      if (transitionRequestId.current !== requestId) {
        return
      }

      setIsContentVisible(false)

      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current)
      }

      transitionTimeoutRef.current = window.setTimeout(() => {
        if (transitionRequestId.current !== requestId) {
          return
        }

        setRenderedFilterId(nextFilterId)
        window.requestAnimationFrame(() => {
          if (transitionRequestId.current === requestId) {
            setIsContentVisible(true)
          }
        })
      }, contentSwapFadeMs)
    })
  }

  return (
    <div className="personalized-discover">
      <DiscoverFilterRail
        activeFilterId={activeFilterId}
        onSelectFilter={handleSelectFilter}
      />
      <div
        className={
          isContentVisible
            ? 'personalized-discover__content personalized-discover__content--visible'
            : 'personalized-discover__content personalized-discover__content--switching'
        }
      >
        <DiscoverGrid
          items={content.featured}
          getItemOpenHandler={(_, index) =>
            renderedFilterId === 'all' && index === 0
              ? onOpenPrimaryContent
              : undefined
          }
          priority
        />
        <TrendingSection items={content.trending ?? []} />
        <DiscoverGrid items={content.newItems} />
      </div>
    </div>
  )
}
