// Public entry points for the AI Room flow (selector + placer).
// These wrap the PDP-internal PdpFlowContent / PdpFlowRoot so other
// prototypes can mount the flow without importing PDP detail screen
// internals. Provide `data` (PdpAiRoomDataOverrides) to swap My Photos,
// space type chips, or sample spaces per prototype.

import { PdpFlowContent, PdpFlowRoot } from './PdpPrototype'
import type { PdpAiRoomDataOverrides } from './pdp-room-selector-data'

export type PdpAiRoomFlowProps = {
  mode?: 'full' | 'thumbnail'
  data?: PdpAiRoomDataOverrides
}

export function PdpAiRoomFlowContent({
  mode = 'full',
  data,
}: PdpAiRoomFlowProps) {
  return (
    <PdpFlowContent
      includeProductEntry={false}
      initialScreen="selector"
      mode={mode}
      data={data}
    />
  )
}

export function PdpAiRoomFlow({ mode = 'full', data }: PdpAiRoomFlowProps) {
  return (
    <PdpFlowRoot
      includeProductEntry={false}
      initialScreen="selector"
      mode={mode}
      data={data}
    />
  )
}
