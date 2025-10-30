/**
 * CardTitle Component
 *
 * Title for card headers
 */

import type { HTMLAttributes, ReactNode } from 'react'
import { createElement, forwardRef, memo } from 'react'

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Title content */
  children: ReactNode
  /** Heading level */
  level?: 1 | 2 | 3 | 4 | 5 | 6
  /** Additional CSS classes */
  className?: string
}

export const CardTitle = memo(
  forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ children, level = 2, className = '', ...props }, ref) => {
      const tagName = `h${level}`

      const sizeClasses = {
        1: 'text-3xl font-bold',
        2: 'text-2xl font-semibold',
        3: 'text-xl font-semibold',
        4: 'text-lg font-medium',
        5: 'text-base font-medium',
        6: 'text-sm font-medium'
      }

      return createElement(
        tagName,
        {
          ref,
          className: `text-zinc-100 ${sizeClasses[level]} ${className}`,
          ...props
        },
        children
      )
    }
  )
)

CardTitle.displayName = 'CardTitle'
