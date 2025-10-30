/**
 * CardHeader Component
 *
 * Header section for cards
 */

import type { HTMLAttributes, ReactNode } from 'react'
import { forwardRef, memo } from 'react'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Header content */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

export const CardHeader = memo(
  forwardRef<HTMLDivElement, CardHeaderProps>(({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  ))
)

CardHeader.displayName = 'CardHeader'
