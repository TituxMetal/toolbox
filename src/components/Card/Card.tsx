/**
 * Card Component
 *
 * Main reusable card component with gradient and glass effect variants
 */

import type { HTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

import type { CardVariant, ColorVariant } from '~/types'
import { getGradientColorClasses } from '~/utils/colors'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children: ReactNode
  /** Visual variant of the card */
  variant?: CardVariant
  /** Color scheme for gradient variant */
  gradientFrom?: ColorVariant
  /** Color scheme for gradient variant */
  gradientTo?: ColorVariant
  /** Whether to add hover effects */
  hoverable?: boolean
  /** Whether to add click effects */
  clickable?: boolean
  /** Additional CSS classes */
  className?: string
  /** Accessible label for the card */
  'aria-label'?: string
}

/**
 * Card component with support for different variants and effects
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      gradientFrom = 'indigo',
      gradientTo = 'purple',
      hoverable = false,
      clickable = false,
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Base card classes (using existing card class from index.css)
    const baseClasses = 'card'

    // Get gradient color classes from utility
    const gradientFromClasses = getGradientColorClasses(gradientFrom)
    const gradientToClasses = getGradientColorClasses(gradientTo)

    // Variant classes
    const variantClasses = {
      default: baseClasses,
      gradient: `bg-gradient-to-br ${gradientFromClasses} ${
        gradientTo !== gradientFrom
          ? `via-${gradientToClasses.split(' ')[0].replace('from-', '')} ${
              gradientToClasses.split(' ')[1]
            }`
          : ''
      } rounded-xl p-6 shadow-2xl border-0`
    }

    // Interactive classes
    const interactiveClasses = []
    if (hoverable) {
      interactiveClasses.push('hover:shadow-lg hover:scale-[1.02] transition-all duration-200')
    }
    if (clickable) {
      interactiveClasses.push('cursor-pointer active:scale-[0.98]')
    }

    // Combine all classes
    const cardClasses = [variantClasses[variant], ...interactiveClasses, className]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={cardClasses} aria-label={ariaLabel} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
