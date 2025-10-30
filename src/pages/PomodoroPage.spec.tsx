import { describe, expect, it } from 'bun:test'

import { PomodoroPage } from './PomodoroPage'

describe('PomodoroPage', () => {
  it('exports PomodoroPage component', () => {
    expect(typeof PomodoroPage).toBe('function')
  })
})
