/**
 * TimerProgressCircle Component
 *
 * Timer Progress Circle - Specialized version for timer display
 */

import { memo } from 'react'

import { getSessionColor, getSessionLabel } from '~/constants/sessions'

import type { ProgressCircleProps } from './ProgressCircle'
import { ProgressCircle } from './ProgressCircle'

interface TimerProgressCircleProps extends Omit<ProgressCircleProps, 'children' | 'showProgress'> {
  /** Time remaining in MM:SS format */
  timeRemaining: string
  /** Session type for color theming */
  sessionType?: 'work' | 'shortBreak' | 'longBreak'
  /** Whether the timer is running */
  isRunning?: boolean
}

export const TimerProgressCircle = memo(
  ({
    timeRemaining,
    sessionType = 'work',
    isRunning = false,
    progress,
    size = 'xl',
    strokeWidth = 12,
    animated = true,
    className = '',
    ...props
  }: TimerProgressCircleProps) => {
    // Get session color and label from constants
    const sessionColor = getSessionColor(sessionType)
    const sessionLabel = getSessionLabel(sessionType)

    return (
      <ProgressCircle
        progress={progress}
        size={size}
        color={sessionColor}
        strokeWidth={strokeWidth}
        animated={animated}
        className={className}
        {...props}
      >
        <div className='text-center'>
          {/* Timer display */}
          <div
            className={`font-mono font-bold text-zinc-100 ${
              size === 'xl' ? 'text-3xl' : size === 'lg' ? 'text-2xl' : 'text-xl'
            }`}
          >
            {timeRemaining}
          </div>

          {/* Session type */}
          <div
            className={`tracking-wide text-zinc-200 uppercase ${
              size === 'xl' ? 'text-sm' : 'text-xs'
            } mt-1`}
          >
            {sessionLabel}
          </div>

          {/* Running indicator */}
          {isRunning && (
            <div className='mt-2 flex justify-center'>
              <div className='h-2 w-2 animate-pulse rounded-full bg-green-400' />
            </div>
          )}
        </div>
      </ProgressCircle>
    )
  }
)
