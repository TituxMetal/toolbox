/**
 * Stats Store
 *
 * Nanostores-based reactive state management for Pomodoro statistics
 */

import { atom } from 'nanostores'

import type { PomodoroStats } from '~/types'
import { loadStats, saveStats as saveStatsToStorage } from '~/utils/storage'

/**
 * Default statistics values
 */
const DEFAULT_STATS: PomodoroStats = {
  totalWorkSessions: 0,
  totalWorkTime: 0,
  totalBreakSessions: 0,
  totalBreakTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  todaySessions: 0,
  weekSessions: 0
}

/**
 * Stats atom - reactive store for Pomodoro statistics
 * Initialized with stats from localStorage
 */
export const $stats = atom<PomodoroStats>(loadStats())

/**
 * Load stats from localStorage and update the store
 */
export const loadStatsFromStorage = (): void => {
  $stats.set(loadStats())
}

/**
 * Save current stats to localStorage
 */
export const saveStats = (): void => {
  saveStatsToStorage($stats.get())
}

/**
 * Update work session stats
 * @param duration - Duration of the work session in seconds
 */
export const updateWorkStats = (duration: number): void => {
  const stats = $stats.get()
  $stats.set({
    ...stats,
    totalWorkSessions: stats.totalWorkSessions + 1,
    totalWorkTime: stats.totalWorkTime + duration,
    currentStreak: stats.currentStreak + 1,
    longestStreak: Math.max(stats.longestStreak, stats.currentStreak + 1),
    todaySessions: stats.todaySessions + 1,
    weekSessions: stats.weekSessions + 1
  })
  saveStats()
}

/**
 * Update break session stats
 * @param duration - Duration of the break session in seconds
 */
export const updateBreakStats = (duration: number): void => {
  const stats = $stats.get()
  $stats.set({
    ...stats,
    totalBreakSessions: stats.totalBreakSessions + 1,
    totalBreakTime: stats.totalBreakTime + duration,
    todaySessions: stats.todaySessions + 1,
    weekSessions: stats.weekSessions + 1
  })
  saveStats()
}

/**
 * Reset current streak to 0
 */
export const resetStreak = (): void => {
  const stats = $stats.get()
  $stats.set({
    ...stats,
    currentStreak: 0
  })
  saveStats()
}

/**
 * Reset all statistics to default values
 */
export const resetStats = (): void => {
  $stats.set(DEFAULT_STATS)
  saveStats()
}

/**
 * Reset daily statistics (todaySessions)
 */
export const resetDailyStats = (): void => {
  const stats = $stats.get()
  $stats.set({
    ...stats,
    todaySessions: 0
  })
  saveStats()
}

/**
 * Reset weekly statistics (weekSessions)
 */
export const resetWeeklyStats = (): void => {
  const stats = $stats.get()
  $stats.set({
    ...stats,
    weekSessions: 0
  })
  saveStats()
}
