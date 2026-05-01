import { type KeyboardEvent, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './app-shell.css'
import { type PrototypeDefinition, prototypeRegistry } from './prototype-registry'
import { ComponentLibraryPanel } from './ComponentLibraryPanel'
import { LiquidGlassCursor } from '../system'

const initialSearchParams = new URLSearchParams(window.location.search)
const scriptedDemoId = initialSearchParams.get('scripted')
const initialScriptedPrototype = scriptedDemoId
  ? prototypeRegistry.find(
      (prototype) =>
        prototype.previewModes?.scripted?.script.id === scriptedDemoId,
    )
  : undefined
const shouldStartScripted = Boolean(initialScriptedPrototype)
const initialPrototypeId = shouldStartScripted
  ? initialScriptedPrototype?.id
  : initialSearchParams.get('prototype')
const newestPrototype = prototypeRegistry[prototypeRegistry.length - 1]
const newestFirstPrototypeRegistry = [...prototypeRegistry].reverse()

type DemoMode = 'live' | 'scripted'
type ScriptPlaybackStatus = 'idle' | 'running' | 'complete'

function getPrototypeModeOptions(prototype: PrototypeDefinition) {
  const modeOptions: Array<{
    id: DemoMode
    label: string
  }> = []

  if (prototype.previewModes?.live !== undefined || !prototype.previewModes) {
    modeOptions.push({
      id: 'live',
      label: prototype.previewModes?.live?.label ?? 'Live',
    })
  }

  if (prototype.previewModes?.scripted) {
    modeOptions.push({
      id: 'scripted',
      label: prototype.previewModes.scripted.label ?? 'Scripted',
    })
  }

  return modeOptions
}

function prototypeSupportsMode(
  prototype: PrototypeDefinition | undefined,
  mode: DemoMode,
) {
  if (!prototype) {
    return false
  }

  return getPrototypeModeOptions(prototype).some((option) => option.id === mode)
}

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
      : newestPrototype?.id ?? '',
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
      newestPrototype,
    [activePrototypeId],
  )

  const activeScript = useMemo(() => {
    if (!activePrototype || demoMode !== 'scripted') {
      return undefined
    }

    const script = activePrototype.previewModes?.scripted?.script

    if (!script) {
      return undefined
    }

    return {
      ...script,
      id: `${script.id}-${scriptRunId}`,
    }
  }, [activePrototype?.id, demoMode, scriptRunId])

  const activeModeOptions = useMemo(
    () => (activePrototype ? getPrototypeModeOptions(activePrototype) : []),
    [activePrototype],
  )

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
    if (!prototypeSupportsMode(activePrototype, nextMode)) {
      return
    }

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

  const selectPrototype = (prototypeId: string) => {
    const nextPrototype = prototypeRegistry.find(
      (prototype) => prototype.id === prototypeId,
    )

    setActivePrototypeId(prototypeId)
    setActiveView('prototype')

    if (!prototypeSupportsMode(nextPrototype, demoMode)) {
      setDemoMode('live')
      scriptStartedAtRef.current = null
      setScriptPlayback({
        elapsedMs: 0,
        status: 'idle',
      })
    } else if (demoMode === 'scripted') {
      setScriptRunId((currentRunId) => currentRunId + 1)
    }
  }

  const handlePrototypeKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    prototypeId: string,
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    selectPrototype(prototypeId)
  }

  if (!activePrototype) {
    return null
  }

  const ActivePrototypeComponent = activePrototype.Component
  const shouldShowModeToggle =
    activeView === 'prototype' && activeModeOptions.length > 1

  return (
    <main className="workbench-shell">
      <LiquidGlassCursor
        active={activeView === 'prototype'}
        onScriptComplete={handleScriptComplete}
        onScriptStart={handleScriptStart}
        script={activeScript}
      />

      {shouldShowModeToggle ? (
        <div className="workbench-entry-toggle" aria-label="Preview mode">
          {activeModeOptions.map((modeOption) => (
            <button
              key={modeOption.id}
              type="button"
              className={
                demoMode === modeOption.id
                  ? 'workbench-entry-toggle__button workbench-entry-toggle__button--active'
                  : 'workbench-entry-toggle__button'
              }
              aria-pressed={demoMode === modeOption.id}
              data-script-entry={modeOption.id}
              onClick={() => selectDemoMode(modeOption.id)}
            >
              {modeOption.label}
            </button>
          ))}
          {demoMode === 'scripted' ? (
            <span className="workbench-entry-toggle__elapsed" data-script-elapsed>
              {scriptPlayback.status === 'complete' ? 'Total' : 'Time'}{' '}
              {formatElapsedTime(scriptPlayback.elapsedMs)}
            </span>
          ) : null}
        </div>
      ) : null}

      <aside className="workbench-sidebar">
        <div className="workbench-sidebar__header">
          <p className="workbench-sidebar__eyebrow">Prototypes</p>
          <h1 className="workbench-sidebar__title">Preview</h1>
        </div>

        <div className="workbench-sidebar__nav-scroll">
          <nav className="prototype-list" aria-label="Available prototypes">
            {newestFirstPrototypeRegistry.map((prototype) => {
              const isActive = prototype.id === activePrototype.id
              const PreviewComponent = prototype.Component

              return (
                <div
                  key={prototype.id}
                  role="button"
                  tabIndex={0}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    isActive
                      ? 'prototype-list__item prototype-list__item--active'
                      : 'prototype-list__item'
                  }
                  onClick={() => selectPrototype(prototype.id)}
                  onKeyDown={(event) => handlePrototypeKeyDown(event, prototype.id)}
                >
                  <span className="prototype-list__preview" aria-hidden="true">
                    <span className="prototype-list__preview-scale">
                      {isActive ? (
                        <Suspense fallback={null}>
                          <PreviewComponent mode="thumbnail" />
                        </Suspense>
                      ) : (
                        <span className="prototype-list__preview-placeholder" />
                      )}
                    </span>
                  </span>
                  <span className="prototype-list__name">{prototype.title}</span>
                </div>
              )
            })}
          </nav>

          <button
            type="button"
            className={
              activeView === 'component-library'
                ? 'workbench-sidebar__secondary-action workbench-sidebar__secondary-action--active'
                : 'workbench-sidebar__secondary-action'
            }
            onClick={() => setActiveView('component-library')}
          >
            Design system
          </button>
        </div>
      </aside>

      <section
        className={
          activeView === 'component-library'
            ? 'workbench-stage'
            : 'workbench-stage workbench-stage--prototype'
        }
        aria-label={
          activeView === 'component-library'
            ? 'Design system preview'
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
            <Suspense fallback={null}>
              <ActivePrototypeComponent
                key={`${activePrototype.id}-${demoMode}-${scriptRunId}`}
                mode="full"
              />
            </Suspense>
          )}
        </div>
      </section>
    </main>
  )
}
