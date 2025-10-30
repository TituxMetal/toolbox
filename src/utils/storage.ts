/**
 * Storage utility functions for the Pomodoro timer
 * Handles localStorage operations with error handling and type safety
 */

import type {
  PomodoroPreferences,
  PomodoroState,
  PomodoroStats,
  SessionHistoryEntry
} from '~/types'

// Storage keys
const STORAGE_KEYS = {
  TIMER_STATE: 'pomodoro_timer_state',
  PREFERENCES: 'pomodoro_preferences',
  SESSION_HISTORY: 'pomodoro_session_history',
  STATS: 'pomodoro_stats'
} as const

/**
 * Generic function to save data to localStorage
 * @param key - Storage key
 * @param data - Data to save
 */
const saveToStorage = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
  } catch (error) {
    console.error(`Failed to save to localStorage (${key}):`, error)
  }
}

/**
 * Generic function to load data from localStorage
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Parsed data or default value
 */
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedData = localStorage.getItem(key)
    if (serializedData === null) {
      return defaultValue
    }
    return JSON.parse(serializedData) as T
  } catch (error) {
    console.error(`Failed to load from localStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * Removes data from localStorage
 * @param key - Storage key
 */
const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Failed to remove from localStorage (${key}):`, error)
  }
}

/**
 * Saves the current timer state to localStorage
 * @param state - Timer state to save
 */
export const saveTimerState = (state: Partial<PomodoroState>): void => {
  saveToStorage(STORAGE_KEYS.TIMER_STATE, state)
}

/**
 * Loads the timer state from localStorage
 * @returns Saved timer state or null if not found
 */
export const loadTimerState = (): Partial<PomodoroState> | null => {
  const state = loadFromStorage<Partial<PomodoroState> | null>(STORAGE_KEYS.TIMER_STATE, null)
  return state
}

/**
 * Clears the saved timer state
 */
export const clearTimerState = (): void => {
  removeFromStorage(STORAGE_KEYS.TIMER_STATE)
}

/**
 * Saves user preferences to localStorage
 * @param preferences - Preferences to save
 */
export const savePreferences = (preferences: PomodoroPreferences): void => {
  saveToStorage(STORAGE_KEYS.PREFERENCES, preferences)
}

/**
 * Loads user preferences from localStorage
 * @returns Saved preferences or default preferences
 */
export const loadPreferences = (): PomodoroPreferences => {
  const defaultPreferences: PomodoroPreferences = {
    audioNotifications: true,
    browserNotifications: false,
    audioVolume: 0.5
  }

  return loadFromStorage(STORAGE_KEYS.PREFERENCES, defaultPreferences)
}

/**
 * Clears user preferences from localStorage
 */
export const clearPreferences = (): void => {
  removeFromStorage(STORAGE_KEYS.PREFERENCES)
}

/**
 * Saves a session to the history
 * @param session - Session to save
 */
export const saveSessionToHistory = (session: SessionHistoryEntry): void => {
  const history = loadSessionHistory()
  history.push(session)

  // Keep only the last 1000 sessions to prevent storage bloat
  const trimmedHistory = history.slice(-1000)

  saveToStorage(STORAGE_KEYS.SESSION_HISTORY, trimmedHistory)
}

/**
 * Loads session history from localStorage
 * @returns Array of session history entries
 */
export const loadSessionHistory = (): SessionHistoryEntry[] => {
  const history = loadFromStorage<SessionHistoryEntry[]>(STORAGE_KEYS.SESSION_HISTORY, [])

  // Convert date strings back to Date objects
  return history.map(session => ({
    ...session,
    startTime: new Date(session.startTime),
    endTime: new Date(session.endTime)
  }))
}

/**
 * Clears all session history
 */
export const clearSessionHistory = (): void => {
  removeFromStorage(STORAGE_KEYS.SESSION_HISTORY)
}

/**
 * Saves statistics to localStorage
 * @param stats - Statistics to save
 */
export const saveStats = (stats: PomodoroStats): void => {
  saveToStorage(STORAGE_KEYS.STATS, stats)
}

/**
 * Loads statistics from localStorage
 * @returns Saved statistics or default statistics
 */
export const loadStats = (): PomodoroStats => {
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

  return loadFromStorage(STORAGE_KEYS.STATS, defaultStats)
}

/**
 * Clears all stored data
 */
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeFromStorage(key)
  })
}

/**
 * Checks if localStorage is available
 * @returns True if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Gets the size of stored data in bytes (approximate)
 * @returns Approximate size in bytes
 */
export const getStorageSize = (): number => {
  let totalSize = 0

  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      const data = localStorage.getItem(key)
      if (data) {
        totalSize += data.length
      }
    })
  } catch (error) {
    console.error('Failed to calculate storage size:', error)
  }

  return totalSize
}
