import { cleanup } from '@testing-library/react'
import { afterEach, mock } from 'bun:test'

// Automatically cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock Audio interface
interface MockAudioElement {
  src: string
  volume: number
  currentTime: number
  paused: boolean
  play: () => Promise<void>
  pause: () => void
  load: () => void
  addEventListener: (event: string, handler: () => void) => void
  removeEventListener: (event: string, handler: () => void) => void
}

// Mock AudioContext interface
interface MockAudioContextElement {
  state: string
  sampleRate: number
  currentTime: number
  destination: object
  createOscillator: () => object
  createGain: () => object
  close: () => Promise<void>
  resume: () => Promise<void>
  suspend: () => Promise<void>
}

// Mock Notification interface
interface MockNotificationElement {
  title: string
  body: string | undefined
  icon: string | undefined
  close: () => void
}

// Create mock factory functions
const createMockAudio = (src?: string): MockAudioElement => ({
  src: src || '',
  volume: 1,
  currentTime: 0,
  paused: true,
  play: mock(() => Promise.resolve()),
  pause: mock(() => {}),
  load: mock(() => {}),
  addEventListener: mock(() => {}),
  removeEventListener: mock(() => {})
})

const createMockAudioContext = (): MockAudioContextElement => ({
  state: 'running',
  sampleRate: 44100,
  currentTime: 0,
  destination: {},
  createOscillator: mock(() => ({
    frequency: { value: 440 },
    connect: mock(() => {}),
    start: mock(() => {}),
    stop: mock(() => {})
  })),
  createGain: mock(() => ({
    gain: { value: 1 },
    connect: mock(() => {})
  })),
  close: mock(() => Promise.resolve()),
  resume: mock(() => Promise.resolve()),
  suspend: mock(() => Promise.resolve())
})

const createMockNotification = (
  title: string,
  options?: NotificationOptions
): MockNotificationElement => ({
  title,
  body: options?.body,
  icon: options?.icon,
  close: mock(() => {})
})

// Create mock constructor functions
const MockAudio = mock((src?: string) => createMockAudio(src))
const MockAudioContext = mock(() => createMockAudioContext())

const MockNotificationConstructor = mock((title: string, options?: NotificationOptions) =>
  createMockNotification(title, options)
)

// Add static properties
Object.assign(MockNotificationConstructor, {
  permission: 'granted' as NotificationPermission,
  requestPermission: mock(() => Promise.resolve('granted' as NotificationPermission))
})

const MockNotification = MockNotificationConstructor as unknown as typeof Notification

// Set up global mocks with proper typing
globalThis.Audio = MockAudio as unknown as typeof Audio
globalThis.AudioContext = MockAudioContext as unknown as typeof AudioContext
globalThis.Notification = MockNotification

// Add serviceWorker to navigator if it doesn't exist
if (globalThis.navigator && !globalThis.navigator.serviceWorker) {
  Object.defineProperty(globalThis.navigator, 'serviceWorker', {
    value: {
      register: mock(() => Promise.resolve({}))
    },
    writable: true,
    configurable: true
  })
}

// Add focus method to globalThis
Object.defineProperty(globalThis, 'focus', {
  value: mock(() => {}),
  writable: true
})

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
    get length() {
      return Object.keys(store).length
    },
    key: (index: number) => Object.keys(store)[index] || null
  }
})()

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true
})
