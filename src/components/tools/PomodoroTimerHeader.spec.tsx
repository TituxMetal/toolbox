import { describe, expect, it } from 'bun:test'

import { PomodoroTimerHeader } from './PomodoroTimerHeader'

describe('PomodoroTimerHeader', () => {
  it('exports PomodoroTimerHeader component', () => {
    expect(typeof PomodoroTimerHeader).toBe('function')
  })
})
