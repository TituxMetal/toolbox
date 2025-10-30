/**
 * IconButton Component
 *
 * Button component that displays only an icon
 */

import type { ReactNode } from 'react'
import { forwardRef, memo } from 'react'

import type { ButtonVariant, SizeVariant } from '~/types'

import { Button } from './Button'

interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon to display */
  icon: ReactNode
  /** Visual variant of the button */
  variant?: ButtonVariant
  /** Size of the button */
  size?: SizeVariant
  /** Whether the button is in a loading state */
  loading?: boolean
  /** Whether the button should take full width */
  fullWidth?: boolean
  /** Additional CSS classes */
  className?: string
  /** Accessible label for screen readers */
  'aria-label': string
}

/**
 * Icon Button - Button with only an icon
 */
export const IconButton = memo(
  forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ icon, size = 'md', className = '', ...props }, ref) => {
      // Size classes for icon buttons (square)
      const iconSizeClasses = {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-3',
        xl: 'p-4'
      }

      return (
        <Button
          ref={ref}
          size={size}
          className={`${iconSizeClasses[size]} ${className}`}
          {...props}
        >
          {icon}
        </Button>
      )
    }
  )
)

IconButton.displayName = 'IconButton'
