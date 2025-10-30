/**
 * Timer Control Icons
 *
 * Icon components for timer controls (Play, Pause, Reset, Skip)
 */

interface IconProps {
  /** Additional CSS classes */
  className?: string
}

/**
 * Play icon for starting timer
 */
export const PlayIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 4h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
)

/**
 * Pause icon for pausing timer
 */
export const PauseIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
)

/**
 * Reset icon for resetting timer
 */
export const ResetIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
    />
  </svg>
)

/**
 * Skip icon for skipping to next session
 */
export const SkipIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
  </svg>
)
