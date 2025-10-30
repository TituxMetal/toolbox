/**
 * StatCard Component
 *
 * Component for displaying statistics with icons and color variants
 */

import type { HTMLAttributes, ReactNode } from 'react'

import type { ColorVariant } from '~/types'

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Label for the statistic */
  label: string
  /** Value to display */
  value: string | number
  /** Color variant for the value */
  color?: ColorVariant
  /** Icon to display */
  icon?: ReactNode
  /** Additional description */
  description?: string
  /** Whether to show a trend indicator */
  trend?: 'up' | 'down' | 'neutral'
  /** Trend value (e.g., "+5%" or "-2%") */
  trendValue?: string
  /** Additional CSS classes */
  className?: string
  /** Accessible label for screen readers */
  'aria-label'?: string
}

/**
 * StatCard component for displaying key statistics
 */
export const StatCard = ({
  label,
  value,
  color = 'indigo',
  icon,
  description,
  trend,
  trendValue,
  className = '',
  'aria-label': ariaLabel,
  ...props
}: StatCardProps) => {
  // Color mappings for values
  const colorMap = {
    indigo: 'text-indigo-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400'
  }

  // Trend color mappings
  const trendColorMap = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-zinc-200'
  }

  // Trend icons
  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  }

  return (
    <div
      className={`rounded-xl border border-zinc-600/30 bg-zinc-800/40 p-6 text-center backdrop-blur-md transition-colors duration-200 hover:bg-zinc-800/60 ${className}`}
      aria-label={ariaLabel || `${label}: ${value}`}
      {...props}
    >
      {/* Icon */}
      {icon && <div className='mb-4 flex justify-center text-zinc-200'>{icon}</div>}

      {/* Label */}
      <div className='mb-2 text-sm tracking-wide text-zinc-200 uppercase'>{label}</div>

      {/* Value with trend */}
      <div className='mb-2 flex items-center justify-center gap-2'>
        <div className={`text-2xl font-bold md:text-3xl ${colorMap[color]}`}>{value}</div>

        {/* Trend indicator */}
        {trend && trendValue && (
          <div className={`flex items-center text-sm ${trendColorMap[trend]}`}>
            <span className='mr-1'>{trendIcons[trend]}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {description && <p className='text-xs text-zinc-200'>{description}</p>}
    </div>
  )
}

export type { StatCardProps }
