/// <reference lib="dom" />

/**
 * Happy-DOM Test Environment Setup
 *
 * This file is preloaded before running tests to set up the DOM environment
 * and provide global mocks for browser APIs that are not available in Bun's test runner.
 */

import { GlobalRegistrator } from '@happy-dom/global-registrator'

// Register Happy-DOM globals
GlobalRegistrator.register()

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
  root = null
  rootMargin = ''
  thresholds = []
}

// Mock matchMedia
global.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true
})

// Mock window.scrollTo
global.scrollTo = () => {}

// Mock HTMLElement.prototype.scrollIntoView
if (typeof HTMLElement !== 'undefined') {
  HTMLElement.prototype.scrollIntoView = () => {}
}
