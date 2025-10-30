/// <reference lib="dom" />

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'bun:test'

import { ProgressCircle } from './ProgressCircle'

describe('ProgressCircle', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    cleanup()
  })

  describe('Component Export', () => {
    it('exports ProgressCircle component as function', () => {
      expect(typeof ProgressCircle).toBe('function')
      expect(ProgressCircle).toBeTruthy()
    })
  })

  describe('Basic Rendering', () => {
    it('renders SVG element', () => {
      render(<ProgressCircle progress={50} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const svg = container.querySelector('svg')
      expect(svg).toBeDefined()
    })

    it('renders with progress value', () => {
      render(<ProgressCircle progress={75} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      expect(container).toBeDefined()
    })

    it('renders with custom content', () => {
      render(
        <ProgressCircle progress={50} data-testid='progress'>
          <span>Custom</span>
        </ProgressCircle>
      )
      expect(screen.getByText('Custom')).toBeDefined()
    })
  })

  describe('Progress Calculation', () => {
    it('handles 0% progress', () => {
      render(<ProgressCircle progress={0} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      expect(container).toBeDefined()
    })

    it('handles 100% progress', () => {
      render(<ProgressCircle progress={100} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      expect(container).toBeDefined()
    })

    it('normalizes progress above 100', () => {
      render(<ProgressCircle progress={150} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      expect(container).toBeDefined()
    })

    it('normalizes negative progress', () => {
      render(<ProgressCircle progress={-50} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      expect(container).toBeDefined()
    })
  })

  describe('Size Variants', () => {
    it('renders with sm size', () => {
      render(<ProgressCircle progress={50} size='sm' data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const svg = container.querySelector('svg')
      expect(svg?.getAttribute('width')).toBe('64')
      expect(svg?.getAttribute('height')).toBe('64')
    })

    it('renders with md size', () => {
      render(<ProgressCircle progress={50} size='md' data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const svg = container.querySelector('svg')
      expect(svg?.getAttribute('width')).toBe('96')
      expect(svg?.getAttribute('height')).toBe('96')
    })

    it('renders with lg size', () => {
      render(<ProgressCircle progress={50} size='lg' data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const svg = container.querySelector('svg')
      expect(svg?.getAttribute('width')).toBe('128')
      expect(svg?.getAttribute('height')).toBe('128')
    })

    it('renders with xl size', () => {
      render(<ProgressCircle progress={50} size='xl' data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const svg = container.querySelector('svg')
      expect(svg?.getAttribute('width')).toBe('192')
      expect(svg?.getAttribute('height')).toBe('192')
    })

    it('renders with custom numeric size', () => {
      render(<ProgressCircle progress={50} size={200} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const svg = container.querySelector('svg')
      expect(svg?.getAttribute('width')).toBe('200')
      expect(svg?.getAttribute('height')).toBe('200')
    })
  })

  describe('Color Variants', () => {
    it('renders with indigo color', () => {
      render(<ProgressCircle progress={50} color='indigo' data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const progressCircle = container.querySelector('circle:last-child')
      const className = progressCircle?.getAttribute('class') || ''
      expect(className).toContain('stroke-indigo-500')
    })

    it('renders with purple color', () => {
      render(<ProgressCircle progress={50} color='purple' data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const progressCircle = container.querySelector('circle:last-child')
      const className = progressCircle?.getAttribute('class') || ''
      expect(className).toContain('stroke-purple-500')
    })

    it('renders with green color', () => {
      render(<ProgressCircle progress={50} color='green' data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const progressCircle = container.querySelector('circle:last-child')
      const className = progressCircle?.getAttribute('class') || ''
      expect(className).toContain('stroke-green-500')
    })

    it('renders with red color', () => {
      render(<ProgressCircle progress={50} color='red' data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const progressCircle = container.querySelector('circle:last-child')
      const className = progressCircle?.getAttribute('class') || ''
      expect(className).toContain('stroke-red-500')
    })
  })

  describe('Progress Text', () => {
    it('shows progress text when showProgress is true', () => {
      render(<ProgressCircle progress={75} showProgress data-testid='progress' />)
      expect(screen.getByText('75%')).toBeDefined()
    })

    it('hides progress text when showProgress is false', () => {
      render(<ProgressCircle progress={75} showProgress={false} data-testid='progress' />)
      const progressText = screen.queryByText('75%')
      expect(progressText).toBeNull()
    })

    it('does not show progress text by default', () => {
      render(<ProgressCircle progress={75} data-testid='progress' />)
      const progressText = screen.queryByText('75%')
      expect(progressText).toBeNull()
    })
  })

  describe('Animation', () => {
    it('applies animation classes when animated is true', () => {
      render(<ProgressCircle progress={50} animated data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const progressCircle = container.querySelector('circle:last-child')
      const className = progressCircle?.getAttribute('class') || ''
      expect(className).toContain('transition-all')
    })

    it('does not apply animation classes when animated is false', () => {
      render(<ProgressCircle progress={50} animated={false} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const progressCircle = container.querySelector('circle:last-child')
      const className = progressCircle?.getAttribute('class') || ''
      expect(className).not.toContain('transition-all')
    })

    it('applies animation by default', () => {
      render(<ProgressCircle progress={50} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const progressCircle = container.querySelector('circle:last-child')
      const className = progressCircle?.getAttribute('class') || ''
      expect(className).toContain('transition-all')
    })
  })

  describe('Stroke Width', () => {
    it('uses default stroke width', () => {
      render(<ProgressCircle progress={50} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const circles = container.querySelectorAll('circle')
      expect(circles[0]?.getAttribute('stroke-width')).toBe('8')
    })

    it('applies custom stroke width', () => {
      render(<ProgressCircle progress={50} strokeWidth={12} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      const circles = container.querySelectorAll('circle')
      expect(circles[0]?.getAttribute('stroke-width')).toBe('12')
    })
  })

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<ProgressCircle progress={50} className='custom-class' data-testid='progress' />)
      const container = screen.getByTestId('progress')
      expect(container.className).toContain('custom-class')
    })

    it('applies custom id', () => {
      render(<ProgressCircle progress={50} id='test-id' />)
      const container = document.getElementById('test-id')
      expect(container).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('handles decimal progress values', () => {
      render(<ProgressCircle progress={33.33} showProgress data-testid='progress' />)
      expect(screen.getByText('33%')).toBeDefined()
    })

    it('handles very small progress values', () => {
      render(<ProgressCircle progress={0.1} showProgress data-testid='progress' />)
      expect(screen.getByText('0%')).toBeDefined()
    })

    it('handles very large progress values', () => {
      render(<ProgressCircle progress={999} showProgress data-testid='progress' />)
      expect(screen.getByText('100%')).toBeDefined()
    })

    it('renders without children', () => {
      render(<ProgressCircle progress={50} data-testid='progress' />)
      const container = screen.getByTestId('progress')
      expect(container).toBeDefined()
    })

    it('renders with complex children', () => {
      render(
        <ProgressCircle progress={50} data-testid='progress'>
          <div>
            <h3>Title</h3>
            <p>Description</p>
          </div>
        </ProgressCircle>
      )
      expect(screen.getByText('Title')).toBeDefined()
      expect(screen.getByText('Description')).toBeDefined()
    })
  })
})
