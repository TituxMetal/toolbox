import { describe, expect, it } from 'bun:test'

import { PomodoroSettings } from './PomodoroSettings'

describe('PomodoroSettings', () => {
  it('exports PomodoroSettings component', () => {
    expect(typeof PomodoroSettings).toBe('function')
  })
})
