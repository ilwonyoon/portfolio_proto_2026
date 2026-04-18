import { FigmaAsset } from '../../prototype/FigmaAsset'

export type HomeTourGridSectionItem = {
  id: string
  imageSrc: string
  imageAlt: string
  title: string
  detailTitle?: string
  saved?: boolean
}

type HomeTourGridSectionProps = {
  title: string
  items: HomeTourGridSectionItem[]
  bookmarkIconSrc: string
  className?: string
  onToggleSave?: (itemId: string) => void
  onSelectItem?: (item: HomeTourGridSectionItem) => void
  viewMoreLabel?: string
  viewMoreChevronSrc?: string
  viewMoreChevronWidth?: number
  viewMoreChevronHeight?: number
  onViewMore?: () => void
}

export function HomeTourGridSection({
  title,
  items,
  bookmarkIconSrc,
  className,
  onToggleSave,
  onSelectItem,
  viewMoreLabel,
  viewMoreChevronSrc,
  viewMoreChevronWidth = 7.91407,
  viewMoreChevronHeight = 13.3519,
  onViewMore,
}: HomeTourGridSectionProps) {
  return (
    <section
      className={`ds-home-tour-grid ${viewMoreLabel ? 'ds-home-tour-grid--with-view-more' : ''} ${className ?? ''}`.trim()}
    >
      <header className="ds-home-tour-grid__header">
        <h2 className="ds-home-tour-grid__title">{title}</h2>
      </header>

      <div className="ds-home-tour-grid__grid">
        {items.map((item) => (
          <article
            key={item.id}
            className={`ds-home-tour-grid__card ${onSelectItem ? 'ds-home-tour-grid__card--interactive' : ''}`.trim()}
            onClick={() => onSelectItem?.(item)}
            onKeyDown={(event) => {
              if (!onSelectItem) return
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelectItem(item)
              }
            }}
            role={onSelectItem ? 'button' : undefined}
            tabIndex={onSelectItem ? 0 : undefined}
          >
            <div className="ds-home-tour-grid__image-frame">
              <FigmaAsset
                src={item.imageSrc}
                alt={item.imageAlt}
                displayWidth={167.5}
                displayHeight={167.5}
                className="ds-home-tour-grid__image"
                loading="lazy"
              />
              <button
                type="button"
                className="ds-home-tour-grid__toggle"
                aria-label={item.saved ? 'Remove from saved items' : 'Save item'}
                aria-pressed={Boolean(item.saved)}
                onClick={(event) => {
                  event.stopPropagation()
                  onToggleSave?.(item.id)
                }}
              >
                <FigmaAsset
                  src={bookmarkIconSrc}
                  alt=""
                  displayWidth={24}
                  displayHeight={24}
                  className="ds-home-tour-grid__toggle-icon"
                />
              </button>
            </div>
            <p className="ds-home-tour-grid__card-title">{item.title}</p>
          </article>
        ))}
      </div>

      {viewMoreLabel ? (
        <div className="ds-home-tour-grid__view-more-wrap">
          <button type="button" className="ds-home-tour-grid__view-more-button" onClick={onViewMore}>
            <span className="ds-home-tour-grid__view-more-label">{viewMoreLabel}</span>
            {viewMoreChevronSrc ? (
              <span className="ds-home-tour-grid__view-more-chevron-wrap" aria-hidden="true">
                <FigmaAsset
                  src={viewMoreChevronSrc}
                  alt=""
                  displayWidth={viewMoreChevronWidth}
                  displayHeight={viewMoreChevronHeight}
                  className="ds-home-tour-grid__view-more-chevron"
                />
              </span>
            ) : null}
          </button>
        </div>
      ) : null}
    </section>
  )
}
