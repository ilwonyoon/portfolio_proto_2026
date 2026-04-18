import type { HomeTourGridSectionItem } from '../../system/feed'

export type OldHomeFeedGridSection = {
  id: string
  title: string
  items: HomeTourGridSectionItem[]
  viewMoreLabel?: string
}

const MAX_CARD_TITLE_LENGTH = 52

function truncateCardTitle(title: string, maxLength = MAX_CARD_TITLE_LENGTH) {
  if (title.length <= maxLength) return title

  return `${title.slice(0, maxLength).trimEnd()}…`
}

export const oldHomeFeedGridSections: OldHomeFeedGridSection[] = [
  {
    id: 'home-tour-for-you',
    title: 'Home tour for you',
    items: [
      {
        id: 'home-tour-1',
        imageSrc: '/assets/figma/old-home-feed/home-tour-grid/tour-1.png',
        imageAlt: 'Home tour featuring plants and a moss arrangement',
        title: truncateCardTitle("Busy life? These low-maintenance greens make it easy"),
      },
      {
        id: 'home-tour-2',
        imageSrc: '/assets/figma/old-home-feed/home-tour-grid/tour-2.png',
        imageAlt: 'Vintage home tour with an oriental mood',
        title: truncateCardTitle('A vintage home with layered Eastern charm'),
      },
      {
        id: 'home-tour-3',
        imageSrc: '/assets/figma/old-home-feed/home-tour-grid/tour-3.png',
        imageAlt: 'Hotel lounge inspired apartment home tour',
        title: truncateCardTitle('Hotel-lounge vibes, with everyday practicality'),
      },
      {
        id: 'home-tour-4',
        imageSrc: '/assets/figma/old-home-feed/home-tour-grid/tour-4.png',
        imageAlt: 'Neutral-tone apartment home tour',
        title: truncateCardTitle('A neutral home that changes with the mood'),
      },
    ],
  },
  {
    id: 'you-might-like-this',
    title: 'You might like this',
    items: [
      {
        id: 'you-might-like-1',
        imageSrc: '/assets/figma/old-home-feed/content-grid/you-might-like-1.png',
        imageAlt: 'Affordable Ikea lifestyle product recommendations',
        title: truncateCardTitle('9 IKEA finds under 10,000 won that are actually good'),
      },
      {
        id: 'you-might-like-2',
        imageSrc: '/assets/figma/old-home-feed/content-grid/you-might-like-2.png',
        imageAlt: 'Cutlery recommendations by brand and material',
        title: truncateCardTitle("6 cutlery picks you'll keep reaching for"),
      },
      {
        id: 'you-might-like-3',
        imageSrc: '/assets/figma/old-home-feed/content-grid/you-might-like-3.png',
        imageAlt: 'Housewarming gift recommendations for moving season',
        title: truncateCardTitle('6 stylish housewarming gifts for moving season'),
      },
      {
        id: 'you-might-like-4',
        imageSrc: '/assets/figma/old-home-feed/content-grid/you-might-like-4.png',
        imageAlt: 'Housewarming gift ideas recommended by newlyweds',
        title: truncateCardTitle('5 housewarming gifts newlyweds swear by'),
      },
    ],
  },
  {
    id: 'white-tone-collection',
    title: 'White tone collection.zip 🤍',
    viewMoreLabel: 'View more',
    items: [
      {
        id: 'white-tone-1',
        imageSrc: '/assets/figma/old-home-feed/content-grid/white-tone-1.png',
        imageAlt: 'Modern white newlywed home tour',
        title: truncateCardTitle('Our newlywed home, done in the colors we love'),
      },
      {
        id: 'white-tone-2',
        imageSrc: '/assets/figma/old-home-feed/content-grid/white-tone-2.png',
        imageAlt: 'Bright modern 28-pyeong white home',
        title: truncateCardTitle('A bright modern home with full white Christmas energy'),
      },
      {
        id: 'white-tone-3',
        imageSrc: '/assets/figma/old-home-feed/content-grid/white-tone-3.png',
        imageAlt: '17-pyeong newlywed home balancing design and function',
        title: truncateCardTitle('A compact newlywed home with style and function'),
      },
      {
        id: 'white-tone-4',
        imageSrc: '/assets/figma/old-home-feed/content-grid/white-tone-4.png',
        imageAlt: 'Renovated home with original cherry molding and old windows',
        title: truncateCardTitle('Cherry molding, old windows and all? We redid it'),
      },
    ],
  },
  {
    id: 'weekly-best',
    title: '🏅Weekly Best🏅',
    viewMoreLabel: 'View more',
    items: [
      {
        id: 'weekly-best-1',
        imageSrc: '/assets/figma/old-home-feed/content-grid/weekly-best-1.png',
        imageAlt: 'Creative trash bag storage ideas',
        title: truncateCardTitle('4 surprisingly clever ways to organize trash bags'),
      },
      {
        id: 'weekly-best-2',
        imageSrc: '/assets/figma/old-home-feed/content-grid/weekly-best-2.png',
        imageAlt: 'Housewarming gift picks for moving season',
        title: truncateCardTitle('6 stylish housewarming gifts for moving season'),
      },
      {
        id: 'weekly-best-3',
        imageSrc: '/assets/figma/old-home-feed/content-grid/weekly-best-3.png',
        imageAlt: 'Unique home styling item roundup',
        title: truncateCardTitle("10 standout styling finds you won't see everywhere"),
      },
      {
        id: 'weekly-best-4',
        imageSrc: '/assets/figma/old-home-feed/content-grid/weekly-best-4.png',
        imageAlt: 'Living organization items that make a home look polished',
        title: truncateCardTitle('8 organizing finds that make your home look put together'),
      },
    ],
  },
]
