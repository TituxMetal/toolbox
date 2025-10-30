import { describe, expect, it } from 'bun:test'

import { PomodoroConfigSection } from './PomodoroConfigSection'

describe('PomodoroConfigSection', () => {
  it('exports PomodoroConfigSection component', () => {
    expect(typeof PomodoroConfigSection).toBe('function')
  })
})
