import type {
  PdpAiRoomDataOverrides,
  PdpPhotoThumb,
} from '../pdp/pdp-room-selector-data'

const portfolioRoot = '/assets/figma/construction-ai/portfolio'

const constructionAiMyPhotos: PdpPhotoThumb[] = [
  { id: 'construction-my-photo-01', src: `${portfolioRoot}/photos/photo-01.avif` },
  { id: 'construction-my-photo-02', src: `${portfolioRoot}/photos/photo-04.avif` },
  { id: 'construction-my-photo-03', src: `${portfolioRoot}/photos/photo-05.avif` },
  { id: 'construction-my-photo-04', src: `${portfolioRoot}/photos/photo-08.avif` },
  { id: 'construction-my-photo-05', src: `${portfolioRoot}/photos/photo-12.avif` },
  { id: 'construction-my-photo-06', src: `${portfolioRoot}/photos/photo-15.avif` },
]

export const constructionAiRoomData: PdpAiRoomDataOverrides = {
  myPhotos: constructionAiMyPhotos,
}
