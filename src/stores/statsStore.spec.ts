/**
 * Stats Store Tests
 */

import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'

import {
  $stats,
  loadStatsFromStorage,
  resetDailyStats,
  resetStats,
  resetStreak,
  resetWeeklyStats,
  saveStats,
  updateBreakStats,
  updateWorkStats
} from '~/stores/statsStore'
import type { PomodoroStats } from '~/types'
import * as storage from '~/utils/storage'

describe('statsStore', () => {
  const mockStats: PomodoroStats = {
    totalWorkSessions: 10,
    totalWorkTime: 15000,
    totalBreakSessions: 8,
    totalBreakTime: 2400,
    currentStreak: 5,
    longestStreak: 10,
    todaySessions: 3,
    weekSessions: 15
  }

  const defaultStats: PomodoroStats = {
    totalWorkSessions: 0,
    totalWorkTime: 0,
    totalBreakSessions: 0,
    totalBreakTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    todaySessions: 0,
    weekSessions: 0
  }

  beforeEach(() => {
    // Reset store to default state
    $stats.set(defaultStats)
    // Mock storage functions
    mock.module('~/utils/storage', () => ({
      loadStats: mock(() => mockStats),
      saveStats: mock(() => {})
    }))
  })

  afterEach(() => {
    // Reset store to default state
    $stats.set(defaultStats)
  })

  describe('$stats atom', () => {
    it('exports $stats atom', () => {
      expect($stats).toBeDefined()
      expect(typeof $stats).toBe('object')
    })

    it('initializes with default stats', () => {
      const stats = $stats.get()
      expect(stats).toEqual(defaultStats)
    })

    it('can be updated', () => {
      $stats.set(mockStats)
      expect($stats.get()).toEqual(mockStats)
    })

    it('can be subscribed to', () => {
      let callCount = 0
      const unsubscribe = $stats.subscribe(() => {
        callCount++
      })

      // First call is immediate (current value)
      expect(callCount).toBe(1)

      $stats.set(mockStats)
      expect(callCount).toBe(2)

      unsubscribe()
      $stats.set(defaultStats)
      expect(callCount).toBe(2) // Should not increment after unsubscribe
    })
  })

  describe('loadStatsFromStorage', () => {
    it('exports loadStatsFromStorage function', () => {
      expect(loadStatsFromStorage).toBeDefined()
      expect(typeof loadStatsFromStorage).toBe('function')
    })

    it('loads stats from storage and updates store', () => {
      loadStatsFromStorage()
      expect($stats.get()).toEqual(mockStats)
    })
  })

  describe('saveStats', () => {
    it('exports saveStats function', () => {
      expect(saveStats).toBeDefined()
      expect(typeof saveStats).toBe('function')
    })

    it('saves current stats to storage', () => {
      $stats.set(mockStats)
      saveStats()
      expect(storage.saveStats).toHaveBeenCalledWith(mockStats)
    })
  })

  describe('updateWorkStats', () => {
    it('exports updateWorkStats function', () => {
      expect(updateWorkStats).toBeDefined()
      expect(typeof updateWorkStats).toBe('function')
    })

    it('increments work session count', () => {
      updateWorkStats(1500)
      const stats = $stats.get()
      expect(stats.totalWorkSessions).toBe(1)
    })

    it('adds work time', () => {
      updateWorkStats(1500)
      const stats = $stats.get()
      expect(stats.totalWorkTime).toBe(1500)
    })

    it('increments current streak', () => {
      updateWorkStats(1500)
      const stats = $stats.get()
      expect(stats.currentStreak).toBe(1)
    })

    it('updates longest streak', () => {
      updateWorkStats(1500)
      updateWorkStats(1500)
      updateWorkStats(1500)
      const stats = $stats.get()
      expect(stats.longestStreak).toBe(3)
    })

    it('increments today sessions', () => {
      updateWorkStats(1500)
      const stats = $stats.get()
      expect(stats.todaySessions).toBe(1)
    })

    it('increments week sessions', () => {
      updateWorkStats(1500)
      const stats = $stats.get()
      expect(stats.weekSessions).toBe(1)
    })

    it('saves stats to storage', () => {
      updateWorkStats(1500)
      expect(storage.saveStats).toHaveBeenCalled()
    })
  })

  describe('updateBreakStats', () => {
    it('exports updateBreakStats function', () => {
      expect(updateBreakStats).toBeDefined()
      expect(typeof updateBreakStats).toBe('function')
    })

    it('increments break session count', () => {
      updateBreakStats(300)
      const stats = $stats.get()
      expect(stats.totalBreakSessions).toBe(1)
    })

    it('adds break time', () => {
      updateBreakStats(300)
      const stats = $stats.get()
      expect(stats.totalBreakTime).toBe(300)
    })

    it('increments today sessions', () => {
      updateBreakStats(300)
      const stats = $stats.get()
      expect(stats.todaySessions).toBe(1)
    })

    it('increments week sessions', () => {
      updateBreakStats(300)
      const stats = $stats.get()
      expect(stats.weekSessions).toBe(1)
    })

    it('does not affect current streak', () => {
      updateBreakStats(300)
      const stats = $stats.get()
      expect(stats.currentStreak).toBe(0)
    })

    it('saves stats to storage', () => {
      updateBreakStats(300)
      expect(storage.saveStats).toHaveBeenCalled()
    })
  })

  describe('resetStreak', () => {
    it('exports resetStreak function', () => {
      expect(resetStreak).toBeDefined()
      expect(typeof resetStreak).toBe('function')
    })

    it('resets current streak to 0', () => {
      $stats.set({ ...defaultStats, currentStreak: 5 })
      resetStreak()
      const stats = $stats.get()
      expect(stats.currentStreak).toBe(0)
    })

    it('does not affect other stats', () => {
      $stats.set(mockStats)
      resetStreak()
      const stats = $stats.get()
      expect(stats.totalWorkSessions).toBe(mockStats.totalWorkSessions)
      expect(stats.longestStreak).toBe(mockStats.longestStreak)
    })

    it('saves stats to storage', () => {
      resetStreak()
      expect(storage.saveStats).toHaveBeenCalled()
    })
  })

  describe('resetStats', () => {
    it('exports resetStats function', () => {
      expect(resetStats).toBeDefined()
      expect(typeof resetStats).toBe('function')
    })

    it('resets all stats to default values', () => {
      $stats.set(mockStats)
      resetStats()
      expect($stats.get()).toEqual(defaultStats)
    })

    it('saves stats to storage', () => {
      resetStats()
      expect(storage.saveStats).toHaveBeenCalled()
    })
  })

  describe('resetDailyStats', () => {
    it('exports resetDailyStats function', () => {
      expect(resetDailyStats).toBeDefined()
      expect(typeof resetDailyStats).toBe('function')
    })

    it('resets today sessions to 0', () => {
      $stats.set({ ...defaultStats, todaySessions: 5 })
      resetDailyStats()
      const stats = $stats.get()
      expect(stats.todaySessions).toBe(0)
    })

    it('does not affect other stats', () => {
      $stats.set(mockStats)
      resetDailyStats()
      const stats = $stats.get()
      expect(stats.totalWorkSessions).toBe(mockStats.totalWorkSessions)
      expect(stats.weekSessions).toBe(mockStats.weekSessions)
    })

    it('saves stats to storage', () => {
      resetDailyStats()
      expect(storage.saveStats).toHaveBeenCalled()
    })
  })

  describe('resetWeeklyStats', () => {
    it('exports resetWeeklyStats function', () => {
      expect(resetWeeklyStats).toBeDefined()
      expect(typeof resetWeeklyStats).toBe('function')
    })

    it('resets week sessions to 0', () => {
      $stats.set({ ...defaultStats, weekSessions: 15 })
      resetWeeklyStats()
      const stats = $stats.get()
      expect(stats.weekSessions).toBe(0)
    })

    it('does not affect other stats', () => {
      $stats.set(mockStats)
      resetWeeklyStats()
      const stats = $stats.get()
      expect(stats.totalWorkSessions).toBe(mockStats.totalWorkSessions)
      expect(stats.todaySessions).toBe(mockStats.todaySessions)
    })

    it('saves stats to storage', () => {
      resetWeeklyStats()
      expect(storage.saveStats).toHaveBeenCalled()
    })
  })
})
