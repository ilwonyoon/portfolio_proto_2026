import { FigmaAsset } from '../../prototype/FigmaAsset'

type StatusBarProps = {
  levelsSrc: string
  className?: string
}

export function StatusBar({ levelsSrc, className }: StatusBarProps) {
  return (
    <div className={`ds-status-bar ${className ?? ''}`.trim()}>
      <div className="ds-status-bar__time">9:41</div>
      <FigmaAsset src={levelsSrc} alt="" displayWidth={68} displayHeight={50} />
    </div>
  )
}
