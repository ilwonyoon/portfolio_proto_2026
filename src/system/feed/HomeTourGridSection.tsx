import { FigmaAsset } from '../../prototype/FigmaAsset'

export type HomeTourGridSectionItem = {
  id: string
  imageSrc: string
  imageAlt: string
  title: string
  saved?: boolean
}

type HomeTourGridSectionProps = {
  title: string
  items: HomeTourGridSectionItem[]
  bookmarkIconSrc: string
  className?: string
  onToggleSave?: (itemId: string) => void
}

export function HomeTourGridSection({
  title,
  items,
  bookmarkIconSrc,
  className,
  onToggleSave,
}: HomeTourGridSectionProps) {
  return (
    <section className={`ds-home-tour-grid ${className ?? ''}`.trim()}>
      <header className="ds-home-tour-grid__header">
        <h2 className="ds-home-tour-grid__title">{title}</h2>
      </header>

      <div className="ds-home-tour-grid__grid">
        {items.map((item) => (
          <article key={item.id} className="ds-home-tour-grid__card">
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
                onClick={() => onToggleSave?.(item.id)}
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
    </section>
  )
}
