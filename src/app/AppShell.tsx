import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './app-shell.css'
import { prototypeRegistry } from './prototype-registry'
import { ComponentLibraryPanel } from './ComponentLibraryPanel'
import { LiquidGlassCursor } from '../system'
import { interestProfilingScript } from '../prototypes/portfolio-2026/interest-profiling-script'

const initialSearchParams = new URLSearchParams(window.location.search)
const scriptedDemoId = initialSearchParams.get('scripted')
const shouldStartScripted = scriptedDemoId === interestProfilingScript.id
const initialPrototypeId = shouldStartScripted
  ? 'portfolio-2026'
  : initialSearchParams.get('prototype')

type DemoMode = 'live' | 'scripted'
type ScriptPlaybackStatus = 'idle' | 'running' | 'complete'

function formatElapsedTime(elapsedMs: number) {
  const totalTenths = Math.floor(elapsedMs / 100)
  const minutes = Math.floor(totalTenths / 600)
  const seconds = Math.floor((totalTenths % 600) / 10)
  const tenths = totalTenths % 10

  return `${minutes}:${String(seconds).padStart(2, '0')}.${tenths}`
}

export function AppShell() {
  const [activePrototypeId, setActivePrototypeId] = useState(
    prototypeRegistry.some((prototype) => prototype.id === initialPrototypeId)
      ? initialPrototypeId ?? ''
      : prototypeRegistry[0]?.id ?? '',
  )
  const [activeView, setActiveView] = useState<
    'prototype' | 'component-library'
  >('prototype')
  const [demoMode, setDemoMode] = useState<DemoMode>(
    shouldStartScripted ? 'scripted' : 'live',
  )
  const [scriptRunId, setScriptRunId] = useState(0)
  const [scriptPlayback, setScriptPlayback] = useState<{
    elapsedMs: number
    status: ScriptPlaybackStatus
  }>({
    elapsedMs: 0,
    status: 'idle',
  })
  const scriptStartedAtRef = useRef<number | null>(null)

  const activePrototype = useMemo(
    () =>
      prototypeRegistry.find((prototype) => prototype.id === activePrototypeId) ??
      prototypeRegistry[0],
    [activePrototypeId],
  )

  const activeScript = useMemo(() => {
    if (activePrototype?.id !== 'portfolio-2026' || demoMode !== 'scripted') {
      return undefined
    }

    return {
      ...interestProfilingScript,
      id: `${interestProfilingScript.id}-${scriptRunId}`,
    }
  }, [activePrototype?.id, demoMode, scriptRunId])

  useEffect(() => {
    if (scriptPlayback.status !== 'running') {
      return
    }

    const intervalId = window.setInterval(() => {
      if (scriptStartedAtRef.current === null) {
        return
      }

      setScriptPlayback({
        elapsedMs: performance.now() - scriptStartedAtRef.current,
        status: 'running',
      })
    }, 100)

    return () => window.clearInterval(intervalId)
  }, [scriptPlayback.status])

  useEffect(() => {
    if (activeScript) {
      return
    }

    scriptStartedAtRef.current = null
    setScriptPlayback({
      elapsedMs: 0,
      status: 'idle',
    })
  }, [activeScript])

  const handleScriptStart = useCallback(() => {
    scriptStartedAtRef.current = performance.now()
    setScriptPlayback({
      elapsedMs: 0,
      status: 'running',
    })
  }, [])

  const handleScriptComplete = useCallback(() => {
    const startedAt = scriptStartedAtRef.current

    if (startedAt === null) {
      return
    }

    setScriptPlayback({
      elapsedMs: performance.now() - startedAt,
      status: 'complete',
    })
    scriptStartedAtRef.current = null
  }, [])

  const selectDemoMode = (nextMode: DemoMode) => {
    setActivePrototypeId('portfolio-2026')
    setActiveView('prototype')
    setDemoMode(nextMode)

    if (nextMode === 'scripted') {
      setScriptRunId((currentRunId) => currentRunId + 1)
    } else {
      scriptStartedAtRef.current = null
      setScriptPlayback({
        elapsedMs: 0,
        status: 'idle',
      })
    }
  }

  if (!activePrototype) {
    return null
  }

  const ActivePrototypeComponent = activePrototype.Component
  const isPortfolioPrototypeActive =
    activeView === 'prototype' && activePrototype.id === 'portfolio-2026'

  return (
    <main className="workbench-shell">
      <LiquidGlassCursor
        active={activeView === 'prototype'}
        onScriptComplete={handleScriptComplete}
        onScriptStart={handleScriptStart}
        script={activeScript}
      />

      <div className="workbench-entry-toggle" aria-label="Preview mode">
        <button
          type="button"
          className={
            isPortfolioPrototypeActive && demoMode === 'live'
              ? 'workbench-entry-toggle__button workbench-entry-toggle__button--active'
              : 'workbench-entry-toggle__button'
          }
          aria-pressed={isPortfolioPrototypeActive && demoMode === 'live'}
          data-script-entry="live"
          onClick={() => selectDemoMode('live')}
        >
          Live
        </button>
        <button
          type="button"
          className={
            isPortfolioPrototypeActive && demoMode === 'scripted'
              ? 'workbench-entry-toggle__button workbench-entry-toggle__button--active'
              : 'workbench-entry-toggle__button'
          }
          aria-pressed={isPortfolioPrototypeActive && demoMode === 'scripted'}
          data-script-entry="scripted"
          onClick={() => selectDemoMode('scripted')}
        >
          Scripted
        </button>
        {isPortfolioPrototypeActive && demoMode === 'scripted' ? (
          <span className="workbench-entry-toggle__elapsed" data-script-elapsed>
            {scriptPlayback.status === 'complete' ? 'Total' : 'Time'}{' '}
            {formatElapsedTime(scriptPlayback.elapsedMs)}
          </span>
        ) : null}
      </div>

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
              activeView === 'component-library'
                ? 'workbench-sidebar__secondary-action workbench-sidebar__secondary-action--active'
                : 'workbench-sidebar__secondary-action'
            }
            onClick={() => setActiveView('component-library')}
          >
            Component libraries
          </button>
        </div>
      </aside>

      <section
        className="workbench-stage"
        aria-label={
          activeView === 'component-library'
            ? 'Component library preview'
            : 'Prototype preview'
        }
      >
        <div
          className={
            activeView === 'component-library'
              ? 'workbench-stage__canvas workbench-stage__canvas--component-library'
              : 'workbench-stage__canvas'
          }
        >
          {activeView === 'component-library' ? (
            <ComponentLibraryPanel />
          ) : (
            <ActivePrototypeComponent
              key={`${activePrototype.id}-${demoMode}-${scriptRunId}`}
              mode="full"
            />
          )}
        </div>
      </section>
    </main>
  )
}
