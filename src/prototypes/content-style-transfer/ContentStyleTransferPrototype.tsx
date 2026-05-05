import { useEffect, useMemo, useState } from 'react'
import PersonalizedFeedPrototype from '../personalized-feed/PersonalizedFeedPrototype'
import { ConstructionRoomFlowContent } from '../construction-ai/ai-room/AiRoomFlow'
import { PrototypeScreen } from '../../prototype/PrototypeScreen'
import { constructionAiRoomData } from '../construction-ai/ai-room-data'
import type { HomeFeedItem } from '../../system/feed'
import { getContentStyleTransferFeedItems } from './feed-content'
import '../pdp/pdp.css'
import './content-style-transfer.css'

const contentStyleTransferRoomData = {
  ...constructionAiRoomData,
  myPhotos: [
    {
      id: 'content-style-transfer-original-office',
      src: '/assets/figma/content-style-transfer/results/original-office.jpeg',
    },
    // Skip the first construction-ai photo since it now points at the same
    // original_office asset (the file was overwritten earlier). Picking up
    // from index 1 keeps the rest of the My Photos strip populated without
    // showing the office twice.
    ...((constructionAiRoomData.myPhotos ?? []).slice(1)),
  ],
}

type ContentStyleTransferPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

type ActiveScreen = 'feed' | 'ai-room'

type FeedReference = {
  itemId: string
  src: string
}

function ContentStyleTransferPrototype({
  mode = 'full',
}: ContentStyleTransferPrototypeProps) {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('feed')
  const [activeReference, setActiveReference] = useState<FeedReference | null>(
    null,
  )

  // Preload the selector + result assets in the background as soon as the
  // feed mounts. By the time the user taps "Try in your room" the browser
  // cache already has the My Photos strip, the first sample-spaces row, and
  // both generated office renders, so the selector and result screens render
  // without any flicker.
  useEffect(() => {
    const sampleSpaces = constructionAiRoomData.sampleSpacesByType?.all ?? []
    const sampleSpaceUrls = sampleSpaces.slice(0, 6).map((space) => space.src)
    const myPhotoUrls =
      contentStyleTransferRoomData.myPhotos?.slice(0, 5).map((photo) => photo.src) ??
      []
    const resultUrls = [
      '/assets/figma/content-style-transfer/results/original-office.jpeg',
      '/assets/figma/content-style-transfer/results/generated-office.jpeg',
      '/assets/figma/content-style-transfer/results/generated-office-2.jpeg',
    ]
    const irishhannyRoot = '/assets/figma/content-style-transfer/feed/irishhanny'
    const irishhannyUrls = [
      `${irishhannyRoot}/photo-01.jpg`,
      `${irishhannyRoot}/avatar.jpg`,
      `${irishhannyRoot}/product-1.jpg`,
      `${irishhannyRoot}/product-2.jpg`,
      `${irishhannyRoot}/product-3.jpg`,
      `${irishhannyRoot}/product-4.jpg`,
    ]
    const urls = [
      ...myPhotoUrls,
      ...sampleSpaceUrls,
      ...resultUrls,
      ...irishhannyUrls,
    ]
    urls.forEach((url) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = url
    })
  }, [])

  const openAiRoomForItem = (item: HomeFeedItem) => {
    if (item.type !== 'user-uploaded') return
    const firstSlide = item.card.media.slides[0]
    if (!firstSlide) return
    setActiveReference({ itemId: item.id, src: firstSlide.src })
    setActiveScreen('ai-room')
  }

  const feedItems = useMemo<HomeFeedItem[]>(() => {
    const base = getContentStyleTransferFeedItems()
    return base.map((item) => {
      if (item.type !== 'user-uploaded') {
        return item
      }
      return {
        ...item,
        card: {
          ...item.card,
          tryInRoom: {
            label: 'Try in your room',
            onClick: () => openAiRoomForItem(item),
          },
        },
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (activeScreen === 'ai-room' && activeReference) {
    return (
      <div
        className={
          mode === 'thumbnail'
            ? 'pdp-prototype pdp-prototype--thumbnail'
            : 'pdp-prototype'
        }
      >
        <PrototypeScreen contentHeight={812} variant="bare">
          <ConstructionRoomFlowContent
            mode={mode}
            data={contentStyleTransferRoomData}
            initialMode="style-transfer"
            navTitle="Try in your room"
            referenceMedia={{
              id: `feed-ref-${activeReference.itemId}`,
              src: activeReference.src,
              label: 'Photo reference',
            }}
            styleTransferResultSrcSequence={[
              '/assets/figma/content-style-transfer/results/generated-office.jpeg',
              '/assets/figma/content-style-transfer/results/generated-office-2.jpeg',
            ]}
            styleTransferPlaceholder="Restage my room with furniture and decor inspired by this reference, keeping my existing layout, desk position, and finishes"
            styleTransferResultTagSequence={[
              [
                {
                  id: 'gen1-tag-monitor',
                  productId: 'gen-product-monitor',
                  label: 'Frame monitor and arm',
                  x: 174,
                  y: 152,
                },
                {
                  id: 'gen1-tag-desk',
                  productId: 'gen-product-desk',
                  label: 'Standing desk in white',
                  x: 111,
                  y: 187,
                },
                {
                  id: 'gen1-tag-chair',
                  productId: 'gen-product-chair',
                  label: 'Ergonomic mesh chair',
                  x: 201,
                  y: 165,
                },
              ],
              [
                {
                  id: 'gen2-tag-curtain',
                  productId: 'gen-product-curtain',
                  label: 'Gingham linen curtain',
                  x: 285,
                  y: 95,
                },
              ],
            ]}
            styleTransferResultProductsSequence={[
              [
                {
                  id: 'gen-product-monitor',
                  thumbnailSrc:
                    '/assets/figma/content-style-transfer/feed/irishhanny/product-2.jpg',
                  thumbnailAlt: 'Frame monitor and arm',
                  name: 'Frame monitor and arm',
                  priceLabel: '',
                },
                {
                  id: 'gen-product-desk',
                  thumbnailSrc:
                    '/assets/figma/content-style-transfer/feed/irishhanny/product-1.jpg',
                  thumbnailAlt: 'Standing desk in white',
                  name: 'Standing desk in white',
                  priceLabel: '',
                },
                {
                  id: 'gen-product-chair',
                  thumbnailSrc:
                    '/assets/figma/content-style-transfer/feed/irishhanny/product-3.jpg',
                  thumbnailAlt: 'Ergonomic mesh chair',
                  name: 'Ergonomic mesh chair',
                  priceLabel: '',
                },
              ],
              [
                {
                  id: 'gen-product-curtain',
                  thumbnailSrc:
                    '/assets/figma/content-style-transfer/feed/irishhanny/product-4.jpg',
                  thumbnailAlt: 'Gingham linen curtain',
                  name: 'Gingham linen curtain',
                  priceLabel: '',
                },
              ],
            ]}
            styleTransferChips={[
              {
                id: 'match-the-vibe',
                label: 'Match the vibe',
                prompt:
                  'Match the vibe of this reference — bring the same color palette, lighting feel, and small decor accents into my room. Keep my furniture, layout, and finishes as they are.',
              },
              {
                id: 'bring-the-furniture',
                label: 'Bring the furniture',
                prompt:
                  'Restyle my room with the furniture and decor from this reference, keeping my existing layout, desk position, and finishes. Replace my current pieces only where it makes the mood clearer.',
              },
              {
                id: 'full-restyle',
                label: 'Full restyle',
                prompt:
                  'Recreate this reference in my room as fully as possible — furniture, decor, finishes, and lighting. Keep the overall layout and key fixtures so I can still recognize my space.',
              },
            ]}
            onSelectorClose={() => setActiveScreen('feed')}
          />
        </PrototypeScreen>
      </div>
    )
  }

  return (
    <PersonalizedFeedPrototype
      mode={mode}
      feedItemsOverride={feedItems}
    />
  )
}

export default ContentStyleTransferPrototype
