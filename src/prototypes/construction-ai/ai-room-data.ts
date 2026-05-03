import type {
  PdpAiRoomDataOverrides,
  PdpPhotoThumb,
  PdpSampleSpaceItem,
  PdpSpaceType,
} from '../pdp/pdp-room-selector-data'

const aiRoomRoot = '/assets/figma/construction-ai/ai-room'
const samplesRoot = `${aiRoomRoot}/sample-spaces`

const constructionAiMyPhotos: PdpPhotoThumb[] = Array.from(
  { length: 18 },
  (_, index) => ({
    id: `construction-my-photo-${String(index + 1).padStart(2, '0')}`,
    src: `${aiRoomRoot}/my-photos/photo-${String(index + 1).padStart(2, '0')}.jpg`,
  }),
)

type SampleSpec = {
  index: number
  width: number
  height: number
}

function buildSamples(slug: string, items: SampleSpec[]): PdpSampleSpaceItem[] {
  return items.map(({ index, width, height }) => ({
    id: `${slug}-${String(index).padStart(2, '0')}`,
    src: `${samplesRoot}/${slug}/${slug}-${String(index).padStart(2, '0')}.jpg`,
    width,
    height,
  }))
}

const bedroomSamples = buildSamples('bedroom', [
  { index: 1, width: 900, height: 675 },
  { index: 2, width: 900, height: 1290 },
  { index: 6, width: 900, height: 601 },
  { index: 8, width: 900, height: 600 },
  { index: 10, width: 900, height: 600 },
])

const livingRoomSamples = buildSamples('living-room', [
  { index: 1, width: 900, height: 600 },
  { index: 2, width: 900, height: 1200 },
  { index: 3, width: 900, height: 600 },
  { index: 4, width: 900, height: 600 },
  { index: 5, width: 900, height: 506 },
  { index: 7, width: 900, height: 600 },
  { index: 8, width: 900, height: 601 },
  { index: 9, width: 900, height: 600 },
  { index: 10, width: 900, height: 600 },
])

const kitchenSamples = buildSamples('kitchen', [
  { index: 1, width: 900, height: 600 },
  { index: 2, width: 900, height: 600 },
  { index: 3, width: 900, height: 600 },
  { index: 4, width: 900, height: 601 },
  { index: 5, width: 900, height: 601 },
  { index: 6, width: 900, height: 600 },
  { index: 7, width: 900, height: 600 },
  { index: 8, width: 900, height: 600 },
  { index: 9, width: 900, height: 600 },
  { index: 10, width: 900, height: 601 },
])

const kidsRoomSamples = buildSamples('kids-room', [
  { index: 1, width: 900, height: 600 },
  { index: 3, width: 900, height: 1350 },
  { index: 6, width: 900, height: 600 },
  { index: 7, width: 900, height: 608 },
  { index: 8, width: 900, height: 1348 },
  { index: 9, width: 900, height: 612 },
  { index: 10, width: 900, height: 600 },
])

const studioSamples = buildSamples('studio', [
  { index: 1, width: 900, height: 600 },
  { index: 2, width: 900, height: 601 },
  { index: 3, width: 900, height: 600 },
  { index: 4, width: 900, height: 600 },
  { index: 5, width: 900, height: 600 },
  { index: 6, width: 900, height: 601 },
  { index: 7, width: 900, height: 1349 },
  { index: 8, width: 900, height: 510 },
  { index: 9, width: 900, height: 601 },
  { index: 10, width: 900, height: 601 },
])

const allSamples: PdpSampleSpaceItem[] = [
  ...bedroomSamples,
  ...livingRoomSamples,
  ...kitchenSamples,
  ...kidsRoomSamples,
  ...studioSamples,
]

const constructionAiSampleSpacesByType: Record<
  PdpSpaceType,
  PdpSampleSpaceItem[]
> = {
  all: allSamples,
  bedroom: bedroomSamples,
  'living-room': livingRoomSamples,
  kitchen: kitchenSamples,
  'kids-room': kidsRoomSamples,
  studio: studioSamples,
}

export const constructionAiRoomData: PdpAiRoomDataOverrides = {
  myPhotos: constructionAiMyPhotos,
  sampleSpacesByType: constructionAiSampleSpacesByType,
}
