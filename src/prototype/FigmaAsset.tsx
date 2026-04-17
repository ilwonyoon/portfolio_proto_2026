import type { CSSProperties } from 'react'
import { DEFAULT_EXPORT_SCALE } from './constants'

type FigmaAssetProps = {
  src: string
  alt: string
  displayWidth: number
  displayHeight: number
  className?: string
  exportScale?: 1 | 2
  loading?: 'eager' | 'lazy'
  decoding?: 'async' | 'sync' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
  draggable?: boolean
}

export function FigmaAsset({
  src,
  alt,
  displayWidth,
  displayHeight,
  className,
  exportScale = DEFAULT_EXPORT_SCALE,
  loading = 'eager',
  decoding = 'async',
  fetchPriority = 'auto',
  draggable = false,
}: FigmaAssetProps) {
  const style = {
    width: displayWidth,
    height: displayHeight,
  } satisfies CSSProperties

  return (
    <img
      src={src}
      srcSet={exportScale === 2 ? `${src} 2x` : undefined}
      alt={alt}
      width={displayWidth}
      height={displayHeight}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      draggable={draggable}
      data-export-scale={exportScale}
      className={className}
      style={style}
    />
  )
}
