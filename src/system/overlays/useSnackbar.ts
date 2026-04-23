import { useEffect, useRef, useState } from 'react'

type SnackbarState = {
  message: string
  actionLabel?: string
}

export function useSnackbar(defaultDurationMs = 1600) {
  const timerRef = useRef<number | null>(null)
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  function hideSnackbar() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    setSnackbar(null)
  }

  function showSnackbar(nextSnackbar: SnackbarState, durationMs = defaultDurationMs) {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }

    setSnackbar(nextSnackbar)
    timerRef.current = window.setTimeout(() => {
      setSnackbar(null)
      timerRef.current = null
    }, durationMs)
  }

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  }
}
