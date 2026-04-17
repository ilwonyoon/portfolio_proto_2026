import { FigmaAsset } from '../../prototype/FigmaAsset'
import { HomeIndicator } from './HomeIndicator'

export type BottomNavItem = {
  id: string
  label: string
  iconSrc: string
  iconWidth: number
  iconHeight: number
}

export type BottomNavBarProps = {
  items: BottomNavItem[]
  activeItemId: string
  className?: string
}

export function BottomNavBar({
  items,
  activeItemId,
  className,
}: BottomNavBarProps) {
  return (
    <div className={`ds-bottom-nav ${className ?? ''}`.trim()}>
      <div className="ds-bottom-nav__border" />
      <div className="ds-bottom-nav__items">
        {items.map((item) => {
          const isActive = item.id === activeItemId

          return (
            <button
              key={item.id}
              type="button"
              className={isActive ? 'ds-bottom-nav__item ds-bottom-nav__item--active' : 'ds-bottom-nav__item'}
              aria-pressed={isActive}
            >
              <span className="ds-bottom-nav__icon-slot" aria-hidden="true">
                <FigmaAsset
                  src={item.iconSrc}
                  alt=""
                  displayWidth={item.iconWidth}
                  displayHeight={item.iconHeight}
                  className="ds-bottom-nav__icon"
                />
              </span>
              <span className="ds-bottom-nav__label">{item.label}</span>
            </button>
          )
        })}
      </div>
      <HomeIndicator />
    </div>
  )
}
