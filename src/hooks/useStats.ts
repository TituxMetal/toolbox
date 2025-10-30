/**
 * useStats Hook
 *
 * Custom hook for accessing and managing Pomodoro statistics using Nanostores
 */

import { useStore } from '@nanostores/react'

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

/**
 * Hook return type
 */
export interface UseStatsReturn {
  /** Current statistics */
  stats: PomodoroStats
  /** Update work session stats */
  updateWorkStats: (duration: number) => void
  /** Update break session stats */
  updateBreakStats: (duration: number) => void
  /** Reset current streak */
  resetStreak: () => void
  /** Reset all statistics */
  resetStats: () => void
  /** Reset daily statistics */
  resetDailyStats: () => void
  /** Reset weekly statistics */
  resetWeeklyStats: () => void
  /** Save stats to storage */
  saveStats: () => void
  /** Load stats from storage */
  loadStats: () => void
}

/**
 * Custom hook for managing Pomodoro statistics
 *
 * Provides reactive access to statistics stored in Nanostores
 * and helper functions for updating stats
 *
 * @returns Object containing stats and update functions
 *
 * @example
 * ```tsx
 * const {
 *   stats,
 *   updateWorkStats,
 *   updateBreakStats,
 *   resetStats
 * } = useStats()
 *
 * // Update stats after completing a work session
 * updateWorkStats(1500) // 25 minutes in seconds
 *
 * // Display stats
 * console.log(stats.totalWorkSessions)
 * ```
 */
export const useStats = (): UseStatsReturn => {
  // Subscribe to stats store
  const stats = useStore($stats)

  return {
    stats,
    updateWorkStats,
    updateBreakStats,
    resetStreak,
    resetStats,
    resetDailyStats,
    resetWeeklyStats,
    saveStats,
    loadStats: loadStatsFromStorage
  }
}
