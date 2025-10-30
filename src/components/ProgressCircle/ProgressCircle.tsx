/**
 * ProgressCircle Component
 *
 * SVG-based circular progress indicator with customizable appearance
 */

import type { HTMLAttributes, ReactNode } from 'react'

import type { ColorVariant, SizeVariant } from '~/types'

interface ProgressCircleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Progress value (0-100) */
  progress: number
  /** Size of the circle */
  size?: SizeVariant | number
  /** Color variant for the progress */
  color?: ColorVariant
  /** Stroke width of the circle */
  strokeWidth?: number
  /** Whether to show the progress text */
  showProgress?: boolean
  /** Custom content to display in the center */
  children?: ReactNode
  /** Whether to animate the progress */
  animated?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Circular progress indicator component
 */
export const ProgressCircle = ({
  progress,
  size = 'lg',
  color = 'indigo',
  strokeWidth = 8,
  showProgress = false,
  children,
  animated = true,
  className = '',
  ...props
}: ProgressCircleProps) => {
  // Normalize progress to 0-100 range
  const normalizedProgress = Math.max(0, Math.min(100, progress))

  // Size mappings
  const sizeMap = {
    sm: 64,
    md: 96,
    lg: 128,
    xl: 192
  }

  // Get actual size
  const actualSize = typeof size === 'number' ? size : sizeMap[size]

  // Calculate circle properties
  const center = actualSize / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference

  // Color mappings
  const colorMap = {
    indigo: 'stroke-indigo-500',
    purple: 'stroke-purple-500',
    green: 'stroke-green-500',
    blue: 'stroke-blue-500',
    red: 'stroke-red-500',
    yellow: 'stroke-yellow-500'
  }

  // Background color mappings
  const bgColorMap = {
    indigo: 'stroke-indigo-900/30',
    purple: 'stroke-purple-900/30',
    green: 'stroke-green-900/30',
    blue: 'stroke-blue-900/30',
    red: 'stroke-red-900/30',
    yellow: 'stroke-yellow-900/30'
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: actualSize, height: actualSize }}
      {...props}
    >
      {/* SVG Circle */}
      <svg
        width={actualSize}
        height={actualSize}
        className='-rotate-90 transform'
        viewBox={`0 0 ${actualSize} ${actualSize}`}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          className={bgColorMap[color]}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          className={`${colorMap[color]} ${animated ? 'transition-all duration-300 ease-out' : ''}`}
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Center content */}
      <div className='absolute inset-0 flex items-center justify-center'>
        {children ||
          (showProgress && (
            <span className='text-lg font-semibold text-zinc-100'>
              {Math.round(normalizedProgress)}%
            </span>
          ))}
      </div>
    </div>
  )
}

export type { ProgressCircleProps }
