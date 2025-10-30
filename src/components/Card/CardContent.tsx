/**
 * CardContent Component
 *
 * Main content area for cards
 */

import type { HTMLAttributes, ReactNode } from 'react'
import { forwardRef, memo } from 'react'

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Content */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

export const CardContent = memo(
  forwardRef<HTMLDivElement, CardContentProps>(({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`text-zinc-300 ${className}`} {...props}>
      {children}
    </div>
  ))
)

CardContent.displayName = 'CardContent'
