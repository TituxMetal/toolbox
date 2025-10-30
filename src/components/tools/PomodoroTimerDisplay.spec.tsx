import { describe, expect, it } from 'bun:test'

import { PomodoroTimerDisplay } from './PomodoroTimerDisplay'

describe('PomodoroTimerDisplay', () => {
  it('exports PomodoroTimerDisplay component', () => {
    expect(typeof PomodoroTimerDisplay).toBe('function')
  })
})
