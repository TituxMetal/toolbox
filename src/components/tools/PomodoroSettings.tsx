/**
 * PomodoroSettings Component
 *
 * Settings and preferences interface for the Pomodoro timer
 */

import { useState } from 'react'

import { Button } from '~/components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/Card'
import { BackIcon, HomeIcon } from '~/components/Icons/NavigationIcons'
import { NavigationHeader } from '~/components/NavigationHeader'
import type { PomodoroConfig, PomodoroPreferences } from '~/types'
import { DEFAULT_POMODORO_CONFIG } from '~/types'
import { getTextColorClasses } from '~/utils/colors'
import { clearTimerState, loadPreferences, savePreferences } from '~/utils/storage'

/**
 * Settings component for Pomodoro timer preferences
 */
export const PomodoroSettings = () => {
  // Load current preferences
  const [preferences, setPreferences] = useState<PomodoroPreferences>(() => loadPreferences())
  const [showSaveMessage, setShowSaveMessage] = useState(false)

  // Get current config (custom or default)
  const currentConfig: PomodoroConfig = {
    ...DEFAULT_POMODORO_CONFIG,
    ...preferences.customConfig
  }

  // Handle timer duration changes
  const handleDurationChange = (field: keyof PomodoroConfig, value: number) => {
    // Convert minutes to seconds for duration fields, but not for sessionsBeforeLongBreak
    const finalValue = field === 'sessionsBeforeLongBreak' ? value : value * 60
    setPreferences(prev => ({
      ...prev,
      customConfig: {
        ...prev.customConfig,
        [field]: finalValue
      }
    }))
  }

  // Handle audio/notification toggles
  const handleToggle = (field: keyof PomodoroPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle volume change
  const handleVolumeChange = (value: number) => {
    setPreferences(prev => ({
      ...prev,
      audioVolume: value
    }))
  }

  // Save preferences
  const handleSave = () => {
    savePreferences(preferences)
    // Clear timer state so it resets with new config
    clearTimerState()
    setShowSaveMessage(true)
    setTimeout(() => setShowSaveMessage(false), 3000)
  }

  // Reset to defaults
  const handleReset = () => {
    const defaultPreferences: PomodoroPreferences = {
      audioNotifications: true,
      browserNotifications: false,
      audioVolume: 0.5
    }
    setPreferences(defaultPreferences)
    savePreferences(defaultPreferences)
    // Clear timer state so it resets with default config
    clearTimerState()
    setShowSaveMessage(true)
    setTimeout(() => setShowSaveMessage(false), 3000)
  }

  return (
    <div className='px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl'>
        <NavigationHeader
          leftLink={{ to: '/pomodoro', label: 'Back to Timer', icon: <BackIcon /> }}
          rightLink={{ to: '/', label: 'Home', icon: <HomeIcon /> }}
        />

        {/* Header */}
        <header className='mb-8 text-center'>
          <h1 className='mb-2 text-3xl font-bold text-zinc-100 sm:text-4xl'>Pomodoro Settings</h1>
          <p className='text-lg text-zinc-100'>Customize your timer preferences</p>
        </header>

        {/* Save Message */}
        {showSaveMessage && (
          <div className='mb-6 rounded-lg border border-green-700 bg-green-900/30 p-4 text-center'>
            <p className='text-green-400'>Settings saved successfully!</p>
          </div>
        )}

        {/* Settings Cards */}
        <div className='space-y-6'>
          {/* Timer Durations */}
          <Card>
            <CardHeader>
              <CardTitle level={3}>Timer Durations</CardTitle>
            </CardHeader>

            <CardContent>
              <div className='space-y-4'>
                {/* Work Duration */}
                <div>
                  <label
                    htmlFor='work-duration'
                    className='mb-2 block text-sm font-medium text-zinc-100'
                  >
                    Work Session (minutes)
                  </label>
                  <input
                    id='work-duration'
                    type='number'
                    min='1'
                    max='60'
                    value={Math.round(currentConfig.workDuration / 60)}
                    onChange={e =>
                      handleDurationChange('workDuration', parseInt(e.target.value) || 25)
                    }
                    className='w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 text-zinc-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none'
                  />
                </div>

                {/* Short Break Duration */}
                <div>
                  <label
                    htmlFor='short-break-duration'
                    className='mb-2 block text-sm font-medium text-zinc-100'
                  >
                    Short Break (minutes)
                  </label>
                  <input
                    id='short-break-duration'
                    type='number'
                    min='1'
                    max='30'
                    value={Math.round(currentConfig.shortBreakDuration / 60)}
                    onChange={e =>
                      handleDurationChange('shortBreakDuration', parseInt(e.target.value) || 5)
                    }
                    className='w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 text-zinc-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:outline-none'
                  />
                </div>

                {/* Long Break Duration */}
                <div>
                  <label
                    htmlFor='long-break-duration'
                    className='mb-2 block text-sm font-medium text-zinc-100'
                  >
                    Long Break (minutes)
                  </label>
                  <input
                    id='long-break-duration'
                    type='number'
                    min='1'
                    max='60'
                    value={Math.round(currentConfig.longBreakDuration / 60)}
                    onChange={e =>
                      handleDurationChange('longBreakDuration', parseInt(e.target.value) || 15)
                    }
                    className='w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 text-zinc-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none'
                  />
                </div>

                {/* Sessions Before Long Break */}
                <div>
                  <label
                    htmlFor='sessions-before-long-break'
                    className='mb-2 block text-sm font-medium text-zinc-100'
                  >
                    Work sessions before long break
                  </label>
                  <input
                    id='sessions-before-long-break'
                    type='number'
                    min='2'
                    max='10'
                    value={currentConfig.sessionsBeforeLongBreak}
                    onChange={e =>
                      handleDurationChange('sessionsBeforeLongBreak', parseInt(e.target.value) || 4)
                    }
                    className='w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 text-zinc-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none'
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle level={3}>Audio & Notifications</CardTitle>
            </CardHeader>

            <CardContent>
              <div className='space-y-4'>
                {/* Audio Notifications Toggle */}
                <div className='flex items-center justify-between'>
                  <div>
                    <label
                      htmlFor='audio-notifications'
                      className='block cursor-pointer text-sm font-medium text-zinc-100'
                    >
                      Audio Notifications
                    </label>
                    <p className='text-sm text-zinc-200'>Play sound when sessions end</p>
                  </div>
                  <button
                    id='audio-notifications'
                    type='button'
                    role='switch'
                    aria-checked={preferences.audioNotifications}
                    aria-label='Toggle audio notifications'
                    onClick={() =>
                      handleToggle('audioNotifications', !preferences.audioNotifications)
                    }
                    className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:outline-none ${
                      preferences.audioNotifications ? 'bg-indigo-600' : 'bg-zinc-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-zinc-100 transition-transform ${
                        preferences.audioNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Volume Control */}
                {preferences.audioNotifications && (
                  <div>
                    <label
                      htmlFor='audio-volume'
                      className='mb-2 block text-sm font-medium text-zinc-100'
                    >
                      Volume: {Math.round(preferences.audioVolume * 100)}%
                    </label>
                    <input
                      id='audio-volume'
                      type='range'
                      min='0'
                      max='1'
                      step='0.1'
                      value={preferences.audioVolume}
                      onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                      className='w-full cursor-pointer'
                    />
                  </div>
                )}

                {/* Browser Notifications Toggle */}
                <div className='flex items-center justify-between'>
                  <div>
                    <label
                      htmlFor='browser-notifications'
                      className='block cursor-pointer text-sm font-medium text-zinc-100'
                    >
                      Browser Notifications
                    </label>
                    <p className='text-sm text-zinc-200'>Show desktop notifications</p>
                  </div>
                  <button
                    id='browser-notifications'
                    type='button'
                    role='switch'
                    aria-checked={preferences.browserNotifications}
                    aria-label='Toggle browser notifications'
                    onClick={() =>
                      handleToggle('browserNotifications', !preferences.browserNotifications)
                    }
                    className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:outline-none ${
                      preferences.browserNotifications ? 'bg-indigo-600' : 'bg-zinc-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-zinc-100 transition-transform ${
                        preferences.browserNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className='flex gap-4'>
            <Button variant='primary' size='lg' fullWidth onClick={handleSave}>
              Save Settings
            </Button>
            <Button
              variant='ghost'
              size='lg'
              onClick={handleReset}
              className={getTextColorClasses('red')}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
