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
  width: number
  height: number
  displayHeight?: number
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
  { id: 'kids-room', label: 'Home Assistant' },
  { id: 'studio', label: 'Stand By Me' },
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
    src: '/assets/figma/pdp/select-photo-design-02-2x.png',
  },
  {
    id: 'my-design-03',
    src: '/assets/figma/pdp/select-photo-design-03-2x.png',
  },
]

export const pdpSampleSpacesByType: Record<PdpSpaceType, PdpSampleSpaceItem[]> = {
  all: [
    { id: 'all-figma-bedroom-01', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-01-2x.png', width: 1440, height: 1080, displayHeight: 145 },
    { id: 'all-figma-bedroom-02', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-02-2x.png', width: 1440, height: 1920, displayHeight: 223.333 },
    { id: 'all-empty-living-01', src: '/assets/figma/pdp/sample-spaces/pexels-empty-living-10827192.jpg', width: 1200, height: 800 },
    { id: 'all-korean-living-01', src: '/assets/figma/upload/hero-room-2x.png', width: 1400, height: 787 },
    { id: 'all-small-apartment-01', src: '/assets/figma/pdp/sample-spaces/pexels-small-apartment-18071863.jpg', width: 1200, height: 800 },
    { id: 'all-korean-kitchen-01', src: '/assets/figma/old-home-feed/content-grid/white-tone-1.png', width: 1440, height: 1080 },
    { id: 'all-studio-01', src: '/assets/figma/pdp/sample-spaces/pexels-studio-open-8142976.jpg', width: 1200, height: 801 },
    { id: 'all-korean-studio-01', src: '/assets/figma/old-home-feed/article-next/studio-one-before-2.jpg', width: 720, height: 540 },
    { id: 'all-bedroom-01', src: '/assets/figma/pdp/sample-spaces/pexels-bedroom-bright-19878505.jpg', width: 1200, height: 800 },
    { id: 'all-korean-bedroom-01', src: '/assets/figma/old-home-feed/article/intro-photo.jpg', width: 720, height: 759 },
    { id: 'all-kitchen-01', src: '/assets/figma/pdp/sample-spaces/pexels-kitchen-wide-5712145.jpg', width: 1200, height: 801 },
    { id: 'all-living-02', src: '/assets/figma/old-home-feed/home-tour-grid/tour-1.png', width: 960, height: 642 },
    { id: 'all-empty-apartment-01', src: '/assets/figma/pdp/sample-spaces/pexels-empty-apartment-10267183.jpg', width: 1200, height: 1600 },
    { id: 'all-kids-01', src: '/assets/figma/personalized-feed/discover/discover-kids-card-01-2x.png', width: 1440, height: 1080 },
    { id: 'all-kitchen-02', src: '/assets/figma/old-home-feed/article/module-6-main.jpg', width: 720, height: 960 },
    { id: 'all-living-03', src: '/assets/figma/pdp/sample-spaces/pexels-living-brown-19966812.jpg', width: 1200, height: 800 },
    { id: 'all-studio-02', src: '/assets/figma/old-home-feed/article/module-5-main.jpg', width: 720, height: 960 },
    { id: 'all-kids-02', src: '/assets/figma/personalized-feed/discover/discover-kids-new-04-2x.png', width: 750, height: 748 },
  ],
  bedroom: [
    { id: 'bedroom-01', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-01-2x.png', width: 1440, height: 1080, displayHeight: 145 },
    { id: 'bedroom-02', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-02-2x.png', width: 1440, height: 1920, displayHeight: 223.333 },
    { id: 'bedroom-03', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-01-2x.png', width: 1440, height: 1080, displayHeight: 223.333 },
    { id: 'bedroom-04', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-02-2x.png', width: 1440, height: 1920, displayHeight: 168 },
    { id: 'bedroom-05', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-01-2x.png', width: 1440, height: 1080, displayHeight: 105 },
    { id: 'bedroom-06', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-02-2x.png', width: 1440, height: 1920, displayHeight: 223.333 },
    { id: 'bedroom-07', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-01-2x.png', width: 1440, height: 1080, displayHeight: 223.333 },
    { id: 'bedroom-08', src: '/assets/figma/pdp/sample-spaces/figma-bedroom-room-02-2x.png', width: 1440, height: 1920, displayHeight: 223.333 },
    { id: 'bedroom-09', src: '/assets/figma/old-home-feed/article-next/studio-one-finished-1.jpg', width: 720, height: 960 },
    { id: 'bedroom-10', src: '/assets/figma/personalized-feed/discover/discover-new-02-2x.png', width: 320, height: 426 },
    { id: 'bedroom-11', src: '/assets/figma/old-home-feed/article-next/studio-one-1.jpg', width: 720, height: 960 },
    { id: 'bedroom-12', src: '/assets/figma/personalized-feed/discover/discover-card-04-2x.png', width: 1440, height: 1920 },
  ],
  'living-room': [
    { id: 'living-01', src: '/assets/figma/pdp/sample-spaces/pexels-empty-living-10827192.jpg', width: 1200, height: 800 },
    { id: 'living-02', src: '/assets/figma/upload/hero-room-2x.png', width: 1400, height: 787 },
    { id: 'living-03', src: '/assets/figma/pdp/sample-spaces/pexels-living-carpet-5900819.jpg', width: 1200, height: 800 },
    { id: 'living-04', src: '/assets/figma/old-home-feed/home-tour-grid/tour-1.png', width: 960, height: 642 },
    { id: 'living-05', src: '/assets/figma/pdp/sample-spaces/pexels-living-brown-19966812.jpg', width: 1200, height: 800 },
    { id: 'living-06', src: '/assets/figma/old-home-feed/home-tour-grid/tour-3.png', width: 960, height: 642 },
    { id: 'living-07', src: '/assets/figma/pdp/sample-spaces/pexels-kitchen-living-10450149.jpg', width: 1200, height: 800 },
    { id: 'living-08', src: '/assets/figma/old-home-feed/content-grid/white-tone-3.png', width: 1440, height: 1080 },
    { id: 'living-09', src: '/assets/figma/personalized-feed/discover/discover-card-03-2x.png', width: 1920, height: 1182 },
    { id: 'living-10', src: '/assets/figma/old-home-feed/home-tour-grid/tour-4.png', width: 960, height: 642 },
    { id: 'living-11', src: '/assets/figma/pdp/sample-spaces/pexels-studio-tv-6934189.jpg', width: 1200, height: 801 },
    { id: 'living-12', src: '/assets/figma/old-home-feed/content-grid/you-might-like-1.png', width: 966, height: 543 },
  ],
  kitchen: [
    { id: 'kitchen-01', src: '/assets/figma/pdp/sample-spaces/pexels-kitchen-wide-5712145.jpg', width: 1200, height: 801 },
    { id: 'kitchen-02', src: '/assets/figma/old-home-feed/content-grid/white-tone-1.png', width: 1440, height: 1080 },
    { id: 'kitchen-03', src: '/assets/figma/pdp/sample-spaces/pexels-small-apartment-18071863.jpg', width: 1200, height: 800 },
    { id: 'kitchen-04', src: '/assets/figma/old-home-feed/content-grid/white-tone-2.png', width: 1440, height: 1920 },
    { id: 'kitchen-05', src: '/assets/figma/pdp/sample-spaces/pexels-kitchen-table-10450056.jpg', width: 1200, height: 800 },
    { id: 'kitchen-06', src: '/assets/figma/old-home-feed/article/module-6-main.jpg', width: 720, height: 960 },
    { id: 'kitchen-07', src: '/assets/figma/pdp/sample-spaces/pexels-kitchen-woman-6938706.jpg', width: 1200, height: 800 },
    { id: 'kitchen-08', src: '/assets/figma/old-home-feed/article-final/kitchen-3.jpg', width: 720, height: 960 },
    { id: 'kitchen-09', src: '/assets/figma/pdp/sample-spaces/pexels-studio-kitchen-7533762.jpg', width: 1200, height: 845 },
    { id: 'kitchen-10', src: '/assets/figma/old-home-feed/article-final/kitchen-4.jpg', width: 720, height: 845 },
    { id: 'kitchen-11', src: '/assets/figma/pdp/sample-spaces/pexels-kitchen-living-10450149.jpg', width: 1200, height: 800 },
    { id: 'kitchen-12', src: '/assets/figma/old-home-feed/article-final/kitchen-5.jpg', width: 720, height: 960 },
  ],
  'kids-room': [
    { id: 'kids-01', src: '/assets/figma/personalized-feed/discover/discover-kids-card-01-2x.png', width: 1440, height: 1080 },
    { id: 'kids-02', src: '/assets/figma/personalized-feed/discover/discover-kids-card-02-2x.png', width: 1440, height: 1920 },
    { id: 'kids-03', src: '/assets/figma/personalized-feed/discover/discover-kids-card-03-2x.png', width: 1440, height: 1440 },
    { id: 'kids-04', src: '/assets/figma/personalized-feed/discover/discover-kids-new-03-2x.png', width: 1440, height: 1920 },
    { id: 'kids-05', src: '/assets/figma/personalized-feed/discover/discover-kids-new-04-2x.png', width: 750, height: 748 },
    { id: 'kids-06', src: '/assets/figma/personalized-feed/discover/discover-kids-new-01-2x.png', width: 1440, height: 1440 },
    { id: 'kids-07', src: '/assets/figma/personalized-feed/discover/discover-kids-card-04-2x.png', width: 1440, height: 1440 },
    { id: 'kids-08', src: '/assets/figma/personalized-feed/discover/discover-kids-new-02-2x.png', width: 1440, height: 2160 },
    { id: 'kids-09', src: '/assets/figma/old-home-feed/article/module-2-main.jpg', width: 720, height: 960 },
    { id: 'kids-10', src: '/assets/figma/personalized-feed/discover/discover-new-03-2x.png', width: 336, height: 448 },
  ],
  studio: [
    { id: 'studio-01', src: '/assets/figma/pdp/sample-spaces/pexels-studio-open-8142976.jpg', width: 1200, height: 801 },
    { id: 'studio-02', src: '/assets/figma/old-home-feed/article-next/studio-one-before-2.jpg', width: 720, height: 540 },
    { id: 'studio-03', src: '/assets/figma/pdp/sample-spaces/pexels-studio-tv-6934189.jpg', width: 1200, height: 801 },
    { id: 'studio-04', src: '/assets/figma/old-home-feed/article-next/studio-one-1.jpg', width: 720, height: 960 },
    { id: 'studio-05', src: '/assets/figma/pdp/sample-spaces/pexels-studio-modern-29252568.jpg', width: 1200, height: 800 },
    { id: 'studio-06', src: '/assets/figma/old-home-feed/article-next/studio-one-finished-1.jpg', width: 720, height: 960 },
    { id: 'studio-07', src: '/assets/figma/pdp/sample-spaces/pexels-empty-apartment-10267183.jpg', width: 1200, height: 1600 },
    { id: 'studio-08', src: '/assets/figma/old-home-feed/article-final/studio-two-2.jpg', width: 720, height: 960 },
    { id: 'studio-09', src: '/assets/figma/pdp/sample-spaces/pexels-small-apartment-18071863.jpg', width: 1200, height: 800 },
    { id: 'studio-10', src: '/assets/figma/old-home-feed/article/module-5-main.jpg', width: 720, height: 960 },
    { id: 'studio-11', src: '/assets/figma/pdp/sample-spaces/pexels-studio-kitchen-7533762.jpg', width: 1200, height: 845 },
    { id: 'studio-12', src: '/assets/figma/old-home-feed/content-grid/you-might-like-1.png', width: 966, height: 543 },
  ],
}
