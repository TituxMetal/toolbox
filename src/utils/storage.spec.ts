import { afterEach, beforeEach, describe, expect, it } from 'bun:test'

import {
  clearAllData,
  clearPreferences,
  clearSessionHistory,
  clearTimerState,
  getStorageSize,
  isStorageAvailable,
  loadPreferences,
  loadSessionHistory,
  loadStats,
  loadTimerState,
  savePreferences,
  saveSessionToHistory,
  saveStats,
  saveTimerState
} from './storage'

describe('storage utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    // Clean up after each test
    localStorage.clear()
  })

  describe('timer state management', () => {
    it('saves and loads timer state', () => {
      const state = {
        timeLeft: 1500,
        sessionType: 'work' as const,
        isRunning: false,
        sessionsCompleted: 2,
        totalSessions: 4
      }

      saveTimerState(state)
      const loaded = loadTimerState()
      expect(loaded).toEqual(state)
    })

    it('returns null when no timer state exists', () => {
      const loaded = loadTimerState()
      expect(loaded).toBeNull()
    })

    it('clears timer state', () => {
      const state = {
        timeLeft: 1500,
        sessionType: 'work' as const,
        isRunning: false,
        sessionsCompleted: 2,
        totalSessions: 4
      }

      saveTimerState(state)
      clearTimerState()

      expect(loadTimerState()).toBeNull()
    })
  })

  describe('preferences management', () => {
    it('saves and loads preferences', () => {
      const preferences = {
        audioNotifications: false,
        browserNotifications: true,
        audioVolume: 0.8
      }

      savePreferences(preferences)
      const loaded = loadPreferences()
      expect(loaded).toEqual(preferences)
    })

    it('returns default preferences when none exist', () => {
      const loaded = loadPreferences()
      expect(loaded).toEqual({
        audioNotifications: true,
        browserNotifications: false,
        audioVolume: 0.5
      })
    })

    it('clears preferences', () => {
      const preferences = {
        audioNotifications: false,
        browserNotifications: true,
        audioVolume: 0.8
      }

      savePreferences(preferences)
      clearPreferences()

      expect(loadPreferences()).toEqual({
        audioNotifications: true,
        browserNotifications: false,
        audioVolume: 0.5
      })
    })
  })

  describe('session history management', () => {
    it('saves and loads session history', () => {
      const session = {
        id: 'test-id',
        sessionType: 'work' as const,
        startTime: new Date('2024-01-15T10:00:00'),
        endTime: new Date('2024-01-15T10:25:00'),
        duration: 1500,
        completed: true
      }

      saveSessionToHistory(session)
      const history = loadSessionHistory()
      expect(history).toHaveLength(1)
      expect(history[0]).toEqual({
        id: 'test-id',
        sessionType: 'work',
        startTime: expect.any(Date),
        endTime: expect.any(Date),
        duration: 1500,
        completed: true
      })
    })

    it('limits history to 1000 entries', () => {
      // Create 1001 sessions
      for (let i = 0; i < 1001; i++) {
        const session = {
          id: `test-id-${i}`,
          sessionType: 'work' as const,
          startTime: new Date(),
          endTime: new Date(),
          duration: 1500,
          completed: true
        }
        saveSessionToHistory(session)
      }

      const history = loadSessionHistory()
      expect(history).toHaveLength(1000)
      expect(history[0].id).toBe('test-id-1') // First entry should be removed
    })

    it('clears session history', () => {
      const session = {
        id: 'test-id',
        sessionType: 'work' as const,
        startTime: new Date(),
        endTime: new Date(),
        duration: 1500,
        completed: true
      }

      saveSessionToHistory(session)
      clearSessionHistory()

      expect(loadSessionHistory()).toEqual([])
    })
  })

  describe('statistics management', () => {
    it('saves and loads statistics', () => {
      const stats = {
        totalWorkSessions: 10,
        totalWorkTime: 15000,
        totalBreakSessions: 8,
        totalBreakTime: 2400,
        currentStreak: 3,
        longestStreak: 5,
        todaySessions: 2,
        weekSessions: 12
      }

      saveStats(stats)
      const loaded = loadStats()
      expect(loaded).toEqual(stats)
    })

    it('returns default statistics when none exist', () => {
      const loaded = loadStats()
      expect(loaded).toEqual({
        totalWorkSessions: 0,
        totalWorkTime: 0,
        totalBreakSessions: 0,
        totalBreakTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        todaySessions: 0,
        weekSessions: 0
      })
    })
  })

  describe('utility functions', () => {
    it('clears all data', () => {
      // Add some data
      saveTimerState({
        timeLeft: 1500,
        sessionType: 'work',
        isRunning: false,
        sessionsCompleted: 2,
        totalSessions: 4
      })
      savePreferences({
        audioNotifications: false,
        browserNotifications: true,
        audioVolume: 0.8
      })

      clearAllData()

      expect(loadTimerState()).toBeNull()
      expect(loadPreferences()).toEqual({
        audioNotifications: true,
        browserNotifications: false,
        audioVolume: 0.5
      })
    })

    it('checks if storage is available', () => {
      expect(isStorageAvailable()).toBe(true)
    })

    it('handles storage unavailable', () => {
      const originalSetItem = localStorage.setItem
      localStorage.setItem = () => {
        throw new Error('Storage not available')
      }

      expect(isStorageAvailable()).toBe(false)

      localStorage.setItem = originalSetItem
    })

    it('calculates storage size', () => {
      const timerState = {
        timeLeft: 1500,
        sessionType: 'work' as const,
        isRunning: false,
        sessionsCompleted: 2,
        totalSessions: 4
      }
      saveTimerState(timerState)

      const size = getStorageSize()
      expect(size).toBeGreaterThan(0)
    })
  })

  describe('error handling', () => {
    it('handles JSON parse errors gracefully', () => {
      // Set invalid JSON in localStorage
      localStorage.setItem('pomodoro_timer_state', 'invalid json')

      expect(loadTimerState()).toBeNull()

      localStorage.setItem('pomodoro_preferences', 'invalid json')
      expect(loadPreferences()).toEqual({
        audioNotifications: true,
        browserNotifications: false,
        audioVolume: 0.5
      })
    })

    it('handles storage errors gracefully', () => {
      // Save original setItem
      const originalSetItem = localStorage.setItem

      // Mock setItem to throw
      localStorage.setItem = () => {
        throw new Error('Storage error')
      }

      // Should not throw
      expect(() => {
        saveTimerState({
          timeLeft: 1500,
          sessionType: 'work',
          isRunning: false,
          sessionsCompleted: 2,
          totalSessions: 4
        })
      }).not.toThrow()

      // Restore original setItem
      localStorage.setItem = originalSetItem
    })
  })
})
