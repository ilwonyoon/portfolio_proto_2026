import { useEffect, useRef, useState, type ReactNode } from 'react'
import { FigmaAsset } from '../../prototype/FigmaAsset'

export type HomePostDetailMeta = {
  label: string
  value: string
}

export type HomePostDetailViewProps = {
  isOpen: boolean
  heroSrc: string
  heroAlt: string
  title: string
  authorAvatarSrc: string
  authorHandle: string
  authorDisplayName: string
  followLabel?: string
  infoRows: HomePostDetailMeta[][]
  expandLabel?: string
  modules?: ReactNode
  onClose: () => void
  onGoHome?: () => void
}

export function HomePostDetailView({
  isOpen,
  heroSrc,
  heroAlt,
  title,
  authorAvatarSrc,
  authorHandle,
  authorDisplayName,
  followLabel = 'Follow',
  infoRows,
  expandLabel = 'Show 5 more',
  modules,
  onClose,
  onGoHome,
}: HomePostDetailViewProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isHeaderSolid, setIsHeaderSolid] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [isOpen])

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const nextSolid = event.currentTarget.scrollTop > 8
    setIsHeaderSolid((previous) => (previous === nextSolid ? previous : nextSolid))
  }

  return (
    <div
      className={`ds-home-post-detail ${isOpen ? 'ds-home-post-detail--open' : ''}`.trim()}
      aria-hidden={!isOpen}
    >
      <div className="ds-home-post-detail__panel">
        <div
          ref={scrollRef}
          className="ds-home-post-detail__scroll prototype-screen__scroll-region"
          onScroll={handleScroll}
        >
          <div
            className={`ds-home-post-detail__sticky-header ${isHeaderSolid ? 'ds-home-post-detail__sticky-header--solid' : ''}`.trim()}
          >
            <div className="ds-home-post-detail__status-bar" aria-hidden="true">
              <span className="ds-home-post-detail__status-time">9:41</span>
              <FigmaAsset
                src="/assets/figma/old-home-feed/post-detail/status-right-white.svg"
                alt=""
                displayWidth={66.661}
                displayHeight={11.336}
                className="ds-home-post-detail__status-icons"
              />
            </div>

            <div className="ds-home-post-detail__top-nav">
              <div className="ds-home-post-detail__top-nav-left">
                <button
                  type="button"
                  className="ds-home-post-detail__icon-button"
                  aria-label="Go back"
                  onClick={onClose}
                >
                  <FigmaAsset
                    src="/assets/figma/old-home-feed/post-detail/back.svg"
                    alt=""
                    displayWidth={20.5}
                    displayHeight={18.867}
                    className="ds-home-post-detail__header-icon"
                  />
                </button>
                <button
                  type="button"
                  className="ds-home-post-detail__icon-button"
                  aria-label="Go home"
                  onClick={onGoHome}
                >
                  <FigmaAsset
                    src="/assets/figma/old-home-feed/post-detail/home.svg"
                    alt=""
                    displayWidth={20.8}
                    displayHeight={19.85}
                    className="ds-home-post-detail__header-icon"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="ds-home-post-detail__hero">
            <FigmaAsset
              src={heroSrc}
              alt={heroAlt}
              displayWidth={375}
              displayHeight={375}
              className="ds-home-post-detail__hero-image"
            />
          </div>

          <div className="ds-home-post-detail__body">
            <div className="ds-home-post-detail__content">
              <h1 className="ds-home-post-detail__title">{title}</h1>

              <div className="ds-home-post-detail__author-row">
                <div className="ds-home-post-detail__author">
                  <FigmaAsset
                    src={authorAvatarSrc}
                    alt=""
                    displayWidth={40}
                    displayHeight={40}
                    className="ds-home-post-detail__author-avatar"
                  />
                  <div className="ds-home-post-detail__author-copy">
                    <div className="ds-home-post-detail__author-handle">{authorHandle}</div>
                    <div className="ds-home-post-detail__author-name">{authorDisplayName}</div>
                  </div>
                </div>

                <button type="button" className="ds-home-post-detail__follow-button">
                  {followLabel}
                </button>
              </div>

              <div className="ds-home-post-detail__meta">
                {infoRows.map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="ds-home-post-detail__meta-row">
                    {row.map((item) => (
                      <div
                        key={`${rowIndex}-${item.label}`}
                        className="ds-home-post-detail__meta-item"
                      >
                        <span className="ds-home-post-detail__meta-label">{item.label}</span>
                        <span className="ds-home-post-detail__meta-value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <button type="button" className="ds-home-post-detail__expand-button">
                <span>{expandLabel}</span>
                <span className="ds-home-post-detail__expand-icon-wrap" aria-hidden="true">
                  <FigmaAsset
                    src="/assets/figma/old-home-feed/post-detail/chevron-down.svg"
                    alt=""
                    displayWidth={18}
                    displayHeight={18}
                    className="ds-home-post-detail__expand-icon"
                  />
                </span>
              </button>

              {modules ? <div className="ds-home-post-detail__modules">{modules}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
