import { describe, expect, it } from 'bun:test'

import { NavigationHeader } from './NavigationHeader'

describe('NavigationHeader', () => {
  it('exports NavigationHeader component', () => {
    expect(typeof NavigationHeader).toBe('function')
  })
})
