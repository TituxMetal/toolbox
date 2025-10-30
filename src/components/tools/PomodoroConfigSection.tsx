/**
 * PomodoroConfigSection Component
 *
 * Settings display section for Pomodoro timer
 */

import { Button } from '~/components/Button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/Card'
import type { PomodoroConfig } from '~/types'
import { getTextColorClasses } from '~/utils/colors'

interface PomodoroConfigSectionProps {
  /** Timer configuration */
  config: PomodoroConfig
  /** Reset all progress handler */
  onResetAll: () => void
}

/**
 * Settings section component with timer configuration display
 */
export const PomodoroConfigSection = ({ config, onResetAll }: PomodoroConfigSectionProps) => (
  <section>
    <Card>
      <CardHeader>
        <CardTitle level={3}>Timer Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
          <div>
            <div className={`text-2xl font-bold ${getTextColorClasses('indigo')}`}>
              {config.workDuration / 60}m
            </div>
            <div className='text-sm text-zinc-200'>Work Session</div>
          </div>

          <div>
            <div className={`text-2xl font-bold ${getTextColorClasses('green')}`}>
              {config.shortBreakDuration / 60}m
            </div>
            <div className='text-sm text-zinc-200'>Short Break</div>
          </div>

          <div>
            <div className={`text-2xl font-bold ${getTextColorClasses('purple')}`}>
              {config.longBreakDuration / 60}m
            </div>
            <div className='text-sm text-zinc-200'>Long Break</div>
          </div>
        </div>

        <div className='mt-4 text-center'>
          <Button
            variant='ghost'
            size='sm'
            onClick={onResetAll}
            className={`${getTextColorClasses('red')} hover:text-red-300`}
          >
            Reset All Progress
          </Button>
        </div>
      </CardContent>
    </Card>
  </section>
)
