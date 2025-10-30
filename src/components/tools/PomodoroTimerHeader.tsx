/**
 * PomodoroTimerHeader Component
 *
 * Navigation and header section for the Pomodoro Timer page
 */

import { BackIcon, SettingsIcon } from '~/components/Icons/NavigationIcons'
import { NavigationHeader } from '~/components/NavigationHeader'

interface PomodoroTimerHeaderProps {
  /** Current session description */
  description: string
}

/**
 * Header component with navigation and title
 */
export const PomodoroTimerHeader = ({ description }: PomodoroTimerHeaderProps) => (
  <>
    <NavigationHeader
      leftLink={{ to: '/', label: 'Back to Home', icon: <BackIcon /> }}
      rightLink={{ to: '/pomodoro/settings', label: 'Settings', icon: <SettingsIcon /> }}
    />

    {/* Header */}
    <header className='mb-8 text-center'>
      <h1 className='mb-2 text-3xl font-bold text-zinc-100 sm:text-4xl'>Pomodoro Timer</h1>
      <p className='text-lg text-zinc-100'>{description}</p>
    </header>
  </>
)
