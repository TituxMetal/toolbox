/// <reference lib="dom" />

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'

import { Button } from './Button'

describe('Button', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    cleanup()
  })

  describe('Component Export', () => {
    it('exports Button component as forwardRef object', () => {
      expect(typeof Button).toBe('object')
      expect(Button).toBeTruthy()
      expect(Button.displayName).toBe('Button')
    })
  })

  describe('Basic Rendering', () => {
    it('renders button element with children', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeDefined()
      expect(button.textContent).toBe('Click me')
    })

    it('renders as button element by default', () => {
      render(<Button>Default</Button>)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('renders with custom type attribute', () => {
      render(<Button type='submit'>Submit</Button>)
      const button = screen.getByRole('button')
      expect(button.getAttribute('type')).toBe('submit')
    })
  })

  describe('Variant Styles', () => {
    it('renders primary variant with correct classes', () => {
      render(<Button variant='primary'>Primary</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('btn-primary')
    })

    it('renders secondary variant with correct classes', () => {
      render(<Button variant='secondary'>Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('btn-secondary')
    })

    it('renders danger variant with correct classes', () => {
      render(<Button variant='danger'>Danger</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('btn-danger')
    })

    it('renders ghost variant with correct classes', () => {
      render(<Button variant='ghost'>Ghost</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('bg-transparent')
    })
  })

  describe('Size Styles', () => {
    it('renders sm size with correct classes', () => {
      render(<Button size='sm'>Small</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-3')
      expect(button.className).toContain('py-1.5')
    })

    it('renders md size with correct classes', () => {
      render(<Button size='md'>Medium</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-4')
      expect(button.className).toContain('py-2')
    })

    it('renders lg size with correct classes', () => {
      render(<Button size='lg'>Large</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-6')
      expect(button.className).toContain('py-3')
    })

    it('renders xl size with correct classes', () => {
      render(<Button size='xl'>Extra Large</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('px-8')
      expect(button.className).toContain('py-4')
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner when loading is true', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      const spinner = button.querySelector('svg')
      expect(spinner).toBeDefined()
      expect(spinner?.classList.contains('animate-spin')).toBe(true)
    })

    it('shows both spinner and text when loading', () => {
      render(<Button loading>Click me</Button>)
      const button = screen.getByRole('button')
      const spinner = button.querySelector('svg')
      expect(spinner).toBeDefined()
      expect(button.textContent).toContain('Click me')
    })

    it('does not show spinner when loading is false', () => {
      render(<Button loading={false}>Not Loading</Button>)
      const button = screen.getByRole('button')
      const spinner = button.querySelector('svg')
      expect(spinner).toBeNull()
    })
  })

  describe('Icon Rendering', () => {
    it('renders icon when provided', () => {
      const icon = <span data-testid='test-icon'>🔥</span>
      render(<Button icon={icon}>With Icon</Button>)
      const iconElement = screen.getByTestId('test-icon')
      expect(iconElement).toBeDefined()
      expect(iconElement.textContent).toBe('🔥')
    })

    it('does not render icon when not provided', () => {
      render(<Button>No Icon</Button>)
      const button = screen.getByRole('button')
      expect(button.querySelector('[data-testid="test-icon"]')).toBeNull()
    })
  })

  describe('Full Width', () => {
    it('applies full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('w-full')
    })

    it('does not apply full width class when fullWidth is false', () => {
      render(<Button fullWidth={false}>Not Full Width</Button>)
      const button = screen.getByRole('button')
      expect(button.className).not.toContain('w-full')
    })
  })

  describe('Disabled State', () => {
    it('disables button when disabled is true', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button.hasAttribute('disabled')).toBe(true)
    })

    it('applies disabled styles', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('opacity-50')
      expect(button.className).toContain('cursor-not-allowed')
    })

    it('does not disable button when disabled is false', () => {
      render(<Button disabled={false}>Enabled</Button>)
      const button = screen.getByRole('button')
      expect(button.hasAttribute('disabled')).toBe(false)
    })
  })

  describe('Click Interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = mock(() => {})
      render(<Button onClick={handleClick}>Clickable</Button>)
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = mock(() => {})
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      )
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(0)
    })

    it('does not call onClick when loading', () => {
      const handleClick = mock(() => {})
      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      )
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(0)
    })
  })

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<Button className='custom-class'>Custom</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain('custom-class')
    })

    it('applies custom id', () => {
      render(<Button id='my-button'>With ID</Button>)
      const button = screen.getByRole('button')
      expect(button.id).toBe('my-button')
    })

    it('applies aria-label', () => {
      render(<Button aria-label='Accessible button'>Accessible</Button>)
      const button = screen.getByRole('button', { name: /accessible button/i })
      expect(button).toBeDefined()
    })
  })

  describe('Complex Combinations', () => {
    it('handles all props together', () => {
      const handleClick = mock(() => {})
      const icon = <span data-testid='icon'>🚀</span>

      render(
        <Button
          variant='primary'
          size='lg'
          icon={icon}
          fullWidth
          className='custom-class'
          onClick={handleClick}
          id='complex-btn'
        >
          Complex Button
        </Button>
      )

      const button = screen.getByRole('button')
      expect(button.textContent).toContain('Complex Button')
      expect(button.className).toContain('btn-primary')
      expect(button.className).toContain('px-6')
      expect(button.className).toContain('w-full')
      expect(button.className).toContain('custom-class')
      expect(button.id).toBe('complex-btn')
      expect(screen.getByTestId('icon')).toBeDefined()

      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Button>{''}</Button>)
      const button = screen.getByRole('button')
      expect(button.textContent).toBe('')
    })

    it('handles number children', () => {
      render(<Button>{42}</Button>)
      const button = screen.getByRole('button')
      expect(button.textContent).toBe('42')
    })

    it('handles React element children', () => {
      render(
        <Button>
          <span>Nested</span>
        </Button>
      )
      const button = screen.getByRole('button')
      expect(button.textContent).toBe('Nested')
    })
  })
})
