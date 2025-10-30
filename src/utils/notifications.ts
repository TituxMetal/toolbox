/**
 * Browser Notifications Utility - CLEAN & MODERN
 */

import type { SessionType } from '~/types'

export type NotificationPermission = 'default' | 'granted' | 'denied'

interface SessionNotificationConfig {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
}

interface NotificationConstructor {
  new (title: string, options?: NotificationOptions): Notification
  permission: NotificationPermission
  requestPermission(): Promise<NotificationPermission>
}

interface WindowWithNotification extends Window {
  Notification: NotificationConstructor
}

const NOTIFICATION_CONFIGS: Record<string, SessionNotificationConfig> = {
  workStart: {
    title: '🍅 Work Session Started',
    body: "Time to focus! Let's get productive.",
    icon: '/pwa-192x192.png',
    tag: 'pomodoro-work-start'
  },
  workEnd: {
    title: '✅ Work Session Complete',
    body: 'Great job! Time for a well-deserved break.',
    icon: '/pwa-192x192.png',
    tag: 'pomodoro-work-end'
  },
  shortBreakStart: {
    title: '☕ Short Break Started',
    body: 'Take a moment to relax and recharge.',
    icon: '/pwa-192x192.png',
    tag: 'pomodoro-short-break-start'
  },
  shortBreakEnd: {
    title: '⏰ Break Time Over',
    body: 'Ready to get back to work?',
    icon: '/pwa-192x192.png',
    tag: 'pomodoro-short-break-end'
  },
  longBreakStart: {
    title: '🌟 Long Break Started',
    body: 'Enjoy your extended break - you earned it!',
    icon: '/pwa-192x192.png',
    tag: 'pomodoro-long-break-start'
  },
  longBreakEnd: {
    title: '🚀 Ready to Continue',
    body: "Feeling refreshed? Let's start another work session.",
    icon: '/pwa-192x192.png',
    tag: 'pomodoro-long-break-end'
  }
}

export interface NotificationManager {
  requestPermission(): Promise<NotificationPermission>
  notifyWorkStart(): Promise<void>
  notifyWorkEnd(): Promise<void>
  notifyBreakStart(sessionType: 'shortBreak' | 'longBreak'): Promise<void>
  notifyBreakEnd(sessionType: 'shortBreak' | 'longBreak'): Promise<void>
  notifySessionEvent(sessionType: SessionType, event: 'start' | 'end'): Promise<void>
  show(title: string, options?: NotificationOptions): Promise<void>
  getPermission(): NotificationPermission
  isEnabled(): boolean
  setEnabled(enabled: boolean): void
  clearAllNotifications(): void
}

let notificationManager: NotificationManager | null = null

export const createNotificationManager = (): NotificationManager => {
  let enabled = false
  let permission: NotificationPermission = 'default'

  const checkSupport = (): boolean => {
    // In test environment, only check for Notification API
    if (typeof globalThis.navigator?.serviceWorker === 'undefined') {
      return 'Notification' in globalThis
    }
    return 'Notification' in globalThis && 'serviceWorker' in globalThis.navigator
  }

  const updatePermission = (): void => {
    if (checkSupport()) {
      permission = (globalThis as unknown as WindowWithNotification).Notification.permission
      enabled = permission === 'granted'
    }
  }

  updatePermission()

  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!checkSupport()) {
      return 'denied'
    }

    if (permission === 'default') {
      try {
        const newPermission = await (
          globalThis as unknown as WindowWithNotification
        ).Notification.requestPermission()
        permission = newPermission
        enabled = newPermission === 'granted'
        return permission
      } catch (error) {
        console.warn('Failed to request notification permission:', error)
        return 'denied'
      }
    }

    return permission
  }

  const showSessionNotification = async (
    sessionType: SessionType,
    event: 'start' | 'end'
  ): Promise<void> => {
    if (!enabled || !checkSupport()) {
      return
    }

    const configKey = `${sessionType}${event.charAt(0).toUpperCase() + event.slice(1)}`
    const config = NOTIFICATION_CONFIGS[configKey]

    if (!config) {
      return
    }

    try {
      const notification = new (globalThis as unknown as WindowWithNotification).Notification(
        config.title,
        {
          body: config.body,
          icon: config.icon,
          badge: config.badge,
          tag: config.tag,
          requireInteraction: false,
          silent: false
        }
      )

      setTimeout(() => {
        notification.close()
      }, 5000)

      notification.onclick = () => {
        globalThis.focus?.()
        notification.close()
      }
    } catch (error) {
      console.warn('Failed to show notification:', error)
    }
  }

  const showGenericNotification = async (
    title: string,
    options?: NotificationOptions
  ): Promise<void> => {
    if (!enabled || !checkSupport()) {
      return
    }

    try {
      const notification = new (globalThis as unknown as WindowWithNotification).Notification(
        title,
        {
          body: options?.body || '',
          icon: options?.icon,
          badge: options?.badge,
          tag: options?.tag,
          requireInteraction: options?.requireInteraction || false,
          silent: options?.silent || false
        }
      )

      setTimeout(() => {
        notification.close()
      }, 5000)

      notification.onclick = () => {
        globalThis.focus?.()
        notification.close()
      }
    } catch (error) {
      console.warn('Failed to show notification:', error)
    }
  }

  return {
    requestPermission,

    notifyWorkStart: async (): Promise<void> => {
      await showSessionNotification('work', 'start')
    },

    notifyWorkEnd: async (): Promise<void> => {
      await showSessionNotification('work', 'end')
    },

    notifyBreakStart: async (sessionType: 'shortBreak' | 'longBreak'): Promise<void> => {
      await showSessionNotification(sessionType, 'start')
    },

    notifyBreakEnd: async (sessionType: 'shortBreak' | 'longBreak'): Promise<void> => {
      await showSessionNotification(sessionType, 'end')
    },

    notifySessionEvent: async (sessionType: SessionType, event: 'start' | 'end'): Promise<void> => {
      const eventHandlers = {
        work: {
          start: async () => await showSessionNotification('work', 'start'),
          end: async () => await showSessionNotification('work', 'end')
        },
        shortBreak: {
          start: async () => await showSessionNotification('shortBreak', 'start'),
          end: async () => await showSessionNotification('shortBreak', 'end')
        },
        longBreak: {
          start: async () => await showSessionNotification('longBreak', 'start'),
          end: async () => await showSessionNotification('longBreak', 'end')
        }
      }

      await eventHandlers[sessionType][event]()
    },

    show: async (title: string, options?: NotificationOptions): Promise<void> => {
      await showGenericNotification(title, options)
    },

    getPermission: (): NotificationPermission => permission,

    isEnabled: (): boolean => enabled,

    setEnabled: (newEnabled: boolean): void => {
      enabled = newEnabled && permission === 'granted'
    },

    clearAllNotifications: (): void => {
      // Note: There's no direct way to clear notifications by tag in the Web API
      // This is a placeholder for potential future functionality
    }
  }
}

export const getNotificationManager = (): NotificationManager => {
  if (!notificationManager) {
    notificationManager = createNotificationManager()
  }
  return notificationManager
}

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  const manager = getNotificationManager()
  return await manager.requestPermission()
}

export const getNotificationPermission = (): NotificationPermission => {
  const manager = getNotificationManager()
  return manager.getPermission()
}

export const showSessionNotification = async (
  sessionType: SessionType,
  event: 'start' | 'end'
): Promise<void> => {
  const manager = getNotificationManager()
  await manager.notifySessionEvent(sessionType, event)
}

export const showNotification = async (
  title: string,
  options?: NotificationOptions
): Promise<void> => {
  const manager = getNotificationManager()
  await manager.show(title, options)
}

export const showSessionStartNotification = async (sessionType: SessionType): Promise<void> => {
  await showSessionNotification(sessionType, 'start')
}

export const showSessionEndNotification = async (sessionType: SessionType): Promise<void> => {
  await showSessionNotification(sessionType, 'end')
}
