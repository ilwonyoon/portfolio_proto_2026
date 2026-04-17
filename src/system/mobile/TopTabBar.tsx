type TopTab = {
  id: string
  label: string
}

type TopTabBarProps = {
  tabs: TopTab[]
  activeTabId: string
  className?: string
  onChange?: (tabId: string) => void
}

export function TopTabBar({
  tabs,
  activeTabId,
  className,
  onChange,
}: TopTabBarProps) {
  return (
    <div className={`ds-top-tab-bar ${className ?? ''}`.trim()}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId

        return (
          <button
            key={tab.id}
            type="button"
            className={isActive ? 'ds-top-tab-bar__item ds-top-tab-bar__item--active' : 'ds-top-tab-bar__item'}
            aria-pressed={isActive}
            onClick={() => onChange?.(tab.id)}
          >
            <span className="ds-top-tab-bar__label">{tab.label}</span>
            {isActive ? <span className="ds-top-tab-bar__indicator" aria-hidden="true" /> : null}
          </button>
        )
      })}
    </div>
  )
}
