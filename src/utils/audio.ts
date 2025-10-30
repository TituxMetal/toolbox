/**
 * Audio utility functions for the Pomodoro timer
 * Handles audio notifications and sound management
 */

/**
 * Audio file paths
 */
export const AUDIO_FILES = {
  WORK_START: '/sounds/work-start.mp3',
  WORK_END: '/sounds/work-end.mp3',
  BREAK_START: '/sounds/break-start.mp3',
  BREAK_END: '/sounds/break-end.mp3',
  TICK: '/sounds/tick.mp3'
} as const

/**
 * Audio manager interface
 */
export interface AudioManager {
  playWorkStart(): Promise<void>
  playWorkEnd(): Promise<void>
  playBreakStart(): Promise<void>
  playBreakEnd(): Promise<void>
  playTick(): Promise<void>
  setVolume(volume: number): void
  getVolume(): number
  setEnabled(enabled: boolean): void
  isEnabled(): boolean
  stopAll(): void
  clearCache(): void
}

/**
 * Creates an audio manager for handling sound playback
 */
export const createAudioManager = (volume: number = 0.5, enabled: boolean = true): AudioManager => {
  const audioCache = new Map<string, HTMLAudioElement>()
  let currentVolume = Math.max(0, Math.min(1, volume))
  let isAudioEnabled = enabled

  /**
   * Preloads audio files for better performance
   */
  const preloadAudio = (): void => {
    Object.values(AUDIO_FILES).forEach(audioPath => {
      try {
        const audio = new Audio(audioPath)
        audio.volume = currentVolume
        audio.preload = 'auto'
        audioCache.set(audioPath, audio)
      } catch (error) {
        console.warn(`Failed to preload audio: ${audioPath}`, error)
      }
    })
  }

  /**
   * Plays an audio file
   * @param audioPath - Path to the audio file
   */
  const playAudio = async (audioPath: string): Promise<void> => {
    if (!isAudioEnabled) return

    try {
      let audio = audioCache.get(audioPath)

      if (!audio) {
        audio = new Audio(audioPath)
        audio.volume = currentVolume
        audioCache.set(audioPath, audio)
      }

      // Reset audio to beginning
      audio.currentTime = 0
      await audio.play()
    } catch (error) {
      console.warn(`Failed to play audio: ${audioPath}`, error)
    }
  }

  // Initialize audio cache
  preloadAudio()

  return {
    /**
     * Plays work session start sound
     */
    async playWorkStart(): Promise<void> {
      await playAudio(AUDIO_FILES.WORK_START)
    },

    /**
     * Plays work session end sound
     */
    async playWorkEnd(): Promise<void> {
      await playAudio(AUDIO_FILES.WORK_END)
    },

    /**
     * Plays break session start sound
     */
    async playBreakStart(): Promise<void> {
      await playAudio(AUDIO_FILES.BREAK_START)
    },

    /**
     * Plays break session end sound
     */
    async playBreakEnd(): Promise<void> {
      await playAudio(AUDIO_FILES.BREAK_END)
    },

    /**
     * Plays tick sound
     */
    async playTick(): Promise<void> {
      await playAudio(AUDIO_FILES.TICK)
    },

    /**
     * Sets the volume for all audio
     * @param volume - Volume level (0-1)
     */
    setVolume(volume: number): void {
      currentVolume = Math.max(0, Math.min(1, volume))
      audioCache.forEach(audio => {
        audio.volume = currentVolume
      })
    },

    /**
     * Gets the current volume
     * @returns Current volume level
     */
    getVolume(): number {
      return currentVolume
    },

    /**
     * Enables or disables audio
     * @param enabled - Whether audio should be enabled
     */
    setEnabled(enabled: boolean): void {
      isAudioEnabled = enabled
    },

    /**
     * Checks if audio is enabled
     * @returns True if audio is enabled
     */
    isEnabled(): boolean {
      return isAudioEnabled
    },

    /**
     * Stops all currently playing audio
     */
    stopAll(): void {
      audioCache.forEach(audio => {
        audio.pause()
        audio.currentTime = 0
      })
    },

    /**
     * Clears the audio cache
     */
    clearCache(): void {
      audioCache.forEach(audio => {
        audio.pause()
        audio.currentTime = 0
      })
      audioCache.clear()
    }
  }
}

/**
 * BeepGenerator interface
 */
export interface BeepGenerator {
  beep(frequency?: number, duration?: number, volume?: number): Promise<void>
  playSuccess(): Promise<void>
  playNotification(): Promise<void>
  playWarning(): Promise<void>
}

/**
 * Creates simple beep sounds using Web Audio API as fallback
 */
export const createBeepGenerator = (): BeepGenerator => {
  let audioContext: AudioContext | null = null

  try {
    audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  } catch (error) {
    console.warn('Web Audio API not supported', error)
  }

  /**
   * Generates a beep sound
   * @param frequency - Frequency in Hz
   * @param duration - Duration in milliseconds
   * @param volume - Volume (0-1)
   */
  const beep = async (
    frequency: number = 800,
    duration: number = 200,
    volume: number = 0.3
  ): Promise<void> => {
    if (!audioContext) return

    try {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    } catch (error) {
      console.warn('Failed to generate beep', error)
    }
  }

  return {
    beep,

    /**
     * Plays a success beep (higher pitch)
     */
    async playSuccess(): Promise<void> {
      await beep(1000, 300, 0.3)
    },

    /**
     * Plays a notification beep (medium pitch)
     */
    async playNotification(): Promise<void> {
      await beep(800, 200, 0.3)
    },

    /**
     * Plays a warning beep (lower pitch)
     */
    async playWarning(): Promise<void> {
      await beep(600, 400, 0.3)
    }
  }
}

// Global instances
let audioManager: AudioManager | null = null
let beepGenerator: BeepGenerator | null = null

/**
 * Gets the global audio manager instance
 * @param volume - Initial volume
 * @param enabled - Initial enabled state
 * @returns AudioManager instance
 */
export const getAudioManager = (volume: number = 0.5, enabled: boolean = true): AudioManager => {
  if (!audioManager) {
    audioManager = createAudioManager(volume, enabled)
  }
  return audioManager
}

/**
 * Gets the global beep generator instance
 * @returns BeepGenerator instance
 */
export const getBeepGenerator = (): BeepGenerator => {
  if (!beepGenerator) {
    beepGenerator = createBeepGenerator()
  }
  return beepGenerator
}
