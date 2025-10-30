/**
 * Pomodoro Timer Types
 *
 * Type definitions for the Pomodoro timer functionality
 */

/**
 * Types of Pomodoro sessions
 */
export type SessionType = 'work' | 'shortBreak' | 'longBreak'

/**
 * Current state of the Pomodoro timer
 */
export interface PomodoroState {
  /** Time remaining in current session (in seconds) */
  timeLeft: number
  /** Whether the timer is currently running */
  isRunning: boolean
  /** Current session type */
  sessionType: SessionType
  /** Number of work sessions completed */
  sessionsCompleted: number
  /** Total number of sessions (work + breaks) */
  totalSessions: number
}

/**
 * Configuration options for the Pomodoro timer
 */
export interface PomodoroConfig {
  /** Duration of work sessions in seconds (default: 25 minutes) */
  workDuration: number
  /** Duration of short breaks in seconds (default: 5 minutes) */
  shortBreakDuration: number
  /** Duration of long breaks in seconds (default: 15 minutes) */
  longBreakDuration: number
  /** Number of work sessions before a long break (default: 4) */
  sessionsBeforeLongBreak: number
}

/**
 * Default Pomodoro configuration
 */
export const DEFAULT_POMODORO_CONFIG: PomodoroConfig = {
  workDuration: 25 * 60, // 25 minutes
  shortBreakDuration: 5 * 60, // 5 minutes
  longBreakDuration: 15 * 60, // 15 minutes
  sessionsBeforeLongBreak: 4
}

/**
 * Session history entry
 */
export interface SessionHistoryEntry {
  /** Unique identifier for the session */
  id: string
  /** Type of session */
  sessionType: SessionType
  /** Start time of the session */
  startTime: Date
  /** End time of the session */
  endTime: Date
  /** Duration of the session in seconds */
  duration: number
  /** Whether the session was completed or skipped */
  completed: boolean
}

/**
 * User preferences for the Pomodoro timer
 */
export interface PomodoroPreferences {
  /** Whether to play audio notifications */
  audioNotifications: boolean
  /** Whether to show browser notifications */
  browserNotifications: boolean
  /** Volume level for audio notifications (0-1) */
  audioVolume: number
  /** Custom timer durations */
  customConfig?: Partial<PomodoroConfig>
}

/**
 * Statistics for Pomodoro sessions
 */
export interface PomodoroStats {
  /** Total number of work sessions completed */
  totalWorkSessions: number
  /** Total time spent in work sessions (in seconds) */
  totalWorkTime: number
  /** Total number of break sessions completed */
  totalBreakSessions: number
  /** Total time spent in break sessions (in seconds) */
  totalBreakTime: number
  /** Current streak of consecutive work sessions */
  currentStreak: number
  /** Longest streak of consecutive work sessions */
  longestStreak: number
  /** Sessions completed today */
  todaySessions: number
  /** Sessions completed this week */
  weekSessions: number
}

/**
 * Tool configuration interface for the toolbox
 */
export interface ToolConfig {
  /** Unique identifier for the tool */
  id: string
  /** Display name of the tool */
  name: string
  /** Description of the tool */
  description: string
  /** Icon component or string for the tool */
  icon: string
  /** Route path for the tool */
  path: string
  /** Whether the tool is available */
  available: boolean
}

/**
 * Color variants for UI components
 */
export type ColorVariant = 'indigo' | 'green' | 'purple' | 'blue' | 'red' | 'yellow'

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

/**
 * Card variants
 */
export type CardVariant = 'default' | 'gradient'

/**
 * Size variants for components
 */
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl'
