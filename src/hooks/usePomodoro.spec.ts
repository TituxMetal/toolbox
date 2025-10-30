/// <reference lib="dom" />

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'bun:test'

import { usePomodoro } from './usePomodoro'

describe('usePomodoro', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear()
  })

  afterEach(() => {
    // Cleanup is handled by @testing-library/react
  })

  describe('Hook Export', () => {
    it('exports usePomodoro hook as function', () => {
      expect(typeof usePomodoro).toBe('function')
      expect(usePomodoro).toBeTruthy()
    })
  })

  describe('Initial State', () => {
    it('initializes with default work session', () => {
      const { result } = renderHook(() => usePomodoro())

      expect(result.current.sessionType).toBe('work')
      expect(result.current.isRunning).toBe(false)
      expect(result.current.sessionsCompleted).toBe(0)
      expect(result.current.totalSessions).toBe(0)
      expect(result.current.timeLeft).toBe(25 * 60) // 25 minutes default
    })

    it('initializes with custom config from parameter', () => {
      const { result } = renderHook(() =>
        usePomodoro({
          workDuration: 30 * 60,
          shortBreakDuration: 10 * 60
        })
      )

      expect(result.current.timeLeft).toBe(30 * 60)
      expect(result.current.config.workDuration).toBe(30 * 60)
      expect(result.current.config.shortBreakDuration).toBe(10 * 60)
    })

    it('initializes with custom config from preferences in localStorage', () => {
      // Save custom preferences to localStorage
      localStorage.setItem(
        'pomodoro_preferences',
        JSON.stringify({
          audioNotifications: true,
          browserNotifications: false,
          audioVolume: 0.5,
          customConfig: {
            workDuration: 2 * 60, // 2 minutes
            shortBreakDuration: 1 * 60, // 1 minute
            longBreakDuration: 3 * 60 // 3 minutes
          }
        })
      )

      const { result } = renderHook(() => usePomodoro())

      // Should use custom config from preferences
      expect(result.current.timeLeft).toBe(2 * 60)
      expect(result.current.config.workDuration).toBe(2 * 60)
      expect(result.current.config.shortBreakDuration).toBe(1 * 60)
      expect(result.current.config.longBreakDuration).toBe(3 * 60)
    })

    it('parameter config overrides preferences config', () => {
      // Save custom preferences to localStorage
      localStorage.setItem(
        'pomodoro_preferences',
        JSON.stringify({
          audioNotifications: true,
          browserNotifications: false,
          audioVolume: 0.5,
          customConfig: {
            workDuration: 2 * 60 // 2 minutes from preferences
          }
        })
      )

      // Pass different config as parameter
      const { result } = renderHook(() =>
        usePomodoro({
          workDuration: 5 * 60 // 5 minutes from parameter
        })
      )

      // Parameter should override preferences
      expect(result.current.timeLeft).toBe(5 * 60)
      expect(result.current.config.workDuration).toBe(5 * 60)
    })

    it('calculates progress correctly', () => {
      const { result } = renderHook(() => usePomodoro())

      expect(result.current.progress).toBe(0) // No time elapsed yet
    })

    it('formats time correctly', () => {
      const { result } = renderHook(() => usePomodoro())

      expect(result.current.formattedTime).toBe('25:00')
    })
  })

  describe('Timer Controls', () => {
    it('starts timer when toggleTimer is called', () => {
      const { result } = renderHook(() => usePomodoro())

      expect(result.current.isRunning).toBe(false)

      act(() => {
        result.current.toggleTimer()
      })

      expect(result.current.isRunning).toBe(true)
    })

    it('pauses timer when toggleTimer is called while running', () => {
      const { result } = renderHook(() => usePomodoro())

      act(() => {
        result.current.toggleTimer()
      })

      expect(result.current.isRunning).toBe(true)

      act(() => {
        result.current.toggleTimer()
      })

      expect(result.current.isRunning).toBe(false)
    })

    it('resets timer to session duration', () => {
      const { result } = renderHook(() => usePomodoro())

      // Start timer
      act(() => {
        result.current.toggleTimer()
      })

      // Reset timer
      act(() => {
        result.current.resetTimer()
      })

      expect(result.current.timeLeft).toBe(25 * 60)
      expect(result.current.isRunning).toBe(false)
    })

    it('skips to next session', () => {
      const { result } = renderHook(() => usePomodoro())

      expect(result.current.sessionType).toBe('work')

      act(() => {
        result.current.skipSession()
      })

      // When sessionsCompleted is 0, 0 % 4 === 0, so it goes to longBreak
      expect(result.current.sessionType).toBe('longBreak')
      expect(result.current.isRunning).toBe(false)
      expect(result.current.totalSessions).toBe(1)
    })

    it('resets all progress', () => {
      const { result } = renderHook(() => usePomodoro())

      // Complete some sessions
      act(() => {
        result.current.skipSession()
        result.current.skipSession()
      })

      expect(result.current.totalSessions).toBeGreaterThan(0)

      act(() => {
        result.current.resetAll()
      })

      expect(result.current.sessionType).toBe('work')
      expect(result.current.sessionsCompleted).toBe(0)
      expect(result.current.totalSessions).toBe(0)
      expect(result.current.timeLeft).toBe(25 * 60)
      expect(result.current.isRunning).toBe(false)
    })
  })

  describe('Session Transitions', () => {
    it('transitions from work to long break when sessionsCompleted is 0', () => {
      const { result } = renderHook(() => usePomodoro())

      expect(result.current.sessionType).toBe('work')
      expect(result.current.sessionsCompleted).toBe(0)

      act(() => {
        result.current.skipSession()
      })

      // When sessionsCompleted is 0, 0 % 4 === 0, so it goes to long break
      expect(result.current.sessionType).toBe('longBreak')
    })

    it('transitions from long break back to work', () => {
      const { result } = renderHook(() => usePomodoro())

      act(() => {
        result.current.skipSession() // work -> longBreak (0 % 4 === 0)
      })

      expect(result.current.sessionType).toBe('longBreak')

      act(() => {
        result.current.skipSession() // longBreak -> work
      })

      expect(result.current.sessionType).toBe('work')
    })

    it('transitions to short break after first completed work session', () => {
      const { result } = renderHook(() =>
        usePomodoro({
          sessionsBeforeLongBreak: 4
        })
      )

      // Skip to long break first (0 % 4 === 0)
      act(() => {
        result.current.skipSession() // work -> longBreak
        result.current.skipSession() // longBreak -> work
        result.current.skipSession() // work -> longBreak (still 0 completed)
      })

      expect(result.current.sessionType).toBe('longBreak')
    })

    it('increments sessionsCompleted only for work sessions', () => {
      const { result } = renderHook(() => usePomodoro())

      expect(result.current.sessionsCompleted).toBe(0)

      act(() => {
        result.current.skipSession() // work -> shortBreak
      })
      expect(result.current.sessionsCompleted).toBe(0)

      act(() => {
        result.current.skipSession() // shortBreak -> work
      })
      expect(result.current.sessionsCompleted).toBe(0)

      act(() => {
        result.current.skipSession() // work -> shortBreak
      })
      expect(result.current.sessionsCompleted).toBe(0)
    })
  })
})
