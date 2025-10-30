/**
 * ButtonGroup Component
 *
 * Container for grouping related buttons with consistent spacing
 */

import type { HTMLAttributes, ReactNode } from 'react'
import { memo } from 'react'

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Button elements to group */
  children: ReactNode
  /** Orientation of the button group */
  orientation?: 'horizontal' | 'vertical'
  /** Additional CSS classes */
  className?: string
}

/**
 * Button Group - Container for grouping related buttons
 */
export const ButtonGroup = memo(
  ({ children, orientation = 'horizontal', className = '', ...props }: ButtonGroupProps) => {
    const orientationClasses = {
      horizontal: 'flex flex-row',
      vertical: 'flex flex-col'
    }

    const spacingClasses = {
      horizontal: 'space-x-2',
      vertical: 'space-y-2'
    }

    const groupClasses = [orientationClasses[orientation], spacingClasses[orientation], className]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={groupClasses} role='group' {...props}>
        {children}
      </div>
    )
  }
)
