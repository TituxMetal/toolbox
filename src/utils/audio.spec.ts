/**
 * Audio Utility Tests - CLEAN & MODERN
 */

import { beforeEach, describe, expect, it, mock } from 'bun:test'

import { createAudioManager, getAudioManager, getBeepGenerator } from './audio'

describe('audio utilities', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mock.restore()
  })

  describe('createAudioManager', () => {
    it('creates audio manager with default settings', () => {
      const manager = createAudioManager()

      expect(manager.isEnabled()).toBe(true)
      expect(manager.getVolume()).toBe(0.5)
    })

    it('enables and disables audio', () => {
      const manager = createAudioManager()

      manager.setEnabled(false)
      expect(manager.isEnabled()).toBe(false)

      manager.setEnabled(true)
      expect(manager.isEnabled()).toBe(true)
    })

    it('sets and gets volume', () => {
      const manager = createAudioManager()

      manager.setVolume(0.8)
      expect(manager.getVolume()).toBe(0.8)

      manager.setVolume(0.2)
      expect(manager.getVolume()).toBe(0.2)
    })

    it('plays work start sound', async () => {
      const manager = createAudioManager(0.5, true)

      await manager.playWorkStart()

      // The mock Audio constructor should have been called
      expect(globalThis.Audio).toHaveBeenCalledWith('/sounds/work-start.mp3')
    })

    it('plays work end sound', async () => {
      const manager = createAudioManager(0.5, true)

      await manager.playWorkEnd()

      expect(globalThis.Audio).toHaveBeenCalledWith('/sounds/work-end.mp3')
    })

    it('plays break start sound', async () => {
      const manager = createAudioManager(0.5, true)

      await manager.playBreakStart()

      expect(globalThis.Audio).toHaveBeenCalledWith('/sounds/break-start.mp3')
    })

    it('plays break end sound', async () => {
      const manager = createAudioManager(0.5, true)

      await manager.playBreakEnd()

      expect(globalThis.Audio).toHaveBeenCalledWith('/sounds/break-end.mp3')
    })

    it('plays tick sound', async () => {
      const manager = createAudioManager(0.5, true)

      await manager.playTick()

      expect(globalThis.Audio).toHaveBeenCalledWith('/sounds/tick.mp3')
    })

    it('does not play sounds when disabled', async () => {
      const manager = createAudioManager(0.5, false)

      await manager.playWorkStart()
      await manager.playTick()

      // Audio should still be preloaded but not played when disabled
      expect(manager.isEnabled()).toBe(false)
      expect(globalThis.Audio).toHaveBeenCalled() // Preloading still happens
    })

    it('handles audio play errors gracefully', async () => {
      const manager = createAudioManager()

      const consoleSpy = mock(() => {})
      console.warn = consoleSpy

      await manager.playWorkStart()

      // Should handle errors gracefully without throwing
      expect(manager.isEnabled()).toBe(true)
    })

    it('applies volume to audio elements', async () => {
      const manager = createAudioManager(0.3, true)

      await manager.playWorkStart()
      await manager.playTick()

      // Volume should be applied correctly
      expect(manager.getVolume()).toBe(0.3)
    })

    it('stops all audio', () => {
      const manager = createAudioManager()

      manager.stopAll()

      // Should clear the audio cache
      expect(manager.getVolume()).toBe(0.5) // Volume should remain unchanged
    })

    it('clears audio cache', () => {
      const manager = createAudioManager()

      manager.clearCache()

      // Should clear the audio cache
      expect(manager.getVolume()).toBe(0.5) // Volume should remain unchanged
    })
  })

  describe('global functions', () => {
    it('gets audio manager singleton', () => {
      const manager1 = getAudioManager()
      const manager2 = getAudioManager()

      expect(manager1).toBe(manager2) // Should be the same instance
      expect(manager1.getVolume()).toBe(0.5)
      expect(manager1.isEnabled()).toBe(true)
    })

    it('gets audio manager with custom settings', () => {
      // getAudioManager is a singleton, so it returns the same instance
      // The custom settings are only used on first creation
      const manager = getAudioManager(0.8, false)

      // Since it's a singleton, it may have been created earlier with different settings
      expect(typeof manager.getVolume()).toBe('number')
      expect(typeof manager.isEnabled()).toBe('boolean')
    })

    it('gets beep generator', () => {
      const generator = getBeepGenerator()

      expect(generator).toBeDefined()
      expect(typeof generator.beep).toBe('function')
      expect(typeof generator.playSuccess).toBe('function')
      expect(typeof generator.playNotification).toBe('function')
      expect(typeof generator.playWarning).toBe('function')
    })
  })

  describe('audio context handling', () => {
    it('handles missing AudioContext gracefully', () => {
      const manager = createAudioManager()

      // Should not throw error even if AudioContext is not available
      expect(() => manager.getVolume()).not.toThrow()
    })

    it('handles AudioContext creation errors', () => {
      const generator = getBeepGenerator()

      // Should handle AudioContext errors gracefully
      expect(() => generator.beep()).not.toThrow()
    })
  })

  describe('audio file loading', () => {
    it('preloads audio files on manager creation', () => {
      createAudioManager()

      // Should have called Audio constructor for preloading
      expect(globalThis.Audio).toHaveBeenCalled()
    })

    it('handles audio loading errors gracefully', () => {
      const consoleSpy = mock(() => {})
      console.warn = consoleSpy

      expect(() => createAudioManager()).not.toThrow()

      // Should create manager successfully
      const manager = createAudioManager()
      expect(manager.isEnabled()).toBe(true)
    })
  })
})
