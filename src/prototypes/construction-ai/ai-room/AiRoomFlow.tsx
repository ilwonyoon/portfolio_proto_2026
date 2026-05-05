// Construction AI's own copy of the AI room flow.
// Independent from PDP — selector/placer screens here can diverge freely.

import { useState } from 'react'
import { PrototypeScreen } from '../../../prototype/PrototypeScreen'
import { PushPage } from '../../../system/overlays'
import type { FeedProduct } from '../../../system/feed'
import {
  pdpSelectedRoomSrc,
  type PdpAiRoomDataOverrides,
  type PdpSelectableSpace,
} from './deps'
import { ConstructionSelectPhotoScreen } from './AiRoomSelectorScreen'
import {
  ConstructionPlaceObjectScreen,
  type ConstructionAttachedMedia,
  type ConstructionPlaceObjectMode,
  type ConstructionResultContractor,
} from './AiRoomPlaceObjectScreen'
import '../../pdp/pdp.css'

type ConstructionFlowScreen = 'selector' | 'placer'

type ConstructionRoomFlowProps = {
  mode?: 'full' | 'thumbnail'
  data?: PdpAiRoomDataOverrides
  initialMode?: ConstructionPlaceObjectMode
  navTitle?: string
  referenceMedia?: ConstructionAttachedMedia
  resultContractor?: ConstructionResultContractor
  initialSpace?: PdpSelectableSpace
  skipSelector?: boolean
  onPlacerBack?: () => void
  onSelectorClose?: () => void
  styleTransferResultSrc?: string
  styleTransferResultSrcSequence?: string[]
  styleTransferPlaceholder?: string
  styleTransferChips?: Array<{ id: string; label: string; prompt: string }>
  styleTransferResultTags?: Array<{
    id: string
    productId: string
    label: string
    x: number
    y: number
  }>
  styleTransferResultProducts?: FeedProduct[]
  styleTransferResultTagSequence?: Array<
    Array<{ id: string; productId: string; label: string; x: number; y: number }>
  >
  styleTransferResultProductsSequence?: FeedProduct[][]
}

export function ConstructionRoomFlowContent({
  mode = 'full',
  data,
  initialMode = 'add-products',
  navTitle,
  referenceMedia,
  resultContractor,
  initialSpace,
  skipSelector = false,
  onPlacerBack,
  onSelectorClose,
  styleTransferResultSrc,
  styleTransferResultSrcSequence,
  styleTransferPlaceholder,
  styleTransferChips,
  styleTransferResultTags,
  styleTransferResultProducts,
  styleTransferResultTagSequence,
  styleTransferResultProductsSequence,
}: ConstructionRoomFlowProps) {
  const isThumbnail = mode === 'thumbnail'
  const [activeScreen, setActiveScreen] =
    useState<ConstructionFlowScreen>(skipSelector ? 'placer' : 'selector')
  const [selectedSpace, setSelectedSpace] = useState<PdpSelectableSpace>(
    initialSpace ?? { id: 'default-bedroom', src: pdpSelectedRoomSrc },
  )

  return (
    <div className="pdp-flow">
      <PushPage
        className="pdp-flow__page"
        state={activeScreen === 'selector' ? 'center' : 'peek-left'}
      >
        <ConstructionSelectPhotoScreen
          isActive={activeScreen === 'selector'}
          isThumbnail={isThumbnail}
          data={data}
          title="Select a photo"
          onClose={() => {
            if (onSelectorClose) {
              onSelectorClose()
              return
            }
            setActiveScreen('selector')
          }}
          onSelectSpace={(space) => {
            setSelectedSpace(space)
            setActiveScreen('placer')
          }}
        />
      </PushPage>
      <PushPage
        className="pdp-flow__page"
        state={activeScreen === 'placer' ? 'center' : 'offscreen-right'}
      >
        <ConstructionPlaceObjectScreen
          isActive={activeScreen === 'placer'}
          selectedSpace={selectedSpace}
          initialMode={initialMode}
          navTitle={navTitle}
          referenceMedia={referenceMedia}
          resultContractor={resultContractor}
          styleTransferResultSrc={styleTransferResultSrc}
          styleTransferResultSrcSequence={styleTransferResultSrcSequence}
          styleTransferPlaceholder={styleTransferPlaceholder}
          styleTransferChips={styleTransferChips}
          styleTransferResultTags={styleTransferResultTags}
          styleTransferResultProducts={styleTransferResultProducts}
          styleTransferResultTagSequence={styleTransferResultTagSequence}
          styleTransferResultProductsSequence={styleTransferResultProductsSequence}
          onBack={() => {
            if (skipSelector && onPlacerBack) {
              onPlacerBack()
              return
            }
            setActiveScreen('selector')
          }}
        />
      </PushPage>
    </div>
  )
}

export function ConstructionRoomFlow({
  mode = 'full',
  data,
}: ConstructionRoomFlowProps) {
  const isThumbnail = mode === 'thumbnail'

  return (
    <div
      className={
        isThumbnail
          ? 'pdp-prototype pdp-prototype--thumbnail'
          : 'pdp-prototype'
      }
    >
      <PrototypeScreen contentHeight={812} variant="bare">
        <ConstructionRoomFlowContent mode={mode} data={data} />
      </PrototypeScreen>
    </div>
  )
}
