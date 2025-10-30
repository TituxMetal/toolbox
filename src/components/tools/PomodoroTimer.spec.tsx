import { describe, expect, it } from 'bun:test'

import { PomodoroTimer } from './PomodoroTimer'

describe('PomodoroTimer', () => {
  it('exports PomodoroTimer component', () => {
    expect(typeof PomodoroTimer).toBe('function')
  })
})
