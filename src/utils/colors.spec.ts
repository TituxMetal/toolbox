import { describe, expect, it } from 'bun:test'

import {
  getBackgroundStrokeColorClasses,
  getFocusRingColorClasses,
  getGradientColorClasses,
  getStrokeColorClasses,
  getTextColorClasses
} from './colors'

describe('colors utility', () => {
  describe('getTextColorClasses', () => {
    it('returns correct text color classes for all color variants', () => {
      expect(getTextColorClasses('indigo')).toBe('text-indigo-400')
      expect(getTextColorClasses('purple')).toBe('text-purple-400')
      expect(getTextColorClasses('green')).toBe('text-green-400')
      expect(getTextColorClasses('blue')).toBe('text-blue-400')
      expect(getTextColorClasses('red')).toBe('text-red-400')
      expect(getTextColorClasses('yellow')).toBe('text-yellow-400')
    })
  })

  describe('getStrokeColorClasses', () => {
    it('returns correct stroke color classes for all color variants', () => {
      expect(getStrokeColorClasses('indigo')).toBe('stroke-indigo-500')
      expect(getStrokeColorClasses('purple')).toBe('stroke-purple-500')
      expect(getStrokeColorClasses('green')).toBe('stroke-green-500')
      expect(getStrokeColorClasses('blue')).toBe('stroke-blue-500')
      expect(getStrokeColorClasses('red')).toBe('stroke-red-500')
      expect(getStrokeColorClasses('yellow')).toBe('stroke-yellow-500')
    })
  })

  describe('getBackgroundStrokeColorClasses', () => {
    it('returns correct background stroke color classes for all color variants', () => {
      expect(getBackgroundStrokeColorClasses('indigo')).toBe('stroke-indigo-900/30')
      expect(getBackgroundStrokeColorClasses('purple')).toBe('stroke-purple-900/30')
      expect(getBackgroundStrokeColorClasses('green')).toBe('stroke-green-900/30')
      expect(getBackgroundStrokeColorClasses('blue')).toBe('stroke-blue-900/30')
      expect(getBackgroundStrokeColorClasses('red')).toBe('stroke-red-900/30')
      expect(getBackgroundStrokeColorClasses('yellow')).toBe('stroke-yellow-900/30')
    })
  })

  describe('getGradientColorClasses', () => {
    it('returns correct gradient color classes for all color variants', () => {
      expect(getGradientColorClasses('indigo')).toBe('from-indigo-500 to-indigo-600')
      expect(getGradientColorClasses('purple')).toBe('from-purple-500 to-purple-600')
      expect(getGradientColorClasses('green')).toBe('from-green-500 to-green-600')
      expect(getGradientColorClasses('blue')).toBe('from-blue-500 to-blue-600')
      expect(getGradientColorClasses('red')).toBe('from-red-500 to-red-600')
      expect(getGradientColorClasses('yellow')).toBe('from-yellow-500 to-yellow-600')
    })
  })

  describe('getFocusRingColorClasses', () => {
    it('returns correct focus ring color classes for all color variants', () => {
      expect(getFocusRingColorClasses('indigo')).toBe('focus:ring-indigo-500')
      expect(getFocusRingColorClasses('purple')).toBe('focus:ring-purple-500')
      expect(getFocusRingColorClasses('green')).toBe('focus:ring-green-500')
      expect(getFocusRingColorClasses('blue')).toBe('focus:ring-blue-500')
      expect(getFocusRingColorClasses('red')).toBe('focus:ring-red-500')
      expect(getFocusRingColorClasses('yellow')).toBe('focus:ring-yellow-500')
    })
  })
})
