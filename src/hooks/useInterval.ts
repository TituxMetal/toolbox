import { useEffect, useRef } from 'react'

/**
 * Custom hook for setting up intervals that properly handles cleanup and avoids stale closures.
 * Based on Dan Abramov's recommended pattern: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param callback - Function to call on each interval tick
 * @param delay - Delay in milliseconds, or null to pause the interval
 *
 * @example
 * ```tsx
 * useInterval(() => {
 *   setCount(count + 1)
 * }, 1000)
 * ```
 */
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    // Don't schedule if no delay is specified
    if (delay === null) {
      return
    }

    const id = setInterval(() => {
      savedCallback.current()
    }, delay)

    return () => {
      clearInterval(id)
    }
  }, [delay])
}
