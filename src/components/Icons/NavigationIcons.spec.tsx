import { describe, expect, it } from 'bun:test'

import { BackIcon, HomeIcon, SettingsIcon } from './NavigationIcons'

describe('NavigationIcons', () => {
  it('exports BackIcon component', () => {
    expect(typeof BackIcon).toBe('function')
  })

  it('exports SettingsIcon component', () => {
    expect(typeof SettingsIcon).toBe('function')
  })

  it('exports HomeIcon component', () => {
    expect(typeof HomeIcon).toBe('function')
  })
})
