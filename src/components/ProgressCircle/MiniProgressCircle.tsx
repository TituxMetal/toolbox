/**
 * MiniProgressCircle Component
 *
 * Mini Progress Circle - Compact version for smaller displays
 */

import type { HTMLAttributes } from 'react'
import { memo } from 'react'

import type { ProgressCircleProps } from './ProgressCircle'
import { ProgressCircle } from './ProgressCircle'

interface MiniProgressCircleProps
  extends Omit<ProgressCircleProps, 'size' | 'strokeWidth' | 'color'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Label to display next to the circle */
  label?: string
  /** Color variant */
  color?: 'indigo' | 'green' | 'purple' | 'red' | 'yellow' | 'blue'
}

export const MiniProgressCircle = memo(
  ({ progress, color = 'indigo', label, className = '', ...props }: MiniProgressCircleProps) => (
    <div className={`relative inline-flex items-center justify-center ${className}`} {...props}>
      <ProgressCircle
        progress={progress}
        size={24}
        color={color}
        strokeWidth={3}
        animated={false}
      />
      {label && <span className='ml-2 text-sm text-zinc-400'>{label}</span>}
    </div>
  )
)
