/**
 * CompactStatCard Component
 *
 * Compact StatCard - Smaller version for dense layouts
 */

import { memo } from 'react'

import { getTextColorClasses } from '~/utils/colors'

import type { StatCardProps } from './StatCard'

interface CompactStatCardProps extends Omit<StatCardProps, 'description' | 'trend' | 'trendValue'> {
  /** Whether to show the icon */
  showIcon?: boolean
}

export const CompactStatCard = memo(
  ({
    label,
    value,
    color = 'indigo',
    icon,
    showIcon = true,
    className = '',
    ...props
  }: CompactStatCardProps) => {
    const valueColorClass = getTextColorClasses(color)

    return (
      <div
        className={`rounded-lg border border-zinc-600/30 bg-zinc-800/40 p-3 text-center backdrop-blur-md ${className}`}
        {...props}
      >
        {/* Icon */}
        {showIcon && icon && <div className='mb-2 flex justify-center text-zinc-200'>{icon}</div>}

        {/* Value */}
        <div className={`text-xl font-bold ${valueColorClass} mb-1`}>{value}</div>

        {/* Label */}
        <div className='text-xs tracking-wide text-zinc-200 uppercase'>{label}</div>
      </div>
    )
  }
)
