/**
 * StatGrid Component
 *
 * StatGrid - Container for organizing multiple StatCards
 */

import type { HTMLAttributes, ReactNode } from 'react'
import { memo } from 'react'

interface StatGridProps extends HTMLAttributes<HTMLDivElement> {
  /** StatCard components */
  children: ReactNode
  /** Number of columns (responsive) */
  columns?: 1 | 2 | 3 | 4
  /** Gap between cards */
  gap?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
}

export const StatGrid = memo(
  ({ children, columns = 2, gap = 'md', className = '', ...props }: StatGridProps) => {
    // Column mappings
    const columnMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    }

    // Gap mappings
    const gapMap = {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6'
    }

    return (
      <div className={`grid ${columnMap[columns]} ${gapMap[gap]} ${className}`} {...props}>
        {children}
      </div>
    )
  }
)
