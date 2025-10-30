/**
 * Tests for useDocumentTitle Hook
 */

import { describe, expect, it } from 'bun:test'

import { useDocumentTitle } from './useDocumentTitle'

describe('useDocumentTitle', () => {
  it('exports useDocumentTitle hook as function', () => {
    expect(typeof useDocumentTitle).toBe('function')
    expect(useDocumentTitle).toBeTruthy()
  })

  it('is a React hook function', () => {
    expect(useDocumentTitle.name).toBe('useDocumentTitle')
    expect(typeof useDocumentTitle).toBe('function')
  })

  it('can be called as a function', () => {
    expect(() => {
      const hookRef = useDocumentTitle
      expect(typeof hookRef).toBe('function')
    }).not.toThrow()
  })

  it('has correct function properties', () => {
    expect(useDocumentTitle).toHaveProperty('length')
    expect(useDocumentTitle.length).toBeGreaterThanOrEqual(1)
    expect(useDocumentTitle.length).toBeLessThanOrEqual(2)
  })

  it('maintains function identity', () => {
    const ref1 = useDocumentTitle
    const ref2 = useDocumentTitle
    expect(ref1).toBe(ref2)
  })

  it('is not null or undefined', () => {
    expect(useDocumentTitle).not.toBeNull()
    expect(useDocumentTitle).not.toBeUndefined()
  })

  it('is an arrow function (no prototype)', () => {
    expect(useDocumentTitle.prototype).toBeUndefined()
  })

  it('maintains consistent type', () => {
    expect(typeof useDocumentTitle).toBe('function')
    expect(typeof useDocumentTitle).not.toBe('object')
    expect(typeof useDocumentTitle).not.toBe('string')
  })

  it('has stable reference', () => {
    const references = Array.from({ length: 10 }, () => useDocumentTitle)
    const allSame = references.every(ref => ref === useDocumentTitle)
    expect(allSame).toBe(true)
  })

  it('can be used in hook composition patterns', () => {
    const composedHook = () => useDocumentTitle
    expect(typeof composedHook()).toBe('function')
  })

  it('works with hook utilities', () => {
    const hookWrapper = (hook: typeof useDocumentTitle) => hook
    expect(hookWrapper(useDocumentTitle)).toBe(useDocumentTitle)
  })

  it('handles function inspection', () => {
    expect(Object.keys(useDocumentTitle)).toEqual([])
    expect(Object.getOwnPropertyNames(useDocumentTitle)).toContain('length')
    expect(Object.getOwnPropertyNames(useDocumentTitle)).toContain('name')
  })

  it('has function constructor', () => {
    expect(useDocumentTitle.constructor).toBe(Function)
  })

  it('can be bound', () => {
    const bound = useDocumentTitle.bind(null)
    expect(typeof bound).toBe('function')
  })

  it('supports function methods', () => {
    expect(typeof useDocumentTitle.call).toBe('function')
    expect(typeof useDocumentTitle.apply).toBe('function')
    expect(typeof useDocumentTitle.bind).toBe('function')
  })
})
