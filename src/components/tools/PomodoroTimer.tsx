/**
 * PomodoroTimer Component
 *
 * Main Pomodoro timer interface with timer display, controls, and statistics
 */

import { useEffect } from 'react'

import { PomodoroConfigSection } from '~/components/tools/PomodoroConfigSection'
import { PomodoroStatsSection } from '~/components/tools/PomodoroStatsSection'
import { PomodoroTimerDisplay } from '~/components/tools/PomodoroTimerDisplay'
import { PomodoroTimerHeader } from '~/components/tools/PomodoroTimerHeader'
import { getSessionConfig } from '~/constants/sessions'
import { usePomodoro } from '~/hooks/usePomodoro'
import { useStats } from '~/hooks/useStats'

/**
 * Main Pomodoro Timer component
 */
export const PomodoroTimer = () => {
  const {
    isRunning,
    sessionType,
    sessionsCompleted,
    totalSessions,
    progress,
    formattedTime,
    toggleTimer,
    resetTimer,
    skipSession,
    resetAll,
    config
  } = usePomodoro()

  // Load statistics for display using Nanostores
  const { stats } = useStats()

  // Get current session configuration
  const currentSession = getSessionConfig(sessionType)

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  return (
    <div className='px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        <PomodoroTimerHeader description={currentSession.description} />

        <PomodoroTimerDisplay
          sessionLabel={currentSession.label}
          sessionColor={currentSession.color}
          progress={progress}
          formattedTime={formattedTime}
          sessionType={sessionType}
          isRunning={isRunning}
          totalSessions={totalSessions}
          sessionsCompleted={sessionsCompleted}
          onToggleTimer={toggleTimer}
          onResetTimer={resetTimer}
          onSkipSession={skipSession}
        />

        <PomodoroStatsSection stats={stats} />

        <PomodoroConfigSection config={config} onResetAll={resetAll} />
      </div>
    </div>
  )
}
