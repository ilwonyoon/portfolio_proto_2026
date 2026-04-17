type ProgressBarProps = {
  fillClassName: string
  className?: string
}

export function ProgressBar({
  fillClassName,
  className,
}: ProgressBarProps) {
  return (
    <div className={`ds-progress ${className ?? ''}`.trim()} aria-hidden="true">
      <div className={fillClassName} />
    </div>
  )
}
