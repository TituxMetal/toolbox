/**
 * ErrorFallback Component Tests
 */

import { describe, expect, it } from 'bun:test'

import { ErrorFallback } from './ErrorFallback'

describe('ErrorFallback', () => {
  it('exports ErrorFallback component', () => {
    expect(ErrorFallback).toBeDefined()
    expect(typeof ErrorFallback).toBe('function')
  })
})
