/**
 * Tests for Session Configuration Constants
 */

import { describe, expect, it } from 'bun:test'

import {
  getSessionColor,
  getSessionConfig,
  getSessionLabel,
  SESSION_COLORS,
  SESSION_CONFIGS,
  SESSION_LABELS
} from './sessions'

const sessionTypes = ['work', 'shortBreak', 'longBreak'] as const

describe('SESSION_CONFIGS', () => {
  it('exports session configurations object', () => {
    expect(SESSION_CONFIGS).toBeDefined()
    expect(typeof SESSION_CONFIGS).toBe('object')
  })

  it('contains all session types', () => {
    expect(SESSION_CONFIGS.work).toBeDefined()
    expect(SESSION_CONFIGS.shortBreak).toBeDefined()
    expect(SESSION_CONFIGS.longBreak).toBeDefined()
  })

  it('work session has correct configuration', () => {
    expect(SESSION_CONFIGS.work).toEqual({
      label: 'Work Session',
      color: 'indigo',
      description: 'Time to focus and be productive'
    })
  })

  it('shortBreak session has correct configuration', () => {
    expect(SESSION_CONFIGS.shortBreak).toEqual({
      label: 'Short Break',
      color: 'green',
      description: 'Take a quick break and recharge'
    })
  })

  it('longBreak session has correct configuration', () => {
    expect(SESSION_CONFIGS.longBreak).toEqual({
      label: 'Long Break',
      color: 'purple',
      description: 'Enjoy a longer break - you earned it!'
    })
  })
})

describe('SESSION_COLORS', () => {
  it('exports session colors object', () => {
    expect(SESSION_COLORS).toBeDefined()
    expect(typeof SESSION_COLORS).toBe('object')
  })

  it('contains all session types', () => {
    expect(SESSION_COLORS.work).toBeDefined()
    expect(SESSION_COLORS.shortBreak).toBeDefined()
    expect(SESSION_COLORS.longBreak).toBeDefined()
  })

  it('has correct color mappings', () => {
    expect(SESSION_COLORS.work).toBe('indigo')
    expect(SESSION_COLORS.shortBreak).toBe('green')
    expect(SESSION_COLORS.longBreak).toBe('purple')
  })
})

describe('SESSION_LABELS', () => {
  it('exports session labels object', () => {
    expect(SESSION_LABELS).toBeDefined()
    expect(typeof SESSION_LABELS).toBe('object')
  })

  it('contains all session types', () => {
    expect(SESSION_LABELS.work).toBeDefined()
    expect(SESSION_LABELS.shortBreak).toBeDefined()
    expect(SESSION_LABELS.longBreak).toBeDefined()
  })

  it('has correct label mappings', () => {
    expect(SESSION_LABELS.work).toBe('Work')
    expect(SESSION_LABELS.shortBreak).toBe('Short Break')
    expect(SESSION_LABELS.longBreak).toBe('Long Break')
  })
})

describe('getSessionConfig', () => {
  it('exports getSessionConfig function', () => {
    expect(getSessionConfig).toBeDefined()
    expect(typeof getSessionConfig).toBe('function')
  })

  it('returns correct config for work session', () => {
    const config = getSessionConfig('work')
    expect(config).toEqual({
      label: 'Work Session',
      color: 'indigo',
      description: 'Time to focus and be productive'
    })
  })

  it('returns correct config for shortBreak session', () => {
    const config = getSessionConfig('shortBreak')
    expect(config).toEqual({
      label: 'Short Break',
      color: 'green',
      description: 'Take a quick break and recharge'
    })
  })

  it('returns correct config for longBreak session', () => {
    const config = getSessionConfig('longBreak')
    expect(config).toEqual({
      label: 'Long Break',
      color: 'purple',
      description: 'Enjoy a longer break - you earned it!'
    })
  })

  it('returns same reference as SESSION_CONFIGS', () => {
    sessionTypes.forEach(type => {
      expect(getSessionConfig(type)).toBe(SESSION_CONFIGS[type])
    })
  })
})

describe('getSessionColor', () => {
  it('exports getSessionColor function', () => {
    expect(getSessionColor).toBeDefined()
    expect(typeof getSessionColor).toBe('function')
  })

  it('returns correct color for work session', () => {
    expect(getSessionColor('work')).toBe('indigo')
  })

  it('returns correct color for shortBreak session', () => {
    expect(getSessionColor('shortBreak')).toBe('green')
  })

  it('returns correct color for longBreak session', () => {
    expect(getSessionColor('longBreak')).toBe('purple')
  })

  it('returns same value as SESSION_COLORS', () => {
    sessionTypes.forEach(type => {
      expect(getSessionColor(type)).toBe(SESSION_COLORS[type])
    })
  })
})

describe('getSessionLabel', () => {
  it('exports getSessionLabel function', () => {
    expect(getSessionLabel).toBeDefined()
    expect(typeof getSessionLabel).toBe('function')
  })

  it('returns correct label for work session', () => {
    expect(getSessionLabel('work')).toBe('Work')
  })

  it('returns correct label for shortBreak session', () => {
    expect(getSessionLabel('shortBreak')).toBe('Short Break')
  })

  it('returns correct label for longBreak session', () => {
    expect(getSessionLabel('longBreak')).toBe('Long Break')
  })

  it('returns same value as SESSION_LABELS', () => {
    sessionTypes.forEach(type => {
      expect(getSessionLabel(type)).toBe(SESSION_LABELS[type])
    })
  })
})
