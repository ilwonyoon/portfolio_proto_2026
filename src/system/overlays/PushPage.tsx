import type { ReactNode } from 'react'

export type PushPageState = 'center' | 'offscreen-right' | 'peek-left'

type PushPageProps = {
  children: ReactNode
  className?: string
  state: PushPageState
}

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(' ')
}

export function PushPage({ children, className, state }: PushPageProps) {
  return (
    <div
      className={joinClassNames(
        'ds-push-page',
        `ds-push-page--${state}`,
        className,
      )}
    >
      {children}
    </div>
  )
}
