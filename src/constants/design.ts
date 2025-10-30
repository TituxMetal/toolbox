/**
 * Design System Constants
 *
 * Centralized design tokens for consistent styling across the application.
 * These constants map to Tailwind CSS classes and should be used instead of hardcoded values.
 */

/**
 * Spacing scale
 * Maps semantic names to Tailwind spacing classes
 */
export const SPACING = {
  /** 0.125rem (2px) */
  xxs: '0.5',
  /** 0.25rem (4px) */
  xs: '1',
  /** 0.5rem (8px) */
  sm: '2',
  /** 0.75rem (12px) */
  md: '3',
  /** 1rem (16px) */
  lg: '4',
  /** 1.5rem (24px) */
  xl: '6',
  /** 2rem (32px) */
  '2xl': '8',
  /** 3rem (48px) */
  '3xl': '12',
  /** 4rem (64px) */
  '4xl': '16'
} as const

/**
 * Border radius scale
 * Maps semantic names to Tailwind border radius classes
 */
export const RADIUS = {
  /** 0.25rem (4px) */
  sm: 'rounded-sm',
  /** 0.375rem (6px) */
  md: 'rounded-md',
  /** 0.5rem (8px) */
  lg: 'rounded-lg',
  /** 0.75rem (12px) */
  xl: 'rounded-xl',
  /** 1rem (16px) */
  '2xl': 'rounded-2xl',
  /** 1.5rem (24px) */
  '3xl': 'rounded-3xl',
  /** 9999px (full) */
  full: 'rounded-full'
} as const

/**
 * Font size scale
 * Maps semantic names to Tailwind font size classes
 */
export const FONT_SIZE = {
  /** 0.75rem (12px) */
  xs: 'text-xs',
  /** 0.875rem (14px) */
  sm: 'text-sm',
  /** 1rem (16px) */
  base: 'text-base',
  /** 1.125rem (18px) */
  lg: 'text-lg',
  /** 1.25rem (20px) */
  xl: 'text-xl',
  /** 1.5rem (24px) */
  '2xl': 'text-2xl',
  /** 1.875rem (30px) */
  '3xl': 'text-3xl',
  /** 2.25rem (36px) */
  '4xl': 'text-4xl'
} as const

/**
 * Font weight scale
 * Maps semantic names to Tailwind font weight classes
 */
export const FONT_WEIGHT = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
} as const

/**
 * Transition duration scale
 * Maps semantic names to Tailwind duration classes
 */
export const DURATION = {
  /** 75ms */
  fast: 'duration-75',
  /** 150ms */
  normal: 'duration-150',
  /** 200ms */
  slow: 'duration-200',
  /** 300ms */
  slower: 'duration-300',
  /** 500ms */
  slowest: 'duration-500'
} as const

/**
 * Shadow scale
 * Maps semantic names to Tailwind shadow classes
 */
export const SHADOW = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  none: 'shadow-none'
} as const

/**
 * Opacity scale for backgrounds and borders
 * Common opacity values used in the design system
 */
export const OPACITY = {
  /** 10% opacity */
  subtle: '10',
  /** 20% opacity */
  light: '20',
  /** 30% opacity */
  medium: '30',
  /** 40% opacity */
  strong: '40',
  /** 60% opacity */
  stronger: '60',
  /** 80% opacity */
  strongest: '80'
} as const

/**
 * Z-index scale
 * Semantic z-index values for layering
 */
export const Z_INDEX = {
  base: 'z-0',
  dropdown: 'z-10',
  sticky: 'z-20',
  fixed: 'z-30',
  modalBackdrop: 'z-40',
  modal: 'z-50',
  popover: 'z-60',
  tooltip: 'z-70'
} as const

/**
 * Common component styles
 * Reusable style combinations for common patterns
 */
export const COMPONENT_STYLES = {
  /** Glass morphism effect */
  glass: 'border border-zinc-600/30 bg-zinc-800/40 backdrop-blur-md',
  /** Card base styles */
  card: 'rounded-xl border border-zinc-600/30 bg-zinc-800/40 p-6 shadow-xl backdrop-blur-md',
  /** Interactive hover effect */
  hover: 'transition-colors duration-200 hover:bg-zinc-800/60',
  /** Focus ring */
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800',
  /** Disabled state */
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed'
} as const

/**
 * Animation classes
 * Common animation patterns
 */
export const ANIMATION = {
  spin: 'animate-spin',
  ping: 'animate-ping',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  slideUp: 'animate-slide-up'
} as const

/**
 * Breakpoint values (for reference)
 * These match Tailwind's default breakpoints
 */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const

/**
 * Helper function to build spacing classes
 * @param type - The spacing type (p, m, px, py, etc.)
 * @param size - The size key from SPACING
 * @returns Tailwind spacing class
 */
export const spacing = (type: string, size: keyof typeof SPACING): string =>
  `${type}-${SPACING[size]}`

/**
 * Helper function to build gap classes
 * @param size - The size key from SPACING
 * @returns Tailwind gap class
 */
export const gap = (size: keyof typeof SPACING): string => `gap-${SPACING[size]}`

/**
 * Helper function to build opacity classes
 * @param color - The color (e.g., 'zinc-600')
 * @param opacity - The opacity key from OPACITY
 * @returns Color with opacity (e.g., 'zinc-600/30')
 */
export const withOpacity = (color: string, opacity: keyof typeof OPACITY): string =>
  `${color}/${OPACITY[opacity]}`
