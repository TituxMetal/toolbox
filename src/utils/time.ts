/**
 * Time utility functions for the Pomodoro timer
 */

/**
 * Formats seconds into MM:SS format
 * @param seconds - Number of seconds to format
 * @returns Formatted time string (e.g., "25:00", "05:30")
 */
export const formatTime = (seconds: number): string => {
  // Handle negative values by treating them as 0
  const safeSeconds = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(safeSeconds / 60)
  const remainingSeconds = safeSeconds % 60

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * Formats seconds into a human-readable duration
 * @param seconds - Number of seconds to format
 * @returns Human-readable duration (e.g., "25 minutes", "1 hour 30 minutes")
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const parts: string[] = []

  if (hours > 0) {
    parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
  }

  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
  }

  if (remainingSeconds > 0 && hours === 0) {
    parts.push(`${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`)
  }

  if (parts.length === 0) {
    return '0 seconds'
  }

  if (parts.length === 1) {
    return parts[0]
  }

  if (parts.length === 2) {
    return `${parts[0]} and ${parts[1]}`
  }

  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
}

/**
 * Converts minutes to seconds
 * @param minutes - Number of minutes
 * @returns Number of seconds
 */
export const minutesToSeconds = (minutes: number): number => minutes * 60

/**
 * Converts seconds to minutes
 * @param seconds - Number of seconds
 * @returns Number of minutes (rounded down)
 */
export const secondsToMinutes = (seconds: number): number => Math.floor(seconds / 60)

/**
 * Gets the current timestamp
 * @returns Current date and time
 */
export const getCurrentTimestamp = (): Date => new Date()

/**
 * Formats a date for display
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

/**
 * Formats a time for display
 * @param date - Date to format
 * @returns Formatted time string
 */
export const formatTimeOfDay = (date: Date): string =>
  date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })

/**
 * Calculates the difference between two dates in seconds
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Difference in seconds
 */
export const getTimeDifferenceInSeconds = (startDate: Date, endDate: Date): number =>
  Math.floor((endDate.getTime() - startDate.getTime()) / 1000)

/**
 * Checks if a date is today
 * @param date - Date to check
 * @returns True if the date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

/**
 * Checks if a date is within the current week
 * @param date - Date to check
 * @returns True if the date is within the current week
 */
export const isThisWeek = (date: Date): boolean => {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)

  return date >= startOfWeek && date <= endOfWeek
}

/**
 * Generates a unique ID based on timestamp
 * @returns Unique ID string
 */
export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
