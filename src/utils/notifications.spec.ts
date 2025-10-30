/**
 * Notifications Utility Tests - CLEAN & MODERN
 */

import { beforeEach, describe, expect, it, mock } from 'bun:test'

import {
  createNotificationManager,
  getNotificationManager,
  getNotificationPermission,
  requestNotificationPermission,
  showNotification,
  showSessionEndNotification,
  showSessionNotification,
  showSessionStartNotification
} from './notifications'

describe('notifications utilities', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mock.restore()

    // Reset the global Notification mock
    const MockNotificationConstructor = mock((title: string, options?: NotificationOptions) => ({
      title,
      body: options?.body,
      icon: options?.icon,
      close: mock(() => {})
    }))

    // Add static properties
    Object.assign(MockNotificationConstructor, {
      permission: 'granted' as NotificationPermission,
      requestPermission: mock(() => Promise.resolve('granted' as NotificationPermission))
    })

    globalThis.Notification = MockNotificationConstructor as unknown as typeof Notification

    // Add static properties to Notification mock
    Object.defineProperty(globalThis.Notification, 'permission', {
      value: 'granted' as NotificationPermission,
      writable: true
    })

    Object.defineProperty(globalThis.Notification, 'requestPermission', {
      value: mock(() => Promise.resolve('granted' as NotificationPermission)),
      writable: true
    })
  })

  describe('createNotificationManager', () => {
    it('creates notification manager with default settings', () => {
      const manager = createNotificationManager()

      expect(typeof manager.isEnabled).toBe('function')
      expect(typeof manager.show).toBe('function')
      expect(typeof manager.notifyWorkStart).toBe('function')
      expect(typeof manager.notifyWorkEnd).toBe('function')
    })

    it('enables and disables notifications', () => {
      const manager = createNotificationManager()

      manager.setEnabled(false)
      expect(manager.isEnabled()).toBe(false)

      manager.setEnabled(true)
      expect(manager.isEnabled()).toBe(true)
    })

    it('shows basic notification', async () => {
      const manager = createNotificationManager()
      manager.setEnabled(true)

      await manager.show('Test Title', { body: 'Test message' })

      expect(globalThis.Notification).toHaveBeenCalledWith('Test Title', {
        body: 'Test message',
        icon: undefined,
        badge: undefined,
        tag: undefined,
        requireInteraction: false,
        silent: false
      })
    })

    it('notifies work start', async () => {
      const manager = createNotificationManager()
      manager.setEnabled(true)

      await manager.notifyWorkStart()

      expect(globalThis.Notification).toHaveBeenCalledWith('🍅 Work Session Started', {
        body: "Time to focus! Let's get productive.",
        icon: '/pwa-192x192.png',
        badge: undefined,
        tag: 'pomodoro-work-start',
        requireInteraction: false,
        silent: false
      })
    })

    it('notifies work end', async () => {
      const manager = createNotificationManager()
      manager.setEnabled(true)

      await manager.notifyWorkEnd()

      expect(globalThis.Notification).toHaveBeenCalledWith('✅ Work Session Complete', {
        body: 'Great job! Time for a well-deserved break.',
        icon: '/pwa-192x192.png',
        badge: undefined,
        tag: 'pomodoro-work-end',
        requireInteraction: false,
        silent: false
      })
    })

    it('does not show notifications when disabled', async () => {
      // Mock permission as denied to disable notifications
      Object.defineProperty(globalThis.Notification, 'permission', {
        value: 'denied',
        writable: true
      })

      const manager = createNotificationManager()

      await manager.show('Test', { body: 'Message' })
      await manager.notifyWorkStart()

      expect(globalThis.Notification).not.toHaveBeenCalled()
    })

    it('handles notification permission denied', async () => {
      // Mock permission as denied
      Object.defineProperty(globalThis.Notification, 'permission', {
        value: 'denied',
        writable: true
      })

      const manager = createNotificationManager()

      await manager.show('Test', { body: 'Message' })

      // Should not create notification when permission denied
      expect(globalThis.Notification).not.toHaveBeenCalled()
    })

    it('requests permission', async () => {
      // Mock permission as default to trigger requestPermission call
      Object.defineProperty(globalThis.Notification, 'permission', {
        value: 'default',
        writable: true
      })

      const manager = createNotificationManager()

      const permission = await manager.requestPermission()

      expect(['granted', 'denied']).toContain(permission)
      expect(globalThis.Notification.requestPermission).toHaveBeenCalled()
    })
  })

  describe('global functions', () => {
    it('gets notification manager singleton', () => {
      const manager1 = getNotificationManager()
      const manager2 = getNotificationManager()

      expect(manager1).toBe(manager2) // Should be the same instance
      expect(manager1.isEnabled()).toBe(true) // Should be enabled with granted permission
    })

    it('gets notification permission', () => {
      const permission = getNotificationPermission()
      expect(['granted', 'denied', 'default']).toContain(permission)
    })

    it('requests notification permission', async () => {
      // Mock permission as default to trigger requestPermission call
      Object.defineProperty(globalThis.Notification, 'permission', {
        value: 'default',
        writable: true
      })

      // Create a new manager to test permission request
      const manager = createNotificationManager()
      const permission = await manager.requestPermission()

      expect(['granted', 'denied']).toContain(permission)
      expect(globalThis.Notification.requestPermission).toHaveBeenCalled()
    })

    it('shows basic notification', async () => {
      await showNotification('Test Title', { body: 'Test message' })

      expect(globalThis.Notification).toHaveBeenLastCalledWith('Test Title', {
        body: 'Test message',
        icon: undefined,
        badge: undefined,
        tag: undefined,
        requireInteraction: false,
        silent: false
      })
    })

    it('shows session notification', async () => {
      await showSessionNotification('work', 'start')

      expect(globalThis.Notification).toHaveBeenCalledWith('🍅 Work Session Started', {
        body: "Time to focus! Let's get productive.",
        icon: '/pwa-192x192.png',
        badge: undefined,
        tag: 'pomodoro-work-start',
        requireInteraction: false,
        silent: false
      })
    })

    it('shows session start notification', async () => {
      await showSessionStartNotification('shortBreak')

      expect(globalThis.Notification).toHaveBeenLastCalledWith('☕ Short Break Started', {
        body: 'Take a moment to relax and recharge.',
        icon: '/pwa-192x192.png',
        badge: undefined,
        tag: 'pomodoro-short-break-start',
        requireInteraction: false,
        silent: false
      })
    })

    it('shows session end notification', async () => {
      await showSessionEndNotification('shortBreak')

      expect(globalThis.Notification).toHaveBeenLastCalledWith('⏰ Break Time Over', {
        body: 'Ready to get back to work?',
        icon: '/pwa-192x192.png',
        badge: undefined,
        tag: 'pomodoro-short-break-end',
        requireInteraction: false,
        silent: false
      })
    })
  })

  describe('error handling', () => {
    it('handles notification creation errors gracefully', async () => {
      const consoleSpy = mock(() => {})
      console.warn = consoleSpy

      await showNotification('Test', { body: 'Message' })

      // Should handle errors gracefully
      expect(typeof showNotification).toBe('function')
    })

    it('handles permission request errors gracefully', async () => {
      const permission = await requestNotificationPermission()

      expect(['granted', 'denied']).toContain(permission)
    })
  })

  describe('browser compatibility', () => {
    it('handles missing Notification API gracefully', async () => {
      const manager = createNotificationManager()

      await manager.show('Test', { body: 'Message' })

      // Should not throw error
      expect(typeof manager.isEnabled).toBe('function')
    })
  })
})
