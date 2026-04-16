import type { CSSProperties, ReactNode } from 'react'
import { DEVICE_VIEWPORT } from './constants'

type PrototypeScreenProps = {
  title?: string
  contentHeight: number
  children: ReactNode
  variant?: 'framed' | 'bare'
}

export function PrototypeScreen({
  title,
  contentHeight,
  children,
  variant = 'framed',
}: PrototypeScreenProps) {
  const viewportStyle = {
    width: DEVICE_VIEWPORT.width,
    height: DEVICE_VIEWPORT.height,
  } satisfies CSSProperties

  const contentStyle = {
    minHeight: contentHeight,
  } satisfies CSSProperties

  return (
    <div
      className={
        variant === 'bare'
          ? 'prototype-device prototype-device--bare'
          : 'prototype-device'
      }
    >
      {variant === 'framed' ? (
        <div className="prototype-device__header">
          <span>{title}</span>
          <span>
            {DEVICE_VIEWPORT.width} x {DEVICE_VIEWPORT.height}
          </span>
        </div>
      ) : null}

      <div className="prototype-screen" style={viewportStyle}>
        <div className="prototype-screen__content" style={contentStyle}>
          {children}
        </div>
      </div>
    </div>
  )
}
