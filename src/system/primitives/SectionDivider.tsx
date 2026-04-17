type SectionDividerProps = {
  className?: string
}

export function SectionDivider({ className }: SectionDividerProps) {
  return <div className={`ds-section-divider ${className ?? ''}`.trim()} aria-hidden="true" />
}
