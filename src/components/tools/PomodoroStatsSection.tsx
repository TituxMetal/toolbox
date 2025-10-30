/**
 * PomodoroStatsSection Component
 *
 * Statistics grid display for Pomodoro timer
 */

import { Card, CardContent, CardHeader, CardTitle } from '~/components/Card'
import { StatCard, StatGrid, StatIcons } from '~/components/StatCard'
import type { PomodoroStats } from '~/types'
import { formatDuration } from '~/utils/time'

interface PomodoroStatsSectionProps {
  /** Statistics data */
  stats: PomodoroStats
}

/**
 * Statistics section component with grid display
 */
export const PomodoroStatsSection = ({ stats }: PomodoroStatsSectionProps) => (
  <section className='mb-8'>
    <Card>
      <CardHeader>
        <CardTitle level={3}>Statistics</CardTitle>
      </CardHeader>

      <CardContent>
        <StatGrid columns={4} gap='md'>
          <StatCard
            label='Today'
            value={stats.todaySessions}
            color='indigo'
            icon={StatIcons.Calendar}
            description='Sessions completed'
          />

          <StatCard
            label='Current Streak'
            value={stats.currentStreak}
            color='green'
            icon={StatIcons.Fire}
            description='Consecutive sessions'
          />

          <StatCard
            label='Total Time'
            value={formatDuration(stats.totalWorkTime)}
            color='purple'
            icon={StatIcons.Clock}
            description='Time focused'
          />

          <StatCard
            label='Completed'
            value={stats.totalWorkSessions}
            color='blue'
            icon={StatIcons.CheckCircle}
            description='Work sessions'
          />
        </StatGrid>
      </CardContent>
    </Card>
  </section>
)
