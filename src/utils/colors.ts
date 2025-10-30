/**
 * Color Utility
 *
 * Centralized color class mappings to eliminate duplication across components
 */

import type { ColorVariant } from '~/types'

/**
 * Get text color classes for a given color variant
 * Used by: StatCard
 */
export const getTextColorClasses = (color: ColorVariant): string => {
  const colorMap: Record<ColorVariant, string> = {
    indigo: 'text-indigo-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400'
  }

  return colorMap[color]
}

/**
 * Get stroke color classes for a given color variant
 * Used by: ProgressCircle (foreground)
 */
export const getStrokeColorClasses = (color: ColorVariant): string => {
  const colorMap: Record<ColorVariant, string> = {
    indigo: 'stroke-indigo-500',
    purple: 'stroke-purple-500',
    green: 'stroke-green-500',
    blue: 'stroke-blue-500',
    red: 'stroke-red-500',
    yellow: 'stroke-yellow-500'
  }

  return colorMap[color]
}

/**
 * Get background stroke color classes for a given color variant
 * Used by: ProgressCircle (background)
 */
export const getBackgroundStrokeColorClasses = (color: ColorVariant): string => {
  const colorMap: Record<ColorVariant, string> = {
    indigo: 'stroke-indigo-900/30',
    purple: 'stroke-purple-900/30',
    green: 'stroke-green-900/30',
    blue: 'stroke-blue-900/30',
    red: 'stroke-red-900/30',
    yellow: 'stroke-yellow-900/30'
  }

  return colorMap[color]
}

/**
 * Get gradient color classes for a given color variant
 * Used by: Card (gradient variant)
 */
export const getGradientColorClasses = (color: ColorVariant): string => {
  const colorMap: Record<ColorVariant, string> = {
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600'
  }

  return colorMap[color]
}

/**
 * Get focus ring color classes for a given color variant
 * Used by: Button
 */
export const getFocusRingColorClasses = (color: ColorVariant): string => {
  const colorMap: Record<ColorVariant, string> = {
    indigo: 'focus:ring-indigo-500',
    purple: 'focus:ring-purple-500',
    green: 'focus:ring-green-500',
    blue: 'focus:ring-blue-500',
    red: 'focus:ring-red-500',
    yellow: 'focus:ring-yellow-500'
  }

  return colorMap[color]
}
