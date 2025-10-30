/// <reference lib="dom" />

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'bun:test'
import { MemoryRouter } from 'react-router-dom'

import { Home } from './Home'

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) =>
  render(<MemoryRouter>{component}</MemoryRouter>)

describe('Home', () => {
  it('exports Home component', () => {
    expect(typeof Home).toBe('function')
  })

  describe('Page Structure', () => {
    it('renders the main heading', () => {
      renderWithRouter(<Home />)
      expect(screen.getByText('Developer Toolbox')).toBeTruthy()
    })

    it('renders the subtitle', () => {
      renderWithRouter(<Home />)
      expect(
        screen.getByText(
          'A collection of essential development tools and utilities to streamline your workflow'
        )
      ).toBeTruthy()
    })

    it('renders the welcome card', () => {
      renderWithRouter(<Home />)
      // WelcomeCard should be rendered
      const welcomeSection = screen.getByText(/Developer Toolbox/i)
      expect(welcomeSection).toBeTruthy()
    })

    it('renders the footer', () => {
      renderWithRouter(<Home />)
      expect(screen.getByText(/Built with React, Bun, and Tailwind CSS/i)).toBeTruthy()
    })
  })

  describe('Tool Cards', () => {
    it('renders Pomodoro Timer card', () => {
      renderWithRouter(<Home />)
      expect(screen.getByText('Pomodoro Timer')).toBeTruthy()
      expect(
        screen.getByText('Focus timer using the Pomodoro Technique with work sessions and breaks')
      ).toBeTruthy()
    })

    it('renders placeholder tool cards', () => {
      renderWithRouter(<Home />)
      expect(screen.getByText('More Tools')).toBeTruthy()
      expect(screen.getByText('Future Features')).toBeTruthy()
    })

    it('renders Pomodoro Timer card with link', () => {
      renderWithRouter(<Home />)
      const pomodoroCard = screen.getByText('Pomodoro Timer').closest('a')
      expect(pomodoroCard).toBeTruthy()
      expect(pomodoroCard?.getAttribute('href')).toBe('/pomodoro')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithRouter(<Home />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading.textContent).toBe('Developer Toolbox')
    })

    it('has semantic HTML structure', () => {
      renderWithRouter(<Home />)
      expect(screen.getByRole('banner')).toBeTruthy() // header
      expect(screen.getByRole('main')).toBeTruthy() // main
      expect(screen.getByRole('contentinfo')).toBeTruthy() // footer
    })
  })

  describe('Layout', () => {
    it('renders with dark background', () => {
      const { container } = renderWithRouter(<Home />)
      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv.className).toContain('bg-zinc-700')
    })

    it('renders with full height layout', () => {
      const { container } = renderWithRouter(<Home />)
      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv.className).toContain('min-h-screen')
    })
  })
})
