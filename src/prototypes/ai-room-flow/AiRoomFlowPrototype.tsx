import { PdpAiRoomFlow } from '../pdp/AiRoomFlow'

type AiRoomFlowPrototypeProps = {
  mode?: 'full' | 'thumbnail'
}

export default function AiRoomFlowPrototype({
  mode = 'full',
}: AiRoomFlowPrototypeProps) {
  return <PdpAiRoomFlow mode={mode} />
}
