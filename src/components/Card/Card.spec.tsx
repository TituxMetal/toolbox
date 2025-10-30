/// <reference lib="dom" />

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'

import { Card } from './Card'

describe('Card', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    cleanup()
  })

  describe('Component Export', () => {
    it('exports Card component as forwardRef object', () => {
      expect(typeof Card).toBe('object')
      expect(Card).toBeTruthy()
      expect(Card.displayName).toBe('Card')
    })
  })

  describe('Basic Rendering', () => {
    it('renders card with children', () => {
      render(<Card data-testid='card'>Card content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeDefined()
      expect(card.textContent).toBe('Card content')
    })

    it('renders with default variant', () => {
      render(<Card data-testid='card'>Default card</Card>)
      const card = screen.getByTestId('card')
      expect(card.className).toContain('card')
    })

    it('renders with custom className', () => {
      render(
        <Card className='custom-class' data-testid='card'>
          Custom
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card.className).toContain('custom-class')
    })
  })

  describe('Variant Styles', () => {
    it('renders default variant with card class', () => {
      render(
        <Card variant='default' data-testid='card'>
          Default
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card.className).toContain('card')
    })

    it('renders gradient variant with gradient classes', () => {
      render(
        <Card variant='gradient' data-testid='card'>
          Gradient
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card.className).toContain('bg-gradient-to-br')
      expect(card.className).toContain('from-indigo-500')
    })

    it('renders gradient with custom colors', () => {
      render(
        <Card variant='gradient' gradientFrom='purple' gradientTo='blue' data-testid='card'>
          Custom gradient
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card.className).toContain('from-purple-500')
    })
  })

  describe('Interactive States', () => {
    it('applies hoverable classes when hoverable is true', () => {
      render(
        <Card hoverable data-testid='card'>
          Hoverable
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card.className).toContain('hover:shadow-lg')
      expect(card.className).toContain('hover:scale-[1.02]')
    })

    it('applies clickable classes when clickable is true', () => {
      render(
        <Card clickable data-testid='card'>
          Clickable
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card.className).toContain('cursor-pointer')
      expect(card.className).toContain('active:scale-[0.98]')
    })

    it('handles click events when clickable', () => {
      const handleClick = mock(() => {})
      render(
        <Card clickable onClick={handleClick} data-testid='card'>
          Click me
        </Card>
      )
      const card = screen.getByTestId('card')
      fireEvent.click(card)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies both hoverable and clickable classes', () => {
      render(
        <Card hoverable clickable data-testid='card'>
          Interactive
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card.className).toContain('hover:shadow-lg')
      expect(card.className).toContain('cursor-pointer')
    })
  })

  describe('Accessibility', () => {
    it('applies aria-label when provided', () => {
      render(<Card aria-label='Test card'>Content</Card>)
      const card = screen.getByLabelText('Test card')
      expect(card).toBeDefined()
      expect(card.textContent).toBe('Content')
    })

    it('renders without aria-label', () => {
      render(<Card>No label</Card>)
      const element = screen.getByText('No label')
      expect(element).toBeDefined()
    })
  })

  describe('Complex Content', () => {
    it('renders nested elements', () => {
      render(
        <Card>
          <h2>Title</h2>
          <p>Description</p>
        </Card>
      )
      expect(screen.getByText('Title')).toBeDefined()
      expect(screen.getByText('Description')).toBeDefined()
    })

    it('renders multiple children', () => {
      render(
        <Card>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </Card>
      )
      expect(screen.getByText('First')).toBeDefined()
      expect(screen.getByText('Second')).toBeDefined()
      expect(screen.getByText('Third')).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Card>{''}</Card>)
      const cards = document.querySelectorAll('.card')
      expect(cards.length).toBeGreaterThan(0)
    })

    it('handles number children', () => {
      render(<Card>{42}</Card>)
      expect(screen.getByText('42')).toBeDefined()
    })

    it('handles custom props', () => {
      render(
        <Card id='test-card' data-testid='card'>
          Test
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card.id).toBe('test-card')
    })
  })
})
