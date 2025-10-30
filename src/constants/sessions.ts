/**
 * Session Configuration Constants
 *
 * Centralized session configuration for Pomodoro timer.
 * Eliminates duplication between PomodoroTimer and TimerProgressCircle components.
 */

import type { ColorVariant, SessionType } from '~/types'

/**
 * Session configuration interface
 */
export interface SessionConfig {
  /** Display label for the session */
  label: string
  /** Color variant for the session */
  color: ColorVariant
  /** Description of the session */
  description: string
}

/**
 * Session configurations mapped by session type
 */
export const SESSION_CONFIGS: Record<SessionType, SessionConfig> = {
  work: {
    label: 'Work Session',
    color: 'indigo',
    description: 'Time to focus and be productive'
  },
  shortBreak: {
    label: 'Short Break',
    color: 'green',
    description: 'Take a quick break and recharge'
  },
  longBreak: {
    label: 'Long Break',
    color: 'purple',
    description: 'Enjoy a longer break - you earned it!'
  }
} as const

/**
 * Session color mappings (for backward compatibility)
 */
export const SESSION_COLORS: Record<SessionType, ColorVariant> = {
  work: 'indigo',
  shortBreak: 'green',
  longBreak: 'purple'
} as const

/**
 * Session label mappings (for backward compatibility)
 */
export const SESSION_LABELS: Record<SessionType, string> = {
  work: 'Work',
  shortBreak: 'Short Break',
  longBreak: 'Long Break'
} as const

/**
 * Get session configuration by type
 * @param sessionType - The session type
 * @returns Session configuration object
 */
export const getSessionConfig = (sessionType: SessionType): SessionConfig =>
  SESSION_CONFIGS[sessionType]

/**
 * Get session color by type
 * @param sessionType - The session type
 * @returns Color variant for the session
 */
export const getSessionColor = (sessionType: SessionType): ColorVariant =>
  SESSION_COLORS[sessionType]

/**
 * Get session label by type
 * @param sessionType - The session type
 * @returns Display label for the session
 */
export const getSessionLabel = (sessionType: SessionType): string => SESSION_LABELS[sessionType]
