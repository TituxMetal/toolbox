/**
 * PomodoroSettingsPage - Pomodoro settings page component
 *
 * This page component wraps the PomodoroSettings component and provides
 * page-level concerns like SEO, document title, and layout structure.
 */

import { PomodoroSettings } from '~/components/tools/PomodoroSettings'
import { useDocumentTitle } from '~/hooks/useDocumentTitle'

/**
 * Pomodoro settings page
 */
export const PomodoroSettingsPage = () => {
  // Set document title for this page
  useDocumentTitle('Pomodoro Settings - Developer Toolbox')

  return (
    <main className='min-h-screen bg-zinc-700'>
      <PomodoroSettings />
    </main>
  )
}
