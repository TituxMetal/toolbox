/**
 * Button Component
 *
 * Reusable button component with multiple variants and sizes
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { forwardRef, memo } from 'react'

import type { ButtonVariant, SizeVariant } from '~/types'
import { getFocusRingColorClasses } from '~/utils/colors'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode
  /** Visual variant of the button */
  variant?: ButtonVariant
  /** Size of the button */
  size?: SizeVariant
  /** Whether the button is in a loading state */
  loading?: boolean
  /** Icon to display before the text */
  icon?: ReactNode
  /** Whether the button should take full width */
  fullWidth?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Button component with support for different variants and states
 */
export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        children,
        variant = 'primary',
        size = 'md',
        loading = false,
        icon,
        fullWidth = false,
        className = '',
        disabled,
        ...props
      },
      ref
    ) => {
      // Base classes for all buttons
      const baseClasses = [
        'inline-flex',
        'items-center',
        'justify-center',
        'font-semibold',
        'rounded-lg',
        'transition-all',
        'duration-200',
        'cursor-pointer',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-offset-zinc-800',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      ]

      // Variant classes
      const variantClasses = {
        primary: `btn-primary ${getFocusRingColorClasses('indigo')}`,
        secondary: `btn-secondary ${getFocusRingColorClasses('purple')}`,
        danger: `btn-danger ${getFocusRingColorClasses('red')}`,
        ghost:
          'bg-transparent hover:bg-zinc-700 text-zinc-100 hover:text-zinc-100 border border-zinc-600 hover:border-zinc-500 focus:ring-zinc-500'
      }

      // Size classes
      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl'
      }

      // Width classes
      const widthClasses = fullWidth ? 'w-full' : ''

      // Combine all classes
      const buttonClasses = [
        ...baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClasses,
        className
      ]
        .filter(Boolean)
        .join(' ')

      return (
        <button ref={ref} className={buttonClasses} disabled={disabled || loading} {...props}>
          {loading && (
            <svg
              className='mr-2 -ml-1 h-4 w-4 animate-spin text-current'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
          )}
          {icon && !loading && <span className='mr-2'>{icon}</span>}
          {children}
        </button>
      )
    }
  )
)

Button.displayName = 'Button'
