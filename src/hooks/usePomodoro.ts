/**
 * usePomodoro Hook
 *
 * Custom hook for managing Pomodoro timer state and logic
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useInterval } from '~/hooks/useInterval'
import { updateBreakStats, updateWorkStats } from '~/stores/statsStore'
import type { PomodoroConfig, PomodoroState, SessionHistoryEntry, SessionType } from '~/types'
import { DEFAULT_POMODORO_CONFIG } from '~/types'
import { getAudioManager, getBeepGenerator } from '~/utils/audio'
import { getNotificationManager } from '~/utils/notifications'
import {
  clearTimerState,
  loadPreferences,
  loadTimerState,
  saveSessionToHistory,
  saveTimerState
} from '~/utils/storage'
import { formatTime, generateId, getCurrentTimestamp } from '~/utils/time'

/**
 * Custom hook for Pomodoro timer functionality
 *
 * Provides complete timer logic including:
 * - Timer state management (time, session type, running status)
 * - Session transitions (work -> break -> work)
 * - Audio notifications for session changes
 * - Browser notifications with permission handling
 * - Data persistence via localStorage
 * - Statistics tracking and session history
 * - Background timer support using Page Visibility API
 *
 * @param config - Optional configuration to override default timer durations
 * @returns Object containing timer state and control functions
 *
 * @example
 * ```tsx
 * const {
 *   timeLeft,
 *   isRunning,
 *   sessionType,
 *   sessionsCompleted,
 *   toggleTimer,
 *   resetTimer,
 *   skipSession
 * } = usePomodoro({
 *   workDuration: 30 * 60, // 30 minutes
 *   shortBreakDuration: 10 * 60 // 10 minutes
 * })
 * ```
 */
export const usePomodoro = (config: Partial<PomodoroConfig> = {}) => {
  // Refs for persistence and managers
  const sessionStartTimeRef = useRef<Date | null>(null)
  const lastUpdateTimeRef = useRef<Date | null>(null)
  const audioManagerRef = useRef(getAudioManager())
  const beepGeneratorRef = useRef(getBeepGenerator())
  const notificationManagerRef = useRef(getNotificationManager())

  // Initialize state with config from preferences
  const [state, setState] = useState<PomodoroState>(() => {
    // Load user preferences and merge with default config
    const preferences = loadPreferences()
    const customConfig = preferences.customConfig || {}

    // Merge: DEFAULT_POMODORO_CONFIG <- customConfig from preferences <- config parameter
    const finalConfig = { ...DEFAULT_POMODORO_CONFIG, ...customConfig, ...config }

    // Try to load saved state
    const savedState = loadTimerState()
    if (savedState) {
      return {
        timeLeft: savedState.timeLeft ?? finalConfig.workDuration,
        isRunning: false, // Never auto-resume on load
        sessionType: savedState.sessionType ?? 'work',
        sessionsCompleted: savedState.sessionsCompleted ?? 0,
        totalSessions: savedState.totalSessions ?? 0
      }
    }

    // Default initial state
    return {
      timeLeft: finalConfig.workDuration,
      isRunning: false,
      sessionType: 'work',
      sessionsCompleted: 0,
      totalSessions: 0
    }
  })

  // Load final config (needs to be outside useState initializer for use in callbacks)
  // Memoize to prevent unnecessary re-renders and event listener re-registration
  const preferences = loadPreferences()
  const customConfig = preferences.customConfig || {}
  const finalConfig = useMemo(
    () => ({ ...DEFAULT_POMODORO_CONFIG, ...customConfig, ...config }),
    [customConfig, config]
  )

  // Update audio manager with user preferences
  useEffect(() => {
    audioManagerRef.current.setVolume(preferences.audioVolume)
    audioManagerRef.current.setEnabled(preferences.audioNotifications)
  }, [preferences.audioVolume, preferences.audioNotifications])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveTimerState(state)
  }, [state])

  // Get the duration for the current session type
  const getSessionDuration = useCallback(
    (sessionType: SessionType): number => {
      switch (sessionType) {
        case 'work':
          return finalConfig.workDuration
        case 'shortBreak':
          return finalConfig.shortBreakDuration
        case 'longBreak':
          return finalConfig.longBreakDuration
        default:
          return finalConfig.workDuration
      }
    },
    [finalConfig]
  )

  // Get the next session type based on current type and completed sessions
  const getNextSessionType = useCallback(
    (currentType: SessionType, completedSessions: number): SessionType => {
      const sessionTransitions = {
        work: () =>
          completedSessions % finalConfig.sessionsBeforeLongBreak === 0
            ? ('longBreak' as const)
            : ('shortBreak' as const),
        shortBreak: () => 'work' as const,
        longBreak: () => 'work' as const
      }

      return sessionTransitions[currentType]()
    },
    [finalConfig.sessionsBeforeLongBreak]
  )

  // Handle session completion
  const completeSession = useCallback(async () => {
    const currentTime = getCurrentTimestamp()
    const sessionStartTime = sessionStartTimeRef.current || currentTime

    // Create session history entry
    const sessionEntry: SessionHistoryEntry = {
      id: generateId(),
      sessionType: state.sessionType,
      startTime: sessionStartTime,
      endTime: currentTime,
      duration: getSessionDuration(state.sessionType),
      completed: true
    }

    // Save to history
    saveSessionToHistory(sessionEntry)

    // Update statistics using Nanostores
    const sessionDuration = getSessionDuration(state.sessionType)

    if (state.sessionType === 'work') {
      updateWorkStats(sessionDuration)
    } else {
      updateBreakStats(sessionDuration)
    }

    // Play completion sound and show notification
    try {
      await audioManagerRef.current[state.sessionType === 'work' ? 'playWorkEnd' : 'playBreakEnd']()
      await notificationManagerRef.current.notifySessionEvent(state.sessionType, 'end')
    } catch (error) {
      // Fallback to beep
      await beepGeneratorRef.current.playSuccess()
    }

    // Transition to next session
    const nextSessionType = getNextSessionType(
      state.sessionType,
      state.sessionType === 'work' ? state.sessionsCompleted + 1 : state.sessionsCompleted
    )

    setState(prev => ({
      ...prev,
      sessionType: nextSessionType,
      timeLeft: getSessionDuration(nextSessionType),
      sessionsCompleted:
        prev.sessionType === 'work' ? prev.sessionsCompleted + 1 : prev.sessionsCompleted,
      totalSessions: prev.totalSessions + 1,
      isRunning: false // Stop timer after completion
    }))

    // Reset session start time
    sessionStartTimeRef.current = null
  }, [state.sessionType, state.sessionsCompleted, getSessionDuration, getNextSessionType])

  // Timer interval using custom useInterval hook
  useInterval(
    () => {
      setState(prev => {
        const newTimeLeft = prev.timeLeft - 1

        if (newTimeLeft <= 0) {
          // Session completed
          completeSession()
          return prev // completeSession will update state
        }

        return {
          ...prev,
          timeLeft: newTimeLeft
        }
      })

      lastUpdateTimeRef.current = new Date()
    },
    // Only run interval when timer is running and time is left
    state.isRunning && state.timeLeft > 0 ? 1000 : null
  )

  // Page Visibility API - handle background timer
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is now hidden - timer continues in background
        return
      }

      // Page is now visible - sync timer with actual elapsed time
      if (state.isRunning && lastUpdateTimeRef.current) {
        const now = new Date()
        const elapsedSeconds = Math.floor(
          (now.getTime() - lastUpdateTimeRef.current.getTime()) / 1000
        )

        if (elapsedSeconds > 1) {
          // Significant time has passed, update timer
          setState(prev => {
            const newTimeLeft = Math.max(0, prev.timeLeft - elapsedSeconds)

            if (newTimeLeft <= 0) {
              // Session should have completed while in background
              completeSession()
              return prev
            }

            return {
              ...prev,
              timeLeft: newTimeLeft
            }
          })
        }

        lastUpdateTimeRef.current = now
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [state.isRunning, state.timeLeft, completeSession])

  // Toggle timer (start/pause)
  const toggleTimer = useCallback(async () => {
    setState(prev => {
      const newIsRunning = !prev.isRunning

      if (newIsRunning) {
        // Starting timer
        sessionStartTimeRef.current = getCurrentTimestamp()

        // Play start sound and show notification (async operations handled separately)
        const playStartNotifications = async () => {
          try {
            await audioManagerRef.current[
              prev.sessionType === 'work' ? 'playWorkStart' : 'playBreakStart'
            ]()
            await notificationManagerRef.current.notifySessionEvent(prev.sessionType, 'start')
          } catch (error) {
            // Fallback to beep
            beepGeneratorRef.current.playNotification()
          }
        }

        // Execute async operations without blocking state update
        playStartNotifications()
      }

      return {
        ...prev,
        isRunning: newIsRunning
      }
    })
  }, [])

  // Reset timer to current session's full duration
  const resetTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      timeLeft: getSessionDuration(prev.sessionType),
      isRunning: false
    }))

    sessionStartTimeRef.current = null
  }, [getSessionDuration])

  // Skip to next session
  const skipSession = useCallback(() => {
    const nextSessionType = getNextSessionType(state.sessionType, state.sessionsCompleted)

    setState(prev => ({
      ...prev,
      sessionType: nextSessionType,
      timeLeft: getSessionDuration(nextSessionType),
      totalSessions: prev.totalSessions + 1,
      isRunning: false
    }))

    sessionStartTimeRef.current = null
  }, [state.sessionType, state.sessionsCompleted, getNextSessionType, getSessionDuration])

  // Reset all progress
  const resetAll = useCallback(() => {
    setState({
      timeLeft: finalConfig.workDuration,
      isRunning: false,
      sessionType: 'work',
      sessionsCompleted: 0,
      totalSessions: 0
    })

    sessionStartTimeRef.current = null
    clearTimerState()
  }, [finalConfig.workDuration])

  // Get current session duration
  const sessionDuration = getSessionDuration(state.sessionType)

  return {
    // State
    ...state,
    sessionDuration,

    // Computed values
    progress: ((sessionDuration - state.timeLeft) / sessionDuration) * 100,
    formattedTime: formatTime(state.timeLeft),

    // Actions
    toggleTimer,
    resetTimer,
    skipSession,
    resetAll,

    // Utilities
    formatTime,

    // Config
    config: finalConfig
  }
}
