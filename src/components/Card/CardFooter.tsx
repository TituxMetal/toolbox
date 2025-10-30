/**
 * CardFooter Component
 *
 * Footer section for cards
 */

import type { HTMLAttributes, ReactNode } from 'react'
import { forwardRef, memo } from 'react'

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Footer content */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

export const CardFooter = memo(
  forwardRef<HTMLDivElement, CardFooterProps>(({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`mt-4 border-t border-zinc-600/30 pt-4 ${className}`} {...props}>
      {children}
    </div>
  ))
)

CardFooter.displayName = 'CardFooter'
