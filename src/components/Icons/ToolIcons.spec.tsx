import { describe, expect, it } from 'bun:test'

import { BeakerIcon, PlusIcon } from './ToolIcons'

describe('ToolIcons', () => {
  it('exports PlusIcon component', () => {
    expect(typeof PlusIcon).toBe('function')
  })

  it('exports BeakerIcon component', () => {
    expect(typeof BeakerIcon).toBe('function')
  })
})
