/**
 * PomodoroTimerDisplay Component
 *
 * Timer display with progress circle and control buttons
 */

import { Button, ButtonGroup } from '~/components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/Card'
import { PauseIcon, PlayIcon, ResetIcon, SkipIcon } from '~/components/Icons/TimerIcons'
import { TimerProgressCircle } from '~/components/ProgressCircle'
import type { ColorVariant, SessionType } from '~/types'

interface PomodoroTimerDisplayProps {
  /** Current session label */
  sessionLabel: string
  /** Current session color */
  sessionColor: ColorVariant
  /** Timer progress (0-100) */
  progress: number
  /** Formatted time remaining */
  formattedTime: string
  /** Current session type */
  sessionType: SessionType
  /** Whether timer is running */
  isRunning: boolean
  /** Total sessions count */
  totalSessions: number
  /** Completed sessions count */
  sessionsCompleted: number
  /** Toggle timer handler */
  onToggleTimer: () => void
  /** Reset timer handler */
  onResetTimer: () => void
  /** Skip session handler */
  onSkipSession: () => void
}

/**
 * Timer display component with progress circle and controls
 */
export const PomodoroTimerDisplay = ({
  sessionLabel,
  sessionColor,
  progress,
  formattedTime,
  sessionType,
  isRunning,
  totalSessions,
  sessionsCompleted,
  onToggleTimer,
  onResetTimer,
  onSkipSession
}: PomodoroTimerDisplayProps) => (
  <Card variant='gradient' gradientFrom={sessionColor} gradientTo={sessionColor} className='mb-8'>
    <CardHeader>
      <CardTitle level={2} className='text-center text-zinc-100'>
        {sessionLabel}
      </CardTitle>
    </CardHeader>

    <CardContent>
      {/* Timer Display */}
      <div className='mb-8 flex justify-center'>
        <TimerProgressCircle
          progress={progress}
          timeRemaining={formattedTime}
          sessionType={sessionType}
          isRunning={isRunning}
          size='xl'
        />
      </div>

      {/* Control Buttons */}
      <div className='mb-6 flex justify-center'>
        <ButtonGroup>
          <Button
            variant='primary'
            size='lg'
            onClick={onToggleTimer}
            icon={isRunning ? <PauseIcon /> : <PlayIcon />}
            className='min-w-[120px]'
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>

          <Button
            variant='ghost'
            size='lg'
            onClick={onResetTimer}
            icon={<ResetIcon />}
            disabled={isRunning}
          >
            Reset
          </Button>

          <Button
            variant='ghost'
            size='lg'
            onClick={onSkipSession}
            icon={<SkipIcon />}
            disabled={isRunning}
          >
            Skip
          </Button>
        </ButtonGroup>
      </div>

      {/* Session Progress */}
      <div className='text-center text-zinc-100/80'>
        <p className='text-sm'>
          Session {totalSessions + 1} • {sessionsCompleted} work sessions completed
        </p>
      </div>
    </CardContent>
  </Card>
)
