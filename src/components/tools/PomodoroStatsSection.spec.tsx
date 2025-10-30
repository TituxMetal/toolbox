import { describe, expect, it } from 'bun:test'

import { PomodoroStatsSection } from './PomodoroStatsSection'

describe('PomodoroStatsSection', () => {
  it('exports PomodoroStatsSection component', () => {
    expect(typeof PomodoroStatsSection).toBe('function')
  })
})
