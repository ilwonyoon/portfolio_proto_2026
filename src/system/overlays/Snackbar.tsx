import type { CSSProperties } from 'react'

type SnackbarProps = {
  message?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
  style?: CSSProperties
}

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(' ')
}

export function Snackbar({
  message,
  actionLabel,
  onAction,
  className,
  style,
}: SnackbarProps) {
  const isVisible = Boolean(message)

  return (
    <div
      className={joinClassNames(
        'ds-snackbar',
        isVisible && 'ds-snackbar--visible',
        className,
      )}
      role="status"
      aria-live="polite"
      style={style}
    >
      <div className="ds-snackbar__inner">
        <span className="ds-snackbar__copy">{message ?? ''}</span>
        {actionLabel ? (
          <button
            type="button"
            className="ds-snackbar__action"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  )
}
