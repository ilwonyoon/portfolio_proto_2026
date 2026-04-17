import { useMemo, useState } from 'react'
import './app-shell.css'
import { prototypeRegistry } from './prototype-registry'
import { DesignSystemPanel } from './DesignSystemPanel'
import { LiquidGlassCursor } from '../system'

export function AppShell() {
  const [activePrototypeId, setActivePrototypeId] = useState(
    prototypeRegistry[0]?.id ?? '',
  )
  const [activeView, setActiveView] = useState<'prototype' | 'design-system'>(
    'prototype',
  )

  const activePrototype = useMemo(
    () =>
      prototypeRegistry.find((prototype) => prototype.id === activePrototypeId) ??
      prototypeRegistry[0],
    [activePrototypeId],
  )

  if (!activePrototype) {
    return null
  }

  const ActivePrototypeComponent = activePrototype.Component

  return (
    <main className="workbench-shell">
      <LiquidGlassCursor active={activeView === 'prototype'} />

      <aside className="workbench-sidebar">
        <div className="workbench-sidebar__header">
          <p className="workbench-sidebar__eyebrow">Prototypes</p>
          <h1 className="workbench-sidebar__title">Preview</h1>
        </div>

        <nav className="prototype-list" aria-label="Available prototypes">
          {prototypeRegistry.map((prototype) => {
            const isActive = prototype.id === activePrototype.id
            const PreviewComponent = prototype.Component

            return (
              <button
                key={prototype.id}
                type="button"
                className={
                  isActive
                    ? 'prototype-list__item prototype-list__item--active'
                    : 'prototype-list__item'
                }
                onClick={() => {
                  setActivePrototypeId(prototype.id)
                  setActiveView('prototype')
                }}
              >
                <span className="prototype-list__preview" aria-hidden="true">
                  <span className="prototype-list__preview-scale">
                    <PreviewComponent mode="thumbnail" />
                  </span>
                </span>
                <span className="prototype-list__name">{prototype.title}</span>
              </button>
            )
          })}
        </nav>

        <div className="workbench-sidebar__footer">
          <button
            type="button"
            className={
              activeView === 'design-system'
                ? 'workbench-sidebar__secondary-action workbench-sidebar__secondary-action--active'
                : 'workbench-sidebar__secondary-action'
            }
            onClick={() => setActiveView('design-system')}
          >
            Design system
          </button>
        </div>
      </aside>

      <section
        className="workbench-stage"
        aria-label={
          activeView === 'design-system'
            ? 'Design system preview'
            : 'Prototype preview'
        }
      >
        <div
          className={
            activeView === 'design-system'
              ? 'workbench-stage__canvas workbench-stage__canvas--design-system'
              : 'workbench-stage__canvas'
          }
        >
          {activeView === 'design-system' ? (
            <DesignSystemPanel />
          ) : (
            <ActivePrototypeComponent mode="full" />
          )}
        </div>
      </section>
    </main>
  )
}
