/// <reference lib="dom" />

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'bun:test'

import { StatCard } from './StatCard'

describe('StatCard', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    cleanup()
  })

  describe('Component Export', () => {
    it('exports StatCard component as function', () => {
      expect(typeof StatCard).toBe('function')
      expect(StatCard).toBeTruthy()
    })
  })

  describe('Basic Rendering', () => {
    it('renders label and value', () => {
      render(<StatCard label='Total Sessions' value={42} />)
      expect(screen.getByText('Total Sessions')).toBeDefined()
      expect(screen.getByText('42')).toBeDefined()
    })

    it('renders with string value', () => {
      render(<StatCard label='Status' value='Active' />)
      expect(screen.getByText('Status')).toBeDefined()
      expect(screen.getByText('Active')).toBeDefined()
    })

    it('renders with number value', () => {
      render(<StatCard label='Count' value={100} />)
      expect(screen.getByText('Count')).toBeDefined()
      expect(screen.getByText('100')).toBeDefined()
    })
  })

  describe('Color Variants', () => {
    it('renders with indigo color', () => {
      render(<StatCard label='Test' value='100' color='indigo' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
    })

    it('renders with purple color', () => {
      render(<StatCard label='Test' value='100' color='purple' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
    })

    it('renders with green color', () => {
      render(<StatCard label='Test' value='100' color='green' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
    })

    it('renders with blue color', () => {
      render(<StatCard label='Test' value='100' color='blue' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
    })

    it('renders with red color', () => {
      render(<StatCard label='Test' value='100' color='red' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
    })

    it('renders with yellow color', () => {
      render(<StatCard label='Test' value='100' color='yellow' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
    })
  })

  describe('Icon Support', () => {
    it('renders with icon', () => {
      const icon = <span data-testid='test-icon'>📊</span>
      render(<StatCard label='Test' value='100' icon={icon} />)
      expect(screen.getByTestId('test-icon')).toBeDefined()
    })

    it('renders without icon', () => {
      render(<StatCard label='Test' value='100' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
    })
  })

  describe('Trend Support', () => {
    it('renders upward trend with value', () => {
      render(<StatCard label='Test' value='100' trend='up' trendValue='+5%' />)
      expect(screen.getByText('↗')).toBeDefined()
      expect(screen.getByText('+5%')).toBeDefined()
    })

    it('renders downward trend with value', () => {
      render(<StatCard label='Test' value='100' trend='down' trendValue='-3%' />)
      expect(screen.getByText('↘')).toBeDefined()
      expect(screen.getByText('-3%')).toBeDefined()
    })

    it('renders neutral trend with value', () => {
      render(<StatCard label='Test' value='100' trend='neutral' trendValue='0%' />)
      expect(screen.getByText('→')).toBeDefined()
      expect(screen.getByText('0%')).toBeDefined()
    })

    it('does not render trend without value', () => {
      render(<StatCard label='Test' value='100' trend='up' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
      expect(screen.queryByText('↗')).toBeNull()
    })

    it('renders without trend', () => {
      render(<StatCard label='Test' value='100' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
      expect(screen.queryByText('↗')).toBeNull()
      expect(screen.queryByText('↘')).toBeNull()
      expect(screen.queryByText('→')).toBeNull()
    })
  })

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<StatCard label='Test' value='100' className='custom-class' data-testid='stat-card' />)
      const card = screen.getByTestId('stat-card')
      expect(card.className).toContain('custom-class')
    })

    it('applies custom id', () => {
      render(<StatCard label='Test' value='100' id='test-id' />)
      const card = document.getElementById('test-id')
      expect(card).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('handles zero value', () => {
      render(<StatCard label='Test' value={0} />)
      expect(screen.getByText('Test')).toBeDefined()
      expect(screen.getByText('0')).toBeDefined()
    })

    it('handles negative value', () => {
      render(<StatCard label='Test' value={-50} />)
      expect(screen.getByText('Test')).toBeDefined()
      expect(screen.getByText('-50')).toBeDefined()
    })

    it('handles large value', () => {
      render(<StatCard label='Test' value={999999} />)
      expect(screen.getByText('Test')).toBeDefined()
      expect(screen.getByText('999999')).toBeDefined()
    })

    it('handles empty string value', () => {
      render(<StatCard label='Test' value='' />)
      expect(screen.getByText('Test')).toBeDefined()
    })

    it('handles long label', () => {
      const longLabel = 'This is a very long label that might wrap'
      render(<StatCard label={longLabel} value='100' />)
      expect(screen.getByText(longLabel)).toBeDefined()
    })

    it('handles long value', () => {
      const longValue = 'This is a very long value that might wrap'
      render(<StatCard label='Test' value={longValue} />)
      expect(screen.getByText(longValue)).toBeDefined()
    })
  })

  describe('Complex Combinations', () => {
    it('renders with all props', () => {
      const icon = <span data-testid='test-icon'>📊</span>
      render(
        <StatCard
          label='Total Sessions'
          value={42}
          color='indigo'
          icon={icon}
          trend='up'
          trendValue='+10%'
          className='custom-class'
          id='test-id'
          data-testid='stat-card'
        />
      )

      expect(screen.getByText('Total Sessions')).toBeDefined()
      expect(screen.getByText('42')).toBeDefined()
      expect(screen.getByTestId('test-icon')).toBeDefined()
      expect(screen.getByText('↗')).toBeDefined()
      expect(screen.getByText('+10%')).toBeDefined()

      const card = screen.getByTestId('stat-card')
      expect(card.className).toContain('custom-class')
      expect(card.id).toBe('test-id')
    })

    it('renders with icon and trend', () => {
      const icon = <span data-testid='test-icon'>📊</span>
      render(<StatCard label='Test' value='100' icon={icon} trend='up' trendValue='+5%' />)

      expect(screen.getByTestId('test-icon')).toBeDefined()
      expect(screen.getByText('↗')).toBeDefined()
      expect(screen.getByText('+5%')).toBeDefined()
    })

    it('renders with color and trend', () => {
      render(
        <StatCard
          label='Test'
          value='100'
          color='green'
          trend='up'
          trendValue='+5%'
          data-testid='stat-card'
        />
      )

      const card = screen.getByTestId('stat-card')
      expect(card).toBeDefined()
      expect(screen.getByText('↗')).toBeDefined()
      expect(screen.getByText('+5%')).toBeDefined()
    })
  })
})
