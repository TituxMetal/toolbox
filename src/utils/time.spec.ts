import { describe, expect, it, vi } from 'vitest'

import {
  formatDate,
  formatDuration,
  formatTime,
  formatTimeOfDay,
  generateId,
  getCurrentTimestamp,
  getTimeDifferenceInSeconds,
  isThisWeek,
  isToday,
  minutesToSeconds,
  secondsToMinutes
} from './time'

describe('time utilities', () => {
  describe('formatTime', () => {
    it('formats seconds into MM:SS format', () => {
      expect(formatTime(0)).toBe('00:00')
      expect(formatTime(30)).toBe('00:30')
      expect(formatTime(60)).toBe('01:00')
      expect(formatTime(90)).toBe('01:30')
      expect(formatTime(1500)).toBe('25:00')
      expect(formatTime(3661)).toBe('61:01')
    })

    it('handles edge cases', () => {
      expect(formatTime(-1)).toBe('00:00') // Negative values should be treated as 0
      expect(formatTime(0.5)).toBe('00:00')
      expect(formatTime(59.9)).toBe('00:59')
    })
  })

  describe('formatDuration', () => {
    it('formats seconds into human-readable duration', () => {
      expect(formatDuration(0)).toBe('0 seconds')
      expect(formatDuration(30)).toBe('30 seconds')
      expect(formatDuration(60)).toBe('1 minute')
      expect(formatDuration(90)).toBe('1 minute 30 seconds')
      expect(formatDuration(120)).toBe('2 minutes')
      expect(formatDuration(3600)).toBe('1 hour')
      expect(formatDuration(3660)).toBe('1 hour 1 minute')
      expect(formatDuration(7200)).toBe('2 hours')
      expect(formatDuration(7320)).toBe('2 hours 2 minutes')
    })

    it('handles complex durations', () => {
      expect(formatDuration(3661)).toBe('1 hour 1 minute')
      expect(formatDuration(7261)).toBe('2 hours 1 minute')
    })
  })

  describe('minutesToSeconds', () => {
    it('converts minutes to seconds', () => {
      expect(minutesToSeconds(0)).toBe(0)
      expect(minutesToSeconds(1)).toBe(60)
      expect(minutesToSeconds(25)).toBe(1500)
      expect(minutesToSeconds(0.5)).toBe(30)
    })
  })

  describe('secondsToMinutes', () => {
    it('converts seconds to minutes (rounded down)', () => {
      expect(secondsToMinutes(0)).toBe(0)
      expect(secondsToMinutes(59)).toBe(0)
      expect(secondsToMinutes(60)).toBe(1)
      expect(secondsToMinutes(90)).toBe(1)
      expect(secondsToMinutes(1500)).toBe(25)
    })
  })

  describe('getCurrentTimestamp', () => {
    it('returns current date', () => {
      const before = new Date()
      const timestamp = getCurrentTimestamp()
      const after = new Date()

      expect(timestamp).toBeInstanceOf(Date)
      expect(timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(timestamp.getTime()).toBeLessThanOrEqual(after.getTime())
    })
  })

  describe('formatDate', () => {
    it('formats date for display', () => {
      const date = new Date('2024-01-15T10:30:00')
      const formatted = formatDate(date)
      expect(formatted).toMatch(/Jan 15, 2024/)
    })
  })

  describe('formatTimeOfDay', () => {
    it('formats time for display', () => {
      const date = new Date('2024-01-15T10:30:00')
      const formatted = formatTimeOfDay(date)
      expect(formatted).toMatch(/10:30/)
    })
  })

  describe('getTimeDifferenceInSeconds', () => {
    it('calculates difference between dates in seconds', () => {
      const start = new Date('2024-01-15T10:00:00')
      const end = new Date('2024-01-15T10:01:30')
      expect(getTimeDifferenceInSeconds(start, end)).toBe(90)
    })

    it('handles negative differences', () => {
      const start = new Date('2024-01-15T10:01:30')
      const end = new Date('2024-01-15T10:00:00')
      expect(getTimeDifferenceInSeconds(start, end)).toBe(-90)
    })
  })

  describe('isToday', () => {
    it('returns true for today', () => {
      const today = new Date()
      expect(isToday(today)).toBe(true)
    })

    it('returns false for other dates', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isToday(yesterday)).toBe(false)

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      expect(isToday(tomorrow)).toBe(false)
    })
  })

  describe('isThisWeek', () => {
    it('returns true for dates in current week', () => {
      const today = new Date()
      expect(isThisWeek(today)).toBe(true)
    })

    it('returns false for dates outside current week', () => {
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 8)
      expect(isThisWeek(nextWeek)).toBe(false)

      const lastWeek = new Date()
      lastWeek.setDate(lastWeek.getDate() - 8)
      expect(isThisWeek(lastWeek)).toBe(false)
    })
  })

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()

      expect(id1).toMatch(/^\d+-[a-z0-9]+$/)
      expect(id2).toMatch(/^\d+-[a-z0-9]+$/)
      expect(id1).not.toBe(id2)
    })

    it('generates IDs with timestamp prefix', () => {
      vi.spyOn(Date, 'now').mockReturnValue(1234567890)
      const id = generateId()
      expect(id).toMatch(/^1234567890-/)
      vi.restoreAllMocks()
    })
  })
})
