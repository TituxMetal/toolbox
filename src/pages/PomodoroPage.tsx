/**
 * PomodoroPage - Main Pomodoro timer page component
 *
 * This page component wraps the PomodoroTimer component and provides
 * page-level concerns like SEO, document title, and layout structure.
 */

import { PomodoroTimer } from '~/components/tools/PomodoroTimer'
import { useDocumentTitle } from '~/hooks/useDocumentTitle'

/**
 * Main Pomodoro timer page
 */
export const PomodoroPage = () => {
  // Set document title for this page
  useDocumentTitle('Pomodoro Timer - Developer Toolbox')

  return (
    <main className='min-h-screen bg-zinc-700'>
      <PomodoroTimer />
    </main>
  )
}
