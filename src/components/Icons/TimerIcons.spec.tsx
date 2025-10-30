import { describe, expect, it } from 'bun:test'

import { PauseIcon, PlayIcon, ResetIcon, SkipIcon } from './TimerIcons'

describe('TimerIcons', () => {
  it('exports PlayIcon component', () => {
    expect(typeof PlayIcon).toBe('function')
  })

  it('exports PauseIcon component', () => {
    expect(typeof PauseIcon).toBe('function')
  })

  it('exports ResetIcon component', () => {
    expect(typeof ResetIcon).toBe('function')
  })

  it('exports SkipIcon component', () => {
    expect(typeof SkipIcon).toBe('function')
  })
})
