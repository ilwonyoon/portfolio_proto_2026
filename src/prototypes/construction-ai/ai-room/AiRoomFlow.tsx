// Construction AI's own copy of the AI room flow.
// Independent from PDP — selector/placer screens here can diverge freely.

import { useState } from 'react'
import { PrototypeScreen } from '../../../prototype/PrototypeScreen'
import { PushPage } from '../../../system/overlays'
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
} from './AiRoomPlaceObjectScreen'
import '../../pdp/pdp.css'

type ConstructionFlowScreen = 'selector' | 'placer'

type ConstructionRoomFlowProps = {
  mode?: 'full' | 'thumbnail'
  data?: PdpAiRoomDataOverrides
  initialMode?: ConstructionPlaceObjectMode
  referenceMedia?: ConstructionAttachedMedia
}

export function ConstructionRoomFlowContent({
  mode = 'full',
  data,
  initialMode = 'add-products',
  referenceMedia,
}: ConstructionRoomFlowProps) {
  const isThumbnail = mode === 'thumbnail'
  const [activeScreen, setActiveScreen] =
    useState<ConstructionFlowScreen>('selector')
  const [selectedSpace, setSelectedSpace] = useState<PdpSelectableSpace>({
    id: 'default-bedroom',
    src: pdpSelectedRoomSrc,
  })

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
          onClose={() => setActiveScreen('selector')}
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
          referenceMedia={referenceMedia}
          onBack={() => setActiveScreen('selector')}
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
