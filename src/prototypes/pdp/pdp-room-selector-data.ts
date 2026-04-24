export type PdpSpaceType =
  | 'all'
  | 'bedroom'
  | 'living-room'
  | 'kitchen'
  | 'kids-room'
  | 'studio'

export type PdpPhotoThumb = {
  id: string
  src: string
}

export type PdpDesignThumb = {
  id: string
  src: string
}

export type PdpSampleSpaceItem = {
  id: string
  src: string
  height: number
}

export type PdpSelectableSpace = {
  id: string
  src: string
  thumbSrc?: string
}

export const pdpSpaceTypeOptions: Array<{ id: PdpSpaceType; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'kids-room', label: 'Kids Room' },
  { id: 'studio', label: 'Studio' },
]

export const pdpMyPhotoThumbs: PdpPhotoThumb[] = [
  {
    id: 'my-photo-01',
    src: '/assets/figma/pdp/select-photo-thumb-01-2x.png',
  },
  {
    id: 'my-photo-02',
    src: '/assets/figma/pdp/select-photo-thumb-02-2x.png',
  },
  {
    id: 'my-photo-03',
    src: '/assets/figma/pdp/select-photo-thumb-03-2x.png',
  },
  {
    id: 'my-photo-04',
    src: '/assets/figma/pdp/select-photo-thumb-04-2x.png',
  },
]

export const pdpMyDesignThumbs: PdpDesignThumb[] = [
  {
    id: 'my-design-01',
    src: '/assets/figma/pdp/select-photo-design-01-2x.png',
  },
  {
    id: 'my-design-02',
    src: '/assets/figma/pdp/select-photo-design-01-2x.png',
  },
  {
    id: 'my-design-03',
    src: '/assets/figma/pdp/select-photo-design-01-2x.png',
  },
]

export const pdpSampleSpacesByType: Record<PdpSpaceType, PdpSampleSpaceItem[]> = {
  all: [
    {
      id: 'all-kids-01',
      src: '/assets/figma/personalized-feed/discover/discover-kids-card-01-2x.png',
      height: 145,
    },
    {
      id: 'all-bedroom-01',
      src: '/assets/figma/old-home-feed/article-next/room-two-1.jpg',
      height: 223.333,
    },
    {
      id: 'all-kids-02',
      src: '/assets/figma/personalized-feed/discover/discover-kids-card-03-2x.png',
      height: 223.333,
    },
    {
      id: 'all-living-01',
      src: '/assets/figma/old-home-feed/article-next/room-one-2.jpg',
      height: 168,
    },
    {
      id: 'all-kitchen-01',
      src: '/assets/figma/old-home-feed/article-final/kitchen-3.jpg',
      height: 105,
    },
    {
      id: 'all-studio-01',
      src: '/assets/figma/old-home-feed/article-next/studio-one-finished-1.jpg',
      height: 223.333,
    },
    {
      id: 'all-bedroom-02',
      src: '/assets/figma/old-home-feed/article-next/room-two-4.jpg',
      height: 223.333,
    },
    {
      id: 'all-studio-02',
      src: '/assets/figma/old-home-feed/article-final/studio-two-4.jpg',
      height: 223.333,
    },
  ],
  bedroom: [
    {
      id: 'bedroom-01',
      src: '/assets/figma/old-home-feed/article-next/room-two-1.jpg',
      height: 145,
    },
    {
      id: 'bedroom-02',
      src: '/assets/figma/old-home-feed/article-next/room-two-2.jpg',
      height: 223.333,
    },
    {
      id: 'bedroom-03',
      src: '/assets/figma/old-home-feed/article-next/room-two-3.jpg',
      height: 223.333,
    },
    {
      id: 'bedroom-04',
      src: '/assets/figma/old-home-feed/article-next/room-two-4.jpg',
      height: 168,
    },
    {
      id: 'bedroom-05',
      src: '/assets/figma/old-home-feed/article-next/room-two-5.jpg',
      height: 223.333,
    },
    {
      id: 'bedroom-06',
      src: '/assets/figma/old-home-feed/article-final/closing-1.jpg',
      height: 223.333,
    },
  ],
  'living-room': [
    {
      id: 'living-01',
      src: '/assets/figma/old-home-feed/article-next/room-one-1.jpg',
      height: 145,
    },
    {
      id: 'living-02',
      src: '/assets/figma/old-home-feed/article-next/room-one-2.jpg',
      height: 223.333,
    },
    {
      id: 'living-03',
      src: '/assets/figma/old-home-feed/article-next/room-one-3.jpg',
      height: 223.333,
    },
    {
      id: 'living-04',
      src: '/assets/figma/old-home-feed/article-next/room-one-4.jpg',
      height: 168,
    },
    {
      id: 'living-05',
      src: '/assets/figma/old-home-feed/article-final/studio-two-2.jpg',
      height: 223.333,
    },
    {
      id: 'living-06',
      src: '/assets/figma/old-home-feed/article-final/studio-two-3.jpg',
      height: 223.333,
    },
  ],
  kitchen: [
    {
      id: 'kitchen-01',
      src: '/assets/figma/old-home-feed/article-final/kitchen-1.jpg',
      height: 145,
    },
    {
      id: 'kitchen-02',
      src: '/assets/figma/old-home-feed/article-final/kitchen-2.jpg',
      height: 223.333,
    },
    {
      id: 'kitchen-03',
      src: '/assets/figma/old-home-feed/article-final/kitchen-3.jpg',
      height: 223.333,
    },
    {
      id: 'kitchen-04',
      src: '/assets/figma/old-home-feed/article-final/kitchen-4.jpg',
      height: 168,
    },
    {
      id: 'kitchen-05',
      src: '/assets/figma/old-home-feed/article-final/kitchen-5.jpg',
      height: 223.333,
    },
    {
      id: 'kitchen-06',
      src: '/assets/figma/old-home-feed/article-final/kitchen-sink-3.jpg',
      height: 223.333,
    },
  ],
  'kids-room': [
    {
      id: 'kids-01',
      src: '/assets/figma/personalized-feed/discover/discover-kids-card-01-2x.png',
      height: 145,
    },
    {
      id: 'kids-02',
      src: '/assets/figma/personalized-feed/discover/discover-kids-card-02-2x.png',
      height: 223.333,
    },
    {
      id: 'kids-03',
      src: '/assets/figma/personalized-feed/discover/discover-kids-card-03-2x.png',
      height: 223.333,
    },
    {
      id: 'kids-04',
      src: '/assets/figma/personalized-feed/discover/discover-kids-card-04-2x.png',
      height: 168,
    },
    {
      id: 'kids-05',
      src: '/assets/figma/personalized-feed/discover/discover-kids-new-01-2x.png',
      height: 223.333,
    },
    {
      id: 'kids-06',
      src: '/assets/figma/personalized-feed/discover/discover-kids-new-03-2x.png',
      height: 223.333,
    },
  ],
  studio: [
    {
      id: 'studio-01',
      src: '/assets/figma/old-home-feed/article-next/studio-one-1.jpg',
      height: 145,
    },
    {
      id: 'studio-02',
      src: '/assets/figma/old-home-feed/article-next/studio-one-finished-1.jpg',
      height: 223.333,
    },
    {
      id: 'studio-03',
      src: '/assets/figma/old-home-feed/article-next/studio-two-1.jpg',
      height: 223.333,
    },
    {
      id: 'studio-04',
      src: '/assets/figma/old-home-feed/article-next/studio-one-2.jpg',
      height: 168,
    },
    {
      id: 'studio-05',
      src: '/assets/figma/old-home-feed/article-final/studio-two-2.jpg',
      height: 223.333,
    },
    {
      id: 'studio-06',
      src: '/assets/figma/old-home-feed/article-final/studio-two-4.jpg',
      height: 223.333,
    },
  ],
}
