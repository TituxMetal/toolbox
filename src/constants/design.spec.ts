import { describe, expect, it } from 'bun:test'

import {
  ANIMATION,
  BREAKPOINTS,
  COMPONENT_STYLES,
  DURATION,
  FONT_SIZE,
  FONT_WEIGHT,
  gap,
  OPACITY,
  RADIUS,
  SHADOW,
  spacing,
  SPACING,
  withOpacity,
  Z_INDEX
} from './design'

describe('design constants', () => {
  describe('SPACING', () => {
    it('exports spacing scale constants', () => {
      expect(SPACING.xxs).toBe('0.5')
      expect(SPACING.xs).toBe('1')
      expect(SPACING.sm).toBe('2')
      expect(SPACING.md).toBe('3')
      expect(SPACING.lg).toBe('4')
      expect(SPACING.xl).toBe('6')
      expect(SPACING['2xl']).toBe('8')
      expect(SPACING['3xl']).toBe('12')
      expect(SPACING['4xl']).toBe('16')
    })
  })

  describe('RADIUS', () => {
    it('exports border radius constants', () => {
      expect(RADIUS.sm).toBe('rounded-sm')
      expect(RADIUS.md).toBe('rounded-md')
      expect(RADIUS.lg).toBe('rounded-lg')
      expect(RADIUS.xl).toBe('rounded-xl')
      expect(RADIUS['2xl']).toBe('rounded-2xl')
      expect(RADIUS['3xl']).toBe('rounded-3xl')
      expect(RADIUS.full).toBe('rounded-full')
    })
  })

  describe('FONT_SIZE', () => {
    it('exports font size constants', () => {
      expect(FONT_SIZE.xs).toBe('text-xs')
      expect(FONT_SIZE.sm).toBe('text-sm')
      expect(FONT_SIZE.base).toBe('text-base')
      expect(FONT_SIZE.lg).toBe('text-lg')
      expect(FONT_SIZE.xl).toBe('text-xl')
      expect(FONT_SIZE['2xl']).toBe('text-2xl')
      expect(FONT_SIZE['3xl']).toBe('text-3xl')
      expect(FONT_SIZE['4xl']).toBe('text-4xl')
    })
  })

  describe('FONT_WEIGHT', () => {
    it('exports font weight constants', () => {
      expect(FONT_WEIGHT.normal).toBe('font-normal')
      expect(FONT_WEIGHT.medium).toBe('font-medium')
      expect(FONT_WEIGHT.semibold).toBe('font-semibold')
      expect(FONT_WEIGHT.bold).toBe('font-bold')
    })
  })

  describe('DURATION', () => {
    it('exports transition duration constants', () => {
      expect(DURATION.fast).toBe('duration-75')
      expect(DURATION.normal).toBe('duration-150')
      expect(DURATION.slow).toBe('duration-200')
      expect(DURATION.slower).toBe('duration-300')
      expect(DURATION.slowest).toBe('duration-500')
    })
  })

  describe('SHADOW', () => {
    it('exports shadow constants', () => {
      expect(SHADOW.sm).toBe('shadow-sm')
      expect(SHADOW.md).toBe('shadow-md')
      expect(SHADOW.lg).toBe('shadow-lg')
      expect(SHADOW.xl).toBe('shadow-xl')
      expect(SHADOW['2xl']).toBe('shadow-2xl')
      expect(SHADOW.none).toBe('shadow-none')
    })
  })

  describe('OPACITY', () => {
    it('exports opacity constants', () => {
      expect(OPACITY.subtle).toBe('10')
      expect(OPACITY.light).toBe('20')
      expect(OPACITY.medium).toBe('30')
      expect(OPACITY.strong).toBe('40')
      expect(OPACITY.stronger).toBe('60')
      expect(OPACITY.strongest).toBe('80')
    })
  })

  describe('Z_INDEX', () => {
    it('exports z-index constants', () => {
      expect(Z_INDEX.base).toBe('z-0')
      expect(Z_INDEX.dropdown).toBe('z-10')
      expect(Z_INDEX.sticky).toBe('z-20')
      expect(Z_INDEX.fixed).toBe('z-30')
      expect(Z_INDEX.modalBackdrop).toBe('z-40')
      expect(Z_INDEX.modal).toBe('z-50')
      expect(Z_INDEX.popover).toBe('z-60')
      expect(Z_INDEX.tooltip).toBe('z-70')
    })
  })

  describe('COMPONENT_STYLES', () => {
    it('exports component style constants', () => {
      expect(COMPONENT_STYLES.glass).toBe(
        'border border-zinc-600/30 bg-zinc-800/40 backdrop-blur-md'
      )
      expect(COMPONENT_STYLES.card).toBe(
        'rounded-xl border border-zinc-600/30 bg-zinc-800/40 p-6 shadow-xl backdrop-blur-md'
      )
      expect(COMPONENT_STYLES.hover).toBe('transition-colors duration-200 hover:bg-zinc-800/60')
      expect(COMPONENT_STYLES.focusRing).toBe(
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800'
      )
      expect(COMPONENT_STYLES.disabled).toBe('disabled:opacity-50 disabled:cursor-not-allowed')
    })
  })

  describe('ANIMATION', () => {
    it('exports animation constants', () => {
      expect(ANIMATION.spin).toBe('animate-spin')
      expect(ANIMATION.ping).toBe('animate-ping')
      expect(ANIMATION.pulse).toBe('animate-pulse')
      expect(ANIMATION.bounce).toBe('animate-bounce')
      expect(ANIMATION.slideUp).toBe('animate-slide-up')
    })
  })

  describe('BREAKPOINTS', () => {
    it('exports breakpoint constants', () => {
      expect(BREAKPOINTS.sm).toBe('640px')
      expect(BREAKPOINTS.md).toBe('768px')
      expect(BREAKPOINTS.lg).toBe('1024px')
      expect(BREAKPOINTS.xl).toBe('1280px')
      expect(BREAKPOINTS['2xl']).toBe('1536px')
    })
  })

  describe('spacing helper', () => {
    it('builds spacing classes correctly', () => {
      expect(spacing('p', 'sm')).toBe('p-2')
      expect(spacing('m', 'lg')).toBe('m-4')
      expect(spacing('px', 'xl')).toBe('px-6')
      expect(spacing('py', 'md')).toBe('py-3')
      expect(spacing('mt', '2xl')).toBe('mt-8')
    })
  })

  describe('gap helper', () => {
    it('builds gap classes correctly', () => {
      expect(gap('sm')).toBe('gap-2')
      expect(gap('md')).toBe('gap-3')
      expect(gap('lg')).toBe('gap-4')
      expect(gap('xl')).toBe('gap-6')
    })
  })

  describe('withOpacity helper', () => {
    it('builds color with opacity correctly', () => {
      expect(withOpacity('zinc-600', 'medium')).toBe('zinc-600/30')
      expect(withOpacity('zinc-800', 'strong')).toBe('zinc-800/40')
      expect(withOpacity('indigo-500', 'subtle')).toBe('indigo-500/10')
      expect(withOpacity('red-500', 'stronger')).toBe('red-500/60')
    })
  })
})
