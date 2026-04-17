import { FigmaAsset } from '../../prototype/FigmaAsset'

export type HomeSearchNavIcon = {
  label: string
  src: string
  width: number
  height: number
  showDot?: boolean
  dotSrc?: string
  dotWidth?: number
  dotHeight?: number
  badgeLabel?: string
}

export type HomeSearchNavProps = {
  menuIcon: HomeSearchNavIcon
  searchIcon: HomeSearchNavIcon
  actions: HomeSearchNavIcon[]
  placeholder: string
  className?: string
}

export function HomeSearchNav({
  menuIcon,
  searchIcon,
  actions,
  placeholder,
  className,
}: HomeSearchNavProps) {
  return (
    <div className={`ds-home-search-nav ${className ?? ''}`.trim()}>
      <button type="button" className="ds-home-search-nav__menu" aria-label={menuIcon.label}>
        <FigmaAsset
          src={menuIcon.src}
          alt=""
          displayWidth={menuIcon.width}
          displayHeight={menuIcon.height}
        />
      </button>

      <div className="ds-home-search-nav__search" aria-label={placeholder}>
        <FigmaAsset
          src={searchIcon.src}
          alt=""
          displayWidth={searchIcon.width}
          displayHeight={searchIcon.height}
        />
        <span className="ds-home-search-nav__placeholder">{placeholder}</span>
      </div>

      <div className="ds-home-search-nav__actions">
        {actions.map((action) => (
          <div key={action.label} className="ds-home-search-nav__action-wrap">
            <button
              type="button"
              className="ds-home-search-nav__action"
              aria-label={action.label}
            >
              <FigmaAsset
                src={action.src}
                alt=""
                displayWidth={action.width}
                displayHeight={action.height}
              />
            </button>
            {action.showDot && action.dotSrc ? (
              <span className="ds-home-search-nav__dot">
                <FigmaAsset
                  src={action.dotSrc}
                  alt=""
                  displayWidth={action.dotWidth ?? 4}
                  displayHeight={action.dotHeight ?? 4}
                />
              </span>
            ) : null}
            {action.badgeLabel ? (
              <span className="ds-home-search-nav__badge">{action.badgeLabel}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
